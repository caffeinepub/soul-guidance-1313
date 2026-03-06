import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Menu,
  Moon,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSubmitInquiry } from "./hooks/useQueries";

// ─── Smooth scroll helper ──────────────────────────────────
function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── Starfield background decoration ──────────────────────
function StarField() {
  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-gold"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: 0.4,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.3, 1] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Navbar ────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Home", id: "home", ocid: "nav.home.link" },
    { label: "Services", id: "services", ocid: "nav.services.link" },
    { label: "About", id: "about", ocid: "nav.about.link" },
    { label: "Contact", id: "contact", ocid: "nav.contact.link" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-indigo-dark/90 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Brand */}
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-2 group"
        >
          <Moon className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
          <span className="font-display text-lg font-semibold text-gold tracking-wide">
            Soul Guidance 1313
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.id}
              data-ocid={link.ocid}
              onClick={() => scrollToSection(link.id)}
              className="font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Book Now CTA */}
        <div className="hidden md:flex">
          <Button
            data-ocid="nav.book.button"
            onClick={() => scrollToSection("contact")}
            className="bg-gold text-indigo-dark font-body font-semibold text-sm tracking-wider uppercase hover:bg-gold-bright transition-all glow-gold-sm px-6"
          >
            Book Now
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="md:hidden text-gold p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-indigo-dark/95 backdrop-blur-md border-t border-border px-6 py-6 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.id}
                data-ocid={link.ocid}
                onClick={() => {
                  scrollToSection(link.id);
                  setMenuOpen(false);
                }}
                className="font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors text-left"
              >
                {link.label}
              </button>
            ))}
            <Button
              data-ocid="nav.book.button"
              onClick={() => {
                scrollToSection("contact");
                setMenuOpen(false);
              }}
              className="bg-gold text-indigo-dark font-semibold mt-2 glow-gold-sm"
            >
              Book Now
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero Section ──────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1400x800.jpg')",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-indigo-dark/65" />
      <StarField />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-gold/50" />
            <Sparkles className="w-5 h-5 text-gold" />
            <div className="h-px w-16 bg-gold/50" />
          </div>

          <p className="font-body text-sm tracking-[0.3em] uppercase text-gold/80 mb-4">
            By Kalpana Sharma
          </p>

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-gradient-gold">Soul Guidance</span>
            <br />
            <span className="text-foreground opacity-90">1313</span>
          </h1>

          <p className="font-body text-xl md:text-2xl text-foreground/80 italic mb-10 tracking-wide">
            Insightful Readings, Empowered Life
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button
              data-ocid="hero.book.primary_button"
              onClick={() => scrollToSection("contact")}
              size="lg"
              className="bg-gold text-indigo-dark font-display font-bold text-lg px-10 py-6 glow-gold hover:bg-gold-bright hover:scale-105 transition-all duration-300 tracking-wider"
            >
              <Star className="w-5 h-5 mr-2" />
              Book a Reading
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 text-muted-foreground font-body text-sm tracking-wider"
          >
            Tarot Card Readings · Kundali Analysis · Spiritual Guidance
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-gold/40 flex items-start justify-center pt-2">
          <div className="w-1 h-3 rounded-full bg-gold/60" />
        </div>
      </motion.div>
    </section>
  );
}

