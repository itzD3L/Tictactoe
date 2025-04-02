import { Outlet } from "react-router";
import styles from '../../styles/styles.module.css'

const Layout : React.FC = () => {

	return (
        <div className={styles.layout}>
            <Outlet />
        </div>
		
	)
}

export default Layout