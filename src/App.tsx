import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
      <SkillsSection />
      <ContactSection />
    </main>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <CustomCursor />
      <IntersectObserver />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
