import { useState, useEffect } from "react";
import wheretoImg1 from '../img/whereto3.jpg';
import wheretoImg2 from '../img/whereto4.jpg';
import wheretoImg3 from '../img/whereto5.jpg';
import wheretoImg4 from '../img/whereto6.jpg';
import wheretoImg5 from '../img/whereto7.jpg';
import wheretoImg6 from '../img/whereto8.jpg';
import wheretoImg7 from '../img/whereto9.jpg';
import wheretoImg8 from '../img/whereto1.webp';
import wheretoImg9 from '../img/whereto2.png';
import { useHistory } from "react-router-dom";
const images = [
    wheretoImg1, wheretoImg2, wheretoImg3, wheretoImg4, wheretoImg5, wheretoImg6, wheretoImg7, wheretoImg8, wheretoImg9
  ]; // Add your image URLs here
  const BackgroundSlideshow = () => {
    const [index, setIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      }, 5000); // Change slide every 5 seconds
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <img src={images[index]} alt="BG" className="object-cover md:w-full md:h-[22em] h-[20em]" />
    );
  }
const WhereTo = () => {
    const [term, setTerm] = useState('');
    const history = useHistory();

    // Form submit handler function - fires on submit
    const handleSubmit = (e) => {
        // Prevent form from reloading page
        e.preventDefault();

        // Route to the search Result page
        // ...passing the form search 'term' state value as url parameter to be received on search result component
        history.push(`/search?location=${term}`);
    }

    return ( 
        <div className="container mx-auto p-4 relative flex justify-center items-center">
            <BackgroundSlideshow />
            {/* Search Input Field */}
            <div className="absolute w-[85%] md:w-10/12">
                <form className="relative" onSubmit={handleSubmit}>
                    <svg className="h-6 w-6 absolute left-3 top-1/4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input 
                        type="text" 
                        placeholder="Where to?"
                        className="bg-white rounded-full w-full pl-12 py-3 shadow-xl focus:outline-none" 
                        value={term}
                        // Update form state value onChange of input
                        onChange={e => setTerm(e.target.value)}
                    />
                </form>
            </div>
            {/* --- */}
        </div>
     );
}
 
export default WhereTo;