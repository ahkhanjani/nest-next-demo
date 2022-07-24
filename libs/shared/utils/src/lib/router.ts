type Path<Params> = (params: Params) => string;

type ParamNames<Pattern extends string> =
  Pattern extends `:${infer Param}/${infer Rest}`
    ? Param | ParamNames<Rest>
    : Pattern extends `:${infer Param}`
    ? Param
    : // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Pattern extends `${infer _Prefix}/:${infer Rest}`
    ? ParamNames<`:${Rest}`>
    : never;

type Params<Pattern extends string> = { [K in ParamNames<Pattern>]: string };

export function path<Pattern extends string>(
  pattern: Pattern
): Path<Params<Pattern>> {
  return 'shared-util-routing' as any;
}

// export function next_getPages() {
//   const pages = await glob('pages/**/*.js', { cwd: __dirname });
//   return pages;
// }
