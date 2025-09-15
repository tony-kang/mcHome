export function _span(text, className, rData, cOp, domIdHead = null) {
    const span = document.createElement('span');
    
    span.textContent = text;
    if (domIdHead && rData.domIdx) span.setAttribute('id', domIdHead + '-' + rData.domIdx);
    if (cOp?.title) span.setAttribute('title', cOp.title);

    if (Array.isArray(className)) {
        className.forEach((c) => {
            if (c) span.classList.add(c);
        });
    } else if (className) {
        span.classList.add(className);
    }

    if (cOp.onClick || cOp.onClickHandler) {
        //클릭이벤트가 있으면 커서를 바꿔준다.
        span.classList.add('cursor-pointer');
    }

    return span.outerHTML;
}

export function _my(text, className, rData, cOp, domIdHead = null) {
    const my = document.createElement('my');
    
    my.textContent = text;
    if (domIdHead && rData.domIdx) my.setAttribute('id', domIdHead + '-' + rData.domIdx);
    if (cOp?.title) my.setAttribute('title', cOp.title);

    if (Array.isArray(className)) {
        className.forEach((c) => {
            if (c) my.classList.add(c);
        });
    } else if (className) {
        my.classList.add(className);
    }

    if (cOp?.onClick || cOp?.renderer || cOp?.onClickHandler) {
        //클릭이벤트가 있으면 커서를 바꿔준다.
        my.classList.add('cursor-pointer');
    }

    return my.outerHTML;
}

export function _ul(items, className, rData, cOp, domIdHead = null) {
    const ul = document.createElement('ul');
    
    if (domIdHead && rData.domIdx) ul.setAttribute('id', domIdHead + '-' + rData.domIdx);

    if (Array.isArray(className)) {
        className.forEach((c) => {
            if (c) ul.classList.add(c);
        });
    } else if (className) {
        ul.classList.add(className);
    }

    items.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });

    if (cOp.onClick || cOp.onClickHandler) {
        ul.classList.add('cursor-pointer');
    }

    return ul.outerHTML;
}

export function _pageMark(thisPage, totalPage, className = 'text-xs') {
    return `<span class="${className}">(${thisPage}/${totalPage})</span>`;
}