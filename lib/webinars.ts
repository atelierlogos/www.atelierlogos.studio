import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const webinarsDirectory = path.join(process.cwd(), 'app/webinars/content')

export interface Webinar {
  id: string
  slug: string
  title: string
  topic: string
  metaDescription: string
  heroTitle: string
  heroSubtitle: string
  image: string
  date: string // ISO date string
  duration: string // e.g., "60 minutes"
  presenter: string
  presenterTitle: string
  presenterBio: string

  // Content sections
  overview: string
  whatYouWillLearn: string
  whoShouldAttend: string
  agenda: string
  aboutPresenter: string
  resources: string
  callToAction: string

  // URLs
  registrationUrl?: string // For upcoming webinars
  recordingUrl?: string // For past webinars
  slidesUrl?: string // Optional slides download

  // SEO and metadata
  keywords: string[]
  relatedTopics: string[]

  // Computed fields
  estimatedReadTime: number
  isPast: boolean
  status: 'upcoming' | 'past'
  url: string
}

/**
 * Validates that a webinar meets quality standards
 */
function validateWebinarQuality(webinar: Webinar): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Minimum content length requirements (in characters)
  const minLengths = {
    overview: 200,
    whatYouWillLearn: 150,
    whoShouldAttend: 100,
    agenda: 200,
    aboutPresenter: 150,
  }

  // Check each section meets minimum length
  Object.entries(minLengths).forEach(([field, minLength]) => {
    const content = webinar[field as keyof Webinar] as string
    const strippedContent = content.replace(/<[^>]*>/g, '').trim()

    if (strippedContent.length < minLength) {
      errors.push(
        `Section "${field}" is too short (${strippedContent.length} chars). ` +
        `Minimum: ${minLength} chars. Add more content.`
      )
    }
  })

  // Ensure we have keywords
  if (webinar.keywords.length < 3) {
    errors.push('Need at least 3 relevant keywords')
  }

  // Check for placeholder text
  const placeholders = ['lorem ipsum', 'TODO', 'TBD', '[insert', 'placeholder']
  const allContent = [
    webinar.overview,
    webinar.whatYouWillLearn,
    webinar.whoShouldAttend,
    webinar.agenda,
  ].join(' ').toLowerCase()

  placeholders.forEach(placeholder => {
    if (allContent.includes(placeholder.toLowerCase())) {
      errors.push(`Found placeholder text: "${placeholder}". Replace with real content.`)
    }
  })

  // Validate that past webinars have recording URLs
  if (webinar.isPast && !webinar.recordingUrl) {
    errors.push('Past webinar must have a recordingUrl')
  }

  // Validate that upcoming webinars have registration URLs
  if (!webinar.isPast && !webinar.registrationUrl) {
    errors.push('Upcoming webinar must have a registrationUrl')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Determines if a webinar is in the past
 */
function isWebinarPast(dateString: string): boolean {
  const webinarDate = new Date(dateString)
  const now = new Date()
  return webinarDate < now
}

export async function getAllWebinars(): Promise<Webinar[]> {
  // Create directory if it doesn't exist
  if (!fs.existsSync(webinarsDirectory)) {
    fs.mkdirSync(webinarsDirectory, { recursive: true })
    return []
  }

  const fileNames = fs.readdirSync(webinarsDirectory)

  const allWebinarsData = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const id = fileName.replace(/\.md$/, '')
        const fullPath = path.join(webinarsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        const matterResult = matter(fileContents)

        // Process each section separately
        const sections = [
          'overview',
          'whatYouWillLearn',
          'whoShouldAttend',
          'agenda',
          'aboutPresenter',
          'resources',
          'callToAction',
        ]

        const processedSections: Record<string, string> = {}

        for (const section of sections) {
          const sectionContent = matterResult.data[section] || ''
          const processedContent = await remark()
            .use(html)
            .process(sectionContent)
          processedSections[section] = processedContent.toString()
        }

        const isPast = isWebinarPast(matterResult.data.date)

        const webinar: Webinar = {
          id,
          slug: matterResult.data.slug || id,
          title: matterResult.data.title || '',
          topic: matterResult.data.topic || '',
          metaDescription: matterResult.data.metaDescription || '',
          heroTitle: matterResult.data.heroTitle || matterResult.data.title || '',
          heroSubtitle: matterResult.data.heroSubtitle || '',
          image: matterResult.data.image || '/images/block/placeholder-dark-1.svg',
          date: matterResult.data.date || new Date().toISOString(),
          duration: matterResult.data.duration || '60 minutes',
          presenter: matterResult.data.presenter || 'Atelier Logos Team',
          presenterTitle: matterResult.data.presenterTitle || '',
          presenterBio: matterResult.data.presenterBio || '',

          overview: processedSections.overview,
          whatYouWillLearn: processedSections.whatYouWillLearn,
          whoShouldAttend: processedSections.whoShouldAttend,
          agenda: processedSections.agenda,
          aboutPresenter: processedSections.aboutPresenter,
          resources: processedSections.resources,
          callToAction: processedSections.callToAction,

          registrationUrl: matterResult.data.registrationUrl,
          recordingUrl: matterResult.data.recordingUrl,
          slidesUrl: matterResult.data.slidesUrl,

          keywords: matterResult.data.keywords || [],
          relatedTopics: matterResult.data.relatedTopics || [],
          estimatedReadTime: matterResult.data.estimatedReadTime || 5,

          isPast,
          status: isPast ? 'past' : 'upcoming',
          url: `/webinars/${matterResult.data.slug || id}`,
        }

        // Validate quality in development
        if (process.env.NODE_ENV === 'development') {
          const validation = validateWebinarQuality(webinar)
          if (!validation.valid) {
            console.warn(`⚠️  Quality issues in ${fileName}:`)
            validation.errors.forEach(error => console.warn(`   - ${error}`))
          }
        }

        return webinar
      })
  )

  // Sort by date (most recent first, then upcoming)
  return allWebinarsData.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)

    // If both are upcoming or both are past, sort by date (descending)
    if (a.isPast === b.isPast) {
      return dateB.getTime() - dateA.getTime()
    }

    // Upcoming webinars come before past webinars
    return a.isPast ? 1 : -1
  })
}

