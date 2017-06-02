// var adminurl = "http://192.168.43.147:80/api/"; //local

// var adminurl = "http://104.198.28.29:80/api/"; //server
var adminurl = "http://htbt.wohlig.co.in/api/"; //server

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
console.log(data);
        $http({
          url: adminurl + 'User/saveUserData',
          method: 'POST',
          withCredentials: true,
          data: data
        }).success(callback);
      },
   saveData: function (data, callback) {
        console.log(data);
        $http({
          url: adminurl + 'User/save',
          method: 'POST',
          withCredentials: true,
          data: data
        }).success(callback);
      },
    getonePro: function (data,callback) {
        $http({
          url: adminurl + 'User/getone',
          method: 'POST',
          withCredentials: true,
          data: data
        }).success(callback);
      },
    getByPin: function (data,callback) {
        $http({
          url: adminurl + 'Pincode/getByPin',
          method: 'POST',
          withCredentials: true,
          data: data
        }).success(callback);
      },
    updateAndGetResponse: function (data,callback) {
        $http({
          url: adminurl + 'User/updateAndGetResponse',
          method: 'POST',
          withCredentials: true,
          data: data
        }).success(callback);
      },
   getProfile: function (data,callback) {
     console.log(data);
     var data1={
       _id:data._id
     }
        $http({
          url: adminurl + 'User/getProfile',
          method: 'POST',
          withCredentials: true,
          data: data1
        }).success(callback);
      },
 categories: function (callback) {

        $http({
          url: adminurl + 'Categories/getCategories',
          method: 'POST',
          withCredentials: true,
        }).success(callback);
      },


featureprods: function (callback) {

        $http({
          url: adminurl + 'product/getAllFeaturedProduct',
          method: 'POST',
          withCredentials: true,
        }).success(callback);
      },

      products: function (data,callback) {
 console.log(data);
           $http({
             url: adminurl + 'product/getAllCategoryProduct',
             method: 'POST',
             withCredentials: true,
              data: data
           }).success(callback);
         }

    };


});