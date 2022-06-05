const axios = require("axios");


const getTokenResponseById = async (id) => {
    if (id === undefined) id = '';
    const serverURL = new URL("http://localhost:12345");
    serverURL.pathname =`/token/${id}`;

    const requestPayload = {
        method: 'get',
        url: serverURL.href,
        headers: { Accept: "application/json" }
    }
    const response = await axios(requestPayload);
    return response;
}


module.exports = {
    getTokenResponseById
}
