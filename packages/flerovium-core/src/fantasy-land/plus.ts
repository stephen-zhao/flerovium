import { Constructor } from '../util/constructor';
import { IAlt, IAltClass, isIAlt } from './alt';

// Definitions

export interface IPlus<
  A,
  FA extends IPlus<A, FA, ClassFA>,
  ClassFA extends IPlusClass<A, FA>
> extends IAlt<A, FA, ClassFA> {
}
export interface IPlusClass<A, FA> extends Constructor<FA>, IAltClass<A, FA> {
  'fantasy-land/zero': () => FA;
}
export function isIPlus<
  A,
  FA extends IPlus<A, FA, ClassFA>,
  ClassFA extends IPlusClass<A, FA>
>(fa: any): fa is IPlus<A, FA, ClassFA> {
  if (fa === undefined || fa === null) {
    return false;
  }
  else {
    return isIAlt(fa);
  }
}

// Laws

export const RightIdentity: <A, FA extends IPlus<A, FA, ClassFA>, ClassFA extends IPlusClass<A, FA>>(
  Plus: ClassFA, x: FA
) => boolean =
(Plus, x) => {
  // Static methods
  return (
    Plus['fantasy-land/equals'](
      Plus['fantasy-land/alt'](x, Plus['fantasy-land/zero']()),
      x
    )
  )
  // Instance methods
  && (
    Plus['fantasy-land/equals'](
      x['fantasy-land/alt'](Plus['fantasy-land/zero']()),
      x
    )
  );
}

export const LeftIdentity: <A, FA extends IPlus<A, FA, ClassFA>, ClassFA extends IPlusClass<A, FA>>(
  Plus: ClassFA, x: FA
) => boolean =
(Plus, x) => {
  // Static methods
  return (
    Plus['fantasy-land/equals'](
      Plus['fantasy-land/alt'](Plus['fantasy-land/zero'](), x),
      x
    )
  )
  // Instance methods
  && (
    Plus['fantasy-land/equals'](
      Plus['fantasy-land/zero']()['fantasy-land/alt'](x),
      x
    )
  );
}

export const Annihilation: <
  A, FA extends IPlus<A, FA, ClassFA>, ClassFA extends IPlusClass<A, FA>,
  B, FB extends IPlus<B, FB, ClassFB>, ClassFB extends IPlusClass<B, FB>,
>(
  PlusA: ClassFA,
  PlusB: ClassFB,
  f: (_: A) => B
) => boolean =
(PlusA, PlusB, f) => {
  // Static methods
  return (
    PlusB['fantasy-land/equals'](
      PlusA['fantasy-land/map'](PlusA['fantasy-land/zero'](), f),
      PlusB['fantasy-land/zero']()
    )
  )
  // Instance methods
  && (
    PlusB['fantasy-land/equals'](
      PlusA['fantasy-land/zero']()['fantasy-land/map'](f),
      PlusB['fantasy-land/zero']()
    )
  );
}
