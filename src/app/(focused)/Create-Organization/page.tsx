import ClientComponent from "./clientPage";

export const STEPS = ["BUSINESS DETAILS", "MILESTONE STRUCTURE", "LOYALTY STRUCTURE", "CONFIRM INFORMATION"];

export interface OrgProps{
  id:string,
  title:string,
  active:boolean
}

export default async function Page() {
  return (<ClientComponent />);
}
