const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  let token = req.header('x-auth-token');

  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    token = parts.length === 2 ? parts[1] : parts[0];
  }

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user || decoded; // support both { user: {id} } and { id }
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    res.status(401).json({ msg: 'Invalid token' });
  }
};
