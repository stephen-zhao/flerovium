import { Constructor } from '../util/constructor';
import { IApply, IApplyClass, isIApply } from './apply';

// Definitions

export interface IApplicative<
  A,
  FA extends IApplicative<A, FA, ClassFA>,
  ClassFA extends IApplicativeClass<A, FA>
> extends IApply<A, FA, ClassFA> {
}
export interface IApplicativeClass<A, FA> extends Constructor<FA>, IApplyClass<A, FA> {
  'fantasy-land/of': (a: A) => FA;
}
export function isIApplicative<
  A,
  FA extends IApplicative<A, FA, ClassFA>,
  ClassFA extends IApplicativeClass<A, FA>
>(fa: any): fa is IApplicative<A, FA, ClassFA> {
  if (fa === undefined || fa === null) {
    return false;
  }
  else {
    return isIApply(fa);
  }
}

// Laws

type AtoB<A, B> = (_: A) => B;
type ABtoB<A, B> = (_: (_: A) => B) => B;

export const Identity: <
  A, FA extends IApplicative<A, FA, ClassFA>, ClassFA extends IApplicativeClass<A, FA>,
  FAtoA extends IApplicative<(_: A) => A, FAtoA, ClassFAtoA>, ClassFAtoA extends IApplicativeClass<(_: A) => A, FAtoA>
>(
  ApplicativeA: ClassFA, ApplicativeAtoA: ClassFAtoA,
  fa: FA
) => boolean =
(ApplicativeA, ApplicativeAtoA, fa) => {
  // Static methods
  return (
    ApplicativeA['fantasy-land/equals'](
      ApplicativeA['fantasy-land/ap'](fa, ApplicativeAtoA['fantasy-land/of'](x => x)),
      fa
    )
  )
  // Instance methods
  && (
    ApplicativeA['fantasy-land/equals'](
      fa['fantasy-land/ap'](ApplicativeAtoA['fantasy-land/of'](x => x)),
      fa
    )
  );
}

export const Homomorphism: <
  A, FA extends IApplicative<A, FA, ClassFA>, ClassFA extends IApplicativeClass<A, FA>,
  B, FB extends IApplicative<B, FB, ClassFB>, ClassFB extends IApplicativeClass<B, FB>,
  FAtoB extends IApplicative<AtoB<A, B>, FAtoB, ClassFAtoB>, ClassFAtoB extends IApplicativeClass<AtoB<A, B>, FAtoB>
>(
  ApplicativeA: ClassFA, ApplicativeB: ClassFB, ApplicativeF: ClassFAtoB,
  a: A, f: AtoB<A, B>
) => boolean =
(ApplicativeA, ApplicativeB, ApplicativeF, a, f, ) => {
  // Static methods
  return ApplicativeB['fantasy-land/equals'](
    ApplicativeA['fantasy-land/ap'](ApplicativeA['fantasy-land/of'](a), ApplicativeF['fantasy-land/of'](f)),
    ApplicativeB['fantasy-land/of'](f(a))
  )
  // Instance methods
  && (
    ApplicativeB['fantasy-land/equals'](
      ApplicativeA['fantasy-land/of'](a)['fantasy-land/ap'](ApplicativeF['fantasy-land/of'](f)),
      ApplicativeB['fantasy-land/of'](f(a))
    )
  );
}

export const Interchange: <
  A, FA extends IApplicative<A, FA, ClassFA>, ClassFA extends IApplicativeClass<A, FA>,
  B, FB extends IApplicative<B, FB, ClassFB>, ClassFB extends IApplicativeClass<B, FB>,
  FAtoB extends IApplicative<AtoB<A, B>, FAtoB, ClassFAtoB>, ClassFAtoB extends IApplicativeClass<AtoB<A, B>, FAtoB>,
  FABtoB extends IApplicative<ABtoB<A, B>, FABtoB, ClassFABtoB>, ClassFABtoB extends IApplicativeClass<ABtoB<A, B>, FABtoB>
>(
  ApplicativeA: ClassFA, ApplicativeB: ClassFB, ApplicativeAtoB: ClassFAtoB, ApplicativeABtoB: ClassFABtoB,
  a: A, fab: FAtoB
) => boolean =
(ApplicativeA, ApplicativeB, ApplicativeAtoB, ApplicativeABtoB, a, fab) => {
  // Static methods
  return (
    ApplicativeB['fantasy-land/equals'](
      ApplicativeA['fantasy-land/ap'](ApplicativeA['fantasy-land/of'](a), fab),
      ApplicativeAtoB['fantasy-land/ap'](fab, ApplicativeABtoB['fantasy-land/of'](f => f(a)))
    )
  )
  // Instance methods
  && (
    ApplicativeB['fantasy-land/equals'](
      ApplicativeA['fantasy-land/of'](a)['fantasy-land/ap'](fab),
      fab['fantasy-land/ap'](ApplicativeABtoB['fantasy-land/of'](f => f(a)))
    )
  );
}
