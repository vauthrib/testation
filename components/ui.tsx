'use client'

import { useState, useEffect } from 'react'
import type { ToastType } from '@/lib/types'

// ============= TOAST =============
export function ToastMsg({ message, type, onClose }: { message: string; type: ToastType; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500)
    return () => clearTimeout(timer)
  }, [onClose])

  const styles: Record<ToastType, string> = {
    success: 'bg-emerald-600/95 text-white',
    error: 'bg-red-600/95 text-white',
    warning: 'bg-amber-500/95 text-white',
    info: 'bg-blue-600/95 text-white',
  }
  const icons: Record<ToastType, string> = {
    success: '\u2713',
    error: '\u2715',
    info: '\u2139',
    warning: '\u26a0',
  }

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[999]" style={{ animation: 'toastIn 0.3s ease-out' }}>
      <div className={`${styles[type]} px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[280px] max-w-[90vw] backdrop-blur-sm`}>
        <span className="text-lg font-bold flex-shrink-0">{icons[type]}</span>
        <span className="text-sm font-medium leading-tight flex-1">{message}</span>
        <button onClick={onClose} className="flex-shrink-0 opacity-70 hover:opacity-100 text-lg leading-none">&times;</button>
      </div>
    </div>
  )
}

// ============= HEADER =============
export function Header({ user, isAdmin, onLogout }: { user: string; isAdmin: boolean; onLogout: () => void }) {
  const [show, setShow] = useState(false)
  return (
    <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/60 sticky top-0 z-50">
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-lg flex-shrink-0">{'\ud83d\udce6'}</span>
          <div className="min-w-0">
            <p className="text-[11px] text-gray-500 leading-tight">Connecte</p>
            <p className="font-semibold text-sm text-gray-900 truncate">{user}{isAdmin ? ' \ud83d\udc51' : ''}</p>
          </div>
        </div>
        <div className="relative">
          <button onClick={() => setShow(!show)} className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors text-lg">{'\u26a1'}</button>
          {show && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShow(false)} />
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-20" style={{ animation: 'scaleIn 0.15s ease-out' }}>
                <button onClick={() => { onLogout(); setShow(false) }} className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"><span>{'\ud83d\udeaa'}</span> Deconnexion</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ============= PAGE TITLE =============
export function PageTitle({ icon, title, onBack }: { icon: string; title: string; onBack?: () => void }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      {onBack && <button onClick={onBack} className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center flex-shrink-0 transition-colors text-lg">{'\u2190'}</button>}
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-2xl flex-shrink-0">{icon}</span>
        <h1 className="text-xl font-bold text-gray-900 truncate">{title}</h1>
      </div>
    </div>
  )
}

// ============= LOADING =============
export function Loading({ text = 'Chargement...' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" />
      <p className="text-sm">{text}</p>
    </div>
  )
}

// ============= TOTAL CARD =============
export function TotalCard({ label, value, unit, count, color = 'blue' }: { label: string; value: string; unit?: string; count?: string; color?: string }) {
  const m: Record<string, string> = {
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    green: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    purple: 'bg-purple-50 border-purple-200 text-purple-800',
    red: 'bg-red-50 border-red-200 text-red-800',
    amber: 'bg-amber-50 border-amber-200 text-amber-800'
  }
  return (
    <div className={`rounded-xl border p-3 text-center ${m[color] || m.blue}`}>
      <p className="text-[11px] font-medium opacity-70">{label}</p>
      <p className="text-2xl font-bold leading-tight mt-0.5">{value}<span className="text-sm font-medium ml-0.5">{unit}</span></p>
      {count && <p className="text-[11px] opacity-70 mt-0.5">{count}</p>}
    </div>
  )
}

// ============= EMPTY STATE =============
export function EmptyState({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <span className="text-5xl mb-4">{icon}</span>
      <p className="text-sm">{text}</p>
    </div>
  )
}

// ============= ACTION BUTTON =============
export function ActionButton({ icon, label, desc, color, onClick }: { icon: string; label: string; desc: string; color: string; onClick: () => void }) {
  const cls: Record<string, string> = {
    emerald: 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 shadow-emerald-600/25',
    purple: 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800 shadow-purple-600/25',
    cyan: 'bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 shadow-cyan-600/25',
    red: 'bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-red-600/25',
    blue: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-blue-600/25',
    gray: 'bg-gray-700 hover:bg-gray-800 active:bg-gray-900 shadow-gray-700/25',
    orange: 'bg-orange-600 hover:bg-orange-700 active:bg-orange-800 shadow-orange-600/25'
  }
  return (
    <button onClick={onClick} className={`w-full ${cls[color] || cls.blue} text-white rounded-2xl p-5 text-left transition-all shadow-lg active:scale-[0.98]`}>
      <div className="flex items-center gap-4">
        <span className="text-3xl flex-shrink-0">{icon}</span>
        <div>
          <p className="font-bold text-lg">{label}</p>
          <p className="text-sm opacity-80">{desc}</p>
        </div>
      </div>
    </button>
  )
}

// ============= MINI STAT =============
export function MiniStat({ value, label, color }: { value: number; label: string; color: string }) {
  const c: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-800',
    purple: 'bg-purple-100 text-purple-800',
    red: 'bg-red-100 text-red-800'
  }
  return <div className={`rounded-2xl p-4 text-center ${c[color] || c.blue}`}><p className="text-2xl font-bold">{value}</p><p className="text-xs font-medium opacity-70">{label}</p></div>
}

// ============= INPUT =============
export function Input({ label, type = 'text', step, value, onChange, maxLength, className = '', placeholder, name }: { label: string; type?: string; step?: string; value: string; onChange: (v: string) => void; maxLength?: number; className?: string; placeholder?: string; name?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input type={type} step={step} value={value} onChange={e => onChange(e.target.value)} maxLength={maxLength} name={name}
        className={`w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-gray-900 focus:bg-white focus:outline-none transition-all text-sm ${className}`}
        placeholder={placeholder} />
    </div>
  )
}

// ============= SELECT =============
export function Select({ label, value, onChange, options, name }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; name?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} name={name}
        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-gray-900 focus:bg-white focus:outline-none transition-all text-sm">
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}

