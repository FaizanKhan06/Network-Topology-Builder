import './App.css';
import React, { useEffect, useState } from 'react';
import MenuArea from './Components/MenuArea';
import SideBar from './Components/SideBar';
import DrawArea from './Components/DrawArea';

function App() {
  const [jsonData, setJsonDatas] = useState(null);
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const value = queryParams.get('data');
    setJsonDatas(JSON.parse(value));
  }, []);

  useEffect(() => {
    if (jsonData) {
      setAddRect(jsonData.rectangle);
      setAddRectCount(jsonData.rectangle.length);

      setAddCircle(jsonData.circle);
      setAddCircleCount(jsonData.circle.length);

      setAddTextBox(jsonData.textBox);
      setAddTextBoxCount(jsonData.textBox.length);

      setAddLine(jsonData.line);
      setAddLineCount(jsonData.line.length);
      
      setaddStraingtLine(jsonData.straightLine);
      setaddStraingtLineCount(jsonData.straightLine.length);

      setAddNetWorkNode(jsonData.networkNodes);
      setAddNetWorkNodeCount(jsonData.networkNodes.length);
    }
  }, [jsonData]);

  //Rectangle
  const [addRect, setAddRect] = useState([]);
  const [addRectCount, setAddRectCount] = useState(0);
  const handleSquareMenuClick = () => {
    let dataPass = {key:addRectCount,x:addRectCount*3,y:addRectCount*3,width:80,height:50};
    setAddRect([...addRect, dataPass]);
    setAddRectCount(addRectCount + 1);
  };
  //Circle
  const [addCircle, setAddCircle] = useState([]);
  const [addCircleCount, setAddCircleCount] = useState(0);
  const handleCircleMenuClick = () => {
    let dataPass = {key:addCircleCount,x:addCircleCount*3 + 90,y:addCircleCount*3,width:80,height:50};
    setAddCircle([...addCircle, dataPass]);
    setAddCircleCount(addCircleCount + 1);
  };
  //TextBox
  const [addTextBox, setAddTextBox] = useState([]);
  const [addTextBoxCount, setAddTextBoxCount] = useState(0);
  const handleTextBoxMenuClick = () => {
    let dataPass = {key:addTextBoxCount,x:addTextBoxCount*3 + 320,y:addTextBoxCount*3+10,text:"",width:80,height:50};
    setAddTextBox([...addTextBox, dataPass]);
    setAddTextBoxCount(addTextBoxCount + 1);
  };
  //Line
  const [addLine, setAddLine] = useState([]);
  const [addLineCount, setAddLineCount] = useState(0);
  const handleLineMenuClick = () => {
    let dataPass = {key:addLineCount,startX:addLineCount*3 + 200,startY:addLineCount*3+10,endX:addLineCount*3+250,endY:addLineCount*3+50};
    setAddLine([...addLine, dataPass]);
    setAddLineCount(addLineCount + 1);
  };

  const [addStraingtLine, setaddStraingtLine] = useState([]);
  const [addStraingtLineCount, setaddStraingtLineCount] = useState(0);
  const handleStraingtLineMenuClick = () => {
    let dataPass = {key:addStraingtLineCount,startX:addStraingtLineCount*3 + 260,startY:addStraingtLineCount*3+10,endX:addStraingtLineCount*3+310,endY:addStraingtLineCount*3+50};
    setaddStraingtLine([...addStraingtLine, dataPass]);
    setaddStraingtLineCount(addStraingtLineCount + 1);
  };

  //NetWork Node
  const [selectedNetworkNode,setSelectedNetworkNode] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const handle_side_bar_btn_Start  = (icon,header,btn_name) => (event) => {
    console.log(icon+"/"+header+"/"+btn_name+" Start");
  };
  const handle_side_bar_btn_drag_Start  = (icon,header,btn_name) => (event) => {
    setSelectedNetworkNode([icon,header,btn_name]);
  };
  const [addNetWorkNode, setAddNetWorkNode] = useState([]);
  const [addNetWorkNodeCount, setAddNetWorkNodeCount] = useState(0);
  const handleDrop = (event) => {
    let dataPass = {key:addNetWorkNodeCount,icon:selectedNetworkNode[0],header:selectedNetworkNode[1],name:selectedNetworkNode[2],x:event.nativeEvent.offsetX,y:event.nativeEvent.offsetY};
    setAddNetWorkNode([...addNetWorkNode, dataPass]);
    setAddNetWorkNodeCount(addNetWorkNodeCount + 1);
    setIsDragging(false);
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

  return (
    <>

      <div className='main_body'>
      <SideBar handle_side_bar_btn_Start={handle_side_bar_btn_Start} handle_side_bar_btn_drag_Start={handle_side_bar_btn_drag_Start}/>
        <div className='main_area'>
          <MenuArea 
            handleSquareMenuClick={handleSquareMenuClick} 
            handleCircleMenuClick={handleCircleMenuClick} 
            handleTextBoxMenuClick={handleTextBoxMenuClick}
            handleLineMenuClick={handleLineMenuClick}
            handleStraingtLineMenuClick={handleStraingtLineMenuClick}
          />
          <div className='DrawAreaContainer'>
            <DrawArea jsonData={jsonData} addRect={addRect} addCircle={addCircle} addTextBox={addTextBox} addLine={addLine} addStraingtLine={addStraingtLine} addNetWorkNode={addNetWorkNode} handleDrop={handleDrop} handleDragOver={handleDragOver} handleDragEnter={handleDragEnter} handleDragLeave={handleDragLeave}/>
          </div>
        </div>
      </div>
    </>
    
  );
}

export default App;
