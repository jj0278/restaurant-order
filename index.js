import {menuArray} from "/data.js"

let orderArray = []
const completeOrderBtn = document.getElementById('complete-order-btn')
const paymentForm = document.getElementById('payment-form')

function getMenuHtml(){
    let menuHtml = ``
    menuArray.forEach(function(item){
    menuHtml += `
<div class="menu-item">
    <span class="emoji">${item.emoji}</span>
    <div class="item-desc">
        <h3 class="item-name" >${item.name}</h3>
        <p class="desc">${item.ingredients}</p>
        <p class="price">\$${item.price}</p>
    </div>
    <button class="add align-right" data-add="${item.id}">+</button>
</div>
    `
})
return menuHtml

}
render()

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        document.getElementById('order').classList.remove('invisible')
        orderArray.push({
            name: menuArray[e.target.dataset.add].name,
            ingredients: menuArray[e.target.dataset.add].ingredients,
            id: orderArray.length,
            price: menuArray[e.target.dataset.add].price,
            emoji: menuArray[e.target.dataset.add].emoji
        },)
        
        } else if (e.target.dataset.remove){
        orderArray.splice(e.target.dataset.remove, 1)
        orderArray.forEach(function(item, i){
            item.id = i
        })        
        if(orderArray.length === 0){
           document.getElementById('order').classList.add('invisible')
        }
        }
    renderOrder()   
})

completeOrderBtn.addEventListener('click', function(){
    document.getElementById("payment").classList.remove('invisible')
})

paymentForm.addEventListener('submit', function(e){
    e.preventDefault()
    document.getElementById("payment").classList.add('invisible')
    const paymentFormData = new FormData(paymentForm)
    const name = paymentFormData.get('fullName')
    document.getElementById('order').innerHTML = `
    <div class="thanks">
        <p class="thank-you">Thanks, ${name}! Your order is on the way!</p>
    </div>
    `
    
    
    
})

function getOrderHtml(){
       let orderHtml = ``
       
        orderArray.forEach(function(item){
            orderHtml += `
            <div class="item-line" id="item-line">
                <h3 class="item-name">${item.name}</h3>
                <button class="remove-btn" data-remove="${item.id}">remove</button>
                 <p class="price align-right">\$${item.price}</p>
            </div>
            
            `      
        })
       
        return orderHtml
}

function getPrice(){
    let sum = 0
    orderArray.forEach(function(item){
        (sum += item.price).toFixed(2)
    })
    let priceHtml = `
        <h3 class="item-name">Total Price</h3>
        <p class="price align-right">\$${sum}</p>
    `
    return priceHtml
}

 function render(){
     document.getElementById('menu').innerHTML = getMenuHtml()
 }
 function renderOrder(){
     if(orderArray.length > 0){
     document.getElementById('list').innerHTML = getOrderHtml()
     document.getElementById('total-line').innerHTML = getPrice()
     }
 }
 
 
/*
<div class="menu-item">
    <div class="container">
        <span class="emoji">EMOJI</span>
        <div class="menu-desc">
            <h3 class="item-name">NAME</h3>
            <p class="desc">INGREDIENTS</p>
            <p class="price">PRICE</p>
        </div>
    </div>
    <button class="add">+</button>
</div>

*/