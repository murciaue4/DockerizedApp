import React from 'react';
import imagesIconWhite from '../../../static/imagesIconWhithe.svg.svg';


const ButtonImagesLength = ({imagesHotel, onClick}) => {
  return (
   <button
          className={`z-10 w-auto h-auto py-1 px-2 space-x-1 flex justify-center items-center absolute right-4 bottom-4  bg-black bg-opacity-70 rounded-xl`}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <img src={imagesIconWhite} alt="" className="w-4 h-4" />
         <span className="text-white text-sm">{imagesHotel?.length}</span>
        </button>
  );
}

export default ButtonImagesLength;


