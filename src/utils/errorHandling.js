export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(error =>{
            return res.json({
                message: error.message,
                stack: error.stack,
                error
            })
        })
    }
}