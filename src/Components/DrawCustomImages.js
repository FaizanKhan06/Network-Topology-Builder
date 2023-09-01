import React, { useEffect, useRef, useState } from 'react'
import { Rnd } from 'react-rnd/lib/';

import Menu from '@mui/material/Menu';
import ContextButton from './ContextButton';

import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import { MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function DrawCustomImages(props) {

    const divRef = useRef(null);

    const removeComponent = (event) => {
        divRef.current.parentNode.remove();
    }

    const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    divRef.current.parentNode.classList.add("pointer_event_all");
    if(isDragging){
      divRef.current.classList.remove("cursor_move");
      divRef.current.classList.add("cursor_move");
    }else{
      divRef.current.classList.remove("cursor_move");
      divRef.current.classList.add("cursor_move");
    }
  }, [isDragging]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const [coords,setCoords] = useState({x:JSON.parse(props.data.x),y:JSON.parse(props.data.y)});
  const [size,setSize] = useState({width:JSON.parse(props.data.width),height:JSON.parse(props.data.height)});
  const handleDragStop = (e,d) => {
    setIsDragging(false);
    setCoords({x:d.x,y:d.y});
  };
  const handleResizeStop = (e, direction, ref, delta, position) => {
    setSize({width:ref.offsetWidth,height:ref.offsetHeight});
    setCoords({x:position.x,y:position.y});
  };

  const [contextMenu, setContextMenu] = React.useState(null);
  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : 
          null,
    );
  };
  const handleClose = () => {
    setContextMenu(null);
  };

  const [imageOpacity,setImageOpacity] = useState(JSON.parse(props.data.opacity))
  const sliderChange = (event) => {
    setImageOpacity(event.target.value)
  };
  return (
    <>
      <Rnd default={{x: JSON.parse(props.data.x),y: JSON.parse(props.data.y),width: JSON.parse(props.data.width),height: JSON.parse(props.data.height),}} disableDragging={props.isViewMode} enableResizing={!props.isViewMode} bounds="window" onDragStart={handleDragStart} onDragStop={handleDragStop} onResizeStop={handleResizeStop}>
        <div data-x={coords.x} data-y={coords.y} data-width={size.width} data-height={size.height} data-imageurl={props.data.imageurl} data-opacity={imageOpacity}
            className='custom_image' ref={divRef} style={{width:'100%',height:'100%',pointerEvents:props.isViewMode?'none':'all',border:(!props.isViewMode)?'1px dashed orange':'none'}} onContextMenu={handleContextMenu} onClick={props.onClick}>
          <img style={{width:'100%',height:'100%', opacity:imageOpacity,pointerEvents:'none'}} draggable="false"
            src={props.data.imageurl}
            alt="Error"
          />
        </div>
      </Rnd>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu !== null? { top: contextMenu.mouseY+10, left: contextMenu.mouseX }: undefined}
      >
        <MenuItem>
        <Box sx={{width:'100%'}}>
            <Typography gutterBottom>
                Opacity
            </Typography>
            <Slider
                aria-label="default"
                defaultValue={JSON.parse(props.data.opacity)}
                min={0.1}
                max={1}
                step={0.1}
                onChange={sliderChange}
                valueLabelDisplay="auto"
            />
        </Box>
        </MenuItem>


        <Divider/>
        <ContextButton handleClose={handleClose} handleClickEvent={removeComponent} name='Remove Component' type='remove'/>
      
      </Menu>
    </>
  )
}


DrawCustomImages.defaultProps = {
    imageOpacity: 1,
  };
