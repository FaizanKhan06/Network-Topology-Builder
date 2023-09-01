import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';

const OtherContextButtons = styled(MenuItem)(({ theme }) => ({
  fontSize: 14,
}));

export default function ContextMenuSelect(props) {

  const [selectOption, setSelectOption] = React.useState(props.selectedOption);
  const handleChange = (event) => {
    setSelectOption(event.target.value);
    props.sendDataToParent(event.target.value);
  };

  const options = props.options;

  return (
    <MenuItem sx={props.sx}>
      <FormControl fullWidth>
        <InputLabel sx={{fontSize: 14}}id="demo-label">
          {props.heading}
        </InputLabel>
        <Select sx={{fontSize: 14}}
          labelId="demo-label" id="demo-select" value={selectOption} label={props.heading} onChange={handleChange}>
          {options.map((option) => (
            <OtherContextButtons key={option.value} value={option.value}>
                {option.label}
            </OtherContextButtons>
          ))}
        </Select>
      </FormControl>
    </MenuItem>
  );
}

ContextMenuSelect.defaultProps = {
  sx: {width:200},
};
