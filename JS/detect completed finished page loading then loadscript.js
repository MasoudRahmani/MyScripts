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