export async function getWebinar(slug: string): Promise<Webinar | null> {
  try {
    // Filter out requests for static files (images, etc.)
    if (slug.includes('.')) {
      return null
    }

    const fullPath = path.join(webinarsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    // Process each section separately
    const sections = [
      'overview',
      'whatYouWillLearn',
      'whoShouldAttend',
      'agenda',
      'aboutPresenter',
      'resources',
      'callToAction',
    ]

    const processedSections: Record<string, string> = {}

    for (const section of sections) {
      const sectionContent = matterResult.data[section] || ''
      const processedContent = await remark()
        .use(html)
        .process(sectionContent)
      processedSections[section] = processedContent.toString()
    }

    const isPast = isWebinarPast(matterResult.data.date)

    const webinar: Webinar = {
      id: slug,
      slug: matterResult.data.slug || slug,
      title: matterResult.data.title || '',
      topic: matterResult.data.topic || '',
      metaDescription: matterResult.data.metaDescription || '',
      heroTitle: matterResult.data.heroTitle || matterResult.data.title || '',
      heroSubtitle: matterResult.data.heroSubtitle || '',
      image: matterResult.data.image || '/images/block/placeholder-dark-1.svg',
      date: matterResult.data.date || new Date().toISOString(),
      duration: matterResult.data.duration || '60 minutes',
      presenter: matterResult.data.presenter || 'Atelier Logos Team',
      presenterTitle: matterResult.data.presenterTitle || '',
      presenterBio: matterResult.data.presenterBio || '',

      overview: processedSections.overview,
      whatYouWillLearn: processedSections.whatYouWillLearn,
      whoShouldAttend: processedSections.whoShouldAttend,
      agenda: processedSections.agenda,
      aboutPresenter: processedSections.aboutPresenter,
      resources: processedSections.resources,
      callToAction: processedSections.callToAction,

      registrationUrl: matterResult.data.registrationUrl,
      recordingUrl: matterResult.data.recordingUrl,
      slidesUrl: matterResult.data.slidesUrl,

      keywords: matterResult.data.keywords || [],
      relatedTopics: matterResult.data.relatedTopics || [],
      estimatedReadTime: matterResult.data.estimatedReadTime || 5,

      isPast,
      status: isPast ? 'past' : 'upcoming',
      url: `/webinars/${matterResult.data.slug || slug}`,
    }

    return webinar
  } catch (error) {
    console.error('Error reading webinar:', error)
    return null
  }
}

export function getAllWebinarSlugs(): string[] {
  if (!fs.existsSync(webinarsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(webinarsDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''))
}
