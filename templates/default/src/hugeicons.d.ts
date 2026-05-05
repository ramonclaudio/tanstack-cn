// Stand-in for upstream @hugeicons/react PR (subpath types).
// Drop once oven-sh/bun#13330 ships and we can apply the canonical
// patch via patchedDependencies. Mirrors the union shape from the PR
// so subpath and barrel imports type identically.
declare module "@hugeicons/core-free-icons/*" {
  const icon:
    | Array<[string, { [key: string]: string | number }]>
    | ReadonlyArray<readonly [string, { readonly [key: string]: string | number }]>
  export default icon
}
