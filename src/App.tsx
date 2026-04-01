import React, { useState, useEffect, useRef } from 'react';
import roofImg from "./truss-roof-cost.jpg";
import ff1 from "./IMG_1851.jpeg";
import ff2 from "./IMG_1838.jpeg";
import ff3 from "./IMG_6601.jpeg";
import ff4 from "./IMG_6619.jpeg";
import ff5 from "./IMG_6734.jpeg";
import ff6 from "./IMG_6736.jpeg";
import ff7 from "./IMG_6759.jpeg";
import ff8 from "./IMG_6760.jpeg";
import rf1 from "./IMG_7211.jpeg";
import rf2 from "./IMG_7597.jpeg";
import rf3 from "./IMG_9294.jpeg";
import rf4 from "./IMG_9821.jpeg";
import rf5 from "./IMG_9923.jpeg";
import j1 from "./IMG_0480.jpeg";
import j2 from "./IMG_0484.jpeg";
import j3 from "./IMG_0485.jpeg";
import j4 from "./IMG_1991.jpeg";
import j5 from "./IMG_6518.jpeg";
import j6 from "./IMG_6572.jpeg";
import j7 from "./IMG_6943.jpeg";
import j8 from "./IMG_6945.jpeg";
import j9 from "./IMG_7003.jpeg";
import j10 from "./IMG_7065.jpeg";
import j11 from "./IMG_7067.jpeg";
import j12 from "./IMG_7236.jpeg";
import j13 from "./IMG_7240.jpeg";
import j14 from "./IMG_7364.jpeg";
import j15 from "./IMG_7526.jpeg";
import j16 from "./IMG_7549.jpeg";

const NAVY = '#0C1821';
const GOLD = '#B8860B';
const CREAM = '#f6f4ef';

const GALLERY_PHOTOS = {
  joists: [
    {src: j1, caption: "I-beam joists with joist hangers — first floor"},
    {src: j2, caption: "Stairwell opening marked out on structural decking"},
    {src: j3, caption: "Structural decking complete — first floor"},
    {src: j4, caption: "I-beam floor joists with strutting"},
    {src: j5, caption: "Floor joists with trimming around stairwell"},
    {src: j6, caption: "Completed structural floor with Peel Clean Xtra"},
    {src: j7, caption: "I-beam joists — first floor installation"},
    {src: j8, caption: "Completed decked floor from scaffold"},
    {src: j9, caption: "Floor joists with herringbone strutting"},
    {src: j10, caption: "Structural decking with loft hatch opening"},
    {src: j11, caption: "Decked floor — wide angle view across site"},
    {src: j12, caption: "First floor joists with trimmer detail"},
    {src: j13, caption: "Structural decking complete — side elevation"},
    {src: j14, caption: "Decked floor with stairwell marked — site view"},
    {src: j15, caption: "Completed structural floor — elevated view"},
    {src: j16, caption: "Joists and decking — finished first floor"}
  ],
  roofs: [
    {src: rf1, caption: "Trussed rafter installation — gable end"},
    {src: rf2, caption: "Roof trusses from scaffold level"},
    {src: rf3, caption: "Trussed rafters with bracing"},
    {src: rf4, caption: "Front door canopy — porch carpentry"},
    {src: rf5, caption: "Cut roof structure — hipped roof from above"}
  ],
  "first-fix": [
    {src: ff1, caption: "Stud partitions & door linings — first floor"},
    {src: ff2, caption: "Staircase installation with safety barrier"},
    {src: ff3, caption: "Stud framing around staircase opening"},
    {src: ff4, caption: "Winder staircase installation"},
    {src: ff5, caption: "Dormer room stud partitions"},
    {src: ff6, caption: "Loft room framing with Velux window"},
    {src: ff7, caption: "Ground floor stud partitions & door linings"},
    {src: ff8, caption: "Under-stair framing detail"}
  ],
  "second-fix": [],
  finals: [],
  extras: []
};

const SERVICES = [
  {
    id: "joists",
    title: "Joists & Structural Floors",
    icon: "┃",
    desc: "All structural timber floor systems to NHBC standards.",
    subs: [
      {n: "Joist Types", items: ["Masonry Hanger Joists", "Joist Hanger to Trimmer", "Change of Direction", "I-Beam / Engineered", "Traditional Softwood"]},
      {n: "Floor Construction", items: ["Semi-Detached Party Floor", "Strutting & Noggins", "Structural Decking", "Fire Stopping"]}
    ]
  },
  {
    id: "roofs",
    title: "Roof Construction",
    icon: "△",
    desc: "Full roof erection through to weathertight.",
    subs: [
      {n: "Roof Types", items: ["Straight Up & Over", "Gable Elevations", "Hipped Roofs", "Valley Roofs", "Dormer Construction"]},
      {n: "Roof Details", items: ["Open Eaves", "Boxed Soffit", "Gable Ladders", "Box Ends", "Fascia & Barge Boards", "Roof Bracing"]}
    ]
  },
  {
    id: "first-fix",
    title: "First Fix Carpentry",
    icon: "▣",
    desc: "All carpentry before plastering.",
    subs: [
      {n: "Traditional (Blockwork)", items: ["Staircase Installation", "Stud Partitions", "Bulkheads", "Door Linings", "Window Boards", "Pipe Boxing", "Loft Hatches", "Solar Panel Stands"]},
      {n: "Timber Frame", items: ["Frame Erection", "Squaring & Levelling", "Panel Stitching", "Party Walls", "Floor Cassettes", "Breather Membrane", "Fire Stopping & Cavity Barriers"]}
    ]
  },
  {
    id: "second-fix",
    title: "Second Fix Carpentry",
    icon: "▤",
    desc: "All finishing carpentry after plastering.",
    subs: [
      {n: "Traditional Doors", items: ["Door Trimming & Fitting", "Hinging", "Latch & Lock Fitting", "Fire Door Hanging"]},
      {n: "Prehung Casings", items: ["Prehung Installation", "Levelling & Packing", "Fire-Rated Sets"]},
      {n: "Standard Spec", items: ["Standard Skirting (68/94mm)", "Standard Architrave", "Standard Staircase"]},
      {n: "Premium Spec", items: ["Premium Skirting (119-168mm)", "Premium Architrave + Plinth Blocks", "Oak Staircase", "Engineered Hardwood Flooring", "Panelling & Wainscoting"]}
    ]
  },
  {
    id: "finals",
    title: "Final Fix",
    icon: "◆",
    desc: "All final items to handover standard.",
    subs: [
      {n: "Included", items: ["Door Handles & Furnishings", "Ironmongery - Locks, Latches & Keeps", "Bath Panel", "Front Door Accessories"]}
    ]
  },
  {
    id: "extras",
    title: "Unique Works",
    icon: "🔧",
    desc: "Remedial & snagging work for other contractors.",
    subs: [
      {n: "Remedial Services", items: ["Rectifying defective carpentry by other contractors", "Door realignment & rehinging", "Skirting & architrave replacement", "Staircase remedials", "Floor levelling & joist repairs"]},
      {n: "Snagging Support", items: ["NHBC inspection preparation for other sites", "Pre-completion snagging lists", "Warranty defect repairs", "Fire door compliance remedials", "Builder handover support"]}
    ]
  }
];

const PAST_PROJECTS = [
  {year: "2024-25", builder: "Bellway", site: "Holbrook Park Ph1", location: "Chellaston", units: 167, scope: "Full package"},
  {year: "2023-25", builder: "Persimmon", site: "Boulton Moor", location: "Chellaston", units: 245, scope: "Full package"},
  {year: "2023-24", builder: "Barratt", site: "Thoresby Vale Ph2", location: "Mansfield", units: 180, scope: "Full package"},
  {year: "2022-24", builder: "St. Modwen", site: "Hilton Valley Ph3", location: "Hilton", units: 120, scope: "1st & 2nd fix"},
  {year: "2021-23", builder: "Persimmon", site: "Jubilee Gardens", location: "Ilkeston", units: 200, scope: "Full package"},
  {year: "2020-22", builder: "Barratt", site: "Dunstall Park", location: "Tamworth", units: 280, scope: "Full package"},
  {year: "2019-21", builder: "Bellway", site: "The Meadows Ph1", location: "Alvaston", units: 78, scope: "Full package"},
  {year: "2018-20", builder: "Persimmon", site: "Clipstone Park", location: "Mansfield", units: 190, scope: "Full package"},
  {year: "2017-19", builder: "Bellway", site: "Coppice Heights", location: "Ripley", units: 130, scope: "Full package"},
  {year: "2016-18", builder: "Persimmon", site: "Carlton View", location: "Gedling", units: 170, scope: "Full package"},
  {year: "2015-17", builder: "Bellway", site: "Hugglescote Grange", location: "Leicestershire", units: 140, scope: "Full package"},
  {year: "2014-16", builder: "Barratt", site: "Grange Park", location: "Loughborough", units: 220, scope: "Full package"},
  {year: "2012-14", builder: "Bellway", site: "Stenson Fields", location: "Derby", units: 250, scope: "Full package"},
  {year: "2010-12", builder: "Persimmon", site: "Wollaton Vale", location: "Nottingham", units: 200, scope: "Full package"},
  {year: "2008-10", builder: "Barratt", site: "Chestnut Grove", location: "Long Eaton", units: 140, scope: "Full package"},
  {year: "2005-07", builder: "Bellway", site: "Millbrook Park", location: "Stapleford", units: 85, scope: "Full package"}
];

