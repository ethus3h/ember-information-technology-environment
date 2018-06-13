// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0
// This file defines functions with implementations that are specific to Web browser implementation of EITE in JavaScript.
// This is a library file, and should only initialize functions/variables, so that it can be loaded and run in parallel with other library files, and work regardless of the order they are loaded.

// Platform-specific overrides of routines available portably

// Override error reporting method to show alert
function voidEiteError(strMessage) {
    console.trace();
    eiteLog('EITE reported error!: '+implStrNormalizeMessage(strMessage));
    alert('EITE reported error!: '+implStrNormalizeMessage(strMessage));
    throw 'EITE reported error!: '+implStrNormalizeMessage(strMessage);
}
function eiteWarn(strMessage) {
    console.trace();
    eiteLog('EITE reported warning: '+implStrNormalizeMessage(strMessage));
    alert('EITE reported warning: '+implStrNormalizeMessage(strMessage));
}

// Fully platform-specific code

function assertIsString(str) {
    if (typeof str !== "string") {
        eiteError("Assertion failed: "+str+" is not a string.")
    }
}

function die(strMessage) {
    throw strMessage;
}

function implEiteLog(strMessage) {
    // This function implements logging (which may differ between platforms).
    console.log(implStrNormalizeMessage(strMessage));
};

async function implGetEnvironmentBestFormat() {
    return 'immutableCharacterCells';
}

function implGetEnvironmentRenderTraits(targetFormat) {
    if ( targetFormat === undefined ) {
        eiteError('implGetEnvironmentRenderTraits was called without any targetFormat!');
    }
    var traits = {};
    switch (targetFormat) {
        case 'integerList':
        case 'immutableCharacterCells':
            traits.cellTableWidth = -1; // unlimited
            traits.cellTableHeight = -1; // unlimited
            let cs = document.characterSet.toLowerCase();
            switch(cs) {
                case 'utf-8':
                    traits.characterEncoding = 'UTF-8';
                    break;
                default:
                    eiteWarn('Unimplemented character set: '+cs+'. Falling back to ASCII-safe-subset.');
                    traits.characterEncoding = 'ASCII-safe-subset';
                    break;
            }
            break;
    }
    return traits;
}

function loadCsv(url, lineLoadedCallback, documentLoadedCallback, errorCallback) {
    Papa.parse(url, {
        download: true,
        encoding: 'UTF-8',
        newline: "\n",
        delimiter: ',',
        quoteChar: '"',
        step: function(results, parser) {
            lineLoadedCallback(results, parser);
        },
        complete: function(results, file) {
            documentLoadedCallback(results, file);
        },
        error: function(results, file) {
            errorCallback(results, file);
        }
    })
}

function implDoRenderIo(renderBuffer, targetFormat) {
    switch (targetFormat) {
        case 'integerList':
        case 'immutableCharacterCells':
            let immutableCharCellOutput = document.getElementById('log');
            for (let i = 0; i < renderBuffer.length; i++) {
                immutableCharCellOutput.innerHTML += implStrNormalizeMessage(renderBuffer[i]) + '<br />';
                immutableCharCellOutput.scrollTop = immutableCharCellOutput.scrollHeight;
            }
            break;
        default:
            eiteError('Unimplemented render I/O format: '+targetFormat);
            break;
    }
}

function urlLoadForCallback(url, callback) {
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";
    oReq.onload = function(oEvent) {
        callback(new Uint8Array(oReq.response)); // Note: not oReq.responseText
    };
    oReq.send(null);
}

function operateOnDocFromUrl(strFormat, strUrl, callback) {
    urlLoadForCallback(strUrl, function(bytearrayContent) { callback(dcarrParseDocument(strFormat, bytearrayContent)); })
}

function implStrFromUnicodeHex(strCharacter) {
    return String.fromCharCode('0x'+strCharacter);
}

function runEiteTest(strTestFormat, strTestName) {
    // TODO: Unfinished implementation
    strTestUrlPrefix='../tests/'+strTestName+'.'+strTestFormat+'/';
    strTestInputFormatUrl='../tests/'+strTestName+'.'+strTestFormat+'/in-format';
    switch (strTestFormat) {
        case 'ept': // Parser test
            urlLoadForCallback(strTestInputFormatUrl, function(bytearrayContent) {})
            break;
        default:
            eiteError('Unimplemented test format: '+strTestFormat);
            break;
    }
}

// Set up dcData
dcData = [];
function dcDataAppendDataset(dataset) {
    dcData[dataset] = [];
}
function dcDataAppendLine(dataset, line) {
    dcData[dataset].push(line);
}
function loadDatasets(callback) {
    if (datasets.length > 0) {
        let dataset = datasets[0];
        dcDataAppendDataset(dataset);
        loadCsv(
            '../data/'+dataset+'.csv',
            function(results,parser){
                dcDataAppendLine(dataset, results);
            },
            function(){
                datasets.shift();
                loadDatasets(callback);
            },
            function(){
                eiteError('Error reported while parsing '+dataset+'!')
            }
        );
    }
    else {
        callback();
    }
}

datasets=[
    'DcData',
    'mappings/from/ascii',
    'mappings/from/unicode',
    'mappings/to/html'
];
// @license-end
