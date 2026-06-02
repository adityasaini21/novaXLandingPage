import React, { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Camera, Zap, Cpu, Battery, Layers, ShieldCheck } from 'lucide-react';
import { useScroll } from '@react-three/drei';
import gsap from 'gsap';

// Optimization: Memoize the FadeIn component
const FadeIn = memo(({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
));

// Section Components
const HeroSection = memo(() => (
  <section className="section-container section-center">
    <FadeIn>
      <h1 className="title-massive">Beyond<br />Imagination.</h1>
    </FadeIn>
    <FadeIn delay={0.2}>
      <p className="subtitle" style={{ marginTop: '2rem' }}>The future fits in your hand.</p>
    </FadeIn>
    <FadeIn delay={0.4}>
      <button className="btn-primary">Explore NOVA X</button>
    </FadeIn>
  </section>
));

const RevealSection = memo(() => (
  <section className="section-container section-left">
    <FadeIn>
      <h2 className="title-large">Unveiling<br />The Future.</h2>
    </FadeIn>
    <FadeIn delay={0.2}>
      <p className="body-text" style={{ marginTop: '2rem' }}>
        A paradigm shift in mobile technology. Forged from aerospace-grade titanium and sculpted to perfection. 
        Every curve, every edge, designed with obsessive attention to detail.
      </p>
    </FadeIn>
  </section>
));

const DesignSection = memo(() => (
  <section className="section-container section-right" id="design-section">
    <FadeIn>
      <h2 className="title-large">Titanium<br />Forged.</h2>
    </FadeIn>
    <FadeIn delay={0.2}>
      <p className="body-text" style={{ marginTop: '2rem', marginLeft: 'auto' }}>
        Lighter. Stronger. More beautiful than ever. 
        The NOVA X introduces a revolutionary titanium unibody that sets a new standard for premium craftsmanship.
      </p>
    </FadeIn>
  </section>
));

const CameraSection = memo(() => (
  <section className="section-container section-right" id="camera-section">
    <FadeIn>
      <h2 className="title-large">Capture Reality.<br />200MP.</h2>
    </FadeIn>
    <FadeIn delay={0.2}>
      <p className="body-text" style={{ marginTop: '2rem', marginLeft: 'auto' }}>
        An entirely new AI-powered camera system. 8K cinematic recording.
        Photonic engine that sees in the dark. Your memories, captured flawlessly.
      </p>
    </FadeIn>
    <FadeIn delay={0.4}>
      <div className="feature-grid" style={{ marginTop: '2rem', maxWidth: '500px', marginLeft: 'auto' }}>
        <div className="feature-card" style={{ padding: '1.5rem' }}>
          <Camera className="feature-icon" size={24} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Night Vision</h3>
          <p className="body-text" style={{ fontSize: '0.9rem' }}>Zero noise in absolute darkness.</p>
        </div>
        <div className="feature-card" style={{ padding: '1.5rem' }}>
          <Layers className="feature-icon" size={24} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Smart HDR 5</h3>
          <p className="body-text" style={{ fontSize: '0.9rem' }}>Perfect exposure, always.</p>
        </div>
      </div>
    </FadeIn>
  </section>
));

const PerformanceSection = memo(() => (
  <section className="section-container section-left" id="performance-section">
    <FadeIn>
      <h2 className="title-large">Absolute<br />Power.</h2>
    </FadeIn>
    <FadeIn delay={0.2}>
      <p className="body-text" style={{ marginTop: '2rem' }}>
        Powered by the M-Nova chip. Desktop-class architecture in your pocket. 
        Experience unparalleled speed and thermal efficiency.
      </p>
    </FadeIn>
  </section>
));

const AISection = memo(() => (
  <section className="section-container section-center">
    <FadeIn>
      <div className="glass-panel">
        <Cpu className="feature-icon" size={48} style={{ margin: '0 auto 2rem' }} />
        <h2 className="title-large gradient-text">Neural Intelligence.</h2>
        <p className="body-text" style={{ margin: '2rem auto 0', textAlign: 'center' }}>
          The first smartphone with a dedicated neural consciousness.
          It anticipates your needs, learns your habits, and adapts in real-time.
        </p>
      </div>
    </FadeIn>
  </section>
));

const BatterySection = memo(() => (
  <section className="section-container section-right">
    <FadeIn>
      <h2 className="title-large">Infinite<br />Energy.</h2>
    </FadeIn>
    <FadeIn delay={0.2}>
      <p className="body-text" style={{ marginTop: '2rem', marginLeft: 'auto' }}>
        3-day battery life. Ultra-fast liquid charging.
        0 to 100% in 15 minutes. Because time is your most valuable asset.
      </p>
    </FadeIn>
    <FadeIn delay={0.4}>
      <div className="feature-grid" style={{ marginTop: '2rem', maxWidth: '500px', marginLeft: 'auto' }}>
        <div className="feature-card" style={{ padding: '1.5rem' }}>
          <Zap className="feature-icon" size={24} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>HyperCharge</h3>
          <p className="body-text" style={{ fontSize: '0.9rem' }}>120W wireless delivery.</p>
        </div>
        <div className="feature-card" style={{ padding: '1.5rem' }}>
          <Battery className="feature-icon" size={24} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Graphene Core</h3>
          <p className="body-text" style={{ fontSize: '0.9rem' }}>Zero degradation over 5 years.</p>
        </div>
      </div>
    </FadeIn>
  </section>
));

const ShowcaseSection = memo(() => (
  <section className="section-container section-left">
    <FadeIn>
      <h2 className="title-large">Every Angle.<br />Perfect.</h2>
    </FadeIn>
    <FadeIn delay={0.2}>
      <p className="body-text" style={{ marginTop: '2rem' }}>
        A masterpiece of engineering. No gaps, no seams. 
        Just pure uninterrupted glass and titanium blending together perfectly.
      </p>
    </FadeIn>
  </section>
));

const TestimonialsSection = memo(() => (
  <section className="section-container section-center">
    <FadeIn>
      <h2 className="title-large" style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}>What Visionaries Say.</h2>
    </FadeIn>
    <FadeIn delay={0.2}>
      <div className="feature-grid" style={{ marginTop: '4rem' }}>
        <div className="feature-card">
          <ShieldCheck className="feature-icon" size={32} />
          <p className="body-text" style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: '#fff' }}>
            "The most stunning piece of consumer technology I've ever held."
          </p>
          <h4 style={{ color: 'var(--accent-liquid-silver)' }}>Tech Reviewer</h4>
        </div>
        <div className="feature-card">
          <Camera className="feature-icon" size={32} />
          <p className="body-text" style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: '#fff' }}>
            "The camera system rivals professional cinema rigs. Truly unbelievable."
          </p>
          <h4 style={{ color: 'var(--accent-liquid-silver)' }}>Cinematographer</h4>
        </div>
      </div>
    </FadeIn>
  </section>
));

