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
} from '@mui/material';
import axios from 'axios';

const filter = createFilterOptions();

export default function AddLocation({ Address, Sq, Bed, Occup, Zip }) {
  const [address, setAddress] = React.useState(null);
  const [sq, setSq] = React.useState(null);
  const [bed, setBed] = React.useState(null);
  const [occup, setOccup] = useState(false);
  const [zip, setZip] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addLocation = async () => {
    console.log([Address, Sq, Bed, Occup, Zip]);
    try {
      const response = await axios.post(
        `http://localhost:8800/addLocation`,
        {
          ZipCode: zip.title,
          Address: address.title,
          SquareFootage: sq.title,
          NumberOfBedrooms: bed.title,
          NumberOfOccupants: occup.title,
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

  const removeAll = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8800/removeAll`,
        {
          Address: address.title,
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

  const removeLocation = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8800/removeLocation`,
        {
          Address: address.title,
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
    console.log('click submit');

    try {
      await addLocation(); // Wait for addDevice to complete
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
      await removeAll(); // Wait for addDevice to complete
      setSent(true);
      handleClose();
      // Refresh the page or update component state here
      await removeLocation();
      window.location.reload();
    } catch (error) {
      // Handle error (e.g., show error message in the UI)
    }
  };

  const l = [
    { title: '1' },
    { title: '2' },
    { title: '3' },
    { title: '4' },
    { title: '5' },
    { title: '6' },
  ];

  return (
    <div>
      <Button onClick={handleClickOpen} variant="contained" color="success">
        <Box sx={{ fontWeight: 'medium' }}> Location</Box>
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
                value={Address}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'string') {
                    setAddress({
                      title: newValue,
                    });
                  } else if (newValue && newValue.inputValue) {
                    setAddress({
                      title: newValue.inputValue,
                    });
                  } else {
                    setAddress(newValue);
                  }
                  console.log(address);
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
                id="address"
                options={Address ? Address : l}
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
                  <TextField color="success" {...params} label="Address" />
                )}
              />
            </Box>
            <Box sx={{ mt: 1 }}>
              <Autocomplete
                value={Sq}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'string') {
                    setSq({
                      title: newValue,
                    });
                  } else if (newValue && newValue.inputValue) {
                    setSq({
                      title: newValue.inputValue,
                    });
                  } else {
                    setSq(newValue);
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
                id="SquareFootage"
                options={Sq ? Sq : l}
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
                  <TextField
                    color="success"
                    {...params}
                    label="Square Footage"
                  />
                )}
              />
            </Box>
            <Box sx={{ mt: 1 }}>
              <Autocomplete
                value={Bed}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'string') {
                    setBed({
                      title: newValue,
                    });
                  } else if (newValue && newValue.inputValue) {
                    setBed({
                      title: newValue.inputValue,
                    });
                  } else {
                    setBed(newValue);
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
                id="NumberOfBedrooms"
                options={Bed ? Bed : l}
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
                  <TextField
                    color="success"
                    {...params}
                    label="Number Of Bedroom"
                  />
                )}
              />
            </Box>
            <Box sx={{ mt: 1 }}>
              <Autocomplete
                value={Occup}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'string') {
                    setOccup({
                      title: newValue,
                    });
                  } else if (newValue && newValue.inputValue) {
                    setOccup({
                      title: newValue.inputValue,
                    });
                  } else {
                    setOccup(newValue);
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
                id="NumberOfOccupants"
                options={Occup ? Occup : l}
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
                  <TextField
                    color="success"
                    {...params}
                    label="Number Of Occupants"
                  />
                )}
              />
            </Box>
            <Box sx={{ mt: 1 }}>
              <Autocomplete
                value={Zip}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'string') {
                    setZip({
                      title: newValue,
                    });
                  } else if (newValue && newValue.inputValue) {
                    setZip({
                      title: newValue.inputValue,
                    });
                  } else {
                    setZip(newValue);
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
                id="ZipCode"
                options={Zip ? Zip : l}
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
                  <TextField color="success" {...params} label="ZipCode" />
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
