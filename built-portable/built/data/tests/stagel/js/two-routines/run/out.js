async function fbSwitcher(intNum) {
    StageL_internalDebugCollect('int Num = ' + intNum + '; '); StageL_internalDebugStackEnter('fbSwitcher:in'); StageL_assertIsInt(intNum); let strReturn;


    strReturn = 'Fizz'; StageL_assertIsStr(strReturn); StageL_internalDebugStackExit(); return strReturn;
}
