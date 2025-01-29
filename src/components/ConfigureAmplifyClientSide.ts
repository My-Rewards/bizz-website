"use client";
import { Amplify } from 'aws-amplify';
import { awsConfig } from "@/static/amplify"
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { CookieStorage } from 'aws-amplify/utils';

Amplify.configure(awsConfig, { ssr: true });
cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage);

export default function ConfigureAmplifyClientSide() {
    return null;
}