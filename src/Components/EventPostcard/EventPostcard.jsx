import './eventPostcard.css';
import { BsFillCalendarDateFill, BsSmartwatch } from 'react-icons/bs';
import Tag from '../Tag/Tag';

const EventPostcard = ({ name, describtion, date, clock, place, tags }) => {


    const content = tags.map((tag) =>{
        return(
          <li>
            <Tag key={tag.id}>{tag.name}</Tag>
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
                <div className="postcard-details-button">
                    Dołącz
                </div>
            </div>
            <div className="postcard-img">
                <img src="https://picsum.photos/1000/1000" alt="ImageTitle" />
            </div>
        </article>
    )
}
export default EventPostcard;