import React, { useState } from 'react';
import SmoothBezierCurve from './SmoothBezierCurve';
import DrawShape from './DrawShape';
import DrawTextBox from './DrawTextBox';
import NetWorkNode from './NetWorkNode';

export default function DrawArea(props) {
  const selectedShape = (event) => {
    const resizers_container = event.target.children[0];
    if(resizers_container && !resizers_container.classList.contains("selectedShape") && event.target.classList.contains("shape")){
      const allSelectedShape = document.getElementsByClassName("selectedShape");
      for (let index = 0; index < allSelectedShape.length; index++) {
        const element = allSelectedShape[index];
        element.classList.remove("selectedShape");
      }
      resizers_container.classList.add('selectedShape');
    }
  }

  const selectedNetworkNode = (event) => {
    const resizers_container = event.target;
    if(resizers_container && !resizers_container.classList.contains("selectedNetWorkNode") && event.target.classList.contains("netWorkNode")){
      const allSelectedShape = document.getElementsByClassName("selectedNetWorkNode");
      for (let index = 0; index < allSelectedShape.length; index++) {
        const element = allSelectedShape[index];
        element.classList.remove("selectedNetWorkNode");
      }
      resizers_container.classList.add('selectedNetWorkNode');
    }
  }

  const selectedTextBox = (event) => {
    const resizers_container = event.target;
    if(resizers_container && !resizers_container.classList.contains("selectedTextBox") && event.target.classList.contains("draw_textBox")){
      const allSelectedShape = document.getElementsByClassName("selectedTextBox");
      for (let index = 0; index < allSelectedShape.length; index++) {
        const element = allSelectedShape[index];
        element.classList.remove("selectedTextBox");
      }
      resizers_container.classList.add('selectedTextBox');
    }
  }

  document.addEventListener('click', event => {
    if (!event.target.closest('.shape')) {
      const allSelectedShape = document.getElementsByClassName("selectedShape");
      for (let index = 0; index < allSelectedShape.length; index++) {
        const element = allSelectedShape[index];
        element.classList.remove("selectedShape");
      }
    }

    if (!event.target.closest('.shape')) {
      const allSelectedShape = document.getElementsByClassName("rightClickComponet");
      for (let index = 0; index < allSelectedShape.length; index++) {
        const element = allSelectedShape[index];
        element.classList.remove("rightClickComponet");
      }
    }

    if (!event.target.closest('.netWorkNode')) {
      const allSelectedShape = document.getElementsByClassName("selectedNetWorkNode");
      for (let index = 0; index < allSelectedShape.length; index++) {
        const element = allSelectedShape[index];
        element.classList.remove("selectedNetWorkNode");
      }
    }

    if (!event.target.closest('.draw_textBox')) {
      const allSelectedShape = document.getElementsByClassName("selectedTextBox");
      for (let index = 0; index < allSelectedShape.length; index++) {
        const element = allSelectedShape[index];
        element.classList.remove("selectedTextBox");
      }
    }
  });
  
  const handleRightClickOnShape = (event) => {
    event.preventDefault();
    event.target.children[1].classList.add("selectedShape");
  }

  const handleRightClickOnDrawDiv = (event) => {
    event.preventDefault();
  }
  
  const handleRightClickOnTextBox = (event) => {
    event.preventDefault();
    event.target.parentNode.children[1].classList.add("rightClickComponet");
    event.target.parentNode.children[2].classList.add("rightClickComponet");
    event.target.parentNode.children[3].classList.add("rightClickComponet");
    event.target.parentNode.children[4].classList.add("rightClickComponet");
  }

  const handleRightClickOnNetworkNode = (divRef) => (event) => {
    event.preventDefault();
    divRef.current.children[3].classList.add("selectedShape");
  }


  const [networkNodeData, setNetworkNodeData] = useState(null);
  const handleSendDataFromNetworkNode = (param1,param2) => {
    setNetworkNodeData([param1,param2]);
  };

  return (
    <>
        <div className='draw_area' id='drawable' onContextMenu={handleRightClickOnDrawDiv} onDrop={props.handleDrop} onDragOver={props.handleDragOver} onDragEnter={props.handleDragEnter} onDragLeave={props.handleDragLeave}>

          <div className='container_elements pointer_event_none' id='rect_container'>
            {props.addRect.map(data => (
              <DrawShape key={data.key} data={data} shape={"draw_rect"} onClick={selectedShape} onRightClick={handleRightClickOnShape}/>
            ))}
          </div>

          <div className='container_elements pointer_event_none' id='circle_container'>
            {props.addCircle.map(data => (
              <DrawShape key={data.key} data={data} shape={"draw_circle"} onClick={selectedShape} onRightClick={handleRightClickOnShape}/>
            ))}
          </div>

          <div className='container_elements pointer_event_none' id='line_container'>
            {props.addLine.map(data => (
              <SmoothBezierCurve key={data.key} data={data} isCurved={true} networkNodeData={networkNodeData}/>
            ))}
          </div>
          <div className='container_elements pointer_event_none' id='straingLine_container'>
            {props.addStraingtLine.map(data => (
              <SmoothBezierCurve key={data.key} data={data} isCurved={false} networkNodeData={networkNodeData}/>
            ))}
          </div>

          <div className='container_elements pointer_event_none' id='textBox_container'>
            {props.addTextBox.map(data => (
              <DrawTextBox key={data.key} data={data} onRightClick={handleRightClickOnTextBox} onClick={selectedTextBox} textAlign={'centerAlignText'}/>
            ))}
          </div>

          <div className='container_elements pointer_event_none' id='netWorkNode_container'>
            {props.addNetWorkNode.map(data => (
              <NetWorkNode key={data.key} data={data} onRightClick={handleRightClickOnNetworkNode} onClick={selectedNetworkNode} sendData={handleSendDataFromNetworkNode}/>
            ))}
          </div>

        </div>
    </>
  )
}
