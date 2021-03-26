const crypto = require('crypto');
global.Buffer = require('buffer').Buffer;

exports.createsha512hash = createsha512hash = (password) => {
    let salt = 'swapsoul';
    return crypto.pbkdf2Sync(password, salt, 1089, 64, 'sha512').toString('hex');
};

exports.isFieldValid = isFieldValid = (value) => {
    if (value) {
        if (typeof value === 'number' || typeof value === 'string') {
            if (String(value).trim().length > 0) {
                return true;
            }
        } else {
            return true;
        }
    }
    return false;
};

exports.throwError = throwError = (message) => {
    throw message;
};

exports.decryptToken = (token) => {
    const decryptedValue = new Buffer.from(token, 'base64').toString('binary');
    // console.log(token, decryptedValue);
    const decryptedSplit = decryptedValue.split(':');
    const username = decryptedSplit[0];
    const password = decryptedSplit.slice(1, decryptedSplit.length).join(':');

    return { usernameOrEmail: username, hash: isFieldValid(password) ? createsha512hash(password) : throwError('Invalid Password') };
};

exports.createOtp = (length) => {
    let result = '';
    let characters = [...Array(26)].map((val, i) => String.fromCharCode(i + 65)).join('');
    characters += characters.toLowerCase() + [...Array(10).keys()].join('');

    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
