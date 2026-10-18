import {
  Compass, Cpu, Factory, Globe, HardHat, Handshake, Leaf, Lightbulb, Settings, ShieldCheck, Target, TrendingUp, Truck, Users, Zap,
  type LucideIcon,
} from 'lucide-react';
import type { IconKey } from '../types';

export const ICONS: Record<IconKey, LucideIcon> = {
  shield: ShieldCheck,
  compass: Compass,
  handshake: Handshake,
  leaf: Leaf,
  lightbulb: Lightbulb,
  users: Users,
  factory: Factory,
  cpu: Cpu,
  truck: Truck,
  zap: Zap,
  hardhat: HardHat,
  cog: Settings,
  globe: Globe,
  target: Target,
  trending: TrendingUp,
};
