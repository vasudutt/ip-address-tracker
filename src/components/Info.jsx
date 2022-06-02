import React, {useState, useEffect, useRef} from 'react';
import Arrow from '../images/icon-arrow.svg';

function Info({userData, setFormInput}) {
	const [input, setInput] = useState('');
	const {ip, city, state_prov, zipcode, isp} = userData;
	let timezone = useRef('');

	useEffect(()=>{
		if(userData.time_zone.offset === 0){
			timezone.current = 'UTC';
		} else if (userData.time_zone.offset > 0){
			timezone.current = `UTC +${userData.time_zone.offset}`;
		} else {
			timezone.current = `UTC ${userData.time_zone.offset}`;
		}
	}, [userData]);

	const handleChange = (e) => {
		setInput(e.target.value);
	}

	const handleSubmit = (e) => {
		setFormInput(input);
	}
	
	return (
		<div className='absolute z-[10000] w-screen'>
			<div className="m-auto w-4/6 md:w-5/6 max-w-3xl">
				<div className="flex flex-col justify-center items-center">
					<h1 className="font-bold text-2xl text-white mt-4">
					IP Address Tracker
					</h1>

					<div className="flex my-8 justify-center items-center w-full max-w-sm">
						<input
							onChange={handleChange}
							className="rounded-l-xl py-2 px-4 w-5/6 text-sm border-none focus:ring-0 focus:outline-none md:py-4"
							type="text"
							placeholder="Search for any IP Address"
						/>

						<button onClick={handleSubmit} className="flex w-1/6 self-stretch justify-center items-center bg-black rounded-r-xl">
							<img src={Arrow} alt="Arrow" />
						</button>
						</div>
					</div>

					<div className="grid bg-white rounded-xl p-2 drop-shadow-md text-center md:grid-cols-4 md:text-left md:divide-x-2">
						<div className="p-2 md:p-4">
						<h2 className="text-tiny tracking-widest font-semibold text-gray-400">
							IP ADDRESS
						</h2>
						<h1 className="font-semibold">{ip}</h1>
					</div>

					<div className="p-2 md:p-4">
						<h2 className="text-tiny tracking-widest font-semibold text-gray-400">
							LOCATION
						</h2>
						<h1 className="font-semibold">
							{`${city}, ${state_prov} ${zipcode}`}
						</h1>
					</div>

					<div className="p-2 md:p-4">
						<h2 className="text-tiny tracking-widest font-semibold text-gray-400">
							TIMEZONE
						</h2>
						<h1 className="font-semibold">{timezone.current}</h1>
					</div>

					<div className="p-2 md:p-4">
						<h2 className="text-tiny tracking-widest font-semibold text-gray-400">
							ISP
						</h2>
						<h1 className="font-semibold">{isp}</h1>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Info;