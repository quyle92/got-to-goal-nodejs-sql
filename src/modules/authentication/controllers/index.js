const Player = require('../../../app/models/Player');
const { resSuccess, resError, resPaginationSuccess } = require('../../../utils/apiResponse');

module.exports = {
    login: async function (req, res, next) {
        try {
            let {email, password} = req.body;
            let player = await Player.query().where('email', email).first();
            //check if email is in the server.
            if (! player) {
                return resError(code = '', message = 'Authentication failed', errors = [
                    { type: 'email', message: 'Player not existed.' }
                ], 401);
            }
            //check if password is correct.
            if (! player.verifyPassword(password)) {
                return resError(code = '', message = 'Authentication failed', errors = [
                    { type: 'password', message: 'Password is incorrect.' }
                ], 401);
            }
            //genrate JWT.
            let token = player.generateJWT();
            delete player.password;
            const result = { ...{ token } , ...player};

            return res.json(resSuccess(result));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}