const mongoose = require("mongoose");
const config = require("../config");
const { analytics, user } = require("../Models");
const { getTransformedAnalyticsData } = require("../helpers");

let db = null;

const connectToDatabase = async () => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return db;
    } else {
      try {
        mongoose.set("strictQuery", false);
        mongoose.connect(
          `${config.DB_URL}/analyticsDB`,
          { useNewUrlParser: true },
          async function (err, _db) {
            if (err) {
              reject(err);
              return err;
            }

            db = _db;
            // populate data if not present for first time
            const data = await analytics.findOne();
            const userData = await user.findOne();

            // no data is there add the anaytics data
            if (!data) {
              try {
                await analytics.insertMany(getTransformedAnalyticsData());
              } catch (err) {
                console.log("analytics seeders error: ", err);
              }
            }

            // create a guest user
            if (!userData) {
              try {
                const newUser = new user({
                  firstName: "Guest",
                  lastName: "User",
                  email: "guest@demo.com",
                  password: "1234",
                });
                await newUser.save()
              } catch (err) {
                console.log("guest user seeders error: ", err);
              }
            }

            resolve(_db);
            console.log("Database connected");
            return _db;
          }
        );
      } catch (err) {
        logger.error(err);
        return err;
      }
    }
  });
};

module.exports = connectToDatabase;
