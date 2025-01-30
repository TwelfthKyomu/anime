import Star from '@public/svg/star.svg';
import Bookmark from '@public/svg/bookmark.svg';
import Heart from '@public/svg/heart.svg';
import Info from '@public/svg/info.svg';
import Playlist from '@public/svg/playlist.svg';
import Plus from '@public/svg/plus.svg';
import ChevronRight from '@public/svg/chevron-right.svg';
import ArrowDown from '@public/svg/arrow-down.svg';
import ArrowRight from '@public/svg/arrow-right.svg';
import ExternalLink from '@public/svg/external-link.svg';
import Play from '@public/svg/play.svg';
import Pause from '@public/svg/pause.svg';
import Volume from '@public/svg/volume.svg';
import Filter from '@public/svg/filter.svg';
import Settings from '@public/svg/settings.svg';
import Search from '@public/svg/search.svg';
import Share from '@public/svg/share.svg';
import Comment from '@public/svg/comment.svg';

export type IconNameT =
    | 'arrow-down'
    | 'star'
    | 'bookmark'
    | 'heart'
    | 'info'
    | 'playlist'
    | 'plus'
    | 'chevron-right'
    | 'arrow-right'
    | 'external-link'
    | 'play'
    | 'pause'
    | 'volume'
    | 'filter'
    | 'settings'
    | 'search'
    | 'share'
    | 'comment';

export const iconMap = {
    'arrow-down': ArrowDown,
    'star': Star,
    'bookmark': Bookmark,
    'heart': Heart,
    'info': Info,
    'playlist': Playlist,
    'plus': Plus,
    'chevron-right': ChevronRight,
    'arrow-right': ArrowRight,
    'external-link': ExternalLink,
    'play': Play,
    'pause': Pause,
    'volume': Volume,
    'filter': Filter,
    'settings': Settings,
    'search': Search,
    'share': Share,
    'comment': Comment,
};