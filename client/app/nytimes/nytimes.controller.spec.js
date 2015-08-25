'use strict';

describe('Controller: NytimesCtrl', function () {

  // load the controller's module
  beforeEach(module('pocketFeederApp'));

  var NytimesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NytimesCtrl = $controller('NytimesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
