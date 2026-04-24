import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { ButtonLink } from '../components/ui/ButtonLink'

export function NotFoundPage() {
  return (
    <div className="py-32">
      <Container className="text-center">
        <p className="font-heading text-6xl font-extrabold text-bronze">404</p>
        <h1 className="mt-4 font-heading text-2xl text-paper">Page not found</h1>
        <p className="mt-2 text-mist">That path has not been poured yet.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink to="/">Back home</ButtonLink>
          <ButtonLink to="/contact" variant="ghost">
            Contact
          </ButtonLink>
        </div>
        <p className="mt-8 text-sm text-mist/70">
          Or go to the{' '}
          <Link to="/services" className="text-bronze underline">
            services
          </Link>{' '}
          page.
        </p>
      </Container>
    </div>
  )
}
