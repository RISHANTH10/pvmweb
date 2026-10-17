import AcademicsSection from "@/components/academics/classesA";
import AcademicsHero from "@/components/academics/Herosection";
import CurriculumSection from "@/components/academics/partners";


export default function page(){
    return(
        <>
        <AcademicsHero/>
        <CurriculumSection/>
        <AcademicsSection/>
        </>
    )
}