'use strict';

angular.module('SchedulePage', [
    'ngSanitize',
    'ngRoute'
])
    .config(['$routeProvider', '$locationProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/schedule', {
                    templateUrl: '../partials/schedule.html',
                    controller: 'ScheduleCtrl'
                })
                .when('/homework', {
                    templateUrl: '../partials/homework.html',
                    controller: 'HomeworkCtrl'
                })
                .when('/exams', {
                    templateUrl: '../partials/exams.html',
                    controller: 'ExamsCtrl'
                })
                .when('/quizzes', {
                    templateUrl: '../partials/quizzes.html',
                    controller: 'QuizzesCtrl'
                })
                .when('/labs', {
                    templateUrl: '../partials/labs.html',
                    controller: 'LabsCtrl'
                })
                .otherwise({
                    redirectTo: '/schedule'
                });
        }
    ]);