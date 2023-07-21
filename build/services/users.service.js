import { AppDataSource } from '../data-source.js';
import { UserEntity } from '../users.entity.js';
AppDataSource.initialize().then(() => { console.log('Connected to DataBase successfully'); }).catch((error) => console.log(error));
export const userRepository = AppDataSource.getRepository(UserEntity);
const KEY = 'a11';
export const apiKeyValidator = (req, res, next) => {
    const apiKey = req.get('api-key');
    if (!apiKey || apiKey !== KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};
