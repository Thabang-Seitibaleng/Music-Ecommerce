import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    role?: string;
  };
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ status: 'fail', message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'fallback_secret';

    const decoded = jwt.verify(token, secret) as { id: number; email: string; role?: string };
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(403).json({ status: 'fail', message: 'Invalid or expired token.' });
  }
};

// Role-Based Access Control Middleware
export const authorize = (allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ status: 'fail', message: 'Access denied. User role undefined.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ status: 'fail', message: 'Access denied. Insufficient permissions.' });
    }

    next();
  };
};