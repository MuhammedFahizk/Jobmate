import { ArrowRight } from "lucide-react";

interface LoadingButtonProps {
  isSubmitting: boolean;
  defaultText: string;
  loadingText: string;
}

export function LoadingButton({ isSubmitting, defaultText, loadingText }: LoadingButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full mt-4 font-body font-medium bg-primary-500 hover:bg-primary-700 disabled:bg-primary-500/70 text-white py-3 rounded-xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5"
    >
      {isSubmitting ? (
        <>
          <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          <span>{defaultText}</span>
          <ArrowRight size={16} />
        </>
      )}
    </button>
  );
}
