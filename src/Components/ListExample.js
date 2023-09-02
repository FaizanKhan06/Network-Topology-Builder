import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemSecondaryAction, IconButton } from '@mui/material';
import ContextButton from './ContextButton';
import TextField from '@mui/material/TextField';
import IconsDictionary from './IconsDictionary';


const ListExample = (props) => {
  const [items, setItems] = useState(props.params);

  const handleAddItem = () => {
    const newItem = { 'name': 'var ' + (items.length + 1), 'value': 1, 'unit': 'unit' };
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleFieldChange = (index, field, value) => {
    const updatedItems = items.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    setItems(updatedItems);
  };

  useEffect(() => {
    props.sendData(items);
  }, [items, props]);

  const style = {
    width: 68,
  };

  return (
    <div>
      <ContextButton handleClose={() => {}} handleClickEvent={handleAddItem} name='Add Parameter'/>
      <List>
        {items.map((item, index) => (
          <ListItem key={index} sx={{ display: 'flex', gap: 1 }}>
            <TextField
              sx={style}
              label={'Name'}
              size="small"
              value={item['name']}
              onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
            />
            <TextField
              type='number'
              sx={style}
              label={'Value'}
              size="small"
              value={item['value']}
              onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
            />
            <TextField
              sx={style}
              label={'Unit'}
              size="small"
              value={item['unit']}
              onChange={(e) => handleFieldChange(index, 'unit', e.target.value)}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteItem(index)}>
                <IconsDictionary icon={"DeleteIcon"} sx={{ color: 'red' }}/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ListExample;
