# Buile up Resize Images on the Fly with Amazon S3, AWS Lambda, and Amazon API Gateway via CDK

### Requirement

1. Install AWS CDK using `npm install -g aws-cdk`
2. Run `npm install` in repo root directory to install the packages
2. Switch/fix the `default` AWS profile to be the profile you want to use (profile management is not quite working properly)
3. Run `cdk bootstrap` to bootstrap the account for CDK usage

### Deployment
1. Run `npm run build` to compile the code (remember to do this whenever there is a code change! or use "npm run watch")
2. `cdk deploy` deploy this stack to your default AWS account/region

### Verification
Output will show your correct endpoint, when you completed the `cdk deploy` stage.

#### 1. Upload Example Images
```
aws s3 cp example/hello.jpg s3://$BucketName/
```

#### 2. open origin image
open browser to http://$BucketName.s3-website-us-east-1.amazonaws.com/hello.jpg

#### 3. open resize image
open browser to  http://$BucketName.s3-website-us-east-1.amazonaws.com/400x400/hello.jpg

### CleanUP
1. Run "cdk destroy" to delete the stack. This works even if the stack never was created properly in the first place.

## Reference

* https://github.com/sagidm/s3-resizer
* https://aws.amazon.com/cn/blogs/compute/resize-images-on-the-fly-with-amazon-s3-aws-lambda-and-amazon-api-gateway/
