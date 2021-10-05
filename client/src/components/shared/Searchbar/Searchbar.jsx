import Styles from './Searchbar.module.css';
const Searchbar = ({searchInput,searchInputValue}) => {
    return (
        <div className={`box-shadow ${Styles.searchbar}`}>
          <input type="text" placeholder="Search by family name" value={searchInput} onChange={(e)=>searchInputValue(e.target.value)} />
          <button className={`btnStructure ${Styles.btn}`}>
            <i className="fas fa-search"></i>
          </button>
        </div>
    )
}

export default Searchbar
