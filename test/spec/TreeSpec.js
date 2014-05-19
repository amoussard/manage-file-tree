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


describe("A tree", function() {
  var tree;


  it("is an object", function() {
    tree = new Tree("./");
    expect(tree).not.toBe(undefined);
    expect(typeof tree).toBe('object');
  });

  it("initialize a node at its creation", function() {
    tree = new Tree("./");

    var root = tree.getRoot();
    expect(root).not.toBe(undefined);
    expect(typeof root).toBe('object');
    expect(root.getValue()).toBe('./');
  });

  it("can add a son", function() {
    tree = new Tree("./");
    tree.add("test_son");

    expect(tree.getRoot().getSons().length).toBe(1);
  });

  it("can have many sons", function() {
    tree = new Tree("./");
    tree.add("test_son");
    tree.add("test_son2");
    tree.add("test_son3");

    expect(tree.getRoot().getSons().length).toBe(3);
  });

  it("can add grand son on an existing son", function() {
    tree = new Tree("./");
    tree.add("test_son");
    tree.add("test_son/test_son2");

    expect(tree.getRoot().getSons().length).toBe(1);
  });

  it("can add grand son on an non-existing son", function() {
    tree = new Tree("./");
    tree.add("test_son/test_son2");

    expect(tree.getRoot().getSons().length).toBe(1);
  });

  it("can accept a visitor", function() {
    tree = new Tree("./");
    tree.add("test_son_level1_1/test_son_level2_1");
    tree.add("test_son_level1_1/test_son_level2_2");
    tree.add("test_son_level1_2/test_son_level2_3");
    tree.add("test_son_level1_2/test_son_level2_4");

    var testVisitor = new TestVisitor();
    expect(tree.accept).toBeDefined();
    tree.accept(testVisitor, true);
    expect(testVisitor.getNbBegin()).toBe(6);
    expect(testVisitor.getNbEnd()).toBe(6);
    expect(testVisitor.getNbBeforeSons()).toBe(2);
    expect(testVisitor.getNbAfterSons()).toBe(2);
  });
});
