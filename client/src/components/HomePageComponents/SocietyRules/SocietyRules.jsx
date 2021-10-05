import Styles from "./SocietyRules.module.css";
import RulesCard from "./RulesCard/RulesCard";
const SocietyRules = () => {
  return (
    <>
    <div className={Styles.rulesWrapper}>

  
      <div className="container container-margin-top">
        <h1 className="heading" data-aos="zoom-in">
          Society Rules
        </h1>
        <div className={`${Styles.rulesWrapper}`}>
          <RulesCard
            dataAos="fade-up"
            rulesName="water"
            discription="Fresh and good quality water of dharoi and society bore is available for 24 x 7"
          />
           <RulesCard
            dataAos="fade-up"
            rulesName="nature"
            discription="Live with nature and do not harm the plants grown in the society premisess also water them accordingly."
          />
          <RulesCard
            dataAos="fade-up"
            rulesName="speed"
            discription="Do not drive vehicle with speed more than 10km in society premises."
          />
          <RulesCard
            dataAos="fade-up"
            rulesName="sticker"
            discription="Please apply society sticker to your vehicles otherwise entry is prohibited."
          />
          <RulesCard
            dataAos="fade-up"
            rulesName="chapman"
            discription="Do not enter without any valid identity proof.verify your identity with society admin."
          />
          <RulesCard
            dataAos="fade-up"
            rulesName="cleaning"
            discription="maintain cleaniless in society for our personal and public higine. "
          />
        </div>
      </div>
      </div>
    </>
  );
};

export default SocietyRules;
