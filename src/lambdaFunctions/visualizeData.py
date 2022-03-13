import json
import boto3
import csv


def lambda_handler(event, context):
    s3 = boto3.resource('s3')
    bucketFirst = 'withdrawal-transaction-logs'

    json_data = []

    obj = s3.Object(bucketFirst, 'Transactions.csv')
    file = obj.get()['Body'].read().decode('utf-8').splitlines()
    lines = csv.reader(file)
    for line in lines:
        lines = {
            "Transaction_ID": line[0],
            "User_ID": line[1],
            "Box_ID": line[2],
            "Withdrawal_Amount": line[3],
            "Balance_Amount": line[4]
        }

        json_data.append(lines)

    return {
        'statusCode': 200,
        'body': json.dumps(json_data)
    }
