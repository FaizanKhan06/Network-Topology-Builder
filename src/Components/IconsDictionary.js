import React from 'react'
import RouterOutlinedIcon from '@mui/icons-material/RouterOutlined';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';
import RssFeedOutlinedIcon from '@mui/icons-material/RssFeedOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import CropSquareOutlinedIcon from '@mui/icons-material/CropSquareOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';

import CustomPathIcon from './CustomPathIcon';
import CustomImageIcon from './CustomImageIcon';

export default function IconsDictionary({icon,sx}) {
    const iconsDictionary = {
        "RouterOutlinedIcon": <RouterOutlinedIcon sx={sx}/>,
        "ToggleOnIcon": <ToggleOnIcon sx={sx}/>,
        "PhoneIphoneIcon": <PhoneIphoneIcon sx={sx}/>,
        "CameraAltOutlinedIcon": <CameraAltOutlinedIcon sx={sx}/> ,
        "ComputerOutlinedIcon": <ComputerOutlinedIcon sx={sx}/>,
        "LocalPrintshopOutlinedIcon": <LocalPrintshopOutlinedIcon sx={sx}/>,
        "HubOutlinedIcon": <HubOutlinedIcon sx={sx}/>,
        "CloudOutlinedIcon": <CloudOutlinedIcon sx={sx}/>,
        "RssFeedOutlinedIcon": <RssFeedOutlinedIcon sx={sx}/>,
        "DnsOutlinedIcon": <DnsOutlinedIcon sx={sx}/>,
        "WallpaperOutlinedIcon": <WallpaperOutlinedIcon sx={sx}/>,
        "CropSquareOutlinedIcon" : <CropSquareOutlinedIcon sx={sx}/>,
        "CircleOutlinedIcon" : <CircleOutlinedIcon sx={sx}/>,
        "SettingsIcon": <SettingsIcon sx={sx}/>,
        "NoteAddOutlinedIcon": <NoteAddOutlinedIcon sx={sx}/>,
        "SaveOutlinedIcon": <SaveOutlinedIcon sx={sx}/>,
        "FolderOpenOutlinedIcon": <FolderOpenOutlinedIcon sx={sx}/>,
        //Custom Made Path Icons
        "LineCurve": <CustomPathIcon sx={sx} icon={icon}/>,
        "PenSize2": <CustomPathIcon sx={sx} icon={icon}/>,
        "FormatShapes": <CustomPathIcon sx={sx} icon={icon}/>,
        //Custom Jpg Png icons
        "testIcon": <CustomImageIcon {...(Object.keys(sx).length === 0 ? {} : { sx })} icon={icon} />,
    }
  return (
    <>
        {iconsDictionary[icon]}
    </>
  )
}

IconsDictionary.defaultProps = {
  sx: {},
  icon: 'Undefined'
};

