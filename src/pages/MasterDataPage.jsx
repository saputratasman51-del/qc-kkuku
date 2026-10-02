import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Modal from '../components/Modal.jsx'
import { mdAuditLog, mdControlLots, mdInstruments, mdMetrics, mdParameters } from '../data/masterData.js'

const SEARCH =
  'w-full h-9 pl-9 pr-3 rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-md text-body-md outline-none focus:ring-1 focus:ring-primary'
const SELECT =
  'w-full sm:w-48 h-9 px-3 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md outline-none cursor-pointer'
const SECTION_HEAD =
  'py-space-sm px-space-md font-semibold'
const RULE_CHIP =
  'px-1.5 py-0.2 rounded bg-surface-container-high text-xs font-data-mono font-semibold text-primary'
const ACTION_BTN =
  'w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-all'
const SOFT_BTN =
  'px-space-sm py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1.5 transition-all shadow-sm'
const PRIMARY_BTN =
  'px-space-md py-2 rounded-lg bg-primary-container hover:bg-primary text-on-primary-container font-label-md text-label-md font-bold flex items-center gap-1.5 shadow-sm transition-all'
const FIELD_INPUT =
  'h-9 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md outline-none focus:ring-1 focus:ring-primary'
const FIELD_LABEL = 'font-label-sm text-label-sm text-on-surface font-semibold'
const SECTION_TITLE = 'flex items-center gap-2 pb-1 border-b border-surface-container'

const levelOptions = ['Semua Level', 'Level 1 (Normal)', 'Level 2 (Patologis)', 'Level 3 (Tinggi)']

const fmt = (v, digits = 2) => Number(v).toFixed(digits)

function MetricCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
      {mdMetrics.map((m) => (
        <div
          key={m.id}
          className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              {m.label}
            </span>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${m.iconBox}`}>
              <Icon name={m.icon} className="text-body-lg" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span
              className={`font-bold text-on-surface ${
                typeof m.value === 'number' ? 'font-display-lg text-display-lg' : 'font-headline-lg text-headline-lg'
              }`}
            >
              {m.value}
            </span>
            <span className="font-label-md text-label-md text-primary font-semibold">{m.unit}</span>
          </div>
          <div className="mt-2 pt-2 bg-surface-container-low/50 -mx-space-md -mb-space-md px-space-md py-1.5 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
            <span className={`truncate flex items-center gap-1 ${m.footLeft.tone}`}>
              {m.footLeft.dot && <span className={`w-1.5 h-1.5 rounded-full ${m.footLeft.dot}`} />}
              {m.footLeft.text}
            </span>
            <span className={`font-data-mono text-data-mono ${m.footRightTone ?? ''}`}>{m.footRight}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function PageHeader({ onOpenAudit, onOpenNewControl, onNotify }) {
  const [menuOpen, setMenuOpen] = useState(false)
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
          <span className="text-on-surface font-semibold">Master Data Laboratorium</span>
          <span>/</span>
          <span className="text-primary font-medium">Manajemen Instrumen, Parameter &amp; Lot Kontrol</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-space-sm py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5 animate-pulse" />
            Standar ISO 15189:2022 Terintegrasi
          </span>
          <span className="font-data-mono text-data-mono text-on-surface-variant">Rev: 2024.10-RC3</span>
        </div>
      </div>

      <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="flex items-start gap-space-md min-w-0">
            <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary flex-shrink-0 shadow-inner">
              <Icon name="tune" className="text-headline-lg" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-space-sm flex-wrap">
                <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                  Master Data Kendali Mutu (QC) Laboratorium
                </h1>
                <span className="px-space-xs py-0.5 rounded-DEFAULT bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
                  Patologi Klinik RSUD SMJ I
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 max-w-3xl">
                Konfigurasi instrumen analitik, direktori parameter pemeriksaan, dan penetapan nilai acuan analit (Target
                Mean &amp; SD) bersertifikat ISO 15189 dengan proteksi historis snapshot.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-space-xs flex-wrap lg:flex-nowrap flex-shrink-0">
            <button type="button" onClick={onOpenAudit} className={SOFT_BTN}>
              <Icon name="history_toggle_off" className="text-body-md text-primary" />
              Audit Log Acuan
            </button>
            <button
              type="button"
              onClick={() => onNotify('Impor Lot Sheet: pilih berkas PDF/Excel package insert pabrikan.')}
              className={SOFT_BTN}
            >
              <Icon name="upload_file" className="text-body-md text-secondary" />
              Impor Lot Sheet
            </button>
            <div className="relative">
              <button type="button" onClick={() => setMenuOpen((v) => !v)} className={PRIMARY_BTN}>
                <Icon name="add_circle" className="text-body-md" />
                + Tambah Data Baru
                <Icon name="expand_more" className="text-body-sm" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-surface-container-lowest shadow-xl z-30 py-1.5">
                  {[
                    { icon: 'science', tone: 'text-primary', label: 'Nilai Acuan Kontrol Baru (Mean/SD)', action: onOpenNewControl },
                    {
                      icon: 'precision_manufacturing',
                      tone: 'text-secondary',
                      label: 'Instrumen / Alat Analitik',
                      action: () => onNotify('Formulir registrasi instrumen analitik dibuka. InputConnectingLIS tetap terhubung ke modul A.'),
                    },
                    {
                      icon: 'bloodtype',
                      tone: 'text-tertiary',
                      label: 'Parameter Pemeriksaan',
                      action: () => onNotify('Formulir parameter pemeriksaan baru dibuka di direktori Tab B.'),
                    },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        setMenuOpen(false)
                        item.action()
                      }}
                      className="w-full text-left px-space-md py-2 text-on-surface hover:bg-surface-container-low font-label-md text-label-md flex items-center gap-2"
                    >
                      <Icon name={item.icon} className={`${item.tone} text-body-md`} />
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function TabSwitcher({ activeTab, onChange }) {
  const tabs = [
    { id: 'alat', icon: 'biotech', label: 'A. Master Alat & Instrumen', count: 6 },
    { id: 'parameter', icon: 'dataset', label: 'B. Master Parameter Uji', count: 39, highlighted: true },
    { id: 'kontrol', icon: 'rule', label: 'C. Master Bahan & Lot QC (Target Mean & SD)', count: 13 },
  ]

  return (
    <div className="rounded-xl bg-surface-container-lowest p-1.5 shadow-sm flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
      <div className="flex items-center gap-1.5 w-full sm:w-auto" role="tablist">
        {tabs.map((t) => {
          const active = t.id === activeTab
          return (
            <button
              key={t.id}
              id={`btn-tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(t.id)}
              className={`flex-1 sm:flex-none px-space-md py-2 rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 transition-all ${
                active
                  ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-medium'
              }`}
            >
              <Icon name={t.icon} className="text-body-md" />
              <span>{t.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-xs ${
                  active ? 'bg-surface-container-lowest/30 font-bold' : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {t.count}
              </span>
            </button>
          )
        })}
      </div>
      <div className="hidden xl:flex items-center gap-2 px-space-sm py-1 rounded-lg bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
        <Icon name="verified" className="text-body-sm text-primary" />
        Reg. Lab Kemenkes: 6111024 / Akreditasi Paripurna
      </div>
    </div>
  )
}

