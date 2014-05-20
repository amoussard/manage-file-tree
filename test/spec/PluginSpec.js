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


describe("ManageFileTree", function() {
  it("can receive a visitor", function() {
    visitor = new TestVisitor();
    
    FileTree.init(".", []);
    FileTree.setTree([
      "test_son_level1_1/test_son_level2_1",
      "test_son_level1_1/test_son_level2_2",
      "test_son_level1_2/test_son_level2_3",
      "test_son_level1_2/test_son_level2_4"
    ]);
    FileTree.acceptVisitor(visitor);

    expect(testVisitor.getNbBegin()).toBe(6);
    expect(testVisitor.getNbEnd()).toBe(6);
    expect(testVisitor.getNbBeforeSons()).toBe(2);
    expect(testVisitor.getNbAfterSons()).toBe(2);
  });
});
