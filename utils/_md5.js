const crypto = require('crypto');
const _md5 = (password) => {
    const hash = crypto.createHash('md5');
    const result = hash.update(password).digest('hex');
    return result;
}

module.exports = _md5;