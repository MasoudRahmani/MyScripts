// ==UserScript==
// @name         background Color Changer
// @namespace    http://tampermonkey.net/
// @version      5.0
// @description  Change Background Color to borderline sick
// @author       You
// @match        *://*/*
// @exclude      *://*twitch.tv/*
// @grant        none
// ==/UserScript==
'use strict';
var where = '';
const colors = {
    darkorange: '#ab7c49',
    darkblue: '#113078',
    lightblue: '#6490f5',
    smoothpurple: '#886085',
    whitegray: '#f2f2f2',
    lightpurple: '#c288bd',
    darkyellow: "#6d5e44",
    blueaccent: '#006cb0' //need white font
}

try {// if we are not in iframe
    if (window.self == window.top) where = parent.top.location.href;
} catch (e) {
    where = 'VeryBadIframe_crossdoamain_GTFO'; // we should not be here
}
var restricted = ['VeryBadIframe_crossdoamain_GTFO', 'twitch.tv', 'onepiecechapters.com/manga/one-piece', '192.', '127.', 'localhost', 'eset'];
//https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
// Version 4.0
const pSBC = (p, c0, c1, l) => {
    let r, g, b, P, f, t, h, i = parseInt, m = Math.round, a = typeof (c1) == "string";
    if (typeof (p) != "number" || p < -1 || p > 1 || typeof (c0) != "string" || (c0[0] != 'r' && c0[0] != '#') || (c1 && !a)) return null;
    if (!this.pSBCr) this.pSBCr = (d) => {
        let n = d.length, x = {};
        if (n > 9) {
            [r, g, b, a] = d = d.split(","), n = d.length;
            if (n < 3 || n > 4) return null;
            x.r = i(r[3] == "a" ? r.slice(5) : r.slice(4)), x.g = i(g), x.b = i(b), x.a = a ? parseFloat(a) : -1
        } else {
            if (n == 8 || n == 6 || n < 4) return null;
            if (n < 6) d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : "");
            d = i(d.slice(1), 16);
            if (n == 9 || n == 5) x.r = d >> 24 & 255, x.g = d >> 16 & 255, x.b = d >> 8 & 255, x.a = m((d & 255) / 0.255) / 1000;
            else x.r = d >> 16, x.g = d >> 8 & 255, x.b = d & 255, x.a = -1
        } return x
    };
    h = c0.length > 9, h = a ? c1.length > 9 ? true : c1 == "c" ? !h : false : h, f = this.pSBCr(c0), P = p < 0, t = c1 && c1 != "c" ? this.pSBCr(c1) : P ? { r: 0, g: 0, b: 0, a: -1 } : { r: 255, g: 255, b: 255, a: -1 }, p = P ? p * -1 : p, P = 1 - p;
    if (!f || !t) return null;
    if (l) r = m(P * f.r + p * t.r), g = m(P * f.g + p * t.g), b = m(P * f.b + p * t.b);
    else r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5), g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5), b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5);
    a = f.a, t = t.a, f = a >= 0 || t >= 0, a = f ? a < 0 ? t : t < 0 ? a : a * P + t * p : 0;
    if (h) return "rgb" + (f ? "a(" : "(") + r + "," + g + "," + b + (f ? "," + m(a * 1000) / 1000 : "") + ")";
    else return "#" + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2)
}
function isTransparent(color) {
    const a = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
    return a[3] == 0 ? true : false;
}
function UglyBlack(rgbString) {
    //https://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black
    let color = rgbString.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
    let luma = 0.2126 * color[0] /*Red*/ +
        0.7152 * color[1] /*Green*/ +
        0.0722 * color[2] /*BLUE*/; // per ITU-R BT.709
    console.log(luma);
    if (luma < 30) {
        return true;
    }
    else { return false; }
}
function rgbToHex(r, g, b, a) {
    const color = "rbga(" + r + "," + g + "," + b + "," + a + ")";
    const rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
    const hex = `#${((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1)}`;

    return hex;
}
function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

