beforeEach(module('myAppRename.factories'));

describe('testing userFactory', function () {

    var httpBackendMock, factory;
    var url = 'adminApi/';
    var url2 = 'adminApi/userAdmin/'


    beforeEach(inject(function ($httpBackend, userFactory) {

        httpBackendMock = $httpBackend;
        factory = userFactory;
    }));

    it('getAllUsers should return promise and respond with String"', function () {
        var theUsers;
        httpBackendMock.expectGET("publicApi/").respond(200, "usersString");

        factory.getAllUsers().then(function (users) {
            theUsers = users;

        });
        httpBackendMock.flush();
        expect(factory.getAllUsers().then).toBeDefined()
        expect(factory.getAllUsers().success).toBeDefined()
        expect(theUsers.data).toEqual("usersString");
    });


    it('removeUser return promise and respond with the user"', function () {
        var theUser;
        var deletingUser = {username: "deletedPerson"}
        var urldelete = url2 + "1";
        httpBackendMock.whenDELETE(urldelete).respond(200, deletingUser);
        factory.removeUser("1").then(function (user) {
            theUser = user;

        });
        httpBackendMock.flush();
        expect(factory.removeUser("1").then).toBeDefined()
        expect(factory.removeUser("1").success).toBeDefined()
        expect(theUser.data.username).toEqual(deletingUser.username);
    });

    it('addUser return promise and repond with the user"', function () {
        var theUser;
        var addingUser = {username: "addedPerson"}
        httpBackendMock.whenPOST("publicApi/userAdmin").respond(200, addingUser);
        factory.addUser(addingUser).then(function (user) {
            theUser = user;

        });
        httpBackendMock.flush();
        expect(factory.addUser().then).toBeDefined()
        expect(factory.addUser().success).toBeDefined()
        expect(theUser.data.username).toEqual(addingUser.username);
    });


});


describe('testing wishFactory', function () {

    var httpBackendMock, factory;
    var url = '/adminApi';
    var theWish;
    var gettingUser = {username: "gotPerson", description: "success"}
    var wishes = [{title: "wish1"}, {title: "wish2"}];
    beforeEach(inject(function ($httpBackend, wishFactory) {

        httpBackendMock = $httpBackend;
        factory = wishFactory;
    }));

    it('getUser should return promise and respond with the user"', function () {
        var theUser;
        httpBackendMock.whenGET(url + "/findUser/gotPerson").respond(200, gettingUser);

        factory.getUser("gotPerson").then(function (user) {
            theUser = user;

        });
        httpBackendMock.flush();
        expect(factory.getUser().then).toBeDefined()
        expect(factory.getUser().success).toBeDefined()
        expect(theUser.data.description).toEqual("success");
    });

    it('getWish should return promise and respond with allWishes"', function () {
        var resultWishes;

        httpBackendMock.whenGET("/publicApi/wish").respond(200, wishes);

        factory.getWish().then(function (result) {
            resultWishes = result;

        });
        httpBackendMock.flush();
        expect(factory.getWish().then).toBeDefined()
        expect(factory.getWish().success).toBeDefined()
        expect(resultWishes.data.length).toEqual(2);
        expect(resultWishes.data[0].title).toEqual("wish1")
    });

    it('removeWish should return promise and respond with removedwish"', function () {
        var resultWish;
        var removingwish = {id: 1, title: "removed"};
        httpBackendMock.whenDELETE(url + "/wishes/1").respond(200, removingwish);

        factory.removeWish(1).then(function (result) {
            resultWish = result;

        });
        httpBackendMock.flush();
        expect(factory.removeWish().then).toBeDefined()
        expect(factory.removeWish().success).toBeDefined()
        expect(resultWish.data.title).toEqual("removed")
    });

    it('createWish should return promise and respond with createdwish"', function () {
        var resultWish;
        var creatingwish = {title: "created"};
        httpBackendMock.whenPUT(url + "/1", creatingwish).respond(200, creatingwish);

        factory.createWish(creatingwish, "1").then(function (result) {
            resultWish = result;

        });
        httpBackendMock.flush();
        expect(factory.createWish().then).toBeDefined()
        expect(factory.createWish().success).toBeDefined()
        expect(resultWish.data.title).toEqual("created")
    });

    it('getFriendsList should return promise and respond with listOfFriends"', function () {
        var resultFriends;
        var friendsList = [{username: "friend1"}, {username: "friend2"}];
        httpBackendMock.whenGET(url + "/friends").respond(200, friendsList);

        factory.getFriendsList().then(function (result) {
            resultFriends = result;

        });
        httpBackendMock.flush();
        expect(factory.getFriendsList().then).toBeDefined()
        expect(factory.getFriendsList().success).toBeDefined()
        expect(resultFriends.data.length).toEqual(2)
        expect(resultFriends.data[0].username).toEqual("friend1")
    });

    it('getFriends should return promise and respond with list of his/her Friends"', function () {
        var resultFriends;
        var friendsList = [{username: "friend1"}, {username: "friend2"}];
        httpBackendMock.whenGET(url + "/friends/1").respond(200, friendsList);

        factory.getFriends("1").then(function (result) {
            resultFriends = result;

        });
        httpBackendMock.flush();
        expect(factory.getFriends().then).toBeDefined()
        expect(factory.getFriends().success).toBeDefined()
        expect(resultFriends.data.length).toEqual(2)
        expect(resultFriends.data[0].username).toEqual("friend1")
    });

    it('getWishFromUser should return promise and respond with his/her wishes"', function () {
        var resultWish;
        var wishList = [{title: "wish1"}, {title: "wish2"}];
        httpBackendMock.whenGET(url + "/wish/1").respond(200, wishList);

        factory.getWishFromUser("1").then(function (result) {
            resultWish = result;

        });
        httpBackendMock.flush();
        expect(factory.getWishFromUser().then).toBeDefined()
        expect(factory.getWishFromUser().success).toBeDefined()
        expect(resultWish.data[0].title).toEqual("wish1")
        expect(resultWish.data.length).toEqual(2)
    });

    it('getWishFromWishId should return promise and respond with wishe"', function () {
        var resultWish;
        var wish = {_id: 1, title: "wish1"};
        httpBackendMock.whenGET(url + "/wish/wish/1").respond(200, wish);

        factory.getWishFromWishId("1").then(function (result) {
            resultWish = result;

        });
        httpBackendMock.flush();
        expect(factory.getWishFromWishId().then).toBeDefined()
        expect(factory.getWishFromWishId().success).toBeDefined()
        expect(resultWish.data.title).toEqual("wish1")

    });

    it('getUserFromWishID should return promise and respond with user"', function () {
        var resultUser;
        var user = {_id: 1, username: "wisher"};
        httpBackendMock.whenGET(url + "/wish/user/100").respond(200, user);

        factory.getUserFromWishId("100").then(function (result) {
            resultUser = result;

        });
        httpBackendMock.flush();
        expect(factory.getUserFromWishId().then).toBeDefined()
        expect(factory.getUserFromWishId().success).toBeDefined()
        expect(resultUser.data.username).toEqual("wisher")

    });

    it('addFriendToList should return promise and respond with user"', function () {
        var resultfigure;
        var user = {_id: 1, username: "wisher"};
        httpBackendMock.whenPUT(url + "/addfriend/100").respond(200, 1);

        factory.addFriendToList("100", user).then(function (result) {
            resultfigure = result;

        });
        httpBackendMock.flush();
        expect(factory.addFriendToList().then).toBeDefined()
        expect(factory.addFriendToList().success).toBeDefined()
        expect(resultfigure.data).toEqual(1)

    });


});
