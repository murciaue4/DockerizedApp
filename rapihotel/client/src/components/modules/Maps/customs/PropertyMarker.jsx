
import { useState } from "react";
import styles from "./PropertyMarker.module.css";


const PropertyMarker = ({ type, price, address, bed, bath, size }) => {

  const [showInfo, setShowInfo] = useState(false);

  const handleMouseEnter = () => {
    console.log('hola');
    setShowInfo(true);
  };

  const handleMouseLeave = () => {
    setShowInfo(false);
  };


  return (
    <div className='h-10 w-10' onClick={handleMouseEnter} >
      <div className='border-2 border-black rounded-full bg-red-500' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className='text-white text-center'>{'hotel'}</div>

        

      </div>

      {showInfo && (
      {/* <div className={styles.details}>
        <div className={styles.price}>{price}</div>
        <div className={styles.address}>{address}</div>
        <div className={styles.features}>
          <div>
            <i
              aria-hidden="true"
              className={`fa fa-bed fa-lg ${styles.bed}`}
              title="bedroom"
            ></i>
            <span className={styles.faSrOnly}>bedroom</span>
            <span>{bed}</span>
          </div>
          <div>
            <i
              aria-hidden="true"
              className={`fa fa-bath fa-lg ${styles.bath}`}
              title="bathroom"
            ></i>
            <span className={styles.faSrOnly}>bathroom</span>
            <span>{bath}</span>
          </div>
          <div>
            <i
              aria-hidden="true"
              className={`fa fa-ruler fa-lg ${styles.size}`}
              title="size"
            ></i>
            <span className={styles.faSrOnly}>size</span>
            <span>
              {size} ft<sup>2</sup>
            </span>
          </div>
        </div>
      </div> */}
      )}

    </div>
  );
};

export default PropertyMarker;
