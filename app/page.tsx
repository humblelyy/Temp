import Intro from "@/components/Intro";
import Hero from "@/components/Hero";
import Browser from "@/components/Browser";
import { categories } from "@/lib/wallpapers";

export default function Home() {
  return (
    <>
      <Intro />
      <Hero />
      <Browser categories={categories} />
    </>
  );
}
