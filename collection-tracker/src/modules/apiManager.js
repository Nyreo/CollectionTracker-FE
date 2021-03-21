import axios from 'axios';

const baseuri = "http://localhost:8080"

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

export async function getPackageRequest(username, auth, courier="false") {
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

export async function patchPackageRequest(trackingNumber, status, auth) {
  return axios.patch(`${baseuri}/packages/tracking/${trackingNumber}`, {status},
  {
    headers: {
      'Authorization': auth
    }
  })
  .then(response => response.data)
  .catch(error => error.response.data)
}