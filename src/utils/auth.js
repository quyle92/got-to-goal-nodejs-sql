var bcrypt = require('bcryptjs');

module.exports = {
    generateHashPwd: (plainPwd, round = 10) => {
        try {
            if(! plainPwd) {
                return;
            }
            let salt = bcrypt.genSaltSync(round);

            return bcrypt.hashSync(plainPwd, salt);
        } catch (error) {
            throw error
        }
    },

    isPasswordCorrect: (plainPwd, hashPwd) => {
        return bcrypt.compareSync(plainPwd, hashPwd);
    }
}