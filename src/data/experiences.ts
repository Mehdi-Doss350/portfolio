import type { LucideIcon } from 'lucide-react'
import { Radio, Bot } from 'lucide-react'

export type Experience = {
  id: string
  role: string
  org: string
  orgUrl?: string
  duration: string
  icon: LucideIcon
  color: string
  summary: string
  longDescription?: string
  highlights?: string[]
  /** Cover image shown on the card and at the top of the detail page. */
  image: string
  /** Additional photos shown in the detail page gallery. */
  gallery?: string[]
}

// NOTE: image paths below are placeholders — drop your real photos into
// /public/experience/<id>/ and update these paths, same pattern as
// /public/projects/<id>/ used in data/projects.ts.

export const EXPERIENCES: Experience[] = [
  {
    id: 'media-manager',
    role: 'Media Manager',
    org: 'ENSI Competitive Programming Club (ECPC)',
    orgUrl: 'https://www.linkedin.com/company/ensi-competitive-programming-club/',
    duration: 'Jan – Jun',
    icon: Radio,
    color: '#00E5FF',
    summary:
      "Led media for Code & Conquer 2.0, ENSI's largest competitive programming event — developing the visual identity, managing content, and promoting the event through radio appearances.",
    longDescription:
      "As Media Manager for Code & Conquer 2.0, ENSI's largest competitive programming event, I developed the event's visual identity, managed content across channels, and promoted the event through radio appearances — merging creativity, communication, and strategy to bring the experience to life.",
    image: '/experience/cpc/1747690482366.jpg',
    gallery: [
      '/experience/cpc/1747690483684.jpg',
      '/experience/cpc/1747690477484.jpg',
      '/experience/cpc/1747690477449.jpg',
      '/experience/cpc/1747690482366.jpg',
      
      '/experience/cpc/img.jpg',
    ],
  },
  {
    id: 'robotics-association',
    role: 'Member → Expert Member',
    org: 'Association Robotique ENSI',
    orgUrl: 'https://www.linkedin.com/company/association-robotique-ensi/',
    duration: '2 Years',
    icon: Bot,
    color: '#7B2FFF',
    summary:
      'Grew from a curious member into an expert member across two years of hands-on robotics work, teaching, and team projects.',
    longDescription:
      'Over two years with Association Robotique ENSI, I grew from a curious member into an expert member, gaining technical and teamwork experience along the way — training newcomers, contributing to competition teams, and building internal tools for the association.',
    highlights: [
      'Trainer at RoboDay 4.0 — helped newcomers take their first steps in robotics',
      'Contributed to RoboCup 7.0 and RoboCup 8.0 project teams',
      '"AR Management" — built an app to help the association track materials and resources',
      'Competed in multiple line-follower robot competitions',
    ],
    image: '/experience/ARE/1776336569302.jpg',
    gallery: [
      '/experience/ARE/1776336569302.jpg',
      '/experience/ARE/1776336569814.jpg',
      '/experience/ARE/1776336569287.jpg',
      '/experience/ARE/1776336569579.jpg',
      '/experience/ARE/1776336569645.jpg',
    ],
  },
]