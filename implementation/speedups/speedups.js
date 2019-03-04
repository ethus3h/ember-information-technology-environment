registerSpeedup('assertIsFalse', async function (bool) {
    if (bool === false) {
        return;
    }
    await assertionFailed(bool+' is true, but should be false.');
});

registerSpeedup('assertIsTrue', async function (bool) {
    if (bool === true) {
        return;
    }
    await assertionFailed(bool+' is not true.');
});

registerSpeedup('assertIsDc', async function (v) {
    if (await Number.isInteger(v) && v >= 0 && v <= 2147483647) {
        return true;
    }
    await assertIsTrue(false);
});

registerSpeedup('assertIsDcDataset', async function (str) {
    if (datasets.includes(str)) {
        return;
    }
    await assertIsTrue(false);
});

registerSpeedup('or', async function (a,b) {
    if (typeof a === 'boolean' && typeof b === 'boolean') {
        return a || b;
    }
    await assertIsBool(a); await assertIsBool(b);
});

registerSpeedup('isTrue', async function (bool) {
    if (bool === true) {
        // Can't simplify to if(bool) because non-bools might evaluate to true and give wrong result
        return true;
    }
    return false;
});

registerSpeedup('isFalse', async function (bool) {
    if (bool === false) {
        return true;
    }
    return false;
});

registerSpeedup('isIntArray', async function (val) {
    if (val === undefined) {
        await assertionFailed('isGenericArray called with non-StageL-supported argument type.'); /* Claim to fail the isGenericArray assertion here, because that's what would get called in the portable implementation. */
    }
    if (val.constructor.name === 'Uint8Array') {
        return true;
    }
    if (val.constructor.name !== 'Array') {
        return false;
    }
    function isIntSync(v) {
        return (Number.isInteger(v) && v >= -2147483648 && v <= 2147483647);
    }
    return val.every(isIntSync);
});

registerSpeedup('assertIsIntArray', async function (val) {
    if (val === undefined) {
        await assertionFailed('isGenericArray called with non-StageL-supported argument type.'); /* Claim to fail the isGenericArray assertion here, because that's what would get called in the portable implementation. */
    }
    if (val.constructor.name === 'Uint8Array') {
        return true;
    }
    if (val.constructor.name !== 'Array') {
        await assertIsTrue(false);
    }
    function isIntSync(v) {
        return (Number.isInteger(v) && v >= -2147483648 && v <= 2147483647);
    }
    if (val.every(isIntSync)) {
        return;
    }
    else {
        await assertIsTrue(false);
    }
});

registerSpeedup('ne', async function (genericA, genericB) {
    await assertIsGeneric(genericA); await assertIsGeneric(genericB); let boolReturn;

    return genericA !== genericB;
});

registerSpeedup('le', async function (intA, intB) {
    await assertIsInt(intA); await assertIsInt(intB); let boolReturn;

    return intA <= intB;
});

registerSpeedup('ge', async function (intA, intB) {
    await assertIsInt(intA); await assertIsInt(intB); let boolReturn;

    return intA >= intB;
});

registerSpeedup('arrEq', async function (genericArrayA, genericArrayB) {
    
    function countSync(array) {
        if (array.constructor.name === 'Uint8Array') {
            return array.byteLength;
        }
        return Object.keys(array).length;
    }
    let intCount = 0;
    intCount = countSync(genericArrayA);
    if (intCount != countSync(genericArrayB)) {
        return false;
    }
    let genericElem;
    let intI = 0;
    while (intI, intCount)) {
        genericElem = await get(genericArrayA, intI);
        if (await ne(genericElem, await get(genericArrayB, intI))) {
            return false;
        }
        intI = await implAdd(intI, 1);
    }

    boolReturn = true; await assertIsBool(boolReturn); await internalDebugStackExit(); return boolReturn;
});
