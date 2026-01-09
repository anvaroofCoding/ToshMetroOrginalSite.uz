"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  Briefcase,
  CheckCircle,
  Clock,
  GraduationCap,
  Loader2,
  Star,
  Upload,
  Users,
  X,
} from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function JobApplicationPage() {
  const pathname = usePathname();
  const jobId = useMemo(() => {
    const segments = pathname.split("/");
    return Number.parseInt(segments[segments.length - 1]);
  }, [pathname]);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const { locale } = useParams();

  // Form state
  const [formData, setFormData] = useState({
    jobVacancy: jobId,
    name: "",
    phone: "",
    email: "",
    status: "pending",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const [attemptCount, setAttemptCount] = useState(0);
  const [isDelayed, setIsDelayed] = useState(false);
  const [delayTimeLeft, setDelayTimeLeft] = useState(0);
  const [isFormHidden, setIsFormHidden] = useState(false);

  useEffect(() => {
    let interval;
    if (isDelayed && delayTimeLeft > 0) {
      interval = setInterval(() => {
        setDelayTimeLeft((prev) => {
          if (prev <= 1) {
            setIsDelayed(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isDelayed, delayTimeLeft]);

  // Fetch job data
  const fetchJobData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://abbos.uzmetro.uz/api/job-vacancies/${locale}/${jobId}`,
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch job data: ${res.status}`);
      }

      const items = await res.json();

      setData(items);
    } catch (err) {
      console.error("Error fetching job data:", err);
      setError(err.message || "Failed to load job data");
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    fetchJobData();
  }, [fetchJobData]);

  // Animation variants
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.6,
          staggerChildren: 0.1,
        },
      },
    }),
    [],
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    }),
    [],
  );

  // Form validation
  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Ism talab qilinadi";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Ism kamida 2 ta belgidan iborat bo'lishi kerak";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefon raqam talab qilinadi";
    } else if (!/^\+?[\d\s\-()]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = "Iltimos, to'g'ri telefon raqam kiriting";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Elektron pochta talab qilinadi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Iltimos, to'g'ri elektron pochta manzilini kiriting";
    }

    if (!selectedFile) {
      newErrors.file = "Rezyume/CV fayli talab qilinadi";
    } else if (selectedFile.size > 5 * 1024 * 1024) {
      newErrors.file = "Fayl hajmi 5MB dan oshmasligi kerak";
    }

    return newErrors;
  }, [formData, selectedFile]);

  // File handling
  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (!allowedTypes.includes(file.type)) {
      setFormErrors((prev) => ({
        ...prev,
        file: "Faqat PDF, DOC, DOCX, TXT formatdagi fayllar qabul qilinadi",
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormErrors((prev) => ({
        ...prev,
        file: "Fayl hajmi 5MB dan oshmasligi kerak",
      }));
      return;
    }

    setSelectedFile(file);
    setFormErrors((prev) => ({ ...prev, file: undefined }));
  }, []);

  const removeFile = useCallback(() => {
    setSelectedFile(null);
    const fileInput = document.getElementById("file");
    if (fileInput) {
      fileInput.value = "";
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isDelayed) return;

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      const newAttemptCount = attemptCount + 1;
      setAttemptCount(newAttemptCount);

      if (newAttemptCount >= 5) {
        setIsDelayed(true);
        setDelayTimeLeft(5);
        setFormErrors({
          general: "5 marta noto'g'ri kiritildi. 5 soniya kuting...",
        });
        return;
      }

      setFormErrors({
        ...errors,
        general: `Noto'g'ri ma'lumotlar kiritildi. Qolgan urinishlar: ${
          5 - newAttemptCount
        }`,
      });
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("jobVacancy", formData.jobVacancy.toString());
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("status", formData.status);

      if (selectedFile) {
        formDataToSend.append("file", selectedFile);
      }

      const response = await fetch(
        "https://abbos.uzmetro.uz/api/job-vacancy-requests/",
        {
          method: "POST",
          body: formDataToSend,
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Server error: ${response.status}`,
        );
      }

      const result = await response.json();

      setSubmitStatus("success");
      setIsFormHidden(true);
      setAttemptCount(0); // Reset attempts on success
    } catch (error) {
      console.error("Error submitting application:", error);
      setFormErrors({
        general:
          error.message ||
          "Ariza yuborishda xatolik yuz berdi. Qaytadan urinib ko'ring.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToVacancies = () => {
    // In a real app, this would navigate to vacancies page
    window.history.back();
  };

  const handleInputChange = useCallback(
    (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (formErrors[field]) {
        setFormErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [formErrors],
  );

  const formatFileSize = useCallback((bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="text-lg font-medium">Yuklanmoqda...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-semibold text-gray-900">
            Xatolik yuz berdi
          </h2>
          <p className="text-gray-600">{error}</p>
          <Button onClick={fetchJobData} variant="outline">
            Qayta urinish
          </Button>
        </div>
      </div>
    );
  }

  // No data state
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto" />
          <h2 className="text-xl font-semibold text-gray-900">
            Ma'lumot topilmadi
          </h2>
          <p className="text-gray-600">
            Ushbu ish o'rni haqida ma'lumot mavjud emas
          </p>
        </div>
      </div>
    );
  }

  // Main content - only renders after data is loaded
  return (
    <div className="min-h-screen ">
      <div className="container py-8">
        <motion.div
          className=" py-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-8">
            {/* Job Details Section */}
            <motion.div
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                transition: { duration: 0.3 },
              }}
            >
              {/* Header */}
              <motion.div
                className="bg-blue-900 p-8 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex-1">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <CardTitle className="text-3xl font-bold mb-2 leading-tight">
                        {data.title || "Lavozim nomi mavjud emas"}
                      </CardTitle>
                      <div className="flex items-center space-x-4 text-blue-100">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">
                            {data.total_requests || 0} ariza
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4 text-green-300" />
                          <span className="text-sm">Faol</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  <motion.div
                    className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Briefcase className="w-8 h-8 text-white" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Content */}
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <motion.div className="space-y-6" variants={itemVariants}>
                    <motion.div
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-start space-x-4">
                        <motion.div
                          className="bg-blue-600 p-3 rounded-xl"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <GraduationCap className="w-6 h-6 text-white" />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg mb-2">
                            Ta'lim darajasi
                          </h3>
                          <p className="text-gray-700 text-base leading-relaxed">
                            {data.education_status || "Ma'lumot yo'q"}
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-start space-x-4">
                        <motion.div
                          className="bg-green-600 p-3 rounded-xl"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Star className="w-6 h-6 text-white" />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg mb-2">
                            Mutaxassislik darajasi
                          </h3>
                          <p className="text-gray-700 text-base leading-relaxed">
                            {data.mutaxasislik || "Ma'lumot yo'q"}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Right Column */}
                  <motion.div variants={itemVariants}>
                    <motion.div
                      className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 h-full"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center">
                        <motion.div
                          className="bg-purple-600 p-2 rounded-lg mr-3"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <AlertCircle className="w-5 h-5 text-white" />
                        </motion.div>
                        Asosiy talablar
                      </h3>
                      <p className="text-gray-700 text-base leading-relaxed">
                        {data.requirements || "Ma'lumot yo'q"}
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Application Form Section */}
            <AnimatePresence>
              {!isFormHidden && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="shadow-lg">
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl font-bold text-gray-900">
                        Lavozimga ariza berish
                      </CardTitle>
                      <CardDescription>
                        Ish o'rni ID: {jobId} uchun arizangizni yuboring
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      {isDelayed && (
                        <Alert className="mb-6 border-orange-200 bg-orange-50">
                          <Clock className="h-4 w-4 text-orange-600" />
                          <AlertDescription className="text-orange-800">
                            Iltimos, {delayTimeLeft} soniya kuting...
                          </AlertDescription>
                        </Alert>
                      )}

                      {formErrors.general && !isDelayed && (
                        <Alert className="mb-6 border-red-200 bg-red-50">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <AlertDescription className="text-red-800">
                            {formErrors.general}
                          </AlertDescription>
                        </Alert>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Form fields */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label
                              htmlFor="name"
                              className="text-sm font-medium"
                            >
                              To'liq ism *
                            </Label>
                            <Input
                              id="name"
                              type="text"
                              value={formData.name}
                              onChange={(e) =>
                                handleInputChange("name", e.target.value)
                              }
                              placeholder="To'liq ismingizni kiriting"
                              className={
                                formErrors.name
                                  ? "border-red-500 focus:border-red-500"
                                  : ""
                              }
                              disabled={isSubmitting || isDelayed}
                            />
                            {formErrors.name && (
                              <p className="text-sm text-red-600">
                                {formErrors.name}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label
                              htmlFor="phone"
                              className="text-sm font-medium"
                            >
                              Telefon raqam *
                            </Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) =>
                                handleInputChange("phone", e.target.value)
                              }
                              placeholder="+998 90 123 45 67"
                              className={
                                formErrors.phone
                                  ? "border-red-500 focus:border-red-500"
                                  : ""
                              }
                              disabled={isSubmitting || isDelayed}
                            />
                            {formErrors.phone && (
                              <p className="text-sm text-red-600">
                                {formErrors.phone}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="text-sm font-medium"
                          >
                            Elektron pochta manzili *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            placeholder="your.email@example.com"
                            className={
                              formErrors.email
                                ? "border-red-500 focus:border-red-500"
                                : ""
                            }
                            disabled={isSubmitting || isDelayed}
                          />
                          {formErrors.email && (
                            <p className="text-sm text-red-600">
                              {formErrors.email}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="file" className="text-sm font-medium">
                            Rezyume/CV *
                          </Label>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Input
                                id="file"
                                type="file"
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx,.txt"
                                className={
                                  formErrors.file
                                    ? "border-red-500 focus:border-red-500"
                                    : ""
                                }
                                disabled={isSubmitting || isDelayed}
                              />
                              <Upload className="h-4 w-4 text-gray-400" />
                            </div>

                            {selectedFile && (
                              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center space-x-2">
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                  <div>
                                    <p className="text-sm font-medium text-green-800">
                                      {selectedFile.name}
                                    </p>
                                    <p className="text-xs text-green-600">
                                      {formatFileSize(selectedFile.size)}
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={removeFile}
                                  disabled={isSubmitting || isDelayed}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            )}

                            {formErrors.file && (
                              <p className="text-sm text-red-600">
                                {formErrors.file}
                              </p>
                            )}
                            <p className="text-xs text-gray-500">
                              Qabul qilinadigan formatlar: PDF, DOC, DOCX, TXT
                              (Max 5MB)
                            </p>
                          </div>
                        </div>

                        <motion.div
                          whileHover={{ scale: isDelayed ? 1 : 1.02 }}
                          whileTap={{ scale: isDelayed ? 1 : 0.98 }}
                        >
                          <Button
                            type="submit"
                            disabled={isSubmitting || isDelayed}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium disabled:opacity-50"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Ariza yuborilmoqda...
                              </>
                            ) : isDelayed ? (
                              <>
                                <Clock className="mr-2 h-5 w-5" />
                                Kuting... ({delayTimeLeft}s)
                              </>
                            ) : (
                              "Ariza yuborish"
                            )}
                          </Button>
                        </motion.div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {submitStatus === "success" && isFormHidden && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <Card className="shadow-lg border-green-200">
                    <CardContent className="pt-8 pb-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.2,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                      </motion.div>

                      <h2 className="text-2xl font-bold text-green-800 mb-2">
                        Tabriklaymiz!
                      </h2>

                      <p className="text-lg text-green-700 mb-6">
                        Sizning arizangiz muvaffaqiyatli qabul qilindi! Sizning
                        arizangiz 5 ish kuni ichida ko'rib chiqiladi.
                      </p>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={handleBackToVacancies}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium"
                        >
                          <ArrowLeft className="mr-2 h-5 w-5" />
                          Boshqa vakansiyalarga qaytish
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
