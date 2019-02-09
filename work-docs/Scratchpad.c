#include <stdio.h>

unsigned long pwrOf2(int n) {
    return 1 << n;
}

void printBits(unsigned int num) {
    unsigned int size = sizeof(unsigned int);
    unsigned int maxPow = 1<<(size*8-1);
    printf("MAX POW : %u\n",maxPow);
    int i=0,j;
    for(;i<size*8;++i){
        // print last bit and shift left.
        printf("%u ",num&maxPow ? 1 : 0);
        num = num<<1;
    }
}

int main() {
  unsigned char a;
  a=255;
  unsigned long res;
  res=a;
res=res * (pwrOf2(24));
long wanted=-2147483648;
/*res=res + a;res=res * (pwrOf2(24) - 1) - pwrOf2(16) - pwrOf2(8);
res=4294967295 / 255;*/
  printf("a=%d\n", a);
  printf("res=%d\n", res);  printf("wanted=%d\n", wanted);
  printBits(a);   printf("\n"); printBits(res);printf("\n"); printBits(wanted);
  return 0;
}
