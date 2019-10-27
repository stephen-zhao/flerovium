import { Constructor } from '../util/constructor';
import { IFunctor, IFunctorClass, isIFunctor } from './functor';

// Definitions

export interface IApply<
  A,
  FA extends IApply<A, FA, ClassFA>,
  ClassFA extends IApplyClass<A, FA>
> extends IFunctor<A, FA, ClassFA> {
  'fantasy-land/ap': <
    B, FB extends IApply<B, FB, ClassFB>, ClassFB extends IApplyClass<B, FB>,
    FAtoB extends IApply<(_: A) => B, FAtoB, ClassFAtoB>, ClassFAtoB extends IApplyClass<(_: A) => B, FAtoB>
  >(f: FAtoB) => FB;
}
export interface IApplyClass<A, FA> extends Constructor<FA>, IFunctorClass<A, FA> {
  'fantasy-land/ap': <
    B, FB extends IApply<B, FB, ClassFB>, ClassFB extends IApplyClass<B, FB>,
    FAtoB extends IApply<(_: A) => B, FAtoB, ClassFAtoB>, ClassFAtoB extends IApplyClass<(_: A) => B, FAtoB>
  >(a: FA, f: FAtoB) => FB;
}
export function isIApply<
  A,
  FA extends IApply<A, FA, ClassFA>,
  ClassFA extends IApplyClass<A, FA>
>(fa: any): fa is IApply<A, FA, ClassFA> {
  if (fa === undefined || fa === null) {
    return false;
  }
  else {
    return isIFunctor(fa) && (fa as Object).hasOwnProperty('fantasy-land/ap');
  }
}

// Laws

export const Composition = <
  A, FA extends IApply<A, FA, ClassFA>, ClassFA extends IApplyClass<A, FA>,
  B, FB extends IApply<B, FB, ClassFB>, ClassFB extends IApplyClass<B, FB>,
  C, FC extends IApply<C, FC, ClassFC>, ClassFC extends IApplyClass<C, FC>,
  FAtoB extends IApply<(_: A) => B, FAtoB, ClassFAtoB>, ClassFAtoB extends IApplyClass<(_: A) => B, FAtoB>,
  FBtoC extends IApply<(_: B) => C, FBtoC, ClassFBtoC>, ClassFBtoC extends IApplyClass<(_: B) => C, FBtoC>,
  FAtoC extends IApply<(_: A) => C, FAtoC, ClassFAtoC>, ClassFAtoC extends IApplyClass<(_: A) => C, FAtoC>,
  FABtoAC extends IApply<(_: (_: A) => B) => (_: A) => C, FABtoAC, ClassFABtoAC>, ClassFABtoAC extends IApplyClass<(_: (_: A) => B) => (_: A) => C, FABtoAC>,
>(
  ApplyA: ClassFA, ApplyB: ClassFB, ApplyC: ClassFC, ApplyAtoB: ClassFAtoB, ApplyBtoC: ClassFBtoC,
  fa: FA, fab: FAtoB, fbc: FBtoC
): boolean => {

  const s_fc1: FC = ApplyB['fantasy-land/ap'](ApplyA['fantasy-land/ap'](fa, fab), fbc);
  const i_fc1: FC = fa['fantasy-land/ap']<B, FB, ClassFB, FAtoB, ClassFAtoB>(fab)['fantasy-land/ap']<C, FC, ClassFC, FBtoC, ClassFBtoC>(fbc);

  const s_ab_a_fc: FABtoAC = ApplyBtoC['fantasy-land/map'](fbc, (f: (_: B) => C) => (g: (_: A) => B) => (x: A) => f(g(x)));
  const s_a_fc: FAtoC = ApplyAtoB['fantasy-land/ap'](fab, s_ab_a_fc);
  const s_fc2: FC = ApplyA['fantasy-land/ap'](fa, s_a_fc);
  const i_ab_a_fc: FABtoAC = fbc['fantasy-land/map']((f: (_: B) => C) => (g: (_: A) => B) => (x: A) => f(g(x)));
  const i_a_fc: FAtoC = fab['fantasy-land/ap'](i_ab_a_fc);
  const i_fc2: FC = fa['fantasy-land/ap'](i_a_fc);

  // Static methods
  return (
    ApplyC['fantasy-land/equals'](s_fc1, s_fc2)
  )
  // Instance methods
  && (
    ApplyC['fantasy-land/equals'](i_fc1, i_fc2)
  );
}
