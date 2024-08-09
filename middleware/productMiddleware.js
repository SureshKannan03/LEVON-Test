module.exports = {
  validateProduct: async (req, res, next) => {
    if (
      !req.body?.name ||
      typeof req.body?.name !== "string" ||
      req.body?.name.trim() === ""
    ) {
      return res.status(400).json({
        error: "oops!, product name is required & must be a non-empty string.",
      });
    }
    if (
      req.body?.price == null ||
      typeof req.body?.price !== "number" ||
      req.body?.price <= 0
    ) {
      return res.status(400).json({
        error: "oops!, Product price is required & must be a positive number.",
      });
    }
    req.isSuccess = true;
    return next();
  },
};
