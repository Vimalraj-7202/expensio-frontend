import React from 'react';
import Reports from '@/app/components/reports/index';
import CommonTitle from '@/app/common/CommonTitle';

const page = () => {
  return (
    <div>
      <CommonTitle title='Reports' subTitle='Visualize your spending patterns.'/>
      <Reports/>
      </div>
  )
}

export default page