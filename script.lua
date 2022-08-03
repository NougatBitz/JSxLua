local HttpService   = game:GetService("HttpService")
local RunService    = game:GetService("RunService")
local Heartbeat     = RunService.Heartbeat
local SocketConnect = (syn and syn.websocket.connect) or (WebSocket and WebSocket.connect)

local javascript = {
    __websocket = SocketConnect("ws://localhost:3000");
}

function javascript.reconnect()
    javascript.__websocket = SocketConnect("ws://localhost:3000")
end

function javascript.request(Data)
    local ServerResponse, OnMessage

    OnMessage = javascript.__websocket.OnMessage:Connect(function(Response)
        ServerResponse = HttpService:JSONDecode(Response)

        OnMessage:Disconnect() 
    end)

    javascript.__websocket:Send( HttpService:JSONEncode( Data ) )

    repeat Heartbeat:wait() until ServerResponse

    return ServerResponse
end

return javascript
