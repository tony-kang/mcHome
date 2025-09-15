const arrayPrepareStackTrace = (err, stack) => { return stack }
let logEnable = true;

// IndexedDB 초기화
let db;
const initDB = () => {
    if (typeof window !== 'undefined') { // 브라우저 환경에서만 실행
        const request = indexedDB.open('TelepasiLogsDB', 1);
        request.onupgradeneeded = (event) => {
            db = event.target.result;
            db.createObjectStore('logs', { keyPath: 'id', autoIncrement: true });
        };
        request.onsuccess = (event) => {
            db = event.target.result;
        };
    }
};

// 로그를 IndexedDB에 저장하는 함수
const saveLogToDB = (logEntry) => {
    if (db) { // db가 초기화된 경우에만 실행
        const transaction = db.transaction(['logs'], 'readwrite');
        const store = transaction.objectStore('logs');
        store.add(logEntry);
    }
};

// telepasiLog 함수
function telepasiLog(type, ...msg) {
    let fullFilename = null;
    let shortFilename = null;
    let lineNumber = null;

    if (typeof process !== 'undefined' && process.env.JEST_WORKER_ID) return;

    if (!logEnable && !type.startsWith('DB')) return;

    const priorPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = arrayPrepareStackTrace;
    const stack = (new Error()).stack[2];
    Error.prepareStackTrace = priorPrepareStackTrace;
    //console.log('stack', stack);
    if (typeof stack === 'object') {
        //console.log('stack.getFileName', stack.getFileName);
        fullFilename = stack.getFileName();
        shortFilename = String(fullFilename)?.replace(window.location.origin?.origin, '').replace(/\?t=.*/, '');
        lineNumber = stack.getLineNumber();
    }

    if (!window.location.origin?.origin) {
        shortFilename = '';
        lineNumber = '';
    }

    // 콘솔에 로그 출력
    if (type === 'Dev')         console.info('Dev--------', ...msg);
    else if (type === 'Info')   console.info('Info-------', ...msg);
    else if (type === 'Warn')   console.warn('Warn-------', ...msg);
    else if (type === 'Error')  console.error('Error------', ...msg);
    else if (type.startsWith('DB')) {
        if (typeof stack === 'object') {
            const logEntry = {
                type,
                message: msg.join(' '),
                filename: shortFilename,
                lineNumber,
                timestamp: new Date().toISOString(),
            };
            saveLogToDB(logEntry);  // 로그를 IndexedDB에 저장
        } else {
            console.info('DB Not support--------', ...msg);
        }
    } else {
      console.log('Telepasi------', ...msg);
    }
}

// DB 초기화
initDB();

const oriLogHandle = {
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error
}

const i_log = {
    info(...msg) {
        telepasiLog('Info', ...msg);
    },
    warn(...msg) {
        telepasiLog('Warn', ...msg);
    },
    error(...msg) {
        telepasiLog('Error', ...msg);
    },
    dev(...msg) {
        telepasiLog('Dev', ...msg);
    },
    dbInfo(...msg) {
        telepasiLog('DBInfo', ...msg);
    },
    dbWarn(...msg) {
        telepasiLog('DBWarn', ...msg);
    },
    dbError(...msg) {
        telepasiLog('DBError', ...msg);
    },
    dbApi(...msg) {
        telepasiLog('DBApi', ...msg);
    },
    json(jsonData) {
        telepasiLog('Dev', JSON.stringify(jsonData, null, 2));
    },
    debug() {
        const stack = new Error().stack;
        const logArguments = Array.from(arguments);
        logArguments.push(stack);
        console.log.apply(console, logArguments);
    },
    disable() {
        logEnable = false;
        // console.log('logEnable',logEnable);
        console.log = function () {};
        console.info = function () {};
        console.warn = function () {};
        console.error = function () {};
    },
    enable() {
        console.log = oriLogHandle.log;
        console.info = oriLogHandle.log;
        console.warn = oriLogHandle.log;
        console.error = oriLogHandle.log;
    }
}

export default i_log;