const read = async (req, res) => {
  res.status(200).json({ success: true, message: "assignments/read stub." });
};

module.exports = read;
