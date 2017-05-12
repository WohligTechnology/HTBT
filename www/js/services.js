// var adminurl = "http://192.168.43.147:80/api/"; //local

// var adminurl = "http://104.198.28.29:80/api/"; //server
var adminurl = "http://192.168.0.127:1337/api/"; //server

// var imgpath = adminurl + "uploadfile/getupload?file=";
var imgurl = adminurl + "upload/";
var imgpath = imgurl + "readFile?file=";
// var uploadurl = imgurl;

angular.module('starter.services', [])
.factory('MyServices', function ($http) {
  return {

    getProfile: function (id,callback) {
      console.log(id);
      var data ={
        _id : id
      };
        $http({
          url: adminurl + 'user/getProfile',
          method: 'POST',
          withCredentials: true,
          data: data
        }).success(callback);
      },




    signup: function (data,callback) {

        $http({
          url: adminurl + 'user/save',
          method: 'POST',
          withCredentials: true,
          data: data
        }).success(callback);
      }

    };
});
