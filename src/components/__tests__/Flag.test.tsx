import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Flag from '../Flag'

describe('Flag Component', () => {
  it('renders flag with correct country code class', () => {
    render(<Flag countryCode="USA" countryName="United States" />)
    
    const flag = screen.getByRole('img', { name: /flag of united states/i })
    expect(flag).toHaveClass('flag-sprite', 'flag-usa')
  })

  it('renders flag with accessibility attributes', () => {
    render(<Flag countryCode="RUS" countryName="Russia" />)
    
    const flag = screen.getByRole('img')
    expect(flag).toHaveAttribute('aria-label', 'Flag of Russia')
    expect(flag).toHaveAttribute('title', 'Russia flag')
  })

  it('handles country code case insensitively', () => {
    render(<Flag countryCode="nor" countryName="Norway" />)
    
    const flag = screen.getByRole('img')
    expect(flag).toHaveClass('flag-nor')
  })

  it('uses country code as fallback when name not provided', () => {
    render(<Flag countryCode="GER" />)
    
    const flag = screen.getByRole('img')
    expect(flag).toHaveAttribute('aria-label', 'Flag of GER')
    expect(flag).toHaveAttribute('title', 'GER flag')
  })

  it('applies custom className when provided', () => {
    render(<Flag countryCode="CAN" className="custom-class" />)
    
    const flag = screen.getByRole('img')
    expect(flag).toHaveClass('custom-class')
  })

  it('renders placeholder for unknown country codes', () => {
    render(<Flag countryCode="XXX" countryName="Unknown Country" />)
    
    // Should render placeholder instead of flag sprite
    const placeholder = document.querySelector('.flag-placeholder')
    expect(placeholder).toBeInTheDocument()
  })
}) 