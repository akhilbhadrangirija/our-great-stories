"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Sparkles, Zap } from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    setIsLoading(false);
    setEmail("");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-indigo-50/30 to-purple-50 dark:from-gray-900 dark:via-indigo-950/20 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          className="w-full max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Social Proof Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-8 flex justify-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-200/50 bg-white/80 px-4 py-2 text-sm text-rose-700 shadow-sm backdrop-blur-sm dark:border-rose-800/50 dark:bg-gray-900/80 dark:text-rose-300">
              <Heart className="h-4 w-4 fill-rose-500" />
              <span>Join 200+ people waiting to level up their date night</span>
            </div>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            variants={itemVariants}
            className="mb-12 text-center"
          >
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl dark:text-white">
              Stop sending boring texts.
              <br />
              <span className="bg-gradient-to-r from-rose-600 to-indigo-600 bg-clip-text text-transparent">
                Start sending stories.
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 sm:text-xl md:text-2xl dark:text-gray-300">
              Interactive date invites and digital tributes designed to get a{" "}
              <span className="font-semibold text-rose-600 dark:text-rose-400">
                "Yes"
              </span>
              .
            </p>
          </motion.div>

          {/* Waitlist Form */}
          <motion.div variants={itemVariants} className="mb-16">
            {!isSubmitted ? (
              <form
                onSubmit={handleSubmit}
                className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 flex-1 border-gray-300 bg-white/90 text-base shadow-sm backdrop-blur-sm focus:border-rose-500 focus:ring-rose-500 dark:border-gray-700 dark:bg-gray-900/90"
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 bg-gradient-to-r from-rose-500 to-rose-600 px-8 text-base font-semibold text-white shadow-lg transition-all hover:from-rose-600 hover:to-rose-700 hover:shadow-xl disabled:opacity-50 sm:flex-shrink-0"
                >
                  {isLoading ? "Joining..." : "Join the Waitlist"}
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto max-w-md rounded-lg border border-green-200 bg-green-50 p-6 text-center dark:border-green-800 dark:bg-green-950/30"
              >
                <div className="mb-2 flex justify-center">
                  <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/50">
                    <Heart className="h-6 w-6 fill-green-600 text-green-600 dark:fill-green-400 dark:text-green-400" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-green-900 dark:text-green-100">
                  Thank You!
                </h3>
                <p className="text-green-700 dark:text-green-300">
                  We&apos;ll notify you as soon as we launch. Get ready to create
                  unforgettable moments! 💕
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={itemVariants}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <Card className="group border-gray-200 bg-white/80 backdrop-blur-sm transition-all hover:border-rose-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/80 dark:hover:border-rose-800">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-rose-100 to-rose-200 dark:from-rose-900/50 dark:to-rose-800/50">
                  <Heart className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                </div>
                <CardTitle className="text-xl">Interactive Invites</CardTitle>
                <CardDescription className="text-base">
                  Create beautiful, personalized date invitations that your
                  partner will actually want to say yes to.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-gray-200 bg-white/80 backdrop-blur-sm transition-all hover:border-indigo-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/80 dark:hover:border-indigo-800">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/50 dark:to-indigo-800/50">
                  <Sparkles className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle className="text-xl">AI-Powered Personalization</CardTitle>
                <CardDescription className="text-base">
                  Let AI help you craft the perfect message and suggest creative
                  ideas tailored to your relationship.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-gray-200 bg-white/80 backdrop-blur-sm transition-all hover:border-purple-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/80 dark:hover:border-purple-800 sm:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50">
                  <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-xl">Instant Delivery</CardTitle>
                <CardDescription className="text-base">
                  Send your invites and digital gifts instantly. No waiting, no
                  hassle—just pure romantic magic.
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
