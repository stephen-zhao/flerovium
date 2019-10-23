import { Constructor } from '../util/constructor';
import { ISemigroup, ISemigroupClass } from './semigroup';

export interface IMonoid<Monoid extends IMonoid<Monoid>> extends ISemigroup<Monoid> {
  'fantasy-land/concat': (b: Monoid) => Monoid;
}
export interface IMonoidClass<Monoid extends IMonoid<Monoid>>
  extends Constructor<Monoid>, ISemigroupClass<Monoid> {
  'fantasy-land/empty': () => Monoid;
}

export const RightIdentity: <Monoid extends IMonoid<Monoid>>(
  m: Monoid, Monoid: IMonoidClass<Monoid>
) => boolean =
(m, Monoid) => {
  return m['fantasy-land/concat'](Monoid['fantasy-land/empty']()) === m;
}

export const LeftIdentity: <Monoid extends IMonoid<Monoid>>(
  m: Monoid, Monoid: IMonoidClass<Monoid>
) => boolean =
(m, Monoid) => {
  return Monoid['fantasy-land/empty']()['fantasy-land/concat'](m) === m;
}
