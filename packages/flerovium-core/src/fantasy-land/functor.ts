import { Constructor } from '../util/constructor';

export interface IFunctor<A> {
  'fantasy-land/map': <B>(f: (_: A) => B) => IFunctor<B>;
}
export interface IFunctorClass<A, IFunctorA extends IFunctor<A>>
  extends Constructor<IFunctorA> {}

export const Identity: <A>(
  u: IFunctor<A>
) => boolean =
u => {
  return u['fantasy-land/map'](x => x) === u;
}

export const Composition: <A, B, C>(
  u: IFunctor<A>, f: (_: B) => C, g: (_: A) => B
) => boolean =
(u, f, g) => {
  return u['fantasy-land/map'](x => f(g(x))) === u['fantasy-land/map'](g)['fantasy-land/map'](f);
}
