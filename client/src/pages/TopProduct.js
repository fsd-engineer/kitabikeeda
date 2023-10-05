import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import Slider from "react-slick"; // Import the Slider component
import "slick-carousel/slick/slick.css"; // Import the carousel styles
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";

const TopProduct = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
    getAllProducts();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const CustomPrevArrow = (props) => (
    <div
      className="slick-prev"
      onClick={props.onClick}
      style={{ left: "10px", zIndex: 1 }}
    >
      {/* You can customize the left arrow's appearance here */}
      <i className="fa fa-chevron-left"></i>
    </div>
  );

  const CustomNextArrow = (props) => (
    <div
      className="slick-next"
      onClick={props.onClick}
      style={{ right: "10px", zIndex: 1 }}
    >
      {/* You can customize the right arrow's appearance here */}
      <i className="fa fa-chevron-right"></i>
    </div>
  );
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Number of slides to show on larger screens
    slidesToScroll: 1,
    centerMode: false,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024, // Adjust this breakpoint as needed
        settings: {
          slidesToShow: 3, // Number of slides to show on medium screens
        },
      },
      {
        breakpoint: 768, // Adjust this breakpoint as needed
        settings: {
          slidesToShow: 2, // Number of slides to show on smaller screens
        },
      },
      {
        breakpoint: 480, // Adjust this breakpoint as needed
        settings: {
          slidesToShow: 1, // Number of slides to show on mobile screens
        },
      },
    ],
  };

  return (
    
    <div className="container-fluid row mt-3 home-page">
    <div className="col-md-12">
    <h1
  className="text-center"
  style={{
     // Adjust the font size as needed
    fontFamily:'Tangerine' ,// Adjust the font weight as needed
    color: '#371F76', // Adjust the text color as needed
    fontWeight: 'bold', // Adjust the font weight as needed
     // Adjust the margin at the bottom as needed
  }}
>
  Our Featured Products
</h1>

      <Slider {...settings} className="custom-carousel">
        {products.slice(0, 6).map((p) => (
          <div className="card m-2" key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  onClick={() => navigate(`/product/${p.slug}`)}
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name.substring(0,20)}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h5>
                  </div>
                  
                  <div className="card-name-price">
                    
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                      style={{ backgroundColor: '#371F76',color:'white',borderRadius:'20px' }}
                    >
                      Quick Buy
                    </button>
                  </div>
                </div>
              </div>
        ))}
      </Slider>
    </div>
  </div>
);
};

export default TopProduct;
