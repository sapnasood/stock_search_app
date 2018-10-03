//Array to hold complete list of stocks supported by IEX
validationList = [];
// Initial array of stocks
let stocks = ['FB', 'AAPL', 'TSLA', 'GOOG'];

//Function to get the list of companies supported by iexTrading and create an array of the symbols
const getSymbolsList = function () {
    url = `https://api.iextrading.com/1.0/ref-data/symbols`;

    $.ajax({
        url: url,
        method: 'GET'
    }).then(function (response) {
        for (let i = 0; i < response.length; i++) {
            validationList.push(response[i].symbol);
        };

    });

};

// Functionality to display stock info for the stock symbol enetered by the user
const displaystockInfo = function () {
    //Clearing the rows 
    $('.compLogo').empty();
    $('.tableInfo').empty();
    $('.compInfo1').empty();
    $('.compInfo2').empty();

    //Get the stock sysmbol of the selected button   
    const stock = $(this).attr('data-name');
    //Building URL to get the response from ajax call
    const queryURL = `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,company,logo,today-ipos`;
    // Creates AJAX call for the specific stock button being clicked
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        // Store the company symbol
        const companysymbol = response.company.symbol;
        // Create an element to display the company Symbol
        const compsymbol = $('<h3>');
        compsymbol.text(companysymbol)
        //Create an element to display company logo 
        const compLogo = $('<img>');
        compLogo.attr('src', response.logo.url);
        compLogo.attr('width', '10%');
        compsymbol.append(compLogo);
        //Show the company symbol and company logo in row 1
        let col = $('.compLogo').append(compsymbol);
        $('.row1').append(col);


        //Create an element for current rate 
        let price = $('<h1>');
        price.text(response.quote.close);
        //Show stock price in row1        
        col = $('.compLogo').append(price);
        $('.row1').append(col);

        // //Create a table tag to hold multiple values from resposne
        let table1 = $('<table>');
        let tabletr = $('<tr>');

        //Create table columns
        let tab1header = $('<th>');
        tab1header.text('OPEN');
        tabletr.append(tab1header);
        table1.append(tabletr);

        tab1header = $('<th>');
        tab1header.text('PREV CLOSE');
        tabletr.append(tab1header);
        table1.append(tabletr);

        tab1header = $('<th>');
        tab1header.text('VOLUME');
        tabletr.append(tab1header);
        table1.append(tabletr);

        tab1header = $('<th>');
        tab1header.text('MARKET CAP');
        tabletr.append(tab1header);
        table1.append(tabletr);

        tab1header = $('<th>');
        tab1header.text('52 WEEK HIGH');
        tabletr.append(tab1header);
        table1.append(tabletr);

        tab1header = $('<th>');
        tab1header.text('52 WEEK LOW');
        tabletr.append(tab1header);
        table1.append(tabletr);

        //Create table row
        let tabletr1 = $('<tr>');
        let tab1column = $('<td>');
        tab1column.text(response.quote.open);
        tabletr1.append(tab1column);
        table1.append(tabletr1);

        tab1column = $('<td>');
        tab1column.text(response.quote.previousClose);
        tabletr1.append(tab1column);
        table1.append(tabletr1);

        tab1column = $('<td>');
        tab1column.text(response.quote.latestVolume);
        tabletr1.append(tab1column);
        table1.append(tabletr1);

        tab1column = $('<td>');
        tab1column.text(response.quote.marketCap);
        tabletr1.append(tab1column);
        table1.append(tabletr1);

        tab1column = $('<td>');
        tab1column.text(response.quote.week52High);
        tabletr1.append(tab1column);
        table1.append(tabletr1);

        tab1column = $('<td>');
        tab1column.text(response.quote.week52Low);
        tabletr1.append(tab1column);
        table1.append(tabletr1);
        //Show the table in row 2
        col = $('.tableInfo').append(table1);
        $('.row2').append(col);

        //Create an element for company information 
        let compName = $('<h3>');
        compName.text(response.company.companyName);
        //Show company name in row 3
        col = $('.compInfo1').append(compName);
        $('.row3').append(col);
        //Company description
        let compInfo = $('<p>');
        compInfo.text(response.company.description);
        //Show company description in row 3        
        col = $('.compInfo1').append(compInfo);
        $('.row3').append(col);

        //CEO info
        let infohd = $('<h5>');
        infohd.text('CEO');
        //Show CEO in row3       
        col = $('.compInfo2').append(infohd);
        $('.row3').append(col);

        infohd = $('<p>');
        infohd.text(response.company.CEO);
        col = $('.compInfo2').append(infohd);
        $('.row3').append(col);

        //Exchange info
        infohd = $('<h5>');
        infohd.text('EXCHANGE');
        col = $('.compInfo2').append(infohd);
        $('.row3').append(col);


        infohd = $('<p>');
        infohd.text(response.company.exchange);
        col = $('.compInfo2').append(infohd);
        $('.row3').append(col);

        //Industry info
        infohd = $('<h5>');
        infohd.text('INDUSTRY');
        col = $('.compInfo2').append(infohd);
        $('.row3').append(col);

        infohd = $('<p>');
        infohd.text(response.company.industry);
        col = $('.compInfo2').append(infohd);
        $('.row3').append(col);

        //Website info
        infohd = $('<h5>');
        infohd.text('WEBSITE');
        col = $('.compInfo2').append(infohd);
        $('.row3').append(col);

        infohd = $('<p>');
        infohd.text(response.company.website);
        col = $('.compInfo2').append(infohd);
        $('.row3').append(col);

    });

}


// Function for displaying input entered as stock as buttons
const render = function () {
    $('.buttons-view').empty();
    for (let i = 0; i < stocks.length; i++) {
        // Then dynamicaly generates buttons for each stock in the array
        let newButton = $("<button>");
        // Adds a class of stock to our button
        newButton.addClass("stocks");
        // Added a data-attribute
        newButton.attr('data-name', stocks[i]);
        // Provided the initial button text
        newButton.text(stocks[i]);
        // Added the button to the buttons-view div
        $('.buttons-view').append(newButton);
    };

};

const addButton = function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();
    // This line will grab the text from the input box
    let inputText = $(".stock-input").val().trim();
    //Coverting the stock symbol entered by user into uppercase    
    inputText = inputText.toUpperCase();
    //If no input from user alert the user    
    if (!inputText) {
        alert("Please enter stock symbol");
        render();
    }
    //Check if the stock entered by user is supported by IEX for tarding     
    else {
        if (!validationList.includes(inputText)) {
            alert("Invalid company symbol provided, eneter a valid company sysmbol");
            $(".stock-input").val("");
            render();
        }
        //Push the new stock entered by the user into Stock array   
        else {
            stocks.push(inputText);
            //Clear input text
            $(".stock-input").val("");
            //Display all the stock buttons
            render();
        }
    }

}


// Calling the render function to display the intial buttons
render();
//Function to get the list of symbols IEX supports for trading
getSymbolsList();
//Calling addButton function to create and add new buttons on the page
$(".add-stock").on('click', addButton);
// Adding click event listeners to all elements with a class of "stock"
$('.buttons-view').on('click', '.stocks', displaystockInfo);
