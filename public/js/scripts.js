var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 var answer = "", i,  A = new Array();
 
    A["q"]="љ"; A["w"]="њ"; A["e"]="е"; A["r"]="р"; A["t"]="т"; A["y"]="ѕ"; A["u"]="у"; A["i"]="и"; A["o"]="о"; A["p"]="п"; A["["]="ш";
    A["]"]="ѓ"; A[""]="ж"; A["a"]="а"; A["s"]="с"; A["d"]="д"; A["f"]="ф"; A["g"]="г"; A["h"]="х"; A["j"]="ј"; A["k"]="к";  A["l"]="л";
    A[";"]="ч"; A["'"]="ќ"; A["z"]="з"; A["x"]="џ"; A["c"]="ц"; A["v"]="в"; A["b"]="б"; A["n"]="н"; A["m"]="м";
    
function productvalidation() {
    var name = document.getElementById("name").value;
    var prodavnica = document.getElementById("prodavnica").value;
    var cena = document.getElementById("cena").value;
    
    var nameGroup = document.getElementById("name-group");
    var prodavnicaGroup = document.getElementById("prodavnica-group");
    var cenaGroup = document.getElementById("cena-group");
    
    var uslov;
    
    if (name == null || name == "") {
        nameGroup.className = "form-group";
        document.getElementById("name-feedback").innerHTML = "";
        nameGroup.className = nameGroup.className + " has-error has-feedback";
        document.getElementById("name-feedback").innerHTML = document.getElementById("name-feedback").innerHTML + '<span class="fa fa-exclamation-circle fa-lg form-control-feedback" aria-hidden="true"></span>';

        uslov = false;
    }else{
        nameGroup.className = "form-group";
        document.getElementById("name-feedback").innerHTML = "";
        nameGroup.className = nameGroup.className + " has-success has-feedback";
        document.getElementById("name-feedback").innerHTML = document.getElementById("name-feedback").innerHTML + '<span class="fa fa-check fa-lg form-control-feedback" aria-hidden="true"></span>';
        uslov = true;
    }
    
    if (prodavnica == null || prodavnica == "") {
        prodavnicaGroup.className = "form-group";
        document.getElementById("prodavnica-feedback").innerHTML = "";
        prodavnicaGroup.className = prodavnicaGroup.className + " has-error has-feedback";
        document.getElementById("prodavnica-feedback").innerHTML = document.getElementById("prodavnica-feedback").innerHTML + '<span class="fa fa-exclamation-circle fa-lg form-control-feedback" aria-hidden="true"></span>';

        uslov = uslov && false;
    }else{
        prodavnicaGroup.className = "form-group";
        document.getElementById("prodavnica-feedback").innerHTML = "";
        prodavnicaGroup.className = prodavnicaGroup.className + " has-success has-feedback";
        document.getElementById("prodavnica-feedback").innerHTML = document.getElementById("prodavnica-feedback").innerHTML + '<span class="fa fa-check fa-lg form-control-feedback" aria-hidden="true"></span>';
        uslov = uslov && true;
    }
    
    if (cena == null || cena == "" || isNaN(cena)) {
        cenaGroup.className = "form-group";
        document.getElementById("cena-feedback").innerHTML = "";
        cenaGroup.className = cenaGroup.className + " has-error has-feedback";
        document.getElementById("cena-feedback").innerHTML = document.getElementById("cena-feedback").innerHTML + '<span class="fa fa-exclamation-circle fa-lg form-control-feedback" aria-hidden="true"></span>';

        uslov = uslov && false;
    }else{
        cenaGroup.className = "form-group";
        document.getElementById("cena-feedback").innerHTML = "";
        cenaGroup.className = cenaGroup.className + " has-success has-feedback";
        document.getElementById("cena-feedback").innerHTML = document.getElementById("cena-feedback").innerHTML + '<span class="fa fa-check fa-lg form-control-feedback" aria-hidden="true"></span>';
        uslov = uslov && true;
    }
    return uslov;
}

