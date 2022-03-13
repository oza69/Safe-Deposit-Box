import boto3
import json


def lambda_handler(event, context):
    user_id = str(json.loads(event['body'])['User_ID'])
    question_1 = str(json.loads(event['body'])['Question_1'])
    answer_1 = str(json.loads(event['body'])['Answer_1'])
    question_2 = str(json.loads(event['body'])['Question_2'])
    answer_2 = str(json.loads(event['body'])['Answer_2'])
    question_3 = str(json.loads(event['body'])['Question_3'])
    answer_3 = str(json.loads(event['body'])['Answer_3'])

    # Create dynamodb client
    dynamodb = boto3.resource('dynamodb')

    # Update table
    users_table = dynamodb.Table('Users')

    users_table.update_item(Key={'User_ID': user_id}, UpdateExpression='SET Question_1 = :newQuestion_1',
                            ExpressionAttributeValues={':newQuestion_1': question_1})
    users_table.update_item(Key={'User_ID': user_id}, UpdateExpression='SET Question_2 = :newQuestion_2',
                            ExpressionAttributeValues={':newQuestion_2': question_2})
    users_table.update_item(Key={'User_ID': user_id}, UpdateExpression='SET Question_3 = :newQuestion_3',
                            ExpressionAttributeValues={':newQuestion_3': question_3})
    users_table.update_item(Key={'User_ID': user_id}, UpdateExpression='SET Answer_1 = :newAnswer_1',
                            ExpressionAttributeValues={':newAnswer_1': answer_1})
    users_table.update_item(Key={'User_ID': user_id}, UpdateExpression='SET Answer_2 = :newAnswer_2',
                            ExpressionAttributeValues={':newAnswer_2': answer_2})
    users_table.update_item(Key={'User_ID': user_id}, UpdateExpression='SET Answer_3 = :newAnswer_3',
                            ExpressionAttributeValues={':newAnswer_3': answer_3})

    return {'httpStatus': 200}
