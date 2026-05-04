"use client";

import gsap from "gsap";
import {
  Children,
  createRef,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

import "./CardSwap.css";

/** Applied to whichever card index is at the front of the stack (see syncFrontGlow). */
export const CARD_SWAP_FRONT_CLASS = "card-swap--front";

export type CardSwapEasing = "linear" | "elastic";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  customClass?: string;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, className, ...rest }, ref) => (
  <div ref={ref} {...rest} className={cn("card", customClass, className)} />
));
Card.displayName = "Card";

const makeSlot = (i: number, distX: number, distY: number, total: number) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

function placeNow(
  el: HTMLDivElement | null,
  slot: ReturnType<typeof makeSlot>,
  skew: number,
) {
  if (!el) return;
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });
}

export type CardSwapProps = {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: CardSwapEasing;
  containerClassName?: string;
  children: ReactNode;
};

export default function CardSwap({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  containerClassName,
  children,
}: CardSwapProps) {
  const config =
    easing === "elastic" ?
      {
        ease: "elastic.out(0.6,0.9)",
        durDrop: 2,
        durMove: 2,
        durReturn: 2,
        promoteOverlap: 0.9,
        returnDelay: 0.05,
      }
    : {
        ease: "power1.inOut",
        durDrop: 0.8,
        durMove: 0.8,
        durReturn: 0.8,
        promoteOverlap: 0.45,
        returnDelay: 0.2,
      };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => createRef<HTMLDivElement | null>()),
    [childArr.length],
  );

  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    order.current = Array.from({ length: refs.length }, (_, i) => i);

    const total = refs.length;

    const syncFrontGlow = () => {
      const frontIdx = order.current[0];
      refs.forEach((r, idx) => {
        const el = r.current;
        if (!el) return;
        el.classList.toggle(CARD_SWAP_FRONT_CLASS, idx === frontIdx);
      });
    };

    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));
    syncFrontGlow();

    const swap = () => {
      if (order.current.length < 2) return;

      refs.forEach((r) => r.current?.classList.remove(CARD_SWAP_FRONT_CLASS));

      const [front, ...rest] = order.current;
      const elFront = refs[front]?.current;
      if (!elFront) return;

      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx]?.current;
        if (!el) return;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`,
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return",
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return",
      );

      tl.call(() => {
        order.current = [...rest, front];
        syncFrontGlow();
      });
    };

    swap();
    intervalRef.current = setInterval(swap, delay);

    const cleanupTimers = () => {
      clearInterval(intervalRef.current);
      tlRef.current?.kill();
      tlRef.current = null;
    };

    if (pauseOnHover && container.current) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = setInterval(swap, delay);
      };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        cleanupTimers();
      };
    }

    return cleanupTimers;
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, childArr.length, width, height]);

  const dimensionStyle: CSSProperties =
    typeof width === "number" && typeof height === "number" ?
      { width: `${width}px`, height: `${height}px` }
    : { width: width as CSSProperties["width"], height: height as CSSProperties["height"] };

  const rendered = childArr.map((child, i) => {
    if (!isValidElement(child)) return child;

    const props = child.props as CardProps;
    const mergedStyle: CSSProperties = {
      ...dimensionStyle,
      ...(typeof props.style === "object" && props.style !== null ? props.style : {}),
    };

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
      props.onClick?.(e);
      onCardClick?.(i);
    };

    return <Card key={i} ref={refs[i]} {...props} style={mergedStyle} onClick={handleClick} />;
  });

  return (
    <div
      ref={container}
      className={cn("card-swap-container", containerClassName)}
      style={dimensionStyle}
    >
      {rendered}
    </div>
  );
}
