#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const fs = require("fs");
const { exec } = require("child_process");
const { isOrgFile, getFileName } = require("./orgFile");
const path = require("path");

const filesInDirectory = fs.readdirSync(argv.directory);

for (const file of filesInDirectory) {
  if (isOrgFile(file)) {
    const fullInPathName = path.join(argv.directory, file);
    const fullOutPathName = path.join(
      argv.directory,
      `${getFileName(file)}.md`
    );
    exec(
      `pandoc ${fullInPathName} -f org -t gfm -s -o ${fullOutPathName} --atx-headers`
    );
  }
}
