import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ThemeToggle from '@/components/ThemeToggle'

const mockOnToggle = jest.fn()

const defaultProps = {
  isDark: false,
  onToggle: mockOnToggle,
}

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders toggle button', () => {
    render(<ThemeToggle {...defaultProps} />)
    
    const button = screen.getByRole('button', { name: /toggle dark mode/i })
    expect(button).toBeInTheDocument()
  })

  it('has correct accessibility label', () => {
    render(<ThemeToggle {...defaultProps} />)
    
    const button = screen.getByLabelText('Toggle dark mode')
    expect(button).toBeInTheDocument()
  })

  it('has screen reader text for light mode', () => {
    render(<ThemeToggle {...defaultProps} isDark={false} />)
    
    expect(screen.getByText('Switch to dark mode')).toBeInTheDocument()
  })

  it('has screen reader text for dark mode', () => {
    render(<ThemeToggle {...defaultProps} isDark={true} />)
    
    expect(screen.getByText('Switch to light mode')).toBeInTheDocument()
  })

  it('calls onToggle when clicked', () => {
    render(<ThemeToggle {...defaultProps} />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(mockOnToggle).toHaveBeenCalledTimes(1)
  })

  it('applies light mode styling when isDark is false', () => {
    render(<ThemeToggle {...defaultProps} isDark={false} />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-gray-300')
    expect(button).not.toHaveClass('bg-primary')
  })

  it('applies dark mode styling when isDark is true', () => {
    render(<ThemeToggle {...defaultProps} isDark={true} />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-primary')
    expect(button).not.toHaveClass('bg-gray-300')
  })

  it('positions toggle knob correctly in light mode', () => {
    render(<ThemeToggle {...defaultProps} isDark={false} />)
    
    const knob = document.querySelector('span.translate-x-1')
    expect(knob).toBeInTheDocument()
    expect(knob).not.toHaveClass('translate-x-6')
  })

  it('positions toggle knob correctly in dark mode', () => {
    render(<ThemeToggle {...defaultProps} isDark={true} />)
    
    const knob = document.querySelector('span.translate-x-6')
    expect(knob).toBeInTheDocument()
    expect(knob).not.toHaveClass('translate-x-1')
  })

  it('has proper transition classes', () => {
    render(<ThemeToggle {...defaultProps} />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('transition-colors', 'duration-300', 'ease-in-out')
    
    const knob = button.querySelector('span')
    expect(knob).toHaveClass('transition-transform', 'duration-300', 'ease-in-out')
  })

  it('has focus ring for accessibility', () => {
    render(<ThemeToggle {...defaultProps} />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-primary')
  })

  it('has proper dimensions', () => {
    render(<ThemeToggle {...defaultProps} />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('h-6', 'w-11')
    
    const knob = button.querySelector('span')
    expect(knob).toHaveClass('h-4', 'w-4')
  })

  it('is keyboard accessible', () => {
    render(<ThemeToggle {...defaultProps} />)
    
    const button = screen.getByRole('button')
    button.focus()
    
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' })
    expect(mockOnToggle).toHaveBeenCalledTimes(1)
  })

  it('prevents multiple rapid clicks', () => {
    render(<ThemeToggle {...defaultProps} />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    fireEvent.click(button)
    fireEvent.click(button)
    
    expect(mockOnToggle).toHaveBeenCalledTimes(3)
  })
}) 