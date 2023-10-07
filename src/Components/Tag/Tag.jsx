import './tag.css';

const Tag = ({children, style}) => {
    return (
        <div className="tag" style={style}>
           {children}
        </div>
    )
}

export default Tag
