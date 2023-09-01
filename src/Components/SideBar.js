import React from 'react'
import CollapseSideBar from './CollapseSideBar';

export default function SideBar(props) {
  return (
    <>
    <div className='side_bar'>
      {
        <CollapseSideBar handle_side_bar_btn_drag_Start={props.handle_side_bar_btn_drag_Start}/>
      }
      </div>
    </>
  )
}
