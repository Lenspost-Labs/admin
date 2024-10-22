import { apiInstance } from 'src/apis/backendApis/config/AxiosConfig'

export const apiUploadToS3 = async (formData: FormData) => {
	try {
		const response = await apiInstance.post(`/asset/fileToStorage`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			// Add this line to prevent axios from trying to transform the data
			transformRequest: [(data) => data],
		})
		console.log('Files uploaded successfully:', response)
		return response?.data
	} catch (error) {
		console.error('Error uploading files:', error)
		throw error
	}
}

// getAssetJSON

export const apiGetAssetJSON = async (data: any) => {
	try {
		const response = await apiInstance.post(`/getAssetJSON`, data)
		console.log('Files uploaded successfully:', response)
		return response?.data
	} catch (error) {
		console.error('Error uploading files:', error)
	}
}

// UploadToDB

export const apiUploadToDB = async (data: any) => {
	try {
		const response = await apiInstance.post(`/asset/upload-assets`, data)
		console.log('Files uploaded successfully:', response)
		return response?.data
	} catch (error) {
		console.error('Error uploading files:', error)
	}
}
