let products = [
    {name: "صنف A", price: 50, quantity: 10, category: "مشروبات"},
    {name: "صنف B", price: 30, quantity: 5, category: "أطعمة"}
];

let sales = [];

function showSection(id){
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    if(id === "products") renderProducts();
    if(id === "sales") renderProductSelect();
    if(id === "dashboard") renderDashboard();
}

function renderProducts(){
    let tbody = document.querySelector("#productsTable tbody");
    tbody.innerHTML = "";
    products.forEach((p,i) => {
        tbody.innerHTML += `<tr>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td>${p.quantity}</td>
            <td>${p.category}</td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="editProduct(${i})">تعديل</button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct(${i})">حذف</button>
            </td>
        </tr>`;
    });
}

function addProduct(){
    let name = prompt("اسم الصنف:");
    let price = parseFloat(prompt("السعر:"));
    let quantity = parseInt(prompt("الكمية:"));
    let category = prompt("الفئة:");
    products.push({name, price, quantity, category});
    renderProducts();
    renderProductSelect();
    renderDashboard();
}

function editProduct(index){
    let p = products[index];
    let name = prompt("اسم الصنف:", p.name);
    let price = parseFloat(prompt("السعر:", p.price));
    let quantity = parseInt(prompt("الكمية:", p.quantity));
    let category = prompt("الفئة:", p.category);
    products[index] = {name, price, quantity, category};
    renderProducts();
    renderProductSelect();
    renderDashboard();
}

function deleteProduct(index){
    if(confirm("هل تريد حذف هذا الصنف؟")){
        products.splice(index,1);
        renderProducts();
        renderProductSelect();
        renderDashboard();
    }
}

function renderProductSelect(){
    let select = document.getElementById("productSelect");
    select.innerHTML = "";
    products.forEach((p,i) => {
        select.innerHTML += `<option value="${i}">${p.name} - ${p.price} ج</option>`;
    });
}

function makeSale(){
    let index = document.getElementById("productSelect").value;
    let quantity = parseInt(document.getElementById("quantity").value);
    if(quantity <= 0 || quantity > products[index].quantity){
        alert("الكمية غير متاحة");
        return;
    }
    products[index].quantity -= quantity;
    sales.push({product: products[index].name, quantity: quantity, total: quantity*products[index].price});
    renderProducts();
    renderDashboard();
    renderSalesList();
}

function renderSalesList(){
    let div = document.getElementById("salesList");
    div.innerHTML = "<h3>المبيعات</h3>";
    sales.forEach(s => {
        div.innerHTML += `<p>${s.product} - ${s.quantity} وحدة - ${s.total} ج</p>`;
    });
}

function renderDashboard(){
    let todayRevenue = sales.reduce((a,b)=>a+b.total,0);
    document.getElementById("todayRevenue").innerText = todayRevenue;
    let top = sales.sort((a,b)=>b.total-a.total)[0];
    document.getElementById("topItem").innerText = top ? top.product : "---";
    let lowStock = products.filter(p => p.quantity < 5).length;
    document.getElementById("lowStock").innerText = lowStock;

    // Chart
    let ctx = document.getElementById("salesChart").getContext("2d");
    if(window.myChart) window.myChart.destroy();
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: products.map(p=>p.name),
            datasets: [{
                label: 'المبيعات',
                data: products.map(p=>{
                    let sold = sales.filter(s=>s.product===p.name).reduce((a,b)=>a+b.quantity,0);
                    return sold;
                }),
                backgroundColor: '#2563eb'
            }]
        },
        options: {responsive:true}
    });
}

function generateReport(){
    alert("ميزة تصدير PDF ستضاف لاحقاً");
}

// Init
showSection("dashboard");
