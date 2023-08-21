import React, { useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd/lib/';
import ComponentMenuBtn from './ComponentMenuBtn';

export default function DrawTextBox(props){

  const [inputValue, setInputValue] = useState(props.data.text);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  
  const divRef = useRef(null);
  const cursor_ref = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    divRef.current.parentNode.classList.add("pointer_event_all");
    
    if(isDragging){
      cursor_ref.current.classList.remove("cursor_grab");
      cursor_ref.current.classList.add("cursor_grabbing");
    }else{
      cursor_ref.current.classList.remove("cursor_grabbing");
      cursor_ref.current.classList.add("cursor_grab");
    }
  }, [isDragging]);

  const handleDragStart = () => {
    setIsDragging(true);
  };
  const handleDragStop = () => {
    setIsDragging(false);
  };


  const removeComponent = (event) => {
    divRef.current.parentNode.remove();
  }

  const [alignText,setAlignText] = useState(props.textAlign);
  const leftAlignComponent = (event) => {
    setAlignText("leftAlignText")
  }
  const centerAlignComponent = (event) => {
    setAlignText("centerAlignText")
  }
  const rightAlignComponent = (event) => {
    setAlignText("rightAlignText")
  }

  return (
    <Rnd default={{x: props.data.x,y: props.data.y, width: props.data.width, height: props.data.height}} bounds="window" enableResizing={true} onDragStart={handleDragStart} onDragStop={handleDragStop}>
      <div ref={divRef} style={{width:"100%",height:"100%",display:'flex'}} onContextMenu={props.onRightClick}>
        <textarea ref={cursor_ref} type='text' placeholder='Enter Text' onClick={props.onClick} className={`draw_textBox ${alignText}`} value={inputValue} onChange={handleInputChange}/>
        <ComponentMenuBtn removeComponent={removeComponent} translate_pos={"translate_80_-80"}/>
        <ComponentMenuBtn removeComponent={leftAlignComponent} btn_icon={"format_align_left"} translate_pos={"translate_80_-50"}/>
        <ComponentMenuBtn removeComponent={centerAlignComponent} btn_icon={"format_align_center"} translate_pos={"translate_80_-20"}/>
        <ComponentMenuBtn removeComponent={rightAlignComponent} btn_icon={"format_align_right"} translate_pos={"translate_80_10"}/>
      </div>
    </Rnd>
  );
};

