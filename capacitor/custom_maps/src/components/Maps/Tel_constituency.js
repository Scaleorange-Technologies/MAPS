// import React, { useState, useEffect, useRef } from 'react';
// import { MapContainer, TileLayer, Marker, Polygon, useMapEvents, useMap, GeoJSON, Tooltip } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { Capacitor } from '@capacitor/core';
// import { Geolocation } from '@capacitor/geolocation';
// import { ChevronDown, ChevronUp, Menu, X, Compass, MapPin, Layout, CircleSlash } from 'lucide-react';

// // Set up Leaflet default icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
//     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
// });

// // Function to check if a point is inside a polygon
// const isPointInPolygon = (point, polygon) => {
//     const x = point[0], y = point[1];
//     let inside = false;

//     for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
//         const xi = polygon[i][0], yi = polygon[i][1];
//         const xj = polygon[j][0], yj = polygon[j][1];

//         const intersect = ((yi > y) !== (yj > y))
//             && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
//         if (intersect) inside = !inside;
//     }

//     return inside;
// };

// // Function to check if a point is in a GeoJSON feature
// const isPointInGeoJSON = (point, geojson) => {
//     const lat = point[0];
//     const lng = point[1];

//     for (const feature of geojson.features) {
//         if (feature.geometry.type === 'Polygon') {
//             const coordinates = feature.geometry.coordinates[0];
//             const polygonPoints = coordinates.map(coord => [coord[1], coord[0]]);
//             if (isPointInPolygon([lat, lng], polygonPoints)) {
//                 return {
//                     isInside: true,
//                     properties: {
//                         district: feature.properties?.DISTRICT_N || 'N/A',
//                         mandal: feature.properties?.MANDAL_NAM || 'N/A',
//                         assembly: feature.properties?.assembly || 'N/A',
//                         name: feature.properties?.name || 'N/A',
//                     }
//                 };
//             }
//         } else if (feature.geometry.type === 'MultiPolygon') {
//             for (const polygon of feature.geometry.coordinates) {
//                 const polygonPoints = polygon[0].map(coord => [coord[1], coord[0]]);
//                 if (isPointInPolygon([lat, lng], polygonPoints)) {
//                     return {
//                         isInside: true,
//                         properties: {
//                             district: feature.properties?.DISTRICT_N || 'N/A',
//                             mandal: feature.properties?.MANDAL_NAM || 'N/A',
//                             assembly: feature.properties?.assembly || 'N/A',
//                             name: feature.properties?.name || 'N/A',
//                         }
//                     };
//                 }
//             }
//         }
//     }

//     return { isInside: false };
// };


// const SplashScreen = ({ onComplete }) => {
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             const splash = document.getElementById('splash-screen');
//             if (splash) {
//                 splash.classList.add('opacity-0');
//             }
//             setTimeout(onComplete, 500);
//         }, 1700);

//         return () => clearTimeout(timer);
//     }, [onComplete]);

//     return (
//         <div
//             id="splash-screen"
//             className="fixed inset-0 bg-gradient-to-br from-blue-50 to-blue-100 
//             flex items-center justify-center z-50 transition-opacity duration-500"
//         >
//             <div className="text-center animate-fade-in">
//                 <div className="mb-6 animate-bounce">
//                     <div className="text-6xl text-blue-600">🌍</div>
//                 </div>
//                 <h1 className="text-4xl font-bold mb-4 text-blue-800 animate-slide-up">
//                     Custom Maps
//                 </h1>
//                 <p className="text-lg text-blue-600 mb-6 animate-slide-up">
//                     Your Gateway to Advanced Mapping Solutions
//                 </p>
//                 <div className="animate-pulse">
//                     <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent 
//                     rounded-full animate-spin mx-auto mb-4">
//                     </div>
//                     <p className="text-sm text-blue-700">Loading your mapping experience...</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
//     return (
//         <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-700 to-blue-500 shadow-xl h-16 flex items-center px-4 z-40">
//             {/* Sidebar Toggle Button */}
//             <button
//                 onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                 className="relative group p-2  hover:bg-blue-700 rounded-lg transition-all duration-300 ease-in-out"
//             >
//                 <div className="relative ">
//                     <Menu
//                         className={`w-6 h-6  text-white transition-transform duration-300 ${isSidebarOpen ? 'rotate-90 scale-110' : 'rotate-0'
//                             }`}
//                     />
//                     {/* <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span> */}
//                 </div>
//             </button>

//             {/* App Title */}
//             <h1 className="text-2xl font-bold text-center flex-1 text-white font-['Poppins'] tracking-wide">
//                 <span className="inline-block transform hover:scale-105 transition-transform duration-300">
//                     Custom Maps <span className="animate-rotate">🌍</span>
//                 </span>
//             </h1>

//             {/* Subtle Shadow Below Header */}
//             <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-b from-blue-700/30 to-transparent"></div>
//         </div>
//     );
// };
// const Sidebar = ({ isOpen, children }) => {
//     return (
//         <div
//             className={`
//                 fixed top-16 left-0 h-[calc(100%-4rem)] bg-gradient-to-t from-blue-200 to-white shadow-lg z-50 
//                 w-3/4 transform transition-transform duration-300 ease-in-out
//                 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
//             `}
//         >
//             <div className="p-4 space-y-4 overflow-y-auto h-full">
//                 {children}
//             </div>
//         </div>
//     );
// };

// function MapController({ center, zoom, getCurrentLocation, loading }) {
//     const map = useMap();

//     useEffect(() => {
//         if (center) {
//             map.setView(center, zoom || map.getZoom());
//         }
//     }, [center, zoom, map]);

//     return (
//         <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-2">
//             <button
//                 onClick={getCurrentLocation}
//                 disabled={loading}
//                 className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 
//                     disabled:bg-blue-300 transition-colors duration-200 transform hover:scale-105 
//                     flex items-center justify-center space-x-2 shadow-md"
//             >
//                 <Compass className="w-4 h-4" />
//                 <span className="font-bold">{loading ? 'Getting Location...' : 'Get My Location'}</span>
//             </button>
//         </div>
//     );
// }
// function LocationMarker({ position, onLocationSelect, isDrawing, setPosition }) {
//     const map = useMapEvents({
//         click(e) {
//             const { lat, lng } = e.latlng;
//             if (isDrawing && onLocationSelect) {
//                 onLocationSelect([lat, lng]);
//             } else {
//                 setPosition([lat, lng]);
//                 // Don't update geojsonAreaStatus for manual clicks
//                 if (onLocationSelect) {
//                     onLocationSelect([lat, lng]);
//                 }
//             }
//         },
//     });

//     return position ? (
//         <Marker
//             position={position}
//             icon={new L.Icon({
//                 iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
//                 iconSize: [25, 41],
//                 iconAnchor: [12, 41],
//                 popupAnchor: [1, -34],
//                 shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
//                 shadowSize: [41, 41],
//             })}
//         />
//     ) : null;
// }

