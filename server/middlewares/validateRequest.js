function validateRequest(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };
}

module.exports = validateRequest;
// If the request body does not match the schema, it returns 400 Bad Request;
// If schema validation passes, the next middleware/controller is executed
// for example: router.post("/", validateRequest(schema), middleware1, controller); if there is this kind of structure it will pass the middleware1 but right now there is only 1 middleware so it will directly go controller
