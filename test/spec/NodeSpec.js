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


describe("A node", function() {
  var node;

  it("is an object", function() {
    node = new Node();

    expect(node).not.toBe(undefined);
    expect(typeof node).toBe('object');
  });

  it("can be created with a value", function() {
    node = new Node("test");

    expect(node.getValue()).toBe('test');
  });

  it("can be created without a value", function() {
    node = new Node();

    expect(node.getValue()).toBe('./');
  });

  it("have no sons at its creation", function() {
    node = new Node("test");

    expect(node.getSons().length).toBe(0);
  });

  it("is a leaf at its creation", function() {
    node = new Node("test");

    expect(node.isLeaf()).toBe(true);
  });

  it("can add a son", function() {
    node = new Node("test");
    node.add(["test_son"]);

    expect(node.getSons().length).toBe(1);
  });

  it("can have many sons", function() {
    node = new Node("test");
    node.add(["test_son"]);
    node.add(["test_son2"]);
    node.add(["test_son3"]);

    expect(node.getSons().length).toBe(3);
  });

  it("can add grand son on an existing son", function() {
    node = new Node("test");
    node.add(["test_son"]);
    node.add(["test_son", "test_son2"]);

    expect(node.getSons().length).toBe(1);
  });

  it("can add grand son on an non-existing son", function() {
    node = new Node("test");
    node.add(["test_son", "test_son2"]);

    expect(node.getSons().length).toBe(1);
  });

  it("can accept a visitor", function() {
    node = new Node("test");
    node.add(["test_son_level1_1", "test_son_level2_1"]);
    node.add(["test_son_level1_1", "test_son_level2_2"]);
    node.add(["test_son_level1_2", "test_son_level2_3"]);
    node.add(["test_son_level1_2", "test_son_level2_4"]);

    var testVisitor = new TestVisitor();
    expect(node.accept).toBeDefined();
    node.accept(testVisitor, true);
    expect(testVisitor.getNbBegin()).toBe(6);
    expect(testVisitor.getNbEnd()).toBe(6);
    expect(testVisitor.getNbBeforeSons()).toBe(2);
    expect(testVisitor.getNbAfterSons()).toBe(2);
  });
});
