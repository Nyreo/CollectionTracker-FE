import React, {lazy} from 'react';

// lazily loaded tabs
const CourierTable = lazy(() => import('../display/CourierTable'));
const IdlePackageTable = lazy(() => import('../display/IdlePackageTable'));
const DeliveredPackagesTable = lazy(() => import('../display/DeliveredPackagesTable'));

const TabFactory = (props) => {
  switch(props.currentTab) {
    case 0:
      return <CourierTable data={props.courierInfo.undelivered} />
    case 1:
      return <IdlePackageTable data={props.courierInfo.idle} />
    case 2:
      return <DeliveredPackagesTable data={props.courierInfo.delivered} />
    default:
      return <CourierTable data={props.courierInfo.undelivered} />
  }
}

export default TabFactory;