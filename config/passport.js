const { prisma } = require('../lib/prisma');
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
                return done(null, user);
                
            }
            catch (err) {

            }
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}