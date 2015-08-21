/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Pocket = require('./pocket.model');

exports.register = function(socket) {
  Pocket.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Pocket.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('pocket:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('pocket:remove', doc);
}