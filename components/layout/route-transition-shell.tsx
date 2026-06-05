"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function RouteTransitionShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [routeState, setRouteState] = useState<"idle" | "entering">("idle");

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    if (!shouldReduceMotion) {
      setRouteState("entering");
      const timer = window.setTimeout(() => setRouteState("idle"), 980);

      return () => {
        window.cancelAnimationFrame(frame);
        window.clearTimeout(timer);
      };
    }

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, shouldReduceMotion]);

  return (
    <div
      className="route-transition-shell min-h-screen"
      data-route-state={routeState}
    >
      {children}
      <style jsx global>{`
        @keyframes jisooRouteTextReveal {
          0% {
            opacity: 0;
            filter: blur(5px);
            transform: translate3d(0, 8px, 0) scale(0.996);
          }
          55% {
            opacity: 0.9;
            filter: blur(1.5px);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        .route-transition-shell[data-route-state="entering"]
          main
          :where(
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            p,
            a,
            button,
            label,
            input,
            select,
            textarea,
            form,
            ul,
            ol,
            li,
            small,
            strong,
            [data-page-copy],
            [data-slot="button"]
          ) {
          animation: jisooRouteTextReveal 0.72s cubic-bezier(0.22, 1, 0.36, 1)
            both;
          will-change: opacity, filter, transform;
        }

        .route-transition-shell[data-route-state="entering"]
          main
          :where(a, button, [data-slot="button"]) {
          animation-duration: 0.78s;
          animation-delay: 0.025s;
        }

        .route-transition-shell[data-route-state="entering"]
          main
          :where(input, select, textarea, form) {
          animation-duration: 0.76s;
          animation-delay: 0.035s;
        }

        .route-transition-shell[data-route-state="entering"]
          main
          :where(
            img,
            picture,
            video,
            canvas,
            svg,
            [data-nimg],
            [data-route-media],
            [aria-hidden="true"] img,
            [style*="background-image"]
          ) {
          animation: none !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .route-transition-shell[data-route-state="entering"] main :where(*) {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
