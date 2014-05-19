function Tree(origin) {
  this.root = new Node(origin);
  this.attributes = {};
}

Tree.prototype.getRoot = function() {
    return this.root;
};
Tree.prototype.add = function(file) {
  var aFiles = file.split("/");

  this.root.add(aFiles);
};

Tree.prototype.accept = function(visitor) {
    this.root.accept(visitor, true);
};
