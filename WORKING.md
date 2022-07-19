7/16

Order of events:
Get user location
Open Mapbox with map centered at point


Need to get another look at how I'm passing location, just using latlong context at the moment but could possibly be improved. Want to verify that latlong is passed and then need to initiate a mapbox. Oh boy.


We might need to use a geocoder for addresses...

https://inciweb.nwcg.gov/feeds/rss/incidents/

Huh. This might be better. Interesting.

https://maps.nwcg.gov/sa/#/%3F/%3F/44.8676/-118.4533/6

double huh.

ohhhhhhh, yes

https://data-nifc.opendata.arcgis.com/datasets/nifc::wfigs-2022-wildland-fire-perimeters-to-date/explore?location=-0.000000%2C0.000000%2C2.03

https://data-nifc.opendata.arcgis.com/datasets/nifc::wfigs-2022-wildland-fire-perimeters-to-date/about

https://data-nifc.opendata.arcgis.com/datasets/nifc::wfigs-2022-wildland-fire-perimeters-to-date/api

https://docs.mapbox.com/help/getting-started/web-apps/

Is worth a significant readthrough. Long story short, we need to go with Mapbox GL JS.


WFIGS - Current Wildland Fire Locations
https://data-nifc.opendata.arcgis.com/maps/wfigs-current-wildland-fire-locations

WFIGS - Current Wildland Fire Perimeters
https://data-nifc.opendata.arcgis.com/maps/wfigs-current-wildland-fire-perimeters






7/17

One long is 54.6 miles, one lat is ~34 miles

May have some issues with container size of mapbox

For mapstyles, see
https://docs.mapbox.com/api/maps/styles/
Thinking either dark, outdoors, or navigation night

Have marker, initial layout, and map styling at 2:30

Now going to start working on fire locations and fire perimeters

Have an active chart of api in readme

Now, where to render data? Did it in EONET for component, but think I will need to use it as layer for mapbox, so maybe there is native import

Adding custom data in react-map-gl:
https://visgl.github.io/react-map-gl/docs/get-started/adding-custom-data

Am I going to render full map or just closest three active?
Cool to layer but...let's just do full map first

Adding custom data:
https://visgl.github.io/react-map-gl/docs/get-started/adding-custom-data

Fire location JSON element from https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/Current_WildlandFire_Locations/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json

{"OBJECTID":244118,
"ABCDMisc":null,
"ADSPermissionState":"DEFAULT",
"CalculatedAcres":null,
"ContainmentDateTime":null,
"ControlDateTime":null,
"DailyAcres":0.1,
"DiscoveryAcres":0.1,
"DispatchCenterID":"CASDIC",
"EstimatedCostToDate":null,
"FinalFireReportApprovedByTitle":null,
"FinalFireReportApprovedByUnit":null,
"FinalFireReportApprovedDate":null,
"FireBehaviorGeneral":null,
"FireBehaviorGeneral1":null,
"FireBehaviorGeneral2":null,
"FireBehaviorGeneral3":null,
"FireCause":"Undetermined",
"FireCauseGeneral":null,
"FireCauseSpecific":null,
"FireCode":"PG88",
"FireDepartmentID":null,
"FireDiscoveryDateTime":1646700960000,
"FireMgmtComplexity":null,
"FireOutDateTime":null,
"FireStrategyConfinePercent":null,
"FireStrategyFullSuppPercent":null,
"FireStrategyMonitorPercent":null,
"FireStrategyPointZonePercent":null,
"FSJobCode":"P5",
"FSOverrideCode":"0502",
"GACC":"OSCC","ICS209ReportDateTime":null,
"ICS209ReportForTimePeriodFrom":null,
"ICS209ReportForTimePeriodTo":null,
"ICS209ReportStatus":null,
"IncidentManagementOrganization":null,
"IncidentName":"SKY",
"IncidentShortDescription":null,
"IncidentTypeCategory":"WF",
"IncidentTypeKind":"FI",
"InitialLatitude":32.71341,
"InitialLongitude":-116.6377,
"InitialResponseAcres":null,
"InitialResponseDateTime":null,
"IrwinID":"f48da2ac-39db-47c7-bfbc-6b4e414d903a",
"IsFireCauseInvestigated":null,
"IsFireCodeRequested":0,
"IsFSAssisted":0,
"IsMultiJurisdictional":0,
"IsReimbursable":0,
"IsTrespass":1,
"IsUnifiedCommand":null,
"LocalIncidentIdentifier":"000444",
"PercentContained":null,
"PercentPerimeterToBeContained":null,
"POOCity":null,
"POOCounty":"San Diego",
"POODispatchCenterID":"CAMVIC",
"POOFips":"06073",
"POOJurisdictionalAgency":null,
"POOJurisdictionalUnit":null,
"POOJurisdictionalUnitParentUnit":null,
"POOLandownerCategory":"Private",
"POOLandownerKind":"Private",
"POOLegalDescPrincipalMeridian":null,
"POOLegalDescQtr":null,
"POOLegalDescQtrQtr":null,
"POOLegalDescRange":null,
"POOLegalDescSection":null,
"POOLegalDescTownship":null,
"POOPredictiveServiceAreaID":
"SC11","POOProtectingAgency":"FS",
"POOProtectingUnit":"CACNF",
"POOState":"US-CA",
"PredominantFuelGroup":null,
"PredominantFuelModel":null,
"PrimaryFuelModel":null,
"SecondaryFuelModel":null,
"TotalIncidentPersonnel":null,
"UniqueFireIdentifier":"2022-CACNF-000444",
"WFDSSDecisionStatus":"No Decision",
"CreatedBySystem":"wildcad",
"ModifiedBySystem":"wildcad",
"IsDispatchComplete":0,
"OrganizationalAssessment":null,
"StrategicDecisionPublishDate":null,
"CreatedOnDateTime_dt":1646702213000,
"ModifiedOnDateTime_dt":1658007338000,
"Source":"IRWIN",
"GlobalID":"c40afa1b-df62-4587-adf9-8e1f2b93bda0",
"IsCpxChild":0,"CpxName":null,
"CpxID":null},
"geometry":{"x":-116.63021180915366,"y":32.718894788218925}}

