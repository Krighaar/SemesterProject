'use strict';
/**
 * Created by Tomoe on 10-12-2014.
 */
describe('myAppRename.view3 View3Ctrl', function() {

    var scope, httpBackendMock, ctrl;
    var wishes = [
        {wish : "wish1"},{wish : "wish2"},{wish : "wish3"},{wish : "wish4"}
    ];
    var newWish={_id:1,wish:"editingWish"};

    beforeEach(module('myAppRename.view3'));

    beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
        httpBackendMock = $httpBackend;
        httpBackendMock.whenPUT('/adminApi/wish/1',newWish).respond("edited");

        scope = $rootScope.$new();
        ctrl = $controller('View3Ctrl', {$scope: scope});
        scope.isAuthenticated=true;
        scope.username="bla"


    }));



    it('Wish with _id will be edited and status will be set to Your wish is updated', function () {

        scope.newWish=newWish;
        expect(scope.whises).toBeUndefined();
        scope.createWish(scope.newWish);
        httpBackendMock.flush();
        expect(scope.status).toEqual('Your wish is updated');

    });



});