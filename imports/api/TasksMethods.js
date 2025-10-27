import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { TasksCollection } from './TasksCollection';

Meteor.methods({
  'tasks.insert'(doc) {
    return TasksCollection.insertAsync(doc);
  },

  'tasks.delete'({ _id }) {
    check(_id, String);
    return TasksCollection.removeAsync(_id);
  },

  'tasks.update'({ _id, name, description, state,isPrivate }) {
    check(_id, String);
    check(name, String);
    check(description, String);
    check(state, Match.OneOf(String, null));

    return TasksCollection.updateAsync(_id, {
      $set: {
        name,
        description,
        state,            
        updatedAt: new Date(),
        isPrivate
      },
    });
  },
});
