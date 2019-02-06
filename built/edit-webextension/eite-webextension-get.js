// I swear this file isn't obfuscated. Replace b8316ea083754b2e9290591f37d94765EiteWebextensionProvider with empty string to make it more readable. Doing that would cause problems though since all this gets dumped into the window namespace of random Web pages.

// Don't use let since it will persist between executions of this script.
b8316ea083754b2e9290591f37d94765EiteWebextensionProviderGetResponse=[];
function b8316ea083754b2e9290591f37d94765EiteWebextensionProviderGetSelectionText() {
    /* https://stackoverflow.com/questions/5379120/get-the-highlighted-selected-text */
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
      (activeElTagName == "textarea") || (activeElTagName == "input" &&
      /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
      (typeof activeEl.selectionStart == "number")
    ) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}

b8316ea083754b2e9290591f37d94765EiteWebextensionProviderSelectionText=b8316ea083754b2e9290591f37d94765EiteWebextensionProviderGetSelectionText();
b8316ea083754b2e9290591f37d94765EiteWebextensionProviderTempElem=document.activeElement;

if (b8316ea083754b2e9290591f37d94765EiteWebextensionProviderSelectionText.length > 0) {
    if ((b8316ea083754b2e9290591f37d94765EiteWebextensionProviderTempElem instanceof HTMLInputElement && (b8316ea083754b2e9290591f37d94765EiteWebextensionProviderTempElem.type == 'text' || b8316ea083754b2e9290591f37d94765EiteWebextensionProviderTempElem.type == 'search')) || (b8316ea083754b2e9290591f37d94765EiteWebextensionProviderTempElem instanceof HTMLTextAreaElement)) {
        b8316ea083754b2e9290591f37d94765EiteWebextensionProviderGetResponse=['b8316ea083754b2e9290591f37d94765EiteWebextensionMessage', true, b8316ea083754b2e9290591f37d94765EiteWebextensionProviderSelectionText];
    }
    else {
        b8316ea083754b2e9290591f37d94765EiteWebextensionProviderGetResponse=['b8316ea083754b2e9290591f37d94765EiteWebextensionMessage', false, b8316ea083754b2e9290591f37d94765EiteWebextensionProviderSelectionText];
    }
}
else {
    if ((b8316ea083754b2e9290591f37d94765EiteWebextensionProviderTempElem instanceof HTMLInputElement && (b8316ea083754b2e9290591f37d94765EiteWebextensionProviderTempElem.type == 'text' || b8316ea083754b2e9290591f37d94765EiteWebextensionProviderTempElem.type == 'search')) || (b8316ea083754b2e9290591f37d94765EiteWebextensionProviderTempElem instanceof HTMLTextAreaElement)) {
        b8316ea083754b2e9290591f37d94765EiteWebextensionProviderGetResponse=['b8316ea083754b2e9290591f37d94765EiteWebextensionMessage', true, document.activeElement.value];
    }
    else {
        b8316ea083754b2e9290591f37d94765EiteWebextensionProviderSelectionText=document.activeElement;
        b8316ea083754b2e9290591f37d94765EiteWebextensionProviderSelectionText=b8316ea083754b2e9290591f37d94765EiteWebextensionProviderSelectionText.innerText || b8316ea083754b2e9290591f37d94765EiteWebextensionProviderSelectionText.textContent;
        if (b8316ea083754b2e9290591f37d94765EiteWebextensionProviderSelectionText.length > 256) {
            alert('EITE: Not loading the more than 256 characters of contents of the current element to avoid locking up the browser. You can explicitly choose an area to view by selecting it.')
        }
        else {
            b8316ea083754b2e9290591f37d94765EiteWebextensionProviderGetResponse=['b8316ea083754b2e9290591f37d94765EiteWebextensionMessage', false, b8316ea083754b2e9290591f37d94765EiteWebextensionProviderSelectionText];
        }
    }
}

browser.runtime.onMessage.addListener(function(message) {
    if (message.data[0] === 'b8316ea083754b2e9290591f37d94765EiteWebextensionMessage') {
        // Put the edited content back where it goes
        if ((b8316ea083754b2e9290591f37d94765EiteWebextensionProviderTempElem instanceof HTMLInputElement && (b8316ea083754b2e9290591f37d94765EiteWebextensionProviderTempElem.type == 'text' || b8316ea083754b2e9290591f37d94765EiteWebextensionProviderTempElem.type == 'search')) || (b8316ea083754b2e9290591f37d94765EiteWebextensionProviderTempElem instanceof HTMLTextAreaElement)) {
            b8316ea083754b2e9290591f37d94765EiteWebextensionProviderTempElem.value = message.data[1];
        }
        else {
            // An element that isn't editable has had content sent back to be saved into it. What?!
            alert("A bug has been encountered in EITE: An element that is not editable has had content returned for it.");
        }
    }
});
b8316ea083754b2e9290591f37d94765EiteWebextensionProviderGetResponse;
