import { Constructor } from '../util/constructor';
import { ISetoid, ISetoidClass } from './setoid';

export interface IOrd<A> extends ISetoid<A> {
  'fantasy-land/lte': (b: IOrd<A>) => boolean;
}
export interface IOrdClass<A, IOrdA extends IOrd<A>>
  extends Constructor<IOrdA>, ISetoidClass<A, IOrdA> {}

export const Totality: <A, IOrdA extends IOrd<A>>(
  a: IOrdA, b: IOrdA
) => boolean =
(a, b) => {
  return a['fantasy-land/lte'](b) || b['fantasy-land/lte'](a);
}

export const Antisymmetry: <A, IOrdA extends IOrd<A>>(
  a: IOrdA, b: IOrdA
) => boolean =
(a, b) => {
  if (a['fantasy-land/lte'](b) && b['fantasy-land/lte'](a)) {
    return a['fantasy-land/equals'](b);
  }
  else {
    return true;
  }
}

export const Transitivity: <A, IOrdA extends IOrd<A>>(
  a: IOrdA, b: IOrdA, c: IOrdA
) => boolean =
(a, b, c) => {
  if (a['fantasy-land/lte'](b) && b['fantasy-land/lte'](c)) {
    return a['fantasy-land/lte'](c);
  }
  else {
    return true;
  }
}
