import { HeroSection } from '../components/home/HeroSection'
import { StatsRow } from '../components/home/StatsRow'
import { ServicesBento } from '../components/home/ServicesBento'
import { TeamSection } from '../components/home/TeamSection'
import { ProjectsShowcase } from '../components/home/ProjectsShowcase'
import { CTAStrip } from '../components/home/CTAStrip'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsRow />
      <ServicesBento />
      <TeamSection />
      <ProjectsShowcase />
      <CTAStrip />
    </>
  )
}
