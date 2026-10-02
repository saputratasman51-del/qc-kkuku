import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'
import { IMG_AVATAR, IMG_HEADER_LOGO } from '../data/mockData.js'

const DAYS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

const ROLES = {
  default: ['Petugas Lab', 'Sp.PK'],
  dashboard: ['Petugas Lab', 'PJ / Sp.PK'],
}

function BrandBlock() {
  return (
    <div className="flex items-center gap-space-sm min-w-0">
      <img alt="Lambang Daerah Kab. Kayong Utara" className="w-7 h-7 object-contain flex-shrink-0" src={IMG_HEADER_LOGO} />
      <div className="flex flex-col min-w-0">
        <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight truncate">
          SIM-QC LAB v2.4 - RSUD SMJ I Kayong Utara
        </span>
        <div className="flex items-center gap-space-xs">
          <span className="px-space-xs py-0.5 rounded-DEFAULT bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold truncate">
            Instalasi Laboratorium Patologi Klinik
          </span>
          <span className="hidden lg:inline-flex items-center px-space-xs py-0.5 rounded-DEFAULT bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold gap-1 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            DATA DEMO AKTIF
          </span>
        </div>
      </div>
    </div>
  )
}

function BreadcrumbBlock({ title }) {
  return (
    <div className="flex items-center gap-space-md min-w-0">
      <div className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
        <Icon name="local_hospital" className="text-body-lg text-primary" />
        <span className="font-semibold text-on-surface">Instalasi Laboratorium Patologi Klinik</span>
        <Icon name="chevron_right" className="text-body-sm" />
        <span className="text-primary font-medium truncate">{title}</span>
      </div>
      <div className="hidden xl:flex items-center px-space-sm py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
        DATA DEMO AKTIF
      </div>
    </div>
  )
}

export default function Header({ variant = 'default', title, role, onRoleChange }) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const dateText = `${DAYS[now.getDay()]}, ${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`
  const timeText = now.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta',
  })

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] z-40 px-gutter-desktop flex items-center justify-between">
      {variant === 'dashboard' ? <BreadcrumbBlock title={title} /> : <BrandBlock />}

      <div className="flex items-center gap-space-md">
        <div className="hidden md:flex items-center gap-space-xs px-space-sm py-1.5 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm flex-shrink-0">
          <Icon name="calendar_today" className="text-body-sm text-primary" />
          <span>{dateText}</span>
          <span className="text-on-surface-variant">•</span>
          <span className="font-data-mono text-data-mono font-medium">{timeText} WIB</span>
        </div>

        <div className="flex items-center bg-surface-container-low p-0.5 rounded-lg flex-shrink-0">
          {ROLES[variant].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onRoleChange(r)}
              className={`px-space-sm py-1 rounded-DEFAULT font-label-sm text-label-sm transition-all ${
                role === r
                  ? 'bg-surface-container-lowest text-on-surface shadow-[0_1px_2px_rgba(0,0,0,0.05)] font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface font-medium'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-space-xs">
          <button
            type="button"
            title="Cetak Lembar QC"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
          >
            <Icon name="print" className="text-headline-sm" />
          </button>
          <button
            type="button"
            title="Ekspor Data (Excel/PDF)"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
          >
            <Icon name="file_download" className="text-headline-sm" />
          </button>
          <div className="relative">
            <button
              type="button"
              title="Notifikasi Pelanggaran Westgard"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
            >
              <Icon name="notifications" className="text-headline-sm" />
            </button>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface-container-lowest" />
          </div>
        </div>

        <div className="flex items-center pl-space-xs">
          <img alt="Profil anys" className="w-8 h-8 rounded-full object-cover" src={IMG_AVATAR} />
        </div>
      </div>
    </header>
  )
}
