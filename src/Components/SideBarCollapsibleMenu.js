import React from 'react'
import Collapsible from 'react-collapsible';
import SideBarCollapsibleHeader from './SideBarCollapsibleHeader';
import { useState } from 'react';
import SideBarCollapsedBtn from './SideBarCollapsedBtn';

export default function SideBarCollapsibleMenu(props) {
  const [expandArrow, setExpandArrow] = useState("expand_more");
  const handleOpen = () => {
    setExpandArrow("expand_less");
  };
  const handleClose = () => {
    setExpandArrow("expand_more");
  };

  return (
    <>
    <div className='collapsible_wrapper'>
        <Collapsible trigger={<SideBarCollapsibleHeader header={props.header} icon={props.icon} expand={expandArrow}/>}  onOpening={handleOpen} onClosing={handleClose}>
            <div className='collapsible_content_container'>
            {
                props.content.map(item => (
                    <SideBarCollapsedBtn key={item} icon={props.icon} header={props.header} btn_name={item} handle_side_bar_btn_Start={props.handle_side_bar_btn_Start} 
                    handle_side_bar_btn_drag_Start={props.handle_side_bar_btn_drag_Start}/>
                ))
            }
            </div>
        </Collapsible>
    </div>
    </>
  )
}