// const DrawingControls = ({ currentAreaName, setCurrentAreaName, finishDrawing, cancelDrawing }) => {
//     return (
//         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg z-[9999] w-80">
//             <div className="space-y-3">
//                 <input
//                     type="text"
//                     value={currentAreaName}
//                     onChange={(e) => setCurrentAreaName(e.target.value)}
//                     placeholder="Enter area name"
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
//                 />
//                 <div className="flex space-x-2">
//                     <button
//                         onClick={finishDrawing}
//                         className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
//                     >
//                         <span>✓</span>
//                         <span>Save</span>
//                     </button>
//                     <button
//                         onClick={cancelDrawing}
//                         className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
//                     >
//                         <CircleSlash className="w-4 h-4" />
//                         <span>Cancel</span>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const MapsCon = () => {
//     const [userPosition, setUserPosition] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
//     const [error, setError] = useState('');
//     const [isDrawing, setIsDrawing] = useState(false);
//     const [currentShape, setCurrentShape] = useState([]);
//     const [shapes, setShapes] = useState([]);
//     const [currentAreaName, setCurrentAreaName] = useState('');
//     const [userAreaStatus, setUserAreaStatus] = useState({ areas: [] });    const [geojsonAreaStatus, setGeojsonAreaStatus] = useState('');
//     const [selectedShape, setSelectedShape] = useState(null);
//     const [mapZoom, setMapZoom] = useState(13);
//     const [geojsonData, setGeojsonData] = useState(null);
//     const [selectedLayer, setSelectedLayer] = useState(null);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//     const [layerCounts, setLayerCounts] = useState({
//         district: 0,
//         mandal: 0,
//         constituency: 0,
//         area: 0,
//         wards: 0,
//         zones: 0,
//     });
//     const [userAreaMessage, setUserAreaMessage] = useState('');
//     const [showHoveredFeature, setShowHoveredFeature] = useState(false);
//     const [showSplash, setShowSplash] = useState(true);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [showControls, setShowControls] = useState(false);
//     // const [hoveredFeature, setHoveredFeature] = useState(null);
//     const [mapReady, setMapReady] = useState(false);
//     const [selectedLayerName, setSelectedLayerName] = useState(''); // New state for selected layer name
//     const [hoveredFeatureProperties, setHoveredFeatureProperties] = useState(null);
//     // Load saved shapes and get current location on mount
//     useEffect(() => {
//         const savedShapes = localStorage.getItem('mapShapes');
//         if (savedShapes) {
//             setShapes(JSON.parse(savedShapes));
//         }
//         getCurrentLocation();
//     }, []);

//     // Save shapes to localStorage whenever they change
//     useEffect(() => {
//         localStorage.setItem('mapShapes', JSON.stringify(shapes));
//     }, [shapes]);

//     useEffect(() => {
//         console.log('GeoJSON Data:', geojsonData); // Debugging
//     }, [geojsonData]);
//     // Function to load layer data
//     const loadLayerData = async (layer) => {
//         console.log('Selected Layer:', layer);
//         setGeojsonData(null);
//         setSelectedLayer(layer);
//         setIsDropdownOpen(false);
//         setIsSidebarOpen(false); // Close the sidebar after selecting a layer
//         setSelectedLayerName(layer); // Set the selected layer name

//         try {
//             const fileMapping = {
//                 constituency: '/telangana_ac.json',
//                 mandal: '/TS_Mandals.json',
//                 district: '/Ts_Dis.json',
//                 area: '/ghmc-area.geojson',
//                 wards: '/ghmc-wards.geojson',
//                 zones: '/ghmc-zones.geojson',
//             };
//             const response = await fetch(fileMapping[layer]);
//             const data = await response.json();
//             setGeojsonData(data);

//             setLayerCounts(prev => ({
//                 ...prev,
//                 [layer]: data.features.length || 0
//             }));

//             if (userPosition) {
//                 const geoJsonCheck = isPointInGeoJSON(userPosition, data);
//                 if (geoJsonCheck.isInside) {
//                     const props = geoJsonCheck.properties;
//                     switch (layer) {
//                         case 'district':
//                             setGeojsonAreaStatus(`You are in : ${props.district} district`);
//                             break;
//                         case 'mandal':
//                             setGeojsonAreaStatus(`You are in : ${props.mandal} mandal`);
//                             break;
//                         case 'constituency':
//                             setGeojsonAreaStatus(`You are in : ${props.assembly} constituency`);
//                             break;
//                         case 'area':
//                             setGeojsonAreaStatus(`You are in : ${props.name} area`);
//                             break;
//                         case 'wards':
//                             setGeojsonAreaStatus(`You are in : ${props.name} ward`);
//                             break;
//                         case 'zones':
//                             setGeojsonAreaStatus(`You are in : ${props.name} zone`);
//                             break;
//                         default:
//                             setGeojsonAreaStatus('Area information not available');
//                     }
//                     setMapCenter(userPosition);
//                     setMapZoom(13);
//                 } else {
//                     setGeojsonAreaStatus(`You are not present in any ${layer}`);
//                 }
//             }
//         } catch (error) {
//             setError('Error loading data');
//             console.error('Error loading data:', error);
//         }
//     };




//     useEffect(() => {
//         console.log('hoveredFeatureProperties changed:', hoveredFeatureProperties); // Debugging
//     }, [hoveredFeatureProperties]);

//     useEffect(() => {
//         const loadAllLayerCounts = async () => {
//             const layers = ['district', 'mandal', 'constituency', 'area', 'wards', 'zones'];
//             const fileMapping = {
//                 constituency: '/telangana_ac.json',
//                 mandal: '/TS_Mandals.json',
//                 district: '/Ts_Dis.json',
//                 area: '/ghmc-area.geojson',
//                 wards: '/ghmc-wards.geojson',
//                 zones: '/ghmc-zones.geojson',
//             };

//             try {
//                 const counts = {};
//                 for (const layer of layers) {
//                     try {
//                         const response = await fetch(fileMapping[layer]);
//                         const data = await response.json();
//                         counts[layer] = data.features ? data.features.length : data.length;
//                     } catch (error) {
//                         console.error(`Error loading ${layer} count:`, error);
//                         counts[layer] = 0;
//                     }
//                 }
//                 setLayerCounts(prev => ({ ...prev, ...counts }));
//             } catch (error) {
//                 console.error('Error in loadAllLayerCounts:', error);
//             }
//         };

//         loadAllLayerCounts();
//     }, []);
//     const getCurrentLocation = async () => {
//         setLoading(true);
//         try {
//             const position = await Geolocation.getCurrentPosition();
//             const { latitude, longitude } = position.coords;
//             setUserPosition([latitude, longitude]);
//             setMapCenter([latitude, longitude]);
//             setMapZoom(15);

//             // Check location against GeoJSON and shapes
//             if (geojsonData) {
//                 checkUserLocation([latitude, longitude]);
//             }
//         } catch (error) {
//             console.error('Error getting location:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleMapClick = (position) => {
//         if (isDrawing) {
//             setCurrentShape([...currentShape, position]);
//         } else {
//             setUserPosition(position);
//             checkUserLocation(position);
//         }
//     };

//     const startDrawing = () => {
//         setIsDrawing(true);
//         setCurrentShape([]);
//         setCurrentAreaName('');
//         setIsSidebarOpen(false); 
//     };


//     const cancelDrawing = () => {
//         setIsDrawing(false);
//         setCurrentShape([]);
//         setCurrentAreaName('');
//     };


//     const checkUserInCustomArea = (position) => {
//         if (shapes.length > 0) {
//             let insideAreas = [];
//             shapes.forEach(shape => {
//                 if (isPointInPolygon(position, shape.points)) {
//                     insideAreas.push(shape.name);
//                 }
//             });

