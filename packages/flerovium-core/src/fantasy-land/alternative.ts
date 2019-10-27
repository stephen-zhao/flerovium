import { IApplicative, IApplicativeClass } from './applicative';
import { IPlus, IPlusClass } from './plus';
import { Constructor } from '../util/constructor';
import { IApply } from './apply';
import { IAlt } from './alt';

// Definitions

export interface IAlternative<
  A,
  FA extends IAlternative<A, FA, ClassFA>,
  ClassFA extends IAlternativeClass<A, FA>
> extends IApplicative<A, FA, ClassFA>, IPlus<A, FA, ClassFA> {
}
export interface IAlternativeClass<A, FA>
  extends Constructor<FA>, IApplicativeClass<A, FA>, IPlusClass<A, FA> {
}

// Laws

type AtoB<A, B> = (_: A) => B;

export const Distributivity = <
  A, FA extends IAlternative<A, FA, ClassFA>, ClassFA extends IAlternativeClass<A, FA>,
  B, FB extends IAlternative<B, FB, ClassFB>, ClassFB extends IAlternativeClass<B, FB>,
  FAtoB extends IAlternative<AtoB<A, B>, FAtoB, ClassFAtoB>, ClassFAtoB extends IAlternativeClass<AtoB<A, B>, FAtoB>
>(
  AlternativeA: ClassFA, AlternativeB: ClassFB, AlternativeAtoB: ClassFAtoB,
  fa: FA, f: FAtoB, g: FAtoB
): boolean => {
  // Static methods
  return (
    AlternativeB['fantasy-land/equals'](
      AlternativeA['fantasy-land/ap'](fa, AlternativeAtoB['fantasy-land/alt'](f, g)),
      AlternativeB['fantasy-land/alt'](AlternativeA['fantasy-land/ap'](fa, f), AlternativeA['fantasy-land/ap'](fa, g))
    )
  )
  // Instance methods
  && (
    AlternativeB['fantasy-land/equals'](
      fa['fantasy-land/ap'](f['fantasy-land/alt'](g)),
      fa['fantasy-land/ap']<B, FB, ClassFB, FAtoB, ClassFAtoB>(f)['fantasy-land/alt'](fa['fantasy-land/ap']<B, FB, ClassFB, FAtoB, ClassFAtoB>(g))
    )
  );
}

export const Annihilation: <
  A, FA extends IAlternative<A, FA, ClassFA>, ClassFA extends IAlternativeClass<A, FA>,
  B, FB extends IAlternative<B, FB, ClassFB>, ClassFB extends IAlternativeClass<B, FB>,
  FAtoB extends IAlternative<AtoB<A, B>, FAtoB, ClassFAtoB>, ClassFAtoB extends IAlternativeClass<AtoB<A, B>, FAtoB>
>(
  AlternativeA: ClassFA, AlternativeB: ClassFB, AlternativeAtoB: ClassFAtoB,
  fa: FA
) => boolean =
(AlternativeA, AlternativeB, AlternativeAtoB, fa) => {
  // Static methods
  return (
    AlternativeB['fantasy-land/equals'](
      AlternativeA['fantasy-land/ap'](fa, AlternativeAtoB['fantasy-land/zero']()),
      AlternativeB['fantasy-land/zero']()
    )
  )
  // Instance methods
  && (
    AlternativeB['fantasy-land/equals'](
      fa['fantasy-land/ap'](AlternativeAtoB['fantasy-land/zero']()),
      AlternativeB['fantasy-land/zero']()
    )
  );
}
