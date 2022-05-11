process.env.NODE_ENV = 'test'
const chai = require('chai');
const assert = require('chai').assert;
const app = require('../../../src/config/express');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const should = chai.should();
const knex = require('../../../src/db/knex-test');

var defaultUser = {
    email: "player1@gmail.com",
    password: "123"
};
var token;
/**
 * *  /api/homeTutorial/players/select-character
 */

describe('/api/homeTutorial/players/select-character', () => {
    before(async () => {
        await knex('characters_players').truncate();
    });// no need to pass done to callback param. Ref:  https://stackoverflow.com/a/57205465/11297747

    beforeEach(done => {
        chai
            .request(app)
            .post("/api/authentication/login")
            .send(defaultUser)
            .end((err, res) => {
                token = res.body.data.token;
                res.should.have.status(200);
                done();
            });
    });

    it('api should return 200 code and all needed inserts are run as expected', function(done) {
        let data = {
            characterId: 4
        }
        chai.request(app)
            .post('/api/homeTutorial/players/select-character')
            // .set(`Authorization', 'Bearer ${token}`)
            .auth(token, { type: 'bearer' }) //ref: chai-http.js
            .send(data)
            .end(async (err, res) => {
                let [countObj, player] = await Promise.all([
                    knex('characters_players').count().first(),
                    knex('players').select('tutorial_started_at').where('email', defaultUser.email).first()
                ]);
                res.should.have.status(200);
                assert.equal(4, countObj['count(*)']);
                assert.isNotNull(player.tutorial_started_at, 'player\'s tutorial_started_at is not null');

                done();
            });
    });

    it('api should return 422 code as the character is already selected', function (done) {
        let data = {
            characterId: 4
        }
        chai.request(app)
            .post('/api/homeTutorial/players/select-character')
            // .set(`Authorization', 'Bearer ${token}`)
            .auth(token, { type: 'bearer' }) //ref: chai-http.js
            .send(data)
            .end(async (err, res) => {
                res.should.have.status(422);
                done();
            });
    });

});

