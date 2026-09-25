import {
  CalendarCheck,
  ConstructionIcon,
  Clock3,
  HardHat,
  MapPin,
  MessageSquare,
  Settings2,
  ShieldCheck,
  Truck,
  UserCheck,
  Users,
  Weight,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

/**
 * Name-to-icon map so content files can reference icons as plain strings
 * without importing React components into data.
 */
const ICONS = {
  crane: ConstructionIcon,
  truck: Truck,
  hardhat: HardHat,
  weight: Weight,
  shield: ShieldCheck,
  'shield-check': ShieldCheck,
  clock: Clock3,
  settings: Settings2,
  users: Users,
  'map-pin': MapPin,
  wrench: Wrench,
  'calendar-check': CalendarCheck,
  'message-square': MessageSquare,
  'user-check': UserCheck,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

export function Icon({
  name,
  className,
  strokeWidth = 1.5,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = ICONS[name];
  return <Cmp aria-hidden="true" className={className} strokeWidth={strokeWidth} />;
}
