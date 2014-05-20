describe("A FindVisitor", function() {
  var visitor;
  var node = new Node('test_node');
  node.add(['test_node_dir_1', 'file1.txt']);
  node.add(['test_node_dir_1', 'file2.mustache']);
  node.add(['test_node_dir_2', 'file3.tpl']);
  node.add(['test_node_dir_2', 'file4.php']);
  node.add(['test_node_dir_2', 'file5.mustache']);
  node.add(['file6.mustache']);
  node.add(['file7.html']);
  node.add(['file8.php']);
  node.accept(new UpdateVisitor());

  it("is an object", function() {
    visitor = new FindVisitor();

    expect(visitor).not.toBe(undefined);
    expect(typeof visitor).toBe('object');
  });

  it("can find all directories", function() {
    visitor = new FindVisitor([
      {name: "type", value: "directory"}
    ]);

    node.accept(visitor);

    expect(visitor.getResults()).toEqual([
      'test_node',
      'test_node/test_node_dir_1',
      'test_node/test_node_dir_2'
    ]);
  });

  it("can find all mustache files", function() {
    visitor = new FindVisitor([
      {name: "type", value: "mustache"}
    ]);

    node.accept(visitor);

    expect(visitor.getResults()).toEqual([
      'test_node/test_node_dir_1/file2.mustache',
      'test_node/test_node_dir_2/file5.mustache',
      'test_node/file6.mustache'
    ]);
  });

  it("can find all files with php extension", function() {
    visitor = new FindVisitor([
      {name: "extension", value: "php"}
    ]);

    node.accept(visitor);

    expect(visitor.getResults()).toEqual([
      'test_node/test_node_dir_2/file4.php',
      'test_node/file8.php'
    ]);
  });

  it("can find all files with php extension and type file", function() {
    visitor = new FindVisitor([
      {name: "extension", value: "php"},
      {name: "type", value: "file"}
    ]);

    node.accept(visitor);

    expect(visitor.getResults()).toEqual([
      'test_node/test_node_dir_2/file4.php',
      'test_node/file8.php'
    ]);
  });

  it("can find all files with mustache extension and type file", function() {
    visitor = new FindVisitor([
      {name: "extension", value: "mustache"},
      {name: "type", value: "file"}
    ]);

    node.accept(visitor);

    expect(visitor.getResults()).toEqual([]);
  });

});
