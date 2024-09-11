import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HeaderHome.css";
import { useTypewriter } from "react-simple-typewriter";

import cov from "../img/CoverHome.png";
import logo from "../img/Logo.png";

export default function HeaderHome() {
  const navigate = useNavigate();

  const [text] = useTypewriter({
    words: ["Réinventez votre usine"],
    loop: true,
    typeSpeed: 120,
    deleteSpeed: 20,
    delaySpeed: 3000,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const sponsorsElement = document.getElementById("sponsor");
      if (sponsorsElement) {
        sponsorsElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 40000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="accueil" name="accueil">
      <div
        style={{ backgroundImage: `url(${cov})` }}
        className="bg-cover bg-no-repeat h-[110vh] w-full"
      >
        <div
          className="absolute bottom-60 sm:bottom-16 left-0 w-full md:mb-0"
          style={{ marginBottom: '-90px', marginLeft: '-50px' }}
        >
          <div
            className="p-1 w-3/4 md:w-1/2 sm:p-6 md:p-12 mt-8 ml-4 md:ml-12 bg-[#fff]/30 rounded-lg"
            style={{ borderTopRightRadius: '50px', width: '36%' }}
          >
            <div className="textDiv text-center">
              <h1 className="simple-font text-bright"> {/* Remplacer par une typo simple */}
                {text}
                <span className="cursor">✎</span>
              </h1>
            </div>
          </div>
        </div>

        <img src={logo} className="p-6 left-4 top-6" />
      </div>
    </section>
  );
}
