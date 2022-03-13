const { PubSub } = require("@google-cloud/pubsub");
var cors = require("cors")({ origin: true });

const projectId = "serverless-project-331615";
const pubsub = new PubSub({ projectId });

exports.createTopic = (req, res) => {
  cors(req, res, async () => {
    const [topics] = await pubsub.getTopics();
    var isTopicExist = false;
    for (let topic of topics) {
      var topicName = topic.name;
      var topicId = topicName.split("topics/")[1];
      if (topicId === "topic-" + req.body.topicName) {
        isTopicExist = true;
        break;
      }
    }

    if (!isTopicExist) {
      const [topic] = await pubsub.createTopic("topic-" + req.body.topicName);
      const subscriptionName = "subscription-" + req.body.topicName;
      await pubsub.topic(topic.name).createSubscription(subscriptionName);
      res.json({
        status: 1,
        message: "Topic & Subscription created.",
      });
    }
    res.json({
      status: 0,
      message: "Topic Exist.",
    });
  });
};
