// ==UserScript==
// @name         background Color Changer
// @namespace    http://tampermonkey.net/
// @version      6.0
// @description  Change Background Color to borderline sick
// @author       You
// @match        *://*/*
// @run-at       document-end
// @noframes
// @grant        none
// ==/UserScript==
'use strict';
var where = parent.top.location.href;
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
var restricted = ['VeryBadIframe_crossdoamain_GTFO', 'twitch.tv', 'eset'];

// if we are not in iframe // @noframes does the same, faster and better
/*try { if (window.self == window.top) where = parent.top.location.href; } catch (e) { where = 'VeryBadIframe_crossdoamain_GTFO'; } */

function isTransparent(color) {
    const a = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
    return a[3] == 0 ? true : false;
}
//https://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black
function UglyBlack(rgbString) {
    let color = rgbString.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
    let luma = 0.2126 * color[0] /*Red*/ +
        0.7152 * color[1] /*Green*/ +
        0.0722 * color[2] /*BLUE*/; // per ITU-R BT.709
    if (luma < 30) {
        return true;
    }
    else { return false; }
}

/* ----------- ***----------------- */
function main() {
    //if (localStorage.BCC_RestrictedSites === undefined)
      //  localStorage.setItem("BCC_RestrictedSites", restricted);

    //const anythingWrong = localStorage.BCC_RestrictedSites.split(",").filter((x) => { if (where.includes(x)) { console.log(`Background Changer exited bc this site "${x}" is restricted`); return x; } });
    const anythingWrong = restricted.filter((x) => { if (where.includes(x)) { console.log(`Background Changer exited bc this site "${x}" is restricted`); return x; } });
    if (anythingWrong.length > 0) return;
    else backColorChanger();
};

function backColorChanger() {
    console.log("Background Color Changer called");
    var bodyBackground = window.getComputedStyle(document.getElementsByTagName('body')[0]);
    if (validURL(bodyBackground.backgroundImage.slice(5, -2)) == true) {console.log("Image Background, script stopped");return;} //Image is the background

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

    let backColor = bodyBackground.backgroundColor;
    console.log(` ${backColor} Ugly Black? ${UglyBlack(backColor)}`);
    if (!isTransparent(backColor)) {// if background is not transparent
        let finallColor = colors.whitegray;
        let blendmuch = 0.7;
        if (UglyBlack(backColor)) {
            finallColor = pSBC(blendmuch, backColor, finallColor);
            console.log("dominant color log:   " + backColor + " -> " + hexToRGB(finallColor, 0.85));
            document.getElementsByTagName('body')[0].style.background = hexToRGB(finallColor, 0.85);
            checkTextColor();
        }
    }
}
//************ Font Color to match whiteish background **************//
function checkTextColor() {
    if (where.search("pornhub") != -1) {
        let links = document.querySelectorAll('span.title a');
        for (let counter = 0; counter < links.length; counter++) {
            links[counter].style.color = colors.darkblue;
        }
    }
    if (where.search("xvideos") != -1) {
        let links = document.querySelectorAll('p.title a');
        for (let counter = 0; counter < links.length; counter++) {
            links[counter].style.color = colors.darkblue;
        }
    }
}
//************ Url Check **************//
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}
//************ Color representation **************//
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
//************ Blender **************//
//https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
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



main();

