import axios from 'axios';

const baseuri = process.env.NODE_ENV === 'production' ? "https://mitch137-ct-api.herokuapp.com/v3" : "http://localhost:8080/v3"

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