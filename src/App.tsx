import React, { useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import IntersectObserver from '@/components/common/IntersectObserver';
import { Toaster } from '@/components/ui/sonner';

import { CustomCursor } from '@/components/CustomCursor';
import { NavBar } from '@/components/NavBar';
import { HeroSection } from '@/components/HeroSection';
import { WhoAmISection } from '@/components/WhoAmISection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';
import ProjectDetailPage from '@/pages/ProjectDetailPage';
import ExperienceDetailPage from './components/ExperinceDetails';
import { ExperienceSection } from './components/ExperienceSection';

const Portfolio: React.FC = () => (
  <div
    className="relative min-h-screen w-full overflow-x-hidden"
    style={{ background: '#020B18' }}
  >
    <NavBar />
    <main>
      <HeroSection />
      <WhoAmISection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
    </main>
  </div>
);

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual';

    if (pathname === '/' && hash) {
      const frame = window.requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start', behavior: 'auto' });
      });

      return () => window.cancelAnimationFrame(frame);
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <CustomCursor />
      <IntersectObserver />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
        <Route path="/experience/:experienceId" element={<ExperienceDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
