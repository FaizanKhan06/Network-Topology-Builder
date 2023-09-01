import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: "var(--menu_btn_color)",
  textTransform:'capitalize',
  boxShadow: 'none',
  color:"var(--primary_color2)",
  borderRadius: "10px",
  '&:hover': {
    backgroundColor: 'var(--menu_btn_color_hover)',
    boxShadow: 'none',
  },
}));

export default function MenuBtn(props) {
  return (
    <>
        <ColorButton onClick={props.onClick} variant="contained" startIcon={props.icon}>{props.btn_name}</ColorButton>
    </>
  )
}