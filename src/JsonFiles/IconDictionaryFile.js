import React from 'react';
import RouterOutlinedIcon from '@mui/icons-material/RouterOutlined';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';
import RssFeedOutlinedIcon from '@mui/icons-material/RssFeedOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import CropSquareOutlinedIcon from '@mui/icons-material/CropSquareOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';

import CustomPathIcon from '../Components/CustomPathIcon';
import CustomImageIcon from '../Components/CustomImageIcon';

const iconsDictionary = {
  RouterOutlinedIcon: { component: <RouterOutlinedIcon />, sx: {} },
  ToggleOnIcon: { component: <ToggleOnIcon />, sx: {} },
  PhoneIphoneIcon: { component: <PhoneIphoneIcon />, sx: {} },
  CameraAltOutlinedIcon: { component: <CameraAltOutlinedIcon />, sx: {} },
  ComputerOutlinedIcon: { component: <ComputerOutlinedIcon />, sx: {} },
  LocalPrintshopOutlinedIcon: { component: <LocalPrintshopOutlinedIcon />, sx: {} },
  HubOutlinedIcon: { component: <HubOutlinedIcon />, sx: {} },
  CloudOutlinedIcon: { component: <CloudOutlinedIcon />, sx: {} },
  WallpaperOutlinedIcon: { component: <WallpaperOutlinedIcon />, sx: {} },
  RssFeedOutlinedIcon: { component: <RssFeedOutlinedIcon />, sx: {} },
  DnsOutlinedIcon: { component: <DnsOutlinedIcon />, sx: {} },
  CropSquareOutlinedIcon: { component: <CropSquareOutlinedIcon />, sx: {} },
  CircleOutlinedIcon: { component: <CircleOutlinedIcon />, sx: {} },
  SettingsIcon: { component: <SettingsIcon />, sx: {} },
  NoteAddOutlinedIcon: { component: <NoteAddOutlinedIcon />, sx: {} },
  SaveOutlinedIcon: { component: <SaveOutlinedIcon />, sx: {} },
  FolderOpenOutlinedIcon: { component: <FolderOpenOutlinedIcon />, sx: {} },
  AddRoundedIcon: { component: <AddRoundedIcon />, sx: {} },
  CloseRoundedIcon: { component: <CloseRoundedIcon />, sx: {} },
  ConstructionRoundedIcon: { component: <ConstructionRoundedIcon />, sx: {} },
  DeleteIcon: { component: <DeleteIcon />, sx: {} },
  BorderColorRoundedIcon: { component: <BorderColorRoundedIcon />, sx: {} },
  // Custom Made Path Icons
  LineCurve: { component: <CustomPathIcon icon="LineCurve" />, sx: {} },
  PenSize2: { component: <CustomPathIcon icon="PenSize2" />, sx: {} },
  FormatShapes: { component: <CustomPathIcon icon="FormatShapes" />, sx: {} },
  // Custom Jpg Png icons
  testIcon: { component: <CustomImageIcon icon="testIcon" />, sx: {} },
};

export default iconsDictionary;
