'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
//import '../styles/newlisting.css'; // Import the CSS from styles folder
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Row, Col } from 'react-bootstrap';
//import { Button } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa'; // Import the heart icon from react-icons

export default function Products() {
  const [data, setData] = useState([]); // Store the fetched data
  const[basePath, setPath] = useState('https://tudublin-my.sharepoint.com/:f:/r/personal/b00156196_mytudublin_ie/Documents/Major%20Project%20Folder/Images/');
  
  // Fetch products from the API
  useEffect(() => {
    fetch('/api/getProducts')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  function putInWishlist(itemName, description, images, category, userName, email ) {
    console.log("putting in wishlist:", {itemName, description, images, category }); 
    fetch(`/api/putInWishlist?itemName=${encodeURIComponent(itemName)}&description=${encodeURIComponent(description)} &images=${encodeURIComponent(images)}&category=${encodeURIComponent(category)}&userName=${encodeURIComponent(userName)}&userEmail=${encodeURIComponent(email)}`);
    alert("Added to Wishlist"); 
  }

  function putInRequest(userName, email,  itemName) {
    console.log("putting in request:", {userName, email, itemName}); 
    fetch(`/api/putInRequest?userName=${encodeURIComponent(userName)}&userEmail=${encodeURIComponent(email)}&itemName=${encodeURIComponent(itemName)}`);
    alert("Swap Request sent to: " + userName); // Displaying the message in an alert box
  }


  return (
    <div className="products">
      <Header />
      <div className="container mt-4">
        <h2 className="text-center mb-4" >Products</h2>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {data.length > 0 && data.map((item, index) => (
              <Col key={index}>
                <Card className="h-100 shadow-sm" >
                  
                  <Card.Img
                    variant="top"
                    style={{ height: '60%' }} // Pass height as a string
                    src={basePath+item.images[0]}//{item.images && item.images[0]} // Use the first image if available
                    alt={item.itemName}
                    className="p-3"
                  />

                  <Card.Body>
                    <Card.Title>{item.itemName}</Card.Title>
                    <Card.Text>
                      <strong>Description:</strong> {item.description}
                      <br />
                      <strong>Category:</strong> {item.category}
                      <br />
                      <strong>Owner:</strong> {item.userName}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between align-items-center">
                    <Button onClick={() => putInRequest(item.userName, item.email, item.itemName)} variant="primary">Swap Request</Button>
                    <Button  onClick={() => putInWishlist(item.itemName, item.description, item.images , item.category , item.userName, item.email)} variant="contained" color="secondary"><FaHeart className="text-danger" /> </Button>
                  

                  </Card.Footer>
                </Card>
              </Col>
            )
          )}
        </Row>
      </div>
              

      <Footer />
    </div>
  );
}
