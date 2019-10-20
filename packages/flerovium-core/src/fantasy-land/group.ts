import { Constructor } from '../util/constructor';
import { IMonoid, IMonoidClass } from './monoid';
import { ISemigroup } from './semigroup';

export interface IGroup<A> extends IMonoid<A> {
  'fantasy-land/concat': (b: ISemigroup<A>) => IGroup<A>;
  'fantasy-land/invert': () => IGroup<A>;
}
export interface IGroupClass<A, IGroupA extends IGroup<A>> 
  extends Constructor<IGroupA>, IMonoidClass<A, IGroupA> {}

export const RightInverse: <A, IGroupA extends IGroup<A>>(
  g: IGroupA, Group: IGroupClass<A, IGroupA>
) => boolean =
(g, Group) => {
  return g['fantasy-land/concat'](g['fantasy-land/invert']()) === Group['fantasy-land/empty']();
}

export const LeftInverse: <A, IGroupA extends IGroup<A>>(
  g: IGroupA, Group: IGroupClass<A, IGroupA>
) => boolean =
(g, Group) => {
  return g['fantasy-land/invert']()['fantasy-land/concat'](g) === Group['fantasy-land/empty']();
}
