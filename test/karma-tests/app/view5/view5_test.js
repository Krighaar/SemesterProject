/**
 * Created by Tomoe on 08-12-2014.
 */
describe('myAppRename.view5 View5Ctrl', function () {

    var scope, httpBackendMock, ctrl;
    var users = [
        {userName: "Lars"}, {userName: "Henrik"}, {userName: "Anders"}, {userName: "Tobias"}
    ];
    beforeEach(module('myAppRename.view5'));

    beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
        httpBackendMock = $httpBackend;
        httpBackendMock.expectGET('publicApi/').respond(users);


        scope = $rootScope.$new();
        ctrl = $controller('View5Ctrl', {$scope: scope});
    }));

    it('Should fetch four names ', function () {
        expect(scope.allUsers).toBeUndefined();
        httpBackendMock.flush();
        expect(scope.allUsers.length).toEqual(4);
    });


});