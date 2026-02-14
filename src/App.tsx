import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Stars, Mail, Sparkles, Music, Phone } from 'lucide-react';
import { APP_CONFIG } from './config';

const FloatingElements = () => {
  const elements = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: Math.random() * 12 + 10,
    size: Math.random() * 35 + 10,
    delay: Math.random() * 10,
    type: Math.random() > 0.2 ? 'heart' : 'star'
  })), []);

  return (
    <div className="sparkle-container">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="floating-element"
          initial={{
            x: `${el.initialX}vw`,
            y: `110vh`,
            opacity: 0,
            scale: 0
          }}
          animate={{
            y: `-10vh`,
            x: [`${el.initialX}vw`, `${el.initialX + (Math.random() * 20 - 10)}vw`],
            opacity: [0, 0.4, 0],
            scale: [0.5, 1.2, 0.5],
            rotate: [0, 360]
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut"
          }}
        >
          {el.type === 'heart' ? (
            <Heart size={el.size} fill="currentColor" className="text-[#ff4d6d]" />
          ) : (
            <Sparkles size={el.size} className="text-[#ffb3c1]" />
          )}
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
      title: `For My Dear ${recipientName}`,
      content: proposalSentences.intro,
      button: "Begin Our Story",
      icon: <Mail className="text-[#ff4d6d] mx-auto mb-6" size={72} />,
      bgColor: "rgba(255, 77, 109, 0.12)"
    },
    {
      title: "Through Every Moment",
      content: proposalSentences.journey,
      button: "Continue the Journey",
      icon: <Music className="text-[#ffb3c1] mx-auto mb-6" size={72} />,
      bgColor: "rgba(255, 179, 193, 0.12)"
    },
    {
      title: "Soulmate Connection",
      content: proposalSentences.connection,
      button: "The Most Important Step",
      icon: <Heart className="text-[#ff4d6d] mx-auto mb-6" size={72} />,
      bgColor: "rgba(255, 77, 109, 0.15)"
    },
    {
      title: "Forever & Always",
      content: proposalSentences.question,
      button: "YES, I LOVE YOU! ❤️",
      icon: <Stars className="text-[#ffd700] mx-auto mb-6" size={80} />,
      bgColor: "rgba(255, 215, 0, 0.15)",
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
      <FloatingElements />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.8, y: 50, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, scale: 1.2, y: -50, rotate: 5 }}
          whileTap={{ scale: 0.98 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 18,
            duration: 0.7
          }}
          className="glass-card"
          style={{ backgroundColor: steps[step].bgColor }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          >
            {steps[step].icon}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {steps[step].title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {steps[step].content}
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
            onClick={handleAction}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {steps[step].isFinal && <Phone size={20} className="inline mr-2 align-text-bottom" />}
            {steps[step].button}
          </motion.button>
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.2 }}
        style={{
          position: 'fixed',
          bottom: 30,
          fontSize: '1rem',
          fontWeight: 700,
          color: 'var(--secondary)',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}
        whileHover={{ scale: 1.1, color: '#ff4d6d' }}
      >
        Loved Eternally ✨
      </motion.div>
    </div>
  );
}
