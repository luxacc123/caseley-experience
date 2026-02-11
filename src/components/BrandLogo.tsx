import Link from "next/link";
import Image from "next/image";

interface BrandLogoProps {
  /** "wide" = full logo + subtitle, "mark" = CE icon only, "responsive" = mark on mobile, wide on desktop */
  variant?: "wide" | "mark" | "responsive";
  /** "light" = dark logo on light bg, "dark" = white logo on dark bg */
  theme?: "light" | "dark";
  /** Override height class (Tailwind) */
  className?: string;
}

/**
 * Reusable brand logo.
 * - Links to homepage
 * - aria-label on link, alt on image
 * - No background, no padding, no borders — transparent PNG only
 */
export default function BrandLogo({
  variant = "responsive",
  theme = "light",
  className,
}: BrandLogoProps) {
  const isDark = theme === "dark";

  const wideSrc = isDark ? "/brand/logo-wide-dark.png" : "/brand/logo-wide.png";
  const markSrc = isDark ? "/brand/logo-mark-dark.png" : "/brand/logo-mark.png";

  if (variant === "responsive") {
    return (
      <Link
        href="/"
        aria-label="Naar de homepage"
        className="inline-flex shrink-0 items-center"
      >
        {/* Mobile: mark only */}
        <Image
          src={markSrc}
          alt="Caseley Experience logo"
          width={522}
          height={257}
          priority
          className={`block lg:hidden ${className || "h-9 w-auto"}`}
        />
        {/* Desktop: wide logo */}
        <Image
          src={wideSrc}
          alt="Caseley Experience logo"
          width={1152}
          height={864}
          priority
          className={`hidden lg:block ${className || "h-11 w-auto"}`}
        />
      </Link>
    );
  }

  const src = variant === "mark" ? markSrc : wideSrc;
  const w = variant === "mark" ? 522 : 1152;
  const h = variant === "mark" ? 257 : 864;

  const defaultSize =
    variant === "mark" ? "h-9 w-auto" : "h-11 w-auto";

  return (
    <Link
      href="/"
      aria-label="Naar de homepage"
      className="inline-flex shrink-0 items-center"
    >
      <Image
        src={src}
        alt="Caseley Experience logo"
        width={w}
        height={h}
        priority
        className={`block ${className || defaultSize}`}
      />
    </Link>
  );
}
