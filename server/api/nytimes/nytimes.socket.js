/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Nytimes = require('./nytimes.model');

exports.register = function(socket) {
  Nytimes.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Nytimes.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('nytimes:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('nytimes:remove', doc);
}