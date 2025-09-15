const toolbarButtons = {
    moreText: {    
        'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
    },
    moreParagraph: {
        'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
    },
    moreRich: {
        'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR']
    },
    moreMisc: {
        'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
        'align': 'right',
        'buttonsVisible': 2
    }
};

const toolbarButtonsMD = {
    moreText: {
        'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting'],
        'buttonsVisible': 6
    },
    moreParagraph: {
        'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
        'buttonsVisible': 6
    },
    moreRich: {
        'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR'],
        'buttonsVisible': 6
    },
    moreMisc: {
        'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
        'buttonsVisible': 6
    }
};

const toolbarButtonsSM = {
    moreText: {
        'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting'],
        'buttonsVisible': 2
    },
    moreParagraph: {
        'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
        'buttonsVisible': 2
    },
    moreRich: {
        'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR'],
        'buttonsVisible': 2
    },
    moreMisc: {
        'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
        'align': 'right',
        'buttonsVisible': 2    
    }
};

const toolbarButtonsXS = {
    moreText: {
        'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting'],
        'buttonsVisible': 0
    },
    moreParagraph: {
        'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
        'buttonsVisible': 0
    },
    moreRich: {
        'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR'],
        'buttonsVisible': 0
    },
    moreMisc: {
        'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
        'align': 'right',
        'buttonsVisible': 0
    }
};

const simpleToolbarButtons = {
    moreText: {    
        'buttons': ['bold', 'fontSize', 'textColor', 'backgroundColor', 'clearFormatting' ,'italic', 'underline', 'strikeThrough', ],
        'buttonsVisible': 5
    },
    moreParagraph: {
        'buttons': ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'lineHeight', 'outdent', 'indent'],
        'buttonsVisible': 3
    },
    moreRich: {
        'buttons': ['insertImage', 'insertTable']  // 이미지 업로드만 허용
    },
    moreIntent: {
        'buttons': ['emoticons', 'insertLink', 'insertHR']
        
    },
    moreMisc: {
        'buttons': ['undo', 'redo'],
        'align': 'right',
        'buttonsVisible': 2
    }
};

export function getToolbarButtons(option, size) {
    if (option.useSimpleEditor) {
        return simpleToolbarButtons;
    }
    if (size === 'medium') {
        return toolbarButtonsMD;
    }
    if (size === 'small') {
        return toolbarButtonsSM;
    }
    if (size === 'extra-small') {
        return toolbarButtonsXS;
    }
    return toolbarButtons;  // default = large
}
/**
toolbarButtons for large devices (≥ 1200px)
toolbarButtonsMD for medium devices (≥ 992px)
toolbarButtonsSM for small devices (≥ 768px)
toolbarButtonsXS for extra small devices (< 768px)
**/