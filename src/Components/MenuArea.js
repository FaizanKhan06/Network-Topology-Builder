import React, { useRef, useState } from 'react';
import MenuBtn from './MenuBtn';
import RightMenu from './RightMenu';

import IconsDictionary from './IconsDictionary';


export default function MenuArea(props) {

  const [theme, setTheme] = useState(["Dark Mode", "dark_mode"]);

  const getAllElementDetails = (className,jsonObj) => {
    const elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const dataset = element.dataset;
      const dictionary = Object.entries(dataset).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
      dictionary["key"]=i;
      jsonObj.push(dictionary);
    }
  }
  const handleSaveMenuClick = () => {
    const diagram_name = document.getElementById("diagram-name-field").value.trim();
    if(diagram_name===''){
      alert("Enter Diagram Name");
      return;
    }
    const jsonFormat = {"diagram_name":'',"rectangle":[],"circle":[],"custom_image":[],"curve_line":[],"straight_line":[],"textbox":[],"network_nodes":[]};
    getAllElementDetails("draw_rect",jsonFormat.rectangle);
    getAllElementDetails("draw_circle",jsonFormat.circle);
    getAllElementDetails("custom_image",jsonFormat.custom_image);
    getAllElementDetails("curve_line_element",jsonFormat.curve_line);
    getAllElementDetails("straight_line_element",jsonFormat.straight_line);
    getAllElementDetails("draw_textBox",jsonFormat.textbox);
    getAllElementDetails("netWorkNode",jsonFormat.network_nodes);
    jsonFormat.diagram_name = diagram_name;
    console.log(jsonFormat);
    handleDownload(jsonFormat,diagram_name)
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
    const urlWithQuery = `${window.location.href.split("?")[0]}`;
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

  const icon_style = {
    width:32,height:32,fill:'var(--primary_color2)',
  }

  const imageInputRef = useRef(null);
  const handleImageButtonClick = () => {
    if(!props.isViewMode){
      imageInputRef.current.click();
    }
  };
  const handleImageInputChange = (event) => {
    const file = event.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        props.sendImageUrlToParent(reader.result);
      }
    }
    imageInputRef.current.value='';
  }

  return (
    <>
        <div className='menu_area'>
          <div className='left_menu_area_container'>
            <MenuBtn btn_name='Square' icon={<IconsDictionary icon={"CropSquareOutlinedIcon"} sx={icon_style}/>} onClick={props.handleSquareMenuClick}/>
            <MenuBtn btn_name='Circle' icon={<IconsDictionary icon={"CircleOutlinedIcon"} sx={icon_style}/>} onClick={props.handleCircleMenuClick}/>
            <MenuBtn btn_name='Curve Line' icon={<IconsDictionary icon={"LineCurve"} sx={icon_style}/>} onClick={props.handleLineMenuClick}/>
            <MenuBtn btn_name='Line' icon={<IconsDictionary icon={"PenSize2"} sx={icon_style}/>} onClick={props.handleStraingtLineMenuClick}/>
            <MenuBtn btn_name='Text Box' icon={<IconsDictionary icon={"FormatShapes"} sx={icon_style}/>} onClick={props.handleTextBoxMenuClick}/>

            <MenuBtn btn_name='Image' icon={<IconsDictionary icon={"WallpaperOutlinedIcon"} sx={icon_style}/>} onClick={handleImageButtonClick}/>  
            <input ref={imageInputRef} type="file" accept=".jpg, .jpeg, .png" onChange={handleImageInputChange} style={{ display: 'none'}}/>          

          </div>
          <div className='right_menu_area_container'>
            <RightMenu handleViewModeToggel={props.handleViewModeToggel} 
                       handleThemeMenuClick={handleThemeMenuClick}
                       handleNewMenuClick={handleNewMenuClick}
                       handleSaveMenuClick = {handleSaveMenuClick}
                       isViewMode={props.isViewMode}
                       diagram_name={props.diagram_name}
            />
          </div>
        </div>
    </>
  )
}
