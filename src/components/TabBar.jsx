import Icon from './Icon.jsx'

export const TABS = [
  {
    id: 'tab-westgard',
    icon: 'warning',
    label: 'Daftar Pelanggaran Westgard',
    badge: { text: '2 Kritis', className: 'bg-error text-on-error' },
  },
  {
    id: 'tab-investigasi',
    icon: 'biotech',
    label: 'Investigasi & Form CAPA #042',
    badge: { text: 'Aktif', className: 'bg-secondary-fixed text-on-secondary-fixed' },
  },
  {
    id: 'tab-verifikasi',
    icon: 'approval',
    label: 'Otorisasi & Tanda Tangan Sp.PK',
    badge: { text: '2 Menunggu', className: 'bg-primary-fixed text-on-primary-fixed' },
  },
  {
    id: 'tab-rekap',
    icon: 'table_view',
    label: 'Rekapitulasi CAPA & Audit Trail',
  },
]

export default function TabBar({ activeTab, onChange }) {
  return (
    <div className="bg-surface-container-lowest p-space-xs rounded-xl shadow-sm mb-space-md flex flex-wrap items-center justify-between gap-space-sm">
      <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto p-0.5">
        {TABS.map((t) => {
          const active = t.id === activeTab
          return (
            <button
              key={t.id}
              id={`btn-${t.id}`}
              type="button"
              onClick={() => onChange(t.id)}
              className={`px-space-md py-2 rounded-lg font-label-md text-label-md font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                active
                  ? 'bg-primary-container text-on-primary-container shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              <Icon name={t.icon} className="text-body-md" />
              <span>{t.label}</span>
              {t.badge && (
                <span className={`px-space-xs py-0.5 rounded-full font-label-sm text-[10px] font-bold ${t.badge.className}`}>
                  {t.badge.text}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="hidden xl:flex items-center gap-space-sm px-space-sm py-1 bg-surface-container-low rounded-lg text-on-surface-variant font-label-sm text-label-sm">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-error" />1-3s / R-4s Reject
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-secondary" />2-2s / 4-1s Sistematik
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-tertiary" />1-2s Peringatan
        </span>
      </div>
    </div>
  )
}
