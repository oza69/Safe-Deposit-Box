import random
import boto3
import json


def lambda_handler(event, context):
    user_id = str(json.loads(event['body'])['User_ID'])

    # Create dynamodb client
    dynamodb = boto3.resource('dynamodb')
    users_table = dynamodb.Table('Users')
    user_info = users_table.get_item(Key={'User_ID': user_id})['Item']

    # Return a random Question and Answer
    index = random.randint(0, 9) % 3
    body = dict()
    if index == 0:
        body['Question'] = user_info['Question_1']
        body['Answer'] = user_info['Answer_1']
    elif index == 1:
        body['Question'] = user_info['Question_2']
        body['Answer'] = user_info['Answer_2']
    else:
        body['Question'] = user_info['Question_3']
        body['Answer'] = user_info['Answer_3']

    return {'httpStatus': 200, 'body': body}
