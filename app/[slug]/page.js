"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Heart,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  ArrowLeft,
  Share2,
} from "lucide-react";
import Link from "next/link";

export default function SlugPage() {
  const params = useParams();
  const slug = params?.slug;

  // In a real app, you'd fetch this data based on the slug
  // For now, we'll use mock data
  const storyData = {
    title: "A Special Evening Just for Us",
    from: "Your Secret Admirer",
    to: "You",
    date: "Saturday, February 14th",
    time: "7:00 PM",
    location: "The Rooftop Restaurant",
    address: "123 Romantic Street, City",
    message:
      "I've been thinking about you all week. Let's create a memory we'll never forget. This evening is all about us—good food, great conversation, and even better company. Say yes? 💕",
    theme: "romantic", // romantic, playful, elegant
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: storyData.title,
          text: storyData.message,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-indigo-50/30 to-purple-50 dark:from-gray-900 dark:via-indigo-950/20 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      <div className="relative z-10 min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-between"
        >
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </motion.div>

        <div className="mx-auto max-w-2xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Main Card */}
            <motion.div variants={itemVariants}>
              <Card className="overflow-hidden border-2 border-rose-200/50 bg-white/90 shadow-xl backdrop-blur-sm dark:border-rose-800/50 dark:bg-gray-900/90">
                <div className="bg-gradient-to-r from-rose-500 to-indigo-600 px-6 py-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="mb-4 inline-flex"
                  >
                    <Heart className="h-12 w-12 fill-white text-white" />
                  </motion.div>
                  <motion.h1
                    variants={itemVariants}
                    className="mb-2 text-3xl font-bold text-white sm:text-4xl"
                  >
                    {storyData.title}
                  </motion.h1>
                  <motion.p
                    variants={itemVariants}
                    className="text-lg text-rose-100"
                  >
                    From {storyData.from}
                  </motion.p>
                </div>

                <CardContent className="p-8">
                  {/* Message */}
                  <motion.div variants={itemVariants} className="mb-8">
                    <p className="text-center text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                      {storyData.message}
                    </p>
                  </motion.div>

                  {/* Divider */}
                  <div className="my-8 flex items-center">
                    <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
                    <Sparkles className="mx-4 h-5 w-5 text-rose-500" />
                    <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
                  </div>

                  {/* Details Grid */}
                  <motion.div
                    variants={itemVariants}
                    className="grid gap-4 sm:grid-cols-2"
                  >
                    <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
                      <div className="rounded-full bg-rose-100 p-2 dark:bg-rose-900/50">
                        <Calendar className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Date
                        </p>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                          {storyData.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
                      <div className="rounded-full bg-indigo-100 p-2 dark:bg-indigo-900/50">
                        <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Time
                        </p>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                          {storyData.time}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-2 flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
                      <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/50">
                        <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Location
                        </p>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                          {storyData.location}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {storyData.address}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div
                    variants={itemVariants}
                    className="mt-8 flex flex-col gap-3 sm:flex-row"
                  >
                    <Button
                      size="lg"
                      className="flex-1 bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg transition-all hover:from-rose-600 hover:to-rose-700 hover:shadow-xl"
                    >
                      <Heart className="mr-2 h-5 w-5 fill-white" />
                      I&apos;ll Be There!
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="flex-1 border-2"
                    >
                      Maybe Another Time
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Footer Note */}
            <motion.div
              variants={itemVariants}
              className="text-center"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Created with{" "}
                <Heart className="inline h-4 w-4 fill-rose-500 text-rose-500" />{" "}
                on{" "}
                <Link
                  href="/"
                  className="font-semibold text-rose-600 hover:underline dark:text-rose-400"
                >
                  OurGreatStory
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

