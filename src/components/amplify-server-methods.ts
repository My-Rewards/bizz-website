"use server";
import * as Auth from "aws-amplify/auth/server";
import { cookies } from "next/headers";
import { runWithAmplifyServerContext } from "./amplify-server-util";

export const currUserData = async () => {
  const status = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      try {
        const session = await Auth.fetchAuthSession(contextSpec);
        const attributes = await Auth.fetchUserAttributes(contextSpec);

        return {
          verified: session.tokens !== undefined,
          linked: Number(attributes['custom:linked']) === 1
        };
      } catch  {
        return {verified: false};
      }
    },
  });
  return status
};

export const userSession = async ()=>{
  const sesh = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      try {
        const session = await Auth.fetchAuthSession(contextSpec);
        return {
          token:session.tokens?.idToken,
          userSub: session.userSub
        }
      } catch {
        return {
          token: null,
          userSub: null
        };
      }
    },
  });
  return sesh
}

export const validSession = async ()=>{
  await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      try {
        const session = await Auth.fetchAuthSession(contextSpec);
        return session.tokens?.idToken === undefined;
      } catch {
        return false
      }
    },
  });
}