'use strict';
describe('myAppRename.controllers AppCtrl', function () {

    var scope, httpBackendMock, ctrl;
    var user = {userName: "Lars", pw: "123"};
    beforeEach(module('myAppRename.controllers'));

    beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
        httpBackendMock = $httpBackend;
        httpBackendMock.whenPOST('/authenticate', user).respond(user);

        scope = $rootScope.$new();
        ctrl = $controller('AppCtrl', {$scope: scope});
    }));

    it('should fail login without entering username & password', function () {
        scope.user=null;
        expect(scope.username).toEqual("");
        scope.submit();

        expect(scope.error).toEqual("Username and Password cannot be empty");

    });


});