// ============= ITEM MANAGER =============
export function ItemManager({ title, items, onRefresh, categorie, showToast }: { title: string; items: any[]; onRefresh: () => void; categorie: string; showToast: (msg: string, type: ToastType) => void }) {
  const [newItem, setNewItem] = useState('')
  const [editingItem, setEditingItem] = useState<any>(null)

  const handleAdd = async () => {
    if (!newItem.trim()) return
    try {
      const res = await fetch('/api/items', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ categorie, nom: newItem.toUpperCase() }) })
      if (res.ok) { setNewItem(''); onRefresh(); showToast(`"${newItem.toUpperCase()}" ajoute`, 'success') }
      else { const err = await res.json(); showToast(err.error, 'error') }
    } catch { showToast('Erreur', 'error') }
  }

  const handleUpdate = async () => {
    if (!editingItem) return
    try {
      await fetch('/api/items', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingItem) })
      setEditingItem(null); onRefresh(); showToast('Modifie', 'success')
    } catch { showToast('Erreur', 'error') }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cet item ?')) return
    try { await fetch(`/api/items?id=${id}`, { method: 'DELETE' }); onRefresh(); showToast('Supprime', 'success') }
    catch { showToast('Erreur', 'error') }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-4">{title}</h3>
      <div className="flex gap-2 mb-4">
        <input type="text" value={newItem} onChange={e => setNewItem(e.target.value.toUpperCase())} onKeyDown={e => e.key === 'Enter' && handleAdd()}
          className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:bg-white focus:outline-none transition-all uppercase" placeholder="Nouvel item..." maxLength={50} />
        <button onClick={handleAdd} className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-5 py-3 rounded-xl transition-colors">+</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item: any) => (
          <div key={item.id} className="group relative">
            {editingItem?.id === item.id ? (
              <div className="flex gap-2 items-center">
                <input type="text" value={editingItem.nom} onChange={e => setEditingItem({ ...editingItem, nom: e.target.value.toUpperCase() })}
                  className="w-28 px-3 py-1.5 bg-gray-50 border rounded-xl text-sm uppercase" maxLength={50} />
                <button onClick={handleUpdate} className="text-emerald-600 text-sm">{'\u2713'}</button>
                <button onClick={() => setEditingItem(null)} className="text-gray-400 text-sm">{'\u2715'}</button>
              </div>
            ) : (
              <div className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-xl text-sm font-medium">
                <span>{item.nom}</span>
                <button onClick={() => setEditingItem(item)} className="text-gray-400 hover:text-gray-600 ml-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">{'\u270f\ufe0f'}</button>
                <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity">{'\ud83d\uddd1\ufe0f'}</button>
              </div>
            )}
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-gray-400 italic">Aucun item</p>}
      </div>
    </div>
  )
}
