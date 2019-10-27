import { Constructor } from '../util/constructor';
import { ISetoid, ISetoidClass, isISetoid } from './setoid';

// Definitions

export interface IFilterable<
  A,
  FA extends IFilterable<A, FA, ClassFA>,
  ClassFA extends IFilterableClass<A, FA>
> extends ISetoid<FA, ClassFA> {
  'fantasy-land/filter': (pred: (_: A) => boolean) => FA;
}
export interface IFilterableClass<A, FA> extends Constructor<FA>, ISetoidClass<FA> {
  'fantasy-land/filter': (a: FA, pred: (_: A) => boolean) => FA;
}
export function isIFilterable<
  A,
  FA extends IFilterable<A, FA, ClassFA>,
  ClassFA extends IFilterableClass<A, FA>
>(fa: any): fa is IFilterable<A, FA, ClassFA> {
  if (fa === undefined || fa === null) {
    return false;
  }
  else {
    return isISetoid(fa) && (fa as Object).hasOwnProperty('fantasy-land/filter');
  }
}

// Laws

export const Distributivity: <A, FA extends IFilterable<A, FA, ClassFA>, ClassFA extends IFilterableClass<A, FA>>(
  Filterable: ClassFA, v: FA, p: (_: A) => boolean, q: (_: A) => boolean
) => boolean =
(Filterable, v, p, q) => {
  // Static methods
  return (
    Filterable['fantasy-land/equals'](
      Filterable['fantasy-land/filter'](v, x => p(x) && q(x)),
      Filterable['fantasy-land/filter'](Filterable['fantasy-land/filter'](v, p), q)
    )
  )
  // Instance methods
  && (
    Filterable['fantasy-land/equals'](
      v['fantasy-land/filter'](x => p(x) && q(x)),
      v['fantasy-land/filter'](p)['fantasy-land/filter'](q)
    )
  );
}

export const Identity: <A, FA extends IFilterable<A, FA, ClassFA>, ClassFA extends IFilterableClass<A, FA>>(
  Filterable: ClassFA, v: FA
) => boolean =
(Filterable, v) => {
  // Static methods
  return (
    Filterable['fantasy-land/equals'](
      Filterable['fantasy-land/filter'](v, x => true), v
    )
  )
  // Instance methods
  && (
    Filterable['fantasy-land/equals'](
      v['fantasy-land/filter'](x => true), v
    )
  )
}

export const Annihilation: <A, FA extends IFilterable<A, FA, ClassFA>, ClassFA extends IFilterableClass<A, FA>>(
  Filterable: ClassFA, v: FA, w: FA
) => boolean =
(Filterable, v, w) => {
  // Static methods
  return (
    Filterable['fantasy-land/equals'](
      Filterable['fantasy-land/filter'](v, x => false),
      Filterable['fantasy-land/filter'](w, x => false))
  )
  // Instance methods
  && (
    Filterable['fantasy-land/equals'](
      v['fantasy-land/filter'](x => false),
      w['fantasy-land/filter'](x => false)
    )
  );
}
