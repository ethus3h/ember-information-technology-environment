async function getFileFromPath(path) {
    // Returns an array of bytes.
    let response = await new Promise(resolve => {
        var oReq = new XMLHttpRequest();
        oReq.open('GET', url, true);
        oReq.responseType = 'arraybuffer';
        oReq.onload = function(oEvent) {
            resolve(new Uint8Array(oReq.response)); // Note: not oReq.responseText
        };
        oReq.onerror = function() {
            resolve(undefined);
        }
        oReq.send(null);
    }
    if (response !== undefined) {
        return response;
    }
    await assertFailed('An error was encountered loading the requested document.');
}

// Implementations of routines provided in public-interface.stagel.

async function internalRunDocument(document) {
    await assertIsDcArray(document);

    let doc = '';
    doc = await startDocument(document);
    let events = [];
    events = await getDesiredEventNotifications(doc);
}
