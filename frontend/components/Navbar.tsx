import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-900 px-6 py-4">
      <nav className="flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          BOXBOX
        </Link>

        <div className="flex gap-6 text-sm text-zinc-400">
          <Link href="/">Dashboard</Link>
          <Link href="/races">Races</Link>
          <Link href="/drivers">Drivers</Link>
        </div>
      </nav>
    </header>
  );
}