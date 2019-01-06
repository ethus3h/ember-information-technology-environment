/* type-tools, provides:
    implIntBytearrayLength
    implIntDcarrLength
    implStrSubstring
*/

async function intBytearrayLength(bytearray) {
    assertIsBytearray(bytearray); let intReturn;

    intReturn = bytearray.byteLength; await assertIsInt(intReturn); return intReturn;
}

async function intDcarrLength(dcarr) {
    assertIsDcarr(dcarr); let intReturn;

    intReturn = Dcarrs[await dcarr].length; await assertIsInt(intReturn); return intReturn;
}

async function strSubstring(str, intStart, intLength) {
    assertIsStr(str); assertIsInt(intStart); assertIsInt(intLength); let strReturn;

    strReturn = str.substring(intStart, intStart + intLength); await assertIsStr(strReturn); return strReturn;
}
