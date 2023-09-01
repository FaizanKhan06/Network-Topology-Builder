
import './App.css';
import React, { useEffect, useState } from 'react';
import MenuArea from './Components/MenuArea';
import SideBar from './Components/SideBar';
import DrawArea from './Components/DrawArea';

function App() {
  const [jsonData, setJsonDatas] = useState(null);
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const value = queryParams.get('jsonObj');
    const jsonString = localStorage.getItem(value);
    if (jsonString) {
        const parsedData = JSON.parse(jsonString);
        setJsonDatas(parsedData);
    }
  }, []);

  const [diagram_name,setDiagram_name] = useState('');

  useEffect(() => {
    if (jsonData) {

      setAddRect(jsonData.rectangle);
      setAddRectCount(jsonData.rectangle.length);

      setAddCircle(jsonData.circle);
      setAddCircleCount(jsonData.circle.length);

      
      setCustomImage(jsonData.custom_image);
      setCustomImageCount(jsonData.custom_image.length);
      

      setaddStraingtLine(jsonData.straight_line);
      setaddStraingtLineCount(jsonData.straight_line.length);

      setAddLine(jsonData.curve_line);
      setAddLineCount(jsonData.curve_line.length);

      setAddTextBox(jsonData.textbox);
      setAddTextBoxCount(jsonData.textbox.length);

      setDiagram_name(jsonData.diagram_name);

      setAddNetWorkNode(jsonData.network_nodes);
      setAddNetWorkNodeCount(jsonData.network_nodes.length);

    }
  }, [jsonData]);

  //Rectangle
  const [addRect, setAddRect] = useState([]);
  const [addRectCount, setAddRectCount] = useState(0);
  const handleSquareMenuClick = () => {
    if(!isViewMode){let dataPass = {key:addRectCount,x:addRectCount*3,y:addRectCount*3,width:80,height:50};
    setAddRect([...addRect, dataPass]);
    setAddRectCount(addRectCount + 1);}
  };
  //Circle
  const [addCircle, setAddCircle] = useState([]);
  const [addCircleCount, setAddCircleCount] = useState(0);
  const handleCircleMenuClick = () => {
    if(!isViewMode){let dataPass = {key:addCircleCount,x:addCircleCount*3 + 90,y:addCircleCount*3,width:80,height:50};
    setAddCircle([...addCircle, dataPass]);
    setAddCircleCount(addCircleCount + 1);}
  };
  //TextBox
  const [addTextBox, setAddTextBox] = useState([]);
  const [addTextBoxCount, setAddTextBoxCount] = useState(0);
  const handleTextBoxMenuClick = () => {
    if(!isViewMode){let dataPass = {key:addTextBoxCount,x:addTextBoxCount*3 + 340,y:addTextBoxCount*3+10,text:"",width:150,height:50,alignment:'centerAlignText',boxstyle:'background'};
    setAddTextBox([...addTextBox, dataPass]);
    setAddTextBoxCount(addTextBoxCount + 1);}
  };
  //Line
  const [addLine, setAddLine] = useState([]);
  const [addLineCount, setAddLineCount] = useState(0);
  const handleLineMenuClick = () => {
    if(!isViewMode){let dataPass = {key:addLineCount,x1:addLineCount*3 + 200,y1:addLineCount*3+10,x2:addLineCount*3+250,y2:addLineCount*3+50,linetype:"solid-line"};
    setAddLine([...addLine, dataPass]);
    setAddLineCount(addLineCount + 1);}
  };

  const [addStraingtLine, setaddStraingtLine] = useState([]);
  const [addStraingtLineCount, setaddStraingtLineCount] = useState(0);
  const handleStraingtLineMenuClick = () => {
    if(!isViewMode){let dataPass = {key:addStraingtLineCount,x1:addStraingtLineCount*3 + 260,y1:addStraingtLineCount*3+10,x2:addStraingtLineCount*3+310,y2:addStraingtLineCount*3+50,linetype:"solid-line"};
    setaddStraingtLine([...addStraingtLine, dataPass]);
    setaddStraingtLineCount(addStraingtLineCount + 1);}
  };

  //NetWork Node
  const [selectedNetworkNode,setSelectedNetworkNode] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const handle_side_bar_btn_drag_Start  = (icon,header,btn_name,color) => (event) => {
    if(event.target.classList.contains("side_bar_collapsed_btn")){
      setSelectedNetworkNode([icon,header,btn_name,color]);
    }
  };
  const [addNetWorkNode, setAddNetWorkNode] = useState([]);
  const [addNetWorkNodeCount, setAddNetWorkNodeCount] = useState(0);
  const handleDrop = (event) => {
    if(!isViewMode){const dataPass = {key:addNetWorkNodeCount,icon:selectedNetworkNode[0],header:selectedNetworkNode[1],name:selectedNetworkNode[2],color:selectedNetworkNode[3],x:event.nativeEvent.offsetX,y:event.nativeEvent.offsetY,generatealarm:'',healthstatus:'false',maintainancestatus:'false',params:'[]'};
    
    if(selectedNetworkNode.length>0){
      setAddNetWorkNode([...addNetWorkNode, dataPass]);
      setAddNetWorkNodeCount(addNetWorkNodeCount + 1);
    }
    
    setIsDragging(false);
    setSelectedNetworkNode([])}
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (event) => {
    setIsDragging(false);
  };
  if(isDragging){
    const allPointerEvents = document.getElementsByClassName("pointer_event_all");
    for(let i = 0; i < allPointerEvents.length; i++){
      allPointerEvents[i].classList.add("pointer_event_none")
    }
  }else{
    const allPointerEvents = document.querySelectorAll('.pointer_event_all.pointer_event_none');
    for(let i = 0; i < allPointerEvents.length; i++){
      allPointerEvents[i].classList.remove("pointer_event_none")
    }
  }  


  const [addCustomImage, setCustomImage] = useState([]);
  const [CustomImageCount, setCustomImageCount] = useState(0);
  const sendImageUrlToParent = (data) => {
    if(!isViewMode){let dataPass = {key:CustomImageCount,x:CustomImageCount*3+500,y:CustomImageCount*3,width:100,height:100,imageurl:data,opacity:1};
    setCustomImage([...addCustomImage, dataPass]);
    setCustomImageCount(CustomImageCount + 1);}
  };


  
  const [isViewMode,setIsViewMode] = useState(false);
  const handleViewModeToggel = (event) => {
    setIsViewMode(event.target.checked);
  };

  return (
    <>

      <div className='main_body'>
      <SideBar handle_side_bar_btn_drag_Start={handle_side_bar_btn_drag_Start}/>
        <div className='main_area'>
          <MenuArea 
            handleSquareMenuClick={handleSquareMenuClick} 
            handleCircleMenuClick={handleCircleMenuClick} 
            handleTextBoxMenuClick={handleTextBoxMenuClick}
            handleLineMenuClick={handleLineMenuClick}
            handleStraingtLineMenuClick={handleStraingtLineMenuClick}
            handleViewModeToggel={handleViewModeToggel}
            sendImageUrlToParent={sendImageUrlToParent}
            isViewMode={isViewMode}
            diagram_name={diagram_name}
          />
          <div className={`DrawAreaContainer ${(isViewMode)?'':'grid_design'}`}>
            <DrawArea jsonData={jsonData} addRect={addRect} addCircle={addCircle} addTextBox={addTextBox} addLine={addLine} addStraingtLine={addStraingtLine} addNetWorkNode={addNetWorkNode} addCustomImage={addCustomImage} handleDrop={handleDrop} handleDragOver={handleDragOver} handleDragEnter={handleDragEnter} handleDragLeave={handleDragLeave} isViewMode={isViewMode}/>
          </div>
        </div>
      </div>
    </>
    
  );
}

export default App;


