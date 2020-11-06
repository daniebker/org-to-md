const fs = require("fs");
const path = require("path");
const parseMD = require("parse-md").default;

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
function execShellCommand(cmd) {
  const exec = require("child_process").exec;
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

describe("index.js", () => {
  describe("given a folder that contains org-files", () => {
    describe("when I run the script", () => {
      it("should succesfully convert the files to mardown", async () => {
        const basicOrgFilesDirectory = path.join(
          __dirname,
          "examples",
          "basic-org-files"
        );

        const result = await execShellCommand(
          `node ./src/index.js --directory=${basicOrgFilesDirectory}`
        );

        const basicOrgFilesContents = fs.readdirSync(basicOrgFilesDirectory);

        const markdownFiles = basicOrgFilesContents.filter(
          (file) => path.extname(file) === ".md"
        );

        expect(markdownFiles.length).toBe(2);

        for (const file of markdownFiles) {
          const fullMarkdownFilePath = path.join(basicOrgFilesDirectory, file);
          const fileContents = fs.readFileSync(fullMarkdownFilePath, "utf8");
          const markdown = parseMD(fileContents);
          expect(markdown.content).toBe("# Heading 1\n\n## Heading 2\n\n### Heading 3\n")
          fs.unlink(fullMarkdownFilePath, (err) => {
            if (err) throw err;
          });
        }
      });
    });
  });
});
