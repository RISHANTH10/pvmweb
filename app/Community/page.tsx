import AlumniSection from "@/components/community/alumini"
import Herosection from "@/components/community/herosection"
import YoutubevideoSection from "@/components/home/youtubevideos"
import TeachersList from "@/components/ourfaculty/teachers"
import TeachersExpression from "@/components/ourfaculty/teachersexpression"
import { Teachers } from "next/font/google"



const page = () => {
  return (
    <>
    <Herosection/>
    <AlumniSection/>
    <YoutubevideoSection/>
    <TeachersExpression/>
    <TeachersList/>
   
    </>
  )
}

export default page