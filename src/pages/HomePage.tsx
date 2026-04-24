import { HeroSection } from '../components/home/HeroSection'
import { StatsRow } from '../components/home/StatsRow'
import { ServicesBento } from '../components/home/ServicesBento'
import { ProjectsShowcase } from '../components/home/ProjectsShowcase'
import { CTAStrip } from '../components/home/CTAStrip'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsRow />
      <ServicesBento />
      <ProjectsShowcase />
      <CTAStrip />
    </>
  )
}
