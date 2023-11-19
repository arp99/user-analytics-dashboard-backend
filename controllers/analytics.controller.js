const { analytics } = require("../Models");

const getAnalytics = async (req, res) => {
  try {
    const { startDate, endDate, gender, age } = req.query; // filters

    // no filters applied return whole data
    if (!startDate && !endDate && !gender && !age) {
      const data = await analytics.find();
      return res.status(200).json({
        success: true,
        data,
      });
    } else {
      // if date range is given
      if (startDate && endDate) {
        console.log("startDate: ", typeof startDate);
        // add the date filter and the gender and age filter as it is
        const query = {
          day: {
            $gte: Number(startDate),
            $lte: Number(endDate),
          },
        };

        if (gender) {
          query.gender = gender.toUpperCase();
        }
        if (age) {
          query.age = age;
        }

        const data = await analytics.aggregate([
          {
            $match: query,
          },
          {
            $project: {
              __v: 0,
            },
          },
        ]);

        return res.status(200).json({
          success: true,
          data,
        });
      } else {
        const query = {};
        if (gender) {
          query.gender = gender.toUpperCase();
        }
        if (age) {
          query.age = age;
        }
        const data = await analytics.aggregate([
          {
            $match: query,
          },
          {
            $project: {
              __v: 0,
            },
          },
        ]);

        return res.status(200).json({
          success: true,
          data,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get analytics!",
      errorMessage: err.message,
    });
  }
};

module.exports = { getAnalytics };
