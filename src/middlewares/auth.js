export function authRole(role) {
    return function(req, res, next) {
        if (req.user?.role !== role) {
            return res.status(403).send('Forbidden');
        }
        next();
    }
}