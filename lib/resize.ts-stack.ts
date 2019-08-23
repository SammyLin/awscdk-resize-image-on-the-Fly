import cdk = require('@aws-cdk/core');
import s3 = require('@aws-cdk/aws-s3');
import iam = require('@aws-cdk/aws-iam');
import lambda = require('@aws-cdk/aws-lambda');
import apigateway = require('@aws-cdk/aws-apigateway');


export class ResizeTsStack extends cdk.Stack {
  readonly api: apigateway.LambdaRestApi
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ===== Lambda
    const fn = new lambda.Function(this, 'MyFunction', {
      runtime: lambda.Runtime.NODEJS_8_10,
      handler: 'index.handler',
      timeout: cdk.Duration.seconds(60),
      memorySize: 512,
      code: lambda.Code.asset('handler')
    });

    // ===== APIGateWay
    const publishedGateway = new apigateway.LambdaRestApi(
     this, "GetEndpoint",
      {
        handler: fn
      }
    );
    const backendURL = `${publishedGateway.restApiId}.execute-api.${this.region}.amazonaws.com`

    // S3
    const websiteBucket = new s3.Bucket(this, 'S3_Bucket', {
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',
      websiteRoutingRules: [{
        hostName: backendURL,
        httpRedirectCode: '307',
        protocol: s3.RedirectProtocol.HTTPS,
        replaceKey: s3.ReplaceKey.prefixWith('prod/resize-func?path='),
        condition: {
          httpErrorCodeReturnedEquals: '404',
        }
      }],
    });
    websiteBucket.grantPublicAccess();

    fn.addToRolePolicy(new iam.PolicyStatement({
        resources: ['arn:aws:logs:*:*:*'],
        actions: ['logs:CreateLogGroup',
                  'logs:CreateLogStream',
                  'logs:PutLogEvents'] }
    ));
    fn.addToRolePolicy(new iam.PolicyStatement({
        resources: [websiteBucket.bucketArn,`${websiteBucket.bucketArn}/*`,],
        actions: ['s3:PutObject'] }
    ));
//
    fn.addEnvironment('BUCKET', websiteBucket.bucketName);
    fn.addEnvironment('URL', websiteBucket.bucketWebsiteUrl);
    let hint = `
Upload example image via aws s3 cp
====
aws s3 cp example/hello.jpg s3://${websiteBucket.bucketName}/
=====

then open browser to ${websiteBucket.bucketWebsiteUrl}/hello.jpg

or

${websiteBucket.bucketWebsiteUrl}/400x400/hello.jpg

`
    new cdk.CfnOutput(this, 'Hint', {
        value: hint
    })
  }
}
