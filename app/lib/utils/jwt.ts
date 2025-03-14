import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';

export function generateToken(user: { id: string; email: string, first_name: string, }) {
    return jwt.sign({ id: user.id, email: user.email, first_name: user.first_name }, SECRET_KEY, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        console.error(error);
        return null;
    }
}