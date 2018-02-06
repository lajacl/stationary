$(document).ready(function(){

    
    let min_date
    let max_date
    
    /**
     * @summary Font object constructor
     * @param {string} name The css font-face font-family
     * @param {number} max_size The maximum size the font can be
    */
    function Font(name, max_size) {
        this.name = name
        this.max_size = max_size
    }
    
    // Create an array of Month names
    const MONTHS = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
  ]
    
    // Create an array of Font objects
    const FONTS = {
        fancy: [
            new Font('anisha', 42),
            new Font('behindScript', 38),
            new Font('bolina', 38),
            new Font('freebooterScript', 28),
            new Font('hugsAndKisses', 38),
            new Font('mfWeddingBells', 38),
            new Font('mirellaScript', 36),
            new Font('qaskinBlack', 38),
            new Font('respective', 42),
            new Font('theHeartOfEverything', 30),
            new Font('youreInvitedHeavy', 28)
        ],
        plain: [
            new Font('Georgia',),
            new Font('Arial',),
            new Font('Times',),
            new Font('Verdana',),
        ]
    }

    // Create an array of paper file names
    const OPTIONS = {
        text_paper: {
            file_type: "jpg",
            choices: [
            'white_linen',
            'cream_linen',
            'gray_linen',
            'white_felt',
            'warm_white_felt'
            ]
        },
        cardstock_paper: {
            file_type: "jpg",
            choices: [
            'silver_metallic_light',
            'silver_metallic_dark'
            ]
        },
        accent_paper: {
            file_type: "jpg",
            choices: [
            'silver_rose',
            'silver_swirl',
            'silver_pebble'
            ]
        },
        buckle: {
            file_type: "png",
            choices: [
            'circle',
            'diamond',
            'heart',
            'square'
            ]
        },
        ribbon: {
            file_type: "png",
            choices: [
            'white',
            'silver',
            'gray',
            'black'
            ]
        },
    }

    
    /**
     * Functions
     */        

    // put date in mm-dd-yyyy format
    formatDate = (date) => {
        let date_array = date.split('-')
        // console.log(date_array)
        return (date_array[1] + '-' + date_array[2] + '-' + date_array[0])
    }

    // set initial state of form
    setDefaultValues = () => {
        // get today, make date min 1 month ahead, make max 1 year ahead
        let today = new Date()
        let year = today.getFullYear()
        let month = today.getMonth()
        let day = today.getDate()
        min_date = year + '-' + (month+3) + '-' + day
        max_date = (year+1) + '-' + (month+1) + '-' + day

        console.log('Min Date: ' + min_date)
        console.log('Max Date: ' + max_date)

        // set default values for form options
        $('input[name=input-date]').attr('min', min_date)
        $('input[name=input-date]').attr('max', max_date)
        $('#valid-dates').text(' between ' + formatDate(min_date) + ' and ' + formatDate(max_date))
        $('input:radio[name=selected_text_paper]').val(['warm_white_felt'])
        $('input:radio[name=selected_cardstock_paper]').val(['silver_metallic_light'])
        $('input:radio[name=selected_accent_paper]').val(['silver_swirl'])
        $('input:radio[name=selected_buckle]').val(['heart'])
        $('input:radio[name=selected_ribbon]').val(['gray'])
        $('select[name=select_font-fancy]').val(['youreInvitedHeavy'])
        $('select[name=select_font-plain]').val(['Times'])
    }

    makeOption = (option, folder, file_type) => {    
        let label = getOptionName(option)
        $('#select_' + folder).append('<input type="radio" name="selected_' + folder + '"value="' + option + '"/>' +
        label + '<div class="image-block" style="background-image: url(assets/' + folder + '/' + option + '.' + file_type + '")></div>')
    }
    
    help = (message) => {
        $('#help').text(message)
        setTimeout(() => {
            $('#help').text('')
         }, 5000)
    }
    
    checkDateValid = (date) => {        
        let d = new Date(date + 'T00:00')
        let date_part = date.split('-')
        if (d.getMonth() == date_part[1] - 1 && d.getDate() == date_part[2]) {
            return date
        }
        else {
            // help('The date entered was not valid.')
            console.log('New Year: ' + d)
            let year = d.getFullYear()
            let month = d.getMonth()+1
            let day = d.getDate()
            console.log(year + '-' + month +'-' + day)
            return year + '-' + month +'-' + day
        }
    }

    getSelectedFont = (source) => {    
        // return $('option:selected', source).val();
        
        return $(source).find(':selected').val()
    }

    getFontSize = () => {
        return parseInt($('#header').css("font-size"))
    }

    getFontMaxSize = (font) => {
        for(let i=0; i<FONTS.fancy.length; i++) {
            let loop_font = FONTS.fancy[i]
            if(loop_font.name == font) {
                return loop_font.max_size
            }
        }
    }

    getOptionName = (file_name) => {
        return file_name
        .split(/(?=[A-Z])/).join(" ") // seperate a string into multiple words where capital letters are
        .replace(/_/g, ' ') // replace all underscores with spaces
        .replace(/\b\w/g, l => l.toUpperCase()) // capitalize first letter in every word
    }


    /**
     * Loop through arrays to show design options on screen
     */
    FONTS.fancy.forEach(font => {      
        let label = getOptionName(font.name)
        $('#select_font-fancy').append('<option value="' + font.name + '">' + label + '</option>')
    })

    FONTS.plain.forEach(font => {      
        let label = getOptionName(font.name)
        $('#select_font-plain').append('<option value="' + font.name + '">'+ label + '</option>')
    })

    for (let key in OPTIONS) {
        if (OPTIONS.hasOwnProperty(key)) {
            OPTIONS[key].choices.forEach(option => { 
                makeOption(option, key, OPTIONS[key].file_type)
            })
        }
    }

    setDefaultValues()
    

    /**
     * Handles user changes to form by updating view
     */

    // name(s) changed
    $('#input-names').on('change', () => {
        if($('#input-names').val() != '') {
            $('#names').text($('#input-names').val())
        }
    })

    // date changed
    $('input[name=input-date]').on('change', () => {
        let selected_date = new Date($('input[name=input-date]').val() + 'T00:00')
        month_index = selected_date.getMonth()
        let month = MONTHS[month_index]
        let day = selected_date.getDate()
        let year = selected_date.getFullYear()
        $('#date').text(month + ' ' + day + ', ' + year)
    })

    // fancy font changed
    $('#select_font-fancy').on('change', () => {
        let font_selected = getSelectedFont('#select_font-fancy');
        let font_size = getFontMaxSize(font_selected);

        $('#names, #header').css({'font-family': font_selected, 'font-size': font_size})
    }) 

    // - font size decreased
    $('#font-decrease-button').click(() => {
        let current_font_size = getFontSize();

        if (current_font_size > 24) {
            $('#help').text('')
            current_font_size = current_font_size - 1 + 'px'
            $('#names, #header').css({'font-size':current_font_size})
        }
        else {
            help('Minimum font size reached')
        }
    })   

    // + font size font size increased
    $('#font-increase-button').click(() => {
        let current_font_size = getFontSize();
        let max_font_size = getFontMaxSize(getSelectedFont('#select_font-fancy'))
        
        if (current_font_size < max_font_size) {
            $('#help').text('')
            current_font_size = current_font_size + 1 + 'px'
            $('#names, #header').css({'font-size':current_font_size})
        }
        else {
            help('Maximum font size reached')
        }
    })  

    // plain font changed
    $('#select_font-plain').on('change', () => {
        let font_selected = getSelectedFont('#select_font-plain');        
        $('#date, #inner-text, #footer').css('font-family', font_selected)
    }) 

    // text paper changed
    $('input[name=selected_text_paper]').on('change', () => {
        let paper_selected = $('input[name=selected_text_paper]:checked').val()
        $('#text_paper').css('background-image', 'url(assets/text_paper/' + paper_selected + '.jpg)')
    })

    // cardstock paper changed
    $('input[name=selected_cardstock_paper]').on('change', () => {
        let paper_selected = $('input[name=selected_cardstock_paper]:checked').val()
        $('#card').css('background-image', 'url(assets/cardstock_paper/' + paper_selected + '.jpg)')
    })

    // accent paper changed
    $('input[name=selected_accent_paper]').on('change', () => {
        let paper_selected = $('input[name=selected_accent_paper]:checked').val()
        $('#accent_paper').css('background-image', 'url(assets/accent_paper/' + paper_selected + '.jpg)')
    })

    // buckle changed
    $('input[name=selected_buckle]').on('change', () => {
        let buckle_selected = $('input[name=selected_buckle]:checked').val()
        $('#buckle').css('background-image', 'url(assets/buckle/' + buckle_selected + '.png)')
    })

    // ribbon changed
    $('input[name=selected_ribbon]').on('change', () => {
        let ribbon_selected = $('input[name=selected_ribbon]:checked').val()
        $('#ribbon').css('background-image', 'url(assets/ribbon/' + ribbon_selected + '.png)')
    })

});