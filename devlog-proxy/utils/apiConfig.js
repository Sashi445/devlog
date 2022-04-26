
const ApiConfiguration = {
    rootApiUrl : "https://api.github.com",
    headerAccept : "application/vnd.github.v3+json",
    accessToken : (token) => token,
    buildHeadersWithAccessToken: (token) => ({
        accept : this.headerAccept,
        authorization : this.accessToken(token)
    }),
    buildHeadersWithoutAccessToken: () => ({
        accept : this.headerAccept
    })
}

module.exports = ApiConfiguration;