$(document).ready(function(){
    
    /**
     * @summary Font object constructor
     * @param {string} name The css font-face font-family
     * @param {number} max_size The maximum size the font can be
    */
    function Font(name, max_size) {
        this.name = name
        this.max_size = max_size
    }
    
    // Create an array of Font objects
    const FONTS = [
        new Font('anisha', 34),
        new Font('behindScript', 34),
        new Font('bolina', 34),
        new Font('freebooterScript', 24),
        new Font('hugsAndKisses', ),
        new Font('mfWeddingBells', ),
        new Font('mirellaScript', ),
        new Font('qaskinBlack', ),
        new Font('respective', ),
        new Font('theHeartOfEverything', ),
        new Font('youreInvitedHeavy', )
    ]

    // Create an array of paper file names
    const PAPERS = [
        'rose_silver',
        'swirl_silver'
    ]

    FONTS.forEach(font => {      
        $('#select-font').append('<option>' + font.name + '</option>')
        // console.log('Font Name: ' + font.name + ' Max Size: ' + font.max_size)
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
        let fontSize = parseInt($('#names, #header').css("font-size"))
        fontSize = fontSize + 1 + 'px'
        $('#names, #header').css({'font-size':fontSize})
        console.log('Font Size Up To: ' + fontSize)
    })  

    $('#font-dec').click(() => {
        let fontSize = parseInt($('#names, #header').css("font-size"))
        fontSize = fontSize - 1 + 'px'
        $('#names, #header').css({'font-size':fontSize})
        console.log('Font Size Down To: ' + fontSize)
    })

    $('#select-paper').on('change', () => {
        let paperSelected = $('#select-paper').find(':selected').val()
        $('#accent-paper').css('background-image', 'url(accent-paper/' + paperSelected + '.jpg)')
    })

});