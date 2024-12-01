import React, { useState, useEffect } from "react";

import CreateTour from "../CreateTourAndPackage/CreateTourPage/CreateTour";
import CreatePackage from "../CreateTourAndPackage/CreatePackagePage/CreatePackage";
import {
  countPackageInTour,
  getPackageByTourId,
} from "../../../../api/Services/TourAndPackageServices";
import { useParams } from "react-router-dom";

export default function UpdateTourPage() {
  const { tourId } = useParams();
  const [numPackage, setNumPackage] = useState();
  const [tourPackages, setTourPackage] = useState([
    {
      name: "",
      description: "",
      image: "",
      price: "",
      quantity: "",
      activities: [""],
      VAT: "",
      isChangeSchedule: false,
      isRefund: false,
    },
  ]);

  const [tour, setTour] = useState({
    Name: "",
    Region: "",
    Country: "",
    City: "",
    Image: "",
    Opening: "",
    Ending: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const [packagesRes, countRes] = await Promise.all([
        getPackageByTourId(tourId),
        countPackageInTour(tourId),
      ]);

      setTourPackage(packagesRes);
      setNumPackage(countRes);
    };
    fetchData();
  }, [tourId]);

  const getPackage = (data) => {
    setTourPackage(data);
  };

  const getTour = (data) => {
    setTour(data);
  };

  return (
    <>
      {numPackage > 0 && (
        <>
          <CreateTour getTour={getTour} />
          <CreatePackage
            getPackage={getPackage}
            defaultPackage={tourPackages}
            numPackage={numPackage}
          />
        </>
      )}
    </>
  );
}
