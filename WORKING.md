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

Okay. It looks like my times are vastly off. The discovery date, which I am assigning from FireDiscoveryDateTime, are all rendering as today, so no matter what I pass to Date, it still renders it as current time.

YOu can go new Date, then tostring, I'm runnning with that

I'm thinking it might be a better bet to go with the big set

Incident Name  - .attributes.IncidentName
Percent Contained - .attributes.PercentContained
Number of personnel - .attributes.PercentPerimeterToBeContained
FIre Complexity - .attributes.FireMgmtComplexity
Fire Discovery Date Time - attributes.FireDiscoveryDateTime
POO County (Point of Order) - .attributes.POOCounty




Filters:
Fire out is null - .attributes.FireOutDateTime is null
INcident Type Category is not RX - .attributes.IncidentTypeCategory == "WF"
unknown feature names:
Incident Size over one acre - .attributes. (incident size) >=1

After this, could search through RSS XML whatever inciweb for link by ID

Type 5 to Type 1, 1 is big big
ICS209 only kicks on ceratin stuff, there are categories




So the issue is that I'm seeing all of the wildfires now in either alaska, midwest, or arizona nevada area. I am trying to find a wildfire which has a flatout wrong lat/long, or I'm going to need to seriously reevaluate this data.

Is it possible that it is so big that it's only loading by states? That's my guess
Alaska..

Alabama · Alaska · Arizona · Arkansas · California ; Indiana · Iowa · Kansas · Kentucky

and I'm only seeing alaska arizona. hmm.

My intuition...was correct. Funnily enough. The API will only provide 2k requests, on the nose. So I may now be rate limited to drawing a box and getting after it. This actually helps with mission creep.

New plan: Modify api so I only get events within a 100mx100m box. Might be some issues with calculating then calling getFireLoc but 

So....

1) Extract lalo from user data
2) Lalo gets passed to mapping
3) Lalo is taken into some form of "setmapbounds"
4) lalo is set as a state, that's probably a good idea.
5) lalo is passed into getFireLoc
6) We figure out how to query lat and long using `-strings
7) We then only request specific points for within100 (maybe 99 so no overlap)
7) We also pass lalo into the return, where we set map boundaries by calc NE SW

Questions:
How do we get a latlong, and get other latlongs based on mile distance?
Maybe we could paint a circle? It could be enclosed within a square.
Inverse haversine?

Ouch. Inverse haversine is a pain in the ass.
https://stackoverflow.com/questions/62366229/work-out-the-50-miles-radius-from-london-latitude-and-longitude-coordinates

So the biggest problem is for sure calculating this 50mile box

Let's leave it for now, call it a latlong box.

But damn, that's a pretty cool problem.
Oblate spheroid.

showAccuracyCircle: boolean
Default: true

Draw a transparent circle will be drawn around the user location indicating the accuracy (95% confidence level) of the user's location. Set to false to disable. This only has effect if showUserLocation is true.

Also, react can track user location, I should use that native method

SO I am getting rabbitholed.
I need to redo get Fire Loc based off of props. Even better, do it off of passed lat and long. That would be way, way better.

I think it might be a good idea to rip some functions out of Mapping


Ended the night with a good bit of hacking and slashing. Much cleaner now. Pedro would be proud.


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


It's actually working pretty well. The sizing stuff is mint tbh
Going to ake a break and then we need to find some big asl fires to check coloring


One of the issues is figuring out which acreage to use

Now have filtered out any elements with fireoutdatetime nonnull
Now let's figure out acreage
Almost none of them have calculated acres. Hmmmmm.

Almost all of them have dailyacres. Interesting.
And discoveryacres as well. 
The vast majority have both discover acres and discovery acres.
The ones that only have one have DiscoveryAcres, only one just has daily
Have clicked event render in footer

So time is actually quite difficult to do.

Live vs in place filters







