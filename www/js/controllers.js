angular.module('starter.controllers', ['angular-svg-round-progressbar','starter.services', 'ionic-datepicker'])

.controller('AppCtrl', function ($scope, $ionicModal, $ionicPopover,$timeout, $state, MyServices) {

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

  $ionicPopover.fromTemplateUrl('templates/modal/popover.html', {
    scope: $scope,
    cssClass: 'menupop',

  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.closePopover = function() {
      $scope.popover.hide();
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
.controller('BrowseMoreCtrl', function ($scope, $stateParams) {
  $scope.goBackHandler = function () {
    window.history.back(); //This works
  };
})

.controller('CreditsCtrl', function ($scope, $stateParams, $ionicSideMenuDelegate) {
  $scope.goBackHandler = function () {
    window.history.back(); //This works
  };

  $ionicSideMenuDelegate.canDragContent(false);
})


.controller('VerificationCtrl', function ($scope, $stateParams) {
  $scope.goBackHandler = function () {
    window.history.back(); //This works
  };
})

.controller('RequirementCtrl', function ($scope, $stateParams) {
  $scope.goBackHandler = function () {
    window.history.back(); //This works
  };
})

.controller('ReviewCtrl', function ($scope, $stateParams) {
  $scope.goBackHandler = function () {
    window.history.back(); //This works
  };

  var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      },
      disabledDates: [            //Optional
        new Date(2016, 2, 16),
        new Date(2015, 3, 16),
        new Date(2015, 4, 16),
        new Date(2015, 5, 16),
        new Date('Wednesday, August 12, 2015'),
        new Date("08-16-2016"),
        new Date(1439676000000)
      ],
      from: new Date(2012, 1, 1), //Optional
      to: new Date(2016, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };

    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };

})

.controller('CheckoutCtrl', function ($scope, $stateParams, $ionicPopover, ionicDatePicker) {
  $scope.goBackHandler = function () {
    window.history.back(); //This works
  };

  $scope.show='';
    $ionicPopover.fromTemplateUrl('templates/modal/terms.html', {
      scope: $scope,
      cssClass: 'menupop',

    }).then(function(terms) {
      $scope.terms = terms;
    });



    $scope.closePopover = function() {
        $scope.terms.hide();
     };

     var ipObj1 = {
         callback: function (val) {  //Mandatory
           console.log('Return value from the datepicker popup is : ' + val, new Date(val));
         },
         disabledDates: [            //Optional
           new Date(2016, 2, 16),
           new Date(2015, 3, 16),
           new Date(2015, 4, 16),
           new Date(2015, 5, 16),
           new Date('Wednesday, August 12, 2015'),
           new Date("08-16-2016"),
           new Date(1439676000000)
         ],
         from: new Date(2012, 1, 1), //Optional
         to: new Date(2016, 10, 30), //Optional
         inputDate: new Date(),      //Optional
         mondayFirst: true,          //Optional
         disableWeekdays: [0],       //Optional
         closeOnSelect: false,       //Optional
         templateType: 'popup'       //Optional
       };

       $scope.openDatePicker = function(){
         ionicDatePicker.openDatePicker(ipObj1);
       };

})

.controller('AddonsCtrl', function ($scope, $stateParams) {
  $scope.goBackHandler = function () {
    window.history.back(); //This works
  };
})

.controller('Subpage3Ctrl', function ($scope, $stateParams) {
  $scope.goBackHandler = function () {
    window.history.back(); //This works
  };
})


.controller('Subpage1Ctrl', function ($scope, $stateParams) {
  $scope.goBackHandler = function () {
    window.history.back(); //This works
  };
})

.controller('AuthPaymentCtrl', function ($scope, $stateParams) {
  $scope.goBackHandler = function () {
    window.history.back(); //This works
  };
})

.controller('BrowseCtrl', function ($scope, $ionicSlideBoxDelegate) {
    $scope.nextSlide = function () {
      $ionicSlideBoxDelegate.next();
    };
    $scope.goBackHandler = function () {
      window.history.back(); //This works
    };
  })

  .controller('ProductSpecsCtrl', function ($scope, $stateParams) {
    $scope.goBackHandler = function () {
      window.history.back(); //This works
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
  };



})

.controller('ProfileCtrl', function ($scope) {
   $scope.goBackHandler = function () {
    window.history.back(); //This works
  };



})

.controller('CustomerListCtrl', function ($scope, $ionicLoading, $ionicPopover) {
$scope.show='';
  $ionicPopover.fromTemplateUrl('templates/modal/popover.html', {
    scope: $scope,
    cssClass: 'menupop',

  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.closePopover = function() {
      $scope.popover.hide();
   };

$scope.show='';
  $ionicPopover.fromTemplateUrl('templates/modal/dropdown.html', {
    scope: $scope,
    cssClass: 'menupop',

  }).then(function(dropdown) {
    $scope.dropdown = dropdown;
  });



  $scope.closePopover = function() {
      $scope.dropdown.hide();
   };


})
.controller('EarningCtrl', function ($scope, $stateParams, $ionicPopover, $ionicSideMenuDelegate) {

$ionicSideMenuDelegate.canDragContent(false);

  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
    cssClass: 'menupop',

  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.closePopover = function() {
      $scope.popover.hide();
   };

})

.controller('VerifyCtrl', function ($scope, $stateParams) {})

.controller('ConfirmationCtrl', function ($scope, $stateParams) {

  $scope.goBackHandler = function () {
    window.history.back(); //This works
  };
})

.controller('LoginCtrl', function ($scope, $stateParams) {})

.controller('DashboardCtrl', function ($scope, $stateParams, $ionicPopup, $ionicSlideBoxDelegate ) {

  $scope.showPopup = function () {
    $scope.show = $ionicPopup.show({
      templateUrl: 'templates/modal/price.html',
      cssClass: "priceCard ",
      scope: $scope
    });
  };
  $scope.closePopup = function () {
    $scope.show.close();
  };
  $scope.lockSlide = function () {
    $ionicSlideBoxDelegate.enableSlide(false);
  };
  $scope.myActiveSlide = 1;

  $scope.slidePrevious = function () {

    $ionicSlideBoxDelegate.previous();
  };

  $scope.slideNext = function () {

    $ionicSlideBoxDelegate.next();
  };
})

.controller('SignUpCtrl', function ($scope, $stateParams, $ionicPopover, $state, MyServices) {
  $scope.show='';
    $ionicPopover.fromTemplateUrl('templates/modal/terms.html', {
      scope: $scope,
      cssClass: 'menupop',

    }).then(function(terms) {
      $scope.terms = terms;
    });



    $scope.closePopover = function() {
        $scope.terms.hide();
     };

  $scope.goBackHandler = function () {
    window.history.back(); //This works
  };
});
