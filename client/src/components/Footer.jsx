import React from 'react'
import logo from '../img/Logo.png'



function Footer() {
  return (
    <footer className="bg-[#3C496E]  p-12 font-sans tracking-wide">
          <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className='col-span-2'>
            <div className="lg:flex mb-4 flex items-center ml-14 ">
              <a href="/">
                <img src={logo} width={160}   alt="logo"  />
              </a>
            </div>
    
            <div className="lg:block items-start pt-12 " >
              <p className="text-white max-w-[80%] text-justify font-averia">SOPRODI est une Société de Promotion Immobilière pour le Développement Industriel, dont le Siège Social sis à 121 Avenue Hédi Nouira à Sousse, qui a pour activité principale l'aménagement des zones Industrielles et la Construction des bâtiments et usines attribuées aux activités Industrielles.</p>
            </div>
            </div>
            <div>
              
              <ul className="space-y-5 pt-12">
                <li>
                  <a href="#apropos" className="text-white font-cabin hover:text-white text-sm">A Propos De Nous</a>
                </li>
                <li>
                  <a href="/" className="text-white font-cabin hover:text-white text-sm">L'objectif De la société</a>
                </li>
                <li>
                  <a href="#locaux" className="text-white font-cabin hover:text-white text-sm">Les Locaux SOPRODI</a>
                </li>
                <li>
                  <a href="#contact" className="text-white font-cabin hover:text-white text-sm">Contact</a>
                </li>
              </ul>
            </div>
    
            <div>
              
              <ul className="space-y-5 pt-12">
                <li>
                    <a href="" className="text-white font-cabin hover:text-white text-sm" > COGEB</a>
                </li>
                <li>
                  <a href="#" className="text-white font-cabin hover:text-white text-sm">AL-BARKA</a>
                </li>
                <li>
                  <a href="#" className="text-white font-cabin hover:text-white text-sm">SOPRODI</a>
                </li>
                <li>
                  <a href="#" className="text-white font-cabin hover:text-white text-sm">COGEB INTERNATIONAL</a>
                </li>
              </ul>
            </div>


            <div className='pt-10'>
              <h2 className="text-2xl  mb-6 text-white ">CONTACT</h2>
              <ul className="space-y-4 ">
                <li>
                  <a href="#" className="text-white font-cabin  hover:text-white text-lg">cogebimmobiliere@gmail.com</a>
                </li>
                <li>
                  <a href="#" className="text-white font-cabin hover:text-white text-lg">+216 73 323 435</a>
                </li>
                <li>
                  <a href="#" className="text-white font-cabin hover:text-white text-lg">Avenue de l'environnement, Sousse, 
                  Tunisia, 4000</a>
                </li>
              </ul>
            </div>
            
          </div>
    
        </footer>
  )
}

export default Footer
