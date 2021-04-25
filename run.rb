#!/usr/bin/env ruby
# frozen_string_literal: true

#===============================================================================
#
#   Before running, you must have the following programs:
#
#     ruby, wget, gunzip (ou gzip), sqlite3
#
#   So:
#     sudo apt update
#     sudo apt install ruby-full wget gzip sqlite3 -y
#
#   And then you have to install 'progressbar':
#     sudo gem install progressbar
#
#   Finally, to run this script, do:
#     ruby run.rb
#
#   Note : the messages addressed to the user are in portuguese (pt-BR)
#
#==============================================================================

require 'progressbar'
require 'mkmf'
require 'set'

COLUMN_SEP     = "\t"  # column separator character
GENRE_SEP      = ','   # genre separator character
NULL_PATTERN   = /\\N/
NULL           = 'NULL'
QUOTE_PATTERN  = /'/
DOUBLE_QUOTE   = "''"
UPDATE_FREQ    = 10_000 # how many lines will be read before the progress bar is updated
BASE_URL       = 'https://datasets.imdbws.com/'
REQUIRED_FILES = %w[
  name.basics
  title.basics
  title.principals
  title.ratings
]
NM = 'nm'
TT = 'tt'

unzip = if find_executable 'gzip'
          'gzip -d'
        elsif find_executable 'gunzip'
          'gunzip'
        else
          warn '"gzip" não está instalado\n'
          exit 1
        end

# Downloads the necessary gzip files.
# The files are extracted after they are downloaded.
REQUIRED_FILES.each do |filename|
  next if File.exist?(filename + '.tsv')

  gzip = filename + '.tsv.gz'
  unless File.exist?(gzip)
    puts "Baixando #{gzip}"
    `wget #{File.join(BASE_URL, gzip)}`
  end
  puts "Descompactando #{gzip}"
  `#{unzip} #{gzip}`
end

# Filters name.basics.tsv, looking only for actors.
# A new file "actor.basics.tsv" is created.
unless File.exist?('./actor.basics.tsv')
  puts "Filtrando atores em 'name.basics.tsv'"
  `head -n 1 ./name.basics.tsv > actor.basics.tsv` # copy first line
  `grep -E "actor|actress" ./name.basics.tsv >> actor.basics.tsv`
end

# Filters out only the actors among the people involved in the movies.
# Saves the filtered values to "title.actors.tsv".
unless File.exist?('./title.actors.tsv')
  puts "Filtrando atores em 'title.principals.tsv'"
  `head -n 1 ./title.principals.tsv > title.actors.tsv` # copy first line
  `grep -E "actor|actress" ./title.principals.tsv >> title.actors.tsv`
end

genres = Set.new

# It generates the file containing the movie inserts.
File.open('./title.basics.tsv', 'r') do |file|
  n_lines = `wc -l #{file.path}`.to_i  # counts number of lines in the file
  file.readline                        # skip the first line
  pbar = ProgressBar.create(:title => 'insert_movies.sql',
                            :total => n_lines, :format => '%t: |%B| %e',)
  line_number   = 0
  insert_string = "INSERT INTO movies(id,title,year) VALUES(%d,'%s',%s);\n"
  File.open('./insert_movies.sql', 'w') do |output|
    output << "BEGIN;\n"
    file.each do |line|
      line_number += 1
      cols = line.strip.split(COLUMN_SEP)

      if cols[1] == 'movie' # only the lines that represent movies will be selected
        # tconst -> 0
        # titleType -> 1
        # primaryTitle -> 2
        # originalTitle -> 3
        # isAdult -> 4
        # startYear -> 5
        # endYear -> 6
        # runtimeMinutes -> 7
        # genres -> 8
        output << format(
          insert_string,
          cols[0].delete(TT).to_i,
          cols[3].gsub(QUOTE_PATTERN, DOUBLE_QUOTE),
          cols[5] == '\N' ? NULL : cols[5],
        )
        cols[8].split(GENRE_SEP).each { |g| genres << g } if cols[8] != '\N'
      end

      pbar.progress = line_number if line_number % UPDATE_FREQ == 0
    end
    output << "COMMIT;\n"
  end
  pbar.finish
end

genre_hash = genres.each_with_index.map { |name, id| [name, id] }.to_h

# It generates the file containing the genre inserts.
File.open('./insert_genres.sql', 'w') do |file|
  file << "BEGIN;\n"
  genre_hash.each do |name, id|
    file << format("INSERT INTO genres(id,name) VALUES(%s,'%s');\n", id, name)
  end
  file << "COMMIT;\n"
end

# It generates the file containing the classifications inserts.
File.open('./title.basics.tsv', 'r') do |file|
  n_lines = `wc -l #{file.path}`.to_i  # counts number of lines in the file
  file.readline                        # skip the first line
  pbar = ProgressBar.create(:title => 'insert_classifications.sql',
                            :total => n_lines, :format => '%t: |%B| %e',)
  line_number   = 0
  insert_string = "INSERT INTO classifications(genre_id,movie_id) VALUES(%s,%d);\n"
  File.open('./insert_classifications.sql', 'w') do |output|
    output << "BEGIN;\n"
    file.each_line do |line|
      line_number += 1
      cols = line.strip.split(COLUMN_SEP)
        # tconst -> 0
        # titleType -> 1
        # primaryTitle -> 2
        # originalTitle -> 3
        # isAdult -> 4
        # startYear -> 5
        # endYear -> 6
        # runtimeMinutes -> 7
        # genres -> 8
      if cols[1] == 'movie' && cols[8] != '\N'
        cols[8].split(GENRE_SEP).each do |name|
          genre_id = genre_hash[name]
          output << format(
            insert_string,
            genre_id,
            cols[0].delete(TT).to_i,
          )
        end
      end
      pbar.progress = line_number if line_number % UPDATE_FREQ == 0
    end
    output << "COMMIT;\n"
  end
  pbar.finish
