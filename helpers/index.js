const { userAnalyticsData } = require("../data/user-analytics");

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const getTransformedAnalyticsData = () => {
  return userAnalyticsData.map(({ Day, Age, Gender, ...products }) => {

    const [d, m, y] = Day.split(/-|\//);

    return {
      day: new Date(y, m - 1, d).getTime(),
      age: Age,
      gender: Gender.toUpperCase(),
      products: {
        ...products,
      },
    };
  });
};

module.exports = {
  normalizePort,
  getTransformedAnalyticsData,
};
