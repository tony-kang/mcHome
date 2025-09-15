/***
 * Froala Editor 에디터에서 이미지 업로드를 위한 커스텀 업로더
 * 작성자 : 강병우 | bluein007@gmail.com
 */
import ___const from '$prj/lib/i_const';
import ___prj from '$prj/prjMain';

const apiName = ___const.API_UPLOAD;
function reqBody (apiCmd, reqPara, reqData) {
	return {
		cmd: apiCmd ,
		cmdEncoded: false,
		reqPara: reqPara,
		reqData: reqData
	};
}

export async function imageUploader(uFiles, editor) {
	const formData = new FormData();
	formData.append('cmd', 'editor.froala.upload.image');	// <editor.> 으로 시작 : API에서 다르게 처리됨
	formData.append('storageInfo', ___prj.storageInfo);
	formData.append('telepasiFile', uFiles[0]);
	// uFiles.forEach((file) => {
	// 	formData.append('telepasiFile', file);
	// });
	console.log("Froala imageUploader formData", formData,uFiles[0]);
	
	const r = await ___prj.api.postForm(apiName, formData);

	if (r.data.result === ___const.OK) {
		/**
		 * Froala DOC - API - Methods
		 *	image.insert (link, [sanitize], [data], [$existing_image], [response]) 
		 */
		r.data.content.forEach((imgInfo) => {
			console.log("Froala imageUploader 이미지 추가", imgInfo);
			editor.image.insert(
				imgInfo.url,	// 이미지 URL
				true,			// 보안을 위한 이미지 URL 검사
				{				// data-xxx 로 들어가는 이미지 정보 - Document의 설명대로 안됨 - ㅠ.ㅠ
					id: imgInfo.data.id,
					filename: imgInfo.data.filename,
					size: imgInfo.data.size,
				},
				editor.image.get()	// blob 이미지 replace 대상
			);
		});
	} else {
		console.warn("Image upload failed:", r.data);
	}

  	return false;  // Froala 에디터의 기본 이미지 업로드 동작 중지
};

export async function fileUploader(uFiles, editor) {
	const formData = new FormData();
	formData.append('cmd', 'editor.froala.upload.file');	// <editor.> 으로 시작 : API에서 다르게 처리됨
	formData.append('storageInfo', ___prj.storageInfo);
	formData.append('telepasiFile', uFiles[0]);
	// uFiles.forEach((file) => {
	// 	formData.append('telepasiFile', file);
	// });

	console.log("Froala editor instance", editor);
	console.log("Froala fileUploader formData", formData,uFiles[0]);
	
	const r = await ___prj.api.postForm(apiName, formData);

	if (r.data.result === ___const.OK) {
		r.data.content.forEach((fileInfo) => {
			console.log("Froala fileUploader 파일 추가", fileInfo);
			editor.file.insert(
				fileInfo.url,			// 파일 URL
				fileInfo.data.filename	// 표시되는 파일명
			);
		});
	} else {
		console.log("File upload failed:", r.data);
	}

  	return false;  // Froala 에디터의 기본 파일 업로드 동작 중지
}