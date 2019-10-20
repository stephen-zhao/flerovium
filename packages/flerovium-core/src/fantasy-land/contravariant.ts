import { Constructor } from '../util/constructor';

export interface IContravariant<A> {
  'fantasy-land/contramap': <B>(f: (_: B) => A) => IContravariant<B>;
}
export interface IContravariantClass<A, IContravariantA extends IContravariant<A>>
  extends Constructor<IContravariantA> {}

export const Identity: <A>(
  u: IContravariant<A>
) => boolean =
<A>(u: IContravariant<A>) => {
  return u['fantasy-land/contramap']<A>(x => x) === u;
}
