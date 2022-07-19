# TEDFBCH
Tercer entrega desafío final curso backend de coderHouse, e-commerce, con react, express, mongoose, passport

# Defined Endpoints
## Categories 
>/api/categories/ (get)

>/api/categories/:id (get)

>/api/categories/ (post) --> Body(JSON) --> {name, description}

>/api/categories/:id (put) --> Body(JSON) --> {name, description} Not necessary all fields

>/api/categories/:id (delete)

## Products
>/api/product/ (get)

>/api/product/:id (get)

>/api/product/ (post) --> Body(JSON) --> {name, description, price, stock, categoryId}

>/api/product/:id (put) --> Body(JSON) --> {name, description, price, stock, categoryId} Not necessary all fields

>/api/product/:id (delete)

## Cart (Must be loggedIn)
>/api/cart/ (get)

>/api/cart/add (post) --> Body(JSON) --> {productId, amount} 
 
>/api/cart/remove (post) --> Body(JSON) --> {productId, amount}

>/api/cart/order (post)

## User
>/api/user/login (post) --> Body(JSON) --> {email, password}
>/api/user/signup (post) --> Body(JSON) --> {email, password, name, adress , phone, age}
>/api/user/setAvatar (post) Input:file from the frontend