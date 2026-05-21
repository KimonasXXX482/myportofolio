import { createFileRoute } from "@tanstack/react-router";
import { Mail, Github, Linkedin, ArrowUpRight, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Eydokimos Petrakis" },
      { name: "description", content: "Get in touch with Eydokimos Petrakis for full-stack development projects." },
      { property: "og:title", content: "Contact — Eydokimos Petrakis" },
      { property: "og:description", content: "Open for new projects and collaborations." },
    ],
  }),
  component: ContactPage,
});

const RECIPIENT = "hello@example.com";

const channels = [
  { icon: Mail, label: "Email", value: "hello@example.com", href: "mailto:petrakhs.bpl@gmail.com" },
  { icon: Github, label: "GitHub", value: "github.com/eydokimos", href: "https://github.com/KimonasXXX482/" },
  { icon: Linkedin, label: "LinkedIn", value: "Eydokimos Petrakis", href: "https://www.linkedin.com/feed" },
];

function ContactPage() {
  const [username, setUsername] = useState("");
  const [gmail, setGmail] = useState("");
  const [paragraph, setParagraph] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New message from ${username}`);
    const body = encodeURIComponent(`From: ${username} <${gmail}>\n\n${paragraph}`);
    window.location.href = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-6 pt-16 sm:pt-24 pb-24">
      <span className="text-xs uppercase tracking-widest text-mint font-medium">Contact</span>
      <h1 className="mt-3 text-5xl sm:text-7xl font-display font-bold leading-[0.95]">
        Let's build<br />something <span className="text-mint">good.</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
        Have a project in mind, an idea you want to test, or just want to say hi?
        Pick a channel — I usually reply within a day.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-12 p-6 sm:p-8 rounded-2xl bg-surface border border-border/60 space-y-6"
      >
        <div>
          <h2 className="font-display text-2xl font-semibold">Send a message</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Fill in the form and your default mail app will open with your message ready to send.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              required
              maxLength={100}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gmail">Gmail</Label>
            <Input
              id="gmail"
              type="email"
              required
              maxLength={255}
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              placeholder="you@gmail.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="paragraph">Paragraph</Label>
          <Textarea
            id="paragraph"
            required
            maxLength={2000}
            rows={6}
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
            placeholder="Tell me about your project..."
          />
        </div>

        <Button type="submit" className="bg-mint text-background hover:bg-mint/90">
          <Send className="w-4 h-4" />
          Send message
        </Button>
      </form>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {channels.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            className="group p-6 rounded-2xl bg-surface border border-border/60 hover:border-mint/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <c.icon className="w-5 h-5 text-mint" />
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-mint group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
            </div>
            <div className="mt-6 text-sm text-muted-foreground">{c.label}</div>
            <div className="font-display text-lg font-semibold">{c.value}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
