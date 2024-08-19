import React, { ChangeEventHandler, useEffect, useState } from "react";
import { BiFile } from "react-icons/bi";
import FileRow from "./FileRow";
import Navbar from "./constants/NavBar";
import Player from "./Player";
import Dropzone, { FileRejection } from "react-dropzone";
import { Curr } from "../utils/types";
import { usePlayer } from "../contexts/PlayerContext";
import Multimedia from "./constants/Multimedia";

const HomeComp = () => {
	const { files, setFiles, showPlayer, setShowPlayer } = usePlayer();
	const [isDragOver, setIsDragOver] = useState<boolean>(false)

	const onFileInputChange: ChangeEventHandler<HTMLInputElement> = (e: any) => {
		const selected: File[] = Array.from(e.target.files);
		const newFiles: File[] = files.concat(selected);
		setFiles(newFiles);
	};

	const onDrop = (acceptedFiles: File[]) => {
		const newFiles: File[] = files.concat(acceptedFiles);
		setFiles(newFiles);
	};
	
	const onDropRejected = (rejectedFiles: FileRejection[]) => {
		const [file] = rejectedFiles

		setIsDragOver(false)

		global.ipcRenderer.send('message', `
			${file.file.type} type is not supported.\n
			Please choose an audio or video file instead.
			`)
		// NB: you may use toaster later if added: below there is sonner code example
		// toast({
		//   title: `${file.file.type} type is not supported.`,
		//   description: "Please choose an audio or video file instead.",
		//   variant: "destructive"
		// })
	}

	const onDropAccepted = (acceptedFiles: File[]) => {
		setIsDragOver(false)
	}

	return (
		<div className='flex h-[92vh] w-full flex-col overflow-auto pt-11 xtab:flex-row'>
			<div className='flex h-full flex-col items-center justify-center xtab:w-3/5'>
				{showPlayer ? (
					<div className='flex w-full items-center justify-center'>
						<Player />
					</div>
				) : (
					<Dropzone
						accept={{ "audio/*": [], "video/*": [] }}
						onDrop={onDrop}
						onDropRejected={onDropRejected}
						onDropAccepted={onDropAccepted}
						onDragEnter={() => setIsDragOver(true)}
						onDragLeave={() => setIsDragOver(false)}
						multiple
					>
						{({ getRootProps, getInputProps }) => (
							<div
								{...getRootProps({ className: "dropzone" })}
								className={`flex h-full w-full items-center ${isDragOver && 'bg-main/10'} justify-center`}
							>
								<label
									// htmlFor="files"
									className='flex flex-col items-center justify-center'
								>
									<div className='max-w-[200px] flex'>
										<Multimedia />
									</div>
									{isDragOver ? <p>
										<span className='font-semibold'>Drop file</span> to upload
									</p> : <p className='text-center'>
										Select a file or drag and drop multiple files here
									</p>}
								</label>
								<input
									{...getInputProps()}
									multiple
									accept='video/* , audio/*'
									type='file'
									name=''
									id='files'
									hidden
									onChange={onFileInputChange}
								/>
							</div>
						)}
					</Dropzone>
				)}
			</div>
			<span className='h-full w-[1px] bg-blue-400/10'></span>
			<div className='flex h-full flex-col items-center px-4 pt-4 xtab:w-2/5'>
				{files.length === 0 ? (
					<p className='flex h-full w-full items-center justify-center text-lg'>
						No Selected files
					</p>
				) : (
					<Dropzone
						accept={{ "audio/*": [], "video/*": [] }}
						onDrop={onDrop}
						multiple
					>
						{({ getRootProps, getInputProps }) => (
							<div
								{...getRootProps()}
								onClick={() => {}}
								className='flex h-full w-full flex-col'
							>
								<div className='flex w-full items-center justify-between px-4 py-2'>
									<p className='text-sm font-semibold text-main'>
										Selected files
									</p>
									<label
										htmlFor='files'
										className='flex cursor-pointer items-center rounded-md bg-main px-2 text-xs'
									>
										<span className='-translate-y-[1px] text-lg'>+</span>
										<span className='ml-2'>ADD</span>
									</label>
									<input
										{...getInputProps()}
										multiple
										accept='video/* , audio/*'
										type='file'
										name=''
										id='files'
										hidden
										onChange={onFileInputChange}
									/>
								</div>
								<div className='flex h-[80vh] w-full flex-col overflow-y-auto'>
									{files?.map((file: File, index) => (
										<FileRow
											key={index}
											i={index}
											file={file}
											setShowPlayer={setShowPlayer}
										/>
									))}
								</div>
							</div>
						)}
					</Dropzone>
				)}
			</div>
		</div>
	);
};

export default HomeComp;
