UpdateVisitor.prototype = new Visitor();

function UpdateVisitor(originPath) {
    this.path = [];
    this.origin = originPath;
}

UpdateVisitor.prototype.visitBeforeSons = function(node) {
    this.path.push(node.getValue());
};

UpdateVisitor.prototype.visitAfterSons = function(node) {
    this.path.pop();
};

UpdateVisitor.prototype.begin = function(node) {
  node.setPath(this.path.join("/") + node.getValue());
};

UpdateVisitor.prototype.end = function(node) {
};
