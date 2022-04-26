const serverConfig = {
    proxyUrl : "http://localhost:8080",
    getHeaders : function(accessToken) {
        return {
            "authorization" : `Bearer ${accessToken}`,
            "accept" : "application/json"
        }
    }
}

export default serverConfig