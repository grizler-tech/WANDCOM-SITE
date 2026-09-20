import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Layers,
  Loader,
  Mail,
  MapPin,
  MessageCircle,
  Minus,
  Monitor,
  Palette,
  Phone,
  Plus,
  Quote,
  Rocket,
  Search,
  Send,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Workflow,
  X,
  Zap,
  type LucideIcon,
} from 'lucide-react';

/**
 * Icon registry.
 *
 * Content files reference icons by string key (`"workflow"`), which keeps them
 * free of React imports and safe for a future CMS. Add new icons here only —
 * never import lucide directly in a content file.
 */
export const iconRegistry = {
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up-right': ArrowUpRight,
  check: Check,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  clock: Clock,
  layers: Layers,
  loader: Loader,
  mail: Mail,
  'map-pin': MapPin,
  'message-circle': MessageCircle,
  minus: Minus,
  monitor: Monitor,
  palette: Palette,
  phone: Phone,
  plus: Plus,
  quote: Quote,
  rocket: Rocket,
  search: Search,
  send: Send,
  sparkles: Sparkles,
  star: Star,
  target: Target,
  'trending-up': TrendingUp,
  users: Users,
  workflow: Workflow,
  x: X,
  zap: Zap,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconRegistry;

interface IconProps {
  name: IconName;
  className?: string;
  strokeWidth?: number;
  'aria-hidden'?: boolean;
}

export function Icon({ name, className, strokeWidth = 1.6, ...rest }: IconProps) {
  const Component = iconRegistry[name];
  return (
    <Component
      className={className}
      strokeWidth={strokeWidth}
      aria-hidden={rest['aria-hidden'] ?? true}
    />
  );
}
