'use client';

import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Check, ChevronRight, Loader2, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export default function RSVPForm() {
        const [step, setStep] = useState(1);
        const [loading, setLoading] = useState(false);
        const [formData, setFormData] = useState({
                name: '',
                email: '',
                attending: 'yes',
                diet: '',
                song: ''
        });

        const nextStep = (e) => {
                if (e) e.preventDefault();
                setStep(step + 1);
        };

        const submit = async (e) => {
                e.preventDefault();
                setLoading(true);
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                setLoading(false);
                setStep(4);
        };

        const variants = {
                enter: { opacity: 0, x: 20 },
                center: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: -20, position: 'absolute' }
        };

        return (
                <section className="py-24 px-4 flex justify-center">
                        <LayoutGroup>
                                <motion.div
                                        layout
                                        className="w-full max-w-md bg-background border border-border rounded-2xl shadow-xl overflow-hidden relative"
                                        style={{ borderRadius: 24 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                >
                                        <div className="p-8">
                                                <motion.div layout className="mb-6">
                                                        <h2 className="text-2xl font-serif font-bold">RSVP</h2>
                                                        <p className="text-muted-foreground text-sm">Join us for our special day</p>

                                                        {/* Progress Dots */}
                                                        {step < 4 && (
                                                                <div className="flex gap-2 mt-4">
                                                                        {[1, 2, 3].map((s) => (
                                                                                <motion.div
                                                                                        key={s}
                                                                                        className={cn(
                                                                                                "h-1 rounded-full transition-colors duration-300",
                                                                                                s <= step ? "bg-primary w-8" : "bg-muted w-2"
                                                                                        )}
                                                                                />
                                                                        ))}
                                                                </div>
                                                        )}
                                                </motion.div>

                                                <form onSubmit={step === 3 ? submit : nextStep} className="relative">
                                                        <AnimatePresence mode="popLayout" initial={false}>
                                                                {step === 1 && (
                                                                        <motion.div
                                                                                key="step1"
                                                                                variants={variants}
                                                                                initial="enter"
                                                                                animate="center"
                                                                                exit="exit"
                                                                                className="space-y-4"
                                                                        >
                                                                                <div className="space-y-2">
                                                                                        <Label htmlFor="name">Full Name</Label>
                                                                                        <Input
                                                                                                id="name"
                                                                                                required
                                                                                                value={formData.name}
                                                                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                                                                placeholder="Jane Doe"
                                                                                        />
                                                                                </div>
                                                                                <div className="space-y-2">
                                                                                        <Label htmlFor="email">Email Address</Label>
                                                                                        <Input
                                                                                                id="email"
                                                                                                type="email"
                                                                                                required
                                                                                                value={formData.email}
                                                                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                                                                placeholder="jane@example.com"
                                                                                        />
                                                                                </div>
                                                                                <div className="pt-4 flex justify-end">
                                                                                        <Button type="submit" disabled={!formData.name || !formData.email}>
                                                                                                Next <ChevronRight className="w-4 h-4 ml-2" />
                                                                                        </Button>
                                                                                </div>
                                                                        </motion.div>
                                                                )}

                                                                {step === 2 && (
                                                                        <motion.div
                                                                                key="step2"
                                                                                variants={variants}
                                                                                initial="enter"
                                                                                animate="center"
                                                                                exit="exit"
                                                                                className="space-y-6"
                                                                        >
                                                                                <div className="space-y-3">
                                                                                        <Label>Will you be attending?</Label>
                                                                                        <RadioGroup
                                                                                                value={formData.attending}
                                                                                                onValueChange={val => setFormData({ ...formData, attending: val })}
                                                                                                className="grid grid-cols-2 gap-4"
                                                                                        >
                                                                                                <div>
                                                                                                        <RadioGroupItem value="yes" id="yes" className="peer sr-only" />
                                                                                                        <Label
                                                                                                                htmlFor="yes"
                                                                                                                className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all"
                                                                                                        >
                                                                                                                <Check className="mb-2 h-6 w-6" />
                                                                                                                Joyfully Accept
                                                                                                        </Label>
                                                                                                </div>
                                                                                                <div>
                                                                                                        <RadioGroupItem value="no" id="no" className="peer sr-only" />
                                                                                                        <Label
                                                                                                                htmlFor="no"
                                                                                                                className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-destructive peer-data-[state=checked]:text-destructive cursor-pointer transition-all"
                                                                                                        >
                                                                                                                <span className="mb-2 text-xl">😢</span>
                                                                                                                Regretfully Decline
                                                                                                        </Label>
                                                                                                </div>
                                                                                        </RadioGroup>
                                                                                </div>
                                                                                <div className="flex justify-between pt-2">
                                                                                        <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                                                                                        <Button type="submit">
                                                                                                Next <ChevronRight className="w-4 h-4 ml-2" />
                                                                                        </Button>
                                                                                </div>
                                                                        </motion.div>
                                                                )}

                                                                {step === 3 && (
                                                                        <motion.div
                                                                                key="step3"
                                                                                variants={variants}
                                                                                initial="enter"
                                                                                animate="center"
                                                                                exit="exit"
                                                                                className="space-y-4"
                                                                        >
                                                                                {formData.attending === 'yes' ? (
                                                                                        <>
                                                                                                <div className="space-y-2">
                                                                                                        <Label htmlFor="diet">Dietary Restrictions</Label>
                                                                                                        <Input
                                                                                                                id="diet"
                                                                                                                value={formData.diet}
                                                                                                                onChange={e => setFormData({ ...formData, diet: e.target.value })}
                                                                                                                placeholder="Gluten-free, Vegan, etc."
                                                                                                        />
                                                                                                </div>
                                                                                                <div className="space-y-2">
                                                                                                        <Label htmlFor="song">Song Request</Label>
                                                                                                        <Textarea
                                                                                                                id="song"
                                                                                                                value={formData.song}
                                                                                                                onChange={e => setFormData({ ...formData, song: e.target.value })}
                                                                                                                placeholder="What will get you on the dance floor?"
                                                                                                        />
                                                                                                </div>
                                                                                        </>
                                                                                ) : (
                                                                                        <div className="py-4 text-center text-muted-foreground">
                                                                                                We'll miss you! Feel free to leave a message.
                                                                                                <Textarea
                                                                                                        className="mt-4"
                                                                                                        placeholder="Your message to the couple..."
                                                                                                />
                                                                                        </div>
                                                                                )}

                                                                                <div className="flex justify-between pt-4">
                                                                                        <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
                                                                                        <Button type="submit" disabled={loading}>
                                                                                                {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
                                                                                                {formData.attending === 'yes' ? 'Confirm RSVP' : 'Send Message'}
                                                                                        </Button>
                                                                                </div>
                                                                        </motion.div>
                                                                )}

                                                                {step === 4 && (
                                                                        <motion.div
                                                                                key="step4"
                                                                                variants={variants}
                                                                                initial="enter"
                                                                                animate="center"
                                                                                exit="exit"
                                                                                className="text-center py-8 space-y-4"
                                                                        >
                                                                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                                                                        <PartyPopper className="w-10 h-10" />
                                                                                </div>
                                                                                <h3 className="text-2xl font-bold font-serif">
                                                                                        {formData.attending === 'yes' ? "You're on the list!" : "Message Sent"}
                                                                                </h3>
                                                                                <p className="text-muted-foreground">
                                                                                        {formData.attending === 'yes'
                                                                                                ? "We can't wait to celebrate with you."
                                                                                                : "Thank you for letting us know."}
                                                                                </p>
                                                                                <Button variant="outline" onClick={() => {
                                                                                        setStep(1);
                                                                                        setFormData({
                                                                                                name: '',
                                                                                                email: '',
                                                                                                attending: 'yes',
                                                                                                diet: '',
                                                                                                song: ''
                                                                                        });
                                                                                }}>
                                                                                        Submit Another Response
                                                                                </Button>
                                                                        </motion.div>
                                                                )}
                                                        </AnimatePresence>
                                                </form>
                                        </div>
                                </motion.div>
                        </LayoutGroup>
                </section>
        );
}
