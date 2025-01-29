import { ResourcesConfig } from 'aws-amplify';

export const awsConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolClientId: process.env.NEXT_PUBLIC_WEB_CLIENT_ID || '',
      userPoolId: process.env.NEXT_PUBLIC_USERPOOL_ID || '',
      identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID || '',
      signUpVerificationMethod: 'code',
      loginWith: {
        oauth: {
          domain: process.env.NEXT_PUBLIC_APP_ENV === 'beta' 
            ? 'business.beta.auth.myrewards.website'
            : 'business.auth.myrewards.website',
          scopes: ['openid', 'email', 'profile'],
          redirectSignIn: [
            'http://localhost:3000/callback',
            `http://localhost:3000/`,
            'https://example.com/'
          ],
          redirectSignOut: [
            'http://localhost:3000/callback',
            `http://localhost:3000/`,
            'https://example.com/'
          ],
          responseType: 'code',
          providers: ['Google']
        },
        email: true,
        phone: false
      }
    }
  }
};
