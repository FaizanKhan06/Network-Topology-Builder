import React from 'react'

export default function CustomImageIcon({icon,sx}) {
  const iconDictionaryPaths = {
    "testIcon" : require('../CustomIcons/testIcon.png'),  
  }
  return (
    <img style={sx} src={iconDictionaryPaths[icon]} alt='Error' draggable={false}/>
  )
}
CustomImageIcon.defaultProps = {
    sx: {width:24,height:24}
};