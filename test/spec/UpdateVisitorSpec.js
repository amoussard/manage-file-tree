UpdateVisitor.prototype.getPath = function() {
  return this.path;
};


describe("A UpdateVisitor", function() {
  var visitor;
  var node;

  it("is an object", function() {
    visitor = new UpdateVisitor();

    expect(visitor).not.toBe(undefined);
    expect(typeof visitor).toBe('object');
  });

  it("can be call on beginning", function() {
    visitor = new UpdateVisitor();
    node = new Node('test_node');

    expect(visitor.begin).toBeDefined();

    visitor.begin(node);

    expect(visitor.getPath().length).toBe(0);
    expect(node.getPath()).toBe('test_node');
  });

  it("can be call before continuing on each son", function() {
    visitor = new UpdateVisitor();
    node = new Node('test_node');
    node.add(['test_node_dir', 'test_node_file.txt']);

    expect(visitor.visitBeforeSons).toBeDefined();

    visitor.begin(node);
    visitor.visitBeforeSons(node);

    expect(visitor.getPath().length).toBe(1);
    expect(visitor.getPath()).toContain('test_node');
    expect(node.getPath()).toBe('test_node');
  });

  it("can be call after finishing each son", function() {
    visitor = new UpdateVisitor();
    node = new Node('test_node');
    node.add(['test_node_dir', 'test_node_file.txt']);

    expect(visitor.visitAfterSons).toBeDefined();

    visitor.begin(node);
    visitor.visitBeforeSons(node);
    visitor.visitAfterSons(node);

    expect(visitor.getPath().length).toBe(0);
    expect(node.getPath()).toBe('test_node');
  });

  it("can be call on ending", function() {
    visitor = new UpdateVisitor();
    node = new Node('test_node');

    expect(visitor.end).toBeDefined();

    visitor.begin(node);
    visitor.visitBeforeSons(node);
    visitor.visitAfterSons(node);
    visitor.end(node);

    expect(visitor.getPath().length).toBe(0);
    expect(node.getPath()).toBe('test_node');
  });

  it("will update all path of the tree", function() {
    visitor = new UpdateVisitor();
    node = new Node('test_node');
    node.add(['test_node_dir', 'file1.txt']);
    node.add(['test_node_dir', 'file2.mustache']);

    node.accept(visitor);

    expect(node.getPath()).toBe('test_node');

    var child = node.getSons()[0];
    expect(child.getPath()).toBe('test_node/test_node_dir');

    var firstGrandChild = child.getSons()[0];
    expect(firstGrandChild.getPath()).toBe('test_node/test_node_dir/file1.txt');
    var secondGrandChild = child.getSons()[1];
    expect(secondGrandChild.getPath()).toBe('test_node/test_node_dir/file2.mustache');
  });

  it("will update all path of the tree with an origin", function() {
    var origin = 'origin';
    visitor = new UpdateVisitor(origin);
    node = new Node('test_node');
    node.add(['test_node_dir', 'file1.txt']);
    node.add(['test_node_dir', 'file2.mustache']);

    node.accept(visitor);

    expect(node.getPath()).toBe(origin + '/test_node');

    var child = node.getSons()[0];
    expect(child.getPath()).toBe(origin + '/test_node/test_node_dir');

    var firstGrandChild = child.getSons()[0];
    expect(firstGrandChild.getPath()).toBe(origin + '/test_node/test_node_dir/file1.txt');
    var secondGrandChild = child.getSons()[1];
    expect(secondGrandChild.getPath()).toBe(origin + '/test_node/test_node_dir/file2.mustache');
  });

  it("will update all extension of the tree", function() {
    visitor = new UpdateVisitor();
    node = new Node('test_node');
    node.add(['test_node_dir', 'file1.txt']);
    node.add(['test_node_dir', 'file2.mustache']);

    node.accept(visitor);

    expect(node.getExtension()).toBe(false);

    var child = node.getSons()[0];
    expect(child.getExtension()).toBe(false);

    var firstGrandChild = child.getSons()[0];
    expect(firstGrandChild.getExtension()).toBe('txt');
    var secondGrandChild = child.getSons()[1];
    expect(secondGrandChild.getExtension()).toBe('mustache');
  });

  it("will update all file type of the tree", function() {
    visitor = new UpdateVisitor();
    node = new Node('test_node');
    node.add(['test_node_dir', 'file1.txt']);
    node.add(['test_node_dir', 'file2.mustache']);

    node.accept(visitor);

    expect(node.getType()).toBe('directory');

    var child = node.getSons()[0];
    expect(child.getType()).toBe('directory');

    var firstGrandChild = child.getSons()[0];
    expect(firstGrandChild.getType()).toBe('file');
    var secondGrandChild = child.getSons()[1];
    expect(secondGrandChild.getType()).toBe('mustache');
  });
});
