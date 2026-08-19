import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-56 border-r border-zinc-800 bg-zinc-900 p-4">
      <nav className="flex flex-col gap-2">
        <Link
          href="/"
          className="rounded-md px-4 py-3 text-zinc-400 hover:bg-zinc-800 hover:text-white"
        >
          Dashboard
        </Link>

        <Link
          href="/races"
          className="rounded-md px-4 py-3 text-zinc-400 hover:bg-zinc-800 hover:text-white"
        >
          Races
        </Link>

        <Link
          href="/drivers"
          className="rounded-md px-4 py-3 text-zinc-400 hover:bg-zinc-800 hover:text-white"
        >
          Drivers
        </Link>
      </nav>
    </aside>
  );
}