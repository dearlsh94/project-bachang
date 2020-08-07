import IRaids, { IRaid } from 'interfaces/Dictionary/IRaids';

const tempRaidList: Array<IRaid> = [
  {
    idx: 0,
    key: "01",
    name: "수룡장",
    limitPower: 17000,
    limitEnter: "-",
    minPeopleCount: 0,
    maxPeopleCount: 4,
    maxEnterCount: 3,
    reward: "보상",
    img: "수룡장.png",
  }
]

const tempRaidList2: Array<IRaid> = [
  {
    idx: 0,
    key: "01",
    name: "수룡장",
    limitPower: 17000,
    limitEnter: "-",
    minPeopleCount: 0,
    maxPeopleCount: 4,
    maxEnterCount: 3,
    reward: "보상",
    img: "수룡장.png",
  }
]

export const getDicAllRaidList = () => {
  const dicRaidList: Array<IRaids> = [];
  dicRaidList.push({
    idx: 0,
    section: "section1",
    raidInfos: tempRaidList
  });

  dicRaidList.push({
    idx: 0,
    section: "section2",
    raidInfos: tempRaidList2
  });

  return dicRaidList;
}