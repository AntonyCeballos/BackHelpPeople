export const queries = {
    getAllProducts: "SELECT * FROM Products",
    createNewProduct: "INSERT INTO Products (name, description, price, category_id) VALUES (@name, @description, @price, @category_id)",
    getProductId: "SELECT * FROM Products WHERE id = @id",
    deleteProduct: "DELETE FROM Products WHERE id = @id",
    updateProduct: "UPDATE Products SET name = @name, description = @description, price = @price, category_id = @category_id WHERE id = @id"
}

export const categoryqueries = {
    getAllCategories: "SELECT * FROM Categories",
    createNewCategory: "INSERT INTO Categories (name) VALUES (@name)",
    getOneCategory: "SELECT * FROM Categories WHERE id = @id",
    deleteCategory: "DELETE FROM Categories WHERE id = @id",
    updateCategory: "UPDATE Categories SET name = @name WHERE id = @id"
}

export const userQueries = {
    createNewUser: "INSERT INTO Users (username, email, password) VALUES (@username, @email, @password)",
    //uploadAllUsers: "INSERT INTO Users (username, email, password) VALUES (@username, @Email, @Password)"

}