const productsInMemory = [];

const getAllProducts = (req,res) => {
    return res.json({
        data:productsInMemory
    });
};

const getProductById = (req,res) => {
    const { id } = req.params;
    const index = productsInMemory.findIndex(item => item.id == id);
    if (index < 0){
        return res.status(404).json({
            msg: 'Not exists a product whit that ID'
        })
    }
    res.json({
        data: productsInMemory[index]
    });
};

const createProduct = (req,res) => {
    const {name,description,price,stock,categoryId} = req.body;
    const newProduct = {name, description, price, stock, categoryId, id: productsInMemory.length + 1};
    productsInMemory.push(newProduct);
    res.json({
        msg: 'Pdoduct created',
        data: newProduct
    })
};

const updateProduct = (req,res) => {
    const { id } = req.params;
    const index = productsInMemory.findIndex(item => item.id == id);
    if (index < 0){
        return res.status(404).json({
            msg: 'Not exists a product whit that ID'
        })
    }
    if(Object.keys(req.body).length == 0){
        return res.status(400).json({
            msg:'Body  its empty'
        })
    }
    if(req.body.name) productsInMemory[index].name = req.body.name;
    if(req.body.price) productsInMemory[index].price = req.body.price;
    if(req.body.stock) productsInMemory[index].stock = req.body.stock;
    if(req.body.description) productsInMemory[index].description = req.body.description;
    res.status(200).json({
        msg:'Product updated',
        data: productsInMemory[index]
    })
};

const deleteProduct = (req,res) => {
    const { id } = req.params;
    const index = productsInMemory.findIndex(item => item.id == id);
    if (index < 0){
        return res.status(404).json({
            msg: 'Not exists a product whit that ID'
        })
    }
    productsInMemory.splice(index, 1);
    res.json({
        msg: 'Product deleted'
    })
};

const productsMemoryController = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};

export default productsMemoryController;