import random
import json
import boto3


def lambda_handler(event, context):
    user_id = str(json.loads(event['body'])['User_ID'])

    # Create dynamodb client
    dynamodb = boto3.resource('dynamodb')

    # Scan the table
    users_table = dynamodb.Table('Users')
    response = users_table.scan()
    user_info = response['Items']

    secret_key = 0
    for item in user_info:
        if item['User_ID'] == user_id:
            secret_key = int(item['Secret_Key'])

    # File downloaded from https://github.com/powerlanguage/word-lists/blob/master/common-7-letter-words.txt
    words = list()
    with open('words.txt', 'r') as file_reader:
        text_file = file_reader.readlines()
    for word in text_file:
        words.append(word.strip('\n').lower())
    word_count = len(words)

    # Get plain text
    index = random.randint(0, word_count)
    plain_text = words[index]

    # Generate cipher text
    cipher_text = ''
    for letter in plain_text:
        cipher_text += chr((ord(letter) + secret_key - 97) % 26 + 97)

    return {'httpStatus': 200, 'body': {'Plain_Text': plain_text, 'Cipher_Text': cipher_text}}
