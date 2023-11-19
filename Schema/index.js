const { AnalyticsSchema } = require("./analyticsData/analyticsData.schema");
const { userSchema } = require("./User/user.schema");

module.exports = {
  analytics: AnalyticsSchema,
  user: userSchema,
};
