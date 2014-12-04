beforeEach(module('myAppRename.factories'));

describe('userFactory', function () {

  var scope, httpBackendMock, factory;
  var url = 'adminApi/userAdmin/';



  beforeEach(inject(function ($httpBackend,userFactory) {

    httpBackendMock=$httpBackend;
    factory=userFactory;
  }));

  it('getAllUsers should return promise and respond with String"', function () {

    httpBackendMock.whenGET(url).respond(200,"usersString");

    expect(factory.getAllUsers().then).toBeDefined()
    expect(factory.getAllUsers().success).toBeDefined()

    var promise=factory.getAllUsers();
    var theUsers;

    promise.then(function(users){
      theUsers=users;

    });
    httpBackendMock.flush();
    expect(theUsers instanceof String).toBeTruthy();
    expect(theUsers).toEqual("usersString");
  });

  //
  //it('removeUser return promise"', function () {
  //
  //  httpBackendMock.whenGET(url).respond(200,"OK");
  //
  //  expect(factory.getWiki("test").then).toBeDefined()
  //  expect(factory.getWiki("test").success).toBeDefined()
  //});
  //
  //it('getCategories return promise"', function () {
  //
  //  httpBackendMock.whenGET(url).respond(200,"OK");
  //
  //  expect(factory.getCategories().then).toBeDefined()
  //  expect(factory.getCategories().success).toBeDefined()
  //});
  //
  //it('getCategory return promise"', function () {
  //
  //  httpBackendMock.whenGET(url).respond(200,"OK");
  //
  //  expect(factory.getCategory("test").then).toBeDefined()
  //  expect(factory.getCategory("test").success).toBeDefined()
  //});
  //
  //it('findWiki return promise"', function () {
  //
  //  httpBackendMock.whenGET(url).respond(200,"OK");
  //
  //  expect(factory.findWiki("test").then).toBeDefined()
  //  expect(factory.findWiki("test").success).toBeDefined()
  //});
  //

});

