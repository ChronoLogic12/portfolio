import styles from './Button.module.css'

interface ButtonOptions {
  variant?: 'default' | 'primary' | 'unavailable'
  size?: 'default' | 'small'
}

export const buttonClass = ({ variant = 'default', size = 'default' }: ButtonOptions = {}) =>
  [
    styles.button,
    variant === 'primary' && styles.primary,
    variant === 'unavailable' && styles.unavailable,
    size === 'small' && styles.small,
  ]
    .filter(Boolean)
    .join(' ')
