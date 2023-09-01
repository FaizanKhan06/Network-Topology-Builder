import React, { useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd/lib/';

import Menu from '@mui/material/Menu';
import ContextButton from './ContextButton';

import ContextMenuSelect from './ContextMenuSelect';
import Divider from '@mui/material/Divider';

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

  const [coords,setCoords] = useState({x:JSON.parse(props.data.x),y:JSON.parse(props.data.y)});
  const [size,setSize] = useState({width:JSON.parse(props.data.width),height:JSON.parse(props.data.height)});

  const handleDragStart = () => {
    setIsDragging(true);
  };
  const handleDragStop = (e,d) => {
    setIsDragging(false);
    setCoords({x:d.x,y:d.y});
  };
  const handleResizeStop = (e, direction, ref, delta, position) => {
    setSize({width:ref.offsetWidth,height:ref.offsetHeight});
    setCoords({x:position.x,y:position.y});
  };


  const removeComponent = (event) => {
    divRef.current.parentNode.remove();
  }

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


  const background = {
    color:'var(--primary_color2)',
    backgroundColor:'var(--menu_btn_color)',
  }
  const non_background = {
    color:'var(--menu_btn_color)',
    backgroundColor:'transparent',
  };

  const [selectedTextBoxStyleOption,setSelectedTextBoxStyleOption] = useState(props.data.boxstyle);
  const [selectedTextboxStyle, setSelectedTextBoxStyle] = useState((props.data.boxstyle==='background')?background:non_background);
  const TextBoxStyle = [
    { value: 'background', label: 'With Background' },
    { value: 'non_background', label: 'Without Background' },
  ];
  const handleDataFromTextBoxStyle = (data) => {
    setSelectedTextBoxStyleOption(data);
    if(data==='background') setSelectedTextBoxStyle(background);
    else setSelectedTextBoxStyle(non_background);
  };
  
  const [alignText,setAlignText] = useState(props.data.alignment);
  const Alignment = [
    { value: 'leftAlignText', label: 'Left' },
    { value: 'centerAlignText', label: 'Center' },
    { value: 'rightAlignText', label: 'Right' },
  ];
  const handleDataFromAlignmentStyle = (data) => {
    setAlignText(data);
  };

  return (
    <Rnd default={{x: coords.x,y: coords.y, width: size.width, height: size.height}} bounds="window" disableDragging={props.isViewMode} enableResizing={!props.isViewMode} onDragStart={handleDragStart} onDragStop={handleDragStop} onResizeStop={handleResizeStop}>
      <div ref={divRef} style={{width:"100%",height:"100%",display:'flex'}} onContextMenu={handleContextMenu}>
        <textarea data-x={coords.x} data-y={coords.y} data-width={size.width} data-height={size.height} data-alignment={alignText} data-boxstyle={selectedTextBoxStyleOption} data-text={inputValue}
                  style={Object.assign({}, selectedTextboxStyle, {border:(props.isViewMode)?'none':'1px dashed gray'})} ref={cursor_ref} type='text' placeholder='Enter Text' onClick={props.onClick} className={`draw_textBox ${alignText} ${(props.isViewMode)?'pointer_event_none':'pointer_event_all'}`} value={inputValue} onChange={handleInputChange}/>
      </div>
      { !props.isViewMode?
        <Menu
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={contextMenu !== null? { top: contextMenu.mouseY+10, left: contextMenu.mouseX }: undefined}
        >

          <ContextMenuSelect sx={{width:210}} heading={'Design'} options={TextBoxStyle} selectedOption={selectedTextBoxStyleOption} sendDataToParent={handleDataFromTextBoxStyle}/>
          <ContextMenuSelect sx={{width:210}} heading={'Alignment'} options={Alignment} selectedOption={alignText} sendDataToParent={handleDataFromAlignmentStyle}/>
          <Divider/>
          <ContextButton handleClose={handleClose} handleClickEvent={removeComponent} name='Remove Component' type='remove'/>
        
        </Menu>
        :
        ''
      }
    </Rnd>
  );
};

