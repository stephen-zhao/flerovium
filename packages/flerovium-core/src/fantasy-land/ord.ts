import { Constructor } from '../util/constructor';
import { ISetoid, ISetoidClass } from './setoid';

export interface IOrd<Ord extends IOrd<Ord>> extends ISetoid<Ord> {
  'fantasy-land/lte': (b: Ord) => boolean;
}
export interface IOrdClass<Ord extends IOrd<Ord>>
  extends Constructor<Ord>, ISetoidClass<Ord> {}

export const Totality: <Ord extends IOrd<Ord>>(
  a: Ord, b: Ord
) => boolean =
(a, b) => {
  return a['fantasy-land/lte'](b) || b['fantasy-land/lte'](a);
}

export const Antisymmetry: <Ord extends IOrd<Ord>>(
  a: Ord, b: Ord
) => boolean =
(a, b) => {
  if (a['fantasy-land/lte'](b) && b['fantasy-land/lte'](a)) {
    return a['fantasy-land/equals'](b);
  }
  else {
    return true;
  }
}

export const Transitivity: <Ord extends IOrd<Ord>>(
  a: Ord, b: Ord, c: Ord
) => boolean =
(a, b, c) => {
  if (a['fantasy-land/lte'](b) && b['fantasy-land/lte'](c)) {
    return a['fantasy-land/lte'](c);
  }
  else {
    return true;
  }
}
