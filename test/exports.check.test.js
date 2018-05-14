const BlorkError = require("../lib/errors/BlorkError");
const { check } = require("../lib/exports");

// Tests.
describe("exports.check()", () => {
	test("Throw BlorkError if type is not object, function, string, or one of our known types", () => {
		expect(() => check(1, 123)).toThrow(BlorkError);
	});
	test("Literal types true, false, null, and undefined all work correctly", () => {
		expect(check(true, true)).toBe(undefined);
		expect(check(false, false)).toBe(undefined);
		expect(check(null, null)).toBe(undefined);
		expect(check(undefined, undefined)).toBe(undefined);
	});
	test("Do not throw error if passing string prefix", () => {
		expect(check(true, "bool", "myValue")).toBe(undefined);
		expect(check(true, Boolean, "myValue")).toBe(undefined);
		expect(check([true], ["bool"], "myValue")).toBe(undefined);
		expect(check({ bool: true }, { bool: "bool" }, "myValue")).toBe(undefined);
	});
	test("Throw BlorkError if passing non-string prefix", () => {
		expect(() => check(1, "bool", 123)).toThrow(BlorkError);
		expect(() => check(1, "bool", 123)).toThrow(/check\(\):/);
		expect(() => check(1, "bool", 123)).toThrow(/prefix:/);
		expect(() => check(1, "bool", 123)).toThrow(/string/);
		expect(() => check(1, "bool", 123)).toThrow(/123/);
	});
});
