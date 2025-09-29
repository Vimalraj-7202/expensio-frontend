import { Typography } from '@mui/material';
import React from 'react';

interface titleProps{
    title:string;
    subTitle:string
}

const CommonTitle = ({title,subTitle}:titleProps) => {
  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start'}}>
        <Typography sx={{fontWeight:600,fontSize:'20px'}}>{title}</Typography>
        <Typography sx={{fontSize:'15px',color:'gray'}}>{subTitle}</Typography>
    </div>
  )
}

export default CommonTitle