const destack = require("./destack");

/**
 * Get the cause from a destacked error stack.
 *
 * Return details about where the error was CAUSED (i.e. NOT where it was thrown), by parsing the `Error.stack` property.
 * It's not relevant to the the dev that the error was thrown in Blorker.js on line X — they need to know where they caused the error.
 * It's actually also not relevant to return the function where the user CALLED e.g. `check()`, it's the one before that.
 *
 * We also prepend the function/method this to error messages, so rather than error message being "Must be string" it is "MyClass.myFunc(): Must be string"
 *
 * @param {string} stack A stack string as generated by `new Error()` — unfortunately different browsers use different formats.
 * @returns {array} An array like `[functionName, file, line]` that represents the file/line/call that caused this error, or undefined if it can't be found.
 */
function cause(stack) {
	// Parse the stack into its constituent rows.
	const frames = destack(stack);

	// Break the stack into lines.
	const lines = stack.split("\n");

	// Loop through the frames (stop at end-minus-1 because we need there to be a next frame).
	for (let i = 0; i < frames.length - 2; i++) {
		// Remove this frame from the lines.
		const j = lines.indexOf(frames[i].original);
		/* istanbul ignore else */
		if (j >= 0) lines.splice(j, 1);

		// Does the function name include "Blorker$"
		if (frames[i].function.indexOf("Blorker$") >= 0) {
			// Return NEXT frame.
			const frame = frames[i + 1];
			return {
				function: frame.function,
				file: frame.file,
				line: frame.line,
				column: frame.column,
				stack: lines.join("\n")
			};
		}
	}
}

// Exports.
module.exports = cause;