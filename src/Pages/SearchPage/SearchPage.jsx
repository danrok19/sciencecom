import { useState } from 'react';
import SearchNavbar from '../../Components/SearchNavbar/SearchNavbar';
import FilterModal from '../../Components/FilterModal/FilterModal';

const SearchPage = () => {
    const [showModal, setShowModal] = useState(false);

    const onFilter = (e) =>{
        e.preventDefault();
        setShowModal(true);
    }
  return (
    <div>
        <SearchNavbar onFilter={onFilter}/>
        {showModal && <FilterModal />}
    </div>
  )
}

export default SearchPage
