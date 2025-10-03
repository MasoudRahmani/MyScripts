// ==UserScript==
// @name         Eleceed - mm-scan
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Eye Candy
// @author       Punsher2011
// @match        https://mm-scans.org/manga/*
// @match        https://void-scans.com/1/eleceed*
// @match        https://eleceed.me/comic/*
// @match        https://hivetoon.com/*
// @match        https://hivetoons.org/*
// @match        https://hivecomic.com/series/eleceed/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @run-at       document-end
// @noframes
// @grant        none
// ==/UserScript==
'use strict';

let jq = $();
var where = parent.top.location.href;

function main() {
    if (where.search("hivetoon") != -1 || where.search("hive") != -1) {
        let h = document.getElementsByClassName("min-h-screen")[0];
        h.style = "background-color: #a8bfbe; background-image:  radial-gradient(#618a7b 0.8px, transparent 0.8px), radial-gradient(#618a7b 0.8px, #a8bfbe 0.8px); background-size: 32px 32px; background-position: 0 0,16px 16px;";
        jQuery("section.w-full.flex.flex-col.justify-center.items-center div").css("margin", "10px 0px");
    } else if (where.search("eleceed.me") != -1) {
        jQuery("img").css("margin", "20px 0px");
        jQuery(".entry-inner")[0].style = "background-color: #a8bfbe; background-image:  radial-gradient(#618a7b 0.8px, transparent 0.8px), radial-gradient(#618a7b 0.8px, #a8bfbe 0.8px); background-size: 32px 32px; background-position: 0 0,16px 16px;"
    } else {
        console.log("Not a valid site");
    }
    console.log("Eleceed easy eye was added!");

}

var chkReadyState = setInterval(function () {
    if (document.readyState == "complete") {
        // clear the interval
        clearInterval(chkReadyState);
        main();
    }
}, 100);
