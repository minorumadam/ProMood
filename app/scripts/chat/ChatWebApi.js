/// <reference path="../underscore.js" />
/// <reference path="../jquery-2.1.1.min.js" />
var app = app || {};

app.ChatWebApi = function () {
    var me = {
        baseUrl: "http://" + window.server_url + ":" + window.http_port,
        setErrorCallback: function (onerror) {
            $jq.error = onerror;
        }
    };
    var call = function (url, method, data) {
        /// <summary>Call web api</summary>
        /// <param name="url" type="String">url of web api call</param>
        /// <param name="method" type="String">default get</param>
        /// <param name="data" type="Object">json object, default null</param>
        /// <returns type="Object"></returns>

        $jq.support.cors = true;

        return $jq.ajax({
            type: method || "GET",
            url: me.baseUrl + url,
            data: data
        });
    }

    var populateApi = function () {
        var populateConversations = function () {
            var resource = "/api/Conversations/";
            var getConversationTemplate = _.template("Create/{{partyId}}/With/{{otherPartyId}}");
            var findFriendsTemplate = _.template("AvailableFriendsOf/{{userId}}?myRole={{userRole}}");
            me.conversations = {
                registerPartyInformation: function (conversationPartyInformation) {
                    return call(resource + "RegisterPartyInformation", "PUT", conversationPartyInformation);
                },
                getRandomConversation: function (partyId) {
                    return call(resource + "Random/" + partyId, "POST");
                },
                getConversation: function (partyId, otherPartyId) {
                    return call(resource + getConversationTemplate({
                        partyId: partyId,
                        otherPartyId: otherPartyId
                    }), "POST");
                },
                findAvailableOnlineFriendsOf: function (userId, userRole) {
                    return call(resource + findFriendsTemplate({ userId: userId, userRole: userRole }));
                }
            };
        }();
        var populateUsers = function () {
            var resource = "/api/Users/";
            me.users = {
                get: function (id) {
                    var data = id == null ? null : { id: id };
                    return call(resource, "GET", data);
                },
                create: function (user) {
                    return call(resource, "POST", user);
                },
                update: function (user) {
                    return call(resource, "PUT", user);
                },
                "delete": function (id) {
                    return call(resource + id, "DELETE");
                },
                sampleUser: function() {
                    return call(resource + "sampleUser");
                }
            };
        }();
    }();
    return me;
}();
