'use strict';
/**
 * Created by Tomoe on 10-12-2014.
 */
//describe('myAppRename.view1 View1Ctrl', function() {
//
//    var scope, httpBackendMock, ctrl;
//    var wishes = [
//        {wish : "wish1"},{wish : "wish2"},{wish : "wish3"},{wish : "wish4"}
//    ];
//    var users = [
//        {userName : "Lars"},{userName : "Henrik"},{userName : "Anders"},{userName : "Tobias"}
//    ];
//    beforeEach(module('myAppRename.view1'));
//
//    beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
//        httpBackendMock = $httpBackend;
//        httpBackendMock.whenGET('adminApi/wish').respond(wishes);
//        httpBackendMock.whenGET('adminApi/').respond(users);
//        scope = $rootScope.$new();
//        ctrl = $controller('View1Ctrl', {$scope: scope});
//    }));
//
//
//    it('Should fetch four users ', function () {
//
//
//        expect(scope.allUsers).toBeUndefined();
//        httpBackendMock.flush();
//        expect(scope.allUsers.length).toEqual(4);
//        expect(scope.allUsers[0]).toEqual("Lars");
//    });
//
//    it('Should fetch four wishes ', function () {
//
//
//        expect(scope.AllWishes).toBeUndefined();
//        httpBackendMock.flush();
//        expect(scope.AllWishes.length).toEqual(4);
//        expect(scope.AllWishes[0]).toEqual("wish1");
//    });
//


//});