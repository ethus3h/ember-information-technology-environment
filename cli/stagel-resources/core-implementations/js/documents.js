async function getFileFromPath(path) {
    // Returns an array of bytes.
    alert(path);
    let response = await new Promise(resolve => {
        var oReq = new XMLHttpRequest();
        oReq.open('GET', path, true);
        oReq.responseType = 'arraybuffer';
        oReq.onload = function(oEvent) {
            resolve(new Uint8Array(oReq.response)); // Note: not oReq.responseText
        };
        oReq.onerror = function() {
            resolve(undefined);
        }
        oReq.send(null);
    });
    if (response !== undefined) {
        return response;
    }
    await assertFailed('An error was encountered loading the requested document.');
}

// Implementations of routines provided in public-interface.stagel.

async function internalRunDocument(execId) {
    await assertIsExecId(execId);

    let events = [];
    events = await getDesiredEventNotifications(execId);

    // FIXME: Make this not just be converting the document and dumping it out.
    let strTargetFormat;
    strTargetFormat = await getEnvironmentPreferredFormat();
    await implDoRenderIo(await dcarrConvertDocument(await dcarrParseSems(await strToByteArray(strArrayDocumentExecData[execId])), strTargetFormat, await implGetEnvironmentRenderTraits(strTargetFormat)), strTargetFormat);
}
