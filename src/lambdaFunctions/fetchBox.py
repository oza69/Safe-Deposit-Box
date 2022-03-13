import json
import boto3


def lambda_handler(event, context):
    user_id = str(json.loads(event['body'])['User_ID'])

    # Create dynamodb client
    dynamodb = boto3.resource('dynamodb')
    users_table = dynamodb.Table('Users')
    user_info = users_table.get_item(Key={'User_ID': user_id})['Item']

    return {'httpStatus': 200, 'body': {'Box_ID': user_info['Box_ID']}}