//             if (insideAreas.length > 0) {
//                 setUserAreaMessage(`You are in custom area${insideAreas.length > 1 ? 's' : ''}: ${insideAreas.join(', ')}`);
//             } else {
//                 setUserAreaMessage('You are not in any custom area');
//             }
//         } else {
//             // Clear the message if there are no shapes
//             setUserAreaMessage('');
//         }
//     };
//     const finishDrawing = () => {
//         if (currentShape.length >= 3 && currentAreaName.trim()) {
//             const newShape = {
//                 points: currentShape,
//                 name: currentAreaName.trim(),
//                 color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
//             };
//             const newShapes = [...shapes, newShape];
//             setShapes(newShapes);
//             setCurrentShape([]);
//             setCurrentAreaName('');
//             setIsDrawing(false);

//             // Check if user is in the newly drawn area
//             if (userPosition) {
//                 // Small delay to ensure state is updated
//                 setTimeout(() => {
//                     checkUserInCustomArea(userPosition);
//                 }, 100);
//             }
//         } else {
//             setError('Please draw at least 3 points and provide a name for the area');
//         }
//     };

//     const checkUserLocation = (position) => {
//         // Check custom areas
//         checkUserInCustomArea(position);

//         // Only check geojson if we have data and a selected layer
//         if (geojsonData && selectedLayer) {
//             const geoJsonCheck = isPointInGeoJSON(position, geojsonData);
//             if (geoJsonCheck.isInside) {
//                 const props = geoJsonCheck.properties;
//                 switch (selectedLayer) {
//                     case 'district':
//                         setGeojsonAreaStatus(`You are in : ${props.district || 'N/A'} district`);
//                         break;
//                     case 'mandal':
//                         setGeojsonAreaStatus(`You are in : ${props.mandal || 'N/A'} mandal`);
//                         break;
//                     case 'constituency':
//                         setGeojsonAreaStatus(`You are in : ${props.assembly || 'N/A'} constituency`);
//                         break;
//                     case 'area':
//                     case 'wards':
//                     case 'zones':
//                         setGeojsonAreaStatus(`You are in : ${props.name || 'N/A'} ${selectedLayer}`);
//                         break;
//                     default:
//                         setGeojsonAreaStatus('Area information not available');
//                 }
//             } else {
//                 setGeojsonAreaStatus(`You are not present in any ${selectedLayer}`);
//             }
//         }
//     };

//     useEffect(() => {
//         if (userPosition) {
//             checkUserInCustomArea(userPosition);
//         }
//     }, [userPosition, shapes]);
//     const hoverTimeoutRef = useRef(null); // Ref to store the timeout

//     const handleClickOutside = (event) => {
//         const sidebar = document.querySelector('.sidebar');
//         const backdrop = document.querySelector('.backdrop');
//         if (isSidebarOpen && sidebar && backdrop && !sidebar.contains(event.target) && backdrop.contains(event.target)) {
//             setIsSidebarOpen(false);
//         }
//     };

//     useEffect(() => {
//         if (isSidebarOpen) {
//             document.addEventListener('mousedown', handleClickOutside);
//         } else {
//             document.removeEventListener('mousedown', handleClickOutside);
//         }

//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [isSidebarOpen]);

// const onEachFeature = (feature, layer) => {
//         // Remove the timeout reference since we want immediate tooltips
//         layer.on({
//             mouseover: (e) => {
//                 // Immediately set the properties and show the tooltip
//                 const props = feature.properties;
//                 setHoveredFeatureProperties(props);
//                 setShowHoveredFeature(true);

//                 // Create tooltip content immediately
//                 let tooltipContent = '';
//                 switch (selectedLayer) {
//                     case 'district':
//                         tooltipContent = props.DISTRICT_N || 'N/A';
//                         break;
//                     case 'mandal':
//                         tooltipContent = props.MANDAL_NAM || 'N/A';
//                         break;
//                     case 'constituency':
//                         tooltipContent = props.assembly || 'N/A';
//                         break;
//                     case 'area':
//                     case 'wards':
//                     case 'zones':
//                         tooltipContent = props.name || 'N/A';
//                         break;
//                     default:
//                         tooltipContent = 'Unnamed area';
//                 }

//                 // Bind and immediately open the tooltip
//                 layer.bindTooltip(tooltipContent, {
//                     permanent: false,
//                     direction: 'top',
//                     className: 'bg-white border border-gray-300 p-2 rounded-lg shadow-md text-sm text-gray-800 z-[1000]',
//                     opacity: 1.0,
//                     offset: [0, -10] // Offset slightly above the feature
//                 }).openTooltip();

//                 // Highlight the feature immediately
//                 layer.setStyle({
//                     weight: 3,
//                     fillOpacity: 0.3,
//                     fillColor: '#4a90e2'
//                 });
//             },
//             mouseout: (e) => {
//                 // Immediately hide the tooltip and reset styles
//                 setShowHoveredFeature(false);
//                 layer.closeTooltip();
//                 setHoveredFeatureProperties(null);

//                 layer.setStyle({
//                     weight: 2,
//                     fillOpacity: 0.1,
//                     fillColor: '#4a90e2'
//                 });
//             },
//             click: (e) => {
//                 // Add immediate tooltip response on click as well
//                 const props = feature.properties;
//                 setHoveredFeatureProperties(props);
//                 setShowHoveredFeature(true);

//                 let tooltipContent = '';
//                 switch (selectedLayer) {
//                     case 'district':
//                         tooltipContent = props.DISTRICT_N || 'N/A';
//                         break;
//                     case 'mandal':
//                         tooltipContent = props.MANDAL_NAM || 'N/A';
//                         break;
//                     case 'constituency':
//                         tooltipContent = props.assembly || 'N/A';
//                         break;
//                     case 'area':
//                     case 'wards':
//                     case 'zones':
//                         tooltipContent = props.name || 'N/A';
//                         break;
//                     default:
//                         tooltipContent = 'Unnamed area';
//                 }

//                 // Show tooltip immediately on click
//                 layer.bindTooltip(tooltipContent, {
//                     permanent: true, // Make it permanent on click
//                     direction: 'top',
//                     className: 'bg-white border border-gray-300 p-2 rounded-lg shadow-md text-sm text-gray-800 z-[1000]',
//                     opacity: 1.0,
//                     offset: [0, -10]
//                 }).openTooltip();
//             }
//         });
//     };
//     const clearAllShapes = () => {
//         setShapes([]);  // Clear all shapes
//         setUserAreaMessage('');  // Clear the message
//         setSelectedShape(null);  // Reset selected shape if any
//     };

//     useEffect(() => {
//         const controlsTimer = setTimeout(() => {
//             setShowControls(true);
//         }, 2500);

//         const mapTimer = setTimeout(() => {
//             setMapReady(true);
//         }, 3000);

//         return () => {
//             clearTimeout(controlsTimer);
//             clearTimeout(mapTimer);
//         };
//     }, []);

//     return (
//         <div className="relative h-screen w-screen flex flex-col overflow-hidden">
//             {showSplash && (
//                 <SplashScreen onComplete={() => setShowSplash(false)} />
//             )}

//             <div className="relative h-screen w-screen flex flex-col overflow-hidden">
//                 <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

