import { Constructor } from '../util/constructor';

export interface ISemigroup<A> {
  'fantasy-land/concat': (b: ISemigroup<A>) => ISemigroup<A>;
}
export interface ISemigroupClass<A> extends Constructor<ISemigroup<A>> {}

export const Associativity: <A>(
  a: ISemigroup<A>, b: ISemigroup<A>, c: ISemigroup<A>
) => boolean = 
(a, b, c) => {
  return a['fantasy-land/concat'](b)['fantasy-land/concat'](c) === a['fantasy-land/concat'](c['fantasy-land/concat'](c));
}
