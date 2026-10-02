import { NavLink, Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { useState } from 'react'

const TITLES = {
  '/': 'Dashboard Pemantauan QC Laboratorium',
  '/capa-westgard': 'Manajemen CAPA & Westgard',
  '/input-qc-harian': 'Input QC Harian',
  '/grafik-levey-jennings': 'Grafik Levey-Jennings',
  '/master-data': 'Master Data Kendali Mutu (QC) Laboratorium',
  '/laporan': 'Laporan',
}

export default function Layout() {
  const location = useLocation()
  const [role, setRole] = useState('Petugas Lab')
  const variant = location.pathname === '/' ? 'dashboard' : 'default'

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="pl-64 flex flex-col min-h-screen">
        <Header
          variant={variant}
          title={TITLES[location.pathname] ?? 'SIM-QC LAB'}
          role={role}
          onRoleChange={setRole}
        />
        <main className="relative pt-16 bg-surface min-h-[calc(100vh-4rem)] w-full px-gutter-desktop py-space-lg">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
