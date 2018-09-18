// Service Worker

if('serviceWorker' in navigator){
    console.log('Puedes usar SW en el Navegador');    

    navigator.serviceWorker.register('./sw.js')
                            .then(res=> console.log('ServiceWorker cargado!!', res))
                            .catch(err=> console.log('SW no se ha podido registrar', err))
}else{
    console.log('No puedes usar SW en el Navegador');
}


// Esto es para hacer un scrllo suavizado

$(document).ready(function () {
     
    $('#menu a').click(function (e) { 
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        });
        
        return false;
    });


});