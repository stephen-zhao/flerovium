import { IApplicative, IApplicativeClass } from './applicative';
import { IPlus, IPlusClass } from './plus';
import { Constructor } from '../util/constructor';
import { IApply } from './apply';
import { IAlt } from './alt';

export interface IAlternative<A> extends IApplicative<A>, IPlus<A> {
  'fantasy-land/ap': <B>(f: IApply<(_: A) => B>) => IAlternative<B>;
  'fantasy-land/map': <B>(f: (_: A) => B) => IAlternative<B>;
  'fantasy-land/alt': (a: IAlt<A>) => IAlternative<A>;
}
export interface IAlternativeClass<A, IAlternativeA extends IAlternative<A>>
  extends Constructor<IAlternativeA>, IApplicativeClass<A, IAlternativeA>, IPlusClass<A, IAlternativeA> {
  'fantasy-land/of': (a: A) => IAlternative<A>;
  'fantasy-land/zero': () => IAlternative<any>;
}

export const Distributivity: <A, B>(
  x: IAlternative<A>, f: IAlternative<(_: A) => B>, g: IAlternative<(_: A) => B>
) => boolean =
(x, f, g) => {
  return x['fantasy-land/ap'](f['fantasy-land/alt'](g))
    === x['fantasy-land/ap'](f)['fantasy-land/alt'](x['fantasy-land/ap'](g));
}

export const Annihilation: <A, IAlternativeA extends IAlternative<A>>(
  x: IAlternativeA, Alternative: IAlternativeClass<A, IAlternativeA>
) => boolean =
(x, Alternative) => {
  return x['fantasy-land/ap'](Alternative['fantasy-land/zero']())
    === Alternative['fantasy-land/zero']();
}
