export const slugifyCourseTitle = (title = '') => {
  const normalized = String(title || '')
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return normalized || 'course'
}

export const buildCoursePath = (courseId, title = '', options = {}) => {
  if (!courseId) return '/learner/course'

  const slug = slugifyCourseTitle(title)
  const params = new URLSearchParams()

  if (options.fromResume) params.set('resume', '1')

  const query = params.toString()

  if (options.preview) {
    return `/course-preview/${encodeURIComponent(courseId)}/${slug}`
  }

  return `/learner/course/${encodeURIComponent(courseId)}/${slug}${query ? `?${query}` : ''}`
}