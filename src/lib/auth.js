import jwt from 'jsonwebtoken';

export function generateToken(user) {
    const payload = { id: user.id, email: user.email };
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        console.log('Generated JWT:', token);
        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        return null;
    }
}
