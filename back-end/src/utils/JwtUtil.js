const jwt = require("jsonwebtoken");

class JwtUtil {
  static tokenSecret = "hackathon-token";
  static refreshTokenSecret = "hackathon-refresh-token";

  static generateAccessToken(user) {
    const payload = {
      id: user._id ?? user.id,
      email: user.email,
      username: user.username,
    };

    const options = { expiresIn: 300000 };

    return jwt.sign(payload, this.tokenSecret, options);
  }

  static verifyAccessToken(token) {
    try {
      const decoded = jwt.verify(token, this.tokenSecret);
      return { success: true, data: decoded };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.sendStatus(401);
    }

    const result = JwtUtil.verifyAccessToken(token);

    if (!result.success) {
      return res.status(403).json({ error: result.error });
    }

    req.user = result.data;
    next();
  }

  static generateRefreshToken(user) {
    const payload = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const options = { expiresIn: "5h" };

    return jwt.sign(payload, this.refreshTokenSecret, options);
  }

  static verifyRefreshToken(token) {
    try {
      const decoded = jwt.verify(token, this.refreshTokenSecret);
      return { success: true, data: decoded };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = JwtUtil;
