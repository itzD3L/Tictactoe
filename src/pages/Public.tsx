import styles from '../styles/styles.module.css'
import { Link } from 'react-router'
import { useState } from 'react'

const Public: React.FC = () => {

    const [readMore, setReadMore] = useState<boolean>(false);

    
    const readMoreClass = readMore ? styles.publicActive : '';

    const content = (
        <section>
            <header className={styles.publicHeader}>
                <h1>Welcome to Dexl's Tic-Tac-Toe</h1>
            </header>
            <main className={`${styles.publicMain} ${readMoreClass}`}>
                <div className={styles.mainContainer}>
                    <div className={styles.mainOne}>
                        <p>Tic Tac Toe Multiplayer Game</p>
                        <p>A real-time multiplayer Tic Tac Toe game built with React and Socket.IO.</p>
                    </div>
                    <div className={styles.mainTwo}>
                        <p>About This Project</p>
                        <p>This project was developed as a hands-on learning experience to understand real-time web applications and Socket.IO integration with React. It demonstrates practical implementation of:</p>
                        <p>- Real-time communication between clients</p>
                        <p>- State management across components</p>
                        <p>- Game logic implementation</p>
                        <p>- User interface animations</p>
                    </div>
                    <div className={styles.mainThree}>
                        <p>Features</p>
                        <p>- Real-time gameplay with Socket.IO</p>
                        <p>- Matchmaking system to find opponents</p>
                        <p>- Animated game board with custom animations</p>
                        <p>- Win/Loss/Draw tracking</p>
                        <p>- Responsive design for various screen sizes</p>
                    </div>
                    <div className={styles.mainFour}>
                        <p>Technologies Used</p>
                        <p>- React</p>
                        <p>- TypeScript</p>
                        <p>- Socket.IO for real-time communication</p>
                        <p>- React Router for navigation</p>
                        <p>- CSS Modules for styling</p>
                        <p>- Motion for animations</p>
                    </div>
                </div>
                <button className={styles.mainReadMore} onClick={() => setReadMore(!readMore)}>
                    Read {}{readMore? 'Less' : 'More'}
                </button>
            </main>
            <footer className={styles.publicFooter}>
                <Link to='/tictactoe'>Get started</Link>
                <a href="https://github.com/itzD3L">My Github</a>
            </footer>
        </section>
    )

    return content
}

export default Public