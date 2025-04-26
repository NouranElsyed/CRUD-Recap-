// id // name // price // image // desc //category

//^===========|> Global Variables
const productName = document.getElementById("productName");
const productImage = document.getElementById("productImage");
const productPrice = document.getElementById("productPrice");
const productDesc = document.getElementById("productDescription");
const productCategory = document.getElementById("productCategories");
const imgContainer = document.getElementById("imgContainer");

let products = []
let currentIndex = null;
let product = {}
    // {
    //     id: 1,
    //     name: "Product 1",
    //     image: "image1.jpg",
    //     desc: "Description for product 1",
    //     category: "Category A",
    // }
//^===========|> Load Products from Local Storage
products = JSON.parse(localStorage.getItem("products")) || []
DisplayProducts(products)
//^===========|> Preview Selected Image Next to Input
productImage.addEventListener('change', ()=>{
      imgContainer.classList.remove("d-none")
      imgContainer.innerHTML = `<img src="./images/${productImage.files[0].name}" alt="" class="rounded-5"></img>`
})
//^===========|> Add function
function AddProduct(){
    
//&===========|>1. set the product object and 2. put it in the array then 3. save it in local storage and 4. display the array and 5. clear the form 6. Remove the preview

        product = {
            name: productName.value,
            image: productImage.value === ""? null : `./images/${encodeURI(productImage.files[0].name)}`  ,  
            description: productDesc.value,
            price: productPrice.value,
            category: productCategory.value,
        }
        products.push(product)
        localStorage.setItem("products", JSON.stringify(products))
        DisplayProducts(products)
        ClearForm()
        RemoveThePreview()
        
      }
//^===========|> hide the preview and remove the imgContainer  function
function RemoveThePreview(){
      imgContainer.classList.add("d-none")
      imgContainer.innerHTML ="" 
    }
//^===========|> Clear the form function
function ClearForm(){
      
        productName.value = ""
        productImage.value = ""
        productPrice.value = ""
        productDesc.value = ""
        productCategory.value =""
    }
//^===========|>  Display  Products function
function DisplayProducts(arr,searchValue=""){

      let cardsContainer = ``

      
      arr.map((product,index) => {
        cardsContainer += `
         <div class="col">
            <div class="productCard shadow-lg py-3 px-5 rounded d-flex flex-column align-items-center justify-content-center">
              <img src=${product.image} alt="" class="w-100 rounded m-1">
              <h2 class="fs-5">  ${product.name.replace(new RegExp(searchValue, "gi"), match => `<span>${match}</span>`)}</h2>
              <p>${product.description}</p>
              <div class="categoryPrice d-flex flex justify-content-between w-100">
                <p>${product.category.replace(new RegExp(searchValue, "gi"), match => `<span>${match}</span>`)}</p>
                <span>$${product.price}</span>
              </div>
              <div class="w-100 d-flex flex-column gap-2 align-items-center justify-content-center">
                <button onclick="Update(${index})" class="w-100 btn btn-outline-warning">Update</button>
                <button onclick="DeleteProduct(${index})" class="w-100 btn btn-outline-danger">Delete</button>
              </div>  
            </div>
          </div>
        `
    });

    document.getElementById("cards").innerHTML = cardsContainer


    }
//^===========|> Delete product function
function DeleteProduct(index){
      //&=======|>  in case of Delete while update : Clear the form and change the buttons
      if(currentIndex!=null){
        document.getElementById("UpdateProductBtn").classList.add("d-none")
        document.getElementById("AddProductBtn").classList.remove("d-none")
        ClearForm()
        currentIndex=null
        RemoveThePreview()
      }
      //&=======|>Delete and save the changes then display
      products.splice(index, 1)
      localStorage.setItem("products", JSON.stringify(products))
      DisplayProducts(products)
    }
//^===========|> Update product function (put the product values in the form to update it)
function Update(index){
      currentIndex = index

    productName.value = products[index].name
    productPrice.value = products[index].price
    productDesc.value = products[index].description
    productCategory.value = products[index].category


    document.getElementById("UpdateProductBtn").classList.remove("d-none")
    document.getElementById("AddProductBtn").classList.add("d-none")

    if( products[index].image){
      imgContainer.classList.remove("d-none")
      imgContainer.innerHTML = `<img src=${products[index].image} alt="" class="rounded-5"></img>`
    }else if(!imgContainer.classList.contains("d-none")){
      imgContainer.classList.add("d-none")
    }
   

    }
//^===========|> Update product function (save the new values and store the changes)
function UpdateProduct(){

      console.log( productImage.value)
      console.log(products[currentIndex].image)


    if(currentIndex != null)
      {
        products[currentIndex] = {           
          name: productName.value,
          image:   productImage.value === ""? products[currentIndex].image :`./images/${encodeURI(productImage.files[0].name)}`,  
          description: productDesc.value,
          price: productPrice.value,
          category: productCategory.value,

        }
      } 
      console.log(products[currentIndex].image)
    localStorage.setItem("products",JSON.stringify(products))
    DisplayProducts(products)
    ClearForm()
    currentIndex = null
    document.getElementById("UpdateProductBtn").classList.add("d-none")
    document.getElementById("AddProductBtn").classList.remove("d-none")
    imgContainer.classList.add("d-none")
    imgContainer.innerHTML = "";
    }
//^===========|> Search function
    function Search(value){
      const result = products.filter((product) => 
        product.category.toLowerCase().includes(value.toLowerCase())
    ||
        product.name.toLowerCase().includes(value.toLowerCase())  )
      
    
      console.log(result);
      DisplayProducts(result, value);

    }
