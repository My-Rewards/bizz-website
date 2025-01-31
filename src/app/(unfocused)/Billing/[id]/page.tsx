import ClientComponent from "./clientPage"
// import { userSession } from "@/components/amplify-server-methods";
import {loadStripe} from '@stripe/stripe-js';

export interface BillingInfo {
  id: string
  title: string
  active: boolean
  cost:number
}

export const revalidate = 60;

function mockApi({ id }: { id: string }): Promise<BillingInfo|null> {
  // const session = await userSession()
  console.log(id)
  
  try{
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: "89lkj89",
          title: "Test Title 3",
          active: true,
          cost: 0,
          
        });
      }, 500);
    });
  }catch(error){
    console.error(error)
    return new Promise((resolve) => {resolve(null)})
  }
}

export default async function Page({
    params
    }: {
    params: Promise<{ id: string }>
  }) {
    const id = (await params).id
    const data = await mockApi({id});
    const stripePromise = loadStripe('pk_test_51QlaNVLvDQv3Uhkhl5XvNKxq52FxU9fCK63vTjDaFcHNvjHoOMDAtntMsjUmbTdxLITYZQUKmwLqOM7EtF3FOUaU00NbcsNrXN');

    console.log(stripePromise)

    if(data){
      return (
        <ClientComponent data={data}/>
      )
    }else{
      return(
        <div>
          <h1>Oops something went wrong</h1>
        </div>
      )
    }
  }