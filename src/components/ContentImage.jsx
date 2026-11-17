import React from 'react';
import { Image } from 'lucide-react';
import { isExternalImageUrl } from '../utils/media';

export default function ContentImage({ src, alt, className = '', placeholderClass = 'aspect-video', compact = false }) {
  if (isExternalImageUrl(src)) {
    return <img src={src} alt={alt} loading="lazy" className={className} />;
  }

  return (
    <div
      role="img"
      aria-label={alt || 'Image not set'}
      className={`${placeholderClass} flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-salama-teal-light via-white to-salama-orange-light text-salama-teal dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 dark:text-slate-400`}
    >
      <span className={`flex items-center justify-center rounded-2xl bg-white/80 text-salama-orange shadow-sm dark:bg-slate-800 ${compact ? 'h-8 w-8' : 'h-14 w-14'}`}>
        <Image className={compact ? 'h-4 w-4' : 'h-7 w-7'} />
      </span>
      {!compact && <span className="px-4 text-center text-xs font-semibold">Image coming soon</span>}
    </div>
  );
}
