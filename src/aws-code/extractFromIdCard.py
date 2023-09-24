import json
import boto3
import base64
from collections import defaultdict
import re
import uuid


def lambda_handler(event, context):
    # TODO implement

    # print(json.dumps(event))

    # eventBody = json.loads(json.dumps(event))['body']

    imageBase64 = event['Image']




    # Amazon Textract client
    textract = boto3.client('textract')

    # Call Amazon Textract
    response = textract.analyze_document(
        Document={
            'Bytes': base64.b64decode(imageBase64)
        },
        FeatureTypes=['FORMS'])



    key_map, value_map, block_map = getBlock(response)

    # Get Key Value relationship
    kvs = get_kv_relationship(key_map, value_map, block_map)
    print("\n\n== FOUND KEY : VALUE pairs ===\n")
    # print_kvs(kvs)

    result_dict = {}
    for key, value in kvs.items():
        result_dict[key] = value

    # Save data here
    saveDataIntoDynamoDB(result_dict)

    return {
        'statusCode': 200,
        'body': json.dumps(result_dict),
        'headers': {
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        }
    }



def getBlock(response):

    # Get the text blocks
    blocks = response['Blocks']

    # get key and value maps
    key_map = {}
    value_map = {}
    block_map = {}
    for block in blocks:
        block_id = block['Id']
        block_map[block_id] = block
        if block['BlockType'] == "KEY_VALUE_SET":
            if 'KEY' in block['EntityTypes']:
                key_map[block_id] = block
            else:
                value_map[block_id] = block

    return key_map, value_map, block_map

def get_kv_relationship(key_map, value_map, block_map):
    kvs = defaultdict(list)
    for block_id, key_block in key_map.items():
        value_block = find_value_block(key_block, value_map)
        key = get_text(key_block, block_map)
        val = get_text(value_block, block_map)
        kvs[key].append(val)
    return kvs

def find_value_block(key_block, value_map):
    for relationship in key_block['Relationships']:
        if relationship['Type'] == 'VALUE':
            for value_id in relationship['Ids']:
                value_block = value_map[value_id]
    return value_block

def get_text(result, blocks_map):
    text = ''
    if 'Relationships' in result:
        for relationship in result['Relationships']:
            if relationship['Type'] == 'CHILD':
                for child_id in relationship['Ids']:
                    word = blocks_map[child_id]
                    if word['BlockType'] == 'WORD':
                        text += word['Text'] + ' '
                    if word['BlockType'] == 'SELECTION_ELEMENT':
                        if word['SelectionStatus'] == 'SELECTED':
                            text += 'X '

    return text

def print_kvs(kvs):
    for key, value in kvs.items():
        print(key, ":", value)



# function to save Data into Dynamo DB

def saveDataIntoDynamoDB(body):
    client = boto3.client('dynamodb')
    data = client.put_item(
    TableName ='analyse-id',
    Item = {
        'id': {'S': str(uuid.uuid4())},
        "body": {
            'S' : str(body)
        }
    }
  )
