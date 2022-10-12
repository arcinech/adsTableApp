const fs = require('fs');
const path = require('path');

const cleanFile = async filename => {
  try {
    if (filename) {
      await fs.unlinkSync(path.join(__dirname, `../public/uploads/${filename}`));
      fs.unlinkSync;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = cleanFile;
