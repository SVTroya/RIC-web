interface SessionUser {
  _id: string,
  email: string,
  username: string,
  image: string,
  expList: Array<string>
}

type Expansion = {
  _id: string,
  name: string,
  color: string
}