#!/bin/bash

echo ##################### Package
aws cloudformation package --template-file template.yaml --output-template-file serverless-output.yaml --s3-bucket reallo-api


echo ##################### Deploy
aws cloudformation deploy --template-file serverless-output.yaml --stack-name reallo-api --capabilities CAPABILITY_IAM