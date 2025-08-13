const { userModel, validateUser } = require("../models/user.model");
const bcrypt = require("bcrypt");
const { genToken } = require("../utils/jwt");
const axios = require('axios');

module.exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let error = validateUser({ name, email, password });

    if (error) {
      return res.status(400).json({
        error,
      });
    }

    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(409).json({
        error: "user already exist",
      });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await userModel.create({ name, email, password: hashedPassword });
    const { password: _, ...userWithoutPass } = user.toObject();

    const token = genToken(userWithoutPass);

    res.status(201).json({
      message: "User registered",
      user: userWithoutPass,
      token,
    });
  } catch (error) {
    res.status(500),
      json({
        error: error.message,
      });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password) {
      return res.status(400).json({
        error: "password is required",
      });
    }

    let error = validateUser({ name: "testname", email, password });

    if (error) {
      return res.status(400).json({
        error,
      });
    }

    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const { password: _, ...userWithoutPass } = user.toObject();

    const token = genToken(userWithoutPass);

    res.status(200).json({
      message: "Login succeess",
      user: userWithoutPass,
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.googleLogin = async (req, res) => {
  try {
        
        const {accessToken} = req.body
        if(!accessToken) return res.status(400).json({error: "refresh token is required"}) 
        
        const {data} = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        
        const {name, email, picture: profileImage,} = data
        
         let error = validateUser({ name, email });

          if (error) {
            return res.status(400).json({
              error,
            });
          }

        let user = await userModel.findOne({email})

        if(!user){
            user = await userModel.create({name, email, profileImage, authProvider:'google'})
        }
        const token = genToken(user.toObject())

        res.status(200).json({
            message: "login success", 
            token,
            user
        })

    } catch (err) {
        res.status(500).json({error: err.message})
    }
};

module.exports.getCurrentUser = (req, res) => {
  const user = req.user
  res.status(200).json({ user });
};



