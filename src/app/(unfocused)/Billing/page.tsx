import ClientComponent from "./clientPage";

export interface OrgProps{
  id:string,
  title:string,
  active:boolean
}

async function mockApi() {
  return [
    { id: "123m32r", title: "Test Title 1", active: true },
    { id: "45lkj34", title: "Test Title 2", active: false },
    { id: "89lkj89", title: "Test Title 3", active: true },
  ];
}

export default async function Page() {
  const data = await mockApi();

  return (
    <ClientComponent data={data} />
  );
}
