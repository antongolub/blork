const BlorkError = require("../lib/BlorkError");
const { args } = require("../lib/exports");

// Tests.
describe("args()", () => {
	test("Return correctly when argument checks pass", () => {
		const argsObj = { "0": "a", "1": 123, "2": true, length: 3 };
		expect(args(argsObj, [String, Number, Boolean])).toBe(3);
		const argsArr = ["a", 123, true];
		expect(args(argsArr, [String, Number, Boolean])).toBe(3);
	});
	test("Return correct number when arguments are optional", () => {
		const argsObj = { "0": "a", "1": 123, length: 2 };
		expect(args(argsObj, ["str", "num", "bool?"])).toBe(2);
		const argsArr = ["a", 123];
		expect(args(argsArr, ["str", "num", "bool?"])).toBe(2);
	});
	test("Throw TypeError when argument checks fail", () => {
		const argsObj = { "0": "a", length: 3 };
		expect(() => args(argsObj, [Number])).toThrow(TypeError);
	});
	test("Throw TypeError when too many arguments", () => {
		const argsObj = { "0": true, "1": true, "2": true, length: 3 };
		expect(() => args(argsObj, [Boolean, Boolean])).toThrow(TypeError);
	});
	test("Throw BlorkError if passing non-arguments-like object", () => {
		expect(() => args({}, [Number])).toThrow(BlorkError);
	});
	test("Throw BlorkError if types is not array", () => {
		expect(() => args({ "0": "abc", length: 1 }, { length: 0 })).toThrow(BlorkError);
	});
});
