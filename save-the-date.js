$(document).ready(function(){

    const font_fams = [
        'anisha',
        'behindScript',
        'bolina',
        'freebooterScript',
        'hugsAndKisses',
        'mfWeddingBells',
        'mirellaScript',
        'qaskinBlack',
        'respective',
        'theHeartOfEverything',
        'youreInvitedHeavy'
    ]

    font_fams.forEach(font => {      
        $('select').append('<option>'+font+'</option>')
    })

    $('#select-font').on('change', () => {
        let fontSelected = $('#select-font').find(':selected').val()

        // let optionSelected = $("option:selected", this);
        // console.log('Option Selected: ' + optionSelected);

        // let valueSelected = optionSelected.value;
        // console.log('Value Selected: ' + valueSelected);
        
        $('#names, #header').css('font-family', fontSelected)
    })

});