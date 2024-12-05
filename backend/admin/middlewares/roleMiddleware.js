const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
      const { user } = req;
  
      if (!user) {
        return res.status(403).json({ message: 'Access denied' });
      }
  
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }
  
      next();
    };
  };
  
  module.exports = roleMiddleware;
  