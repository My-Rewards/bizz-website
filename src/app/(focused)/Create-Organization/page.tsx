import ClientComponent from "./clientPage";

export interface OrgProps{
  id:string,
  title:string,
  active:boolean
}

export default async function Page() {
  return (<ClientComponent />);
}
