import React, { useEffect, useRef, useState } from 'react'
import { Rnd } from 'react-rnd/lib/';

import Menu from '@mui/material/Menu';
import ContextButton from './ContextButton';
import ContextMenuSelect from './ContextMenuSelect';
import Divider from '@mui/material/Divider';
import ViewDeviceDetailsDialogue from './ViewDeviceDetailsDialogue';

import Badge from '@mui/material/Badge';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';

import { ThemeProvider, createTheme } from '@mui/material';
import IconsDictionary from './IconsDictionary';
import ListExample from './ListExample';

import Tooltip from '@mui/material/Tooltip';

const Maintanancetheme = createTheme({
  components: {
    MuiBadge: {
      styleOverrides: {
        badge: {
          backgroundColor: '#dede00', // Change this to your desired color
        },
      },
    },
  },
});
const Healththeme = createTheme({
  components: {
    MuiBadge: {
      styleOverrides: {
        badge: {
          backgroundColor: 'red', // Change this to your desired color
        },
      },
    },
  },
});

export default function NetWorkNode(props) {
  const [triggerEffect, setTriggerEffect] = useState(false);
  const removeComponent = (event) => {
    setTriggerEffect(true);
    delRef.current.resizableElement.current.remove();
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

  const [coords,setCoords] = useState({x:JSON.parse(props.data.x),y:JSON.parse(props.data.y)});
  const handleDragStop = (e,d) => {
    setIsDragging(false);
    setCoords({x:d.x,y:d.y});
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


  const GeneterateAlarmOptions = [
    { value: '', label: 'None'},
    { value: 'critical-alarm', label: 'Critical Alarm' },
    { value: 'major-alarm', label: 'Major Alarm' },
    { value: 'minor-alarm', label: 'Minor Alarm' },
  ];
  const HealthStatusOptions = [
    { value: false, label: 'Up' },
    { value: true, label: 'Down' },
  ];
  const MaintainanaceStatusOptions = [
    { value: false, label: 'Operational' },
    { value: true, label: 'Maintainance' },
  ];

  const alarmColor = {
    '':'var(--menu_btn_color)',
    "critical-alarm": "red",
    "major-alarm":"orange",
    "minor-alarm":"yellow"
  }

  const [selectedGenerateAlarmOption,setSelectedGenerateAlarmOption] = useState(props.data.generatealarm);
  const handleDataFromGenerateAlarm = (data) => {
    setSelectedGenerateAlarmOption(data);
  };
  const [selectedHealthStatusOption,setSelectedHealthStatusOption] = useState(JSON.parse(props.data.healthstatus));
  const handleDataFromHealthStatus = (data) => {
    setSelectedHealthStatusOption(data);
  };
  const [selectedMaintainanceStatusOption,setSelectedMaintainanceStatusOption] = useState(JSON.parse(props.data.maintainancestatus));
  const handleDataFromMaintainanceStatus = (data) => {
    setSelectedMaintainanceStatusOption(data);
  };

  const [coordForDialogue,setCoordForDialogue] = useState({x: JSON.parse(props.data.x),y: JSON.parse(props.data.y)});
  const handleViewDeviceClick = () => {
    const values = {x:divRef.current.dataset.x,y:divRef.current.dataset.y};
    setCoordForDialogue(values)
    setOpenDialogue(true);
  }


  const [openDialogue, setOpenDialogue] = React.useState(false);
  const handleCloseDialogue = (value) => {
    setOpenDialogue(false);
  };

  const delRef = useRef(null);

  const color = (props.data.color)?props.data.color:'';

  const [params,setParams] = useState(JSON.parse(props.data.params));
  /* Generate Random Values*/
  const changeValuesRandomly = true;
  const [randomValue, setRandomValue] = useState({});
  const [isToolTipOpen,setIsToolTipOpen] = useState(false);
  useEffect(() => {
    let intervalId = null;

    if (props.isViewMode && params.length !== 0 && changeValuesRandomly && isToolTipOpen) {
      intervalId = setInterval(() => {
        const newRandomValues = {};
        params.forEach((item, index) => {
          newRandomValues[index] = (Math.random() * 10 + 1).toFixed(2);
        });
        setRandomValue(newRandomValues);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [props.isViewMode,params, params.length, changeValuesRandomly, isToolTipOpen]);
  const handleToolTipOpen = () => {
    setIsToolTipOpen(true);
  }
  const handleToolTipClose = () => {
    setIsToolTipOpen(false);
  }

  const handleRecieveData = (data) =>{
    setParams(data);
  }
  const toolTipStyle = {
    padding:'5px 5px 5px 5px',
    backgroundColor:'gray',
    borderRadius:5,
    textAlign:'center',
  }

  return (
    <>
    <Rnd ref={delRef} default={{x: JSON.parse(props.data.x),y: JSON.parse(props.data.y)}} bounds="window" enableResizing={false} disableDragging={props.isViewMode} onDragStart={(handleDragStart)} onDragStop={(handleDragStop)} onDrag={(handleOnDrag)}>
    
    <ThemeProvider theme={Maintanancetheme}>
    <Badge anchorOrigin={{vertical: 'top',horizontal: 'left',}} invisible={!(props.isViewMode && selectedMaintainanceStatusOption)} badgeContent={<ConstructionRoundedIcon sx={{width:15,height:15}}/>} color="secondary">
    <ThemeProvider theme={Healththeme}> 
    <Badge anchorOrigin={{vertical: 'top',horizontal: 'right',}} invisible={!(props.isViewMode && selectedHealthStatusOption)} badgeContent={<CloseRoundedIcon sx={{width:15,height:15}}/>} color="secondary">
      
      <Tooltip onOpen={handleToolTipOpen} onClose={handleToolTipClose} disableHoverListener={!(props.isViewMode && params.length!==0)} arrow title={
        <React.Fragment>
          <table style={{borderSpacing:'4px 4px'}}>
            <thead>
            <tr>
              <th>Variable</th>
              <th>Value</th>
              <th>Unit</th>
            </tr>
            </thead>
            <tbody>
            {params.map((item, index) => (
              <tr key={index} >
                <td style={toolTipStyle}>{item['name']}</td>
                <td style={toolTipStyle}>{(changeValuesRandomly)? randomValue[index] || '0.00':item['value']}</td>
                <td style={toolTipStyle}>{item['unit']}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </React.Fragment>
        }
      >
      <div data-x={coords.x} data-y={coords.y} data-icon={props.data.icon} data-generatealarm={selectedGenerateAlarmOption} data-healthstatus={selectedHealthStatusOption} data-maintainancestatus={selectedMaintainanceStatusOption} data-header={props.data.header} data-name={props.data.name} data-color={color} data-params={JSON.stringify(params)}
           style={{backgroundColor:(props.isViewMode)?((selectedGenerateAlarmOption==='')?(color==='')?'':color:alarmColor[selectedGenerateAlarmOption]):(color==='')?'':color, cursor:(props.isViewMode)?'default':'move'}} ref={divRef} onContextMenu={handleContextMenu} onClick={props.onClick} className={`netWorkNode pointer_event_all selectedNetWorkNode`}>
        <IconsDictionary icon={props.data.icon}/>
        <div className='pointer_event_none'>{props.data.header+" "+props.data.name}</div>
        <div className={`line_holder_for_node pointer_event_none ${(props.isViewMode)?'display_none':''}`}>
          <div className='top_node nodes_line pointer_event_all' ref={connectPointRefT} onMouseEnter={handleMouseEnter(connectPointRefT)} onMouseLeave={handleMouseLeave}></div>
          <div className='bottom_node nodes_line pointer_event_all' ref={connectPointRefB} onMouseEnter={handleMouseEnter(connectPointRefB)} onMouseLeave={handleMouseLeave}></div>
          <div className='left_node nodes_line pointer_event_all' ref={connectPointRefL} onMouseEnter={handleMouseEnter(connectPointRefL)} onMouseLeave={handleMouseLeave}></div>
          <div className='right_node nodes_line pointer_event_all' ref={connectPointRefR} onMouseEnter={handleMouseEnter(connectPointRefR)} onMouseLeave={handleMouseLeave}></div>
        </div>

        <ViewDeviceDetailsDialogue open={openDialogue} onClose={handleCloseDialogue} name={props.data.header+props.data.name} type={props.data.header} x={coordForDialogue.x} y={coordForDialogue.y}/>

      </div>
      </Tooltip>
        {
          !props.isViewMode?
          <Menu
            open={contextMenu !== null}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={contextMenu !== null? { top: contextMenu.mouseY+10, left: contextMenu.mouseX }: undefined}
          >

            <ContextButton handleClose={handleClose} handleClickEvent={removeComponent} name='Remove Component' type='remove'/>
        
          </Menu>
          :
          <Menu
            open={contextMenu !== null}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={contextMenu !== null? { top: contextMenu.mouseY+10, left: contextMenu.mouseX }: undefined}
          >

            <ContextButton handleClose={handleClose} handleClickEvent={handleViewDeviceClick} name='View Device'/>
            <Divider/>
            <ContextMenuSelect sx={{width:'100%',minWidth:200}} heading={'Generate Alarm'} options={GeneterateAlarmOptions} selectedOption={selectedGenerateAlarmOption} sendDataToParent={handleDataFromGenerateAlarm}/>
            <ContextMenuSelect sx={{width:'100%'}} heading={'Health Status'} options={HealthStatusOptions} selectedOption={selectedHealthStatusOption} sendDataToParent={handleDataFromHealthStatus}/>
            <ContextMenuSelect sx={{width:'100%'}} heading={'Maintainance Status'} options={MaintainanaceStatusOptions} selectedOption={selectedMaintainanceStatusOption} sendDataToParent={handleDataFromMaintainanceStatus}/>
            <Divider />
            <ListExample params={params} handleClose={handleClose} sendData={handleRecieveData}/>
        
          </Menu>
        }
    </Badge>
    </ThemeProvider>
    </Badge>
    </ThemeProvider>
    </Rnd>
    </>
  )
}