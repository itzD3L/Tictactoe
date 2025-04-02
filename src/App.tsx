import { Route, Routes } from 'react-router'
import Layout from './components/layout/Layout'
import SocketConnectionManager from './services/SocketConnectionManager'
import Public from './pages/Public'
import Home from './pages/Home'
import Game from './pages/Game'

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
