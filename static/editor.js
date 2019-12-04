// an editing framework for project ACTOON
// 2019.11.28: dongkyun yoo (me@sokdak.me)
class editor {
  constructor(id) {
    this.canvasId = id
  }

  // initializing editing framework
  // Parameters:
  //   width  = canvas initial width
  //   height = canvas initial height
  init(width, height) {
    this.resizeCanvas(width, height);
    this.canvas = new fabric.Canvas(this.canvasId);

    console.log('canvas has been initialized with id ' + this.canvasId);
  }

  // resizing the canvas
  // Parameters:
  //   width  = canvas initial width
  //   height = canvas initial height
  resizeCanvas(width, height) {
    $('#' + this.canvasId).attr('width', width).attr('height', height);
    // rest api to set default canvas(movie) resolution
  }

  // adding the image into canvas
  // Parameters:
  //   imgUrl   = URL of Image
  //   callback = callback for fromURL methods, providing null results default action.
  addImage(imgUrl, callback) {
    let _image = fabric.Image;
    let _imageName = imgUrl.split('/')[imgUrl.split('/').length - 1];

    if (callback == null)
      _image.fromURL(imgUrl, $.proxy(this.addImageDefaultCallback, this));
    else _image.fromURL(imgUrl, $.proxy(callback, this));
  }

  // removing image
  // Parameter:
  //   imgName = name of image (unique)
  removeImage(imgName) {
    console.log('removing image from canvas: imgName ' + imgName)
    this.canvas.remove(this.canvas.getItemByName(imgName));
    // rest api ajax call to remove image
  }

  // rearrange layer sequence with provided image name
  // Parameter:
  //   imgName = name of image (unique)
  moveLayer(imgName, sequence) {
    console.log('moving layer sequence to ' + sequence + ', imgName ' + imgName)
    // this.canvas.
  }

  // getting the current canvas information
  getImageInfo() {

  }

  // default callback for addImage method. do not straight call from context
  addImageDefaultCallback(img) {
    console.log(this)
    
    let tmp = img._element.currentSrc.split('/');

    img.set({
      name: tmp[tmp.length - 1]
    });

    this.canvas.add(img).renderAll();
    this.currentImgIndex++;
  }
}