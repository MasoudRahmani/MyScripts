// ==UserScript==
// @name         Sword King Page Gap
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Seperation of Pages for easier translation
// @author       Punsher2011
// @match        https://en.leviatanscans.com/*
// @match        https://survivaloftheswordking.com/manga/*
// @match        https://lscomic.com/manga/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @run-at       document-end
// @noframes
// @grant        none
// ==/UserScript==
'use strict';

function main() {
    jQuery("img").css("margin", "5pt auto");
    jQuery(".theimage").css("padding", "5pt");
    jQuery("img").css("padding", "3pt 0pt");

    jQuery(".c-blog-post .entry-content .entry-content_wrap .read-container img").css("background-color","#ddcd");
    jQuery(".body-wrap")[0].style="background-color: #a8bfbe; background-image:  radial-gradient(#618a7b 0.8px, transparent 0.8px), radial-gradient(#618a7b 0.8px, #a8bfbe 0.8px); background-size: 32px 32px; background-position: 0 0,16px 16px;"
    console.log("SK padding was added!");
}

var chkReadyState = setInterval(function() {
    if (document.readyState == "complete") {
        // clear the interval
        clearInterval(chkReadyState);
        main();
    }
}, 100);
