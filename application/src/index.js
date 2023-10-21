import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import Login from './Pages/login';
import Voter from './Pages/voter';
import Candidate from './Pages/candidate';
import Party from './Pages/party';
import Population from './Pages/population';
import Results from './Pages/results';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

function App () {
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);

	return <div>
		<BrowserRouter>
			<Routes>
				<Route exact index path='/' element={<Login />} /> 
				<Route exact path='/voter' element={<Voter />} />
				<Route exact path='/candidate' element={<Candidate />} />
				<Route exact path='/party' element={<Party />} />
				<Route exact path='/population' element={<Population />} />
				<Route exact path='/results' element={<Results />} />
			</Routes>
		</BrowserRouter>
	</div>
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
