import { Constructor } from '../util/constructor';

// Definitions

export interface ISetoid<A, ClassA extends ISetoidClass<A>> {
  'fantasy-land/equals': (b: A) => boolean;
}
export interface ISetoidClass<A> extends Constructor<A> {
  'fantasy-land/equals': (a: A, b: A) => boolean;
}

// Laws

export const Reflexivity: <A extends ISetoid<A, ClassA>, ClassA extends ISetoidClass<A>>(
  Setoid: ClassA, a: A
) => boolean =
(Setoid, a) => {
  // Static methods
  return (
    Setoid['fantasy-land/equals'](a, a) === true
  )
  // Instance methods
  && (
    a['fantasy-land/equals'](a) === true
  );
}

export const Symmetry: <A extends ISetoid<A, ClassA>, ClassA extends ISetoidClass<A>>(
  Setoid: ClassA, a: A, b: A
) => boolean =
(Setoid, a, b) => {
  // Static methods
  return (
    Setoid['fantasy-land/equals'](a, b) === Setoid['fantasy-land/equals'](b, a)
  )
  // Instance methods
  && (
    a['fantasy-land/equals'](b) === b['fantasy-land/equals'](a)
  );
}

export const Transitivity: <A extends ISetoid<A, ClassA>, ClassA extends ISetoidClass<A>>(
  Setoid: ClassA, a: A, b: A, c: A
) => boolean =
(Setoid, a, b, c) => {
  // Static methods
  return (
    (Setoid['fantasy-land/equals'](a, b) && Setoid['fantasy-land/equals'](b, c))
      ? Setoid['fantasy-land/equals'](a, c)
      : true
  )
  // Instance methods
  && (
    (a['fantasy-land/equals'](b) && b['fantasy-land/equals'](c))
      ? a['fantasy-land/equals'](c)
      : true
  );
}
