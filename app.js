'use strict';

angular.module('schedulePage', [
    'ngSanitize',
    'ngRoute'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/schedule', {
                templateUrl: 'partials/schedule.html',
                controller: 'ScheduleCtrl'
            })
            .when('/homework', {
                templateUrl: 'partials/homework.html',
                controller: 'HomeworkCtrl'
            })
            .when('/exams', {
                templateUrl: 'partials/exams.html',
                controller: 'ExamsCtrl'
            })
            .when('/quizzes', {
                templateUrl: 'partials/quizzes.html',
                controller: 'QuizzesCtrl'
            })
            .when('/labs', {
                templateUrl: 'partials/labs.html',
                controller: 'LabsCtrl'
            })
            .otherwise({
                redirectTo: '/schedule'
            });
    }])
    .controller('NavCtrl', ['$scope', '$location', function ($scope, $location) {
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
    .controller('ScheduleCtrl', ['$scope', function ($scope) {
        $scope.sessions = sessions;
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
    .controller("HomeworkCtrl", ['$scope', function ($scope) {
        $scope.components = [];
        courseComponents.forEach(function (item) {
            if (item.type === 'Homework') {
                $scope.components.push(item);
            }
        });

    }])
    .controller("ExamsCtrl", ['$scope', function ($scope) {
        $scope.components = [];
        courseComponents.forEach(function (item) {
            if (item.type === 'Exam') {
                $scope.components.push(item);
            }
        });
    }])
    .controller("QuizzesCtrl", ['$scope', function ($scope) {
        $scope.components = [];
        courseComponents.forEach(function (item) {
            if (item.type === 'Quiz') {
                $scope.components.push(item);
            }
        });
    }])
    .controller("LabsCtrl", ['$scope', function ($scope) {
        $scope.components = [];
        courseComponents.forEach(function (item) {
            if (item.type === 'Lab') {
                $scope.components.push(item);
            }
        });
    }]);

var sessions = [
    {
        session: 1,
        sessionDate: 'Monday Nov 1',
        week: 1,
        scheduleComponents: [
            {
                name: "Due",
                values: [
                    "Nothing due before the 1st class.",
                    "Always look at the Programs column for the programming assignment of the week."
                ]
            },
            {
                name: "Topics",
                values: [
                    "Brief course introduction",
                    "REST architecture style",
                    "Introduction to the MEAN technology stack",
                    "Installing editor, Node.js and Express.js"
                ]
            },
            {
                name: "Resources",
                values: [
                    "Slides",
                    "Node.js",
                    "Node Package Manager (npm)"
                ]
            },
            {
                name: "Reading",
                values: [
                    "Representational State Transfer (REST)",
                    "Learn REST: a RESTful Tutorial"
                ]
            }
        ]
    },
    {
        session: 2,
        sessionDate: 'Wednesday Dec 3',
        week: 1,
        scheduleComponents: [
            {
                name: "Topics",
                values: [
                    "Review of course syllabus",
                    "Brief introduction to Express.js",
                    "MongoDB installation",
                    "Getting started with MongoDB"
                ]
            },
            {
                name: "Resources",
                values: [
                    '<a href="../Slides/Introductions.pdf">Slides</a>',
                    '<a href="http://expressjs.com/starter/installing.html">Express Installation</a>',
                    '<a href="https://docs.mongodb.org/manual/installation/">MongoDB installation</a>'
                ]
            },
            {
                name: "Reading",
                values: [
                    '<a href="../syllabus.html">Course Syllabus</a>',
                    '<a href="https://docs.mongodb.org/manual/">MongoDB Documentation</a>',
                    '<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript">JavaScript Primer</a>',
                    '<a href="../Assignments/HelloWorldExpressExample.pdf">Hello World Express Exampla</a>',
                    '<a href="../Assignments/GettingStartedWithMongoDB.pdf">Getting Started with MongoDB</a>'
                ]
            }
        ]
    },
    {
        session: 3,
        sessionDate: 'Thursday Dec 4',
        week: 1,
        scheduleComponents: [
            {
                name: "Topics",
                values: [
                    "JavaScript Primer",
                    "JavaScript History",
                    "JavaScript Types",
                    "Objects in JavaScript",
                    "Object Prototype"
                ]
            },
            {
                name: "Resources",
                values: [
                    "Slides"
                ]
            },
            {
                name: "Reading",
                values: [
                    "A reintroduction to JavaScript",
                    "Prototypal Inheritance"
                ]
            },
            {
                name: "Programs",
                values: [
                    "Lab 1 Build a session schedule. You can use http://www.jsonlint.com to validate your JSON objects."
                ]
            }
        ]
    },
    {
        session: 4,
        sessionDate: 'Monday Dec 1',
        week: 2,
        scheduleComponents: [
            {
                name: "Topics",
                values: [
                    "Arrays in JavaScript",
                    "JavaScript Functions",
                    "Closures in JavaScript"
                ]
            },
            {
                name: "Resources",
                values: [
                    "Slides"
                ]
            },
            {
                name: "Reading",
                values: [
                    "Invocation Patterns in JavaScript",
                    "Closures"
                ]
            }
        ]
    },
    {
        session: 5,
        sessionDate: 'Wednesday Dec 3',
        week: 2,
        scheduleComponents: [
            {
                name: "Due",
                values: [
                    "Lab 1 due at the start of class. Be prepared to demo your solution to your instructor at the start of class."
                ]
            },
            {
                name: "Topics",
                values: [
                    "Introduction to AngularJS",
                    "Directives",
                    "Modules",
                    "Expressions",
                    "Controllers"
                ]
            },
            {
                name: "Resources",
                values: [
                    "Slides"
                ]
            },
            {
                name: "Reading",
                values: [
                    "AngularJS API Documentation",
                    "Angular Style Guide",
                    "CSS Bootstrap"
                ]
            }
        ]
    },
    {
        session: 6,
        sessionDate: 'Thursday Dec 4',
        week: 2,
        scheduleComponents: [
            {
                name: "Topics",
                values: [
                    "More Directives",
                    "Filters"
                ]
            },
            {
                name: "Resources",
                values: [
                    "Slides"
                ]
            },
            {
                name: "Reading",
                values: [
                    "AngularJS Filters"
                ]
            },
            {
                name: "Programs",
                values: [
                    "Lab 2 Build an AngularJS course scheduler application."
                ]
            }
        ]
    }, {
        session: 7,
        sessionDate: 'Monday Dec 1',
        week: 3,
        scheduleComponents: [
            {
                name: "Topics",
                values: [
                    "Tabs",
                    "Forms",
                    "Models"
                ]
            },
            {
                name: "Resources",
                values: [
                    "Slides"
                ]
            },
            {
                name: "Reading",
                values: [
                    "Bootstrap Forms"
                ]
            }
        ]
    }, {
        session: 8,
        sessionDate: 'Wednesday Dec 3',
        week: 3,
        scheduleComponents: []
    }, {
        session: 9,
        sessionDate: 'Thursday Dec 4',
        week: 3,
        scheduleComponents: [
            {
                name: "Due",
                values: [
                    "Lab 2 Due at start of class."
                ]
            }
        ]
    }, {
        session: 10,
        sessionDate: 'Monday Jan 1',
        week: 4,
        scheduleComponents: []
    }, {
        session: 11,
        sessionDate: 'Wednesday Jan 3',
        week: 4,
        scheduleComponents: []
    }, {
        session: 12,
        sessionDate: 'Thursday Jan 4',
        week: 4,
        scheduleComponents: []
    }, {
        session: 13,
        sessionDate: 'Monday Jan 1',
        week: 5,
        scheduleComponents: []
    }, {
        session: 14,
        sessionDate: 'Wednesday Jan 3',
        week: 5,
        scheduleComponents: []
    }, {
        session: 15,
        sessionDate: 'Thursday Jan 4',
        week: 5,
        scheduleComponents: []
    }, {
        session: 16,
        sessionDate: 'Monday Jan 1',
        week: 6,
        scheduleComponents: []
    }, {
        session: 17,
        sessionDate: 'Wednesday Jan 3',
        week: 6,
        scheduleComponents: []
    }, {
        session: 18,
        sessionDate: 'Thursday Jan 4',
        week: 6,
        scheduleComponents: []
    }, {
        session: 19,
        sessionDate: 'Monday Jan 1',
        week: 7,
        scheduleComponents: []
    }, {
        session: 20,
        sessionDate: 'Wednesday Jan 3',
        week: 7,
        scheduleComponents: []
    }, {
        session: 21,
        sessionDate: 'Thursday Jan 4',
        week: 7,
        scheduleComponents: []
    }, {
        session: 22,
        sessionDate: 'Monday Feb 1',
        week: 8,
        scheduleComponents: []
    }, {
        session: 23,
        sessionDate: 'Wednesday Feb 3',
        week: 8,
        scheduleComponents: []
    }, {
        session: 24,
        sessionDate: 'Thursday Feb 4',
        week: 8,
        scheduleComponents: []
    }, {
        session: 25,
        sessionDate: 'Monday Feb 1',
        week: 9,
        scheduleComponents: []
    }, {
        session: 26,
        sessionDate: 'Wednesday Feb 3',
        week: 9,
        scheduleComponents: []
    }, {
        session: 27,
        sessionDate: 'Thursday Feb 4',
        week: 9,
        scheduleComponents: []
    }, {
        session: 28,
        sessionDate: 'Monday Feb 1',
        week: 10,
        scheduleComponents: []
    }, {
        session: 29,
        sessionDate: 'Wednesday Feb 3',
        week: 10,
        scheduleComponents: []
    }, {
        session: 30,
        sessionDate: 'Thursday Feb 4',
        week: 10,
        scheduleComponents: []
    }
];

var courseComponents = [
    {
        type: 'Homework',
        name: 'Homework 1',
        number: 1,
        sessionDue: 5,
        url: '',
        solution: '',
        sample: ''
    },
    {
        type: 'Lab',
        name: 'Schedule Object',
        number: 1,
        sessionDue: 3,
        url: '../Assignments/SchedulerLab.pdf',
        solution: '',
        sample: ''
    },
    {
        type: 'Exam',
        name: 'Exam 1',
        number: 2,
        sessionDue: 20,
        url: '',
        solution: '',
        sample: ''
    },
    {
        type: 'Quiz',
        name: 'Quiz 3',
        number: 3,
        sessionDue: 10,
        url: '',
        solution: '',
        sample: ''
    }
];