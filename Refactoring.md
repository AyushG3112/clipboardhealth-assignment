# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

1. Extracting configuration constants to the top of the file outside the function to reduce the amount of context needed to go through that function.
2. Since the candidate post processing and hashing logic is common, extract that to a separate function so it only needs to be read once of each flow, and so it reduces the branches in the main function flow.
3. In all `if` statements, bail out and return the result as soon as possible, so the latter branches don't think about the cases already handled above.
