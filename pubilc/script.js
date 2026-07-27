const form = document.getElementById("blogForm");

form.addEventListener("submit", function(event){

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const category = document.getElementById("category").value;
    const content = document.getElementById("content").value.trim();

    if(title === "" || author === "" || category === "" || content === ""){
        alert("Please fill all the fields.");
        event.preventDefault();
    }
    else{
        alert("Blog Published Successfully!");
    }

});