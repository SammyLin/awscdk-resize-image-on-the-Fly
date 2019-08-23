# Buile up Resize Images on the Fly with Amazon S3, AWS Lambda, and Amazon API Gateway via CDK

1.
```
cdk deploy
```

2. Upload

```
aws s3 cp example/hello.jpg s3://<BucketName>/
```

3. open origin image
open browser to http://<BucketName>.s3-website-us-east-1.amazonaws.com/hello.jpg

4. open resize image
open browser to  http://<BucketName>.s3-website-us-east-1.amazonaws.com/400x400/hello.jpg

5. Clean Up
```
cdk destroy
```

## Reference

* https://github.com/sagidm/s3-resizer
* https://aws.amazon.com/cn/blogs/compute/resize-images-on-the-fly-with-amazon-s3-aws-lambda-and-amazon-api-gateway/
