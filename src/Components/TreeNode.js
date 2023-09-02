import React, { useState, useEffect } from 'react';
import SideBarCollapsedBtn from './SideBarCollapsedBtn';
import TreeNodes from './TreeNodes';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconsDictionary from './IconsDictionary';

import { styled } from '@mui/system';

const CustomAccordionSummary = styled(AccordionSummary)(({ theme }) => ({

  borderRadius:4,
  margin:0,
  minHeight:'0',
  color: 'white',
  '&.Mui-expanded':{
    minHeight:'0',
  },
  '.MuiAccordionSummary-content': {
    display:'flex',
    alignItems: 'center',
    fontSize:14,
    gap:6,
    margin: '5px 0px',
    '&.Mui-expanded':{
      margin:'5px 0px',
    },
  },
  '&:hover': {
    backgroundColor: 'rgba(52,53,65,1)',
  },
}));

const TreeNode = (props) => {
  const [expanded, setExpanded] = useState(false);

  // Use useEffect to update the 'expanded' state when 'expandedAll' prop changes
  useEffect(() => {
    setExpanded(props.expandedAll);
  }, [props.expandedAll]);

  // Function to toggle the accordion
  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className='collapsible_wrapper'>
      <Accordion sx={{bgcolor:'rgba(68,70,84,1)',width:'100%',boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)'}} expanded={expanded} onChange={toggleAccordion}>
        <CustomAccordionSummary expandIcon={<ExpandMoreIcon sx={{color:'white'}} />} aria-controls="panel1a-content">
          <IconsDictionary icon={props.icon} sx={{width:24,height:24}}/>
          <div>{props.header}</div>
        </CustomAccordionSummary>
        <AccordionDetails sx={{padding:'5px 5px'}}>
          <div className='collapsible_content_container'>
            {Array.isArray(props.inside) ? (
              <TreeNodes nodes={props.inside} handle_side_bar_btn_drag_Start={props.handle_side_bar_btn_drag_Start} expandedAll={props.expandedAll} />
            ) : (
              <>
                {props.inside.btns.map((item) => (
                  <SideBarCollapsedBtn
                    key={item}
                    icon={props.icon}
                    header={props.header}
                    btn_name={item}
                    color={props.color}
                    handle_side_bar_btn_drag_Start={props.handle_side_bar_btn_drag_Start}
                  />
                ))}
              </>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default TreeNode;
