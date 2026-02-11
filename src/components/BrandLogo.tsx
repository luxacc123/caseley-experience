import Link from "next/link";
import Image from "next/image";

interface BrandLogoProps {
  /** "wide" shows full logo with subtitle, "compact" shows just the CE mark */
  variant?: "wide" | "compact";
  /** Render context — controls inversion for dark backgrounds */
  theme?: "light" | "dark" | "auto";
  /** Override height class (Tailwind). Defaults per variant. */
  className?: string;
}

/**
 * Reusable brand logo component.
 * - Links to homepage
 * - Accessible: aria-label on link, decorative alt on image
 * - Responsive: compact on mobile, wide on desktop (when variant="auto")
 * - Dark-mode: uses CSS invert filter on dark backgrounds
 */
export default function BrandLogo({
  variant = "wide",
  theme = "auto",
  className,
}: BrandLogoProps) {
  const src = "/logo-caseley-experience.png";

  // Determine filter classes for dark backgrounds
  const invertClass =
    theme === "dark"
      ? "brightness-0 invert"
      : theme === "auto"
        ? "dark:brightness-0 dark:invert"
        : "";

  // Default sizing per variant
  const defaultSizing =
    variant === "compact"
      ? "h-7 w-auto"
      : "h-8 w-auto lg:h-10";

  const sizeClass = className || defaultSizing;

  return (
    <Link
      href="/"
      aria-label="Naar de homepage"
      className="inline-flex shrink-0 items-center"
    >
      <Image
        src={src}
        alt="Caseley Experience logo"
        width={1152}
        height={864}
        priority={variant === "wide"}
        className={`${sizeClass} ${invertClass}`.trim()}
      />
    </Link>
  );
}
