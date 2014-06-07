/**
 * Created by mishrab on 6/7/14.
 */

var stateApp = angular.module('stateApp', []);

stateApp.controller('StateControl', function($scope, $http){
    $scope.message = 'Hello World';
    $http.get('/states').success(function(data){
        $scope.message = data;
    });
    $scope.getStateInfo = function(state){
        console.log(state.abbreviation);
        $http.get('/states/' + state.abbreviation).success(function(data){
            console.log(data);
            var names = _.pluck(JSON.parse(data.data), 'name');
            $scope.info = names.join(',');
        });
    };
    $scope.clickonModal = function($event){
        $scope.info = false;
    };
    $scope.clickonModalData = function($event){
        $event.preventDefault();

        $event.stopImmediatePropagation();
        return false;
    };
    $scope.escapeModal = function($event){
        console.log($event);
        if ($event.keyCode === 27) {
            $scope.info = false;
        }
    };
});