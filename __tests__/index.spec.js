const fs = require("fs");
const path = require("path");

describe("index.js", () => {
  describe("given a folder that contains org-files", () => {
    describe("when I run the script", () => {
      it("should succesfully convert the files to mardown", async () => {
        const basicOrgFilesDirectory = path.join(
          __dirname,
          "examples",
          "basic-org-files"
        );

        const basicOrgFilesContents = await fs.readdirSync(
          basicOrgFilesDirectory
        );

        const markdownFiles = basicOrgFilesContents.filter(
          (file) => path.extname(file) === "md"
        );

        expect(markdownFiles.length).toBe(2);
      });
    });
  });
});
