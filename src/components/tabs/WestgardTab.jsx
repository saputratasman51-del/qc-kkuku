import { useMemo, useState } from 'react'
import Icon from '../../components/Icon.jsx'
import { westgardRules } from '../../data/mockData.js'

const RULE_STYLE = {
  error: 'bg-error text-on-error shadow-sm',
  secondary: 'bg-secondary-fixed text-on-secondary-fixed',
  tertiary: 'bg-tertiary-fixed text-on-tertiary-fixed',
  closed: 'bg-surface-container text-on-surface',
}

const RULE_ICON = {
  error: 'cancel',
  secondary: 'warning',
  tertiary: 'info',
  closed: 'check_circle',
}

const TYPE_STYLE = {
  error: 'bg-error-container text-on-error-container',
  neutral: 'bg-surface-container-high text-on-surface',
  muted: 'bg-surface-container text-on-surface-variant',
}

const ACTION_STYLE = {
  error: 'bg-error text-on-error hover:opacity-90 shadow-sm',
  soft: 'bg-surface-container-high text-primary hover:bg-primary-fixed',
  plain: 'text-on-surface-variant hover:text-primary',
}

function CriticalAlert({ onOpenCapa }) {
  return (
    <div className="bg-error-container text-on-error-container p-space-md rounded-xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
      <div className="flex items-start gap-space-md">
        <div className="w-10 h-10 rounded-lg bg-error text-on-error flex items-center justify-center flex-shrink-0 shadow-sm">
          <Icon name="gpp_bad" className="text-headline-md" />
        </div>
        <div>
          <div className="flex items-center gap-space-xs flex-wrap">
            <span className="font-label-lg text-label-lg font-bold uppercase tracking-wider text-error">
              CRITICAL ALERT ANALYZER
            </span>
            <span className="px-space-xs py-0.5 rounded-DEFAULT bg-error text-on-error font-label-sm text-[10px] font-bold">
              DIRUI CS-T240 TERKUNCI
            </span>
            <span className="font-data-mono text-data-mono text-body-sm">ID Kejadian: #WG-20241024-001</span>
          </div>
          <p className="font-body-md text-body-md mt-0.5 text-on-error-container">
            Pelanggaran Aturan <strong>Westgard 1-3s (Outlier Ekstrem)</strong> terdeteksi pada{' '}
            <strong>Glukosa Darah (GOD-PAP) Level 3</strong>. Hasil QC:{' '}
            <strong>242.0 mg/dL (Z-Score +3.38 SD)</strong>. Interlock instrumen aktif: Penahanan rilis hasil 12 pasien
            rawat inap/jalan!
          </p>
        </div>
      </div>
      <div className="flex items-center gap-space-xs flex-shrink-0 w-full md:w-auto">
        <button
          type="button"
          onClick={onOpenCapa}
          className="w-full md:w-auto px-space-md py-2 rounded-lg bg-error text-on-error font-label-lg text-label-lg font-bold shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-1.5"
        >
          <Icon name="assignment_add" className="text-body-md" />
          <span>Buka Form Investigasi CAPA #042</span>
        </button>
      </div>
    </div>
  )
}

function LeveyJenningsStrip() {
  return (
    <div className="p-space-md bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-space-md">
      <div className="flex items-center gap-space-sm">
        <div className="w-8 h-8 rounded-lg bg-surface-container-lowest text-primary flex items-center justify-center shadow-sm">
          <Icon name="show_chart" className="text-body-md" />
        </div>
        <div>
          <span className="font-label-md text-label-md font-bold text-on-surface">
            Levey-Jennings Quick Snapshot • Glukosa GOD-PAP Level 3 (Bulan Oktober 2024)
          </span>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Target Mean: 215.0 mg/dL • 1 SD: 8.0 mg/dL • Titik #24 melampaui batas kritis +3 SD (239.0 mg/dL)
          </p>
        </div>
      </div>
      <div className="w-full md:w-80 h-12 bg-surface-container-lowest rounded-lg p-1.5 shadow-sm flex items-center">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 280 40">
          <line className="text-primary/40" stroke="currentColor" strokeWidth="1.5" x1="0" x2="280" y1="20" y2="20" />
          <line className="text-error/40" stroke="currentColor" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="280" y1="6" y2="6" />
          <line className="text-error/40" stroke="currentColor" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="280" y1="34" y2="34" />
          <polyline
            className="text-primary"
            fill="none"
            points="10,21 30,19 50,22 70,18 90,20 110,23 130,17 150,19 170,22 190,20 210,18 230,22 250,24 270,3"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle className="fill-primary" cx="250" cy="24" r="2.5" />
          <circle className="fill-error stroke-2 stroke-white animate-ping" cx="270" cy="3" r="4.5" />
          <circle className="fill-error stroke-2 stroke-white" cx="270" cy="3" r="4" />
        </svg>
      </div>
    </div>
  )
}

