const axios = require("axios");


const getTokenResponseById = async (id) => {
    if (id === undefined) id = '';
    const serverURL = new URL("http://localhost:12345");
    serverURL.pathname =`/token/${id}`;

    const requestPayload = {
        method: 'get',
        url: serverURL.href,
        headers: { Accept: "application/json, text/plain, */*" }
    }
    let response; 
    try {
        response = await axios(requestPayload);
    } catch (error) { //required as Axios will fail anything that is not in a response range of 2xx
        return error.response;
    }

    return response;
}


module.exports = {
    getTokenResponseById
}
