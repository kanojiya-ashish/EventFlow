Design and build a **fully functional, modern web application prototype** for an intelligent **Mega-Event Hospitality & Mobility Orchestration Platform**.

The platform solves two major problems during large events:

1. **Smart Bus Redistribution**
2. **Smart Stay Management**

The design must NOT look like a generic AI dashboard, boring SaaS template, or overused blue/purple AI interface.

## DESIGN STYLE

Create a **premium, elegant, minimal and aesthetic travel-tech interface**.

Visual direction:

* Sophisticated dark charcoal / warm off-white base
* Muted olive green, deep teal and soft amber as supporting colors
* Use colors subtly; NO neon colors
* Avoid excessive gradients
* Avoid excessive glassmorphism
* Avoid huge colorful cards
* Avoid generic AI robot illustrations
* Avoid unnecessary 3D elements
* Lots of clean whitespace
* Soft shadows
* Rounded corners around 14–18px
* Thin borders
* Elegant typography
* Clear visual hierarchy
* Professional enough for a government / city authority / major event organization
* Slightly futuristic but still practical and trustworthy

Suggested palette:

* Background: #F5F3EE / dark charcoal sections
* Primary: Deep Olive #53624F
* Secondary: Deep Teal #315C5B
* Accent: Muted Amber #C89B55
* Text: #202421
* Secondary text: #70756F
* Success: muted green
* Warning: muted amber
* Critical: muted terracotta/red

Use the accent colors ONLY for important information such as alerts, active routes, occupancy warnings and recommendations.

## APP NAME

Use a professional product name such as:

**EVENTFLOW**
Subtitle:
**Intelligent Hospitality & Mobility Orchestration**

Create a simple minimal logo using a combination of:

* location pin
* movement/route line
* subtle city/grid concept

Do not make the logo overly complex.

---

# 1. LOGIN / LANDING SCREEN

Create a clean landing/login screen.

Headline:
**“Move people. Balance demand. Keep events flowing.”**

Short description:
“An intelligent platform for coordinating accommodation, transportation and visitor movement during mega-events.”

Buttons:

* Event Organizer
* Hospitality Partner
* Attendee

Also show a subtle abstract city-map background.

---

# 2. MAIN EVENT COMMAND CENTER

After login, show the main dashboard.

Top navigation:

* Overview
* Mobility
* Stays
* Crowd
* Recommendations
* Event
* Settings

Top bar:

* Event selector
* Current event name
* Live status indicator
* Notification icon
* Profile

Example event:
**National Cultural Festival 2026**

Show:
**LIVE EVENT STATUS**

Main KPI cards:

* Visitors Today
* Active Buses
* Available Rooms
* Crowd Hotspots
* Overall Capacity

Cards should be compact and elegant, not huge.

---

# 3. LIVE CITY MAP — MOST IMPORTANT SCREEN

Make the map the visual centerpiece.

Use a realistic-looking **stylized city map**, not a plain Google Maps clone.

Show:

* Event venues
* Hotels
* Bus locations
* Crowd-density zones
* Transport routes
* Stay zones

Crowd density:

* Green = normal
* Amber = rising
* Terracotta = high
* Dark red = critical

Bus markers should show small bus icons.

Hotel markers should show small hotel/location icons.

Clicking a bus should open:
**Bus B-24**

* Current location
* Destination
* Occupancy
* Available seats
* Status

Clicking a crowd hotspot should open:
**Crowd Hotspot Detected**

* Location
* Estimated crowd
* Crowd growth
* Nearby buses
* Suggested action

---

# 4. SMART BUS REDISTRIBUTION

Create a dedicated Mobility screen.

Heading:

**Smart Bus Redistribution**

Show a live map with buses and crowd hotspots.

Create this working flow:

**Crowd increases**
↓
**AI detects hotspot**
↓
**Checks nearby available buses**
↓
**Calculates distance + capacity**
↓
**Suggests nearest suitable bus**
↓
**Operator approves reroute**
↓
**Bus route updates**

Example:

HOTSPOT
**Central Arena Gate**
Crowd: 8,420
Growth: +18% / 15 min

AI Recommendation:

**Redirect Bus B-24**
Distance: 1.8 km
Available seats: 32
Estimated arrival: 6 min

Button:
**Approve Reroute**

Secondary button:
**View Alternatives**

When “Approve Reroute” is clicked:

* Show confirmation
* Change bus status to “Rerouting”
* Update route on map
* Update estimated arrival
* Add activity to live activity feed

Make these interactions actually work in the prototype.

---

# 5. SMART STAY MANAGEMENT

Create a dedicated Stays screen.

Show:

* Hotels
* Hostels
* Short-term stays
* Available rooms
* Occupancy percentage
* Distance from venue
* Transport connectivity

Example hotel cards:

**City Central Hotel**
Occupancy: 98%
Rooms available: 6
Distance: 1.2 km
Status: Nearly Full

**Lakeview Stay Zone**
Occupancy: 62%
Rooms available: 84
Distance: 4.8 km
Status: Available

When a hotel becomes full:

Show:

**Accommodation Pressure Detected**

“Central Zone is reaching accommodation capacity.”

AI Recommendation:

**Shift visitors toward East Stay Zone**

Available rooms:
84

Average venue distance:
4.8 km

Transport availability:
12 buses

Buttons:
**View Stay Options**
**Arrange Transport**

---

# 6. STAY + BUS CONNECTION

