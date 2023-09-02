import React, { useState } from 'react';
import TreeNode from './TreeNode';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { styled } from '@mui/system';
import IconsDictionary from './IconsDictionary';
import CreatingCustomNodes from './CreatingCustomNodesMenuBtn';
import CreateCustomNodeDialogue from './CreateCustomNodeDialogue';

const CustomAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  borderRadius: 4,
  margin: 0,
  minHeight: '0',
  color: 'white',
  '&.Mui-expanded': {
    minHeight: '0',
  },
  '.MuiAccordionSummary-content': {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    gap: 6,
    margin: '5px 0px',
    '&.Mui-expanded': {
      margin: '5px 0px',
    },
  },
  '&:hover': {
    backgroundColor: 'rgba(52,53,65,1)',
  },
}));

const TreeNodes = (props) => {

  const [SelectedCustomNodeName, setSelectedCustomNodeName] = useState('');
  const [SelectedCustomNodeIcon, setSelectedCustomNodeIcon] = useState('WallpaperOutlinedIcon');
  const [SelectedCustomNodeIndex, setSelectedCustomNodeIndex] = useState(null);

  const [openDialogue, setOpenDialogue] = useState({open:false,new:false});

  const [items, setItems] = useState([]);
  const handleAddItem = () => {
    if(!props.isViewMode){
      setSelectedCustomNodeName('');
      setSelectedCustomNodeIcon('WallpaperOutlinedIcon');
      setSelectedCustomNodeIndex(null);
      setOpenDialogue({open:true,new:true});
    }
  };
  const handleEditItem = (index,name,icon) => {
    if(!props.isViewMode){
      setSelectedCustomNodeName(name);
      setSelectedCustomNodeIcon(icon);
      setSelectedCustomNodeIndex(index);
      setOpenDialogue({open:true,new:false});
    }
  };
  const handleCloseDialogue = () => {
    setOpenDialogue({open:false,new:false});
  };
  const handleFormSubmit = (event,name,icon,index) => {
    event.preventDefault();
    if(openDialogue.new){
      const newItem = { 'name': name, 'icon': icon, 'subNodalStructure': {} };
      setItems([...items, newItem]);
    }else{
      const newArray = [...items];
      newArray[index] = { 'name': name, 'icon': icon, 'subNodalStructure': {} };
      setItems(newArray);
    }
    handleCloseDialogue();
  };
  const handleDeleteItem = (index) => {
    if(!props.isViewMode){
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      setItems(updatedItems);
    }
  };

  const handleFieldChange = (index, field, value) => {
    const updatedItems = items.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    setItems(updatedItems);
  };

  return (
    <div>
      {props.nodes.map((node, index) => (
        <TreeNode
          key={index}
          header={node.header}
          icon={node.icon}
          color={node.color}
          inside={node.inside}
          handle_side_bar_btn_drag_Start={props.handle_side_bar_btn_drag_Start}
          expandedAll={props.expandedAll}
        />
      ))}

      <div className='collapsible_wrapper'>
        <Accordion sx={{ bgcolor: 'rgba(68,70,84,1)', width: '100%', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)' }}>
          <CustomAccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />} aria-controls="panel1a-content">
            <IconsDictionary icon={'testIcon'} sx={{width:24,height:24}}/>
            <div>{'Custom Nodes'}</div>
          </CustomAccordionSummary>
          <AccordionDetails sx={{ padding: '5px 5px' }}>
            <div className='collapsible_content_container'>
              
              {items.map((item, index) => (
                <CreatingCustomNodes key={index} name={item.name} icon={item.icon} index={index} handleFieldChange={handleFieldChange} handleEditItem={handleEditItem} handleDeleteItem={handleDeleteItem}/>
              ))}
              
              <button className='side_bar_collapsed_btn' draggable={false} onClick={handleAddItem}>
                <IconsDictionary icon={"AddRoundedIcon"} />
                <div style={{ marginLeft: 10 }}>{'Create Node'}</div>
              </button>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <CreateCustomNodeDialogue name={SelectedCustomNodeName} icon={SelectedCustomNodeIcon} index={SelectedCustomNodeIndex} openDialogue={openDialogue} closeDialogue={handleCloseDialogue} handleFormSubmit={handleFormSubmit}/>
    </div>
  );
};

export default TreeNodes;
