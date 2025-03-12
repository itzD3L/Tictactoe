import './App.css'
import { Route, Routes } from 'react-router'
import Layout from './components/Layout'
import SocketConnectionManager from './components/SocketConnectionManager'
import Public from './components/Public'
import Home from './components/Home'
import Game from './components/Game'

function App() {

	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Public />} />
				<Route path='tictactoe' element={<SocketConnectionManager />}>
					<Route index element={<Home />} />
					<Route path='game' element={<Game />} />
				</Route>
			</Route>
		</Routes>
	) 
}

export default App
