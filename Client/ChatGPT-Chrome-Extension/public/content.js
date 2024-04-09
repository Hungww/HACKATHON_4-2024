async function getData(inputTarget) {
    const response = await fetch("http://127.0.0.1:5000/?target=" + inputTarget);
    const data = await response.json();
    console.log(data.message);    
    if(data.message === "scam") {
        console.log("Your url is not safe ! You may want to consider getting back ");
        alert("Your url is not safe ! You may want to consider getting back ");
    }
}

const myurllocation= window.location.href;
console.log(myurllocation);
getData(myurllocation);
