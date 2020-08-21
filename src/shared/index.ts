import { MongoClient } from 'mongodb';

import { mongoDbConnectionString } from 'conf/mongodb';

import ISignUpUser from 'interfaces/User/ISignUpUser';

const MyMongoClient = new MongoClient(mongoDbConnectionString, { useNewUrlParser: true });

const init = async () => {
  await MyMongoClient.connect();
}

export const createSignUpUser = (user: ISignUpUser) => {
  init();
}