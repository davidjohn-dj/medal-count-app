import { GET } from '../route'
import { MedalData } from '../../../../types'

describe('/api/medals API endpoint', () => {
  it('returns medal data with correct structure', async () => {
    const response = await GET()
    
    expect(response.status).toBe(200)
    
    const data = await response.json()
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
    
    // Check structure of first medal entry
    const firstMedal = data[0]
    expect(firstMedal).toHaveProperty('code')
    expect(firstMedal).toHaveProperty('gold')
    expect(firstMedal).toHaveProperty('silver')
    expect(firstMedal).toHaveProperty('bronze')
    
    expect(typeof firstMedal.code).toBe('string')
    expect(typeof firstMedal.gold).toBe('number')
    expect(typeof firstMedal.silver).toBe('number')
    expect(typeof firstMedal.bronze).toBe('number')
  })

  it('returns valid country codes', async () => {
    const response = await GET()
    const data = await response.json()
    
    // Check that all country codes are valid (3-letter strings)
    data.forEach((medal: MedalData) => {
      expect(medal.code).toMatch(/^[A-Z]{3}$/)
    })
  })

  it('returns non-negative medal counts', async () => {
    const response = await GET()
    const data = await response.json()
    
    data.forEach((medal: MedalData) => {
      expect(medal.gold).toBeGreaterThanOrEqual(0)
      expect(medal.silver).toBeGreaterThanOrEqual(0)
      expect(medal.bronze).toBeGreaterThanOrEqual(0)
    })
  })

  it('includes expected countries', async () => {
    const response = await GET()
    const data = await response.json()
    
    const countryCodes = data.map((medal: MedalData) => medal.code)
    
    // Check for some expected countries
    expect(countryCodes).toContain('USA')
    expect(countryCodes).toContain('RUS')
    expect(countryCodes).toContain('NOR')
  })

  it('has consistent data format', async () => {
    const response = await GET()
    const data = await response.json()
    
    // All entries should have the same keys
    const expectedKeys = ['code', 'gold', 'silver', 'bronze']
    
    data.forEach((medal: MedalData) => {
      expect(Object.keys(medal).sort()).toEqual(expectedKeys.sort())
    })
  })

  it('returns proper HTTP headers', async () => {
    const response = await GET()
    
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('application/json')
  })
}) 