//                 {isSidebarOpen && (
//                     <div
//                         className="fixed top-16 left-0 right-0 h-[calc(100%-4rem)] bg-black bg-opacity-50 z-40 backdrop"
//                         onClick={() => setIsSidebarOpen(false)}
//                     ></div>
//                 )}
//                 <Sidebar isOpen={isSidebarOpen}>
//                 <div className={`space-y-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
//                     {!isDrawing && (
//                     <button
//                         onClick={startDrawing}
//                         className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-md"
//                     >
//                         <div className="flex items-center space-x-2">
//                         <span>✏️</span>
//                         <span className="font-semibold">Draw Custom Area</span>
//                         </div>
//                     </button>
//                     )}

//                     <div className="relative">
//                     <button
//                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                 className="w-full flex items-center justify-between p-3 bg-orange-400 rounded-lg hover:bg-gray-300 transition-colors duration-200"
//                 >
//                 <span className="font-semibold text-gray-800">🎯 Select A Layer</span>

//                 {/* Chevron Icon Styling */}
//                 {isDropdownOpen ? (
//                     <ChevronUp
//                     className="w-7 h-7 text-blue-600 bg-gray-200 p-1 rounded-full hover:bg-gray-300 hover:text-blue-500 transition-all"
//                     />
//                 ) : (
//                     <ChevronDown
//                     className="w-7 h-7 text-red-600 bg-gray-200 p-1 rounded-full hover:bg-gray-300 hover:text-blue-500 transition-all"
//                     />
//                 )}
//                 </button>


//                     {isDropdownOpen && (
//                         <div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg z-50">
//                         {['district', 'mandal', 'constituency', 'area', 'wards', 'zones'].map((layer) => (
//                             <button
//                             key={layer}
//                             onClick={() => loadLayerData(layer)}
//                             className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center
//                                 rounded-lg mb-2 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             >
//                             <span className="capitalize">{layer}</span>
//                             <span className="text-gray-500 text-sm">({layerCounts[layer] || 0})</span>
//                             </button>
//                         ))}
//                         </div>
//                     )}
//                     </div>
//                 </div>
//                 </Sidebar>

//                 <div className="flex-1 h-full pt-16 overflow-hidden relative z-10">
//                     <MapContainer center={mapCenter} zoom={mapZoom} className="h-full w-full">
//                         <TileLayer
//                             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                             attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                         />
//                         <MapController
//                             center={mapCenter}
//                             zoom={mapZoom}
//                             getCurrentLocation={getCurrentLocation}
//                             loading={loading}
//                         />

//                         <LocationMarker
//                             position={userPosition}
//                             onLocationSelect={handleMapClick}
//                             isDrawing={isDrawing}
//                             setPosition={setUserPosition}
//                         />

//                         {currentShape.length > 0 && (
//                             <Polygon
//                                 positions={currentShape}
//                                 pathOptions={{ color: 'red', weight: 1, fill: false }}
//                             />
//                         )}

//                         {shapes.map((shape, index) => (
//                             <Polygon
//                                 key={index}
//                                 positions={shape.points}
//                                 pathOptions={{
//                                     color: shape.color,
//                                     weight: selectedShape === index ? 4 : 2,
//                                     fill: false,
//                                 }}
//                             >
//                                 <Tooltip permanent={selectedShape === index}>
//                                     {shape.name}
//                                 </Tooltip>
//                             </Polygon>
//                         ))}

//                         {geojsonData && (
//                             <GeoJSON
//                                 data={geojsonData}
//                                 style={() => ({
//                                     color: 'red',
//                                     weight: 1,
//                                     fillOpacity: 0.1,
//                                     fillColor: '#4a90e2'
//                                 })}
//                                 onEachFeature={onEachFeature}
//                                 eventHandlers={{
//                                     add: (e) => {
//                                         e.target.bringToFront();
//                                     }
//                                 }}
//                             />
//                         )}
//                     </MapContainer>
//                     {isDrawing && (
//                 <DrawingControls
//                     currentAreaName={currentAreaName}
//                     setCurrentAreaName={setCurrentAreaName}
//                     finishDrawing={finishDrawing}
//                     cancelDrawing={cancelDrawing}
//                 />
//             )}
//                 <div className="absolute bottom-4 left-4 z-[1000] space-y-2">
//                 {selectedLayerName && geojsonAreaStatus && userPosition && (
//                     <div className="bg-white p-2 rounded-lg shadow-lg">
//                         <p className="text-sm font-semibold">
//                             <span className="capitalize">{geojsonAreaStatus}</span>
//                         </p>
//                     </div>
//                 )}
//                {shapes.length > 0 && userAreaMessage && (
//                     <div className="bg-white p-2 rounded-lg shadow-lg flex items-center justify-between">
//                         <p className="text-sm font-semibold">
//                             {userAreaMessage}
//                         </p>
//                         <button 
//                             onClick={clearAllShapes}
//                             className="ml-3 text-gray-500 hover:text-red-500 transition-colors duration-200 p-1"
//                             title="Remove all custom areas"
//                         >
//                             <X className="w-4 h-4 text-red-500" />

//                         </button>
//                     </div>
//                 )}
//             </div>

//                 </div>
//             </div>
//         </div>
//     );
// };

// const style = {
//     '.animate-fade-in': {
//         animation: 'fadeIn 0.5s ease-in-out'
//     },
//     '.animate-slide-up': {
//         animation: 'slideUp 0.5s ease-out'
//     },
//     '.animate-rotate': {
//         display: 'inline-block', // Ensure the icon is treated as a block for transformations
//         animation: 'rotate 2s linear infinite'
//     },
//     '@keyframes fadeIn': {
//         '0%': { opacity: '0' },
//         '100%': { opacity: '1' }
//     },
//     '@keyframes slideUp': {
//         '0%': { transform: 'translateY(20px)', opacity: '0' },
//         '100%': { transform: 'translateY(0)', opacity: '1' }
//     },
//     '@keyframes rotate': {
//         '0%': { transform: 'rotate(0deg)' },
//         '100%': { transform: 'rotate(360deg)' }
//     }
// };
// export default MapsCon;




import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polygon, useMapEvents, useMap, GeoJSON, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { ChevronDown, ChevronUp, Menu, X, Compass, MapPin, Layout, CircleSlash, AlertTriangle } from 'lucide-react';

// Set up Leaflet default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Function to check if a point is inside a polygon
const isPointInPolygon = (point, polygon) => {
    const x = point[0], y = point[1];
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i][0], yi = polygon[i][1];
        const xj = polygon[j][0], yj = polygon[j][1];

        const intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};
// Function to check if a point is in a GeoJSON feature
const isPointInGeoJSON = (point, geojson) => {
    const lat = point[0];
    const lng = point[1];

    for (const feature of geojson.features) {
        if (feature.geometry.type === 'Polygon') {
            const coordinates = feature.geometry.coordinates[0];
            const polygonPoints = coordinates.map(coord => [coord[1], coord[0]]);
            if (isPointInPolygon([lat, lng], polygonPoints)) {
                return {
                    isInside: true,
                    properties: {
                        district: feature.properties?.DISTRICT_N || 'N/A',
                        mandal: feature.properties?.MANDAL_NAM || 'N/A',
                        assembly: feature.properties?.assembly || 'N/A',
                        name: feature.properties?.name || 'N/A',
                    }
                };
            }
        } else if (feature.geometry.type === 'MultiPolygon') {
            for (const polygon of feature.geometry.coordinates) {
                const polygonPoints = polygon[0].map(coord => [coord[1], coord[0]]);
                if (isPointInPolygon([lat, lng], polygonPoints)) {
                    return {
                        isInside: true,
                        properties: {
                            district: feature.properties?.DISTRICT_N || 'N/A',
                            mandal: feature.properties?.MANDAL_NAM || 'N/A',
                            assembly: feature.properties?.assembly || 'N/A',
                            name: feature.properties?.name || 'N/A',
                        }
                    };
                }
            }
        }
    }

    return { isInside: false };
};

