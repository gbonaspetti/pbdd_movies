import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

const AutoCompleteTextInput = (props) =>
  <Autocomplete
    freeSolo
    id='free-solo-2-demo'
    disableClearable
    options={props.options}
    onChange={(event, value) => props.onChange(value)}
    renderInput={(params) => (
      <TextField
        {...params}
        label={props.placeholder || ''}
        margin='normal'
        variant='outlined'
        onChange={(event) => props.onChange(event.target.value)}
        InputProps={{ ...params.InputProps, type: 'search' }}
      />
    )}
  />
export default AutoCompleteTextInput
