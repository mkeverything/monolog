'use client'

import { cn } from '@/src/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

const ITEM_WIDTH = 180
const ITEM_HEIGHT = 240
const ITEM_GAP = 120
const BUFFER = 2.5
const EASE = 0.075
const MOMENTUM_FACTOR = 200

const images = [
  '/assets/showcases/image-1.png',
  '/assets/showcases/image-2.png',
  '/assets/showcases/image-3.png',
  '/assets/showcases/image-4.png',
  '/assets/process-gallery/card-1.png',
  '/assets/process-gallery/card-2.png',
  '/assets/process-gallery/card-3.png',
  '/assets/process-gallery/card-4.png',
  '/assets/process-gallery/card-5.png',
  '/assets/product/image-1.png',
  '/assets/product/image-2.png',
  '/assets/product/image-3.png',
  '/assets/roles/project-manager.png',
  '/assets/roles/product-manager.png',
  '/assets/roles/designer-senior.png',
  '/assets/roles/analytics.png',
  '/assets/roles/team-lead-senior.png',
  '/assets/roles/frontend-senior.png',
  '/assets/roles/frontend-middle.png',
  '/assets/roles/frontend-junior.png',
]

function getImageIndex(col: number, row: number): number {
  const index = Math.abs(row * 4 + col) % images.length
  return index
}

function getItemId(col: number, row: number): string {
  return `${col},${row}`
}

type GalleryItem = {
  id: string
  col: number
  row: number
  left: number
  top: number
  imageIndex: number
}

