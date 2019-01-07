// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0
// This file contains portable code for all JavaScript implementations of EITE.
// This is a library file, and should only initialize functions/variables, so that it can be loaded and run in parallel with other library files, and work regardless of the order they are loaded.
// It also serves as an example implementation that should be written in a way that is easily ported to other platforms.
// To serve these two goals, it should not use I/O, objects, first-class functions, JavaScript-specific libraries, or null/undefined values.
// TODO: It should probably also declare all array sizes? Or else, put array operations into the non-portable categories, and have a set of impl* functions as an API for them instead.
// Things that depend on I/O and JavaScript-specific libraries (e.g. logging using JSON.stringify) should be implemented in eite-[platform].js  (for platform-specific code) or eite-nonportable.js for JavaScript-specific code.
// Those files should use clearly defined APIs that this file's code can call, so that they can be implemented as appropriate in other implementations. The impl* functions should only be called once in the portable code, in a wrapper function for the function.
// dcData object must be available before calling these functions.
// Special types: dc = a string, but with an int as its contents
// Assert functions return nothing, and should call eiteError if they fail.
// "eite" functions (logging) return nothing.
// TODO: DcData and renderTraits shouldn't be used here, since they're JS-specific, complex objects. They should be provided by APIs and/or simple data types instead. This will also allow the "dc" ad-hoc data type to actually be an int, instead of a string containing an int (which is kind of stupid ­— it should just be an int).
// TODO: Function parameters and return values should be type-checked to ensure their validity. Similarly, the string types that correspond to a set of possible values (format names, encoding names, etc.) should be checked against the set (this could also be reflected in more specific/meaningful identifier prefixes).

async function dcarrConvertDocument(dcarrInput, strTargetFormat, renderTraits) {
    dcarrOutput=[];
    // Build render output buffer for specified format
    let intInputLength = 0;
    switch (strTargetFormat) {
        case "integerList":
            intInputLength = await intDcarrLength(dcarrInput);
            for (let intInputIndex = 0; intInputIndex < intInputLength; intInputIndex++) {
                dcarrOutput[intInputIndex] = dcarrInput[intInputIndex];
            }
            break;
        case "immutableCharacterCells":
            let intLine = 0;
            dcarrOutput[0] = "";
            intInputLength = await intDcarrLength(dcarrInput);
            for (let intInputIndex = 0; intInputIndex < intInputLength; intInputIndex++) {
                let dcAtInputIndex = await dcCustomTypeDcarrDcAtPos(dcarrInput, intInputIndex);
                console.log(dcAtInputIndex);
                if (await boolDcIsNewline(dcAtInputIndex)) {
                    intLine = intLine + 1;
                    dcarrOutput[intLine] = "";
                }
                if (await boolDcIsPrintable(dcAtInputIndex) || await boolDcIsSpace(dcAtInputIndex) ) {
                    dcarrOutput[intLine] = dcarrOutput[intLine] + await strPrintableDcToChar(dcAtInputIndex, renderTraits.characterEncoding);
            console.log(dcarrOutput);
                }
            }
            break;
        case "HTML":
            strReturn = await strFromUnicodeHex(await strDcDataLookupByValue("mappings/from/unicode", 1, dc, 0));
            if (strReturn === "\u0000") {
                /* No mapping was found by reversing Unicode, so look for a simple character mapping from the HTML mappings */
                strReturn = await strDcDataLookupByValue("mappings/to/html", 0, dc, 1);
            }
            assertIsStr(strReturn); return strReturn;
            break;
        default:
            await eiteError("Unimplemented document render target format: " + strTargetFormat);
            break;
    }
    return dcarrOutput;
}

async function runDocument(dcarrContent) {
    strTargetFormat = await implGetEnvironmentBestFormat();
    await implDoRenderIo(await dcarrConvertDocument(dcarrContent, strTargetFormat, await implGetEnvironmentRenderTraits(strTargetFormat)), strTargetFormat);
}
// @license-end
