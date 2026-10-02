import { useState } from 'react'
import Icon from '../../components/Icon.jsx'
import { rekapRows } from '../../data/mockData.js'

const STATUS_STYLE = {
  secondary: 'bg-secondary-fixed text-on-secondary-fixed',
  closed: 'bg-surface-container text-primary',
  pending: 'bg-surface-container-high text-on-surface',
}

export default function RekapTab({ approved, onExport, onFilter }) {
  const [filter, setFilter] = useState('all')

  const rows = rekapRows
    .map((r) =>
      approved && r.doc === '#CAPA-2024-10-042'
        ? { ...r, status: 'Closed / Selesai', statusStyle: 'closed', due: '24 Okt 10:20 WIB', dueOverdue: false }
        : r,
    )
    .filter((r) => (filter === 'all' ? true : filter === 'closed' ? r.statusStyle === 'closed' : r.statusStyle !== 'closed'))

  return (
    <div className="flex flex-col space-y-space-md">
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
            Rekapitulasi Dokumen CAPA Laboratorium Patologi Klinik
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Arsip penanganan ketidaksesuaian analitik ISO 15189 Periode Q4 Tahun 2024
          </p>
        </div>
        <div className="flex items-center gap-space-sm">
          <div className="flex items-center bg-surface-container-low p-0.5 rounded-lg">
            {[
              { v: 'all', l: 'Semua' },
              { v: 'pending', l: 'Proses' },
              { v: 'closed', l: 'Selesai' },
            ].map((o) => (
              <button
                key={o.v}
                type="button"
                onClick={() => {
                  setFilter(o.v)
                  onFilter?.(o.l)
                }}
                className={`px-space-sm py-1.5 rounded-DEFAULT font-label-md text-label-md transition-all ${
                  filter === o.v
                    ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.05)]'
                    : 'text-on-surface-variant hover:text-on-surface font-medium'
                }`}
              >
                {o.l}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={onExport}
            className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-semibold flex items-center gap-1 hover:opacity-95 transition-all shadow-sm"
          >
            <Icon name="download" className="text-body-sm" />
            <span>Unduh Log Lengkap (Excel)</span>
          </button>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-md text-body-md">
            <thead>
              <tr className="bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                <th className="py-space-sm px-space-md">No. Dokumen &amp; Tgl</th>
                <th className="py-space-sm px-space-md">Alat &amp; Parameter</th>
                <th className="py-space-sm px-space-md">Akar Masalah (RCA)</th>
                <th className="py-space-sm px-space-md">PIC Analis</th>
                <th className="py-space-sm px-space-md">Target Selesai</th>
                <th className="py-space-sm px-space-md">Status Dokumen</th>
                <th className="py-space-sm px-space-md text-center">Berkas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {rows.map((r) => (
                <tr key={r.doc} className="hover:bg-surface-container-low transition-colors">
                  <td className="py-space-sm px-space-md whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-data-mono text-data-mono font-bold text-primary">{r.doc}</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">{r.date}</span>
                    </div>
                  </td>
                  <td className="py-space-sm px-space-md whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">{r.instrument}</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">{r.parameter}</span>
                    </div>
                  </td>
                  <td className="py-space-sm px-space-md max-w-xs truncate">{r.rca}</td>
                  <td className="py-space-sm px-space-md whitespace-nowrap">
                    <span className="font-body-sm text-body-sm text-on-surface">{r.pic}</span>
                  </td>
                  <td className="py-space-sm px-space-md whitespace-nowrap">
                    <span
                      className={`font-data-mono text-data-mono text-body-sm ${
                        r.dueOverdue ? 'text-error font-medium' : 'text-on-surface-variant'
                      }`}
                    >
                      {r.due}
                    </span>
                  </td>
                  <td className="py-space-sm px-space-md whitespace-nowrap">
                    <span
                      className={`px-space-xs py-0.5 rounded-DEFAULT font-label-sm text-label-sm font-semibold ${STATUS_STYLE[r.statusStyle]}`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="py-space-sm px-space-md text-center whitespace-nowrap">
                    <button
                      type="button"
                      title="Lihat PDF"
                      className="p-1 rounded-DEFAULT text-primary hover:bg-surface-container-high transition-colors"
                    >
                      <Icon name="description" className="text-headline-sm" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-space-md bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded-lg bg-surface-container-lowest text-primary flex items-center justify-center flex-shrink-0 shadow-sm">
              <Icon name="policy" className="text-headline-sm" />
            </div>
            <div>
              <span className="font-label-md text-label-md font-bold text-on-surface">
                Kepatuhan Standar Akreditasi Laboratorium Rumah Sakit
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Dokumen CAPA &amp; audit trail Westgard disimpan sekurang-kurangnya 5 tahun sesuai regulasi Kemenkes RI dan
                Klausul 8.5 ISO 15189:2022.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-space-xs flex-shrink-0">
            <span className="px-space-sm py-1 rounded-DEFAULT bg-surface-container-lowest text-on-surface font-mono text-label-sm font-medium shadow-sm">
              Audit Trail Hash: SHA-256 Valid
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