const FinalCTASection = memo(() => (
  <section className="section-container section-center">
    <FadeIn>
      <h1 className="title-massive" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}>The Future<br />Has Arrived.</h1>
    </FadeIn>
    <FadeIn delay={0.3}>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '3rem' }}>
        <button className="btn-primary" style={{ backgroundColor: '#fff', color: '#000' }}>Pre-Order NOVA X</button>
        <button className="btn-primary">View Pricing</button>
      </div>
    </FadeIn>
    <FadeIn delay={0.5}>
      <p className="body-text" style={{ marginTop: '2rem', fontSize: '0.9rem' }}>Available starting at $1,299. Ships next month.</p>
    </FadeIn>
  </section>
));

export const Overlay = memo(() => {
  const scroll = useScroll();

  // Programmatic navigation to prevent anchor trapping
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
    e.preventDefault();
    if (scroll.el) {
      gsap.to(scroll.el, {
        scrollTop: page * window.innerHeight,
        duration: 1.5,
        ease: "power4.inOut",
        overwrite: true
      });
    }
  }, [scroll.el]);

  return (
    <div style={{ width: '100vw' }}>
      <nav className="nav-header">
        <div className="nav-logo" style={{ cursor: 'pointer' }} onClick={(e) => handleNavClick(e as any, 0)}>NOVA X</div>
        <div className="nav-links">
          <a href="#design" onClick={(e) => handleNavClick(e, 2)}>Design</a>
          <a href="#camera" onClick={(e) => handleNavClick(e, 3)}>Camera</a>
          <a href="#performance" onClick={(e) => handleNavClick(e, 4)}>Performance</a>
        </div>
      </nav>

      <HeroSection />
      <RevealSection />
      <DesignSection />
      <CameraSection />
      <PerformanceSection />
      <AISection />
      <BatterySection />
      <ShowcaseSection />
      <TestimonialsSection />
      <FinalCTASection />
    </div>
  );
});
