const AppError = require('./appError')
const fs = require('fs-extra')

module.exports.checkRequiredValue = (value) => {
    if (!!Object.values(value).at(0)) return true
    else throw new AppError('Required value is not defined', 400)
}

module.exports.removeFile = (file) => {
    if (fs.existsSync(file.path)) {
        console.log('Removing file at:', file.path)
        fs.unlinkSync(file.path, (err) => {
            if (err) {
                console.log('Error deleting file at path:', file.path)
            }
        })
    }
    else console.log('File does not exist at path:', file.path)
}

module.exports.formatDate = (date) => {
    if (typeof (date) === 'string' && date.lastIndexOf('-') === 4) return date;

    let d = new Date(date),
        month = '' + (d.getMonth() + 1);
    day = '' + d.getDate();
    year = d.getFullYear()

    if (isNaN(d.valueOf())) {
        return date
    }

    let hours = d.getHours()
    let minutes = d.getMinutes()

    if (month.length < 2)
        month = '0' + month
    if (day.length < 2)
        day = '0' + day
    if (hours < 10)
        hours = '0' + hours
    if (minutes < 10)
        minutes = '0' + minutes

    const time = [year, month, day].join('-')

    let dateTime

    if (typeof (date) !== 'string') dateTime = new Date(date).toISOString();
    else dateTime = date

    if (hours !== undefined && minutes !== undefined && dateTime.indexOf('T') > -1) {
        return [time, [hours, minutes].join(':')].join(' ')
    } else return time
}