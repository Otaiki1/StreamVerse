import React from 'react'

interface Props {
    content: any
    handleClick: any
}


const Card = ({ content, handleClick }: Props) => {
    return (
      <div className="mr-12 ml-3 w-[250px]">
          <div onClick={handleClick} className="bg-black py-[35px] cursor-pointer hover:scale-95 transition-all min-w-[270px] h-[360px] block px-[35px]" >
          <img
            className='!rounded-full  min-w-[200px] min-h-[200px] object-cover'
            src={content.image}
            alt={content.name}
          />
          <div className="min-h-[125px]">
            <h2 className="text-[24px] mt-9 font-bold font-OpenSans-Bold">{content.name}</h2>
            <h4 className="text-[16px] font-semibold font-OpenSans-Bold">{content.category}</h4>
          </div>
        </div>
      </div>
    );
  };
  
  export default Card;
  