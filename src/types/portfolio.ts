export interface ThemePreset {
  id: string
  name: string
  description: string
  type: 'grid' | 'aurora' | 'dots' | 'minimal' | 'cyan-glow' | 'midnight-neon' | 'dark-grid' | 'slate-minimal'
  bgClass: string
  previewColor: string
  customImageUrl?: string
}

export interface ProfileAvailability {
  status: string
  badge: string
  dotColor: string
}

export interface ProfileData {
  name: string
  handle: string
  tagline: string
  availability: ProfileAvailability
  avatar: string
  bio: string
  location: string
  email: string
  phone: string
  bookingUrl: string
  resumeUrl: string
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
  username: string
}

export interface NavItem {
  id: string
  label: string
  icon: string
}

export interface StatItem {
  id: string
  value: string
  label: string
  detail: string
  icon: string
}

export interface HeroData {
  greeting: string
  titlePrefix: string
  titleHighlight: string
  titleSuffix: string
  description: string
  ctaPrimary: {
    text: string
    target: string
    icon: string
  }
  ctaSecondary: {
    text: string
    target: string
    icon: string
  }
  ctaResume: {
    text: string
    target: string
    icon: string
  }
  stats: StatItem[]
}

export interface SkillItem {
  name: string
  level: number
  icon: string
  experience: string
  tags: string[]
}

export interface SkillCategory {
  id: string
  name: string
  skills: SkillItem[]
}

export interface SkillsData {
  sectionTitle: string
  sectionSubtitle: string
  categories: SkillCategory[]
}

export interface ServiceItem {
  id: string
  title: string
  badge: string
  icon: string
  description: string
  deliverables: string[]
  technologies: string[]
  startingAt: string
  timeline: string
}

export interface ServicesData {
  sectionTitle: string
  sectionSubtitle: string
  items: ServiceItem[]
}

export interface WorkflowStep {
  step: string
  phase: string
  title: string
  icon: string
  description: string
  deliverables: string[]
  tools: string[]
  duration: string
}

export interface WorkflowData {
  sectionTitle: string
  sectionSubtitle: string
  steps: WorkflowStep[]
}

export interface ProjectItem {
  id: string
  title: string
  category: string
  featured: boolean
  description: string
  image: string
  techStack: string[]
  liveUrl: string
  githubUrl: string
  highlights: string[]
}

export interface ProjectsData {
  sectionTitle: string
  sectionSubtitle: string
  categories: string[]
  items: ProjectItem[]
}

export interface AchievementItem {
  id: string
  title: string
  issuer: string
  year: string
  badgeUrl: string
  credentialId: string
  verifyUrl: string
  description: string
}

export interface AchievementsData {
  sectionTitle: string
  sectionSubtitle: string
  items: AchievementItem[]
}

export interface PricingPlan {
  id: string
  name: string
  tagline: string
  priceMonthly: string
  priceProject: string
  deliveryTime: string
  popular: boolean
  badge?: string
  features: string[]
  excluded: string[]
  ctaText: string
  ctaPlanId: string
}

export interface PricingData {
  sectionTitle: string
  sectionSubtitle: string
  billingNote: string
  plans: PricingPlan[]
}

export interface WorkExperienceItem {
  period: string
  role: string
  company: string
  location: string
  badge: string
  description: string
  bullets: string[]
  skills: string[]
}

export interface EducationItem {
  period: string
  degree: string
  institution: string
  location: string
  grade: string
  description: string
  bullets?: string[]
}

export interface ExperienceData {
  sectionTitle: string
  sectionSubtitle: string
  work: WorkExperienceItem[]
  education: EducationItem[]
}

export interface TestimonialItem {
  id: string
  name: string
  role: string
  avatar: string
  companyLogo: string
  quote: string
  rating: number
  project: string
}

export interface TestimonialsData {
  sectionTitle: string
  sectionSubtitle: string
  items: TestimonialItem[]
}

export interface FaqItem {
  id: string
  category: string
  question: string
  answer: string
}

export interface FaqsData {
  sectionTitle: string
  sectionSubtitle: string
  categories: string[]
  items: FaqItem[]
}

export interface ContactMethod {
  id: string
  title: string
  value: string
  link: string
  icon: string
  copyable: boolean
}

export interface ContactData {
  sectionTitle: string
  sectionSubtitle: string
  badges: Array<{ icon: string; text: string }>
  methods: ContactMethod[]
  formSubjects: string[]
  budgetRanges: string[]
}

export interface FooterData {
  tagline: string
  copyright: string
  subtext: string
  quickLinks: Array<{ label: string; href: string }>
}

export interface PortfolioConfig {
  theme: {
    defaultPreset: string
    overlayOpacity?: number
    customWallpaperUrl?: string
    presets: ThemePreset[]
  }
  sectionVisibility?: Record<string, boolean>
  profile: ProfileData
  socials: SocialLink[]
  navigation: NavItem[]
  hero: HeroData
  skills: SkillsData
  services: ServicesData
  workflow: WorkflowData
  projects: ProjectsData
  achievements: AchievementsData
  pricing: PricingData
  experience: ExperienceData
  testimonials: TestimonialsData
  faqs: FaqsData
  contact: ContactData
  footer: FooterData
}
