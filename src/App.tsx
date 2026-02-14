import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Stars, Mail, Sparkles, Music, Phone } from 'lucide-react';
import { APP_CONFIG } from './config';

const HeaderSection = () => (
  <header className="header-container">
    <motion.div
      className="header-heart"
      animate={{
        scale: [1, 1.15, 1.1, 1.25, 1],
        opacity: [0.8, 1, 0.9, 1, 0.8],
      }}
      transition={{
        duration: 2.2,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.2, 0.4, 0.6, 1]
      }}
    >
      <Heart fill="#ffb7c5" size={64} className="text-[#ffb7c5]" />
    </motion.div>
    <motion.div
      initial={{ opacity: 0, letterSpacing: "10px" }}
      animate={{ opacity: 1, letterSpacing: "4px" }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="header-text"
    >
      Loved Eternally
    </motion.div>
  </header>
);

const BackgroundAura = () => (
  <div className="aura-container">
    {[1, 2, 3].map((i) => (
      <motion.div
        key={i}
        className="aura-glow"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 2.5],
          opacity: [0, 0.15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          delay: i * 2.5,
          ease: "linear"
        }}
      />
    ))}
  </div>
);

const FloatingAtmosphere = () => {
  const elements = useMemo(() => Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 15,
    size: Math.random() * 20 + 10,
    delay: Math.random() * 10,
    type: Math.random() > 0.4 ? 'heart' : 'sparkle'
  })), []);

  return (
    <div className="sparkle-container">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="floating-element"
          initial={{ x: `${el.x}vw`, y: `110vh`, opacity: 0 }}
          animate={{
            y: [`110vh`, `-10vh`],
            x: [`${el.x}vw`, `${el.x + (Math.random() * 10 - 5)}vw`],
            opacity: [0, 0.2, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "linear"
          }}
        >
          {el.type === 'heart' ? (
            <Heart size={el.size} fill="#ffb7c5" className="opacity-20" />
          ) : (
            <Sparkles size={el.size} className="text-[#d4af37] opacity-20" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

const CelebratoryElements = () => {
  const elements = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    duration: Math.random() * 10 + 8,
    size: Math.random() * 30 + 20,
    delay: Math.random() * 5,
    color: i % 2 === 0 ? '#ffb7c5' : '#ffe5ec'
  })), []);

  return (
    <div className="footer-elements">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="footer-element"
          initial={{ x: `${el.x}vw`, y: `105vh`, opacity: 0, scale: 0.8 }}
          animate={{
            y: `65vh`,
            opacity: [0, 0.4, 0],
            scale: [0.8, 1.2, 1],
            x: [`${el.x}vw`, `${el.x + (Math.random() * 15 - 7.5)}vw`]
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeOut"
          }}
        >
          <div className="balloon" style={{ width: el.size, height: el.size * 1.3, backgroundColor: el.color }} />
        </motion.div>
      ))}
    </div>
  );
};

export default function App() {
  const [step, setStep] = useState(0);
  const { recipientName, phoneNumber, specialMessage, proposalSentences } = APP_CONFIG;

  const steps = [
    {
      title: `To My Everything, ${recipientName}`,
      content: proposalSentences.intro,
      button: "Our Infinite Story",
      icon: <Mail className="text-[#d4af37] mx-auto mb-6" size={80} />,
      bgColor: "rgba(255, 183, 197, 0.05)"
    },
    {
      title: "Through Every Heartbeat",
      content: proposalSentences.journey,
      button: "Cherishing Every Step",
      icon: <Music className="text-[#ffb7c5] mx-auto mb-6" size={80} />,
      bgColor: "rgba(255, 229, 236, 0.05)"
    },
    {
      title: "One Soul, Two Hearts",
      content: proposalSentences.connection,
      button: "Seal Our Destiny",
      icon: <Heart className="text-[#d4af37] mx-auto mb-6" size={80} />,
      bgColor: "rgba(212, 175, 55, 0.05)"
    },
    {
      title: "Forever & Ever",
      content: proposalSentences.question,
      button: "YES, I LOVE YOU! ❤️",
      icon: <Stars className="text-[#ffb7c5] mx-auto mb-8" size={100} />,
      bgColor: "rgba(255, 183, 197, 0.08)",
      isFinal: true
    }
  ];

  const handleAction = () => {
    if (steps[step].isFinal) {
      const message = encodeURIComponent(specialMessage);
      window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
    } else {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <div className="mobile-container">
      <BackgroundAura />
      <FloatingAtmosphere />
      <HeaderSection />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "anticipate" }}
          className="glass-card"
          style={{ backgroundColor: steps[step].bgColor }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {steps[step].icon}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {steps[step].title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {steps[step].content}
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary"
            onClick={handleAction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {steps[step].isFinal && <Phone size={20} className="inline mr-2 align-text-bottom" />}
            {steps[step].button}
          </motion.button>
        </motion.div>
      </AnimatePresence>

      <CelebratoryElements />
    </div>
  );
}
