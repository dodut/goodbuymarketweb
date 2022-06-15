import React from 'react';
import './index.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {API_URL} from "../config/constants.js";
import {Carousel} from "antd";

dayjs.extend(relativeTime);

function MainPage() {

    const [products, setProducts] = React.useState([]);
    const [banners, setBanners] = React.useState([]);

    React.useEffect(
        function(){
            axios.get(`${API_URL}/products`)
            .then(function(result){
                const products = result.data.products;
                setProducts(products);
                console.log(result);
                
            }).catch(function(error){
                console.error("에러발생 : ", error);
            });
            

            axios.get("https://f366d5ad-41d9-4340-920a-dd8652e0ac72.mock.pstmn.io/banners").then((result)=>{
                const banners = result.data.banners;
                setBanners(banners);
            }).catch((error)=>{
                console.error("에러발생 : ", error);
                const banners = JSON.parse({
                    "banners" : [
                        {
                            "imageUrl" : "uploads/banners/attend.png", "href" : "product1"
                        }, { 
                            "imageUrl" : "uploads/banners/jelly.png" , "href" :"product2"
                        }, {
                            "imageUrl" : "uploads/banners/rulllet.png", "href" : "product3"
                        }
                    ]
                });

                console.log("banners: ",banners);

            });

        }, []);


    return (<div>
                <Carousel autoplay autoplaySpeed={3000}>
                    {
                        banners.map((banner, index)=>{
                            return(
                                <Link to={banner.href} >
                                    <div id="banner">
                                        <img src={`${API_URL}/${banner.imageUrl}`} alt="굿바이마켓배너"/> 
                                    </div>
                                </Link>
                            )
                        })
                    }
                    
                       
                </Carousel>
                <div id="body">
                    
                    <h1 id="product-headline">판매되는 상품들</h1>
                    <div id="product-list">
                        {products.map(function(product, index){
                                return (
                                    <div className="product-card">
                                        {
                                            product.soldout === 1 && <div className="product-blur" />
                                        }
                                        <Link className="product-link" to={`/products/${product.id}`}>
                                            <div>
                                                <img className="product-img" src={`${API_URL}/${product.imageUrl}`} alt={product.name}></img>
                                            </div>
                                            <div className="product-contents">
                                                <span className="product-name">{product.name}</span>
                                                <span className="product-price">{product.price}원</span>
                                            </div>
                                            <div className="product-footer">
                                                <span className="product-seller">
                                                    <img className="product-avatar" src="images/icons/avatar.png" alt={product.seller}/>
                                                <span>{product.seller}</span>
                                                </span>
                                                <span className="product-date">{dayjs(product.createdAt).fromNow()}</span>
                                            </div>
                                        </Link>
                                    </div>

                                );
                        })}
                    </div>
                </div>
            </div>
            );
}

export default MainPage;