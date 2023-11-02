import './eventPostcard.css';
import { BsFillCalendarDateFill, BsSmartwatch } from 'react-icons/bs';
import Tag from '../Tag/Tag';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EventPostcard = ({ id, name, describtion, date, clock, place, tags }) => {

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        // Check the screen width on component mount and whenever the window is resized
        function handleResize() {
          setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
        }
    
        // Attach the event listener
        window.addEventListener('resize', handleResize);
    
        // Call handleResize once to set the initial value
        handleResize();
    
        // Cleanup: remove the event listener when the component unmounts
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);


    const content = tags?.map((tag) =>{
        return(
          <li>
            <Tag key={tag}>{tag}</Tag>
          </li>
        )
      })


    return (
        <article className="postcard">
            <div className="postcard-text">
                <h1 className="postcard-title">{name}</h1>
                <div className="postcard-subtitle">
                    <div className="postcard-date">
                        <BsFillCalendarDateFill />
                        {date}
                    </div>
                    <div className="postcard-date">
                        <BsSmartwatch />
                        {clock}
                    </div>
                </div>
                <div className=""></div>
                <div className="postcard-description">{describtion}</div>
                <ul className="postcard-tags">
                    {content}
                </ul>
                <Link className={`postcard-details-button ${isMobile ? 'no-hover' : ''}`} to={`/events/${id}`}>
                    Dołącz
                </Link>
            </div>
            <div className="postcard-img">
                <img src="https://picsum.photos/1000/1000" alt="ImageTitle" />
            </div>
        </article>
    )
}
export default EventPostcard;