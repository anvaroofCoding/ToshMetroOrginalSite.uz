"use client";

import flag from "../../public/ramzlar/Ozbekiston-bayrogi.jpg";
import gerb from "../../public/ramzlar/gerb_big.jpg";
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
  Star,
  Moon,
  Info,
  SkipBack,
  SkipForward,
  VolumeX,
  Sparkles,
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
  const [recordingQuality, setRecordingQuality] = useState(128);
  const [micVolume, setMicVolume] = useState(0);
  const recordingTimerRef = useRef(null);
  const recordingAudioRef = useRef(null);

  const tabs = [
    {
      id: "flag",
      label: "Bayroq",
      icon: Flag,
      color: "from-blue-500 to-blue-700",
    },
    {
      id: "coat",
      label: "Gerb",
      icon: Shield,
      color: "from-green-500 to-green-700",
    },
    {
      id: "anthem",
      label: "Madhiya",
      icon: Music,
      color: "from-purple-500 to-purple-700",
    },
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
    const newVolume = value[0];
    setVolume(newVolume);
    if (audio) {
      audio.volume = newVolume;
    }
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
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

  const restartAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setCurrentTime(0);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: recordingQuality === 320 ? 48000 : 44100,
        },
      });

      const recorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
        audioBitsPerSecond: recordingQuality * 1000,
      });

      const chunks = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setRecordedAudio(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingTime(0);

      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Mikrofon ruxsati berilmadi yoki xatolik yuz berdi.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    setIsRecording(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
  };

  const playRecordedAudio = () => {
    if (recordedAudio && recordingAudioRef.current) {
      recordingAudioRef.current.play();
    }
  };

  return (
    <div className="min-h-screen ">
      <header className="relative text-white py-8 overflow-hidden">
        <div className="container relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 ">
              <span className="ml-4 text-blue-900">
                O'zbekiston Respublikasi
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 animate-fade-in-up delay-300 text-blue-900">
              Davlat ramzlari
            </p>
          </div>

          <div className="flex justify-center">
            <div className="bg-blue-900 backdrop-blur-sm rounded-full p-2">
              {tabs.map((tab, index) => {
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      relative px-6 py-3 mx-1 rounded-full transition-all duration-500 transform 
                      ${
                        activeTab === tab.id
                          ? `bg-gradient-to-r bg-white  text-white scale-110 shadow-lg`
                          : "text-blue-100 hover:text-white hover:bg-white/20 hover:scale-105"
                      }
                    `}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="flex items-center space-x-2 animate-fade-in">
                      <span
                        className={`font-semibold 
                        ${
                          activeTab === tab.id ? "text-blue-900" : "text-white"
                        }`}
                      >
                        {tab.label}
                      </span>
                    </span>
                    {activeTab === tab.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === "flag" && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Flag Image */}
              <div className="lg:col-span-1">
                <Card className="overflow-hidden shadow-xl hover:shadow-2xl">
                  <CardContent className="p-6">
                    <div className="relative mb-4 group">
                      <div className="absolute "></div>
                      <Image
                        src={
                          flag ||
                          "/placeholder.svg?height=267&width=400&query=Uzbekistan flag with blue white green stripes and crescent moon with stars"
                        }
                        alt="O'zbekiston bayrog'i"
                        width={400}
                        height={267}
                        className="w-full h-auto rounded-lg relative z-10 "
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="text-center">
                      <Badge className="bg-[#0E327F] text-white ">
                        <Calendar className="w-3 h-3 mr-1" />
                        1991-yil 18-noyabr
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <Card className=" transition-all duration-300 shadow-lg hover:shadow-xl">
                  <CardContent className="p-8">
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 leading-relaxed text-justify animate-fade-in-up">
                        <strong className="text-[#0E327F]">
                          "O'zbekiston Respublikasi Davlat bayrog'i
                          to'g'risida"gi qonun
                        </strong>
                        <br />
                        <span>
                          1991-yil 18-noyabrda O'zbekiston Respublikasi Oliy
                          Kengashining navbatdan tashqari o'tkazilgan VII
                          sessiyasida qabul qilingan.
                        </span>
                      </p>

                      <p className="text-gray-700 leading-relaxed text-justify animate-fade-in-up delay-200">
                        Davlat bayrog'i va uning ramzi bugungi O'zbekiston
                        sarhadida qadimda mavjud bo'lgan davlatlar bilan tarixan
                        bog'liqligini anglatadi hamda respublikaning
                        milliy-madaniy an'analarini o'zida mujassamlashtiradi.
                      </p>

                      <div className="grid md:grid-cols-2 gap-6 mt-8">
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl animate-fade-in-up delay-300">
                          <h3 className="font-bold text-blue-800 mb-3 flex items-center">
                            <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                            Moviy rang
                          </h3>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            Tiriklik mazmuni aks etgan mangu osmon va obihayot
                            ramzi. Yaxshilikni, donishmandlikni, halollikni,
                            shon-shuhrat va sadoqatni bildiradi.
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl animate-fade-in-up delay-400">
                          <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                            <div className="w-4 h-4 bg-white border-2 border-gray-400 rounded-full mr-2"></div>
                            Oq rang
                          </h3>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            Muqaddas tinchlik ramzi. Poklik, beg'uborlik,
                            soflikni, orzu va hayollar tozaligi, ichki
                            go'zallikka intilishning timsoli.
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl animate-fade-in-up delay-500">
                          <h3 className="font-bold text-green-800 mb-3 flex items-center">
                            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                            Yashil rang
                          </h3>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            Tabiatning yangilanish ramzi. Ko'pgina xalqlarda
                            navqironlik, umid va shodumonlik timsoli
                            hisoblanadi.
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl animate-fade-in-up delay-600">
                          <h3 className="font-bold text-red-800 mb-3 flex items-center">
                            <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                            Qizil chiziqlar
                          </h3>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            Vujudimizda jo'shib oqayotgan hayotiy qudrat
                            irmoqlarini anglatadi.
                          </p>
                        </div>
                      </div>

                      <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl animate-fade-in-up delay-700">
                        <h3 className="font-bold text-blue-900 mb-4 flex items-center">
                          <Moon className="w-5 h-5 mr-2" />
                          Yarim oy va yulduzlar
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          <strong>Navqiron yarim oy</strong> tasviri bizning
                          tarixiy an'analarimiz bilan bog'liq. Ayni paytda u
                          qo'lga kiritilgan mustaqilligimiz ramzi ham.
                        </p>
                        <p className="text-gray-700 leading-relaxed mt-3">
                          <strong>12 yulduz</strong> tasviri tarixiy
                          an'analarimiz, qadimgi yilnomamizga bevosita aloqador.
                          O'zbek xalqi madaniyatining qadimiyligi, uning
                          komillikka, o'z tuprog'ida saodatga intilishi ramzi.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeTab === "coat" && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Coat of Arms Image */}
              <div className="lg:col-span-1">
                <Card className="overflow-hidden duration-500 shadow-xl hover:shadow-2xl">
                  <CardContent className="p-6">
                    <div className="relative mb-4 group">
                      <div className="absolute "></div>
                      <Image
                        src={
                          gerb ||
                          "/placeholder.svg?height=400&width=300&query=Uzbekistan coat of arms with Humo bird cotton wheat sun"
                        }
                        alt="O'zbekiston gerbi"
                        width={300}
                        height={400}
                        className="w-full h-auto rounded-lg relative z-10 "
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="text-center">
                      <Badge className="bg-[#0E327F] text-white ">
                        <Calendar className="w-3 h-3 mr-1" />
                        1992-yil 2-iyul
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <Card className="  duration-300 shadow-lg hover:shadow-xl">
                  <CardContent className="p-8">
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 leading-relaxed text-justify animate-fade-in-up">
                        <strong className="text-[#0E327F]">
                          "O'zbekiston Respublikasi Davlat gerbi to'g'risida"gi
                          Qonun
                        </strong>
                        <br />
                        <span>
                          1992-yil 2-iyulda O'zbekiston Respublikasi Oliy
                          Kengashining X sessiyasida qabul qilingan.
                        </span>
                      </p>

                      <div className="mt-8 space-y-6">
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl animate-fade-in-up delay-200">
                          <h3 className="font-bold text-blue-900 mb-3 flex items-center">
                            Quyosh va vodiy
                          </h3>
                          <p className="text-gray-700 leading-relaxed">
                            O'zbekiston Respublikasining Davlat gerbi gullagan
                            vodiy uzra charaqlab turgan quyosh tasviridan
                            iborat.
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-gray-50 to-gray-50 p-6 rounded-xl animate-fade-in-up delay-300">
                          <h3 className="font-bold text-blue-900 mb-3 flex items-center">
                            Bug'doy va paxta
                          </h3>
                          <p className="text-gray-700 leading-relaxed">
                            So'l tomonida bug'doy boshoqlari, o'ng tomonida
                            ochilgan paxta chanoqlari suvrati tushirilgan
                            chambardan iborat.
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl animate-fade-in-up delay-400">
                          <h3 className="font-bold text-blue-900 mb-3 flex items-center">
                            Sakkiz qirrali yulduz
                          </h3>
                          <p className="text-gray-700 leading-relaxed">
                            Gerbning yuqori qismida Respublika jipsligining
                            ramzi sifatida sakkiz qirrali yulduz tasvirlangan:
                            sakkiz qirra ichida joylashgan yarim oy va yulduz
                            musulmonlarning qutlug' ramzidir.
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl animate-fade-in-up delay-500">
                          <h3 className="font-bold text-blue-900 mb-3 flex items-center">
                            Humo qushi
                          </h3>
                          <p className="text-gray-700 leading-relaxed">
                            Gerbning markazida himmat, oliyjanoblik va fidoyilik
                            timsoli bo'lgan afsonaviy Humo qushi qanotlarini
                            yozib turibdi. Ushbu ramz va timsollar xalqimizning
                            tinchlik, yaxshilik, baxt-saodat, farovonlik
                            yo'lidagi orzu-umidlarini ifodalaydi.
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl animate-fade-in-up delay-600">
                          <h3 className="font-bold text-blue-900 mb-3 flex items-center">
                            "O'zbekiston" yozuvi
                          </h3>
                          <p className="text-gray-700 leading-relaxed">
                            Gerbning pastki qismida Respublika Davlat bayrog'ini
                            ifoda etuvchi chambar lentasining bandiga
                            «O'zbekiston» deb yozib qo'yilgan.
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

        {activeTab === "anthem" && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="transition-all duration-300 shadow-xl hover:shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="relative">
                      <Volume2 className="w-5 h-5 text-[#0E327F] animate-pulse" />
                      <div className="absolute inset-0 bg-[#0E327F] rounded-full animate-ping opacity-20"></div>
                    </div>
                    <h2 className="text-xl font-bold text-[#0E327F] animate-fade-in">
                      Audio player
                    </h2>
                  </div>

                  <div className="bg-gradient-to-br from-[#0E327F] via-blue-600 to-blue-700 text-white p-6 rounded-xl mb-6 relative overflow-hidden">
                    {/* Animated background for madhiya */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                      {isPlaying && (
                        <>
                          <div className="absolute top-2 left-4 w-2 h-2 bg-yellow-300 rounded-full animate-bounce"></div>
                          <div className="absolute top-4 right-8 w-1 h-1 bg-green-300 rounded-full animate-ping delay-300"></div>
                          <div className="absolute bottom-6 left-12 w-3 h-3 bg-red-300 rounded-full animate-pulse delay-700"></div>
                          <div className="absolute bottom-2 right-4 w-2 h-2 bg-blue-300 rounded-full animate-bounce delay-1000"></div>
                        </>
                      )}
                    </div>

                    <div className="relative z-10">
                      <div className="text-center mb-4">
                        <h3 className="text-lg font-bold ">
                          <span className="text-white">
                            O'zbekiston Respublikasi Madhiyasi
                          </span>
                        </h3>
                        <p className="text-blue-100 text-sm animate-fade-in-up delay-200 flex items-center justify-center">
                          <Music className="w-4 h-4 mr-2 animate-pulse" />
                          Davlat Madhiyasi
                        </p>
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
                          <span className="animate-fade-in">
                            {formatTime(currentTime)}
                          </span>
                          <span className="animate-fade-in">
                            {formatTime(duration)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-center space-x-4 mb-4">
                        <Button
                          onClick={restartAudio}
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/20 transform hover:scale-110 transition-all duration-200"
                        >
                          <SkipBack className="w-4 h-4" />
                        </Button>

                        <Button
                          onClick={togglePlayPause}
                          className="bg-white text-[#0E327F] hover:bg-gray-100 w-12 h-12 rounded-full transform hover:scale-110 transition-all duration-200 shadow-lg"
                        >
                          {isPlaying ? (
                            <Pause className="w-6 h-6 animate-pulse" />
                          ) : (
                            <Play className="w-6 h-6 ml-1" />
                          )}
                        </Button>

                        <Button
                          onClick={() => {
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
                          className="text-white hover:bg-white/20 transform hover:scale-110 transition-all duration-200"
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
                            <Volume2 className="w-4 h-4 animate-pulse" />
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
                  </div>

                  <div className="space-y-4 bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl">
                    <h3 className="font-bold text-[#0E327F] mb-4 flex items-center">
                      <Info className="w-5 h-5 mr-2" />
                      Ma'lumot
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      <strong>
                        O'zbekiston Respublikasi Davlat madhiyasining matni va
                        musiqasi
                      </strong>{" "}
                      O'zbekiston Respublikasining 1992 yil 10 dekabrdagi
                      768-XII-sonli «O'zbekiston Respublikasining Davlat
                      madhiyasi to'g'risida»gi Qonuni bilan tasdiqlangan.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      O'zbekiston Respublikasining Davlat madhiyasi O'zbekiston
                      Respublikasi Davlat suverenitetining ramzidir. O'zbekiston
                      Respublikasining Davlat madhiyasiga zo'r ehtirom bilan
                      qarash O'zbekiston Respublikasi har bir fuqarosining
                      vatanparvarlik burchidir.
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-sm">
                        <p className="font-semibold text-[#0E327F]">Musiqa:</p>
                        <p className="text-gray-600">Mutal Burhonov</p>
                      </div>
                      <div className="text-sm text-right">
                        <p className="font-semibold text-[#0E327F]">So'z:</p>
                        <p className="text-gray-600">Abdulla Oripov</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className=" transition-all duration-300 shadow-xl hover:shadow-2xl">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-[#0E327F] mb-4 text-center flex items-center justify-center animate-fade-in">
                    <Music className="w-5 h-5 mr-2 " />
                    <span className="text-blue-900">Madhiya matni</span>
                  </h2>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl animate-fade-in-up">
                      <div className="text-center mb-4">
                        <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2">
                          1-band
                        </Badge>
                      </div>
                      <p className="text-gray-800 leading-relaxed text-center font-medium">
                        Serquyosh hur o'lkam, elga baxt, najot,
                        <br />
                        Sen o'zing do'stlarga yo'ldosh, mehribon!
                        <br />
                        Yashnagay to abad ilmu fan, ijod,
                        <br />
                        Shuhrating porlasin toki bor jahon!
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-50 to-orange-100 p-6 rounded-xl animate-fade-in-up delay-200">
                      <div className="text-center mb-4">
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-4 py-2 animate-pulse">
                          Naqorat
                        </Badge>
                      </div>
                      <p className="text-gray-800 leading-relaxed text-center font-bold text-lg">
                        <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                          Oltin bu vodiylar — jon O'zbekiston,
                          <br />
                          Ajdodlar mardona ruhi senga yor!
                          <br />
                          Ulug' xalq qudrati jo'sh urgan zamon,
                          <br />
                          Olamni mahliyo aylagan diyor!
                        </span>
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl animate-fade-in-up delay-400">
                      <div className="text-center mb-4">
                        <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2">
                          2-band
                        </Badge>
                      </div>
                      <p className="text-gray-800 leading-relaxed text-center font-medium">
                        Bag'ri keng o'zbekning o'chmas iymoni,
                        <br />
                        Erkin, yosh avlodlar senga zo'r qanot!
                        <br />
                        Istiqlol mash'ali tinchlik posboni,
                        <br />
                        Xaqsevar, ona yurt, mangu bo'l obod!
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-50 to-orange-100 p-6 rounded-xl animate-fade-in-up delay-600">
                      <div className="text-center mb-4">
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-4 py-2 animate-pulse">
                          Naqorat
                        </Badge>
                      </div>
                      <p className="text-gray-800 leading-relaxed text-center font-bold text-lg">
                        <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                          Oltin bu vodiylar — jon O'zbekiston,
                          <br />
                          Ajdodlar mardona ruhi senga yor!
                          <br />
                          Ulug' xalq qudrati jo'sh urgan zamon,
                          <br />
                          Olamni mahliyo aylagan diyor!
                        </span>
                      </p>
                    </div>

                    {isPlaying && (
                      <div className="bg-gradient-to-r from-[#0E327F] via-purple-600 to-blue-700 text-white p-6 rounded-xl text-center relative overflow-hidden animate-fade-in">
                        {/* Animated background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>

                        <div className="relative z-10">
                          <div className="flex justify-center space-x-1 mb-4">
                            {[...Array(8)].map((_, i) => (
                              <div
                                key={i}
                                className="w-2 bg-gradient-to-t from-yellow-300 to-white rounded-full animate-bounce"
                                style={{
                                  height: `${Math.random() * 20 + 10}px`,
                                  animationDelay: `${i * 0.1}s`,
                                  animationDuration: "0.8s",
                                }}
                              ></div>
                            ))}
                          </div>
                          <p className="text-lg font-bold flex items-center justify-center animate-pulse">
                            <Volume2 className="w-5 h-5 mr-2 animate-bounce" />
                            <span className="bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
                              Madhiya ijro etilmoqda...
                            </span>
                          </p>
                          <div className="mt-3 flex justify-center space-x-2">
                            {[...Array(12)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 text-yellow-300 animate-twinkle"
                                style={{ animationDelay: `${i * 0.15}s` }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/audio/uzbekistan-anthem.mp3"
        preload="metadata"
      />

      {recordedAudio && (
        <audio ref={recordingAudioRef} src={recordedAudio} preload="metadata" />
      )}
    </div>
  );
}
