var extendWebSocketProto = function() {
    WebSocket.prototype.sendObject = function (command, obj) {
        if (this.readyState != WebSocket.OPEN)
            throw "Invalid connection state: " + this.readyState;
        this.send(command + " " + obj);
    }

    WebSocket.prototype.sendTextMessage = function (text) {
        var data = { Type: 'Regular', Data: text };
        
        this.sendObject("Message", JSON.stringify(data));
    }
    
    WebSocket.prototype.sendProfile = function (text) {
        this.sendObject("Profile", text);
    }
 
    WebSocket.prototype.sendLogout = function () {
        this.sendObject("Logout", "");
    }
    
    WebSocket.prototype.sendWait = function () {
        this.sendObject("Wait", "");
    }
    
        
    WebSocket.prototype.sendAccepted = function () {
        this.sendObject("Accept", "");
    }
        
    WebSocket.prototype.sendDeclined = function (reason) {
        this.sendObject("Decline", reason);
    }
    
    WebSocket.prototype.getStatus = function () {
        var me = this;
        var prop = Object.getOwnPropertyNames(WebSocket).filter(function (name) {
            return me.readyState === me[name];
        });
        if (prop.length === 0)
            throw "Invalid State Value";
        return prop[0];
    };

    WebSocket.prototype.attachEvents = function (options) {
        if (options.onopen)
            this.onopen = options.onopen;
        if (options.onerror)
            this.onerror = function (evt) {
                options.onerror(evt.message);
            };
        if (options.onclose)
            this.onclose = options.onclose;
        this.onmessage = function (evt) {
            if (!evt.data)
                return console.log("Event with empty data");
            var msg = JSON.parse(evt.data);
            var onMessageTypeEvent = options["on" + msg.TypeName]; //registered callback for message type event
            if (onMessageTypeEvent != null)
                return onMessageTypeEvent(msg);
            if (options.onmessage != null)
                return options.onmessage(msg);
            return null;
        };
    }
}();

var app = app || {};
app.createUserWebSocket = function (options) {
    var socket = new WebSocket(options.url);
    socket.attachEvents(options);
    return socket;
};