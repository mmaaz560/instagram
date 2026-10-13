export const errorhandler = (err, req, res, next) => {
    res.send(err.meassage)
}