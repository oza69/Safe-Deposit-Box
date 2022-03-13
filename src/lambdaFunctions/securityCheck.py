import boto3

client = boto3.resource('dynamodb')
table = client.Table("Users")


def lambda_handler(event, context):
    User_ID = event['currentIntent']['slots']['one']

    response = table.get_item(
        Key={
            "User_ID": User_ID
        }
    )

    item = response["Item"]
    box = item['Box_ID']

    answer_1 = item['Answer_1']
    answer_2 = item['Answer_2']
    answer_3 = item['Answer_3']
    question_1 = item['Question_1']
    question_2 = item['Question_2']
    question_3 = item['Question_3']

    i = "In what city were you born?"
    j = event['currentIntent']['slots']['second']

    if(i == str(question_1) and j == str(answer_1)):
        return {
            "dialogAction": {
                "type": "Close",
                "fulfillmentState": "Fulfilled",
                "message": {
                    "contentType": "PlainText",
                    "content": "User as "+User_ID+" has entered "+j+" which is verified "+" and Box number for this is "+box
                }
            }
        }
    elif(i == str(question_2) and j == str(answer_2)):
        return {
            "dialogAction": {
                "type": "Close",
                "fulfillmentState": "Fulfilled",
                "message": {
                    "contentType": "PlainText",
                    "content": "User as "+User_ID+" has entered "+j+" which is verified "+" and Box number for this is "+box
                }
            }
        }
    elif(i == str(question_3) and j == str(answer_3)):
        return {
            "dialogAction": {
                "type": "Close",
                "fulfillmentState": "Fulfilled",
                "message": {
                    "contentType": "PlainText",
                    "content": "User as "+User_ID+" has entered "+j+" which is verified "+" and Box number for this is "+box
                }
            }
        }
    else:
        return {
            "dialogAction": {
                "type": "Close",
                "fulfillmentState": "Fulfilled",
                "message": {
                    "contentType": "PlainText",
                    "content": "Wrong Answer!! You can try later!!"
                }
            }
        }
