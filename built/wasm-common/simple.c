#include "_eite-shared.c"
#include "lib/malloc.c"

/* void _start() {
    utf8enc();
    utf9enc();
}
extern int utf8enc(); */

EXPORT int fortytwo(int a) {
    return 42;
}
EXPORT int add(int a, int b) {
    return a+b;
}
EXPORT int utf8enc() {
    return 44;
}
EXPORT int utf9enc() {
    return 43;
}
