const { v1: uuidv4 } = require("uuid");
const fs = require("fs")

function base64FileHeaderMapper(fileBase64) {

    let fileHeader = new Map();

    //get the first 3 char of base64
    fileHeader.set("/9j", "JPG")
    fileHeader.set("iVB", "PNG")
    fileHeader.set("Qk0", "BMP")
    fileHeader.set("SUk", "TIFF")
    fileHeader.set("JVB", "PDF")
    fileHeader.set("UEs", "OFD")
    fileHeader.set("Ukl", "webp")

    let res = ""

    fileHeader.forEach((v, k) => {
        if (k === fileBase64.substr(0, 3)) {
            res = v
        }
    })

    //if file is not supported
    if (res === "") {
        res = 'JPG'
    }

    //return map value
    return res;
}

const SaveImageBase64 = async ({ img, folder }) => {
    if (!img || !img.includes('data:image/')) return img

    var base64Data = img.split(",")[1];
    const ext = base64FileHeaderMapper(base64Data)
    if (!ext) return img

    const directory = `${__dirname}../../../../upload_images/${folder}`
    const name = `${uuidv4()}.${ext}`

    try {
        fs.mkdirSync(directory, { recursive: true })
        const res = await new Promise((resolve, reject) => fs.writeFile(
            `${directory}/${name}`,
            base64Data, 'base64',

            function (err, data) {
                if (err) {
                    reject(err)
                }
                resolve(`upload_images/${folder}/${name}`)
            }))
        return res
    } catch (e) {
        console.error(e)
        return img
    }
}


module.exports = { SaveImageBase64 }