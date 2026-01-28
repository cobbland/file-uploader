const { prisma } = require('./lib/prisma');
const LocalStrategy = require('passport-local');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                const user = await prisma.user.findUnique({
                    where : {
                        username: username,
                    },
                });
                if (!user) {
                    return done(null, false, { message: "Incorrect username or password" });
                }
                
            }
            catch (err) {

            }
        })
    )
}

passport.use(new LocalStrategy(function verify(username, password, cb) {
    const user = { username: 'jacob', };
    return cb(null, user);
}));