// ─── Service Card ──────────────────────────────────────────
function ServiceCard({
  cardOcid,
  bookOcid,
  image,
  title,
  price,
  description,
  onBook,
}: {
  cardOcid: string;
  bookOcid: string;
  image: string;
  title: string;
  price: string;
  description: string;
  onBook: () => void;
}) {
  return (
    <motion.div
      data-ocid={cardOcid}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="group relative rounded-2xl overflow-hidden border border-border bg-card hover:border-gold/50 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-indigo-dark/80 backdrop-blur-sm border border-gold/40 rounded-full px-4 py-1.5">
          <span className="font-display font-bold text-gold text-sm">
            {price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-4 h-4 text-gold fill-gold" />
          <h3 className="font-display text-2xl font-bold text-foreground">
            {title}
          </h3>
        </div>
        <p className="font-body text-muted-foreground leading-relaxed mb-6 text-base">
          {description}
        </p>
        <Button
          data-ocid={bookOcid}
          onClick={onBook}
          className="w-full bg-gold/10 border border-gold/40 text-gold hover:bg-gold hover:text-indigo-dark font-body font-semibold tracking-wider uppercase text-sm transition-all duration-300 glow-gold-sm"
          variant="outline"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Book This Service
        </Button>
      </div>

      {/* Decorative corner */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-gold/30 rounded-tl-2xl" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-gold/30 rounded-br-2xl" />
    </motion.div>
  );
}

// ─── Services Section ──────────────────────────────────────
function ServicesSection({
  onBookService,
}: { onBookService: (service: string) => void }) {
  return (
    <section id="services" className="py-28 relative overflow-hidden">
      {/* Atmospheric bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-violet-deep/20 to-background" />

      <div className="relative container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-gold/80 tracking-[0.3em] uppercase text-sm mb-4">
            Sacred Offerings
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our <span className="text-gradient-gold">Services</span>
          </h2>
          <div className="star-divider text-gold/40 max-w-xs mx-auto">
            <Moon className="w-4 h-4 text-gold/60" />
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <ServiceCard
            cardOcid="services.tarot.card"
            bookOcid="services.tarot.book.button"
            image="/assets/generated/tarot-card.dim_600x400.jpg"
            title="Tarot Card Reading"
            price="Rs 899 / question"
            description="Unlock the whispers of the universe through the ancient art of tarot. Each card drawn reveals hidden truths, illuminates your path, and empowers you to navigate life's deepest questions with clarity and confidence."
            onBook={() => onBookService("Tarot Card Reading")}
          />
          <ServiceCard
            cardOcid="services.kundali.card"
            bookOcid="services.kundali.book.button"
            image="/assets/generated/kundali.dim_600x400.jpg"
            title="Kundali Analysis"
            price="Rs 1,100"
            description="Discover your divine blueprint through Vedic astrology. A comprehensive birth chart analysis reveals your life's purpose, karmic patterns, planetary influences, and the cosmic forces shaping your destiny."
            onBook={() => onBookService("Kundali Analysis")}
          />
        </div>
      </div>
    </section>
  );
}

// ─── About Section ─────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-deep/30 via-transparent to-violet-deep/20" />

      <div className="relative container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative inline-block">
              {/* Decorative frame */}
              <div className="absolute -inset-3 border border-gold/30 rounded-2xl" />
              <div className="absolute -inset-6 border border-gold/15 rounded-3xl" />
              <img
                src="/assets/uploads/tarot-card-1.png"
                alt="Kalpana Sharma — Tarot Card Reader"
                className="relative rounded-2xl w-full max-w-sm mx-auto object-cover glow-gold-sm"
              />
              {/* Gold dot accent */}
              <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-gold glow-gold flex items-center justify-center">
                <Star className="w-4 h-4 text-indigo-dark fill-indigo-dark" />
              </div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="font-body text-gold/80 tracking-[0.3em] uppercase text-sm mb-4">
              Your Guide
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Meet <span className="text-gradient-gold">Kalpana Sharma</span>
            </h2>

            <div className="space-y-4 font-body text-muted-foreground leading-relaxed text-lg">
              <p>
                With over 15 years of devoted practice in tarot and Vedic
                astrology, Kalpana Sharma has guided hundreds of souls toward
                clarity, healing, and transformation.
              </p>
              <p>
                Trained in both the Western tarot tradition and the ancient
                sciences of Jyotish (Vedic astrology), Kalpana weaves intuition
                with wisdom to deliver readings that are deeply personal,
                spiritually grounded, and practically empowering.
              </p>
              <p>
                Her approach is compassionate and non-judgmental — she believes
                every person carries within them the light of their own answers,
                and her role is simply to help that light shine brighter.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              {["15+ Years Experience", "500+ Readings", "Vedic Astrology"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="font-body text-xs tracking-wider uppercase text-gold border border-gold/30 rounded-full px-4 py-1.5 bg-gold/5"
                  >
                    {badge}
                  </span>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Booking / Contact Form ────────────────────────────────
function BookingSection({
  preselectedService,
}: { preselectedService: string }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [serviceType, setServiceType] = useState(preselectedService);
  const [message, setMessage] = useState("");

  const { mutate, isPending, isSuccess, isError, reset } = useSubmitInquiry();

  // Sync preselected service from parent
  useEffect(() => {
    if (preselectedService) setServiceType(preselectedService);
  }, [preselectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim() || !serviceType || !message.trim()) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }
    mutate(
      { name, contact, serviceType, message },
      {
        onSuccess: () => {
          toast.success(
            "Your inquiry has been received! We'll be in touch soon.",
          );
          setName("");
          setContact("");
          setMessage("");
          setServiceType("");
        },
        onError: () => {
          toast.error("Something went wrong. Please try again.");
        },
      },
    );
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-violet-deep/30" />
      <StarField />

      <div className="relative container mx-auto px-6 max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-body text-gold/80 tracking-[0.3em] uppercase text-sm mb-4">
            Begin Your Journey
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Book a <span className="text-gradient-gold">Reading</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            Fill out the form below and Kalpana will get back to you within 24
            hours.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative rounded-2xl border border-border bg-card p-8 md:p-10"
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold/30 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold/30 rounded-br-2xl" />

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                data-ocid="booking.success_state"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center py-12 gap-6"
              >
                <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center glow-gold">
                  <CheckCircle2 className="w-10 h-10 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    Your inquiry is received!
                  </h3>
                  <p className="font-body text-muted-foreground">
                    Kalpana will reach out to you within 24 hours. The stars are
                    aligned for you.
                  </p>
                </div>
                <Button
                  onClick={reset}
                  variant="outline"
                  className="border-gold/40 text-gold hover:bg-gold/10 font-body tracking-wider"
                >
                  Submit Another
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="booking-name"
                    className="font-body text-sm tracking-wider uppercase text-muted-foreground"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="booking-name"
                    data-ocid="booking.name.input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="bg-input border-border text-foreground font-body placeholder:text-muted-foreground/50 focus:border-gold focus:ring-gold h-12"
                    required
                  />
                </div>

                {/* Contact */}
                <div className="space-y-2">
                  <Label
                    htmlFor="booking-contact"
                    className="font-body text-sm tracking-wider uppercase text-muted-foreground"
                  >
                    Phone / Email
                  </Label>
                  <Input
                    id="booking-contact"
                    data-ocid="booking.contact.input"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Phone number or email address"
                    className="bg-input border-border text-foreground font-body placeholder:text-muted-foreground/50 focus:border-gold focus:ring-gold h-12"
                    required
                  />
                </div>

                {/* Service */}
                <div className="space-y-2">
                  <Label
                    htmlFor="booking-service"
                    className="font-body text-sm tracking-wider uppercase text-muted-foreground"
                  >
                    Select Service
                  </Label>
                  <Select value={serviceType} onValueChange={setServiceType}>
                    <SelectTrigger
                      id="booking-service"
                      data-ocid="booking.service.select"
                      className="bg-input border-border text-foreground font-body h-12 focus:ring-gold"
                    >
                      <SelectValue placeholder="Choose a service..." />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem
                        value="Tarot Card Reading"
                        className="font-body text-foreground focus:bg-gold/10 focus:text-gold"
                      >
                        Tarot Card Reading — Rs 899 per question
                      </SelectItem>
                      <SelectItem
                        value="Kundali Analysis"
                        className="font-body text-foreground focus:bg-gold/10 focus:text-gold"
                      >
                        Kundali Analysis — Rs 1,100
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label
                    htmlFor="booking-message"
                    className="font-body text-sm tracking-wider uppercase text-muted-foreground"
                  >
                    Your Question / Message
                  </Label>
                  <Textarea
                    id="booking-message"
                    data-ocid="booking.message.textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share what's on your mind or the question you seek clarity on..."
                    className="bg-input border-border text-foreground font-body placeholder:text-muted-foreground/50 focus:border-gold focus:ring-gold min-h-32 resize-none"
                    required
                  />
                </div>

                {/* Error state */}
                {isError && (
                  <div
                    data-ocid="booking.error_state"
                    className="flex items-center gap-2 text-destructive font-body text-sm p-3 rounded-lg bg-destructive/10 border border-destructive/20"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Something went wrong. Please try again.</span>
                  </div>
                )}

                {/* Submit */}
                <Button
                  data-ocid="booking.submit.button"
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-gold text-indigo-dark font-display font-bold text-base tracking-wider uppercase py-6 glow-gold hover:bg-gold-bright hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:scale-100"
                >
                  {isPending ? (
                    <>
                      <Loader2
                        data-ocid="booking.loading_state"
                        className="w-5 h-5 mr-2 animate-spin"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Star className="w-5 h-5 mr-2" />
                      Send My Inquiry
                    </>
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Moon className="w-5 h-5 text-gold" />
          <span className="font-display text-xl font-semibold text-gold">
            Soul Guidance 1313
          </span>
          <Moon className="w-5 h-5 text-gold" />
        </div>
        <p className="font-body text-muted-foreground italic text-sm mb-6">
          Insightful Readings, Empowered Life
        </p>
        <div className="flex items-center justify-center gap-4 text-muted-foreground/60 text-xs font-body mb-6">
          <span>Tarot Card Reading</span>
          <span className="text-gold/40">✦</span>
          <span>Kundali Analysis</span>
          <span className="text-gold/40">✦</span>
          <span>Spiritual Guidance</span>
        </div>
        <div className="h-px bg-border max-w-xs mx-auto mb-6" />
        <p className="font-body text-muted-foreground/50 text-xs">
          © {year} Soul Guidance 1313 · All rights reserved
        </p>
        <p className="font-body text-muted-foreground/30 text-xs mt-2">
          Built with ♥ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-muted-foreground/60 transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

// ─── App Root ──────────────────────────────────────────────
export default function App() {
  const [preselectedService, setPreselectedService] = useState("");
  const bookingRef = useRef<HTMLDivElement>(null);

  const handleBookService = (service: string) => {
    setPreselectedService(service);
    // Slight delay to allow state update before scroll
    setTimeout(() => scrollToSection("contact"), 50);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "oklch(0.16 0.03 275)",
            border: "1px solid oklch(0.28 0.04 280)",
            color: "oklch(0.95 0.015 80)",
          },
        }}
      />

      <Navbar />

      <main>
        <HeroSection />
        <ServicesSection onBookService={handleBookService} />
        <AboutSection />
        <div ref={bookingRef}>
          <BookingSection preselectedService={preselectedService} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
