const passport = require('passport');
const PassportLocalStrategy = require('passport-local').Strategy;
const async = require('async');
const fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Connection Helper
const dbConnectionHelper = require(__base + 'lib/db/dbConnectionHelper');

const Authentification = {

    ////////////////////////////////////
    //////////       GET      //////////
    ////////////////////////////////////
    /**
     * @param {Object} query
     * @param {string} query.id **required
     * @param {Callback} callback
     */
    session: (query, callback) => {
        dbConnectionHelper.getConnection((err, connection) => {
            connection.query('SELECT * FROM user WHERE id=' + query.id, (err, results) => {
                connection.release(); // Done with the connection.
                if (err || !results[0]) {
                    callback('ResourceNotFound', null);
                } else {
                    callback(null, results[0]);
                }
            });
        });
    },

    /**
     * @param {string} query.countryDialCode **required
     * @param {string} query.phoneNumber **required
     * @param {string} query.langCode **required
     */
    getVerificationCode: (query, callback) => {
        const verificationCode = Math.floor(Math.random() * 900000) + 100000;
        query.type = 0;
        query.message = '点点照 - 你的验证码是xxxx';
        query.message = query.message.replace('xxxx', verificationCode);
        callback(null, { verificationCode: '000000' });
    },

    /**
     * @param {string} query.idText **required
     */
    isIdExist: (query, callback) => {
        dbConnectionHelper.getConnection((err, connection) => {
            connection.query('SELECT * FROM user WHERE idText=?', [query.idText], (err, results) => {
                // Has result?
                if (err || !results[0]) {
                    callback(null, true);
                } else {
                    callback('EmailAlreadyExists', null);
                }
                connection.release();
            });
        });
    },
    /**
     * @param {string} query.countryDialCode **required
     * @param {string} query.phoneNumber **required
     */
    isPhoneNumberExist: (query, callback) => {
        if (query.phoneNumber.substring(0, 1) == 0) {
            query.phoneNumber = query.phoneNumber.substring(1);
        }
        query.fullPhoneNumber = query.countryDialCode + query.phoneNumber;
        dbConnectionHelper.getConnection((err, connection) => {
            connection.query('SELECT * FROM user WHERE fullPhoneNumber=' + query.fullPhoneNumber, (err, results) => {
                // Has result?
                if (err || results.length == 0) {
                    callback(null, true);
                } else {
                    callback('EmailAlreadyExists', null);
                }
                connection.release();
            });
        });
    },
    ////////////////////////////////////
    //////     Create / Update   ///////
    ////////////////////////////////////
    /**
     * @param {string} query.idText **required
     * @param {string} query.password **required
     */
    login: (query, callback) => {
        dbConnectionHelper.getConnection((err, connection) => {
            connection.query('SELECT * FROM user WHERE idText=?', [query.idText], (err, results) => {
                // Has result?
                if (err || results.length == 0) {
                    callback('InvalidAuthenticationEmail', null);
                    connection.release();
                    return;
                }

                // Password Collect?
                let user = JSON.parse(JSON.stringify(results[0]));
                bcrypt.compare(query.password, user.password, (err, isCollect) => {
                    if (isCollect) {
                        callback(null, user);
                    } else {
                        callback('InvalidAuthenticationPassword', null);
                    }
                    connection.release();
                });
            });
        });
    },
    /**
     * @param {Object} query
     * @param {number} query.countryDialCode **required
     * @param {number} query.phoneNumber **required
     * @param {string} query.idText **required
     * @param {string} query.name **required
     * @param {string} query.password **required
     * @param {string} query.email **required
     * @param {Number} query.type **required
     * @param {string} query.address1
     * @param {string} query.address2
     * @param {Callback} callback
     */
    signup: (query, callback) => {
        async.waterfall([
            (callback1) => {
                if (query.phoneNumber.substring(0, 1) == 0) {
                    query.phoneNumber = query.phoneNumber.substring(1);
                }
                query.fullPhoneNumber = query.countryDialCode + query.phoneNumber;

                // 비밀번호 암호화
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    bcrypt.hash(query.password, salt, (err, hash) => {
                        query.password = hash;
                        callback1(null);
                    });
                });
            },
        ], (err) => {
            dbConnectionHelper.getConnection((err, connection) => {
                if (err) {
                    callback('InvalidAuthenticationInfo', null);
                    return;
                }
                connection.query('SELECT * FROM user WHERE idText=? OR fullPhoneNumber=?', [query.idText, query.fullPhoneNumber], (err, results) => {
                    if (!err && results.length > 0) {
                        callback('EmailAlreadyExists', null);
                        connection.release(); // Done with the connection.
                    } else {
                        connection.query('INSERT INTO user SET ?', query, (err, result) => {
                            if (err || !result) {
                                callback('InvalidAuthenticationInfo', null);
                                connection.release();
                            } else {
                                connection.query('SELECT * FROM user WHERE id=' + result.insertId, (err, results) => {
                                    callback(null, results[0]);
                                    connection.release();
                                });
                            }
                        });
                    }
                });
            });
        });
    },

    password: {
        /**
         * @param {number} query.countryDialCode **required
         * @param {number} query.phoneNumber **required
         * @param {string} query.password **required
         * @param {Callback} callback
         */
        change: (query, callback) => {
            async.waterfall([
                (callback) => {
                    if (query.phoneNumber.substring(0, 1) == 0) {
                        query.phoneNumber = query.phoneNumber.substring(1);
                    }
                    query.fullPhoneNumber = query.countryDialCode + query.phoneNumber;

                    // 비밀번호 암호화
                    bcrypt.genSalt(saltRounds, (err, salt) => {
                        bcrypt.hash(query.password, salt, (err, hash) => {
                            query.password = hash;
                            callback(null);
                        });
                    });
                },
            ], (err) => {
                dbConnectionHelper.getConnection((err, connection) => {
                    connection.query('UPDATE user SET password = "' + query.password + '" WHERE fullPhoneNumber=' + query.fullPhoneNumber, (err, results) => {
                        connection.release();
                        if (err) {
                            callback('InvalidAuthenticationInfo', null);
                            return;
                        }
                        callback(null, null);
                    });
                });
            });
        },
    },
}
module.exports = Authentification;


////////////////////////////////////
//////       Init            ///////
////////////////////////////////////
passport.use(new PassportLocalStrategy({
        usernameField: 'idText',
        passwordField: 'password',
        passReqToCallback: true,
    },
    (request, idText, password, done) => {
        Authentification.login({
            idText: idText,
            password: password,
        }, (err, doc) => {
            if (!err && doc) {
                done(null, doc);
            } else {
                done(err, false, { message: err });
            }
        });
    }));

passport.serializeUser((user, done) => {
    let sessionUser = {
        id: user.id,
        fullPhoneNumber: user.fullPhoneNumber,
        countryDialCode: user.countryDialCode,
        phoneNumber: user.phoneNumber,
        name: user.name,
        email: user.email,
    };
    done(null, sessionUser);
    //로그인 로그를 여기서 저장해주어야함
});

passport.deserializeUser((user, done) => {
    done(null, user);
});