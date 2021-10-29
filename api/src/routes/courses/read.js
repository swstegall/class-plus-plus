const read = async (req, res) => {
  res.status(200).json({ success: true, message: "courses/read stub." });
};

module.exports = read;
