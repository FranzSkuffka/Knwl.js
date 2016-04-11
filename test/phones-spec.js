var Knwl = require('../knwl');
var germanKnwl = new Knwl('DE');

// Test international Phone Number Detection
describe("Country phone number detection", function () {

    it("should detect a german mobile number ", function () {
        germanKnwl.init("My phone number is +49 160 1234 524");
        var output = germanKnwl.get("phones");
        expect(output.length).toBe(1);
        expect(output[0].number).toBe('+491601234524');
    });

    it("should detect a number that is from Ghana", function () {
        germanKnwl.init("My phone number is +233302665095");
        var output = germanKnwl.get("phones");
        expect(output.length).toBe(1);
        expect(output[0].number).toBe('+233302665095');
    });

    it("should detect multiple different numbers", function () {
        germanKnwl.init("My phone number is +233302665095. His number is +49 160 1234 524");
        var output = germanKnwl.get("phones");
        expect(output.length).toBe(2);
        expect(output[0].number).toBe('+233302665095');
        expect(output[1].number).toBe('+491601234524');
    });

    it("should detect phone numbers from USA", function () {
        germanKnwl.init("The phone number of my friend from the USA is is +1-541-754-3010 ");
        var output = germanKnwl.get("phones");
        expect(output.length).toBe(1);
        expect(output[0].number).toBe('+15417543010');
    });

    it("should detect a german mobile number ", function () {
        germanKnwl.init("My phone number is 0160 1234 524");
        var output = germanKnwl.get("phones");
        expect(output.length).toBe(1);
        expect(output[0].number).toBe('+491601234524');
    });

    it("should detect two numbers with linebreak", function () {
        germanKnwl.init("My phone number is 0160 1234 524\n +49 160 1223 524");
        var output = germanKnwl.get("phones");
        expect(output.length).toBe(2);
        expect(output[0].number).toBe('+491601234524');
        expect(output[1].number).toBe('+491601223524');
    });

var usKnwl = new Knwl('US');

    it("should detect a us mobile number ", function () {
        usKnwl.init("My phone number is (541) 754-3010  ");
        var output = usKnwl.get("phones");
        expect(output.length).toBe(1);
        expect(output[0].number).toBe('+15417543010');
    });
});
