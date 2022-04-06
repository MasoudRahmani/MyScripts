// ==UserScript==
// @name         Sword King Page Gap
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Seperation of Pages for easier translation
// @author       Punsher2011
// @match        https://leviatanscans.com/*
// @match        https://survivaloftheswordking.com/manga/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @run-at       document-end
// @noframes
// @grant        none
// ==/UserScript==
'use strict';

function main() {
    jQuery("img").css("margin", "25pt auto");
    jQuery("img").css("padding", "10pt");
    jQuery(".separator").css("background","darkgrey");
    console.log("padding was added!");
}

main();
