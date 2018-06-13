// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0
// This file defines functions with implementations that are specific to the JavaScript implementation of EITE.
// This is a library file, and should only initialize functions/variables, so that it can be loaded and run in parallel with other library files, and work regardless of the order they are loaded.

function implStrNormalizeMessage(message) {
    if (typeof message == 'object') {
        return (JSON && JSON.stringify ? JSON.stringify(message) : message);
    } else {
        return message;
    }
}

function implStrToInt(str) {
    return parseInt(str);
}

function implAssertIsInt(int) {
    if (! Number.isInteger(int)) {
        eiteError("Assertion failed: "+int+" is not an int.")
    }
}

function implAssertIsStr(str) {
    if (typeof str !== "string") {
        eiteError("Assertion failed: "+str+" is not a string.")
    }
}

async function implIntBytearrayLength(bytearrayInput) {
    return bytearrayInput.byteLength;
}

async function implIntDcarrLength(dcarrInput) {
    return dcarrInput.length;
}

// @license-end
