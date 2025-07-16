import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SummaryList } from "./pages/SummaryList";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Profile } from "./pages/Profile";
import { Upload } from "./pages/Upload";
import { SummaryDetail } from "./pages/SummaryDetail";
import { AuthorProfile } from "./pages/AuthorProfile";
import NotFound from "./pages/NotFound";
import { Header } from "@/components/Header";

const queryClient = new QueryClient();

const AppLayout = () => {
  const location = useLocation();
  const showHeader = !["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<SummaryList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/summary/:id" element={<SummaryDetail />} />
          <Route path="/author/:authorId" element={<AuthorProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
