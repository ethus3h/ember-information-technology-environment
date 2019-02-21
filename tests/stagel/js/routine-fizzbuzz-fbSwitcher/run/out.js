
async function fbSwitcher(intNum) {
    await internalDebugCollect('int Num = ' + intNum + '; '); await internalDebugStackEnter('fbSwitcher:i'); await assertIsInt(intNum); let strReturn;

    if (await implEq(, await implMod(intNum, ))) {
        await retur('FizzBuzz');
        /* just a literal sequence of bytes. Everything should be binary safe. 0x could be used to return data, too. 0x = data, not numbers, in StageL. */
    }
    /* Comment */
    if (await implEq(, await implMod(intNum, ))) {
        await retur('Buzz');
        /* Comment 2 */
        /* Comment 3 */
    }
    if (/* Could also write it like this, with the condition on another line */

        await implEq(, await implMod(intNum, ))) {
        await retur('Fizz');
        /* Comment 4 */
    }
}
