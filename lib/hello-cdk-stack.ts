import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class NewRelicExampleCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // Add latest New Relic Lambda layer ARN from https://layers.newrelic-external.com
    const NewReliclayerArn = 'arn:aws:lambda:us-east-1:451483290750:layer:NewRelicNodeJS20X:40';
    const myFunction = new NodejsFunction(this, "NewRelicExampleLambda", {
      runtime: lambda.Runtime.NODEJS_20_X, 
      // Update functions handler to point to the New Relic Lambda wrapper
      handler: "newrelic-lambda-wrapper.handler",
      entry: 'lib/lambda-runtime-code/index.mts',
      layers: [lambda.LayerVersion.fromLayerVersionArn(this, 'NewRelicLayer', NewReliclayerArn)],
      environment: {
        // Set the NEW_RELIC_LAMBDA_HANDLER environment variable to the path of your initial handler.
        NEW_RELIC_LAMBDA_HANDLER: 'index.handler',
        NEW_RELIC_USE_ESM: 'true',
      },
      bundling: {
        sourceMap: true,
        externalModules: [
            'newrelic',
        ]               
    },
    });
  }
}