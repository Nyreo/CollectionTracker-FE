import axios from 'axios';

const baseuri = "http://localhost:8080/v2"

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
    const response = await axios.get(`${baseuri}/packages/${username}?courier=${courier}`, 
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

export async function getSpecificPackage(auth, trackingnumber) {
  try {
    const response = await axios.get(`${baseuri}/packages?trackingnumber=${trackingnumber}`, 
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

export async function patchPackageRequest(trackingnumber, status, auth) {
  return axios.patch(`${baseuri}/packages/?trackingnumber=${trackingnumber}`, {status},
  {
    headers: {
      'Authorization': auth
    }
  })
  .then(response => response.data)
  .catch(error => error.response.data)
}