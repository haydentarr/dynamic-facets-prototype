var tracking = angular.module('tracking');
    
    tracking.directive('multiselect',['$document', function($document){
            return {
              restrict: 'A',
              require: '?ngModel',
              scope: true,
              link: function(scope, element, attr){
                
                  scope.isPopupVisible = false;
            
                  scope.toggleSelect = function(){
                    scope.isPopupVisible = !scope.isPopupVisible;
                  };
            
                  $document.bind('click', function(event){
                    var isClickedElementChildOfPopup = element
                      .find(event.target)
                      .length > 0;
                    
                    if (isClickedElementChildOfPopup)
                      return;
                      
                    scope.isPopupVisible = false;
                    scope.$apply();
                  });
              }
            };
        }]);

        // FOR ONBOARDING ONLY ADD LATER –––––––––––––––––––––––––––––––––––––––//
    /*
    tracking.directive('helpTip', ["$document",
        function($document) {
            return {
                // Restrict it to be an attribute in this case
                restrict: 'E',
                templateUrl: 'PulseToolTip.html',
                // responsible for  DOM listeners as well as updating the DOM
                link: function(scope, element) {
                    scope.tipOpen = false;

                    var topOffset = element.find('.oFlyout').outerHeight();

                    element.find('.oFlyout').css({
                        "top": "-" + topOffset + "px",
                        "left": "-191px"
                    });

                    element.find('.pulse').click(function() {
                        scope.tipOpen = !scope.tipOpen;
                        element.find('.oFlyout').removeClass('fadeOutDown').addClass('fadeInUp');
                    });

                    $document.bind('click', function(event) {
                        var isChild = element
                            .find(event.target)
                            .length > 0;

                        if (isChild) return;

                        scope.tipOpen = false;
                    });
                    element.find('.oBtnPrimary').click(function() {
                        scope.tipOpen = false;
                        element.find('.pulse').addClass('hide');

                    });

                }
            };
        }
    ]);
    */

    tracking.directive('platdevSet', [ function() {
            return {
                // Restrict it to be an attribute in this case
                restrict: 'E',
                templateUrl: 'platdev-section.html',
                // responsible for registering DOM listeners as well as updating the DOM
                link: function(scope, element) {}
            };
        }
    ]);
    tracking.directive('taskroleSet', [ function() {
            return {
                // Restrict it to be an attribute in this case
                restrict: 'E',
                templateUrl: 'taskrole-section.html',
                // responsible for registering DOM listeners as well as updating the DOM
                link: function(scope, element) {}
            };
        }
    ]);
    tracking.directive('jobpostSet', [ function() {
            return {
                // Restrict it to be an attribute in this case
                restrict: 'E',
                templateUrl: 'jobpost-section.html',
                // responsible for registering DOM listeners as well as updating the DOM
                link: function(scope, element) {}
            };
        }
    ]);


    tracking.directive('xpdetailsSet', [ function() {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'E',
            templateUrl: 'xpDetails-section.html',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, element) {}
        };
    }
    ]);