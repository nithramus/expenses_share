class BaseMiddleware {
    isLogged(req, res, next) {
        if (req.session.connected === 1) {
            next();
        }
        res.status(400).send('You are not connected');
    }
}