// ==UserScript==
// @name         Sword King Page Gap
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Seperation of Pages for easier translation
// @author       Punsher2011
// @match        https://leviatanscans.com/*
// @match        https://survivaloftheswordking.com/manga/*
// @grant        none
// ==/UserScript==
'use strict';

//https://stackoverflow.com/questions/16230886/trying-to-fire-the-onload-event-on-script-tag
//https://stackoverflow.com/questions/16839698/jquery-getscript-alternative-in-native-javascript/28002292#28002292
function loadScript(_url, thencallthis) {
    let injectPos = document.getElementsByTagName('script')[0];
    let script = document.createElement('script');
    script.type = "text/javascript";
    script.async = 1;
    script.onload = script.onreadystatechange = function (_, isAbort) {
        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = script.onreadystatechange = null;
            script = undefined;
            if (!isAbort && thencallthis) {
                if (typeof ($) === 'undefiend') var $ = window.jQuery;
                setTimeout(thencallthis, 0);
            }
        }
    };
    script.src = _url;
    injectPos.parentNode.insertBefore(script, injectPos);
}
function load() {
    if (document.readyState === "complete") main();
    else window.addEventListener('load', main);
}
function main() {
    jQuery("img").css("margin", "25pt auto");
    jQuery("img").css("padding", "10pt");
    jQuery(".separator").css("background","darkgrey");
}

//if self content security is enabled, i cant load
if (typeof (window.jQuery) === 'undefined') {
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js', load);/*Injecting Script mostly does not work*/
}
else load();