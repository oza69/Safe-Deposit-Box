const { v1 } = require("@google-cloud/pubsub");
var cors = require("cors")({ origin: true });

const projectId = "serverless-project-331615";
const subClient = new v1.SubscriberClient();

exports.receiveMessage = (req, res) => {
  cors(req, res, async () => {
    const subscriptionName = req.body.subscriptionName;
    const subcriptionPath = subClient.subscriptionPath(
      projectId,
      subscriptionName
    );

    const request = {
      subscription: subcriptionPath,
      maxMessages: 10,
    };

    const [response] = await subClient.pull(request);

    const ackIds = [];
    for (const message of response.receivedMessages) {
      const textMessage = message.message.data;
      ackIds.push(message.ackId);
      const ackRequest = {
        subscription: subcriptionPath,
        ackIds: ackIds,
      };
      await subClient.acknowledge(ackRequest);
      res.status(200).send(textMessage);
    }
  });
};
