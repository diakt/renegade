API List:

Authored services:
Mapbox
React Mapbox GL
ipgeolocation (TBD)


Curated Data (w/api and architecture links):

EONET
https://eonet.gsfc.nasa.gov/api/v3/events (hot)

https://eonet.gsfc.nasa.gov/docs/v3


WFIGS Current Wildland Fire Locations
https://data-nifc.opendata.arcgis.com/datasets/nifc::wfigs-current-wildland-fire-locations/api

https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/Current_WildlandFire_Locations/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json

Modifying this: Want more locations, I feel current is not doing a great job.


Link:
https://data-nifc.opendata.arcgis.com/datasets/nifc::wfigs-2022-wildland-fire-locations-to-date/api


Request:

WFIGS Current Wildland Fire Perimeters
Request:
https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/Current_WildlandFire_Perimeters/FeatureServer/0/query?where=1%3D1&outFields=*&geometry=&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outSR=4326&f=json

https://data-nifc.opendata.arcgis.com/datasets/nifc::wfigs-current-wildland-fire-perimeters/api

Wrappers:
React Mapbox GL

7/20

Yeah, so this shit is difficult, but looking for a bounding box.
That's the key term.

Damn.
So they do do all objectids but fuck me.


So now have a working box.
It loads fires within the area.
Ripping out geolocate control.

const geolocateControlRef = useCallback((ref) => {
        if (ref) {
            // Activate as soon as the control is loaded
            ref.trigger();
        }
    }, []);


To do:
1) Generate SW NE objects to box map in
2) Create other functional component with the left map box stuff
- Or possibly have it change its color when you click on it?
- That would be cash
3) Include donation link to the Wildland Firefighter Foundation
