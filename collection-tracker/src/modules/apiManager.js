import axios from 'axios';

const baseuri = "http://localhost:8080/v3"

const generateToken = (userDetails) => {
  return `Basic ${btoa(`${userDetails.username}:${userDetails.password}`)}`;
}

export async function loginRequest(credentials) {
  const authHeader = generateToken(credentials)
  try {
    const response = await axios.get(`${baseuri}/accounts`, 
    {
      headers: {
        'Authorization': authHeader
      }
    })

    return {response, authHeader}

  } catch (error) {
    console.log(error)

    return {error: "Invalid login credentials. Please try again."}
  }
}

export async function registerRequest(credentials) {
  try {
    const response = await axios.post(`${baseuri}/accounts`, credentials)

    const authHeader = generateToken(credentials);
    return {response, authHeader}
  } catch (error) {
    console.log(error)
    return {error}
  }
}

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
export async function getCourierPackages(auth) {
  // get all users who are couriers
  return axios.get(`${baseuri}/accounts/couriers`, 
  {
    headers: {
      'Authorization': auth
    }
  })
  // returns user details
  .then(response => response.data.data.couriers)
  .then(couriers => {
    const courierData = {}

    couriers.forEach(courier => {
      const cPackages = axios.get(`${baseuri}/packages?username=${courier}&courier=true&status=any`, {
        headers: {
          'Authorization': auth
        }
      }).then(response => {
        return { courier, data: response.data.data}
      })

      courierData[courier] = cPackages
    })
    
    return {data: courierData}
  })
  .catch(error => console.log(error))

  // get all packages for each courier
    // those that are not yet delivered
      // return { 'courier' : packages }
}

// packages.get
export async function getIdlePackages(auth) {
  // get all packages who's status $eq : not-dispatched
}

export async function getDeliveredPackages(auth) {
  // get all packages who's status $eq : delivered
  // sort by delivery time
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