function CloseableBanner({ icon, iconClass, title, badges, children, onClose }) {
  return (
    <div className="rounded-xl bg-primary-fixed/50 border border-primary p-space-md flex items-start justify-between gap-space-md shadow-sm">
      <div className="flex items-start gap-space-sm min-w-0">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm ${iconClass}`}>
          <Icon name={icon} className="text-headline-md" />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{title}</span>
            {badges?.map((b) => (
              <span
                key={b.text}
                className={`px-2 py-0.5 rounded-DEFAULT font-label-sm text-label-sm font-semibold ${b.className}`}
              >
                {b.text}
              </span>
            ))}
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 leading-relaxed">{children}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        title="Tutup notifikasi"
        className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors flex-shrink-0"
      >
        <Icon name="close" className="text-body-md" />
      </button>
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
        <div className="flex items-center gap-2 flex-wrap justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{title}</span>
            {badges?.map((b) => (
              <span
                key={b.text}
                className={`px-2 py-0.5 rounded-DEFAULT font-label-sm text-label-sm font-semibold ${b.className}`}
              >
                {b.text}
              </span>
            ))}
          </div>
          <span className="text-xs font-data-mono text-data-mono text-on-surface-variant">Update: 24 Okt 2024</span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">{children}</p>
      </div>
    </div>
  )
}

function FilterSelect({ value, onChange, options, className = '' }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className={`${SELECT} ${className}`}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}

function Toolbar({ query, onQuery, placeholder, children }) {
  return (
    <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
      <div className="flex flex-col sm:flex-row items-center gap-space-sm flex-1 flex-wrap">
        <div className="relative w-full sm:w-72">
          <Icon name="search" className="absolute left-3 top-2.5 text-on-surface-variant text-body-lg" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder={placeholder}
            className={SEARCH}
          />
        </div>
        {children}
      </div>
    </div>
  )
}

function PaginationBar({ from, to, total, noun, page = 1, pages = 2 }) {
  return (
    <div className="p-space-md bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-label-sm text-label-sm">
      <span>
        Menampilkan {from}-{to} dari {total} {noun} terdaftar di Instalasi Laboratorium RSUD SMJ I
      </span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled
          className="px-2 py-1 rounded bg-surface-container-lowest text-on-surface-variant shadow-sm disabled:opacity-40"
        >
          Sebelumnya
        </button>
        {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            type="button"
            className={`px-2.5 py-1 rounded font-bold ${
              p === page ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
            }`}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          className="px-2 py-1 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container"
        >
          Berikutnya
        </button>
      </div>
    </div>
  )
}

function TableShell({ children }) {
  return (
    <div className="rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">{children}</table>
      </div>
    </div>
  )
}

function InstrumentTab({ query, onQuery, onNotify, onAdd }) {
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')

  const rows = useMemo(
    () =>
      mdInstruments.filter((i) => {
        const q = query.trim().toLowerCase()
        const matchQuery =
          !q || [i.name, i.classification, i.serial, i.vendor, i.bench].join(' ').toLowerCase().includes(q)
        const matchCategory = !category || i.abbr === category
        const matchStatus = !status || i.status === status
        return matchQuery && matchCategory && matchStatus
      }),
    [query, category, status],
  )

  return (
    <>
      <Toolbar query={query} onQuery={onQuery} placeholder="Cari nama alat, merek, serial...">
        <FilterSelect
          value={category}
          onChange={setCategory}
          className="sm:w-52"
          options={[
            { value: '', label: 'Semua Kategori Alat' },
            { value: 'CH', label: 'Kimia Klinik' },
            { value: 'HM', label: 'Hematologi' },
            { value: 'IM', label: 'Imunoserologi' },
            { value: 'UR', label: 'Urinalisis & Feses' },
            { value: 'EL', label: 'Elektrolit' },
          ]}
        />
        <FilterSelect
          value={status}
          onChange={setStatus}
          options={[
            { value: '', label: 'Status Operasional' },
            { value: 'Aktif Operasional', label: 'Aktif Operasional' },
            { value: 'Maintenance Rutin', label: 'Maintenance Rutin' },
            { value: 'Kalibrasi Terjadwal', label: 'Kalibrasi Terjadwal' },
            { value: 'Cadangan / Non-aktif', label: 'Cadangan / Non-aktif' },
          ]}
        />
      </Toolbar>

      <div className="flex items-center gap-space-xs self-end md:self-auto -mt-space-sm">
        <button type="button" onClick={() => onNotify('Ekspor PDF Alat: daftar instrumen disusun untuk PDF.')} className={SOFT_BTN}>
          <Icon name="download" className="text-body-md" />
          Ekspor PDF Alat
        </button>
        <button
          type="button"
          onClick={onAdd}
          className="px-space-sm py-1.5 rounded-lg bg-primary-container text-on-primary-container font-label-sm text-label-sm font-bold flex items-center gap-1"
        >
          <Icon name="add" className="text-body-md" />
          Tambah Instrumen
        </button>
      </div>

      <TableShell>
        <thead>
          <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
            <th className={SECTION_HEAD}>Nama Alat &amp; Klasifikasi</th>
            <th className={SECTION_HEAD}>Nomor Seri &amp; Vendor</th>
            <th className={SECTION_HEAD}>Lokasi Bench Lab</th>
            <th className={`${SECTION_HEAD} text-center`}>Parameter Terhubung</th>
            <th className={SECTION_HEAD}>Koneksi LIS / Middleware</th>
            <th className={SECTION_HEAD}>Status Operasional</th>
            <th className={`${SECTION_HEAD} text-right`}>Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-container font-body-md text-body-md">
          {rows.map((i) => (
            <tr key={i.id} className="hover:bg-surface-container-low/60 transition-colors">
              <td className="py-3 px-space-md">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-body-md ${i.abbrClass}`}>
                    {i.abbr}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{i.name}</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">{i.classification}</span>
                  </div>
                </div>
              </td>
              <td className="py-3 px-space-md">
                <div className="flex flex-col">
                  <span className="font-data-mono text-data-mono text-on-surface font-semibold">{i.serial}</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">{i.vendor}</span>
                </div>
              </td>
              <td className="py-3 px-space-md">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-DEFAULT bg-surface-container text-on-surface font-label-sm text-label-sm">
                  <Icon name="meeting_room" className="text-body-sm text-primary" />
                  {i.bench}
                </span>
              </td>
              <td className="py-3 px-space-md text-center">
                <span className={`px-2 py-0.5 rounded-full font-data-mono text-data-mono font-bold text-xs ${i.parameterClass}`}>
                  {i.parameters}
                </span>
              </td>
              <td className="py-3 px-space-md">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${i.online ? 'bg-primary animate-pulse' : 'bg-secondary'}`} />
                  <span className="font-label-sm text-label-sm text-on-surface font-medium">{i.connection}</span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">{i.connectionNote}</span>
              </td>
              <td className="py-3 px-space-md">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full font-label-sm text-label-sm font-semibold ${i.statusClass}`}>
                  <Icon name={i.statusIcon} className="text-body-sm" />
                  {i.status}
                </span>
              </td>
              <td className="py-3 px-space-md text-right">
                <div className="flex items-center justify-end gap-1">
                  {[
                    { icon: 'edit', title: 'Edit Instrumen', hover: 'hover:text-primary', msg: `Formulir edit ${i.name} dibuka.` },
                    { icon: 'list_alt', title: 'Lihat Parameter', hover: 'hover:text-secondary', msg: `${i.parameters} terpasang pada ${i.name}.` },
                    { icon: 'build', title: 'Jadwal Kalibrasi & Servis', hover: 'hover:text-on-surface', msg: `Jadwal kalibrasi & servis ${i.name} (SLA 6 bulan).` },
                  ].map((a) => (
                    <button
                      key={a.icon}
                      type="button"
                      title={a.title}
                      onClick={() => onNotify(a.msg)}
                      className={`${ACTION_BTN} ${a.hover}`}
                    >
                      <Icon name={a.icon} className="text-body-md" />
                    </button>
                  ))}
                </div>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={7} className="py-6 px-space-md text-center text-on-surface-variant font-body-md">
                Tidak ada instrumen yang cocok dengan filter aktif.
              </td>
            </tr>
          )}
        </tbody>
      </TableShell>
      <PaginationBar from={1} to={rows.length} total={mdInstruments.length} noun="Instrumen" pages={2} />
    </>
  )
}

