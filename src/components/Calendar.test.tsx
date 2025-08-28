import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Calendar } from './Calendar'
import { weddingData } from '../data/weddingData'

describe('Calendar Component', () => {
  it('renders section title', () => {
    render(<Calendar data={weddingData} />)
    
    expect(screen.getByText('Wedding Day')).toBeInTheDocument()
  })
  
  it('displays wedding time', () => {
    render(<Calendar data={weddingData} />)
    
    expect(screen.getByText(weddingData.wedding.time)).toBeInTheDocument()
  })
  
  it('shows calendar grid with 7 day names', () => {
    render(<Calendar data={weddingData} />)
    
    const dayNames = ['일', '월', '화', '수', '목', '금', '토']
    dayNames.forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument()
    })
  })
  
  it('highlights wedding date', () => {
    const { container } = render(<Calendar data={weddingData} />)
    
    const weddingDayElement = container.querySelector('.wedding-day')
    expect(weddingDayElement).toBeInTheDocument()
  })
  
  it('displays correct month and year', () => {
    render(<Calendar data={weddingData} />)
    
    expect(screen.getByText('2025')).toBeInTheDocument()
    expect(screen.getByText('3월')).toBeInTheDocument()
    expect(screen.getByText('15일')).toBeInTheDocument()
  })
})