import {
    Template
} from 'meteor/templating';
import {
    ReactiveVar
} from 'meteor/reactive-var';

import './main.html';

var Counter = new Mongo.Collection('counter');

Template.hello.onCreated(function helloOnCreated() {
    // counter starts at 0
    // this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
    counter() {
        // return Template.instance().counter.get();
        var counterDoc = Counter.findOne();
        var count = counterDoc.clicks;
        var gur = count.toLocaleString('guru');
        return counterDoc ? gur : "0";
    },
});

Template.hello.events({
    'click #incrementJaap' (event, instance) {
        // increment the counter when button is clicked
        // instance.counter.set(instance.counter.get() + 1);
        var counterDoc = Counter.findOne();
        if (counterDoc) Counter.update({
            _id: counterDoc._id
        }, {
            $inc: {
                clicks: 1
            }
        });
        else Counter.insert({
            clicks: 1
        });
    },
    'click #decrementJaap' (event, instance) {
        // increment the counter when button is clicked
        // instance.counter.set(instance.counter.get() + 1);
        var counterDoc = Counter.findOne();
        if (counterDoc && counterDoc.clicks > 0) Counter.update({
            _id: counterDoc._id
        }, {
            $inc: {
                clicks: -1
            }
        });
    },
});
