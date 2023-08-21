import React from 'react'
import SideBarCollapsibleMenu from './SideBarCollapsibleMenu';

export default function SideBar(props) {
    const collapsibleContent = [{header:"Routers",btns:["1","2","3"],icon:"router"},
                              {header:"Switches",btns:["1","2","3"],icon:"toggle_on"},
                              {header:"Phones",btns:["1","2","3"],icon:"phone_iphone"},
                              {header:"Cameras",btns:["1","2","3"],icon:"photo_camera"},
                              {header:"Computer",btns:["1","2","3"],icon:"devices"},
                              {header:"Printers",btns:["1","2","3"],icon:"print"},
                              {header:"Hub",btns:["1","2","3"],icon:"hub"},
                              {header:"Cloud/Internet",btns:["1","2","3"],icon:"cloud"},
                              {header:"FireWall",btns:["1","2","3"],icon:"wallpaper"},
                              {header:"Wireless Access Point",btns:["1","2","3"],icon:"rss_feed"},
                              {header:"Server",btns:["1","2","3"],icon:"dns"}];

  return (
    <>
    <div className='side_bar'>
        {
          collapsibleContent.map(item => (
            <SideBarCollapsibleMenu key={item.header} icon={item.icon} header={item.header} content={item.btns} handle_side_bar_btn_Start={props.handle_side_bar_btn_Start}
            handle_side_bar_btn_drag_Start={props.handle_side_bar_btn_drag_Start}/>
          ))
        }
      </div>
    </>
  )
}
