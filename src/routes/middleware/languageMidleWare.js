const { _supportedLanguages, __cookieConfig, _defaultLanguage } = require("../utils")

module.exports = async (req, res, next) => {
    const lngRecieve = (req.query.lng || req.cookies.lng || req.headers.lng || _defaultLanguage).toUpperCase()
    const lng = _supportedLanguages.includes(lngRecieve) ? lngRecieve : _defaultLanguage
    res.cookie("lng", lng, __cookieConfig)
    req.lng = lng
    next()
}