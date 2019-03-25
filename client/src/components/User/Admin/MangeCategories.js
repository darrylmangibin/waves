import React from 'react';
import UserLayout from '../../../hoc/user';
import ManageBrands from './MangeBrands';
import ManageWoods from './MangeWoods';

const MangeCategories = () => {
  return (
    <div> 
      <UserLayout>
        <ManageBrands />
        <ManageWoods />
      </UserLayout>
    </div>
  )
}

export default MangeCategories;