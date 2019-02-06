(async function(){
    browser.tabs.executeScript(
        { file: "/eite-webextension-get.js" }
    ).then(response=>{
        // Handle response from content script
        canEdit=response[0];
        contents=response[1];
        iframe=Document.getElementById('eiteEditToolFrame');
        iframe.contentWindow.postMessage(response);
    }).catch(console.error.bind(console));
})();
