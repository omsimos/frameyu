import Link from "next/link";

export function Footer() {
  return (
    <footer className="text-sm text-muted-foreground text-center mt-24 mb-12">
      <ul className="flex items-center justify-center gap-6 mb-2">
        <li>
          <Link className="hover:underline" href="/terms">
            Terms of Service
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/privacy">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/refund">
            Refund Policy
          </Link>
        </li>
      </ul>

      <p>© 2024 Omsimos. All Rights Reserved</p>
    </footer>
  );
}
