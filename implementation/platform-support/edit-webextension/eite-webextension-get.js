b8316ea083754b2e9290591f37d94765EiteWebextensionProviderGetResponse=[];

b8316ea083754b2e9290591f37d94765EiteWebextensionProviderTempElem=document.activeElement;

if ((b8316ea083754b2e9290591f37d94765EiteWebextensionProviderTempElem instanceof HTMLInputElement && (b8316ea083754b2e9290591f37d94765EiteWebextensionProviderTempElem.type == 'text' || b8316ea083754b2e9290591f37d94765EiteWebextensionProviderTempElem.type == 'search')) || (b8316ea083754b2e9290591f37d94765EiteWebextensionProviderTempElem instanceof HTMLTextAreaElement)) {
    b8316ea083754b2e9290591f37d94765EiteWebextensionProviderGetResponse=['b8316ea083754b2e9290591f37d94765EiteWebextensionMessage', true, document.activeElement.value];
}
else {
    b8316ea083754b2e9290591f37d94765EiteWebextensionProviderGetResponse=['b8316ea083754b2e9290591f37d94765EiteWebextensionMessage', false, document.activeElement.innerHTML];
}

window.addEventListener('message', function(message) {
    
}

b8316ea083754b2e9290591f37d94765EiteWebextensionProviderGetResponse;
