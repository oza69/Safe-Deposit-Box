import boto3

client = boto3.resource('dynamodb')
table = client.Table("Boxes")


def lambda_handler(event, context):
    # TODO implement
    # Box_ID='1C1'
    Box_ID = event['currentIntent']['slotDetails']['boxid']['originalValue']

    response = table.get_item(
        Key={
            "Box_ID": Box_ID
        }
    )

    item = response["Item"]
    balance = item['Balance_Amount']

    return {
        # 'statusCode': 200,
        # 'body': json.dumps('Hello from Lambda!')
        "dialogAction": {
            "type": "Close",
            "fulfillmentState": "Fulfilled",
            "message": {
                "contentType": "PlainText",
                "content": "User with "+str(Box_ID)+" has balance "+str(balance)
            }
        }

    }
