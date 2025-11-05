"use client"

import { useCallback, useMemo, useState } from 'react'
import Image from 'next/image'
import { IconHome2, IconBuildingSkyscraper, IconKey, IconHomeDollar, IconListCheck, IconChevronRight } from '@tabler/icons-react'
import { type LocationValue, type Purpose, type PropertyType, type Range, type SearchState, DEFAULT_AREA_BOUNDS } from './types'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type CityOption = {
  label: string
  value: string
  areas?: string[]
}

type AmenitiesOption = {
  id: string
  label: string
  iconSrc?: string
}

type PropertySearchBarProps = {
  defaultState?: Partial<SearchState>
  cities?: CityOption[]
  amenities?: AmenitiesOption[]
  onSearch?: (state: SearchState) => void
  className?: string
}

const DEFAULT_CITIES: CityOption[] = [
  { label: 'Mumbai', value: 'mumbai', areas: ['Andheri', 'Bandra', 'Juhu', 'Powai'] },
  { label: 'Pune', value: 'pune', areas: ['Kothrud', 'Baner', 'Hinjewadi', 'Viman Nagar'] },
  { label: 'Nashik', value: 'nashik', areas: ['Gangapur', 'Panchavati', 'Dwarka'] },
]

const DEFAULT_AMENITIES: AmenitiesOption[] = [
  { id: 'parking', label: 'Parking', iconSrc: '/images/hero/parking.svg' },
  { id: 'furnished', label: 'Furnished', iconSrc: '/images/hero/sofa.svg' },
  { id: 'energy', label: 'Energy Efficient', iconSrc: '/images/SVGs/energyefficient.svg' },
  { id: 'smart', label: 'Smart Access', iconSrc: '/images/SVGs/smart-home-access.svg' },
  { id: 'details', label: 'Property Details', iconSrc: '/images/SVGs/property-details.svg' },
]

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export const PropertySearchBar = ({
  defaultState,
  cities = DEFAULT_CITIES,
  amenities = DEFAULT_AMENITIES,
  onSearch,
  className,
}: PropertySearchBarProps) => {
  const [type, setType] = useState<PropertyType>(defaultState?.type ?? 'residential')
  const [purpose, setPurpose] = useState<Purpose>(defaultState?.purpose ?? 'buy')
  const [location, setLocation] = useState<LocationValue>(defaultState?.location ?? { city: null, area: null })
  const [carpetArea, setCarpetArea] = useState<Range>(defaultState?.carpetArea ?? { min: 500, max: 2500 })
  const [budget, setBudget] = useState<Range>(defaultState?.budget ?? { min: 2500000, max: 30000000 })
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(defaultState?.amenities ?? [])
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(false)

  const currentCity = useMemo(() => cities.find(c => c.value === location.city) ?? null, [cities, location.city])

  // Stepped slider definitions
  const areaSteps = useMemo(() => [0, 300, 500, 700, 1000, 1500, 2000, 3000, 5000, 10000, 15000], [])
  const priceSteps = useMemo(() => [0, 500000, 1000000, 2500000, 5000000, 7500000, 10000000, 20000000, 30000000, 50000000], [])
  const nearestIndex = (steps: number[], value: number | null) => {
    if (value == null) return 0
    let idx = 0
    let best = Number.POSITIVE_INFINITY
    for (let i = 0; i < steps.length; i++) {
      const d = Math.abs(steps[i] - value)
      if (d < best) {
        best = d
        idx = i
      }
    }
    return idx
  }

  // Compact label formatters
  const formatAreaShort = (v: number) => {
    if (v >= 1000) {
      const k = v / 1000
      return k % 1 === 0 ? `${k}k` : `${k.toFixed(1)}k`
    }
    return String(v)
  }
  const formatINRShort = (v: number) => {
    if (v >= 1e7) {
      const cr = v / 1e7
      return `${cr % 1 === 0 ? cr : cr.toFixed(1)}Cr`
    }
    if (v >= 1e5) {
      const l = v / 1e5
      return `${l % 1 === 0 ? l : l.toFixed(1)}L`
    }
    if (v >= 1000) {
      const k = v / 1000
      return `${k % 1 === 0 ? k : k.toFixed(1)}k`
    }
    return String(v)
  }

   
  const handleCityChange = useCallback((value: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setLocation(prev => ({ city: value || null, area: null }))
  }, [])

  const handleAreaChange = useCallback((value: string) => {
    setLocation(prev => ({ ...prev, area: value || null }))
  }, [])

  const handleCarpetChange = useCallback((key: 'min' | 'max', value: number) => {
    setCarpetArea(prev => {
      const next = { ...prev }
      next[key] = value
      const min = Math.min(next.min ?? 0, next.max ?? 0)
      const max = Math.max(next.min ?? 0, next.max ?? 0)
      return { min, max }
    })
  }, [])

  const handleBudgetChange = useCallback((key: 'min' | 'max', value: number) => {
    setBudget(prev => {
      const next = { ...prev }
      next[key] = value
      const min = Math.min(next.min ?? 0, next.max ?? 0)
      const max = Math.max(next.min ?? 0, next.max ?? 0)
      return { min, max }
    })
  }, [])

  const handleToggleAmenity = useCallback((id: string) => {
    setSelectedAmenities(prev => (prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]))
  }, [])

  const handleSearch = useCallback(() => {
    const state: SearchState = {
      type,
      purpose,
      location,
      carpetArea,
      budget,
      amenities: selectedAmenities,
    }
    onSearch?.(state)
  }, [budget, carpetArea, location, onSearch, purpose, selectedAmenities, type])


  return (
    <div className={`relative w-full rounded-2xl shadow-(--shadow-3xl) bg-white/90 dark:bg-black/80 backdrop-blur border border-black/20 dark:border-white/20 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] ${className ?? ''}`}>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl p-px content-['']
        [background:linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0)_35%),linear-gradient(315deg,rgba(255,255,255,0.55),rgba(255,255,255,0)_35%)]
        dark:[background:linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0)_35%),linear-gradient(315deg,rgba(255,255,255,0.12),rgba(255,255,255,0)_35%)]
        [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] mask-exclude
        [-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [-webkit-mask-composite:xor]"
      />
      <div className="px-4 sm:px-6 pt-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-black/60 dark:text-white/60 uppercase tracking-wide">Type</span>
            <div className="flex rounded-full p-1 bg-black/5 dark:bg-white/10">
            <button
              type="button"
              onClick={() => setType('residential')}
              className={`px-4 py-1.5 text-sm rounded-full transition-colors ${type === 'residential' ? 'bg-white dark:bg-black text-black dark:text-white shadow' : 'text-black/70 dark:text-white/70'}`}
              aria-pressed={type === 'residential'}
            >
              <span className="inline-flex items-center gap-1.5">
                <IconHome2 size={16} aria-hidden />
                <span>Residential</span>
              </span>
            </button>
              <button
                type="button"
              onClick={() => setType('commercial')}
              className={`px-4 py-1.5 text-sm rounded-full transition-colors ${type === 'commercial' ? 'bg-white dark:bg-black text-black dark:text-white shadow' : 'text-black/70 dark:text-white/70'}`}
              aria-pressed={type === 'commercial'}
            >
              <span className="inline-flex items-center gap-1.5">
                <IconBuildingSkyscraper size={16} aria-hidden />
                <span>Commercial</span>
              </span>
              </button>
            </div>
          </div>

          <Separator orientation="vertical" className="hidden md:block h-6 bg-black/10 dark:bg-white/10 mx-1" />
          <div className="flex items-center gap-2 justify-start md:justify-center">
            <span className="text-[11px] font-medium text-black/60 dark:text-white/60 uppercase tracking-wide">Purpose</span>
            <div className="flex rounded-full p-1 bg-black/5 dark:bg-white/10">
            <button
              type="button"
              onClick={() => setPurpose('rent')}
              className={`px-4 py-1.5 text-sm rounded-full transition-colors ${purpose === 'rent' ? 'bg-white dark:bg-black text-black dark:text-white shadow' : 'text-black/70 dark:text-white/70'}`}
              aria-pressed={purpose === 'rent'}
            >
              <span className="inline-flex items-center gap-1.5">
                <IconKey size={16} aria-hidden />
                <span>Rent</span>
              </span>
            </button>
              <button
                type="button"
              onClick={() => setPurpose('buy')}
              className={`px-4 py-1.5 text-sm rounded-full transition-colors ${purpose === 'buy' ? 'bg-white dark:bg-black text-black dark:text-white shadow' : 'text-black/70 dark:text-white/70'}`}
              aria-pressed={purpose === 'buy'}
            >
              <span className="inline-flex items-center gap-1.5">
                <IconHomeDollar size={16} aria-hidden />
                <span>Buy</span>
              </span>
              </button>
            </div>
          </div>
          </div>
        </div>

      {/* section separator between toggles and filters */}
      <div className="px-4 sm:px-6">
        <Separator className="my-3 md:my-4 bg-black/10 dark:bg-white/10" />
      </div>

      <div className="px-4 sm:px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-black/70 dark:text-white/70">Location</label>
            <div className="flex gap-2">
              <select
                className="w-1/2 md:w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-black px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
                value={location.city ?? ''}
                onChange={(e) => handleCityChange(e.target.value)}
                aria-label="Select city"
              >
                <option value="">Select city</option>
                {cities.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <select
                className="w-1/2 md:hidden rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-black px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
                value={location.area ?? ''}
                onChange={(e) => handleAreaChange(e.target.value)}
                aria-label="Select area"
                disabled={!currentCity}
              >
                <option value="">Area</option>
                {currentCity?.areas?.map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
            <select
              className="hidden md:block rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-black px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
              value={location.area ?? ''}
              onChange={(e) => handleAreaChange(e.target.value)}
              aria-label="Select area"
              disabled={!currentCity}
            >
              <option value="">Select area</option>
              {currentCity?.areas?.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-xs font-medium text-black/70 dark:text-white/70">Carpet area (sqft)</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                className="w-28 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-black px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
                value={carpetArea.min ?? 0}
                min={0}
                max={carpetArea.max ?? DEFAULT_AREA_BOUNDS.max ?? 10000}
                onChange={(e) => handleCarpetChange('min', clamp(Number(e.target.value), 0, (carpetArea.max ?? 10000)))}
                aria-label="Min carpet area"
              />
              <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
              <input
                type="number"
                className="w-28 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-black px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
                value={carpetArea.max ?? 0}
                min={carpetArea.min ?? 0}
                max={20000}
                onChange={(e) => handleCarpetChange('max', clamp(Number(e.target.value), (carpetArea.min ?? 0), 20000))}
                aria-label="Max carpet area"
              />
            </div>
            {/* Single dual-thumb slider for carpet area */}
            <div className="mt-3 space-y-2">
              <Slider
                min={0}
                max={areaSteps.length - 1}
                value={[nearestIndex(areaSteps, carpetArea.min), nearestIndex(areaSteps, carpetArea.max)]}
                onValueChange={(vals) => {
                  const [mi, ma] = vals as number[]
                  handleCarpetChange('min', areaSteps[mi])
                  handleCarpetChange('max', areaSteps[ma])
                }}
                aria-label="Carpet area range"
                className="**:data-[slot=slider-thumb]:size-5 **:data-[slot=slider-track]:h-2.5"
              />
              <div className="flex justify-between text-[11px] text-black/60 dark:text-white/60 tabular-nums">
                {areaSteps.map((s, i) => (
                  <span key={i} className={i === 0 ? 'text-left' : i === areaSteps.length - 1 ? 'text-right' : 'text-center'}>
                    {formatAreaShort(s)}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-xs font-medium text-black/70 dark:text-white/70">Budget</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                className="w-36 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-black px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
                value={budget.min ?? 0}
                min={0}
                max={budget.max ?? 100000000}
                onChange={(e) => handleBudgetChange('min', clamp(Number(e.target.value), 0, (budget.max ?? 100000000)))}
                aria-label="Min budget"
              />
              <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
              <input
                type="number"
                className="w-36 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-black px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
                value={budget.max ?? 0}
                min={budget.min ?? 0}
                max={100000000}
                onChange={(e) => handleBudgetChange('max', clamp(Number(e.target.value), (budget.min ?? 0), 100000000))}
                aria-label="Max budget"
              />
            </div>
            {/* Single dual-thumb slider for budget */}
            <div className="mt-3 space-y-2">
              <Slider
                min={0}
                max={priceSteps.length - 1}
                value={[nearestIndex(priceSteps, budget.min), nearestIndex(priceSteps, budget.max)]}
                onValueChange={(vals) => {
                  const [mi, ma] = vals as number[]
                  handleBudgetChange('min', priceSteps[mi])
                  handleBudgetChange('max', priceSteps[ma])
                }}
                aria-label="Budget range"
                className="**:data-[slot=slider-thumb]:size-5 **:data-[slot=slider-track]:h-2.5"
              />
              <div className="flex justify-between text-[11px] text-black/60 dark:text-white/60 tabular-nums">
                {priceSteps.map((s, i) => (
                  // Show fewer labels to reduce clutter: first, a few mids, and last
                  (i === 0 || i === 2 || i === 4 || i === 6 || i === 8 || i === priceSteps.length - 1) ? (
                    <span key={i} className={i === 0 ? 'text-left' : i === priceSteps.length - 1 ? 'text-right' : 'text-center'}>
                      {formatINRShort(s)}
                    </span>
                  ) : (
                    <span key={i} className="opacity-0">.</span>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-row flex-wrap items-center justify-center gap-3">
          <Popover open={isAmenitiesOpen} onOpenChange={setIsAmenitiesOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                aria-expanded={isAmenitiesOpen}
                title="Choose amenities"
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition border 
                ${selectedAmenities.length > 0 
                  ? 'bg-primary/10 border-primary/40 text-black dark:text-white' 
                  : 'bg-white dark:bg-black border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10'} 
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40`}
              >
                <IconListCheck size={16} aria-hidden className={`${selectedAmenities.length === 0 && !isAmenitiesOpen ? 'animate-pulse' : ''}`} />
                <span>Amenities</span>
                {selectedAmenities.length > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-white dark:bg-primary/80">
                    {selectedAmenities.length}
                  </span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              side="bottom"
              sideOffset={8}
              className="w-[min(92vw,560px)] sm:w-[560px] p-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 shadow-lg"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {amenities.map((a) => {
                  const checked = selectedAmenities.includes(a.id)
                  return (
                    <label key={a.id} className={`flex items-center gap-3 p-2 rounded-lg border text-sm cursor-pointer transition-colors ${checked ? 'border-sky-400 bg-sky-50 dark:bg-sky-900/30' : 'border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5'}`}> 
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleToggleAmenity(a.id)}
                        className="accent-sky-600"
                        aria-label={`Toggle ${a.label}`}
                      />
                      {a.iconSrc ? (
                        <Image src={a.iconSrc} alt="" width={20} height={20} className="opacity-80" />
                      ) : null}
                      <span className="text-black dark:text-white">{a.label}</span>
                    </label>
                  )
                })}
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedAmenities([])}
                  className="px-3 py-1.5 text-sm rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => setIsAmenitiesOpen(false)}
                  className="px-3 py-1.5 text-sm rounded-md bg-black text-white dark:bg-white dark:text-black"
                >
                  Done
                </button>
              </div>
            </PopoverContent>
          </Popover>

          <div className="flex items-center">
            <Button type="button" onClick={handleSearch} className="rounded-full h-11 px-6 inline-flex items-center gap-2 group bg-primary text-white hover:bg-dark duration-300">
              <span>Search</span>
              <IconChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertySearchBar


