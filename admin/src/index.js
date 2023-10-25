import React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './index.css';

import Login from './Pages/login';
import Admin from './Pages/admin';
import Candidate from './Pages/candidate';
import Consti from './Pages/consti';
import Dashboard from './Pages/admin';
import Party from './Pages/party';
import Results from './Pages/results';
import Voter from './Pages/voter';

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
	const [logIn, setLogIn] = useState({ status: false, user: 'Admin', id: '34567' });
	const [showNav, setShowNav] = useState(false);
	const [loading, setLoading] = useState(false);


	return <div id='background'>
		<BrowserRouter>
			<div className='header-adjuster'></div>
			<Routes>
				<Route exact index path='/' element={<Login setLogIn={setLogIn} setLoading={setLoading} />} />
				<Route exact path='/admin' element={<Admin setLoading={setLoading} />} />
				<Route exact path='/candidate' element={<Candidate setLoading={setLoading} />} />
				<Route exact path='/constituency' element={<Consti setLoading={setLoading} />} />
				<Route exact path='/dashboard' element={<Dashboard setLoading={setLoading} />} />
				<Route exact path='/party' element={<Party setLoading={setLoading} />} />
				<Route exact path='/results' element={<Results setLoading={setLoading} />} />
				<Route exact path='/voter' element={<Voter setLoading={setLoading} />} />
			</Routes>
			{showNav && <NavigationBar />}
			<Header logIn={logIn} showNav={showNav} setShowNav={setShowNav} setLogIn={setLogIn} />
		</BrowserRouter>
		{loading && <LoadingScreen />}
	</div>
}

function Header({ logIn, showNav, setShowNav, setLogIn }) {

	const sleep = ms => new Promise(r => setTimeout(r, ms));
	const handleClick = async () => {
		var navbar = document.getElementsByClassName('navbar')
		if (showNav) {
			navbar[0].classList.add('navbar-close');
			await sleep(700);
			setShowNav(false);
		}
		else {
			setShowNav(true);
		}
	}

	const navigate = useNavigate();
	const handleLogOut = () => {
		navigate("/");
	}

	const {pathname} = useLocation();
	useEffect(() => {
		if (pathname === '/') {
			setLogIn({status: false});
		}
	}, [pathname]);

	return <div className='header'>
		<div className='header-leading'>
			{logIn.status && <img src={menuIcon} onClick={handleClick} alt='bull shit' />}
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
			{logIn.status && <img src={logoutIcon} onClick={handleLogOut} alt='bull shit' />}
		</div>
	</div>
}

function NavigationBar () {
	const navigate = useNavigate();
	const {pathname} = useLocation();

	useEffect(() => {
		handleClick(pathname);
	}, [pathname]);
	
	const handleClick = (route) => {
		var routes = ['/dashboard', '/voter', '/candidate', '/party', '/constituency', '/results', '/admin'];
		var index = routes.findIndex(value => value === route);
		var buttons = document.getElementsByClassName('nav-button');
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].classList.remove('nav-button-active');
		}
		buttons[index].classList.add('nav-button-active');
	}

	return <div className='navbar'>
		<div className='nav-button' onClick={() => {navigate('/dashboard')}}>
			<div className='nav-button-layer1'>Dashboard</div>
			<div className='nav-button-layer2'>&gt;</div>
		</div>
		<div className='nav-button' onClick={() => {navigate('/voter')}}>
			<div className='nav-button-layer1'>Voter</div>
			<div className='nav-button-layer2'>&gt;</div>
		</div>
		<div className='nav-button' onClick={() => {navigate('/candidate')}}>
			<div className='nav-button-layer1'>Candidate</div>
			<div className='nav-button-layer2'>&gt;</div>
		</div>
		<div className='nav-button' onClick={() => {navigate('/party')}}>
			<div className='nav-button-layer1'>Party</div>
			<div className='nav-button-layer2'>&gt;</div>
		</div>
		<div className='nav-button' onClick={() => {navigate('/constituency')}}>
			<div className='nav-button-layer1'>Constituency</div>
			<div className='nav-button-layer2'>&gt;</div>
		</div>
		<div className='nav-button' onClick={() => {navigate('/results')}}>
			<div className='nav-button-layer1'>Results</div>
			<div className='nav-button-layer2'>&gt;</div>
		</div>
		<div className='nav-button' onClick={() => {navigate('/admin')}}>
			<div className='nav-button-layer1'>Admin</div>
			<div className='nav-button-layer2'>&gt;</div>
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

