import React from 'react'

export default function SideBarCollapsibleHeader(props) {
  return (
    <>
    <button className='side_bar_collapsible_header'>
        <span className="material-symbols-outlined icon_space_side_bar">
            { props.icon }
        </span>
        <div>
            { props.header }
        </div>
        <span className="material-symbols-outlined collapsibleArrowBtn">
            {props.expand}
        </span>
    </button>
    </>
  )
}
