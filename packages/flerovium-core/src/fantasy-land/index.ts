import { Constructor } from '../indextest';

export interface IFilterable<A> {
  'fantasy-land/filter': (pred: (_: A) => boolean) => IFilterable<A>;
}
export interface IFilterableClass<A> extends Constructor<IFilterable<A>> {}

export interface IFunctor<A> {
  'fantasy-land/map': <B>(f: (_: A) => B) => IFunctor<B>;
}
export interface IFunctorClass<A> extends Constructor<IFunctor<A>> {}

export interface IContravariant<A> {
  'fantasy-land/contramap': <B>(f: (_: B) => A) => IContravariant<B>;
}
export interface IContravariantClass<A> extends Constructor<IContravariant<A>> {}

export interface IApply<A> extends IFunctor<A> {
  'fantasy-land/ap': <B>(f: IApply<(_: A) => B>) => IApply<B>;
}
export interface IApplyClass<A> extends Constructor<IApply<A>> {}

export interface IApplicative<A> extends IApply<A> {} 
export interface IApplicativeClass<A> extends Constructor<IApplicative<A>> {
  'fantasy-land/of': (a: A) => IApplicative<A>;
}

export interface IAlt<A> extends IFunctor<A> {
  'fantasy-land/alt': (a: IAlt<A>) => IAlt<A>;
}
export interface IAltClass<A> extends Constructor<IAlt<A>> {}

export interface IPlus<A> extends IAlt<A> {}
export interface IPlus<A> extends Constructor<IPlus<A>> {
  'fantasy-land/zero': () => IPlus<A>;
}

export interface IAlternative<A> extends IApplicative<A>, IPlus<A> {
}
export interface IAlternativeClass<A> extends Constructor<IAlternative<A>> {}

export interface IFoldable<A> {
  'fantasy-land/reduce': <B>(binop: (a: A, b: B) => B, initial: B) => B;
}
export interface IFoldableClass<A> extends Constructor<IFoldable<A>> {}

// export interface ITraversable<A> extends IFunctor<A>, IFoldable<A> {
//   'fantasy-land/traverse': <B>(a: IApplicativeClass<any>, f: (_: A) => IApplicative<B>) => IApplicative<ITraversable<B>>;
// }

export interface IChain<A> extends IApply<A> {
  'fantasy-land/chain': <B>(f: (_: A) => IChain<B>) => IChain<B>;
}
export interface IChainClass<A> extends Constructor<IChain<A>> {}

export interface IChainRec<A> extends IChain<A> {}
export interface IChainRecClass<A> extends Constructor<IChainRec<A>> {
  'fantasy-land/chainRec': <B, C>(f: (next: (_: A) => C, done: (_: B) => C, value: A) => IChainRec<C>, i: A) => IChainRec<B>;
}

export interface IMonad<A> extends IApplicative<A>, IChain<A> {}
export interface IMonadClass<A> extends IApplicativeClass<A> {}

export interface IExtend<A> extends IFunctor<A> {
  'fantasy-land/extend': <B>(f: (_: IExtend<A>) => B) => IExtend<B>;
}
export interface IExtendClass<A> extends Constructor<IExtend<A>> {}

export interface IComonad<A> extends IExtend<A> {
  'fantasy-land/extract': () => A;
}
export interface IComonadClass<A> extends Constructor<IComonad<A>> {}

export interface IBifunctor<A, C> extends IFunctor<C> {
  'fantasy-land/bimap': <B, D>(f: (_: A) => B, g: (_: C) => D) => IBifunctor<B, D>;
}
export interface IBifunctorClass<A, C> extends Constructor<IBifunctor<A, C>> {}

export interface IProfunctor<B, C> extends IFunctor<C> {
  'fantasy-land/promap': <A, D>(f: (_: A) => B, g: (_: C) => D) => IProfunctor<A, D>;
}
export interface IProfunctorClass<B, C> extends Constructor<IProfunctor<B, C>> {}
