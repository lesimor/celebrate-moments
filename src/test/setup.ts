import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll } from 'vitest'

// Mock IntersectionObserver
beforeAll(() => {
  (globalThis as any).IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
    takeRecords() {
      return []
    }
  } as any
})

afterEach(() => {
  cleanup()
})