const read = async (req, res) => {
  res.status(200).json({ success: true, message: "users/read stub." });
};

module.exports = read;
