import Icon from './Icon.jsx'

const CARDS = [
  {
    key: 'breach',
    label: 'Pelanggaran Westgard',
    icon: 'error',
    tone: 'error',
    value: '2',
    unit: 'Kasus Kritis',
    iconBox: 'bg-error-container text-on-error-container',
    blob: 'bg-error-container/40',
    footer: <span className="px-space-xs py-0.5 rounded-DEFAULT bg-error-container text-on-error-container font-label-sm text-label-sm font-bold flex-shrink-0">Alat Terkunci</span>,
    footerText: 'Glukosa (1-3s) & SGPT (2-2s)',
  },
  {
    key: 'active',
    label: 'CAPA Aktif (Proses)',
    icon: 'pending_actions',
    tone: 'secondary',
    value: '3',
    unit: 'Dokumen',
    iconBox: 'bg-secondary-fixed text-on-secondary-fixed',
    blob: 'bg-secondary-container/30',
    footer: <span className="font-label-sm text-label-sm text-on-secondary-container font-semibold">Resolusi 3.2 Jam</span>,
    footerText: '1 Overdue • 2 Investigasi',
  },
  {
    key: 'verify',
    label: 'Menunggu Verifikasi Sp.PK',
    icon: 'verified_user',
    tone: 'primary',
    value: '2',
    unit: 'Siap Divalidasi',
    iconBox: 'bg-primary-fixed text-on-primary-fixed',
    blob: 'bg-primary-fixed/40',
    footer: <span className="px-space-xs py-0.5 rounded-DEFAULT bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">Ttd Digital</span>,
    footerText: 'dr. Hendra Pratama, Sp.PK',
  },
  {
    key: 'resolved',
    label: 'CAPA Selesai (Bulan Ini)',
    icon: 'check_circle',
    tone: 'muted',
    value: '14',
    unit: 'Kasus (87.5%)',
    iconBox: 'bg-surface-container-high text-primary',
    blob: 'bg-surface-container-high/60',
    footer: <span className="font-label-sm text-label-sm text-primary font-bold">100% Audit Ready</span>,
    footerText: 'Sesuai SLA Mutu Lab',
  },
]

const LABEL_TONE = {
  error: 'text-error',
  secondary: 'text-secondary',
  primary: 'text-primary',
  muted: 'text-on-surface-variant',
}

const ICON_TONE = {
  error: 'text-error',
  secondary: 'text-secondary',
  primary: 'text-primary',
  muted: 'text-primary',
}

const UNIT_TONE = {
  error: 'text-error',
  secondary: 'text-secondary',
  primary: 'text-primary',
  muted: 'text-primary',
}

export default function KpiGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-xl">
      {CARDS.map((c) => (
        <div
          key={c.key}
          className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden"
        >
          <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${c.blob} rounded-full blur-xl pointer-events-none`} />
          <div className="flex items-start justify-between">
            <div>
              <span
                className={`font-label-sm text-label-sm uppercase tracking-wider font-bold flex items-center gap-1 ${LABEL_TONE[c.tone]}`}
              >
                <Icon name={c.icon} className={`text-body-sm ${ICON_TONE[c.tone]}`} />
                {c.label}
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-headline-lg text-headline-lg font-bold text-on-surface">{c.value}</span>
                <span className={`font-label-md text-label-md font-semibold ${UNIT_TONE[c.tone]}`}>{c.unit}</span>
              </div>
            </div>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0 ${c.iconBox}`}>
              <Icon
                name={c.key === 'breach' ? 'lock' : c.key === 'active' ? 'assignment_late' : c.key === 'verify' ? 'signature' : 'task_alt'}
                className="text-headline-md"
              />
            </div>
          </div>
          <div className="mt-space-md pt-space-xs flex items-center justify-between font-body-sm text-body-sm">
            <span className="text-on-surface-variant truncate">{c.footerText}</span>
            {c.footer}
          </div>
        </div>
      ))}
    </div>
  )
}
