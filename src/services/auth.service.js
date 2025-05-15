import jwt from 'jsonwebtoken';
import UserRepository from '../dao/userRepository.js';
import { sendMail } from '../utils/mailer.js';
import config from '../config/config.js';

const userRepo = new UserRepository();

export async function sendResetEmail(req, res) {
    const { email } = req.body;
    const user = await userRepo.findByEmail(email);
    if (!user) return res.sendStatus(404);

    const token = jwt.sign({ email }, config.jwtSecret, { expiresIn: '1h' });
    const link = `http://localhost:${config.port}/reset/${token}`;
    await sendMail(email, 'Reset Password', `<a href="${link}">Reset</a>`);
    res.send('Email sent');
}

export async function verifyAndResetPassword(req, res) {
    const { token, newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        const user = await userRepo.findByEmail(decoded.email);
        if (user.password === newPassword) return res.status(400).send('New password must be different');
        await userRepo.updatePassword(user._id, newPassword);
        res.send('Password updated');
    } catch {
        res.status(401).send('Token expired');
    }
}