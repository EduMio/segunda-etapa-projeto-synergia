import {Meteor} from "meteor/meteor";
import {TasksCollection} from "./TasksCollection"

Meteor.publish("tasks",
    function () {
        return TasksCollection.find();}
);

Meteor.publish('tasksWithPrivacy', function () {
  if (!this.userId) {
    return TasksCollection.find({ isPrivate: false });
  }

  return TasksCollection.find({
    $or: [
      { isPrivate: false },       
      { userId: this.userId }     
    ]
  });
});

Meteor.publish('task.byId', function (id) {
  return TasksCollection.find({ _id: id });
});