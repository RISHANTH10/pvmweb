import AnnualPlanner from "@/components/home/annualplanner"
import Classes from "@/components/home/classes"
import GallerySection from "@/components/home/gallerysection"
import Hero from "@/components/home/Herosection"
import MarquueeSchoolName from "@/components/home/marqueeschoolname"
import MottoSection from "@/components/home/motto"
import PvmProvides from "@/components/home/pvmprovides"
import Tesitmonials from "@/components/home/testimonials"
import YoutubevideoSection from "@/components/home/youtubevideos"
import OurMottoHero from "@/components/home/motto"
import InfoGridSection from "@/components/home/about"

function page() {
  return (
    <>
    <Hero/>
    {/* <OurMottoHero
        images={[
          "/images/motto/1.png",
          "/images/motto/2.png",
          "/images/motto/3.png",
          "/images/motto/4.png",
          "/images/motto/5.png",
          "/images/motto/6.png",
          "/images/motto/7.png",
          "/images/motto/8.png",
          "/images/motto/9.png",
          "/images/motto/10.png",
        ]}
      /> */}
    {/* <Classes/> */}
    <AnnualPlanner/>
    <InfoGridSection/>
    <GallerySection/>
    <PvmProvides/>
    
    </>
    

  )
}

export default page