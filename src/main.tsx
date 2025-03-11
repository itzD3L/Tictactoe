import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Providers from './contexts/Providers.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Providers>
				<Routes>
					<Route path='/*' element={<App />} />
				</Routes>
			</Providers>
		</BrowserRouter>
	</StrictMode>,
)
