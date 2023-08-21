import React, { useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd/lib/';
import ComponentMenuBtn from './ComponentMenuBtn';

const SmoothBezierCurve = (props) => {

  const startXY = useRef(null);
  const endXY = useRef(null);
  const closeBtn = useRef(null);
  const svg_draw = useRef(null);

  const [sx,setSX] = useState(props.data.startX);
  const [sy,setSY] = useState(props.data.startY);

  const [ex,setEX] = useState(props.data.endX);
  const [ey,setEY] = useState(props.data.endY);

  // eslint-disable-next-line
  const [sd,setSd] = useState(props.startDirection);
  // eslint-disable-next-line
  const [ed,setEd] = useState(props.endDirection);


  var controlX1,controlY1,controlX2,controlY2;
  if(sd && ed){
    controlX1 = sx + (ex - sx) / 3 * (sd === 'right' ? 1 : -1);
    controlY1 = sy + (ey - sy) / 3 * (sd === 'bottom' ? 1 : -1);
    controlX2 = ex - (ex - sx) / 3 * (ed === 'left' ? 1 : -1);
    controlY2 = ey - (ey - sy) / 3 * (ed === 'top' ? 1 : -1);
  }else if(sd){
    controlX1 = sx + (ex - sx) / 3 * (sd === 'right' ? 1 : -1);
    controlY1 = sy + (ey - sy) / 3 * (sd === 'bottom' ? 1 : -1);
    controlX2 = ex - (ex - sx) / 3;
    controlY2 = ey;
  }else if(ed){
    controlX1 = sx + (ex - sx) / 3;
    controlY1 = sy;
    controlX2 = ex - (ex - sx) / 3 * (ed === 'left' ? 1 : -1);
    controlY2 = ey - (ey - sy) / 3 * (ed === 'top' ? 1 : -1);
  }else{
    controlX1 = sx + (ex - sx) / 3;
    controlY1 = sy;
    controlX2 = ex - (ex - sx) / 3;
    controlY2 = ey;
  }

  const midX = ((sx + ex) / 2);
  const midY = ((sy + ey) / 2);

  const d = `M ${sx} ${sy} ${props.isCurved?`C ${controlX1} ${controlY1}, ${controlX2} ${controlY2},`:''} ${ex} ${ey}`;

  //Recent Start
  //HandeOnDrag Event Start
  const handleOnDrag = (name="") => (e,d) => {
    if(name !== ""){
      EndPointDragged(name,d) 
    }
    line_end_point_drag_start(e,d);
  };
  const EndPointDragged = (customParam,d) => {
    if(customParam==="StartPoint"){
      setSX(d.x);
      setSY(d.y);
    }else if(customParam==="EndPoint"){
      setEX(d.x);
      setEY(d.y);
    }
  };
  const [startPos, setStartPos] = useState({ x: sx, y: sy });
  const [endPos, setEndPos] = useState({ x: ex, y: ey });
  const line_end_point_drag_start = (customParam,d) => {
    if(customParam==="StartPoint"){
      setStartPos({ x: d.x, y: d.y });
    }else if(customParam==="EndPoint"){
      setEndPos({ x: d.x, y: d.y });
    }
  };
  //HandeOnDrag Event End

  const CalculateLineEndPointCoord = (referenceVariable) => {
    const connectPointElement = referenceVariable.current;
    const drawableElement = document.getElementById('drawable');

    const connectPointRect = connectPointElement.getBoundingClientRect();
    const drawableRect = drawableElement.getBoundingClientRect();

    const leftPosition = (connectPointRect.left - drawableRect.left).toFixed();
    const topPosition = (connectPointRect.top - drawableRect.top).toFixed();

    return{x:leftPosition,y:topPosition};
  }
  //HandleOnDragStop Event Start
  const [isStartPointAttached,setIsStartPointAttached] = useState(false);
  const [startPointAttachedPos,setStartPointAttachedPos] = useState();
  const [startPointAttachedRef,setStartPointAttachedRef] = useState();

  const [isEndPointAttached,setIsEndPointAttached] = useState(false);
  const [endPointAttachedPos,setEndPointAttachedPos] = useState();
  const [endPointAttachedRef,setEndPointAttachedRef] = useState();

  const handleOnDragStop = (customParam) => (e,d) => {
    if(customParam==="StartPoint"){
      if(props.networkNodeData && props.networkNodeData[0].isEnter){
        if(!isStartPointAttached){
          setStartPointAttachedRef(props.networkNodeData[0].ref);
          setIsStartPointAttached(props.networkNodeData[0].isEnter);
          const pointCoord = CalculateLineEndPointCoord(props.networkNodeData[0].ref);
          setStartPointAttachedPos(pointCoord);
        }
      }
      if(!isStartPointAttached){
        setStartPos({ x: d.x, y: d.y });
      }
    }
    
    else if(customParam==="EndPoint"){
      if(props.networkNodeData && props.networkNodeData[0].isEnter){
        if(!isEndPointAttached){
          setEndPointAttachedRef(props.networkNodeData[0].ref);
          setIsEndPointAttached(props.networkNodeData[0].isEnter);
          const pointCoord = CalculateLineEndPointCoord(props.networkNodeData[0].ref);
          setEndPointAttachedPos(pointCoord);
        }
      }
      if(!isEndPointAttached){
        setEndPos({ x: d.x, y: d.y });
      }
    }
  };
  //HandleOnDragStop Event Stop
  
  useEffect(() => {
    if(isStartPointAttached){
      const pointCoord = CalculateLineEndPointCoord(startPointAttachedRef);
      setStartPointAttachedPos(pointCoord);
      setSX(parseInt(pointCoord.x));
      setSY(parseInt(pointCoord.y));
    }
    if(isEndPointAttached){
      const pointCoord = CalculateLineEndPointCoord(endPointAttachedRef);
      setEndPointAttachedPos(pointCoord);
      setEX(parseInt(pointCoord.x));
      setEY(parseInt(pointCoord.y));
    }
    if(startPointAttachedRef && startPointAttachedRef.current && !document.contains(startPointAttachedRef.current)){
      setStartPointAttachedRef(null);
      setIsStartPointAttached(false);
      setStartPos(startPointAttachedPos)
      setSX(parseFloat(startPointAttachedPos.x));
      setSY(parseFloat(startPointAttachedPos.y));
    }
    if(endPointAttachedRef && endPointAttachedRef.current && !document.contains(endPointAttachedRef.current)){
      setEndPointAttachedRef(null);
      setIsEndPointAttached(false);
      setEndPos(endPointAttachedPos)
      setEX(parseFloat(endPointAttachedPos.x));
      setEY(parseFloat(endPointAttachedPos.y));
    }
    // eslint-disable-next-line
  }, [props.networkNodeData]);
  //Recent End

  const removeComponent = (event) => {
    svg_draw.current.remove();
    startXY.current.parentNode.remove();
    endXY.current.parentNode.remove();
    closeBtn.current.remove();
  }

  const handleRightClickOnLine = (event) => {
    event.preventDefault();
    closeBtn.current.classList.add("selectedShape");
  }

    return (
    <>
        <svg ref={svg_draw}  width="100%" height="100%" style={{position:"absolute",top:"0px",left:"0px",pointerEvents:"none", transform: "translate(8px, 8px)"}}>
          <path className='line cursor_pointer pointer_event_all' d={d} onContextMenu={handleRightClickOnLine}/>
        </svg>
        <Rnd default={{x: sx,y: sy}} position={(isStartPointAttached)?startPointAttachedPos:startPos} disableDragging={isStartPointAttached} bounds="window" enableResizing={false} onDrag={handleOnDrag("StartPoint")} onDragStop={handleOnDragStop("StartPoint")}>
          <div ref={startXY} className='line_end_points cursor_crosshair pointer_event_all'></div>
        </Rnd>
        <Rnd default={{x: ex,y: ey}} position={(isEndPointAttached)?endPointAttachedPos:endPos} disableDragging={isEndPointAttached} bounds="window" enableResizing={false} onDrag={handleOnDrag("EndPoint")} onDragStop={handleOnDragStop("EndPoint")}>
          <div ref={endXY} className='line_end_points cursor_crosshair pointer_event_all'></div>
        </Rnd>
        <ComponentMenuBtn ref={closeBtn} style={{left:midX,top:midY,right:"auto", transform:"none"}} removeComponent={removeComponent} translate_pos={"translate_150_-150"}/>
    </>
  );
};

export default SmoothBezierCurve;