#!/usr/bin/env node

const passpwnd = require("./");

const [, , argv] = process.argv;

function usage() {
  console.log("\nWelcome to PassPwnd!\n");
  console.log(
    "passpwnd is a command to ensure that a given <password> has not been compromised."
  );
  console.log("It is based on Troy Hunt's Have I Been Pwned online service.");
  console.log(
    "Your password is never sent to this online service. Check the documentation to see how it works :)\n"
  );
  console.log("Usage:\n");
  console.log("     passpwnd <password>\n");
  console.log(
    "The command will analyze the provided <password> and return one of the following output:"
  );
  console.log(
    "  • \x1b[1m\x1b[31mcompromised\x1b[0m: the password was found in a leak. You should not use it anywhere! It is not safe."
  );
  console.log(
    "  • \x1b[1m\x1b[32msafe\x1b[0m: the password was not found. It can be considered safe."
  );
  console.log("  • \x1b[1munknown\x1b[0m: the password could not be checked.");
  process.exit();
}

if (["-h", "--help"].includes(argv)) {
  usage();
}

if (!argv || argv.length == 0) {
  usage();
}

passpwnd(argv).then((compromised) => {
  let result = "\x1b[1munknown";
  if (compromised) {
    result = "\x1b[1m\x1b[31mcompromised";
  } else {
    result = "\x1b[1m\x1b[32msafe";
  }

  console.log(`Result: ${result}\x1b[0m`);
});
