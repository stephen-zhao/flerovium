import { Constructor } from '../util/constructor';

export interface ISemigroupoid<A, B> {
  'fantasy-land/compose': <C>(b: ISemigroupoid<B, C>) => ISemigroupoid<A, C>;
}
export interface ISemigroupoidClass<A, B, ISemigroupoidAB extends ISemigroupoid<A, B>>
  extends Constructor<ISemigroupoidAB> {}

export const Associativity: <A, B, C, D>(
  a: ISemigroupoid<A, B>, b: ISemigroupoid<B, C>, c: ISemigroupoid<C, D>
) => boolean = 
(a, b, c) => {
  return a['fantasy-land/compose'](b)['fantasy-land/compose'](c) === a['fantasy-land/compose'](b['fantasy-land/compose'](c));
}
