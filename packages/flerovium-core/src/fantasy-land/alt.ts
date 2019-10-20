import { IFunctor, IFunctorClass } from './functor';
import { Constructor } from '../util/constructor';

export interface IAlt<A> extends IFunctor<A> {
  'fantasy-land/map': <B>(f: (_: A) => B) => IAlt<B>;
  'fantasy-land/alt': (a: IAlt<A>) => IAlt<A>;
}
export interface IAltClass<A, IAltA extends IAlt<A>>
  extends Constructor<IAltA>, IFunctorClass<A, IAlt<A>> {}

export const Associativity: <A, IAltA extends IAlt<A>>(
  a: IAltA, b: IAltA, c: IAltA
) => boolean =
(a, b, c) => {
  return a['fantasy-land/alt'](b)['fantasy-land/alt'](c)
    === a['fantasy-land/alt'](b['fantasy-land/alt'](c));
}

export const Distributivity: <A, B, IAltA extends IAlt<A>>(
  a: IAltA, b: IAltA, f: (_: A) => B
) => boolean =
(a, b, f) => {
  return a['fantasy-land/alt'](b)['fantasy-land/map'](f)
    === a['fantasy-land/map'](f)['fantasy-land/alt'](b['fantasy-land/map'](f));
}
