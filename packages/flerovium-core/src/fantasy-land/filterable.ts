import { Constructor } from '../util/constructor';

export interface IFilterable<A> {
  'fantasy-land/filter': (pred: (_: A) => boolean) => IFilterable<A>;
}
export interface IFilterableClass<A, IFilterableA extends IFilterable<A>>
  extends Constructor<IFilterableA> {}

export const Distributivity: <A>(
  v: IFilterable<A>, p: (_: A) => boolean, q: (_: A) => boolean
) => boolean =
(v, p, q) => {
  return v['fantasy-land/filter'](x => p(x) && q(x)) === v['fantasy-land/filter'](p)['fantasy-land/filter'](q);
}

export const Identity: <A>(
  v: IFilterable<A>
) => boolean =
v => {
  return v['fantasy-land/filter'](x => true) === v;
}

export const Annihilation: <A, IFilterableA extends IFilterable<A>>(
  v: IFilterableA, w: IFilterableA
) => boolean =
(v, w) => {
  return v['fantasy-land/filter'](x => false) === w['fantasy-land/filter'](x => false);
}
