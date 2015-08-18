'use strict';

// Deletes a session from the DB.
exports.destroy = function(req, res) {
  req.session.destroy();
  res.send(204);
};
