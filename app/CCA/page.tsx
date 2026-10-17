import Clubs from "@/components/cca/club"
import EventPanels from "@/components/cca/EventPanels"
import FestivalsSection from "@/components/cca/Festivalssection"
import CCAHero from "@/components/cca/herosection"
import Houses from "@/components/cca/houses"

const page = () => {
  return (
    <>
    <CCAHero />
    <Clubs />
    <FestivalsSection />
    <EventPanels />
    </>
  )
}

export default page