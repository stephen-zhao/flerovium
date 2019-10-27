import { IFunctor, IFunctorClass, isIFunctor } from './functor';
import { Constructor } from '../util/constructor';

// Definitions

export interface IAlt<
  A,
  FA extends IAlt<A, FA, ClassFA>,
  ClassFA extends IAltClass<A, FA>
> extends IFunctor<A, FA, ClassFA> {
  'fantasy-land/alt': (b: FA) => FA;
}
export interface IAltClass<A, FA> extends Constructor<FA>, IFunctorClass<A, FA> {
  'fantasy-land/alt': (a: FA, b: FA) => FA;
}
export function isIAlt<
  A,
  FA extends IAlt<A, FA, ClassFA>,
  ClassFA extends IAltClass<A, FA>
>(fa: any): fa is IAlt<A, FA, ClassFA> {
  if (fa === undefined || fa === null) {
    return false;
  }
  else {
    return isIFunctor(fa) && (fa as Object).hasOwnProperty('fantasy-land/alt');
  }
}

// Laws

export const Associativity: <A, FA extends IAlt<A, FA, ClassFA>, ClassFA extends IAltClass<A, FA>>(
  Alt: ClassFA, a: FA, b: FA, c: FA
) => boolean =
(Alt, a, b, c) => {
  // Static methods
  return (
    Alt['fantasy-land/equals'](
      Alt['fantasy-land/alt'](Alt['fantasy-land/alt'](a, b), c),
      Alt['fantasy-land/alt'](a, Alt['fantasy-land/alt'](b, c)),
    )
  )
  // Instance methods
  && (
    Alt['fantasy-land/equals'](
      a['fantasy-land/alt'](b)['fantasy-land/alt'](c),
      a['fantasy-land/alt'](b['fantasy-land/alt'](c))
    )
  );
}

export const Distributivity = <
  A, FA extends IAlt<A, FA, ClassFA>, ClassFA extends IAltClass<A, FA>,
  B, FB extends IAlt<B, FB, ClassFB>, ClassFB extends IAltClass<B, FB>
>(
  AltA: ClassFA, AltB: ClassFB, a: FA, b: FA, f: (_: A) => B
): boolean => {
  // Static methods
  return (
    AltB['fantasy-land/equals'](
      AltA['fantasy-land/map'](AltA['fantasy-land/alt'](a, b), f),
      AltB['fantasy-land/alt'](AltA['fantasy-land/map'](a, f), AltA['fantasy-land/map'](b, f))
    )
  )
  // Instance methods
  && (
    AltB['fantasy-land/equals'](
      a['fantasy-land/alt'](b)['fantasy-land/map'](f),
      a['fantasy-land/map']<B, FB, ClassFB>(f)['fantasy-land/alt'](b['fantasy-land/map'](f))
    )
  );
}
