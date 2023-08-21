import React, { useState } from 'react';
import MenuBtn from './MenuBtn';

export default function MenuArea(props) {
  const [theme, setTheme] = useState(["Dark Mode", "dark_mode"]);

  const CalculateLineEndPointCoord = (referenceVariable) => {
    const connectPointElement = referenceVariable;
    const drawableElement = document.getElementById('drawable');

    const connectPointRect = connectPointElement.getBoundingClientRect();
    const drawableRect = drawableElement.getBoundingClientRect();

    const leftPosition = (connectPointRect.left - drawableRect.left).toFixed();
    const topPosition = (connectPointRect.top - drawableRect.top).toFixed();

    return{x:leftPosition,y:topPosition};
  }

  const getElementCoordinates = (element,xy = false) => {
    const transformStyle = window.getComputedStyle(element).transform;
    const matrix = new DOMMatrixReadOnly(transformStyle);
    const x = matrix.m41;
    const y = matrix.m42;

    const width = element.offsetWidth;
    const height = element.offsetHeight;

    if(xy){
      return {
        x,
        y,
      };
    }else{
      return {
        x,
        y,
        width,
        height,
      };
    }
  };
  const pushDataToJson = (id,jsonObj,xy = false) => {
    const container = document.getElementById(id);
    const container_children = container.children;
    for (let i = 0; i < container_children.length; i++) {
      const child = container_children[i];
      const elementCoord = getElementCoordinates(child);
      let elementInfo = Object.assign({}, elementCoord , {key:i});
      if(xy){
        const TextBoxValue = String(child.children[0].children[0].value);
        elementInfo = Object.assign({}, elementCoord, {key:i,text:TextBoxValue});
      }
      jsonObj.push(elementInfo);
    }
  };
  const pushDataToJsonNetworkNodes = (id,jsonObj) => {
    const container = document.getElementById(id);
    const container_children = container.children;
    for (let i = 0; i < container_children.length; i++) {
      const child = container_children[i];
      const childChild = child.children[0];
      
      const childChildChildConnectPointContainer = childChild.children[2];
      const top = CalculateLineEndPointCoord(childChildChildConnectPointContainer.children[0]);
      const bottom = CalculateLineEndPointCoord(childChildChildConnectPointContainer.children[1]);
      const left = CalculateLineEndPointCoord(childChildChildConnectPointContainer.children[2]);
      const right = CalculateLineEndPointCoord(childChildChildConnectPointContainer.children[3]);

      const text = childChild.children[1].innerHTML.split(" ");
      const elementCoord = getElementCoordinates(child,true);
      const icon = childChild.children[0].innerHTML;
      const header = text[0];
      const name = text[1];
      const elementInfo = Object.assign({}, elementCoord, {key:i,icon:icon,header:header,name:name,top:top,bottom:bottom,left:left,right:right});
      jsonObj.push(elementInfo)
    }
  };
  const pushDataToJsonLines = (id,jsonObj) => {
    const container = document.getElementById(id);
    const container_children = container.children;
    for (let i = 0; i < container_children.length; i+=4) {
      const startPoint = container_children[i+1];
      const endPoint = container_children[i+2];
      const elementCoordStart = getElementCoordinates(startPoint);
      const elementCoordEnd = getElementCoordinates(endPoint);
      const elementInfo = {key:i,startX:elementCoordStart.x,startY:elementCoordStart.y,endX:elementCoordEnd.x,endY:elementCoordEnd.y};
      jsonObj.push(elementInfo)
    }
  };
  const handleSaveMenuClick = () => {
    const jsonFormat = {"rectangle":[],"circle":[],"line":[],"straightLine":[],"textBox":[],"networkNodes":[]};
    pushDataToJson("rect_container",jsonFormat.rectangle);
    pushDataToJson("circle_container",jsonFormat.circle);
    pushDataToJson("textBox_container",jsonFormat.textBox, true);
    pushDataToJsonNetworkNodes("netWorkNode_container",jsonFormat.networkNodes);
    pushDataToJsonLines("line_container",jsonFormat.line);
    pushDataToJsonLines("straingLine_container",jsonFormat.straightLine);
    console.log(jsonFormat);
    handleDownload(jsonFormat,"test")
  };
  const handleDownload = (jsonFormat,fileName) => {
    const jsonDataStr = JSON.stringify(jsonFormat, null, 2);
    const blob = new Blob([jsonDataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || 'data.json';
    a.click();
    
    URL.revokeObjectURL(url);
  };

  const handleNewMenuClick = () => {
    const urlWithQuery = `${window.location.origin}`;
    console.log(urlWithQuery);
    window.history.pushState(null, null, urlWithQuery);
    window.location.reload();
  };

  const handleThemeMenuClick = () => {
    
    if(theme[0]==="Light Mode"){
      
      setTheme(["Dark Mode", "dark_mode"]);
      
      const domElements = document.body.querySelectorAll('*');
      domElements.forEach(element => {
        element.classList.remove("light_mode");
        element.classList.add("dark_mode");
      });

    }else{
      setTheme(["Light Mode", "light_mode"]);

      const domElements = document.body.querySelectorAll('*');
      domElements.forEach(element => {
        element.classList.remove("dark_mode");
        element.classList.add("light_mode");
      });
    }

  };
  return (
    <>
        <div className='menu_area'>
          <div className='left_menu_area_container'>
            <MenuBtn btn_name='Square' btn_icon='check_box_outline_blank' onClick={props.handleSquareMenuClick}/>
            <MenuBtn btn_name='Circle' btn_icon='radio_button_unchecked' onClick={props.handleCircleMenuClick}/>
            <MenuBtn btn_name='Curve Line' btn_icon='line_curve' onClick={props.handleLineMenuClick}/>
            <MenuBtn btn_name='Line' btn_icon='pen_size_2' onClick={props.handleStraingtLineMenuClick}/>
            <MenuBtn btn_name='Text Box' btn_icon='font_download' onClick={props.handleTextBoxMenuClick}/>
          </div>
          <div className='right_menu_area_container'>
            <MenuBtn btn_name={theme[0]} btn_icon={theme[1]} onClick={() => handleThemeMenuClick()}/>
            <MenuBtn btn_name='Save' btn_icon='save' onClick={() => handleSaveMenuClick()}/>
            <MenuBtn btn_name='View' btn_icon='folder_open'/>
            <MenuBtn btn_name='New' btn_icon='note_add' onClick={() => handleNewMenuClick()}/>
          </div>
        </div>
    </>
  )
}
