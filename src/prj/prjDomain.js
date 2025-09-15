/**
 * localhost 및 local-server는 /etc/hosts 파일에 설정되어 있어야 합니다.
 * 127.0.0.1       localhost
 * ::1             localhost
 * 127.0.0.1       local-server
 */
// host 정보
const prjDomains = [
    //----------------------------------------------------------
    // LOCAL - 개발 환경
    //----------------------------------------------------------
    {
        domain: 'localhost',   //localhost:xxxx 모두 포함됨.
        //apiUrl: 'http://local-server:4092/sdn',
        apiUrl: 'http://local-server:7788/sdn',
        storageServer: 'http://localhost:1234',   //이미지 및 파일 서버 도메인
        storageFolder: null,
        storageId: 'dev',
    },
    {
        domain: '192.168.45.237:5173',              //localhost:xxxx 모두 포함됨.
        apiUrl: 'http://192.168.45.237:7788/sdn',
        storageServer: 'http://localhost:1234',     //이미지 및 파일 서버 도메인
        storageFolder: null,
        storageId: 'dev',
    },    
    //----------------------------------------------------------
    // CODE
    //----------------------------------------------------------
    {   // 서비스 도메인
        domain: 'mind-coding.com',
        apiUrl: 'https://mind-coding.com/sdn',
        storageServer: 'https://file.mind-coding.com',   //이미지 및 파일 서버 도메인
        storageFolder: 'file.mind-coding.com',
        storageId: 'home',
    },
];

export { prjDomains };