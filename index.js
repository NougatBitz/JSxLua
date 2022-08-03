// I have never made anything in Javascript before, dont judge :heart_eyes:

const SocketServer  = require("ws").Server;
const express       = require("express");
const Request       = require("request");

const ExpressServer = express().listen(3000);
const WebSocketServer = new SocketServer({
    server: ExpressServer
});


WebSocketServer.on("connection", (WebSocketClient) => {
    WebSocketClient.on("message", (clientMessage, isBinary) => {
        clientMessage = isBinary ? clientMessage : clientMessage.toString()

        const rawClientData = JSON.parse(clientMessage)
        const cookieJar     = Request.jar();

        // convert data indexes to lowercase
        const clientData = {}
        for (var optionName in rawClientData) {
            var optionValue = rawClientData[optionName]
            clientData[optionName.toLowerCase()] = optionValue
        }

        // add cookies to cookieJar
        if (clientData.cookies) {
            for (var cookieName in clientData.cookies) {
                const newCookie = cookieName + "=" + clientData.cookies[cookieName]
                cookieJar.setCookie(newCookie)
            }
        }

        Request(clientData, (error, response) => {
            const responseHeaders = {}
            const responseCookies = {}

            // split cookies and headers to separate arrays
            for (var headerName in response.headers) {
                var headerValue = response.headers[headerName]
                if (headerName == "set-cookie") {
                    for (var cookieIndex in headerValue) {
                        const cookie = headerValue[cookieIndex].toString()
                        const cookieName = cookie.split("=")[0]

                        var cookieValue = cookie.split(";")[0]
                        cookieValue = cookieValue.substring(cookieName.length + 1, cookieValue.length)

                        responseCookies[cookieName] = cookieValue
                    }
                } else {
                    responseHeaders[headerName] = headerValue
                }
            }

            // send response to client
            WebSocketClient.send(JSON.stringify({
                "StatusMessage": response.statusMessage,
                "Success": response.complete,
                "StatusCode": response.statusCode,
                "Body": response.body,
                "Cookies": responseCookies,
                "Headers": responseHeaders
            }))
        })
    });
});
