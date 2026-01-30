/**
 * Draft del Business Plan compilato dalla chat AI (localStorage).
 * Usato da ChatPage per salvare le sezioni compilate dall'IA e da BusinessPlanPage per caricare il draft.
 */

import { BUSINESS_PLAN_SECTION_IDS } from '../data/businessPlanSections'

const DRAFT_KEY = 'businessplan_draft'

const defaultDraft = () => {
  const o = {}
  BUSINESS_PLAN_SECTION_IDS.forEach(id => { o[id] = '' })
  return o
}

export function getBusinessPlanDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    if (!raw) return defaultDraft()
    const parsed = JSON.parse(raw)
    const draft = defaultDraft()
    BUSINESS_PLAN_SECTION_IDS.forEach(id => {
      if (parsed[id] != null && typeof parsed[id] === 'string') draft[id] = parsed[id]
    })
    return draft
  } catch {
    return defaultDraft()
  }
}

export function updateBusinessPlanDraft(updates) {
  const draft = getBusinessPlanDraft()
  BUSINESS_PLAN_SECTION_IDS.forEach(id => {
    if (updates[id] != null && typeof updates[id] === 'string') draft[id] = updates[id]
  })
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
  return draft
}

export function clearBusinessPlanDraft() {
  localStorage.removeItem(DRAFT_KEY)
}
