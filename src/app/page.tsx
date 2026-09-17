import { CinematicIntro } from "@/components/home/CinematicIntro";
import { Hero } from "@/components/home/Hero";
import { EnterTheWorld } from "@/components/home/EnterTheWorld";
import { CollectionShowcase } from "@/components/home/CollectionShowcase";
import { BeyondTheGarment } from "@/components/home/BeyondTheGarment";
import { BuildYourPresence } from "@/components/home/BuildYourPresence";

export default function Home() {
  return (
    <>
      <CinematicIntro />
      <Hero />
      <EnterTheWorld />
      <CollectionShowcase />
      <BeyondTheGarment />
      <BuildYourPresence />
    </>
  );
}
