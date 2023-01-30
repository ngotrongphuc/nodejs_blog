const jwt = require('jsonwebtoken');

const secret = 'secret-key';

module.exports = {
  createToken: (user) => {
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email
    };

    return jwt.sign(payload, secret, { expiresIn: '1d' });
  },
  verifyToken: (token) => {
    return jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return { error: 'Token is not valid' };
      }

      return decoded;
    });
  },
  createRefreshToken: (user) => {
    const payload = {
      id: user.id,
      name: user.name
    };

    return jwt.sign(payload, secret, { expiresIn: '7d' });
  },
  verifyRefreshToken: (token) => {
    return jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return { error: 'Refresh token is not valid' };
      }

      return decoded;
    });
  },
};
