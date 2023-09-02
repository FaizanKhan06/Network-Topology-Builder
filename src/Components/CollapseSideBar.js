import React, { useState } from 'react';
import TreeNodes from './TreeNodes';
import NodesData from '../JsonFiles/NodesData.json';

const CollapseSideBar = (props) => {

  // eslint-disable-next-line
  const [treeData, setTreeData] = useState(NodesData);

  const [expandedAll, setExpandedAll] = useState(false); // State to control expansion/collapse

  // Function to expand all accordions
  const expandAllAccordions = () => {
    setExpandedAll(true);
  };

  // Function to collapse all accordions
  const collapseAllAccordions = () => {
    setExpandedAll(false);
  };

  return (
    <div style={{width:'254px',marginLeft:'6px'}}>
      <div style={{display:'flex',marginTop:8}}>
        {
          !expandedAll?
          <button style={{padding:5,marginLeft:'auto',borderRadius:10,backgroundColor:'rgba(68,70,84,1)',color:'white'}} onClick={expandAllAccordions}>Expand All</button>
          :
          <button style={{padding:5,marginLeft:'auto',borderRadius:10,backgroundColor:'rgba(68,70,84,1)',color:'white'}} onClick={collapseAllAccordions}>Collapse All</button>
        }
      </div>
      <TreeNodes
        nodes={treeData}
        handle_side_bar_btn_drag_Start={props.handle_side_bar_btn_drag_Start}
        expandedAll={expandedAll} 
        isViewMode={props.isViewMode}// Pass the state to the TreeNodes component
      />

    </div>
  );
};

export default CollapseSideBar;
