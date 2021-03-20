const crypto = require('crypto');
global.Buffer = require('buffer').Buffer;

function createsha512hash(password) {
    let salt = 'swapsoul';
    return crypto.pbkdf2Sync(password, salt, 1089, 64, 'sha512').toString('hex');
}

exports.createsha512hash = createsha512hash;

exports.decryptToken = (token) => {
    let decryptedValue = new Buffer.from(token, 'base64').toString('binary');
    // console.log(token, decryptedValue);
    let decryptedSplit = decryptedValue.split(':')
    let username = decryptedSplit[0]
    let password = decryptedSplit.slice(1, decryptedSplit.length).join(':')

    return { username: username, hash: createsha512hash(password) };
}