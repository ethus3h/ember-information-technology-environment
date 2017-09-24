#!/usr/bin/env perl6

use v6.c;
use Test;
use Grammar::Tracer;
use Grammar::ErrorReporting;

# Main grammar
(
    grammar EM does Grammar::ErrorReporting {
        # High-level chunking of the code
        (
            token TOP {
                <block>
            }

            # Support rules for high-level chunking
            (
                token block {
                    [
                        '{ ' ~ ' }' <blockContents>
                    ] ||
                    <blockContents>
                }
                token blockTerminatedLines {
                    <scopingSpaces>
                    <terminatedLine>
                }
                token blockContents {
                    <blockTerminatedLines>*
                    <unterminatedLine>?
                }
                token scopingSpaces {
                    '    '*
                }
            );
        );

        # Lines and their contents
        (
            token unterminatedLine {
                <lineContents>
            }
            token lineSeparator {
                \n || '; '
            }
            token terminatedLine {
                <unterminatedLine> \n
            }
            token lineContents {
                <assignment> ||
                <invocation> ||
                <declaration> ||
                ''
            }
        );

        # Identifiers, declarations, assignments, references, and invocations
        (
            token identifier {
                [
                    [ <type> ' ' ]?
                    <escapedName>
                    [ <parameterList> ]?
                ] [ '.' <identifier> ]?
            }
            token declaration {
                <identifier>
            }
            token assignment {
                [
                    <identifier> '=' <value>
                ] ||
                [
                    <identifier> ' = ' <value>
                ] ||
                [
                    <identifier> ':' [ ' ' || \n ] <value>
                ] ||
                <identifier> ':' [ ' ' || \n ] <blockContents>
            }
            token reference {
                [ <type> ' ' ]?
                '$'<escapedName>
                [ ' '? <parameterList> ]?
            }
            token invocation {
                <identifier> ' '? <parameterList>
            }
        );

        # Types and values
        (
            token type {
                'String' |
                \*
            }
            token value {
                [
                    <invocation> ||
                    <reference> ||
                    <identifier> ||
                    <literal>
                ] <value>?
            }
        );

        # Parameters and lists of parameters
        (
            token parameter {
                <optionalParameter> || <requiredParameter>
            }
            token parameterList {
                <emptyParameterList> ||
                <parenthesizedParameterList> ||
                <regularParameterList> ||
                <nullParameterList>
            }

            # Support rules for parameters
            (
                token optionalParameter {
                    [
                        <type> |
                        <identifier>
                    ] \?
                }
                token requiredParameter {
                    <assignment> |
                    [ <type> | <identifier> | <value> ]
                }
            );

            # Support rules for parameter lists
            (
                token parameterListBody {
                    <parameter>* % ', '
                }

                token nullParameterList {
                    ''
                }
                token emptyParameterList {
                    '()'
                }
                token regularParameterList {
                    ' ' <parameterListBody>
                }
                token parenthesizedParameterList {
                    '(' ~ ')' <parameterListBody>
                }
            );
        );

        # Names vs literals
        (
            token escapedName {
                [\w|[\\\N]]+
            }
            token literal {
                <literalBlock> ||
                <number>
            }
        );

        # Literal types
        (
            token literalBlock {
                [
                    ': '
                    <blockContents>
                ] ||
                [
                    '{ ' ~ ' }' <blockContents>
                ]
            }
            token number {
                \d+
            }
        );
    }
);

# Test suite
(
    nok runParserTest('foo(bar, baz', 'invocation', True);
    ok runParserTest(Q[@makeParseFail], 'TOP');

    say "Done running tests. Report:";
    done-testing;
);

# Testing support code
(
    sub run-silenced (&code) {
        temp $*OUT = temp $*ERR = class {
            BEGIN {
                ::?CLASS.^add_method: $_, my method (*@) {} for qw/say put print print-nl/
            }
        }.new;
        code;
    }

    sub runParserTest(Str $code, Str $rule, Bool $fail = False) {
        try {
            CATCH {
                default {
                    if $fail {
                        say "Parsing threw an exception as expected."
                    }
                }
            }
            if $fail {
                if run-silenced { EM.parse($code, :$rule) } {
                #if EM.parse($code, :$rule) {
                    say EM.parse($code, :$rule);
                    say "Parsing unexpectedly succeeded.";
                    # Return success status because this is being called by the test runner, which if $fail is True should be set to expect this to fail.
                    return True;
                }
                else {
                    fail "Parsing failed as expected.";
                }
            }
            else {
                #if ! run-silenced { EM.parse($code, :$rule) } {
                if ! EM.parse($code, :$rule) {
                    say EM.parse($code, :$rule);
                    fail "Parsing unexpectedly failed.";
                }
                else {
                    return True;
                }
            }
        }
    }
);
