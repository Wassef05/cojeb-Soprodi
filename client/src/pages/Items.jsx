import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import "./Items.css"; // Import the CSS file for animations

function Items() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const loadPost = async () => {
    try {
      const res = await fetch(`https://cogeb-soprodi-api.onrender.com/soprodi/posts/${id}`);
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
        }));
        setSlides(slidess);
      }
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    }
  };

  useEffect(() => {
    console.log(`Loading post with ID: ${id}`);
    loadPost();
  }, [id]);

  const settings = {
    infinite: slides.length > 1,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: "50px",
    speed: 1500,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerMode: true,
          centerPadding: "30px",
          arrows: false,
        },
      },
    ],
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
  };

  const handleImageClickLeft = () => {
    const prevSlide = (currentSlide - 1 + slides.length) % slides.length;
    setCurrentSlide(prevSlide);
    document.querySelector('.slick-prev').click();
  };

  const handleImageClickRight = () => {
    const nextSlide = (currentSlide + 1) % slides.length;
    setCurrentSlide(nextSlide);
    document.querySelector('.slick-next').click();
  };

  return (
    <div className="bg-[#323232] max-w-screen h-full">
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
      ) : null}

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

      <div className="pt-8 h-full pb-40 relative">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={slide.id} className="p-8 sm:p-2 relative">
              <div className="lg:flex items-center">
                {index === currentSlide && index !== 0 && (
                  <div className="absolute left-0 transform -translate-y-1/2 top-1/2 z-10">
                    <img
                      src={slides[(index - 1 + slides.length) % slides.length].image}
                      alt="Previous Slide"
                      className="rounded-3xl sm:h-[80vh] mt-10 w-[10vw] fade-left cursor-pointer"
                      onClick={handleImageClickLeft}
                    />
                  </div>
                )}
                <div className="relative">
                  <img
                    src={slide.image}
                    alt=""
                    className="rounded-3xl sm:h-[80vh] mt-10 lg:w-[40vw] w-full h-auto object-cover cursor-pointer"
                    onClick={handleImageClickRight}
                  />
                </div>
                <div className={`mx-auto sm:max-w-[20vw] text-justify md:ml-8 mt-4 md:mt-0 ${index === currentSlide ? 'fade-up' : ''}`}>
                  <h1 className="sm:text-2xl text-2xl mt-6 max-w-fit pt-10 border-b-4 font-semibold text-white text-center mb-2">
                    {slide.title}
                  </h1>
                  <p className="text-white">{slide.description}</p>
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
