'use client';

import { X, CreditCard, ShieldOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { ApplyBlockReason } from '@/hooks/useJobsListing';

interface ApplyBlockModalProps {
    reason: ApplyBlockReason;
    onClose: () => void;
}

const CONTENT = {
    payment: {
        icon: CreditCard,
        iconBg: 'bg-green-50 text-green-600 border-green-200',
        title: 'Registration Fee Required',
        body: 'To apply for jobs, please complete your one-time registration payment. Contact our support team on WhatsApp to proceed.',
        cta: 'Message on WhatsApp',
        ctaHref: 'https://wa.me/919207543772?text=Hi%2C%20I%20would%20like%20to%20complete%20my%20registration%20to%20start%20applying%20for%20jobs.',
        ctaClass: 'bg-green-500 hover:bg-green-600 text-white',
    },
    inactive: {
        icon: ShieldOff,
        iconBg: 'bg-red-50 text-red-600 border-red-200',
        title: 'Account Deactivated',
        body: 'Your account has been deactivated by an admin. Please contact our support team to reinstate your account.',
        cta: 'Contact Support',
        ctaHref: 'mailto:support@jobmate.in',
        ctaClass: 'bg-red-500 hover:bg-red-600 text-white',
    },
} satisfies Record<NonNullable<ApplyBlockReason>, unknown>;

export function ApplyBlockModal({ reason, onClose }: ApplyBlockModalProps) {
    const router = useRouter();

    if (!reason) return null;

    const { icon: Icon, iconBg, title, body, cta, ctaHref, ctaClass } = CONTENT[reason];

    const handleCta = () => {
        onClose();
        if (ctaHref.startsWith('http') || ctaHref.startsWith('mailto')) {
            window.open(ctaHref, '_blank');
        } else {
            router.push(ctaHref);
        }
    };

    return (
        /* Backdrop */
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            {/* Card */}
            <div
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 flex flex-col items-center text-center gap-5 animate-[fadeInUp_0.2s_ease]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-muted hover:bg-background transition-colors"
                >
                    <X size={16} />
                </button>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center ${iconBg}`}>
                    <Icon size={28} />
                </div>

                {/* Text */}
                <div className="space-y-2">
                    <h2 className="font-display font-bold text-xl text-foreground">{title}</h2>
                    <p className="text-[14px] text-muted leading-relaxed">{body}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 w-full pt-1">
                    <button
                        onClick={handleCta}
                        className={`w-full py-2.5 rounded-xl font-semibold text-[14px] transition-colors ${ctaClass}`}
                    >
                        {cta}
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full py-2.5 rounded-xl font-semibold text-[14px] text-muted hover:text-foreground hover:bg-background transition-colors"
                    >
                        Maybe later
                    </button>
                </div>
            </div>
        </div>
    );
}
