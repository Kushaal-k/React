import React, { useId } from "react";

function Input({ label, type = "text", className = "", ref, ...props }) {
	const id = useId();
	return (
		<div className='w-full'>
			{label && (
				<label className='inline-block mb-1 pl-1' htmlFor={id}>
					{label}
				</label>
			)}
			<input
				type={type}
				className={`px-3 py-2 rounded-lg text-black outline-none duration-200 border bg-white focus:bg-gray-50 border-gray-200 w-full ${className}`}
				ref={ref}
				{...props}
				id={id}
			/>
		</div>
	);
}

export default Input;
