import React from "react";

/**
 * Editorial design system layout components and token wrappers.
 * Standardizes max width (1200px), responsive padding (56px/32px/20px),
 * section spacing (104px/76px/56px), major radius (22px), and control radius (12px).
 */

export interface EditorialContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function EditorialContainer({ children, className = "", ...props }: EditorialContainerProps) {
  return (
    <div
      className={`mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-[56px] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export interface EditorialSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function EditorialSection({ children, className = "", id, ...props }: EditorialSectionProps) {
  return (
    <section
      id={id}
      className={`py-[56px] md:py-[76px] lg:py-[104px] ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}

export interface SectionIntroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionIntro({ eyebrow, title, description, align = "center", className = "" }: SectionIntroProps) {
  const alignClasses = align === "left" ? "text-left" : "text-center mx-auto";

  return (
    <div className={`max-w-3xl space-y-3 ${alignClasses} ${className}`}>
      {eyebrow && (
        <span className="inline-block text-xs font-mono uppercase tracking-widest text-purple-700 bg-purple-50 border border-purple-200/80 px-3 py-1 rounded-[12px] font-semibold">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

export interface SplitSectionProps {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
  reverseOnMobile?: boolean;
}

export function SplitSection({ left, right, className = "", reverseOnMobile = false }: SplitSectionProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${
        reverseOnMobile ? "flex flex-col-reverse md:grid" : ""
      } ${className}`}
    >
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

export function ThinSeparator({ className = "" }: { className?: string }) {
  return <hr className={`border-t border-slate-200/80 my-0 ${className}`} />;
}

export interface BorderlessRowProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  action?: React.ReactNode;
  className?: string;
}

export function BorderlessRow({ title, description, icon: Icon, badge, action, className = "" }: BorderlessRowProps) {
  return (
    <div className={`py-6 border-b border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors hover:bg-slate-50/50 px-2 rounded-[12px] ${className}`}>
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="w-10 h-10 rounded-[12px] bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0 mt-0.5">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">{title}</h3>
            {badge && (
              <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded-[12px] border border-purple-200 font-semibold uppercase">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">{description}</p>
        </div>
      </div>
      {action && <div className="shrink-0 min-h-[44px] flex items-center">{action}</div>}
    </div>
  );
}

export interface EditorialColumnsProps {
  children: React.ReactNode;
  cols?: 2 | 3 | 4;
  className?: string;
}

export function EditorialColumns({ children, cols = 3, className = "" }: EditorialColumnsProps) {
  const colMap = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return <div className={`grid ${colMap[cols]} gap-8 ${className}`}>{children}</div>;
}

export interface TimelineItem {
  number: string;
  title: string;
  description: string;
}

export function EditorialTimeline({ items, className = "" }: { items: TimelineItem[]; className?: string }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 ${className}`}>
      {items.map((item) => (
        <div
          key={item.number}
          className="border-l-2 border-purple-600 pl-4 py-2 space-y-2 group hover:border-purple-800 transition-colors"
        >
          <span className="text-xs font-mono font-bold text-purple-700 block">{item.number}</span>
          <h3 className="text-base font-bold text-slate-900 leading-snug">{item.title}</h3>
          <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
