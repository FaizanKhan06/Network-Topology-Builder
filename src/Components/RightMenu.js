import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import { styled } from '@mui/material/styles';
import IconsDictionary from './IconsDictionary';


const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          'white'
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: 'rgba(52,53,65,1)',
    width: 20,
    height: 20,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        'white'
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
}));

export default function RightMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [lightMode, setLightMode] = useState(true);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewModeToggle = (event) => {
    setViewMode(!viewMode);
    props.handleViewModeToggel(event);
  };

  const handleLightModeToggle = () => {
    setLightMode(!lightMode);
    props.handleThemeMenuClick();
  };

  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
    
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const uploadedData = JSON.parse(e.target.result);
        props.handleSetJsonData(uploadedData);
      };
      reader.readAsText(file);
    }
    handleClose(); 
    
  };

  return (
    <React.Fragment>
      <input id='diagram-name-field' type='text' placeholder='Enter Diagram Name' disabled={props.isViewMode} defaultValue={props.diagram_name}/>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center'}}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 , color: 'var(--menu_btn_color)', margin: '0px'}}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <IconsDictionary icon={"SettingsIcon"} sx={{ width: 32, height: 32 }} />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="menu-menu"
        open={open}
        onClose={handleClose}
        
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'auto',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            backgroundColor: 'White',
            color:'black',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => {handleClose(); props.handleNewMenuClick();}}>
          <ListItemIcon>
            <IconsDictionary icon={"NoteAddOutlinedIcon"} sx={{width:24,height:24}} />
          </ListItemIcon>
          New Page
        </MenuItem>
        <MenuItem onClick={() => {handleClose(); props.handleSaveMenuClick();}}>
          <ListItemIcon>
            <IconsDictionary icon={"SaveOutlinedIcon"} sx={{width:24,height:24}} />
          </ListItemIcon>
          Save Diagram
        </MenuItem>
        <MenuItem onClick={() => {handleButtonClick();}}>
          <ListItemIcon>
            <IconsDictionary icon={"FolderOpenOutlinedIcon"} sx={{width:24,height:24}} />
          </ListItemIcon>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileChange} style={{ display: 'none'}}/>
          Load Diagram
        </MenuItem>
        <Divider />
        <MenuItem>
          <FormControlLabel
            control={
              <Switch checked={viewMode} onChange={handleViewModeToggle} />
            }
            label="View Mode"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <MaterialUISwitch
                sx={{ m: 1, margin:'0px' }}
                checked={lightMode}
                onChange={handleLightModeToggle}
              />
            }
            label="Theme"
          />
        </MenuItem>
      </Menu>

      
    </React.Fragment>
  );
}
