import clsx from "clsx";
import { features, featureSequence } from "../constants";
import StudioLights from "./three/StudioLights";
import { Suspense, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import MacbookModel from "./models/Macbook";
import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import useMacbookStore from "../store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Group } from "three";

const ModelScroll = () => {
  const groupRef = useRef<Group>(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const { setTexture } = useMacbookStore();
  const videoCache = useRef<Map<string, HTMLVideoElement>>(new Map());

  useEffect(() => {
    featureSequence.forEach((feature) => {
      const v = document.createElement("video");

      v.addEventListener("error", (e) => {
        const sanitizedPath = feature.videoPath.replace(/[\r\n]/g, "");
        console.warn(`Failed to preload video: ${sanitizedPath}`, e);
      });

      v.addEventListener("canplaythrough", () => {
        videoCache.current.set(feature.videoPath, v);
      });

      Object.assign(v, {
        src: feature.videoPath,
        muted: true,
        playsInline: true,
        preload: "auto",
        crossOrigin: "anonymous",
      });
      
      v.load();
    });

    return () => {
      videoCache.current.clear();
    };
  }, []);

  useGSAP(() => {
    const modelTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#f-canvas",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true,
      },
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#f-canvas",
        start: "top center",
        end: "bottom top",
        scrub: 1,
      },
    });

    if (groupRef.current) {
      modelTimeline.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        ease: "power1.inOut",
      });
    }

    timeline
      .call(() => {
        const video = videoCache.current.get("/videos/feature-1.mp4");
        if (video) setTexture("/videos/feature-1.mp4");
      })
      .to(".box1", { opacity: 1, y: 0, delay: 1 })

      .call(() => {
        const video = videoCache.current.get("/videos/feature-2.mp4");
        if (video) setTexture("/videos/feature-2.mp4");
      })
      .to(".box2", { opacity: 1, y: 0 })

      .call(() => {
        const video = videoCache.current.get("/videos/feature-3.mp4");
        if (video) setTexture("/videos/feature-3.mp4");
      })
      .to(".box3", { opacity: 1, y: 0 })

      .call(() => {
        const video = videoCache.current.get("/videos/feature-4.mp4");
        if (video) setTexture("/videos/feature-4.mp4");
      })
      .to(".box4", { opacity: 1, y: 0 })

      .call(() => {
        const video = videoCache.current.get("/videos/feature-5.mp4");
        if (video) setTexture("/videos/feature-5.mp4");
      })
      .to(".box5", { opacity: 1, y: 0 });
  }, [setTexture]);

  return (
    <group ref={groupRef}>
      <Suspense
        fallback={
          <Html>
            <h1 className="text-white text-3xl uppercase">Loading...</h1>
          </Html>
        }
      >
        <MacbookModel scale={isMobile ? 0.04 : 0.07} position={[0, -1, 0]} />
      </Suspense>
    </group>
  );
};

const Features = () => {
  return (
    <section id="features">
      <h2>See it all in a new light.</h2>

      <Canvas id="f-canvas">
        <StudioLights />
        <ambientLight />
        <ModelScroll />
      </Canvas>

      <div className="absolute inset-0">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={clsx("box", `box${index + 1}`, feature.styles)}
          >
            <img src={feature.icon} alt={feature.highlight} />

            <p>
              <span className="text-white">{feature.highlight}</span>
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