In this case, the y is latitude (0-90) and the x is longitude (0-180).

Latitude 32.718894788218925 Longitude -116.63021180915366:
Skye Valley Road, Campo, CA 91906
Campo, California, United States

Why I'm checking is that there is an opportunity to provide geometry on api request
Is it vestigial?

"InitialLatitude":32.71341, "InitialLongitude":-116.6377 are provided regardless

Oof. Will need to deal with some cases where one of lat/long

Can do max lat max long min lat min long


In summary, important keys:
IncidentName
InitialLatitude
InitialLongitude

Think it would also be a good idea to just render fire perimeters if it is one close

Yeah, so actually geometry envelope is a really good idea. Data comes back in an object, but two arrays attribute/geometry, second is just lat/long within

So now I have set fireLocations, so that's excellent

Honestly appears that it makes no difference.

7/18

Now have pointers up for fires, need to add keys
Trying to go with right side map

So there are callback options for markers.
This is getting half decent tbh

Also styling personal location marker vs active fire markers

https://www.sco.wisc.edu/wp-content/uploads/2022/01/length-table1-1024x276.jpg
So 1 degree is 69.4 miles for lat

"Longitude is a little trickier. There are 180 degrees of longitude in each direction, east and west, from the Prime Meridian (which is at 0 degrees longitude). These measurements meet at the meridian located at 180 East and West. The number of degrees of longitude covered if we circumnavigated Earth around the Equator would therefore be 360.

However, unlike latitude, lines of longitude converge at the poles, which means that the length of a degree of longitude is not constant. At the Equator, it will be 69.4 miles, just like latitude. But as you move north or south, the distance shrinks by a factor equal to the cosine of the latitude. Table 2 shows this relationship."

So need to do some form of equivalence relation.

Name it "dangerous.lighting"

Documents for haversine, which measures geodist
https://www.npmjs.com/package/haversine

const haversine = require('haversine')

const start = {
  latitude: 30.849635,
  longitude: -83.24559
}

const end = {
  latitude: 27.950575,
  longitude: -82.457178
}

console.log(haversine(start, end))
console.log(haversine(start, end, {unit: 'mile'}))
console.log(haversine(start, end, {unit: 'meter'}))
console.log(haversine(start, end, {threshold: 1}))
console.log(haversine(start, end, {threshold: 1, unit: 'mile'}))
console.log(haversine(start, end, {threshold: 1, unit: 'meter'}))



...
Damn, I'm good. For hood river kicked on this:

{"OBJECTID":267787,
"RAILROAD TIE",
{"x":-121.03341424879672,"y":45.662775641659131}}

So my nearest wildfire locator is working.

wild.

7/19

Today, need to print nearest fires.
Also... let's get clickable onmarkers

For printing, important features:
"FireDiscoveryDateTime":1646700960000,

So, now have clickable events console logging

Parsing rss.....
https://inciweb.nwcg.gov/feeds/rss/incidents/


Would be good to consider popups and cursor type on map

But now have fires within 100 as well

All good