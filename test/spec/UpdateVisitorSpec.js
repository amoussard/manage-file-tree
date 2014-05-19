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
    node.add(['test_node', 'test_node_file.txt']);

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
    node.add(['test_node', 'test_node_file.txt']);

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
});
