angular.module('starter.controllers', ['angular-svg-round-progressbar', 'starter.services', 'ionic-datepicker', 'ngCordova'])

    .controller('AppCtrl', function ($scope, $ionicModal, $ionicPopover, $timeout, $state, MyServices) {



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

        }).then(function (popover) {
            $scope.popover = popover;
        });

        $scope.closePopover = function () {
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
    .controller('BrowseMoreCtrl', function ($scope, $stateParams, MyServices) {
        $scope.goBackHandler = function () {
            window.history.back(); //This works
        };
        $scope.product = {}
        // alert($stateParams.category);
        $scope.product.category = $stateParams.category;

        console.log("dsjh", $scope.product, $stateParams)
        MyServices.products($scope.product, function (data) {

            console.log(data);
            $scope.prod = data.data;
            console.log("proctid", $scope.prod);

        });

    })

    .controller('CreditsCtrl', function ($scope, $stateParams, $ionicSideMenuDelegate) {
        $scope.goBackHandler = function () {
            window.history.back(); //This works
        };

        $ionicSideMenuDelegate.canDragContent(false);
    })


    .controller('VerificationCtrl', function ($scope, $stateParams, MyServices, $timeout, $state) {

        $scope.profile = $.jStorage.get('profile');

        MyServices.getProfile($scope.profile, function (data) {
            $scope.signupForm = data.data;
            if (data.data.verification == 'Verified') {
                $.jStorage.set('profile', $scope.signupForm);
                $scope.profile = $.jStorage.get('profile');
                $state.go('app.dashboard');
                $scope.goahead = true;
            }
        });
    })

    .controller('RequantityuirementCtrl', function ($scope, $stateParams) {
        $scope.goBackHandler = function () {
            window.history.back(); //This works
        };
    })

    .controller('ReviewCtrl', function ($scope, $stateParams, MyServices) {
        $scope.goBackHandler = function () {
            window.history.back(); //This works
        };



        $scope.profile = $.jStorage.get('profile');

        $scope.getProfield = {};
        console.log($scope.profile);
        $scope.getProfield._id = $scope.profile._id;
        MyServices.getProfile($scope.getProfield, function (data) {
            console.log(data);
            if (data.value) {
                $scope.review = data.data;
                console.log($scope.review);
            } else {

            }
        });
    })

    .controller('CheckoutCtrl', function ($scope, $stateParams, $ionicPopover, ionicDatePicker) {
        $scope.goBackHandler = function () {
            window.history.back(); //This works
        };

        $scope.show = '';
        $ionicPopover.fromTemplateUrl('templates/modal/terms.html', {
            scope: $scope,
            cssClass: 'menupop',

        }).then(function (terms) {
            $scope.terms = terms;
        });



        $scope.closePopover = function () {
            $scope.terms.hide();
        };

        var ipObj1 = {
            callback: function (val) { //Mandatory
                console.log('Return value from the datepicker popup is : ' + val, new Date(val));
            },
            disabledDates: [ //Optional
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
            inputDate: new Date(), //Optional
            mondayFirst: true, //Optional
            disableWeekdays: [0], //Optional
            closeOnSelect: false, //Optional
            templateType: 'popup' //Optional
        };

        $scope.openDatePicker = function () {
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

    .controller('BrowseCtrl', function ($scope, $stateParams, $ionicSlideBoxDelegate, MyServices, $state) {
        $scope.nextPage = function (sub, id) {
            if (sub == 'Yes') {
                $state.go('app.browse-more', {
                    'category': id
                });

            } else {
                $state.go('app.productSpecs', {
                    'category': id
                });
            }
        };
        $scope.goBackHandler = function () {
            window.history.back(); //This works
        };
        MyServices.categories(function (data) {

            console.log(data);
            $scope.category = _.chunk(data.data, 2);
            console.log($scope.category);

        });
        $scope.profile = $.jStorage.get('profile');
        $scope.getProfield = {};
        console.log($scope.profile);
        $scope.getProfield._id = $scope.profile._id;
        MyServices.getProfile($scope.getProfield, function (data) {
            if (data.value) {
                $scope.browse = data.data;
            } else {

            }
        });
        MyServices.featureprods(function (data) {

            console.log(data);
            $scope.feaprods = data.data;
            console.log("let me know", $scope.feaprods);
            $ionicSlideBoxDelegate.update();

        });
    })

    .controller('ProductSpecsCtrl', function ($scope, $state, $stateParams, MyServices, $ionicPopup) {
        $scope.goBackHandler = function () {
            window.history.back();
        };
        $scope.userDetails = MyServices.getAppDetails();

        $scope.profile = $.jStorage.get('profile');
        MyServices.products({
            category: $stateParams.category
        }, function (data) {
            $scope.products = data.data;
        });
        $scope.checkMinProduct = function (product) {
            if (product.productQuantity === 0) {
                return true;
            } else {
                return false;
            }
        };
        $scope.checkMaxProduct = function (product) {
            if (product.productQuantity >= parseInt(product.quantity)) {
                return true;
            } else {
                return false;
            }
        };
        $scope.changeProductQuantity = function (product, change) {
            if (_.isNaN(parseInt(product.productQuantity))) {
                product.productQuantity = 0;
            }
            if (change) {
                product.productQuantity++;
            } else {
                product.productQuantity--;
            }
        };
        $scope.addToCart = function () {
            var products = _.map($scope.products, function (n) {
                return {
                    productQuantity: n.productQuantity,
                    product: n._id
                };
            });
            MyServices.addToCart(products, function (data) {
                if (data.status == 200) {
                    $ionicPopup.alert({
                        title: "Products Added to Cart",
                        template: "Products Added to Cart Successfully"
                    });
                } else {
                    $ionicPopup.alert({
                        title: "Error Occured",
                        template: "Error Occured while adding Products to Cart"
                    });
                }

            });
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

    .controller('ProfileCtrl', function ($scope, MyServices) {
        $scope.goBackHandler = function () {
            window.history.back(); //This works
        };
        $scope.profile = $.jStorage.get('profile');

        $scope.getProfield = {};
        console.log($scope.profile);
        $scope.getProfield._id = $scope.profile._id;
        MyServices.getProfile($scope.getProfield, function (data) {
            console.log(data);
            if (data.value) {
                $scope.signupForm = data.data;
                console.log($scope.review);
            } else {

            }
        });

        $scope.save = function () {

            MyServices.saveData($scope.signupForm, function (data) {

                console.log(data);
                $scope.signupForm = data.data;

                console.log($scope.signupForm)
                if (data.value == true) {


                    $scope.signupForm._id = $.jStorage.get('profile')._id;
                    MyServices.getonePro($scope.signupForm, function (data) {
                        $.jStorage.set('profile', data.data);
                        $scope.signupForm = data.data;


                    });


                } else {

                    // $scope.showAlert(data.status, 'login', 'Error Message');
                }
            });



        }
    })

    .controller('CustomerListCtrl', function ($scope, $state, $ionicLoading, $ionicPopover) {
        $scope.next = function () {
            $state.go('app.subpage1');
        }
        $scope.show = '';
        $ionicPopover.fromTemplateUrl('templates/modal/popover.html', {
            scope: $scope,
            cssClass: 'menupop',

        }).then(function (popover) {
            $scope.popover = popover;
        });

        $scope.closePopover = function () {
            $scope.popover.hide();
        };

        $scope.show = '';
        $ionicPopover.fromTemplateUrl('templates/modal/dropdown.html', {
            scope: $scope,
            cssClass: 'menupop',

        }).then(function (dropdown) {
            $scope.dropdown = dropdown;
        });



        $scope.closePopover = function () {
            $scope.dropdown.hide();
        };


    })
    .controller('EarningCtrl', function ($scope, $stateParams, $ionicPopover, $ionicSideMenuDelegate) {

        $ionicSideMenuDelegate.canDragContent(false);

        $ionicPopover.fromTemplateUrl('templates/popover.html', {
            scope: $scope,
            cssClass: 'menupop',

        }).then(function (popover) {
            $scope.popover = popover;
        });

        $scope.closePopover = function () {
            $scope.popover.hide();
        };

    })

    .controller('VerifyCtrl', function ($scope, $stateParams) {
        $.jStorage.flush();
    })

    .controller('ConfirmationCtrl', function ($scope, $stateParams) {

        $scope.goBackHandler = function () {
            window.history.back(); //This works
        };
    })

    .controller('LoginCtrl', function ($scope, $stateParams, $state) {

        $scope.profile = $.jStorage.get('profile');
        if ($scope.profile != null) {
            if ($scope.profile.verification == 'Not Verified') {
                $state.go('verification');
            } else {
                $state.go('app.dashboard');

            }
        }

    })

    .controller('DashboardCtrl', function ($scope, $stateParams, $ionicPopup, MyServices, $ionicSlideBoxDelegate) {
        $scope.profile = $.jStorage.get('profile');


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
        $scope.getProfield = {};
        console.log($scope.profile);
        $scope.getProfield._id = $scope.profile._id;
        MyServices.getProfile($scope.getProfield, function (data) {
            if (data.value) {
                $scope.dash = data.data;
            } else {

            }
        });
    })
    .controller('PincodeCtrl', function ($scope, $ionicPopup, $stateParams, $ionicActionSheet, $cordovaFileTransfer, $cordovaCamera, $ionicPopover, $state, MyServices, $cordovaImagePicker) {})
    .controller('SignUpCtrl', function ($scope, $ionicPopup, $stateParams, $ionicActionSheet, $cordovaFileTransfer, $cordovaCamera, $ionicPopover, $state, MyServices, $cordovaImagePicker) {
        $scope.signup = {}
        $scope.show = '';


        $ionicPopover.fromTemplateUrl('templates/modal/terms.html', {
            scope: $scope,
            cssClass: 'menupop',

        }).then(function (terms) {
            $scope.terms = terms;
        });

        $ionicPopover.fromTemplateUrl('templates/modal/pincode.html', {
            scope: $scope,
            cssClass: 'menupop',

        }).then(function (pincode) {
            $scope.pincode = pincode;
        });
        $scope.closePincode = function () {
            $scope.pincode.hide();
        };
        $scope.closePopover = function () {
            $scope.terms.hide();
        };
        $scope.openpincode = function ($event) {
            $scope.pincode.show($event);
        };
        $scope.goBackHandler = function () {
            window.history.back(); //This works
        };

        $scope.signupForm = {};
        $scope.signup = function () {
            $scope.signupForm.accessLevel = "Relationship Partner";
            console.log("djfgjk", $scope.signupForm);

            if (!$.jStorage.get('profile')) {

                MyServices.signup($scope.signupForm, function (data) {

                    console.log(data);
                    $scope.signupForm = data.data;
                    $.jStorage.set('profile', data.data);
                    console.log($scope.signupForm)
                    if (data.value == true) {


                        $scope.signupForm._id = $.jStorage.get('profile')._id;
                        MyServices.getonePro($scope.signupForm, function (data) {
                            $.jStorage.set('profile', data.data);
                            $scope.signupForm = data.data;
                            $scope.user = {};
                            $scope.user.pin = data.data.pincode
                            MyServices.getByPin($scope.user, function (data) {
                                if (data.value) {
                                    $state.go('verification');

                                } else {
                                    console.log("dsjg");
                                    $state.go('pincode');
                                }
                            });
                        });


                    } else {

                        // $scope.showAlert(data.status, 'login', 'Error Message');
                    }
                });
            } else {
                MyServices.saveData($scope.signupForm, function (data) {

                    console.log(data);
                    $scope.signupForm = data.data;

                    console.log($scope.signupForm)
                    if (data.value == true) {


                        $scope.signupForm._id = $.jStorage.get('profile')._id;
                        MyServices.getonePro($scope.signupForm, function (data) {
                            $.jStorage.set('profile', data.data);
                            $scope.signupForm = data.data;
                            $scope.user = {};
                            $scope.user.pin = data.data.pincode
                            MyServices.getByPin($scope.user, function (data) {
                                if (data.value) {
                                    $state.go('verification');

                                } else {
                                    console.log("dsjg");
                                    $state.go('pincode');
                                }
                            });
                        });


                    } else {

                        // $scope.showAlert(data.status, 'login', 'Error Message');
                    }
                });
            }


        }
        $scope.profile = $.jStorage.get('profile');
        if ($scope.profile != null) {
            $scope.signupForm = $scope.profile;
        }
        $scope.showActionsheet = function (card) {
            console.log(card);
            $ionicActionSheet.show({
                //  titleText: 'choose option',
                buttons: [{
                    text: '<i class="icon ion-ios-camera-outline"></i> Choose from gallery'
                }, {
                    text: '<i class="icon ion-images"></i> Take from camera'
                }, ],
                //  destructiveText: 'Delete',
                cancelText: 'Cancel',
                cancel: function () {
                    console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    console.log('BUTTON CLICKED', index);
                    if (index === 0) {
                        $scope.getImageSaveContact(card);
                    } else {
                        $scope.openCamera(card);
                    }
                    return true;
                },
                destructiveButtonClicked: function () {
                    console.log('DESTRUCT');
                    return true;
                }
            });
        };

        $scope.openCamera = function (card) {
            var cameraOptions = {
                quantityuality: 90,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: false,
                encodingType: 0,
                targetWidth: 1200,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: true,
                correctOrientation: true
            };
            $cordovaCamera.getPicture(cameraOptions).then(function (imageData) {
                $scope.imageSrc = "data:image/jpeg;base64," + imageData;
                console.log($scope.imageSrc);
                $scope.uploadImage($scope.imageSrc, card);
            }, function (err) {

                console.log(err);
            });
        };

        $scope.getImageSaveContact = function (card) {
            // Image picker will load images according to these settings
            var options = {
                maximumImagesCount: 1, // Max number of selected images
                width: 800,
                height: 800,
                quantityuality: 80 // Higher is better
            };
            $cordovaImagePicker.getPictures(options).then(function (results) {
                console.log(results);
                $scope.uploadImage(results[0], card);
            }, function (error) {
                console.log('Error: ' + JSON.stringify(error)); // In case of error
            });
        };

        $scope.uploadImage = function (imageURI, card) {
            console.log('imageURI', imageURI);
            // $scope.showLoading('Uploading Image...', 10000);
            $cordovaFileTransfer.upload(adminurl + 'upload', imageURI)
                .then(function (result) {
                    // Success!
                    // $scope.hideLoading();
                    result.response = JSON.parse(result.response);
                    console.log(result.response.data[0]);
                    if (card == 'pan') {
                        $scope.signupForm.panCard = result.response.data[0];
                    } else {
                        $scope.signupForm.adharCard = result.response.data[0];
                    }
                })
        };
    });