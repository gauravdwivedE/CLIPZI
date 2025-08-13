const { urlModel, validateUrl } = require("../models/url.model");
const { customAlphabet } = require("nanoid");
const bcrypt = require("bcrypt");

module.exports.createShortened = async (req, res) => {
  try {
    const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz123456789", 6);

    const createdBy = req?.user?._id;
    let { originalUrl, password, expireAfterTime, startAfterTime, oneTime } =
      req.body;

    startAfterTime = startAfterTime ? new Date(startAfterTime) : undefined;
    expireAfterTime = expireAfterTime ? new Date(expireAfterTime) : undefined;

    const error = validateUrl({
      originalUrl,
      password,
      createdBy,
      startAfterTime,
      expireAfterTime,
      oneTime,
    });
    if (error) return res.status(400).json({ error });

    if ((password || expireAfterTime || startAfterTime) && !createdBy) {
      return res.status(401).json({
        error: "This action may only done if you are loggedin",
      });
    }

    const now = new Date();

    if (startAfterTime && startAfterTime < now) {
      return res
        .status(400)
        .json({ error: "startAfterTime can't be less than current date time" });
    }

    if (
      startAfterTime &&
      expireAfterTime &&
      startAfterTime >= expireAfterTime
    ) {
      return res
        .status(400)
        .json({
          error:
            "expireAfterTime can't be less than or equal to startAfterTime",
        });
    }

    if (createdBy) {
      let shortened = await urlModel.findOne({ originalUrl, createdBy });
      if (shortened) {
        return res.status(409).json({
          error: "This url's shortened already exist ",
        });
      }
    }

    let shortCode;
    let isUnique = false;

    for (let i = 0; i < 6; i++) {
      let code = nanoid();
      shortened = await urlModel.findOne({ shortCode: code });

      if (!shortened) {
        shortCode = code;
        isUnique = true;
        break;
      }
    }

    if (!isUnique) {
      return res.status(500).json({
        error: "Error while generating shottened please try again",
      });
    }

    let hashedPass;
    if (password) {
      const salt = await bcrypt.genSalt();
      hashedPass = await bcrypt.hash(password, salt);
    }

    shortened = await urlModel.create({
      originalUrl,
      password: hashedPass,
      createdBy,
      shortCode,
      expireAfterTime,
      startAfterTime,
      oneTime,
    });

    res.status(201).json({
      message: "URL shorted",
      shortened,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.getAllShortened = async (req, res) => {
  try {
    const createdBy = req.user._id;
    const shortened = await urlModel
      .find({ createdBy })
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "data fetched",
      shortened,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

module.exports.getShortened = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const { password } = req.body || {};

    const shortened = await urlModel.findOne({ shortCode });

    if (!shortened) {
      return res.status(404).json({
        error: "Shortened URL not found",
      });
    }

    if (shortened.password) {
      if (!password) {
        return res
          .status(401)
          .json({ error: "Password required for this URL" });
      }

      const isMatch = await bcrypt.compare(password, shortened.password);

      if (!isMatch) {
        return res.status(403).json({ error: "Incorrect password" });
      }
    }

    if (shortened.oneTime) {
      if (shortened.clicks > 0) {
        return res.status(410).json({
          error: "This link has expired.",
        });
      }
    }

    if (
      shortened.expireAfterTime &&
      new Date() > new Date(shortened.expireAfterTime)
    ) {
      return res.status(410).json({
        error: "This link has expired.",
      });
    }

    if (
      shortened.startAfterTime &&
      new Date() < new Date(shortened.startAfterTime)
    ) {
      return res.status(410).json({
        error: "This link has not started yet.",
      });
    }

    shortened.clicks = (shortened.clicks || 0) + 1;
    await shortened.save();

    res.status(200).json({
      message: "shortened fetched",
      originalUrl: shortened.originalUrl,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.disableUrl = async (req, res) => {
  try {
    const createdBy = req.user._id;
    const _id = req.params.id;

    const shortened = await urlModel.findOne({ _id, createdBy });

    if (!shortened) {
      return res.status(404).json({
        error: "Shortened URL not found",
      });
    }

    if (!shortened.isActive) {
      return res.status(409).json({
        error: "Link is already disabled",
      });
    }

    shortened.isActive = false;
    await shortened.save();

    res.status(200).json({
      message: "Link disabled",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.enableUrl = async (req, res) => {
  try {
    const createdBy = req.user._id;
    const _id = req.params.id;

    const shortened = await urlModel.findOne({ _id, createdBy });

    if (!shortened) {
      return res.status(404).json({
        error: "Shortened URL not found",
      });
    }

    if (shortened.isActive) {
      return res.status(409).json({
        error: "Link is already enabled",
      });
    }

    shortened.isActive = true;
    await shortened.save();

    res.status(200).json({
      message: "Link enabled",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.updatePassword = async (req, res) => {
  try {
    const createdBy = req.user._id;
    const _id = req.params.id;
    const { password } = req.body || {};

    if (password && password.length < 3) {
      return res.status(400).json({
        error: "Password length must be greater than 3 characters long",
      });
    }

    const shortened = await urlModel.findOne({ _id, createdBy });

    if (!shortened) {
      return res.status(404).json({
        error: "Shortened URL not found",
      });
    }

    if (password) {
      const salt = await bcrypt.genSalt();
      hashedPass = await bcrypt.hash(password, salt);

      shortened.password = hashedPass;
    } else {
      shortened.password = null;
    }
    await shortened.save();

    res.status(200).json({
      message: "Password updated",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.deleteShortened = async (req, res) => {
  try {
    const createdBy = req.user._id;
    const _id = req.params.id;

    const shortened = await urlModel.deleteOne({ _id, createdBy });

    if (!shortened.deletedCount) {
      return res.status(500).json({
        error: "Error while deleting the Shortened URL",
      });
    }

    res.status(200).json({
      message: "Shortened URL deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.shortenedsSummary = async (req, res) => {
  try {
    const createdBy = req.user._id;
    const [
      totalCount,
      activeTrueCount,
      activeFalseCount,
      expireAfterTimeCount,
      passwordCount,
      startAfterTimeCount,
      oneTimeTrueCount,
    ] = await Promise.all([
      urlModel.countDocuments({ createdBy }),
      urlModel.countDocuments({ createdBy, isActive: true }),
      urlModel.countDocuments({ createdBy, isActive: false }),
      urlModel.countDocuments({
        createdBy,
        expireAfterTime: { $exists: true, $ne: null },
      }),
      urlModel.countDocuments({
        createdBy,
        password: { $exists: true, $ne: null },
      }),
      urlModel.countDocuments({
        createdBy,
        startAfterTime: { $exists: true, $ne: null },
      }),
      urlModel.countDocuments({ createdBy, oneTime: true }),
    ]);

    res.json({
      data: {
        totalCount,
        activeTrueCount,
        activeFalseCount,
        expireAfterTimeCount,
        passwordCount,
        startAfterTimeCount,
        oneTimeTrueCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
