import { useEffect, useState, type FormEvent } from "react";
import { Star, Send, Loader2, Trash2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

type Feedback = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
};

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80, "Name is too long"),
  rating: z.number().int().min(1, "Please choose a rating").max(5),
  comment: z
    .string()
    .trim()
    .min(1, "Comment cannot be empty")
    .max(1000, "Comment must be under 1000 characters"),
});

export function FeedbackSection() {
  const [items, setItems] = useState<Feedback[]>([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { isAdmin } = useAuth();

  const removeItem = async (id: string) => {
    if (!confirm("Delete this comment?")) return;
    const { error } = await supabase.from("feedbacks").delete().eq("id", id);
    if (error) return toast.error("Could not delete.");
    setItems((prev) => prev.filter((f) => f.id !== id));
    toast.success("Comment deleted");
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data, error } = await supabase
        .from("feedbacks")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(12);
      if (mounted) {
        if (!error && data) setItems(data as Feedback[]);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ name, comment, rating });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setSubmitting(true);
    const { data, error } = await supabase
      .from("feedbacks")
      .insert(parsed.data)
      .select()
      .single();
    setSubmitting(false);
    if (error) {
      toast.error("Could not submit feedback. Try again.");
      return;
    }
    setItems((prev) => [data as Feedback, ...prev].slice(0, 12));
    setName("");
    setComment("");
    setRating(0);
    toast.success("Thanks for the feedback!");
  };

  const avg =
    items.length > 0
      ? (items.reduce((s, i) => s + i.rating, 0) / items.length).toFixed(1)
      : null;

  return (
    <section className="mt-24 sm:mt-32">
      <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
        <div>
          <span className="text-xs uppercase tracking-widest text-mint font-medium">
            Visitor feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mt-2">
            Leave a comment & rating
          </h2>
        </div>
        {avg && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(Number(avg))
                      ? "fill-mint text-mint"
                      : "text-muted-foreground/40"
                  }`}
                />
              ))}
            </div>
            <span>
              {avg} avg · {items.length} {items.length === 1 ? "review" : "reviews"}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Form */}
        <form
          onSubmit={submit}
          className="lg:col-span-2 p-6 rounded-2xl bg-surface border border-border/60 flex flex-col gap-4"
        >
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Your name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={80}
              placeholder="Jane Doe"
              className="mt-2 w-full bg-muted/40 border border-border/40 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint/60 transition-colors"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Rating
            </label>
            <div className="mt-2 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => {
                const active = n <= (hover || rating);
                return (
                  <button
                    key={n}
                    type="button"
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(n)}
                    aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        active
                          ? "fill-mint text-mint"
                          : "text-muted-foreground/40"
                      }`}
                    />
                  </button>
                );
              })}
              {rating > 0 && (
                <span className="ml-2 text-sm text-muted-foreground">
                  {rating}/5
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={1000}
              rows={4}
              placeholder="Tell me what you think…"
              className="mt-2 w-full bg-muted/40 border border-border/40 rounded-lg px-3 py-2 text-sm outline-none focus:border-mint/60 transition-colors resize-none"
            />
            <div className="mt-1 text-xs text-muted-foreground text-right">
              {comment.length}/1000
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[image:var(--gradient-mint)] text-primary-foreground font-medium hover:shadow-[var(--shadow-glow)] transition-shadow disabled:opacity-60"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Submit feedback
          </button>
        </form>

        {/* List */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
          {loading ? (
            <div className="sm:col-span-2 p-8 rounded-2xl bg-surface border border-border/60 text-muted-foreground text-sm">
              Loading feedback…
            </div>
          ) : items.length === 0 ? (
            <div className="sm:col-span-2 p-8 rounded-2xl bg-surface border border-border/60 text-muted-foreground text-sm">
              No feedback yet — be the first to leave one.
            </div>
          ) : (
            items.map((f) => (
              <article
                key={f.id}
                className="p-5 rounded-2xl bg-surface border border-border/60 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="font-display font-semibold">{f.name}</div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < f.rating
                            ? "fill-mint text-mint"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap break-words">
                  {f.comment}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground/70">
                    {new Date(f.created_at).toLocaleDateString()}
                  </div>
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => removeItem(f.id)}
                      className="inline-flex items-center gap-1 text-xs text-destructive hover:opacity-80 transition-opacity"
                      aria-label="Delete comment"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
