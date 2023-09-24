import json
import boto3

client = boto3.client('dynamodb')

def lambda_handler(event, context):
  data = client.scan(
    TableName='analyse-id'
  )

  response = {
      'statusCode': 200,
      'body': json.dumps(data),
      'headers': {
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'

      },
  }

  return response
