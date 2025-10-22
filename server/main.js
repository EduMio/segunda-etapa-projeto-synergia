import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../imports/api/TasksCollection';
import '../imports/api/TasksPublications';
import '../imports/api/TasksMethods'
import {Accounts} from 'meteor/accounts-base';

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

async function insertTask(taskText,user) {
  await TasksCollection.insertAsync({ text: taskText,userId:user._id,createdAt:new Date() });
}

Meteor.startup(async () => {
  if(!(await Accounts.findUserByUsername(SEED_USERNAME))){
    await Accounts.createUser({username:SEED_USERNAME,password:SEED_PASSWORD});
  }

  const user = await Accounts.findUserByUsername(SEED_USERNAME);

  if (await TasksCollection.find().countAsync() === 0) {
    const seed = [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task',
    ];
    
    for (let index = 0; index < seed.length; index++) 
      insertTask(seed[index],user);
      
  }
});
