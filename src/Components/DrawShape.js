import React, { useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd/lib/';
import ComponentMenuBtn from './ComponentMenuBtn';

const DrawShape = (props) => {
  
  const minX = props.data.x;
  const minY = props.data.y;
  const width = props.data.width;
  const height = props.data.height;
  
  const removeComponent = (event) => {
    event.target.parentNode.parentNode.remove();
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
  const handleDragStop = () => {
    setIsDragging(false);
  };
  return (
    <Rnd default={{x: minX,y: minY,width: width,height: height,}} bounds="window" onDragStart={handleDragStart} onDragStop={handleDragStop}>
      <div ref={divRef} className={`${props.shape} shape pointer_event_all`} style={{width: '100%',height: '100%'}} onClick={props.onClick} onContextMenu={props.onRightClick}>
        <div className='resizers_container'>
          <div className='resizer top_left_resizer'></div>
          <div className='resizer top_right_resizer'></div>
          <div className='resizer bottom_left_resizer'></div>
          <div className='resizer bottom_right_resizer'></div>
        </div>
        <ComponentMenuBtn removeComponent={removeComponent} translate_pos={"translate_150_-150"}/>
      </div>
    </Rnd>
  );
};

export default DrawShape;
