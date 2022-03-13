def lambda_handler(event, context):
    confirmation = event['currentIntent']['slots']['confirmation']

    if(confirmation == "Yes"):
        return {
            # 'statusCode': 200,
            # 'body': json.dumps('Hello from Lambda!')
            "dialogAction": {
                "type": "Close",
                "fulfillmentState": "Fulfilled",
                "message": {
                    "contentType": "PlainText",
                    "content": "Would you like to answer a security question to process further!!"
                }
            }
        }
    elif(confirmation == "No"):
        return {
            # 'statusCode': 200,
            # 'body': json.dumps('Hello from Lambda!')
            "dialogAction": {
                "type": "Close",
                "fulfillmentState": "Fulfilled",
                "message": {
                    "contentType": "PlainText",
                    "content": "Thank You for contacting. You need to register to below link: https://main.d9aabqs5dy9xa.amplifyapp.com/sign-up"
                }
            }
        }
    else:
        return {
            # 'statusCode': 200,
            # 'body': json.dumps('Hello from Lambda!')
            "dialogAction": {
                "type": "Close",
                "fulfillmentState": "Fulfilled",
                "message": {
                    "contentType": "PlainText",
                    "content": "Wrong Input!!"
                }
            }
        }
