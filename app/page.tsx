"use client";

import { useState, useEffect } from "react";
import { useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Heart,
  Sparkles,
  MapPin,
  Clock,
  Stars,
  Gift,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

const memories = [
  {
    title: "Awal cerita kita",
    text: "11 Juni mungkin cuma tanggal biasa bagi orang lain. Tapi buat aku, hari itu adalah awal dari cerita yang paling ingin aku jaga.",
    icon: "🌷",
  },
  {
    title: "Tentang jarak",
    text: "Kita memang nggak selalu bisa berada di tempat yang sama. Tapi sejauh apa pun jaraknya, kamu tetap terasa dekat di hati aku.",
    icon: "🌙",
  },
  {
    title: "Saat kita bertemu",
    text: "Setiap kali kita akhirnya bertemu, rasa rindu yang selama ini cuma bisa dipendam rasanya terbayar semuanya.",
    icon: "❤️",
  },
  {
    title: "Hal-hal kecil",
    text: "Aku ingat banyak hal tentang kita, termasuk hal-hal kecil yang mungkin sudah kamu lupakan.",
    icon: "✨",
  },
];
const photos = [
  "WhatsApp Image 2026-09-25 at 07.25.17 (1).jpeg",
  "WhatsApp Image 2026-09-25 at 07.25.17 (2).jpeg",
  "WhatsApp Image 2026-09-25 at 07.25.17 (3).jpeg",
  "WhatsApp Image 2026-09-25 at 07.25.17.jpeg",
  "WhatsApp Image 2026-09-25 at 07.25.18.jpeg",
  "1 foto.jpeg"
];

// Animasi transisi antar chapter
const pageVariant: Variants = {
  initial: { opacity: 0, y: 30, scale: 0.98 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { duration: 0.8, ease: "easeOut" } 
  },
  exit: { 
    opacity: 0, 
    y: -30, 
    scale: 0.98, 
    transition: { duration: 0.5, ease: "easeIn" } 
  }
};

export default function Home() {
  const [chapter, setChapter] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [hasOpenedStory, setHasOpenedStory] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const fullText = "AAku mau cerita sedikit...\nTentang kamu, tentang kita, dan alasan kenapa aku bersyukur punya kamu.";

  // Efek Typewriter di Chapter 0
  useEffect(() => {
    if (chapter === 0 && !isTransitioning) {
      let i = 0;
      setTypewriterText("");
      const timer = setInterval(() => {
        if (i < fullText.length) {
          setTypewriterText((prev) => prev + fullText.charAt(i));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [chapter, isTransitioning]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (hasOpenedStory) {
      if (audio.paused) {
        audio.play().catch(() => undefined);
      }
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [chapter, hasOpenedStory]);

  const handleOpenHeart = () => {
    setHasOpenedStory(true);
    setIsTransitioning(true);
    setTimeout(() => {
      setChapter(1);
      setIsTransitioning(false);
    }, 1200);
  };

  const nextChapter = () => {
    setChapter((prev) => prev + 1);
    window.scrollTo(0, 0); // Pastikan scroll kembali ke atas tiap ganti chapter
  };

  const previousChapter = () => {
    setChapter((prev) => Math.max(0, prev - 1));
    window.scrollTo(0, 0);
  };

  return (
    <main className="overflow-hidden bg-[#fafafa]">
      <audio ref={audioRef} loop preload="auto">
        <source
          src="/music/Nadhif Basalamah - bergema sampai selamanya (Stripped Version - Official Audio) - (192 Kbps).mp3"
          type="audio/mpeg"
        />
      </audio>

      {/* ANIMASI TRANSISI (GELOMBANG PINK MENUTUPI LAYAR) SAAT START */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 150, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed top-1/2 left-1/2 w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full z-[100] -translate-x-1/2 -translate-y-1/2 transform origin-center pointer-events-none"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        
        {/* CHAPTER 0 : INTRO */}
        {chapter === 0 && (
          <motion.section
            key="chapter-0"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="relative min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-indigo-50 via-pink-50 to-rose-100"
          >
            <FloatingHeart className="top-[15%] left-[12%]" size={35} delay={0} />
            <FloatingHeart className="bottom-[15%] right-[12%]" size={40} delay={0.5} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-300/30 rounded-full blur-[100px] -z-10" />

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
              className="relative z-10 text-center max-w-2xl bg-white/60 backdrop-blur-xl p-12 rounded-[3rem] border border-white shadow-2xl shadow-pink-200/50"
            >
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="flex justify-center mb-8 drop-shadow-xl">
                <div className="relative">
                  <div className="absolute inset-0 bg-pink-400 blur-xl opacity-50 rounded-full animate-pulse" />
                  <Gift className="text-pink-500 relative z-10" size={70} />
                </div>
              </motion.div>

              <p className="text-xs md:text-sm tracking-[0.5em] uppercase text-pink-400 font-bold mb-6">Buat kamu</p>
              <h1 className="text-5xl md:text-7xl font-serif text-gray-800 tracking-tight">
                Untuk kamu, <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400 italic mt-2 py-2 font-bold">sayang.</span>
              </h1>

              <div className="mt-8 h-20 text-gray-600 text-lg md:text-xl leading-relaxed font-medium">
                <p className="whitespace-pre-line">{typewriterText}<motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>|</motion.span></p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenHeart}
                className="mt-8 px-10 py-5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xl shadow-pink-300/50 inline-flex items-center gap-3 font-semibold text-lg"
              >
                <Heart fill="currentColor" size={24} />
                Buka ceritanya
              </motion.button>
            </motion.div>
          </motion.section>
        )}

        {/* CHAPTER 1 : HERO STORY */}
        {chapter === 1 && (
          <motion.section
            key="chapter-1"
            variants={pageVariant} initial="initial" animate="animate" exit="exit"
            className="min-h-screen flex flex-col items-center justify-center px-6 relative bg-gradient-to-b from-slate-50 via-pink-50/40 to-white"
          >
            <FloatingHeart className="top-[20%] left-[10%]" size={30} delay={0.2} />
            <FloatingHeart className="bottom-[30%] right-[12%]" size={40} delay={1.5} />

            <div className="text-center max-w-3xl relative z-10">
              <motion.div animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }} transition={{ duration: 5, repeat: Infinity }}>
                <Sparkles className="mx-auto text-pink-500 mb-8 drop-shadow-lg" size={50} />
              </motion.div>
              <p className="uppercase tracking-[0.5em] text-sm text-pink-500 font-bold">Cerita kita</p>
              <h2 className="font-serif text-5xl md:text-7xl mt-6 leading-tight text-gray-900">
                Ada cerita yang <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 italic py-2">ingin aku simpan selamanya.</span>
              </h2>
              <p className="mt-8 text-gray-500 text-lg md:text-xl max-w-lg mx-auto">Dan ini adalah sedikit cerita tentang kita, dari sudut pandang aku.</p>
              
              <NextButton text="Lanjut baca" onClick={nextChapter} onBack={previousChapter} />
            </div>
          </motion.section>
        )}

        {/* CHAPTER 2 : THE BEGINNING */}
        {chapter === 2 && (
          <motion.section
            key="chapter-2"
            variants={pageVariant} initial="initial" animate="animate" exit="exit"
            className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-white"
          >
            <div className="max-w-5xl mx-auto w-full">
              <SectionTitle eyebrow="11 Juni 2025" title="Semuanya mulai dari sini." />
              <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
                <div className="aspect-[4/5] rounded-[3rem] bg-gradient-to-tr from-pink-100 via-white to-rose-100 flex items-center justify-center shadow-2xl border-2 border-white">
                  <div className="text-center p-8">
                    <Heart className="mx-auto text-pink-500 drop-shadow-xl animate-pulse" fill="currentColor" size={90} />
                    <p className="mt-8 font-serif text-5xl text-pink-600 font-bold">11 June</p>
                    <p className="mt-4 text-pink-400 uppercase tracking-widest text-sm font-bold">Awal cerita kita</p>
                  </div>
                </div>
                <div className="space-y-8">
                  <p className="text-gray-600 text-xl leading-relaxed">11 Juni mungkin cuma tanggal biasa buat orang lain.</p>
                  <p className="text-gray-600 text-xl leading-relaxed">Tapi buat aku, hari itu jadi awal dari sesuatu yang sampai sekarang masih ingin aku pertahankan.</p>
                  <div className="p-6 bg-pink-50 rounded-2xl border-l-4 border-pink-400">
                    <p className="text-pink-900 text-xl leading-relaxed font-medium italic">"Aku nggak pernah menyangka kita bisa sampai sejauh ini. Tapi aku bersyukur, semuanya berawal dari hari itu."</p>
                  </div>
                </div>
              </div>
              <div className="mt-16 text-center">
                <NextButton onClick={nextChapter} onBack={previousChapter} />
              </div>
            </div>
          </motion.section>
        )}

        {/* CHAPTER 3 : LDR */}
        {chapter === 3 && (
          <motion.section
            key="chapter-3"
            variants={pageVariant} initial="initial" animate="animate" exit="exit"
            className="min-h-screen flex flex-col items-center justify-center px-6 relative bg-gradient-to-br from-pink-600 via-rose-500 to-pink-600 text-white overflow-hidden"
          >
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_2px,_transparent_2px)] bg-[size:30px_30px]" />
            <div className="relative max-w-4xl mx-auto text-center z-10 w-full">
              <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                <MapPin className="mx-auto mb-10 drop-shadow-2xl text-pink-100" size={60} />
              </motion.div>
              <p className="uppercase tracking-[0.5em] text-sm text-pink-200 font-bold">Tentang jarak</p>
              <h2 className="font-serif text-5xl md:text-7xl mt-6 drop-shadow-md">
                Jauh di mata, <span className="block italic text-pink-100 mt-3">tetap dekat di hati.</span>
              </h2>
              <div className="w-32 h-1 bg-white/30 mx-auto mt-12 rounded-full" />
              <p className="mt-12 text-pink-50 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto font-light">
                Kita memang nggak bisa bertemu setiap hari. Nggak bisa selalu ada di samping satu sama lain. Tapi setiap kali akhirnya kita bertemu...
              </p>
              <p className="mt-12 text-3xl md:text-4xl font-serif text-white drop-shadow-lg font-bold mb-16">
                rasanya semua penantian itu terbayar. ❤️
              </p>
              <NextButton onClick={nextChapter} onBack={previousChapter} theme="dark" />
            </div>
          </motion.section>
        )}

        {/* CHAPTER 4 : MEMORIES */}
        {chapter === 4 && (
          <motion.section
            key="chapter-4"
            variants={pageVariant} initial="initial" animate="animate" exit="exit"
            className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-slate-50"
          >
            <div className="max-w-6xl mx-auto w-full">
              <SectionTitle eyebrow="Kenangan kita" title="Aku masih ingat semuanya." />
              <div className="grid md:grid-cols-2 gap-8 mt-16 mb-16">
                {memories.map((memory, index) => (
                  <div key={index} className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-pink-100/50 border border-pink-50 hover:-translate-y-2 transition-transform duration-300">
                    <div className="text-6xl mb-6">{memory.icon}</div>
                    <h3 className="font-serif text-3xl text-gray-800 mb-4 font-bold">{memory.title}</h3>
                    <p className="text-gray-500 text-lg leading-relaxed">{memory.text}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-16">
                {photos.map((photo, index) => (
                  <div key={photo} className="relative aspect-square overflow-hidden rounded-[2rem] border-4 border-white shadow-xl shadow-pink-100/60">
                    <Image
                      src={`/photos/${photo}`}
                      alt={`Kenangan kita ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
              <div className="text-center">
                <NextButton onClick={nextChapter} onBack={previousChapter} />
              </div>
            </div>
          </motion.section>
        )}

        {/* CHAPTER 5 : DIFFICULT TIMES */}
        {chapter === 5 && (
          <motion.section
            key="chapter-5"
            variants={pageVariant} initial="initial" animate="animate" exit="exit"
            className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-white to-pink-50"
          >
            <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl shadow-pink-100 border border-pink-50 text-center w-full">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                <Clock className="mx-auto text-pink-300 mb-8" size={50} />
              </motion.div>
              <p className="uppercase tracking-[0.5em] text-sm text-pink-400 font-bold">Lewat semua hal</p>
              <h2 className="font-serif text-5xl mt-6 text-gray-800">Kita memang nggak selalu mudah.</h2>
              <div className="mt-12 space-y-6 text-gray-600 text-xl leading-relaxed max-w-2xl mx-auto">
                <p>Kita pernah ada di masa ketika memahami satu sama lain terasa sulit. Ada hal-hal yang nggak mudah dibicarakan, dan ada perasaan yang nggak selalu bisa aku jelaskan.</p>
                <p>Tapi dari situ aku belajar, hubungan kita nggak harus selalu sempurna. Yang penting, kita masih mau saling memilih dan memperbaiki semuanya.</p>
              </div>
              <div className="mt-14 mb-16 inline-block px-10 py-5 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl border border-pink-100">
                <p className="font-serif text-3xl text-pink-600 italic font-medium">Yang penting, kita tetap memilih satu sama lain.</p>
              </div>
              <NextButton onClick={nextChapter} onBack={previousChapter} />
            </div>
          </motion.section>
        )}

        {/* CHAPTER 6 : THE LETTER */}
        {chapter === 6 && (
          <motion.section
            key="chapter-6"
            variants={pageVariant} initial="initial" animate="animate" exit="exit"
            className="min-h-screen flex flex-col items-center justify-center py-20 px-6 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] bg-pink-50/40 relative"
          >
            <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-md rounded-[2.5rem] p-12 md:p-20 shadow-2xl shadow-pink-200/50 border-2 border-white w-full">
              <div className="text-center mb-16">
                <Stars className="mx-auto text-pink-400 mb-6" size={40} />
                <p className="uppercase tracking-[0.5em] text-sm text-pink-400 font-bold">Surat kecil buat kamu</p>
                <div className="w-16 h-1 bg-gradient-to-r from-pink-300 to-rose-300 mx-auto mt-6 rounded-full" />
              </div>
              <div className="font-serif text-xl leading-relaxed text-gray-700 space-y-6">
                <p>Sayang,</p>
                <p>11 Juni mungkin terlihat seperti tanggal biasa bagi orang lain. Tapi buat aku, hari itu adalah awal dari cerita yang sampai sekarang masih ingin aku jaga.</p>
                <p>Aku tahu aku belum selalu jadi pasangan yang sempurna. Kita juga pernah melewati masa-masa ketika saling memahami terasa nggak mudah.</p>
                <p>Tapi dari semua yang sudah kita lewati, ada satu hal yang tetap sama.</p>
                <div className="py-6 text-center">
                  <p className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 font-bold italic">Aku sayang kamu.</p>
                </div>
                <p>Kamu memang cantik, tapi itu bukan satu-satunya alasan aku memilih kamu. Aku suka caramu menjadi dirimu sendiri, dan aku suka semua momen sederhana yang kita punya.</p>
                <p>Mungkin karena kita LDR, setiap kali bisa bertemu rasanya jadi jauh lebih berarti.</p>
                <p>Aku nggak tahu nanti perjalanan kita akan seperti apa. Tapi kalau boleh memilih, aku ingin terus menjalaninya bareng kamu.</p>
                <p>Aku ingin nanti kita bukan cuma punya cerita tentang awal pertemuan, tapi juga cerita tentang bagaimana kita tetap bertahan setelah melewati banyak hal.</p>
                <p className="pt-6">Terima kasih karena sudah hadir dan tetap menjadi bagian dari hidup aku.</p>
                <p className="text-2xl text-pink-500 font-bold flex items-center gap-2">
                  Aku sayang kamu. <Heart className="text-red-500 animate-pulse" fill="currentColor" size={24} />
                </p>
              </div>
              <div className="mt-16 text-center">
                <NextButton text="Satu hal terakhir" onClick={nextChapter} onBack={previousChapter} />
              </div>
            </div>
          </motion.section>
        )}

        {/* CHAPTER 7 : THE QUESTION */}
        {chapter === 7 && (
          <motion.section
            key="chapter-7"
            variants={pageVariant} initial="initial" animate="animate" exit="exit"
            className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-pink-50 to-pink-200/50"
          >
            <div className="text-center max-w-2xl bg-white/80 backdrop-blur-xl p-12 md:p-24 rounded-[4rem] shadow-2xl shadow-pink-200/50 border border-white">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block">
                <Heart className="text-pink-500 drop-shadow-xl" fill="currentColor" size={80} />
              </motion.div>
              <p className="mt-12 uppercase tracking-[0.5em] text-sm text-pink-400 font-bold">Satu pertanyaan terakhir</p>
              <h2 className="font-serif text-5xl md:text-6xl mt-6 text-gray-900 font-bold">Mau tetap sama aku?</h2>
              <p className="mt-8 text-gray-500 text-xl">
                Untuk semua yang sudah kita lewati,<br />dan semua hal indah yang masih menunggu kita.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center mt-14">
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}
                  onClick={nextChapter} // Lanjut ke Chapter 8
                  className="px-12 py-5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-lg shadow-xl shadow-pink-200"
                >
                  Iya ❤️
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -5, backgroundColor: "#fdf2f8" }} whileTap={{ scale: 0.95 }}
                  onClick={nextChapter}
                  className="px-12 py-5 rounded-full bg-white text-pink-500 border-2 border-pink-200 font-bold text-lg shadow-lg"
                >
                  Tentu ❤️
                </motion.button>
              </div>
              <PreviousButton onClick={previousChapter} />
            </div>
          </motion.section>
        )}

        {/* CHAPTER 8 : THE OUTRO (ANSWERED) */}
        {chapter === 8 && (
          <motion.section
            key="chapter-8"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, type: "spring" }}
            className="min-h-screen flex items-center justify-center px-6 bg-[#fffafc]"
          >
            <div className="text-center bg-white/60 p-20 rounded-[4rem] backdrop-blur-md shadow-2xl shadow-pink-200/50">
              <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="inline-block">
                <Heart className="text-red-500 drop-shadow-2xl" fill="currentColor" size={120} />
              </motion.div>
              <h2 className="font-serif text-5xl md:text-7xl mt-12 text-gray-900 leading-tight font-bold">
                Kalau begitu, mari kita buat <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 italic mt-3">lebih banyak kenangan.</span>
              </h2>
              <div className="mt-12 inline-block px-10 py-4 bg-white rounded-full border-2 border-pink-100 shadow-md text-pink-500 font-bold tracking-widest text-xl">
                11 June → ∞
              </div>
              <p className="mt-10 text-gray-500 font-medium text-lg">Cerita kita belum selesai.</p>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                <PreviousButton onClick={previousChapter} className="mt-0" />
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setChapter(0)}
                  className="inline-flex items-center gap-3 rounded-full border-2 border-pink-200 bg-white px-8 py-4 text-lg font-bold text-pink-600 shadow-xl transition-all hover:bg-pink-50"
                >
                  <RotateCcw size={20} />
                  Baca ulang cerita
                </motion.button>
              </div>
            </div>
          </motion.section>
        )}

      </AnimatePresence>
    </main>
  );
}

// ---- HELPER COMPONENTS ---- //

function NextButton({ onClick, onBack, text = "Lanjut chapter", theme = "light" }: any) {
  const isDark = theme === "dark";
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {onBack && <PreviousButton onClick={onBack} theme={theme} />}
      <motion.button
        whileHover={{ scale: 1.05, x: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`mt-10 px-8 py-4 rounded-full font-bold text-lg shadow-xl inline-flex items-center gap-3 transition-all ${
          isDark
            ? "bg-white text-pink-600 hover:shadow-white/20"
            : "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-pink-300/50"
        }`}
      >
        {text}
        <ChevronRight size={22} className="relative top-[1px]" />
      </motion.button>
    </div>
  );
}

function PreviousButton({ onClick, theme = "light", className = "mt-10" }: { onClick: () => void; theme?: string; className?: string }) {
  const isDark = theme === "dark";
  return (
    <motion.button
      whileHover={{ scale: 1.05, x: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${className} px-8 py-4 rounded-full font-bold text-lg shadow-xl inline-flex items-center gap-3 transition-all ${
        isDark
          ? "bg-white/20 text-white border border-white/50 hover:bg-white/30"
          : "bg-white text-pink-600 border-2 border-pink-200 hover:bg-pink-50"
      }`}
    >
      <ChevronRight size={22} className="relative top-[1px] rotate-180" />
      Kembali
    </motion.button>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center relative">
      <p className="uppercase tracking-[0.5em] text-sm text-pink-400 font-bold relative z-10">{eyebrow}</p>
      <h2 className="font-serif text-4xl md:text-6xl mt-4 text-gray-900 font-bold relative z-10 drop-shadow-sm">{title}</h2>
      <div className="w-20 h-1.5 bg-gradient-to-r from-pink-300 to-rose-300 mx-auto mt-8 rounded-full" />
    </div>
  );
}

function FloatingHeart({ className, size, delay = 0 }: { className: string; size: number; delay?: number }) {
  return (
    <motion.div
      animate={{ y: [0, -40, 0], rotate: [0, 20, -20, 0], opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 7, repeat: Infinity, delay: delay, ease: "easeInOut" }}
      className={`absolute ${className} text-pink-300 pointer-events-none drop-shadow-lg`}
    >
      <Heart fill="currentColor" size={size} />
    </motion.div>
  );
}