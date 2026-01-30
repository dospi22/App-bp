/**
 * Salvataggio e caricamento progetti (Chat / Business Plan).
 * Se Supabase è configurato (VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY), usa Supabase;
 * altrimenti usa localStorage.
 * Struttura progetto: { id, name, createdAt, type: 'chat' | 'business-plan', data }
 */

import { supabase } from '../lib/supabase'

const STORAGE_KEY = 'businessplan_projects'

function fromRow(row) {
  if (!row) return null
  return {
    id: row.id,
    name: row.name,
    createdAt: new Date(row.created_at).getTime(),
    type: row.type || 'business-plan',
    data: row.data ?? null
  }
}

export async function getProjects() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('id, name, type, data, created_at')
        .order('created_at', { ascending: false })
      if (error) throw error
      return (data || []).map(fromRow)
    } catch (e) {
      console.warn('Supabase getProjects failed, using localStorage:', e?.message)
      return getProjectsLocal()
    }
  }
  return getProjectsLocal()
}

function getProjectsLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const list = JSON.parse(raw)
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

export async function saveProject({ id, name, type, data }) {
  if (supabase) {
    try {
      const now = new Date().toISOString()
      const payload = {
        name: name || 'Progetto',
        type: type || 'business-plan',
        data: data ?? null,
        updated_at: now
      }
      if (id) {
        const { data: updated, error } = await supabase
          .from('projects')
          .update(payload)
          .eq('id', id)
          .select('id, name, type, data, created_at')
          .single()
        if (error) throw error
        return fromRow(updated)
      } else {
        const newId = `proj_${Date.now()}`
        const { data: inserted, error } = await supabase
          .from('projects')
          .insert({
            id: newId,
            ...payload,
            created_at: now,
            updated_at: now
          })
          .select('id, name, type, data, created_at')
          .single()
        if (error) throw error
        return fromRow(inserted)
      }
    } catch (e) {
      console.warn('Supabase saveProject failed, using localStorage:', e?.message)
      return saveProjectLocal({ id, name, type, data })
    }
  }
  return saveProjectLocal({ id, name, type, data })
}

function saveProjectLocal({ id, name, type, data }) {
  const list = getProjectsLocal()
  const createdAt = id ? (list.find(p => p.id === id)?.createdAt ?? Date.now()) : Date.now()
  const projectId = id || `proj_${Date.now()}`
  const project = {
    id: projectId,
    name: name || `Progetto ${list.length + 1}`,
    createdAt,
    type: type || 'business-plan',
    data: data || null
  }
  const next = id ? list.map(p => (p.id === id ? project : p)) : [project, ...list]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return project
}

export async function deleteProject(id) {
  if (supabase) {
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id)
      if (error) throw error
      return
    } catch (e) {
      console.warn('Supabase deleteProject failed, using localStorage:', e?.message)
    }
  }
  const list = getProjectsLocal().filter(p => p.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export async function getProject(id) {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('id, name, type, data, created_at')
        .eq('id', id)
        .maybeSingle()
      if (error) throw error
      return fromRow(data)
    } catch (e) {
      console.warn('Supabase getProject failed, using localStorage:', e?.message)
      return getProjectsLocal().find(p => p.id === id)
    }
  }
  return getProjectsLocal().find(p => p.id === id)
}
