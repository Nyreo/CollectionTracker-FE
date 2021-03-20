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
  console.log(credentials) // remove prod

  try {
    const response = await axios.post(`${baseuri}/accounts`, credentials)

    const authHeader = generateToken(credentials);
    return {response, authHeader}
  } catch (error) {
    console.log(error)
    return {error}
  }
}

export async function postPackageRequest(_package, auth) {
  // console.log(_package)

  console.log(`authHeader: ${auth}`)

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
    console.log(error)
    return {error}
  }
}