export function Footer() {
  return (
    <footer className="border-t border-border/40 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Eydokimos Petrakis. Crafted with care.</p>
        <p className="hidden">Working with 2GreekDevs</p>
      </div>
    </footer>
  );
}
