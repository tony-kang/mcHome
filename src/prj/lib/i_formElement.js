//import ___log from '$src/lib/telepasi/common/telepasiLog';

class TelepasiFormElement {
    size = 0;
    label = null;
    changer = null;
    value = null;
    show = true;
    disabled = false;
    optionList = null;
    component = null;
    placeHolder = null;
    onChange = null;
    descNote = null;
    must = false;
    itemWidth = '';
    refItem = null; // ref를 통해 접근할 수 있는 데이타
    hasTime = false;
    hasSec = false;
    timeOnly = false;
    useGmt = false;
    cssClass = null;
    cssStyle = null;
    condition = true;
    rowCnt = 3;
    rowChange = false;
    onUpload = null;
    multiUpload = false;
    storageInfo = null;
    showUploadButton = false;
    uploadCallback = null;
    uploadSelectCallback = null;
    constructor() {
        // Do nothing
    }

    init() {
        this.size = 0;
        this.component = null;
        this.label = null;
        this.changer = null;
        this.value = null;
        this.show = true;
        this.disabled = false;
        this.optionList = null;
        this.placeHolder = null;
        this.onChange = null;
        this.descNote = null;
        this.must = false;
        this.itemWidth = '';
        this.refItem = null;
        this.hasTime = false;
        this.hasSec = false;
        this.timeOnly = false;
        this.useGmt = false;
        this.condition = true;
        this.rowCnt = 3;
        this.rowChange = false;
        this.uploadCallback = null;
        this.multiUpload = false;
        this.storageInfo = null;
        this.showUploadButton = false;
        this.uploadSelectCallback = null;
        this.cssClass = null;
        this.cssStyle = null;        
    }

    col(size,component,label,value) {
        this.init();
        if (isNaN(size)) {
            this.itemWidth = size;  // style에 직접 지정하는 width 로서 100px, 50%, 200px 등
        } else {
            this.size = size;   // 1~12 Grid System            
        }
        this.component = component || 'Space';
        this.label = label;
        this.placeHolder = label;
        this.value = value;
        return this;
    }

    colIf (condition) {
        this.condition = condition;
        return this;
    }

    css(cssClass, cssStyle) {
        this.cssClass = cssClass ?? '';
        this.cssStyle = cssStyle ?? '';
        return this;
    }

    holder(placeHolder) {
        this.placeHolder = placeHolder;
        return this;
    }
    
    op(optionList) {
        this.optionList = optionList;
        return this;
    }

    /**
     * TelepasiOnOff 전용
     * @param text
     */
    offLabel(text) {
        this.offText = text;
        return this;
    }

    /**
     * TelepasiOnOff 전용
     * @param text
     */
    onLabel(text) {
        this.onText = text;
        return this;
    }

    /**
     * Telepasi Slider 등
     * @param minValue
     */
    minMax(minValue, maxValue) {
        this.min = minValue ?? null;
        this.max = maxValue ?? null;
        return this;
    }

    // /**
    //  * TelepasiDateInput 전용
    //  * @param calendarLang
    //  */
    // lang(calendarLang) {
    //     this.lang = calendarLang;
    //     return this;
    // }

    /**
     * 폼에서 칼럼을 안보이게
     */
    hide() {
        this.show = false;
        return this;
    }
    
    disable() {
        this.disabled = true;
        return this;
    }

    ifDisable(ifCondition) {
        this.disabled = ifCondition ?? false;
        return this;
    }

    // checkDisable(ifCondition) {
    //     this.disabled = ifCondition;
    //     return this;
    // }

    note(html) {
        this.descNote = html;
        return this;
    }

    link(url) {
        this.descNote += url;
        return this;
    }

    val() {
        return resultValue;
    }

    ref(ref) {
        this.refItem = ref;
        return this;
    }

    required() {
        this.must = true;
        return this;
    }

    focus() {
        this.focused = true;
        return this;
    }

    /**
     * TelepasiDateInput 전용
     * @returns {TelepasiEdit}
     */
    time(timeOnly) {
        this.hasTime = true;
        if (timeOnly) this.timeOnly = timeOnly;
        return this;
    }

    sec() {
        this.hasSec = true;
        return this;
    }

    gmt() {
        this.useGmt = true;
        return this;
    }

    rowCount(rowCnt) {
        this.rowCnt = rowCnt;
        return this;
    }

    upload(multiUpload, showUploadButton, storageInfo, uploadCallback, uploadSelectCallback) {
        this.storageInfo = storageInfo;
        this.multiUpload = multiUpload;
        this.showUploadButton = showUploadButton;
        this.uploadCallback = uploadCallback;
        this.uploadSelectCallback = uploadSelectCallback;
        return this;
    }

    /**
     * TelepasiColorSelect 전용
     * @param {*} color 
     */
    /**
     * 
     * @returns 
     */
    setColor(colorSampleWidth,colorSampleHeight,defaultColor) {
        this.width = colorSampleWidth;
        this.height = colorSampleHeight;
        this.color = defaultColor;
        return this;
    }

    newLine() {
        this.rowChange = true;
        return this;
    }

    add(onChangeHandler, onChangeDoneHandler = null) {
        if (!this.condition) return null;
        
        // Common 항목
        const editCol = {
            size: this.size,
            itemWidth : this.itemWidth,
            component : this.component,
            label : this.label,
            changer : this.changer,
            show : this.show,
            must : this.must,
            descNote: this.descNote,
            refItem: this.refItem,
            rowChange: this.rowChange,
            editObj: {
                name: this.refItem,
                value : this.value,
                placeHolder : this.placeHolder,
                disabled : this.disabled,
                focused : this.focused,
                optionList : this.optionList,
                onChange: onChangeHandler,
                onChangeDone: onChangeDoneHandler,
                required: this.must,
                label: this.label,
                cssClass: this.cssClass,
                cssStyle: this.cssStyle,
            },
        };

        // Special 항목
        if (this.component === 'TelepasiOnOff') {
            editCol.editObj.onText = this.onText;// ?? null;
            editCol.editObj.offText = this.offText;// ?? null;
        }

        if (this.component === 'TelepasiSlider' || this.component === 'TelepasiNumberInput') {
            editCol.editObj.min = this.min;// ?? null;
            editCol.editObj.max = this.max;// ?? null;
        }

        if (this.component === 'TelepasiDateInput') {
            editCol.editObj.hasTime = this.hasTime;
            editCol.editObj.hasSec = this.hasSec;
            editCol.editObj.timeOnly = this.timeOnly;
            editCol.editObj.useGmt = this.useGmt;
        }

        if (this.component === 'TelepasiColorSelect') {
            editCol.editObj.color = this.color;
            editCol.editObj.width = this.width;
            editCol.editObj.height = this.height;
        }

        if (this.component === 'TelepasiTextarea') {
            editCol.editObj.rowCnt = this.rowCnt;
        }

        if (this.component === 'Dropzone') {
            editCol.editObj.uploadCallback = this.uploadCallback;
            editCol.editObj.multiUpload = this.multiUpload;
            editCol.editObj.storageInfo = this.storageInfo;
            editCol.editObj.showUploadButton = this.showUploadButton;
            editCol.editObj.uploadSelectCallback = this.uploadSelectCallback;
        }

        return editCol;
    }
}

const i_formElement = new TelepasiFormElement();

export default i_formElement;
