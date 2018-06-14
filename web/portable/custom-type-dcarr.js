// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0
/* Depends:
    implNewDcarr
    implCustomTypeDcarrPush
*/

async function newDcarr() {
    let dcarrReturn;

    await eiteFIXMEUnimplemented("newDcarr");
    dcarrReturn = Dcarrs.length(); await assertIsDcarr(dcarrReturn); return dcarrReturn;
}

async function customTypeDcarrPush(dcarr, dcToAdd) {
    await assertIsDcarr(dcarr); await assertIsDc(dcToAdd);

    await implCustomTypeDcarrPush();
}

// @license-end
