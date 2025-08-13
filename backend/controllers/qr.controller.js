const { qrModel, validateQr } = require("../models/qr.model");
const QRCode = require("qrcode");
const { urlModel } = require("../models/url.model");

module.exports.generateQr = async (req, res) => {
  try {
    const createdBy = req.user._id;
    const { url } = req.body || {};

    const error = validateQr({ url, createdBy });

    if (error) {
      return res.status(400).json({
        error,
      });
    }

    let generatedQr = await qrModel.findOne({ url, createdBy });
    if (generatedQr) {
      return res.status(409).json({
        error: "Qr code already exist for this url",
      });
    }

    const qrcode = await QRCode.toDataURL(url);
    generatedQr = await qrModel.create({ url, qrcode, createdBy });

    res.status(201).json({
      message: "QR code generated",
      generatedQr,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.generateQrForUrl = async (req, res) => {
  try {
    const { id } = req.body || {};

    if (!id) {
      return res.status(400).json({
        error: "Shortened id is missing ",
      });
    }

    const shortened = await urlModel.findOne({ _id: id });

    if (!shortened) {
      return res.status(404).json({
        error: "shortened not found",
      });
    }

    if (shortened?.qrImage) {
      return res.status(409).json({
        error: "Qr code already exist for this shortened",
      });
    }

    const qrcode = await QRCode.toDataURL(shortened.originalUrl);

    shortened.qrImage = qrcode;
    await shortened.save();

    res.status(201).json({
      message: "QR code generated",
      qrImage: qrcode,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getAllGeneratedQrs = async (req, res) => {
  try {
    const createdBy = req?.user._id;
    const qrs = await qrModel.find({ createdBy }).sort({createdAt: -1});
    
    res.status(200).json({
      message: "QR codes fetched",
      qrs,
    });
  } catch (error) {
    res.status(500).json({ error : error.message});
  }
};

module.exports.deleteQR = async (req, res) => {
  try {
    const _id = req.params.id
    const createdBy = req.user._id

    const deletedQR = await qrModel.deleteOne({createdBy, _id})
   
    if (!deletedQR.deletedCount) {
      return res.status(500).json({
        error: "Error while deleting the Shortened URL",
      });
    }

    res.status(200).json({
      message: "QR code deleted"
    })

  } catch (error) {
    res.status(500).json({
      error: error
    })
  }
}

module.exports.qrSummary = async (req, res) => {
  try {
    const createdBy = req.user._id
    const count = await qrModel.countDocuments({createdBy})

    res.status(200).json({
      data: {TotalQRCount: count}
    })
  } catch (error) {
    res.status(500).json({
      error: error
    })
  }
}
