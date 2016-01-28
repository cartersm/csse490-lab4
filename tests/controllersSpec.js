'use strict';
describe('SchedulePage controllers', function () {
    beforeEach(module('SchedulePage'));

    describe('NavCtrl', function () {
        var scope, ctrl, location, rootScope;

        beforeEach(inject(function ($controller, $rootScope, $location) {

            rootScope = $rootScope;
            scope = $rootScope.$new();
            location = $location;

            ctrl = $controller('NavCtrl', {
                $scope: scope,
                $location: location
            });
        }));

        it('should set the selected tab correctly', function () {
            scope.setSelectedTab('Schedule');
            var isSelected = scope.isSelected('Schedule');
            expect(isSelected).toBe(true);

            scope.setSelectedTab('Homework');
            isSelected = scope.isSelected('Homework');
            expect(isSelected).toBe(true);

            scope.setSelectedTab('Exams');
            isSelected = scope.isSelected('Exams');
            expect(isSelected).toBe(true);

            scope.setSelectedTab('Labs');
            isSelected = scope.isSelected('Labs');
            expect(isSelected).toBe(true);

            scope.setSelectedTab('Quizzes');
            isSelected = scope.isSelected('Quizzes');
            expect(isSelected).toBe(true);
        })
    });

    describe('ScheduleCtrl', function () {
        var scope, ctrl, sessionsData, sessionsService;

        beforeEach(inject(function ($controller, $rootScope) {
            sessionsService = {
                getSessions: function (callback) {
                    callback(angular.copy(sessionsData));
                }
            };

            sessionsData = [
                {
                    "session": 1,
                    "sessionDate": "Monday Nov 30",
                    "week": 1,
                    "scheduleComponents": [{
                        "name": "Due",
                        "values": [
                            "Nothing due before the 1st class.",
                            "Always look at the Programs column for the programming assignment of the week."
                        ]
                    }]
                },
                {
                    "session": 2,
                    "sessionDate": "Wednesday Dec 2",
                    "week": 1,
                    "scheduleComponents": [
                        {
                            "name": "Topics",
                            "values": [
                                "Review of course syllabus",
                                "Brief introduction to Express.js",
                                "MongoDB installation",
                                "Getting started with MongoDB"
                            ]
                        }]
                }];

            scope = $rootScope.$new();

            ctrl = $controller('ScheduleCtrl', {
                $scope: scope,
                Sessions: sessionsService
            });
        }));

        it('should initialize $scope.sessions with the correct data', function () {
            expect(scope.sessions.length).toEqual(2);
            expect(scope.sessions).toEqual(sessionsData);
        });

        it('should return the requested schedule component', function () {
            var comp = scope.getSessionComponent(sessionsData[0], 'Due');
            expect(comp).toEqual(sessionsData[0].scheduleComponents[0].values);

        });
    });

    describe('Course Component controllers', function () {
        var componentsData, componentsService, scope, ctrl;
        beforeEach(function () {
            componentsData = {
                Homework: [{
                    "type": "Homework",
                    "name": "Homework 1",
                    "number": 1,
                    "dueDate": "Wednesday Dec 9",
                    "url": "",
                    "solution": "",
                    "sample": ""
                }],
                Lab: [{
                    "type": "Lab",
                    "name": "Schedule Object",
                    "number": 1,
                    "dueDate": "Thursday Dec 3",
                    "url": "../Assignments/SchedulerLab.pdf",
                    "solution": "",
                    "sample": ""
                }],
                Exam: [{
                    "type": "Exam",
                    "name": "Exam 1",
                    "number": 2,
                    "dueDate": "Wednesday Jan 27",
                    "url": "",
                    "solution": "",
                    "sample": ""
                }],
                Quiz: [{
                    "type": "Quiz",
                    "name": "Quiz 3",
                    "number": 3,
                    "dueDate": "Monday Jan 4",
                    "url": "",
                    "solution": "",
                    "sample": ""
                }]
            };

            componentsService = {
                getComponents: function (type, callback) {
                    callback(angular.copy(componentsData[type]))
                }
            };
        });


        describe('HomeworkCtrl', function () {
            beforeEach(inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();

                ctrl = $controller('HomeworkCtrl', {
                    $scope: scope,
                    CourseComponents: componentsService
                });
            }));

            it('should load the correct course component data', function () {
                expect(scope.components.length).toEqual(1);
                expect(scope.components[0]).toEqual(componentsData.Homework[0]);
            });
        });

        describe('ExamsCtrl', function () {
            beforeEach(inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();

                ctrl = $controller('ExamsCtrl', {
                    $scope: scope,
                    CourseComponents: componentsService
                });
            }));

            it('should load the correct course component data', function () {
                expect(scope.components.length).toEqual(1);
                expect(scope.components[0]).toEqual(componentsData.Exam[0]);
            });
        });

        describe('QuizzesCtrl', function () {
            beforeEach(inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();

                ctrl = $controller('QuizzesCtrl', {
                    $scope: scope,
                    CourseComponents: componentsService
                });
            }));

            it('should load the correct course component data', function () {
                expect(scope.components.length).toEqual(1);
                expect(scope.components[0]).toEqual(componentsData.Quiz[0]);
            });
        });

        describe('LabsCtrl', function () {
            beforeEach(inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();

                ctrl = $controller('LabsCtrl', {
                    $scope: scope,
                    CourseComponents: componentsService
                });
            }));

            it('should load the correct course component data', function () {
                expect(scope.components.length).toEqual(1);
                expect(scope.components[0]).toEqual(componentsData.Lab[0]);
            });
        });
    });
});