function ParameterTab({ query, onQuery, onNotify, onAdd }) {
  const [category, setCategory] = useState('')
  const [instrument, setInstrument] = useState('')
  const [status, setStatus] = useState('')

  const rows = useMemo(
    () =>
      mdParameters.filter((p) => {
        const q = query.trim().toLowerCase()
        const matchQuery =
          !q || [p.code, p.name, p.english, p.method, p.unit, p.instrument, p.material].join(' ').toLowerCase().includes(q)
        const matchCategory = !category || p.categoryKey === category
        const matchInstrument = !instrument || p.instrument === instrument
        const matchStatus = !status || p.status === status
        return matchQuery && matchCategory && matchInstrument && matchStatus
      }),
    [query, category, instrument, status],
  )

  return (
    <>
      <InfoStrip
        icon="rule_folder"
        title="Direktori Parameter Pemeriksaan &amp; Skema Westgard Mutu"
        badges={[
          { text: '39 Analit Terdaftar', className: 'bg-primary-fixed text-on-primary-fixed' },
          { text: 'Multi-Rule Westgard ISO 15189', className: 'bg-secondary-fixed text-on-secondary-fixed' },
        ]}
      >
        Parameter analit laboratorium RSUD SMJ I terkonfigurasi dengan tautan instrumen analitik, lot kontrol aktif
        2/3 level, rentang biologis rujukan, dan aturan evaluasi otomatis Westgard Multirule (1:3s, 2:2s, R:4s, 4:1s,
        10:x).
      </InfoStrip>

      <Toolbar query={query} onQuery={onQuery} placeholder="Cari nama parameter, kode analit, metode, spesimen...">
        <FilterSelect
          value={category}
          onChange={setCategory}
          className="sm:w-56"
          options={[
            { value: '', label: 'Semua Kategori (Kimia, Hem, Imun, Urin)' },
            { value: 'kimia', label: 'Kimia Klinik' },
            { value: 'hematologi', label: 'Hematologi' },
            { value: 'imunologi', label: 'Imunoserologi & Endokrin' },
            { value: 'urinalisis', label: 'Urinalisis & Feses' },
          ]}
        />
        <FilterSelect
          value={instrument}
          onChange={setInstrument}
          className="sm:w-56"
          options={[
            { value: '', label: 'Semua Alat Terhubung' },
            ...[...new Set(mdParameters.map((p) => p.instrument))].map((v) => ({ value: v, label: v })),
          ]}
        />
        <FilterSelect
          value={status}
          onChange={setStatus}
          className="sm:w-48"
          options={[
            { value: '', label: 'Status QC / Aturan' },
            { value: 'Aktif Harian', label: 'Westgard Aktif' },
            { value: 'Terkunci ISO', label: 'Terkunci ISO' },
            { value: 'Evaluasi Paralel', label: 'Evaluasi Paralel' },
          ]}
        />
      </Toolbar>

      <div className="flex items-center gap-space-xs self-end lg:self-auto -mt-space-sm flex-shrink-0">
        <button
          type="button"
          onClick={() => onNotify('Ekspor Direktori: unduhan PDF/Excel disiapkan.')}
          className={SOFT_BTN}
        >
          <Icon name="download" className="text-body-md text-secondary" />
          Ekspor Direktori PDF / Excel
        </button>
        <button type="button" onClick={onAdd} className={PRIMARY_BTN}>
          <Icon name="add_circle" className="text-body-md" />
          + Tambah Parameter Baru
        </button>
      </div>

      <TableShell>
        <thead>
          <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
            <th className={SECTION_HEAD}>Kode &amp; Parameter Uji</th>
            <th className={SECTION_HEAD}>Kategori &amp; Metode Analisis</th>
            <th className={SECTION_HEAD}>Instrumen Analitik</th>
            <th className={SECTION_HEAD}>Bahan &amp; Level Kontrol</th>
            <th className={SECTION_HEAD}>Aturan Evaluasi Westgard</th>
            <th className={SECTION_HEAD}>Nilai Rujukan Biologis</th>
            <th className={SECTION_HEAD}>Status QC</th>
            <th className={`${SECTION_HEAD} text-right`}>Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-container font-body-md text-body-md">
          {rows.map((p) => (
            <tr key={p.id} className={`hover:bg-surface-container-low/60 transition-colors ${p.isNew ? 'bg-primary-fixed/20' : ''}`}>
              <td className="py-3 px-space-md">
                <div className="flex items-center gap-2.5">
                  <span className={`px-2 py-1 rounded font-data-mono text-data-mono font-bold text-xs ${p.codeClass}`}>
                    {p.code}
                  </span>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{p.name}</span>
                      {p.isNew && (
                        <span className="px-1.5 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm font-bold text-xs flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed animate-pulse" />Baru
                        </span>
                      )}
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">{p.english}</span>
                  </div>
                </div>
              </td>
              <td className="py-3 px-space-md">
                <div className="flex flex-col">
                  <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {p.category}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface">{p.method}</span>
                  <span className="font-data-mono text-data-mono text-xs text-on-surface-variant">Satuan: {p.unit}</span>
                </div>
              </td>
              <td className="py-3 px-space-md">
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">{p.instrument}</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">{p.bench}</span>
                  {p.live && (
                    <span className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      HL7 Bidireksional
                    </span>
                  )}
                </div>
              </td>
              <td className="py-3 px-space-md">
                <div className="flex flex-col gap-1">
                  <span className="font-label-sm text-label-sm text-on-surface font-medium">{p.material}</span>
                  <div className="flex items-center gap-1 flex-wrap">
                    {p.levels.map((l) => (
                      <span key={l} className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm text-xs font-semibold">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              </td>
              <td className="py-3 px-space-md">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1 flex-wrap">
                    {p.rules.map((r) => (
                      <span key={r} className={RULE_CHIP}>
                        {r}
                      </span>
                    ))}
                    {p.disabledRules?.map((r) => (
                      <span
                        key={r}
                        title="Dinonaktifkan"
                        className="px-1.5 py-0.2 rounded bg-surface-container-low text-xs font-data-mono text-on-surface-variant line-through opacity-75"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                  {p.ruleNote && (
                    <span className="font-body-sm text-body-sm text-primary font-medium text-xs flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {p.ruleNote}
                    </span>
                  )}
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">{p.ruleMeta}</span>
                </div>
              </td>
              <td className="py-3 px-space-md">
                <span className="font-data-mono text-data-mono font-semibold text-on-surface bg-surface-container-low px-2 py-0.5 rounded">
                  {p.reference}
                </span>
                <span className="block text-xs text-on-surface-variant mt-0.5">{p.referenceNote}</span>
              </td>
              <td className="py-3 px-space-md">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold">
                  <Icon name="check_circle" className="text-body-sm" />
                  {p.status}
                </span>
              </td>
              <td className="py-3 px-space-md text-right">
                <div className="flex items-center justify-end gap-1">
                  {[
                    { icon: 'visibility', title: 'Detail Parameter', tone: 'text-primary', msg: `Detail ${p.code} — ${p.name}.` },
                    { icon: 'tune', title: 'Aturan Westgard', tone: 'text-secondary', msg: `Konfigurasi aturan Westgard ${p.code} (${p.rules.length} aturan aktif).` },
                    { icon: 'edit', title: 'Edit Parameter', tone: 'text-tertiary', msg: `Formulir edit ${p.code} dibuka.` },
                  ].map((a) => (
                    <button key={a.icon} type="button" title={a.title} onClick={() => onNotify(a.msg)} className={ACTION_BTN}>
                      <Icon name={a.icon} className="text-body-md" />
                    </button>
                  ))}
                </div>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={8} className="py-6 px-space-md text-center text-on-surface-variant font-body-md">
                Tidak ada parameter yang cocok dengan filter aktif.
              </td>
            </tr>
          )}
        </tbody>
      </TableShell>
      <PaginationBar from={1} to={rows.length} total={39} noun="Parameter Uji" pages={5} />
    </>
  )
}

function ControlLotTab({ query, onQuery, onNotify, onAdd }) {
  const [instrument, setInstrument] = useState('')
  const [level, setLevel] = useState('')
  const [status, setStatus] = useState('')

  const rows = useMemo(
    () =>
      mdControlLots.filter((l) => {
        const q = query.trim().toLowerCase()
        const matchQuery = !q || [l.name, l.brand, l.lotNumber, l.analyte, l.method, l.instrument].join(' ').toLowerCase().includes(q)
        const matchInstrument = !instrument || l.instrument === instrument
        const matchLevel = !level || l.name.includes(level.match(/^Level \d/)?.[0] ?? level)
        const matchStatus = !status || l.status === status
        return matchQuery && matchInstrument && matchLevel && matchStatus
      }),
    [query, instrument, level, status],
  )

  return (
    <>
      <InfoStrip
        icon="verified_user"
        title="Informasi Penetapan &amp; Integritas Nilai Acuan Lot QC"
        badges={[
          { text: 'Standar ISO 15189:2022', className: 'bg-primary-fixed text-on-primary-fixed' },
          { text: 'Verifikasi 20 Run Valid', className: 'bg-secondary-fixed text-on-secondary-fixed' },
        ]}
      >
        Nilai Target Mean (X̄) dan Standar Deviasi (SD) bersumber dari <strong>Package Insert Pabrikan</strong> yang
        telah divalidasi 20 kali run pendahuluan dan disahkan oleh <strong>dr. Hendra Pratama, Sp.PK</strong>.
        Perubahan nilai acuan terlindungi proteksi <strong>Snapshot Versioning</strong> sehingga tidak merusak arsip
        kalkulasi Z-Score Levey-Jennings terdahulu.
      </InfoStrip>

      <Toolbar query={query} onQuery={onQuery} placeholder="Cari bahan kontrol, nomor lot, analit...">
        <FilterSelect
          value={instrument}
          onChange={setInstrument}
          options={[
            { value: '', label: 'Semua Alat' },
            ...[...new Set(mdControlLots.map((l) => l.instrument))].map((v) => ({ value: v, label: v })),
          ]}
        />
        <FilterSelect value={level} onChange={setLevel} options={levelOptions.map((l) => ({ value: l, label: l }))} />
        <FilterSelect
          value={status}
          onChange={setStatus}
          options={[
            { value: '', label: 'Semua Status' },
            { value: 'Aktif', label: 'Aktif Digunakan' },
            { value: 'Segera Expired (28 hari)', label: 'Segera Expired' },
            { value: 'Kedaluwarsa/Arsip', label: 'Kedaluwarsa/Arsip' },
          ]}
        />
      </Toolbar>

      <div className="flex items-center gap-space-xs self-end lg:self-auto -mt-space-sm flex-shrink-0">
        <button type="button" onClick={() => onNotify('Unduh Lot Sheet PDF: berkas disusun per nomor lot.')} className={SOFT_BTN}>
          <Icon name="picture_as_pdf" className="text-body-md text-secondary" />
          Unduh Lot Sheet PDF
        </button>
        <button type="button" onClick={onAdd} className={PRIMARY_BTN}>
          <Icon name="add_circle" className="text-body-md" />
          + Tambah Lot Kontrol Baru
        </button>
      </div>

      <TableShell>
        <thead>
          <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
            <th className={SECTION_HEAD}>Bahan Kontrol &amp; Nomor Lot</th>
            <th className={SECTION_HEAD}>Instrumen &amp; Bench</th>
            <th className={SECTION_HEAD}>Analit / Parameter &amp; Metode</th>
            <th className={`${SECTION_HEAD} text-right`}>Target Mean (X̄)</th>
            <th className={`${SECTION_HEAD} text-right`}>Target SD (1s) &amp; %CV</th>
            <th className={`${SECTION_HEAD} text-center`}>Rentang Kontrol (±2s / ±3s)</th>
            <th className={SECTION_HEAD}>Status Verifikasi / Validasi</th>
            <th className={`${SECTION_HEAD} text-right`}>Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-container font-body-md text-body-md">
          {rows.map((l) => {
            const cv = (l.sd / l.mean) * 100
            return (
              <tr
                key={l.id}
                className={`hover:bg-surface-container-low/60 transition-colors ${
                  l.isNew ? 'bg-primary-fixed/20' : l.status.startsWith('Segera') ? 'bg-surface-container-low/20' : ''
                }`}
              >
                <td className="py-3 px-space-md">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{l.name}</span>
                      <span className={`px-1.5 py-0.5 rounded bg-surface-container-high text-xs font-semibold ${l.brandTone}`}>
                        {l.brand}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`font-data-mono text-data-mono font-semibold ${l.brandTone}`}>Lot: {l.lotNumber}</span>
                      {l.isNew && (
                        <span className="px-1.5 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm font-semibold text-xs flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed animate-pulse" />Baru
                        </span>
                      )}
                      <span className={`px-1.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold text-xs ${l.statusClass}`}>
                        {l.status}
                      </span>
                    </div>
                    <span className={`text-xs mt-0.5 ${l.expTone}`}>{l.exp}</span>
                  </div>
                </td>
                <td className="py-3 px-space-md">
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">{l.instrument}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-on-surface-variant">
                      <Icon name="meeting_room" className="text-body-sm text-primary" />
                      {l.bench}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-space-md">
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-on-surface font-bold">{l.analyte}</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{l.method}</span>
                  </div>
                </td>
                <td className="py-3 px-space-md text-right">
                  <span className="font-data-mono text-data-mono font-bold text-on-surface text-body-lg">{fmt(l.mean)}</span>
                  <span className="text-xs text-on-surface-variant block">{l.unit}</span>
                </td>
                <td className="py-3 px-space-md text-right">
                  <div className="flex flex-col items-end">
                    <span className="font-data-mono text-data-mono font-semibold text-on-surface">
                      ±{fmt(l.sd)} {l.unit}
                    </span>
                    <span className="font-label-sm text-label-sm text-primary font-medium">
                      CV {fmt(cv)}% (Maks {l.cvMax}%)
                    </span>
                  </div>
                </td>
                <td className="py-3 px-space-md text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-data-mono text-data-mono text-on-surface font-bold text-xs bg-surface-container-low px-2 py-0.5 rounded">
                      2SD: {fmt(l.mean - 2 * l.sd)} - {fmt(l.mean + 2 * l.sd)}
                    </span>
                    <span className="font-data-mono text-data-mono text-error font-medium text-xs bg-error-container/40 px-2 py-0.5 rounded">
                      3SD: {fmt(l.mean - 3 * l.sd)} - {fmt(l.mean + 3 * l.sd)}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-space-md">
                  <div className="flex items-center gap-1.5">
                    <Icon name="verified" className="text-body-lg text-primary" />
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-on-surface font-bold">dr. Hendra Pratama, Sp.PK</span>
                      <span className="font-label-sm text-label-sm text-primary">{l.verification}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-space-md text-right">
                  <div className="flex items-center justify-end gap-1">
                    {[
                      { icon: 'visibility', title: 'Detail Lot', msg: `Detail lot ${l.lotNumber} (Mean ${fmt(l.mean)} / SD ${fmt(l.sd)}).` },
                      { icon: 'edit', title: 'Edit Acuan', msg: `Formulir edit acuan lot ${l.lotNumber}.` },
                      { icon: 'history', title: 'Riwayat Koreksi', msg: `Riwayat koreksi lot ${l.lotNumber} (snapshot versioning).` },
                    ].map((a) => (
                      <button key={a.icon} type="button" title={a.title} onClick={() => onNotify(a.msg)} className={ACTION_BTN}>
                        <Icon name={a.icon} className="text-body-md" />
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            )
          })}
          {rows.length === 0 && (
            <tr>
              <td colSpan={8} className="py-6 px-space-md text-center text-on-surface-variant font-body-md">
                Tidak ada bahan/lot kontrol yang cocok dengan filter aktif.
              </td>
            </tr>
          )}
        </tbody>
      </TableShell>
      <PaginationBar from={1} to={rows.length} total={13} noun="Bahan &amp; Lot Kontrol Aktif" pages={3} />
    </>
  )
}

function NewControlModal({ open, onClose, onSave, onDraft }) {
  const [form, setForm] = useState({
    name: 'TruLab N (Human Serum Control Level 1)',
    lot: 'LOT-2024-TL991',
    level: 'Level 1 (Normal)',
    instrument: 'Dirui CS-T240',
    analyte: 'Glukosa Darah (GOD-PAP)',
    mean: '102.0',
    sd: '3.40',
    parallel: true,
  })
  const [error, setError] = useState('')

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [key]: value }))
    setError('')
  }

  const mean = Number(form.mean)
  const sd = Number(form.sd)
  const valid = Number.isFinite(mean) && Number.isFinite(sd) && mean > 0 && sd > 0
  const cv = valid ? (sd / mean) * 100 : 0
  const range = (k) => (valid ? `${fmt(mean - k * sd)} - ${fmt(mean + k * sd)}` : '- / -')

  const submit = () => {
    if (!form.lot.trim() || !valid) {
      setError('Harap lengkapi Nomor Lot, Target Mean, dan Nilai SD sebelum menyimpan.')
      return
    }
    onSave({ ...form, mean, sd, cv })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      maxWidth="max-w-3xl"
      header={
        <div className="bg-surface-container-high p-space-md flex items-center justify-between border-b border-surface-container">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shadow-inner flex-shrink-0">
              <Icon name="science" className="text-headline-md" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Tambah Bahan &amp; Nomor Lot Kontrol Baru
                </h2>
                <span className="px-2 py-0.5 rounded-DEFAULT bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold">
                  Input Nilai Acuan Pabrikan (Package Insert)
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                Standar Validasi ISO 15189:2022 • RSUD Sultan Muhammad Jamaludin I
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            title="Tutup Formulir"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors flex-shrink-0"
          >
            <Icon name="close" className="text-headline-sm" />
          </button>
        </div>
      }
    >
      <div className="p-space-lg overflow-y-auto space-y-space-md max-h-[70vh]">
        <div className="space-y-space-sm">
          <div className={SECTION_TITLE}>
            <Icon name="biotech" className="text-body-md text-primary" />
            <h3 className="font-label-lg text-label-lg text-on-surface font-bold">
              Bagian 1: Identitas Bahan Kontrol &amp; Penugasan Alat
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
            <div className="flex flex-col space-y-1">
              <label className={FIELD_LABEL}>
                Nama Bahan Kontrol <span className="text-error">*</span>
              </label>
              <input type="text" value={form.name} onChange={set('name')} className={FIELD_INPUT} />
            </div>
            <div className="flex flex-col space-y-1">
              <label className={FIELD_LABEL}>
                Nomor Lot Baru <span className="text-error">*</span>
              </label>
              <input
                type="text"
                value={form.lot}
                onChange={set('lot')}
                className={`${FIELD_INPUT} font-data-mono text-data-mono font-bold text-primary`}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
            <div className="flex flex-col space-y-1">
              <label className={FIELD_LABEL}>
                Level Kontrol <span className="text-error">*</span>
              </label>
              <select value={form.level} onChange={set('level')} className={`${FIELD_INPUT} font-label-md text-label-md`}>
                {levelOptions.slice(1).map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col space-y-1">
              <label className={FIELD_LABEL}>
                Alat / Analyzer Terhubung <span className="text-error">*</span>
              </label>
              <select value={form.instrument} onChange={set('instrument')} className={FIELD_INPUT}>
                <option>Dirui CS-T240 (Kimia Klinik) — Meja Kimia Klinik #01</option>
                <option>Sysmex XN-550 (Hematologi)</option>
                <option>Roche Cobas e411 (Imunoserologi)</option>
                <option>Mission U500 (Urinalisis &amp; Feses)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-space-sm">
          <div className={SECTION_TITLE}>
            <Icon name="dataset" className="text-body-md text-secondary" />
            <h3 className="font-label-lg text-label-lg text-on-surface font-bold">
              Bagian 2: Input Lot Sheet Pabrikan &amp; Nilai Target Analit
            </h3>
          </div>
          <div className="flex flex-col space-y-1">
            <label className={FIELD_LABEL}>
              Parameter Analit &amp; Satuan <span className="text-error">*</span>
            </label>
            <select value={form.analyte} onChange={set('analyte')} className={FIELD_INPUT}>
              {mdParameters.map((p) => (
                <option key={p.id}>
                  {p.name} - Satuan: {p.unit}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-xl bg-surface-container-low p-space-md space-y-space-sm">
            <div className="flex items-center justify-between">
              <span className="font-headline-sm text-headline-sm text-primary font-bold">
                Kalkulasi Otomatis Batas Kendali Levey-Jennings
              </span>
              <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold flex items-center gap-1">
                <Icon name="verified" className="text-body-sm" />
                Metrik Otomatis
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
              <div className="flex flex-col space-y-1">
                <label className={FIELD_LABEL}>
                  Target Mean Pabrikan (X̄) <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={form.mean}
                    onChange={set('mean')}
                    className="w-full h-9 pl-3 pr-14 rounded-lg bg-surface-container-lowest text-on-surface font-data-mono text-data-mono font-bold outline-none focus:ring-1 focus:ring-primary"
                  />
                  <span className="absolute right-3 top-2 font-label-sm text-label-sm text-on-surface-variant font-semibold">
                    mg/dL
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <label className={FIELD_LABEL}>
                  Target SD (1 Sigma) <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={form.sd}
                    onChange={set('sd')}
                    className="w-full h-9 pl-3 pr-14 rounded-lg bg-surface-container-lowest text-on-surface font-data-mono text-data-mono font-bold outline-none focus:ring-1 focus:ring-primary"
                  />
                  <span className="absolute right-3 top-2 font-label-sm text-label-sm text-on-surface-variant font-semibold">
                    mg/dL
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <label className={FIELD_LABEL}>Koefisien Variasi (%CV)</label>
                <div className="h-9 px-3 rounded-lg bg-surface-container-high flex items-center justify-between font-data-mono text-data-mono font-bold text-primary">
                  <span>{valid ? `${fmt(cv)}%` : '0.00%'}</span>
                  {valid && (
                    <span className="px-1.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-semibold">
                      {cv <= 4 ? 'Sangat Baik' : cv <= 5 ? 'Baik' : 'Perlu Verifikasi'}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="pt-1 grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
              {[
                { label: 'Rentang ±1 SD', value: range(1), tone: 'text-primary', bg: '' },
                { label: 'Rentang ±2 SD (Peringatan)', value: range(2), tone: 'text-primary', bg: '' },
                { label: 'Rentang ±3 SD (Action / Reject)', value: range(3), tone: 'text-error', bg: '' },
              ].map((r) => (
                <div key={r.label} className={`p-2 rounded-lg bg-surface-container-lowest shadow-sm flex flex-col items-center justify-center ${r.bg}`}>
                  <span className={`block font-label-sm text-label-sm font-semibold ${r.tone === 'text-error' ? 'text-error' : 'text-on-surface-variant'}`}>
                    {r.label}
                  </span>
                  <span className={`font-data-mono text-data-mono font-bold text-sm ${r.tone}`}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-space-sm">
          <div className={SECTION_TITLE}>
            <Icon name="verified_user" className="text-body-md text-primary" />
            <h3 className="font-label-lg text-label-lg text-on-surface font-bold">
              Bagian 3: Opsi Validasi Laboratorium (ISO 15189)
            </h3>
          </div>
          <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={form.parallel}
                onChange={set('parallel')}
                className="mt-1 rounded text-primary focus:ring-primary"
              />
              <span className="flex flex-col">
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Terapkan Masa Uji Pendahuluan 20 Run (Preliminary Parallel Testing)
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Data QC akan ditandai evaluasi paralel dan tidak memblokir rilis hasil pasien sampai kumulatif 20 data
                  tercapai.
                </span>
              </span>
            </label>
            <div className="flex flex-col space-y-1 mt-1">
              <span className={FIELD_LABEL}>Catatan Verifikasi Penanggung Jawab Laboratorium</span>
              <div className="px-3 py-2 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm border border-surface-container flex items-center justify-between">
                <span className="text-on-surface-variant">
                  Disahkan secara digital oleh: <strong className="text-on-surface">dr. Hendra Pratama, Sp.PK</strong>{' '}
                  (Penanggung Jawab Laboratorium)
                </span>
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold flex-shrink-0">
                  Terverifikasi SIP 503/442
                </span>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="px-3 py-2 rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm flex items-center gap-2">
            <Icon name="error" className="text-body-md" />
            {error}
          </div>
        )}
      </div>

      <div className="p-space-md bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm border-t border-surface-container">
        <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Snapshot proteksi versi acuan aktif
        </div>
        <div className="flex items-center gap-space-xs w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-space-md py-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold transition-all"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => onDraft({ ...form, mean, sd, cv })}
            disabled={!form.lot.trim() || !valid}
            className="px-space-md py-2 rounded-lg bg-surface-container-high hover:bg-surface-container text-primary font-label-md text-label-md font-bold flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            <Icon name="bookmark_border" className="text-body-md" />
            Simpan sebagai Draf
          </button>
          <button
            type="button"
            onClick={submit}
            className="px-space-md py-2 rounded-lg bg-primary-container hover:bg-primary text-on-primary-container font-label-md text-label-md font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Icon name="lock" className="text-body-md" />
            Simpan &amp; Kunci Acuan Lot Baru
          </button>
        </div>
      </div>
    </Modal>
  )
}

function AuditLogModal({ open, onClose, extraLog }) {
  const log = [...extraLog, ...mdAuditLog]
  return (
    <Modal
      open={open}
      onClose={onClose}
      maxWidth="max-w-2xl"
      title="Audit Log &amp; Riwayat Perubahan Nilai Acuan"
      subtitle="Proteksi Snapshot Versioning ISO 15189:2022 §7.3.9"
      icon="history_toggle_off"
    >
      <div className="p-space-lg overflow-y-auto space-y-space-sm max-h-[65vh]">
        {log.map((entry, i) => (
          <div key={`${entry.version}-${i}`} className="flex gap-space-sm">
            <div className="flex flex-col items-center flex-shrink-0">
              <span className="w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
                <Icon name="history" className="text-body-md" />
              </span>
              {i < log.length - 1 && <span className="flex-1 w-px bg-surface-container-high my-1" />}
            </div>
            <div className="flex-1 pb-space-sm min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-DEFAULT bg-primary-container text-on-primary-container font-data-mono text-data-mono font-bold text-xs">
                  {entry.version}
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{entry.action}</span>
                <span className="font-data-mono text-data-mono text-xs text-primary font-semibold">{entry.lot}</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface">{entry.parameter}</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{entry.detail}</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                {entry.by} • {entry.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-space-md bg-surface-container-low border-t border-surface-container flex items-center justify-between">
        <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1.5">
          <Icon name="lock" className="text-body-sm text-primary" />
          Log bersifat read-only &amp; tidak dapat dihapus (kepatuhan audit trail).
        </span>
        <button
          type="button"
          onClick={onClose}
          className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-bold shadow-sm"
        >
          Tutup
        </button>
      </div>
    </Modal>
  )
}

export default function MasterDataPage({ onNotify }) {
  const [activeTab, setActiveTab] = useState('parameter')
  const [query, setQuery] = useState('')
  const [controlOpen, setControlOpen] = useState(false)
  const [auditOpen, setAuditOpen] = useState(false)
  const [uaBanner, setUaBanner] = useState(true)
  const [lotBanner, setLotBanner] = useState(true)
  const [extraLog, setExtraLog] = useState([])

  const notify = useCallback((message) => onNotify?.(message), [onNotify])

  const switchTab = (tabId) => {
    setActiveTab(tabId)
    setQuery('')
  }

  const handleSave = (data) => {
    setControlOpen(false)
    setLotBanner(true)
    setExtraLog((log) => [
      {
        version: `v1.${log.length + 4}`,
        action: 'Penetapan nilai acuan baru',
        lot: `#${data.lot}`,
        parameter: `${data.analyte} — ${data.name}`,
        detail: `Mean ${fmt(data.mean)} mg/dL • SD ${fmt(data.sd)} mg/dL • CV ${fmt(data.cv)}%`,
        by: 'dr. Hendra Pratama, Sp.PK',
        time: 'Hari ini, baru saja',
      },
      ...log,
    ])
    notify(
      `Nilai acuan untuk Lot #${data.lot} berhasil disimpan dengan Snapshot Versioning aktif. Menunggu validasi digital dr. Hendra, Sp.PK.`,
    )
    switchTab('kontrol')
  }

  return (
    <div className="flex flex-col w-full gap-space-md">
      <PageHeader
        onOpenAudit={() => setAuditOpen(true)}
        onOpenNewControl={() => setControlOpen(true)}
        onNotify={notify}
      />

      <MetricCards />

      <TabSwitcher activeTab={activeTab} onChange={switchTab} />

      <div className="flex flex-col gap-space-md">
        {activeTab === 'alat' && (
          <InstrumentTab query={query} onQuery={setQuery} onNotify={notify} onAdd={() => notify('Formulir registrasi instrumen analitik dibuka.')} />
        )}
        {activeTab === 'parameter' && (
          <>
            {uaBanner && (
              <CloseableBanner
                icon="verified"
                iconClass="bg-primary text-on-primary"
                title="Pembaruan Aturan Evaluasi QC Berhasil Disimpan: Parameter Asam Urat (UA-05)"
                badges={[
                  { text: 'Aturan 10x Dinonaktifkan', className: 'bg-primary text-on-primary animate-pulse' },
                  { text: 'Sinkron LIS CS-T240', className: 'bg-primary-container text-on-primary-container' },
                ]}
                onClose={() => setUaBanner(false)}
              >
                Konfigurasi Aturan Westgard UA-05 Berhasil Diperbarui: Aturan 10x dinonaktifkan atas pertimbangan variasi
                biologis &amp; sigma metric 4.8σ untuk mengurangi <em>false rejection rate</em>. Kini menggunakan 4
                aturan aktif (1-3s, 2-2s, R-4s, 4-1s). Otorisasi sah: <strong>dr. Hendra Pratama, Sp.PK</strong> (Hari ini
                08:52 WIB).
              </CloseableBanner>
            )}
            <ParameterTab
              query={query}
              onQuery={setQuery}
              onNotify={notify}
              onAdd={() => notify('Formulir parameter pemeriksaan baru dibuka di direktori Tab B.')}
            />
          </>
        )}
        {activeTab === 'kontrol' && (
          <>
            {lotBanner && (
              <CloseableBanner
                icon="task_alt"
                iconClass="bg-primary text-on-primary"
                title="Lot Baru Berhasil Disimpan &amp; Dikunci: LOT-2024-TL991"
                badges={[{ text: 'Snapshot v1.3 Aktif', className: 'bg-primary text-on-primary animate-pulse' }]}
                onClose={() => setLotBanner(false)}
              >
                TruLab N Level 1 - Glukosa Darah telah ditambahkan ke database Master QC. Parameter analit terkalibrasi
                dan siap digunakan untuk evaluasi paralel 20 run.
              </CloseableBanner>
            )}
            <ControlLotTab query={query} onQuery={setQuery} onNotify={notify} onAdd={() => setControlOpen(true)} />
          </>
        )}
      </div>

      <NewControlModal
        open={controlOpen}
        onClose={() => setControlOpen(false)}
        onSave={handleSave}
        onDraft={(d) => {
          setControlOpen(false)
          notify(`Draf nilai acuan Lot #${d.lot} disimpan (belum terkunci). Length: CV ${fmt(d.cv)}%.`)
        }}
      />

      <AuditLogModal open={auditOpen} onClose={() => setAuditOpen(false)} extraLog={extraLog} />
    </div>
  )
}
