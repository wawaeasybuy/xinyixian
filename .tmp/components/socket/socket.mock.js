'use strict';

angular.module('socketMock', []).factory('socket', function () {
  return {
    socket: {
      connect: function () {},
      on: function () {},
      emit: function () {},
      receive: function () {}
    },

    syncUpdates: function () {},
    unsyncUpdates: function () {}
  };
});
//# sourceMappingURL=socket.mock.js.map
