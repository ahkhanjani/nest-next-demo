type Path<Params> = (params: Params) => string;

type ParamNames<Pattenr extends string> = any;

export function path<Pattern extends string>(
  pattern: Pattern
): Path<Param<Pattern>> {
  return 'shared-util-routing' as any;
}
