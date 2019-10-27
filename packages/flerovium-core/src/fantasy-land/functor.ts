import { Constructor } from '../util/constructor';
import { ISetoid, ISetoidClass, isISetoid } from './setoid';

// Definitions

export interface IFunctor<
  A,
  FA extends IFunctor<A, FA, ClassFA>,
  ClassFA extends IFunctorClass<A, FA>
> extends ISetoid<FA, ClassFA> {
  'fantasy-land/map': <B, FB extends IFunctor<B, FB, ClassFB>, ClassFB extends IFunctorClass<B, FB>>(f: (_: A) => B) => FB;
}
export interface IFunctorClass<A, FA> extends Constructor<FA>, ISetoidClass<FA> {
  'fantasy-land/map': <B, FB extends IFunctor<B, FB, ClassFB>, ClassFB extends IFunctorClass<B, FB>>(fa: FA, f: (_: A) => B) => FB;
}
export function isIFunctor<
  A,
  FA extends IFunctor<A, FA, ClassFA>,
  ClassFA extends IFunctorClass<A, FA>
>(fa: any): fa is IFunctor<A, FA, ClassFA> {
  if (fa === undefined || fa === null) {
    return false;
  }
  else {
    return isISetoid(fa) && (fa as Object).hasOwnProperty('fantasy-land/map');
  }
}

// Laws

export const Identity: <A, FA extends IFunctor<A, FA, ClassFA>, ClassFA extends IFunctorClass<A, FA>>(
  Functor: ClassFA, u: FA
) => boolean =
(Functor, u) => {
  // Static methods
  return (
    Functor['fantasy-land/equals'](
      Functor['fantasy-land/map'](u, x => x),
      u
    )
  )
  // Instance methods
  && (
    Functor['fantasy-land/equals'](
      u['fantasy-land/map'](x => x),
      u
    )
  )
}

export const Composition: <
  A, FA extends IFunctor<A, FA, ClassFA>, ClassFA extends IFunctorClass<A, FA>,
  B, FB extends IFunctor<B, FB, ClassFB>, ClassFB extends IFunctorClass<B, FB>,
  C, FC extends IFunctor<C, FC, ClassFC>, ClassFC extends IFunctorClass<C, FC>,
>(
  FunctorA: ClassFA, FunctorB: ClassFB, FunctorC: ClassFC, u: FA, f: (_: B) => C, g: (_: A) => B
) => boolean =
(FunctorA, FunctorB, FunctorC, u, f, g) => {
  // Static Methods
  return (
    FunctorC['fantasy-land/equals'](
      FunctorA['fantasy-land/map'](u, x => f(g(x))),
      FunctorB['fantasy-land/map'](FunctorA['fantasy-land/map'](u, g), f)
    )
  )
  // Instance methods
  && (
    FunctorC['fantasy-land/equals'](
      u['fantasy-land/map'](x => f(g(x))),
      u['fantasy-land/map'](g)['fantasy-land/map'](f)
    )
  );
}
