import { Constructor } from '../util/constructor';
import { ISemigroupClass, ISemigroup, isISemigroup } from './semigroup';

// Definitions

export interface IMonoid<A, ClassA extends IMonoidClass<A>> extends ISemigroup<A, ClassA> {
}
export interface IMonoidClass<A> extends Constructor<A>, ISemigroupClass<A> {
  'fantasy-land/empty': () => A;
}
export function isIMonoid<A, ClassA extends IMonoidClass<A>>(a: any): a is IMonoid<A, ClassA> {
  if (a === undefined || a === null) {
    return false;
  }
  else {
    return isISemigroup(a);
  }
}

// Laws

export const RightIdentity: <A extends IMonoid<A, ClassA>, ClassA extends IMonoidClass<A>>(
  Monoid: ClassA, m: A
) => boolean =
(Monoid, m) => {
  // Static methods
  return (
    Monoid['fantasy-land/concat'](m, Monoid['fantasy-land/empty']()) === m
  )
  // Instance methods
  && (
    m['fantasy-land/concat'](Monoid['fantasy-land/empty']()) === m
  );
}

export const LeftIdentity: <A extends IMonoid<A, ClassA>, ClassA extends IMonoidClass<A>>(
  Monoid: ClassA, m: A
) => boolean =
(Monoid, m) => {
  // Static methods
  return (
    Monoid['fantasy-land/concat'](Monoid['fantasy-land/empty'](), m) === m
  )
  // Instance methods
  && (
    Monoid['fantasy-land/empty']()['fantasy-land/concat'](m) === m
  );
}
