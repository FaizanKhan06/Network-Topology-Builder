import React from 'react'
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';

const OtherContextButtons = styled(MenuItem)(({ theme }) => ({
  fontSize: 14,
}));

const RemoveContextButtons = styled(MenuItem)(({ theme }) => ({
  color: 'red',
  fontSize: 14,
  '&:hover': {
    backgroundColor: '#fccdc7',
  },
}));

export default function ContextButton(props) {
  return (
    <>
      {
        props.type==='remove' ?
        <RemoveContextButtons onClick={() => {props.handleClose(); props.handleClickEvent();}}>{props.name}</RemoveContextButtons>
        :
        <OtherContextButtons onClick={() => {props.handleClose(); props.handleClickEvent();}}>{props.name}</OtherContextButtons>
      }
    </>
  )
}
