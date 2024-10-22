import {
	Box,
	Button,
	LoadingOverlay,
	Switch,
	// TagsInput,
	TextInput,
	Textarea,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React, { useContext, useEffect, useState } from 'react'
import { apiGetAssetJSON, apiUploadToDB } from 'src/apis/backendApis/UploadAssetsApi'
import { AppContext } from 'src/context/AppContext'

const StepSetMetadata = () => {
	const [visible] = useDisclosure(false)
	const [checked, setChecked] = useState(false)
	const [loading, setLoading] = useState(false)
	const [stepStatus, setStepStatus] = useState(false)
	const [tagValue, setTagValue] = useState<string[]>(['lenspost', 'lens', 'raveshare', 'background', 'christmas'])

	const { arrImagesS3Links, arrImagesMetadata, setArrImagesMetadata } = useContext(AppContext)

	const [stickerData, setStickerData] = useState({
		stickerName: 'stickerName',
		stickerAuthor: 'stickerAuthor',
		type: 'props',
		data: arrImagesS3Links,
		tags: tagValue,
		wallet: '0xE3811DeFd98AF92712e54b0b3E1735c1051C86D6',
		campaign: 'test',
		featured: checked,
	})

	const handleTextInputChange = (event: { target: { name: any; value: any } }) => {
		const { name, value } = event.target
		console.log(stickerData)
		setStickerData({
			...stickerData,
			[name]: value,
		})
		if (name === 'tags') {
			const tagsArray = value.split(',').map((tag: string) => tag.trim())
			setStickerData({
				...stickerData,
				[name]: tagsArray,
			})
			setTagValue(tagsArray)
		} else {
			setStickerData({
				...stickerData,
				[name]: value,
			})
		}

		if (name === 'featured') {
			setStickerData({ ...stickerData, [name]: checked })
		}
	}

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		setLoading(true)
		event.preventDefault()
		let jsondata = stickerData
		jsondata.tags = jsondata.tags.map((tag: string) => tag.trim()) // Remove whitespace from tags
		console.log(jsondata)

		const resAstJSON = await apiUploadToDB(jsondata)
		console.log('Response:', resAstJSON)

		setArrImagesMetadata(resAstJSON)
		setLoading(false)
		setStepStatus(true)
	}

	useEffect(() => {
		// setChecked(false);
		console.log('Checked:', checked)
	}, [checked])

	return (
		<>
			<Box className="flex align-middle justify-center">
				<div className="flex flex-col w-1/2">
					<LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} loaderProps={{ color: 'pink', type: 'bars' }} />
					{/* {arrImagesS3Links.join(", ")} */}

					<form onSubmit={handleSubmit}>
						<TextInput type="text" label="Asset Name" name="stickerName" value={stickerData.stickerName} className="mt-2" onChange={handleTextInputChange} />

						<TextInput
							type="text"
							label="Asset Author"
							name="stickerAuthor"
							value={stickerData.stickerAuthor}
							className="mt-2"
							onChange={handleTextInputChange}
						/>

						<TextInput
							type="text"
							label="Type `props` or `background`"
							name="type"
							value={stickerData.type}
							className="mt-2"
							onChange={handleTextInputChange}
						/>

						<TextInput type="text" label="Wallet" name="wallet" value={stickerData.wallet} className="mt-2" onChange={handleTextInputChange} />
						<TextInput type="text" label="Campaign" name="campaign" value={stickerData.campaign} className="mt-2" onChange={handleTextInputChange} />

						<TextInput type="text" label="Tags" name="tags" value={stickerData.tags} className="mt-2" onChange={handleTextInputChange} />
						{/* <TagsInput
              // Remove the 'type' attribute
              // type="text"
              label="tags"
              name="tags"
              clearable
              // value={stickerData.tags}
              data={tagValue}
              value={tagValue}
              onChange={(value) => setTagValue(value)}
              // onChange={() => handleTextInputChange}
              className="mt-2"
            /> */}

						<Textarea
							// type="textarea"
							label="data"
							name="data"
							value={stickerData.data}
							onChange={handleTextInputChange}
							className="mt-2"
						/>

						<Switch
							name="featured"
							label="Featured"
							labelPosition="left"
							checked={checked}
							className="mt-2"
							// value={checked}
							onChange={(event) => {
								setChecked(event.target.checked)
								console.log('Checked:', event)
								handleTextInputChange
							}}
						/>

						<Button loading={loading} fullWidth className="mt-8" type="submit">
							{' '}
							Set Metadata{' '}
						</Button>
					</form>
					{/* {arrImagesMetadata && 
        <div className="mt-4">  {arrImagesMetadata} </div>
      } */}
					{/* {!loading && arrImagesMetadata && (
            <div className="mt-4">
              <h3 className=" text-green-400">Metadata set Successfully</h3>
              <h3 className=" text-green-400">You can move to next step</h3>
            </div>
          )} */}

					{loading && <div className="mt-4 text-yellow-800">Setting Metadata, Please Wait</div>}
					{!loading && arrImagesMetadata && stepStatus && (
						<>
							<div className="mt-4 text-green-800">Metadata set Successfully</div>
							{/* <div className="mt-4 text-green-800">
                You can now move to next step
              </div> */}
						</>
					)}
				</div>
			</Box>
		</>
	)
}

export default StepSetMetadata
