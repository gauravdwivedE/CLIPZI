const jwt = require('jsonwebtoken')

module.exports.getLoginUser = (req, res, next) => {
    try {
        
        let token = req.headers['authorization']?.split(' ')[1];
        console.log(token);
        
        if(token == null || token == 'null' || !token) return next()
                    
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        if(!decoded) return res.status(401).json({error: "Invalid token"})

        req.user = decoded      
         next()

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
       
    }
}

