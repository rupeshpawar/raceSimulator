const axios = require("axios");
const config = require("./config")
const db = require("./db/db")();
let model = require("./models/data.model").data;


let token = ""

async function subscribe() {

  try {

    if (!token){
      await login()
    }
    let response = await axios.get(config.API_BASE_URL+"/results", { headers: { Authorization: "Bearer "+token } });

    console.log(response.data)
    if(response.data){
      let obj = new model(response.data);
      await obj.save();
    }
    
    subscribe();

  } catch (error:any) {

    console.log(error)

    if (error.response && error.response.status == 401) {

      // The request was made and the server responded with a  401 status code

      // Generate new session

      await login()
      subscribe();

    } else if (error.response && error.response.status == 204) {

      // No content.

      // Let's make new request.

      subscribe();

    }  else if (error.response && error.response.status == 502) {

      // Status 502 is a connection timeout error,
      // may happen when the connection was pending for too long
      // let's reconnect
       subscribe();

    } else if (error.response && error.response.status != 200) {
      // An error - let's show it
      // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'response'. Did you mean 'Respons... Remove this comment to see the full error message
      console.log(response.statusText);
      // Reconnect in three second
      await new Promise(resolve => setTimeout(resolve, 3000));
      subscribe();

    } else if (error.request) {
      // The request was made but no response was received
      // let's reconnect
      subscribe();

    } else {
      // Something happened in setting up the request that triggered an Error
      // let's reconnect
      subscribe();
    }

  }

}

async function login() {

  try{
    
    console.log("loggin in")
    let loginResponse =  await axios.post(config.API_BASE_URL+'/auth', {
      "email": config.LOGIN_EMAIL,
      "password": config.LOGIN_PASSWORD
    });

    token = loginResponse.data.token;

    return

  }catch(error:any){

    if (error.response && error.response.status == 401) {

      // The request was made and the server responded with a  401 status code

      console.log("Login Credentials are wrong");
      process.exit(1)

    }else if (error.response && error.response.status == 502) {

      // Status 502 is a connection timeout error,
      // may happen when the connection was pending for too long
      // let's wait for sometime and try again
      await new Promise(resolve => setTimeout(resolve, 3000));

    } else{

      console.log("Issue with the login API");
      process.exit(1)

    }

  }

}

subscribe();

module.exports = subscribe