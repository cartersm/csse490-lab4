'use strict';
angular.module('SchedulePage')
    .service('Sessions', ['$http',
        function ($http) {
            this.sessions = [];

            var self = this;

            this.getSessions = function (callback) {
                if (self.sessions.length !== 0) {
                    callback(angular.copy(self.sessions));
                } else {
                    $http({method: 'GET', url: './data/sessions.json'})
                        .then(function (res) {
                            self.sessions = res.data;
                            callback(angular.copy(self.sessions));
                        });
                }
            };
        }])
    .service('CourseComponents', ['$http',
        function ($http) {
            this.courseComponents = {
                Homework: [],
                Exam: [],
                Quiz: [],
                Lab: []
            };

            var self = this;

            this.getComponents = function (type, callback) {
                if (self.courseComponents.Homework.length !== 0 &&
                    self.courseComponents.Exam.length !== 0 &&
                    self.courseComponents.Quiz.length !== 0 &&
                    self.courseComponents.Lab.length !== 0) {
                    callback(angular.copy(self.courseComponents[type]));
                } else {
                    $http({method: 'GET', url: './data/courseComponents.json'})
                        .then(function (res) {
                            angular.forEach(res.data, function (value) {
                                self.courseComponents[value.type].push(value);
                            });
                            callback(angular.copy(self.courseComponents[type]));
                        });
                }
            }
        }]);