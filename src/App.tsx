import { useState } from "react";
import Login from "./pages/ef/Login";
import Dashboard from "./pages/ef/Dashboard";
import Mobility from "./pages/ef/Mobility";
import Stays from "./pages/ef/Stays";
import Recommendations from "./pages/ef/Recommendations";
import EventTimeline from "./pages/ef/EventTimeline";
import Analytics from "./pages/ef/Analytics";
import NavBar from "./pages/ef/NavBar";
import Toast from "./pages/ef/Toast";

export type EFPage = "overview" | "mobility" | "stays" | "recommendations" | "event" | "analytics";
export interface ToastMsg { id: number; text: string; type?: "success" | "warn" | "info" }

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState<EFPage>("overview");
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  const toast = (text: string, type: ToastMsg["type"] = "info") => {
    const id = Date.now();
    setToasts(t => [...t, { id, text, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4200);
  };

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  const pages: Record<EFPage, React.ReactNode> = {
    overview:        <Dashboard onToast={toast} onNav={setPage} />,
    mobility:        <Mobility onToast={toast} />,
    stays:           <Stays onToast={toast} />,
    recommendations: <Recommendations onToast={toast} />,
    event:           <EventTimeline />,
    analytics:       <Analytics />,
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F3EE" }}>
      <NavBar page={page} onNav={setPage} />
      <main className="flex-1 overflow-y-auto">
        {pages[page]}
      </main>
      <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50 pointer-events-none">
        {toasts.map(t => <Toast key={t.id} msg={t} />)}
      </div>
    </div>
  );
}
