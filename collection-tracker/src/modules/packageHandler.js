import axios from 'axios';

const baseuri = process.env.NODE_ENV === 'production' ? "https://mitch137-ct-api.herokuapp.com/v3" : "http://localhost:8080/v3"

export async function getPackageRequestByUser(username, auth, courier="false") {
  try {
    const response = await axios.get(`${baseuri}/packages?username=${username}&courier=${courier}`, 
    {
      headers: {
        'Authorization': auth
      }
    })

    console.log(response)
    return response
  }
  catch (error) {
    console.log(error)
    return {error}
  }
}

// accounts.get, packages.get?username=username&courier=true
export async function getGroupedPackages(auth) {
  // get all users who are couriers
  console.log("-getGroupedPackages");
  
  const response = await axios.get(`${baseuri}/packages`, 
  {
    headers: {
      'Authorization': auth
    }
  })
  .then(response => response.data.data)
  .catch(error => { return {error}})

  // get grouped data
  if(!response.error) {

    const groupedPackages = {}
    const idlePackages = []
    const deliveredPackages = []

    response.forEach(p => {
      if(p.courier) {
        if(!groupedPackages[p.courier]) {
          groupedPackages[p.courier] = [p]
        } else {
          groupedPackages[p.courier].push(p);
        }
      } else {
        idlePackages.push(p);
      }

      if(p.status === "delivered") deliveredPackages.push(p);
    })

    return {data : {
      groupedPackages,
      idlePackages,
      deliveredPackages
      }
    }
  } else return response.error
}

export async function getSpecificPackage(auth, trackingnumber) {
  try {
    const response = await axios.get(`${baseuri}/packages/${trackingnumber}`, 
    {
      headers: {
        'Authorization': auth
      }
    })

    console.log(response)
    return response
  }
  catch (error) {
    console.log(error)
    return {error}
  }
}

export async function postPackageRequest(_package, auth) {
  try {
    const response = await axios.post(`${baseuri}/packages`, _package,
    {
      headers: {
        'Authorization': auth
      }
    })

    console.log(response)
    return response
  } catch (error) {
    console.log(`error ${error}`)
    return {error}
  }
}

export async function patchPackagePickup(trackingnumber, status, auth) {
  return axios.patch(`${baseuri}/packages/${trackingnumber}`, {status},
  {
    headers: {
      'Authorization': auth
    }
  })
  .then(response => response.data)
  .catch(error => error.response.data)
}

export async function patchPackageDeliver(trackingnumber, status, auth, deliveryDetails, signature64) {
  return axios.patch(`${baseuri}/packages/${trackingnumber}`, {status, deliveryDetails},
  {
    headers: {
      'Authorization': auth
    }
  })
  .then(() => postPackageSignature(trackingnumber, signature64, auth))
  .then(response => response)
  .catch(error => error.response.data)
}

async function postPackageSignature(trackingNumber, signature64, auth) {
  return axios.post(`${baseuri}/packages/signatures`,
  {
    trackingNumber,
    signature64
  },
  {
    headers: {
      'Authorization': auth
    }
  })
}