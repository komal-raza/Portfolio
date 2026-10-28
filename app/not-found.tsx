import { ButtonLink } from '@/components/ui/button-link'

export default function NotFound() {
  return (
    <section className="section-y">
      <div className="container-site">
        <p className="font-mono text-sm text-link">404</p>
        <h1 className="mt-3">Page not found</h1>
        <p className="lead mt-4">
          The page you requested does not exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Go to home</ButtonLink>
          <ButtonLink href="/projects" variant="secondary">
            Browse projects
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}

