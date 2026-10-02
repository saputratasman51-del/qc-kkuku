import { useState } from 'react'
import Modal from './Modal.jsx'

const LABEL = 'font-label-sm text-label-sm font-semibold text-on-surface-variant block mb-1'
const FIELD = 'w-full px-space-sm py-2 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary'

export default function ManualCapaModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({ instrument: '', parameter: '', lot: '', description: '' })

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = () => {
    onSave?.(form)
    setForm({ instrument: '', parameter: '', lot: '', description: '' })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      icon="post_add"
      title="Buat Laporan CAPA Manual"
      subtitle="Pencatatan ketidaksesuaian analitik & pra-analitik"
      footer={
        <div className="p-space-md bg-surface-container-low flex items-center justify-end gap-space-sm">
          <button
            type="button"
            onClick={onClose}
            className="px-space-md py-2 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md text-label-md"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={submit}
            className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-bold shadow-sm"
          >
            Simpan &amp; Lanjutkan Investigasi
          </button>
        </div>
      }
    >
      <div className="p-space-md space-y-space-md">
        <div>
          <label className={LABEL}>Instrumen Laboratorium</label>
          <select value={form.instrument} onChange={set('instrument')} className={FIELD}>
            <option value="">-- Pilih Instrumen --</option>
            <option>Dirui CS-T240 (Kimia Klinik)</option>
            <option>Sysmex XN-550 (Hematologi)</option>
            <option>Cobas e411 (Imunoserologi)</option>
            <option>Electrolyte Analyzer Cornley K-Plus</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-space-sm">
          <div>
            <label className={LABEL}>Parameter Pemeriksaan</label>
            <input
              value={form.parameter}
              onChange={set('parameter')}
              className={FIELD}
              placeholder="Contoh: Kolesterol Total"
              type="text"
            />
          </div>
          <div>
            <label className={LABEL}>Nomor Lot Kontrol</label>
            <input value={form.lot} onChange={set('lot')} className={FIELD} placeholder="Contoh: #LOT-2024-C" type="text" />
          </div>
        </div>
        <div>
          <label className={LABEL}>Uraian Ringkas Masalah / Aturan Terlanggar</label>
          <textarea
            value={form.description}
            onChange={set('description')}
            rows={3}
            className={`${FIELD} p-space-sm`}
            placeholder="Jelaskan anomali QC atau insiden teknis yang terjadi..."
          />
        </div>
      </div>
    </Modal>
  )
}
