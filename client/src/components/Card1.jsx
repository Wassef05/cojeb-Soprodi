import React, { useState } from "react";
import cov from "../img/CoverCard.png";
import car from "../img/Card1.png";
import ModalComponent from "./CustomModal";

export default function Card1() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const modalContent = `
    SOPRODI est une Société de Promotion Immobilière pour le Développement Industriel, Société à Responsabilité Limitée, dont le Siège Social sis à 121 Avenue Hédi Nouira à Sousse, qui a pour activité principale l'aménagement des zones Industrielles et la Construction des bâtiments et usines attribuées aux activités Industrielles.
    
    Créée en 2006, la Société SOPRODI Propriétaire de Terrains d'une superficie Totale de 28000 M2 à Sahline et Manzel Harb la Société a réussi à Construire et aménager 5 Locaux Loués à des Sociétés Étrangères :
  `;

  return (
    <section
      id="apropos"
      name="apropos"
      className="relative mt-0 w-full min-h-screen bg-white"
    >
      <div
        style={{ backgroundImage: `url(${cov})` }}
        className="absolute bottom-0 w-full h-full sm:h-3/5 bg-contain bg-center bg-no-repeat"
      ></div>
      <div className="relative z-10 p-4 sm:p-8 flex flex-col sm:flex-row flex-wrap justify-around items-center">
        <div
          className="text-[#000000] max-w-prose"
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: "1rem",
            textAlign: "justify",
          }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#F5B94C] text-center mb-6 sm:mb-8">
            À PROPOS
          </h1>
          <p className="font-playfair text-sm sm:text-base text-justify mb-4 leading-relaxed text-gray-800">
           <strong>SOPRODI</strong>  est une Société de Promotion Immobilière pour le Développement Industriel, Société à Responsabilité Limitée, dont le Siège Social sis à 121 Avenue Hédi Nouira à Sousse, qui a pour activité principale l'aménagement des zones Industrielles et la Construction des bâtiments et usines attribuées aux activités Industrielles.
          </p>
          <p className="mt-4 text-xl flex items-center gap-2">
            <span
              className="text-[#F5B94C] cursor-pointer"
              onClick={openModal}
            >
              VOIR PLUS
            </span>
            <span className="text-[#F5B94C] text-lg">&#9654;</span> 
          </p>
        </div>
        <div className="hidden lg:block mt-2 lg:mt-0">
          <img src={car} alt="Card image" className="rounded-lg h-48 sm:h-56 md:h-64 lg:h-[24vw] mt-6 lg:mt-18" />
        </div>
      </div>
      <ModalComponent isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
    </section>
  );
}
