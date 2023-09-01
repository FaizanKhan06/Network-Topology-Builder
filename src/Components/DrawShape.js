import React, { useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd/lib/';

import Menu from '@mui/material/Menu';
import ContextButton from './ContextButton';

const DrawShape = (props) => {
  
  const minX = JSON.parse(props.data.x);
  const minY = JSON.parse(props.data.y);
  const width = JSON.parse(props.data.width);
  const height = JSON.parse(props.data.height);
  
  const removeComponent = (event) => {
    divRef.current.parentNode.remove();
  }
  
  const divRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    divRef.current.parentNode.classList.add("pointer_event_all");
    if(isDragging){
      divRef.current.classList.remove("cursor_grab");
      divRef.current.classList.add("cursor_grabbing");
    }else{
      divRef.current.classList.remove("cursor_grabbing");
      divRef.current.classList.add("cursor_grab");
    }
  }, [isDragging]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const [coords,setCoords] = useState({x:minX,y:minY});
  const [size,setSize] = useState({width:width,height:height});
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



  return (
    <Rnd default={{x: minX,y: minY,width: width,height: height,}} disableDragging={props.isViewMode} enableResizing={!props.isViewMode} bounds="window" onDragStart={handleDragStart} onDragStop={handleDragStop} onResizeStop={handleResizeStop}>
      <div data-x={coords.x} data-y={coords.y} data-width={size.width} data-height={size.height}
           ref={divRef} className={`${props.shape} shape ${(props.isViewMode)?'pointer_event_none':'pointer_event_all'}`} style={{width: '100%',height: '100%'}} onClick={props.onClick} onContextMenu={handleContextMenu}>
        <div className='resizers_container'>
          <div className='resizer top_left_resizer'></div>
          <div className='resizer top_right_resizer'></div>
          <div className='resizer bottom_left_resizer'></div>
          <div className='resizer bottom_right_resizer'></div>
        </div>
      </div>

      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu !== null? { top: contextMenu.mouseY+10, left: contextMenu.mouseX }: undefined}
      >

        <ContextButton handleClose={handleClose} handleClickEvent={removeComponent} name='Remove Component' type='remove'/>
      
      </Menu>

    </Rnd>
  );
};

export default DrawShape;
