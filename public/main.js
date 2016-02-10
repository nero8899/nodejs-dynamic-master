
var productData = {
    
    description:'My awesome product description',
    price:100
};

// create new product

$.post('http://localhost:3000/product', productData, function(res){
    
    console.log(res);
    
});