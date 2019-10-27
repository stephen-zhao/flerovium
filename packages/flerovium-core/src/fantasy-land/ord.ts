import { Constructor } from '../util/constructor';
import { ISetoid, ISetoidClass, isISetoid } from './setoid';

// Definitions

export interface IOrd<A, ClassA extends IOrdClass<A>> extends ISetoid<A, ClassA> {
  'fantasy-land/lte': (b: A) => boolean;
}
export interface IOrdClass<A> extends Constructor<A>, ISetoidClass<A> {
  'fantasy-land/lte': (a: A, b: A) => boolean;
}
export function isIOrd<A, ClassA extends IOrdClass<A>>(a: any): a is IOrd<A, ClassA> {
  if (a === undefined || a === null) {
    return false;
  }
  else {
    return isISetoid(a) && (a as Object).hasOwnProperty('fantasy-land/lte');
  }
}

// Laws

export const Totality: <A extends IOrd<A, ClassA>, ClassA extends IOrdClass<A>>(
  Ord: ClassA, a: A, b: A
) => boolean =
(Ord, a, b) => {
  // Static methods
  return (
    Ord['fantasy-land/lte'](a, b) || Ord['fantasy-land/lte'](b, a)
  )
  // Instance methods
  && (
    a['fantasy-land/lte'](b) || b['fantasy-land/lte'](a)
  );
}

export const Antisymmetry: <A extends IOrd<A, ClassA>, ClassA extends IOrdClass<A>>(
  Ord: ClassA, a: A, b: A
) => boolean =
(Ord, a, b) => {
  // Static methods
  return (
    (Ord['fantasy-land/lte'](a, b) && Ord['fantasy-land/lte'](b, a))
      ? Ord['fantasy-land/equals'](a, b)
      : true
  )
  // Instance methods
  && (
    (a['fantasy-land/lte'](b) && b['fantasy-land/lte'](a))
      ? a['fantasy-land/equals'](b)
      : true
  );
}

export const Transitivity: <A extends IOrd<A, ClassA>, ClassA extends IOrdClass<A>>(
  Ord: ClassA, a: A, b: A, c: A
) => boolean =
(Ord, a, b, c) => {
  return (
    (Ord['fantasy-land/lte'](a, b) && Ord['fantasy-land/lte'](b, c))
      ? Ord['fantasy-land/lte'](a, c)
      : true
  )
  // Instance methods
  && (
    (a['fantasy-land/lte'](b) && b['fantasy-land/lte'](c))
      ? a['fantasy-land/lte'](c)
      : true
  );
}
