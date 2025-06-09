import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import MedalTable from '../MedalTable'
import { MedalDataWithTotal, SortType } from '../../types'

const mockMedals: MedalDataWithTotal[] = [
  { code: 'USA', gold: 9, silver: 7, bronze: 12, total: 28 },
  { code: 'RUS', gold: 13, silver: 11, bronze: 9, total: 33 },
  { code: 'NOR', gold: 11, silver: 5, bronze: 10, total: 26 },
]

const mockOnSortChange = jest.fn()

const defaultProps = {
  medals: mockMedals,
  currentSort: 'gold' as SortType,
  onSortChange: mockOnSortChange,
}

describe('MedalTable Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the table with correct headers', () => {
    render(<MedalTable {...defaultProps} />)
    
    expect(screen.getByText('Rank')).toBeInTheDocument()
    expect(screen.getByText('Country')).toBeInTheDocument()
    expect(screen.getByText(/🥇/)).toBeInTheDocument()
    expect(screen.getByText(/🥈/)).toBeInTheDocument()
    expect(screen.getByText(/🥉/)).toBeInTheDocument()
    expect(screen.getByText('TOTAL')).toBeInTheDocument()
  })

  it('renders all medal data correctly', () => {
    render(<MedalTable {...defaultProps} />)
    
    // Check if all countries are displayed
    expect(screen.getByText('USA')).toBeInTheDocument()
    expect(screen.getByText('United States')).toBeInTheDocument()
    expect(screen.getByText('RUS')).toBeInTheDocument()
    expect(screen.getByText('Russia')).toBeInTheDocument()
    expect(screen.getByText('NOR')).toBeInTheDocument()
    expect(screen.getByText('Norway')).toBeInTheDocument()
  })

  it('displays medal counts correctly', () => {
    render(<MedalTable {...defaultProps} />)
    
    // Check USA medals (9, 7, 12, 28)
    expect(screen.getByText('9')).toBeInTheDocument()
    expect(screen.getByText('7')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText('28')).toBeInTheDocument()
  })

  it('displays ranking numbers correctly', () => {
    render(<MedalTable {...defaultProps} />)
    
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('shows sort indicator for current sort column', () => {
    render(<MedalTable {...defaultProps} currentSort="gold" />)
    
    const goldHeader = screen.getByText(/🥇.*↓/)
    expect(goldHeader).toBeInTheDocument()
  })

  it('calls onSortChange when gold header is clicked', () => {
    render(<MedalTable {...defaultProps} />)
    
    const goldHeader = screen.getByText(/🥇/)
    fireEvent.click(goldHeader)
    
    expect(mockOnSortChange).toHaveBeenCalledWith('gold')
  })

  it('calls onSortChange when silver header is clicked', () => {
    render(<MedalTable {...defaultProps} />)
    
    const silverHeader = screen.getByText(/🥈/)
    fireEvent.click(silverHeader)
    
    expect(mockOnSortChange).toHaveBeenCalledWith('silver')
  })

  it('calls onSortChange when bronze header is clicked', () => {
    render(<MedalTable {...defaultProps} />)
    
    const bronzeHeader = screen.getByText(/🥉/)
    fireEvent.click(bronzeHeader)
    
    expect(mockOnSortChange).toHaveBeenCalledWith('bronze')
  })

  it('calls onSortChange when total header is clicked', () => {
    render(<MedalTable {...defaultProps} />)
    
    const totalHeader = screen.getByText('TOTAL')
    fireEvent.click(totalHeader)
    
    expect(mockOnSortChange).toHaveBeenCalledWith('total')
  })

  it('applies active styling to current sort column', () => {
    render(<MedalTable {...defaultProps} currentSort="silver" />)
    
    const silverHeader = screen.getByText(/🥈/)
    expect(silverHeader.closest('th')).toHaveClass('sortable-header-active')
  })

  it('applies hover styling to sortable headers', () => {
    render(<MedalTable {...defaultProps} />)
    
    const goldHeader = screen.getByText(/🥇/)
    expect(goldHeader.closest('th')).toHaveClass('sortable-header')
  })

  it('renders with theme-aware classes', () => {
    const { container } = render(<MedalTable {...defaultProps} />)
    
    const tableContainer = container.querySelector('div')
    expect(tableContainer).toHaveClass('bg-card', 'shadow-card')
    
    const tableHeader = container.querySelector('thead')
    expect(tableHeader).toHaveClass('bg-gradient-primary', 'text-primary-foreground')
  })

  it('handles empty medals array', () => {
    render(<MedalTable {...defaultProps} medals={[]} />)
    
    // Headers should still be present
    expect(screen.getByText('Rank')).toBeInTheDocument()
    expect(screen.getByText('Country')).toBeInTheDocument()
    
    // No medal data should be displayed
    expect(screen.queryByText('USA')).not.toBeInTheDocument()
  })

  it('displays sort indicators correctly for different sort types', () => {
    const { rerender } = render(<MedalTable {...defaultProps} currentSort="gold" />)
    expect(screen.getByText(/🥇.*↓/)).toBeInTheDocument()
    
    rerender(<MedalTable {...defaultProps} currentSort="silver" />)
    expect(screen.getByText(/🥈.*↓/)).toBeInTheDocument()
    
    rerender(<MedalTable {...defaultProps} currentSort="bronze" />)
    expect(screen.getByText(/🥉.*↓/)).toBeInTheDocument()
    
    rerender(<MedalTable {...defaultProps} currentSort="total" />)
    expect(screen.getByText(/TOTAL.*↓/)).toBeInTheDocument()
  })
}) 