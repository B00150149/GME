'use client';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from '../components/Header';  // Adjust path if needed
import Footer from '../components/Footer';  // Adjust path if needed
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Wishlist() {
    const [wishlist, setWishlist] = useState([]);

    // Fetch wishlist items from the API
    useEffect(() => {
        fetch('/api/getWishlist')
            .then((res) => res.json())
            .then((data) => {
                setWishlist(data);              
            })
            .catch((error) => console.error('Error fetching wishlist:', error));
    }, []);

    return (
        <>
            {/* Header */}
            <Header />

            {/* Wishlist Section */}
            <Container>
                <h1>My Wishlist</h1>
                <Box>
                    {wishlist.length > 0 ? (
                        wishlist.map((item) => (
                            <Box key={item._id} border={1} p={2} mb={2}>
                                <h3>{item.itemName}</h3>
                                <p>{item.description}</p>
                            </Box>
                        ))
                    ) : (
                        <p>Your wishlist is empty.</p>
                    )}
                </Box>
            </Container>

            {/* Footer */}
            <Footer />
        </>
    );
}