This is a key differentiating feature.

Create a screen where the system connects accommodation recommendations with transportation.

Example:

Visitor searches:
**“Stay near Main Arena”**

System shows:

OPTION 1
Central Zone
Rooms: 6
Distance: 1.2 km
Price: Higher
Transport: High congestion

OPTION 2
East Stay Zone
Rooms: 84
Distance: 4.8 km
Price: Moderate
Transport: Available
AI Score: 94/100

Recommendation:

**“East Stay Zone is recommended because it has higher availability and better transport connectivity.”**

Button:
**Select Stay**

Then show:

**Transport Connection**

Bus B-18
Pickup: East Stay Zone
Destination: Main Arena
ETA: 14 min
Seats available: 28

Button:
**Reserve Journey**

---

# 7. ATTENDEE MODE

Create a separate simple attendee interface.

Do NOT show complex command-center information.

Main screen:

**Where are you going?**

Search:
“Search venue, hotel or event”

Quick options:

* Find a Stay
* Find a Bus
* Best Route
* Nearby Events

Show a map.

Example recommendation:

**Avoid Central Avenue**
“High crowd density detected.”

Alternative:
**Take East Connector**
Travel time: 18 min
Crowd level: Low

Button:
**Start Route**

For accommodation:

**Recommended Stay**
East Stay Zone
84 rooms available
Transport connected
4.8 km from venue

Button:
**View Stay**

---

# 8. AI RECOMMENDATIONS SCREEN

Create an elegant recommendation center.

Title:

**AI Operations Assistant**

Do not create a chatbot-heavy interface.

Instead show intelligent recommendation cards.

Examples:

### Crowd Pressure

“Central Arena is expected to reach critical density in 22 minutes.”

**Recommended Action**
Redirect 2 buses toward Gate B.

Button:
**Review Action**

### Hotel Saturation

“Central accommodation zone is 91% occupied.”

**Recommended Action**
Promote East Stay Zone.

Button:
**View Distribution Plan**

### Transport Congestion

“Main Avenue traffic is increasing rapidly.”

**Recommended Action**
Use East Connector Route.

Button:
**Apply Recommendation**

---

# 9. EVENT TIMELINE

Create an event schedule screen.

Timeline showing:

* Event start
* Peak arrival
* Main performance
* Break
* Event end
* Departure wave

The system should visually show expected crowd peaks.

Example:

10:00 AM — Opening
12:30 PM — Visitor Peak
3:00 PM — Main Event
5:30 PM — Exit Wave

Show expected crowd level beside each stage.

---

# 10. ANALYTICS

Create a clean analytics page with simple charts.

Metrics:

* Visitor arrivals
* Crowd density over time
* Hotel occupancy
* Bus utilization
* Average travel time
* Zone distribution

Charts should be minimal and readable.

Add:
**Predicted next 2 hours**

Example:
“Visitor demand expected to increase by 24%.”

---

# 11. NOTIFICATIONS / ALERTS

Create an alert panel.

Examples:

🔴 Critical:
“Main Arena approaching venue capacity.”

🟠 Warning:
“Central hotel zone 92% occupied.”

🟢 Recommendation:
“12 buses available near East Zone.”

Clicking an alert should take the user to the relevant screen.

---

# 12. INTERACTIVE PROTOTYPE REQUIREMENTS

This must NOT be a static UI mockup.

Create functional frontend interactions:

* Navigation between all pages
* Event selector
* Interactive map markers
* Bus selection
* Hotel selection
* Crowd hotspot popup
* Approve Reroute button
* Route status update
* Hotel availability update
* Stay recommendation
* Transport recommendation
* Search
* Filters
* Notifications
* Attendee/Organizer mode switching
* Working buttons and modals
* Responsive layout

Use realistic mock data so the prototype feels like a real working system.

For simulation, include a small control:

**Simulate Crowd Increase**

When activated:

* Crowd level increases
* Hotspot appears
* AI recommendation is generated
* Nearby bus becomes recommended
* Operator can approve rerouting
* Map and status update accordingly

Also include:

**Simulate Hotel Saturation**

When activated:

* Central hotel occupancy increases
* Central zone becomes “Nearly Full”
* AI recommends another accommodation zone
* Transport connection is suggested

This simulation is important because it demonstrates the actual intelligence of the solution instead of just showing static screens.

---

# RESPONSIVE DESIGN

Make the interface responsive for:

* Desktop
* Tablet
* Mobile

Desktop should prioritize the city map and command center.

Mobile attendee mode should prioritize:

* Search
* Map
* Stay recommendation
* Route recommendation
* Bus information

---

# FINAL DESIGN GOAL

The final product should feel like a **real intelligent city-event operations platform**, not a college project dashboard.

Visual inspiration:
premium mobility apps + modern city command centers + luxury travel platforms.

Keep the interface:
**minimal + elegant + intelligent + practical + highly usable.**

Avoid:

* Generic blue AI dashboards
* Neon gradients
* Excessive glass cards
* Robot graphics
* Too many colors
* Excessive text
* Overloaded screens
* Huge KPI cards
* Generic stock illustrations

The most visually important elements should be:

**LIVE CITY MAP + CROWD HOTSPOTS + BUS MOVEMENT + HOTEL CAPACITY + AI RECOMMENDATIONS**

The UI should immediately communicate:

**“The city is moving, the system is watching, and AI is helping operators act before problems become critical.”**
