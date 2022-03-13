import boto3
import string
import random
import json


def lambda_handler(event, context):
    user_id = str(json.loads(event['body'])['User_ID'])
    email_id = str(json.loads(event['body'])['Email_ID'])
    # Create dynamodb client
    dynamodb = boto3.resource('dynamodb')

    # Scan the table
    boxes_table = dynamodb.Table('Boxes')
    users_table = dynamodb.Table('Users')
    response = boxes_table.scan()
    box_info = response['Items']

    # Check for available boxes
    available_boxes_count = 0
    available_boxes = list()
    for item in box_info:
        if item['User_Count'] < 3:
            available_boxes_count += 1
            available_boxes.append(item['Box_ID'])

    # Create new boxes
    if available_boxes_count < 3:
        required_boxes = 3 - available_boxes_count
        while(required_boxes > 0):
            box_id = ''.join(random.choice(string.ascii_uppercase +
                             string.ascii_lowercase + string.digits) for _ in range(10))
            boxes_table.put_item(
                Item={'Box_ID': box_id, 'Balance_Amount': 5000, 'User_Count': 0})
            required_boxes -= 1
            available_boxes.append(box_id)

    # Assign user to a box
    index = random.randint(0, 9) % 3
    user_box_id = available_boxes[index]
    users_table.put_item(Item={'User_ID': user_id, 'Email_ID': email_id, 'Box_ID': user_box_id, 'Question_1': '-',
                         'Answer_1': '-', 'Question_2': '-', 'Answer_2': '-', 'Question_3': '-', 'Answer_3': '-', 'Secret_Key': '-'})

    # Update box info
    current_user_count = 0
    for item in box_info:
        if item['Box_ID'] == user_box_id:
            current_user_count = item['User_Count']
            break
    updated_user_count = current_user_count + 1
    boxes_table.update_item(Key={'Box_ID': user_box_id}, UpdateExpression='SET User_Count = :newCount',
                            ExpressionAttributeValues={':newCount': updated_user_count})

    return {
        'httpStatus': 200,
        'body': {'Box_ID': user_box_id},
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, PUT, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
        }
    }
