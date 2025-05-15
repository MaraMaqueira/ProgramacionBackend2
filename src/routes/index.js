import { Router } from 'express';
import { authRole } from '../middlewares/auth.js';
import UserDTO from '../dto/user.dto.js';
import UserRepository from '../dao/userRepository.js';
import { sendResetEmail, verifyAndResetPassword } from '../services/auth.service.js';

const router = Router();
const userRepo = new UserRepository();

router.get('/current', async (req, res) => {
    const user = req.user;
    res.json(new UserDTO(user));
});

router.post('/reset-password', sendResetEmail);
router.post('/verify-reset', verifyAndResetPassword);

router.post('/product', authRole('admin'), (req, res) => res.send('Product created'));
router.post('/cart', authRole('user'), (req, res) => res.send('Product added to cart'));

export default router;