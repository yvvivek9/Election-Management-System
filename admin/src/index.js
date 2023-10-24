import React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './index.css';

import Login from './Pages/login';

import defaultDP from './Media/default-dp.jpg';
import logoutIcon from './Media/logout-icon.png';
import menuIcon from './Media/menu-icon.png';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

function App() {
	const [logIn, setLogIn] = useState({ status: true, user: 'Admin', id: '34567' });
	const [loading, setLoading] = useState(false);


	return <div id='background'>
		<BrowserRouter>
			<div className='header-adjuster'></div>
			<Routes>
				<Route exact index path='/' element={<Login setLogIn={setLogIn} setLoading={setLoading} />} />
			</Routes>
			<Header logIn={logIn} setLogIn={setLogIn} setLoading={setLoading} />
		</BrowserRouter>
		{loading && <LoadingScreen />}
	</div>
}

function Header({ logIn, setLogIn, setLoading }) {

	return <div className='header'>
		<div className='header-leading'>
			{logIn.status && <img src={menuIcon} alt='bull shit' />}
		</div>
		<div className='header-heading'>Election Commision</div>
		<div style={{ flex: '25%' }}>
			{logIn.status &&
				<div className='header-info'>
					<div className='header-info-text'>
						<div>
							Welcome {logIn.user},<br />
							ID: {logIn.id}
						</div>
					</div>
					<div className='header-info-image'>
						<img src={defaultDP} alt='bullshit' />
					</div>
				</div>}
		</div>
		<div className='header-leading' title='Logout'>
			{logIn.status && <img src={logoutIcon} alt='bull shit' />}
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

