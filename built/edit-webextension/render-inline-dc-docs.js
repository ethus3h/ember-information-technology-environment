(async function() {
    //let elems=document.getElementsByTagName('*');
    let textNodesUnder = function(el) {
        let n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
        while (n=walk.nextNode()) {
            a.push(n);
        }
        return a;
    }
    let elems=textNodesUnder(document.body);
    let added=false;
    let addCssIfNeeded = function() {
        if (!added) {
            added=true;
            let stylesheet = document.head.appendChild(document.createElement("style")).sheet;
            let addRule = (function(sheet) {
                    // https://web.archive.org/web/20190311175426/https://stackoverflow.com/questions/4481485/changing-css-pseudo-element-styles-via-javascript
                    return function (selector, css) {
                        let propText = typeof css === "string" ? css : Object.keys(css).map(function (p) {
                            return p + ":" + (p === "content" ? "'" + css[p] + "'" : css[p]);
                        }).join(";");
                        sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
                    };
                })(stylesheet);
            // https://github.com/codepo8/CSS3-Rainbow-Dividers/blob/master/rainbows.css
            stylesheet.insertRule('@keyframes keyframeRule { from { background-position: top left; } to { background-position: top right; } }', stylesheet.cssRules.length);
            addRule(".b8316ea083754b2e9290591f37d94765EiteWebextensionInlineRenderSpan", {
                    position: "relative",
                    display: "inline-block"
                });
            addRule(".b8316ea083754b2e9290591f37d94765EiteWebextensionInlineRenderFrame", {
                    display: "none",
                    border: 0
                });
            addRule(".b8316ea083754b2e9290591f37d94765EiteWebextensionInlineRenderSpan::before", {
                    display: "block",
                    animation: "keyframeRule 2.5s forwards linear infinite",
                    width: "100%",
                    height: "0.2rem",
                    position: relative,
                    top: "-0.2rem",
                    "background-image": "linear-gradient( left, red, orange, yellow, green, blue, indigo, violet, indigo, blue, green, yellow, orange, red )",
                    "background-image": "-moz-linear-gradient( left, red, orange, yellow, green, blue, indigo, violet, indigo, blue, green, yellow, orange, red )",
                    //background: "red",
                    "background-size": "50% auto",
                    content: "' '"
                });
        }
    }
    let el;
    let re=/􍁝􋶀󼷢󺀊󸥎􈺍󲋠􏺐/g;
    let nodeVal;
    let foundIndex;
    let begin;
    let ifr;
    let matched;
    let textNode;
    let parentNode;
    let span;
    let replacedAll;
    let limit = 1;
    let j;
    for (let i=0;i<elems.length;i++) {
        el=elems[i];
        if (el.textContent.match(re)) {
            addCssIfNeeded();
            replacedAll = false;
            j = 0;
            while (!replacedAll && j < limit) {
                j = j + 1;
                // based on https://web.archive.org/web/20190311140420/https://stackoverflow.com/questions/8644428/how-to-highlight-text-using-javascript
                nodeVal = el.nodeValue;
                foundIndex = nodeVal.indexOf('􍁝􋶀󼷢󺀊󸥎􈺍󲋠􏺐');
                if (foundIndex < 0) {
                    replacedAll = true;
                }
                else {
                    begin = nodeVal.substring(0, foundIndex);
                    parentNode = el.parentNode;
                    matched = el.textContent.match(new RegExp('􍁝􋶀󼷢󺀊󸥎􈺍󲋠􏺐(.*)󼅹󴶯􈡺󿔊􆲦􍸂󲀰􏼝'))[0];
                    if (begin.length > 0) {
                        textNode = document.createTextNode(begin);
                        parentNode.insertBefore(textNode, el);
                    }
                    span = document.createElement("span");
                    span.className = span.className + ' b8316ea083754b2e9290591f37d94765EiteWebextensionInlineRenderSpan';
                    span.appendChild(document.createTextNode(matched));
                    parentNode.insertBefore(span, el);
                    ifr=document.createElement('iframe');
                    el.nodeValue = nodeVal.substring(foundIndex + matched.length);
                    ifr.id='b8316ea083754b2e9290591f37d94765EiteWebextensionInlineRenderFrameId'+i;
                    ifr.className='b8316ea083754b2e9290591f37d94765EiteWebextensionInlineRenderFrame';
                    ifr.src=browser.runtime.getURL('edit.html');
                    ifr.style.height=span.clientHeight+'px';
                    ifr.style.width=span.clientWidth+'px';
                    parentNode.insertBefore(ifr, el);
                    ifr=document.getElementById('b8316ea083754b2e9290591f37d94765EiteWebextensionInlineRenderFrameId'+i);
                    // Wow, I really hate developing JavaScript.
                    let replaceSpan=function(span, ifr){/*console.log('tebuice');*/span.remove();ifr.style.display='inline-block';};
                    replaceSpan(span, ifr);
                   // console.log('bubube');
                    //alert('a');
                    //const sleep = t => x => new Promise(r => setTimeout(()=>r(x), t));
                    //await sleep(1000); alert('b');
                    //window.setTimeout(alert, 1);
                    //window.setTimeout(replaceSpan, 1, span, ifr);
                    //ifr.contentWindow.postMessage([ 'b8316ea083754b2e9290591f37d94765EiteWebextensionMessageUtf8', false, matched], ifr.src);
                }
            }
        }
    }
})();
