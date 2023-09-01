import React from 'react'

export default function CustomPathIcon({sx,icon}) {

  const iconDictionaryPaths = {
    "LineCurve" : "M720-160q0-116-44-218T556-556q-76-76-178-120t-218-44v-80q132 0 248.5 50.5T612-612q87 87 137.5 203.5T800-160h-80Z",
    "PenSize2": "M212-212q-11-11-11-28t11-28l480-480q11-12 27.5-12t28.5 12q11 11 11 28t-11 28L268-212q-11 11-28 11t-28-11Z",
    "FormatShapes": "M40-40v-240h80v-400H40v-240h240v80h400v-80h240v240h-80v400h80v240H680v-80H280v80H40Zm240-160h400v-80h80v-400h-80v-80H280v80h-80v400h80v80Zm32-120 136-360h64l136 360h-62l-32-92H408l-32 92h-64Zm114-144h108l-52-150h-4l-52 150ZM120-760h80v-80h-80v80Zm640 0h80v-80h-80v80Zm0 640h80v-80h-80v80Zm-640 0h80v-80h-80v80Zm80-640Zm560 0Zm0 560Zm-560 0Z",
  }

  return (
    <svg style={sx} viewBox="0 -960 960 960">
        <path d={iconDictionaryPaths[icon]}/>
    </svg>
  )
}
