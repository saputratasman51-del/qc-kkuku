import { NavLink } from 'react-router-dom'
import Icon from './Icon.jsx'
import { IMG_LOGO, navItems } from '../data/mockData.js'

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between">
      <div className="flex flex-col flex-1 min-h-0">
        <div className="px-space-md py-space-md flex items-center gap-space-sm bg-surface-container-low">
          <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center p-space-xs shadow-[0_1px_4px_rgba(0,0,0,0.04)] flex-shrink-0">
            <img alt="Lambang Daerah Kab. Kayong Utara" className="w-full h-full object-contain" src={IMG_LOGO} />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold truncate">
                SIM-QC LAB
              </span>
              <span className="px-space-xs py-0.5 rounded-DEFAULT bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase">
                v2.4
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
              RSUD SMJ I Kayong Utara
            </span>
          </div>
        </div>

        <div className="px-space-md pt-space-md pb-space-xs">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            Menu Analisis QC
          </span>
        </div>

        <nav className="flex-1 px-space-sm space-y-space-xs overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-between px-space-md py-space-sm rounded-lg transition-all font-body-md text-body-md ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-semibold rounded-lg shadow-[0_2px_6px_rgba(0,92,85,0.15)]'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`
              }
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <Icon name={item.icon} className="text-headline-sm" />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-space-xs py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-space-sm bg-surface-container-low">
        <div className="p-space-sm rounded-xl bg-surface-container-lowest shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-space-xs">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-primary font-semibold">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
              Shift Pagi - Aktif
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Inst. Lab</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">
              dr. Hendra Pratama, Sp.PK
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant truncate pt-0.5">
              Petugas: Siti Rahma, A.Md.AK
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}
