# Where Am I – India Map Guide

**Where Am I - India Map Guide** is a location-based GIS web/mobile app that visualizes various geographic layers of India, such as states, districts, assemblies, parliamentary constituencies, and metropolitan data. Built with React and Capacitor, it fetches GeoJSON layers hosted on GitHub, supports offline caching, and is designed with flexibility for government and public utility use.


##  Features

- Browse interactive GeoJSON maps of:
  - Indian States and Districts
  - Sub-districts and Headquarters
  - Assemblies and Parliamentary Constituencies
  - National features like railways and highways
  - Major metropolitan city boundaries (GHMC, etc.)
- Organized sidebar with collapsible categories
- Dynamically fetches data via raw GitHub URLs
- Automatically caches previously loaded GeoJSON data
- Displays user's current location on map
- Designed to minimize app bundle size and allow remote updates to data


##  Tech Stack

- React (with functional components and hooks)
- Capacitor (for cross-platform PWA & Android deployment)
- React Leaflet (for rendering maps)
- GitHub (for hosting GeoJSON files)
- HTML5 Geolocation API
- Local storage for caching


##  Folder Overview

├── public/
│ └── geojsonLinks.json # Maps category-to-URL structure
├── src/
│ └── components/
│ └── GeojsonMap.js # Core map visualization screen
├── android/ # Android build via Capacitor
├── capacitor.config.json 
├── README.md # Project documentation



##  How to Run

###  Clone the Repository and do the next steps

  1.git clone https://github.com/your-username/your-repo-name.git
  2.cd your-repo-name
  3.npm install
  4.npm start
And then come out of frontend folder and run the following commands
  5.npx cap add android
  6.npx cap copy
  7.npx cap open android
  8.Then run from Android Studio


### GeoJSON Hosting Strategy

  - You can add new .geojson files to GitHub and simply update geojsonLinks.json — no code changes needed.


### Caching Strategy

  - Once a file is downloaded from the GitHub raw link, it is cached in browser/local storage or (capacitor storage for mobile app)
  - If the same file is requested again and unchanged, it will be served from cache to reduce load and improve speed.


### Current GeoJSON Coverage

  - All Indian States
  - Many district HQs and sub-divisions
  - Parliamentary and Assembly constituencies
  - Full GHMC boundary coverage
  - Railways, highways and police stations etc,.

  Note: Some states may not have complete data across all categories.


### Usage

  - Open the app
  - Select a category (e.g. STATES)
  - Choose a state (e.g. TELANGANA)
  - Select layer type (e.g. ASSEMBLY, SUBDISTRICTS, GHMC WARDS)
  - Map will update and center on the region
  - Use the "Get My Location" button to center on your current location
