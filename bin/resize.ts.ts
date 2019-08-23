#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { ResizeTsStack } from '../lib/resize.ts-stack';

const app = new cdk.App();
new ResizeTsStack(app, 'ResizeTsStack');
