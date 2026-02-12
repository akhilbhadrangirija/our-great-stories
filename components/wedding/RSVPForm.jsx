'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { submitRSVP } from '@/app/actions/rsvp';

export default function RSVPForm({ weddingId }) {
        const [loading, setLoading] = useState(false);
        const [attending, setAttending] = useState(''); // 'yes' or 'no'
        const [submitted, setSubmitted] = useState(false);

        const handleSubmit = async (e) => {
                e.preventDefault();
                setLoading(true);

                const formData = new FormData(e.target);
                if (!formData.get('attending')) {
                        formData.append('attending', attending);
                }

                // Default songRequest/diet/message if missing (though FormData gets empty strings usually)

                const res = await submitRSVP(weddingId, formData);

                if (res.success) {
                        setSubmitted(true);
                } else {
                        alert("Something went wrong. Please try again.");
                }
                setLoading(false);
        };

        if (submitted) {
                return (
                        <div className="w-full max-w-md mx-auto p-8 text-center bg-white/80 backdrop-blur-sm rounded-xl border border-rose-100 shadow-xl">
                                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Check className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Response Sent!</h3>
                                        <p className="text-gray-600">Thank you for letting us know. We can&apos;t wait!</p>
                                </motion.div>
                        </div>
                );
        }

        return (
                <div className="w-full max-w-lg mx-auto bg-white/50 backdrop-blur-md border border-white/60 shadow-xl rounded-2xl overflow-hidden">
                        <div className="p-6 md:p-8">
                                <h3 className="text-3xl font-serif text-center mb-8 text-gray-800">RSVP</h3>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Attendance Toggle */}
                                        <div className="flex bg-slate-100 p-1 rounded-lg">
                                                <button
                                                        type="button"
                                                        onClick={() => setAttending('yes')}
                                                        className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all ${attending === 'yes' ? 'bg-white shadow-sm text-green-700' : 'text-slate-500 hover:text-slate-700'}`}
                                                >
                                                        Joyfully Accept
                                                </button>
                                                <button
                                                        type="button"
                                                        onClick={() => setAttending('no')}
                                                        className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all ${attending === 'no' ? 'bg-white shadow-sm text-red-700' : 'text-slate-500 hover:text-slate-700'}`}
                                                >
                                                        Regretfully Decline
                                                </button>
                                                <input type="hidden" name="attending" value={attending || ''} />
                                        </div>

                                        <AnimatePresence mode="wait">
                                                {attending === 'yes' && (
                                                        <motion.div
                                                                key="attending-yes"
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                className="space-y-4 overflow-hidden"
                                                        >
                                                                <p className="text-center text-gray-600 text-sm mb-4">We can&apos;t wait to celebrate with you!</p>
                                                                <div className="space-y-2">
                                                                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                                                                        <Input name="name" required placeholder="Guest Name" className="bg-white/80" />
                                                                </div>

                                                                <div className="space-y-2">
                                                                        <label className="text-sm font-medium text-gray-700">Email</label>
                                                                        <Input name="email" type="email" placeholder="email@example.com" className="bg-white/80" />
                                                                </div>

                                                                <div className="grid grid-cols-2 gap-4">
                                                                        <div className="space-y-2">
                                                                                <label className="text-sm font-medium text-gray-700">Guests</label>
                                                                                <select name="guestCount" className="w-full h-10 rounded-md border border-input bg-white/80 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                                                                        <option value="1">1 Person</option>
                                                                                        <option value="2">2 People</option>
                                                                                        <option value="3">3 People</option>
                                                                                        <option value="4">4 People</option>
                                                                                        <option value="5">5 People</option>
                                                                                </select>
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                                <label className="text-sm font-medium text-gray-700">Meal</label>
                                                                                <select name="meal" className="w-full h-10 rounded-md border border-input bg-white/80 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                                                                        <option value="standard">Standard</option>
                                                                                        <option value="vegetarian">Vegetarian</option>
                                                                                        <option value="vegan">Vegan</option>
                                                                                        <option value="gluten-free">Gluten Free</option>
                                                                                </select>
                                                                        </div>
                                                                </div>

                                                                <div className="space-y-2">
                                                                        <label className="text-sm font-medium text-gray-700">Dietary Restrictions</label>
                                                                        <Input name="diet" placeholder="Any allergies?" className="bg-white/80" />
                                                                </div>

                                                                <div className="space-y-2">
                                                                        <label className="text-sm font-medium text-gray-700">Song Request</label>
                                                                        <Input name="songRequest" placeholder="I bet you look good on the dancefloor..." className="bg-white/80" />
                                                                </div>

                                                                <div className="space-y-2">
                                                                        <label className="text-sm font-medium text-gray-700">Message to Couple</label>
                                                                        <textarea name="message" className="w-full min-h-[80px] rounded-md border border-input bg-white/80 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" placeholder="Love you guys!" />
                                                                </div>
                                                        </motion.div>
                                                )}

                                                {attending === 'no' && (
                                                        <motion.div
                                                                key="attending-no"
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                className="space-y-4 overflow-hidden"
                                                        >
                                                                <div className="space-y-2">
                                                                        <label className="text-sm font-medium text-gray-700">Your Name</label>
                                                                        <Input name="name" required placeholder="Guest Name" className="bg-white/80" />
                                                                </div>
                                                                <div className="space-y-2">
                                                                        <label className="text-sm font-medium text-gray-700">Message (Optional)</label>
                                                                        <textarea name="message" className="w-full min-h-[80px] rounded-md border border-input bg-white/80 px-3 py-2 text-sm shadow-sm" placeholder="Wish you the best!" />
                                                                </div>
                                                        </motion.div>
                                                )}
                                        </AnimatePresence>

                                        <Button
                                                type="submit"
                                                disabled={loading || !attending}
                                                className="w-full h-12 text-lg font-medium bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-md relative overflow-hidden"
                                        >
                                                {loading && <Loader2 className="animate-spin mr-2 absolute left-4" />}
                                                {loading ? "Sending..." : "Send RSVP"}
                                        </Button>
                                </form>
                        </div>
                </div>
        );
}