export default function WestgardTab({ onOpenCapa, onOpenQcDetail }) {
  const [statusFilter, setStatusFilter] = useState('all')
  const [instrumentFilter, setInstrumentFilter] = useState('all')

  const rows = useMemo(() => {
    return westgardRules.filter((r) => {
      const statusOk =
        statusFilter === 'all' ||
        (statusFilter === 'critical' && r.critical) ||
        (statusFilter === 'capa_pending' && (r.ruleStyle === 'secondary' || r.ruleStyle === 'tertiary')) ||
        (statusFilter === 'resolved' && r.ruleStyle === 'closed')
      const instOk = instrumentFilter === 'all' || r.instrument.toLowerCase().includes(instrumentFilter)
      return statusOk && instOk
    })
  }, [statusFilter, instrumentFilter])

  return (
    <div className="flex flex-col space-y-space-md">
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="flex flex-wrap items-center gap-space-sm flex-1">
          <div className="relative min-w-[200px] flex-1 sm:flex-initial">
            <Icon name="search" className="absolute left-2.5 top-2.5 text-on-surface-variant text-body-md" />
            <input
              type="text"
              placeholder="Cari parameter, lot, analyzer..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-space-sm py-1.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md focus:outline-none"
          >
            <option value="all">Semua Status Pelanggaran</option>
            <option value="critical">Kritis (Alat Terkunci)</option>
            <option value="capa_pending">Menunggu CAPA</option>
            <option value="resolved">Selesai / In-Control</option>
          </select>
          <select
            value={instrumentFilter}
            onChange={(e) => setInstrumentFilter(e.target.value)}
            className="px-space-sm py-1.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md focus:outline-none"
          >
            <option value="all">Semua Instrumen Laboratorium</option>
            <option value="dirui">Dirui CS-T240 (Kimia Klinik)</option>
            <option value="sysmex">Sysmex XN-550 (Hematologi)</option>
            <option value="cobas">Cobas e411 (Imunoserologi)</option>
          </select>
          <button
            type="button"
            className="px-space-sm py-1.5 rounded-lg bg-surface-container-high text-primary hover:bg-primary-fixed transition-colors font-label-md text-label-md font-semibold flex items-center gap-1"
          >
            <Icon name="filter_alt" className="text-body-sm" />
            Filter Lanjutan
          </button>
        </div>
        <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm self-end md:self-auto">
          <Icon name="sync" className="text-body-sm text-primary" />
          <span>Auto-sinkronisasi LIS 15 detik lalu</span>
        </div>
      </div>

      <CriticalAlert onOpenCapa={onOpenCapa} />

      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-md text-body-md">
            <thead>
              <tr className="bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                <th className="py-space-sm px-space-md">Waktu &amp; ID Run</th>
                <th className="py-space-sm px-space-md">Alat / Lokasi</th>
                <th className="py-space-sm px-space-md">Parameter &amp; Lot</th>
                <th className="py-space-sm px-space-md text-right">Nilai &amp; Z-Score</th>
                <th className="py-space-sm px-space-md">Aturan Terlanggar</th>
                <th className="py-space-sm px-space-md">Tipe Kesalahan</th>
                <th className="py-space-sm px-space-md">Dampak &amp; Status Alat</th>
                <th className="py-space-sm px-space-md text-center">Aksi Respon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {rows.map((r) => {
                const valueTone =
                  r.critical ? 'text-error' : r.valueTone === 'secondary' ? 'text-secondary' : 'text-on-surface'
                const zTone =
                  r.critical ? 'text-error' : r.valueTone === 'secondary' ? 'text-secondary' : 'text-on-surface-variant'
                const impactTone = r.critical ? 'text-error' : r.ruleStyle === 'closed' ? 'text-primary' : 'text-secondary'
                return (
                  <tr
                    key={r.id}
                    className={r.critical ? 'bg-error-container/20 hover:bg-error-container/30' : 'hover:bg-surface-container-low'}
                  >
                    <td className="py-space-sm px-space-md whitespace-nowrap">
                      <div className="flex flex-col">
                        <span
                          className={`font-data-mono text-data-mono text-on-surface ${r.critical ? 'font-bold' : 'font-medium'}`}
                        >
                          {r.date} • {r.time}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">{r.run}</span>
                      </div>
                    </td>
                    <td className="py-space-sm px-space-md whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg text-on-surface font-semibold">{r.instrument}</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">{r.location}</span>
                      </div>
                    </td>
                    <td className="py-space-sm px-space-md whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg text-primary font-bold">{r.parameter}</span>
                        <span className="font-data-mono text-data-mono text-body-sm text-on-surface-variant">{r.lot}</span>
                      </div>
                    </td>
                    <td className="py-space-sm px-space-md text-right whitespace-nowrap">
                      <div className="flex flex-col items-end">
                        <span
                          className={`font-data-mono text-data-mono text-headline-sm ${valueTone} ${
                            r.critical || r.valueTone === 'secondary' ? 'font-bold' : 'font-semibold'
                          }`}
                        >
                          {r.value}
                        </span>
                        <span className={`font-data-mono text-data-mono text-label-sm font-semibold ${zTone}`}>
                          {r.zscore}
                        </span>
                      </div>
                    </td>
                    <td className="py-space-sm px-space-md whitespace-nowrap">
                      <span
                        className={`px-space-sm py-1 rounded-DEFAULT font-label-sm text-label-sm font-bold flex items-center gap-1 w-fit ${RULE_STYLE[r.ruleStyle]}`}
                      >
                        <Icon name={RULE_ICON[r.ruleStyle]} className="text-[14px]" />
                        {r.rule}
                      </span>
                    </td>
                    <td className="py-space-sm px-space-md whitespace-nowrap">
                      <span
                        className={`px-space-xs py-0.5 rounded-DEFAULT font-label-sm text-label-sm ${TYPE_STYLE[r.errorTypeStyle]} ${
                          r.errorTypeStyle === 'neutral' ? 'font-medium' : 'font-semibold'
                        }`}
                      >
                        {r.errorType}
                      </span>
                    </td>
                    <td className="py-space-sm px-space-md whitespace-nowrap">
                      <div className="flex flex-col">
                        <span
                          className={`inline-flex items-center gap-1 font-label-sm text-label-sm font-bold ${impactTone}`}
                        >
                          {r.critical && <span className="w-2 h-2 rounded-full bg-error" />}
                          {r.impact}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">{r.impactNote}</span>
                      </div>
                    </td>
                    <td className="py-space-sm px-space-md text-center whitespace-nowrap">
                      {r.action === 'qc-detail' ? (
                        <button
                          type="button"
                          onClick={onOpenQcDetail}
                          className={`px-space-sm py-1 rounded-lg font-label-sm text-label-sm font-semibold transition-all ${ACTION_STYLE[r.actionStyle]}`}
                        >
                          {r.actionLabel}
                        </button>
                      ) : r.actionStyle === 'text' ? (
                        <span className="font-label-sm text-label-sm text-primary font-semibold">{r.actionLabel}</span>
                      ) : (
                        <button
                          type="button"
                          onClick={r.action === 'investigasi' ? onOpenCapa : undefined}
                          className={`px-space-sm py-1 rounded-lg font-label-sm text-label-sm font-semibold transition-all ${ACTION_STYLE[r.actionStyle]}`}
                        >
                          {r.actionLabel}
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-space-lg px-space-md text-center text-on-surface-variant font-body-sm">
                    Tidak ada pelanggaran yang cocok dengan filter terpilih.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <LeveyJenningsStrip />
      </div>
    </div>
  )
}
