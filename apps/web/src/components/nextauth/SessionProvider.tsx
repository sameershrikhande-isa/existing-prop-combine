"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function SessionProviderComp({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: any;
}) {
  return (
    <>
      <SessionProvider session={session}>{children}</SessionProvider>
    </>
  );
}
