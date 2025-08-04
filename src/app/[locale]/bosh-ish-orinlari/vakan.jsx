"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Calculator,
  Calendar,
  Clock,
  DollarSign,
  Eye,
  GraduationCap,
  MapPin,
  Phone,
  Radio,
  Scale,
  Star,
  Train,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";
import ApiVakan from "./apiVakan";

export default function Component() {
  const [selectedJob, setSelectedJob] = useState();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="min-h-screen">
      <ApiVakan />
    </div>
  );
}
