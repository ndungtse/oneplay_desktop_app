import React, { useState } from "react";
import { BiBell, BiCog, BiMinus, BiRectangle, BiX } from "react-icons/bi";
import { VscChromeRestore } from "react-icons/vsc";

const Navbar = () => {
	const [isMaximized, setIsMaximized] = useState(false);

	const maximize = () => {
		setIsMaximized(!isMaximized);
		if (!isMaximized) global.ipcRenderer.send("maximize");
		else global.ipcRenderer.send("unmaximize");
	};

	const minimize = () => {
		global.ipcRenderer.send("minimize");
	};

	const close = () => {
		global.ipcRenderer.send("hide");
	};

	return (
		<div className=' z-[50] flex h-[35px] w-full items-center justify-between bg-[#030305]/90 border-b-2 border-main/20 backdrop-blur-lg p-3 px-0 shadow-xl'>
			<div className='flex ml-3'>
				<div className='flex w-[80px] cursor-pointer object-cover'>
					<img src='/static/images/weblogo.svg' alt='' />
				</div>
			</div>
			<div className='w-full h-full navbar'></div>
			<div className='flex items-center'>
				<BiBell className='cursor-pointer rounded-full bg-stone-900 p-1 text-2xl text-gray-700' />
				<BiCog className='ml-2 cursor-pointer rounded-full bg-stone-900  p-1 text-2xl text-gray-700' />
				<div className='flex ml-5 items-center z-50 h-full'>
					<button
						onClick={minimize}
						title='Minimize'
						className=' p-2 hover:bg-slate-400/40 cursor-pointer h-[35px] w-[35px] items-center justify-center flex'
					>
						<BiMinus />
					</button>
					<button
						onClick={maximize}
						title={isMaximized ? "Restore Down" : "Maximize"}
						className=' p-2 hover:bg-slate-400/40 cursor-pointer h-[35px] w-[35px] items-center justify-center flex'
					>
						{isMaximized ? <VscChromeRestore /> : <BiRectangle />}
					</button>
					<button
						onClick={close}
						title='Close To Tray'
						className=' p-1 hover:bg-red-600 cursor-pointer w-[35px] h-[35px] items-center justify-center flex'
					>
						<BiX size={24} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
