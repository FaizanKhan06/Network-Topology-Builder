import React, { useEffect, useRef, useState } from 'react'
import { Rnd } from 'react-rnd/lib/';
import ComponentMenuBtn from './ComponentMenuBtn';

export default function NetWorkNode(props) {
  const [triggerEffect, setTriggerEffect] = useState(false);
  const removeComponent = (event) => {
    setTriggerEffect(true);
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
  const handleDragStop = () => {
    setIsDragging(false);
  };

  
  const connectPointRefT = useRef(null);
  const connectPointRefB = useRef(null);
  const connectPointRefL = useRef(null);
  const connectPointRefR = useRef(null);

  const [isEnter,setIsEnter] = useState({isEnter:false,ref:null,coord:{x:null,y:null}});
  const [pointCoord,setPointCoord] = useState({t:null,b:null,l:null,r:null});
  const CalculateLineEndPointCoord = (referenceVariable) => {
    const connectPointElement = referenceVariable.current;
    const drawableElement = document.getElementById('drawable');

    const connectPointRect = connectPointElement.getBoundingClientRect();
    const drawableRect = drawableElement.getBoundingClientRect();

    const leftPosition = (connectPointRect.left - drawableRect.left).toFixed();
    const topPosition = (connectPointRect.top - drawableRect.top).toFixed();

    return{x:leftPosition,y:topPosition};
  }
  const handleMouseEnter = (connectPointRef) => (event) => {
    const coord = CalculateLineEndPointCoord(connectPointRef);
    setIsEnter({isEnter:true,ref:connectPointRef,coord:coord});
  };
  const handleMouseLeave = () =>{
    setIsEnter({isEnter:false,ref:null,coord:{x:null,y:null}});
  }
  const handleOnDrag = () =>{
    const tPoint = CalculateLineEndPointCoord(connectPointRefT);
    const bPoint = CalculateLineEndPointCoord(connectPointRefB);
    const lPoint = CalculateLineEndPointCoord(connectPointRefL);
    const rPoint = CalculateLineEndPointCoord(connectPointRefR);
    setPointCoord({t:{point:tPoint,ref:connectPointRefT},b:{point:bPoint,ref:connectPointRefB},l:{point:lPoint,ref:connectPointRefL},r:{point:rPoint,ref:connectPointRefR}});
  }

  useEffect(() => {
    props.sendData(isEnter,pointCoord);
    // eslint-disable-next-line
  }, [isEnter,pointCoord,triggerEffect]);

  return (
    <>
    <Rnd default={{x: props.data.x,y: props.data.y}} bounds="window" enableResizing={false} disableDragging={false} onDragStart={(handleDragStart)} onDragStop={(handleDragStop)} onDrag={(handleOnDrag)}>
      <div ref={divRef} onContextMenu={props.onRightClick(divRef)} onClick={props.onClick} className='netWorkNode pointer_event_all selectedNetWorkNode'>
        <span className="material-symbols-outlined icon_space_side_bar pointer_event_none">
            { props.data.icon }
        </span>
        <div className='pointer_event_none'>{props.data.header+" "+props.data.name}</div>
        <div className='line_holder_for_node pointer_event_none'>
          <div className='top_node nodes_line pointer_event_all' ref={connectPointRefT} onMouseEnter={handleMouseEnter(connectPointRefT)} onMouseLeave={handleMouseLeave}></div>
          <div className='bottom_node nodes_line pointer_event_all' ref={connectPointRefB} onMouseEnter={handleMouseEnter(connectPointRefB)} onMouseLeave={handleMouseLeave}></div>
          <div className='left_node nodes_line pointer_event_all' ref={connectPointRefL} onMouseEnter={handleMouseEnter(connectPointRefL)} onMouseLeave={handleMouseLeave}></div>
          <div className='right_node nodes_line pointer_event_all' ref={connectPointRefR} onMouseEnter={handleMouseEnter(connectPointRefR)} onMouseLeave={handleMouseLeave}></div>
        </div>
        <ComponentMenuBtn removeComponent={removeComponent} translate_pos={"translate_80_-80"}/>
      </div>
    </Rnd>
    </>
  )
}