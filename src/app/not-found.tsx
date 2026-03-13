import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
      <p className="text-xl text-muted-foreground">Page not found</p>
      <Link
        href="/"
        className="rounded-md bg-primary px-6 py-2 text-primary-foreground hover:opacity-90"
      >
        Go Home
      </Link>
    </div>
  );
}
