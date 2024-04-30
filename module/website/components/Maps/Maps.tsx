import L from "leaflet";
import "leaflet-arrowheads";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import usStatesGeoJSON from "./us-states-geo.json";

const Maps = () => {
  const data = [
    {
      vertices: [
        {
          _key: "1143623",
          _id: "users/1143623",
          _rev: "_gAPziTq---",
          user_id: 84,
          name: "u10",
          email: "u10@gmail.com",
          phone: "+n10",
          user_exist: true,
          city: "MELISSA",
          country: "USA",
          latitude: 33.2859472,
          postal_code: "75454-2529",
          state: "TX",
          address: "301 W 5TH AVE",
          longitude: -96.57276689999999,
        },
        {
          _key: "1144833",
          _id: "users/1144833",
          _rev: "_gAPziTy---",
          address: "Mughalpura",
          postal_code: "24869-8408",
          city: "NORTH SPRING",
          state: "WV",
          country: "USA",
          longitude: -81.8251687,
          latitude: 37.5601298,
          user_exist: false,
          name: "u12",
          email: "u12@gmail.com",
          phone: "+n12",
        },
        {
          _key: "1144782",
          _id: "users/1144782",
          _rev: "_gAP1OGq---",
          address: "301 W 5TH AVE",
          postal_code: "75454-2529",
          city: "MELISSA",
          state: "TX",
          country: "USA",
          longitude: -104.990251, //denver colorado longitude is     -104.990251
          latitude: 39.739235, //denver colorado latitude is 39.739235
          user_exist: true,
          name: "u11",
          email: "u11@gmail.com",
          phone: "+n11",
          user_id: 85,
        },
        {
          _key: "1144946",
          _id: "users/1144946",
          _rev: "_gAP1OGy---",
          address: "Mughalpura",
          postal_code: "24869-8408",
          city: "NORTH SPRING",
          state: "WV",
          country: "USA",
          longitude: -111.0937311, //utah longitude is -111.0937311
          latitude: 37.5601298,
          user_exist: false,
          name: "u13",
          email: "u13@gmail.com",
          phone: "+n13",
        },
      ],
      edges: [
        {
          _key: "1144837",
          _id: "tags/1144837",
          _from: "users/1143623",
          _to: "users/1144833",
          _rev: "_gAP6x9y---",
          tager_id: "1143623",
          tagee_id: "1144833",
          tager_name: "u10",
          tager_phone: "+n10",
          tager_address: "301 W 5TH AVE",
          tager_postal_code: "75454-2529",
          tager_location: [-96.57276689999999, 33.2859472],
          tagee_location: [-81.8251687, 37.5601298],
          is_active: false,
          color: "#FF0000",
          minion_code: null,
          infleuncer_code: null,
          chain_code: null,
        },
        {
          _key: "1144786",
          _id: "tags/1144786",
          _from: "users/1143623",
          _to: "users/1144782",
          _rev: "_gAP5fvi---",
          tager_id: "1143623",
          tagee_id: "1144782",
          tager_name: "u10",
          tager_phone: "+n10",
          tager_address: "301 W 5TH AVE",
          tager_postal_code: "75454-2529",
          tager_location: [-96.57276689999999, 33.2859472],
          tagee_location: [-96.57276689999999, 33.2859472],
          is_active: true,
          color: "#00FF00",
          minion_code: null,
          infleuncer_code: null,
          chain_code: null,
        },
        {
          _key: "1144950",
          _id: "tags/1144950",
          _from: "users/1144782",
          _to: "users/1144946",
          _rev: "_gAP6N9y---",
          tager_id: "1144782",
          tagee_id: "1144946",
          tager_name: "u11",
          tager_phone: "+n11",
          tager_address: "301 W 5TH AVE",
          tager_postal_code: "75454-2529",
          tager_location: [-96.57276689999999, 33.2859472],
          tagee_location: [-81.8251687, 37.5601298],
          is_active: false,
          color: "#FF0000",
          minion_code: null,
          infleuncer_code: null,
          chain_code: null,
        },
      ],
    },
  ];

  //extract all vertices and edges from the data
  const vertices = data.flatMap((item) => item.vertices);
  const edges = data.flatMap((item) => item.edges);

  // Extract all polylines from the edges
  const edges_Lat_Langs = edges.map((edge) => {
    const tager = vertices.find((vertex) => vertex._id === edge._from);
    const tagee = vertices.find((vertex) => vertex._id === edge._to);
    return [
      [tager.latitude, tager.longitude],
      [tagee.latitude, tagee.longitude],
    ];
  });

  useEffect(() => {
    // Create a map instance
    const map = L.map("map-container", {
      maxBounds: [
        [24.396308, -125.0], // Southwest coordinates
        [49.384, -66.952], // Northeast coordinates
      ],

      maxBoundsVisible: false,
      draggable: true,
      maxBoundsViscosity: 1.0,
      zoomControl: false,
      minZoom: 4,
      maxZoom: 8,

      center: [40.712776, -74.005974], //lincoln nebraska coordinates are [40.712776, -74.005974]
    }).setView([40.712776, -74.005974], 4);

    // Add a tile layer (e.g., OpenStreetMap)
    L.tileLayer("", {
      attribution: "TEE TAG",
      maxZoom: 18,
    }).addTo(map);

    const onEachFeature = (feature, layer) => {
      //bind popup to show state name with background color green and text large
      layer.bindPopup(
        `<div style="background-color: green; color: white; font-size: 20px; padding: 10px;">${feature.properties.name}</div>`,
      );
      //make popup tip red
      layer.on("popupopen", function () {
        layer.setStyle({
          weight: 2,
          color: "yellow",
          dashArray: "2",
          fillOpacity: 0.5,
        });
      });

      //popup styling
      layer.setStyle({
        weight: 2,
        color: "#00ffcc",
        dashArray: "",
        fillOpacity: 0.5,
      });

      layer.on({
        mouseover: (e) => {
          var layer = e.target;
          layer.setStyle({
            weight: 5,
            color: "yellow",
            dashArray: "",
            fillOpacity: 0.7,
          });
          if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
          }
        },
        mouseout: (e) => {
          var layer = e.target;
          layer.setStyle({
            weight: 2,
            color: "#00ffcc",
            dashArray: "",
            fillOpacity: 0.5,
          });
        },
      });
    };

    L.geoJSON(usStatesGeoJSON, {
      onEachFeature: onEachFeature,
      style: () => {
        return {
          color: "#00ffcc",
          fillColor: "#0D735E",
          fillOpacity: 0.5,
          weight: 2,
        };
      },
    }).addTo(map);

    var greenIcon = L.icon({
      iconUrl: "/assets/map-ellipse.png",
      iconSize: [10, 10], // size of the icon
    });
    var mainIcon = L.icon({
      iconUrl: "/assets/player2.png",
      iconSize: [20, 20], // size of the icon
      className: "map-icon",
    });

    //add markers based on vertices array
    vertices.map((vertex, index) => {
      var marker = L.marker([vertex.latitude, vertex.longitude], {
        icon: index === 0 ? mainIcon : greenIcon,
      }).addTo(map);

      marker.on("click", function () {
        L.popup({
          maxWidth: 1000,
          minWidth: 400,
        })
          .setLatLng(marker.getLatLng())
          .setContent(`Name: ${vertex.name}`)
          .openOn(map);
      });
    });

    //add polylines based on edges_Lat_Langs array

    edges_Lat_Langs.map((poly, index) => {
      L.polyline(poly, {
        color: index == 0 || index == 2 ? "red" : "yellow",
        weight: 1,
      }).addTo(map);
    });
    // Clean up
    return () => {
      map.remove();
    };
  });

  return (
    <div
      id="map-container"
      style={{ height: "100vh", background: "black" }}
    ></div>
  );
};

export default Maps;
