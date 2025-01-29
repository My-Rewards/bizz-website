import { awsConfig } from './../static/amplify';
import { createServerRunner } from "@aws-amplify/adapter-nextjs";

export const { runWithAmplifyServerContext } = createServerRunner({
    config:awsConfig,
});