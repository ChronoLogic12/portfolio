import { useState } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { Tooltip as RadixTooltip } from 'radix-ui'
import styles from './Tooltip.module.css'

interface TooltipProps {
  content: ReactNode
  children: ReactElement
}

export function Tooltip({ content, children }: TooltipProps) {
  const [open, setOpen] = useState(false)

  return (
    <RadixTooltip.Root open={open} onOpenChange={setOpen}>
      <RadixTooltip.Trigger asChild onClick={() => setOpen(true)}>
        {children}
      </RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content className={styles.content} side="top" sideOffset={8} collisionPadding={16}>
          {content}
          <RadixTooltip.Arrow className={styles.arrow} />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  )
}

export const TooltipProvider = RadixTooltip.Provider
