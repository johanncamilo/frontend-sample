
// html elements
const infoSection = document.querySelector('#info-section')
const mainImage = document.querySelector('#productImg')
const padreMiniaturas = document.querySelector('.small-img-row')

const fragment = document.createDocumentFragment()

// Events
document.addEventListener('DOMContentLoaded', () => fetchData())
padreMiniaturas.addEventListener('click', e => set_productImg(e))

// Consumo API
const fetchData = async() => {
    try {
        const resp = await fetch('https://graditest-store.myshopify.com/products/free-trainer-3-mmw.js')
        const data = await resp.json()
        printData(data)        
    } catch (error) {
        console.error(error)
    }
}

const printData = (data) => {
    infoSection.querySelector('h1').textContent = data.title
    
    const spans = infoSection.querySelectorAll('span')
    spans[0].textContent = '$' + data.price
    spans[1].textContent = ' $' + data.compare_at_price
    

    const span = htmlToElement(data.description)    
    infoSection.querySelector('#description').appendChild(span)

    mainImage.src = data.images[0]    
    
    data.images.forEach((element, i) => padreMiniaturas.querySelectorAll('img')[i].src = element)

    // agregar sizes
    data.options[1].values.forEach(text => {
        const spanTemplate = document.createElement('span')
        spanTemplate.innerText = text
        
        const clone = spanTemplate.cloneNode(true)
        fragment.appendChild(clone)
    })
    const pageBtn = document.querySelector('.page-btn')
    pageBtn.appendChild(fragment)
}

const htmlToElement = (html) => {
    let template = document.createElement('template')
    html = html.trim()
    template.innerHTML = html
    return template.content.firstChild
}

const set_productImg = (e) => {
            
    if(e.target.classList.contains('small-img')) productImg.src = e.target.src

    e.stopPropagation()
}

const valor = document.querySelector('.bloq')
const total = document.querySelector('.total')
const aumentar = () => {
    valor.textContent++
    total.textContent = valor.textContent * total.textContent
}
const disminuir = () => {
    valor.textContent--
    total.textContent = valor.textContent * total.textContent
}