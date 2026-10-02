import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import {
  laporanAnalyzers,
  laporanAuditTrail,
  laporanCapaRecap,
  laporanComplianceByInstrument,
  laporanExportOptions,
  laporanGrading,
  laporanKpis,
  laporanParameterPerformance,
  laporanPeriods,
  laporanShifts,
  laporanTrend,
} from '../data/laporanData.js'

const FIELD =
  'h-9 px-3 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md outline-none cursor-pointer w-full sm:w-auto'
const SECTION_HEAD = 'py-space-sm px-space-md font-semibold'
const SOFT_BTN =
  'px-space-sm py-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold flex items-center gap-1.5 transition-all shadow-sm'
const PRIMARY_BTN =
  'px-space-md py-2 rounded-lg bg-primary-container hover:bg-primary text-on-primary-container font-label-md text-label-md font-bold flex items-center gap-1.5 shadow-sm transition-all'

const pct = (v) => `${String(v).replace('.', ',')}%`

function PageHeader({ onNotify }) {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
          <span
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"
          >
            <Icon name="verified_user" className="text-body-sm" />
            Kendali Mutu Internal (PMI)
          </span>
          <span>/</span>
          <span className="text-on-surface font-semibold">Laporan &amp; Bukti Akreditasi</span>
          <span>/</span>
          <span className="text-primary font-medium">Rekapitulasi Kepatuhan Mutu Laboratorium</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-space-sm py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5 animate-pulse" />
            Data Terverifikasi dr. Hendra, Sp.PK
          </span>
          <span className="font-data-mono text-data-mono text-on-surface-variant">Rev: 2024.10-RC3</span>
        </div>
      </div>

      <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="flex items-start gap-space-md min-w-0">
            <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary flex-shrink-0 shadow-inner">
              <Icon name="analytics" className="text-headline-lg" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-space-sm flex-wrap">
                <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                  Laporan Kendali Mutu &amp; Bukti Akreditasi
                </h1>
                <span className="px-space-xs py-0.5 rounded-DEFAULT bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
                  ISO 15189:2022
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 max-w-3xl">
                Rekapitulasi kepatuhan multivariat, performa analitik per parameter, penyelesaian CAPA, dan audit trail
                integritas data untuk keperluan akreditasi eksternal Laboratorium.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-space-xs flex-wrap lg:flex-nowrap flex-shrink-0">
            <button type="button" onClick={() => onNotify('Pratinjau laporan dikirim ke printer ruangervisor.')} className={SOFT_BTN}>
              <Icon name="print" className="text-body-md text-primary" />
              Cetak Ringkasan
            </button>
            <button
              type="button"
              onClick={() => onNotify('Paket laporan lengkap (6 dokumen, ZIP terenkunci) sedang disiapkan.')}
              className={PRIMARY_BTN}
            >
              <Icon name="inventory_2" className="text-body-md" />
              Unduh Paket Lengkap
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

function KpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
      {laporanKpis.map((k) => (
        <div key={k.id} className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm relative overflow-hidden flex flex-col">
          <div className="flex items-start justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              {k.label}
            </span>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${k.iconBox}`}>
              <Icon name={k.icon} className="text-body-md" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display-lg text-display-lg font-bold text-on-surface">{k.value}</span>
            <span className={`font-label-md text-label-md font-semibold ${k.unitTone}`}>{k.unit}</span>
          </div>
          {typeof k.bar === 'number' && (
            <div className="mt-2 h-1.5 rounded-full bg-surface-container-high overflow-hidden">
              <div className={`h-full ${k.barTone} rounded-full`} style={{ width: `${Math.min(k.bar, 100)}%` }} />
            </div>
          )}
          <div className="mt-2 pt-2 bg-surface-container-low/50 -mx-space-md -mb-space-md px-space-md py-1.5 text-on-surface-variant font-label-sm text-label-sm">
            <span className={k.footTone}>{k.foot}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function FilterBar({ filters, setFilters }) {
  const set = (key) => (e) => setFilters((f) => ({ ...f, [key]: e.target.value }))
  return (
    <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center gap-space-md">
        <div className="flex flex-col sm:flex-row items-center gap-space-sm flex-1 flex-wrap">
          <div className="flex flex-col space-y-1">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Periode Laporan
            </span>
            <select value={filters.period} onChange={set('period')} className={FIELD}>
              {laporanPeriods.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Instrumen
            </span>
            <select value={filters.analyzer} onChange={set('analyzer')} className={FIELD}>
              {laporanAnalyzers.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Shift
            </span>
            <select value={filters.shift} onChange={set('shift')} className={FIELD}>
              {laporanShifts.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Status Kepatuhan
            </span>
            <select value={filters.status} onChange={set('status')} className={FIELD}>
              <option value="">Semua Status</option>
              <option value="ideal">Tercapai (≥ 95%)</option>
              <option value="warning">Perlu Monitoring (85-94%)</option>
              <option value="critical">Tidak Tercapai (&lt; 85%)</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-space-xs self-end lg:self-auto flex-shrink-0">
          <button
            type="button"
            onClick={() => setFilters({ period: 'oct', analyzer: '', shift: '', status: '' })}
            className={SOFT_BTN}
          >
            <Icon name="restart_alt" className="text-body-md" />
            Atur Ulang
          </button>
          <button
            type="button"
            onClick={() => onNotify('Laporan disaring sesuai filter aktif.')}
            className={PRIMARY_BTN}
          >
            <Icon name="filter_alt" className="text-body-md" />
            Terapkan Filter
          </button>
        </div>
      </div>
    </div>
  )
}

function Tabs({ activeTab, onChange }) {
  const tabs = [
    { id: 'ringkasan', icon: 'summarize', label: 'Ringkasan Kepatuhan', badge: 'Bulan Ini' },
    { id: 'parameter', icon: 'table_view', label: 'Performa Per Parameter', badge: '39 Analit' },
    { id: 'capa', icon: 'assignment_turned_in', label: 'Rekap CAPA & Insiden', badge: '4 Dokumen' },
    { id: 'audit', icon: 'history_toggle_off', label: 'Audit Trail & Ekspor', badge: '91 Entri' },
  ]
  return (
    <div className="rounded-xl bg-surface-container-lowest p-1.5 shadow-sm flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
      <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto" role="tablist">
        {tabs.map((t) => {
          const active = t.id === activeTab
          return (
            <button
              key={t.id}
              id={`btn-laporan-${t.id}`}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(t.id)}
              className={`flex-1 sm:flex-none px-space-md py-2 rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 transition-all whitespace-nowrap ${
                active
                  ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-medium'
              }`}
            >
              <Icon name={t.icon} className="text-body-md" />
              <span>{t.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-xs font-bold ${
                  active ? 'bg-surface-container-lowest/30' : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {t.badge}
              </span>
            </button>
          )
        })}
      </div>
      <div className="hidden xl:flex items-center gap-2 px-space-sm py-1 rounded-lg bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
        <Icon name="verified" className="text-body-sm text-primary" />
        Akreditasi Paripurna • Kemenkes 6111024
      </div>
    </div>
  )
}

function InfoStrip({ icon, title, badges, children }) {
  return (
    <div className="rounded-xl bg-surface-container p-space-md flex items-start gap-space-md shadow-sm border-l-4 border-primary">
      <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center flex-shrink-0 shadow-inner">
        <Icon name={icon} className="text-headline-md" />
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{title}</span>
          {badges?.map((b) => (
            <span key={b.text} className={`px-2 py-0.5 rounded-DEFAULT font-label-sm text-label-sm font-semibold ${b.className}`}>
              {b.text}
            </span>
          ))}
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">{children}</p>
      </div>
    </div>
  )
}

function Panel({ title, subtitle, icon, actions, children, className = '' }) {
  return (
    <div className={`rounded-xl bg-surface-container-lowest shadow-sm ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm p-space-md border-b border-surface-container-low">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-space-xs">
            <Icon name={icon} className="text-headline-sm text-primary" />
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">{title}</h2>
          </div>
          {subtitle && <p className="font-body-sm text-body-sm text-on-surface-variant">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-space-xs flex-shrink-0">{actions}</div>}
      </div>
      <div className="p-space-md">{children}</div>
    </div>
  )
}

function TrendPanel({ onNotify }) {
  const max = Math.max(...laporanTrend.map((d) => d.normal + d.warning + d.reject))
  return (
    <Panel
      title="Tren Kepatuhan QC Harian"
      subtitle="Proporsi In-Control, Warning (1-2s), dan Rejection Westgard per hari — Oktober 2024"
      icon="monitoring"
      actions={
        <button type="button" onClick={() => onNotify('Grafik tren diekspor sebagai PNG untuk lampiran laporan.')} className={SOFT_BTN}>
          <Icon name="download" className="text-body-md" />
          Ekspor Grafik
        </button>
      }
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-space-md">
        <div className="flex-1 relative h-56 flex flex-col justify-end">
          <div className="absolute inset-x-0 top-2 border-b border-dashed border-outline-variant/50 flex justify-between items-center font-label-sm text-label-sm text-on-surface-variant">
            <span className="bg-surface-container-lowest px-1">Ambang Batas Keamanan PMI: 95%</span>
          </div>
          <div className="grid grid-cols-12 gap-1 h-44 items-end z-10">
            {laporanTrend.map((d) => (
              <div key={d.label} className="group relative flex flex-col items-center h-full justify-end">
                {d.active && (
                  <div className="absolute -top-4 px-space-xs py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
                    {pct(d.compliance)}
                  </div>
                )}
                <div
                  className={`w-full max-w-[26px] flex flex-col rounded-t overflow-hidden ${
                    d.active ? 'ring-2 ring-primary' : ''
                  }`}
                  style={{ height: `${((d.normal + d.warning + d.reject) / max) * 100}%` }}
                  title={`${d.label}: In-Control ${d.normal}, Warning ${d.warning}, Reject ${d.reject}`}
                >
                  <div className="bg-primary flex-1" style={{ flexGrow: d.normal }} />
                  <div className="bg-secondary" style={{ flexGrow: d.warning }} />
                  <div className="bg-error" style={{ flexGrow: d.reject }} />
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-12 gap-1 mt-1">
            {laporanTrend.map((d, i) => (
              <span
                key={d.label}
                className={`text-center font-label-sm text-label-sm truncate ${
                  i % 2 === 0 ? 'text-on-surface-variant' : 'text-transparent'
                }`}
              >
                {d.label.split(' ')[0]}
              </span>
            ))}
          </div>
        </div>
        <div className="sm:w-52 flex-shrink-0 flex flex-col gap-space-sm">
          {[
            { label: 'In-Control', value: 312, cls: 'bg-primary' },
            { label: 'Warning 1-2s', value: 17, cls: 'bg-secondary' },
            { label: 'Reject Westgard', value: 7, cls: 'bg-error' },
          ].map((l) => (
            <div key={l.label} className="flex items-center justify-between gap-space-sm">
              <span className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                <span className={`w-2.5 h-2.5 rounded-full ${l.cls}`} />
                {l.label}
              </span>
              <span className="font-data-mono text-data-mono font-bold text-on-surface">{l.value}</span>
            </div>
          ))}
          <div className="pt-2 border-t border-surface-container-low flex flex-col gap-1">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Rata-rata Kepatuhan</span>
            <span className="font-headline-sm text-headline-sm font-bold text-primary">96,2%</span>
            <span className="font-label-sm text-label-sm text-primary">Tercapai (Target ≥ 95%)</span>
          </div>
        </div>
      </div>
    </Panel>
  )
}

function ComplianceTable({ onNotify, statusFilter }) {
  const rows = laporanComplianceByInstrument.filter((r) => {
    if (!statusFilter) return true
    if (statusFilter === 'ideal') return r.compliance >= 95
    if (statusFilter === 'warning') return r.compliance >= 85 && r.compliance < 95
    return r.compliance < 85
  })

  return (
    <Panel
      title="Rekapitulasi Kepatuhan per Instrumen"
      subtitle="Jumlah run, distribusi status, CV rerata, dan grade kepatuhan"
      icon="analytics"
      actions={
        <button type="button" onClick={() => onNotify('Rekap kepatuhan instrumen diekspor ke Excel.')} className={SOFT_BTN}>
          <Icon name="table_view" className="text-body-md text-secondary" />
          Ekspor Tabel
        </button>
      }
    >
      <div className="overflow-x-auto -mx-space-md -mb-space-md">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
              <th className={`${SECTION_HEAD} pl-space-md`}>Instrumen / Section</th>
              <th className={`${SECTION_HEAD} text-center`}>Parameter</th>
              <th className={`${SECTION_HEAD} text-right`}>Total Run</th>
              <th className={`${SECTION_HEAD} text-right`}>In-Control</th>
              <th className={`${SECTION_HEAD} text-center`}>Warn / Reject</th>
              <th className={`${SECTION_HEAD} text-right`}>CV Rerata</th>
              <th className={SECTION_HEAD}>Kepatuhan</th>
              <th className={`${SECTION_HEAD} text-center`}>Grade</th>
              <th className={`${SECTION_HEAD} pr-space-md text-right`}>Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container font-body-md text-body-md">
            {rows.map((r) => (
              <tr key={r.instrument} className="hover:bg-surface-container-low/60 transition-colors">
                <td className="py-3 px-space-md pl-space-md">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-body-md ${r.abbrClass}`}>
                      {r.abbr}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{r.instrument}</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">{r.section}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-space-md text-center font-data-mono text-data-mono">{r.parameters}</td>
                <td className="py-3 px-space-md text-right font-data-mono text-data-mono font-semibold">{r.runs}</td>
                <td className="py-3 px-space-md text-right font-data-mono text-data-mono font-semibold text-primary">
                  {r.inControl}
                </td>
                <td className="py-3 px-space-md text-center">
                  <span className="font-data-mono text-data-mono text-secondary font-semibold">{r.warning}</span>
                  <span className="text-on-surface-variant"> / </span>
                  <span className="font-data-mono text-data-mono text-error font-bold">{r.reject}</span>
                </td>
                <td className={`py-3 px-space-md text-right font-data-mono text-data-mono font-semibold ${r.cvTone}`}>
                  {r.cv}
                </td>
                <td className="py-3 px-space-md">
                  <div className="flex flex-col gap-1 min-w-[140px]">
                    <div className="flex items-center justify-between">
                      <span className="font-data-mono text-data-mono font-bold text-on-surface">{pct(r.compliance)}</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        {r.trend === 'naik' ? 'Tren Naik' : 'Stabil'}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                      <div
                        className={`h-full rounded-full ${r.compliance >= 95 ? 'bg-primary' : 'bg-secondary'}`}
                        style={{ width: `${r.compliance}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-3 px-space-md text-center">
                  <span className={`px-2 py-0.5 rounded-full font-data-mono text-data-mono font-bold text-xs ${r.gradeClass}`}>
                    {r.grade}
                  </span>
                </td>
                <td className="py-3 px-space-md pr-space-md text-right">
                  <button
                    type="button"
                    onClick={() => onNotify(`Drill-down kurva L-J untuk ${r.instrument} dibuka. Rincian 24 run tersedia.`)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all ml-auto"
                    title="Buka rincian"
                  >
                    <Icon name="chevron_right" className="text-body-md" />
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={9} className="py-6 px-space-md text-center text-on-surface-variant font-body-md">
                  Tidak ada instrumen pada status kepatuhan yang dipilih.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}

function RingkasanTab({ filters, onNotify }) {
  return (
    <>
      <InfoStrip
        icon="summarize"
        title="Ringkasan Eksekutif Kepatuhan Kendali Mutu Internal"
        badges={[
          { text: 'ISO 15189:2022 §7.3.7', className: 'bg-primary-fixed text-on-primary-fixed' },
          { text: 'Periode Oktober 2024', className: 'bg-secondary-fixed text-on-secondary-fixed' },
        ]}
      >
        Kepatuhan PMI 96,2% berada di atas ambang minimum 95% yang dipersyaratkan ISO 15189. Seluruh 4 instrumen
        terhubung bidirectional ke LIS, dengan 336 run kontrol teruji pada 24 hari kerja. Tujuh kasus rejection
        Westgard telah ditindaklanjuti melalui CAPA terstruktur dengan waktu penyelesaian rata-rata 4,8 jam.
      </InfoStrip>
      <TrendPanel onNotify={onNotify} />
      <ComplianceTable onNotify={onNotify} statusFilter={filters.status} />
    </>
  )
}

function ParameterTab({ onNotify }) {
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState('cv')

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = laporanParameterPerformance.filter((p) =>
      !q ? true : [p.code, p.name, p.instrument, p.unit].join(' ').toLowerCase().includes(q),
    )
    return [...filtered].sort((a, b) => (sortKey === 'cv' ? b.cv - a.cv : a.compliance - b.compliance))
  }, [query, sortKey])

  return (
    <>
      <InfoStrip
        icon="table_view"
        title="Analisis Performa Analitik Per Parameter"
        badges={[
          { text: 'Grade A/B/C Otomatis', className: 'bg-primary-fixed text-on-primary-fixed' },
          { text: 'Rasio CV/TEa', className: 'bg-secondary-fixed text-on-secondary-fixed' },
        ]}
      >
        Setiap parameter dinilai dengan Indeks Keandalan: CV terukur dibanding batas TEa (Total Error Allowed),
        bias relatif terhadap nilai acuan, dan grade kepatuhan. Parameter dengan rasio CV/TEa di atas 70% memerlukan
        tindakan korektif dan peninjauan ulang skema Westgard.
      </InfoStrip>

      <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div className="relative w-full lg:w-80">
          <Icon name="search" className="absolute left-3 top-2.5 text-on-surface-variant text-body-lg" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari kode, nama parameter, instrumen..."
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-md text-body-md outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex items-center gap-space-xs flex-wrap">
          <div className="flex items-center gap-1 bg-surface-container-low p-0.5 rounded-lg">
            {[
              { id: 'cv', label: 'Urut: CV Tertinggi' },
              { id: 'compliance', label: 'Urut: Kepatuhan Terendah' },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSortKey(s.id)}
                className={`px-space-sm py-1 rounded font-label-sm text-label-sm transition-colors ${
                  sortKey === s.id
                    ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface font-medium'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onNotify('Performa parameter diekspor ke Excel dengan perhitungan CV/TEa.')}
            className={PRIMARY_BTN}
          >
            <Icon name="download" className="text-body-md" />
            Ekspor Performa
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                <th className={SECTION_HEAD}>Kode &amp; Parameter</th>
                <th className={SECTION_HEAD}>Instrumen</th>
                <th className={`${SECTION_HEAD} text-right`}>Mean (X̄)</th>
                <th className={`${SECTION_HEAD} text-right`}>SD (1s)</th>
                <th className={`${SECTION_HEAD} text-right`}>CV</th>
                <th className={`${SECTION_HEAD} text-right`}>TEa</th>
                <th className={SECTION_HEAD}>Rasio CV/TEa</th>
                <th className={`${SECTION_HEAD} text-right`}>Bias</th>
                <th className={`${SECTION_HEAD} text-right`}>Warn / Reject</th>
                <th className={`${SECTION_HEAD} text-center`}>Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container font-body-md text-body-md">
              {rows.map((p) => (
                <tr key={p.code} className="hover:bg-surface-container-low/60 transition-colors">
                  <td className="py-3 px-space-md">
                    <div className="flex flex-col">
                      <span className="font-data-mono text-data-mono font-bold text-primary text-xs">{p.code}</span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{p.name}</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">Satuan: {p.unit}</span>
                    </div>
                  </td>
                  <td className="py-3 px-space-md">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">{p.instrument}</span>
                  </td>
                  <td className="py-3 px-space-md text-right font-data-mono text-data-mono font-semibold">{p.mean}</td>
                  <td className="py-3 px-space-md text-right font-data-mono text-data-mono">{p.sd}</td>
                  <td className="py-3 px-space-md text-right font-data-mono text-data-mono font-bold text-on-surface">{p.cv}%</td>
                  <td className="py-3 px-space-md text-right font-data-mono text-data-mono text-on-surface-variant">
                    {p.tea}%
                  </td>
                  <td className="py-3 px-space-md">
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <div className="flex-1 h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                        <div className={`h-full rounded-full ${p.ratioClass}`} style={{ width: `${p.cvRatio}%` }} />
                      </div>
                      <span className="font-data-mono text-data-mono font-semibold text-on-surface-variant">
                        {p.cvRatio}%
                      </span>
                    </div>
                  </td>
                  <td className={`py-3 px-space-md text-right font-data-mono text-data-mono font-semibold ${p.biasClass}`}>
                    {p.bias > 0 ? '+' : ''}
                    {p.bias}%
                  </td>
                  <td className="py-3 px-space-md text-right">
                    <span className="font-data-mono text-data-mono text-secondary font-semibold">{p.warn}</span>
                    <span className="text-on-surface-variant"> / </span>
                    <span className="font-data-mono text-data-mono text-error font-bold">{p.reject}</span>
                  </td>
                  <td className="py-3 px-space-md text-center">
                    <span
                      title={laporanGrading[p.grade].label}
                      className={`px-2 py-0.5 rounded-full font-data-mono text-data-mono font-bold text-xs ${p.gradeClass}`}
                    >
                      {p.grade}
                    </span>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={10} className="py-6 px-space-md text-center text-on-surface-variant font-body-md">
                    Tidak ada parameter yang cocok dengan pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-space-md bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-label-sm text-label-sm">
          <span>Menampilkan {rows.length} dari 39 Parameter Uji terdaftar</span>
          <div className="flex items-center gap-1">
            <span className="px-2.5 py-1 rounded bg-primary text-on-primary font-bold">1</span>
            <span className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface">2</span>
            <span className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface">3</span>
            <span className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface">Berikutnya</span>
          </div>
        </div>
      </div>
    </>
  )
}

function CapaTab({ onNotify }) {
  const closed = laporanCapaRecap.filter((c) => c.closed).length
  return (
    <>
      <InfoStrip
        icon="assignment_turned_in"
        title="Rekapitulasi CAPA & Analisis Akar Masalah (RCA 5M)"
        badges={[
          { text: '4 Dokumen Oktober 2024', className: 'bg-primary-fixed text-on-primary-fixed' },
          { text: `${closed} Selesai • ${laporanCapaRecap.length - closed} Proses`, className: 'bg-secondary-fixed text-on-secondary-fixed' },
        ]}
      >
        Seluruh pelanggaran Westgard wajib documenting corrective action (CA) dan preventive action (PA) dengan metode
        RCA 5M. Rata-rata waktu penyelesaian (TAT) 4,8 jam berada di bawah SLA 8 jam, dengan 100% kasus yang telah
        diverifikasi secara digital oleh Penanggung Jawab Laboratorium.
      </InfoStrip>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        {[
          { label: 'Total Dokumen CAPA', value: '4', unit: 'Dokumen', tone: 'text-primary', icon: 'assignment' },
          { label: 'Rata-rata TAT', value: '4,8', unit: 'Jam', tone: 'text-primary', icon: 'timer' },
          { label: 'Kepatuhan SLA', value: '75', unit: '%', tone: 'text-error', icon: 'schedule' },
          { label: 'Belum Ditutup', value: '2', unit: 'Kasus', tone: 'text-secondary', icon: 'pending_actions' },
        ].map((k) => (
          <div key={k.label} className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                {k.label}
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="font-headline-lg text-headline-lg font-bold text-on-surface">{k.value}</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">{k.unit}</span>
              </div>
            </div>
            <Icon name={k.icon} className={`text-headline-md ${k.tone}`} />
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                <th className={SECTION_HEAD}>Dokumen / Tanggal</th>
                <th className={SECTION_HEAD}>Instrumen</th>
                <th className={SECTION_HEAD}>Parameter &amp; Aturan</th>
                <th className={SECTION_HEAD}>Temuan RCA</th>
                <th className={SECTION_HEAD}>PIC</th>
                <th className={`${SECTION_HEAD} text-center`}>TAT</th>
                <th className={SECTION_HEAD}>Status</th>
                <th className={`${SECTION_HEAD} pr-space-md text-right`}>Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container font-body-md text-body-md">
              {laporanCapaRecap.map((c) => (
                <tr key={c.doc} className="hover:bg-surface-container-low/60 transition-colors">
                  <td className="py-3 px-space-md">
                    <div className="flex flex-col">
                      <span className="font-data-mono text-data-mono font-bold text-primary">{c.doc}</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">{c.date}</span>
                    </div>
                  </td>
                  <td className="py-3 px-space-md font-label-md text-label-md text-on-surface font-semibold">
                    {c.instrument}
                  </td>
                  <td className="py-3 px-space-md">
                    <div className="flex flex-col gap-1">
                      <span className="font-label-sm text-label-sm text-on-surface">{c.parameter}</span>
                      <span className={`px-1.5 py-0.2 rounded font-data-mono text-data-mono font-bold text-xs w-fit ${c.ruleClass}`}>
                        Aturan {c.rule}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-space-md max-w-[240px] text-body-sm text-body-sm text-on-surface-variant">
                    {c.rootCause}
                  </td>
                  <td className="py-3 px-space-md font-body-sm text-body-sm">{c.pic}</td>
                  <td className="py-3 px-space-md text-center font-data-mono text-data-mono font-semibold">{c.sla}</td>
                  <td className="py-3 px-space-md">
                    <span className={`px-2 py-1 rounded-full font-label-sm text-label-sm font-semibold ${c.statusClass}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-space-md pr-space-md text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onNotify(`Dokumen ${c.doc} dibuka untuk audit. Status: read-only.`)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all"
                        title="Buka dokumen"
                      >
                        <Icon name="visibility" className="text-body-md" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onNotify(`Timeline ${c.doc} dibuka.`)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-secondary transition-all"
                        title="Timeline"
                      >
                        <Icon name="timeline" className="text-body-md" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function AuditTab({ onNotify }) {
  const [query, setQuery] = useState('')
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return laporanAuditTrail
    return laporanAuditTrail.filter((t) => [t.id, t.actor, t.action, t.object, t.detail].join(' ').toLowerCase().includes(q))
  }, [query])

  return (
    <>
      <InfoStrip
        icon="verified_user"
        title="Jejak Audit (Audit Trail) Integritas Data QC"
        badges={[
          { text: 'Read-Only • 91 Entri', className: 'bg-primary-fixed text-on-primary-fixed' },
          { text: 'Hash SHA-256', className: 'bg-secondary-fixed text-on-secondary-fixed' },
        ]}
      >
        Setiap entri memuat aktor, waktu, objek yang diubah, dan hash integritas. Log bersifat <strong>append-only</strong>{' '}
        dan tidak dapat dihapus atau dimodifikasi sehingga menjamin keterlacakan perubahan data untuk keperluan audit
        eksternal dan inspeksi akreditasi.
      </InfoStrip>

      <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
        <div className="relative w-full sm:w-80">
          <Icon name="search" className="absolute left-3 top-2.5 text-on-surface-variant text-body-lg" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari aktor, aksi, atau objek..."
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-md text-body-md outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex items-center gap-space-xs">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Terakhir disinkronkan: <span className="font-data-mono text-data-mono text-on-surface">24 Okt 2024 09:20 WIB</span>
          </span>
          <button type="button" onClick={() => onNotify('Audit trail diekspor (read-only) dengan hash SHA-256.')} className={PRIMARY_BTN}>
            <Icon name="download" className="text-body-md" />
            Ekspor Audit Trail
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-surface-container-lowest shadow-sm p-space-md">
        <div className="flex flex-col space-y-space-sm">
          {rows.map((t, i) => (
            <div key={t.id} className="flex gap-space-sm">
              <div className="flex flex-col items-center flex-shrink-0">
                <span className={`w-9 h-9 rounded-lg flex items-center justify-center ${t.iconBox}`}>
                  <Icon name={t.icon} className="text-body-md" />
                </span>
                {i < rows.length - 1 && <span className="flex-1 w-px bg-surface-container-high my-1" />}
              </div>
              <div className="flex-1 pb-space-sm min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-DEFAULT bg-surface-container text-on-surface-variant font-data-mono text-data-mono font-bold text-xs">
                    {t.id}
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{t.action}</span>
                  <span className="font-data-mono text-data-mono text-xs text-on-surface-variant">{t.time}</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface mt-0.5">{t.object}</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{t.detail}</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                  {t.actor} <span className="text-on-surface-variant/70">({t.role})</span> • {t.hash}
                </p>
              </div>
            </div>
          ))}
          {rows.length === 0 && (
            <p className="py-6 text-center text-on-surface-variant font-body-md">Tidak ada entri audit yang cocok.</p>
          )}
        </div>
      </div>
    </>
  )
}

function ExportPanel({ onNotify }) {
  return (
    <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
        <div className="flex flex-col">
          <div className="flex items-center gap-space-xs">
            <Icon name="archive" className="text-headline-sm text-primary" />
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Pusat Unduhan Dokumen Laporan</h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Enam dokumen siap pakai untuk lampiran akreditasi dan audit internal.
          </p>
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1.5">
          <Icon name="lock" className="text-body-sm text-primary" />
          Semua dokumen diberi watermark &amp; hash integritas
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
        {laporanExportOptions.map((e) => (
          <div
            key={e.id}
            className="p-space-md rounded-xl bg-surface-container-low/60 border border-surface-container hover:border-primary transition-colors flex flex-col gap-2"
          >
            <div className="flex items-start gap-2">
              <span className="w-9 h-9 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center flex-shrink-0">
                <Icon name={e.icon} className="text-body-md" />
              </span>
              <div className="flex flex-col min-w-0">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{e.title}</span>
                <span className="font-label-sm text-label-sm text-primary font-semibold">{e.format}</span>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant flex-1">{e.desc}</p>
            <div className="flex items-center justify-between gap-2">
              <span className="font-label-sm text-label-sm text-on-surface-variant">{e.meta}</span>
              <button
                type="button"
                onClick={() => onNotify(`${e.title} sedang dibuat (${e.format}).`)}
                className="px-space-sm py-1 rounded-lg bg-primary-container text-on-primary-container font-label-sm text-label-sm font-bold flex items-center gap-1 flex-shrink-0"
              >
                <Icon name="download" className="text-body-sm" />
                Unduh
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function LaporanPage({ onNotify }) {
  const [activeTab, setActiveTab] = useState('ringkasan')
  const [filters, setFilters] = useState({ period: 'oct', analyzer: '', shift: '', status: '' })

  const notify = (message) => onNotify?.(message)

  return (
    <div className="flex flex-col w-full gap-space-md">
      <PageHeader onNotify={notify} />
      <KpiCards />
      <FilterBar filters={filters} setFilters={setFilters} />
      <Tabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'ringkasan' && <RingkasanTab filters={filters} onNotify={notify} />}
      {activeTab === 'parameter' && <ParameterTab onNotify={notify} />}
      {activeTab === 'capa' && <CapaTab onNotify={notify} />}
      {activeTab === 'audit' && <AuditTab onNotify={notify} />}

      <ExportPanel onNotify={notify} />
    </div>
  )
}
