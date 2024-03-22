import {Link} from 'react-router-dom';
import ZhasLogo from 'shared/assets/img/logo.png'

export function Footer() {
    return (
        <footer className="text-gray-600 body-font">
            <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                <Link to="/"
                      className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                    <img className="w-24" src={ZhasLogo}/>
                </Link>
                <p className="text-md text-gray-500 sm:mx-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:my-0 my-4">©
                    2024 Zhas Project
                </p>
                <a className="leading-relaxed" href="tel:+77086547410" target="_blank">+7 (708) 654 7410</a>

                <span className="inline-flex items-center sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">

      <a className="hover:opacity-50 duration-300 ml-3 text-gray-500" href="https://www.instagram.com/zhas_project_almaty_abay_obl/" target="_blank">
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
             className="w-8 h-8" viewBox="0 0 24 24">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
        </svg>
      </a>
    </span>
            </div>
        </footer>
    );
}