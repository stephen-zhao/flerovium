import { Constructor } from '../util/constructor';
import { ISemigroupoid, ISemigroupoidClass } from './semigroupoid';

export interface ICategory<A> extends ISemigroupoid<A, A>{}
export interface ICategoryClass<A, ICategoryA extends ICategory<A>>
  extends Constructor<ICategoryA>, ISemigroupoidClass<A, A, ICategoryA> {
  'fantasy-land/id': () => ICategoryA;
}

export const RightIdentity: <A, ICategoryA extends ICategory<A>>(
  a: ICategoryA, Category: ICategoryClass<A, ICategoryA>
) => boolean =
(a, Category) => {
  return a['fantasy-land/compose'](Category['fantasy-land/id']()) === a;
}

export const LeftIdentity: <A, ICategoryA extends ICategory<A>>(
  a: ICategoryA, Category: ICategoryClass<A, ICategoryA>
) => boolean =
(a, Category) => {
  return Category['fantasy-land/id']()['fantasy-land/compose'](a) === a;
}