function signupvalidation(){
    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    var nameGroup = document.getElementById("name-group");
    var surnameGroup = document.getElementById("surname-group");
    var emailGroup = document.getElementById("email-group");
    var usernameGroup = document.getElementById("username-group");
    var passwordGroup = document.getElementById("password-group");
    
    var uslov;
    
    if (name == null || name == "") {
        nameGroup.className = "form-group";
        document.getElementById("name-feedback").innerHTML = "";
        nameGroup.className = nameGroup.className + " has-error has-feedback";
        document.getElementById("name-feedback").innerHTML = document.getElementById("name-feedback").innerHTML + '<span class="fa fa-exclamation-circle fa-lg form-control-feedback" aria-hidden="true"></span>';
        uslov = false;
    }else{
        nameGroup.className = "form-group";
        document.getElementById("name-feedback").innerHTML = "";
        nameGroup.className = nameGroup.className + " has-success has-feedback";
        document.getElementById("name-feedback").innerHTML = document.getElementById("name-feedback").innerHTML + '<span class="fa fa-check fa-lg form-control-feedback" aria-hidden="true"></span>';
        uslov = true;
    }
    
    if (surname == null || surname == "") {
        surnameGroup.className = "form-group";
        document.getElementById("surname-feedback").innerHTML = "";
        surnameGroup.className = surnameGroup.className + " has-error has-feedback";
        document.getElementById("surname-feedback").innerHTML = document.getElementById("surname-feedback").innerHTML + '<span class="fa fa-exclamation-circle fa-lg form-control-feedback" aria-hidden="true"></span>';
        uslov = uslov && false;
    }else{
        surnameGroup.className = "form-group";
        document.getElementById("surname-feedback").innerHTML = "";
        surnameGroup.className = surnameGroup.className + " has-success has-feedback";
        document.getElementById("surname-feedback").innerHTML = document.getElementById("surname-feedback").innerHTML + '<span class="fa fa-check fa-lg form-control-feedback" aria-hidden="true"></span>';
        uslov = uslov && true;
    }
    
    if (email == null || email == "" || !(re.test(email))) {
        emailGroup.className = "form-group";
        document.getElementById("email-feedback").innerHTML = "";
        emailGroup.className = emailGroup.className + " has-error has-feedback";
        document.getElementById("email-feedback").innerHTML = document.getElementById("email-feedback").innerHTML + '<span class="fa fa-exclamation-circle fa-lg form-control-feedback" aria-hidden="true"></span>';
        uslov = uslov && false;
    }else{
        emailGroup.className = "form-group";
        document.getElementById("email-feedback").innerHTML = "";
        emailGroup.className = emailGroup.className + " has-success has-feedback";
        document.getElementById("email-feedback").innerHTML = document.getElementById("email-feedback").innerHTML + '<span class="fa fa-check fa-lg form-control-feedback" aria-hidden="true"></span>';
        uslov = uslov && true;
    }
    
    if (username == null || username == "") {
        usernameGroup.className = "form-group";
        document.getElementById("username-feedback").innerHTML = "";
        usernameGroup.className = usernameGroup.className + " has-error has-feedback";
        document.getElementById("username-feedback").innerHTML = document.getElementById("username-feedback").innerHTML + '<span class="fa fa-exclamation-circle fa-lg form-control-feedback" aria-hidden="true"></span>';
        uslov = uslov && false;
    }else{
        usernameGroup.className = "form-group";
        document.getElementById("username-feedback").innerHTML = "";
        usernameGroup.className = usernameGroup.className + " has-success has-feedback";
        document.getElementById("username-feedback").innerHTML = document.getElementById("username-feedback").innerHTML + '<span class="fa fa-check fa-lg form-control-feedback" aria-hidden="true"></span>';
        uslov = uslov && true;
    }
    
    if (password == null || password == "") {
        passwordGroup.className = "form-group";
        document.getElementById("password-feedback").innerHTML = "";
        passwordGroup.className = passwordGroup.className + " has-error has-feedback";
        document.getElementById("password-feedback").innerHTML = document.getElementById("password-feedback").innerHTML + '<span class="fa fa-exclamation-circle fa-lg form-control-feedback" aria-hidden="true"></span>';
        uslov = uslov && false;
    }else{
        passwordGroup.className = "form-group";
        document.getElementById("password-feedback").innerHTML = "";
        passwordGroup.className = passwordGroup.className + " has-success has-feedback";
        document.getElementById("password-feedback").innerHTML = document.getElementById("password-feedback").innerHTML + '<span class="fa fa-check fa-lg form-control-feedback" aria-hidden="true"></span>';
        uslov = uslov && true;
    }
    return uslov;
}

function convertName() {
    answer = "";
    var element = document.getElementById("name");
    var word = element.value.toLowerCase();

    for (i in word){
     if (word.hasOwnProperty(i)) {
       if (A[word[i]] === undefined){
         answer = answer + word[i];
       } else {
         answer = answer + A[word[i]];
       }
     }
    }
    element.value = answer.charAt(0).toUpperCase() + answer.slice(1).toLowerCase();
}

function convertProdavnica() {
    answer = "";
    var element = document.getElementById("prodavnica");
    var word = element.value.toLowerCase();

    for (i in word){
     if (word.hasOwnProperty(i)) {
       if (A[word[i]] === undefined){
         answer = answer + word[i];
       } else {
         answer = answer + A[word[i]];
       }
     }
    }
    element.value = answer.charAt(0).toUpperCase() + answer.slice(1).toLowerCase();
}

function convertPrezime() {
    answer = "";
    var element = document.getElementById("surname");
    var word = element.value.toLowerCase();

    for (i in word){
     if (word.hasOwnProperty(i)) {
       if (A[word[i]] === undefined){
         answer = answer + word[i];
       } else {
         answer = answer + A[word[i]];
       }
     }
    }
    element.value = answer.charAt(0).toUpperCase() + answer.slice(1).toLowerCase();
}

$( document ).ready(function() {
    
    $.post('/products/suggestions/findall').done(function(data){
        $.each( data, function( index, value ){
            $( "#datalist1" ).append( "<option value="+value+">" );
        });
    });
});

$( document ).ready(function() {
    $.post('/products/charts/latestFive').done(function(data){

    var chartdata;

        chartdata = data.sort(function(a, b){return b-a});
        for(var i=chartdata.length; i<5; i++){
            var proba = {name:"", cena:"0"};
            chartdata.push(proba);
        }

        Morris.Bar({
         element: 'posledni-proizvodi',
         data: chartdata,
         xkey: 'name',
         ykeys: ['cena'],
         labels: ['Цена'],
         hideHover:true
        });

    });
});

$( document ).ready(function() {
    $.post('/products/charts/expensiveFive').done(function(data){

    var chartdata=data;
    
        for(var i=chartdata.length; i<5; i++){
            var proba = {name:"", cena:"0"};
            chartdata.push(proba);
        }

        Morris.Bar({
         element: 'najskapi-proizvodi',
         data: chartdata,
         xkey: 'name',
         ykeys: ['cena'],
         labels: ['Цена'],
         hideHover:true
        });

    });
});