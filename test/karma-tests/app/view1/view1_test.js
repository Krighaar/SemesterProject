'use strict';
/**
 * Created by Tomoe on 10-12-2014.
 */
describe('myAppRename.view1 View1Ctrl', function() {

    var scope, httpBackendMock, ctrl;
    var wishes = [
        {wish : "wish1"},{wish : "wish2"},{wish : "wish3"},{wish : "wish4"}
    ];

    beforeEach(module('myAppRename.view1'));

    beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
        httpBackendMock = $httpBackend;
        httpBackendMock.whenGET('/publicApi/wish').respond(wishes);

        scope = $rootScope.$new();
        ctrl = $controller('View1Ctrl', {$scope: scope});
        scope.isAuthenticated=false;
    }));



    it('Should fetch four wishes ', function () {


        expect(scope.AllWishes).toBeUndefined();
        httpBackendMock.flush();
        expect(scope.AllWishes.length).toEqual(4);
        expect(scope.AllWishes[0].wish).toEqual("wish1");
    });



});