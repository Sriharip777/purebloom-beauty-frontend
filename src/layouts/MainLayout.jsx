import { Outlet } from 'react-router-dom';
import TopStrip from '../components/layout/TopStrip';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FloatingWhatsApp from '../components/common/FloatingWhatsApp';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white">
      <TopStrip />
      <Header />
      <main className="overflow-hidden">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
