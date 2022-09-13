const bankBalance = document.getElementById("bank-balance");
const loanBalance = document.getElementById("loan-balance")
const payAmount = document.getElementById("pay-amount");
const laptopFeatures = document.getElementById("features");
const laptopSelection = document.getElementById("laptopSelection");
const laptopPreviewImage = document.getElementById("laptopImage");
const laptopPreviewHeading = document.getElementById("laptopHeading");
const laptopPreviewText = document.getElementById("laptopText");
const laptopPreviewPrice = document.getElementById("previewPrice");

let laptops = [];
payAmount.innerText = `0 €`;
bankBalance.innerText = `0 €`;
loanBalance.innerText = 0;

try {
    fetch(`https://noroff-komputer-store-api.herokuapp.com/computers`)
    .then(response => response.json())
    .then(respJson => laptops = respJson)
    .then(laptops => updateLaptopSelection(laptops))
} catch (error) {
    console.log(error);
};

const updateLaptopSelection = (data) => {
    data.forEach(laptop => addLaptopToSelection(laptop))
};

const addLaptopToSelection = (laptop) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopSelection.appendChild(laptopElement);
};

const setLaptopPreview = e =>{
    const selected = laptops[e.target.selectedIndex];
    laptopFeatures.innerText = selected.description;
    laptopPreviewImage.src = `https://noroff-komputer-store-api.herokuapp.com/${selected.image}`;
    laptopPreviewHeading.innerText = selected.title;
    laptopPreviewText.innerText = selected.specs;
    laptopPreviewPrice.innerText = `${selected.price} €`;
};

// Increases pay amount by 100
const doWork = () => {
    let pay = parseInt(payAmount.innerText);
    pay += 100;
    payAmount.innerText = `${pay} €`;
};

// Transfer pay amount to bank balance, if loan exists 10% of pay is used to
// reduce loan amount
const bankMoney = () => {
    let pay = parseInt(payAmount.innerText);
    let bank = parseInt(bankBalance.innerText);
    let loan = parseInt(loanBalance.innerText);
    if(loan > 0){
        if(pay * 0.1 > loan){
           pay -= loan;
           loanBalance.innerText = 0;
           document.getElementById("repay").style.display = "none" 
        }else{
            loanBalance.innerText -= (pay*0.1);
            pay -= (pay*0.1); 
        }
    }    
    if (bankBalance.innerText == 0) {
        bankBalance.innerText = `${pay} €`;
        payAmount.innerText = `0 €`;
    }else{
        bankBalance.innerText = `${bank+pay} €`;
        payAmount.innerText = `0 €`;
    }        
};

// Pops up a prompt for user to enter the loan amount wanted.
// Loan amount cannot exceed bank balance * 2
const takeLoan = () => {


    document.getElementById("repay").style.display = "flex"
    document.getElementById("loanAmount").style.display = "flex"
    document.getElementById("loanButton").style.display = "none"
};

// Use all of pay amount to reduce loan
const repayLoan = () => {
    let pay = parseInt(payAmount.innerText);
    let loan = parseInt(loanBalance.innerText);
    
    if(pay > loan){
        pay -= loan;
        loanBalance.innerText = 0;
        payAmount.innerText = `${pay} €`;
        document.getElementById("repay").style.display = "none"
        document.getElementById("loanAmount").style.display = "none"
        document.getElementById("loanButton").style.display = "flex"
    }else{
        loanBalance.innerText -= pay;
        payAmount.innerText = `${pay-pay} €`; 
    }    
};

// Event listeners
laptopSelection.addEventListener("click",setLaptopPreview);
