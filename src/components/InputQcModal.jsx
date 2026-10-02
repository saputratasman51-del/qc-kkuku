import { useState } from 'react'
import Modal, { ModalHeader } from './Modal.jsx'
import Icon from './Icon.jsx'

const FIELD =
  'h-9 px-space-sm bg-surface-container-low text-on-surface font-body-sm text-body-sm rounded-lg focus:outline-none focus:bg-surface-container-high transition-colors'
const LABEL = 'font-label-sm text-label-sm text-on-surface font-semibold'

export default function InputQcModal({ open, onClose, onSubmit }) {
  const [analyzer, setAnalyzer] = useState('Dirui CS-T240 (Kimia Darah)')
  const [parameter, setParameter] = useState('Glukosa Darah (GLU)')
  const [level, setLevel] = useState('L1')
  const [lot, setLot] = useState('GLU-9903')
  const [value, setValue] = useState('')
  const [note, setNote] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onSubmit({ analyzer, parameter, level, lot, value, note })
    setValue('')
    setNote('')
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      header={
        <ModalHeader
          icon="edit_note"
          iconClass="text-primary"
          bgClass="bg-secondary-fixed/40"
          title="Input Hasil Pengujian QC Harian"
          subtitle="Laboratorium Patologi Klinik • RSUD SMJ I"
          onClose={onClose}
        />
      }
    >
      <form onSubmit={submit} className="p-space-lg flex flex-col gap-space-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
          <div className="flex flex-col gap-1">
            <label className={LABEL}>Alat / Analyzer</label>
            <select value={analyzer} onChange={(e) => setAnalyzer(e.target.value)} className={FIELD}>
              <option>Dirui CS-T240 (Kimia Darah)</option>
              <option>Sysmex XN-550 (Hematologi)</option>
              <option>Cobas e411 (Imunoserologi)</option>
              <option>Dirui H-500 (Urinalisis)</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className={LABEL}>Parameter Uji</label>
            <select value={parameter} onChange={(e) => setParameter(e.target.value)} className={FIELD}>
              <option>Glukosa Darah (GLU)</option>
              <option>Kolesterol Total (CHOL)</option>
              <option>Trigliserida (TRIG)</option>
              <option>SGOT / AST</option>
              <option>SGPT / ALT</option>
              <option>Ureum • Kreatinin</option>
              <option>Hemoglobin (Hb)</option>
              <option>Leukosit (WBC)</option>
              <option>Trombosit (PLT)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
          <div className="flex flex-col gap-1">
            <label className={LABEL}>Level Kontrol</label>
            <div className="flex rounded-lg bg-surface-container-low p-1">
              {['L1', 'L2', 'L3'].map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLevel(l)}
                  className={`flex-1 py-1 rounded font-label-sm text-label-sm ${
                    level === l
                      ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm'
                      : 'text-on-surface-variant font-medium'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className={LABEL}>Nomor Lot Reagen</label>
            <input value={lot} onChange={(e) => setLot(e.target.value)} className={FIELD} type="text" />
          </div>
          <div className="flex flex-col gap-1">
            <label className={LABEL}>Nilai Pengukuran</label>
            <input
              required
              step="0.01"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="215.4"
              className={`${FIELD} font-data-mono text-data-mono font-bold`}
            />
          </div>
        </div>

        <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
          <span>
            Target Mean Referensi: <strong className="text-on-surface font-data-mono">215.0</strong>
          </span>
          <span>
            Target SD: <strong className="text-on-surface font-data-mono">8.00</strong>
          </span>
          <span>
            CV Maks: <strong className="text-on-surface font-data-mono">3.72%</strong>
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <label className={LABEL}>Catatan / Kondisi Instrumen (Opsional)</label>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Suhu ruang: 22°C, Fluktuasi tegangan normal..."
            className={FIELD}
            type="text"
          />
        </div>

        <div className="flex items-center justify-end gap-space-sm pt-space-xs mt-space-xs">
          <button
            type="button"
            onClick={onClose}
            className="px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm font-semibold transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-space-md py-2 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-sm text-label-sm font-semibold shadow-sm transition-colors flex items-center gap-1"
          >
            <Icon name="save" className="text-label-md" />
            <span>Simpan &amp; Evaluasi Westgard</span>
          </button>
        </div>
      </form>
    </Modal>
  )
}
