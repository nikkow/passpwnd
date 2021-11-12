<center>
<img src="docs/logo.jpg" alt="passpwnd" />
</center>
<center>
<b>a no-dependencies NodeJS compromised password checker</b>
</center>
<center>
	<img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/nikkow/passpwnd?style=flat-square" />
	<img alt=npm" src="https://img.shields.io/npm/v/passpwnd?style=flat-square" />
	<img alt=NPM" src="https://img.shields.io/npm/l/passpwnd?style=flat-square" />
</center>

This tool checks whether a given password is part of a known data leak, thus potentially compromised. It is based on Troy Hunt's [Have I Been Pwned](https://haveibeenpwned.com) services.

* **No dependencies**: this tool relies only on core modules of NodeJS and does not import any 3rd-party libraries. 
* **No password is sent over the network**: this tool only sends a fragment of a hash generated from the given password to verify whether it is compromised. See the "How does it work?" section.


## How does it work?

When inputting a password, a SHA1 hash is generated and its first 5 characters are sent to the _Have I Been Pwned_ API. 

If the service finds hashes, whose 5 first characters match the ones computed from your input password, they are considered as potential matches and returned in the response. 

Once all potential matches are collected, the script locally compares the full hashed password to the hashes found in leaks. 

## Usage

This package was designed to be imported into your own script or to be used as a stand-alone command-line tool. 

### Script

```javascript
const passpwnd = require("passpwnd");

passpwnd("p4ssw0rd").then((isPwned) => {
	// isPwned is a boolean. 
	// set to `true` if password is compromised, `false` otherwise.
	console.log(isPwned)
});
```

### Command-Line

```ssh
passpwnd p4ssw0rd
```
The command above will return the status of the password: 

* **compromised**: the password was found in a leak. You should not use it anywhere! It is not safe.
* **safe**: the password was not found. It can be considered safe