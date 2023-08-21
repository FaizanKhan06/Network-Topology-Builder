import React from 'react'

export default function SideBarCollapsedBtn(props) {
  
  return (
    <button className='side_bar_collapsed_btn' onClick={props.handle_side_bar_btn_Start(props.icon,props.header,props.btn_name)} 
      draggable onDragStart={props.handle_side_bar_btn_drag_Start(props.icon,props.header,props.btn_name)}>
        <span className="material-symbols-outlined icon_space_side_bar">
            { props.icon }
        </span>
        {props.header+" "+props.btn_name}
    </button>
  )
}
