my $input = slurp();
say $input;

my $parsed;
run-silenced { $parsed = EM.parse($input); }

$parsed = root => $parsed;

say $parsed.WHAT;

say XML::Writer.serialize($parsed);