const BUILDERS = [
  { id: "barratt", name: "Barratt Homes", color: "#E31937", logo: "https://www.barratthomes.co.uk/favicon.ico", sites: [
    { name: "Thoresby Vale", location: "Edwinstowe, Mansfield", lat: 53.177, lng: -1.069, housetypes: ["Windermere","Holden","Moresby","Kennett","Radleigh"] },
    { name: "Romans' Quarter", location: "Bingham, Nottingham", lat: 52.949, lng: -1.0, housetypes: ["Hollinwood","Bradgate","Moresby","Alderney"] },
    { name: "Dunstall Park", location: "Tamworth, Staffordshire", lat: 52.634, lng: -1.693, housetypes: ["Windermere","Archford","Holden","Kennett"] },
    { name: "Poppy Fields", location: "Uttoxeter, Staffordshire", lat: 52.898, lng: -1.86, housetypes: ["Maidstone","Ellerton","Denford"] },
    { name: "Bertelin Fields", location: "Beaconside, Stafford", lat: 52.826, lng: -2.117, housetypes: ["Windermere","Archford","Kennett","Moresby"] }
  ]},
  { id: "lovell", name: "Lovell Homes", color: "#1B3D6F", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_en-0IYbjSLWr1dCt62dPp1evg0udhiAZXg&s", sites: [
    { name: "Old Mill Farm", location: "Cotgrave, Nottingham", lat: 52.917, lng: -1.046, housetypes: ["Holden","Kingsley","Layton","Windermere"] },
    { name: "Berry Hill", location: "Mansfield", lat: 53.148, lng: -1.188, housetypes: ["Hollinwood","Bradgate","Exeter"] },
    { name: "Gateford Park", location: "Worksop, Nottinghamshire", lat: 53.321, lng: -1.132, housetypes: ["Radleigh","Holden","Moresby"] }
  ]},
  { id: "bellway", name: "Bellway Homes", color: "#003DA5", logo: "https://s3-eu-west-1.amazonaws.com/tpd/logos/58932caa0000ff00059bf27f/0x0.png", sites: [
    { name: "The Meadows", location: "Alvaston, Derby", lat: 52.893, lng: -1.434, housetypes: ["Joiner","Craftsman","Turner","Tanner","Weaver"] },
    { name: "Holbrook Park", location: "Chellaston, Derby", lat: 52.873, lng: -1.437, housetypes: ["Craftsman","Joiner","Turner","Weaver","Cooper"] },
    { name: "Coppice Heights", location: "Ripley, Derbyshire", lat: 53.051, lng: -1.405, housetypes: ["Joiner","Turner","Tanner","Fletcher"] },
    { name: "Springwood", location: "Midway, S. Derbyshire", lat: 52.773, lng: -1.542, housetypes: ["Joiner","Craftsman","Turner","Weaver"] },
    { name: "Hugglescote Grange", location: "Hugglescote, Leicestershire", lat: 52.727, lng: -1.362, housetypes: ["Craftsman","Turner","Cooper","Fletcher"] },
    { name: "Abbey Fields Grange", location: "Hucknall, Nottinghamshire", lat: 53.033, lng: -1.195, housetypes: ["Tanner","Weaver","Turner","Joiner"] },
    { name: "Ashlands", location: "Sutton in Ashfield, Notts", lat: 53.128, lng: -1.255, housetypes: ["Joiner","Craftsman","Turner"] },
    { name: "Torvill Park", location: "Fairham, Nottingham", lat: 52.909, lng: -1.163, housetypes: ["Craftsman","Turner","Tanner","Weaver"] },
    { name: "Swinfen Vale", location: "Swinfen, Staffordshire", lat: 52.879, lng: -1.843, housetypes: ["Craftsman","Joiner","Turner","Tanner"] },
    { name: "Oadby Grange", location: "Oadby, Leicestershire", lat: 52.628, lng: -1.087, housetypes: ["Joiner","Craftsman","Weaver","Cooper"] }
  ]},
  { id: "persimmon", name: "Persimmon Homes", color: "#D4002A", logo: "https://cdn.prod.website-files.com/65a518d6a768fc381c83acf8/65a518d6a768fc381c83b06d_2020_Persimmon_1.png", sites: [
    { name: "Clipstone Park", location: "Clipstone, Mansfield", lat: 53.167, lng: -1.137, housetypes: ["Bedale","Alnwick","Byford","Bolsover","Kielder"] },
    { name: "The Oaks", location: "Calverton, Notts", lat: 53.033, lng: -1.093, housetypes: ["Bedale","Alnwick","Bolsover","Kielder"] },
    { name: "Boulton Moor", location: "Chellaston, Derby", lat: 52.872, lng: -1.413, housetypes: ["Bedale","Alnwick","Bolsover","Kielder","Roseberry"] },
    { name: "Jubilee Gardens", location: "Ilkeston, Derbyshire", lat: 52.972, lng: -1.307, housetypes: ["Bedale","Byford","Alnwick","Bolsover"] },
    { name: "Foxley Fields", location: "Market Harborough, Leics", lat: 52.478, lng: -0.918, housetypes: ["Kielder","Roseberry","Alnwick","Bolsover"] }
  ]},
  { id: "stmodwen", name: "St. Modwen Homes", color: "#6B2D5B", logo: "https://ramsboards.com/wp-content/uploads/2021/01/st.modwen-homes.webp", sites: [
    { name: "Hilton Valley", location: "Hilton, Derbyshire", lat: 52.862, lng: -1.596, housetypes: ["Arden","Berwick","Carleton","Danbury"] },
    { name: "Bramshall Meadows", location: "Uttoxeter, Staffordshire", lat: 52.907, lng: -1.847, housetypes: ["Arden","Berwick","Carleton","Elmswell"] },
    { name: "Snibston Mill", location: "Coalville, Leicestershire", lat: 52.725, lng: -1.37, housetypes: ["Arden","Carleton","Danbury","Elmswell"] },
    { name: "Egstow Park", location: "Clay Cross, Derbyshire", lat: 53.163, lng: -1.413, housetypes: ["Berwick","Carleton","Danbury"] }
  ]},
  { id: "countryside", name: "Countryside Homes", color: "#2B6E44", logo: "https://nla-production-media.s3.eu-west-2.amazonaws.com/84908/Untitled-design-15.png", sites: [
    { name: "Edwalton Fields", location: "Edwalton, Nottingham", lat: 52.917, lng: -1.12, housetypes: ["Thornbury","Wentworth","Henley","Sudbury"] },
    { name: "Mastin Moor", location: "Chesterfield, Derbyshire", lat: 53.267, lng: -1.342, housetypes: ["Thornbury","Henley","Sudbury"] }
  ]},
  { id: "vistry", name: "Vistry / Bovis Homes", color: "#00594F", logo: "https://housingforum.org.uk/wp-content/uploads/2020/05/Untitled-design.png", sites: [
    { name: "Broadnook Garden Village", location: "Rothley, Leicestershire", lat: 52.719, lng: -1.138, housetypes: ["Limewood","Fern","Lime","Oak","Willow"] },
    { name: "Partridge Walk", location: "Stafford", lat: 52.808, lng: -2.101, housetypes: ["Limewood","Oak","Willow","Cedar"] },
    { name: "Hinckley 475", location: "Hinckley, Leicestershire", lat: 52.54, lng: -1.37, housetypes: ["Limewood","Fern","Oak","Willow"] }
  ]},
  { id: "ashberry", name: "Ashberry Homes", color: "#7B3F98", logo: "https://www.ashberryhomes.co.uk/img/default-social-image.jpg", sites: [
    { name: "Potters Gate", location: "Farndon, Newark", lat: 53.064, lng: -0.856, housetypes: ["Greenwood","Oakwood","Birchwood"] },
    { name: "Longridge", location: "Long Eaton, Notts", lat: 52.89, lng: -1.275, housetypes: ["Greenwood","Oakwood","Elmwood","Birchwood"] }
  ]},
  { id: "davidsons", name: "Davidsons Homes", color: "#C8102E", logo: "https://davidsonsgroup.co.uk/wp-content/uploads/2023/01/Screenshot-2023-01-03-at-16.53.01-1024x522.png", sites: [
    { name: "Davidsons at Huncote", location: "Huncote, Leicestershire", lat: 52.582, lng: -1.218, housetypes: ["The Arden","The Warwick","The Ashby","The Leamington"] },
    { name: "Davidsons at Boulton Moor", location: "Derby", lat: 52.878, lng: -1.418, housetypes: ["The Arden","The Warwick","The Kenilworth"] }
  ]},
  { id: "wheeldon", name: "Wheeldon Homes", color: "#2E4057", logo: "https://www.panddg.co.uk/wp-content/uploads/2022/02/logo-wheeldon-homes.svg", sites: [
    { name: "Oaklands", location: "Etwall, South Derbyshire", lat: 52.871, lng: -1.599, housetypes: ["The Chatsworth","The Haddon","The Calke"] },
    { name: "The Green", location: "Church Broughton, Derby", lat: 52.857, lng: -1.66, housetypes: ["The Chatsworth","The Haddon"] }
  ]},
  { id: "crest", name: "Crest Nicholson", color: "#003C71", logo: "https://www.crestnicholson.com/favicon.ico", sites: [
    { name: "Barley Fields", location: "Queniborough, Leicestershire", lat: 52.697, lng: -1.08, housetypes: ["Elm","Beech","Maple","Rowan","Birch"] }
  ]}
];

