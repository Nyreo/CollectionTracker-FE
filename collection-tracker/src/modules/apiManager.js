import axios from 'axios';

const baseuri = "http://localhost:8080"


export async function loginRequest(credentials) {
  console.log(credentials) // remove prod

  const {username, password} = credentials;
  const token = btoa(`${username}:${password}`)
  
  const authHeader = `Basic ${token}`

  try {

    const response = await axios.get(`${baseuri}/accounts`, {
      headers: {
        'Authorization': authHeader
      }
    })

    return response

  } catch (error) {
    console.log(error)

    return {error: "Invalid login credentials. Please try again."}
  }
}

export async function registerRequest(credentials) {
  console.log(credentials) // remove prod

  try {
    const response = await axios.post(`${baseuri}/accounts`, {
      data: credentials
    })

    console.log(response)
  } catch (error) {
    console.log(error)
  }
}