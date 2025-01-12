import React, { Fragment } from 'react';

const Blob = () => {
	return (
		<Fragment>
			<div className="absolute bottom-64 right-64 z-[1]">
				<div className="fixed bottom-52 right-52  w-64 h-64 rounded-full bg-blue-700 opacity-25 blur-[100px] will-change-auto" />
				<div className="fixed bottom-52 right-64  w-64 h-72 rounded-full bg-pink-700 opacity-25 blur-[100px] will-change-auto" />
				<div className="fixed bottom-52 right-72  w-40 h-64 rounded-full bg-violet-700 opacity-25 blur-[100px] will-change-auto" />

				<div className="fixed top-52 left-52  w-[24vw] h-[24vw] rounded-full bg-blue-400 opacity-10 blur-[100px] will-change-auto" />
				<div className="fixed top-64 left-64  w-[24vw] h-[24vw] rounded-full bg-pink-400 opacity-10 blur-[100px] will-change-auto" />
				<div className="fixed top-72 left-72  ww-[24vw] h-[24vw] rounded-full bg-violet-400 opacity-10 blur-[100px] will-change-auto" />
			</div>
		</Fragment>
	);
};

export default Blob;
