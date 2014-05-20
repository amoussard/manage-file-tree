function FindVisitor(aFilters) {
  this.results = [];
  this.filters = aFilters;
}

FindVisitor.prototype.getResults = function() {
  return this.results;
};

FindVisitor.prototype.visitBeforeSons = function(node) {
};

FindVisitor.prototype.visitAfterSons = function(node) {
};

FindVisitor.prototype.begin = function(node) {
  var bReturn = true;
  for (var i in this.filters) {
    var filter = this.filters[i];
    switch (filter.name) {
      case 'extension':
        if (node.getExtension() !== filter.value) {
          bReturn = false;
        }
        break;
      case 'type':
        if (node.getType() !== filter.value) {
          bReturn = false;
        }
        break;
    }
  }
  if (bReturn) {
    this.results.push(node.getPath());
  }
};

FindVisitor.prototype.end = function(node) {
};
