import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useCallback, useState } from 'react'
import Layout from './components/Layout.jsx'
import DashboardPage from './components/dashboard/DashboardPage.jsx'
import CapaPage from './pages/CapaPage.jsx'
import LeveyJenningsPage from './pages/LeveyJenningsPage.jsx'
import InputQcPage from './pages/InputQcPage.jsx'
import MasterDataPage from './pages/MasterDataPage.jsx'
import LaporanPage from './pages/LaporanPage.jsx'
import InputQcModal from './components/InputQcModal.jsx'
import CapaModal from './components/CapaModal.jsx'
import Icon from './components/Icon.jsx'

export default function App() {
  const [toast, setToast] = useState(null)
  const [inputQcOpen, setInputQcOpen] = useState(false)
  const [capaTarget, setCapaTarget] = useState(null)

  const notify = useCallback((message, tone = 'primary') => {
    setToast({ message, tone })
    setTimeout(() => setToast(null), 3600)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <DashboardPage
                onOpenInputQc={() => setInputQcOpen(true)}
                onOpenCapa={(t) => setCapaTarget(t)}
                onNotify={notify}
              />
            }
          />
          <Route path="/capa-westgard" element={<CapaPage onNotify={notify} />} />
          <Route
            path="/grafik-levey-jennings"
            element={<LeveyJenningsPage onOpenCapa={(t) => setCapaTarget(t)} onNotify={notify} />}
          />
          <Route path="/input-qc-harian" element={<InputQcPage onNotify={notify} />} />
          <Route path="/master-data" element={<MasterDataPage onNotify={notify} />} />
          <Route path="/laporan" element={<LaporanPage onNotify={notify} />} />
          <Route path="*" element={<Navigate to="/laporan" replace />} />
        </Route>
      </Routes>

      <InputQcModal
        open={inputQcOpen}
        onClose={() => setInputQcOpen(false)}
        onSubmit={(data) => {
          setInputQcOpen(false)
          notify(
            `Data QC harian ${data.parameter} ${data.level} (${data.value}) tersimpan. Nilai otomatis dievaluasi terhadap aturan Westgard.`,
          )
        }}
      />

      <CapaModal
        open={!!capaTarget}
        target={capaTarget}
        onClose={() => setCapaTarget(null)}
        onSubmit={() => {
          setCapaTarget(null)
          notify('Tindakan CAPA berhasil dicatat dan diteruskan ke Penanggung Jawab Laboratorium (dr. Hendra Pratama, Sp.PK) untuk approval.')
        }}
      />

      {toast && (
        <div className="fixed bottom-6 right-6 z-[70] max-w-sm">
          <div
            className={`flex items-start gap-space-sm p-space-md rounded-xl shadow-lg bg-surface-container-lowest border-l-4 ${
              toast.tone === 'error' ? 'border-error' : toast.tone === 'secondary' ? 'border-secondary' : 'border-primary'
            }`}
          >
            <Icon
              name={toast.tone === 'error' ? 'gpp_bad' : toast.tone === 'secondary' ? 'info' : 'check_circle'}
              className={`text-headline-sm ${toast.tone === 'error' ? 'text-error' : 'text-primary'}`}
            />
            <p className="font-body-sm text-body-sm text-on-surface">{toast.message}</p>
          </div>
        </div>
      )}
    </BrowserRouter>
  )
}
