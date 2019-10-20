import { Constructor } from '../util/constructor';
import { IAlt, IAltClass } from './alt';

export interface IPlus<A> extends IAlt<A> {
  'fantasy-land/map': <B>(f: (_: A) => B) => IPlus<B>;
  'fantasy-land/alt': (a: IAlt<A>) => IPlus<A>;
}
export interface IPlusClass<A, IPlusA extends IPlus<A>>
  extends Constructor<IPlusA>, IAltClass<A, IPlusA> {
  'fantasy-land/zero': () => IPlus<any>;
}

export const RightIdentity: <A, IPlusA extends IPlus<A>>(
  x: IPlusA, Plus: IPlusClass<A, IPlusA>
) => boolean =
(x, Plus) => {
  return x['fantasy-land/alt'](Plus['fantasy-land/zero']()) === x;
}

export const LeftIdentity: <A, IPlusA extends IPlus<A>>(
  x: IPlusA, Plus: IPlusClass<A, IPlusA>
) => boolean =
(x, Plus) => {
  return Plus['fantasy-land/zero']()['fantasy-land/alt'](x) === x;
}

export const Annihilation: <A, B>(
  Plus: IPlusClass<A, IPlus<A>>,
  f: (_: A) => B
) => boolean =
(Plus, f) => {
  return Plus['fantasy-land/zero']()['fantasy-land/map'](f) === Plus['fantasy-land/zero']();
}