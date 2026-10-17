import { Mark } from './Mark'

interface LogoProps {
  size?: number
  className?: string
}

export function Logo({ size = 28, className }: LogoProps) {
  return <Mark size={size} className={className} />
}
