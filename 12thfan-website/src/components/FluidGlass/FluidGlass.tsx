/* eslint-disable react/no-unknown-property */
"use client";

import * as THREE from "three";
import { useRef, useState, useEffect, memo, Suspense } from "react";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import {
  useFBO,
  useGLTF,
  useScroll,
  Image,
  Scroll,
  Preload,
  ScrollControls,
  MeshTransmissionMaterial,
  Text,
} from "@react-three/drei";
import { easing } from "maath";

export type FluidGlassMode = "lens" | "bar" | "cube";

export type FluidGlassNavItem = { label: string; link: string };

export interface FluidGlassProps {
  mode?: FluidGlassMode;
  lensProps?: Record<string, unknown> & { navItems?: FluidGlassNavItem[] };
  barProps?: Record<string, unknown> & { navItems?: FluidGlassNavItem[] };
  cubeProps?: Record<string, unknown> & { navItems?: FluidGlassNavItem[] };
  className?: string;
  titleText?: string;
}

export default function FluidGlass({
  mode = "lens",
  lensProps = {},
  barProps = {},
  cubeProps = {},
  className,
  titleText = "12TH FAN",
}: FluidGlassProps) {
  const Wrapper = mode === "bar" ? Bar : mode === "cube" ? Cube : Lens;
  const rawOverrides =
    mode === "bar" ? barProps : mode === "cube" ? cubeProps : lensProps;

  const {
    navItems = [
      { label: "Home", link: "" },
      { label: "About", link: "" },
      { label: "Contact", link: "" },
    ],
    ...modeProps
  } = rawOverrides as {
    navItems?: FluidGlassNavItem[];
    [k: string]: unknown;
  };

  return (
    <div className={className ?? "h-full min-h-[600px] w-full"}>
      <Canvas
        className="h-full w-full touch-none"
        style={{ height: "100%", width: "100%" }}
        camera={{ position: [0, 0, 20], fov: 15 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <ScrollControls damping={0.2} pages={3} distance={0.4}>
            {mode === "bar" && <NavItems items={navItems} />}
            <Wrapper modeProps={modeProps}>
              <Scroll>
                {titleText ? <Typography titleText={titleText} /> : null}
                <Images />
              </Scroll>
              <Preload />
            </Wrapper>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  glb,
  geometryKey,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  ...props
}: {
  children?: React.ReactNode;
  glb: string;
  geometryKey: string;
  lockToBottom?: boolean;
  followPointer?: boolean;
  modeProps?: Record<string, unknown>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const { nodes } = useGLTF(glb);
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const geoWidthRef = useRef(1);

  useEffect(() => {
    const geo = (nodes[geometryKey] as THREE.Mesh | undefined)?.geometry;
    if (!geo) return;
    geo.computeBoundingBox();
    const box = geo.boundingBox;
    geoWidthRef.current = box ? box.max.x - box.min.x || 1 : 1;
  }, [nodes, geometryKey]);

  useFrame((state, delta) => {
    const mesh = ref.current;
    if (!mesh) return;

    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
    const destY = lockToBottom
      ? -v.height / 2 + 0.2
      : followPointer
        ? (pointer.y * v.height) / 2
        : 0;
    easing.damp3(mesh.position, [destX, destY, 15], 0.15, delta);

    if (modeProps.scale == null) {
      const maxWorld = v.width * 0.9;
      const desired = maxWorld / geoWidthRef.current;
      mesh.scale.setScalar(Math.min(0.15, desired));
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    gl.setClearColor(0x000000, 0);
  });

  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } =
    modeProps;

  const geom = (nodes[geometryKey] as THREE.Mesh | undefined)?.geometry;

  return (
    <>
      {createPortal(children as React.ReactNode, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      {geom ? (
        <mesh
          ref={ref}
          scale={(scale as number) ?? 0.15}
          rotation-x={Math.PI / 2}
          geometry={geom}
          {...props}
        >
          <MeshTransmissionMaterial
            buffer={buffer.texture}
            ior={(ior as number) ?? 1.15}
            thickness={(thickness as number) ?? 5}
            anisotropy={(anisotropy as number) ?? 0.01}
            chromaticAberration={(chromaticAberration as number) ?? 0.1}
            {...(extraMat as Record<string, unknown>)}
          />
        </mesh>
      ) : null}
    </>
  );
});

function Lens({
  modeProps,
  ...p
}: {
  modeProps?: Record<string, unknown>;
  children?: React.ReactNode;
}) {
  return (
    <ModeWrapper
      glb="/assets/3d/lens.glb"
      geometryKey="Cylinder"
      followPointer
      modeProps={modeProps}
      {...p}
    />
  );
}

function Cube({
  modeProps,
  ...p
}: {
  modeProps?: Record<string, unknown>;
  children?: React.ReactNode;
}) {
  return (
    <ModeWrapper
      glb="/assets/3d/cube.glb"
      geometryKey="Cube"
      followPointer
      modeProps={modeProps}
      {...p}
    />
  );
}

function Bar({
  modeProps = {},
  ...p
}: {
  modeProps?: Record<string, unknown>;
  children?: React.ReactNode;
}) {
  const defaultMat = {
    transmission: 1,
    roughness: 0,
    thickness: 10,
    ior: 1.15,
    color: "#ffffff",
    attenuationColor: "#ffffff",
    attenuationDistance: 0.25,
  };

  return (
    <ModeWrapper
      glb="/assets/3d/bar.glb"
      geometryKey="Cube"
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
      {...p}
    />
  );
}

function NavItems({ items }: { items: FluidGlassNavItem[] }) {
  const group = useRef<THREE.Group>(null);
  const { viewport, camera } = useThree();

  const DEVICE = {
    mobile: { max: 639, spacing: 0.2, fontSize: 0.035 },
    tablet: { max: 1023, spacing: 0.24, fontSize: 0.035 },
    desktop: { max: Infinity, spacing: 0.3, fontSize: 0.035 },
  };
  const [device, setDevice] = useState<keyof typeof DEVICE>(() => {
    const w = window.innerWidth;
    if (w <= DEVICE.mobile.max) return "mobile";
    if (w <= DEVICE.tablet.max) return "tablet";
    return "desktop";
  });

  useEffect(() => {
    const onResize = () =>
      setDevice(
        window.innerWidth <= DEVICE.mobile.max
          ? "mobile"
          : window.innerWidth <= DEVICE.tablet.max
            ? "tablet"
            : "desktop",
      );
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { spacing, fontSize } = DEVICE[device];

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    g.position.set(0, -v.height / 2 + 0.2, 15.1);

    g.children.forEach((child, i) => {
      child.position.x = (i - (items.length - 1) / 2) * spacing;
    });
  });

  const handleNavigate = (link: string) => {
    if (!link) return;
    if (link.startsWith("#")) window.location.hash = link;
    else window.location.href = link;
  };

  return (
    <group ref={group} renderOrder={10}>
      {items.map(({ label, link }) => (
        <Text
          key={label}
          fontSize={fontSize}
          color="white"
          anchorX="center"
          anchorY="middle"
          renderOrder={10}
          onClick={(e) => {
            e.stopPropagation();
            handleNavigate(link);
          }}
          onPointerOver={() => {
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto";
          }}
        >
          {label}
        </Text>
      ))}
    </group>
  );
}

function Images() {
  const group = useRef<THREE.Group>(null);
  const data = useScroll();
  const { height } = useThree((s) => s.viewport);

  useFrame(() => {
    const g = group.current;
    if (!g || g.children.length < 5) return;
    type ZoomMat = THREE.Material & { zoom?: number };
    const mats = g.children.map((ch) => (ch as THREE.Mesh).material as ZoomMat);
    mats[0].zoom = 1 + data.range(0, 1 / 3) / 3;
    mats[1].zoom = 1 + data.range(0, 1 / 3) / 3;
    mats[2].zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
    mats[3].zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
    mats[4].zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
  });

  return (
    <group ref={group}>
      <Image position={[-2, 0, 0]} scale={[3, height / 1.1]} url="/assets/demo/cs1.webp" />
      <Image position={[2, 0, 3]} scale={3} url="/assets/demo/cs2.webp" />
      <Image position={[-2.05, -height, 6]} scale={[1, 3]} url="/assets/demo/cs3.webp" />
      <Image position={[-0.6, -height, 9]} scale={[1, 2]} url="/assets/demo/cs1.webp" />
      <Image position={[0.75, -height, 10.5]} scale={1.5} url="/assets/demo/cs2.webp" />
    </group>
  );
}

function Typography({ titleText }: { titleText: string }) {
  const DEVICE = {
    mobile: { fontSize: 0.2 },
    tablet: { fontSize: 0.4 },
    desktop: { fontSize: 0.6 },
  };
  const getDevice = () => {
    const w = window.innerWidth;
    return w <= 639 ? "mobile" : w <= 1023 ? "tablet" : "desktop";
  };

  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">(() => {
    const w = window.innerWidth;
    return w <= 639 ? "mobile" : w <= 1023 ? "tablet" : "desktop";
  });

  useEffect(() => {
    const onResize = () =>
      setDevice(
        window.innerWidth <= 639
          ? "mobile"
          : window.innerWidth <= 1023
            ? "tablet"
            : "desktop",
      );
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { fontSize } = DEVICE[device];

  return (
    <Text
      position={[0, 0, 12]}
      fontSize={fontSize}
      letterSpacing={-0.05}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      {titleText}
    </Text>
  );
}

