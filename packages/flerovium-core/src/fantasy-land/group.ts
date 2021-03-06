import { Constructor } from '../util/constructor';
import { IMonoid, IMonoidClass, isIMonoid } from './monoid';

// Definitions

export interface IGroup<A, ClassA extends IGroupClass<A>> extends IMonoid<A, ClassA> {
  'fantasy-land/invert': () => A;
}
export interface IGroupClass<A> extends Constructor<A>, IMonoidClass<A> {
  'fantasy-land/invert': (a: A) => A;
}
export function isIGroup<A, ClassA extends IGroupClass<A>>(a: any): a is IGroup<A, ClassA> {
  if (a === undefined || a === null) {
    return false;
  }
  else {
    return isIMonoid(a) && (a as Object).hasOwnProperty('fantasy-land/invert');
  }
}

// Laws

export const RightInverse: <A extends IGroup<A, ClassA>, ClassA extends IGroupClass<A>>(
  Group: ClassA, g: A
) => boolean =
(Group, g) => {
  // Static methods
  return (
    Group['fantasy-land/concat'](g, Group['fantasy-land/invert'](g)) === Group['fantasy-land/empty']()
  )
  // Instance methods
  && (
    g['fantasy-land/concat'](g['fantasy-land/invert']()) === Group['fantasy-land/empty']()
  );
}

export const LeftInverse: <A extends IGroup<A, ClassA>, ClassA extends IGroupClass<A>>(
  Group: ClassA, g: A
) => boolean =
(Group, g) => {
  // Static methods
  return (
    Group['fantasy-land/concat'](Group['fantasy-land/invert'](g), g) === Group['fantasy-land/empty']()
  )
  // Instance methods
  && (
    g['fantasy-land/invert']()['fantasy-land/concat'](g) === Group['fantasy-land/empty']()
  );
}
