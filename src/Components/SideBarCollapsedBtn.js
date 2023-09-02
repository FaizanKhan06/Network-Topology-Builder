import React from 'react'
import IconsDictionary from './IconsDictionary'

export default function Cre(props) {
  return (
    <button className='side_bar_collapsed_btn'
      draggable onDragStart={props.handle_side_bar_btn_drag_Start(props.icon,props.header,props.btn_name,props.color)}>
        <IconsDictionary icon={props.icon} sx={{width:24,height:24}}/>
        <div  style={{marginLeft: 10}}>
          {props.header+" "+props.btn_name}
        </div>
    </button>
  )
}
