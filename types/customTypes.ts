interface SessionUser {
  _id: string,
  email: string,
  username: string,
  image: string,
  expList: Expansion[]
}

type Expansion = {
  _id: string,
  name: string,
  color: string
}

type Die = {
  _id: string,
  die_type: string,
  faces: string[],
  rotatable: boolean
}

type Face = {
  image: string,
  rotatable: boolean
}

type Objective = {
  _id: string,
  exp: string,
  image: string,
  description: string
}

type Blueprint = {
  _id: string,
  name: string,
  image: string
}

type Round = {
  roundNumber: number,
  displayedDice: Face[]
}

type Game = {
  _id?: string
  expansion: string,
  blueprint?: string | null,
  objectives: Objective[],
  lastRound?: Round
}

type DialogInfo = {
  showDialog: boolean,
  question: string,
  onYes: () => void,
  onNo: () => void
}
