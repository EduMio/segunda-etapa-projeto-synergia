import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../imports/api/TasksCollection';
import '../imports/api/TasksPublications';
import '../imports/api/TasksMethods'
import {Accounts} from 'meteor/accounts-base';

const SEED_USERNAME_1 = 'meteorite';
const SEED_PASSWORD_1 = 'password';

const SEED_USERNAME_2 = 'Ground';
const SEED_PASSWORD_2 = 'password';

async function insertTask(taskText,user) {
  await TasksCollection.insertAsync({ 
    name: taskText,
    description:"",
    state:null,
    userId:user._id,
    userName:user.username,
    createdAt:new Date() });
}

Meteor.startup(async () => {
  if(!(await Accounts.findUserByUsername(SEED_USERNAME_1))){
    await Accounts.createUser({username:SEED_USERNAME_1,password:SEED_PASSWORD_1});
  }

  if(!(await Accounts.findUserByUsername(SEED_USERNAME_2))){
    await Accounts.createUser({username:SEED_USERNAME_2,password:SEED_PASSWORD_2});
  }

  const user1 = await Accounts.findUserByUsername(SEED_USERNAME_1);
  const user2 = await Accounts.findUserByUsername(SEED_USERNAME_2);

  if (await TasksCollection.find().countAsync() === 0) {
    const seed_1= [
      'First Task',
      'Second Task',
    ];

    const seed_2= [
      'Third Task',
      'Fourth Task',
    ];
    
    for (let index = 0; index < seed_1.length; index++) 
      insertTask(seed_1[index],user1);

    for (let index = 0; index < seed_2.length; index++) 
      insertTask(seed_2[index],user2);

      
  }
});
