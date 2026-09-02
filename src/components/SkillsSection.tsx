import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import {
  Brain, Eye, Target, FileSearch, Workflow, Boxes,
  AreaChart,
} from 'lucide-react'
import {
  SiPython, SiCplusplus, SiJavascript,
  SiPytorch, SiTensorflow, SiScikitlearn, SiOpencv,
  SiNumpy, SiPandas,
  SiReact, SiFlutter, SiTauri, SiNodedotjs, SiBun,
  SiDocker, SiGit, SiGithub, SiGitlab, SiStreamlit,
  SiMongodb,
} from 'react-icons/si'
import { GlitchText } from '@/components/GlitchText'

type Skill = {
  name: string
  icon: React.ElementType
  brandColor?: string // used for the icon on hover; falls back to category color
}

type Category = {
  id: string
  label: string
  color: string
  skills: Skill[]
}

// Left column: ML-focused. Right column: engineering-focused. Orb sits between them.
const LEFT_CATEGORIES: Category[] = [
  {
    id: 'ml',
    label: 'Machine Learning',
    color: '#00E5FF',
    skills: [
      { name: 'Deep Learning', icon: Brain },
      { name: 'Computer Vision', icon: Eye },
      { name: 'YOLO', icon: Target },
      { name: 'RAG', icon: FileSearch },
      { name: 'LangGraph', icon: Workflow },
      { name: 'Vector Databases', icon: Boxes },
    ],
  },
  {
    id: 'ml-frameworks',
    label: 'ML Frameworks',
    color: '#00E5FF',
    skills: [
      { name: 'PyTorch', icon: SiPytorch, brandColor: '#EE4C2C' },
      { name: 'TensorFlow', icon: SiTensorflow, brandColor: '#FF6F00' },
      { name: 'Scikit-Learn', icon: SiScikitlearn, brandColor: '#F7931E' },
      { name: 'OpenCV', icon: SiOpencv, brandColor: '#5C3EE8' },
    ],
  },
  {
    id: 'data',
    label: 'Data & Analysis',
    color: '#00E5FF',
    skills: [
      { name: 'NumPy', icon: SiNumpy, brandColor: '#4DABCF' },
      { name: 'Pandas', icon: SiPandas, brandColor: '#E70488' },
      { name: 'Matplotlib', icon: AreaChart, brandColor: '#11557C' },
      { name: 'Seaborn', icon: AreaChart },
    ],
  },
]

const RIGHT_CATEGORIES: Category[] = [
  {
    id: 'programming',
    label: 'Programming',
    color: '#7B2FFF',
    skills: [
      { name: 'Python', icon: SiPython, brandColor: '#3776AB' },
      { name: 'C++', icon: SiCplusplus, brandColor: '#00599C' },
      { name: 'JavaScript', icon: SiJavascript, brandColor: '#F7DF1E' },
    ],
  },
  {
    id: 'web',
    label: 'Web Development',
    color: '#7B2FFF',
    skills: [
      { name: 'React', icon: SiReact, brandColor: '#61DAFB' },
      { name: 'Flutter', icon: SiFlutter, brandColor: '#02569B' },
      { name: 'Tauri', icon: SiTauri, brandColor: '#FFC131' },
      { name: 'Node.js', icon: SiNodedotjs, brandColor: '#339933' },
      { name: 'Bun', icon: SiBun, brandColor: '#FBF0DF' },
      { name: 'MongoDB', icon: SiMongodb, brandColor: '#47A248' },
    ],
  },
  {
    id: 'mlops',
    label: 'Deployment & MLOps',
    color: '#7B2FFF',
    skills: [
      { name: 'Docker', icon: SiDocker, brandColor: '#2496ED' },
      { name: 'Git', icon: SiGit, brandColor: '#F05032' },
      { name: 'GitHub', icon: SiGithub, brandColor: '#F0F6FC' },
      { name: 'GitLab', icon: SiGitlab, brandColor: '#FC6D26' },
      { name: 'Streamlit', icon: SiStreamlit, brandColor: '#FF4B4B' },
    ],
  },
]

const CATEGORIES: Category[] = [...LEFT_CATEGORIES, ...RIGHT_CATEGORIES]

function SkillRow({ skill, categoryColor }: { skill: Skill; categoryColor: string }) {
  const Icon = skill.icon
  return (
    <div className="flex items-center gap-2.5 py-1">
      <div
        className="flex items-center justify-center rounded-full shrink-0"
        style={{ width: 26, height: 26, background: `${categoryColor}12` }}
      >
        <Icon size={13} style={{ color: skill.brandColor ?? categoryColor }} />
      </div>
      <span
        className="font-inter text-[13px]"
        style={{ color: 'rgba(232,244,253,0.8)' }}
      >
        {skill.name}
      </span>
    </div>
  )
}

function CategoryCard({ category, index, inView, align }: {
  category: Category
  index: number
  inView: boolean
  align: 'left' | 'right'
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === 'left' ? -20 : 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.1, ease: 'easeOut' }}
      className="border p-5"
      style={{ borderColor: 'rgba(232,244,253,0.08)', background: 'rgba(2,11,24,0.4)' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block w-2 h-2 rounded-full" style={{ background: category.color }} />
        <h3
          className="font-orbitron text-xs tracking-[0.15em]"
          style={{ color: category.color }}
        >
          {category.label}
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        {category.skills.map(skill => (
          <SkillRow key={skill.name} skill={skill} categoryColor={category.color} />
        ))}
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative py-4 md:py-8 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 60%, rgba(0,229,255,0.03) 0%, transparent 55%), radial-gradient(ellipse at 80% 40%, rgba(123,47,255,0.04) 0%, transparent 55%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-8 md:mb-10"
        >
          <div className="hud-label mb-3">SECTION_03 / SYSTEMS</div>
          <GlitchText
            text="TECH STACK"
            as="h2"
            scramble={false}
            className="text-3xl md:text-5xl font-black tracking-[0.1em] text-foreground"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 text-sm md:text-base font-inter"
            style={{ color: 'rgba(232,244,253,0.55)' }}
          >
            Tools and libraries I build with, grouped by where they sit in the stack.
          </motion.p>
        </motion.div>

        {/* Category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} inView={inView} align="left" />
          ))}
        </div>
      </div>
    </section>
  )
}