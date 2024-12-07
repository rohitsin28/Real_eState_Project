import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

// Define the Project interface
interface Project {
  name: string;
  priceRange: string;
  bhkDetails: string;
  location: string;
  imageUrl: string | null;
  builderName: string,
  coordinates: object
}

// Main function to handle GET request and scrape project data
export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get('city');
  const totalPages = 5;

  // Return an error if the city parameter is not provided
  if (!city) {
    return NextResponse.json({ error: "City parameter is required" }, { status: 400 });
  }

  const projects: Project[] = [];

  try {
    // Loop over pages (can extend to multiple pages by modifying totalPages)
    for (let page = 1; page <= totalPages; page++) {
      const url = `https://www.magicbricks.com/new-projects-${city}?page=${page}`;

      // Fetch the page content
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch the page: ${response.statusText}`);
      }

      const contentType = response.headers.get('Content-Type');
      let body: string;

      // If content is HTML, parse it as text
      if (contentType && contentType.includes('text/html')) {
        body = await response.text();

        const $ = cheerio.load(body);
        const projectPromises: Promise<void>[] = [];
        $('div.projdis__prjcard').each((index, element) => {
          const img = $(element).find('div.mghome__prjblk__imgsec img').attr('src') || null;
          const projectName = $(element).find('a.mghome__prjblk__prjname').text().trim();
          const priceRange = $(element).find('div.mghome__prjblk__price').text().trim();
          const bhkDetails = $(element).find('div.mghome__prjblk__bhk').text().trim();
          const location = $(element).find('div.mghome__prjblk__locname').text().trim();
          const detailUrl = $(element).find('a.mghome__prjblk__prjname').attr('href'); // Get the project detail URL

          if (detailUrl) {
            const fullDetailUrl = `${detailUrl}`;
            const projectDetailPromise = fetchProjectDetails(fullDetailUrl)
              .then(({ builderName, coordinates }) => {
                if (projectName && priceRange && bhkDetails && location) {
                  projects.push({
                    name: projectName,
                    priceRange: priceRange,
                    bhkDetails: bhkDetails,
                    location: location,
                    imageUrl: img || "",  // Can be null if no image is found
                    builderName: builderName,
                    coordinates: coordinates
                  });
                }
              })
              .catch((error) => {
                console.error(`Error fetching details for ${projectName}: ${error.message}`);
              });

            projectPromises.push(projectDetailPromise);
          }
        });

        await Promise.all(projectPromises);

        console.log(`Scraped page ${page}`);
      } else {
        return NextResponse.json({ error: "Unsupported content type" }, { status: 415 });
      }
    }
    return NextResponse.json({ message: "Data scraped successfully", data: projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to scrape data', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}


// async function fetchProjectDetails(detailUrl: string): Promise<{ builderName: string; coordinates: { latitude: string; longitude: string } }> {
//     try {
//       // Fetch the project detail page
//       const response = await fetch(detailUrl);
//       if (!response.ok) throw new Error(`Failed to fetch detail page: ${response.statusText}`);
//       const body = await response.text();
//       const $ = cheerio.load(body);
  
//       // Extract builder name and coordinates from the project detail page
//       const builderName = $('div.pdp__developerName').text().trim() || "Unknown Builder"; // Replace the selector with actual builder name selector
//       const latitude = $('meta[name="latitude"]').attr('content') || "Unknown";
//       const longitude = $('meta[name="longitude"]').attr('content') || "Unknown";
//       console.log('==============builderName',builderName)
//       return {
//         builderName,
//         coordinates: {
//           latitude,
//           longitude,
//         }
//       };
//     } catch (error) {
//       console.error(`Error fetching project details from ${detailUrl}:`, error);
//       return {
//         builderName: "Unknown Builder",
//         coordinates: {
//           latitude: "Unknown",
//           longitude: "Unknown",
//         }
//       };
//     }
//   }

async function fetchProjectDetails(detailUrl: string): Promise<{ builderName: string; coordinates: { latitude: string; longitude: string } }> {
    try {
        const response = await fetch(detailUrl);
        if (!response.ok) throw new Error(`Failed to fetch detail page: ${response.statusText}`)        
        const body = await response.text();
        const $ = cheerio.load(body);
        const builderName = $('div.pdp__developerName').text().trim() || "Unknown Builder";
        const jsonLdScripts = $('script[type="application/ld+json"]');
        let coordinates = { latitude: "Unknown", longitude: "Unknown" };
        jsonLdScripts.each((index, element) => {
            try {
                const jsonData = JSON.parse($(element).html() || '{}');
                if (jsonData.geo && jsonData.geo.latitude && jsonData.geo.longitude) {
                    coordinates = {
                        latitude: jsonData.geo.latitude,
                        longitude: jsonData.geo.longitude,
                    };
                }
            } catch (error) {
                console.error('Error parsing JSON-LD data:', error);
            }
        });
        return {
            builderName,
            coordinates,
        };
        
    } catch (error) {
        console.error('Error fetching project details:', error);
        return {
            builderName: "Unknown Builder",
            coordinates: {
                latitude: "Unknown",
                longitude: "Unknown",
            }
        };
    }
}
