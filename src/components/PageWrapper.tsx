import React from "react";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto my-4 max-w-7xl px-4 py-2 md:px-8 md:py-4">
      {children}
    </main>
  );
}
