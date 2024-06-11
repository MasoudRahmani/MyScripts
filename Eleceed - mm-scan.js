// ==UserScript==
// @name         Eleceed - mm-scan
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Eye Candy
// @author       Punsher2011
// @match        https://mm-scans.org/manga/*
// @match        https://void-scans.com/1/eleceed*
// @match        https://eleceed.me/comic/*
// @match        https://hivetoon.com/1/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @run-at       document-end
// @noframes
// @grant        none
// ==/UserScript==
'use strict';

let jQr = jQuery;
var where = parent.top.location.href;

function main() {
    if (where.search("hivescans") != -1) {
        jQr("#readerarea")[0].style = "background-color: #a8bfbe; background-image:  radial-gradient(#618a7b 0.8px, transparent 0.8px), radial-gradient(#618a7b 0.8px, #a8bfbe 0.8px); background-size: 32px 32px; background-position: 0 0,16px 16px;"
            jQr("#readerarea p").css("margin", "20px 0px");
    } else if (where.search("eleceed.me") != -1) {
        jQr("img").css("margin", "20px 0px");
        jQr(".entry-inner")[0].style = "background-color: #a8bfbe; background-image:  radial-gradient(#618a7b 0.8px, transparent 0.8px), radial-gradient(#618a7b 0.8px, #a8bfbe 0.8px); background-size: 32px 32px; background-position: 0 0,16px 16px;"
    } else {

        jQr(".c-blog-post .entry-content .entry-content_wrap .read-container img").css("margin", "20px 0px");
        jQr(".content-area")[0].style = "background-color: #a8bfbe; background-image:  radial-gradient(#618a7b 0.8px, transparent 0.8px), radial-gradient(#618a7b 0.8px, #a8bfbe 0.8px); background-size: 32px 32px; background-position: 0 0,16px 16px;"
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
