import { notFound } from "next/navigation"
import { CaseStudyTemplate } from "@/components/case-study/template"
import { caseStudies, getCaseStudy, getRelatedStudies } from "@/data/case-studies"

export function generateStaticParams() { return caseStudies.map((study) => ({ slug: study.slug })) }

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()
  return <CaseStudyTemplate study={study} related={getRelatedStudies(slug)} />
}
