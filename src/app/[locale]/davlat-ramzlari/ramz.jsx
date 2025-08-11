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
  MapPin,
  Music,
  Palette,
  Pause,
  Play,
  Shield,
  Users,
  Volume2,
  Star,
  Moon,
  FileText,
  Info,
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
          <div className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Flag Image */}
              <div className="lg:col-span-1">
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

              {/* Flag Details */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Info className="w-5 h-5 text-[#0E327F]" />
                      <h2 className="text-xl font-bold text-[#0E327F]">
                        Asosiy ma'lumotlar
                      </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-600">
                            Qabul sanasi:
                          </span>
                          <span className="font-semibold">18.11.1991</span>
                        </div>
                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-600">
                            Muallif:
                          </span>
                          <span className="font-semibold">
                            Bekzod Xidoyatov
                          </span>
                        </div>
                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-600">
                            Nisbat:
                          </span>
                          <span className="font-semibold">1:2</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-600 flex items-center">
                            <Star className="w-4 h-4 mr-1" />
                            Yulduzlar:
                          </span>
                          <span className="font-semibold">12 ta</span>
                        </div>
                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-600 flex items-center">
                            <Moon className="w-4 h-4 mr-1" />
                            Hilol:
                          </span>
                          <span className="font-semibold">1 ta</span>
                        </div>
                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-600">
                            Chiziqlar:
                          </span>
                          <span className="font-semibold">2 ta qizil</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Palette className="w-5 h-5 text-[#0E327F]" />
                      <h3 className="text-xl font-bold text-[#0E327F]">
                        Ranglar ramziyati
                      </h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* Ko‘k rang */}
                      <div className="bg-blue-500 text-white p-4 rounded-lg">
                        <div className="font-bold text-lg mb-2">KO'K</div>
                        <ul className="text-sm space-y-1">
                          <li>• Moviy osmon va toza suv</li>
                          <li>• Tinchlik va orzu-umidlar</li>
                          <li>• Turk xalqlarining tarixiy ramzi</li>
                        </ul>
                      </div>

                      {/* Oq rang */}
                      <div className="bg-white border-2 border-gray-200 text-gray-800 p-4 rounded-lg">
                        <div className="font-bold text-lg mb-2">OQ</div>
                        <ul className="text-sm space-y-1">
                          <li>• Poklik va ma’naviy tozalik</li>
                          <li>• Tinchlik va ezgulik</li>
                          <li>• Yorug‘ kelajak ramzi</li>
                        </ul>
                      </div>

                      {/* Yashil rang */}
                      <div className="bg-green-500 text-white p-4 rounded-lg">
                        <div className="font-bold text-lg mb-2">YASHIL</div>
                        <ul className="text-sm space-y-1">
                          <li>• Tabiat va hayot</li>
                          <li>• Yangi hayot va yangilanish</li>
                          <li>• Yurtimizdagi hosildorlik</li>
                        </ul>
                      </div>

                      {/* Qizil chiziqlar */}
                      <div className="bg-red-500 text-white p-4 rounded-lg">
                        <div className="font-bold text-lg mb-2">
                          QIZIL CHIZIQLAR
                        </div>
                        <ul className="text-sm space-y-1">
                          <li>• Hayotiy kuch va energiya</li>
                          <li>• O‘zbekiston xalqlari o‘rtasidagi do‘stlik</li>
                          <li>• Ranglar orasidagi birlashuv ramzi</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Coat of Arms Section */}
        {activeTab === "coat" && (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Coat of Arms Image */}
              <div className="lg:col-span-1">
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

              {/* Coat of Arms Details */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                      <Users className="w-5 h-5 text-[#0E327F]" />
                      <h2 className="text-lg sm:text-xl font-bold text-[#0E327F]">
                        Asosiy ma'lumotlar
                      </h2>
                    </div>
                    <div className="flex flex-col gap-2">
                      {/* Qabul sanasi va Ma'lumot yonma-yon */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-600">
                            Qabul sanasi:
                          </span>
                          <span className="font-semibold">02.07.1992</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-600">
                            Ma'lumot:
                          </span>
                          <span className="font-semibold text-green-600">
                            Rasmiy
                          </span>
                        </div>
                      </div>
                      {/* Qonun */}
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-gray-600">
                          Qonun:
                        </span>
                        <span className="font-semibold break-words">
                          “O‘zbekiston Respublikasi Davlat gerbi to‘g‘risida”gi
                          Qonun, Oliy Kengash X sessiyasi
                        </span>
                      </div>
                      {/* Qisqacha tavsif */}
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-gray-600">
                          Qisqacha tavsif:
                        </span>
                        <span className="font-semibold break-words leading-relaxed">
                          Gerb – gullagan vodiy uzra charaqlab turgan quyosh,
                          so‘l tomonida bug‘doy boshoqlari, o‘ng tomonida
                          ochilgan paxta chanoqlari surati tushirilgan
                          chambarak, markazida Humo qushi, yuqorisida sakkiz
                          qirrali yulduz va yarim oy tasviridan iborat.
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                      <MapPin className="w-5 h-5 text-[#0E327F]" />
                      <h3 className="text-lg sm:text-xl font-bold text-[#0E327F]">
                        Gerb ramzlari va ularning ma'nosi
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-2 sm:space-y-3">
                        <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg border-l-4 border-yellow-500">
                          <h4 className="font-bold mb-1 sm:mb-2">Humo qushi</h4>
                          <p className="text-sm text-gray-700">
                            Himmat, oliyjanoblik va fidoyilik timsoli. Tinchlik,
                            yaxshilik, baxt-saodat, farovonlik orzularini
                            ifodalaydi.
                          </p>
                        </div>
                        <div className="bg-orange-50 p-3 sm:p-4 rounded-lg border-l-4 border-orange-500">
                          <h4 className="font-bold mb-1 sm:mb-2 flex items-center">
                            Quyosh
                          </h4>
                          <p className="text-sm text-gray-700">
                            Gullagan vodiy uzra charaqlab turgan quyosh – yorqin
                            kelajak va farovonlik ramzi.
                          </p>
                        </div>
                        <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border-l-4 border-blue-500">
                          <h4 className="font-bold mb-1 sm:mb-2 flex items-center">
                            O'rtadagi tog'lar
                          </h4>
                          <p className="text-sm text-gray-700">
                            O‘zbekistonning geografiyasi.
                          </p>
                        </div>
                        <div className="bg-cyan-50 p-3 sm:p-4 rounded-lg border-l-4 border-cyan-500">
                          <h4 className="font-bold mb-1 sm:mb-2 flex items-center">
                            Daryolar
                          </h4>
                          <p className="text-sm text-gray-700">
                            Amudaryo va Sirdaryo – suv resurslari va hayot
                            manbai.
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="bg-amber-50 p-3 sm:p-4 rounded-lg border-l-4 border-amber-500">
                          <h4 className="font-bold mb-1 sm:mb-2 flex items-center">
                            Bug'doy boshoqlari
                          </h4>
                          <p className="text-sm text-gray-700">
                            To‘kin-sochinlik va mo‘l-ko‘llik belgisi,
                            chambarning so‘l tomonida.
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border-l-4 border-gray-500">
                          <h4 className="font-bold mb-1 sm:mb-2">
                            Paxta chanoqlari
                          </h4>
                          <p className="text-sm text-gray-700">
                            Tinchlik, mehnatsevarlik va boylik ramzi,
                            chambarning o‘ng tomonida.
                          </p>
                        </div>
                        <div className="bg-green-50 p-3 sm:p-4 rounded-lg border-l-4 border-green-500">
                          <h4 className="font-bold mb-1 sm:mb-2 flex items-center">
                            Davlat bayrog‘i ranglari
                          </h4>
                          <p className="text-sm text-gray-700">
                            Pastki qismida chambarak tasmasi – birlik va davlat
                            ramzi sifatida.
                          </p>
                        </div>
                        <div className="bg-indigo-50 p-3 sm:p-4 rounded-lg border-l-4 border-indigo-500">
                          <h4 className="font-bold mb-1 sm:mb-2 flex items-center">
                            Sakkiz qirrali yulduz va yarim oy
                          </h4>
                          <p className="text-sm text-gray-700">
                            Respublika jipsligi, musulmonlarning qadriyatlari va
                            tarixiy meros ramzi.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
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

                  {/* Technical Info */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="text-sm text-gray-600 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          Qabul sanasi
                        </div>
                        <div className="font-semibold">10.12.1992</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="text-sm text-gray-600">Davomiyligi</div>
                        <div className="font-semibold">
                          {formatTime(duration)}
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="font-bold text-lg mb-3 flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        Mualliflar
                      </h3>
                      <div className="space-y-3">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-bold flex items-center">
                            <Music className="w-4 h-4 mr-2" />
                            Mutal Burhonov (1916-2002)
                          </h4>
                          <p className="text-sm text-gray-700">
                            Mashhur kompozitor, O'zbekiston xalq artisti.
                          </p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-bold flex items-center">
                            <FileText className="w-4 h-4 mr-2" />
                            Abdulla Oripov (1941-2016)
                          </h4>
                          <p className="text-sm text-gray-700">
                            Taniqli shoir, O'zbekiston xalq shoiri.
                          </p>
                        </div>
                      </div>
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
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-bold text-center mb-2">1-misra</h3>
                      <div className="text-center space-y-1 text-sm">
                        <p>Serquyosh hur o'lkam, elga baxt, najot,</p>
                        <p>Sen o'zing do'stlarga yo'ldosh, mehribon!</p>
                        <p>Yashnagay to abad ilmu fan, ijod,</p>
                        <p>Shuhrating porlasin toki bor jahon!</p>
                      </div>
                    </div>

                    <div className="bg-[#0E327F] text-white p-4 rounded-lg">
                      <h3 className="font-bold text-center mb-2">NAQORAT</h3>
                      <div className="text-center space-y-1 text-sm">
                        <p>Oltin bu vodiylar — jon O'zbekiston,</p>
                        <p>Ajdodlar mardona ruhi senga yor!</p>
                        <p>Ulug' xalq qudrati jo'sh urgan zamon,</p>
                        <p>Olamni mahliyo aylagan diyor!</p>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-bold text-center mb-2">2-misra</h3>
                      <div className="text-center space-y-1 text-sm">
                        <p>Bag'ri keng o'zbekning o'chmas iymoni,</p>
                        <p>Erkin, yosh avlodlar senga zo'r qanot!</p>
                        <p>Istiqlol mash'ali, tinchlik posboni,</p>
                        <p>Haqsevar, ona yurt, mangu bo'l obod!</p>
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
