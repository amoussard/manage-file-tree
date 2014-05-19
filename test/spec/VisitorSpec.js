describe("A visitor", function() {
  var visitor = new Visitor();

  it("is an object", function() {
    expect(visitor).not.toBe(undefined);
    expect(typeof visitor).toBe('object');
  });

  it("can be call on beginning", function() {
    expect(visitor.begin).toBeDefined();
    expect(visitor.begin()).toBeUndefined();
  });

  it("can be call on ending", function() {
    expect(visitor.end).toBeDefined();
    expect(visitor.end()).toBeUndefined();
  });

  it("can be call before continuing on each son", function() {
    expect(visitor.visitBeforeSons).toBeDefined();
    expect(visitor.visitBeforeSons()).toBeUndefined();
  });

  it("can be call after finishing each son", function() {
    expect(visitor.visitAfterSons).toBeDefined();
    expect(visitor.visitAfterSons()).toBeUndefined();
  });
});
