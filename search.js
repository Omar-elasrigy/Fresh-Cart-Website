 function searchForItems(event)
{
    
    let searchBarText=document.getElementsByClassName("searchBar")[0]
   
   let product=searchBarText.value
   while (!(product.length>0))
    {
        event.preventDefault()

    }
    
    let renderedProducts = document.querySelectorAll(".card");
    renderedProducts.forEach(function(product) {
        product.remove();
    });
    let errorMessage= document.querySelectorAll(".errorMessage")
    errorMessage.forEach(function(error) {
        error.remove();
    });
    let req=fetch(`https://dummyjson.com/products/search?q=${product}`)
    req.then(function(stringObject){
        if (!stringObject.ok )
            {
                let searchBar=document.getElementsByClassName("searchBar")[0]
                const html= `<div class="errorMessage">Item not found</div>`

                let cartDivError=document.getElementsByClassName("display")[0]
                cartDivError.insertAdjacentHTML("beforeend",html)

                

            throw new Error("item not found")

           
        } 
        else{
           
            return stringObject.json()

            }
       
    })
    .then(function(data) {
        if(data.products.length>0)
            { 
                for (let i=0;i<data.products.length;i++)
                    {
                       
                        
                        let product= data.products[i]
                        renderProduct(product)
                        searchBarText.value="" 
                        


                    }
                
            }
        else
        {
            searchBarText.value="" 

            let searchBar=document.getElementsByClassName("formSearch")[0]
            const html= `<div class="errorMessage">Item not found</div>`

            //omar's merging
            let cartDivError=document.getElementsByClassName("display")[0]
            cartDivError.insertAdjacentHTML("beforeend",html)
           
            throw new Error("item not found")
        }
       
        
    })
    
    .catch(function(error) {
        console.error('Error:', error);
    })
    
}
 function renderProduct(object)

{
    
            if(object.brand==undefined)
                {
                    object.brand="Brand Unknown"
                }
        
    let imageRender=`<img src="${object.thumbnail}" class="searchImages">`
  

    const html= `
                        <div class="card">
                         <div id="enterProduct">
                            ${imageRender}
                            <div id="infoProduct">
                                <span>${object.brand}</span>
                                <h3>${object.title}</h3>
                                <div class="price">
                                    <span>${object.price}$</span>
                                    <span>-${object.discountPercentage}%</span>
                                </div>
                                <div class="add">
                                    <p>rating <span>${object.rating}</span></p>
                                </div>
                            </div>
                         </div>
                            <button value="${object.id}" id="addToCart"><i class="fa-solid fa-plus"></i> Add to Cart</button>
                        </div>
                        
                        `
                        
                /////
                


                /////
               
                let cartDiv=document.getElementsByClassName("display")[0]
                cartDiv.insertAdjacentHTML("beforeend",html)
                
                // adding to cart
                // let addToCartButton=document.getElementById("addToCart")
                // addToCartButton.addEventListener("click",function(){
                //     localStorage.setItem("cart",JSON.stringify(object))
                //     window.location.href="test2.html"
                // })


                // // send selected object to new page
               
                    let productCard = cartDiv.lastElementChild;
                    if (productCard) {
                        productCard.addEventListener("click", function() {
                            localStorage.setItem('selectedProductId', object.id);
                            localStorage.setItem(`selectedProduct-${object.id}`, JSON.stringify(object));

                            window.location.href = "singleProductPage.html";
                        });
                    } else {
                        console.error("Product card element not found");
                    }
                
                    
                
}
