
import SMCMembers from "@/components/aboutPvm/smc_members"
import PVMHistory from "@/components/aboutPvm/profile"
import LocationSection from "@/components/aboutPvm/location"
import Herosection from "@/components/aboutPvm/herosection"
import InfrastructureSection from "@/components/aboutPvm/infra"
import CorrespondentSection from "@/components/aboutPvm/correspondent"


const page = () => {
  return (
    <>
    <Herosection />
    <CorrespondentSection />
    <SMCMembers />
    <LocationSection />
    <InfrastructureSection />
    
    
    </>
  )
}

export default page