/// <reference path="underscore.js" />

//mustache style templating
if (_ != null)
    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    };