import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import KpiGrid from '../components/KpiGrid.jsx'
import TabBar from '../components/TabBar.jsx'
import WestgardTab from '../components/tabs/WestgardTab.jsx'
import InvestigasiTab from '../components/tabs/InvestigasiTab.jsx'
import VerifikasiTab from '../components/tabs/VerifikasiTab.jsx'
import RekapTab from '../components/tabs/RekapTab.jsx'
import ManualCapaModal from '../components/ManualCapaModal.jsx'
import QcDetailModal from '../components/QcDetailModal.jsx'

export default function CapaPage({ onNotify }) {
  const [activeTab, setActiveTab] = useState('tab-westgard')
  const [manualOpen, setManualOpen] = useState(false)
  const [qcOpen, setQcOpen] = useState(false)
  const [approved, setApproved] = useState(false)
  const navigate = useNavigate()

  const handleApprove = useCallback(() => {
    setApproved(true)
    onNotify(
      'Otorisasi Berhasil! Dokumen #CAPA-2024-10-042 telah ditandatangani digital. Kunci Dirui CS-T240 dibuka, 12 hasil pasien dilepas ke SIMRS.',
    )
    setActiveTab('tab-rekap')
  }, [onNotify])

  return (
    <div className="flex flex-col w-full">
      <div className="mb-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
            <span
              onClick={() => navigate('/')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Kendali Mutu Internal (PMI)
            </span>
            <Icon name="chevron_right" className="text-body-sm" />
            <span className="text-primary font-semibold">Manajemen CAPA &amp; Westgard</span>
            <Icon name="chevron_right" className="text-body-sm" />
            <span className="px-space-xs py-0.5 rounded-DEFAULT bg-surface-container-high text-primary font-mono text-[10px] font-semibold">
              ISO 15189:2022 §7.3.7
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-1 flex items-center gap-space-sm flex-wrap">
            <span>CAPA &amp; Pelanggaran Aturan Westgard Multirule</span>
            <span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold shadow-sm animate-pulse">
              <span className="w-2 h-2 rounded-full bg-error" />
              2 Pelanggaran Kritis Membutuhkan Tindakan
            </span>
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl mt-1">
            Sistem identifikasi kegagalan analitik otomatis, pencatatan investigasi akar masalah (RCA 5M), tindakan
            korektif/preventif, dan otorisasi verifikasi berkas oleh Dokter Spesialis Patologi Klinik (Sp.PK) terakreditasi
            ISO 15189.
          </p>
        </div>

        <div className="flex items-center gap-space-sm flex-shrink-0 flex-wrap">
          <button
            type="button"
            onClick={() => setManualOpen(true)}
            className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-primary-container text-on-primary-container hover:opacity-95 transition-all shadow-md font-label-lg text-label-lg font-semibold"
          >
            <Icon name="add_circle" className="text-headline-sm" />
            <span>Buat CAPA Manual</span>
          </button>
          <button
            type="button"
            onClick={() => onNotify('Menyiapkan rekap CAPA format PDF/XLS…')}
            className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-all shadow-sm font-label-lg text-label-lg font-medium"
          >
            <Icon name="picture_as_pdf" className="text-headline-sm text-primary" />
            <span>Ekspor Rekap (PDF/XLS)</span>
          </button>
          <button
            type="button"
            onClick={() => onNotify('SOP & Kebijakan Multirule Westgard (SOP-PMI-005) siap diunduh.')}
            title="Buka SOP & Kebijakan Multirule Westgard RSUD SMJ I"
            className="w-10 h-10 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-primary hover:bg-surface-container-high flex items-center justify-center shadow-sm transition-all"
          >
            <Icon name="menu_book" className="text-headline-sm" />
          </button>
        </div>
      </div>

      <KpiGrid />
      <TabBar activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'tab-westgard' && (
        <WestgardTab onOpenCapa={() => setActiveTab('tab-investigasi')} onOpenQcDetail={() => setQcOpen(true)} />
      )}
      {activeTab === 'tab-investigasi' && (
        <InvestigasiTab
          onSubmitToDoctor={() => {
            onNotify('Form CAPA #042 diajukan ke dr. Hendra Pratama, Sp.PK untuk verifikasi.')
            setActiveTab('tab-verifikasi')
          }}
        />
      )}
      {activeTab === 'tab-verifikasi' && (
        <VerifikasiTab
          approved={approved}
          onApprove={handleApprove}
          onReject={() => onNotify('Permintaan dukungan vendor teknik dikirim ke Sureq / PT. Dirui Indonesia.')}
          onRevise={() => {
            onNotify('Dokumen dikembalikan ke Petugas Lab untuk revisi.')
            setActiveTab('tab-investigasi')
          }}
        />
      )}
      {activeTab === 'tab-rekap' && (
        <RekapTab
          approved={approved}
          onExport={() => onNotify('Log audit trail CAPA diunduh (rekap-okt-2024.xlsx).')}
          onFilter={(l) => onNotify(`Filter rekap: ${l}`)}
        />
      )}

      <ManualCapaModal
        open={manualOpen}
        onClose={() => setManualOpen(false)}
        onSave={() => {
          setManualOpen(false)
          setActiveTab('tab-investigasi')
          onNotify('Laporan CAPA manual dibuat. Lanjutkan pengisian investigasi 5M.')
        }}
      />
      <QcDetailModal open={qcOpen} onClose={() => setQcOpen(false)} />
    </div>
  )
}
