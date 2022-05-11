process.env.NODE_ENV = 'test'
const chai = require('chai');
const assert = require('chai').assert;
const app = require('../../src/config/express');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const should = chai.should();
const knex = require('../../src/db/knex-test');
const Player = require('../../src/app/models/Player');

var defaultUser = {
    email: "player1@gmail.com",
    password: "123"
};
var token;
var updatedPlayer;
/**
 * * /api/homeTutorial/tutorials
 */
describe('tutorial_step_passed < 5', () => {
    before(async () => {
        await Player.query().where('email', defaultUser.email)
                .update({tutorial_step_passed: null})
    });// no need to pass done to callback param. Ref:  https://stackoverflow.com/a/57205465/11297747

    after(async () => {
        await Player.query().where('email', defaultUser.email)
            .update({ tutorial_step_passed: null })
    });

    before(done => {
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

    describe('#/tutorials', () => {
        it('api should return 200 code and tutorial_step_passed is updated', function (done) {
            let data = {
                step: 1
            }
            chai.request(app)
                .put('/api/homeTutorial/tutorials')
                // .set(`Authorization', 'Bearer ${token}`)
                .auth(token, { type: 'bearer' }) //ref: chai-http.js
                .send(data)
                .end(async (err, res) => {
                    res.should.have.status(200);
                    let player = await Player.query().where('email', defaultUser.email).first();

                    assert.equal(1, player.tutorial_step_passed);
                    done();
                });

        });

    });
});

describe('tutorial_step_passed = 5', () => {

    before(async () => {
        await knex('characters_players').truncate();
        let player = await Player.query().findOne({ email: defaultUser.email });
        updatedPlayer = await player.$query().updateAndFetch({ tutorial_step_passed: 4 });
    });

    before(done => {
        chai
            .request(app)
            .post("/api/authentication/login")
            .send(defaultUser)
            .end((err, res) => {
                token = res.body.data.token;
                done();
            });
    });

    it('api should return 200 code and tutorial_step_passed is updated', async function () {
        let data = {
            step: 5
        }

        chai.request(app)
            .post('/api/homeTutorial/players/select-character')
            // .set(`Authorization', 'Bearer ${token}`)
            .auth(token, { type: 'bearer' }) //ref: chai-http.js
            .send({
                characterId: 4
            })
            .end(async (err, res) => {
                chai.request(app)
                    .put('/api/homeTutorial/tutorials')
                    // .set(`Authorization', 'Bearer ${token}`)
                    .auth(token, { type: 'bearer' }) //ref: chai-http.js
                    .send(data)
                    .end(async (err, res) => {
                        res.should.have.status(200);
                        let player = await Player.query().where('email', defaultUser.email).first();
                        assert.equal('unlocked', res.body.data.characters[res.body.data.characters.length - 1].status);
                        assert.equal(1, player.tutorial_step_passed);
                        // done();
                    })
            });
    });

});

