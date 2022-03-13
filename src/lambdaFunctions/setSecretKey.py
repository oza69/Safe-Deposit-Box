import boto3
import json


def lambda_handler(event, context):
    user_id = str(json.loads(event['body'])['User_ID'])
    secret_key = str(json.loads(event['body'])['Secret_Key'])

    # Create dynamodb client
    dynamodb = boto3.resource('dynamodb')

    # Update table
    users_table = dynamodb.Table('Users')
    users_table.update_item(Key={'User_ID': user_id}, UpdateExpression='SET Secret_Key = :newSecret_Key',
                            ExpressionAttributeValues={':newSecret_Key': secret_key})

    return {'httpStatus': 200}
