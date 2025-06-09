import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from '../../components/Header'
import { ThemeProvider } from '../../contexts/ThemeContext'

// Mock the ThemeContext
const mockToggleTheme = jest.fn()
const mockThemeContext = {
  isDark: false,
  toggleTheme: mockToggleTheme,
}

jest.mock('../../contexts/ThemeContext', () => ({
  ...jest.requireActual('../../contexts/ThemeContext'),
  useTheme: () => mockThemeContext,
}))

const HeaderWithTheme = ({ isDark = false }: { isDark?: boolean }) => {
  mockThemeContext.isDark = isDark
  return (
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  )
}

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the main title correctly', () => {
    render(<HeaderWithTheme />)
    expect(screen.getByRole('heading', { name: /medal count/i })).toBeInTheDocument()
  })

  it('renders the subtitle correctly', () => {
    render(<HeaderWithTheme />)
    expect(screen.getByText('Olympic Medal Standings')).toBeInTheDocument()
  })

  it('renders all 5 Olympic rings', () => {
    render(<HeaderWithTheme />)
    // Olympic rings are divs with specific border colors
    const rings = document.querySelectorAll('.olympic-ring')
    expect(rings).toHaveLength(5)
  })

  it('renders theme toggle with sun icon in light mode', () => {
    render(<HeaderWithTheme isDark={false} />)
    expect(screen.getByText('☀️')).toBeInTheDocument()
  })

  it('renders theme toggle with moon icon in dark mode', () => {
    render(<HeaderWithTheme isDark={true} />)
    expect(screen.getByText('🌙')).toBeInTheDocument()
  })

  it('calls toggleTheme when theme toggle is clicked', () => {
    render(<HeaderWithTheme />)
    const toggleButton = screen.getByRole('button', { name: /toggle dark mode/i })
    fireEvent.click(toggleButton)
    expect(mockToggleTheme).toHaveBeenCalledTimes(1)
  })

  it('has proper responsive classes', () => {
    render(<HeaderWithTheme />)
    const title = screen.getByRole('heading', { name: /medal count/i })
    expect(title).toHaveClass('text-4xl', 'md:text-5xl', 'lg:text-6xl')
  })

  it('renders with relative positioning for theme toggle placement', () => {
    const { container } = render(<HeaderWithTheme />)
    const header = container.querySelector('header')
    expect(header).toHaveClass('relative')
  })

  it('theme toggle is positioned absolutely in top right', () => {
    render(<HeaderWithTheme />)
    const toggleContainer = document.querySelector('.absolute.top-0.right-0')
    expect(toggleContainer).toBeInTheDocument()
  })
}) 