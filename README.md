# require-to-json
Require a JavaScript file and print JSON result to stdout

## Installation

```bash
npm install --global require-to-json
```

## Command-line usage

```bash
require-to-json file.js
```

```bash
require-to-json < file.js
```

```bash
cat file.js | require-to-json
```

```bash
echo 'module.exports = 123 + 456' | require-to-json
```
