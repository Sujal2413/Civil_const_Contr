import BuildingsPage from "@/components/BuildingsPage";
import { NavBarDemo } from "@/components/NavBarDemo";
import { homeContent } from "@/lib/content";

export default function Home() {
  return (
    <>
      <NavBarDemo />
      <BuildingsPage content={homeContent} />
    </>
  );
}
