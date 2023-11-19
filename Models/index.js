const { model } = require("mongoose");
const Schemas = require("../Schema");

const getModels = () => {
  return Object.entries(Schemas).reduce(
    (acc, [key, schema]) => ({ ...acc, [key]: model(key, schema) }),
    {}
  );
};

module.exports = {
  ...getModels(),
};
