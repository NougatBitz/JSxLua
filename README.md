### I made this for fun, i usually dont code in JS.

#### Setup
1. Run index.js on your Computer (it connects to localhost:3000)
2. Done. You can now use the javascript module.

#### Example
```lua

--[[
    <table> javascript.request(<table> options, <number> timeout - optional )
        Example:
            javascript.request({
                Url     = "https://google.com";
                Proxy   = "http://localproxy.com"
            })
        Note: 
            All options inputted will be converted to lowercase. (the keys)
            All cookies returned will have lowercase keys.
            The response is exactly the same to syn.request.
    <void> javascript.reconnect(<void>)
        Example:
            javascript.reconnect()
        Note: 
            This closes the old websocket connection and reconnects again. 
            Not sure for what u would use this but i added it.
]]

local javascript = loadstring(game.HttpGet(game, "https://raw.githubusercontent.com/NougatBitz/JSxLua/main/script.lua"))()
local response = javascript.request({
    Url = "http://httpbin.org/get";
})
print(response.StatusCode)
```
