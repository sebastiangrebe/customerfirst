"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AuthTabs } from './auth-tabs';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  redirectUrl?: string;
}

export function AuthDialog({ isOpen, onClose, redirectUrl }: AuthDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Welcome</DialogTitle>
        </DialogHeader>
        <AuthTabs redirectUrl={redirectUrl} />
      </DialogContent>
    </Dialog>
  );
}