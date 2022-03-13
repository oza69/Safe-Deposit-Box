const { PubSub } = require("@google-cloud/pubsub");
const cors = require("cors")({ origin: true });

const projectId = "serverless-project-331615";
const pubsub = new PubSub({ projectId });

exports.publishMessage = (req, res) => {
  cors(req, res, async () => {
    const data = req.body;
    const message = data.message;
    const topicName = data.topic;
    await pubsub.topic(topicName).publish(Buffer.from(JSON.stringify(message)));
    res.status(200).send("Message sent successfully !!");
  });
};
