import { navigate } from "../App";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1 text-sm text-charcoal-light flex-wrap">
        <li>
          <button onClick={() => navigate("/")} className="hover:text-leaf transition-colors">Home</button>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            {item.path ? (
              <button onClick={() => navigate(item.path!)} className="hover:text-leaf transition-colors">{item.label}</button>
            ) : (
              <span className="text-charcoal font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
