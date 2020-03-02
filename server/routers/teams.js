const { Router } = require("express");

const Team = require("./../models/team");

const router = Router();

router.get("/api/teams", async (_req, res) => {
  const teams = await Team.find({}).populate("members");

  res.send(teams);
});

router.get("/api/teams/:id", async (req, res) => {
  const team = await Team.findById(req.params.id).populate("members");

  res.send(team);
});

router.post("/api/teams", async (req, res) => {
  const team = await Team.create(req.body);

  res.send(team);
});

router.patch("/api/teams/:id", async (req, res) => {
  const team = await Team.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true
  });

  res.send(team);
});

router.delete("/api/teams/:id", async (req, res) => {
  const team = await Team.findByIdAndDelete(req.params.id);

  res.send(team);
});

module.exports = router;
