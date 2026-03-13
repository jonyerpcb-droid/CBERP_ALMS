"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Sidebar } from "./sidebar";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button onClick={() => setOpen(true)} className="rounded-md p-2 hover:bg-accent">
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-50 w-64 animate-slide-in">
            <div className="relative h-full">
              <button
                onClick={() => setOpen(false)}
                className="absolute right-2 top-4 z-10 rounded-full p-1 hover:bg-accent"
              >
                <X className="h-5 w-5" />
              </button>
              <Sidebar />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
