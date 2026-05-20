"use client";

import { createContext, useContext, ReactNode } from "react";

export interface SiteSettings {
  businessName?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  hours?: { weekday?: string; saturday?: string; sunday?: string };
  social?: { facebook?: string; instagram?: string; tiktok?: string; google?: string };
  whatsapp?: string;
}

const SiteSettingsContext = createContext<SiteSettings | null>(null);

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}

export function SiteSettingsProvider({ settings, children }: { settings: SiteSettings | null; children: ReactNode }) {
  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}
