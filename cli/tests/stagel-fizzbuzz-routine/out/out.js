r/s/fbSwitcher n/num
    if
        test
            eq 0
                mod n/num 15
        do
            return "FizzBuzz" # just a literal sequence of bytes. Everything should be binary safe. 0x could be used to return data, too. 0x = data, not numbers, in StageL.
    # Or it could be written using brackets like this. Also the "test" and "do" commands are optional since if knows what it's about.
    if ( eq 0 ( mod n/num 5 ) ) return "Buzz" # This isn't very fun to read, though.
    # Or, the brackets can be omitted since the number of things needed can be used to infer. The / between type and identifier maybe can also be omitted (have types be reserved words).
    if eq 0 mod n num 3 return "Fizz" # Even less fun to read.

r s fizzBuzz # A string is an array of 8-bit bytes.
    output-assert -n # the output should be non-empty. Unless otherwise specified, would take and yield nothing.
    new n/counter 1
    until
        test
            eq n/counter 100
        do
            out # out is like return, but doesn't exit and more data can continue to be output
                run fbSwitcher n/counter
