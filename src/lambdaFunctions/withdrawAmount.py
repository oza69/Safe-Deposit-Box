import json
import boto3
import csv
import random
import string


def lambda_handler(event, context):
    user_id = str(json.loads(event['body'])['User_ID'])
    box_id = str(json.loads(event['body'])['Box_ID'])
    amount = str(json.loads(event['body'])['Amount'])

    # Create dynamodb client
    dynamodb = boto3.resource('dynamodb')
    s3 = boto3.client('s3')

    bucket = 'withdrawal-transaction-logs'
    key = 'Transactions.csv'
    local_file_name = '/tmp/test.csv'
    transaction_id = ''.join(random.choice(
        string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(10))
    withdrawal_amount = int(amount)

    # Scan the table
    boxes_table = dynamodb.Table('Boxes')
    response = boxes_table.scan()
    box_info = response['Items']

    box_amount = 0
    for item in box_info:
        if item['Box_ID'] == box_id:
            box_amount = item['Balance_Amount']

    balance_amount = box_amount - withdrawal_amount
    if balance_amount > 0:
        boxes_table.update_item(Key={'Box_ID': box_id}, UpdateExpression='SET Balance_Amount = :newCount',
                                ExpressionAttributeValues={':newCount': balance_amount})
        s3.download_file(bucket, key, local_file_name)
        data = [transaction_id, user_id, box_id,
                withdrawal_amount, balance_amount]
        with open('/tmp/test.csv', 'a') as csv_file:
            writer = csv.writer(csv_file)
            writer.writerow(data)
        with open('/tmp/test.csv', 'rb') as csv_file:
            s3.upload_fileobj(csv_file, bucket, key)
        return {
            'httpStatus': 200,
            'body': {'success': True, 'Transaction_ID': transaction_id, 'Withdrawal_Amount': withdrawal_amount, 'Balance_Amount': balance_amount},
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, PUT, GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
            }
        }
    else:
        return {
            'httpStatus': 200,
            'body': {'success': False},
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, PUT, GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
            }
        }
