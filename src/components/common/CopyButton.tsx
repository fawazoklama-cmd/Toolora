import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'subtle';
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  label = 'Salin',
  className = '',
  variant = 'secondary',
}) => {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast('Teks berhasil disalin ke papan klip!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Gagal menyalin teks.', 'error');
    }
  };

  const variantStyles = {
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white border-transparent shadow-xs',
    secondary:
      'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 shadow-2xs',
    subtle:
      'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border-transparent',
  }[variant];

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={!text}
      aria-label={label}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shrink-0 cursor-pointer ${variantStyles} ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>Tersalin!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 shrink-0" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
