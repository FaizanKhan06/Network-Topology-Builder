import React from 'react'
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));
export default function ViewDeviceDetailsDialogue(props) {
  const handleClose = () => {
    props.onClose();
  };
  return (
    <Dialog onClose={handleClose} open={props.open} >
      <DialogTitle>Node Details</DialogTitle>
      <Demo>
        <List>
          <ListItem>
            <ListItemText primary={"Name = "+props.name} />
          </ListItem>
        </List>
      </Demo>
      <Divider />
      <Demo>
        <List>
          <ListItem>
            <ListItemText primary={"Type = "+props.type} />
          </ListItem>
        </List>
      </Demo>
      <Divider />
      <Demo>
        <List>
          <ListItem>
            <ListItemText primary={"X-Coord = "+props.x} />
          </ListItem>
        </List>
      </Demo>
      <Divider />
      <Demo>
        <List>
          <ListItem>
            <ListItemText primary={"Y-Coord = "+props.y}/>
          </ListItem>
        </List>
      </Demo>
    </Dialog>
  )
}
