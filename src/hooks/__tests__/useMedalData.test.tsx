import { renderHook, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useMedalData } from '../../hooks/useMedalData'

// Mock fetch
global.fetch = jest.fn()

const mockMedalResponse = [
  { code: 'USA', gold: 9, silver: 7, bronze: 12 },
  { code: 'RUS', gold: 13, silver: 11, bronze: 9 },
  { code: 'NOR', gold: 11, silver: 5, bronze: 10 },
]

describe('useMedalData Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset fetch mock
    ;(fetch as jest.MockedFunction<typeof fetch>).mockClear()
  })

  it('returns initial loading state', () => {
    ;(fetch as jest.MockedFunction<typeof fetch>).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    )

    const { result } = renderHook(() => useMedalData())

    expect(result.current.loading).toBe(true)
    expect(result.current.medals).toEqual([])
    expect(result.current.error).toBe(null)
    expect(typeof result.current.refetch).toBe('function')
  })

  it('fetches medal data successfully', async () => {
    ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockMedalResponse,
    } as Response)

    const { result } = renderHook(() => useMedalData())

    // Initially loading
    expect(result.current.loading).toBe(true)
    expect(result.current.medals).toEqual([])

    // Wait for data to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // Check final state
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(null)
    expect(result.current.medals).toEqual([
      { code: 'USA', gold: 9, silver: 7, bronze: 12, total: 28 },
      { code: 'RUS', gold: 13, silver: 11, bronze: 9, total: 33 },
      { code: 'NOR', gold: 11, silver: 5, bronze: 10, total: 26 },
    ])
  })

  it('calculates total medals correctly', async () => {
    const testData = [
      { code: 'TEST', gold: 5, silver: 3, bronze: 2 },
    ]

    ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => testData,
    } as Response)

    const { result } = renderHook(() => useMedalData())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.medals[0].total).toBe(10) // 5 + 3 + 2
  })

  it('handles fetch error', async () => {
    ;(fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(
      new Error('Network error')
    )

    const { result } = renderHook(() => useMedalData())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    }, { timeout: 2000 })

    expect(result.current.loading).toBe(false)
    expect(result.current.medals).toEqual([])
    expect(result.current.error).toBe('Unable to load medal data: Network error. Please check your internet connection and try again.')
  })

  it('handles HTTP error responses', async () => {
    ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    } as Response)

    const { result } = renderHook(() => useMedalData())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.loading).toBe(false)
    expect(result.current.medals).toEqual([])
    expect(result.current.error).toBe('Failed to fetch medal data')
  })

  it('handles JSON parsing error', async () => {
    ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error('Invalid JSON')
      },
    } as unknown as Response)

    const { result } = renderHook(() => useMedalData())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.loading).toBe(false)
    expect(result.current.medals).toEqual([])
    expect(result.current.error).toBe('Failed to fetch medal data')
  })

  it('calls correct API endpoint', async () => {
    ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response)

    renderHook(() => useMedalData())

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/medals')
    })
  })

  it('refetch function works correctly', async () => {
    ;(fetch as jest.MockedFunction<typeof fetch>)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ code: 'USA', gold: 1, silver: 1, bronze: 1 }],
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockMedalResponse,
      } as Response)

    const { result } = renderHook(() => useMedalData())

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.medals).toHaveLength(1)

    // Call refetch
    result.current.refetch()

    // Should be loading again
    expect(result.current.loading).toBe(true)

    // Wait for refetch to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.medals).toHaveLength(3)
    expect(fetch).toHaveBeenCalledTimes(2)
  })

  it('handles empty response array', async () => {
    ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response)

    const { result } = renderHook(() => useMedalData())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.loading).toBe(false)
    expect(result.current.medals).toEqual([])
    expect(result.current.error).toBe(null)
  })

  it('handles malformed medal data gracefully', async () => {
    const malformedData = [
      { code: 'USA' }, // Missing medal counts
      { gold: 5, silver: 3, bronze: 2 }, // Missing country code
      { code: 'NOR', gold: 'invalid', silver: 5, bronze: 10 }, // Invalid gold count
    ]

    ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => malformedData,
    } as Response)

    const { result } = renderHook(() => useMedalData())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // Should handle gracefully, filtering out invalid entries or using defaults
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(null)
  })

  it('maintains stable refetch function reference', () => {
    ;(fetch as jest.MockedFunction<typeof fetch>).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    )

    const { result, rerender } = renderHook(() => useMedalData())

    const initialRefetch = result.current.refetch

    rerender()

    expect(result.current.refetch).toBe(initialRefetch)
  })

  it('resets error state on successful refetch', async () => {
    ;(fetch as jest.MockedFunction<typeof fetch>)
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockMedalResponse,
      } as Response)

    const { result } = renderHook(() => useMedalData())

    // Wait for initial error
    await waitFor(() => {
      expect(result.current.error).toBe('Failed to fetch medal data')
    })

    // Refetch
    result.current.refetch()

    // Wait for successful refetch
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBe(null)
    })

    expect(result.current.medals).toHaveLength(3)
  })
}) 