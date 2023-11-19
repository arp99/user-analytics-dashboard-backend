const errorHandler = (error, req, res) => {
  console.error("error occured: ", error);
  res.status(500).send({
    success: false,
    message: "Internal Server Error",
  });
};

module.exports =  errorHandler;
