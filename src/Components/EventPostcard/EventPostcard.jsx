import './eventPostcard.css';
import { BsFillCalendarDateFill, BsSmartwatch } from 'react-icons/bs';

const EventPostcard = ({ name, shortDescribtion, date, clock, place }) => {

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
                <div className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!</div>
                <ul className="">
                    <li className=""><i className="fas fa-tag mr-2"></i>Podcast</li>
                    <li className=""><i className="fas fa-clock mr-2"></i>55 mins.</li>
                </ul>
            </div>
            <div className="postcard-img">
                <img src="https://picsum.photos/1000/1000" alt="ImageTitle" />
            </div>
        </article>
    )
}
export default EventPostcard;