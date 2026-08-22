'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  readonly label: string;
  readonly value: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: readonly Option[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  variant?: 'default' | 'ghost';
  icon?: React.ReactNode;
}

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  className = '',
  disabled = false,
  variant = 'default',
  icon,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-full flex items-center justify-between gap-2 px-3 py-2.5 text-[13px] text-foreground focus:outline-none transition-colors ${
          variant === 'default'
            ? 'bg-white border border-border rounded-lg focus:border-primary-500'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span className={selectedOption ? 'text-foreground truncate' : 'text-muted truncate'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          size={16}
          className={`text-muted transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-[100] top-[calc(100%+4px)] left-0 w-full min-w-[200px] bg-white border border-border rounded-lg shadow-xl overflow-hidden py-1 max-h-60 overflow-y-auto custom-scrollbar"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-left text-[13px] hover:bg-primary-50 transition-colors ${
                  value === option.value ? 'bg-primary-50/50 text-primary-700 font-medium' : 'text-foreground'
                }`}
              >
                <span className="truncate">{option.label}</span>
                {value === option.value && <Check size={14} className="text-primary-600 flex-shrink-0" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
