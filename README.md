# Sanity Check

### Versions used

Node.js - v20.10.0
nvm - 0.32.1

### Setup

Clone the repository on the server where you have your node setup done. If you are not using the defaut directories for installation of bor and heimdall, please modify the directories you are using in each of the functions under functions folder.

NOTE: Functions execAsync, Logging, CommandOutput, PortCheck and VersionCheck does not need any modifications.

Run the following command to install the modules:

```bash
npm install
```

### Usage

Run the following command to do a Sanity Check on your node setup:

```bash
npm run sanitycheck nodeType
```

Please note that the nodeType will be sentry if you want to perform a Sanity Check on sentry/full nodes and validator if you want to perform a Sanity Check on validator node.

### Logging

Upon each run, a log file a generated. Please share the file with the Polygon PoC once the script executes.
