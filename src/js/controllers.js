'use strict';
angular.module('SchedulePage')
    .controller('NavCtrl', ['$scope', '$location',
        function ($scope, $location) {
            $scope.tabs = ['Schedule', 'Homework', 'Exams', 'Labs', 'Quizzes'];
            var curPath = $location.path().substring(1);
            $scope.tabs.forEach(function (item) {
                if (item.toLowerCase() === curPath.toLowerCase()) {
                    $scope.tab = item;
                }
            });
            $scope.setSelectedTab = function (item) {
                $scope.tab = item;
            };

            $scope.isSelected = function (item) {
                return $scope.tab === item;
            };
        }])
    .controller('ScheduleCtrl', ['$scope', 'Sessions',
        function ($scope, Sessions) {
            $scope.sessions = [];
            Sessions.getSessions(function (data) {
                $scope.sessions = data;
            });
            $scope.getSessionComponent = function (session, comp) {
                for (var i = 0; i < session.scheduleComponents.length; i++) {
                    var value = session.scheduleComponents[i];
                    if (value.name.toLowerCase() === comp.toLowerCase()) {
                        return value.values;
                    }
                }
            };
            $scope.componentTypes = ['due', 'topics', 'resources', 'reading', 'programs'];
        }])
    .controller("HomeworkCtrl", ['$scope', 'CourseComponents',
        function ($scope, CourseComponents) {
            $scope.components = [];
            CourseComponents.getComponents('Homework',
                function (data) {
                    $scope.components = data;
                });

        }])
    .controller("ExamsCtrl", ['$scope', 'CourseComponents',
        function ($scope, CourseComponents) {
            $scope.components = [];
            CourseComponents.getComponents('Exam',
                function (data) {
                    $scope.components = data;
                });
        }])
    .controller("QuizzesCtrl", ['$scope', 'CourseComponents',
        function ($scope, CourseComponents) {
            $scope.components = [];
            CourseComponents.getComponents('Quiz',
                function (data) {
                    $scope.components = data;
                });
        }])
    .controller("LabsCtrl", ['$scope', 'CourseComponents',
        function ($scope, CourseComponents) {
            $scope.components = [];
            CourseComponents.getComponents('Lab',
                function (data) {
                    $scope.components = data;
                });
        }]);