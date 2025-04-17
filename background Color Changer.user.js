// ==UserScript==
// @name         background Colour Changer
// @namespace    http://tampermonkey.net/
// @version      6.0
// @description  Change Background Color to borderline sick | disqus comment box
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
    moreblue: '#2c53b5',
    smoothpurple: '#886085',
    whitegray: '#f2f2f2',
    lightpurple: '#c288bd',
    darkyellow: '#6d5e44',
    darkgray: '#a9a9a9',
    aliceblue: '#f0f8ff',
    somegray: '#dddfe1',
    blueaccent: '#006cb0' //need white font
}
var restricted = ['VeryBadIframe_crossdoamain_GTFO', 'twitch.tv', 'eset'];

var mstyles = [
    {id:1, sites:['webtoon','encyclopediadramatica.wiki']},//pluralsight
    {id:2, sites:['viki']},
]

// if we are not in iframe // @noframes does the same, faster and better
/*try { if (window.self == window.top) where = parent.top.location.href; } catch (e) { where = 'VeryBadIframe_crossdoamain_GTFO'; } */

/* ----------- ***----------------- */
function main() {
    const anythingWrong = restricted.filter((x) => { if (where.includes(x)) { console.log(`Background Changer exited bc this site "${x}" is restricted`); return x; } });
    if (anythingWrong.length > 0) return;
    else backColorChanger();
};

function backColorChanger() {
    console.log("Background Color Changer called");
    var bodyBackground = window.getComputedStyle(document.getElementsByTagName('body')[0]);
    if (validURL(bodyBackground.backgroundImage.slice(5, -2)) == true) {console.log("Image Background, script stopped");return;} //Image is the background

    //custom color for Black Site With Content ID
    if (mstyles[0].sites.some(x=> {return where.includes(x);})
       ) {
        let model_one = document.getElementById("content");
        model_one.style.background = hexToRGB(colors.darkblue, 0.7);
        document.querySelectorAll('td').forEach((x) => { x.style.background = hexToRGB(colors.darkyellow, 0.79); })
        //model_one.style.color="Black";
        return;
    }

    //custom color for viki
    if (mstyles[1].sites.some(x=> {return where.includes(x);})) {
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
        let finallColor = colors.darkgray;
        if (UglyBlack(backColor)) {
            //finallColor = pSBC(0.7, backColor, finallColor);
            console.log("dominant color log:   " + backColor + " -> " + hexToRGB(finallColor, 0.70));
            document.getElementsByTagName('body')[0].style.background = hexToRGB(finallColor, 0.70);


            CheckTextColor();
        }
    }


    let disqus = document.getElementById("disqus_thread");
    if(disqus !== null)
    {
        disqus.style.background="cadetBlue";
    }

}

//************ Font Color to match whiteish background **************//
function CheckTextColor() {
    if (where.search("pornhub") != -1) {
        let links = document.querySelectorAll('span.title a');
        for (let counter = 0; counter < links.length; counter++) {
            links[counter].style.color = colors.moreblue;
        }
        let cards = document.getElementsByClassName("videos underplayer-thumbs");
        for (let x of cards) {
            console.log(x.style=`background: ${colors.somegray};`)
        }

        document.getElementsByClassName('title-container')[0].style.background = colors.darkgray;
        document.getElementsByClassName('video-wrapper')[0].style.background = hexToRGB(colors.darkgray,0.7);
    }
    // if (where.search("xvideos") != -1) {
    //     let links = document.querySelectorAll('p.title a');
    //     for (let counter = 0; counter < links.length; counter++) {
    //         links[counter].style.color = colors.darkblue;
    //     }
    // }
}

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




main();

