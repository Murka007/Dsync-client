// ==UserScript==
// @name Dsync Client loader
// @author Murka
// @description The most advanced hack for sploop.io
// @version 0.1
// @match *://sploop.io/*
// @run-at document-start
// @grant none
// @license MIT
// @namespace https://greasyfork.org/users/919633
// ==/UserScript==
/* jshint esversion:6 */

/*
    Author: Murka
    Github: https://github.com/Murka007/Dsync-client
    Discord: https://discord.gg/sG9cyfGPj5
    Greasyfork: https://greasyfork.org/en/users/919633
*/

(function() {
    "use strict";

    // GET request handler, sync and async request support
    const getData = (link, callback, async = true) => {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", link, async);
            xhr.send();

            const result = (event) => {
                return typeof callback === "function" ? callback(event) : resolve(event);
            }
            xhr.onload = result;
            if (async === false && xhr.status === 200) result(xhr);
        })
    }

    // Each game have it's own hack
    const sources = {
        sploop: "https://raw.githubusercontent.com/Murka007/Dsync-client/main/build/Dsync_Client.js"
    }

    // Check if url includes specific game name
    for (const key in sources) {
        if (!location.host.includes(key)) continue;

        // Get our hack from repository and execute it on the page
        getData(sources[key], event => Function(event.responseText)(), false)
        break;
    }

})();