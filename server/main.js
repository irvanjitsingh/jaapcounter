import {
    Meteor
} from 'meteor/meteor';

Meteor.startup(() => {
    var Counter = new Mongo.Collection('counter');
    if (!Counter) {
        console.log("LOADED DATA");
        Counter.attachSchema(
            new SimpleSchema({
                clicks: {
                    type: Number
                },
                createdAt: {
                    type: Date,
                    denyUpdate: true,
                    autoValue: function() {
                        if (this.isInsert) return new Date;
                        else if (this.isUpsert) return {
                            $setOnInsert: new Date
                        };
                        else this.unset();
                    }
                }
            })
        );
    }
});
