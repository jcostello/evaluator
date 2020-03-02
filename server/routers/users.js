const { Router } = require("express");
const { WebClient } = require("@slack/web-api");

const User = require("./../models/user");

const router = Router();

router.get("/api/users", async (_req, res) => {
  const users = await User.find({ deleted: false }).sort("fullName");

  res.send(users);
});

router.post("/api/users/sign_in", async (req, res) => {
  const user = await User.findOne({ email: req.body.email, deleted: false });

  if (!user) {
    return res.status(404).send();
  }

  await user.generateJWT();

  res.send(user);
});

router.patch("/api/users/:id", async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.params.id, deleted: false },
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.send(user);
});

router.get("/api/users/find", async (req, res) => {
  const regexp = new RegExp(req.query.query.toLowerCase().trim(), "i");
  const users = await User.find({ fullName: regexp, deleted: false });

  res.send(users);
});

router.post("/api/users/import", async (req, res) => {
  const usersEmails = await User.find({}).select("email");
  const existingEmails = usersEmails.map(u => u.email);

  const web = new WebClient(process.env.SLACK_TOKEN);
  const slackRes = await web.users.list();
  const regexp = RegExp("@altoros.com");

  const newUsers = slackRes.members
    .filter(
      member =>
        !member.deleted &&
        !member.is_bot &&
        member.profile.email &&
        regexp.test(member.profile.email) &&
        !existingEmails.includes(member.profile.email)
    )
    .map(member => {
      const profile = member.profile;
      return {
        fullName: profile.real_name,
        email: profile.email
      };
    });

  const users = await User.create(newUsers);

  res.send(users);
});

router.get("/api/users/:id", async (req, res) => {
  const user = await User.findOne({ _id: req.params.id, deleted: false });

  res.send(user);
});

router.delete("/api/users/:id", async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.params.id },
    { deleted: true },
    {
      new: true,
      runValidators: true
    }
  );
  res.send(user);
});

module.exports = router;
