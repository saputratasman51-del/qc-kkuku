import { useEffect } from 'react'
import Icon from './Icon.jsx'

export default function Modal({
  open,
  onClose,
  header,
  icon,
  title,
  subtitle,
  iconClass = 'text-primary',
  headerBg = 'bg-surface-container',
  children,
  footer,
  maxWidth = 'max-w-xl',
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const headerNode =
    header ??
    (title
      ? (
          <div className={`px-space-lg py-space-md ${headerBg} flex items-center justify-between`}>
            <div className="flex items-center gap-space-sm">
              <div className="w-9 h-9 rounded-lg bg-surface-container-lowest flex items-center justify-center shadow-sm">
                <Icon name={icon} className={`text-headline-sm ${iconClass}`} />
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">{title}</h3>
                <span className="font-label-sm text-label-sm text-on-surface-variant">{subtitle}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              <Icon name="close" className="text-headline-sm" />
            </button>
          </div>
        )
      : null)

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-inverse-surface/60 backdrop-blur-xs p-space-md"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className={`bg-surface-container-lowest rounded-xl shadow-xl w-full ${maxWidth} overflow-hidden flex flex-col animate-modal-in`}
      >
        {headerNode}
        {children}
        {footer}
      </div>
    </div>
  )
}

export function ModalHeader({ icon, title, subtitle, iconClass = 'text-primary', bgClass = 'bg-surface-container', onClose }) {
  return (
    <div className={`px-space-lg py-space-md ${bgClass} flex items-center justify-between`}>
      <div className="flex items-center gap-space-sm">
        <div className="w-9 h-9 rounded-lg bg-surface-container-lowest flex items-center justify-center shadow-sm">
          <Icon name={icon} className={`text-headline-sm ${iconClass}`} />
        </div>
        <div className="flex flex-col">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">{title}</h3>
          <span className="font-label-sm text-label-sm text-on-surface-variant">{subtitle}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
      >
        <Icon name="close" className="text-headline-sm" />
      </button>
    </div>
  )
}
