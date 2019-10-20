import { Constructor } from '../util/constructor';

export interface ISetoid<A> {
  'fantasy-land/equals': (b: ISetoid<A>) => boolean;
}
export interface ISetoidClass<A> extends Constructor<ISetoid<A>> {}

export const Reflexivity: <A>(
  a: ISetoid<A>
) => boolean =
a => {
  return a['fantasy-land/equals'](a) === true;
}

export const Symmetry: <A>(
  a: ISetoid<A>, b: ISetoid<A>
) => boolean =
(a, b) => {
  return a['fantasy-land/equals'](b) === b['fantasy-land/equals'](a);
}

export const Transitivity: <A>(
  a: ISetoid<A>, b: ISetoid<A>, c: ISetoid<A>
) => boolean =
(a, b, c) => {
  if (a['fantasy-land/equals'](b) && b['fantasy-land/equals'](c)) {
    return a['fantasy-land/equals'](c);
  }
  else {
    return true;
  }
}
