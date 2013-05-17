function inlineImages(){
    'use strict';
    if(typeof window.SESSION.currentBuffer !== 'undefined'){
        try{
            setTimeout(function(){
                window.SESSION.currentBuffer.enableInlineImages();
                console.log('[inlineImages] inline images should be enabled');
            },2000); // some can't figure out which resource it is that's missing if we don't wrap this in a stupid wait timeout...
        } catch (e) {
            console.log('[inlineImages] hmm, bit of a problem',e.message);
        }
    } else {
        console.log('[inlineImages] bah, could not call cb',window.SESSION.currentBuffer,'whut');
    }
}

//Shamelessly culled from https://github.com/avidal/irccloud-colornicks/blob/master/src/colornicks.user.js
function inject(fn) {
    'use strict';

    function waitloop(fn) {
        var has_cb = typeof(window.SESSION)!== 'undefined' && typeof(window.SESSION.currentBuffer) !== 'undefined';

        if(has_cb === false) {
            console.log('[inlineImages] Resources are not ready...');
            window.setTimeout(function() { waitloop(fn); }, 100);
            return;
        }

        console.log('[inlineImages] Required resources are ready, calling plugin function.');
        fn();
    }

    var wrap = '(' + fn.toString() + ')';

    console.log('[inlineImages] Injecting wrapper script.');
    var script = document.createElement('script');
    script.textContent += '(' + waitloop.toString() + ')(' + wrap + ');';
    document.body.appendChild(script);
    console.log('[inlineImages] Done injecting wrapper script.');

}

inject(inlineImages);