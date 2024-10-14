import sql from "./db"


async function getUsersOver(formdt:any) {
  const users = await sql`
    insert into vlaue formdata.name,fomratdata.age into tsbler formData
  `
  // users = Result [{ name: "Walter", age: 80 }, { name: 'Murray', age: 68 }, ...]
  return users
}