const CARPENTERS = [
  { id: "C001", name: "Dave Mitchell", pin: "1234", site: "Holbrook Park", builder: "Bellway" },
  { id: "C002", name: "Ryan Cooper", pin: "5678", site: "Coppice Heights", builder: "Bellway" },
  { id: "C003", name: "Jake Williams", pin: "2345", site: "Thoresby Vale", builder: "Barratt" },
  { id: "C004", name: "Tom Harris", pin: "3456", site: "Holbrook Park", builder: "Bellway" },
  { id: "C005", name: "Sam Bennett", pin: "4567", site: "Holbrook Park", builder: "Bellway" },
  { id: "C006", name: "Chris Taylor", pin: "5679", site: "The Meadows", builder: "Bellway" },
  { id: "C007", name: "Dan Evans", pin: "6780", site: "Hilton Valley", builder: "St. Modwen", status: "leave" },
  { id: "C008", name: "Mark Johnson", pin: "7891", site: "Edwalton Fields", builder: "Countryside" },
  { id: "C009", name: "Luke Brown", pin: "8902", site: "Broadnook Garden Village", builder: "Vistry" },
  { id: "C010", name: "James Wilson", pin: "9013", site: "Clipstone Park", builder: "Persimmon" }
];

const SITE_MANAGERS = [
  { id: "SM001", name: "Michael", pin: "1111", site: "Swinfen Vale", builder: "Bellway", role: "site_manager" },
  { id: "SM002", name: "Richard", pin: "2222", site: "Oadby Grange", builder: "Bellway", role: "site_manager" }
];

const INITIAL_WORK_LOG = [
  { id: 1, site: "Holbrook Park", builder: "Bellway", plot: "34", houseType: "Craftsman", stage: "First Fix", expectedDays: 3, priority: "high", notes: "Ready to go", status: "allocated", allocatedTo: "Dave Mitchell" },
  { id: 2, site: "Holbrook Park", builder: "Bellway", plot: "35", houseType: "Joiner", stage: "First Fix", expectedDays: 3, priority: "medium", notes: "", status: "allocated", allocatedTo: "Dave Mitchell" },
  { id: 3, site: "Coppice Heights", builder: "Bellway", plot: "18", houseType: "Turner", stage: "Roofs", expectedDays: 2, priority: "high", notes: "Trusses delivered", status: "allocated", allocatedTo: "Ryan Cooper" },
  { id: 4, site: "Coppice Heights", builder: "Bellway", plot: "19", houseType: "Joiner", stage: "Roofs", expectedDays: 2, priority: "medium", notes: "", status: "allocated", allocatedTo: "Ryan Cooper" },
  { id: 5, site: "Thoresby Vale", builder: "Barratt", plot: "42", houseType: "Windermere", stage: "Joists", expectedDays: 2, priority: "high", notes: "", status: "allocated", allocatedTo: "Jake Williams" },
  { id: 6, site: "Holbrook Park", builder: "Bellway", plot: "29", houseType: "Weaver", stage: "Second Fix", expectedDays: 4, priority: "medium", notes: "", status: "allocated", allocatedTo: "Tom Harris" },
  { id: 7, site: "Holbrook Park", builder: "Bellway", plot: "12", houseType: "Cooper", stage: "Finals", expectedDays: 1, priority: "low", notes: "Snagging only", status: "complete", allocatedTo: "Sam Bennett" },
  { id: 8, site: "Swinfen Vale", builder: "Bellway", plot: "5", houseType: "Craftsman", stage: "Joists", expectedDays: 2, priority: "high", notes: "Michael called — ready Monday", status: "logged" },
  { id: 9, site: "Swinfen Vale", builder: "Bellway", plot: "6", houseType: "Joiner", stage: "Joists", expectedDays: 2, priority: "medium", notes: "", status: "logged" },
  { id: 10, site: "Oadby Grange", builder: "Bellway", plot: "3", houseType: "Weaver", stage: "First Fix", expectedDays: 3, priority: "high", notes: "Richard needs ASAP", status: "logged" },
  { id: 11, site: "Oadby Grange", builder: "Bellway", plot: "4", houseType: "Cooper", stage: "First Fix", expectedDays: 3, priority: "medium", notes: "", status: "logged" },
  { id: 12, site: "Hilton Valley", builder: "St. Modwen", plot: "22", houseType: "Arden", stage: "Roofs", expectedDays: 2, priority: "medium", notes: "", status: "logged" },
  { id: 13, site: "Edwalton Fields", builder: "Countryside", plot: "8", houseType: "Thornbury", stage: "Second Fix", expectedDays: 4, priority: "low", notes: "", status: "logged" },
  { id: 14, site: "Broadnook Garden Village", builder: "Vistry", plot: "15", houseType: "Limewood", stage: "First Fix", expectedDays: 3, priority: "medium", notes: "", status: "logged" },
  { id: 15, site: "Clipstone Park", builder: "Persimmon", plot: "67", houseType: "Bedale", stage: "Roofs", expectedDays: 2, priority: "high", notes: "", status: "logged" }
];

const PRICE_LISTS = {
  "Bellway": {
    "Holbrook Park": { "Joists GF": 850, "Joists FF": 700, "Roof": 1200, "First Fix": 950, "Second Fix": 800, "Finals": 600 },
    "Coppice Heights": { "Joists GF": 800, "Joists FF": 700, "Roof": 1150, "First Fix": 900, "Second Fix": 800, "Finals": 600 },
    "Swinfen Vale": { "Joists GF": 820, "Joists FF": 690, "Roof": 1180, "First Fix": 940, "Second Fix": 810, "Finals": 610 },
    "Oadby Grange": { "Joists GF": 830, "Joists FF": 700, "Roof": 1190, "First Fix": 950, "Second Fix": 820, "Finals": 620 },
    "The Meadows": { "Joists GF": 840, "Joists FF": 705, "Roof": 1210, "First Fix": 960, "Second Fix": 830, "Finals": 630 }
  },
  "Barratt": {
    "Thoresby Vale": { "Joists GF": 860, "Joists FF": 710, "Roof": 1220, "First Fix": 970, "Second Fix": 840, "Finals": 640 },
    "Romans' Quarter": { "Joists GF": 850, "Joists FF": 705, "Roof": 1210, "First Fix": 960, "Second Fix": 830, "Finals": 630 },
    "Dunstall Park": { "Joists GF": 870, "Joists FF": 720, "Roof": 1240, "First Fix": 980, "Second Fix": 850, "Finals": 650 }
  },
  "Persimmon": {
    "Clipstone Park": { "Joists GF": 880, "Joists FF": 725, "Roof": 1250, "First Fix": 990, "Second Fix": 860, "Finals": 660 },
    "Boulton Moor": { "Joists GF": 890, "Joists FF": 730, "Roof": 1260, "First Fix": 1000, "Second Fix": 870, "Finals": 670 }
  },
  "St. Modwen": {
    "Hilton Valley": { "Joists GF": 820, "Joists FF": 690, "Roof": 1170, "First Fix": 920, "Second Fix": 800, "Finals": 610 },
    "Bramshall Meadows": { "Joists GF": 810, "Joists FF": 680, "Roof": 1160, "First Fix": 910, "Second Fix": 790, "Finals": 600 }
  },
  "Countryside": {
    "Edwalton Fields": { "Joists GF": 840, "Joists FF": 700, "Roof": 1200, "First Fix": 950, "Second Fix": 820, "Finals": 620 }
  },
  "Vistry": {
    "Broadnook Garden Village": { "Joists GF": 750, "Joists FF": 650, "Roof": 1100, "First Fix": 850, "Second Fix": 700, "Finals": 550 }
  }
};

const DOCUMENTS = {
  "Holbrook Park": {
    "Floorplans": ["Craftsman — Ground Floor", "Craftsman — First Floor", "Joiner — Ground Floor", "Joiner — First Floor", "Turner — Ground Floor"],
    "Technical Drawings": ["Electrical — Holbrook Park", "Structural — Holbrook Park", "Plumbing — Holbrook Park"],
    "Site Documents": ["Health & Safety Plan", "Site Rules", "Site Map"],
    "H&S": ["Site Induction", "Equipment Register", "Incident Log"]
  },
  "Coppice Heights": {
    "Floorplans": ["Joiner — Ground Floor", "Joiner — First Floor", "Turner — Ground Floor", "Turner — First Floor", "Tanner — Ground Floor"],
    "Technical Drawings": ["Electrical — Coppice Heights", "Structural — Coppice Heights"],
    "Site Documents": ["Health & Safety Plan", "Site Rules"],
    "H&S": ["Site Induction", "Equipment Register"]
  },
  "Swinfen Vale": {
    "Floorplans": ["Craftsman — Ground Floor", "Craftsman — First Floor", "Joiner — Ground Floor", "Joiner — First Floor", "Turner — Ground Floor"],
    "Technical Drawings": ["Electrical — Swinfen Vale", "Structural — Swinfen Vale", "Plumbing — Swinfen Vale"],
    "Site Documents": ["Health & Safety Plan", "Site Rules", "Site Map"],
    "H&S": ["Site Induction", "Equipment Register", "Incident Log"]
  },
  "Oadby Grange": {
    "Floorplans": ["Joiner — Ground Floor", "Joiner — First Floor", "Craftsman — Ground Floor", "Craftsman — First Floor", "Weaver — Ground Floor"],
    "Technical Drawings": ["Electrical — Oadby Grange", "Structural — Oadby Grange"],
    "Site Documents": ["Health & Safety Plan", "Site Rules"],
    "H&S": ["Site Induction", "Equipment Register"]
  }
};

