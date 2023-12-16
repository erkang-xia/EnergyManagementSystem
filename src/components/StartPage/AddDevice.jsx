import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import FormButton from './modules/form/FormButton';

const filter = createFilterOptions();

export default function AddDevice({ locationIds, types, modelNumbers }) {
  const [locationID, setLocationID] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [model, setModel] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState();
  const [success, setSucc] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(locationID);
    console.log(type); // This will log the selected value
    console.log(model);
    setSent(true);
    handleClose();
  };

  const l = [{ title: '105' }, { title: '102' }];

  return (
    <div>
      <Button onClick={handleClickOpen}>Add New Device</Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add a New Device</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 2 }}
          >
            <Box sx={{ mt: 1 }}>
              <Autocomplete
                value={locationID}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'string') {
                    setLocationID({
                      title: newValue,
                    });
                  } else if (newValue && newValue.inputValue) {
                    setLocationID({
                      title: newValue.inputValue,
                    });
                  } else {
                    setLocationID(newValue);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  const { inputValue } = params;
                  const isExisting = options.some(
                    (option) => inputValue === option.title
                  );
                  if (inputValue !== '' && !isExisting) {
                    filtered.push({
                      inputValue,
                      title: `Add "${inputValue}"`,
                    });
                  }
                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={locationIds ? locationIds : l}
                getOptionLabel={(option) => {
                  if (typeof option === 'string') {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  return option.title;
                }}
                renderOption={(props, option) => (
                  <li {...props}>{option.title}</li>
                )}
                sx={{ width: 300, mx: 'auto' }}
                freeSolo
                renderInput={(params) => (
                  <TextField {...params} label="Free solo with text demo" />
                )}
              />
            </Box>
            <Box sx={{ mt: 1 }}>
              <Autocomplete
                value={type}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'string') {
                    setType({
                      title: newValue,
                    });
                  } else if (newValue && newValue.inputValue) {
                    setType({
                      title: newValue.inputValue,
                    });
                  } else {
                    setType(newValue);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  const { inputValue } = params;
                  const isExisting = options.some(
                    (option) => inputValue === option.title
                  );
                  if (inputValue !== '' && !isExisting) {
                    filtered.push({
                      inputValue,
                      title: `Add "${inputValue}"`,
                    });
                  }
                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={types ? types : l}
                getOptionLabel={(option) => {
                  if (typeof option === 'string') {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  return option.title;
                }}
                renderOption={(props, option) => (
                  <li {...props}>{option.title}</li>
                )}
                sx={{ width: 300, mx: 'auto' }}
                freeSolo
                renderInput={(params) => (
                  <TextField {...params} label="Free solo with text demo" />
                )}
              />
            </Box>
            <Box sx={{ mt: 1 }}>
              <Autocomplete
                value={model}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'string') {
                    setModel({
                      title: newValue,
                    });
                  } else if (newValue && newValue.inputValue) {
                    setModel({
                      title: newValue.inputValue,
                    });
                  } else {
                    setModel(newValue);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  const { inputValue } = params;
                  const isExisting = options.some(
                    (option) => inputValue === option.title
                  );
                  if (inputValue !== '' && !isExisting) {
                    filtered.push({
                      inputValue,
                      title: `Add "${inputValue}"`,
                    });
                  }
                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={modelNumbers ? modelNumbers : l}
                getOptionLabel={(option) => {
                  if (typeof option === 'string') {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  return option.title;
                }}
                renderOption={(props, option) => (
                  <li {...props}>{option.title}</li>
                )}
                sx={{ width: 300, mx: 'auto' }}
                freeSolo
                renderInput={(params) => (
                  <TextField {...params} label="Free solo with text demo" />
                )}
              />
            </Box>
            <Box sx={{ mt: 1 }}>
              <Autocomplete
                value={model}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'string') {
                    setModel({
                      title: newValue,
                    });
                  } else if (newValue && newValue.inputValue) {
                    setModel({
                      title: newValue.inputValue,
                    });
                  } else {
                    setModel(newValue);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  const { inputValue } = params;
                  const isExisting = options.some(
                    (option) => inputValue === option.title
                  );
                  if (inputValue !== '' && !isExisting) {
                    filtered.push({
                      inputValue,
                      title: `Add "${inputValue}"`,
                    });
                  }
                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={l}
                getOptionLabel={(option) => {
                  if (typeof option === 'string') {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  return option.title;
                }}
                renderOption={(props, option) => (
                  <li {...props}>{option.title}</li>
                )}
                sx={{ width: 300, mx: 'auto' }}
                freeSolo
                renderInput={(params) => (
                  <TextField {...params} label="Free solo with text demo" />
                )}
              />
            </Box>

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" disabled={sent} color="primary">
                {sent ? 'Submitting…' : 'Submit'}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
