module.exports = {
  hasImgExtension: function(imgLink) {
    const extension = imgLink.slice(imgLink.length - 4) ;
    if (extension === '.jpg' || extension === ".png" || extension === ".gif" || extension === "jpeg") {
      return true;
    }
    return false;
  }
}