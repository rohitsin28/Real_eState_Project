# Real_eState_Project

## Real Estate Scraper & Dynamic City Pages

This project is a dynamic web application built with **Next.js**, **Node.js**, **Tailwind CSS**, and **Redux**. It scrapes real estate data from **MagicBricks** and displays it through dynamically generated pages for each city. The data is managed in the Redux store and shown on the client-side.

## Features

- Scrapes real estate data from MagicBricks.
- Displays property listings dynamically for each city.
- **React-Leaflet** is used to display interactive maps with markers for each property.
- **PositionStack API** is used for geocoding addresses to latitude and longitude coordinates.
- Styled using **Tailwind CSS** for responsive and customizable UI.
- Manages application state using **Redux** for efficient data management.
- Dynamic city pages are created based on the selected city, such as `city/Navi%20Mumbai`.

## Technologies Used

- **Next.js**: React framework used for server-side rendering (SSR) and static site generation (SSG).
- **Node.js**: JavaScript runtime used for the server-side.
- **Tailwind CSS**: Utility-first CSS framework for designing responsive UIs.
- **React**: JavaScript library for building user interfaces.
- **React-Redux**: Official bindings for React and Redux for managing state.
- **Cheerio**: A fast, flexible, and lean implementation of jQuery for web scraping.
- **Leaflet**: Open-source JavaScript library for creating interactive maps.
- **React-Leaflet**: A React wrapper for Leaflet to render maps inside React components.
- **PositionStack API**: Geocoding service used to convert addresses into geographical coordinates (latitude and longitude).

## Installation 🔧

To get started with the project, follow these steps:

1. Clone the repository:
   
   ```bash
   git clone https://github.com/rohitsin28/Real_eState_Project.git
   
2. Install dependencies:
   
   ```bash
   pnpm install

## Scripts 📜

- **Start**: Launches the app in development mode.
  
     ```bash
  pnpm run dev
