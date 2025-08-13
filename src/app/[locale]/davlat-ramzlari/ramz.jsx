"use client";

import flag from "../../../../public/ramzlar/Ozbekiston-bayrogi.jpg";
import gerb from "../../../../public/ramzlar/gerb_big.jpg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Calendar,
  Flag,
  Music,
  Pause,
  Play,
  Shield,
  Volume2,
  SkipBack,
  SkipForward,
  VolumeX,
} from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function UzbekistanSymbols() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("flag");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingQuality, setRecordingQuality] = useState(128); // kbps
  const [micVolume, setMicVolume] = useState(0);
  const recordingTimerRef = useRef(null);
  const recordingAudioRef = useRef(null);

  const tabs = [
    { id: "flag", label: "Bayroq", icon: Flag },
    { id: "coat", label: "Gerb", icon: Shield },
    { id: "anthem", label: "Madhiya", icon: Music },
  ];

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = value[0];
    setVolume(newVolume);
    audio.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const restartAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    setCurrentTime(0);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: recordingQuality * 1000,
        },
      });

      const recorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      const chunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm;codecs=opus" });
        const audioUrl = URL.createObjectURL(blob);
        setRecordedAudio(audioUrl);
        stream.getTracks().forEach((track) => track.stop());
      };

      // Monitor microphone volume
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      microphone.connect(analyser);
      analyser.fftSize = 256;

      const updateVolume = () => {
        if (isRecording) {
          analyser.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          setMicVolume(average / 255);
          requestAnimationFrame(updateVolume);
        }
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingTime(0);

      // Start recording timer
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      updateVolume();
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Mikrofon ruxsati berilmadi yoki xatolik yuz berdi");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setMicVolume(0);

      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    }
  };

  const deleteRecording = () => {
    if (recordedAudio) {
      URL.revokeObjectURL(recordedAudio);
      setRecordedAudio(null);
      setRecordingTime(0);
    }
  };

  const downloadRecording = () => {
    if (recordedAudio) {
      const a = document.createElement("a");
      a.href = recordedAudio;
      a.download = `recording-${new Date().toISOString().slice(0, 19)}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleRecordingQualityChange = (value) => {
    setRecordingQuality(value[0]);
  };

  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
      if (recordedAudio) {
        URL.revokeObjectURL(recordedAudio);
      }
    };
  }, [recordedAudio]);

  return (
    <div className="min-h-screen">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="/mathiya-auido/mathiya.mp3"
        preload="metadata"
      />

      {/* Header */}
      <header>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#0E327F] mb-2">
              O'ZBEKISTON RESPUBLIKASI
            </h1>
            <p className="text-lg text-gray-600">Davlat ramzlari</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-[#0E327F] p-1 rounded-lg w-full max-w-2xl mx-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-1 sm:space-x-2 py-2 sm:py-3 px-1 sm:px-3 md:px-4 rounded-md transition-all duration-200 text-xs sm:text-sm md:text-base font-medium min-w-0 ${
                    isActive
                      ? "bg-white text-[#0E327F] shadow-md"
                      : "text-blue-100 hover:text-white hover:bg-blue-800/50"
                  }`}
                >
                  {/* <Icon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" /> */}
                  <span className="break-words text-center leading-tight">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Flag Section */}
        {activeTab === "flag" && (
          <div>
            <div className="flex justify-center mb-8">
              <div className="w-[400px]">
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <Image
                        src={flag || "/placeholder.svg"}
                        alt="O'zbekiston bayrog'i"
                        width={400}
                        height={267}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                    <div className="text-center">
                      <Badge className="bg-[#0E327F] text-white">
                        <Calendar className="w-3 h-3 mr-1" />
                        1991-yil 18-noyabr
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="w-full transition-all duration-300 shadow-lg hover:shadow-xl border-l-4 border-l-[#0E327F]">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-[#0E327F] mb-4">
                      O'zbekiston Respublikasi Davlat Bayrog'i
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#0E327F] to-blue-400 mx-auto rounded-full"></div>
                  </div>

                  <div className="prose prose-lg max-w-none">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl mb-8 border-l-4 border-[#0E327F]">
                      <p className="text-gray-700 leading-relaxed text-justify animate-fade-in-up">
                        <strong className="text-[#0E327F] text-lg">
                          "O'zbekiston Respublikasi Davlat bayrog'i
                          to'g'risida"gi Qonun
                        </strong>
                        <br />
                        <span className="text-gray-600 italic">
                          1991-yil 18-noyabrda O'zbekiston Respublikasi Oliy
                          Kengashining navbatdan tashqari sessiyasida qabul
                          qilingan.
                        </span>
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-6 rounded-xl animate-fade-in-up delay-200 hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-[#0E327F] mb-3 flex items-center text-lg">
                          <div className="w-3 h-3 bg-sky-400 rounded-full mr-3"></div>
                          Moviy rang
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          Osmon va suv ramzi, tabiat go'zalligi, hayot manbai va
                          tinchlik timsoli.
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl animate-fade-in-up delay-300 hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-[#0E327F] mb-3 flex items-center text-lg">
                          <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                          Yashil rang
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          Tabiat yangilanishi, bahor va umid ramzi, xalqimizning
                          farovonlik yo'lidagi intilishi.
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-xl animate-fade-in-up delay-400 hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-[#0E327F] mb-3 flex items-center text-lg">
                          <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                          Oq rang
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          Poklik va halollik ramzi, tinchlik va xotirjamlik
                          timsoli.
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-xl animate-fade-in-up delay-500 hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-[#0E327F] mb-3 flex items-center text-lg">
                          <div className="w-3 h-3 bg-red-400 rounded-full mr-3"></div>
                          Qizil chiziqlar
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          Har bir tirik jonning qon tomirida urib turgan hayotiy kuch, hayot ramzidir.
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl animate-fade-in-up delay-600 border-l-4 border-yellow-400">
                      <h3 className="font-bold text-[#0E327F] mb-3 flex items-center text-lg">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                        Yarim oy va yulduzlar
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        O'zbekiston xalqining an'anaviy ramzi. Yarim oy -
                        yangilanish ramzi, 12 yulduz - yil oylarini va qadimiy
                        burjlar tizimini ifodalaydi.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Coat of Arms Section */}
        {activeTab === "coat" && (
          <div>
            <div className="flex justify-center mb-8">
              <div className="w-[300px]">
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <Image
                        src={gerb || "/placeholder.svg"}
                        alt="O'zbekiston gerbi"
                        width={300}
                        height={400}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                    <div className="text-center">
                      <Badge className="bg-[#0E327F] text-white">
                        <Calendar className="w-3 h-3 mr-1" />
                        1992-yil 2-iyul
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="w-full transition-all duration-300 shadow-lg hover:shadow-xl border-l-4 border-l-[#0E327F]">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-[#0E327F] mb-4">
                      O'zbekiston Respublikasi Davlat Gerbi
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#0E327F] to-blue-400 mx-auto rounded-full"></div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl mb-8 border-l-4 border-[#0E327F]">
                    <p className="text-gray-700 leading-relaxed text-justify">
                      <strong className="text-[#0E327F] text-lg">
                        "O'zbekiston Respublikasi Davlat gerbi to'g'risida"gi
                        Qonun
                      </strong>
                      <br />
                      <span className="text-gray-600 italic">
                        1992-yil 2-iyulda O'zbekiston Respublikasi Oliy
                        Kengashining X sessiyasida qabul qilingan.
                      </span>
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl animate-fade-in-up delay-200 hover:shadow-md transition-shadow border-l-4 border-yellow-400">
                      <h3 className="font-bold text-[#0E327F] mb-3 flex items-center text-lg">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                        Quyosh va vodiy
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        O'zbekiston Respublikasining Davlat gerbi gullagan vodiy
                        uzra charaqlab turgan quyosh tasviridan iborat.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl animate-fade-in-up delay-300 hover:shadow-md transition-shadow border-l-4 border-green-400">
                      <h3 className="font-bold text-[#0E327F] mb-3 flex items-center text-lg">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                        Bug'doy va paxta
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Chap tomonida bug'doy boshoqlari, o'ng tomonida ochilgan
                        paxta chanoqlari tasvirlangan.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-6 rounded-xl animate-fade-in-up delay-400 hover:shadow-md transition-shadow border-l-4 border-blue-400">
                      <h3 className="font-bold text-[#0E327F] mb-3 flex items-center text-lg">
                        <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                        Sakkiz qirrali yulduz
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Gerbning yuqori qismida Respublika jipsligining ramzi
                        sifatida sakkiz qirrali yulduz tasvirlangan: sakkiz
                        qirra ichida joylashgan yarim oy va yulduz
                        musulmonlarning qutlug' ramzidir.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl animate-fade-in-up delay-500 hover:shadow-md transition-shadow border-l-4 border-purple-400">
                      <h3 className="font-bold text-[#0E327F] mb-3 flex items-center text-lg">
                        <div className="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
                        Humo qushi
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Gerbning markazida himmat, oliyjanoblik va fidoyilik
                        timsoli bo'lgan afsonaviy Humo qushi qanotlarini yozib
                        turibdi. Ushbu ramz va timsollar xalqimizning tinchlik,
                        yaxshilik, baxt-saodat, farovonlik yo'lidagi
                        orzu-umidlarini ifodalaydi.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-xl animate-fade-in-up delay-600 hover:shadow-md transition-shadow border-l-4 border-red-400">
                      <h3 className="font-bold text-[#0E327F] mb-3 flex items-center text-lg">
                        <div className="w-3 h-3 bg-red-400 rounded-full mr-3"></div>
                        "O'zbekiston" yozuvi
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Gerbning pastki qismida Respublika Davlat bayrog'ini
                        ifoda etuvchi chambar lentasining bantida «O'zbekiston»
                        deb yozib qo'yilgan.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* National Anthem Section */}
        {activeTab === "anthem" && (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Audio Player */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Volume2 className="w-5 h-5 text-[#0E327F]" />
                    <h2 className="text-xl font-bold text-[#0E327F]">
                      Audio player
                    </h2>
                  </div>

                  {/* Main Audio Controls */}
                  <div className="bg-gradient-to-r from-[#0E327F] to-blue-600 text-white p-6 rounded-lg mb-6">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-bold">
                        O'zbekiston Respublikasi Madhiyasi
                      </h3>
                      <p className="text-blue-100 text-sm">Davlat Madhiyasi</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <Slider
                        value={[currentTime]}
                        max={duration || 100}
                        step={1}
                        onValueChange={handleSeek}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-blue-100 mt-1">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <Button
                        onClick={restartAudio}
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                      >
                        <SkipBack className="w-4 h-4" />
                      </Button>

                      <Button
                        onClick={togglePlayPause}
                        className="bg-white text-[#0E327F] hover:bg-gray-100 w-12 h-12 rounded-full"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6" />
                        ) : (
                          <Play className="w-6 h-6 ml-1" />
                        )}
                      </Button>

                      <Button
                        onClick={() => {
                          /* Skip forward 10 seconds */
                          const audio = audioRef.current;
                          if (audio) {
                            audio.currentTime = Math.min(
                              audio.currentTime + 10,
                              duration
                            );
                          }
                        }}
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                      >
                        <SkipForward className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Volume Control */}
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={toggleMute}
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </Button>
                      <Slider
                        value={[isMuted ? 0 : volume]}
                        max={1}
                        step={0.1}
                        onValueChange={handleVolumeChange}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-[#0E327F]">
                    <h3 className="font-bold text-[#0E327F] mb-3 text-lg">
                      Qonuniy ma'lumot
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      O'zbekiston Respublikasi Davlat madhiyasining matni va
                      musiqasi O'zbekiston Respublikasining 1992 yil 10
                      dekabrdagi 768-XII-sonli «O'zbekiston Respublikasining
                      Davlat madhiyasi to'g'risida»gi Qonuni bilan tasdiqlangan.
                    </p>
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <p className="text-gray-600 text-sm">
                        <strong>Musiqa:</strong> Mutal Burhonov
                        <br />
                        <strong>So'z:</strong> Abdulla Oripov
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lyrics */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-[#0E327F] mb-4 text-center flex items-center justify-center">
                    <Music className="w-5 h-5 mr-2" />
                    Madhiya matni
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-[#0E327F]">
                      <div className="space-y-4 text-gray-700 leading-relaxed">
                        <p className="font-medium">
                          Serquyosh hur o'lkam, elga baxt, najot,
                          <br />
                          Sen o'zing do'stlarga yo'ldosh, mehribon!
                          <br />
                          Yashnagay to abad ilmu fan, ijod,
                          <br />
                          Shuhrating porlasin toki bor jahon!
                        </p>

                        <div className="bg-white/70 p-4 rounded-lg border-l-4 border-yellow-400">
                          <p className="font-bold text-[#0E327F] mb-2">
                            Naqarot:
                          </p>
                          <p>
                            Oltin bu vodiylar - jon O'zbekiston,
                            <br />
                            Ajdodlar mardona ruhi senga yor!
                            <br />
                            Ulug' xalq qudrati jo'sh urgan zamon,
                            <br />
                            Olamni mahliyo aylagan diyor!
                          </p>
                        </div>

                        <p className="font-medium">
                          Bag'ri keng o'zbekning o'chmas iymoni,
                          <br />
                          Erkin, yosh avlodlar senga zo'r qanot!
                          <br />
                          Istiqlol mash'ali tinchlik posboni,
                          <br />
                          Xaqsevar, ona yurt, mangu bo'l obod!
                        </p>

                        <div className="bg-white/70 p-4 rounded-lg border-l-4 border-yellow-400">
                          <p className="font-bold text-[#0E327F] mb-2">
                            Naqarot:
                          </p>
                          <p>
                            Oltin bu vodiylar - jon O'zbekiston,
                            <br />
                            Ajdodlar mardona ruhi senga yor!
                            <br />
                            Ulug' xalq qudrati jo'sh urgan zamon,
                            <br />
                            Olamni mahliyo aylagan diyor!
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Audio Status Indicator */}
                    {isPlaying && (
                      <div className="bg-[#0E327F] text-white p-4 rounded-lg text-center">
                        <div className="flex justify-center space-x-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className="w-2 bg-white rounded h-6 animate-pulse"
                              style={{ animationDelay: `${i * 0.1}s` }}
                            ></div>
                          ))}
                        </div>
                        <p className="text-sm flex items-center justify-center">
                          <Volume2 className="w-4 h-4 mr-2" />
                          Madhiya ijro etilmoqda...
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
