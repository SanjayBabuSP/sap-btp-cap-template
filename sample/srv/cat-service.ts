import cds from '@sap/cds'

interface Book {
  ID: number
  title?: string
  stock?: number
  criticality?: number
}

interface SubmitOrderRequest {
  book: number
  quantity: number
}

interface SubmitOrderResponse {
  message: string
  book: string
  quantity: number
}

export default cds.service.impl(async function (this: cds.Service) {
  const { Books } = this.entities

  // Add custom logic before READ
  this.before('READ', Books, async req => {
    console.log('Reading books...')
  })

  // Add custom logic after READ
  this.after('READ', Books, async (books: Book | Book[]) => {
    if (Array.isArray(books)) {
      books.forEach(book => {
        if (book.stock && book.stock < 10) {
          book.criticality = 2 // Warning
        }
      })
    }
    return books
  })

  // Custom action example
  this.on('submitOrder', async req => {
    const { book, quantity } = req.data as SubmitOrderRequest

    // Validate stock
    const bookRecord = await SELECT.one.from(Books).where({ ID: book })
    if (!bookRecord) {
      return req.error(404, 'Book not found')
    }

    if (bookRecord.stock < quantity) {
      return req.error(400, 'Insufficient stock')
    }

    // Update stock
    await UPDATE(Books)
      .set({ stock: bookRecord.stock - quantity })
      .where({ ID: book })

    const response: SubmitOrderResponse = {
      message: 'Order submitted successfully',
      book: bookRecord.title,
      quantity,
    }

    return response
  })
})
