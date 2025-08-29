import React from "react";

export interface DropdownItem {
    icon: React.ReactNode;
    title: string;
    description?: string;
    isEN?: boolean;
    path?: string; // Tıklama fonksiyonu için opsiyonel prop ekleyin
}