import { Constructor } from '../util/constructor';
import { IMonoid, IMonoidClass } from './monoid';

export interface IGroup<Group extends IGroup<Group>> extends IMonoid<Group> {
  'fantasy-land/concat': (b: Group) => Group;
  'fantasy-land/invert': () => Group;
}
export interface IGroupClass<Group extends IGroup<Group>>
  extends Constructor<Group>, IMonoidClass<Group> {}

export const RightInverse: <Group extends IGroup<Group>>(
  g: Group, Group: IGroupClass<Group>
) => boolean =
(g, Group) => {
  return g['fantasy-land/concat'](g['fantasy-land/invert']()) === Group['fantasy-land/empty']();
}

export const LeftInverse: <Group extends IGroup<Group>>(
  g: Group, Group: IGroupClass<Group>
) => boolean =
(g, Group) => {
  return g['fantasy-land/invert']()['fantasy-land/concat'](g) === Group['fantasy-land/empty']();
}
