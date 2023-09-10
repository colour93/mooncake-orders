"use client";

import { UserHeaderContext } from "@/contexts/UserHeaderContext";
import React from "react";
import { useState } from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [header, setHeader] = useState<string | null>(null);

  return (
    <UserHeaderContext.Provider value={{ header, setHeader }}>
      <header className="p-6 shadow-sm bg-white font-bold text-xl">{header}</header>
      {children}
    </UserHeaderContext.Provider>
  );
}
