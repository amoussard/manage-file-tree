TestVisitor.prototype = new Visitor();
function TestVisitor() {
  this.nb_begin = 0;
  this.nb_end = 0;
  this.nb_before_sons = 0;
  this.nb_after_sons = 0;
}
TestVisitor.prototype.begin = function(node) {
  this.nb_begin++;
};
TestVisitor.prototype.getNbBegin = function() {
  return this.nb_begin;
};
TestVisitor.prototype.end = function(node) {
  this.nb_end++;
};
TestVisitor.prototype.getNbEnd = function() {
  return this.nb_end;
};
TestVisitor.prototype.visitBeforeSons = function(node) {
  this.nb_before_sons++;
};
TestVisitor.prototype.getNbBeforeSons = function() {
  return this.nb_before_sons;
};
TestVisitor.prototype.visitAfterSons = function(node) {
  this.nb_after_sons++;
};
TestVisitor.prototype.getNbAfterSons = function() {
  return this.nb_after_sons;
};
