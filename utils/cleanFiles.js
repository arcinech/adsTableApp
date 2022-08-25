const cleanFile = async filename => {
  try {
    if (filename) {
      await fs.unlinkSync(`${__dirname}/../public/images/${filename}`);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = cleanFile;
