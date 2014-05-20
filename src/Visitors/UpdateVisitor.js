UpdateVisitor.prototype = new Visitor();

function UpdateVisitor(originPath) {
  this.path = [];
  this.origin = originPath;

  this.computePath = function(node) {
    var path = "";
    if (this.origin) {
      path += this.origin + "/";
    }
    if (this.path.length) {
      path += this.path.join("/") + "/";
    }
    path += node.getValue();

    return path;
  };

  this.computeExtension = function(node) {
    if (!node.isLeaf()) {
      return false;
    }

    var aFilePart = node.getValue().split('.');
    if (aFilePart.length < 2) {
      return "";
    }

    return aFilePart.pop();
  };

  this.computeType = function (node) {
    var type;
    switch (node.getExtension()) {
      case false:
        type = 'directory';
        break;
      case 'mustache':
        type = 'mustache';
        break;
      default:
        type = "file";
    }
    return type;
  };
}

UpdateVisitor.prototype.visitBeforeSons = function(node) {
  this.path.push(node.getValue());
};

UpdateVisitor.prototype.visitAfterSons = function(node) {
  this.path.pop();
};

UpdateVisitor.prototype.begin = function(node) {
  node.setPath(this.computePath(node));
  node.setExtension(this.computeExtension(node));
  node.setType(this.computeType(node));
};

UpdateVisitor.prototype.end = function(node) {
};
