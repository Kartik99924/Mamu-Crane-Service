import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export type Crumb = { name: string; path: string };

/**
 * Visible breadcrumb trail. The matching BreadcrumbList JSON-LD is emitted
 * separately by each page so the two always describe the same trail.
 */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[0.8rem]">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-muted">
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight aria-hidden="true" className="size-3.5 text-steel-light" />}
              {isLast ? (
                <span aria-current="page" className="text-bone-dim">
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.path} className="transition-colors hover:text-crane">
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
