const multer = require('multer')

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (req.originalUrl.includes('company')) cb(null, 'public/img/company')
        if (req.originalUrl.includes('user')) cb(null, 'public/img/user')
    },
    filename: (req, file, cb) => {
        const fileName = (route, prop) => {
            let filename = ""
            if (!req.body[prop]) req.body[prop] = ''
            filename = req.body[prop].toLowerCase().split(" ").join("_")
            if (req.files && req.files.length > 1) filename = filename.concat("_" + req.files.length)

            return filename.replace(/[<>:"\/\\|?*]+/g, "")
        }
        const extension = file.originalname.split('.').slice(-1)

        if (req.originalUrl.includes('company')) cb(null, `${fileName('company', 'name')}_${(Date.now() / 1000).toFixed(0)}.${extension}`)
        if (req.originalUrl.includes('user')) cb(null, `${fileName('user', 'firstName')}_${(Date.now() / 1000).toFixed(0)}.${extension}`)
    }
})

module.exports = multer({ storage: fileStorage })