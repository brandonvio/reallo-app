#!/bin/bash
echo ##################### Package
yarn build 

echo ##################### Deploy
aws s3 sync build/ s3://reallo.xyz --acl public-read

echo ##################### Invalidation
aws cloudfront create-invalidation --distribution-id E1SYZFBCFQZG6V --paths "/*"