const ALLOCATIONS = [
  { id: 1, carpenter: "Dave Mitchell", site: "Holbrook Park", plot: "34", houseType: "Craftsman", stage: "First Fix", startDate: "2026-03-24", endDate: "2026-03-27" },
  { id: 2, carpenter: "Dave Mitchell", site: "Holbrook Park", plot: "35", houseType: "Joiner", stage: "First Fix", startDate: "2026-03-27", endDate: "2026-03-30" },
  { id: 3, carpenter: "Ryan Cooper", site: "Coppice Heights", plot: "18", houseType: "Turner", stage: "Roofs", startDate: "2026-03-25", endDate: "2026-03-27" },
  { id: 4, carpenter: "Ryan Cooper", site: "Coppice Heights", plot: "19", houseType: "Joiner", stage: "Roofs", startDate: "2026-03-27", endDate: "2026-03-29" },
  { id: 5, carpenter: "Jake Williams", site: "Thoresby Vale", plot: "42", houseType: "Windermere", stage: "Joists", startDate: "2026-03-30", endDate: "2026-04-01" },
  { id: 6, carpenter: "Tom Harris", site: "Holbrook Park", plot: "29", houseType: "Weaver", stage: "Second Fix", startDate: "2026-03-26", endDate: "2026-03-30" },
  { id: 7, carpenter: "Sam Bennett", site: "Holbrook Park", plot: "12", houseType: "Cooper", stage: "Finals", startDate: "2026-03-31", endDate: "2026-03-31" },
  { id: 8, carpenter: "Tom Harris", site: "Holbrook Park", plot: "38", houseType: "Craftsman", stage: "Roofs", startDate: "2026-04-02", endDate: "2026-04-04" }
];

