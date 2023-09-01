import React from 'react';
import TreeNode from './TreeNode';

const TreeNodes = (props) => (
  <div>
    {props.nodes.map((node, index) => (
      <TreeNode
        key={index}
        header={node.header}
        icon={node.icon}
        color={node.color}
        inside={node.inside}
        handle_side_bar_btn_drag_Start={props.handle_side_bar_btn_drag_Start}
        expandedAll={props.expandedAll} // Pass the expandedAll prop to TreeNode
      />
    ))}
  </div>
);

export default TreeNodes;
