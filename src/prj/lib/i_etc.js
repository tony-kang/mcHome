export const _color = {
    DEFAULT : 'default',
    WARNING : 'warning',
    ERROR : 'error',
}

export const _colorClass = [
    { color: _color.DEFAULT, class : 'bg-gray-500'} ,
    { color: _color.WARNING, class : 'bg-yellow-500'} ,
    { color: _color.ERROR, class : 'bg-red-500'} ,
];

export const _confirm = {
    mode : {
        YES_NO: 'yes_no',                       // 예 | 아니오
        OK_CANCEL : 'ok_cancel',                // 확인 | 취소
        OK_IGNORE_CANCEL : 'ok_ignore_cancel'   // 확인 | 무시 | 취소
    },
    button : {
        OK: 'ok',
        CANCEL: 'cancel',
        YES: 'yes',
        NO: 'no',
        IGNORE: 'ignore',
    },
    buttonCaption : {
        OK: '확인(O)',
        CANCEL: '취소(C)',
        YES: '예(Y)',
        NO: '아니오(N)',
        IGNORE: '무시(I)',
    },
    // buttonClass : {
    //     OK      : 'btn btn-success btn-sm',
    //     YES     : 'btn btn-primary btn-sm',
    //     CANCEL  : 'btn btn-outline-info btn-sm',
    //     NO      : 'btn btn-danger btn-sm',
    //     IGNORE  : 'btn btn-secondary btn-sm',
    // },
    buttonClass: {
        OK:     'bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-4 rounded',
        YES:    'bg-green-600 hover:bg-green-800 text-white font-bold py-0.5 px-4 rounded',
        CANCEL: 'bg-yellow-600 hover:bg-yellow-800 text-white font-bold py-0.5 px-4 rounded',
        NO:     'bg-red-500 hover:bg-red-700 text-white font-bold py-0.5 px-4 rounded',
        IGNORE: 'bg-gray-500 hover:bg-gray-700 text-white font-bold py-0.5 px-4 rounded',
    },

    getButtonInfo() {
        return [
            {id: this.button.OK     , buttonCaption: this.buttonCaption.OK      , buttonClass: this.buttonClass.OK},
            {id: this.button.YES    , buttonCaption: this.buttonCaption.YES     , buttonClass: this.buttonClass.YES},
            {id: this.button.CANCEL , buttonCaption: this.buttonCaption.CANCEL  , buttonClass: this.buttonClass.CANCEL},
            {id: this.button.NO     , buttonCaption: this.buttonCaption.NO      , buttonClass: this.buttonClass.NO},
            {id: this.button.IGNORE , buttonCaption: this.buttonCaption.IGNORE  , buttonClass: this.buttonClass.IGNORE},
        ]
    },
    getButtonList (mode) {
        if (mode === this.mode.YES_NO)              return [this.button.NO , this.button.YES];
        if (mode === this.mode.OK_CANCEL)           return [this.button.CANCEL , this.button.OK];
        if (mode === this.mode.OK_IGNORE_CANCEL)    return [this.button.CANCEL , this.button.IGNORE, this.button.OK];

        return [this.button.CANCEL , this.button.OK];
    }
}

/**
 * 데이타 편집 모드 관련
 */
