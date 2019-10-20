import { Constructor } from '../util/constructor';
import { IApply, IApplyClass } from './apply';

export interface IApplicative<A> extends IApply<A> {
  'fantasy-land/ap': <B>(f: IApply<(_: A) => B>) => IApplicative<B>;
  'fantasy-land/map': <B>(f: (_: A) => B) => IApplicative<B>;
} 
export interface IApplicativeClass<A, IApplicativeA extends IApplicative<A>>
  extends Constructor<IApplicativeA>, IApplyClass<A, IApplicativeA> {
  'fantasy-land/of': (a: A) => IApplicative<A>;
}

type I<A> = (x: A) => A;
export const Identity: <A>(
  v: IApplicative<A>, Applicative: IApplicativeClass<I<A>, IApplicative<I<A>>>
) => boolean =
(v, Applicative) => {
  return v['fantasy-land/ap'](Applicative['fantasy-land/of'](x => x)) === v;
}

export const Homomorphism: <A, B>(
  x: A, ApplicativeA: IApplicativeClass<A, IApplicative<A>>,
  ApplicativeB: IApplicativeClass<B, IApplicative<B>>,
  f: (_: A) => B, ApplicativeF: IApplicativeClass<(_: A) => B, IApplicative<(_: A) => B>>
) => boolean =
(x, ApplicativeA, ApplicativeB, f, ApplicativeF) => {
  return ApplicativeA['fantasy-land/of'](x)['fantasy-land/ap'](ApplicativeF['fantasy-land/of'](f))
    === ApplicativeB['fantasy-land/of'](f(x));
}

export const Interchange: <A, B>(
  y: A, ApplicativeA: IApplicativeClass<A, IApplicative<A>>,
  u: IApplicative<(_: A) => B>,
  ApplicativeF: IApplicativeClass<(f: (_: A) => B) => B, IApplicative<(f: (_: A) => B) => B>>
) => boolean =
(y, ApplicativeA, u, ApplicativeF) => {
  return ApplicativeA['fantasy-land/of'](y)['fantasy-land/ap'](u)
    === u['fantasy-land/ap'](ApplicativeF['fantasy-land/of'](f => f(y)));
}
