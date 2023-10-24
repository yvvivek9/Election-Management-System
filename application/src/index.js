import React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './index.css';

import Login from './Pages/login';
import Voter from './Pages/voter';
import Candidate from './Pages/candidate';
import Party from './Pages/party';
import Statistics from './Pages/statistics';
import Results from './Pages/results';

import defaultDP from './Media/default-dp.jpg';
import homeIcon from './Media/home-icon.png';
import logoutIcon from './Media/logout-icon.png';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

function App() {
	const [logIn, setLogIn] = useState({ status: false });
	const [user, setUser] = useState({});
	const [party, setParty] = useState({});
	const [loading, setLoading] = useState(false);


	return <div id='background'>
		<BrowserRouter>
			<div className='header-adjuster'></div>
			<Routes>
				<Route exact index path='/' element={<Login setLogIn={setLogIn} setUser={setUser} setParty={setParty} setLoading={setLoading} />} />
				<Route exact path='/voter' element={<Voter user={user} setLoading={setLoading} />} />
				<Route exact path='/candidate' element={<Candidate user={user} setLoading={setLoading} />} />
				<Route exact path='/party' element={<Party party={party} setLoading={setLoading} />} />
				<Route exact path='/statistics' element={<Statistics setLoading={setLoading} />} />
				<Route exact path='/results' element={<Results setLoading={setLoading} />} />
			</Routes>
			<Header logIn={logIn} setLogIn={setLogIn} user={user} party={party} setLoading={setLoading} />
		</BrowserRouter>
		{loading && <LoadingScreen />}
	</div>
}

function Header({ logIn, setLogIn, user, party, setLoading }) {
	const { pathname } = useLocation();
	useEffect(() => {
		if (logIn.status) {
			var buttons = document.getElementsByClassName('header-button');
			if (pathname === '/statistics') {
				buttons[0].classList.add('header-button-active');
				buttons[1].classList.remove('header-button-active');
			}
			else if (pathname === '/results') {
				buttons[1].classList.add('header-button-active');
				buttons[0].classList.remove('header-button-active');
			}
			else {
				buttons[0].classList.remove('header-button-active');
				buttons[1].classList.remove('header-button-active');
			}
		}
	}, [pathname]);
	useEffect(() => {
		if (pathname === '/') {
			setLogIn({ status: false });
		}
	}, [pathname]);


	const navigate = useNavigate();
	const handleClick = (route) => {
		if (route !== pathname) {
			setLoading(true);
			navigate(route);
		}
	}

	return <div className='header'>
		<div className='header-leading' title='Login'>
			{logIn.status && <img src={homeIcon} onClick={() => { handleClick('/' + logIn.type) }} alt='bull shit' />}
		</div>
		<div className='header-heading'>Election Commision</div>
		<div style={{ flex: '45%', display: 'flex' }}>
			{logIn.status &&
				<>
					<div className='header-button' onClick={() => { handleClick('/statistics') }}>
						Statistics
					</div>
					<div className='header-button' onClick={() => { handleClick('/results') }}>
						Results
					</div>
					<div className='header-info'>
						<div className='header-info-text'>
							<div>
								Welcome {logIn.user === 'member' ? user.first_name + ' ' + user.last_name : party.name},<br />
								ID: {logIn.user === 'member' ? user.id : party.id}
							</div>
						</div>
						<div className='header-info-image'>
							<img src={defaultDP} alt='bullshit' />
						</div>
					</div>
				</>}
		</div>
		<div className='header-leading' title='Logout'>
			{logIn.status && <img src={logoutIcon} onClick={() => { handleClick('/') }} alt='bull shit' />}
		</div>
	</div>
}

function LoadingScreen() {
	return <div className='loading-screen'>
		<div className="lds-ring">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
