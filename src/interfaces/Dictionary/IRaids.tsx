export interface IRaid {
  idx: number,
  key: string,
  name: string,
  limitPower?: number,
  limitEnter?: string,
  minPeopleCount?: number,
  maxPeopleCount?: number,
  maxEnterCount?: number,
  reward: string,
  img: string,
}

export default interface IRaids {
  idx: number,
  section: string,
  raidInfos: Array<IRaid>
}