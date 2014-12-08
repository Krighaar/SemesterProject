'use strict';
describe('myAppRename.controllers AppCtrl', function() {

    var scope, httpBackendMock, ctrl;
    var user = {userName : "Lars", pw:"123"};
    beforeEach(module('myAppRename.controllers'));

    beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
        httpBackendMock = $httpBackend;
        httpBackendMock.whenPOST('/authenticate',user).respond(user);

        scope = $rootScope.$new();
        ctrl = $controller('AppCtrl', {$scope: scope});
    }));

    it('Should equal to Lars ', function () {
        //scope.user=user;
        //expect(scope.username).toEqual("");
        //scope.submit();
        //httpBackendMock.flush();
        //
        //expect(scope.username).toEqual("Lars");

    });



});