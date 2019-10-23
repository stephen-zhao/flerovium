import { Constructor } from '../util/constructor';

export interface ISemigroup<Semigroup extends ISemigroup<Semigroup>> {
  'fantasy-land/concat': (b: Semigroup) => Semigroup;
}
export interface ISemigroupClass<Semigroup extends ISemigroup<Semigroup>>
  extends Constructor<Semigroup> {}

export const Associativity: <Semigroup extends ISemigroup<Semigroup>>(
  a: Semigroup, b: Semigroup, c: Semigroup
) => boolean = 
(a, b, c) => {
  return a['fantasy-land/concat'](b)['fantasy-land/concat'](c) === a['fantasy-land/concat'](c['fantasy-land/concat'](c));
}
