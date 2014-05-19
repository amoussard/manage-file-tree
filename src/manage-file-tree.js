var FileTree = (function() {
  var tree;
  var updateVisitor = new UpdateVisitor();
  var origin;

  var init = function(origin, aInitFiles) {
    origin = origin;
    tree = new Tree(origin);
    if (aInitFiles) {
      for(var i in aInitFiles) {
        tree.add(aInitFiles[i]);
      }
    }
  };

  var setTree = function(aFiles) {
    for(var i in aFiles) {
      tree.add(aFiles[i]);
    }
    updateTree();
  };

  var updateTree = function() {
    tree.accept(updateVisitor);
  };

  var acceptVisitor = function(visitor) {
    tree.accept(visitor);
  };

  return {
    init: this.init,
    setTree: this.setTree,
    acceptVisitor: this.acceptVisitor
  };

}());
