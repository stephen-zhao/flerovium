import { Constructor } from '../util/constructor';

export interface ISemigroup<A> {
  'fantasy-land/concat': (b: ISemigroup<A>) => ISemigroup<A>;
}
export interface ISemigroupClass<A, ISemigroupA extends ISemigroup<A>>
  extends Constructor<ISemigroupA> {}

export const Associativity: <A, ISemigroupA extends ISemigroup<A>>(
  a: ISemigroupA, b: ISemigroupA, c: ISemigroupA
) => boolean = 
(a, b, c) => {
  return a['fantasy-land/concat'](b)['fantasy-land/concat'](c) === a['fantasy-land/concat'](c['fantasy-land/concat'](c));
}
