import { Constructor } from '../util/constructor';

// Definitions

export interface ISemigroup<A, ClassA extends ISemigroupClass<A>> {
  'fantasy-land/concat': (b: A) => A;
}
export interface ISemigroupClass<A> extends Constructor<A> { 
  'fantasy-land/concat': (a: A, b: A) => A;
}
export function isISemigroup<A, ClassA extends ISemigroupClass<A>>(a: any): a is ISemigroup<A, ClassA> {
  if (a === undefined || a === null) {
    return false;
  }
  else {
    return (a as Object).hasOwnProperty('fantasy-land/concat');
  }
}

// Laws

export const Associativity: <A extends ISemigroup<A, ClassA>, ClassA extends ISemigroupClass<A>>(
  Semigroup: ClassA, a: A, b: A, c: A
) => boolean = 
(Semigroup, a, b, c) => {
  // Static methods
  return (
    Semigroup['fantasy-land/concat'](Semigroup['fantasy-land/concat'](a, b), c)
      === Semigroup['fantasy-land/concat'](a, Semigroup['fantasy-land/concat'](b, c))
  )
  // Instance methods
  && (
    a['fantasy-land/concat'](b)['fantasy-land/concat'](c)
      === a['fantasy-land/concat'](b['fantasy-land/concat'](c))
  );
}
