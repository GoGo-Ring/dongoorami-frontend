import AlarmIcon from './alarm';
import ChatIcon from './chat';
import ChevronDownIcon from './chevron-down';
import EyeIcon from './eye';
import FilterIcon from './filter';
import HeartIcon from './heart';
import MenuIcon from './menu';
import MessageIcon from './message';
import SearchIcon from './search';
import StarIcon from './star';
import UserIcon from './user';

const iconName = {
  alarm: AlarmIcon,
  chat: ChatIcon,
  'chevron-down': ChevronDownIcon,
  eye: EyeIcon,
  filter: FilterIcon,
  heart: HeartIcon,
  menu: MenuIcon,
  message: MessageIcon,
  search: SearchIcon,
  star: StarIcon,
  user: UserIcon,
};

export type IconNames = keyof typeof iconName;
export default iconName;
