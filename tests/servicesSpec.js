'use strict';
describe('SchedulePage services', function () {
    beforeEach(module('SchedulePage'));

    var httpBackend;
    describe('Sessions', function () {
        var Sessions, sessionsData;
        beforeEach(inject(function ($httpBackend, $http, _Sessions_) {
            httpBackend = $httpBackend;

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
            httpBackend.when('GET', './data/sessions.json')
                .respond(sessionsData);

            Sessions = _Sessions_;
        }));

        it('should initialize sessions as an empty array', function () {
            expect(Sessions.sessions.length).toEqual(0);
        });


        describe('getSessions', function () {
            it('should fetch 2 session objects', function () {
                httpBackend.expect('GET');
                Sessions.getSessions(function (data) {
                });
                httpBackend.flush();
                expect(Sessions.sessions.length).toEqual(2);
                expect(Sessions.sessions).toEqual(sessionsData);

            });

            it('should not call httpBackend after the first fetch', function () {
                httpBackend.expect('GET');
                Sessions.getSessions(function (data) {
                });
                httpBackend.flush();

                Sessions.getSessions(function (data) {
                });
                expect(httpBackend.flush).toThrowError('No pending request to flush !');
            });

            it('should invoke the callback', function () {
                httpBackend.expect('GET');
                var results;
                expect(results).toBeFalsy();
                Sessions.getSessions(function (data) {
                    results = data;
                });
                httpBackend.flush();
                expect(results.length).toEqual(2);
            });
        });
    });

    describe('CourseComponents', function () {
        var CourseComponents, courseComponentsData;
        beforeEach(inject(function ($httpBackend, $http, _CourseComponents_) {
            httpBackend = $httpBackend;

            courseComponentsData = [
                {
                    "type": "Homework",
                    "name": "Homework 1",
                    "number": 1,
                    "dueDate": "Wednesday Dec 9",
                    "url": "",
                    "solution": "",
                    "sample": ""
                },
                {
                    "type": "Lab",
                    "name": "Schedule Object",
                    "number": 1,
                    "dueDate": "Thursday Dec 3",
                    "url": "../Assignments/SchedulerLab.pdf",
                    "solution": "",
                    "sample": ""
                }, {
                    "type": "Exam",
                    "name": "Exam 1",
                    "number": 2,
                    "dueDate": "Wednesday Jan 27",
                    "url": "",
                    "solution": "",
                    "sample": ""
                }, {
                    "type": "Quiz",
                    "name": "Quiz 3",
                    "number": 3,
                    "dueDate": "Monday Jan 4",
                    "url": "",
                    "solution": "",
                    "sample": ""
                }];

            httpBackend.when('GET', './data/courseComponents.json')
                .respond(courseComponentsData);

            CourseComponents = _CourseComponents_;
        }));

        it('should initialize sessions as an empty array', function () {
            expect(CourseComponents.courseComponents.Homework.length).toEqual(0);
            expect(CourseComponents.courseComponents.Lab.length).toEqual(0);
            expect(CourseComponents.courseComponents.Quiz.length).toEqual(0);
            expect(CourseComponents.courseComponents.Exam.length).toEqual(0);

        });


        describe('getComponents', function () {
            it('should fetch 4 courseComponent objects', function () {
                httpBackend.expect('GET');
                CourseComponents.getComponents('Homework', function (data) {
                });
                httpBackend.flush();
                expect(CourseComponents.courseComponents.Homework.length).toEqual(1);
                expect(CourseComponents.courseComponents.Lab.length).toEqual(1);
                expect(CourseComponents.courseComponents.Quiz.length).toEqual(1);
                expect(CourseComponents.courseComponents.Exam.length).toEqual(1);

                expect(CourseComponents.courseComponents.Homework[0]).toEqual(courseComponentsData[0]);
                expect(CourseComponents.courseComponents.Lab[0]).toEqual(courseComponentsData[1]);
                expect(CourseComponents.courseComponents.Quiz[0]).toEqual(courseComponentsData[3]);
                expect(CourseComponents.courseComponents.Exam[0]).toEqual(courseComponentsData[2]);
            });

            it('should not call httpBackend after the first fetch', function () {
                httpBackend.expect('GET');
                CourseComponents.getComponents('Homework', function (data) {
                });
                httpBackend.flush();

                CourseComponents.getComponents('Homework', function (data) {
                });
                expect(httpBackend.flush).toThrowError('No pending request to flush !');
            });

            it('should invoke the callback', function () {
                httpBackend.expect('GET');
                var results;
                expect(results).toBeFalsy();
                CourseComponents.getComponents('Homework', function (data) {
                    results = data;
                });
                httpBackend.flush();
                expect(results.length).toEqual(1);
            });

            it('should return the correct component data', function () {
                httpBackend.expect('GET');
                var results;
                expect(results).toBeFalsy();
                CourseComponents.getComponents('Homework', function (data) {
                    results = data;
                });
                httpBackend.flush();
                expect(results.length).toEqual(1);
                expect(results[0]).toEqual(courseComponentsData[0]);

                CourseComponents.getComponents('Lab', function (data) {
                    results = data;
                });
                expect(results.length).toEqual(1);
                expect(results[0]).toEqual(courseComponentsData[1]);

                CourseComponents.getComponents('Quiz', function (data) {
                    results = data;
                });
                expect(results.length).toEqual(1);
                expect(results[0]).toEqual(courseComponentsData[3]);

                CourseComponents.getComponents('Exam', function (data) {
                    results = data;
                });
                expect(results.length).toEqual(1);
                expect(results[0]).toEqual(courseComponentsData[2]);
            });
        });
    });
});