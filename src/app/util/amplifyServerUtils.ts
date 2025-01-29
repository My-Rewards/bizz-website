import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import {awsConfig} from "@/static/amplify"

export const { runWithAmplifyServerContext } = createServerRunner({
  config: awsConfig
});