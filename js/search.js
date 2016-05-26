$(document).ready(search);

function search(){
    for(var key in STREAMERS){
        $('#streamers-list').append('<option value="' + STREAMERS[key] + '"></option>');
    }
}