import Icon from '../../components/Icon.jsx'
import { analyzers, dashboardKpis, openCapaItems, qcLogRows, trendDays, trendParams, westgardAlerts } from '../../data/dashboardData.js'
import { useMemo, useState } from 'react'

function KpiBadge({ badge }) {
  if (!badge) return null
  return (
    <span
      className={`mt-space-xs inline-flex items-center gap-1 px-space-xs py-0.5 rounded-DEFAULT font-label-sm text-label-sm font-semibold ${badge.className}`}
    >
      {badge.dot && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
      {badge.ping && <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping" />}
      {badge.icon && <Icon name={badge.icon} className="text-label-md leading-none" />}
      <span>{badge.text}</span>
    </span>
  )
}

function KpiGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-space-md mb-space-lg">
      {dashboardKpis.map((k) => (
        <div key={k.id} className="p-space-md bg-surface-container-lowest rounded-xl shadow-sm flex flex-col justify-between relative">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              {k.label}
            </span>
            <Icon name={k.icon} className={`text-headline-md ${k.iconTone}`} />
          </div>
          <div className="mt-space-sm">
            <div className="flex items-baseline gap-space-xs">
              <span className={`font-display-lg text-display-lg font-bold ${k.valueTone}`}>{k.value}</span>
              <span className={`font-label-md text-label-md ${k.unitTone}`}>{k.unit}</span>
            </div>
            {k.badge ? (
              <KpiBadge badge={k.badge} />
            ) : k.text ? (
              <div className="mt-space-xs text-on-surface-variant font-label-sm text-label-sm truncate" title={k.text}>
                {k.text}
              </div>
            ) : (
              <div className={`mt-space-xs ${k.foot.wrap}`}>
                {k.foot.items.map((it, i) => (
                  <span key={i} className={it.className ?? ''}>
                    {it.text}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function TrendPanel() {
  const [param, setParam] = useState('Semua')

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-md">
        <div className="flex flex-col">
          <div className="flex items-center gap-space-xs">
            <Icon name="monitoring" className="text-primary text-headline-sm" />
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Tren Kepatuhan QC &amp; Distribusi Status (7 Hari Terakhir)
            </h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Proporsi hasil QC Harian: Normal, Warning (1-2s), dan Rejection Westgard di seluruh instrumen.
          </p>
        </div>
        <div className="flex items-center gap-1 bg-surface-container-low p-0.5 rounded-lg overflow-x-auto">
          {trendParams.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setParam(p)}
              className={`px-space-xs py-1 rounded font-label-sm text-label-sm transition-colors whitespace-nowrap ${
                param === p
                  ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface font-medium'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm p-space-sm bg-surface-container-low rounded-lg mb-space-md">
        {[
          { l: 'Rata-rata Keandalan', v: '96.2%', c: 'text-primary' },
          { l: 'CV Kumulatif Laboratorium', v: '2.81%', c: 'text-on-surface font-data-mono' },
          { l: 'Total Run Teruji', v: '336 Sampel QC', c: 'text-on-surface' },
          { l: 'Status Bias Analitik', v: '≤ 0.5% (Aman)', c: 'text-primary-container' },
        ].map((m) => (
          <div key={m.l} className="flex flex-col px-space-xs">
            <span className="font-label-sm text-label-sm text-on-surface-variant">{m.l}</span>
            <span className={`font-headline-sm text-headline-sm font-bold ${m.c}`}>{m.v}</span>
          </div>
        ))}
      </div>

      <div className="w-full h-56 flex flex-col justify-end pt-2 pb-1 relative">
        <div className="absolute inset-x-0 top-12 border-b border-dashed border-outline-variant/40 flex justify-between items-center text-label-sm font-label-sm text-on-surface-variant">
          <span className="bg-surface-container-lowest px-1">Ambang Batas Keamanan PMI: 95%</span>
        </div>
        <div className="grid grid-cols-7 h-44 gap-space-sm items-end z-10">
          {trendDays.map((d) => (
            <div key={d.label} className="flex flex-col items-center h-full justify-end group relative">
              {d.active && (
                <div className="absolute -top-3 px-space-xs py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold shadow-xs">
                  Hari Ini
                </div>
              )}
              <div
                className={`w-full max-w-[42px] flex flex-col rounded-t overflow-hidden ${
                  d.active ? 'ring-2 ring-primary ring-offset-2 shadow-sm' : 'shadow-xs'
                }`}
              >
                {d.reject > 0 && (
                  <div style={{ height: `${d.reject * 8}px` }} className="bg-error hover:opacity-90 transition-opacity" title={`${d.reject} Reject`} />
                )}
                {d.warning > 0 && (
                  <div style={{ height: `${d.warning * 9}px` }} className="bg-secondary hover:opacity-90 transition-opacity" title={`${d.warning} Warning`} />
                )}
                <div style={{ height: `${d.normal * 3.05}px` }} className="bg-primary-container hover:opacity-90 transition-opacity" title={`${d.normal} Normal`} />
              </div>
              <span
                className={`font-label-sm text-label-sm mt-space-xs ${
                  d.active ? 'text-primary font-bold' : 'text-on-surface-variant'
                }`}
              >
                {d.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-sm mt-space-xs">
        <div className="flex items-center gap-space-md">
          {[
            { c: 'bg-primary-container', t: 'Normal (In-Control)' },
            { c: 'bg-secondary', t: 'Warning (Rule 1-2s)' },
            { c: 'bg-error', t: 'Out-of-Control (Reject)' },
          ].map((l) => (
            <div key={l.t} className="flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded ${l.c}`} />
              <span className="font-label-sm text-label-sm text-on-surface">{l.t}</span>
            </div>
          ))}
        </div>
        <span className="font-label-sm text-label-sm text-primary flex items-center gap-0.5 font-semibold">
          <span>Buka Modul Grafik Levey-Jennings Lengkap</span>
          <Icon name="arrow_forward" className="text-label-md" />
        </span>
      </div>
    </div>
  )
}

const STATUS_STYLE = {
  normal: 'bg-primary-fixed text-on-primary-fixed',
  warning: 'bg-secondary-fixed text-on-secondary-fixed',
  reject: 'bg-error text-on-error',
}

function QcLogTable({ onOpenCapa }) {
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState('all')

  const rows = useMemo(
    () =>
      qcLogRows.filter((r) => {
        const q = query.toLowerCase()
        const matchQuery =
          q === '' ||
          r.parameter.toLowerCase().includes(q) ||
          r.instrument.toLowerCase().includes(q) ||
          r.lot.toLowerCase().includes(q)
        const matchLevel = level === 'all' || r.lot.toLowerCase().includes(level)
        return matchQuery && matchLevel
      }),
    [query, level],
  )

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-md">
        <div className="flex flex-col">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Log Entri Hasil QC Terbaru Hari Ini</h2>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Real-time sinkronisasi interface LIS &amp; Analyzer bench
          </span>
        </div>
        <div className="flex items-center gap-space-xs">
          <div className="relative w-48 sm:w-64">
            <Icon name="search" className="absolute left-2.5 top-2 text-headline-sm text-on-surface-variant" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari parameter, alat, lot..."
              className="w-full h-8 pl-8 pr-2 bg-surface-container-low text-on-surface font-body-sm text-body-sm rounded-lg focus:outline-none focus:bg-surface-container-high transition-colors"
            />
          </div>
          <div className="relative">
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="h-8 pl-space-sm pr-7 bg-surface-container-low text-on-surface font-label-sm text-label-sm rounded-lg appearance-none cursor-pointer focus:outline-none"
            >
              <option value="all">Semua Level</option>
              <option value="level 1">Level 1</option>
              <option value="level 2">Level 2</option>
              <option value="level 3">Level 3</option>
            </select>
            <Icon name="arrow_drop_down" className="absolute right-1.5 top-1.5 text-headline-sm pointer-events-none text-on-surface-variant" />
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
              <th className="py-space-sm px-space-md">Jam</th>
              <th className="py-space-sm px-space-md">Alat / Analyzer</th>
              <th className="py-space-sm px-space-md">Parameter &amp; Lot</th>
              <th className="py-space-sm px-space-md text-right">Hasil (Unit)</th>
              <th className="py-space-sm px-space-md text-right">Target Mean ± SD</th>
              <th className="py-space-sm px-space-md text-center">Z-Score</th>
              <th className="py-space-sm px-space-md text-center">Status Mutu</th>
              <th className="py-space-sm px-space-md">Petugas Lab</th>
              <th className="py-space-sm px-space-md text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-low font-body-sm text-body-sm text-on-surface">
            {rows.map((r) => (
              <tr
                key={r.id}
                className={`${r.rowBg ? `${r.rowBg} ` : ''}hover:bg-surface-container-low/60 transition-colors`}
              >
                <td className={`py-space-sm px-space-md font-data-mono text-data-mono ${r.critical ? 'font-bold text-error' : 'font-medium text-on-surface-variant'}`}>
                  {r.time}
                </td>
                <td className="py-space-sm px-space-md">
                  <div className="flex items-center gap-1.5 font-medium text-on-surface">
                    <span className={`w-2 h-2 rounded-full ${r.dot}`} />
                    <span>{r.instrument}</span>
                  </div>
                </td>
                <td className="py-space-sm px-space-md">
                  <div className="flex flex-col">
                    <span className={`font-semibold ${r.critical ? 'text-error' : 'text-on-surface'}`}>{r.parameter}</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">{r.lot}</span>
                  </div>
                </td>
                <td className={`py-space-sm px-space-md text-right font-data-mono text-data-mono font-bold ${r.critical ? 'text-error' : r.statusStyle === 'warning' ? 'text-secondary' : 'text-on-surface'}`}>
                  {r.value} <span className="font-normal text-on-surface-variant text-label-sm">{r.unit}</span>
                </td>
                <td className="py-space-sm px-space-md text-right font-data-mono text-data-mono text-on-surface-variant">
                  {r.target}
                </td>
                <td className={`py-space-sm px-space-md text-center font-data-mono text-data-mono font-semibold ${r.zTone}`}>{r.z}</td>
                <td className="py-space-sm px-space-md text-center">
                  <span
                    className={`inline-flex items-center gap-1 px-space-xs py-0.5 rounded font-label-sm text-label-sm ${
                      r.statusStyle === 'reject' ? 'font-bold' : 'font-semibold'
                    } ${STATUS_STYLE[r.statusStyle]}`}
                  >
                    {r.statusStyle === 'normal' && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    {r.statusStyle === 'warning' && <Icon name="warning" className="text-label-md" />}
                    {r.statusStyle === 'reject' && <Icon name="block" className="text-label-md" />}
                    {r.status}
                  </span>
                </td>
                <td className="py-space-sm px-space-md font-label-sm text-label-sm text-on-surface-variant truncate max-w-[120px]">
                  {r.officer}
                </td>
                <td className="py-space-sm px-space-md text-center">
                  <button
                    type="button"
                    title={r.capa ? 'Buka Investigasi CAPA' : r.statusStyle === 'warning' ? 'Observasi Data' : 'Detail Grafik LJ'}
                    onClick={() => r.capa && onOpenCapa(r.capa)}
                    className={`w-7 h-7 inline-flex items-center justify-center rounded transition-colors ${
                      r.capa
                        ? 'bg-error text-on-error hover:bg-on-error-container'
                        : r.statusStyle === 'warning'
                          ? 'hover:bg-surface-container-high text-secondary'
                          : 'hover:bg-surface-container-high text-primary'
                    }`}
                  >
                    <Icon name={r.action} className="text-headline-sm" />
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={9} className="py-space-lg px-space-md text-center text-on-surface-variant">
                  Tidak ada entri QC yang cocok dengan pencarian.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between pt-space-sm text-on-surface-variant font-label-sm text-label-sm">
        <span>Menampilkan {rows.length} dari 48 entri kontrol kualitas hari ini</span>
        <div className="flex items-center gap-1">
          <button type="button" className="px-space-sm py-1 rounded bg-surface-container-low text-on-surface font-semibold hover:bg-surface-container-high">
            Sebelumnya
          </button>
          <button type="button" className="px-space-sm py-1 rounded bg-primary-container text-on-primary font-semibold">
            1
          </button>
          <button type="button" className="px-space-sm py-1 rounded bg-surface-container-low text-on-surface hover:bg-surface-container-high">
            2
          </button>
          <button type="button" className="px-space-sm py-1 rounded bg-surface-container-low text-on-surface font-semibold hover:bg-surface-container-high">
            Berikutnya
          </button>
        </div>
      </div>
    </div>
  )
}

function WestgardAlerts({ onOpenCapa, onRead }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col">
      <div className="flex items-center justify-between pb-space-sm">
        <div className="flex items-center gap-space-xs">
          <Icon name="crisis_alert" className="text-error text-headline-sm animate-pulse" />
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Peringatan Westgard Aktif</h2>
        </div>
        <span className="px-space-xs py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
          2 Kritis • 1 Warning
        </span>
      </div>
      <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
        Alarm sistem otomatis mendeteksi pelanggaran aturan multirule Westgard pada siklus run pagi.
      </p>

      <div className="flex flex-col gap-space-sm">
        {westgardAlerts.map((a) => {
          const isError = a.tone === 'error'
          return (
            <div
              key={a.id}
              className={`p-space-md rounded-xl ${
                isError ? 'bg-error-container/30 border-l-4 border-error' : 'bg-secondary-fixed/30 border-l-4 border-secondary'
              } flex flex-col gap-space-xs relative`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-label-sm text-label-sm font-bold uppercase tracking-wider ${
                    isError ? 'text-error' : 'text-secondary'
                  }`}
                >
                  {a.rule}
                </span>
                <span className={`font-data-mono text-data-mono font-medium ${isError ? 'text-error' : 'text-secondary'}`}>
                  {a.time}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{a.title}</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {a.meta} <span className={`font-bold font-data-mono ${isError ? 'text-error' : 'text-secondary'}`}>{a.z}</span>
                </span>
              </div>
              {a.note && (
                <div className="p-space-xs bg-surface-container-lowest/80 rounded font-label-sm text-label-sm text-on-surface-variant">
                  {a.note}
                </div>
              )}
              {a.resolved ? (
                <div className="flex items-center justify-between mt-space-xs">
                  <span className="font-label-sm text-label-sm text-secondary font-semibold">{a.resolved}</span>
                  <button
                    type="button"
                    onClick={() => onRead(a.id)}
                    className="px-space-sm py-1 bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-medium rounded hover:bg-surface-container-low transition-colors"
                  >
                    Tandai Dibaca
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-space-xs mt-space-xs">
                  {a.actions.map((act) =>
                    act.primary ? (
                      <button
                        key={act.label}
                        type="button"
                        onClick={() => onOpenCapa(act.capa)}
                        className="px-space-sm py-1.5 bg-error text-on-error font-label-sm text-label-sm font-semibold rounded shadow-xs hover:bg-on-error-container transition-colors flex items-center gap-1"
                      >
                        <Icon name={act.icon} className="text-label-md" />
                        <span>{act.label}</span>
                      </button>
                    ) : (
                      <button
                        key={act.label}
                        type="button"
                        className="px-space-sm py-1.5 bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-medium rounded hover:bg-surface-container-low transition-colors"
                      >
                        {act.label}
                      </button>
                    ),
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function OpenCapaList({ onOpenCapa }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col">
      <div className="flex items-center justify-between pb-space-sm">
        <div className="flex items-center gap-space-xs">
          <Icon name="pending_actions" className="text-primary text-headline-sm" />
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Tindakan Korektif (CAPA)</h2>
        </div>
        <span className="font-label-sm text-label-sm text-primary font-semibold">Semua CAPA →</span>
      </div>
      <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
        Formulir Corrective &amp; Preventive Action yang memerlukan verifikasi Penanggung Jawab Lab.
      </p>

      <div className="flex flex-col gap-space-sm">
        {openCapaItems.map((c) => (
          <div
            key={c.id}
            className="p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors flex flex-col gap-1"
          >
            <div className="flex items-center justify-between">
              <span className={`font-data-mono text-data-mono font-bold ${c.idTone}`}>{c.id}</span>
              <span className={`px-space-xs py-0.5 rounded font-label-sm text-label-sm font-semibold ${c.statusClass}`}>
                {c.status}
              </span>
            </div>
            <span className="font-label-lg text-label-lg text-on-surface font-semibold">{c.title}</span>
            <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm pt-0.5">
              <span>{c.pic}</span>
              <span className={`font-medium ${c.dueTone}`}>{c.due}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onOpenCapa({ id: 'BARU', parameter: 'Umum', instrument: 'Dirui CS-T240' })}
        className="w-full mt-space-md py-2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors"
      >
        <Icon name="add_task" className="text-headline-sm text-primary" />
        <span>Buat Laporan Investigasi CAPA Baru</span>
      </button>
    </div>
  )
}

export default function DashboardPage({ onOpenInputQc, onOpenCapa, onNotify }) {
  const [range, setRange] = useState('Hari Ini')
  const [analyzer, setAnalyzer] = useState('all')
  const [refreshing, setRefreshing] = useState(false)

  const refresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 700)
    onNotify('Data realtime disegarkan dari interface LIS & Analyzer bench.')
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-space-md mb-space-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm relative overflow-hidden">
          <div className="absolute -right-24 -top-24 w-80 h-80 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-start gap-space-md relative z-10">
            <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center flex-shrink-0 text-primary-container">
              <Icon name="vital_signs" className="text-display-lg" filled style={{ fontVariationSettings: "'FILL' 1" }} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-space-sm flex-wrap">
                <h1 className="font-headline-lg text-headline-lg text-on-surface">Dashboard Pemantauan QC Laboratorium</h1>
                <span className="px-space-sm py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold tracking-wide uppercase">
                  RSUD SMJ I Kayong Utara
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                Monitoring Pemantapan Mutu Internal (PMI) Harian • Instalasi Laboratorium Patologi Klinik • Shift Pagi Aktif
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm relative z-10">
            <div className="flex items-center bg-surface-container-low p-1 rounded-lg">
              {['Hari Ini', '7 Hari Terakhir', 'Bulan Ini'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRange(r)}
                  className={`px-space-sm py-1.5 rounded-DEFAULT font-label-sm text-label-sm transition-colors ${
                    range === r
                      ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface font-medium'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div className="relative">
              <select
                value={analyzer}
                onChange={(e) => setAnalyzer(e.target.value)}
                className="h-9 pl-space-sm pr-8 bg-surface-container-low text-on-surface font-label-sm text-label-sm rounded-lg appearance-none cursor-pointer focus:outline-none focus:bg-surface-container-high transition-colors"
              >
                {analyzers.map((a) => (
                  <option key={a.value} value={a.value}>
                    {a.label}
                  </option>
                ))}
              </select>
              <Icon name="arrow_drop_down" className="absolute right-2 top-2 text-headline-sm pointer-events-none text-on-surface-variant" />
            </div>

            <button
              type="button"
              onClick={onOpenInputQc}
              className="h-9 px-space-md bg-primary-container hover:bg-primary text-on-primary font-label-sm text-label-sm font-semibold rounded-lg shadow-sm flex items-center gap-space-xs transition-colors"
            >
              <Icon name="add_circle" className="text-headline-sm" />
              <span>Input QC Sekarang</span>
            </button>
            <button
              type="button"
              onClick={refresh}
              title="Segarkan Data Realtime"
              className="h-9 w-9 bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant rounded-lg flex items-center justify-center transition-colors"
            >
              <Icon name="refresh" className={`text-headline-sm ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <KpiGrid />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg mb-space-lg">
        <div className="xl:col-span-8 flex flex-col gap-space-lg min-w-0">
          <TrendPanel />
          <QcLogTable onOpenCapa={onOpenCapa} />
        </div>
        <div className="xl:col-span-4 flex flex-col gap-space-lg min-w-0">
          <WestgardAlerts onOpenCapa={onOpenCapa} onRead={() => onNotify('Peringatan ditandai telah dibaca.')} />
          <OpenCapaList onOpenCapa={onOpenCapa} />
        </div>
      </div>
    </div>
  )
}