export function InfiniteGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<Map<string, GalleryItem>>(
    new Map(),
  )
  const [isDragging, setIsDragging] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [expandedItem, setExpandedItem] = useState<GalleryItem | null>(null)
  const [expandedRect, setExpandedRect] = useState<{
    left: number
    top: number
  } | null>(null)
  const [cursor, setCursor] = useState('grab')

  const stateRef = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    dragVelocityX: 0,
    dragVelocityY: 0,
    lastDragTime: 0,
    mouseHasMoved: false,
    startX: 0,
    startY: 0,
    canDrag: true,
  })

  const rafRef = useRef<number | null>(null)
  const hasInitialized = useRef(false)

  const updateVisibleItems = useCallback(() => {
    const state = stateRef.current
    const viewWidth = window.innerWidth * (1 + BUFFER)
    const viewHeight = window.innerHeight * (1 + BUFFER)

    const movingRight = state.targetX > state.currentX
    const movingDown = state.targetY > state.currentY
    const directionBufferX = movingRight ? -300 : 300
    const directionBufferY = movingDown ? -300 : 300

    const startCol = Math.floor(
      (-state.currentX - viewWidth / 2 + (movingRight ? directionBufferX : 0)) /
        (ITEM_WIDTH + ITEM_GAP),
    )
    const endCol = Math.ceil(
      (-state.currentX +
        viewWidth * 1.5 +
        (!movingRight ? directionBufferX : 0)) /
        (ITEM_WIDTH + ITEM_GAP),
    )
    const startRow = Math.floor(
      (-state.currentY - viewHeight / 2 + (movingDown ? directionBufferY : 0)) /
        (ITEM_HEIGHT + ITEM_GAP),
    )
    const endRow = Math.ceil(
      (-state.currentY +
        viewHeight * 1.5 +
        (!movingDown ? directionBufferY : 0)) /
        (ITEM_HEIGHT + ITEM_GAP),
    )

    const newVisibleItems = new Map<string, GalleryItem>()

    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const id = getItemId(col, row)
        if (isExpanded && expandedItem?.id === id) continue

        newVisibleItems.set(id, {
          id,
          col,
          row,
          left: col * (ITEM_WIDTH + ITEM_GAP),
          top: row * (ITEM_HEIGHT + ITEM_GAP),
          imageIndex: getImageIndex(col, row),
        })
      }
    }

    setVisibleItems(newVisibleItems)
  }, [isExpanded, expandedItem])

  useEffect(() => {
    const interval = setInterval(() => {
      updateVisibleItems()
    }, 100)
    return () => clearInterval(interval)
  }, [updateVisibleItems])

  useEffect(() => {
    const animate = () => {
      const state = stateRef.current

      if (state.canDrag && !isExpanded) {
        state.currentX += (state.targetX - state.currentX) * EASE
        state.currentY += (state.targetY - state.currentY) * EASE

        const canvas = document.getElementById('gallery-canvas')
        if (canvas) {
          canvas.style.transform = `translate(${state.currentX}px, ${state.currentY}px)`
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [isExpanded])

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true
      window.setTimeout(updateVisibleItems, 0)
    }
  }, [updateVisibleItems])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const state = stateRef.current
    if (!state.canDrag) return

    setIsDragging(true)
    state.mouseHasMoved = false
    state.startX = e.clientX
    state.startY = e.clientY
    setCursor('grabbing')
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const state = stateRef.current
      if (!isDragging || !state.canDrag) return

      const dx = e.clientX - state.startX
      const dy = e.clientY - state.startY

      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        state.mouseHasMoved = true
      }

      const now = Date.now()
      const dt = Math.max(10, now - state.lastDragTime)

      state.dragVelocityX = dx / dt
      state.dragVelocityY = dy / dt
      state.lastDragTime = now

      state.targetX += dx
      state.targetY += dy
      state.startX = e.clientX
      state.startY = e.clientY
    },
    [isDragging],
  )

  const handleMouseUp = useCallback(() => {
    const state = stateRef.current
    if (!isDragging) return

    setIsDragging(false)
    setCursor('grab')

    if (
      Math.abs(state.dragVelocityX) > 0.1 ||
      Math.abs(state.dragVelocityY) > 0.1
    ) {
      state.targetX += state.dragVelocityX * MOMENTUM_FACTOR
      state.targetY += state.dragVelocityY * MOMENTUM_FACTOR
    }

    state.dragVelocityX = 0
    state.dragVelocityY = 0
  }, [isDragging])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const state = stateRef.current
    if (!state.canDrag) return

    setIsDragging(true)
    state.mouseHasMoved = false
    state.startX = e.touches[0].clientX
    state.startY = e.touches[0].clientY
  }, [])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const state = stateRef.current
      if (!isDragging || !state.canDrag) return

      const dx = e.touches[0].clientX - state.startX
      const dy = e.touches[0].clientY - state.startY

      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        state.mouseHasMoved = true
      }

      state.targetX += dx
      state.targetY += dy
      state.startX = e.touches[0].clientX
      state.startY = e.touches[0].clientY
    },
    [isDragging],
  )

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleItemClick = useCallback(
    (item: GalleryItem, e: React.MouseEvent) => {
      const state = stateRef.current
      if (state.mouseHasMoved || isDragging) return

      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      setExpandedRect({
        left: rect.left + ITEM_WIDTH / 2 - window.innerWidth / 2,
        top: rect.top + ITEM_HEIGHT / 2 - window.innerHeight / 2,
      })
      setExpandedItem(item)
      setIsExpanded(true)
      state.canDrag = false
      setCursor('auto')

      const newVisible = new Map(visibleItems)
      newVisible.delete(item.id)
      setVisibleItems(newVisible)
    },
    [isDragging, visibleItems],
  )

  const closeExpanded = useCallback(() => {
    const state = stateRef.current
    setIsExpanded(false)
    state.canDrag = true
    setCursor('grab')
    state.dragVelocityX = 0
    state.dragVelocityY = 0

    setTimeout(() => {
      setExpandedItem(null)
      setExpandedRect(null)
      updateVisibleItems()
    }, 500)
  }, [updateVisibleItems])

  return (
    <div
      ref={containerRef}
      className='bg-base-100 fixed inset-0 overflow-hidden'
      style={{ cursor }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        id='gallery-canvas'
        className='absolute top-1/2 left-1/2'
        style={{
          width: 0,
          height: 0,
        }}
      >
        {Array.from(visibleItems.values()).map((item) => (
          <motion.div
            key={item.id}
            className={cn(
              'absolute overflow-hidden rounded-lg shadow-lg',
              'hover:scale-105 hover:shadow-xl',
            )}
            style={{
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
              left: item.left,
              top: item.top,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isExpanded && expandedItem?.id !== item.id ? 0.3 : 1,
              scale: 1,
            }}
            transition={{ duration: 0.3 }}
            onClick={(e) => handleItemClick(item, e)}
          >
            <Image
              src={images[item.imageIndex]}
              alt={`Gallery image ${item.imageIndex + 1}`}
              fill
              className='object-cover'
              sizes='180px'
              draggable={false}
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isExpanded && expandedItem && expandedRect && (
          <>
            <motion.div
              className='fixed inset-0 z-40 bg-black/60'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeExpanded}
            />
            <motion.div
              className='fixed z-50 overflow-hidden rounded-xl shadow-2xl'
              style={{
                left: '50%',
                top: '50%',
                x: '-50%',
                y: '-50%',
              }}
              initial={{
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                x: expandedRect.left,
                y: expandedRect.top,
              }}
              animate={{
                width: window.innerWidth * 0.5,
                height: window.innerWidth * 0.5 * (ITEM_HEIGHT / ITEM_WIDTH),
                x: '-50%',
                y: '-50%',
              }}
              exit={{
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                x: expandedRect.left,
                y: expandedRect.top,
              }}
              transition={{
                duration: 0.6,
                ease: [0.76, 0, 0.24, 1],
              }}
              onClick={closeExpanded}
            >
              <Image
                src={images[expandedItem.imageIndex]}
                alt={`Expanded image ${expandedItem.imageIndex + 1}`}
                fill
                className='object-cover'
                sizes='50vw'
                draggable={false}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* 
      <div className='pointer-events-none fixed bottom-8 left-1/2 z-30 -translate-x-1/2'>
        <p className='text-base-content/60 bg-base-100/80 rounded-full px-4 py-2 text-sm backdrop-blur-sm'>
          Перетащите для навигации · Нажмите для просмотра
        </p>
      </div> */}
    </div>
  )
}
