const ENCDEC = {
    KEY: 'bluein007Telepasi',
    REQ_KEY: 'netReqParamterKey'
}

export const i_encDec = {
    telepasiEncrypt(str,key = ENCDEC.KEY) {
        const encodedBytes = btoa(decodeURIComponent(encodeURIComponent(str)));

        const encrypted = new Uint8Array(encodedBytes.length);
        for (let i = 0; i < encodedBytes.length; i++) {
            encrypted[i] = encodedBytes.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        }

        const encodedEncrypted = btoa(String.fromCharCode.apply(null, encrypted));
        return encodedEncrypted;
    },
    telepasiDecrypt(encodedEncryptedText,key = ENCDEC.KEY) {
        try {
            // Base64 디코딩
            const decodedEncrypted = atob(encodedEncryptedText);

            // 복호화 로직
            let decryptedText = '';
            for (let i = 0; i < decodedEncrypted.length; i++) {
                const charCode = decodedEncrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length);
                decryptedText += String.fromCharCode(charCode);
            }

            // Base64 디코딩
            const encStr = atob(decryptedText);

            // UTF-8 디코딩
            const decodedText = decodeURIComponent(encodeURIComponent(encStr));
            return decodedText;                
        } catch (error) {
            // console.log('복호화 오류');
            return null;
        }
    },
    reqEncode(reqStr) {
        return this.telepasiEncrypt(reqStr, ENCDEC.REQ_KEY);
    },

    test() {
        /* **************  암호화 테스트 ****************** */
        console.log('암호화 테스트:');
        let plainText = "Welcome to KBW!";
        let encText = this.telepasiEncrypt(plainText);
        console.log('암호화:\n\t', encText);

        plainText = "안녕하세요, Welcome to KBW 세계!";
        encText = this.telepasiEncrypt(plainText);
        console.log('암호화:\n\t', encText);

        console.log('Go 언어로 암호화된 문자열의 Vue 복호화 테스트:');
        const encodedEncryptedText = 'UiQ0O09EIz9YNDw8Tiw9V0UzASElLCwzPy4dBAFASBw9IT0YIiANJjgaNgoYOAMeHV80EQ=='; // Go언어로 암호화된 문자열
        console.log('Go언어로 암호화된 문자열\n\t', encodedEncryptedText);
        const oriStr = this.telepasiDecrypt(encodedEncryptedText);
        console.log('복호화:', oriStr);
    }
}

export default i_encDec;