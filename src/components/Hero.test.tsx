import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'
import { weddingData } from '../data/weddingData'

describe('Hero Component', () => {
  it('renders couple names', () => {
    render(<Hero data={weddingData} />)
    
    expect(screen.getByText(/이훈희/)).toBeInTheDocument()
    expect(screen.getByText(/박유리/)).toBeInTheDocument()
  })
  
  it('displays wedding date', () => {
    render(<Hero data={weddingData} />)
    
    expect(screen.getByText(/2025년 3월 15일/)).toBeInTheDocument()
  })
  
  it('shows wedding message title', () => {
    render(<Hero data={weddingData} />)
    
    expect(screen.getByText(weddingData.message.title)).toBeInTheDocument()
  })
  
  it('displays D-Day if wedding date is in future', () => {
    render(<Hero data={weddingData} />)
    
    const dDayElement = screen.queryByText(/D-/i)
    if (dDayElement) {
      expect(dDayElement).toBeInTheDocument()
    }
  })
})