var FileTree = function() {
  this.tree = undefined;
  this.updateVisitor = new UpdateVisitor();
  this.origin = "";

  this.updateTree = function() {
    this.tree.accept(this.updateVisitor);
  };

};

FileTree.prototype.init = function(origin, aInitFiles) {
  this.origin = origin;
  this.tree = new Tree(origin);
  if (aInitFiles) {
    for(var i in aInitFiles) {
      this.tree.add(aInitFiles[i]);
    }
  }
};

FileTree.prototype.setTree = function(aFiles) {
  for(var i in aFiles) {
    this.tree.add(aFiles[i]);
  }
  this.updateTree();
};

FileTree.prototype.acceptVisitor = function(visitor) {
  this.tree.accept(visitor);
};

FileTree.prototype.find = function(aFilters) {
  var findVisitor = new FindVisitor(aFilters);
  this.tree.accept(findVisitor);
  return findVisitor.getResults();
};
