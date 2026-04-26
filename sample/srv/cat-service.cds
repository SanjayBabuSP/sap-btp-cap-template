using my.bookshop as my from '../db/schema';

service CatalogService {
    entity Books as projection on my.Books;
    
    action submitOrder(book: Integer, quantity: Integer) returns {
        message: String;
        book: String;
        quantity: Integer;
    };
}
