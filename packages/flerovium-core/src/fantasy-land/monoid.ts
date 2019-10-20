import { Constructor } from '../util/constructor';
import { ISemigroup, ISemigroupClass } from './semigroup';

export interface IMonoid<A> extends ISemigroup<A> {}
export interface IMonoidClass<A, IMonoidA extends IMonoid<A>>
  extends Constructor<IMonoidA>, ISemigroupClass<A, IMonoidA> {
  'fantasy-land/empty': () => IMonoidA;
}

export const RightIdentity: <A, IMonoidA extends IMonoid<A>>(
  m: IMonoidA, Monoid: IMonoidClass<A, IMonoidA>
) => boolean =
(m, Monoid) => {
  return m['fantasy-land/concat'](Monoid['fantasy-land/empty']()) === m;
}

export const LeftIdentity: <A, IMonoidA extends IMonoid<A>>(
  m: IMonoidA, Monoid: IMonoidClass<A, IMonoidA>
) => boolean =
(m, Monoid) => {
  return Monoid['fantasy-land/empty']()['fantasy-land/concat'](m) === m;
}
