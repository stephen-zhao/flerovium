import { Constructor } from '../util/constructor';

export interface ISetoid<Setoid extends ISetoid<Setoid>> {
  'fantasy-land/equals': (b: Setoid) => boolean;
}
export interface ISetoidClass<Setoid extends ISetoid<Setoid>>
  extends Constructor<Setoid> {}

export const Reflexivity: <Setoid extends ISetoid<Setoid>>(
  a: Setoid
) => boolean =
a => {
  return a['fantasy-land/equals'](a) === true;
}

export const Symmetry: <Setoid extends ISetoid<Setoid>>(
  a: Setoid, b: Setoid
) => boolean =
(a, b) => {
  return a['fantasy-land/equals'](b) === b['fantasy-land/equals'](a);
}

export const Transitivity: <Setoid extends ISetoid<Setoid>>(
  a: Setoid, b: Setoid, c: Setoid
) => boolean =
(a, b, c) => {
  if (a['fantasy-land/equals'](b) && b['fantasy-land/equals'](c)) {
    return a['fantasy-land/equals'](c);
  }
  else {
    return true;
  }
}
