import cds from '@sap/cds'

jest.setTimeout(60000)

describe('CAP Smoke Tests', () => {
  const { GET } = cds.test(__dirname + '/../..', '--in-memory')

  it('should load CDS successfully', () => {
    expect(cds).toBeDefined()
  })

  it('should serve CatalogService metadata', async () => {
    const response = await GET('/catalog/$metadata')

    expect(response.status).toBe(200)
    expect(response.data).toContain('EntityContainer')
    expect(response.data).toContain('Books')
  })

  it('should retrieve books from catalog', async () => {
    const response = await GET('/catalog/Books')

    expect(response.status).toBe(200)
    expect(response.data.value).toBeDefined()
    expect(Array.isArray(response.data.value)).toBe(true)
  })
})
