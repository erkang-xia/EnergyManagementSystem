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
import axios from 'axios';

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

  const addDevice = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8800/device`,
        {
          LocationID: locationID.title,
          Type: type.title,
          ModelNumber: model.title,
        },
        {
          withCredentials: true,
        }
      );

      return response.data; // Return the response (or any other relevant data)
    } catch (error) {
      console.error('Error add device:', error);
      throw error; // Re-throw the error if you want to handle it in handleSubmit
    }
  };

  const removeDevice = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8800/removeDevice`,
        {
          LocationID: locationID.title,
          Type: type.title,
          ModelNumber: model.title,
        },
        {
          withCredentials: true,
        }
      );

      return response.data; // Return the response (or any other relevant data)
    } catch (error) {
      console.error('Error add device:', error);
      throw error; // Re-throw the error if you want to handle it in handleSubmit
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addDevice(); // Wait for addDevice to complete
      setSent(true);
      handleClose();
      // Refresh the page or update component state here
      window.location.reload();
    } catch (error) {
      // Handle error (e.g., show error message in the UI)
    }
  };

  const handleRemove = async (event) => {
    event.preventDefault();

    try {
      await removeDevice(); // Wait for addDevice to complete
      setSent(true);
      handleClose();
      // Refresh the page or update component state here
      window.location.reload();
    } catch (error) {
      // Handle error (e.g., show error message in the UI)
    }
  };

  const l = [{ title: '105' }, { title: '102' }];

  return (
    <div>
      <Button onClick={handleClickOpen} variant="contained" color="success">
        <Box sx={{ fontWeight: 'medium' }}> Manage Device</Box>
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent
          style={{
            background: 'linear-gradient(to right bottom,#FFFFFF, #ECFADC)',
          }}
        >
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
                      title: `You Need to Add a New Location First`,
                    });
                  }
                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="locationID"
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
                  <TextField color="success" {...params} label="LocationID" />
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
                id="type"
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
                  <TextField color="success" {...params} label="Device Type" />
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
                id="model"
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
                  <TextField color="success" {...params} label="Model Number" />
                )}
              />
            </Box>

            <DialogActions>
              <Button variant="text" onClick={handleClose} color="success">
                Cancel
              </Button>
              <Button
                variant="outlined"
                type="submit"
                disabled={sent}
                color="success"
              >
                {sent ? 'Submitting…' : 'Submit'}
              </Button>
              <Button
                variant="outlined"
                onClick={handleRemove}
                disabled={sent}
                color="error"
              >
                {sent ? 'Submitting…' : 'Remove'}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
