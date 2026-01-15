import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Monthly Retainer | Atelier Logos',
  description: 'Stay ahead with an expert squad that\'s always on call. Flexible monthly retainers for brownfield maintenance or greenfield AI development with premium tool access.',
}

export default function MonthlyRetainerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
