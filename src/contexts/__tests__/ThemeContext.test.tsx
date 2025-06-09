import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThemeProvider, useTheme } from '../ThemeContext'

// Test component to use the theme context
const TestComponent = () => {
  const { isDark, toggleTheme } = useTheme()
  
  return (
    <div>
      <div data-testid="theme-status">{isDark ? 'dark' : 'light'}</div>
      <button onClick={toggleTheme} data-testid="toggle-button">
        Toggle Theme
      </button>
    </div>
  )
}

// Test component that tries to use context outside provider
const ComponentWithoutProvider = () => {
  const { isDark } = useTheme()
  return <div>{isDark ? 'dark' : 'light'}</div>
}

describe('ThemeContext', () => {
  let mockLocalStorage: Record<string, string>

  beforeEach(() => {
    // Mock localStorage
    mockLocalStorage = {}
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key: string) => mockLocalStorage[key] || null),
        setItem: jest.fn((key: string, value: string) => {
          mockLocalStorage[key] = value
        }),
        removeItem: jest.fn((key: string) => {
          delete mockLocalStorage[key]
        }),
        clear: jest.fn(() => {
          mockLocalStorage = {}
        }),
      },
      writable: true,
    })

    // Mock document.documentElement
    Object.defineProperty(document, 'documentElement', {
      value: {
        classList: {
          add: jest.fn(),
          remove: jest.fn(),
        },
      },
      writable: true,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('throws error when useTheme is used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      render(<ComponentWithoutProvider />)
    }).toThrow('useTheme must be used within a ThemeProvider')
    
    consoleSpy.mockRestore()
  })

  it('provides default light theme on initial render', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('light')
    })
  })

  it('loads saved theme from localStorage', async () => {
    // Set dark theme in localStorage
    mockLocalStorage['theme'] = 'dark'

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('dark')
    })
  })

  it('defaults to light when localStorage has light theme', async () => {
    mockLocalStorage['theme'] = 'light'

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('light')
    })
  })

  it('toggles theme from light to dark', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    // Initially light
    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('light')
    })

    // Click toggle
    fireEvent.click(screen.getByTestId('toggle-button'))

    // Should now be dark
    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('dark')
    })
  })

  it('toggles theme from dark to light', async () => {
    mockLocalStorage['theme'] = 'dark'

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    // Initially dark
    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('dark')
    })

    // Click toggle
    fireEvent.click(screen.getByTestId('toggle-button'))

    // Should now be light
    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('light')
    })
  })

  it('saves theme preference to localStorage when toggling to dark', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    fireEvent.click(screen.getByTestId('toggle-button'))

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark')
    })
  })

  it('saves theme preference to localStorage when toggling to light', async () => {
    mockLocalStorage['theme'] = 'dark'

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    fireEvent.click(screen.getByTestId('toggle-button'))

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light')
    })
  })

  it('adds dark class to document element when theme is dark', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    fireEvent.click(screen.getByTestId('toggle-button'))

    await waitFor(() => {
      expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark')
    })
  })

  it('removes dark class from document element when theme is light', async () => {
    mockLocalStorage['theme'] = 'dark'

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    fireEvent.click(screen.getByTestId('toggle-button'))

    await waitFor(() => {
      expect(document.documentElement.classList.remove).toHaveBeenCalledWith('dark')
    })
  })

  it('handles invalid localStorage values gracefully', async () => {
    mockLocalStorage['theme'] = 'invalid-value'

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    // Should default to light theme
    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('light')
    })
  })

  it('works when localStorage is not available', async () => {
    // Mock localStorage to throw error
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => {
          throw new Error('localStorage not available')
        }),
        setItem: jest.fn(),
      },
      writable: true,
    })

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    // Should still work with default light theme
    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('light')
    })
  })

  it('provides stable toggle function reference', async () => {
    const toggleRefs: (() => void)[] = []
    
    const TestStability = () => {
      const { toggleTheme } = useTheme()
      toggleRefs.push(toggleTheme)
      return <div>test</div>
    }

    const { rerender } = render(
      <ThemeProvider>
        <TestStability />
      </ThemeProvider>
    )

    rerender(
      <ThemeProvider>
        <TestStability />
      </ThemeProvider>
    )

    // Toggle function should be stable across re-renders
    expect(toggleRefs[0]).toBe(toggleRefs[1])
  })
}) 