const SplashScreen = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            const splash = document.getElementById('splash-screen');
            if (splash) {
                splash.classList.add('opacity-0');
            }
            setTimeout(onComplete, 500);
        }, 1700);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div
            id="splash-screen"
            className="fixed inset-0 bg-gradient-to-br from-blue-50 to-blue-100 
            flex items-center justify-center z-50 transition-opacity duration-500"
        >
            <div className="text-center animate-fade-in">
                <div className="mb-6 animate-bounce">
                    <div className="text-6xl text-blue-600">🌍</div>
                </div>
                <h1 className="text-4xl font-bold mb-4 text-blue-800 animate-slide-up">
                    Custom Maps
                </h1>
                <p className="text-lg text-blue-600 mb-6 animate-slide-up">
                    Your Gateway to Advanced Mapping Solutions
                </p>
                <div className="animate-pulse">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent 
                    rounded-full animate-spin mx-auto mb-4">
                    </div>
                    <p className="text-sm text-blue-700">Loading your mapping experience...</p>
                </div>
            </div>
        </div>
    );
};

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
    return (
        <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-700 to-blue-500 shadow-xl h-16 flex items-center px-4 z-40">
            {/* Sidebar Toggle Button */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="relative group p-2  hover:bg-blue-700 rounded-lg transition-all duration-300 ease-in-out"
            >
                <div className="relative ">
                    <Menu
                        className={`w-6 h-6  text-white transition-transform duration-300 ${isSidebarOpen ? 'rotate-90 scale-110' : 'rotate-0'
                            }`}
                    />
                    {/* <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span> */}
                </div>
            </button>

            {/* App Title */}
            <h1 className="text-2xl font-bold text-center flex-1 text-white font-['Poppins'] tracking-wide">
                <span className="inline-block transform hover:scale-105 transition-transform duration-300">
                    Custom Maps <span className="animate-rotate">🌍</span>
                </span>
            </h1>

            {/* Subtle Shadow Below Header */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-b from-blue-700/30 to-transparent"></div>
        </div>
    );
};

const Sidebar = ({ isOpen, children }) => {
    return (
        <div
            className={`
                fixed top-16 left-0 h-[calc(100%-4rem)] bg-gradient-to-t from-blue-200 to-white shadow-lg z-50 
                w-3/4 transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
        >
            <div className="p-4 space-y-4 overflow-y-auto h-full">
                {children}
            </div>
        </div>
    );
};

// GPS Permission Modal component
const GPSPermissionModal = ({ onRequestPermission, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[2000] p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fade-in">
                <div className="flex items-center mb-4">
                    <AlertTriangle className="w-8 h-8 text-orange-500 mr-3" />
                    <h3 className="text-xl font-bold text-gray-800">Location Access Required</h3>
                </div>

                <p className="text-gray-600 mb-6">
                    To use "Get My Location" feature, we need access to your device's GPS.
                    Please enable location services to continue.
                </p>

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onRequestPermission}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200 flex items-center space-x-2"
                    >
                        <Compass className="w-4 h-4" />
                        <span>Enable Location</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

function MapController({ center, zoom, getCurrentLocation, loading, onRequestGPS }) {
    const map = useMap();

    useEffect(() => {
        if (center) {
            map.setView(center, zoom || map.getZoom());
        }
    }, [center, zoom, map]);

    return (
        <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-2">
            <button
                onClick={onRequestGPS}
                disabled={loading}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 
                    disabled:bg-blue-300 transition-colors duration-200 transform hover:scale-105 
                    flex items-center justify-center space-x-2 shadow-md"
            >
                <Compass className="w-4 h-4" />
                <span className="font-bold">{loading ? 'Getting Location...' : 'Get My Location'}</span>
            </button>
        </div>
    );
}

function LocationMarker({ position, onLocationSelect, isDrawing, setPosition }) {
    const map = useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            if (isDrawing && onLocationSelect) {
                onLocationSelect([lat, lng]);
            } else {
                setPosition([lat, lng]);
                // Don't update geojsonAreaStatus for manual clicks
                if (onLocationSelect) {
                    onLocationSelect([lat, lng]);
                }
            }
        },
    });

    return position ? (
        <Marker
            position={position}
            icon={new L.Icon({
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
                shadowSize: [41, 41],
            })}
        />
    ) : null;
}

const DrawingControls = ({ currentAreaName, setCurrentAreaName, finishDrawing, cancelDrawing }) => {
    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg z-[9999] w-80">
            <div className="space-y-3">
                <input
                    type="text"
                    value={currentAreaName}
                    onChange={(e) => setCurrentAreaName(e.target.value)}
                    placeholder="Enter area name"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                />
                <div className="flex space-x-2">
                    <button
                        onClick={finishDrawing}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                        <span>✓</span>
                        <span>Save</span>
                    </button>
                    <button
                        onClick={cancelDrawing}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                        <CircleSlash className="w-4 h-4" />
                        <span>Cancel</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const MapsCon = () => {
    const [userPosition, setUserPosition] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mapCenter, setMapCenter] = useState([17.385, 78.4867]);
    const [error, setError] = useState('');
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentShape, setCurrentShape] = useState([]);
    const [shapes, setShapes] = useState([]);
    const [currentAreaName, setCurrentAreaName] = useState('');
    const [userAreaStatus, setUserAreaStatus] = useState({ areas: [] });
    const [geojsonAreaStatus, setGeojsonAreaStatus] = useState('');
    const [selectedShape, setSelectedShape] = useState(null);
    const [mapZoom, setMapZoom] = useState(8);
    const [geojsonData, setGeojsonData] = useState(null);
    const [selectedLayer, setSelectedLayer] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [layerCounts, setLayerCounts] = useState({
        district: 0,
        mandal: 0,
        constituency: 0,
        area: 0,
        wards: 0,
        zones: 0,
    });
    const [userAreaMessage, setUserAreaMessage] = useState('');
    const [showHoveredFeature, setShowHoveredFeature] = useState(false);
    const [showSplash, setShowSplash] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [mapReady, setMapReady] = useState(false);
    const [selectedLayerName, setSelectedLayerName] = useState('');
    const [hoveredFeatureProperties, setHoveredFeatureProperties] = useState(null);
    const [showGPSModal, setShowGPSModal] = useState(false);

    // Load saved shapes and get current location on mount
    useEffect(() => {
        const savedShapes = localStorage.getItem('mapShapes');
        if (savedShapes) {
            setShapes(JSON.parse(savedShapes));
        }
    }, []);

    // Save shapes to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('mapShapes', JSON.stringify(shapes));
    }, [shapes]);

    useEffect(() => {
        console.log('GeoJSON Data:', geojsonData); // Debugging
    }, [geojsonData]);

    // Function to load layer data
    const loadLayerData = async (layer) => {
        console.log('Selected Layer:', layer);
        setGeojsonData(null);
        setSelectedLayer(layer);
        setIsDropdownOpen(false);
        setIsSidebarOpen(false); // Close the sidebar after selecting a layer
        setSelectedLayerName(layer); // Set the selected layer name

        try {
            const fileMapping = {
                constituency: '/telangana_ac.json',
                mandal: '/TS_Mandals.json',
                district: '/Ts_Dis.json',
                area: '/ghmc-area.geojson',
                wards: '/ghmc-wards.geojson',
                zones: '/ghmc-zones.geojson',
            };
            const response = await fetch(fileMapping[layer]);
            const data = await response.json();
            setGeojsonData(data);

            setLayerCounts(prev => ({
                ...prev,
                [layer]: data.features.length || 0
            }));

            if (userPosition) {
                const geoJsonCheck = isPointInGeoJSON(userPosition, data);
                if (geoJsonCheck.isInside) {
                    const props = geoJsonCheck.properties;
                    switch (layer) {
                        case 'district':
                            setGeojsonAreaStatus(`You are in : ${props.district} district`);
                            break;
                        case 'mandal':
                            setGeojsonAreaStatus(`You are in : ${props.mandal} mandal`);
                            break;
                        case 'constituency':
                            setGeojsonAreaStatus(`You are in : ${props.assembly} constituency`);
                            break;
                        case 'area':
                            setGeojsonAreaStatus(`You are in : ${props.name} area`);
                            break;
                        case 'wards':
                            setGeojsonAreaStatus(`You are in : ${props.name} ward`);
                            break;
                        case 'zones':
                            setGeojsonAreaStatus(`You are in : ${props.name} zone`);
                            break;
                        default:
                            setGeojsonAreaStatus('Area information not available');
                    }
                    setMapCenter(userPosition);
                    setMapZoom(13);
                } else {
                    setGeojsonAreaStatus(`You are not present in any ${layer}`);
                }
            }
        } catch (error) {
            setError('Error loading data');
            console.error('Error loading data:', error);
        }
    };

    useEffect(() => {
        console.log('hoveredFeatureProperties changed:', hoveredFeatureProperties); // Debugging
    }, [hoveredFeatureProperties]);

    useEffect(() => {
        const loadAllLayerCounts = async () => {
            const layers = ['district', 'mandal', 'constituency', 'area', 'wards', 'zones'];
            const fileMapping = {
                constituency: '/telangana_ac.json',
                mandal: '/TS_Mandals.json',
                district: '/Ts_Dis.json',
                area: '/ghmc-area.geojson',
                wards: '/ghmc-wards.geojson',
                zones: '/ghmc-zones.geojson',
            };

            try {
                const counts = {};
                for (const layer of layers) {
                    try {
                        const response = await fetch(fileMapping[layer]);
                        const data = await response.json();
                        counts[layer] = data.features ? data.features.length : data.length;
                    } catch (error) {
                        console.error(`Error loading ${layer} count:`, error);
                        counts[layer] = 0;
                    }
                }
                setLayerCounts(prev => ({ ...prev, ...counts }));
            } catch (error) {
                console.error('Error in loadAllLayerCounts:', error);
            }
        };

        loadAllLayerCounts();
    }, []);

    // Check for GPS permissions or status
// Updated checkGPSPermission function
const checkGPSPermission = async () => {
    try {
        // First check if the app has permission to use the device's location
        const permissionStatus = await Geolocation.checkPermissions();

        if (permissionStatus.location === 'granted') {
            // If permission is granted, try to get the current position
            getCurrentLocation();
        } else if (Capacitor.isNativePlatform()) {
            // On mobile, show the modal that will direct to app settings
            setShowGPSModal(true);
        } else {
            // For web, just try to get location which will trigger browser prompt
            getCurrentLocation();
        }
    } catch (error) {
        console.error('Error checking GPS permission:', error);
        setShowGPSModal(true);
    }
};

// Updated requestGPSPermission function for better mobile handling
const requestGPSPermission = async () => {
    try {
        if (Capacitor.isNativePlatform()) {
            // For native apps, we need to handle permissions differently
            const permissionResult = await Geolocation.requestPermissions({
                permissions: ['location']
            });
            
            if (permissionResult.location === 'granted') {
                setShowGPSModal(false);
                getCurrentLocation();
            } else {
                // If permission is denied, we need to direct the user to app settings
                // This is platform-specific behavior
                if (Capacitor.getPlatform() === 'android') {
                    // Open app settings on Android
                    try {
                        // Use Capacitor App plugin if available
                        const { App } = await import('@capacitor/app');
                        await App.openUrl({
                            url: 'package:' + await App.getInfo().id
                        });
                    } catch (e) {
                        console.error('Could not open app settings:', e);
                        setError('Please enable location permission in device settings.');
                    }
                } else if (Capacitor.getPlatform() === 'ios') {
                    // Open app settings on iOS
                    try {
                        const { App } = await import('@capacitor/app');
                        await App.openUrl({
                            url: 'app-settings:'
                        });
                    } catch (e) {
                        console.error('Could not open app settings:', e);
                        setError('Please enable location permission in device settings.');
                    }
                }
                setShowGPSModal(false);
            }
        } else {
            // For web, just try to get the current position which will trigger browser permission dialog
            try {
                await Geolocation.getCurrentPosition({
                    enableHighAccuracy: false,
                    timeout: 10000
                });
                setShowGPSModal(false);
                getCurrentLocation();
            } catch (err) {
                console.error('Error getting position:', err);
                setError('Location permission required. Please enable in browser settings.');
                setShowGPSModal(false);
            }
        }
    } catch (error) {
        console.error('Error requesting GPS permission:', error);
        setError('Unable to access location. Please check your device settings.');
        setShowGPSModal(false);
    }
};


// const requestGPSPermission = async () => {
//     try {
//         if (Capacitor.isNativePlatform()) {
//             // Request location permission
//             const permissionResult = await Geolocation.requestPermissions();

//             if (permissionResult.location === 'granted') {
//                 setShowGPSModal(false);
//                 getCurrentLocation();
//             } else {
//                 // Permission denied, prompt user to open settings
//                 const userConfirmed = window.confirm(
//                     'Location access is required. Please enable it in your device settings.'
//                 );
                
//                 if (userConfirmed) {
//                     openAppSettings();
//                 }
//                 setShowGPSModal(false);
//             }
//         } else {
//             // Handle browser-based location request
//             try {
//                 await Geolocation.getCurrentPosition({ enableHighAccuracy: false, timeout: 10000 });
//                 setShowGPSModal(false);
//                 getCurrentLocation();
//             } catch (err) {
//                 console.error('Error getting position:', err);
//                 setError('Location permission required. Please enable in browser settings.');
//                 setShowGPSModal(false);
//             }
//         }
//     } catch (error) {
//         console.error('Error requesting GPS permission:', error);
//         setError('Unable to access location. Please check your device settings.');
//         setShowGPSModal(false);
//     }
// };

// const openAppSettings = async () => {
//     try {
//         const { App } = await import('@capacitor/app');

//         if (Capacitor.getPlatform() === 'android') {
//             await App.openUrl({ url: 'package:' + (await App.getInfo()).id });
//         } else if (Capacitor.getPlatform() === 'ios') {
//             await App.openUrl({ url: 'app-settings:' });
//         }
//     } catch (e) {
//         console.error('Could not open app settings:', e);
//         setError('Please enable location permission in device settings.');
//     }
// };







    // Also update the getCurrentLocation function to better handle permission issues
    const getCurrentLocation = async () => {
        setLoading(true);
        setError(''); // Clear any previous errors

        try {
            // First make sure we have permission
            const permissionStatus = await Geolocation.checkPermissions();

            if (permissionStatus.location !== 'granted') {
                // If not granted, show the modal and exit early
                setShowGPSModal(true);
                setLoading(false);
                return;
            }

            // We have permission, get the position
            const position = await Geolocation.getCurrentPosition({
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 0
            });

            const { latitude, longitude } = position.coords;
            setUserPosition([latitude, longitude]);
            setMapCenter([latitude, longitude]);
            setMapZoom(15);

            // Check location against GeoJSON and shapes
            if (geojsonData) {
                checkUserLocation([latitude, longitude]);
            }

            // Also check custom areas
            checkUserInCustomArea([latitude, longitude]);
        } catch (error) {
            console.error('Error getting location:', error);

            // Check the error code to provide better feedback
            if (error.code === 1) { // PERMISSION_DENIED
                setShowGPSModal(true);
            } else if (error.code === 2) { // POSITION_UNAVAILABLE
                setError('Unable to determine your position. Please check if GPS is enabled.');
                setShowGPSModal(true);
            } else if (error.code === 3) { // TIMEOUT
                setError('Location request timed out. Please try again.');
            } else {
                setError('Unable to get your location. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleMapClick = (position) => {
        if (isDrawing) {
            setCurrentShape([...currentShape, position]);
        } else {
            setUserPosition(position);
            checkUserLocation(position);
        }
    };

    const startDrawing = () => {
        setIsDrawing(true);
        setCurrentShape([]);
        setCurrentAreaName('');
        setIsSidebarOpen(false);
    };

    const cancelDrawing = () => {
        setIsDrawing(false);
        setCurrentShape([]);
        setCurrentAreaName('');
    };

    const checkUserInCustomArea = (position) => {
        if (shapes.length > 0) {
            let insideAreas = [];
            shapes.forEach(shape => {
                if (isPointInPolygon(position, shape.points)) {
                    insideAreas.push(shape.name);
                }
            });

            if (insideAreas.length > 0) {
                setUserAreaMessage(`You are in custom area${insideAreas.length > 1 ? 's' : ''}: ${insideAreas.join(', ')}`);
            } else {
                setUserAreaMessage('You are not in any custom area');
            }
        } else {
            // Clear the message if there are no shapes
            setUserAreaMessage('');
        }
    };

    const finishDrawing = () => {
        if (currentShape.length >= 3 && currentAreaName.trim()) {
            const newShape = {
                points: currentShape,
                name: currentAreaName.trim(),
                color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
            };
            const newShapes = [...shapes, newShape];
            setShapes(newShapes);
            setCurrentShape([]);
            setCurrentAreaName('');
            setIsDrawing(false);

            // Check if user is in the newly drawn area
            if (userPosition) {
                // Small delay to ensure state is updated
                setTimeout(() => {
                    checkUserInCustomArea(userPosition);
                }, 100);
            }
        } else {
            setError('Please draw at least 3 points and provide a name for the area');
        }
    };

    const checkUserLocation = (position) => {
        // Check custom areas
        checkUserInCustomArea(position);

        // Only check geojson if we have data and a selected layer
        if (geojsonData && selectedLayer) {
            const geoJsonCheck = isPointInGeoJSON(position, geojsonData);
            if (geoJsonCheck.isInside) {
                const props = geoJsonCheck.properties;
                switch (selectedLayer) {
                    case 'district':
                        setGeojsonAreaStatus(`You are in : ${props.district || 'N/A'} district`);
                        break;
                    case 'mandal':
                        setGeojsonAreaStatus(`You are in : ${props.mandal || 'N/A'} mandal`);
                        break;
                    case 'constituency':
                        setGeojsonAreaStatus(`You are in : ${props.assembly || 'N/A'} constituency`);
                        break;
                    case 'area':
                    case 'wards':
                    case 'zones':
                        setGeojsonAreaStatus(`You are in : ${props.name || 'N/A'} ${selectedLayer}`);
                        break;
                    default:
                        setGeojsonAreaStatus('Area information not available');
                }
            } else {
                setGeojsonAreaStatus(`You are not present in any ${selectedLayer}`);
            }
        }
    };

    useEffect(() => {
        if (userPosition) {
            checkUserInCustomArea(userPosition);
        }
    }, [userPosition, shapes]);

    const hoverTimeoutRef = useRef(null);

    const handleClickOutside = (event) => {
        const sidebar = document.querySelector('.sidebar');
        const backdrop = document.querySelector('.backdrop');
        if (isSidebarOpen && sidebar && backdrop && !sidebar.contains(event.target) && backdrop.contains(event.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        if (isSidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);

    const onEachFeature = (feature, layer) => {
        layer.on({
            mouseover: (e) => {
                const props = feature.properties;
                setHoveredFeatureProperties(props);
                setShowHoveredFeature(true);

                // Create tooltip content immediately
                let tooltipContent = '';
                switch (selectedLayer) {
                    case 'district':
                        tooltipContent = props.DISTRICT_N || 'N/A';
                        break;
                    case 'mandal':
                        tooltipContent = props.MANDAL_NAM || 'N/A';
                        break;
                    case 'constituency':
                        tooltipContent = props.assembly || 'N/A';
                        break;
                    case 'area':
                    case 'wards':
                    case 'zones':
                        tooltipContent = props.name || 'N/A';
                        break;
                    default:
                        tooltipContent = 'Unnamed area';
                }

                // Bind and immediately open the tooltip
                layer.bindTooltip(tooltipContent, {
                    permanent: false,
                    direction: 'top',
                    className: 'bg-white border border-gray-300 p-2 rounded-lg shadow-md text-sm text-gray-800 z-[1000]',
                    opacity: 1.0,
                    offset: [0, -10] // Offset slightly above the feature
                }).openTooltip();

                // Highlight the feature immediately
                layer.setStyle({
                    weight: 3,
                    fillOpacity: 0.3,
                    fillColor: '#4a90e2'
                });
            },
            mouseout: (e) => {
                // Immediately hide the tooltip and reset styles
                setShowHoveredFeature(false);
                layer.closeTooltip();
                setHoveredFeatureProperties(null);

                layer.setStyle({
                    weight: 2,
                    fillOpacity: 0.1,
                    fillColor: '#4a90e2'
                });
            },
            click: (e) => {
                // Add immediate tooltip response on click as well
                const props = feature.properties;
                setHoveredFeatureProperties(props);
                setShowHoveredFeature(true);

                let tooltipContent = '';
                switch (selectedLayer) {
                    case 'district':
                        tooltipContent = props.DISTRICT_N || 'N/A';
                        break;
                    case 'mandal':
                        tooltipContent = props.MANDAL_NAM || 'N/A';
                        break;
                    case 'constituency':
                        tooltipContent = props.assembly || 'N/A';
                        break;
                    case 'area':
                    case 'wards':
                    case 'zones':
                        tooltipContent = props.name || 'N/A';
                        break;
                    default:
                        tooltipContent = 'Unnamed area';
                }

                // Show tooltip immediately on click
                layer.bindTooltip(tooltipContent, {
                    permanent: true, // Make it permanent on click
                    direction: 'top',
                    className: 'bg-white border border-gray-300 p-2 rounded-lg shadow-md text-sm text-gray-800 z-[1000]',
                    opacity: 1.0,
                    offset: [0, -10]
                }).openTooltip();
            }
        });
    };

    const clearAllShapes = () => {
        setShapes([]);  // Clear all shapes
        setUserAreaMessage('');  // Clear the message
        setSelectedShape(null);  // Reset selected shape if any
    };

    useEffect(() => {
        const controlsTimer = setTimeout(() => {
            setShowControls(true);
        }, 2500);

        const mapTimer = setTimeout(() => {
            setMapReady(true);
        }, 3000);

        return () => {
            clearTimeout(controlsTimer);
            clearTimeout(mapTimer);
        };
    }, []);

    return (
        <div className="relative h-screen w-screen flex flex-col overflow-hidden">
            {showSplash && (
                <SplashScreen onComplete={() => setShowSplash(false)} />
            )}

            {showGPSModal && (
                <GPSPermissionModal
                    onRequestPermission={requestGPSPermission}
                    onClose={() => setShowGPSModal(false)}
                />
            )}

            <div className="relative h-screen w-screen flex flex-col overflow-hidden">
                <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

                {/* Backdrop for sidebar */}
                {isSidebarOpen && (
                    <div
                        className="backdrop fixed inset-0 bg-black bg-opacity-40 z-40"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}

                <Sidebar isOpen={isSidebarOpen} className="sidebar">
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
                                <Layout className="w-5 h-5 mr-2" />
                                Map Layers
                            </h2>

                            <div className="space-y-3">
                                <div className="relative">
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="w-full flex items-center justify-between bg-blue-50 hover:bg-blue-100 text-blue-800 font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                                    >
                                        <span>{selectedLayerName || 'Select Layer'}</span>
                                        {isDropdownOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10">
                                            <ul className="py-1">
                                                {[
                                                    { id: 'district', name: 'Districts', count: layerCounts.district },
                                                    { id: 'mandal', name: 'Mandals', count: layerCounts.mandal },
                                                    { id: 'constituency', name: 'Constituencies', count: layerCounts.constituency },
                                                    { id: 'area', name: 'GHMC Areas', count: layerCounts.area },
                                                    { id: 'wards', name: 'GHMC Wards', count: layerCounts.wards },
                                                    { id: 'zones', name: 'GHMC Zones', count: layerCounts.zones },
                                                ].map((layer) => (
                                                    <li key={layer.id}>
                                                        <button
                                                            onClick={() => loadLayerData(layer.id)}
                                                            className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors duration-200 flex justify-between items-center"
                                                        >
                                                            <span>{layer.name}</span>
                                                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                {layer.count}
                                                            </span>
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
                                <MapPin className="w-5 h-5 mr-2" />
                                Custom Areas
                            </h2>
                            {shapes.length > 0 ? (
                                <div>
                                    <ul className="space-y-2 mb-4 max-h-60 overflow-y-auto">
                                        {shapes.map((shape, idx) => (
                                            <li key={idx} className="flex items-center justify-between">
                                                <span
                                                    className="truncate flex-1 p-2 hover:bg-blue-50 rounded cursor-pointer"
                                                    onClick={() => {
                                                        setSelectedShape(shape);
                                                        setMapCenter(shape.points[0]);
                                                        setIsSidebarOpen(false);
                                                    }}
                                                >
                                                    <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: shape.color }}></span>
                                                    {shape.name}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={clearAllShapes}
                                        className="text-red-600 text-sm hover:text-red-800 transition-colors duration-200 flex items-center"
                                    >
                                        <X className="w-4 h-4 mr-1" />
                                        Clear All Areas
                                    </button>
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">No custom areas defined</p>
                            )}
                            <button
                                onClick={startDrawing}
                                className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition-all duration-200 flex items-center justify-center space-x-2"
                            >
                                <span>+</span>
                                <span>Create New Area</span>
                            </button>
                        </div>
                    </div>
                </Sidebar>

                <div className="flex-1 pt-16 relative">
                    {mapReady && (
                        <MapContainer
                            center={mapCenter}
                            zoom={mapZoom}
                            className="h-full w-full"
                            style={{ zIndex: 10 }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {geojsonData && (
                                <GeoJSON
                                    data={geojsonData}
                                    style={() => ({
                                        color: '#4a90e2',
                                        weight: 2,
                                        fillOpacity: 0.1,
                                        fillColor: '#4a90e2'
                                    })}
                                    onEachFeature={onEachFeature}
                                />
                            )}

                            <LocationMarker
                                position={userPosition}
                                onLocationSelect={handleMapClick}
                                isDrawing={isDrawing}
                                setPosition={setUserPosition}
                            />

                            {shapes.map((shape, idx) => (
                                <Polygon
                                    key={idx}
                                    positions={shape.points}
                                    pathOptions={{
                                        color: shape.color,
                                        fillOpacity: 0.3,
                                        weight: selectedShape === shape ? 4 : 2
                                    }}
                                >
                                    <Tooltip permanent={selectedShape === shape}>
                                        {shape.name}
                                    </Tooltip>
                                </Polygon>
                            ))}

                            {currentShape.length > 0 && (
                                <Polygon
                                    positions={currentShape}
                                    pathOptions={{
                                        color: 'green',
                                        fillOpacity: 0.3,
                                        dashArray: '5, 5',
                                        weight: 3
                                    }}
                                />
                            )}

                            <MapController
                                center={mapCenter}
                                zoom={mapZoom}
                                getCurrentLocation={getCurrentLocation}
                                loading={loading}
                                onRequestGPS={checkGPSPermission}
                            />

                            {hoveredFeatureProperties && showHoveredFeature && (
                                <div className="absolute top-16 left-4 bg-white p-4 rounded-lg shadow-lg z-50">
                                    <h3 className="font-bold text-sm">{selectedLayer?.toUpperCase()} Info</h3>
                                    <p className="text-sm">{hoveredFeatureProperties.name || hoveredFeatureProperties.DISTRICT_N || hoveredFeatureProperties.MANDAL_NAM || hoveredFeatureProperties.assembly || 'N/A'}</p>
                                </div>
                            )}
                        </MapContainer>
                    )}

                    {isDrawing && (
                        <DrawingControls
                            currentAreaName={currentAreaName}
                            setCurrentAreaName={setCurrentAreaName}
                            finishDrawing={finishDrawing}
                            cancelDrawing={cancelDrawing}
                        />
                    )}

                    {(userAreaMessage || geojsonAreaStatus) && (
                        <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded-lg shadow-lg p-3 z-40 mx-auto max-w-lg">
                            {userAreaMessage && (
                                <p className="text-sm font-medium text-blue-800">{userAreaMessage}</p>
                            )}
                            {geojsonAreaStatus && (
                                <p className="text-sm font-medium text-green-800">{geojsonAreaStatus}</p>
                            )}
                        </div>
                    )}

                    {error && (
                        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-800 p-3 rounded-lg shadow-lg z-50 max-w-md">
                            <p className="text-sm font-medium flex items-center">
                                <AlertTriangle className="w-4 h-4 mr-2" />
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Show disclaimer during initial load */}
                    {showControls && !mapReady && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
                            <div className="text-center p-6">
                                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-lg font-medium text-blue-800">Loading map resources...</p>
                                <p className="text-sm text-gray-600 mt-2">This may take a moment on first load</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MapsCon;