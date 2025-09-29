import React from 'react';
import Settings from '@/app/components/settings'
import { Typography } from '@mui/material';

const page = () => {
  return (
    <div>
      <Typography sx={{fontWeight:600,fontSize:'18px'}}>Settings</Typography>
      <span style={{color:'gray'}}>Manage your profile and security preferences</span>
      <Settings/>
      </div>
  )
}

export default page