$(document).ready(function(){

    const FONTS = [
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

    const PAPERS = [
        'rose_silver',
        'swirl_silver'
    ]

    FONTS.forEach(font => {      
        $('#select-font').append('<option>' + font + '</option>')
    })
    
    PAPERS.forEach(paper => {      
        $('#select-paper').append('<option>' + paper + '</option>')
    })

    $('#select-font').on('change', () => {
        let fontSelected = $('#select-font').find(':selected').val()

        // let optionSelected = $('option:selected', this);

        // let valueSelected = optionSelected.val();
        // console.log('Value Selected: ' + valueSelected);
        
        $('#names, #header').css('font-family', fontSelected)
    })    

    $('#font-inc').click(() => {
        let fontSize = parseInt($('#names, #header').css("font-size"));
        fontSize = fontSize + 1 + 'px';
        $('#names, #header').css({'font-size':fontSize});
    })  

    $('#font-dec').click(() => {
        let fontSize = parseInt($('#names, #header').css("font-size"));
        fontSize = fontSize - 1 + 'px';
        $('#names, #header').css({'font-size':fontSize});
    })

    $('#select-paper').on('change', () => {
        let paperSelected = $('#select-paper').find(':selected').val()
        $('#accent-paper').css('background-image', 'url(accent-paper/' + paperSelected + '.jpg)')
    })

});