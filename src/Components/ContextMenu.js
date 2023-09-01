import React from 'react'
import ContextButton from './ContextButton'
import Menu from '@mui/material/Menu';

export default function ContextMenu(props) {
  return (
    <Menu
        open={props.contextMenu !== null}
        onClose={props.handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          props.contextMenu !== null
            ? { top: props.contextMenu.mouseY+10, left: props.contextMenu.mouseX }
            : undefined
        }
      >

        <ContextButton onClick={props.handleClose} name='Remove Component' type='remove'/>
        <ContextButton onClick={props.handleClose} name='Remove Component'/>
      
    </Menu>
  )
}
