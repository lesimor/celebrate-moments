import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Gallery } from './Gallery'
import { weddingData } from '../data/weddingData'

describe('Gallery Component', () => {
  it('renders section title', () => {
    render(<Gallery data={weddingData} />)
    
    expect(screen.getByText('Gallery')).toBeInTheDocument()
  })
  
  it('displays all gallery images', () => {
    render(<Gallery data={weddingData} />)
    
    const images = screen.getAllByRole('img')
    expect(images.length).toBe(weddingData.gallery.images.length)
  })
  
  it('opens modal when image is clicked', () => {
    const { container } = render(<Gallery data={weddingData} />)
    
    const firstImage = container.querySelector('.gallery-item')
    if (firstImage) {
      fireEvent.click(firstImage)
      
      const modal = container.querySelector('.gallery-modal')
      expect(modal).toBeInTheDocument()
    }
  })
  
  it('closes modal when close button is clicked', async () => {
    const { container } = render(<Gallery data={weddingData} />)
    
    const firstImage = container.querySelector('.gallery-item')
    if (firstImage) {
      fireEvent.click(firstImage)
      
      const closeButton = screen.getByLabelText('Close gallery')
      fireEvent.click(closeButton)
      
      // Wait for animation to complete
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const modal = container.querySelector('.gallery-modal')
      expect(modal).not.toBeInTheDocument()
    }
  })
  
  it('navigates between images in modal', () => {
    const { container } = render(<Gallery data={weddingData} />)
    
    const firstImage = container.querySelector('.gallery-item')
    if (firstImage) {
      fireEvent.click(firstImage)
      
      expect(screen.getByText('1 / 6')).toBeInTheDocument()
      
      const nextButton = screen.getByLabelText('Next image')
      fireEvent.click(nextButton)
      
      expect(screen.getByText('2 / 6')).toBeInTheDocument()
      
      const prevButton = screen.getByLabelText('Previous image')
      fireEvent.click(prevButton)
      
      expect(screen.getByText('1 / 6')).toBeInTheDocument()
    }
  })
})