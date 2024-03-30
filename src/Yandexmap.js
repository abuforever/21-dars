import React, { useState } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";

const GeocoderMap = ({ setValue }) => {
  const placemarkOptions = {
    iconLayout: "default#image",
    iconImageHref: require("./location.png"),
    iconImageSize: [80, 80],
    iconImageOffset: [-40, -40],
  };
  const [coordinates, setCoordinates] = useState([40.98, 71.58]);

  const handleMapChange = (event) => {
    const newCenter = event.get("newCenter");
    setCoordinates(newCenter);
    ymaps.geocode(newCenter).then(
      function (res) {
        const address = res.geoObjects.get(0).properties.get("text");
        setValue(address);
      },
      function (err) {
        console.log("Xatolik:", err);
      }
    );
  };

  return (
    <YMaps>
      <Map
        state={{ center: coordinates, zoom: 20 }}
        width="100%"
        height="400px"
        instanceRef={(ref) => {
          if (ref) {
            ref.events.add("boundschange", handleMapChange);
          }
        }}
      >
        <Placemark
          geometry={coordinates}
          options={placemarkOptions}
          properties={{
            hintContent: "Bu yerda hint",
            balloonContent: "Bu yerda balon matni",
          }}
        />
      </Map>
    </YMaps>
  );
};

export default GeocoderMap;
