angular.module('starter.controllers', ['angular-svg-round-progressbar'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function () {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function () {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function () {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function () {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function ($scope) {
  $scope.playlists = [{
    title: 'Reggae',
    id: 1
  }, {
    title: 'Chill',
    id: 2
  }, {
    title: 'Dubstep',
    id: 3
  }, {
    title: 'Indie',
    id: 4
  }, {
    title: 'Rap',
    id: 5
  }, {
    title: 'Cowbell',
    id: 6
  }];
})

.controller('PlaylistCtrl', function ($scope, $stateParams) {})
.controller('HelpCtrl', function ($scope) {
   $scope.goBackHandler = function () {
    window.history.back(); //This works
  }

   

})
.controller('CustomerListCtrl', function ($scope, $stateParams) {

})
.controller('EarningCtrl', function ($scope, $stateParams, $ionicPopover) {

  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });
  
})

.controller('VerifyCtrl', function ($scope, $stateParams) {})

.controller('LoginCtrl', function ($scope, $stateParams) {})

.controller('DashboardCtrl', function ($scope, $stateParams, $ionicPopup, $ionicSlideBoxDelegate) {
  $scope.showPopup = function () {
    $scope.show = $ionicPopup.show({
      templateUrl: 'templates/modal/price.html',
      cssClass: "priceCard ",
      scope: $scope
    });
  }
  $scope.closePopup = function () {
    $scope.show.close();
  }
  $scope.lockSlide = function () {
    $ionicSlideBoxDelegate.enableSlide(false);
  }
  $scope.myActiveSlide = 1;

  $scope.slidePrevious = function () {

    $ionicSlideBoxDelegate.previous();
  }

  $scope.slideNext = function () {

    $ionicSlideBoxDelegate.next();
  }
})

.controller('SignUpCtrl', function ($scope, $stateParams) {
  // $scope.sorryPopup = function () {
  //   $scope.sorry = $ionicPopup.show({
  //     templateUrl: 'templates/modal/pincode.html',
  //     cssClass: "popupSorry",
  //     scope: $scope
  //   });
  // };
  // $scope.closeSorry = function () {
  //   console.log("hello");
  //   $scope.sorry.close();
  // };

  $scope.goBackHandler = function () {
    window.history.back(); //This works
  }
});