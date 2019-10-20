import { Constructor } from '../util/constructor';
import { IFunctor, IFunctorClass } from './functor';

export interface IApply<A> extends IFunctor<A> {
  'fantasy-land/ap': <B>(f: IApply<(_: A) => B>) => IApply<B>;
  'fantasy-land/map': <B>(f: (_: A) => B) => IApply<B>;
}
export interface IApplyClass<A, IApplyA extends IApply<A>>
  extends Constructor<IApplyA>, IFunctorClass<A, IApplyA> {}

export const Composition: <A, B, C>(
  v: IApply<A>, u: IApply<(_: A) => B>, a: IApply<(_: B) => C>
) => boolean =
<A, B, C>(
  v: IApply<A>, u: IApply<(_: A) => B>, a: IApply<(_: B) => C>
) => {
  return v['fantasy-land/ap'](u['fantasy-land/ap'](a['fantasy-land/map'](f => g => x => f(g(x)))))
    === v['fantasy-land/ap'](u)['fantasy-land/ap'](a);
}
