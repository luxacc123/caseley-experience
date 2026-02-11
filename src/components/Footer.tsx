import Link from "next/link";
import { contact } from "@/content/contact";

const navItems = [
  { label: "Diensten", href: "/diensten" },
  { label: "Werkwijze", href: "/werkwijze" },
  { label: "Over", href: "/over" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div>
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold">Caseley </span>
              <span className="text-xl font-light">Experience</span>
            </Link>
            <p className="mt-3 text-sm text-white/70">
              Wegtransport door heel Europa
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Navigatie
            </h3>
            <ul className="mt-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>
                <a
                  href={`tel:${contact.phone}`}
                  className="transition-colors hover:text-white"
                >
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-white"
                >
                  {contact.email}
                </a>
              </li>
              <li>{contact.address.street}</li>
              <li>
                {contact.address.postal} {contact.address.city}
              </li>
            </ul>
          </div>

          {/* Column 4: Business details */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Bedrijfsgegevens
            </h3>
            <dl className="mt-4 space-y-1 text-sm text-white/70">
              <div className="flex gap-2">
                <dt className="font-medium text-white/50">KvK:</dt>
                <dd>{contact.kvk}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium text-white/50">BTW:</dt>
                <dd>{contact.btw}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/40">
          &copy; {new Date().getFullYear()} Caseley Experience. Alle rechten
          voorbehouden.
        </div>
      </div>
    </footer>
  );
}
