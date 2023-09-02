import React from 'react'
import IconsDictionary from './IconsDictionary'
import { IconButton } from '@mui/material'
import { styled } from '@mui/material/styles';

const IconButtons = styled(IconButton)(({ theme }) => ({
    '&:hover .MuiSvgIcon-root': {
      color: 'white',
    },
  }));

export default function CreatingCustomNodes(props) {
  return (
    <div style={{display:'flex',width:'90%'}} className='side_bar_collapsed_btn' draggable>
        <IconsDictionary icon={props.icon} sx={{width:24,height:24}}/>
        <div  style={{marginLeft: 10,fontSize:13.33,width:'58%'}}>
          <input style={{width:'100%',color:'white',backgroundColor:'transparent'}} type="text" value={props.name}/>
        </div>
        <div style={{marginLeft:'auto',display:'flex',gap:20,paddingRight:10}}>
            <IconButtons sx={{padding:0}} edge="end" aria-label="edit" onClick={() => props.handleEditItem(props.index,props.name,props.icon)}>
                <IconsDictionary sx={{width:20,height:20,color:'gray'}} icon={"BorderColorRoundedIcon"}/>
            </IconButtons>
            <IconButtons sx={{padding:0}} edge="end" aria-label="delete" onClick={() => props.handleDeleteItem(props.index)}>
                <IconsDictionary sx={{width:20,height:20,color:'gray'}} icon={"DeleteIcon"}/>
            </IconButtons>
        </div>
    </div>
  )
}
