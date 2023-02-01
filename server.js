// https://pusher.com/tutorials/push-notifications-node-service-workers/

require("dotenv").config({ path: "variables.env" });

const express = require("express");
const webPush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client")));

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webPush.setVapidDetails(
  "mailto:test@example.com",
  publicVapidKey,
  privateVapidKey
);

app.post("/subscribe", (req, res) => {
  const subscription = req.body;

  res.status(201).json({});

  const payload = JSON.stringify({
    title: "Medications updated"
  });

  webPush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

app.set("post", process.env.PORT || 5000);

const server = app.listen(app.get("port"), () => {
  console.log(`Express running -> PORT ${server.address().port}`);
});
