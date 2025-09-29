import React from 'react';
import Settings from '@/app/components/settings'
import { Typography } from '@mui/material';
import CommonTitle from '@/app/common/CommonTitle';

const page = () => {
  return (
    <div>
      <CommonTitle title='Settings' subTitle='Manage your profile and security preferences.'/>
      <Settings/>
      </div>
  )
}

export default page