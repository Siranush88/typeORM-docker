const KEY = 'a11';
export const apiKeyValidator = (req, res, next) => {
    const apiKey = req.get('api-key');
    if (!apiKey || apiKey !== KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};