//https://stackoverflow.com/questions/16230886/trying-to-fire-the-onload-event-on-script-tag
//https://stackoverflow.com/questions/16839698/jquery-getscript-alternative-in-native-javascript/28002292#28002292
function loadScript(_url, thencallthis, errorcallback) {
    let injectPos = document.getElementsByTagName('script')[0];
    let script = document.createElement('script');
    script.type = "text/javascript";
    script.async = 1;
    script.onload = script.onreadystatechange = function (_, isAbort) {
        const src = script.src;
        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = script.onreadystatechange = null;
            script = undefined;
            if (!isAbort && thencallthis) {
                if (typeof ($) === 'undefiend') var $ = window.jQuery;
                console.log('Success loading: ' + src);
                setTimeout(thencallthis, 0);
            }
        }
    };
    script.onerror = () => {
        console.log('Error loading: ' + script.src);
        console.log('FallBack to ErrorCallBack: ' + (typeof errorcallback == 'function'));
        if (errorcallback) {
            setTimeout(errorcallback, 0);
        }
    }
    script.src = _url;
    injectPos.parentNode.insertBefore(script, injectPos);
}
/* ----------- ***----------------- */
function main() {
    const anythingWrong = restricted.filter((x) => { if (where.includes(x)) return x });
    if (anythingWrong.length === 0) {
        //if self content security is enabled, i cant load
        // if (typeof (window.jQuery) === 'undefined') {
        //     loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js', load, load);/*Injecting Script mostly does not work*/
        // }
        // else load();
        load();
    }
};
function load() {
    if (document.readyState === "complete") backColorChanger();
    else window.addEventListener('load', backColorChanger);
}

function backColorChanger() {
    //exception
    if (where.search("onepiece.fandom.com") != -1) { return; }

    //custom color for Black Site With Content ID
    if (where.search("webtoon") != -1 ||
        where.search("fandom") != -1 ||
        where.search("encyclopediadramatica.wiki") != -1 ||
        where.search("pluralsight") != -1
    ) {
        let model_one = document.getElementById("content");
        model_one.style.background = hexToRGB(colors.darkblue, 0.7);
        document.querySelectorAll('td').forEach((x) => { x.style.background = hexToRGB(colors.darkyellow, 0.79); })
        //model_one.style.color="Black";
        return;
    }
    //custom color for viki.com
    if (where.search("viki") != -1) {
        //BackGround Color
        let container = document.getElementsByClassName("darkmode");
        container[0].style.background = colors.smoothpurple;
        let len = document.getElementsByClassName("card").length;
        for (let jcnt = 0; jcnt < len; jcnt++) {
            document.getElementsByClassName("card")[jcnt].style.background = colors.smoothpurple;
            document.getElementsByClassName("card-content")[jcnt].style.background = colors.smoothpurple;
        }
        return;
    }
    //custom color for all other


    let backColor = window.getComputedStyle(document.getElementsByTagName('body')[0]).backgroundColor;
    if (!isTransparent(backColor)) {// if background is not transparent
        let finallColor = colors.whitegray;
        let blendmuch = 0.7;
        if (UglyBlack(backColor)) {
            finallColor = pSBC(blendmuch, backColor, finallColor);//maker it lighter
            console.log("dominant color log:   " + backColor + " -> " + hexToRGB(finallColor, 0.85));
            document.getElementsByTagName('body')[0].style.background = hexToRGB(finallColor, 0.85);
        } else {
            //finallColor = pSBC(blendmuch - 0.13, backColor, '#886085');//maker it darker
        }
        //console.log("dominant color log:   " + backColor + " -> " + hexToRGB(finallColor, 0.45));
        //document.getElementsByTagName('body')[0].style.background = hexToRGB(finallColor, 0.45);

        if (where.search("pornhub") != -1) {
            let links = document.querySelectorAll('span.title a');
            for (let counter = 0; counter < links.length; counter++) {
                links[counter].style.color = colors.darkblue;//"Black";
            }
        }
    }
}

main();
