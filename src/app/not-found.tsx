import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-bold">404 – Page Not Found</h1>
      <p className="text-muted-foreground mb-8 text-lg">
        The page you are looking for does not exist.
      </p>
      <Link href="/" className="text-primary underline">
        To the journal
      </Link>
    </div>
  );
}
