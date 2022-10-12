const escapeHTML = string => {
  if (!string) {
    return undefined;
  }
  return string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

module.exports = escapeHTML;
