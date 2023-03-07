// testing only

if(typeof init === 'undefined'){
    let init = function(){
        function getThing2(){
            return [...document.getElementsByTagName("p")].map(e => e.innerText).join("")
        }
        console.log(getThing2());
    }
    init();
}