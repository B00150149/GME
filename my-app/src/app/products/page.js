'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/newlisting.css'; // Import the CSS from styles folder
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Row, Col } from 'react-bootstrap';
//import { Button } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa'; // Import the heart icon from react-icons

export default function Products() {
  const [data, setData] = useState([]); // Store the fetched data

  // Fetch products from the API
  useEffect(() => {
    fetch('http://localhost:3000/api/getUsers')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  function putInWishlist(itemName, description ) {
    console.log("putting in wishlist:", {itemName, description }); 
    fetch(`http://localhost:3000/api/putInWishlist?itemName=${encodeURIComponent(itemName)}&description=${encodeURIComponent(description)}`);
  }


  return (
    <div className="products">
      <Header />
      <div className="container mt-4">
        <h2 className="text-center mb-4">Products</h2>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {data.length > 0 && data.map((user) => 
            user.products.map((item, index) => (
              <Col key={index}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={item.images && item.images[0]} // Use the first image if available
                    alt={item.itemName}
                    className="p-3"
                  />
                  <Card.Body>
                    <Card.Title>{item.itemName}</Card.Title>
                    <Card.Text>
                      <strong>Description:</strong> {item.description}
                      <br />
                      <strong>Owner:</strong> {user.fullName}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between align-items-center">
                    <Button variant="primary">Swap Request</Button>
                    <Button  onClick={() => putInWishlist(item.itemName, item.description)} variant="contained" color="secondary"><FaHeart className="text-danger" /> </Button>
                  

                  </Card.Footer>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </div>

     





                  {/* <div className="d-flex justify-content-center gap-2">
                    <Button variant="primary">Swap Request</Button>
                    
                  <Button  onClick={() => putInWishlist(item.itemName, item.description)} variant="contained" color="secondary"><FaHeart className="text-danger" /> </Button>
                  </div> */}

               
              

      <Footer />
    </div>
  );
}










// 'use client';

// import { useState, useEffect } from 'react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import '../styles/newlisting.css'; // Import the CSS from styles folder
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from 'react-bootstrap';
// import { FaHeart } from 'react-icons/fa'; // Import the heart icon from react-icons

// export default function Products() {
//   const [data, setData] = useState([]); // Store the fetched data

//   // Fetch products from the API
//   useEffect(() => {
//     fetch('http://localhost:3000/api/getProducts')
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data);
//       });
//   }, []);

//   function putInWishlist(itemName, description ) {
//     console.log("putting in wishlist:", {itemName, description }); 
//     fetch(`http://localhost:3000/api/putInWishlist?itemName=${encodeURIComponent(itemName)}&description=${encodeURIComponent(description)}`);
//   }


//   return (
//     <div className="products">
//       <Header />

//       {/* Display the products */}
//       <div className="container mt-5">
//         <div className="row g-4">
          
//           {data.map((item, i) => (
//             <div key={i} className="col-md-3 col-sm-6 col-12">
//               <div className="card h-100 text-center">
//                 <div className="card-body">
//                   {/* Image placeholder */}
//                   <div className="mb-3">
//                     {/* <Image
//                       src={item.image || '/placeholder.png'}
//                       alt={item.itemName}
//                       width={150}
//                       height={150}
//                       className="img-fluid"
//                     /> */}
//                   </div>


//                   <h5 className="card-title">{item.itemName}</h5>

//                   <p className="card-text">
//                     <strong>Description:</strong> {item.description}
//                   </p>

//                   <div className="d-flex justify-content-center gap-2">
//                     <Button variant="primary">Swap Request</Button>
                    
//                   <Button  onClick={() => putInWishlist(item.itemName, item.description)} variant="contained" color="secondary"><FaHeart className="text-danger" /> </Button>
//                   </div>

//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//        </div>  {/*end of container  */}

//       <Footer />
//     </div>
//   );
// }




