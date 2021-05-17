import React from 'react';

// custom home pages
import AnonHome from '../pages/home/AnonHome';
import CustomerHome from '../pages/home/CustomerHome'
import CourierHome from '../pages/home/CourierHome'
import ManagerHome from '../pages/home/ManageHome'

// returns the correct user home page based on the user type that is provided
const HomeFactory = (props) => {

  switch (props.userType) {
    case 'customer':
      return <CustomerHome {...props}/>
    case 'courier':
      return <CourierHome {...props}/>
    case 'manager':
      return <ManagerHome {...props}/>
    default:
      return <AnonHome />
  }

}

export default HomeFactory