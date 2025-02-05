# Computational inefficiencies and anti-patterns
1. `getPriority` function
- Issue: uses `any` type for `blockchain` parameter, leading to type safety issues.
- Solution: Define a proper TypeScript type for supported blockchains.
2. Incorrect Filtering Logic in `useMemo`
- Issue: `lhsPriority` is `undefined` in `useMemo`. It should be `balancePriority`.
- Solution: The condition `if (lhsPriority > -99) { if (balance.amount <= 0) { return true; } }` is unclear and likely incorrect.
3. Inefficient Sorting in `useMemo`
- Issue: `.filter()` and `.sort()` should be separate to improve readability.
- Issue: `getPriority` is called multiple times per element, which is inefficient.
- Solution: Store `priorities` in a Map to avoid redundant function calls.
4. Unnecessary Dependency on `prices` in `useMemo`
- Issue: `prices` is in the dependency array but is never used inside `useMemo`.
- Solution: Remove `prices` from dependencies.
5. Incorrect Type Used in `sortedBalances.map()`
- Issue: `sortedBalances` contains `WalletBalance` objects, but it's mapped to `FormattedWalletBalanc`e in rows, causing a type mismatch.
- Solution: Ensure the correct type is used consistently.
6. Key Should Use Unique Identifiers Instead of Index
- Issue: Using index as the key in `.map()` can cause issues when the list updates.
- Solution: Use a unique identifier like currency.