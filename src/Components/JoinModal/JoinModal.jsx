import ReactDom from 'react-dom';
import './joinModal.css';

const JoinModal = () => {
    return ReactDom.createPortal(
        <div>
            <div className="grey-background" />
            <div className="actual-modal">
                No siema whyyyy bhalh blahblahblahblahblahblah blahblah blahblah blahblahblah v blah blah
            </div>
        </div>,
        document.querySelector('.modal-container')
    );
}

export default JoinModal;
