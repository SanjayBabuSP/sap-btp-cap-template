import cds from '@sap/cds'

jest.setTimeout(60000)

interface Book {
  ID: number
  title?: string
  stock?: number
  criticality?: number
}

describe('CatalogService Tests', () => {
  const { GET, POST } = cds.test(__dirname + '/../..', '--in-memory')

  describe('Books Entity', () => {
    it('should retrieve all books', async () => {
      const response = await GET('/catalog/Books')

      expect(response.status).toBe(200)
      expect(response.data.value).toBeDefined()
      expect(Array.isArray(response.data.value)).toBe(true)
      expect(response.data.value.length).toBeGreaterThan(0)
    })

    it('should retrieve a specific book by ID', async () => {
      // First get all books to get a valid ID
      const allBooks = await GET('/catalog/Books')
      const firstBook: Book = allBooks.data.value[0]

      if (firstBook) {
        const response = await GET(`/catalog/Books(${firstBook.ID})`)

        expect(response.status).toBe(200)
        expect(response.data.ID).toBe(firstBook.ID)
        expect(response.data.title).toBeDefined()
      }
    })

    it('should add criticality for low stock books', async () => {
      const response = await GET('/catalog/Books')

      const lowStockBooks: Book[] = response.data.value.filter((book: Book) => book.stock && book.stock < 10)

      lowStockBooks.forEach(book => {
        expect(book.criticality).toBe(2) // Warning criticality
      })
    })
  })

  describe('Custom Actions', () => {
    it('should submit an order successfully', async () => {
      // Get a book with stock
      const booksResponse = await GET('/catalog/Books')
      const bookWithStock: Book | undefined = booksResponse.data.value.find((b: Book) => b.stock && b.stock > 0)

      if (bookWithStock) {
        const response = await POST('/catalog/submitOrder', {
          book: bookWithStock.ID,
          quantity: 1,
        })

        expect(response.status).toBe(200)
        expect(response.data.message).toContain('successfully')
      }
    })

    it('should fail order when book not found', async () => {
      const response = await POST('/catalog/submitOrder', {
        book: 99999, // Non-existent ID
        quantity: 1,
      })

      expect(response.status).toBe(404)
    })

    it('should fail order with insufficient stock', async () => {
      // Get a book
      const booksResponse = await GET('/catalog/Books')
      const book: Book = booksResponse.data.value[0]

      if (book) {
        const response = await POST('/catalog/submitOrder', {
          book: book.ID,
          quantity: 999999, // Impossible quantity
        })

        expect(response.status).toBe(400)
        expect(response.data.error.message).toContain('Insufficient stock')
      }
    })
  })
})
