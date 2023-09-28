import { useState } from 'react';
import './changeEvent.css';
import Button from '../Button/Button';
import { RxCross2 } from 'react-icons/rx';
import { BsExclamationDiamondFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const ChangeEvent = () => {

  const [ showWarning, setShowWarning ] = useState(false);

  const onClosing = () =>{
    setShowWarning(true);
  }

  return (
    <div className={showWarning ? 'section-closed' : 'section-wrapper'}>
        <div className="cross-sign">
            <h3>Podpowiedź</h3>
            <RxCross2 style={{cursor: 'pointer'}} onClick={onClosing} />
        </div>
        <div className="text-wrapper">
            <span>Poniższy formularz pozwoli Ci utworzyć festiwal, który musi składać sięz conajmniej dwóch wydarzeń. 
                Jeżeli chcesz utworzyć jedynie pojedyńcze wydarzenie to przejdź do zaklładki z formularzem tworzenia wydarzenia. <BsExclamationDiamondFill style={{color: '#FFA844', fontSize: '24px'}}/>
            </span>
            <Button primary className="btn-create">
            <Link to='/organizeEvent' style={{textDecoration: 'none', color: 'white'}}> Utwórz wydarzenie</Link>
            </Button>
        </div>
    </div>
  )
}

export default ChangeEvent
