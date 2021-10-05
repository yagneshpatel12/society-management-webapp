import Styles from './RulesCard.module.css';

const RulesCard = ({rulesName,discription,dataAos}) => {
    return (
        <>
            <div className={` box-shadow ${Styles.rulesCard}`} data-aos={dataAos}>
                <h3>{rulesName}</h3>
               <p>{discription}</p>
            </div>
        </>
    )
}

export default RulesCard
