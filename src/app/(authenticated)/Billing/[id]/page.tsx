import ClientComponent from "./clientPage"
import { cookies } from 'next/headers';
import { fetchAuthSession } from 'aws-amplify/auth/server';
import { runWithAmplifyServerContext } from '@/components/amplify-server-util';


export interface BillingInfo {
  id: string
  title: string
  active: boolean
  cost:number
}

async function mockApi({id}:{id:string}) {

  const session = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (contextSpec) => fetchAuthSession(contextSpec)
  })

  // make API call
  return (
    { id: "89lkj89", 
      title: "Test Title 3", 
      active: true, 
      cost:0 
    });
}

export default async function Page({
    params
    }: {
    params: Promise<{ id: string }>
  }) {
    const id = (await params).id
    const data = await mockApi({id});

    return (
      <ClientComponent data={data} />
    )
  }