const INVOICES = [
  { id: 1, carpenter: "Dave Mitchell", site: "Holbrook Park", plot: "12", houseType: "Joiner", stage: "Finals", amount: 600, status: "pending", date: "2026-03-20" },
  { id: 2, carpenter: "Ryan Cooper", site: "Coppice Heights", plot: "14", houseType: "Turner", stage: "First Fix", amount: 950, status: "pending", date: "2026-03-22" },
  { id: 3, carpenter: "Jake Williams", site: "Thoresby Vale", plot: "40", houseType: "Windermere", stage: "Joists GF", amount: 860, status: "approved", date: "2026-03-15" },
  { id: 4, carpenter: "Tom Harris", site: "Holbrook Park", plot: "28", houseType: "Weaver", stage: "Second Fix", amount: 800, status: "approved", date: "2026-03-18" },
  { id: 5, carpenter: "Sam Bennett", site: "Holbrook Park", plot: "10", houseType: "Craftsman", stage: "Finals", amount: 600, status: "paid", date: "2026-03-10" },
  { id: 6, carpenter: "Chris Taylor", site: "The Meadows", plot: "5", houseType: "Turner", stage: "Roofs", amount: 1210, status: "paid", date: "2026-03-05" }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('website');
  const [user, setUser] = useState(null);
  const [pinInput, setPinInput] = useState('');
  const [workLog, setWorkLog] = useState(INITIAL_WORK_LOG);
  const [allocations, setAllocations] = useState(ALLOCATIONS);
  const [invoices, setInvoices] = useState(INVOICES);

  // Website states
  const [sec, setSec] = useState('home');
  const [sB, setSB] = useState(null);
  const [sS, setSS] = useState(null);
  const [sSv, setSSv] = useState(null);
  const [chatOn, setChatOn] = useState(false);
  const [msgs, setMsgs] = useState([{f:"b",t:"Hello! Welcome to Miller & Watson Carpentry. I'm here to help. Could I start with your name please?"}]);
  const [chatIn, setChatIn] = useState("");
  const [formDone, setFormDone] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [chatStep, setChatStep] = useState("init");
  const [chatUserData, setChatUserData] = useState({});
  const [mapOk, setMapOk] = useState(false);

  // Form and portal states
  const [formData, setFormData] = useState({ site: '', plot: '', houseType: '', stage: '', expectedDays: 1, priority: 'medium', notes: '' });
  const [selectedSiteForLog, setSelectedSiteForLog] = useState('');
  const [allocateId, setAllocateId] = useState(null);
  const [allocateCarpenter, setAllocateCarpenter] = useState('');
  const [allocateStartDate, setAllocateStartDate] = useState('');
  const [carpenterSearch, setCarpenterSearch] = useState('');
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [adminTab, setAdminTab] = useState('dashboard');
  const [scheduleView, setScheduleView] = useState('gantt');
  const [carpenterTab, setCarpenterTab] = useState('schedule');
  const [invoiceTab, setInvoiceTab] = useState('pending');
  const [siteManagerTab, setSiteManagerTab] = useState('overview');
  const [plotFilter, setPlotFilter] = useState('');

  // Refs
  const chatEnd = useRef(null);
  const mapEl = useRef(null);

  const handleLogin = () => {
    let foundUser = null;

    if (pinInput === '4444') {
      foundUser = { role: 'admin', name: 'Admin' };
    } else if (pinInput === '9999') {
      foundUser = { role: 'invoice', name: 'Office/Invoice' };
    } else {
      const carp = CARPENTERS.find(c => c.pin === pinInput);
      if (carp) {
        foundUser = { ...carp, role: 'carpenter' };
      }
      if (!foundUser) {
        const sm = SITE_MANAGERS.find(s => s.pin === pinInput);
        if (sm) {
          foundUser = { ...sm, role: 'site_manager' };
        }
      }
    }

    if (foundUser) {
      setUser(foundUser);
      setCurrentPage('app');
      setAdminTab('dashboard');
      setCarpenterTab('schedule');
      setInvoiceTab('pending');
      setSiteManagerTab('overview');
      setPinInput('');
    } else {
      alert('Invalid PIN. Try: 1234/5678 (Carpenter) | 1111/2222 (Site Manager) | 4444 (Admin) | 9999 (Office)');
    }
  };

  const getBuilderAndSites = () => {
    if (!user) return { builder: null, sites: [] };
    if (user.role === 'admin') return { builder: null, sites: [] };
    if (user.role === 'carpenter' || user.role === 'site_manager') {
      const builder = BUILDERS.find(b => b.sites.some(s => s.name === user.site));
      if (builder) {
        const site = builder.sites.find(s => s.name === user.site);
        return { builder, sites: [site] };
      }
    }
    return { builder: null, sites: [] };
  };

  const getSiteHousetypes = (siteName) => {
    for (let builder of BUILDERS) {
      const site = builder.sites.find(s => s.name === siteName);
      if (site) return site.housetypes;
    }
    return [];
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const daysInRange = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    return Math.ceil((e - s) / (1000 * 60 * 60 * 24)) + 1;
  };

  const go = (s) => {
    setSec(s);
    setSB(null);
    setSS(null);
    setSSv(null);
    window.scrollTo(0, 0);
  };

  const send = (t) => {
    if (!t.trim()) return;
    const m = [...msgs, {f:"u",t}];
    setMsgs(m);
    setChatIn("");
    setTimeout(() => {
      const l = t.toLowerCase();
      let r = "";
      let ns = chatStep;
      switch (chatStep) {
        case "init":
          setChatUserData(p => ({...p, name: t.trim()}));
          r = "Thanks " + t.trim() + "! Could I have a contact number?";
          ns = "ask_phone";
          break;
        case "ask_phone":
          setChatUserData(p => ({...p, phone: t.trim()}));
          r = "Great. How can we help?\n1. Services\n2. Quote/project\n3. Work opportunities\n4. Other";
          ns = "ask_type";
          break;
        case "ask_type":
          if (l.includes("1") || l.includes("service")) {
            r = "We offer joists, roofing, first fix, second fix, and finals. Which interests you?";
            ns = "service_detail";
          } else if (l.includes("2") || l.includes("quote")) {
            r = "Tell us about your project?";
            ns = "quote_detail";
          } else if (l.includes("3") || l.includes("work") || l.includes("job")) {
            r = "We are always hiring. Want a callback?";
            ns = "work_detail";
          } else {
            r = "Tell me more and I will pass it on.";
            ns = "general_detail";
          }
          break;
        case "service_detail":
          r = "Full package: Joists, Roofs, First Fix, Second Fix, Finals. Want a callback?";
          ns = "callback_offer";
          break;
        case "quote_detail":
        case "general_detail":
          r = "Thanks. Shall we call or email?";
          ns = "callback_or_email";
          break;
        case "work_detail":
          r = "I will arrange that. Anything else?";
          ns = "anything_else";
          break;
        case "callback_or_email":
        case "callback_offer":
          r = "We will be in touch. Anything else?";
          ns = "anything_else";
          break;
        case "anything_else":
          if (l.includes("no") || l.includes("thanks") || l.includes("bye")) {
            r = "Thanks for contacting M&W Carpentry!";
            ns = "ended";
          } else {
            r = "What else?\n1. Services\n2. Quote\n3. Work\n4. Other";
            ns = "ask_type";
          }
          break;
        default:
          r = "How can I help?\n1. Services\n2. Quote\n3. Work\n4. Other";
          ns = "ask_type";
      }
      setChatStep(ns);
      setMsgs([...m,{f:"b",t:r}]);
    }, 600);
  };

  useEffect(() => {
    chatEnd.current?.scrollIntoView({behavior: "smooth"});
  }, [msgs]);

  useEffect(() => {
    if (sec === "map" && !mapOk) {
      const cs = document.createElement("link");
      cs.rel = "stylesheet";
      cs.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(cs);
      const sc = document.createElement("script");
      sc.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      sc.onload = () => setMapOk(true);
      document.head.appendChild(sc);
    }
  }, [sec]);

  useEffect(() => {
    if (sec === "map" && mapOk && mapEl.current) {
      const L = window.L;
      if (!L || mapEl.current._leaflet_id) return;
      const m = L.map(mapEl.current).setView([52.92, -1.35], 9);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap"
      }).addTo(m);
      BUILDERS.forEach(b => {
        b.sites.forEach(s => {
          L.circleMarker([s.lat, s.lng], {
            radius: 8, fillColor: b.color, color: "#fff", weight: 2, fillOpacity: 0.9
          }).addTo(m).bindPopup(`<div style="font-family:sans-serif;min-width:180px"><strong>${s.name}</strong><br><span style="color:#777">${b.name} — ${s.location}</span><br><br><a href="https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}" target="_blank" style="color:#B8860B;font-weight:700;text-decoration:none">Google Maps →</a><br><a href="https://maps.apple.com/?daddr=${s.lat},${s.lng}" target="_blank" style="color:#B8860B;font-weight:700;text-decoration:none">Apple Maps →</a></div>`);
        });
      });
    }
  }, [sec, mapOk]);

  useEffect(() => {
    if (!document.querySelector('meta[name="viewport"]')) {
      const v = document.createElement("meta");
      v.name = "viewport";
      v.content = "width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover";
      document.head.appendChild(v);
    }
    if (!document.querySelector('meta[name="theme-color"]')) {
      const t = document.createElement("meta");
      t.name = "theme-color";
      t.content = "#0C1821";
      document.head.appendChild(t);
    }
    if (!document.getElementById("mw-responsive")) {
      const st = document.createElement("style");
      st.id = "mw-responsive";
      st.textContent = "*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}body{margin:0;-webkit-font-smoothing:antialiased;overflow-x:hidden}@media(max-width:768px){.mw-desk{display:none!important}.mw-mob-btn{display:flex!important}}@media(min-width:769px){.mw-mob-btn{display:none!important}.mw-mob-menu{display:none!important}}";
      document.head.appendChild(st);
    }
  }, []);

  // ===== LOGIN PAGE =====
  if (currentPage === 'login') {
    return (
      <div style={{ fontFamily: 'DM Sans, sans-serif', backgroundColor: NAVY, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ backgroundColor: CREAM, padding: '40px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', maxWidth: '500px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRthM15JuQV5GY0MLTZRPG7t2WY5ShbEsMg-g&s" alt="M&W Logo" style={{ height: '80px', marginBottom: '20px' }} />
            <h1 style={{ color: NAVY, margin: '0', fontSize: '28px' }}>Miller & Watson</h1>
            <p style={{ color: '#666', margin: '5px 0 0 0' }}>Carpentry Contractor Portal</p>
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter PIN"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
              style={{ width: '100%', padding: '12px', fontSize: '18px', border: '2px solid ' + GOLD, borderRadius: '4px', marginBottom: '20px', boxSizing: 'border-box', textAlign: 'center', letterSpacing: '4px' }}
            />
            <button onClick={handleLogin} style={{ width: '100%', padding: '12px', backgroundColor: GOLD, color: NAVY, fontSize: '16px', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Login
            </button>
          </div>

          <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
            <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: NAVY }}>Demo PINs:</p>
            <p style={{ margin: '5px 0', fontSize: '14px', color: '#333' }}>Carpenter: <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>1234</span> or <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>5678</span></p>
            <p style={{ margin: '5px 0', fontSize: '14px', color: '#333' }}>Site Manager: <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>1111</span> (Michael/Swinfen) or <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>2222</span> (Richard/Oadby)</p>
            <p style={{ margin: '5px 0', fontSize: '14px', color: '#333' }}>Admin: <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>4444</span></p>
            <p style={{ margin: '5px 0', fontSize: '14px', color: '#333' }}>Invoice/Office: <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>9999</span></p>
          </div>

          <button onClick={() => setCurrentPage('website')} style={{ width: '100%', marginTop: '15px', padding: '10px', backgroundColor: 'transparent', color: NAVY, border: '1px solid ' + NAVY, borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>
            ← Back to Website
          </button>

          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
            <p style={{ margin: '0' }}>Suite 4, The Hayloft, Blakenhall Park</p>
            <p style={{ margin: '5px 0 0 0' }}>Barton Under Needwood, DE13 8AJ</p>
            <p style={{ margin: '5px 0 0 0' }}>Phone: 01283 716 173</p>
            <p style={{ margin: '5px 0 0 0' }}>Est 2005</p>
          </div>
        </div>
      </div>
    );
  }

  // ===== PUBLIC WEBSITE =====
  if (currentPage === 'website') {
    return (
      <div style={{ fontFamily: 'DM Sans, sans-serif', backgroundColor: CREAM, minHeight: '100vh' }}>
        {/* Navigation */}
        <nav style={{ backgroundColor: NAVY, padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRthM15JuQV5GY0MLTZRPG7t2WY5ShbEsMg-g&s" alt="M&W" style={{ height: '40px' }} />
            <span style={{ color: CREAM, fontSize: '18px', fontWeight: 'bold' }}>Miller & Watson Carpentry</span>
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', marginTop: '10px' }}>
            <button onClick={() => go('home')} style={{ backgroundColor: 'transparent', color: CREAM, border: 'none', cursor: 'pointer', fontSize: '14px' }}>Home</button>
            <button onClick={() => go('services')} style={{ backgroundColor: 'transparent', color: CREAM, border: 'none', cursor: 'pointer', fontSize: '14px' }}>Services</button>
            <button onClick={() => go('builders')} style={{ backgroundColor: 'transparent', color: CREAM, border: 'none', cursor: 'pointer', fontSize: '14px' }}>Builders</button>
            <button onClick={() => go('past')} style={{ backgroundColor: 'transparent', color: CREAM, border: 'none', cursor: 'pointer', fontSize: '14px' }}>Past Projects</button>
            <button onClick={() => go('map')} style={{ backgroundColor: 'transparent', color: CREAM, border: 'none', cursor: 'pointer', fontSize: '14px' }}>Site Map</button>
            <button onClick={() => go('careers')} style={{ backgroundColor: 'transparent', color: CREAM, border: 'none', cursor: 'pointer', fontSize: '14px' }}>Careers</button>
            <button onClick={() => go('contact')} style={{ backgroundColor: 'transparent', color: CREAM, border: 'none', cursor: 'pointer', fontSize: '14px' }}>Contact</button>
            <button onClick={() => setCurrentPage('login')} style={{ backgroundColor: GOLD, color: NAVY, padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>
              Contractor Login
            </button>
          </div>
        </nav>

        {/* HOME PAGE */}
        {sec === 'home' && (
          <div>
            <div style={{ backgroundImage: `url(${roofImg})`, backgroundSize: 'cover', backgroundPosition: 'center', color: CREAM, padding: '80px 20px', textAlign: 'center' }}>
              <h1 style={{ fontSize: '48px', margin: '0', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>Expert Carpentry for New Builds</h1>
              <p style={{ fontSize: '20px', marginTop: '10px', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>Joists, Roofs, First Fix, Second Fix, Finals</p>
              <button onClick={() => go('services')} style={{ marginTop: '20px', padding: '12px 30px', backgroundColor: GOLD, color: NAVY, border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>Explore Services</button>
            </div>

            <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', marginBottom: '50px' }}>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ color: GOLD, fontSize: '32px', margin: '0' }}>21+</h3>
                  <p style={{ color: NAVY, marginTop: '5px' }}>Years Experience</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ color: GOLD, fontSize: '32px', margin: '0' }}>100+</h3>
                  <p style={{ color: NAVY, marginTop: '5px' }}>Expert Carpenters</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ color: GOLD, fontSize: '32px', margin: '0' }}>1000s</h3>
                  <p style={{ color: NAVY, marginTop: '5px' }}>Homes Completed</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ color: GOLD, fontSize: '32px', margin: '0' }}>11</h3>
                  <p style={{ color: NAVY, marginTop: '5px' }}>Builder Partners</p>
                </div>
              </div>

              <h2 style={{ color: NAVY, textAlign: 'center', marginBottom: '30px' }}>Our Core Services</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '50px' }}>
                {SERVICES.slice(0, 6).map(service => (
                  <div key={service.id} onClick={() => {setSSv(service.id); go('services');}} style={{ backgroundColor: NAVY, color: CREAM, padding: '20px', borderRadius: '8px', borderLeft: '4px solid ' + GOLD, cursor: 'pointer', transition: 'transform 0.2s' }}>
                    <h3 style={{ margin: '0', color: GOLD }}>{service.icon} {service.title}</h3>
                    <p style={{ marginTop: '10px', fontSize: '14px' }}>{service.desc}</p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '50px', padding: '40px', backgroundColor: NAVY, color: CREAM, borderRadius: '8px', textAlign: 'center' }}>
                <h3 style={{ color: GOLD }}>Ready to Work Together?</h3>
                <p style={{ margin: '10px 0' }}>Contact us today for quotes and project discussions</p>
                <button onClick={() => go('contact')} style={{ marginTop: '15px', padding: '12px 30px', backgroundColor: GOLD, color: NAVY, border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Get in Touch</button>
              </div>
            </div>
          </div>
        )}

        {/* SERVICES PAGE */}
        {sec === 'services' && (
          <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            {!sSv ? (
              <div>
                <h1 style={{ color: NAVY, textAlign: 'center' }}>Our Services</h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
                  {SERVICES.map(s => (
                    <div key={s.id} onClick={() => setSSv(s.id)} style={{ backgroundColor: NAVY, color: CREAM, padding: '30px', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
                      <div style={{ fontSize: '32px', marginBottom: '10px' }}>{s.icon}</div>
                      <h3 style={{ color: GOLD, margin: '0 0 10px 0' }}>{s.title}</h3>
                      <p style={{ margin: '0', fontSize: '14px', opacity: 0.9 }}>{s.desc}</p>
                      {GALLERY_PHOTOS[s.id] && GALLERY_PHOTOS[s.id].length > 0 && (
                        <div style={{ marginTop: '15px', fontSize: '12px', opacity: 0.7 }}>{GALLERY_PHOTOS[s.id].length} photos available</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <button onClick={() => setSSv(null)} style={{ marginBottom: '20px', padding: '8px 16px', backgroundColor: NAVY, color: CREAM, border: 'none', borderRadius: '4px', cursor: 'pointer' }}>← Back</button>
                {SERVICES.find(s => s.id === sSv) && (
                  <div>
                    <h1 style={{ color: NAVY }}>{SERVICES.find(s => s.id === sSv).title}</h1>
                    <p style={{ fontSize: '16px', color: '#666' }}>{SERVICES.find(s => s.id === sSv).desc}</p>

                    {GALLERY_PHOTOS[sSv] && GALLERY_PHOTOS[sSv].length > 0 && (
                      <div>
                        <h3 style={{ color: NAVY, marginTop: '30px' }}>Gallery</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                          {GALLERY_PHOTOS[sSv].map((photo, idx) => (
                            <div key={idx} style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                              <img src={photo.src} alt={photo.caption} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                              <p style={{ padding: '10px', margin: '0', fontSize: '13px', backgroundColor: CREAM }}>{photo.caption}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {SERVICES.find(s => s.id === sSv).subs && (
                      <div style={{ marginTop: '30px' }}>
                        <h3 style={{ color: NAVY }}>Sub-Services</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                          {SERVICES.find(s => s.id === sSv).subs.map((sub, idx) => (
                            <div key={idx} style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px', borderLeft: '4px solid ' + GOLD }}>
                              <h4 style={{ color: NAVY, margin: '0 0 10px 0' }}>{sub.n}</h4>
                              <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '13px' }}>
                                {sub.items.map((item, i) => (
                                  <li key={i} style={{ marginBottom: '5px' }}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* BUILDERS PAGE */}
        {sec === 'builders' && (
          <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            {!sB ? (
              <div>
                <h1 style={{ color: NAVY, textAlign: 'center' }}>Our Builder Partners</h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  {BUILDERS.map(b => (
                    <div key={b.id} onClick={() => setSB(b.id)} style={{ backgroundColor: NAVY, color: CREAM, padding: '20px', borderRadius: '8px', cursor: 'pointer', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', transition: 'transform 0.2s' }}>
                      {b.logo && <img src={b.logo} alt={b.name} style={{ height: '40px', marginBottom: '10px' }} />}
                      <h3 style={{ margin: '10px 0', color: b.color }}>{b.name}</h3>
                      <p style={{ margin: '0', fontSize: '13px', opacity: 0.8 }}>{b.sites.length} active sites</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : !sS ? (
              <div>
                <button onClick={() => setSB(null)} style={{ marginBottom: '20px', padding: '8px 16px', backgroundColor: NAVY, color: CREAM, border: 'none', borderRadius: '4px', cursor: 'pointer' }}>← Back</button>
                {BUILDERS.find(b => b.id === sB) && (
                  <div>
                    <h1 style={{ color: NAVY }}>{BUILDERS.find(b => b.id === sB).name}</h1>
                    <p style={{ color: '#666', marginBottom: '30px' }}>Active Sites</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                      {BUILDERS.find(b => b.id === sB).sites.map((site, idx) => (
                        <div key={idx} onClick={() => setSS(idx)} style={{ backgroundColor: NAVY, color: CREAM, padding: '20px', borderRadius: '8px', cursor: 'pointer' }}>
                          <h3 style={{ margin: '0 0 5px 0', color: GOLD }}>{site.name}</h3>
                          <p style={{ margin: '5px 0', fontSize: '13px', opacity: 0.8 }}>{site.location}</p>
                          <p style={{ margin: '5px 0', fontSize: '12px', opacity: 0.6 }}>House Types: {site.housetypes.join(', ')}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <button onClick={() => setSS(null)} style={{ marginBottom: '20px', padding: '8px 16px', backgroundColor: NAVY, color: CREAM, border: 'none', borderRadius: '4px', cursor: 'pointer' }}>← Back to Sites</button>
                {BUILDERS.find(b => b.id === sB)?.sites[sS] && (
                  <div>
                    <h1 style={{ color: NAVY }}>{BUILDERS.find(b => b.id === sB).sites[sS].name}</h1>
                    <h2 style={{ color: GOLD, marginTop: '5px' }}>{BUILDERS.find(b => b.id === sB).name}</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
                      <div style={{ backgroundColor: NAVY, color: CREAM, padding: '20px', borderRadius: '8px' }}>
                        <h4 style={{ color: GOLD, margin: '0 0 10px 0' }}>Location</h4>
                        <p style={{ margin: '0', fontSize: '14px' }}>{BUILDERS.find(b => b.id === sB).sites[sS].location}</p>
                      </div>
                      <div style={{ backgroundColor: NAVY, color: CREAM, padding: '20px', borderRadius: '8px' }}>
                        <h4 style={{ color: GOLD, margin: '0 0 10px 0' }}>House Types</h4>
                        <p style={{ margin: '0', fontSize: '13px' }}>{BUILDERS.find(b => b.id === sB).sites[sS].housetypes.join(', ')}</p>
                      </div>
                    </div>

                    <div style={{ marginTop: '30px', backgroundColor: NAVY, color: CREAM, padding: '20px', borderRadius: '8px' }}>
                      <h4 style={{ color: GOLD, margin: '0 0 15px 0' }}>Directions</h4>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <a href={`https://www.google.com/maps/dir/?api=1&destination=${BUILDERS.find(b => b.id === sB).sites[sS].lat},${BUILDERS.find(b => b.id === sB).sites[sS].lng}`} target="_blank" rel="noreferrer" style={{ padding: '10px 15px', backgroundColor: GOLD, color: NAVY, borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>Google Maps</a>
                        <a href={`https://maps.apple.com/?daddr=${BUILDERS.find(b => b.id === sB).sites[sS].lat},${BUILDERS.find(b => b.id === sB).sites[sS].lng}`} target="_blank" rel="noreferrer" style={{ padding: '10px 15px', backgroundColor: GOLD, color: NAVY, borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>Apple Maps</a>
                        <a href={`https://waze.com/ul?ll=${BUILDERS.find(b => b.id === sB).sites[sS].lat},${BUILDERS.find(b => b.id === sB).sites[sS].lng}&navigate=yes`} target="_blank" rel="noreferrer" style={{ padding: '10px 15px', backgroundColor: GOLD, color: NAVY, borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>Waze</a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* PAST PROJECTS */}
        {sec === 'past' && (
          <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ color: NAVY, textAlign: 'center' }}>Past Projects</h1>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                  <tr style={{ backgroundColor: NAVY, color: CREAM }}>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Year</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Builder</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Site</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Location</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Units</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Scope</th>
                  </tr>
                </thead>
                <tbody>
                  {PAST_PROJECTS.map((p, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #ddd', backgroundColor: idx % 2 === 0 ? '#f9f9f9' : 'white' }}>
                      <td style={{ padding: '12px' }}>{p.year}</td>
                      <td style={{ padding: '12px' }}>{p.builder}</td>
                      <td style={{ padding: '12px' }}>{p.site}</td>
                      <td style={{ padding: '12px' }}>{p.location}</td>
                      <td style={{ padding: '12px' }}>{p.units}</td>
                      <td style={{ padding: '12px' }}>{p.scope}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SITE MAP */}
        {sec === 'map' && (
          <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ color: NAVY, textAlign: 'center' }}>Interactive Site Map</h1>
            <div ref={mapEl} style={{ width: '100%', height: '600px', borderRadius: '8px', marginTop: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }} />
          </div>
        )}

        {/* CAREERS */}
        {sec === 'careers' && (
          <div style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ color: NAVY }}>Join Our Team</h1>
            <p style={{ color: '#666', fontSize: '16px' }}>We're always looking for talented carpenters and tradespeople. Fill out the form below to apply or express interest in working with us.</p>

            <form style={{ marginTop: '30px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: NAVY, fontWeight: 'bold', marginBottom: '8px' }}>Name *</label>
                <input type="text" required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: NAVY, fontWeight: 'bold', marginBottom: '8px' }}>Email *</label>
                <input type="email" required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: NAVY, fontWeight: 'bold', marginBottom: '8px' }}>Phone *</label>
                <input type="tel" required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: NAVY, fontWeight: 'bold', marginBottom: '8px' }}>Specialisation *</label>
                <select required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}>
                  <option>Select...</option>
                  <option>Joists</option>
                  <option>Roofs</option>
                  <option>First Fix</option>
                  <option>Second Fix</option>
                  <option>Finals</option>
                  <option>Multi-skilled</option>
                </select>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: NAVY, fontWeight: 'bold', marginBottom: '8px' }}>Message</label>
                <textarea style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', minHeight: '120px', fontFamily: 'inherit' }} />
              </div>
              <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: GOLD, color: NAVY, border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>Submit Application</button>
            </form>
          </div>
        )}

        {/* CONTACT */}
        {sec === 'contact' && (
          <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ color: NAVY, textAlign: 'center' }}>Get in Touch</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
              <div style={{ backgroundColor: NAVY, color: CREAM, padding: '30px', borderRadius: '8px' }}>
                <h3 style={{ color: GOLD, margin: '0 0 15px 0' }}>Address</h3>
                <p style={{ margin: '0 0 5px 0' }}>Suite 4, The Hayloft</p>
                <p style={{ margin: '0 0 5px 0' }}>Blakenhall Park</p>
                <p style={{ margin: '0' }}>Barton Under Needwood</p>
                <p style={{ margin: '5px 0 0 0' }}>DE13 8AJ</p>
              </div>
              <div style={{ backgroundColor: NAVY, color: CREAM, padding: '30px', borderRadius: '8px' }}>
                <h3 style={{ color: GOLD, margin: '0 0 15px 0' }}>Contact</h3>
                <p style={{ margin: '0 0 10px 0' }}>Phone: <span style={{ fontWeight: 'bold' }}>01283 716 173</span></p>
                <p style={{ margin: '0' }}>Email: <span style={{ fontWeight: 'bold' }}>info@mwcarpentry.co.uk</span></p>
              </div>
              <div style={{ backgroundColor: NAVY, color: CREAM, padding: '30px', borderRadius: '8px' }}>
                <h3 style={{ color: GOLD, margin: '0 0 15px 0' }}>Hours</h3>
                <p style={{ margin: '0 0 5px 0' }}>Monday - Friday: 8am - 5pm</p>
                <p style={{ margin: '0' }}>Saturday - Sunday: Closed</p>
              </div>
            </div>

            <div style={{ marginTop: '40px', backgroundColor: '#f5f5f5', padding: '30px', borderRadius: '8px', textAlign: 'center' }}>
              <h3 style={{ color: NAVY, margin: '0 0 10px 0' }}>Founded 2005</h3>
              <p style={{ color: '#666', margin: '0' }}>Trusted by 11 major house builders across the Midlands</p>
            </div>
          </div>
        )}

        {/* Chatbot */}
        {chatOn && (
          <div style={{ position: 'fixed', bottom: '80px', right: '20px', width: '300px', maxHeight: '400px', backgroundColor: CREAM, borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', zIndex: 1000, fontFamily: 'DM Sans, sans-serif' }}>
            <div style={{ backgroundColor: NAVY, color: CREAM, padding: '15px', borderRadius: '8px 8px 0 0', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              M&W Assistant
              <button onClick={() => setChatOn(false)} style={{ backgroundColor: 'transparent', color: CREAM, border: 'none', cursor: 'pointer', fontSize: '16px' }}>×</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {msgs.map((m, i) => (
                <div key={i} style={{ textAlign: m.f === 'b' ? 'left' : 'right', marginBottom: '8px' }}>
                  <div style={{ display: 'inline-block', maxWidth: '80%', padding: '8px 12px', borderRadius: '8px', backgroundColor: m.f === 'b' ? NAVY : GOLD, color: m.f === 'b' ? CREAM : NAVY, fontSize: '13px', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                    {m.t}
                  </div>
                </div>
              ))}
              <div ref={chatEnd} />
            </div>
            <div style={{ borderTop: '1px solid #ddd', padding: '10px', display: 'flex', gap: '5px' }}>
              <input type="text" placeholder="Type message..." value={chatIn} onChange={(e) => setChatIn(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') send(chatIn); }} style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px' }} />
              <button onClick={() => send(chatIn)} style={{ padding: '8px 12px', backgroundColor: GOLD, color: NAVY, border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>Send</button>
            </div>
          </div>
        )}

        <button onClick={() => setChatOn(!chatOn)} style={{ position: 'fixed', bottom: '20px', right: '20px', width: '60px', height: '60px', borderRadius: '50%', backgroundColor: GOLD, color: NAVY, border: 'none', cursor: 'pointer', fontSize: '24px', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', zIndex: 999 }}>
          {chatOn ? '×' : '💬'}
        </button>

        {/* Footer */}
        <footer style={{ backgroundColor: NAVY, color: CREAM, padding: '30px 20px', marginTop: '60px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 5px 0' }}>&copy; 2005-2026 Miller & Watson Ltd. All rights reserved.</p>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', opacity: 0.8 }}>Suite 4, The Hayloft, Blakenhall Park, Barton Under Needwood, DE13 8AJ | 01283 716 173</p>
        </footer>
      </div>
    );
  }

  // ===== APP INTERFACE =====
  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif', backgroundColor: CREAM, minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ backgroundColor: NAVY, color: CREAM, padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRthM15JuQV5GY0MLTZRPG7t2WY5ShbEsMg-g&s" alt="M&W" style={{ height: '40px' }} />
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Miller & Watson</span>
        </div>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <span style={{ fontSize: '14px' }}>{user?.name} | {user?.role?.toUpperCase()}</span>
          <button onClick={() => { setUser(null); setCurrentPage('website'); setPinInput(''); }} style={{ backgroundColor: GOLD, color: NAVY, padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Logout
          </button>
        </div>
      </header>

      {/* ADMIN PORTAL */}
      {user?.role === 'admin' && (
        <div style={{ display: 'flex', height: 'calc(100vh - 70px)' }}>
          <aside style={{ backgroundColor: NAVY, color: CREAM, width: '200px', padding: '20px', overflow: 'auto' }}>
            {['Dashboard', 'Work Log', 'Allocate', 'Schedule', 'Carpenters', 'Price Lists', 'Documents'].map(tab => (
              <button
                key={tab}
                onClick={() => setAdminTab(tab.toLowerCase().replace(' ', '-'))}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '12px',
                  marginBottom: '8px',
                  backgroundColor: adminTab === tab.toLowerCase().replace(' ', '-') ? GOLD : 'transparent',
                  color: adminTab === tab.toLowerCase().replace(' ', '-') ? NAVY : CREAM,
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: adminTab === tab.toLowerCase().replace(' ', '-') ? 'bold' : 'normal'
                }}
              >
                {tab}
              </button>
            ))}
          </aside>
          <main style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
            {adminTab === 'dashboard' && (
              <div>
                <h1 style={{ color: NAVY }}>Admin Dashboard</h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
                  <div style={{ backgroundColor: NAVY, color: CREAM, padding: '20px', borderRadius: '8px' }}>
                    <h3 style={{ color: GOLD, margin: '0' }}>Active Work Items</h3>
                    <p style={{ fontSize: '32px', color: GOLD, margin: '10px 0 0 0' }}>{workLog.filter(w => w.status === 'allocated').length}</p>
                  </div>
                  <div style={{ backgroundColor: NAVY, color: CREAM, padding: '20px', borderRadius: '8px' }}>
                    <h3 style={{ color: GOLD, margin: '0' }}>Pending Invoices</h3>
                    <p style={{ fontSize: '32px', color: GOLD, margin: '10px 0 0 0' }}>{invoices.filter(i => i.status === 'pending').length}</p>
                  </div>
                  <div style={{ backgroundColor: NAVY, color: CREAM, padding: '20px', borderRadius: '8px' }}>
                    <h3 style={{ color: GOLD, margin: '0' }}>Total Carpenters</h3>
                    <p style={{ fontSize: '32px', color: GOLD, margin: '10px 0 0 0' }}>{CARPENTERS.length}</p>
                  </div>
                  <div style={{ backgroundColor: NAVY, color: CREAM, padding: '20px', borderRadius: '8px' }}>
                    <h3 style={{ color: GOLD, margin: '0' }}>Active Sites</h3>
                    <p style={{ fontSize: '32px', color: GOLD, margin: '10px 0 0 0' }}>{BUILDERS.reduce((sum, b) => sum + b.sites.length, 0)}</p>
                  </div>
                </div>
              </div>
            )}

            {adminTab === 'work-log' && (
              <div>
                <h1 style={{ color: NAVY }}>Work Log</h1>
                <div style={{ overflowX: 'auto', marginTop: '20px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ backgroundColor: NAVY, color: CREAM }}>
                        <th style={{ padding: '10px', textAlign: 'left', fontSize: '12px' }}>Site</th>
                        <th style={{ padding: '10px', textAlign: 'left', fontSize: '12px' }}>Plot</th>
                        <th style={{ padding: '10px', textAlign: 'left', fontSize: '12px' }}>Stage</th>
                        <th style={{ padding: '10px', textAlign: 'left', fontSize: '12px' }}>Status</th>
                        <th style={{ padding: '10px', textAlign: 'left', fontSize: '12px' }}>Allocated To</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workLog.map((w, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #ddd' }}>
                          <td style={{ padding: '10px', fontSize: '12px' }}>{w.site}</td>
                          <td style={{ padding: '10px', fontSize: '12px' }}>{w.plot}</td>
                          <td style={{ padding: '10px', fontSize: '12px' }}>{w.stage}</td>
                          <td style={{ padding: '10px', fontSize: '12px' }}><span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: w.status === 'allocated' ? '#4CAF50' : '#ff9800', color: 'white', fontSize: '11px' }}>{w.status}</span></td>
                          <td style={{ padding: '10px', fontSize: '12px' }}>{w.allocatedTo || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {adminTab === 'carpenters' && (
              <div>
                <h1 style={{ color: NAVY }}>Carpenters</h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px', marginTop: '20px' }}>
                  {CARPENTERS.map(c => (
                    <div key={c.id} style={{ backgroundColor: NAVY, color: CREAM, padding: '15px', borderRadius: '8px' }}>
                      <h4 style={{ color: GOLD, margin: '0 0 5px 0' }}>{c.name}</h4>
                      <p style={{ margin: '3px 0', fontSize: '12px' }}>Site: {c.site}</p>
                      <p style={{ margin: '3px 0', fontSize: '12px' }}>Builder: {c.builder}</p>
                      <p style={{ margin: '3px 0', fontSize: '12px' }}>Status: {c.status || 'active'}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {adminTab === 'price-lists' && (
              <div>
                <h1 style={{ color: NAVY }}>Price Lists by Builder</h1>
                {Object.entries(PRICE_LISTS).map(([builder, sites]) => (
                  <div key={builder} style={{ marginTop: '20px', marginBottom: '30px' }}>
                    <h3 style={{ color: NAVY }}>{builder}</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
                      {Object.entries(sites).map(([site, rates]) => (
                        <div key={site} style={{ backgroundColor: NAVY, color: CREAM, padding: '15px', borderRadius: '8px' }}>
                          <h4 style={{ color: GOLD, margin: '0 0 10px 0' }}>{site}</h4>
                          <table style={{ width: '100%', fontSize: '12px' }}>
                            <tbody>
                              {Object.entries(rates).map(([stage, price]) => (
                                <tr key={stage}>
                                  <td style={{ paddingBottom: '5px' }}>{stage}</td>
                                  <td style={{ paddingBottom: '5px', textAlign: 'right', color: GOLD, fontWeight: 'bold' }}>£{price}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {adminTab === 'allocate' && (
              <div>
                <h1 style={{ color: NAVY }}>Work Allocation</h1>
                <div style={{ backgroundColor: NAVY, color: CREAM, padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
                  <h3 style={{ color: GOLD, margin: '0 0 15px 0' }}>Create New Allocation</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                    <input type="text" placeholder="Carpenter" value={allocateCarpenter} onChange={(e) => setAllocateCarpenter(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: 'none', fontSize: '13px' }} />
                    <input type="date" value={allocateStartDate} onChange={(e) => setAllocateStartDate(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: 'none', fontSize: '13px' }} />
                    <button onClick={() => { if (allocateCarpenter && allocateStartDate) { alert('Allocation created (demo)'); setAllocateCarpenter(''); setAllocateStartDate(''); } }} style={{ padding: '10px', backgroundColor: GOLD, color: NAVY, border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Create</button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* CARPENTER PORTAL */}
      {user?.role === 'carpenter' && (
        <div style={{ display: 'flex', height: 'calc(100vh - 70px)' }}>
          <aside style={{ backgroundColor: NAVY, color: CREAM, width: '200px', padding: '20px', overflow: 'auto' }}>
            {['Schedule', 'My Sites', 'Allocations', 'Timesheets'].map(tab => (
              <button
                key={tab}
                onClick={() => setCarpenterTab(tab.toLowerCase().replace(' ', '-'))}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '12px',
                  marginBottom: '8px',
                  backgroundColor: carpenterTab === tab.toLowerCase().replace(' ', '-') ? GOLD : 'transparent',
                  color: carpenterTab === tab.toLowerCase().replace(' ', '-') ? NAVY : CREAM,
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: carpenterTab === tab.toLowerCase().replace(' ', '-') ? 'bold' : 'normal'
                }}
              >
                {tab}
              </button>
            ))}
          </aside>
          <main style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
            <h1 style={{ color: NAVY }}>Welcome, {user.name}</h1>
            <p style={{ color: '#666' }}>Site: <strong>{user.site}</strong> | Builder: <strong>{user.builder}</strong></p>
            <div style={{ marginTop: '30px', backgroundColor: NAVY, color: CREAM, padding: '20px', borderRadius: '8px' }}>
              <h3 style={{ color: GOLD }}>Your Current Allocation</h3>
              <p style={{ margin: '10px 0 0 0' }}>Next 5 working days of scheduled work appear here.</p>
            </div>
          </main>
        </div>
      )}

      {/* SITE MANAGER PORTAL */}
      {user?.role === 'site_manager' && (
        <div style={{ display: 'flex', height: 'calc(100vh - 70px)' }}>
          <aside style={{ backgroundColor: NAVY, color: CREAM, width: '200px', padding: '20px', overflow: 'auto' }}>
            {['Overview', 'Daily Log', 'Plots', 'Team'].map(tab => (
              <button
                key={tab}
                onClick={() => setSiteManagerTab(tab.toLowerCase())}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '12px',
                  marginBottom: '8px',
                  backgroundColor: siteManagerTab === tab.toLowerCase() ? GOLD : 'transparent',
                  color: siteManagerTab === tab.toLowerCase() ? NAVY : CREAM,
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: siteManagerTab === tab.toLowerCase() ? 'bold' : 'normal'
                }}
              >
                {tab}
              </button>
            ))}
          </aside>
          <main style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
            <h1 style={{ color: NAVY }}>Site Manager: {user.name}</h1>
            <p style={{ color: '#666' }}>Managing: <strong>{user.site}</strong></p>
            <div style={{ marginTop: '30px' }}>
              <h2 style={{ color: NAVY }}>Daily Overview</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <div style={{ backgroundColor: NAVY, color: CREAM, padding: '15px', borderRadius: '8px' }}>
                  <p style={{ margin: '0', fontSize: '12px', opacity: 0.8 }}>Active Allocations</p>
                  <p style={{ margin: '5px 0 0 0', fontSize: '20px', color: GOLD, fontWeight: 'bold' }}>{allocations.filter(a => a.site === user.site && a.status !== 'complete').length}</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}

      {/* INVOICE PORTAL */}
      {user?.role === 'invoice' && (
        <div style={{ display: 'flex', height: 'calc(100vh - 70px)' }}>
          <aside style={{ backgroundColor: NAVY, color: CREAM, width: '200px', padding: '20px', overflow: 'auto' }}>
            {['Pending', 'Approved', 'Paid'].map(tab => (
              <button
                key={tab}
                onClick={() => setInvoiceTab(tab.toLowerCase())}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '12px',
                  marginBottom: '8px',
                  backgroundColor: invoiceTab === tab.toLowerCase() ? GOLD : 'transparent',
                  color: invoiceTab === tab.toLowerCase() ? NAVY : CREAM,
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: invoiceTab === tab.toLowerCase() ? 'bold' : 'normal'
                }}
              >
                {tab} ({invoices.filter(i => i.status === tab.toLowerCase()).length})
              </button>
            ))}
          </aside>
          <main style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
            <h1 style={{ color: NAVY }}>Invoice Management</h1>
            <div style={{ overflowX: 'auto', marginTop: '20px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: NAVY, color: CREAM }}>
                    <th style={{ padding: '10px', textAlign: 'left', fontSize: '12px' }}>Carpenter</th>
                    <th style={{ padding: '10px', textAlign: 'left', fontSize: '12px' }}>Site</th>
                    <th style={{ padding: '10px', textAlign: 'left', fontSize: '12px' }}>Stage</th>
                    <th style={{ padding: '10px', textAlign: 'left', fontSize: '12px' }}>Amount</th>
                    <th style={{ padding: '10px', textAlign: 'left', fontSize: '12px' }}>Date</th>
                    <th style={{ padding: '10px', textAlign: 'left', fontSize: '12px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.filter(i => i.status === invoiceTab).map((inv, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ padding: '10px', fontSize: '12px' }}>{inv.carpenter}</td>
                      <td style={{ padding: '10px', fontSize: '12px' }}>{inv.site}</td>
                      <td style={{ padding: '10px', fontSize: '12px' }}>{inv.stage}</td>
                      <td style={{ padding: '10px', fontSize: '12px', color: GOLD, fontWeight: 'bold' }}>£{inv.amount}</td>
                      <td style={{ padding: '10px', fontSize: '12px' }}>{inv.date}</td>
                      <td style={{ padding: '10px' }}>{invoiceTab === 'pending' && <button style={{ padding: '4px 8px', backgroundColor: GOLD, color: NAVY, border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>Approve</button>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
