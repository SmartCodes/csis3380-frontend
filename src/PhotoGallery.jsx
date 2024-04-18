import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PhotoGallery = () => {
    const [photos, setPhotos] = useState([]);
    const [values1, setValues1] = useState({ user1: "", bid1: 0 });
    const [values2, setValues2] = useState({ user2: "", bid2: 0 });

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/arts');
            setPhotos(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    };

    const setValuesFunc1 = (e) => {
        const { name, value } = e.target;
        setValues1(prev => ({ ...prev, [name]: value }));
    };

    const setValuesFunc2 = (e) => {
        const { name, value } = e.target;
        setValues2(prev => ({ ...prev, [name]: value }));
    };

    const submitBid1 = async (photo) => {
        try {
          await axios.put(`http://localhost:5000/api/art/${photo._id}`, {
            user: values1.user1,
            bid: values1.bid1
          });
      
          fetchPhotos();
        } catch (error) {
          console.error('Error submitting bid:', error);
        }
      };

    const submitBid2 = async () => {
        try {
            await axios.post(`http://localhost:5000/api/art`, {
                artName: "NEW Art",
                serial: 1,
                src: "https://example.com/image.jpg",
                alt: "First art image",
                bids: [
                    { user: values2.user2, bid: values2.bid2 }
                ]
            });

            fetchPhotos();
        } catch (error) {
            console.error('Error submitting bid:', error);
        }
    };

    return (
        <div className="photo-gallery">
            {photos.map(photo => (
                <div key={photo._id} className="photo-container">
                    <div className="photo">
                        <img src={photo.src} alt={photo.alt} width="200" />
                    </div>
                    <div className="comments-section">
                        <div>
                            <h4>Bids</h4>
                            <ul>
                                {photo.bids.map((bid, index) => (
                                    <li key={index}><strong>{bid.user}:</strong> ${bid.bid}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="addbid">
                        <form className="comment-form">
                            <input type="text" name="user1" placeholder="Your name" onChange={setValuesFunc1} />
                            <input type="number" name="bid1" placeholder="Add a higher bid" onChange={setValuesFunc1} />
                            <button type="button" onClick={()=>submitBid1(photo)}>Submit Your Higher Bid</button>
                        </form>
                    </div>
                </div>
            ))}
            <hr />
            <div className="photo-container">
                <div className="photo">
                    <img src="https://images.metmuseum.org/CRDImages/ep/original/DT1946.jpg" alt="" />
                </div>
                <div className="comments-section">
                    <h4>Bids</h4>
                    <ul>
                        <li><strong>User1:</strong> $100</li>
                    </ul>
                </div>
                <div className="addbid">
                    <form className="comment-form">
                        <input type="text" name="user2" placeholder="Your name" onChange={setValuesFunc2} />
                        <input type="number" name="bid2" placeholder="Add a higher bid" onChange={setValuesFunc2} />
                        <button type="button" onClick={submitBid2}>Submit Your Higher Bid</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PhotoGallery;
