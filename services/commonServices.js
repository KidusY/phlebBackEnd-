const xss = require('xss');
const bcrypt = require('bcryptjs');
const Treeize = require('treeize');

const CommonServices = {
    hashPassword(password) {
        return bcrypt.hash(password, 12);
    }
}

module.exports = CommonServices;