const { Router } = require("express");

const Form = require("./../models/form");

const router = Router();

router.get("/api/forms", async (req, res) => {
  const forms = await Form.find({});

  res.send(forms);
});

router.get("/api/forms/:id", async (req, res) => {
  const form = await Form.findById(req.params.id);

  console.log(form);
  console.log(await Form.find({}));
  console.log(req.params.id);

  res.send(form);
});

router.patch("/api/forms/:id", async (req, res) => {
  const form = await Form.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true
  });

  res.send(form);
});

router.post("/api/forms", async (req, res) => {
  const form = await Form.create(req.body);

  res.send(form);
});

router.delete("/api/forms/:id", async (req, res) => {
  const form = await Form.findByIdAndDelete(req.params.id);

  res.send(form);
});

module.exports = router;
