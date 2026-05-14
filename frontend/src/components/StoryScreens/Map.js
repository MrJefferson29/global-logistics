import React, { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import pin from "../../Assets/pin.png";

const packageIcon = new L.Icon({
  iconUrl: pin,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

/**
 * Parses package latitude / longitude from API strings (or numbers).
 * @returns {{ lat: number, lng: number } | null}
 */
export function parsePackageCoordinates(lat, long) {
  if (lat == null || long == null) return null;
  const sLat = String(lat).trim();
  const sLng = String(long).trim();
  if (!sLat || !sLng) return null;
  const latitude = parseFloat(sLat.replace(",", "."));
  const longitude = parseFloat(sLng.replace(",", "."));
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return null;
  }
  return { lat: latitude, lng: longitude };
}

const Map = ({
  lat,
  long,
  locationLabel,
  height = "400px",
  zoom = 13,
  scrollWheelZoom = false,
  style = {},
}) => {
  const coords = useMemo(() => parsePackageCoordinates(lat, long), [lat, long]);

  if (!coords) {
    return (
      <div
        style={{
          height,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f7fa",
          color: "#555",
          textAlign: "center",
          padding: "1rem",
          boxSizing: "border-box",
          ...style,
        }}
      >
        Enter valid latitude and longitude for this package to show its position on the map.
      </div>
    );
  }

  const { lat: latitude, lng: longitude } = coords;
  const position = [latitude, longitude];

  return (
    <MapContainer
      key={`${latitude}-${longitude}`}
      center={position}
      zoom={zoom}
      scrollWheelZoom={scrollWheelZoom}
      style={{ height, width: "100%", ...style }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      <Marker position={position} icon={packageIcon}>
        <Popup>
          {locationLabel
            ? `Package location: ${locationLabel}`
            : "Package last recorded position"}
          <br />
          <span style={{ fontSize: "0.85em", color: "#444" }}>
            {latitude.toFixed(5)}, {longitude.toFixed(5)}
          </span>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
