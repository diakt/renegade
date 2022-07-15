Description of project:
An app to locate the nearest wildfire, within a bound of 200 miles, called "Why the smoke?"

User stories:
As a concerned citizen, I can't tell where all this smoke is coming from. 
As someone in the area, I want to know if there is already a recognized fire event in the eyes of the USFS, BLM, or NP services.
As someone who is interested but not in danger, I want to know the claimed boundaries of a fire event.

APIs/Technical requirements:
NASA EONET
https://eonet.gsfc.nasa.gov/docs/v3
Lists a variety of recent hazard events, collated through InciWeb, agency and satellite resources.
Parsed in JSON, extremely digestible. Lat/Long are required elts. Also includes links to relevant agency event descriptions.
Open source, requires no signin.

Mapbox Maps API
https://docs.mapbox.com/api/maps/
Allows developers to render vector tiles over satellite or navigation mapping layers.
Open access with signin under 2500 requests a month, does not transition to pay without consent. 
Google Maps API is similar, but is somewhat more predatory in terms of transition, also limited options

Geolocation through JS-native navigation handle
Allows user to declare their position to locate nearest fire in their area.



Component Hierarchy:
<App> Context: User location via latlong through navigation handle w/request, or just general location parsed from proxy
    <header>
    </header>
    <main>
        <Incident> Context: Latlong passed through, parsed through EONET for nearest neighbor wildfire event. Nearest fire(s) returned
            <Map> Props: NearestFires
                Takes user location after request, or implicit acceptance, displays map of area surrounding up to ~200 mile square
                Fire locations, and stretch goal fire outline w/raster tiles, displayed relative to location
            </Map>
            <Area> Context: User location from App
                Displays relevant measurements at user location, i.e. Air quality, windspeeds, relative dew point (i.e. will it rip if it gets here), etc.
                Could place below Fires
            </Area>
            <Fires> Props: NearestFires
                In text, describes nearest fire, provides incident key, inciweb link, and recent behavior. Provides link to view further details
                Could detail multiple live fire events if minspacing > ~50 miles, e.g. two fires far enough from eachother, so
                <Fire>
                    Describes coverage in acres, fire active status, and provides link to agency event via InciWeb
                </Fire>
                ...multiple Fire components
            </Fires>
        </Incident>
    </main>
    <footer> 
    </footer>
</App>