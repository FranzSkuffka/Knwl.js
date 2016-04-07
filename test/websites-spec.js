var Knwl = require('../knwl');
var knwl = new Knwl();

//Test Link Detection
describe("website", function () {
  it("should detect a normal website url", function () {
    knwl.init("Follow me on twitter at www.twitter.com");
    var output = knwl.get("websites");
    expect(output[0]).toBe("www.twitter.com");
  });

  it("should detect a normal website url without subdomain", function () {
    knwl.init("Follow me on twitter at twitter.com");
    var output = knwl.get("websites");
    expect(output[0]).toBe("twitter.com");
  });

  it("should detect a website within braces", function () {
    knwl.init("I work at some company (some-company.com)");
    var output = knwl.get("websites");
    expect(output[0]).toBe("some-company.com");
  });

});
