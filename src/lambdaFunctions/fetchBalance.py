import json
import boto3


def lambda_handler(event, context):
    box_id = str(json.loads(event['body'])['Box_ID'])

    # Create dynamodb client
    dynamodb = boto3.resource('dynamodb')

    # Scan the table
    boxes_table = dynamodb.Table('Boxes')
    response = boxes_table.scan()
    box_info = response['Items']

    box_amount = 0
    for item in box_info:
        if item['Box_ID'] == box_id:
            box_amount = item['Balance_Amount']

    return {
        'httpStatus': 200,
        'body': {'Balance_Amount': box_amount},
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, PUT, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
        }
    }
