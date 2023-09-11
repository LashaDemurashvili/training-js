'use strict'

/*


// Show the custom popup
const modal = document.getElementById("myModal");
// modal.style.display = "block";



// Close the popup after 2 seconds
setTimeout(function() {
    modal.style.display = "none";
}, 3000);



// Close the popup when the close button is clicked
const closeButton = document.querySelector(".close");
closeButton.addEventListener("click", function() {
    modal.style.display = "none";
});


*/


let sec;

let obj = {
    'youtube.com': 0, 
    'translate.google.com': 0,
    'google.com': 0 
}


const butt1 = document.getElementById('btn--1')

butt1.addEventListener('click', function(){
    // data
    const web_arr = ['youtube.com', 'translate.google.com', 'google.com']
    
    // random number 
    let fir = Math.trunc(Math.random() * 3)

    do{
        fir = Math.trunc(Math.random() * 3)
    } while ( fir === sec)
    sec = fir;

    obj[web_arr[fir]]++;

    // logic
    const url_a = 'https://' + web_arr[fir]
    // window.open(url_a, '_blanck')

    document.querySelector('.txt').textContent = `${url_a}`
    console.log(`${fir} - ${url_a}`);
})


const butt2 = document.getElementById('btn--2')
butt2.addEventListener('click', function(){
    console.clear()

    const web_arr = ['youtube.com', 'translate.google.com', 'google.com']

    let sum = 0 

    for (const i in obj) {
        sum += obj[i]
    }

    for(let i of web_arr){
        console.log(`${i} - ${Math.round(obj[i]/sum*100)}%`);
    }

});



/*
/////////////////////////////////////////////////////////////////////////////// wwwwwwwwwwwwwwwwwwwwww_CODE_TITLE
CODE_HERE


//////////////////////////////////////////////////////////////////////////////////////////////////// END \
*/


// ------------------------------------------------------------------------------------------------------------ NEW LINE


// // Show the popup
// alert("This is a popup!");
//
// // Close the popup after 2 seconds
// setTimeout(function() {
//     alert.close(); // This won't work for standard alerts, use custom modals for more control
// }, 2000);
//
//












// template

// ------------------------------------------------------------------------------------------------------------ NEW LINE

/*
/////////////////////////////////////////////////////////////////////////////// wwwwwwwwwwwwwwwwwwwwww_CODE_TITLE
CODE_HERE


//////////////////////////////////////////////////////////////////////////////////////////////////// END \
*/