end

# It generates the file containing the actors inserts.
File.open('./actor.basics.tsv', 'r') do |file|
  n_lines = `wc -l #{file.path}`.to_i
  file.readline
  pbar = ProgressBar.create(:title => 'insert_actors.sql',
                            :total => n_lines, :format => '%t: |%B| %e',)
  insert_string = "INSERT INTO actors(id,name,birth_year,death_year) VALUES(%d,'%s',%s,%s);\n"
  line_number = 0
  File.open('./insert_actors.sql', 'w') do |output|
    output << "BEGIN;\n"
    file.each_line do |line|
      line_number += 1
      cols = line.strip.gsub(NULL_PATTERN, NULL).split(COLUMN_SEP)
      # nconst -> 0
      # primaryName -> 1
      # birthYear -> 2
      # deathYear -> 3
      # primaryProfession -> 4
      # knownForTitles -> 5
      output << format(
        insert_string,
        cols[0].delete(NM).to_i,
        cols[1].gsub(QUOTE_PATTERN, DOUBLE_QUOTE),
        cols[2],
        cols[3],
      )
      pbar.progress = line_number if line_number % UPDATE_FREQ == 0
    end
    output << "COMMIT;\n"
    pbar.finish
  end
end

# It generates the file containing the castings inserts.
File.open('./title.actors.tsv', 'r') do |file|
  n_lines = `wc -l #{file.path}`.to_i
  file.readline
  pbar = ProgressBar.create(:title => 'insert_castings.sql',
                            :total => n_lines, :format => '%t: |%B| %e',)
  insert_string = "INSERT INTO castings(actor_id,movie_id) VALUES(%d,%d);\n"
  line_number = 0
  File.open('./insert_castings.sql', 'w') do |output|
    output << "BEGIN;\n"
    file.each_line do |line|
      line_number += 1
      cols = line.strip.split(COLUMN_SEP)
      # tconst -> 0
      # ordering -> 1
      # nconst -> 2
      # category -> 3
      # job -> 4
      # characters -> 5
      output << format(
        insert_string,
        cols[2].delete(NM).to_i,
        cols[0].delete(TT).to_i,
      )
      pbar.progress = line_number if line_number % UPDATE_FREQ == 0
    end
    output << "COMMIT;\n"
    pbar.finish
  end
end

# It updates the movies file with ratings.
File.open('./title.ratings.tsv', 'r') do |file|
  n_lines = `wc -l #{file.path}`.to_i
  file.readline
  pbar = ProgressBar.create(:title => 'update_movies.sql',
                            :total => n_lines, :format => '%t: |%B| %e',)
  update_string = "UPDATE movies SET rating=%s,votes=%s WHERE id=%d;\n"
  line_number = 0
  File.open('./update_movies.sql', 'w') do |output|
    output << "BEGIN;\n"
    file.each_line do |line|
      line_number += 1
      cols = line.strip.split(COLUMN_SEP)
      # tconst -> 0
      # averageRating -> 1
      # numVotes -> 2
      output << format(
        update_string,
        cols[1],
        cols[2],
        cols[0].delete(TT).to_i,
      )
      pbar.progress = line_number if line_number % UPDATE_FREQ == 0
    end
    output << "COMMIT;\n"
    pbar.finish
  end
end

File.write('./dump.sql', DATA.read)

puts <<~MESSAGE
  Criando 'movie_database.db'.  Esta operação vai levar alguns minutos.
  Não há indicação de progresso, porém pode-se acompanhar o aumento do
  seu tamanho.  Seu tamanho final será 653MB, aproximadamente.
MESSAGE

system 'sqlite3 movie_database.db < dump.sql'

puts <<~MESSAGE
  Fim! Arquivo 'movie_database.db' criado com sucesso.
MESSAGE

__END__
CREATE TABLE genres (
    id INTEGER UNIQUE PRIMARY KEY autoincrement,
    name TEXT UNIQUE
);

CREATE TABLE movies (
    id INTEGER UNIQUE PRIMARY KEY,
    title TEXT,
    year INTEGER,
    rating FLOAT,
    votes INTEGER
);

CREATE TABLE classifications (
    id INTEGER PRIMARY KEY autoincrement,
    genre_id INTEGER NOT NULL,
    movie_id INTEGER NOT NULL,
    FOREIGN KEY (genre_id) REFERENCES genres (id),
    FOREIGN KEY (movie_id) REFERENCES movies (id)
);

CREATE TABLE actors (
    id INTEGER PRIMARY KEY,
    name TEXT,
    birth_year INTEGER,
    death_year INTEGER
);

CREATE TABLE castings (
    id INTEGER PRIMARY KEY autoincrement,
    actor_id INTEGER NOT NULL,
    movie_id INTEGER NOT NULL,
    FOREIGN KEY (actor_id) REFERENCES actors (id),
    FOREIGN KEY (movie_id) REFERENCES movies (id)
);

.read insert_genres.sql
.read insert_movies.sql
.read insert_classifications.sql
.read insert_actors.sql
.read insert_castings.sql
.read update_movies.sql
