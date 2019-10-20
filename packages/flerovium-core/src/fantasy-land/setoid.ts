import { Constructor } from '../util/constructor';

export interface ISetoid<A> {
  'fantasy-land/equals': (b: ISetoid<A>) => boolean;
}
export interface ISetoidClass<A, ISetoidA extends ISetoid<A>>
  extends Constructor<ISetoidA> {}

export const Reflexivity: <A, ISetoidA extends ISetoid<A>>(
  a: ISetoidA
) => boolean =
a => {
  return a['fantasy-land/equals'](a) === true;
}

export const Symmetry: <A, ISetoidA extends ISetoid<A>>(
  a: ISetoidA, b: ISetoidA
) => boolean =
(a, b) => {
  return a['fantasy-land/equals'](b) === b['fantasy-land/equals'](a);
}

export const Transitivity: <A, ISetoidA extends ISetoid<A>>(
  a: ISetoidA, b: ISetoidA, c: ISetoidA
) => boolean =
(a, b, c) => {
  if (a['fantasy-land/equals'](b) && b['fantasy-land/equals'](c)) {
    return a['fantasy-land/equals'](c);
  }
  else {
    return true;
  }
}
