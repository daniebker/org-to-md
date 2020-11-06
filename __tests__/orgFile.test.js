const { isOrgFile, getFileName } = require("../src/orgFile.js");

describe("orgFile", () => {
  describe("getFileName", () => {
      describe("given a file", () =>{
          it("should return a filename without extension", () => {
              expect(getFileName("aValidName.org")).toBe("aValidName")
          })
      })
  });
  describe("isOrgFile", () => {
    describe("given a valid filename", () => {
      it("should return true", () => {
        expect(isOrgFile("aValidFileName.org")).toBe(true);
      });
    });
  });
});
