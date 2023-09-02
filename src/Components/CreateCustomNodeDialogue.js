import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconsDictionary from './IconsDictionary';
import iconsDictionary from '../JsonFiles/IconDictionaryFile';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CreateCustomNodeDialogue(props) {
  const [name, setName] = useState(props.name);
  const [icon, setIcon] = useState(props.icon);
  const [index, setIndex] = useState(props.index);

  useEffect(() => {
    setName(props.name);
    setIcon(props.icon);
    setIndex(props.index);
  }, [props.name,props.icon,props.index]);

  const handleChange = (event) => {
    setIcon(event.target.value);
  };

  return (
      <BootstrapDialog
        onClose={props.closeDialogue}
        aria-labelledby="customized-dialog-title"
        open={props.openDialogue.open}
      >
        <form onSubmit={(event) => props.handleFormSubmit(event,name,icon,index)}>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Create Custom Node
          </DialogTitle>
          <DialogContent dividers>
            <Box
              sx={{
                display: 'flex',
                border:'none',
                alignItems: 'center',
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              component="fieldset"
            >
              <FormControl size="small" required>
                <InputLabel id="demo-simple-select-label">Icon</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={icon}
                  label="Icon"
                  onChange={handleChange}
                  sx={{
                    '& .MuiSelect-select': { display: 'flex', alignItems: 'center' },
                  }}
                >
                {
                  Object.entries(iconsDictionary).map(([iconName, { component }]) => (
                  <MenuItem key={iconName} value={iconName}>
                    <IconsDictionary icon={iconName} sx={{ width: 18, height: 18 }} />
                  </MenuItem>
                ))}
                </Select>
              </FormControl>

              <TextField
                size="small"
                required
                id="outlined-required"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button // Change the button type to "submit"
                sx={{ textTransform: 'none' , marginRight:1}}
                variant="contained"
              >
                 Edit Nodal Structure
              </Button>
              <Button
                type="submit" // Change the button type to "submit"
                sx={{ textTransform: 'none' }}
                variant="contained"
              >
                Save
              </Button>
            </Box>
          </DialogContent>
        </form>
        <DialogActions>
          <Button autoFocus onClick={props.closeDialogue}>
            Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
  );
}
