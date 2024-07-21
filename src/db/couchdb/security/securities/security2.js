const Security1 = require("./security1")

class Security2 {
    encode = (data) => {
        return new Security1().encode(data)
    }

    decode = (data) => {
        return new Security1().decode(data)
    }
}

module.exports = Security2