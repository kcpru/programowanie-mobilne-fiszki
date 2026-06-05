import { Button } from './Button';
import { X } from 'lucide-react';

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
};

export function ConfirmModal({ isOpen, onClose, onConfirm, title, description }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surfaceContainer-light dark:bg-surfaceContainer-dark w-full max-w-sm rounded-3xl p-6 shadow-xl border border-outlineVariant-light dark:border-outlineVariant-dark">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <Button
            variant="text"
            onClick={onClose}
            className="p-2 w-10 h-10 rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <p className="text-onSurfaceVariant-light dark:text-onSurfaceVariant-dark mb-6">
          {description}
        </p>

        <div className="flex justify-end gap-4">
          <Button variant="text" onClick={onClose}>
            Anuluj
          </Button>
          <Button variant="filled" onClick={onConfirm}>
            Potwierdź
          </Button>
        </div>
      </div>
    </div>
  );
}
