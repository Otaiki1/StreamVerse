import React from "react";
import Card from "../../Card";
import { useNavigate } from "react-router-dom";
import { usePolyverse } from "../../../context/PolyveseProvider";
import { useDataverse } from "../../../context/DataverseProvider";

const Creator = () => {
  const navigate = useNavigate();
  const handleNavigate = (item: any) => {
    navigate(`/profile/${item.name}`, { state: item });
  };
 //const { allCreators } = usePolyverse();
  const { allCreators } = useDataverse()
  console.log(allCreators)
  return (
    <div className="flex flex-wrap gap-4 w-full">
      {allCreators.map((item: any, i: any) => (
        <Card content={item} key={i} handleClick={() => handleNavigate(item)} />
      ))}
    </div>
  );
};

export default Creator;