export const _edit = {
    mode : {
        NEW: 'new',
        EDIT: 'edit',
        DELETE: 'delete',
        RESTORE: 'restore',
        VIEW: 'view',
    },
    button : {
        NEW : 'new',
        SAVE : 'save',
        CANCEL : 'cancel',
        DELETE : 'delete',
        CONFIRM : 'confirm',
        RESTORE : 'restore',
    },
    buttonCaption : {
        NEW : '등록',
        SAVE : '저장',
        CANCEL : '취소',
        DELETE : '삭제',
        CONFIRM : '확인',
        RESTORE : '복구',
    },
    // buttonClass : {
    //     NEW : 'btn btn-success btn-sm',
    //     SAVE : 'btn btn-primary btn-sm',
    //     CANCEL : 'btn btn-outline-info btn-sm',
    //     DELETE : 'btn btn-danger btn-sm',
    //     CONFIRM : 'btn btn-secondary btn-sm',
    // },
    buttonClass: {
        NEW:        'bg-green-600 hover:bg-green-800 text-white font-bold py-0.5 px-4 rounded',
        SAVE:       'bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-4 rounded',
        CANCEL:     'bg-yellow-600 hover:bg-yellow-800 text-white font-bold py-0.5 px-4 rounded',
        DELETE:     'bg-red-500 hover:bg-red-700 text-white font-bold py-0.5 px-4 rounded',
        CONFIRM:    'bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-0.5 px-4 rounded',
        RESTORE:    'bg-gray-500 hover:bg-gray-700 text-white font-bold py-0.5 px-4 rounded',
    },
    getButtonInfo() {
        return [
            {id: this.button.NEW    , buttonCaption: this.buttonCaption.NEW     , buttonClass: this.buttonClass.NEW     , disable: false},
            {id: this.button.SAVE   , buttonCaption: this.buttonCaption.SAVE    , buttonClass: this.buttonClass.SAVE    , disable: false},
            {id: this.button.CANCEL , buttonCaption: this.buttonCaption.CANCEL  , buttonClass: this.buttonClass.CANCEL  , disable: false},
            {id: this.button.DELETE , buttonCaption: this.buttonCaption.DELETE  , buttonClass: this.buttonClass.DELETE  , disable: false},
            {id: this.button.CONFIRM, buttonCaption: this.buttonCaption.CONFIRM , buttonClass: this.buttonClass.CONFIRM , disable: false},
            {id: this.button.RESTORE, buttonCaption: this.buttonCaption.RESTORE , buttonClass: this.buttonClass.RESTORE , disable: false},
        ]
    },
    getButtonList (mode) {
        if (mode === this.mode.EDIT)    return [this.button.CANCEL , this.button.SAVE];
        if (mode === this.mode.DELETE)  return [this.button.CANCEL , this.button.DELETE];
        if (mode === this.mode.RESTORE) return [this.button.CANCEL , this.button.RESTORE];
        if (mode === this.mode.VIEW)    return [];
        return [this.button.CANCEL , this.button.NEW];
    },
    editor: {
        new(caption) {
            return {
                editorMode : _edit.mode.NEW,
                editorTitle : caption,
                editorColor : _color.DEFAULT,
                editorPostion : _position.DEFAULT
            }
        },
        edit(caption) {
            return {
                editorMode : _edit.mode.EDIT,
                editorTitle : caption,
                editorColor : _color.WARNING,
                editorPostion : _position.DEFAULT
            }
        },
        view(caption) {
            return {
                editorMode : _edit.mode.VIEW,
                editorTitle : caption,
                editorColor : _color.WARNING,
                editorPostion : _position.DEFAULT
            }
        },
        delete(caption) {
            return {
                editorMode : _edit.mode.DELETE,
                editorTitle : caption,
                editorColor : _color.WARNING,
                editorPostion : _position.DEFAULT
            }
        },
        restore(caption) {
            return {
                editorMode : _edit.mode.RESTORE,
                editorTitle : caption,
                editorColor : _color.WARNING,
                editorPostion : _position.DEFAULT
            }
        },
    },
}

export const _direction = {
    HORIZONTAL : 'hori',
    VERTICAL : 'vert',
}

export const _position = {
    DEFAULT         : 'screenCenter',
    TOP_CENTER      : 'topCenter',
    TOP_LEFT        : 'topLeft',
    TOP_RIGHT       : 'topRight',

    TOP             : 'top',
    MIDDLE          : 'middle',
    BOTTOM          : 'bottom',

    LEFT            : 'left',
    RIGHT           : 'right',
    CENTER          : 'center',

    BOTTOM_CENTER   : 'bottomCenter',
    BOTTOM_LEFT     : 'bottomLeft',
    BOTTOM_RIGHT    : 'bottomRight',
}

export const _event = {
    UPDATE_GOLBAL : 'updateGolbal',
    ERROR_OCCURED : 'errorOccured',
}

export const _response = {
    NEW : (title) => {
        return {
            title: title,
            message: `(신규)저장 되었습니다.`,
            color: _color.DEFAULT,
            time: 500,
            align:___const.TEXT_CENTER
        }
    },
    SAVE : (title) => {
        return {
            title: title,
            message: `수정 되었습니다.`,
            color: _color.DEFAULT,
            time: 500,
            align:___const.TEXT_CENTER
        }
    },
    DELETE : (title) => {
        return {
            title: title,
            message: `삭제 되었습니다.`,
            color: _color.DEFAULT,
            time: 500,
            align:___const.TEXT_CENTER
        }
    },
    CANCEL : (title) => {
        return {
            title: title,
            message: null, //`취소 되었습니다.`,
            color: _color.DEFAULT,
        }
    },
    FAIL : (title) => {
        return {
            title: title,
            message: `에러가 발생하였습니다.`,
            color: _color.ERROR,
            time: 0,
        }
    }
}