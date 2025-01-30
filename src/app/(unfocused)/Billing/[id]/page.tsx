import ClientComponent from "./clientPage"
import { userSession } from "@/components/amplify-server-methods";


export interface BillingInfo {
  id: string
  title: string
  active: boolean
  cost:number
}

export const revalidate = 1;

async function mockApi({ id }: { id: string }): Promise<BillingInfo> {
  const session = await userSession()
  
  console.info(session, id)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: "89lkj89",
        title: "Test Title 3",
        active: true,
        cost: 0
      });
    }, 500);
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