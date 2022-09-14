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
loanBalance.innerText = `0 €`;

try {
    fetch(`https://noroff-komputer-store-api.herokuapp.com/computers`)
    .then(response => response.json())
    .then(respJson => laptops = respJson)
    .then(laptops => updateLaptopSelection(laptops))
} catch (error) {
    console.log(error);
};

// call addLaptopSelection for every laptop fetched from komputer store api
const updateLaptopSelection = (data) => {
    setLaptopPreview();
    data.forEach(laptop => addLaptopToSelection(laptop));
};

// Add laptop to drop selection
const addLaptopToSelection = (laptop) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopSelection.appendChild(laptopElement);
};

// Sets laptop preview elements according to current selection of laptop
const setLaptopPreview = (e) =>{
    let indx = 0;
    if(e) indx = e.target.selectedIndex;
    let selected = laptops[`${indx}`];
    laptopFeatures.innerText = selected.description;
    laptopPreviewImage.src = `https://noroff-komputer-store-api.herokuapp.com/${selected.image}`;
    laptopPreviewHeading.innerText = selected.title;
    laptopPreviewText.innerText = selected.specs;
    laptopPreviewPrice.innerText = `${selected.price} €`;
};
//setLaptopPreview();
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
    let loan = parseInt(loanBalance.innerText.split(" ")[0]);
    if(loan > 0){
        if(pay * 0.1 >= loan){
           pay -= loan;
           loanBalance.innerText = 0;
           changeVisibility(false) 
        }else{
            loan -= (pay*0.1);
            loanBalance.innerText = `${loan} €`;            
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
    let bank = parseInt(bankBalance.innerText.split(" ")[0]);
    const loan = parseInt(prompt("Enter the amount you want to loan: "));
    if(loan != null && loan <= bank * 2){        
        loanBalance.innerText = `${loan} €`
        bankBalance.innerText = `${bank+loan} €`
        changeVisibility(true)
    }
    
};

// Use all of pay amount to reduce loan
const repayLoan = () => {
    let pay = parseInt(payAmount.innerText.split(" ")[0]);
    let loan = parseInt(loanBalance.innerText.split(" ")[0]);
    
    if(pay >= loan){
        pay -= loan;
        loanBalance.innerText = 0;
        payAmount.innerText = `${pay} €`;
        changeVisibility(false)
    }else if(pay > 0){
        loan -= pay;
        loanBalance.innerText = `${loan} €`; 
        payAmount.innerText = `${pay-pay} €`; 
    }    
};

// Use bank balance to buy a computer
const buyLaptop = () => {
    let totalMoneys = parseInt(bankBalance.innerText.split(" ")[0]);
    let price = parseInt(laptopPreviewPrice.innerText.split(" ")[0]);    
    if(totalMoneys >= price){
        bankBalance.innerText = `${totalMoneys-price} €`;
        alert(`You have bought a almost brand new calculation machine`)
    }else{
        alert(`Insufficient funds! You are ${price - totalMoneys}€ short. Go to work or take more loan to buy this state of art machine.`)
    }
};

// Takes booolean as a param, if true => sets repay loan button and loan amount field visible
// and take loan button hidden, false => vice versa
const changeVisibility = (isLoan) =>{
    if(isLoan){
        document.getElementById("repay").style.display = "flex"
        document.getElementById("loanAmount").style.display = "flex"
        document.getElementById("loanButton").style.display = "none"
    }else{
        document.getElementById("repay").style.display = "none"
        document.getElementById("loanAmount").style.display = "none"
        document.getElementById("loanButton").style.display = "flex"
    }
};

// Event listeners
laptopSelection.addEventListener("click",setLaptopPreview);
