import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";

function Items() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);


 // Function to go back to the previous page
//  const goBack = () => {
//   navigate(-1); // Go back to the previous page in the browser history
// };

  const loadPost = async () => {
    try {
      const res = await fetch(`http://localhost:4000/soprodi/posts/${id}`);
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message, { autoClose: 2000 });
      } else {
        setPost(data);
        const slidess = data.images.map((image, index) => ({
          id: index + 1,
          image: image.url,
          title: data.title,
          description: image.description,
          // tableData:
          //   index === 0
          //     ? [
          //         { name: "Superficie Total", Nombre: data.SuperficieTotal , unite: " M²" },
          //         { name: "Superficie Couverte", Nombre: data.SuperficieCouverte, unite: " M²" },
          //         { name: "Nombre d'Entree", Nombre: data.NbrEntree, unite: "" },
          //         { name: "parking", Nombre: data.parking, unite: "" },
          //         { name: "Nombre Bureau", Nombre: data.NbrBureau, unite: "" },
          //         { name: "Superficie Bureau", Nombre: data.SuperficieBureau, unite: " M²" },
          //         { name: "Surveillance", Nombre: data.Surveillance, unite: " cam" },
          //         { name: "Nombre Atelier", Nombre: data.NbrAtelier, unite: "" },
          //         { name: "Superficie Atelier", Nombre: data.SuperficieAtelier, unite: "" },
          //         { name: "Fin Du Baille", Nombre: data.FinDuBaille, unite: "" },
          //         { name: "Adresse", Nombre: data.Adresse, unite: "" },
          //       ]
          //     : [],
        }));
        setSlides(slidess);
      }
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    }
  };

  const handlePostDelete = async (postId) => {
    try {
      const res = await fetch(`http://localhost:4000/soprodi/posts/${postId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message, { autoClose: 2000 });
      } else {
        alert("le poste est éffacée!");
        navigate("/profile");
      }
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    }
  };

  // useEffect(() => {
  //   loadPost();
  // }, []);
  useEffect(() => {
    console.log(`Loading post with ID: ${id}`); // Log the post ID being loaded
    loadPost();
  }, [id]);
  const settings = {
    className: "center",
    centerMode: true,
    infinite: slides.length > 1,
    centerPadding: "120px",
    slidesToShow: 1,
    speed: 1500,
    arrows: true,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
  };

  // Function to handle image click and go to previous slide
  const handleImageClickLeft = () => {
    const prevSlide = (currentSlide - 1 + slides.length) % slides.length; // Go to the previous slide
    setCurrentSlide(prevSlide);
    document.querySelector('.slick-prev').click(); // Trigger slick to go to the previous slide
  };

  // Function to handle image click and go to next slide
  const handleImageClickRight = () => {
    const nextSlide = (currentSlide + 1) % slides.length; // Loop back to first slide
    setCurrentSlide(nextSlide);
    document.querySelector('.slick-next').click(); // Trigger slick to go to next slide
  };

  return (
    <div className="bg-[#323232] max-w-screen h-full ">
      {currentUser ? (
        <div
          id="Admin"
          className="fixed top-0 right-0 flex w-[30vw] items-center justify-between text-center bg-white/50 rounded-b-md py-2 px-2 z-50"
        >
          <button
            onClick={() => navigate(`/update_post/${id}`)}
            className="bg-blue-900 rounded-md py-2 px-7 font-heading text-white hover:opacity-95 text-sm"
          >
            Modifier
          </button>
          <button
            onClick={() => handlePostDelete(id)}
            className="bg-red-800 py-2 px-5 rounded-md font-heading text-white hover:opacity-95 text-sm z-10"
          >
            Supprimer
          </button>
        </div>
      ) : (
        <></>
      )}
      {/* <div className="fixed right-52 bottom-0 rounderd-t-lg flex h-24 z-50">
        <a className="bg-[#515557] text-white rounded-tl-3xl pt-5 text-center w-36 mx-0">
          DEMANDE DE <br />
          VISITE
        </a>
        <a className="bg-white/80 rounded-tr-3xl pt-5 text-center w-36 mx-0">
          DEMANDE DE <br />
          DEVIS
        </a>
      </div> */}

<div className="p-3 bg-[#515557] fixed top-0 rounded-br-3xl w-fit z-50">
<button onClick={() => navigate(-1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-10 text-gray-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
</div>

      <div className="pt-8 h-full pb-40 relative ">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={slide.id} className="p-8  sm:p-2 relative">
              <div className="lg:flex">
                {index === currentSlide && index !== 0 && (
                  <div className="-ml-64 justify-start top-1/2 absolute left-0 transform -translate-y-1/2 cursor-pointer z-10">
                    <img
                      src={slides[(index - 1 + slides.length) % slides.length].image}
                      alt="Previous Slide"
                      className="rounded-3xl sm:h-[80vh] mt-10   w-[10vw] fade-left " 
                      onClick={handleImageClickLeft} // Add onClick handler for previous slide
                    />
                  </div>
                )}
                <div>
                  <img
                    src={slide.image}
                    alt=""
                    className="rounded-3xl rounded-l-3xl sm:h-[80vh] mt-10 lg:w-[40vw] cursor-pointer ml-14"
                    onClick={handleImageClickRight} // Add onClick handler for next slide
                  />
                </div>
                <div className={`mx-auto sm:max-w-[20vw] text-justify ${index === currentSlide ? 'fade-up' : 'fade-down'}`}>
                  <div className="mb-16">
                    <h1 className="sm:text-2xl text-2xl mt-6 max-w-fit pt-10 border-b-4 font-semibold text-white text-center mb-2">
                      {slide.title}
                    </h1>
                    <p className="text-white my-auto pt-36">{slide.description}</p>
                  </div>
                  {slide.tableData && slide.tableData.length > 0 && (
                    <div className="relative my-auto shadow-md sm:rounded-lg">
                      <table className="mx-2 w-full text-sm text-left rtl:text-right text-gray-500">
                        <tbody>
                          {slide.tableData.map((item, index) => (
                            <tr
                              key={index}
                              className={`${
                                index % 2 === 0
                                  ? "bg-[#D9D9D9]"
                                  : "bg-[#515557]"
                              } border-b`}
                            >
                              <th
                                scope="row"
                                className="pl-10 py-2 text-left font-medium text-gray-900 whitespace-nowrap"
                              >
                                {item.name}
                              </th>
                              <td className="pr-10 font-semibold py-2 text-right w-56">{item.Nombre }{item.unite} </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Items;
