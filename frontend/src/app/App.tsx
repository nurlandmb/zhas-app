import './styles/fonts.css';
import 'react-toastify/dist/ReactToastify.css';
import {Header} from 'widgets/Header';
import {Footer} from 'widgets/Footer';
import cls from './styles/App.module.scss'
import AppRouter from 'app/providers/router/ui/AppRouter.tsx';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <div className={cls.app}>
            <Header/>
            <main className="flex-1">
                <AppRouter/>
            </main>
            <Footer/>
            <ToastContainer />
        </div>
    )
}

export default App;