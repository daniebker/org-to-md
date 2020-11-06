const path = require("path")

const isOrgFile = (file) => {
    return path.extname(file) === ".org"
}

const getFileName = (file) => {
    const fileBaseName = path.basename(file)
    return fileBaseName.split(".").slice(0,-1)[0]
}

module.exports = {
    isOrgFile,
    getFileName
}