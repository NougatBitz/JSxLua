local HttpService   = game:GetService("HttpService")
local RunService    = game:GetService("RunService")
local Heartbeat     = RunService.Heartbeat
local SocketConnect = (syn and syn.websocket.connect) or (WebSocket and WebSocket.connect)

local javascript = {
    __websocket = SocketConnect("ws://localhost:3000");
}

function javascript.reconnect()
    if javascript.__websocket then j
        javascript.__websocket:Close() 
    end
    javascript.__websocket = SocketConnect("ws://localhost:3000")
end

function javascript.request(Data, Timeout)
    local StartResponse = tick()
    local ServerResponse, OnMessage

    Timeout = Timeout or 60

    OnMessage = javascript.__websocket.OnMessage:Connect(function(Response)
        ServerResponse = HttpService:JSONDecode(Response)

        OnMessage:Disconnect() 
    end)

    javascript.__websocket:Send( HttpService:JSONEncode( Data ) )

    repeat Heartbeat:wait() 
    until (ServerResponse) or ((tick() - StartResponse) > Timeout)

    return ServerResponse
end

return javascript
