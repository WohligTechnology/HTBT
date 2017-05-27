angular.module('starter.subscription', [])
    .factory('Subscription', function ($http) {
        var subScriptionObj = {};
        return {
            setObj: function (newObj) {
                subScriptionObj = newObj;
            },
            getObj: function () {
                return subScriptionObj;
            }
        };
    });