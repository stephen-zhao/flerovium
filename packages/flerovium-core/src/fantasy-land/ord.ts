import { Constructor } from '../util/constructor';
import { ISetoid } from './setoid';

export interface IOrd<A> extends ISetoid<A> {
  'fantasy-land/lte': (b: IOrd<A>) => boolean;
}
export interface IOrdClass<A> extends Constructor<IOrd<A>> {}

export const Totality: <A>(
  a: IOrd<A>, b: IOrd<A>
) => boolean =
(a, b) => {
  return a['fantasy-land/lte'](b) || b['fantasy-land/lte'](a);
}

export const Antisymmetry: <A>(
  a: IOrd<A>, b: IOrd<A>
) => boolean =
(a, b) => {
  if (a['fantasy-land/lte'](b) && b['fantasy-land/lte'](a)) {
    return a['fantasy-land/equals'](b);
  }
  else {
    return true;
  }
}

export const Transitivity: <A>(
  a: IOrd<A>, b: IOrd<A>, c: IOrd<A>
) => boolean =
(a, b, c) => {
  if (a['fantasy-land/lte'](b) && b['fantasy-land/lte'](c)) {
    return a['fantasy-land/lte'](c);
  }
  else {
    return true;
  }
}
