angular.module('starter.controllers', ['angular-svg-round-progressbar', 'starter.services', "starter.subscription", 'ionic-datepicker', 'ngCordova'])

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
    .controller('BrowseMoreCtrl', function ($scope, $stateParams, MyServices, Subscription, $state, $ionicPopup) {
        $scope.userDetails = MyServices.getAppDetails();
        MyServices.showCardQuantity(function (num) {
            $scope.totalQuantity = num;
        });
        $scope.subscription = Subscription.getObj();
        $scope.goBackHandler = function () {
            window.history.back(); //This works
        };

        MyServices.products({
            category: $stateParams.category
        }, function (data) {
            $scope.products = data.data;
        });
        $scope.productTap = function (product) {
            $scope.subscription.product[0].product = product._id;
            $scope.subscription.productDetail = product;
            if ($scope.totalQuantity === 0) {
                $state.go("app.subpage1");
            } else {
                $ionicPopup.alert({
                    title: "Product already in Cart",
                    template: "Please remove all the Products from the cart to proceed with Subscription Products."
                });
            }
        };
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
    .controller('ReviewCtrl', function ($scope, $stateParams, MyServices, $ionicPopup) {
        $scope.goBackHandler = function () {
            window.history.back(); //This works
        };

        function showCart() {
            MyServices.showCart(function (data) {
                if (data.data && data.data.data) {
                    $scope.products = data.data.data;
                }
            });
        }
        showCart();
        $scope.getProductPrice = MyServices.getProductPrice;

        $scope.calculateTotalPrice = function () {
            var total = 0;
            var savingPriceTotal = 0;
            _.each($scope.products, function (n) {
                total += n.product.totalPriceUsed;
                savingPriceTotal += parseInt(n.product.price) * parseInt(n.product.quantity);
            });
            $scope.savingAmount = savingPriceTotal - total;
            $scope.savingPercent = ($scope.savingAmount / savingPriceTotal * 100);
            return total;
        };
        $scope.removeCart = function (productId) {

            MyServices.removeFromCart(productId, function (data) {
                showCart();
                if (data.status == 200) {
                    $ionicPopup.alert({
                        title: "Products Removed",
                        template: "Products Removed from Cart Successfully"
                    });
                } else {
                    $ionicPopup.alert({
                        title: "Error Occured",
                        template: "Error Occured while Removing Products to Cart"
                    });
                }
            });
        };




    })
    .controller('CheckoutCtrl', function ($scope, $stateParams, $state, $ionicPopover, ionicDatePicker, MyServices, Subscription) {
        $scope.userDetails = MyServices.getAppDetails();

        MyServices.showCardQuantity(function (num) {
            $scope.totalQuantity = num;
        });
        $scope.subscription = Subscription.getObj();
        console.log("$scope.subscription", $scope.subscription);
        Subscription.validate($state);
        $scope.goBackHandler = function () {
            window.history.back(); //This works
        };
        $scope.getProductPrice = MyServices.getProductPrice;
        $scope.addPlan = function (planName) {
            $scope.subscription.plan = planName;
        };

        $scope.calculateTotalPrice = function () {
            var total = 0;
            var savingPriceTotal = 0;
            $scope.totalAmt = 0;
            $scope.otherProductstotal = 0;
            $scope.totalQuantity = 0;
            $scope.deposit = 0;
            _.each($scope.subscription.otherProducts, function (n) {
                $scope.otherProductstotal += n.price * n.productQuantity;
            });
            if ($scope.subscription.productDetail.applicableBefore >
                $scope.subscription.product[0].quantity) {
                $scope.deposit =
                    ($scope.subscription.product[0].quantity * $scope.subscription.productDetail.AmtDeposit);
            }
            if ($scope.subscription.plan == 'Quarterly') {
                $scope.totalQuantity = 12 * ($scope.subscription.product[0].quantity);
                total =
                    12 * ($scope.subscription.product[0].quantity * $scope.subscription.productDetail.priceUsed);
                savingPriceTotal =
                    12 * ($scope.subscription.product[0].quantity * $scope.subscription.productDetail.price);
                $scope.savingAmount = savingPriceTotal - total;
                $scope.savingPercent = ($scope.savingAmount / savingPriceTotal * 100);
                console.log($scope.savingAmount, savingPriceTotal, total);
                $scope.totalAmt = $scope.deposit +
                    $scope.otherProductstotal + total;
                console.log($scope.totalAmt);

                return $scope.savingAmount;
            } else if ($scope.subscription.plan == 'Monthly') {
                $scope.totalQuantity = 4 * ($scope.subscription.product[0].quantity);
                total =
                    4 * ($scope.subscription.product[0].quantity * $scope.subscription.productDetail.priceUsed);
                savingPriceTotal =
                    4 * ($scope.subscription.product[0].quantity * $scope.subscription.productDetail.price);
                $scope.savingAmount = savingPriceTotal - total;
                $scope.savingPercent = ($scope.savingAmount / savingPriceTotal * 100);
                $scope.totalAmt = $scope.deposit +
                    $scope.otherProductstotal + total;
                return $scope.savingAmount;
            } else {
                $scope.totalQuantity = $scope.subscription.product[0].quantity;
                total =
                    ($scope.subscription.product[0].quantity * $scope.subscription.productDetail.priceUsed);
                savingPriceTotal =
                    ($scope.subscription.product[0].quantity * $scope.subscription.productDetail.price);
                $scope.savingAmount = savingPriceTotal - total;
                $scope.savingPercent = ($scope.savingAmount / savingPriceTotal * 100);
                $scope.totalAmt = $scope.deposit +
                    $scope.otherProductstotal + total;
                return $scope.savingAmount;
            }
        };

        $scope.authenticatePayment = function () {

            $scope.subscription.totalAmt = $scope.totalAmt;
            $scope.subscription.totalQuantity = $scope.totalQuantity;
            $scope.subscription.user = $.jStorage.get('profile')._id;

            Subscription.setObj($scope.subscription);

            $state.go('app.auth-payment');
        };
    })
    .controller('AddonsCtrl', function ($scope, $stateParams, $state, MyServices, Subscription, $ionicPopover) {
        $scope.goBackHandler = function () {
            window.history.back(); //This works
        };
        $scope.userDetails = MyServices.getAppDetails();
        MyServices.showCardQuantity(function (num) {
            $scope.totalQuantity = num;
        });
        $scope.subscription = Subscription.getObj();
        Subscription.validate($state);
        $scope.getProductPrice = MyServices.getProductPrice;
        $scope.addPlan = function (planName) {
            $scope.subscription.plan = planName;
        };
        MyServices.getOtherProducts(function (data) {
            if (data.status == 200) {
                if (data.data && data.data.data && data.data.data.results) {
                    $scope.otherProducts = _.groupBy(data.data.data.results, "addones");
                    $scope.saveSpace = $scope.otherProducts["Save Space"];
                    $scope.saveTime = $scope.otherProducts["Save Time"];
                }
            } else {
                $ionicPopup.alert({
                    title: "Error Occured",
                    template: "Error Occured while retriving Products"
                });
            }
        });
        $scope.checkMinProduct = function (product) {
            if (product.productQuantity <= 0) {
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
            $scope.addProduct(product);
        };
        $scope.addProduct = function (product) {
            _.remove($scope.subscription.otherProducts, function (n) {
                return n._id == product._id;
            });
            if (product.productQuantity > 0) {
                $scope.subscription.otherProducts.push(product);
            }
        };
    })
    .controller('Subpage3Ctrl', function ($scope, $stateParams, MyServices, Subscription, $state) {

        $scope.userDetails = MyServices.getAppDetails();
        MyServices.showCardQuantity(function (num) {
            $scope.totalQuantity = num;
        });
        $scope.subscription = Subscription.getObj();
        Subscription.validate($state);
        $scope.goBackHandler = function () {
            window.history.back(); //This works
        };
        $scope.getProductPrice = MyServices.getProductPrice;
        $scope.addPlan = function (planName) {
            $scope.subscription.plan = planName;
        };
    })
    .controller('Subpage1Ctrl', function ($scope, $stateParams, MyServices, Subscription, $state) {
        $scope.userDetails = MyServices.getAppDetails();
        MyServices.showCardQuantity(function (num) {
            $scope.totalQuantity = num;
        });
        $scope.subscription = Subscription.getObj();
        Subscription.validate($state);
        $scope.goBackHandler = function () {
            window.history.back(); //This works
        };
    })
    .controller('AuthPaymentCtrl', function ($scope, $stateParams, $state, MyServices, Subscription) {
        $scope.goBackHandler = function () {
            window.history.back(); //This works
        };

        $scope.userData = {};
        // ui - sref = "app.confirm"

        $scope.subscription = Subscription.getObj();
        Subscription.validate($state);
        // console.log("$scope.subscription AuthPaymentCtrl", $scope.subscription);

        $scope.submitData = function (value) {
            $scope.subscription.customerName = value.customerName;
            $scope.subscription.customerMobile = value.customerMobile;
            $scope.subscription.methodOfPayment = value.methodOfPayment;
            $scope.subscription.orderFor = 'RMForCustomer';
            console.log("$scope.subscription submitData", $scope.subscription);
            MyServices.saveOrderCheckout($scope.subscription, function (data) {
                if (data.status == 200) {
                    console.log("$scope.subscription data.data", data.data);
                    $state.go('app.confirm');
                } else {
                    alert("something went wrong");
                }
            });

        };
    })
    .controller('AuthPaymentCtrlCart', function ($scope, $stateParams, $state, MyServices, Subscription) {
        $scope.goBackHandler = function () {
            window.history.back(); //This works
        };

        $scope.userData = {};

        $scope.submitData = function (value) {
            value.orderFor = 'RMForCustomer'
            MyServices.saveOrderCheckoutCart(value.customerName, value.customerMobile,value.methodOfPayment, value.orderFor, function (data) {
                if (data.status == 200) {
                    $state.go('app.confirm');
                } else {
                    alert("something went wrong");
                }
            });
        };
    })
    .controller('BrowseCtrl', function ($scope, $stateParams, $ionicSlideBoxDelegate, MyServices, $state, $timeout) {
        $scope.userDetails = MyServices.getAppDetails();

        $scope.slideHasChanged = function (index) {
            $ionicSlideBoxDelegate.cssClass = 'fade-in'
            $scope.slideIndex = index;
            if (($ionicSlideBoxDelegate.count() - 1) == index) {
                $timeout(function () {
                    $ionicSlideBoxDelegate.slide(0);

                }, $scope.interval);
            }
        };

        $scope.interval = 5000;
        $scope.homeSlider = {};
        $scope.homeSlider.data = [];
        $scope.homeSlider.currentPage = 0;

        $scope.setupSlider = function () {

            //some options to pass to our slider
            $scope.homeSlider.sliderOptions = {
                initialSlide: 0,
                direction: 'horizontal', //or vertical
                speed: 300,

                autoplay: "5000",
                effect: 'fade',

            };


            //create delegate reference to link with slider
            $scope.homeSlider.sliderDelegate = null;

            //watch our sliderDelegate reference, and use it when it becomes available
            $scope.$watch('homeSlider.sliderDelegate', function (newVal, oldVal) {
                if (newVal != null) {
                    $scope.homeSlider.sliderDelegate.on('slideChangeEnd', function () {
                        $scope.homeSlider.currentPage = $scope.homeSlider.sliderDelegate.activeIndex;
                        //use $scope.$apply() to refresh any content external to the slider
                        $scope.$apply();
                    });
                }
            });
        };

        $scope.setupSlider();



        //detect when sliderDelegate has been defined, and attatch some event listeners
        $scope.$watch('sliderDelegate', function (newVal, oldVal) {
            if (newVal != null) {
                $scope.sliderDelegate.on('slideChangeEnd', function () {
                    console.log('updated slide to ' + $scope.sliderDelegate.activeIndex);
                    $scope.$apply();
                });
            }
        });
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
            _.each($scope.products, function (n) {
                n.productQuantity = 0;
            });
        });
        $scope.checkMinProduct = function (product) {
            if (product.productQuantity <= 0) {
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
            var products = _.map(_.filter($scope.products, function (n) {
                return (n.productQuantity && n.productQuantity >= 1);
            }), function (n) {
                return {
                    productQuantity: n.productQuantity,
                    product: n._id,
                    totalAmount: n.productQuantity * parseFloat(n.price)
                };
            });
            if (products.length > 0) {
                MyServices.addToCart(products, function (data) {
                    if (data.status == 200) {
                        var alertPopup = $ionicPopup.alert({
                            title: "Products Added to Cart",
                            template: "Products Added to Cart Successfully"
                        });
                        alertPopup.then(function (res) {
                            $state.go("app.review");
                        });
                    } else {
                        $ionicPopup.alert({
                            title: "Error Occured",
                            template: "Error Occured while adding Products to Cart"
                        });
                    }
                });
            } else {
                $ionicPopup.alert({
                    title: "No Product",
                    template: "No Product for Add to Cart"
                });

            }

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
    .controller('VerifyCtrl', function ($scope, $stateParams, MyServices, $state) {
        $.jStorage.flush();

        var reqObj = {};
        var otp = {};
        reqObj.mobile = $stateParams.no;
        reqObj.accessLevel = "Relationship Partner";

        //Function to verify OTP
        $scope.verifyOTP = function (value) {
            reqObj.otp = value.first + value.second + value.third + value.forth;

            MyServices.verifyOTP(reqObj, function (data) {
                if (data.value) {
                    $scope.profile = $.jStorage.set('profile', data.data);
                    $state.go('signup');
                } else {
                    alert("OTP verification failed")
                    $state.go('login');
                }
            })
        }
    })
    .controller('ConfirmationCtrl', function ($scope, $stateParams) {

        $scope.goBackHandler = function () {
            window.history.back(); //This works
        };
    })
    .controller('LoginCtrl', function ($scope, $stateParams, $state, MyServices) {

        $scope.loginInfo = {};
        $scope.profile = $.jStorage.get('profile');
        if ($scope.profile != null) {
            if ($scope.profile.verification == 'Not Verified') {
                $state.go('verification');
            } else {
                $state.go('app.dashboard');

            }
        }

        $scope.getOTP = function (value) {
            console.log("value", value);
            value.accessLevel = "Relationship Partner"
            if (value.mobile != null && value.mobile != "") {
                MyServices.getOTP({
                    mobile: value.mobile,
                    accessLevel: value.accessLevel
                }, function (data) {
                    if (data.status == 200) {
                        $state.go('verify', {
                            no: value.mobile
                        });
                    } else {
                        alert("unable to generate OTP. Please try again");
                    }
                });
            } else {
                alert("Please provide mobile number");
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