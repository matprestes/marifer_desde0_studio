import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  kicker: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  rightSlot?: React.ReactNode;
  className?: string;
}

export function SectionHeader({
  kicker,
  title,
  subtitle,
  icon,
  rightSlot,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row sm:items-end justify-between gap-space-sm mb-space-lg',
        className
      )}
    >
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-space-xs text-secondary">
          {icon}
          <span className="font-label-md text-label-md uppercase tracking-widest">
            {kicker}
          </span>
        </div>
        <h2 className="font-headline-lg-mobile lg:font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-primary tracking-tight mt-0.5">
          {title}
        </h2>
        {subtitle ? (
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
            {subtitle}
          </p>
        ) : null}
      </div>

      {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
    </div>
  );
}
