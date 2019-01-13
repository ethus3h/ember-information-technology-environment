/* assertions, provides:
    assertIsBool
    assertIsTrue
    assertIsFalse
    assertIsInt
    assertIsStr
    assertIsGeneric
    assertIsGenericArray
    assertIsGenericItem
    assertIsDcarr
    assertionFailed
*/

// Assertions that something is a given type

async function isBool(bool) {
    if (typeof bool !== "boolean" || typeof bool === "undefined" || bool === null) {
        return false;
    }
    return true;
}

async function assertIsBool(bool) {
    if (!await isBool(bool)) {
        await assertionFailed(bool+" is not a boolean.");
    }
}

/* TODO: move assertIsTrue/assertIsFalse to StageR once bool literals are available */
async function assertIsTrue(bool) {
    await assertIsBool(bool);

    if (bool !== true) {
        await assertionFailed(bool+" is not true.");
    }
}

async function assertIsFalse(bool) {
    await assertIsBool(bool);

    if (bool !== false) {
        await assertionFailed(bool+" is not false.");
    }
}

async function isInt(int) {
    if ((! Number.isInteger(int)) || typeof int === "undefined" || int === null || int < -2147483648 || int > 2147483647) {
        return false;
    }
    return true;
}

async function assertIsInt(int) {
    if (!await isInt(int)) {
        await assertionFailed(int+" is not an int, or is outside the currently allowed range of 32 bit signed (-2,147,483,648 to 2,147,483,647).");
    }
}

async function isStr(str) {
    if (typeof str !== "string" || typeof str === "undefined" || str === null) {
        return false;
    }
    return true;
}

async function assertIsStr(str) {
    if (!await isStr(str)) {
        await assertionFailed(str+" is not a string.");
    }
}

async function isGeneric(val) {
    // We have to do isGeneric in native code because otherwise the assertion at the start of the function would call it.
    if (! (await isStr(val) || await isInt(val) || await isBool(val))) {
        return false;
    }
    return true;
}

async function assertIsGeneric(val) {
    if (!await isGeneric(val)) {
        await assertionFailed(val+" cannot be used as a generic.");
    }
}

async function isGenericArray(val) {
    let intCount = await count(val);
    let genericElem;
    while (intCount > 0) {
        intCount = intCount - 1;
        genericElem = val.slice(intCount)[0];
        if (!await isGeneric(genericElem)) {
            return false;
        }
    }
    return true;
}

async function assertIsGenericArray(val) {
    if (!await isGenericArray(val)) {
        await assertionFailed(val+" cannot be used as a generic array.");
    }
}

async function isGenericItem(val) {
    if (! (await isGeneric(val) || await isGenericArray(val))) {
        return false;
    }
    return true;
}

async function assertIsGenericItem(val) {
        alert('Rundoc,');
return true
    
    if (!await isGenericItem(val)) {
        await assertionFailed(val+" cannot be used as a generic item.");
    }
}

async function assertIsDcarr(dcarr) {
    await assertIsInt(dcarr);
    await assertIsTrue(dcarr >= 0);
    await assertIsTrue(dcarr < Dcarrs.length);
}

async function assertionFailed(message) {
    await implDie("Assertion failed: "+message);
}
