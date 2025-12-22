// Utility functions for the chat component

export const formatTime = (date) => {
  return date.toLocaleTimeString("uz-UZ", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const generateMessageId = () => {
  return Date.now().toString() + "_" + Math.random().toString(36).substr(2, 9);
};

export const playNotificationSound = (type = "message") => {
  try {
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    // Different frequencies for different notification types
    const frequencies = {
      message: 800,
      notification: 600,
      alert: 400,
      success: 1000,
    };

    oscillator.frequency.value = frequencies[type] || 600;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.1, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.3);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.3);
  } catch (error) {
    console.log("Audio not available:", error);
  }
};

export const uzbekAIPrompts = {
  system: `Siz Uzbek tilida javob beradigan yordamchi AI assistantsiz. Har doim do'stona, samimiy va foydali javoblar bering. Uzbek tilining o'zbekcha so'zlarini ishlating. Qisqa va aniq javoblar bering.`,

  getUserPrompt: (message) =>
    `Foydalanuvchi sizga shunday dedi: "${message}". Uzbek tilida javob bering.`,

  errorMessage:
    "Kechirasiz, hozir javob bera olmayman. Keyinroq urinib ko'ring.",

  welcomeMessage: "Salom! Men sizga Uzbek tilida yordam beraman.",
};

export const chatAnimations = {
  messageEnter: {
    initial: { opacity: 0, y: 20, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.3 },
  },

  chatOpen: {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 50, scale: 0.9 },
    transition: { duration: 0.3, type: "spring", stiffness: 300 },
  },

  buttonHover: {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
  },

  alertShake: {
    y: [0, -10, 0, -10, 0],
    rotate: [0, -10, 10, -10, 0],
    scale: [1, 1.1, 1],
  },
};
