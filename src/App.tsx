import React, { useState, useEffect, useRef } from "react";
import { supabase, loginWithPin, fetchWorkLog, addWorkLogEntry, updateWorkLogEntry, fetchAllocations, addAllocation, updateAllocation, fetchInvoices, addInvoice, updateInvoice, fetchDelays, addDelay, fetchNotifications, addNotification, fetchNotificationResponses, upsertNotificationResponse, fetchFixingRequests, addFixingRequest as addFixingReq, fetchSiteFiles, addSiteFile, addSiteFilePhoto, fetchPriceLists, fetchUsers, uploadPhoto, subscribeToAll } from './supabase';
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
const GALLERY_PHOTOS={joists:[{src:j1,caption:"I-beam joists with joist hangers — first floor"},{src:j2,caption:"Stairwell opening marked out on structural decking"},{src:j3,caption:"Structural decking complete — first floor"},{src:j4,caption:"I-beam floor joists with strutting"},{src:j5,caption:"Floor joists with trimming around stairwell"},{src:j6,caption:"Completed structural floor with Peel Clean Xtra"},{src:j7,caption:"I-beam joists — first floor installation"},{src:j8,caption:"Completed decked floor from scaffold"},{src:j9,caption:"Floor joists with herringbone strutting"},{src:j10,caption:"Structural decking with loft hatch opening"},{src:j11,caption:"Decked floor — wide angle view across site"},{src:j12,caption:"First floor joists with trimmer detail"},{src:j13,caption:"Structural decking complete — side elevation"},{src:j14,caption:"Decked floor with stairwell marked — site view"},{src:j15,caption:"Completed structural floor — elevated view"},{src:j16,caption:"Joists and decking — finished first floor"}],roofs:[{src:rf1,caption:"Trussed rafter installation — gable end"},{src:rf2,caption:"Roof trusses from scaffold level"},{src:rf3,caption:"Trussed rafters with bracing"},{src:rf4,caption:"Front door canopy — porch carpentry"},{src:rf5,caption:"Cut roof structure — hipped roof from above"}],"first-fix":[{src:ff1,caption:"Stud partitions & door linings — first floor"},{src:ff2,caption:"Staircase installation with safety barrier"},{src:ff3,caption:"Stud framing around staircase opening"},{src:ff4,caption:"Winder staircase installation"},{src:ff5,caption:"Dormer room stud partitions"},{src:ff6,caption:"Loft room framing with Velux window"},{src:ff7,caption:"Ground floor stud partitions & door linings"},{src:ff8,caption:"Under-stair framing detail"}],"second-fix":[],finals:[],extras:[]};
const BUILDERS=[{id:"barratt",name:"Barratt Homes",color:"#E31937",logo:"https://www.barratthomes.co.uk/favicon.ico",relationship:"Our partnership with Barratt Homes stretches back over a decade. They trust M&W to deliver consistently across multiple sites.",sites:[{name:"Thoresby Vale",location:"Edwinstowe, Mansfield",lat:53.177,lng:-1.069,housetypes:["Windermere","Holden","Moresby","Kennett","Radleigh"]},{name:"Romans' Quarter",location:"Bingham, Nottingham",lat:52.949,lng:-1.0,housetypes:["Hollinwood","Bradgate","Moresby","Alderney"]},{name:"Dunstall Park",location:"Tamworth, Staffordshire",lat:52.634,lng:-1.693,housetypes:["Windermere","Archford","Holden","Kennett"]},{name:"Poppy Fields",location:"Uttoxeter, Staffordshire",lat:52.898,lng:-1.86,housetypes:["Maidstone","Ellerton","Denford"]},{name:"Bertelin Fields",location:"Beaconside, Stafford",lat:52.826,lng:-2.117,housetypes:["Windermere","Archford","Kennett","Moresby"]}]},{id:"dwh",name:"Lovell Homes",color:"#1B3D6F",logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_en-0IYbjSLWr1dCt62dPp1evg0udhiAZXg&s",relationship:"Our carpenters understand the higher specification that Lovell developments demand.",sites:[{name:"Old Mill Farm",location:"Cotgrave, Nottingham",lat:52.917,lng:-1.046,housetypes:["Holden","Kingsley","Layton","Windermere"]},{name:"Berry Hill",location:"Mansfield",lat:53.148,lng:-1.188,housetypes:["Hollinwood","Bradgate","Exeter"]},{name:"Gateford Park",location:"Worksop, Nottinghamshire",lat:53.321,lng:-1.132,housetypes:["Radleigh","Holden","Moresby"]}]},{id:"bellway",name:"Bellway Homes",color:"#003DA5",logo:"https://s3-eu-west-1.amazonaws.com/tpd/logos/58932caa0000ff00059bf27f/0x0.png",relationship:"Bellway is one of our longest-standing partners across their East Midlands division.",sites:[{name:"The Meadows",location:"Alvaston, Derby",lat:52.893,lng:-1.434,housetypes:["Joiner","Craftsman","Turner","Tanner","Weaver"]},{name:"Holbrook Park",location:"Chellaston, Derby",lat:52.873,lng:-1.437,housetypes:["Craftsman","Joiner","Turner","Weaver","Cooper"]},{name:"Coppice Heights",location:"Ripley, Derbyshire",lat:53.051,lng:-1.405,housetypes:["Joiner","Turner","Tanner","Fletcher"]},{name:"Springwood",location:"Midway, S. Derbyshire",lat:52.773,lng:-1.542,housetypes:["Joiner","Craftsman","Turner","Weaver"]},{name:"Hugglescote Grange",location:"Hugglescote, Leicestershire",lat:52.727,lng:-1.362,housetypes:["Craftsman","Turner","Cooper","Fletcher"]},{name:"Abbey Fields Grange",location:"Hucknall, Nottinghamshire",lat:53.033,lng:-1.195,housetypes:["Tanner","Weaver","Turner","Joiner"]},{name:"Ashlands",location:"Sutton in Ashfield, Notts",lat:53.128,lng:-1.255,housetypes:["Joiner","Craftsman","Turner"]},{name:"Torvill Park",location:"Fairham, Nottingham",lat:52.909,lng:-1.163,housetypes:["Craftsman","Turner","Tanner","Weaver"]}]},{id:"persimmon",name:"Persimmon Homes",color:"#D4002A",logo:"https://cdn.prod.website-files.com/65a518d6a768fc381c83acf8/65a518d6a768fc381c83b06d_2020_Persimmon_1.png",relationship:"A fast-paced partnership built on trust across Derbyshire, Nottinghamshire, and Leicestershire.",sites:[{name:"Clipstone Park",location:"Clipstone, Mansfield",lat:53.167,lng:-1.137,housetypes:["Bedale","Alnwick","Byford","Bolsover","Kielder"]},{name:"The Oaks",location:"Calverton, Notts",lat:53.033,lng:-1.093,housetypes:["Bedale","Alnwick","Bolsover","Kielder"]},{name:"Boulton Moor",location:"Chellaston, Derby",lat:52.872,lng:-1.413,housetypes:["Bedale","Alnwick","Bolsover","Kielder","Roseberry"]},{name:"Jubilee Gardens",location:"Ilkeston, Derbyshire",lat:52.972,lng:-1.307,housetypes:["Bedale","Byford","Alnwick","Bolsover"]},{name:"Brascote Park",location:"Brascote, Leicestershire",lat:52.607,lng:-1.36,housetypes:["Bedale","Alnwick","Bolsover","Kielder"]},{name:"Foxley Fields",location:"Market Harborough, Leics",lat:52.478,lng:-0.918,housetypes:["Kielder","Roseberry","Alnwick","Bolsover"]}]},{id:"stmodwen",name:"St. Modwen Homes",color:"#6B2D5B",logo:"https://ramsboards.com/wp-content/uploads/2021/01/st.modwen-homes.webp",relationship:"With their head office in Derby, St. Modwen are a natural partner for M&W.",sites:[{name:"Hilton Valley",location:"Hilton, Derbyshire",lat:52.862,lng:-1.596,housetypes:["Arden","Berwick","Carleton","Danbury"]},{name:"Bramshall Meadows",location:"Uttoxeter, Staffordshire",lat:52.907,lng:-1.847,housetypes:["Arden","Berwick","Carleton","Elmswell"]},{name:"Snibston Mill",location:"Coalville, Leicestershire",lat:52.725,lng:-1.37,housetypes:["Arden","Carleton","Danbury","Elmswell"]},{name:"Egstow Park",location:"Clay Cross, Derbyshire",lat:53.163,lng:-1.413,housetypes:["Berwick","Carleton","Danbury"]}]},{id:"countryside",name:"Countryside Homes",color:"#2B6E44",logo:"https://nla-production-media.s3.eu-west-2.amazonaws.com/84908/Untitled-design-15.png?v=1766430558",relationship:"M&W support their Midlands mixed-tenure developments.",sites:[{name:"Edwalton Fields",location:"Edwalton, Nottingham",lat:52.917,lng:-1.12,housetypes:["Thornbury","Wentworth","Henley","Sudbury"]},{name:"Mastin Moor",location:"Chesterfield, Derbyshire",lat:53.267,lng:-1.342,housetypes:["Thornbury","Henley","Sudbury"]}]},{id:"vistry",name:"Vistry / Bovis Homes",color:"#00594F",logo:"https://housingforum.org.uk/wp-content/uploads/2020/05/Untitled-design.png",relationship:"Our work on Broadnook Garden Village is a testament to their trust in M&W.",sites:[{name:"Broadnook Garden Village",location:"Rothley, Leicestershire",lat:52.719,lng:-1.138,housetypes:["Limewood","Fern","Lime","Oak","Willow"]},{name:"Partridge Walk",location:"Stafford",lat:52.808,lng:-2.101,housetypes:["Limewood","Oak","Willow","Cedar"]},{name:"Hinckley 475",location:"Hinckley, Leicestershire",lat:52.54,lng:-1.37,housetypes:["Limewood","Fern","Oak","Willow"]}]},{id:"ashberry",name:"Ashberry Homes",color:"#7B3F98",logo:"https://www.ashberryhomes.co.uk/img/default-social-image.jpg",relationship:"M&W deliver consistently across Ashberry's Nottinghamshire sites.",sites:[{name:"Potters Gate",location:"Farndon, Newark",lat:53.064,lng:-0.856,housetypes:["Greenwood","Oakwood","Birchwood"]},{name:"Swinfen Vale",location:"Swinfen, Staffordshire",lat:52.667,lng:-1.755,housetypes:["Greenwood","Oakwood","Elmwood","Birchwood"]},{name:"Longridge",location:"Long Eaton, Notts",lat:52.89,lng:-1.275,housetypes:["Greenwood","Oakwood","Elmwood","Birchwood"]}]},{id:"davidsons",name:"Davidsons Homes",color:"#C8102E",logo:"https://davidsonsgroup.co.uk/wp-content/uploads/2023/01/Screenshot-2023-01-03-at-16.53.01-1024x522.png",relationship:"Davidsons are a well-respected Midlands developer. We're proud to be part of their supply chain.",sites:[{name:"Davidsons at Huncote",location:"Huncote, Leicestershire",lat:52.582,lng:-1.218,housetypes:["The Arden","The Warwick","The Ashby","The Leamington"]},{name:"Davidsons at Boulton Moor",location:"Derby",lat:52.878,lng:-1.418,housetypes:["The Arden","The Warwick","The Kenilworth"]}]},{id:"wheeldons",name:"Wheeldon Homes",color:"#2E4057",logo:"https://www.panddg.co.uk/wp-content/uploads/2022/02/logo-wheeldon-homes.svg",relationship:"A boutique developer that values the personal service M&W bring.",sites:[{name:"Oaklands",location:"Etwall, South Derbyshire",lat:52.871,lng:-1.599,housetypes:["The Chatsworth","The Haddon","The Calke"]},{name:"Derwentside",location:"Derwentside, Derbyshire",lat:52.92,lng:-1.48,housetypes:["The Chatsworth","The Haddon","The Calke"]},{name:"The Green",location:"Church Broughton, Derby",lat:52.857,lng:-1.66,housetypes:["The Chatsworth","The Haddon"]}]},{id:"crest",name:"Crest Nicholson",color:"#003C71",logo:"https://www.crestnicholson.com/favicon.ico",relationship:"M&W meet Crest Nicholson's exacting standards on every element.",sites:[{name:"Barley Fields",location:"Queniborough, Leicestershire",lat:52.697,lng:-1.08,housetypes:["Elm","Beech","Maple","Rowan","Birch"]}]}];
const PAST_PROJECTS=[{year:"2024-25",builder:"Bellway",site:"Holbrook Park Ph1",location:"Chellaston",units:167,scope:"Full package"},{year:"2023-25",builder:"Persimmon",site:"Boulton Moor",location:"Chellaston",units:245,scope:"Full package"},{year:"2023-24",builder:"Barratt",site:"Thoresby Vale Ph2",location:"Mansfield",units:180,scope:"Full package"},{year:"2022-24",builder:"St. Modwen",site:"Hilton Valley Ph3",location:"Hilton",units:120,scope:"1st & 2nd fix"},{year:"2021-23",builder:"Persimmon",site:"Jubilee Gardens",location:"Ilkeston",units:200,scope:"Full package"},{year:"2020-22",builder:"Barratt",site:"Dunstall Park",location:"Tamworth",units:280,scope:"Full package"},{year:"2019-21",builder:"Bellway",site:"The Meadows Ph1",location:"Alvaston",units:78,scope:"Full package"},{year:"2018-20",builder:"Persimmon",site:"Clipstone Park",location:"Mansfield",units:190,scope:"Full package"},{year:"2017-19",builder:"Bellway",site:"Coppice Heights",location:"Ripley",units:130,scope:"Full package"},{year:"2016-18",builder:"Persimmon",site:"Carlton View",location:"Gedling",units:170,scope:"Full package"},{year:"2015-17",builder:"Bellway",site:"Hugglescote Grange",location:"Leicestershire",units:140,scope:"Full package"},{year:"2014-16",builder:"Barratt",site:"Grange Park",location:"Loughborough",units:220,scope:"Full package"},{year:"2012-14",builder:"Bellway",site:"Stenson Fields",location:"Derby",units:250,scope:"Full package"},{year:"2010-12",builder:"Persimmon",site:"Wollaton Vale",location:"Nottingham",units:200,scope:"Full package"},{year:"2008-10",builder:"Barratt",site:"Chestnut Grove",location:"Long Eaton",units:140,scope:"Full package"},{year:"2005-07",builder:"Bellway",site:"Millbrook Park",location:"Stapleford",units:85,scope:"Full package"}];
const SERVICES=[{id:"joists",title:"Joists & Structural Floors",icon:"┃",desc:"All structural timber floor systems to NHBC standards.",subs:[{n:"Joist Types",items:["Masonry Hanger Joists","Joist Hanger to Trimmer","Change of Direction","I-Beam / Engineered","Traditional Softwood"]},{n:"Floor Construction",items:["Semi-Detached Party Floor","Strutting & Noggins","Structural Decking","Fire Stopping"]}]},{id:"roofs",title:"Roof Construction",icon:"△",desc:"Full roof erection through to weathertight.",subs:[{n:"Roof Types",items:["Straight Up & Over","Gable Elevations","Hipped Roofs","Valley Roofs","Dormer Construction"]},{n:"Roof Details",items:["Open Eaves","Boxed Soffit","Gable Ladders","Box Ends","Fascia & Barge Boards","Roof Bracing"]}]},{id:"first-fix",title:"First Fix Carpentry",icon:"▣",desc:"All carpentry before plastering.",subs:[{n:"Traditional (Blockwork)",items:["Staircase Installation","Stud Partitions","Bulkheads","Door Linings","Window Boards","Pipe Boxing","Loft Hatches","Solar Panel Stands"]},{n:"Timber Frame",items:["Frame Erection","Squaring & Levelling","Panel Stitching","Party Walls","Floor Cassettes","Breather Membrane","Fire Stopping & Cavity Barriers"]}]},{id:"second-fix",title:"Second Fix Carpentry",icon:"▤",desc:"All finishing carpentry after plastering.",subs:[{n:"Traditional Doors",items:["Door Trimming & Fitting","Hinging","Latch & Lock Fitting","Fire Door Hanging"]},{n:"Prehung Casings",items:["Prehung Installation","Levelling & Packing","Fire-Rated Sets"]},{n:"Standard Spec",items:["Standard Skirting (68/94mm)","Standard Architrave","Standard Staircase"]},{n:"Premium Spec",items:["Premium Skirting (119-168mm)","Premium Architrave + Plinth Blocks","Oak Staircase","Engineered Hardwood Flooring","Panelling & Wainscoting"]}]},{id:"finals",title:"Final Fix",icon:"◆",desc:"All final items to handover standard.",subs:[{n:"Included",items:["Door Handles & Furnishings","Ironmongery - Locks, Latches & Keeps","Bath Panel","Front Door Accessories"]}]},{id:"extras",title:"Unique Works",icon:"\u25C7",desc:"Remedial & snagging work for other contractors.",subs:[{n:"Remedial Services",items:["Rectifying defective carpentry by other contractors","Door realignment & rehinging","Skirting & architrave replacement","Staircase remedials","Floor levelling & joist repairs"]},{n:"Snagging Support",items:["NHBC inspection preparation for other sites","Pre-completion snagging lists","Warranty defect repairs","Fire door compliance remedials","Builder handover support"]}]}];
const DEMO_CARPS=[];
const HOLBROOK_PLOTS=Array.from({length:40},(_,i)=>{const n=i+1;const stages=["Not Started","Joists","Joists Complete","Roofs","Roofs Complete","First Fix","First Fix Complete","Second Fix","Second Fix Complete","Finals","Complete"];const si=n<=8?10:n<=14?8:n<=20?6:n<=28?4:n<=34?2:0;return{plot:n,stage:stages[si],carpenter:n<=8?"Various":n<=14?"Richard Wileman":n<=20?"Neil Hines":n<=28?"Charlie Dillon":n<=34?"Neil Goodwin":"Unallocated",houseType:["Craftsman","Joiner","Turner","Tanner","Weaver"][i%5]};});
const ALL_CARPS=[{id:"C011",name:"Richard Wileman",pin:"3002",site:"Swinfen Vale",builder:"Ashberry Homes",status:"active"},{id:"C012",name:"Charlie Dillon",pin:"3003",site:"Swinfen Vale",builder:"Ashberry Homes",status:"active"},{id:"C013",name:"Ian Johnson",pin:"3004",site:"Brascote Park",builder:"Persimmon Homes",status:"active"},{id:"C014",name:"Neil Hines",pin:"3006",site:"Springwood",builder:"Bellway Homes",status:"active"},{id:"C015",name:"Neil Goodwin",pin:"3008",site:"Derwentside",builder:"Wheeldon Homes",status:"active"},{id:"C016",name:"Rob Jones",pin:"3010",site:"Snibston Mill",builder:"St. Modwen Homes",status:"active"}];
const ALL_PRICE_LISTS=[{builder:"Barratt Homes",color:"#E31937",sites:[{site:"Thoresby Vale",rates:[["Joists — GF","£440"],["Joists — FF","£400"],["Roof (trussed)","£720"],["First Fix","£1,200"],["Second Fix","£1,350"],["Finals","£240"]]},{site:"Dunstall Park",rates:[["Joists — GF","£460"],["Joists — FF","£420"],["Roof (trussed)","£750"],["First Fix","£1,250"],["Second Fix","£1,400"],["Finals","£250"]]}]},{builder:"Lovell Homes",color:"#1B3D6F",sites:[{site:"Old Mill Farm",rates:[["Joists — GF","£480"],["Joists — FF","£440"],["Roof (trussed)","£780"],["First Fix","£1,300"],["Second Fix","£1,450"],["Finals","£260"]]},{site:"Berry Hill",rates:[["Joists — GF","£470"],["Joists — FF","£430"],["Roof (trussed)","£760"],["First Fix","£1,280"],["Second Fix","£1,420"],["Finals","£255"]]}]},{builder:"Bellway Homes",color:"#003DA5",sites:[{site:"Holbrook Park",rates:[["Joists — GF","£450"],["Joists — FF","£410"],["Roof (trussed)","£730"],["First Fix","£1,220"],["Second Fix","£1,380"],["Finals","£245"]]},{site:"Coppice Heights",rates:[["Joists — GF","£445"],["Joists — FF","£405"],["Roof (cut)","£1,050"],["First Fix","£1,210"],["Second Fix","£1,360"],["Finals","£240"]]},{site:"The Meadows",rates:[["Joists — GF","£455"],["Joists — FF","£415"],["Roof (trussed)","£740"],["First Fix","£1,230"],["Second Fix","£1,390"],["Finals","£248"]]}]},{builder:"Persimmon Homes",color:"#D4002A",sites:[{site:"Clipstone Park",rates:[["Joists — GF","£420"],["Joists — FF","£380"],["Roof (trussed)","£700"],["First Fix","£1,150"],["Second Fix","£1,300"],["Finals","£230"]]},{site:"Boulton Moor",rates:[["Joists — GF","£430"],["Joists — FF","£390"],["Roof (trussed)","£710"],["First Fix","£1,180"],["Second Fix","£1,320"],["Finals","£235"]]}]},{builder:"St. Modwen Homes",color:"#6B2D5B",sites:[{site:"Hilton Valley",rates:[["Joists — GF","£460"],["Joists — FF","£420"],["Roof (trussed)","£740"],["First Fix","£1,240"],["Second Fix","£1,380"],["Finals","£250"]]}]},{builder:"Countryside Homes",color:"#2B6E44",sites:[{site:"Edwalton Fields",rates:[["Joists — GF","£470"],["Joists — FF","£430"],["Roof (trussed)","£760"],["First Fix","£1,280"],["Second Fix","£1,420"],["Finals","£258"]]}]},{builder:"Vistry / Bovis",color:"#00594F",sites:[{site:"Broadnook Garden Village",rates:[["Joists — GF","£480"],["Joists — FF","£440"],["Roof (trussed)","£770"],["First Fix","£1,300"],["Second Fix","£1,450"],["Finals","£265"]]}]},{builder:"Ashberry Homes",color:"#7B3F98",sites:[{site:"Potters Gate",rates:[["Joists — GF","£440"],["Joists — FF","£400"],["Roof (trussed)","£720"],["First Fix","£1,200"],["Second Fix","£1,350"],["Finals","£240"]]}]},{builder:"Davidsons Homes",color:"#C8102E",sites:[{site:"Davidsons at Huncote",rates:[["Joists — GF","£420"],["Joists — FF","£380"],["Roof (trussed)","£680"],["First Fix","£1,150"],["Second Fix","£1,280"],["Finals","£220"]]}]},{builder:"Wheeldon Homes",color:"#2E4057",sites:[{site:"Oaklands, Etwall",rates:[["Joists — GF","£490"],["Joists — FF","£450"],["Roof (cut)","£1,100"],["First Fix","£1,350"],["Second Fix","£1,520"],["Finals","£280"]]}]},{builder:"Crest Nicholson",color:"#003C71",sites:[{site:"Barley Fields",rates:[["Joists — GF","£475"],["Joists — FF","£435"],["Roof (trussed)","£770"],["First Fix","£1,300"],["Second Fix","£1,460"],["Finals","£265"]]}]}];
const DEMO_DOCS_BY_SITE={"Holbrook Park":[{cat:"Floorplans",docs:["Craftsman — Ground Floor","Craftsman — First Floor","Joiner — Ground Floor","Joiner — First Floor","Turner — Ground Floor","Turner — First Floor"]},{cat:"Technical Drawings",docs:["Craftsman — Roof Plan","Joiner — Roof Plan","Turner — Roof Plan"]},{cat:"Site Documents",docs:["Holbrook Park — Site Layout","Holbrook Park — H&S Pack","Bellway Specification Book"]}],"Coppice Heights":[{cat:"Floorplans",docs:["Joiner — Ground Floor","Joiner — First Floor","Turner — Ground Floor","Turner — First Floor"]},{cat:"Site Documents",docs:["Coppice Heights — Site Layout","Coppice Heights — H&S Pack"]}]};

const CARPENTERS = [
  { id: "C011", name: "Richard Wileman", pin: "3002", site: "Swinfen Vale", builder: "Ashberry Homes", status: "active" },
  { id: "C012", name: "Charlie Dillon", pin: "3003", site: "Swinfen Vale", builder: "Ashberry Homes", status: "active" },
  { id: "C013", name: "Ian Johnson", pin: "3004", site: "Brascote Park", builder: "Persimmon Homes", status: "active" },
  { id: "C014", name: "Neil Hines", pin: "3006", site: "Springwood", builder: "Bellway Homes", status: "active" },
  { id: "C015", name: "Neil Goodwin", pin: "3008", site: "Derwentside", builder: "Wheeldon Homes", status: "active" },
  { id: "C016", name: "Rob Jones", pin: "3010", site: "Snibston Mill", builder: "St. Modwen Homes", status: "active" }
];

const SITE_MANAGERS = [
  { id: "SM003", name: "Michael Blake", pin: "3001", site: "Swinfen Vale", builder: "Ashberry Homes", role: "site_manager" },
  { id: "SM005", name: "Tim Allen", pin: "3007", site: "Springwood", builder: "Bellway Homes", role: "site_manager" },
  { id: "SM006", name: "Daniel Moody", pin: "3009", site: "Derwentside", builder: "Wheeldon Homes", role: "site_manager" }
];

const INITIAL_WORK_LOG = [
  { id: 1, site: "Swinfen Vale", builder: "Ashberry Homes", plot: "5", houseType: "Harcourt", stage: "Joist", expectedDays: 2, priority: "high", notes: "Ready Monday", status: "allocated", allocatedTo: "Richard Wileman" },
  { id: 2, site: "Swinfen Vale", builder: "Ashberry Homes", plot: "6", houseType: "Charwood / Clarendon", stage: "1st Fix", expectedDays: 2, priority: "medium", notes: "", status: "allocated", allocatedTo: "Charlie Dillon" },
  { id: 3, site: "Derwentside", builder: "Wheeldon Homes", plot: "12", houseType: "Hawksley", stage: "Main Roof", expectedDays: 2, priority: "high", notes: "Trusses delivered", status: "allocated", allocatedTo: "Neil Goodwin" },
  { id: 4, site: "Springwood", builder: "Bellway Homes", plot: "8", houseType: "Joiner", stage: "1st Fix", expectedDays: 2, priority: "medium", notes: "", status: "allocated", allocatedTo: "Neil Hines" },
  { id: 5, site: "Snibston Mill", builder: "St. Modwen Homes", plot: "14", houseType: "Arden", stage: "2nd Fix", expectedDays: 2, priority: "high", notes: "", status: "allocated", allocatedTo: "Rob Jones" },
  { id: 6, site: "Brascote Park", builder: "Persimmon Homes", plot: "22", houseType: "Bedale", stage: "Main Roof", expectedDays: 2, priority: "medium", notes: "", status: "allocated", allocatedTo: "Ian Johnson" },
  { id: 7, site: "Swinfen Vale", builder: "Ashberry Homes", plot: "7", houseType: "Evelyn / Fletcher", stage: "Joist", expectedDays: 2, priority: "medium", notes: "", status: "logged" },
  { id: 8, site: "Derwentside", builder: "Wheeldon Homes", plot: "15", houseType: "Milton", stage: "1st Fix", expectedDays: 2, priority: "high", notes: "", status: "logged" },
  { id: 9, site: "Springwood", builder: "Bellway Homes", plot: "10", houseType: "Turner", stage: "Main Roof", expectedDays: 2, priority: "medium", notes: "", status: "logged" },
  { id: 10, site: "Snibston Mill", builder: "St. Modwen Homes", plot: "18", houseType: "Carleton", stage: "3rd Fix", expectedDays: 1, priority: "low", notes: "", status: "logged" }
];

const PRICE_LISTS_BY_HOUSE_TYPE = {
  "Bellway Swinfen Vale": {
    "builder": "Bellway Homes",
    "site": "Swinfen Vale",
    "extras": {"Daywork":"£20/hr","Cut doors over carpets":"£5/door","Cut plinths refit over vinyl/tile":"£20/plot","Spandrel panels":"£35 each","Extend bracers & fit garage straps":"£20","MDF bulkhead":"£30","Single garage roof":"£200","Double garage roof":"£300","External doors":"£40"},
    "types": {
      "Harcourt":{"Joist":330,"Main Roof":700,"Low Roof FD":135,"Low Roof Rear":135,"1st Fix":850,"2nd Fix":850,"3rd Fix":210},
      "Charwood / Clarendon":{"Joist":255,"Main Roof":560,"Low Roof FD":135,"1st Fix":650,"2nd Fix":580,"3rd Fix":135},
      "Poppy / Blacksmith":{"Joist":200,"Main Roof":"220 MID / 290 END","Low Roof FD":60,"1st Fix":520,"2nd Fix":500,"3rd Fix":115},
      "Alysumm / Blenmere":{"Joist":280,"Main Roof":480,"Low Roof FD":60,"1st Fix":640,"2nd Fix":570,"3rd Fix":135},
      "Angelica / Bowyer":{"Joist":300,"Main Roof":530,"Low Roof FD":60,"Low Roof Rear":50,"1st Fix":700,"2nd Fix":620,"3rd Fix":160},
      "Evelyn / Fletcher":{"Joist":"210/210","Main Roof":700,"Low Roof FD":60,"1st Fix":900,"2nd Fix":850,"3rd Fix":200},
      "Aster / Goldsmith":{"Joist":320,"Main Roof":540,"Low Roof FD":60,"1st Fix":750,"2nd Fix":680,"3rd Fix":180},
      "Verbena / Mason":{"Joist":260,"Main Roof":500,"Low Roof FD":50,"Low Roof Rear":120,"1st Fix":650,"2nd Fix":600,"3rd Fix":140},
      "Jasmine / Scrivener":{"Joist":280,"Main Roof":600,"Low Roof FD":50,"1st Fix":740,"2nd Fix":640,"3rd Fix":160},
      "Betony / Shoemaker":{"Joist":200,"Main Roof":"220 MID / 290 END","Low Roof FD":120,"1st Fix":520,"2nd Fix":520,"3rd Fix":125},
      "Daphne / Spinner":{"Joist":"220/220","Main Roof":700,"Low Roof FD":50,"Low Roof Rear":120,"1st Fix":900,"2nd Fix":850,"3rd Fix":200},
      "Foxglove / Tanner":{"Joist":300,"Main Roof":680,"Low Roof FD":50,"1st Fix":620,"2nd Fix":580,"3rd Fix":125},
      "Delphinium / Wheelwright":{"Joist":"220/220","Main Roof":700,"Low Roof FD":50,"1st Fix":900,"2nd Fix":850,"3rd Fix":200},
      "Type D":{"Joist":240,"Main Roof":"220 MID / 270 END","Low Roof FD":40,"1st Fix":560,"2nd Fix":540,"3rd Fix":125},
      "Type B":{"Joist":220,"Main Roof":"220 MID / 250 END","Low Roof FD":40,"1st Fix":540,"2nd Fix":520,"3rd Fix":125},
      "Tunstall / Thornton":{"Main Roof":"580 SEMI","1st Fix":500,"2nd Fix":500,"3rd Fix":100},
      "Beattie":{"Low Roof FD":40,"1st Fix":220,"2nd Fix":200,"3rd Fix":90},
      "Beattie (600)":{"Main Roof":600,"Low Roof FD":40,"1st Fix":300,"2nd Fix":230,"3rd Fix":90}
    }
  },
  "Wheeldon Derwentside": {
    "builder": "Wheeldon Homes",
    "site": "Derwentside",
    "extras": {"Single garage roof":"£100","Twin garage roof":"£160","Extend bracers & fix gable straps":"£20","Daywork":"£20/hr","Garage door frames":"£15","External doors (each)":"£35"},
    "notes": "Cellotex included in 1st Fix price. Spandrell panels fitted with main roof.",
    "types": {
      "Alderwood":{"Joist":210,"Main Roof":180,"Low Roof":40,"1st Fix":540,"2nd Fix":520,"3rd Fix":110},
      "Bramley":{"Joist":220,"Main Roof":190,"Low Roof":40,"1st Fix":560,"2nd Fix":540,"3rd Fix":120},
      "Chestnut":{"Joist":"230 & 230","Main Roof":450,"Cellotex":120,"Low Roof":"40 Front 60 Rear","1st Fix":1000,"2nd Fix":900,"3rd Fix":240},
      "Cooper":{"Joist":240,"Main Roof":220,"Low Roof":"40 Front 60 Rear","1st Fix":600,"2nd Fix":645,"3rd Fix":135},
      "Hawksley":{"Joist":350,"Main Roof":500,"Low Roof":40,"1st Fix":750,"2nd Fix":750,"3rd Fix":160},
      "Maple":{"Joist":230,"Main Roof":200,"Low Roof":40,"1st Fix":585,"2nd Fix":550,"3rd Fix":130},
      "Milton":{"Joist":260,"Main Roof":260,"Low Roof":40,"1st Fix":690,"2nd Fix":655,"3rd Fix":135},
      "Nightingale":{"Joist":"230 & 230","Main Roof":220,"Low Roof":40,"1st Fix":900,"2nd Fix":900,"3rd Fix":240}
    }
  },
  "Davidsons Wellington Place": {
    "builder": "Davidsons",
    "site": "Wellington Place",
    "extras": {"Daywork":"£20/hr","GRP chimney":"£60 each","Cut doors over carpets":"£5/door","Cut plinths refit over vinyl/tile":"£20/plot","Extend bracers & fit garage straps":"£20"},
    "garages": {"SG1-4":"£145","LG1-4":"£145","SG4-4 Twin single side gable":"£120 (£240/twin)","LG4-4 Twin single side gable":"£120 (£240/twin)","SG10-4 Double hipped":"£460","LG10-4 Double hipped":"£460","SG200-4 Double & single hipped":"£280 (£560 total)"},
    "types": {
      "DH320R-4 Stanbrook":{"Joist":380,"Main Roof":420,"1st Fix":680,"2nd Fix":680,"3rd Fix":160,"Spandrel":60},
      "DH405G-4 Bradgate":{"Joist":450,"Low Roof FD":120,"Main Roof":750,"1st Fix":950,"2nd Fix":950,"3rd Fix":200,"Spandrel":60},
      "DH412G-4 Bicton":{"Joist":400,"Low Roof FD":80,"Low Roof Bay":80,"Low Roof Rear":150,"Low Roof Top Bay":150,"Main Roof":750,"1st Fix":950,"2nd Fix":950,"3rd Fix":210,"Spandrel":60},
      "DH434B-4 Southall":{"Joist":460,"Low Roof FD":80,"Low Roof Bay":120,"Low Roof Rear":150,"Main Roof":820,"1st Fix":1100,"2nd Fix":1100,"3rd Fix":230,"Spandrel":60},
      "DH403RG-4 Nearsborough":{"Joist":400,"Low Roof FD":130,"Low Roof Top Bay":150,"Main Roof":550,"1st Fix":750,"2nd Fix":750,"3rd Fix":200,"Spandrel":60},
      "DH408RS-3":{"Joist":400,"Low Roof FD":80,"Low Roof Rear":150,"Main Roof":1100,"1st Fix":800,"2nd Fix":800,"3rd Fix":200,"Spandrel":60},
      "DH254MH-4 Amberley":{"Joist":250,"2nd Joist":250,"Low Roof FD":50,"Main Roof":700,"1st Fix":750,"2nd Fix":700,"3rd Fix":150,"Spandrel":60},
      "DH301MHA-4 Thornton":{"Joist":235,"2nd Joist":235,"Low Roof FD":100,"Low Roof Rear":150,"Main Roof":750,"1st Fix":1050,"2nd Fix":1050,"3rd Fix":240,"Spandrel":60},
      "DH301MHB-4 Thornton":{"Joist":235,"2nd Joist":235,"Low Roof FD":100,"Low Roof Rear":150,"Main Roof":750,"1st Fix":1050,"2nd Fix":1050,"3rd Fix":240,"Spandrel":60},
      "DH301MHC-4 Thornton":{"Joist":235,"2nd Joist":235,"Low Roof FD":100,"Low Roof Rear":150,"Main Roof":750,"1st Fix":1050,"2nd Fix":1050,"3rd Fix":240,"Spandrel":60},
      "DH340L-4 Grove":{"Joist":300,"2nd Joist":300,"Low Roof FD":120,"Low Roof Bay":150,"Main Roof":400,"1st Fix":1100,"2nd Fix":1100,"3rd Fix":240,"Spandrel":60},
      "DH501G-4 Newstead":{"Joist":450,"2nd Joist":450,"Low Roof FD":100,"Low Roof Bay":80,"Main Roof":1400,"1st Fix":1300,"2nd Fix":1300,"3rd Fix":300,"Spandrel":60},
      "DH552G-4 Leicester":{"Joist":400,"2nd Joist":400,"Low Roof FD":100,"Low Roof Rear":150,"Main Roof":1400,"1st Fix":1300,"2nd Fix":1300,"3rd Fix":300,"Spandrel":60},
      "DH532B-4 Chesterfield":{"Joist":480,"Low Roof FD":80,"Low Roof Bay":150,"Low Roof Top Bay":140,"Main Roof":1400,"1st Fix":1400,"2nd Fix":1400,"3rd Fix":300,"Spandrel":60},
      "DH501BB-4 Poets House":{"Joist":450,"2nd Joist":450,"Low Roof FD":100,"Low Roof Bay":80,"Main Roof":1400,"1st Fix":1300,"2nd Fix":1300,"3rd Fix":300,"Spandrel":60},
      "DH201B-4":{"Joist":220,"Main Roof":300,"1st Fix":450,"2nd Fix":450,"3rd Fix":100,"Spandrel":60},
      "DH202B-4":{"Joist":220,"Main Roof":300,"1st Fix":450,"2nd Fix":450,"3rd Fix":100,"Spandrel":60},
      "DH301GE-4 Thornton":{"Joist":230,"Low Roof FD":80,"Low Roof Rear":150,"Main Roof":750,"1st Fix":1050,"2nd Fix":1050,"3rd Fix":240,"Spandrel":60},
      "DH312G-4 Hutton":{"Joist":300,"Low Roof FD":100,"Low Roof Bay":60,"Main Roof":500,"1st Fix":670,"2nd Fix":670,"3rd Fix":160,"Spandrel":60},
      "DH313B-4 Ford":{"Joist":285,"Low Roof FD":80,"Low Roof Bay":60,"Main Roof":580,"1st Fix":690,"2nd Fix":690,"3rd Fix":160,"Spandrel":60},
      "DH318-B-4 Blaby":{"Joist":285,"Low Roof FD":80,"Low Roof Bay":60,"Low Roof Rear":150,"Main Roof":500,"1st Fix":700,"2nd Fix":700,"3rd Fix":160,"Spandrel":60},
      "DH330V-4 Alford":{"Joist":330,"Low Roof FD":50,"Low Roof Top Bay":150,"Main Roof":500,"1st Fix":700,"2nd Fix":700,"3rd Fix":160,"Spandrel":60},
      "DH342G-4 Moreley":{"Joist":330,"Low Roof FD":100,"Main Roof":600,"1st Fix":730,"2nd Fix":730,"3rd Fix":200,"Spandrel":60},
      "DH400B-4 Lincoln":{"Joist":330,"Low Roof FD":80,"Low Roof Bay":80,"Low Roof Rear":150,"Main Roof":550,"1st Fix":720,"2nd Fix":720,"3rd Fix":190,"Spandrel":60},
      "DH409GG-4 Castleton":{"Joist":420,"Low Roof FD":100,"Low Roof Rear":150,"Main Roof":500,"1st Fix":1050,"2nd Fix":1050,"3rd Fix":240,"Spandrel":60},
      "DH418V-4 Featherstone":{"Joist":400,"Low Roof Bay":80,"Main Roof":650,"1st Fix":900,"2nd Fix":900,"3rd Fix":200,"Spandrel":60},
      "DH422GR-4 Kibworth":{"Joist":440,"Low Roof FD":100,"Main Roof":1500,"1st Fix":1000,"2nd Fix":1000,"3rd Fix":200},
      "DH425G-4 Barnwell":{"Joist":400,"Low Roof FD":100,"Low Roof Rear":150,"Main Roof":500,"1st Fix":950,"2nd Fix":950,"3rd Fix":210,"Spandrel":60},
      "DH425GH-4 Barnwell":{"Joist":400,"Low Roof FD":100,"Low Roof Rear":150,"Main Roof":1500,"1st Fix":950,"2nd Fix":950,"3rd Fix":210},
      "DH427B-4 Bolsover":{"Joist":400,"Low Roof FD":120,"Low Roof Bay":180,"Low Roof Rear":150,"Main Roof":600,"1st Fix":900,"2nd Fix":900,"3rd Fix":200,"Spandrel":60},
      "DH430B-4 Darlington":{"Joist":400,"Low Roof FD":120,"Low Roof Bay":180,"Low Roof Rear":150,"Main Roof":700,"1st Fix":900,"2nd Fix":900,"3rd Fix":200,"Spandrel":60},
      "DH452B-4 Draycott":{"Joist":440,"Low Roof FD":100,"Low Roof Bay":80,"Low Roof Rear":150,"Main Roof":700,"1st Fix":930,"2nd Fix":930,"3rd Fix":200,"Spandrel":60},
      "DH422G-4 Kibworth":{"Joist":440,"Low Roof FD":100,"Main Roof":1500,"1st Fix":1000,"2nd Fix":1000,"3rd Fix":200},
      "DH430R-4 Darlington":{"Joist":400,"Low Roof FD":120,"Low Roof Bay":180,"Low Roof Rear":150,"Main Roof":700,"1st Fix":900,"2nd Fix":900,"3rd Fix":200,"Spandrel":60},
      "DH404GH-4 Winchester":{"Joist":440,"Low Roof FD":100,"Main Roof":1200,"1st Fix":1020,"2nd Fix":1020,"3rd Fix":220,"Spandrel":60},
      "DH409GH-4 Castleton":{"Joist":420,"Low Roof FD":100,"Low Roof Rear":150,"Main Roof":1200,"1st Fix":1050,"2nd Fix":1050,"3rd Fix":240,"Spandrel":60},
      "SH34BRE-3":{"Joist":230,"1st Fix":250,"2nd Fix":550,"3rd Fix":550,"Spandrel":135,"3rd Fix 2":60},
      "SH34BRI-3":{"Joist":230,"1st Fix":250,"2nd Fix":550,"3rd Fix":550,"Spandrel":135,"3rd Fix 2":60},
      "SH35BG-3":{"Joist":238,"Low Roof FD":80,"1st Fix":370,"2nd Fix":550,"3rd Fix":550,"Spandrel":135,"3rd Fix 2":60}
    }
  },
  "Lovell Castle Gresley": {
    "builder": "Lovell Homes",
    "site": "Castle Gresley",
    "extras": {"Daywork":"£20/hr","Cut doors over carpets":"£5/door","Cut plinths refit over vinyl/tile":"£20/plot","Spandrel panels":"£50"},
    "types": {
      "Type A":{"Joist":225,"Main Roof":260,"Low Roof":80,"1st Fix":530,"2nd Fix":500,"3rd Fix":125},
      "Type B":{"Joist":240,"Main Roof":240,"Low Roof":80,"1st Fix":580,"2nd Fix":530,"3rd Fix":125},
      "Type C":{"Joist":200,"Main Roof":210,"Low Roof":80,"1st Fix":450,"2nd Fix":470,"3rd Fix":110},
      "Type D":{"Joist":300,"Main Roof":450,"Low Roof":80,"1st Fix":650,"2nd Fix":570,"3rd Fix":135},
      "Type E":{"Joist":270,"Main Roof":300,"Low Roof":"80 + 80","1st Fix":680,"2nd Fix":650,"3rd Fix":150},
      "Type F":{"Joist":240,"Main Roof":450,"Low Roof":"80 + 80","1st Fix":700,"2nd Fix":670,"3rd Fix":160},
      "Type G GF":{"Low Roof":"120 each","1st Fix":320,"2nd Fix":280,"3rd Fix":100},
      "Type G FF":{"Main Roof":"600 PAIR","1st Fix":320,"2nd Fix":350,"3rd Fix":100},
      "Type H":{"Main Roof":420,"Low Roof":80,"1st Fix":380,"2nd Fix":350,"3rd Fix":110},
      "Type J":{"Main Roof":1500,"Low Roof":50,"1st Fix":800,"2nd Fix":700,"3rd Fix":135},
      "Type K":{"Joist":300,"Main Roof":380,"Low Roof":80,"1st Fix":600,"2nd Fix":580,"3rd Fix":135}
    }
  },
  "Vistry Glen Parva": {
    "builder": "Vistry",
    "site": "Glen Parva",
    "extras": {"Chimney":"£50 each","Spandrel panel":"£50 each","Single garage roof":"£200","Double garage roof":"£320","Pair twin garage roof":"£340","Day work":"£20/hr"},
    "notes": "Temporary handrail fitted at 1st fix. Curtain battens included in 2nd fix price.",
    "types": {
      "Mountford":{"Joist":285,"Main Roof":440,"Low Roof Bay/FD":50,"1st Fix":570,"2nd Fix":540,"3rd Fix":130},
      "Eveleigh Gable":{"Joist":260,"Main Roof":"190/300","Low Roof Bay/FD":50,"1st Fix":580,"2nd Fix":520,"3rd Fix":130},
      "Eveleigh Hipped":{"Joist":260,"Main Roof":"190/600","Low Roof Bay/FD":50,"1st Fix":580,"2nd Fix":520,"3rd Fix":130},
      "Hardwick":{"Joist":230,"Main Roof":"190/300","Low Roof Bay/FD":50,"1st Fix":540,"2nd Fix":490,"3rd Fix":120},
      "Pembroke Hipped":{"Joist":350,"Main Roof":1150,"Low Roof Bay/FD":"50/50","1st Fix":800,"2nd Fix":780,"3rd Fix":190},
      "Pembroke Gable":{"Joist":350,"Main Roof":510,"Low Roof Bay/FD":"50/50","1st Fix":800,"2nd Fix":780,"3rd Fix":190},
      "Granger":{"Joist":330,"Main Roof":580,"Low Roof Bay/FD":"50/80","1st Fix":730,"2nd Fix":700,"3rd Fix":170},
      "Wyatt":{"Joist":"240/240","Low Roof Bay/FD":50,"1st Fix":850,"2nd Fix":850,"3rd Fix":210},
      "Foulston":{"Joist":"260/260","Low Roof Bay/FD":50,"1st Fix":950,"2nd Fix":1000,"3rd Fix":230},
      "Elliot":{"Joist":260,"Main Roof":380,"Low Roof Bay/FD":50,"1st Fix":540,"2nd Fix":490,"3rd Fix":120},
      "Kempthorne":{"Joist":350,"Main Roof":1250,"Low Roof Bay/FD":100,"1st Fix":950,"2nd Fix":950,"3rd Fix":260},
      "Bungalow":{"Main Roof":700,"1st Fix":400,"2nd Fix":400,"3rd Fix":100},
      "W26 Bungalow":{"Main Roof":700,"1st Fix":400,"2nd Fix":400,"3rd Fix":100},
      "A22 Mid":{"Joist":230,"Main Roof":200,"Low Roof Bay/FD":50,"1st Fix":570,"2nd Fix":540,"3rd Fix":130},
      "A30 End":{"Joist":250,"Main Roof":400,"Low Roof Bay/FD":50,"1st Fix":540,"2nd Fix":490,"3rd Fix":120},
      "A30 Mid":{"Joist":230,"Main Roof":200,"Low Roof Bay/FD":20,"1st Fix":540,"2nd Fix":490,"3rd Fix":120},
      "A40":{"Joist":260,"Main Roof":400,"Low Roof Bay/FD":50,"1st Fix":580,"2nd Fix":530,"3rd Fix":140}
    }
  },
  "St Modwen Branston": {
    "builder": "St. Modwen Homes",
    "site": "Branston Leas",
    "extras": {"Fitting chimneys":"£40","Fit traditional doors":"£10 each","Cladding":"£33/meter","Load out pads on joist + stairwell protection":"£25/plot","Skirting board return mitres":"£25/plot","Single garage roof":"£200","Double/twin garage roof":"£300","Spandrel panel":"£50/panel","Day work":"£20/hr"},
    "notes": "Prices by plot number — see full document for plot-level detail.",
    "types": {
      "Plot 705/706 (Small)":{"Joist":220,"Main Roof":295,"Low Roof":40,"1st Fix":520,"2nd Fix":480,"3rd Fix":100},
      "Plot 790/791":{"Joist":230,"Main Roof":305,"Low Roof":40,"1st Fix":550,"2nd Fix":490,"3rd Fix":120},
      "Plot 835":{"Joist":240,"Main Roof":345,"Low Roof":40,"1st Fix":540,"2nd Fix":480,"3rd Fix":110},
      "Plot 823/838/839":{"Joist":242,"Main Roof":345,"Low Roof":40,"1st Fix":600,"2nd Fix":510,"3rd Fix":130},
      "Plot 909/920":{"Joist":225,"Main Roof":350,"Low Roof":"240 pair","1st Fix":600,"2nd Fix":530,"3rd Fix":140},
      "Plot 922/836/938":{"Joist":255,"Main Roof":400,"Low Roof":40,"1st Fix":700,"2nd Fix":570,"3rd Fix":150},
      "Plot 1031/1056/1058":{"Joist":265,"Main Roof":420,"Low Roof":50,"1st Fix":690,"2nd Fix":600,"3rd Fix":150},
      "Plot 1173/1149":{"Joist":320,"Main Roof":530,"Low Roof":"150 carcass 90 clad & post","1st Fix":785,"2nd Fix":700,"3rd Fix":170},
      "Plot 1206/1210/1203A":{"Joist":230,"Main Roof":230,"Low Roof":"240 pair 4u","1st Fix":980,"2nd Fix":900,"3rd Fix":190},
      "Plot 1272/1303B":{"Joist":230,"Main Roof":230,"Low Roof":"241 pair 4u","1st Fix":980,"2nd Fix":900,"3rd Fix":190},
      "Plot 1918/1282":{"Joist":220,"Main Roof":220,"Low Roof":40,"1st Fix":1000,"2nd Fix":900,"3rd Fix":210},
      "Plot 1362/1379/1381":{"Joist":300,"Main Roof":650,"Low Roof":40,"1st Fix":780,"2nd Fix":680,"3rd Fix":170},
      "Plot 1454/1474/1475":{"Joist":380,"Main Roof":1000,"Low Roof":40,"1st Fix":980,"2nd Fix":900,"3rd Fix":230},
      "Plot 968":{"Joist":230,"Main Roof":345,"Low Roof":40,"1st Fix":550,"2nd Fix":490,"3rd Fix":120},
      "Plot 777/791/790":{"Joist":230,"Main Roof":295,"Low Roof":40,"1st Fix":550,"2nd Fix":490,"3rd Fix":120},
      "Plot 979/965":{"Joist":280,"Main Roof":"630 no dormas","Low Roof":40,"1st Fix":720,"2nd Fix":640,"3rd Fix":160},
      "Plot 1209/1208":{"Joist":300,"Main Roof":500,"Low Roof":40,"1st Fix":750,"2nd Fix":680,"3rd Fix":160},
      "Plot 743":{"Joist":240,"Main Roof":295,"Low Roof":40,"1st Fix":520,"2nd Fix":480,"3rd Fix":110},
      "Plot 1306":{"Joist":360,"Main Roof":600,"Low Roof":40,"1st Fix":800,"2nd Fix":700,"3rd Fix":180},
      "Plot 1334/1355":{"Joist":265,"2nd Joist":250,"Main Roof":480,"Low Roof":60,"1st Fix":1100,"2nd Fix":1050,"3rd Fix":230},
      "Plot 1513":{"Joist":420,"Main Roof":900,"1st Fix":1000,"2nd Fix":950,"3rd Fix":240},
      "Plot 1087":{"Joist":265,"Main Roof":340,"Low Roof":40,"1st Fix":670,"2nd Fix":560,"3rd Fix":150},
      "Plot 1208":{"Joist":300,"Main Roof":600,"Low Roof":40,"1st Fix":770,"2nd Fix":700,"3rd Fix":170},
      "Plot 824":{"Main Roof":400,"Low Roof":30,"1st Fix":460,"2nd Fix":420,"3rd Fix":90},
      "Plot 539":{"Low Roof":40,"1st Fix":200,"2nd Fix":220,"3rd Fix":80},
      "Plot 805":{"Main Roof":480,"Low Roof":40,"1st Fix":320,"2nd Fix":280,"3rd Fix":80},
      "Plot 1371/1342":{"Joist":265,"2nd Joist":250,"Main Roof":1100,"1st Fix":1100,"2nd Fix":1050,"3rd Fix":230}
    }
  }
};

// Legacy flat price lists for backward compat — averages per builder/site
const PRICE_LISTS = {};
Object.values(PRICE_LISTS_BY_HOUSE_TYPE).forEach(pl => {
  const b = pl.builder;
  const s = pl.site;
  if(!PRICE_LISTS[b]) PRICE_LISTS[b] = {};
  const types = Object.values(pl.types);
  const avg = (key) => {
    const nums = types.map(t=>t[key]).filter(v=>typeof v==='number');
    return nums.length ? Math.round(nums.reduce((s,v)=>s+v,0)/nums.length) : 0;
  };
  PRICE_LISTS[b][s] = { "Joist": avg("Joist"), "Main Roof": avg("Main Roof"), "1st Fix": avg("1st Fix"), "2nd Fix": avg("2nd Fix"), "3rd Fix": avg("3rd Fix") };
});


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
  },
  "Swinfen Vale": {
    "Floorplans": ["Greenwood — Ground Floor", "Greenwood — First Floor", "Oakwood — Ground Floor", "Oakwood — First Floor", "Elmwood — Ground Floor", "Elmwood — First Floor"],
    "Technical Drawings": ["Electrical — Swinfen Vale", "Structural — Swinfen Vale", "Plumbing — Swinfen Vale"],
    "Site Documents": ["Health & Safety Plan", "Site Rules", "Site Map"],
    "H&S": ["Site Induction", "Equipment Register", "Incident Log"]
  },
  "Brascote Park": {
    "Floorplans": ["Bedale — Ground Floor", "Bedale — First Floor", "Alnwick — Ground Floor", "Alnwick — First Floor", "Bolsover — Ground Floor", "Bolsover — First Floor"],
    "Technical Drawings": ["Electrical — Brascote Park", "Structural — Brascote Park"],
    "Site Documents": ["Health & Safety Plan", "Site Rules", "Site Map"],
    "H&S": ["Site Induction", "Equipment Register"]
  },
  "Springwood": {
    "Floorplans": ["Joiner — Ground Floor", "Joiner — First Floor", "Craftsman — Ground Floor", "Craftsman — First Floor", "Turner — Ground Floor", "Turner — First Floor"],
    "Technical Drawings": ["Electrical — Springwood", "Structural — Springwood"],
    "Site Documents": ["Health & Safety Plan", "Site Rules", "Site Map"],
    "H&S": ["Site Induction", "Equipment Register"]
  },
  "Derwentside": {
    "Floorplans": ["The Chatsworth — Ground Floor", "The Chatsworth — First Floor", "The Haddon — Ground Floor", "The Haddon — First Floor", "The Calke — Ground Floor", "The Calke — First Floor"],
    "Technical Drawings": ["Electrical — Derwentside", "Structural — Derwentside"],
    "Site Documents": ["Health & Safety Plan", "Site Rules"],
    "H&S": ["Site Induction", "Equipment Register"]
  },
  "Snibston Mill": {
    "Floorplans": ["Arden — Ground Floor", "Arden — First Floor", "Carleton — Ground Floor", "Carleton — First Floor", "Danbury — Ground Floor", "Danbury — First Floor"],
    "Technical Drawings": ["Electrical — Snibston Mill", "Structural — Snibston Mill"],
    "Site Documents": ["Health & Safety Plan", "Site Rules", "Site Map"],
    "H&S": ["Site Induction", "Equipment Register"]
  }
};

const ALLOCATIONS = [
  { id: 1, carpenter: "Richard Wileman", site: "Swinfen Vale", plot: "5", houseType: "Harcourt", stage: "Joist", startDate: "2026-03-30", endDate: "2026-03-31", completed: true, completedDate: "2026-03-31" },
  { id: 2, carpenter: "Richard Wileman", site: "Swinfen Vale", plot: "5", houseType: "Harcourt", stage: "Main Roof", startDate: "2026-04-01", endDate: "2026-04-02" },
  { id: 3, carpenter: "Richard Wileman", site: "Swinfen Vale", plot: "5", houseType: "Harcourt", stage: "1st Fix", startDate: "2026-04-06", endDate: "2026-04-07" },
  { id: 4, carpenter: "Charlie Dillon", site: "Swinfen Vale", plot: "6", houseType: "Charwood / Clarendon", stage: "1st Fix", startDate: "2026-03-30", endDate: "2026-03-31" },
  { id: 5, carpenter: "Charlie Dillon", site: "Swinfen Vale", plot: "6", houseType: "Charwood / Clarendon", stage: "2nd Fix", startDate: "2026-04-01", endDate: "2026-04-02" },
  { id: 6, carpenter: "Charlie Dillon", site: "Swinfen Vale", plot: "7", houseType: "Evelyn / Fletcher", stage: "Joist", startDate: "2026-04-06", endDate: "2026-04-07" },
  { id: 7, carpenter: "Neil Goodwin", site: "Derwentside", plot: "12", houseType: "Hawksley", stage: "Main Roof", startDate: "2026-03-31", endDate: "2026-04-01" },
  { id: 8, carpenter: "Neil Goodwin", site: "Derwentside", plot: "12", houseType: "Hawksley", stage: "1st Fix", startDate: "2026-04-02", endDate: "2026-04-03" },
  { id: 9, carpenter: "Neil Goodwin", site: "Derwentside", plot: "15", houseType: "Milton", stage: "Joist", startDate: "2026-04-06", endDate: "2026-04-07" },
  { id: 10, carpenter: "Neil Hines", site: "Springwood", plot: "8", houseType: "Joiner", stage: "1st Fix", startDate: "2026-03-30", endDate: "2026-03-31" },
  { id: 11, carpenter: "Neil Hines", site: "Springwood", plot: "8", houseType: "Joiner", stage: "2nd Fix", startDate: "2026-04-01", endDate: "2026-04-02" },
  { id: 12, carpenter: "Neil Hines", site: "Springwood", plot: "10", houseType: "Turner", stage: "Main Roof", startDate: "2026-04-06", endDate: "2026-04-07" },
  { id: 13, carpenter: "Rob Jones", site: "Snibston Mill", plot: "14", houseType: "Arden", stage: "2nd Fix", startDate: "2026-03-30", endDate: "2026-03-31" },
  { id: 14, carpenter: "Rob Jones", site: "Snibston Mill", plot: "14", houseType: "Arden", stage: "3rd Fix", startDate: "2026-04-01", endDate: "2026-04-01" },
  { id: 15, carpenter: "Rob Jones", site: "Snibston Mill", plot: "18", houseType: "Carleton", stage: "Joist", startDate: "2026-04-06", endDate: "2026-04-07" },
  { id: 16, carpenter: "Ian Johnson", site: "Brascote Park", plot: "22", houseType: "Bedale", stage: "Main Roof", startDate: "2026-04-01", endDate: "2026-04-02" },
  { id: 17, carpenter: "Ian Johnson", site: "Brascote Park", plot: "22", houseType: "Bedale", stage: "1st Fix", startDate: "2026-04-06", endDate: "2026-04-07" }
];

const INVOICES = [
  { id: 1, carpenter: "Richard Wileman", site: "Swinfen Vale", plot: "5", houseType: "Harcourt", stage: "Joist", amount: 330, status: "approved", date: "2026-03-31" },
  { id: 2, carpenter: "Neil Hines", site: "Springwood", plot: "8", houseType: "Joiner", stage: "1st Fix", amount: 950, status: "pending", date: "2026-04-01" },
  { id: 3, carpenter: "Rob Jones", site: "Snibston Mill", plot: "14", houseType: "Arden", stage: "2nd Fix", amount: 410, status: "pending", date: "2026-04-01" }
];

const getSiteHousetypes = (siteName) => {
  for (let builder of BUILDERS) {
    const site = builder.sites.find(s => s.name === siteName);
    if (site) return site.housetypes;
  }
  return [];
};


const getWeekDays = (offset=0) => {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay()+6)%7) + (offset*7));
  const days = [];
  for(let i=0; i<5; i++){
    const d=new Date(monday);
    d.setDate(monday.getDate()+i);
    days.push(d);
  }
  return days;
};
const STAGE_DURATIONS = {"Joists":2,"Joist":2,"Roof":2,"Main Roof":2,"Low Roof":1,"Low Roof FD":1,"First Fix":2,"1st Fix":2,"Second Fix":2,"2nd Fix":2,"Final":1,"Finals":1,"3rd Fix":1,"Cellotex":1};
const getDaysForStage = (stage) => STAGE_DURATIONS[stage] || 2;
const isWeekday = (d) => d.getDay()>=1 && d.getDay()<=5;
const isSameDay = (a,b) => a.toISOString().split('T')[0]===b.toISOString().split('T')[0];
const isDayOff = (date, carpName, dayOffs) => dayOffs.some(d=>d.carpenter===carpName && d.status==='approved' && new Date(d.startDate)<=date && new Date(d.endDate)>=date);
const getAllocForDay = (date, allocs) => {
  const ds = date.toISOString().split('T')[0];
  return allocs.filter(a=>{
    const s=new Date(a.startDate);const e=new Date(a.endDate);
    return ds>=a.startDate && ds<=a.endDate;
  });
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' });
};

const daysInRange = (start, end) => {
  const s = new Date(start);
  const e = new Date(end);
  return Math.ceil((e - s) / (1000 * 60 * 60 * 24)) + 1;
};

export default function App(){
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [pinInput, setPinInput] = useState('');
  const [workLog, setWorkLog] = useState(INITIAL_WORK_LOG);
  const [allocations, setAllocations] = useState(ALLOCATIONS);
  const [invoices, setInvoices] = useState(INVOICES);
  const [formData, setFormData] = useState({ site: '', plot: '', houseType: '', stage: '', expectedDays: 1, priority: 'medium', notes: '' });
  const [selectedSiteForLog, setSelectedSiteForLog] = useState('');
  const [allocateId, setAllocateId] = useState(null);
  const [allocateCarpenter, setAllocateCarpenter] = useState('');
  const [allocateStartDate, setAllocateStartDate] = useState('');
  const [carpenterSearch, setCarpenterSearch] = useState('');
  const [adminTab, setAdminTab] = useState('dashboard');
  const [scheduleView, setScheduleView] = useState('gantt');
  const [carpenterTab, setCarpenterTab] = useState('schedule');
  const [invoiceTab, setInvoiceTab] = useState('pending');
  const [siteManagerTab, setSiteManagerTab] = useState('overview');
  const [plotFilter, setPlotFilter] = useState('');
const[sidebarOpen,setSidebarOpen]=useState(false);
const[smPlot,setSmPlot]=useState('');
const[smHouseType,setSmHouseType]=useState('');
const[smStage,setSmStage]=useState('');
const[smNotes,setSmNotes]=useState('');
const[fixingAlloc,setFixingAlloc]=useState('');
const[fixingItem,setFixingItem]=useState('');
const[fixingQty,setFixingQty]=useState('');
const[fixingNotes,setFixingNotes]=useState('');
const[fixingRequests,setFixingRequests]=useState([]);
const[successMsg,setSuccessMsg]=useState('');
const[delays,setDelays]=useState([]);
const[delayingAllocId,setDelayingAllocId]=useState(null);
const[delayReason,setDelayReason]=useState('');
const[delayDays,setDelayDays]=useState(1);
const[allFixingRequests,setAllFixingRequests]=useState([]);
const[notifications,setNotifications]=useState([
{id:1,type:'Toolbox Talk',title:'Working at Heights - Spring 2026',message:'All carpenters must review the updated working at heights procedure before commencing roof work. Key changes include new harness requirements and altered anchor point specifications.',site:'Holbrook Park',sentBy:'Admin',sentDate:'2026-03-20',recipients:['Richard Wileman','Charlie Dillon','Neil Hines'],responses:{}},
{id:2,type:'RAMS',title:'RAMS - First Fix Holbrook Park',message:'Please review and sign the Risk Assessment and Method Statement for first fix carpentry at Holbrook Park. This covers all first fix operations including floor joists, stud walls, and roof trusses.',site:'Holbrook Park',sentBy:'Admin',sentDate:'2026-03-22',recipients:['Richard Wileman','Charlie Dillon','Neil Hines'],responses:{}},
{id:3,type:'H&S Document',title:'Site Safety Briefing - March 2026',message:'Monthly site safety briefing document. All operatives must read and sign to confirm understanding of current site hazards and control measures.',site:'Coppice Heights',sentBy:'Admin',sentDate:'2026-03-25',recipients:['Neil Goodwin'],responses:{}}
]);
const[notifType,setNotifType]=useState('Toolbox Talk');
const[notifTitle,setNotifTitle]=useState('');
const[notifSite,setNotifSite]=useState('');
const[notifMessage,setNotifMessage]=useState('');
const[signingNotifId,setSigningNotifId]=useState(null);
const[isDrawing,setIsDrawing]=useState(false);
const sigCanvasRef=useRef(null);
const[smSelectedCarp,setSmSelectedCarp]=useState(null);
const[siteFiles,setSiteFiles]=useState([
{id:1,site:'Swinfen Vale',name:'Plot 5 - Snag List',createdBy:'Michael Blake',date:'2026-03-28',photos:[{id:1,note:'Kitchen skirting gap - needs refitting',dataUrl:null},{id:2,note:'Landing door lining not plumb',dataUrl:null}],sentTo:'Richard Wileman',status:'open'},
{id:2,site:'Swinfen Vale',name:'Plot 6 - Second Fix Check',createdBy:'Michael Blake',date:'2026-03-30',photos:[{id:1,note:'All door handles fitted correctly',dataUrl:null}],sentTo:null,status:'open'}
]);
const[newFileName,setNewFileName]=useState('');
const[newFilePhotos,setNewFilePhotos]=useState([]);
const[newFileNote,setNewFileNote]=useState('');
const[creatingFile,setCreatingFile]=useState(false);
const[viewingFileId,setViewingFileId]=useState(null);
const[adminSiteView,setAdminSiteView]=useState(null);
const[adminSiteWorkTab,setAdminSiteWorkTab]=useState('logged');
const[sendDocCarp,setSendDocCarp]=useState(null);
const[sendDocType,setSendDocType]=useState('Toolbox Talk');
const[sendDocTitle,setSendDocTitle]=useState('');
const[sendDocMessage,setSendDocMessage]=useState('');
const fileInputRef=useRef(null);
const[scheduleClickedAlloc,setScheduleClickedAlloc]=useState(null);
const[editingInvoiceId,setEditingInvoiceId]=useState(null);
const[invoiceExtraItems,setInvoiceExtraItems]=useState({});
const[newExtraDesc,setNewExtraDesc]=useState('');
const[newExtraAmount,setNewExtraAmount]=useState('');
const[dayOffRequests,setDayOffRequests]=useState([]);
const[dayOffStart,setDayOffStart]=useState('');
const[dayOffEnd,setDayOffEnd]=useState('');
const[dayOffReason,setDayOffReason]=useState('');
const[variationOrders,setVariationOrders]=useState([]);
const[voDesc,setVoDesc]=useState('');
const[voAmount,setVoAmount]=useState('');
const[voPhotos,setVoPhotos]=useState([]);
const[voSite,setVoSite]=useState('');
const[voPlot,setVoPlot]=useState('');
const[showVoForm,setShowVoForm]=useState(false);
const voFileRef=useRef(null);
const[snagItems,setSnagItems]=useState([]);
const[newSnagDesc,setNewSnagDesc]=useState('');
const[newSnagSite,setNewSnagSite]=useState('');
const[newSnagPlot,setNewSnagPlot]=useState('');
const[weekOffset,setWeekOffset]=useState(0);
// ===== SUPABASE DATA LOADING =====
const [dbLoaded, setDbLoaded] = useState(false);
useEffect(() => {
  if (currentPage === 'app' && user && !dbLoaded) {
    const loadData = async () => {
      try {
        const [wl, al, inv, del, notifs, nResponses, fixReqs, sf] = await Promise.all([
          fetchWorkLog(), fetchAllocations(), fetchInvoices(), fetchDelays(),
          fetchNotifications(), fetchNotificationResponses(), fetchFixingRequests(), fetchSiteFiles()
        ]);
        if (wl && wl.length > 0) {
          setWorkLog(wl.map(w => ({
            id: w.id, site: w.site, builder: w.builder, plot: w.plot,
            houseType: w.house_type, stage: w.stage, expectedDays: w.expected_days,
            priority: w.priority, notes: w.notes || '', status: w.status,
            allocatedTo: w.allocated_to || ''
          })));
        }
        if (al && al.length > 0) {
          setAllocations(al.map(a => ({
            id: a.id, carpenter: a.carpenter, site: a.site, plot: a.plot,
            houseType: a.house_type, stage: a.stage,
            startDate: a.start_date, endDate: a.end_date,
            completed: a.completed || false, completedDate: a.completed_date || null,
            delayed: a.delayed || false, delayDays: a.delay_days || 0
          })));
        }
        if (inv && inv.length > 0) {
          setInvoices(inv.map(i => ({
            id: i.id, carpenter: i.carpenter, site: i.site, plot: i.plot,
            houseType: i.house_type, stage: i.stage, amount: parseFloat(i.amount),
            status: i.status, date: i.date
          })));
        }
        if (del && del.length > 0) {
          setDelays(del.map(d => ({
            id: d.id, allocId: d.alloc_id, carpenter: d.carpenter, site: d.site,
            plot: d.plot, houseType: d.house_type, stage: d.stage,
            reason: d.reason, delayDays: d.delay_days,
            originalEnd: d.original_end, date: d.date, status: d.status
          })));
        }
        if (notifs && notifs.length > 0) {
          const responseMap = {};
          (nResponses || []).forEach(r => {
            if (!responseMap[r.notification_id]) responseMap[r.notification_id] = {};
            responseMap[r.notification_id][r.carpenter_name] = {
              read: r.read_status, readDate: r.read_date,
              signed: r.signed, signedDate: r.signed_date,
              signatureData: r.signature_data
            };
          });
          setNotifications(notifs.map(n => ({
            id: n.id, type: n.type, title: n.title, message: n.message,
            site: n.site, sentBy: n.sent_by, sentDate: n.sent_date,
            recipients: n.recipients || [], responses: responseMap[n.id] || {}
          })));
        }
        if (fixReqs && fixReqs.length > 0) {
          const mapped = fixReqs.map(r => ({
            id: r.id, carpenter: r.carpenter, site: r.site, plot: r.plot,
            stage: r.stage, item: r.item, qty: r.qty, notes: r.notes || '',
            date: r.date, status: r.status
          }));
          setAllFixingRequests(mapped);
          setFixingRequests(mapped.filter(r => r.carpenter === user?.name));
        }
        if (sf && sf.length > 0) {
          setSiteFiles(sf.map(f => ({
            id: f.id, site: f.site, name: f.name, createdBy: f.created_by,
            date: f.date, sentTo: f.sent_to, status: f.status,
            photos: (f.site_file_photos || []).map(p => ({
              id: p.id, note: p.note, dataUrl: p.photo_url
            }))
          })));
        }
        setDbLoaded(true);
        console.log('Supabase data loaded successfully');
      } catch (err) {
        console.error('Error loading from Supabase:', err);
        setDbLoaded(true);
      }
    };
    loadData();
  }
}, [currentPage, user, dbLoaded]);
// ===== END SUPABASE DATA LOADING =====

  // Website/old portal states from App7
  const[sec,setSec]=useState("home");const[sB,setSB]=useState(null);const[sS,setSS]=useState(null);const[sH,setSH]=useState(null);const[sSv,setSSv]=useState(null);const[chatOn,setChatOn]=useState(false);const[msgs,setMsgs]=useState([{f:"b",t:"Hello! Welcome to Miller & Watson Carpentry. I\u2019m here to help with any enquiries. Could I start with your name please?"}]);const[chatIn,setChatIn]=useState("");const[formDone,setFormDone]=useState(false);const[portal,setPortal]=useState(null);const[pUser,setPUser]=useState(null);const[pin,setPin]=useState("");const[pTab,setPTab]=useState("schedule");const[matReqs,setMatReqs]=useState([{id:1,who:"Richard Wileman",site:"Swinfen Vale",items:"2x boxes 63mm nails",status:"pending",date:"21/03",payMethod:"deduct"},{id:2,who:"Neil Goodwin",site:"Derwentside",items:"5x sheets 18mm OSB",status:"approved",date:"20/03",payMethod:"cash"},{id:3,who:"Neil Hines",site:"Springwood",items:"1x box 100mm nails, 3x tubes Gripfill",status:"pending",date:"22/03",payMethod:"deduct"}]);const[newMat,setNewMat]=useState("");const[schedAllocs,setSchedAllocs]=useState([{id:1,carp:"Richard Wileman",site:"Swinfen Vale",plot:"5",stage:"Joist",date:"30/03",status:"complete",rate:"\u00a3330"},{id:2,carp:"Charlie Dillon",site:"Swinfen Vale",plot:"6",stage:"1st Fix",date:"30/03",status:"active",rate:"\u00a3650"},{id:3,carp:"Neil Goodwin",site:"Derwentside",plot:"12",stage:"Main Roof",date:"31/03",status:"active",rate:"\u00a3500"},{id:4,carp:"Neil Hines",site:"Springwood",plot:"8",stage:"1st Fix",date:"30/03",status:"active",rate:"\u00a3950"},{id:5,carp:"Rob Jones",site:"Snibston Mill",plot:"14",stage:"2nd Fix",date:"30/03",status:"active",rate:"\u00a3410"},{id:6,carp:"Ian Johnson",site:"Brascote Park",plot:"22",stage:"Main Roof",date:"01/04",status:"upcoming",rate:"\u00a3700"}]);const[allocForm,setAllocForm]=useState({carp:"",site:"",plot:"",stage:"",date:""});const[plots,setPlots]=useState(HOLBROOK_PLOTS);const[selectedPlot,setSelectedPlot]=useState(null);const chatEnd=useRef(null);const mapEl=useRef(null);const[mapOk,setMapOk]=useState(false);const[mobileMenu,setMobileMenu]=useState(false);const[delayModal,setDelayModal]=useState(null);const[oldDelayReason,setOldDelayReason]=useState("");const[oldDelayDuration,setOldDelayDuration]=useState("");const[chatStep,setChatStep]=useState("init");const[chatUserData,setChatUserData]=useState({});
const logoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRthM15JuQV5GY0MLTZRPG7t2WY5ShbEsMg-g&s";
const doLogin=async()=>{
// Try Supabase login first
try {
  const dbUser = await loginWithPin(pin);
  if(dbUser) {
    const role = dbUser.role;
    if(role === 'admin') {
      setPortal("mgr");setPUser({name:dbUser.name,role:"admin"});setPTab("dashboard");
      setUser({role:'admin',name:dbUser.name,id:dbUser.id});setCurrentPage('app');setAdminTab('dashboard');return;
    }
    if(role === 'invoice') {
      setPortal("office");setPUser({name:dbUser.name,role:"office"});setPTab("invoices");
      setUser({role:'invoice',name:dbUser.name,id:dbUser.id});setCurrentPage('app');setInvoiceTab('pending');return;
    }
    if(role === 'site_manager') {
      const u = {id:dbUser.employee_id,name:dbUser.name,pin:dbUser.pin,site:dbUser.site,builder:dbUser.builder,role:'site_manager'};
      setUser(u);setCurrentPage('app');setSiteManagerTab('overview');return;
    }
    if(role === 'carpenter') {
      const c = {id:dbUser.employee_id,name:dbUser.name,pin:dbUser.pin,site:dbUser.site,builder:dbUser.builder};
      setPortal("carp");setPUser(c);setPTab("schedule");
      setUser({...c,role:'carpenter'});setCurrentPage('app');setCarpenterTab('schedule');return;
    }
  }
} catch(e) { console.log('Supabase login failed, falling back to local:', e); }
// Fallback to local auth
// Local fallback removed — use Supabase auth
// Local fallback removed — use Supabase auth
const sm=SITE_MANAGERS.find(s=>s.pin===pin);if(sm){const u={...sm,role:'site_manager'};setUser(u);setCurrentPage('app');setSiteManagerTab('overview');return;}
const c=DEMO_CARPS.find(x=>x.pin===pin);if(c){setPortal("carp");setPUser(c);setPTab("schedule");const carp=CARPENTERS.find(x=>x.pin===pin);if(carp){setUser({...carp,role:'carpenter'});setCurrentPage('app');setCarpenterTab('schedule');}return;}
const carp2=CARPENTERS.find(x=>x.pin===pin);if(carp2){setUser({...carp2,role:'carpenter'});setCurrentPage('app');setCarpenterTab('schedule');return;}
alert("Invalid PIN");};
const getInvoiceForCarp=(name)=>{const allocs=schedAllocs.filter(a=>a.carp===name&&a.status==="complete");const pending=schedAllocs.filter(a=>a.carp===name&&a.status==="active");return{completed:allocs,pending,total:allocs.reduce((s,a)=>s+parseFloat(a.rate.replace(/[\u00a3,]/g,"")),0)};};
const stageColors={"Not Started":"#e0e0e0",Joists:"#FF9800","Joists Complete":"#FFB74D",Roofs:"#2196F3","Roofs Complete":"#64B5F6","First Fix":"#9C27B0","First Fix Complete":"#CE93D8","Second Fix":"#4CAF50","Second Fix Complete":"#81C784",Finals:"#F44336",Complete:"#22c55e"};
useEffect(()=>{chatEnd.current?.scrollIntoView({behavior:"smooth"});},[msgs]);
useEffect(()=>{if(sec==="map"&&!mapOk){const cs=document.createElement("link");cs.rel="stylesheet";cs.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";document.head.appendChild(cs);const sc=document.createElement("script");sc.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";sc.onload=()=>setMapOk(true);document.head.appendChild(sc);}},[sec]);
useEffect(()=>{if(sec==="map"&&mapOk&&mapEl.current){const L=window.L;if(!L||mapEl.current._leaflet_id)return;const m=L.map(mapEl.current).setView([52.92,-1.35],9);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap"}).addTo(m);BUILDERS.forEach(b=>{b.sites.forEach(s=>{L.circleMarker([s.lat,s.lng],{radius:8,fillColor:b.color,color:"#fff",weight:2,fillOpacity:.9}).addTo(m).bindPopup(`<div style="font-family:sans-serif;min-width:180px"><strong>${s.name}</strong><br><span style="color:#777">${b.name} — ${s.location}</span><br><br><a href="https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}" target="_blank" style="color:#B8860B;font-weight:700;text-decoration:none">Google Maps →</a><br><a href="https://maps.apple.com/?daddr=${s.lat},${s.lng}" target="_blank" style="color:#B8860B;font-weight:700;text-decoration:none">Apple Maps →</a></div>`);});});}},[sec,mapOk]);
useEffect(()=>{if(!document.querySelector('meta[name="viewport"]')){const v=document.createElement("meta");v.name="viewport";v.content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover";document.head.appendChild(v);}if(!document.querySelector('meta[name="theme-color"]')){const t=document.createElement("meta");t.name="theme-color";t.content="#0C1821";document.head.appendChild(t);}if(!document.getElementById("mw-responsive")){const st=document.createElement("style");st.id="mw-responsive";st.textContent="*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}body{margin:0;-webkit-font-smoothing:antialiased;overflow-x:hidden}@media(max-width:768px){.mw-desk{display:none!important}.mw-mob-btn{display:flex!important}}@media(min-width:769px){.mw-mob-btn{display:none!important}.mw-mob-menu{display:none!important}}";document.head.appendChild(st);}},[]);
const send=(t)=>{if(!t.trim())return;const m=[...msgs,{f:"u",t}];setMsgs(m);setChatIn("");setTimeout(()=>{const l=t.toLowerCase();let r="";let ns=chatStep;switch(chatStep){case"init":setChatUserData(p=>({...p,name:t.trim()}));r="Thanks "+t.trim()+"! Could I have a contact number?";ns="ask_phone";break;case"ask_phone":setChatUserData(p=>({...p,phone:t.trim()}));r="Great. How can we help?\n1. Services\n2. Quote/project\n3. Work opportunities\n4. Other";ns="ask_type";break;case"ask_type":if(l.includes("1")||l.includes("service")){r="We offer joists, roofing, first fix, second fix, and finals. Which interests you?";ns="service_detail";}else if(l.includes("2")||l.includes("quote")){r="Tell us about your project?";ns="quote_detail";}else if(l.includes("3")||l.includes("work")||l.includes("job")){r="We are always hiring. Want a callback?";ns="work_detail";}else{r="Tell me more and I will pass it on.";ns="general_detail";}break;case"service_detail":r="Full package: Joists, Roofs, First Fix, Second Fix, Finals. Want a callback?";ns="callback_offer";break;case"quote_detail":case"general_detail":r="Thanks. Shall we call or email?";ns="callback_or_email";break;case"work_detail":r="I will arrange that. Anything else?";ns="anything_else";break;case"callback_or_email":case"callback_offer":r="We will be in touch. Anything else?";ns="anything_else";break;case"anything_else":if(l.includes("no")||l.includes("thanks")||l.includes("bye")){r="Thanks for contacting M&W Carpentry!";ns="ended";}else{r="What else?\n1. Services\n2. Quote\n3. Work\n4. Other";ns="ask_type";}break;default:r="How can I help?\n1. Services\n2. Quote\n3. Work\n4. Other";ns="ask_type";}setChatStep(ns);setMsgs([...m,{f:"b",t:r}]);},600);};
const go=(s)=>{setSec(s);setSB(null);setSS(null);setSH(null);setSSv(null);setPortal(null);setPUser(null);setMobileMenu(false);window.scrollTo(0,0);};
const S={root:{fontFamily:"'DM Sans',-apple-system,sans-serif",color:"#1a1a1a",background:"#fff",minHeight:"100vh"},nav:{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(12,24,33,.97)",backdropFilter:"blur(12px)",minHeight:64,display:"flex",alignItems:"center",padding:"0 24px",justifyContent:"space-between",borderBottom:"1px solid rgba(255,255,255,.06)"},nl:(a)=>({color:a?"#B8860B":"rgba(255,255,255,.6)",fontSize:10,fontWeight:600,letterSpacing:.8,textTransform:"uppercase",cursor:"pointer",borderBottom:a?"2px solid #B8860B":"2px solid transparent",padding:"4px 0",whiteSpace:"nowrap"}),sc:{padding:"80px clamp(20px,4vw,40px)",maxWidth:1320,margin:"0 auto"},lb:{fontSize:11,fontWeight:700,letterSpacing:2.5,textTransform:"uppercase",color:"#B8860B",marginBottom:8,display:"block"},h2:{fontSize:32,fontWeight:700,lineHeight:1.15,marginBottom:12},sub:{fontSize:14,color:"#777",lineHeight:1.7,maxWidth:600},cd:{background:"#fff",borderRadius:6,overflow:"hidden",boxShadow:"0 2px 16px rgba(0,0,0,.06)",cursor:"pointer",transition:".25s"},bt:{display:"inline-flex",alignItems:"center",gap:6,padding:"11px 24px",borderRadius:5,fontSize:13,fontWeight:700,cursor:"pointer",border:"none",letterSpacing:.4}};




  // ===== ENHANCED PORTAL =====
  if(currentPage === 'app' && user) {
  const myAllocs = allocations.filter(a => a.carpenter === user?.name);
  const todayStr = new Date().toISOString().split('T')[0];
  const todayDate = new Date(todayStr);

  const myNotifications = user?.role === 'carpenter'
    ? notifications.filter(n => n.recipients.includes(user?.name) && !(n.responses[user?.name]?.signed))
    : user?.role === 'site_manager'
    ? notifications.filter(n => n.site === user?.site)
    : notifications;

  const unreadNotifs = user?.role === 'carpenter'
    ? myNotifications.filter(n => !n.responses[user?.name]?.read).length
    : 0;

  const handleDelay = (allocId) => {
    if(!delayReason.trim()) { alert('Please enter a reason for the delay'); return; }
    const alloc = allocations.find(a => a.id === allocId);
    if(!alloc) return;
    const delayEntry = {
      id: Date.now(), allocId, carpenter: alloc.carpenter, site: alloc.site, plot: alloc.plot,
      houseType: alloc.houseType, stage: alloc.stage, reason: delayReason, delayDays: delayDays,
      originalEnd: alloc.endDate, date: new Date().toLocaleDateString('en-GB'), status: 'active'
    };
    setDelays([...delays, delayEntry]);
    addDelay({alloc_id: allocId, carpenter: alloc.carpenter, site: alloc.site, plot: alloc.plot, house_type: alloc.houseType, stage: alloc.stage, reason: delayReason, delay_days: delayDays, original_end: alloc.endDate, date: new Date().toLocaleDateString('en-GB'), status: 'active'}).catch(e=>console.error('DB delay error:',e));
    const updatedAllocs = allocations.map(a => {
      if(a.id === allocId) {
        const newEnd = new Date(a.endDate); newEnd.setDate(newEnd.getDate() + delayDays);
        return {...a, endDate: newEnd.toISOString().split('T')[0], delayed: true, delayDays: (a.delayDays||0) + delayDays};
      }
      if(a.carpenter === alloc.carpenter && new Date(a.startDate) > new Date(alloc.endDate)) {
        const ns = new Date(a.startDate); ns.setDate(ns.getDate() + delayDays);
        const ne = new Date(a.endDate); ne.setDate(ne.getDate() + delayDays);
        return {...a, startDate: ns.toISOString().split('T')[0], endDate: ne.toISOString().split('T')[0]};
      }
      return a;
    });
    setAllocations(updatedAllocs);
    updatedAllocs.filter(a => a.id === allocId || (a.carpenter === alloc.carpenter && new Date(a.startDate) > new Date(alloc.endDate))).forEach(a => {
      updateAllocation(a.id, {start_date: a.startDate, end_date: a.endDate, delayed: a.delayed, delay_days: a.delayDays}).catch(e=>console.error('DB alloc update error:',e));
    });
    setDelayingAllocId(null); setDelayReason(''); setDelayDays(1);
    setSuccessMsg('Delay recorded - schedule updated'); setTimeout(()=>setSuccessMsg(''),2500);
  };

  const markAllocComplete = (allocId) => {
    const alloc = allocations.find(a => a.id === allocId);
    if(!alloc) return;
    setAllocations(allocations.map(a => a.id === allocId ? {...a, completed: true, completedDate: todayStr} : a));
    updateAllocation(allocId, {completed: true, completed_date: todayStr}).catch(e=>console.error('DB error:',e));
    setWorkLog(workLog.map(w => (w.site === alloc.site && w.plot === alloc.plot && w.stage === alloc.stage) ? {...w, status: 'complete'} : w));
    const matchingWl = workLog.find(w => w.site === alloc.site && w.plot === alloc.plot && w.stage === alloc.stage);
    if(matchingWl) updateWorkLogEntry(matchingWl.id, {status: 'complete'}).catch(e=>console.error('DB error:',e));
    const siteRates = PRICE_LISTS[alloc.builder]?.[alloc.site] || PRICE_LISTS[Object.keys(PRICE_LISTS).find(b => PRICE_LISTS[b][alloc.site])]?.[alloc.site] || {};
    const stageKey = alloc.stage === 'Final' ? 'Finals' : alloc.stage;
    const amount = siteRates[stageKey] || siteRates[alloc.stage] || 0;
    if(amount > 0) {
      const newInvoice = { id: Math.max(...invoices.map(inv=>inv.id),0)+1, carpenter: alloc.carpenter, site: alloc.site, plot: alloc.plot, houseType: alloc.houseType, stage: alloc.stage, amount, status: 'pending', date: todayStr };
      setInvoices(prev => [...prev, newInvoice]);
      addInvoice({carpenter: alloc.carpenter, site: alloc.site, plot: alloc.plot, house_type: alloc.houseType, stage: alloc.stage, amount, status: 'pending', date: todayStr}).catch(e=>console.error('DB invoice error:',e));
    }
    setSuccessMsg('Job complete — invoice generated'); setTimeout(()=>setSuccessMsg(''),2500);
  };

  const handleFixingRequest = (item, qty, notes, allocInfo) => {
    return { id: Date.now(), carpenter: user?.name, site: allocInfo?.site || user?.site || '',
      plot: allocInfo?.plot || '', stage: allocInfo?.stage || '', item, qty, notes,
      date: new Date().toLocaleDateString('en-GB'), status: 'pending' };
  };

  const sendNotification = () => {
    if(!notifTitle.trim() || !notifSite || !notifMessage.trim()) { alert('Please fill in all fields'); return; }
    const siteCarpenterNames = CARPENTERS.filter(c => c.site === notifSite).map(c => c.name);
    if(siteCarpenterNames.length === 0) { alert('No carpenters assigned to this site'); return; }
    const notif = {
      id: Date.now(), type: notifType, title: notifTitle, message: notifMessage,
      site: notifSite, sentBy: user?.name || 'Admin',
      sentDate: new Date().toISOString().split('T')[0],
      recipients: siteCarpenterNames, responses: {}
    };
    setNotifications([notif, ...notifications]);
    addNotification({type: notifType, title: notifTitle, message: notifMessage, site: notifSite, sent_by: user?.name || 'Admin', sent_date: new Date().toISOString().split('T')[0], recipients: siteCarpenterNames}).catch(e=>console.error('DB notif error:',e));
    setNotifTitle(''); setNotifMessage(''); setNotifSite(user?.role === 'site_manager' ? user?.site : '');
    setSuccessMsg('Notification sent to ' + siteCarpenterNames.length + ' carpenter' + (siteCarpenterNames.length>1?'s':'')); setTimeout(()=>setSuccessMsg(''),2500);
  };

  const markNotifRead = (notifId) => {
    setNotifications(notifications.map(n => {
      if(n.id === notifId) {
        const resp = {...n.responses};
        resp[user?.name] = {...(resp[user?.name]||{}), read: true, readDate: new Date().toLocaleDateString('en-GB')};
        upsertNotificationResponse(notifId, user?.name, {read_status: true, read_date: new Date().toLocaleDateString('en-GB')}).catch(e=>console.error('DB error:',e));
        return {...n, responses: resp};
      }
      return n;
    }));
  };

  const startSignature = (notifId, canvas) => {
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = NAVY;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    // Draw guide line
    ctx.save();
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    ctx.setLineDash([4,4]);
    ctx.beginPath();
    ctx.moveTo(10, canvas.height - 20);
    ctx.lineTo(canvas.width - 10, canvas.height - 20);
    ctx.stroke();
    ctx.restore();
    ctx.strokeStyle = NAVY;
    ctx.lineWidth = 2;
  };

  const signNotification = (notifId) => {
    const canvas = sigCanvasRef.current;
    if(!canvas) return;
    const sigData = canvas.toDataURL();
    // Check if canvas has actual drawing (not just the guide line)
    const ctx = canvas.getContext('2d');
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height - 25).data;
    let hasDrawing = false;
    for(let i = 3; i < pixels.length; i += 4) { if(pixels[i] > 0) { hasDrawing = true; break; } }
    if(!hasDrawing) { alert('Please draw your signature above the line'); return; }
    setNotifications(notifications.map(n => {
      if(n.id === notifId) {
        const resp = {...n.responses};
        resp[user?.name] = {...(resp[user?.name]||{}), read: true, signed: true, signature: sigData,
          signedDate: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})};
        upsertNotificationResponse(notifId, user?.name, {read_status: true, signed: true, signed_date: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'}), signature_data: sigData}).catch(e=>console.error('DB sig error:',e));
        return {...n, responses: resp};
      }
      return n;
    }));
    setSigningNotifId(null);
    setSuccessMsg('Document signed successfully'); setTimeout(()=>setSuccessMsg(''),2500);
  };

  const handleCanvasMouseDown = (e) => {
    const canvas = sigCanvasRef.current;
    if(!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    setIsDrawing(true);
    ctx.beginPath();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    ctx.moveTo(x * (canvas.width/rect.width), y * (canvas.height/rect.height));
  };

  const handleCanvasMouseMove = (e) => {
    if(!isDrawing) return;
    const canvas = sigCanvasRef.current;
    if(!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    ctx.lineTo(x * (canvas.width/rect.width), y * (canvas.height/rect.height));
    ctx.stroke();
  };

  const handleCanvasMouseUp = () => { setIsDrawing(false); };

  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif', backgroundColor: CREAM, minHeight: '100vh' }}>
      {successMsg && <div style={{position:'fixed',top:80,left:'50%',transform:'translateX(-50%)',zIndex:9999,backgroundColor:'#2e7d32',color:'white',padding:'12px 28px',borderRadius:6,fontWeight:'bold',fontSize:14,boxShadow:'0 4px 20px rgba(0,0,0,.25)'}}>{successMsg}</div>}
      <header style={{ backgroundColor: NAVY, color: CREAM, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position:'sticky', top:0, zIndex:200 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{background:'none',border:'none',color:CREAM,fontSize:24,cursor:'pointer',padding:'4px 8px',lineHeight:1}}>
            {sidebarOpen ? 'X' : '\u2630'}
          </button>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRthM15JuQV5GY0MLTZRPG7t2WY5ShbEsMg-g&s" alt="M&W" style={{ height: '36px' }} />
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Miller & Watson</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontSize: '13px' }}>{user?.name} | {user?.role?.toUpperCase().replace('_',' ')}</span>
          <button onClick={() => { setUser(null); setCurrentPage('home'); setPinInput(''); setPortal(null); setPUser(null); setPin(''); setSidebarOpen(false); }} style={{ backgroundColor: GOLD, color: NAVY, padding: '6px 14px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize:13 }}>
            Logout
          </button>
        </div>
      </header>

      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{position:'fixed',top:0,left:0,right:0,bottom:0,backgroundColor:'rgba(0,0,0,0.5)',zIndex:298}}></div>}

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        <aside style={{
          backgroundColor: NAVY, color: CREAM, width: '240px', padding: '20px', overflow: 'auto',
          position: 'fixed', top: 60, bottom: 0, left: sidebarOpen ? 0 : -260, zIndex: 299,
          transition: 'left 0.25s ease'
        }}>

          {user?.role === 'admin' && ['Dashboard','Work Log','Allocate','Schedule','Carpenters','Sites','Delays','Fixings','Notifications','Price Lists','Documents','Day-Off','Variations'].map(tab => (
            <button key={tab} onClick={() => { setAdminTab(tab.toLowerCase()); setSidebarOpen(false); }}
              style={{ display:'block', width:'100%', padding:'12px', margin:'8px 0',
                backgroundColor: adminTab === tab.toLowerCase() ? GOLD : 'transparent',
                color: adminTab === tab.toLowerCase() ? NAVY : CREAM,
                border:'none', borderRadius:'4px', cursor:'pointer', textAlign:'left',
                fontWeight: adminTab === tab.toLowerCase() ? 'bold' : 'normal', fontSize:14 }}>
              {tab}
              {tab === 'Delays' && delays.filter(d=>d.status==='active').length > 0 && (
                <span style={{marginLeft:6,backgroundColor:'#d32f2f',color:'white',borderRadius:'50%',padding:'1px 6px',fontSize:10}}>{delays.filter(d=>d.status==='active').length}</span>
              )}
              {tab === 'Fixings' && allFixingRequests.filter(r=>r.status==='pending').length > 0 && (
                <span style={{marginLeft:6,backgroundColor:'#d32f2f',color:'white',borderRadius:'50%',padding:'1px 6px',fontSize:10}}>{allFixingRequests.filter(r=>r.status==='pending').length}</span>
              )}
              {tab === 'Sites' && siteFiles.filter(f => f.status === 'open').length > 0 && (
                <span style={{marginLeft:6,backgroundColor:'#1565c0',color:'white',borderRadius:'50%',padding:'1px 6px',fontSize:10}}>{siteFiles.filter(f => f.status === 'open').length}</span>
              )}
              {tab === 'Notifications' && notifications.some(n => n.recipients.some(r => !n.responses[r]?.signed)) && (
                <span style={{marginLeft:6,backgroundColor:'#1565c0',color:'white',borderRadius:'50%',padding:'1px 6px',fontSize:10}}>!</span>
              )}
            </button>
          ))}

          {user?.role === 'site_manager' && ['Overview','Log Work','Compliance','Site Files','Notifications','Documents'].map(tab => (
            <button key={tab} onClick={() => { setSiteManagerTab(tab.toLowerCase()); setSidebarOpen(false); }}
              style={{ display:'block', width:'100%', padding:'12px', margin:'8px 0',
                backgroundColor: siteManagerTab === tab.toLowerCase() ? GOLD : 'transparent',
                color: siteManagerTab === tab.toLowerCase() ? NAVY : CREAM,
                border:'none', borderRadius:'4px', cursor:'pointer', textAlign:'left',
                fontWeight: siteManagerTab === tab.toLowerCase() ? 'bold' : 'normal', fontSize:14 }}>
              {tab}
              {tab === 'Compliance' && (() => {
                const siteCps = CARPENTERS.filter(c => c.site === user?.site);
                const unsigned = siteCps.filter(c => {
                  const carpNotifs = notifications.filter(n => n.recipients.includes(c.name));
                  return carpNotifs.some(n => !n.responses[c.name]?.signed);
                }).length;
                return unsigned > 0 ? <span style={{marginLeft:6,backgroundColor:'#d32f2f',color:'white',borderRadius:'50%',padding:'1px 6px',fontSize:10}}>{unsigned}</span> : null;
              })()}
              {tab === 'Site Files' && siteFiles.filter(f => f.site === user?.site && f.status === 'open').length > 0 && (
                <span style={{marginLeft:6,backgroundColor:'#1565c0',color:'white',borderRadius:'50%',padding:'1px 6px',fontSize:10}}>{siteFiles.filter(f => f.site === user?.site && f.status === 'open').length}</span>
              )}
            </button>
          ))}

          {user?.role === 'carpenter' && ['Schedule','Notifications','Documents','Price Lists','Fixings','Invoice','Variation Orders','Day Off'].map(tab => (
            <button key={tab} onClick={() => { setCarpenterTab(tab.toLowerCase()); setSidebarOpen(false); }}
              style={{ display:'block', width:'100%', padding:'12px', margin:'8px 0',
                backgroundColor: carpenterTab === tab.toLowerCase() ? GOLD : 'transparent',
                color: carpenterTab === tab.toLowerCase() ? NAVY : CREAM,
                border:'none', borderRadius:'4px', cursor:'pointer', textAlign:'left',
                fontWeight: carpenterTab === tab.toLowerCase() ? 'bold' : 'normal', fontSize:14 }}>
              {tab}
              {tab === 'Notifications' && unreadNotifs > 0 && (
                <span style={{marginLeft:6,backgroundColor:'#d32f2f',color:'white',borderRadius:'50%',padding:'1px 6px',fontSize:10}}>{unreadNotifs}</span>
              )}
            </button>
          ))}

          {user?.role === 'invoice' && ['Pending','Approved','Paid'].map(tab => (
            <button key={tab} onClick={() => { setInvoiceTab(tab.toLowerCase()); setSidebarOpen(false); }}
              style={{ display:'block', width:'100%', padding:'12px', margin:'8px 0',
                backgroundColor: invoiceTab === tab.toLowerCase() ? GOLD : 'transparent',
                color: invoiceTab === tab.toLowerCase() ? NAVY : CREAM,
                border:'none', borderRadius:'4px', cursor:'pointer', textAlign:'left',
                fontWeight: invoiceTab === tab.toLowerCase() ? 'bold' : 'normal', fontSize:14 }}>
              {tab}
            </button>
          ))}

          {(user?.role === 'site_manager' || user?.role === 'carpenter') && (
            <div style={{ marginTop:'30px', padding:'15px', backgroundColor:'rgba(184,134,11,0.2)', borderRadius:'4px', fontSize:'12px' }}>
              {user?.role === 'carpenter' && <p style={{ margin:'0', color:GOLD, fontWeight:'bold' }}>Name: {user?.name}</p>}
              <p style={{ margin: user?.role === 'carpenter' ? '5px 0 0 0' : '0', color: user?.role === 'site_manager' ? GOLD : CREAM, fontWeight: user?.role === 'site_manager' ? 'bold' : 'normal' }}>Site: {user?.site}</p>
              <p style={{ margin:'5px 0 0 0' }}>Builder: {user?.builder}</p>
            </div>
          )}
          {user?.role === 'invoice' && (
            <div style={{ marginTop:'30px', padding:'15px', backgroundColor:'rgba(184,134,11,0.2)', borderRadius:'4px', fontSize:'12px' }}>
              <p style={{ margin:'0', color:GOLD, fontWeight:'bold' }}>Total Pending:</p>
              <p style={{ margin:'5px 0 0 0' }}>GBP {invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0)}</p>
            </div>
          )}
        </aside>

        <main style={{ flex: 1, padding: '20px', overflow: 'auto', maxWidth:'100%' }}>


          {/* ========== ADMIN DASHBOARD ========== */}
          {user?.role === 'admin' && adminTab === 'dashboard' && (
            <div>
              <h2 style={{ color: NAVY, marginTop: 0, fontSize:22 }}>Dashboard</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '15px' }}>
                {[
                  {label:'Total Carpenters', val: CARPENTERS.length},
                  {label:'Active Sites', val: BUILDERS.reduce((s,b) => s + b.sites.length, 0)},
                  {label:'Unallocated Work', val: workLog.filter(w => w.status === 'logged').length},
                  {label:'Allocated', val: allocations.filter(a=>!a.completed).length},
                  {label:'Active Delays', val: delays.filter(d=>d.status==='active').length},
                  {label:'Pending Fixings', val: allFixingRequests.filter(r=>r.status==='pending').length},
                  {label:'Unsigned Docs', val: notifications.reduce((c,n)=>c+n.recipients.filter(r=>!n.responses[r]?.signed).length,0)},
                  {label:'Invoices Pending', val: invoices.filter(i=>i.status==='pending').length},
                  {label:'Overdue Jobs', val: allocations.filter(a=>!a.completed&&new Date(a.endDate)<todayDate).length},
                  {label:'Pending Invoices', val: 'GBP ' + invoices.filter(i => i.status === 'pending').reduce((s,i) => s + i.amount, 0)}
                ].map((c,ci) => (
                  <div key={ci} style={{ backgroundColor: NAVY, color: CREAM, padding: '16px', borderRadius: '8px', borderLeft: '4px solid ' + (c.label.includes('Delay')||c.label.includes('Unsigned')?'#d32f2f':GOLD) }}>
                    <p style={{ margin: 0, fontSize: '11px', opacity: 0.8 }}>{c.label}</p>
                    <h3 style={{ margin: '5px 0 0 0', fontSize: '24px' }}>{c.val}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========== ADMIN WORK LOG ========== */}
          {user?.role === 'admin' && adminTab === 'work log' && (
            <div>
              <h2 style={{ color: NAVY, marginTop: 0, fontSize:22 }}>Work Log</h2>
              <div style={{ backgroundColor: NAVY, color: CREAM, padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ display:'block', marginBottom:'4px', fontSize:'11px' }}>Site</label>
                    <select value={selectedSiteForLog} onChange={(e) => { setSelectedSiteForLog(e.target.value); setFormData({...formData, site:e.target.value, houseType:''}); }}
                      style={{ width:'100%', padding:'8px', borderRadius:'4px', border:'1px solid '+GOLD, fontSize:13 }}>
                      <option value="">Select Site</option>
                      {BUILDERS.flatMap(b => b.sites.map(s => ({name:s.name, builder:b.name}))).map(site => (
                        <option key={site.name} value={site.name}>{site.name} ({site.builder})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display:'block', marginBottom:'4px', fontSize:'11px' }}>Plot</label>
                    <input type="text" value={formData.plot} onChange={(e) => setFormData({...formData, plot:e.target.value})}
                      style={{ width:'100%', padding:'8px', borderRadius:'4px', border:'1px solid '+GOLD, boxSizing:'border-box', fontSize:13 }} />
                  </div>
                  <div>
                    <label style={{ display:'block', marginBottom:'4px', fontSize:'11px' }}>House Type</label>
                    <select value={formData.houseType} onChange={(e) => setFormData({...formData, houseType:e.target.value})}
                      style={{ width:'100%', padding:'8px', borderRadius:'4px', border:'1px solid '+GOLD, fontSize:13 }}>
                      <option value="">Select</option>
                      {getSiteHousetypes(selectedSiteForLog).map(ht => <option key={ht} value={ht}>{ht}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ display:'block', marginBottom:'4px', fontSize:'11px' }}>Stage</label>
                    <select value={formData.stage} onChange={(e) => setFormData({...formData, stage:e.target.value})}
                      style={{ width:'100%', padding:'8px', borderRadius:'4px', border:'1px solid '+GOLD, fontSize:13 }}>
                      <option value="">Select</option>
                      {['Joists','Roof','First Fix','Drop Backs','Second Fix','Final','Snags'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display:'block', marginBottom:'4px', fontSize:'11px' }}>Expected Days</label>
                    <input type="number" min="1" max="14" value={formData.expectedDays} onChange={(e) => setFormData({...formData, expectedDays:parseInt(e.target.value)||1})}
                      style={{ width:'100%', padding:'8px', borderRadius:'4px', border:'1px solid '+GOLD, boxSizing:'border-box', fontSize:13 }} />
                  </div>
                  <div>
                    <label style={{ display:'block', marginBottom:'4px', fontSize:'11px' }}>Priority</label>
                    <select value={formData.priority} onChange={(e) => setFormData({...formData, priority:e.target.value})}
                      style={{ width:'100%', padding:'8px', borderRadius:'4px', border:'1px solid '+GOLD, fontSize:13 }}>
                      <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom:'12px' }}>
                  <label style={{ display:'block', marginBottom:'4px', fontSize:'11px' }}>Notes</label>
                  <textarea value={formData.notes} onChange={(e) => setFormData({...formData, notes:e.target.value})}
                    style={{ width:'100%', padding:'8px', borderRadius:'4px', border:'1px solid '+GOLD, minHeight:'60px', boxSizing:'border-box', fontFamily:'inherit', fontSize:13 }} />
                </div>
                <button type="button" onClick={() => {
                  if(selectedSiteForLog && formData.plot && formData.houseType && formData.stage){
                    const builder=BUILDERS.find(b=>b.sites.some(s=>s.name===selectedSiteForLog));
                    setWorkLog([...workLog, {id:Math.max(...workLog.map(w=>w.id),0)+1, site:selectedSiteForLog, builder:builder?builder.name:'', plot:formData.plot, houseType:formData.houseType, stage:formData.stage, expectedDays:formData.expectedDays, priority:formData.priority, notes:formData.notes, status:'logged'}]);
                    addWorkLogEntry({site:selectedSiteForLog, builder:builder?builder.name:'', plot:formData.plot, house_type:formData.houseType, stage:formData.stage, expected_days:formData.expectedDays, priority:formData.priority, notes:formData.notes, status:'logged'}).catch(e=>console.error('DB error:',e));
                    setFormData({site:'',plot:'',houseType:'',stage:'',expectedDays:1,priority:'medium',notes:''}); setSelectedSiteForLog('');
                    setSuccessMsg('Work logged successfully'); setTimeout(()=>setSuccessMsg(''),2500);
                  }
                }} style={{ backgroundColor:GOLD, color:NAVY, padding:'10px 20px', border:'none', borderRadius:'4px', cursor:'pointer', fontWeight:'bold', fontSize:14 }}>
                  Log Work
                </button>
              </div>
              <div style={{overflowX:'auto'}}>
              <table style={{ width:'100%', borderCollapse:'collapse', minWidth:'700px' }}>
                <thead><tr style={{ backgroundColor:NAVY, color:CREAM }}>
                  {['Site','Plot','Type','Stage','Days','Priority','Status','Allocated To'].map(h => <th key={h} style={{ padding:'10px', textAlign:'left', fontSize:'11px' }}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {workLog.map((item, idx) => (
                    <tr key={item.id} style={{ backgroundColor: idx%2===0?'#f9f9f9':'white', borderBottom:'1px solid #ddd' }}>
                      <td style={{ padding:'8px', fontSize:'12px' }}>{item.site}</td>
                      <td style={{ padding:'8px', fontSize:'12px' }}>{item.plot}</td>
                      <td style={{ padding:'8px', fontSize:'12px' }}>{item.houseType}</td>
                      <td style={{ padding:'8px', fontSize:'12px' }}>{item.stage}</td>
                      <td style={{ padding:'8px', fontSize:'12px' }}>{item.expectedDays}</td>
                      <td style={{ padding:'8px', fontSize:'12px', textTransform:'capitalize' }}>{item.priority}</td>
                      <td style={{ padding:'8px', fontSize:'12px', textTransform:'capitalize' }}>{item.status}</td>
                      <td style={{ padding:'8px', fontSize:'12px' }}>{item.allocatedTo || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table></div>
            </div>
          )}

          {/* ========== ADMIN ALLOCATE ========== */}
          {user?.role === 'admin' && adminTab === 'allocate' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Allocate Work</h2>
              {workLog.filter(w => w.status === 'logged').length === 0 ? <p style={{color:'#666', fontSize:14}}>No unallocated work items.</p> : (
              <div style={{overflowX:'auto'}}>
              <table style={{ width:'100%', borderCollapse:'collapse', minWidth:'600px' }}>
                <thead><tr style={{ backgroundColor:NAVY, color:CREAM }}>
                  {['Site','Plot','Type','Stage','Days','Action'].map(h => <th key={h} style={{ padding:'10px', textAlign:'left', fontSize:'11px' }}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {workLog.filter(w => w.status === 'logged').map((item, idx) => (
                    <tr key={item.id} style={{ backgroundColor: allocateId===item.id?'#ffffcc':(idx%2===0?'#f9f9f9':'white'), borderBottom:'1px solid #ddd' }}>
                      <td style={{ padding:'8px', fontSize:'12px' }}>{item.site}</td>
                      <td style={{ padding:'8px', fontSize:'12px' }}>{item.plot}</td>
                      <td style={{ padding:'8px', fontSize:'12px' }}>{item.houseType}</td>
                      <td style={{ padding:'8px', fontSize:'12px' }}>{item.stage}</td>
                      <td style={{ padding:'8px', fontSize:'12px' }}>{item.expectedDays}</td>
                      <td style={{ padding:'8px', fontSize:'12px' }}>
                        {allocateId === item.id ? (
                          <div style={{ display:'flex', gap:'5px', flexWrap:'wrap' }}>
                            <select value={allocateCarpenter} onChange={(e) => setAllocateCarpenter(e.target.value)}
                              style={{ padding:'5px', borderRadius:'3px', border:'1px solid '+GOLD, fontSize:'11px', minWidth:'120px' }}>
                              <option value="">Select Carpenter</option>
                              {CARPENTERS.filter(c => !c.status || c.status !== 'leave').map(c => <option key={c.id} value={c.name}>{c.name} - {c.site}</option>)}
                            </select>
                            <input type="date" value={allocateStartDate} onChange={(e) => setAllocateStartDate(e.target.value)} style={{ padding:'5px', borderRadius:'3px', border:'1px solid '+GOLD, fontSize:'11px' }} />
                            <button onClick={() => {
                              if(allocateCarpenter && allocateStartDate){
                                const ed=new Date(allocateStartDate); ed.setDate(ed.getDate()+item.expectedDays-1);
                                setAllocations([...allocations, {id:Math.max(...allocations.map(a=>a.id),0)+1, carpenter:allocateCarpenter, site:item.site, plot:item.plot, houseType:item.houseType, stage:item.stage, startDate:allocateStartDate, endDate:ed.toISOString().split('T')[0], completed:false, delayed:false, delayDays:0}]);
                                addAllocation({carpenter:allocateCarpenter, site:item.site, plot:item.plot, house_type:item.houseType, stage:item.stage, start_date:allocateStartDate, end_date:ed.toISOString().split('T')[0], completed:false, delayed:false, delay_days:0}).catch(e=>console.error('DB error:',e));
                                setWorkLog(workLog.map(w => w.id===item.id ? {...w, status:'allocated', allocatedTo:allocateCarpenter} : w));
                                updateWorkLogEntry(item.id, {status:'allocated', allocated_to:allocateCarpenter}).catch(e=>console.error('DB error:',e));
                                setAllocateId(null); setAllocateCarpenter(''); setAllocateStartDate('');
                                setSuccessMsg('Work allocated to '+allocateCarpenter); setTimeout(()=>setSuccessMsg(''),2500);
                              }
                            }} style={{ backgroundColor:GOLD, color:NAVY, padding:'5px 10px', border:'none', borderRadius:'3px', cursor:'pointer', fontSize:'11px', fontWeight:'bold' }}>Confirm</button>
                            <button onClick={() => {setAllocateId(null);setAllocateCarpenter('');setAllocateStartDate('');}} style={{ backgroundColor:'#999', color:'white', padding:'5px 10px', border:'none', borderRadius:'3px', cursor:'pointer', fontSize:'11px' }}>Cancel</button>
                          </div>
                        ) : (
                          <button onClick={() => setAllocateId(item.id)} style={{ backgroundColor:GOLD, color:NAVY, padding:'5px 10px', border:'none', borderRadius:'3px', cursor:'pointer', fontSize:'11px', fontWeight:'bold' }}>Allocate</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table></div>)}
            </div>
          )}

          {/* ========== ADMIN SCHEDULE ========== */}
          {user?.role === 'admin' && adminTab === 'schedule' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Schedule</h2>
              <div style={{ marginBottom:'15px' }}>
                <button onClick={() => setScheduleView('gantt')} style={{ backgroundColor: scheduleView==='gantt'?GOLD:'#ccc', color: scheduleView==='gantt'?NAVY:'black', padding:'8px 15px', margin:'0 5px 0 0', border:'none', borderRadius:'4px', cursor:'pointer', fontSize:13 }}>Gantt</button>
                <button onClick={() => setScheduleView('list')} style={{ backgroundColor: scheduleView==='list'?GOLD:'#ccc', color: scheduleView==='list'?NAVY:'black', padding:'8px 15px', border:'none', borderRadius:'4px', cursor:'pointer', fontSize:13 }}>List</button>
              </div>
              {scheduleView === 'gantt' && (() => {
                // Dynamic date range: 7 days before today to 14 days after
                const ganttStart = new Date(); ganttStart.setDate(ganttStart.getDate() - 7);
                const ganttDays = 28;
                const ganttDates = Array.from({length:ganttDays},(_,i)=>{const d=new Date(ganttStart);d.setDate(ganttStart.getDate()+i);return d;});
                const uniqueCarps = [...new Set(allocations.map(a=>a.carpenter))];
                return (
                <div style={{ overflowX:'auto', backgroundColor:'white', padding:'15px', borderRadius:'8px' }}>
                  <div style={{ display:'flex' }}>
                    <div style={{ width:'130px', flexShrink:0 }}>
                      <div style={{ fontWeight:'bold', padding:'8px', borderBottom:'1px solid #ddd', minHeight:'36px', fontSize:12 }}>Carpenter</div>
                      {uniqueCarps.map(carp => <div key={carp} style={{ padding:'8px', borderBottom:'1px solid #ddd', minHeight:'36px', fontSize:'12px' }}>{carp}</div>)}
                    </div>
                    <div style={{ display:'flex', flex:1 }}>
                      {ganttDates.map((date, i) => {
                        const ds = date.toISOString().split('T')[0];
                        const isToday = ds === todayStr;
                        const isWeekend = date.getDay()===0||date.getDay()===6;
                        return (<div key={i} style={{ minWidth:'45px', flexShrink:0, borderRight:'1px solid #eee', backgroundColor:isToday?'#fffde7':isWeekend?'#f5f5f5':'white' }}>
                          <div style={{ fontWeight:isToday?'bold':'bold', padding:'4px', borderBottom:'1px solid #ddd', fontSize:'10px', textAlign:'center', color:isToday?GOLD:isWeekend?'#bbb':'inherit', backgroundColor:isToday?NAVY:'transparent' }}>
                            {isToday?<span style={{color:GOLD}}>{formatDate(ds).split(' ')[0]} {date.getDate()}</span>:<>{formatDate(ds).split(' ')[0]} {date.getDate()}</>}
                          </div>
                          {uniqueCarps.map(carp => {
                            // Check for day off
                            const hasDayOff = dayOffRequests.some(d=>d.carpenter===carp && d.status==='approved' && ds>=d.startDate && ds<=d.endDate);
                            if(hasDayOff) {
                              return (<div key={carp} style={{ minHeight:'36px', padding:'2px', borderBottom:'1px solid #eee', fontSize:'8px',
                                backgroundColor:'#ff9800', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'bold',
                                borderRadius:2, textAlign:'center' }}>OFF</div>);
                            }
                            const af = allocations.find(a => a.carpenter===carp && ds>=a.startDate && ds<=a.endDate);
                            const cellStatus = af?(af.completed?'complete':af.delayed?'delayed':todayStr>=af.startDate&&todayStr<=af.endDate?'active':'upcoming'):'empty';
                            const cellColors = {complete:{bg:'#2e7d32',fg:'white'},delayed:{bg:'#d32f2f',fg:'white'},active:{bg:GOLD,fg:NAVY},upcoming:{bg:NAVY,fg:'white'},empty:{bg:'transparent',fg:'#ccc'}};
                            const cc = cellColors[cellStatus];
                            // Show day number for multi-day jobs
                            const dayNum = af ? Math.ceil((date - new Date(af.startDate)) / 864e5) + 1 : 0;
                            const totalDays = af ? daysInRange(af.startDate, af.endDate) : 0;
                            return (<div key={carp} onClick={()=>af&&setScheduleClickedAlloc(af)} style={{ minHeight:'36px', padding:'2px', borderBottom:'1px solid #eee', fontSize:'8px',
                              backgroundColor: cc.bg, color: cc.fg, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:af?'bold':'normal',
                              cursor:af?'pointer':'default', lineHeight:'1.1', textAlign:'center', borderRadius:af?2:0, flexDirection:'column' }}>
                              {af && <span>{af.site.length>8?af.site.substring(0,7)+'..':af.site}</span>}
                              {af && totalDays>1 && <span style={{fontSize:'7px',opacity:0.8}}>D{dayNum}/{totalDays}</span>}
                            </div>);
                          })}
                        </div>);
                      })}
                    </div>
                  </div>
                  <div style={{marginTop:10,fontSize:11,display:'flex',gap:15,flexWrap:'wrap'}}>
                    <span><span style={{display:'inline-block',width:12,height:12,backgroundColor:GOLD,borderRadius:2,marginRight:4,verticalAlign:'middle'}}></span> In Progress</span>
                    <span><span style={{display:'inline-block',width:12,height:12,backgroundColor:'#2e7d32',borderRadius:2,marginRight:4,verticalAlign:'middle'}}></span> Complete</span>
                    <span><span style={{display:'inline-block',width:12,height:12,backgroundColor:'#d32f2f',borderRadius:2,marginRight:4,verticalAlign:'middle'}}></span> Delayed</span>
                    <span><span style={{display:'inline-block',width:12,height:12,backgroundColor:NAVY,borderRadius:2,marginRight:4,verticalAlign:'middle'}}></span> Upcoming</span>
                    <span><span style={{display:'inline-block',width:12,height:12,backgroundColor:'#ff9800',borderRadius:2,marginRight:4,verticalAlign:'middle'}}></span> Day Off</span>
                  </div>
                  {scheduleClickedAlloc && (
                    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,backgroundColor:'rgba(0,0,0,0.5)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:20}} onClick={()=>setScheduleClickedAlloc(null)}>
                      <div onClick={e=>e.stopPropagation()} style={{backgroundColor:'white',borderRadius:12,padding:24,maxWidth:420,width:'100%',boxShadow:'0 20px 60px rgba(0,0,0,0.3)'}}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
                          <h3 style={{margin:0,color:NAVY,fontSize:18}}>Job Details</h3>
                          <button onClick={()=>setScheduleClickedAlloc(null)} style={{background:'none',border:'none',fontSize:20,cursor:'pointer',color:'#999'}}>x</button>
                        </div>
                        <div style={{fontSize:14,lineHeight:'2'}}>
                          <div><strong>Carpenter:</strong> {scheduleClickedAlloc.carpenter}</div>
                          <div><strong>Site:</strong> {scheduleClickedAlloc.site}</div>
                          <div><strong>Plot:</strong> {scheduleClickedAlloc.plot}</div>
                          <div><strong>House Type:</strong> {scheduleClickedAlloc.houseType}</div>
                          <div><strong>Stage:</strong> {scheduleClickedAlloc.stage}</div>
                          <div><strong>Start:</strong> {formatDate(scheduleClickedAlloc.startDate)}</div>
                          <div><strong>End:</strong> {formatDate(scheduleClickedAlloc.endDate)}</div>
                          <div><strong>Days:</strong> {daysInRange(scheduleClickedAlloc.startDate,scheduleClickedAlloc.endDate)}</div>
                          <div><strong>Status:</strong> <span style={{fontWeight:'bold',color:scheduleClickedAlloc.completed?'#2e7d32':scheduleClickedAlloc.delayed?'#d32f2f':GOLD}}>{scheduleClickedAlloc.completed?'Complete':scheduleClickedAlloc.delayed?'Delayed':'In Progress'}</span></div>
                          {scheduleClickedAlloc.delayed && <div><strong>Delay:</strong> +{scheduleClickedAlloc.delayDays} days</div>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );})()}
                            {scheduleView === 'list' && (
                <div style={{overflowX:'auto'}}>
                <table style={{ width:'100%', borderCollapse:'collapse', minWidth:'700px' }}>
                  <thead><tr style={{ backgroundColor:NAVY, color:CREAM }}>
                    {['Carpenter','Site','Plot','Type','Stage','Start','End','Status'].map(h => <th key={h} style={{ padding:'10px', textAlign:'left', fontSize:'11px' }}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {allocations.map((alloc,idx) => (
                      <tr key={alloc.id} style={{ backgroundColor: alloc.delayed?'#fff3e0':(idx%2===0?'#f9f9f9':'white'), borderBottom:'1px solid #ddd' }}>
                        <td style={{ padding:'8px', fontSize:'12px' }}>{alloc.carpenter}</td>
                        <td style={{ padding:'8px', fontSize:'12px' }}>{alloc.site}</td>
                        <td style={{ padding:'8px', fontSize:'12px' }}>{alloc.plot}</td>
                        <td style={{ padding:'8px', fontSize:'12px' }}>{alloc.houseType}</td>
                        <td style={{ padding:'8px', fontSize:'12px' }}>{alloc.stage}</td>
                        <td style={{ padding:'8px', fontSize:'12px' }}>{formatDate(alloc.startDate)}</td>
                        <td style={{ padding:'8px', fontSize:'12px' }}>{formatDate(alloc.endDate)}</td>
                        <td style={{ padding:'8px', fontSize:'12px' }}>
                          {alloc.completed?<span style={{color:'#2e7d32',fontWeight:'bold'}}>Complete</span>:alloc.delayed?<span style={{color:'#d32f2f',fontWeight:'bold'}}>Delayed +{alloc.delayDays}d</span>:new Date(alloc.startDate)<=todayDate&&new Date(alloc.endDate)>=todayDate?<span style={{color:GOLD,fontWeight:'bold'}}>In Progress</span>:todayDate>new Date(alloc.endDate)?<span style={{color:'#d32f2f',fontWeight:'bold'}}>Overdue</span>:<span style={{color:NAVY,fontWeight:'bold'}}>Upcoming</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table></div>
              )}
            </div>
          )}

          {/* ========== ADMIN CARPENTERS ========== */}
          {user?.role === 'admin' && adminTab === 'carpenters' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Carpenter Roster</h2>
              <div style={{overflowX:'auto'}}>
              <table style={{ width:'100%', borderCollapse:'collapse', minWidth:'500px' }}>
                <thead><tr style={{ backgroundColor:NAVY, color:CREAM }}>
                  {['ID','Name','PIN','Site','Builder','Status'].map(h => <th key={h} style={{ padding:'10px', textAlign:'left', fontSize:'11px' }}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {CARPENTERS.map((carp,idx) => (
                    <tr key={carp.id} style={{ backgroundColor: idx%2===0?'#f9f9f9':'white', borderBottom:'1px solid #ddd' }}>
                      <td style={{ padding:'8px', fontSize:'12px' }}>{carp.id}</td><td style={{ padding:'8px', fontSize:'12px' }}>{carp.name}</td>
                      <td style={{ padding:'8px', fontSize:'12px', fontFamily:'monospace' }}>{carp.pin}</td><td style={{ padding:'8px', fontSize:'12px' }}>{carp.site}</td>
                      <td style={{ padding:'8px', fontSize:'12px' }}>{carp.builder}</td><td style={{ padding:'8px', fontSize:'12px' }}>{carp.status || 'Active'}</td>
                    </tr>
                  ))}
                </tbody>
              </table></div>
            </div>
          )}

          {/* ========== ADMIN DELAYS ========== */}
          {user?.role === 'admin' && adminTab === 'delays' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Delayed Works</h2>
              {delays.length === 0 ? <div style={{backgroundColor:'white',padding:'20px',borderRadius:'8px',textAlign:'center'}}><p style={{color:'#666',fontSize:14,margin:0}}>No delays reported.</p></div> : (
                <div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:12,marginBottom:20}}>
                    <div style={{backgroundColor:'#d32f2f',color:'white',padding:14,borderRadius:8}}><p style={{margin:0,fontSize:11,opacity:.8}}>Active Delays</p><h3 style={{margin:'4px 0 0',fontSize:22}}>{delays.filter(d=>d.status==='active').length}</h3></div>
                    <div style={{backgroundColor:NAVY,color:CREAM,padding:14,borderRadius:8}}><p style={{margin:0,fontSize:11,opacity:.8}}>Total Delay Days</p><h3 style={{margin:'4px 0 0',fontSize:22}}>{delays.reduce((s,d)=>s+d.delayDays,0)}</h3></div>
                  </div>
                  {delays.sort((a,b)=>b.id-a.id).map(d => (
                    <div key={d.id} style={{backgroundColor:'white',border:d.status==='active'?'2px solid #d32f2f':'1px solid #ddd',borderLeft:d.status==='active'?'5px solid #d32f2f':'5px solid #999',borderRadius:8,padding:16,marginBottom:10}}>
                      <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:8}}>
                        <div><strong style={{fontSize:15}}>{d.carpenter}</strong><div style={{fontSize:12,color:'#666',marginTop:2}}>{d.site} - Plot {d.plot} / {d.stage}</div></div>
                        <div style={{textAlign:'right'}}>
                          <span style={{display:'inline-block',padding:'3px 10px',borderRadius:4,fontSize:11,fontWeight:'bold',backgroundColor:d.status==='active'?'#ffebee':'#e8f5e9',color:d.status==='active'?'#c62828':'#2e7d32'}}>{d.status==='active'?'ACTIVE':'RESOLVED'}</span>
                          <div style={{fontSize:12,marginTop:4,fontWeight:'bold',color:'#d32f2f'}}>+{d.delayDays} day{d.delayDays>1?'s':''}</div>
                        </div>
                      </div>
                      <div style={{marginTop:10,padding:10,backgroundColor:'#fafafa',borderRadius:4,fontSize:13}}><strong>Reason:</strong> {d.reason}</div>
                      <div style={{marginTop:6,fontSize:11,color:'#999'}}>Reported: {d.date}</div>
                      {d.status==='active' && <button onClick={()=>setDelays(delays.map(dd=>dd.id===d.id?{...dd,status:'resolved'}:dd))} style={{marginTop:8,backgroundColor:'#2e7d32',color:'white',padding:'5px 12px',border:'none',borderRadius:4,cursor:'pointer',fontSize:12,fontWeight:'bold'}}>Mark Resolved</button>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========== ADMIN FIXINGS ========== */}
          {user?.role === 'admin' && adminTab === 'fixings' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Fixings and Materials Requests</h2>
              {allFixingRequests.length === 0 ? <div style={{backgroundColor:'white',padding:'20px',borderRadius:'8px',textAlign:'center'}}><p style={{color:'#666',fontSize:14,margin:0}}>No fixing requests yet.</p></div> : (
                <div>
                  {allFixingRequests.sort((a,b)=>b.id-a.id).map(req => (
                    <div key={req.id} style={{backgroundColor:'white',border:'1px solid #ddd',borderLeft:req.status==='pending'?'5px solid '+GOLD:req.status==='approved'?'5px solid #2e7d32':'5px solid #999',borderRadius:8,padding:14,marginBottom:10}}>
                      <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:8}}>
                        <div>
                          <strong style={{fontSize:14}}>{req.carpenter}</strong>
                          <div style={{fontSize:12,color:'#666',marginTop:2}}>{req.site}{req.plot?' - Plot '+req.plot:''}</div>
                          <div style={{marginTop:6,fontSize:14}}><strong>{req.item}</strong> x {req.qty}</div>
                          {req.notes && <div style={{fontSize:12,color:'#888',marginTop:4}}>Note: {req.notes}</div>}
                        </div>
                        <div style={{display:'flex',gap:6,alignItems:'center'}}>
                          {req.status==='pending' && (<>
                            <button onClick={()=>{setAllFixingRequests(allFixingRequests.map(r=>r.id===req.id?{...r,status:'approved'}:r));setSuccessMsg('Approved');setTimeout(()=>setSuccessMsg(''),2500);}} style={{backgroundColor:'#2e7d32',color:'white',padding:'6px 14px',border:'none',borderRadius:4,cursor:'pointer',fontSize:12,fontWeight:'bold'}}>Approve</button>
                            <button onClick={()=>{setAllFixingRequests(allFixingRequests.map(r=>r.id===req.id?{...r,status:'denied'}:r));setSuccessMsg('Denied');setTimeout(()=>setSuccessMsg(''),2500);}} style={{backgroundColor:'#d32f2f',color:'white',padding:'6px 14px',border:'none',borderRadius:4,cursor:'pointer',fontSize:12,fontWeight:'bold'}}>Deny</button>
                          </>)}
                          {req.status!=='pending' && <span style={{padding:'4px 12px',borderRadius:4,fontSize:11,fontWeight:'bold',backgroundColor:req.status==='approved'?'#e8f5e9':'#ffebee',color:req.status==='approved'?'#2e7d32':'#c62828'}}>{req.status.toUpperCase()}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========== ADMIN + SITE MANAGER NOTIFICATIONS (SEND) ========== */}
          {((user?.role === 'admin' && adminTab === 'notifications') || (user?.role === 'site_manager' && siteManagerTab === 'notifications')) && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Notifications and Signing</h2>

              {/* Send form */}
              <div style={{backgroundColor:NAVY,color:CREAM,padding:'20px',borderRadius:'8px',marginBottom:'25px'}}>
                <h3 style={{margin:'0 0 15px',fontSize:16,color:GOLD}}>Send New Notification</h3>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:12,marginBottom:12}}>
                  <div>
                    <label style={{display:'block',marginBottom:4,fontSize:11}}>Type</label>
                    <select value={notifType} onChange={(e)=>setNotifType(e.target.value)} style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,fontSize:13}}>
                      <option value="Toolbox Talk">Toolbox Talk</option>
                      <option value="RAMS">RAMS (Risk Assessment)</option>
                      <option value="H&S Document">H&S Document</option>
                    </select>
                  </div>
                  <div>
                    <label style={{display:'block',marginBottom:4,fontSize:11}}>Site</label>
                    {user?.role === 'site_manager' ? (
                      <input type="text" value={user?.site} disabled style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,fontSize:13,backgroundColor:'#eee',boxSizing:'border-box'}} />
                    ) : (
                      <select value={notifSite} onChange={(e)=>setNotifSite(e.target.value)} style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,fontSize:13}}>
                        <option value="">Select Site</option>
                        {BUILDERS.flatMap(b=>b.sites.map(s=>s.name)).map(s=><option key={s} value={s}>{s}</option>)}
                      </select>
                    )}
                  </div>
                </div>
                <div style={{marginBottom:12}}>
                  <label style={{display:'block',marginBottom:4,fontSize:11}}>Title</label>
                  <input type="text" value={notifTitle} onChange={(e)=>setNotifTitle(e.target.value)} placeholder="e.g. Working at Heights Briefing"
                    style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,boxSizing:'border-box',fontSize:13}} />
                </div>
                <div style={{marginBottom:12}}>
                  <label style={{display:'block',marginBottom:4,fontSize:11}}>Message / Document Details</label>
                  <textarea value={notifMessage} onChange={(e)=>setNotifMessage(e.target.value)} placeholder="Enter the full details of the toolbox talk, RAMS, or H&S document..."
                    style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,minHeight:100,boxSizing:'border-box',fontFamily:'inherit',fontSize:13}} />
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:10}}>
                  <div style={{fontSize:12,opacity:.8}}>
                    Will be sent to: {CARPENTERS.filter(c=>c.site===(user?.role==='site_manager'?user?.site:notifSite)).map(c=>c.name).join(', ') || 'Select a site'}
                  </div>
                  <button type="button" onClick={()=>{
                    if(user?.role==='site_manager') { if(!notifTitle.trim()||!notifMessage.trim()){alert('Please fill in all fields');return;} const siteCarpenterNames=CARPENTERS.filter(c=>c.site===user?.site).map(c=>c.name); if(siteCarpenterNames.length===0){alert('No carpenters on this site');return;} setNotifications([{id:Date.now(),type:notifType,title:notifTitle,message:notifMessage,site:user?.site,sentBy:user?.name,sentDate:new Date().toISOString().split('T')[0],recipients:siteCarpenterNames,responses:{}},...notifications]); setNotifTitle('');setNotifMessage(''); setSuccessMsg('Sent to '+siteCarpenterNames.length+' carpenter'+(siteCarpenterNames.length>1?'s':'')); setTimeout(()=>setSuccessMsg(''),2500); }
                    else sendNotification();
                  }} style={{backgroundColor:GOLD,color:NAVY,padding:'10px 24px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:14}}>
                    Send to Site
                  </button>
                </div>
              </div>

              {/* Sent notifications with response tracking */}
              <h3 style={{color:NAVY,fontSize:16,marginBottom:12}}>Sent Notifications</h3>
              {myNotifications.length === 0 ? <p style={{color:'#666',fontSize:14}}>No notifications sent yet.</p> : (
                myNotifications.sort((a,b)=>b.id-a.id).map(notif => {
                  const totalRecipients = notif.recipients.length;
                  const readCount = notif.recipients.filter(r=>notif.responses[r]?.read).length;
                  const signedCount = notif.recipients.filter(r=>notif.responses[r]?.signed).length;
                  return (
                    <div key={notif.id} style={{backgroundColor:'white',border:'1px solid #ddd',borderRadius:8,padding:16,marginBottom:12}}>
                      <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:8,marginBottom:10}}>
                        <div>
                          <span style={{display:'inline-block',padding:'2px 8px',borderRadius:3,fontSize:10,fontWeight:'bold',marginRight:6,
                            backgroundColor:notif.type==='Toolbox Talk'?'#e3f2fd':notif.type==='RAMS'?'#fff3e0':'#fce4ec',
                            color:notif.type==='Toolbox Talk'?'#1565c0':notif.type==='RAMS'?'#e65100':'#c62828'}}>{notif.type}</span>
                          <strong style={{fontSize:15}}>{notif.title}</strong>
                          <div style={{fontSize:12,color:'#666',marginTop:4}}>Site: {notif.site} | Sent: {notif.sentDate} | By: {notif.sentBy}</div>
                        </div>
                        <div style={{textAlign:'right',fontSize:12}}>
                          <div>Read: <strong>{readCount}/{totalRecipients}</strong></div>
                          <div style={{color: signedCount===totalRecipients?'#2e7d32':'#e65100',fontWeight:'bold'}}>Signed: {signedCount}/{totalRecipients}</div>
                        </div>
                      </div>
                      <div style={{fontSize:13,color:'#333',marginBottom:12,padding:10,backgroundColor:'#fafafa',borderRadius:4,whiteSpace:'pre-wrap'}}>{notif.message}</div>
                      <div style={{borderTop:'1px solid #eee',paddingTop:10}}>
                        <p style={{margin:'0 0 8px',fontSize:12,fontWeight:'bold',color:NAVY}}>Responses:</p>
                        {notif.recipients.map(name => {
                          const resp = notif.responses[name];
                          return (
                            <div key={name} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 8px',marginBottom:4,backgroundColor:resp?.signed?'#e8f5e9':resp?.read?'#fff8e1':'#f5f5f5',borderRadius:4,fontSize:13}}>
                              <span>{name}</span>
                              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                                {resp?.read && <span style={{fontSize:11,color:'#666'}}>Read {resp.readDate}</span>}
                                {resp?.signed ? (
                                  <span style={{fontSize:11,color:'#2e7d32',fontWeight:'bold'}}>Signed {resp.signedDate}</span>
                                ) : (
                                  <span style={{fontSize:11,color:'#e65100'}}>Awaiting signature</span>
                                )}
                                {resp?.signature && <img src={resp.signature} alt="sig" style={{height:25,border:'1px solid #ddd',borderRadius:2}} />}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* ========== ADMIN PRICE LISTS ========== */}
          {user?.role === 'admin' && adminTab === 'price lists' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Price Lists</h2>
              {Object.entries(PRICE_LISTS).map(([builder, sites]) => (
                <div key={builder} style={{ marginBottom:'15px', backgroundColor:'white', padding:'15px', borderRadius:'8px', border:'1px solid #ddd' }}>
                  <h3 style={{ color:NAVY, margin:'0 0 10px 0', fontSize:16 }}>{builder}</h3>
                  {Object.entries(sites).map(([site, rates]) => (
                    <div key={site} style={{ marginLeft:'10px', marginBottom:'10px', padding:'10px', backgroundColor:'#f9f9f9', borderRadius:'4px' }}>
                      <h4 style={{ color:'#333', margin:'0 0 8px 0', fontSize:14 }}>{site}</h4>
                      <table style={{ width:'100%', fontSize:'12px' }}><tbody>
                        {Object.entries(rates).map(([stage, price]) => <tr key={stage} style={{borderBottom:'1px solid #eee'}}><td style={{padding:'4px'}}>{stage}</td><td style={{padding:'4px',textAlign:'right',fontWeight:'bold'}}>GBP {price}</td></tr>)}
                      </tbody></table>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* ========== ADMIN DOCUMENTS ========== */}
          {user?.role === 'admin' && adminTab === 'documents' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Documents</h2>
              {Object.entries(DOCUMENTS).map(([site, categories]) => (
                <div key={site} style={{ marginBottom:'15px', backgroundColor:'white', padding:'15px', borderRadius:'8px', border:'1px solid #ddd' }}>
                  <h3 style={{ color:NAVY, margin:'0 0 10px 0', fontSize:16 }}>{site}</h3>
                  {Object.entries(categories).map(([cat, docs]) => (
                    <div key={cat} style={{ marginLeft:'10px', marginBottom:'10px', padding:'10px', backgroundColor:'#f9f9f9', borderRadius:'4px' }}>
                      <h4 style={{ color:'#333', margin:'0 0 8px 0', fontSize:14 }}>{cat}</h4>
                      {docs.map((doc,idx) => <div key={idx} style={{marginBottom:4,padding:'6px 8px',backgroundColor:'white',borderRadius:3,fontSize:13}}>{doc}</div>)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* ========== SITE MANAGER OVERVIEW ========== */}
          {user?.role === 'site_manager' && siteManagerTab === 'overview' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Build Programme: {user?.site}</h2>
              <input type="text" placeholder="Filter by plot" value={plotFilter} onChange={(e)=>setPlotFilter(e.target.value)} style={{padding:8,borderRadius:4,border:'2px solid '+GOLD,fontSize:14,width:'100%',maxWidth:250,boxSizing:'border-box',marginBottom:15}} />
              {(() => {
                const siteAllocs = allocations.filter(a => a.site === user?.site && (plotFilter === '' || a.plot.includes(plotFilter)));
                const siteWork = workLog.filter(w => w.site === user?.site && (plotFilter === '' || w.plot.includes(plotFilter)));
                const completedCount = siteAllocs.filter(a => a.completed).length;
                const activeCount = siteAllocs.filter(a => !a.completed && new Date(a.startDate) <= todayDate && new Date(a.endDate) >= todayDate).length;
                const delayedCount = siteAllocs.filter(a => a.delayed && !a.completed).length;
                return (<div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:10,marginBottom:18}}>
                    <div style={{backgroundColor:NAVY,color:CREAM,padding:14,borderRadius:8,textAlign:'center'}}><div style={{fontSize:22,fontWeight:'bold'}}>{siteWork.length}</div><div style={{fontSize:11}}>Total Jobs</div></div>
                    <div style={{backgroundColor:GOLD,color:NAVY,padding:14,borderRadius:8,textAlign:'center'}}><div style={{fontSize:22,fontWeight:'bold'}}>{activeCount}</div><div style={{fontSize:11}}>In Progress</div></div>
                    <div style={{backgroundColor:'#4caf50',color:'white',padding:14,borderRadius:8,textAlign:'center'}}><div style={{fontSize:22,fontWeight:'bold'}}>{completedCount}</div><div style={{fontSize:11}}>Complete</div></div>
                    {delayedCount>0&&<div style={{backgroundColor:'#d32f2f',color:'white',padding:14,borderRadius:8,textAlign:'center'}}><div style={{fontSize:22,fontWeight:'bold'}}>{delayedCount}</div><div style={{fontSize:11}}>Delayed</div></div>}
                  </div>
                  {siteAllocs.length > 0 && (<div style={{marginBottom:18}}>
                    <h3 style={{color:NAVY,fontSize:16,margin:'0 0 10px'}}>Allocated Works</h3>
                    {siteAllocs.sort((a,b)=>new Date(a.startDate)-new Date(b.startDate)).map(alloc => {
                      const start=new Date(alloc.startDate);const end=new Date(alloc.endDate);
                      const totalDays=daysInRange(alloc.startDate,alloc.endDate);
                      const isComp=alloc.completed;const isAct=!isComp&&todayDate>=start&&todayDate<=end;
                      const prog=isComp?100:isAct?Math.round((Math.max(1,Math.ceil((todayDate-start)/864e5)+1)/totalDays)*100):0;
                      return (<div key={alloc.id} style={{backgroundColor:'white',padding:12,borderRadius:8,marginBottom:8,borderLeft:'5px solid '+(isComp?'#4caf50':alloc.delayed?'#d32f2f':isAct?GOLD:NAVY),border:'1px solid #ddd'}}>
                        <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:6,fontSize:13}}>
                          <strong>Plot {alloc.plot} - {alloc.houseType}</strong>
                          <span style={{padding:'2px 8px',borderRadius:3,fontSize:10,fontWeight:'bold',backgroundColor:isComp?'#e8f5e9':isAct?'#fff8e1':'#e3f2fd',color:isComp?'#2e7d32':isAct?'#e65100':'#1565c0'}}>{isComp?'Complete':isAct?'In Progress':'Upcoming'}</span>
                        </div>
                        <div style={{fontSize:12,color:'#666',marginTop:4}}>{alloc.stage} | {alloc.carpenter} | {formatDate(alloc.startDate)} - {formatDate(alloc.endDate)} ({totalDays}d)</div>
                        {alloc.delayed&&<div style={{fontSize:11,color:'#d32f2f',marginTop:4}}>Delayed +{alloc.delayDays} day{alloc.delayDays>1?'s':''}</div>}
                        {(isComp||isAct)&&<div style={{marginTop:6,backgroundColor:'#e0e0e0',borderRadius:4,height:4,overflow:'hidden'}}><div style={{backgroundColor:isComp?'#4caf50':GOLD,height:'100%',width:prog+'%',borderRadius:4}}></div></div>}
                      </div>);
                    })}
                  </div>)}
                  {siteWork.length > 0 && (<div>
                    <h3 style={{color:NAVY,fontSize:16,margin:'0 0 10px'}}>Work Log</h3>
                    <div style={{overflowX:'auto'}}>
                    <table style={{width:'100%',borderCollapse:'collapse',minWidth:400}}>
                      <thead><tr style={{backgroundColor:NAVY,color:CREAM}}>{['Plot','House Type','Stage','Status','Carpenter'].map(h=><th key={h} style={{padding:10,textAlign:'left',fontSize:11}}>{h}</th>)}</tr></thead>
                      <tbody>{siteWork.map((item,idx)=>(
                        <tr key={item.id} style={{backgroundColor:item.status==='complete'?'#f1f8e9':idx%2===0?'#f9f9f9':'white',borderBottom:'1px solid #ddd'}}>
                          <td style={{padding:8,fontSize:12}}>{item.plot}</td><td style={{padding:8,fontSize:12}}>{item.houseType}</td>
                          <td style={{padding:8,fontSize:12}}>{item.stage}</td>
                          <td style={{padding:8,fontSize:12}}><span style={{padding:'2px 6px',borderRadius:3,fontSize:10,fontWeight:'bold',backgroundColor:item.status==='complete'?'#e8f5e9':item.status==='allocated'?'#fff8e1':'#e3f2fd',color:item.status==='complete'?'#2e7d32':item.status==='allocated'?'#e65100':'#1565c0'}}>{item.status==='complete'?'Complete':item.status==='allocated'?'In Progress':'Logged'}</span></td>
                          <td style={{padding:8,fontSize:12}}>{item.allocatedTo||'-'}</td>
                        </tr>))}</tbody>
                    </table></div>
                  </div>)}
                </div>);
              })()}
            </div>
          )}

          {/* ========== SITE MANAGER LOG WORK ========== */}
          {user?.role === 'site_manager' && siteManagerTab === 'log work' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Log Work Request</h2>
              <div style={{backgroundColor:NAVY,color:CREAM,padding:20,borderRadius:8,maxWidth:500}}>
                <div style={{marginBottom:15}}><label style={{display:'block',marginBottom:4,fontSize:11}}>Plot Number</label>
                  <input type="text" placeholder="e.g. 34" value={smPlot} onChange={(e)=>setSmPlot(e.target.value)} style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,boxSizing:'border-box',fontSize:13}} /></div>
                <div style={{marginBottom:15}}><label style={{display:'block',marginBottom:4,fontSize:11}}>House Type</label>
                  <select value={smHouseType} onChange={(e)=>setSmHouseType(e.target.value)} style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,fontSize:13}}>
                    <option value="">Select</option>{getSiteHousetypes(user?.site).map(ht=><option key={ht} value={ht}>{ht}</option>)}</select></div>
                <div style={{marginBottom:15}}><label style={{display:'block',marginBottom:4,fontSize:11}}>Stage</label>
                  <select value={smStage} onChange={(e)=>setSmStage(e.target.value)} style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,fontSize:13}}>
                    <option value="">Select</option>{['Joists','Roof','First Fix','Drop Backs','Second Fix','Final','Snags'].map(s=><option key={s} value={s}>{s}</option>)}</select></div>
                <div style={{marginBottom:15}}><label style={{display:'block',marginBottom:4,fontSize:11}}>Notes</label>
                  <textarea placeholder="Details..." value={smNotes} onChange={(e)=>setSmNotes(e.target.value)} style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,minHeight:60,boxSizing:'border-box',fontFamily:'inherit',fontSize:13}} /></div>
                <button type="button" onClick={()=>{
                  if(smPlot&&smHouseType&&smStage){const builder=BUILDERS.find(b=>b.sites.some(s=>s.name===user?.site));
                    setWorkLog([...workLog,{id:Math.max(...workLog.map(w=>w.id),0)+1,site:user?.site,builder:builder?builder.name:'',plot:smPlot,houseType:smHouseType,stage:smStage,expectedDays:2,priority:'medium',notes:smNotes,status:'logged'}]);
                    addWorkLogEntry({site:user?.site,builder:builder?builder.name:'',plot:smPlot,house_type:smHouseType,stage:smStage,expected_days:2,priority:'medium',notes:smNotes,status:'logged'}).catch(e=>console.error('DB error:',e));
                    setSmPlot('');setSmHouseType('');setSmStage('');setSmNotes('');setSuccessMsg('Work request submitted');setTimeout(()=>setSuccessMsg(''),2500);
                  }else{alert('Please fill in all fields');}
                }} style={{backgroundColor:GOLD,color:NAVY,padding:'10px 20px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:14}}>Submit Request</button>
              </div>
            </div>
          )}

          {/* ========== SITE MANAGER DOCUMENTS ========== */}
          {user?.role === 'site_manager' && siteManagerTab === 'documents' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Documents: {user?.site}</h2>
              {DOCUMENTS[user?.site] && Object.entries(DOCUMENTS[user?.site]).map(([cat,docs])=>(
                <div key={cat} style={{marginBottom:15,backgroundColor:'white',padding:15,borderRadius:8,border:'1px solid #ddd'}}>
                  <h3 style={{color:NAVY,margin:'0 0 10px',fontSize:15}}>{cat}</h3>
                  {docs.map((doc,idx)=><div key={idx} style={{marginBottom:6,padding:8,backgroundColor:'#f9f9f9',borderRadius:4,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8,fontSize:13}}>
                    <span>{doc}</span><button onClick={()=>{setSuccessMsg('Download: '+doc);setTimeout(()=>setSuccessMsg(''),2500);}} style={{padding:'4px 10px',fontSize:11,backgroundColor:GOLD,color:NAVY,border:'none',borderRadius:3,cursor:'pointer',fontWeight:'bold'}}>View</button>
                  </div>)}
                </div>
              ))}
            </div>
          )}

          {/* ========== SITE MANAGER COMPLIANCE ========== */}
          {user?.role === 'site_manager' && siteManagerTab === 'compliance' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Compliance: {user?.site}</h2>
              <p style={{color:'#666',fontSize:13,marginBottom:16}}>Check carpenter induction, RAMS, and toolbox talk status. Send documents to sign.</p>
              {(() => {
                const siteCps = CARPENTERS.filter(c => c.site === user?.site);
                if(siteCps.length === 0) return <p style={{color:'#888',fontSize:14}}>No carpenters assigned to this site.</p>;
                return siteCps.map(carp => {
                  const carpNotifs = notifications.filter(n => n.recipients.includes(carp.name));
                  const toolboxTalks = carpNotifs.filter(n => n.type === 'Toolbox Talk');
                  const rams = carpNotifs.filter(n => n.type === 'RAMS');
                  const hsDocs = carpNotifs.filter(n => n.type === 'H&S Document');
                  const tbSigned = toolboxTalks.length > 0 && toolboxTalks.every(n => n.responses[carp.name]?.signed);
                  const ramsSigned = rams.length > 0 && rams.every(n => n.responses[carp.name]?.signed);
                  const hsSigned = hsDocs.length > 0 && hsDocs.every(n => n.responses[carp.name]?.signed);
                  const allClear = (toolboxTalks.length === 0 || tbSigned) && (rams.length === 0 || ramsSigned) && (hsDocs.length === 0 || hsSigned);
                  const isExpanded = smSelectedCarp === carp.id;
                  return (
                    <div key={carp.id} style={{backgroundColor:'white',border:'1px solid #ddd',borderRadius:10,marginBottom:12,overflow:'hidden',borderLeft:'6px solid '+(allClear?'#4caf50':'#d32f2f')}}>
                      <div onClick={()=>setSmSelectedCarp(isExpanded?null:carp.id)} style={{padding:16,cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <div>
                          <strong style={{fontSize:15,color:NAVY}}>{carp.name}</strong>
                          <span style={{marginLeft:10,fontSize:11,color:'#888'}}>{carp.id}</span>
                        </div>
                        <div style={{display:'flex',gap:6,alignItems:'center'}}>
                          <span style={{padding:'3px 8px',borderRadius:4,fontSize:10,fontWeight:'bold',backgroundColor:allClear?'#e8f5e9':'#ffebee',color:allClear?'#2e7d32':'#c62828'}}>{allClear?'All Clear':'Action Required'}</span>
                          <span style={{fontSize:12,color:'#888'}}>{isExpanded?'[-]':'[+]'}</span>
                        </div>
                      </div>
                      {isExpanded && (
                        <div style={{padding:'0 16px 16px'}}>
                          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:10,marginBottom:14}}>
                            <div style={{padding:12,borderRadius:6,backgroundColor:toolboxTalks.length===0?'#f5f5f5':tbSigned?'#e8f5e9':'#fff3e0',textAlign:'center',border:'1px solid '+(tbSigned?'#a5d6a7':'#ffcc80')}}>
                              <div style={{fontSize:11,color:'#666',marginBottom:4}}>Toolbox Talks</div>
                              <div style={{fontWeight:'bold',fontSize:14,color:toolboxTalks.length===0?'#999':tbSigned?'#2e7d32':'#e65100'}}>{toolboxTalks.length===0?'None Sent':tbSigned?'Signed':'Unsigned'}</div>
                              <div style={{fontSize:10,color:'#888',marginTop:2}}>{toolboxTalks.length} sent</div>
                            </div>
                            <div style={{padding:12,borderRadius:6,backgroundColor:rams.length===0?'#f5f5f5':ramsSigned?'#e8f5e9':'#fff3e0',textAlign:'center',border:'1px solid '+(ramsSigned?'#a5d6a7':'#ffcc80')}}>
                              <div style={{fontSize:11,color:'#666',marginBottom:4}}>RAMS</div>
                              <div style={{fontWeight:'bold',fontSize:14,color:rams.length===0?'#999':ramsSigned?'#2e7d32':'#e65100'}}>{rams.length===0?'None Sent':ramsSigned?'Signed':'Unsigned'}</div>
                              <div style={{fontSize:10,color:'#888',marginTop:2}}>{rams.length} sent</div>
                            </div>
                            <div style={{padding:12,borderRadius:6,backgroundColor:hsDocs.length===0?'#f5f5f5':hsSigned?'#e8f5e9':'#fff3e0',textAlign:'center',border:'1px solid '+(hsSigned?'#a5d6a7':'#ffcc80')}}>
                              <div style={{fontSize:11,color:'#666',marginBottom:4}}>H&S Docs</div>
                              <div style={{fontWeight:'bold',fontSize:14,color:hsDocs.length===0?'#999':hsSigned?'#2e7d32':'#e65100'}}>{hsDocs.length===0?'None Sent':hsSigned?'Signed':'Unsigned'}</div>
                              <div style={{fontSize:10,color:'#888',marginTop:2}}>{hsDocs.length} sent</div>
                            </div>
                          </div>
                          {carpNotifs.length > 0 && (
                            <div style={{marginBottom:14}}>
                              <h4 style={{color:NAVY,fontSize:13,margin:'0 0 8px'}}>Document History</h4>
                              {carpNotifs.sort((a,b)=>b.id-a.id).map(n => (
                                <div key={n.id} style={{padding:8,marginBottom:4,backgroundColor:'#fafafa',borderRadius:4,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:6,fontSize:12}}>
                                  <div><span style={{padding:'1px 5px',borderRadius:2,fontSize:9,fontWeight:'bold',marginRight:6,backgroundColor:n.type==='Toolbox Talk'?'#e3f2fd':n.type==='RAMS'?'#fff3e0':'#fce4ec',color:n.type==='Toolbox Talk'?'#1565c0':n.type==='RAMS'?'#e65100':'#c62828'}}>{n.type}</span>{n.title}</div>
                                  <span style={{padding:'2px 6px',borderRadius:3,fontSize:10,fontWeight:'bold',backgroundColor:n.responses[carp.name]?.signed?'#e8f5e9':n.responses[carp.name]?.read?'#fff8e1':'#ffebee',color:n.responses[carp.name]?.signed?'#2e7d32':n.responses[carp.name]?.read?'#e65100':'#c62828'}}>{n.responses[carp.name]?.signed?'Signed':n.responses[carp.name]?.read?'Read':'Unread'}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          {sendDocCarp===carp.id ? (
                            <div style={{padding:14,backgroundColor:NAVY,borderRadius:8}}>
                              <h4 style={{color:CREAM,margin:'0 0 10px',fontSize:14}}>Send Document to {carp.name}</h4>
                              <div style={{marginBottom:10}}><label style={{display:'block',color:'#aaa',fontSize:11,marginBottom:3}}>Type</label>
                                <select value={sendDocType} onChange={(e)=>setSendDocType(e.target.value)} style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,fontSize:13}}><option>Toolbox Talk</option><option>RAMS</option><option>H&S Document</option></select></div>
                              <div style={{marginBottom:10}}><label style={{display:'block',color:'#aaa',fontSize:11,marginBottom:3}}>Title</label>
                                <input type="text" value={sendDocTitle} onChange={(e)=>setSendDocTitle(e.target.value)} placeholder="e.g. Working at Heights - April 2026" style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,fontSize:13,boxSizing:'border-box'}} /></div>
                              <div style={{marginBottom:12}}><label style={{display:'block',color:'#aaa',fontSize:11,marginBottom:3}}>Message / Instructions</label>
                                <textarea value={sendDocMessage} onChange={(e)=>setSendDocMessage(e.target.value)} placeholder="Details for the carpenter..." style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,fontSize:13,minHeight:60,boxSizing:'border-box',fontFamily:'inherit'}} /></div>
                              <div style={{display:'flex',gap:8}}>
                                <button onClick={()=>{
                                  if(!sendDocTitle.trim()||!sendDocMessage.trim()){alert('Please fill in all fields');return;}
                                  const notif={id:Date.now(),type:sendDocType,title:sendDocTitle,message:sendDocMessage,site:user?.site,sentBy:user?.name||'Site Manager',sentDate:new Date().toISOString().split('T')[0],recipients:[carp.name],responses:{}};
                                  setNotifications([notif,...notifications]);
                                  addNotification({type:sendDocType,title:sendDocTitle,message:sendDocMessage,site:user?.site,sent_by:user?.name||'Site Manager',sent_date:new Date().toISOString().split('T')[0],recipients:[sendDocCarp]}).catch(e=>console.error('DB error:',e));
                                  setSendDocCarp(null);setSendDocTitle('');setSendDocMessage('');
                                  setSuccessMsg('Document sent to '+carp.name);setTimeout(()=>setSuccessMsg(''),2500);
                                }} style={{backgroundColor:GOLD,color:NAVY,padding:'8px 18px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:13}}>Send</button>
                                <button onClick={()=>{setSendDocCarp(null);setSendDocTitle('');setSendDocMessage('');}} style={{backgroundColor:'#666',color:'white',padding:'8px 18px',border:'none',borderRadius:4,cursor:'pointer',fontSize:13}}>Cancel</button>
                              </div>
                            </div>
                          ) : (
                            <button onClick={()=>setSendDocCarp(carp.id)} style={{backgroundColor:GOLD,color:NAVY,padding:'8px 18px',border:'none',borderRadius:5,cursor:'pointer',fontWeight:'bold',fontSize:13}}>Send Document to Sign</button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                });
              })()}
            </div>
          )}

          {/* ========== SITE MANAGER SITE FILES (PHOTO LOGS / SNAG LISTS) ========== */}
          {user?.role === 'site_manager' && siteManagerTab === 'site files' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Site Files: {user?.site}</h2>
              <p style={{color:'#666',fontSize:13,marginBottom:16}}>Create plot files with photos and notes for snag lists, inspections, and handovers.</p>
              {!creatingFile && !viewingFileId && (
                <button onClick={()=>setCreatingFile(true)} style={{backgroundColor:GOLD,color:NAVY,padding:'10px 22px',border:'none',borderRadius:5,cursor:'pointer',fontWeight:'bold',fontSize:14,marginBottom:18}}>Create New File</button>
              )}
              {creatingFile && (
                <div style={{backgroundColor:NAVY,padding:20,borderRadius:10,marginBottom:18}}>
                  <h3 style={{color:CREAM,margin:'0 0 14px',fontSize:16}}>New Site File</h3>
                  <div style={{marginBottom:12}}><label style={{display:'block',color:'#aaa',fontSize:11,marginBottom:3}}>File Name</label>
                    <input type="text" value={newFileName} onChange={(e)=>setNewFileName(e.target.value)} placeholder="e.g. Plot 14 - Snag List" style={{width:'100%',padding:10,borderRadius:4,border:'1px solid '+GOLD,fontSize:14,boxSizing:'border-box'}} /></div>
                  <div style={{marginBottom:12}}>
                    <label style={{display:'block',color:'#aaa',fontSize:11,marginBottom:3}}>Photos ({newFilePhotos.length} added)</label>
                    <input ref={fileInputRef} type="file" accept="image/*" capture="environment" multiple onChange={(e)=>{
                      const files=Array.from(e.target.files||[]);
                      files.forEach(file=>{const reader=new FileReader();reader.onload=(ev)=>{setNewFilePhotos(prev=>[...prev,{id:Date.now()+Math.random(),note:newFileNote||'',dataUrl:ev.target.result,fileName:file.name}]);};reader.readAsDataURL(file);});
                      if(fileInputRef.current)fileInputRef.current.value='';
                    }} style={{display:'none'}} />
                    <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:8}}>
                      <button onClick={()=>fileInputRef.current?.click()} style={{backgroundColor:GOLD,color:NAVY,padding:'8px 16px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:12}}>Upload Photo</button>
                      <button onClick={()=>{const input=fileInputRef.current;if(input){input.setAttribute('capture','environment');input.click();}}} style={{backgroundColor:'#1565c0',color:'white',padding:'8px 16px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:12}}>Take Photo</button>
                    </div>
                    <div style={{marginBottom:8}}><input type="text" value={newFileNote} onChange={(e)=>setNewFileNote(e.target.value)} placeholder="Note for next photo..." style={{width:'100%',padding:8,borderRadius:4,border:'1px solid #555',fontSize:12,boxSizing:'border-box',backgroundColor:'#1a2a3a',color:'white'}} /></div>
                    {newFilePhotos.length > 0 && (
                      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(120px,1fr))',gap:8}}>
                        {newFilePhotos.map((p,idx) => (
                          <div key={p.id} style={{backgroundColor:'#1a2a3a',borderRadius:6,overflow:'hidden',border:'1px solid #333'}}>
                            {p.dataUrl && <img src={p.dataUrl} alt="" style={{width:'100%',height:80,objectFit:'cover'}} />}
                            <div style={{padding:6}}>
                              <div style={{fontSize:10,color:'#aaa'}}>Photo {idx+1}</div>
                              {p.note && <div style={{fontSize:11,color:CREAM,marginTop:2}}>{p.note}</div>}
                              <button onClick={()=>setNewFilePhotos(prev=>prev.filter(x=>x.id!==p.id))} style={{fontSize:10,color:'#d32f2f',background:'none',border:'none',cursor:'pointer',padding:0,marginTop:4}}>Remove</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{display:'flex',gap:8,marginTop:14}}>
                    <button onClick={()=>{
                      if(!newFileName.trim()){alert('Please enter a file name');return;}
                      const newFile={id:Date.now(),site:user?.site,name:newFileName,createdBy:user?.name||'Site Manager',date:new Date().toISOString().split('T')[0],photos:newFilePhotos.map((p,i)=>({id:i+1,note:p.note,dataUrl:p.dataUrl})),sentTo:null,status:'open'};
                      setSiteFiles(prev=>[newFile,...prev]);
                      addSiteFile({site:user?.site,name:newFileName,created_by:user?.name,date:new Date().toISOString().split('T')[0],status:'open'}).then(r=>{if(r.data&&newFilePhotos.length>0){newFilePhotos.forEach(p=>{addSiteFilePhoto({site_file_id:r.data.id,note:p.note,photo_url:p.dataUrl}).catch(e=>console.error('DB photo error:',e));});}}).catch(e=>console.error('DB error:',e));
                      setCreatingFile(false);setNewFileName('');setNewFilePhotos([]);setNewFileNote('');
                      setSuccessMsg('Site file created: '+newFileName);setTimeout(()=>setSuccessMsg(''),2500);
                    }} style={{backgroundColor:GOLD,color:NAVY,padding:'10px 22px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:13}}>Save File</button>
                    <button onClick={()=>{setCreatingFile(false);setNewFileName('');setNewFilePhotos([]);setNewFileNote('');}} style={{backgroundColor:'#666',color:'white',padding:'10px 22px',border:'none',borderRadius:4,cursor:'pointer',fontSize:13}}>Cancel</button>
                  </div>
                </div>
              )}
              {viewingFileId && (() => {
                const file = siteFiles.find(f => f.id === viewingFileId);
                if(!file) return null;
                return (
                  <div style={{backgroundColor:'white',border:'1px solid #ddd',borderRadius:10,padding:18,marginBottom:18}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8,marginBottom:14}}>
                      <h3 style={{color:NAVY,margin:0,fontSize:18}}>{file.name}</h3>
                      <button onClick={()=>setViewingFileId(null)} style={{backgroundColor:'#666',color:'white',padding:'6px 14px',border:'none',borderRadius:4,cursor:'pointer',fontSize:12}}>Back</button>
                    </div>
                    <div style={{fontSize:12,color:'#888',marginBottom:14}}>Created by {file.createdBy} on {file.date} | {file.photos.length} photo{file.photos.length!==1?'s':''}</div>
                    {file.photos.length > 0 ? (
                      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:12}}>
                        {file.photos.map((photo,idx) => (
                          <div key={photo.id} style={{backgroundColor:'#f9f9f9',borderRadius:8,overflow:'hidden',border:'1px solid #ddd'}}>
                            {photo.dataUrl ? <img src={photo.dataUrl} alt="" style={{width:'100%',height:150,objectFit:'cover'}} /> : <div style={{width:'100%',height:150,backgroundColor:'#e0e0e0',display:'flex',alignItems:'center',justifyContent:'center',color:'#999',fontSize:12}}>Photo {idx+1}</div>}
                            <div style={{padding:10}}>
                              <div style={{fontSize:12,fontWeight:'bold',color:NAVY}}>Photo {idx+1}</div>
                              {photo.note && <div style={{fontSize:12,color:'#555',marginTop:4}}>{photo.note}</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : <p style={{color:'#888',fontSize:13}}>No photos in this file.</p>}
                    <div style={{marginTop:16,display:'flex',gap:8,flexWrap:'wrap'}}>
                      {!file.sentTo && (
                        <div style={{width:'100%'}}>
                          <label style={{display:'block',fontSize:11,color:'#666',marginBottom:4}}>Send as snag list to carpenter:</label>
                          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                            <select onChange={(e)=>{
                              if(e.target.value){
                                setSiteFiles(prev=>prev.map(f=>f.id===file.id?{...f,sentTo:e.target.value}:f));supabase.from('site_files').update({sent_to:e.target.value}).eq('id',file.id).then(r=>{if(r.error)console.error('DB error:',r.error);});
                                setSuccessMsg('Snag list sent to '+e.target.value);setTimeout(()=>setSuccessMsg(''),2500);
                              }
                            }} style={{padding:8,borderRadius:4,border:'1px solid #ddd',fontSize:12,flex:1,minWidth:150}}>
                              <option value="">Select carpenter</option>
                              {CARPENTERS.filter(c=>c.site===user?.site).map(c=><option key={c.id} value={c.name}>{c.name}</option>)}
                            </select>
                          </div>
                        </div>
                      )}
                      {file.sentTo && <div style={{fontSize:12,color:'#2e7d32',padding:8,backgroundColor:'#e8f5e9',borderRadius:4}}>Sent to: {file.sentTo}</div>}
                      <button onClick={()=>{setSiteFiles(prev=>prev.map(f=>f.id===file.id?{...f,status:f.status==='open'?'closed':'open'}:f));supabase.from('site_files').update({status:file.status==='open'?'closed':'open'}).eq('id',file.id).then(r=>{if(r.error)console.error('DB error:',r.error);});setSuccessMsg('File '+(file.status==='open'?'closed':'reopened'));setTimeout(()=>setSuccessMsg(''),2500);}} style={{backgroundColor:file.status==='open'?'#4caf50':'#e65100',color:'white',padding:'8px 16px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:12}}>{file.status==='open'?'Close File':'Reopen File'}</button>
                    </div>
                  </div>
                );
              })()}
              {!creatingFile && !viewingFileId && (
                <div>
                  {siteFiles.filter(f => f.site === user?.site).length === 0 ? <p style={{color:'#888',fontSize:14}}>No site files created yet.</p> : (
                    siteFiles.filter(f => f.site === user?.site).sort((a,b)=>b.id-a.id).map(file => (
                      <div key={file.id} onClick={()=>setViewingFileId(file.id)} style={{backgroundColor:'white',border:'1px solid #ddd',borderRadius:8,padding:14,marginBottom:10,cursor:'pointer',borderLeft:'5px solid '+(file.status==='open'?GOLD:'#4caf50'),display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
                        <div>
                          <strong style={{fontSize:14,color:NAVY}}>{file.name}</strong>
                          <div style={{fontSize:11,color:'#888',marginTop:2}}>{file.date} | {file.photos.length} photo{file.photos.length!==1?'s':''} | By {file.createdBy}</div>
                          {file.sentTo && <div style={{fontSize:11,color:'#2e7d32',marginTop:2}}>Sent to: {file.sentTo}</div>}
                        </div>
                        <span style={{padding:'3px 8px',borderRadius:4,fontSize:10,fontWeight:'bold',backgroundColor:file.status==='open'?'#fff8e1':'#e8f5e9',color:file.status==='open'?'#e65100':'#2e7d32'}}>{file.status==='open'?'Open':'Closed'}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* ========== ADMIN SITES FOLDER ========== */}
          {user?.role === 'admin' && adminTab === 'sites' && (
            <div>
              {!adminSiteView ? (
                <div>
                  <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>All Sites</h2>
                  <p style={{color:'#666',fontSize:13,marginBottom:16}}>Browse sites, view work progress, site files, and allocate jobs.</p>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:12}}>
                    {[...new Set([...workLog.map(w=>w.site),...allocations.map(a=>a.site),...siteFiles.map(f=>f.site)])].sort().map(site => {
                      const siteWork = workLog.filter(w => w.site === site);
                      const siteAllocs = allocations.filter(a => a.site === site);
                      const siteF = siteFiles.filter(f => f.site === site);
                      const logged = siteWork.filter(w => w.status === 'logged').length;
                      const allocated = siteWork.filter(w => w.status === 'allocated').length;
                      const complete = siteWork.filter(w => w.status === 'complete').length;
                      const activeAllocs = siteAllocs.filter(a => !a.completed && new Date(a.startDate) <= todayDate && new Date(a.endDate) >= todayDate).length;
                      const builder = siteWork[0]?.builder || siteAllocs[0]?.builder || '';
                      return (
                        <div key={site} onClick={()=>{setAdminSiteView(site);setAdminSiteWorkTab('logged');}} style={{backgroundColor:'white',border:'1px solid #ddd',borderRadius:10,padding:16,cursor:'pointer',transition:'box-shadow 0.2s',borderLeft:'6px solid '+GOLD}}>
                          <h3 style={{color:NAVY,margin:'0 0 4px',fontSize:16}}>{site}</h3>
                          <div style={{fontSize:12,color:'#888',marginBottom:10}}>{builder}</div>
                          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,fontSize:12}}>
                            <div style={{padding:6,backgroundColor:'#e3f2fd',borderRadius:4,textAlign:'center'}}><strong style={{color:'#1565c0'}}>{logged}</strong><div style={{fontSize:10,color:'#666'}}>Logged</div></div>
                            <div style={{padding:6,backgroundColor:'#fff8e1',borderRadius:4,textAlign:'center'}}><strong style={{color:'#e65100'}}>{activeAllocs}</strong><div style={{fontSize:10,color:'#666'}}>In Progress</div></div>
                            <div style={{padding:6,backgroundColor:'#e8f5e9',borderRadius:4,textAlign:'center'}}><strong style={{color:'#2e7d32'}}>{complete}</strong><div style={{fontSize:10,color:'#666'}}>Complete</div></div>
                            <div style={{padding:6,backgroundColor:'#f3e5f5',borderRadius:4,textAlign:'center'}}><strong style={{color:'#7b1fa2'}}>{siteF.length}</strong><div style={{fontSize:10,color:'#666'}}>Site Files</div></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16,flexWrap:'wrap'}}>
                    <button onClick={()=>setAdminSiteView(null)} style={{backgroundColor:NAVY,color:CREAM,padding:'6px 14px',border:'none',borderRadius:4,cursor:'pointer',fontSize:12,fontWeight:'bold'}}>Back to All Sites</button>
                    <h2 style={{ color:NAVY, margin:0, fontSize:22 }}>{adminSiteView}</h2>
                  </div>
                  <div style={{display:'flex',gap:6,marginBottom:16,flexWrap:'wrap'}}>
                    {['Logged','Allocated','Complete','Site Files'].map(tab => (
                      <button key={tab} onClick={()=>setAdminSiteWorkTab(tab.toLowerCase())} style={{padding:'8px 16px',borderRadius:4,border:'none',cursor:'pointer',fontWeight:adminSiteWorkTab===tab.toLowerCase()?'bold':'normal',fontSize:13,backgroundColor:adminSiteWorkTab===tab.toLowerCase()?GOLD:'#e0e0e0',color:adminSiteWorkTab===tab.toLowerCase()?NAVY:'#333'}}>{tab} ({tab==='Site Files'?siteFiles.filter(f=>f.site===adminSiteView).length:workLog.filter(w=>w.site===adminSiteView&&(tab==='Logged'?w.status==='logged':tab==='Allocated'?w.status==='allocated':w.status==='complete')).length})</button>
                    ))}
                  </div>
                  {(adminSiteWorkTab==='logged'||adminSiteWorkTab==='allocated'||adminSiteWorkTab==='complete') && (
                    <div>
                      {workLog.filter(w=>w.site===adminSiteView&&(adminSiteWorkTab==='logged'?w.status==='logged':adminSiteWorkTab==='allocated'?w.status==='allocated':w.status==='complete')).length===0 ? (
                        <p style={{color:'#888',fontSize:14}}>No {adminSiteWorkTab} work for this site.</p>
                      ) : (
                        workLog.filter(w=>w.site===adminSiteView&&(adminSiteWorkTab==='logged'?w.status==='logged':adminSiteWorkTab==='allocated'?w.status==='allocated':w.status==='complete')).map(item => (
                          <div key={item.id} style={{backgroundColor:'white',border:'1px solid #ddd',borderRadius:8,padding:14,marginBottom:10,borderLeft:'5px solid '+(item.status==='complete'?'#4caf50':item.status==='allocated'?GOLD:'#1565c0')}}>
                            <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:6}}>
                              <div>
                                <strong style={{fontSize:14,color:NAVY}}>Plot {item.plot} - {item.houseType}</strong>
                                <div style={{fontSize:12,color:'#666',marginTop:2}}>{item.stage} | Priority: {item.priority} | {item.expectedDays}d est.</div>
                                {item.notes && <div style={{fontSize:12,color:'#888',marginTop:2}}>{item.notes}</div>}
                                {item.allocatedTo && <div style={{fontSize:12,color:'#2e7d32',marginTop:2}}>Allocated to: {item.allocatedTo}</div>}
                              </div>
                              {item.status==='logged' && (
                                <button onClick={(e)=>{e.stopPropagation();setAllocateId(item.id);setAdminTab('allocate');}} style={{backgroundColor:GOLD,color:NAVY,padding:'6px 14px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:12,alignSelf:'flex-start'}}>Allocate</button>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                  {adminSiteWorkTab==='site files' && (
                    <div>
                      {siteFiles.filter(f=>f.site===adminSiteView).length===0 ? (
                        <p style={{color:'#888',fontSize:14}}>No site files for this site.</p>
                      ) : (
                        siteFiles.filter(f=>f.site===adminSiteView).sort((a,b)=>b.id-a.id).map(file => (
                          <div key={file.id} style={{backgroundColor:'white',border:'1px solid #ddd',borderRadius:8,padding:14,marginBottom:10,borderLeft:'5px solid '+(file.status==='open'?GOLD:'#4caf50')}}>
                            <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:8}}>
                              <div>
                                <strong style={{fontSize:14,color:NAVY}}>{file.name}</strong>
                                <div style={{fontSize:11,color:'#888',marginTop:2}}>{file.date} | {file.photos.length} photo{file.photos.length!==1?'s':''} | By {file.createdBy}</div>
                                {file.sentTo && <div style={{fontSize:11,color:'#2e7d32',marginTop:2}}>Sent to: {file.sentTo}</div>}
                              </div>
                              <span style={{padding:'3px 8px',borderRadius:4,fontSize:10,fontWeight:'bold',backgroundColor:file.status==='open'?'#fff8e1':'#e8f5e9',color:file.status==='open'?'#e65100':'#2e7d32'}}>{file.status==='open'?'Open':'Closed'}</span>
                            </div>
                            {file.photos.length > 0 && (
                              <div style={{display:'flex',gap:6,marginTop:10,overflowX:'auto',paddingBottom:4}}>
                                {file.photos.map((photo,idx) => (
                                  <div key={photo.id} style={{flexShrink:0,width:100}}>
                                    {photo.dataUrl ? <img src={photo.dataUrl} alt="" style={{width:100,height:70,objectFit:'cover',borderRadius:4}} /> : <div style={{width:100,height:70,backgroundColor:'#e0e0e0',borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:'#999'}}>Photo {idx+1}</div>}
                                    {photo.note && <div style={{fontSize:10,color:'#666',marginTop:2}}>{photo.note}</div>}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}


                    {/* ========== CARPENTER SCHEDULE (MON-FRI) ========== */}
          {user?.role === 'carpenter' && carpenterTab === 'schedule' && (
            <div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16,flexWrap:'wrap',gap:8}}>
                <h2 style={{ color:NAVY, marginTop:0, fontSize:22, margin:0 }}>Your Week</h2>
                <div style={{display:'flex',gap:8,alignItems:'center'}}>
                  <button onClick={()=>setWeekOffset(w=>w-1)} style={{backgroundColor:NAVY,color:CREAM,border:'none',padding:'6px 12px',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:16}}>←</button>
                  <button onClick={()=>setWeekOffset(0)} style={{backgroundColor:weekOffset===0?GOLD:NAVY,color:weekOffset===0?NAVY:CREAM,border:'none',padding:'6px 12px',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:12}}>This Week</button>
                  <button onClick={()=>setWeekOffset(w=>w+1)} style={{backgroundColor:NAVY,color:CREAM,border:'none',padding:'6px 12px',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:16}}>→</button>
                </div>
              </div>
              {(() => {
                const weekDays = getWeekDays(weekOffset);
                const dayNames = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
                return (
                  <div>
                    {weekDays.map((day, idx) => {
                      const dayStr = day.toISOString().split('T')[0];
                      const isToday = isSameDay(day, new Date());
                      const dayAllocations = myAllocs.filter(a => dayStr >= a.startDate && dayStr <= a.endDate);
                      const dayIsOff = dayOffRequests.some(d => d.carpenter === user?.name && d.status === 'approved' && dayStr >= d.startDate && dayStr <= d.endDate);
                      const daySnags = snagItems.filter(s => s.carpenter === user?.name && s.date === dayStr);
                      return (
                        <div key={dayStr} style={{
                          backgroundColor: dayIsOff ? '#fff3e0' : isToday ? '#e8f5e9' : 'white',
                          border: isToday ? '2px solid #4caf50' : '1px solid #ddd',
                          borderRadius: 10, padding: 14, marginBottom: 10,
                          borderLeft: dayIsOff ? '6px solid #ff9800' : isToday ? '6px solid #4caf50' : '6px solid ' + NAVY
                        }}>
                          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                            <div>
                              <strong style={{fontSize:16,color:NAVY}}>{dayNames[idx]}</strong>
                              <span style={{fontSize:12,color:'#888',marginLeft:8}}>{day.toLocaleDateString('en-GB',{day:'numeric',month:'short'})}</span>
                              {isToday && <span style={{marginLeft:8,backgroundColor:'#4caf50',color:'white',padding:'2px 8px',borderRadius:3,fontSize:10,fontWeight:'bold'}}>TODAY</span>}
                            </div>
                            {dayIsOff && <span style={{backgroundColor:'#ff9800',color:'white',padding:'4px 12px',borderRadius:4,fontSize:12,fontWeight:'bold'}}>DAY OFF</span>}
                          </div>
                          {dayIsOff ? (
                            <div style={{padding:10,backgroundColor:'#fff8e1',borderRadius:6,fontSize:14,color:'#e65100',fontStyle:'italic'}}>
                              Day off approved
                            </div>
                          ) : dayAllocations.length === 0 ? (
                            <div style={{padding:10,backgroundColor:'#f5f5f5',borderRadius:6,fontSize:13,color:'#999',textAlign:'center'}}>
                              No work scheduled
                            </div>
                          ) : (
                            <div>
                              {dayAllocations.map(alloc => {
                                const totalDays = daysInRange(alloc.startDate, alloc.endDate);
                                const dayNum = Math.ceil((day - new Date(alloc.startDate)) / 864e5) + 1;
                                const isComplete = alloc.completed === true;
                                return (
                                  <div key={alloc.id} style={{
                                    padding: 10, backgroundColor: isComplete ? '#e8f5e9' : '#f6f4ef',
                                    borderRadius: 6, marginBottom: 6,
                                    borderLeft: '4px solid ' + (isComplete ? '#4caf50' : GOLD)
                                  }}>
                                    <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:4}}>
                                      <div>
                                        <strong style={{fontSize:14,color:NAVY}}>{alloc.site} — Plot {alloc.plot}</strong>
                                        <div style={{fontSize:12,color:'#666',marginTop:2}}>{alloc.houseType} / <span style={{color:GOLD,fontWeight:'bold'}}>{alloc.stage}</span></div>
                                      </div>
                                      <div style={{textAlign:'right'}}>
                                        <span style={{fontSize:11,color:'#888'}}>Day {dayNum} of {totalDays}</span>
                                        {isComplete && <div style={{fontSize:10,color:'#4caf50',fontWeight:'bold'}}>DONE</div>}
                                      </div>
                                    </div>
                                    {!isComplete && isToday && dayNum === totalDays && (
                                      <button onClick={()=>markAllocComplete(alloc.id)} style={{marginTop:8,backgroundColor:'#4caf50',color:'white',padding:'6px 14px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:12,width:'100%'}}>Mark Complete</button>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                          {/* Snags for this day */}
                          {daySnags.length > 0 && (
                            <div style={{marginTop:6}}>
                              {daySnags.map(s => (
                                <div key={s.id} style={{padding:6,backgroundColor:'#fff3e0',borderRadius:4,fontSize:12,marginBottom:3,borderLeft:'3px solid #ff9800'}}>
                                  <strong>Snag:</strong> {s.desc} {s.site && <span style={{color:'#888'}}>({s.site}{s.plot ? ' Plot '+s.plot : ''})</span>}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}

              {/* ===== EXTRAS / SNAGS QUICK ADD ===== */}
              <div style={{marginTop:20,backgroundColor:NAVY,padding:16,borderRadius:10}}>
                <h3 style={{color:GOLD,margin:'0 0 12px',fontSize:16}}>Quick Add: Extras / Snags</h3>
                <p style={{color:CREAM,fontSize:12,margin:'0 0 12px',opacity:0.7}}>Log unscheduled work, snags, or extras for today</p>
                <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:10}}>
                  <input placeholder="Description (e.g. Fix skirting Plot 12)" value={newSnagDesc} onChange={e=>setNewSnagDesc(e.target.value)}
                    style={{flex:2,minWidth:180,padding:8,borderRadius:4,border:'1px solid '+GOLD,fontSize:13,boxSizing:'border-box'}} />
                  <input placeholder="Site" value={newSnagSite} onChange={e=>setNewSnagSite(e.target.value)}
                    style={{flex:1,minWidth:100,padding:8,borderRadius:4,border:'1px solid '+GOLD,fontSize:13,boxSizing:'border-box'}} />
                  <input placeholder="Plot" value={newSnagPlot} onChange={e=>setNewSnagPlot(e.target.value)}
                    style={{flex:0.5,minWidth:60,padding:8,borderRadius:4,border:'1px solid '+GOLD,fontSize:13,boxSizing:'border-box'}} />
                </div>
                <button onClick={()=>{
                  if(!newSnagDesc.trim())return;
                  const todayISO=new Date().toISOString().split('T')[0];
                  setSnagItems(prev=>[...prev,{id:Date.now(),carpenter:user?.name,desc:newSnagDesc,site:newSnagSite||user?.site||'',plot:newSnagPlot,date:todayISO}]);
                  setNewSnagDesc('');setNewSnagSite('');setNewSnagPlot('');
                  setSuccessMsg('Snag logged');setTimeout(()=>setSuccessMsg(''),2000);
                }} style={{backgroundColor:GOLD,color:NAVY,padding:'10px 20px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:14}}>
                  Log Snag / Extra
                </button>
              </div>

              {/* Past allocations summary */}
              {myAllocs.filter(a=>a.completed).length > 0 && (
                <div style={{marginTop:20}}>
                  <h3 style={{color:NAVY,fontSize:16,marginBottom:10}}>Recently Completed</h3>
                  {myAllocs.filter(a=>a.completed).slice(-5).reverse().map(alloc=>(
                    <div key={alloc.id} style={{backgroundColor:'white',border:'1px solid #c8e6c9',borderRadius:6,padding:10,marginBottom:6,borderLeft:'4px solid #4caf50',fontSize:13}}>
                      <div style={{display:'flex',justifyContent:'space-between'}}>
                        <span><strong>{alloc.site}</strong> — Plot {alloc.plot} / {alloc.stage}</span>
                        <span style={{color:'#4caf50',fontWeight:'bold',fontSize:12}}>✓ {alloc.completedDate ? formatDate(alloc.completedDate) : 'Done'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

                    {/* ========== CARPENTER NOTIFICATIONS (READ + SIGN) ========== */}
          {user?.role === 'carpenter' && carpenterTab === 'notifications' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Notifications</h2>
              {myNotifications.length === 0 ? <p style={{color:'#666',fontSize:14}}>No notifications.</p> : (
                myNotifications.sort((a,b)=>b.id-a.id).map(notif => {
                  const myResp = notif.responses[user?.name] || {};
                  return (
                    <div key={notif.id} style={{backgroundColor:'white',border: myResp.signed?'1px solid #ddd':'2px solid '+GOLD,borderRadius:10,padding:16,marginBottom:14,borderLeft: myResp.signed?'6px solid #4caf50':myResp.read?'6px solid '+GOLD:'6px solid #d32f2f'}}>
                      <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:6,marginBottom:8}}>
                        <div>
                          <span style={{display:'inline-block',padding:'2px 8px',borderRadius:3,fontSize:10,fontWeight:'bold',marginRight:6,
                            backgroundColor:notif.type==='Toolbox Talk'?'#e3f2fd':notif.type==='RAMS'?'#fff3e0':'#fce4ec',
                            color:notif.type==='Toolbox Talk'?'#1565c0':notif.type==='RAMS'?'#e65100':'#c62828'}}>{notif.type}</span>
                          {!myResp.read && <span style={{display:'inline-block',padding:'2px 8px',borderRadius:3,fontSize:10,fontWeight:'bold',backgroundColor:'#d32f2f',color:'white'}}>NEW</span>}
                        </div>
                        <div style={{fontSize:11,color:'#888'}}>{notif.sentDate} | From: {notif.sentBy}</div>
                      </div>
                      <h3 style={{margin:'0 0 8px',fontSize:16,color:NAVY}}>{notif.title}</h3>
                      <div style={{fontSize:13,color:'#333',padding:12,backgroundColor:'#fafafa',borderRadius:6,marginBottom:12,whiteSpace:'pre-wrap',lineHeight:1.5}}>{notif.message}</div>

                      {/* Read checkbox */}
                      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12,padding:10,backgroundColor:myResp.read?'#e8f5e9':'#fff8e1',borderRadius:6}}>
                        <input type="checkbox" checked={!!myResp.read}
                          onChange={()=>{if(!myResp.read) markNotifRead(notif.id);}}
                          style={{width:20,height:20,cursor:'pointer',accentColor:GOLD}} />
                        <label style={{fontSize:14,fontWeight:'bold',color:myResp.read?'#2e7d32':'#333',cursor:'pointer'}}
                          onClick={()=>{if(!myResp.read) markNotifRead(notif.id);}}>
                          {myResp.read ? 'Read on ' + myResp.readDate : 'I have read and understood this document'}
                        </label>
                      </div>

                      {/* Signature area */}
                      {myResp.read && !myResp.signed && (
                        <div style={{border:'2px solid '+GOLD,borderRadius:8,padding:16,backgroundColor:'#fffdf5'}}>
                          <p style={{margin:'0 0 10px',fontSize:14,fontWeight:'bold',color:NAVY}}>E-Signature Required</p>
                          <p style={{margin:'0 0 12px',fontSize:12,color:'#666'}}>Please sign below to confirm you have read and understood this document. Use your finger or mouse to draw your signature.</p>
                          {signingNotifId === notif.id ? (
                            <div>
                              <canvas ref={sigCanvasRef} width={400} height={150}
                                style={{border:'1px solid #ccc',borderRadius:4,width:'100%',maxWidth:400,height:150,touchAction:'none',cursor:'crosshair',backgroundColor:'white'}}
                                onMouseDown={handleCanvasMouseDown}
                                onMouseMove={handleCanvasMouseMove}
                                onMouseUp={handleCanvasMouseUp}
                                onMouseLeave={handleCanvasMouseUp}
                                onTouchStart={handleCanvasMouseDown}
                                onTouchMove={handleCanvasMouseMove}
                                onTouchEnd={handleCanvasMouseUp}
                              />
                              <div style={{marginTop:10,display:'flex',gap:8,flexWrap:'wrap'}}>
                                <button onClick={()=>signNotification(notif.id)}
                                  style={{backgroundColor:'#2e7d32',color:'white',padding:'8px 20px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:13}}>
                                  Confirm Signature
                                </button>
                                <button onClick={()=>{const c=sigCanvasRef.current;if(c){const ctx=c.getContext('2d');ctx.clearRect(0,0,c.width,c.height);startSignature(notif.id,c);}}}
                                  style={{backgroundColor:'#999',color:'white',padding:'8px 20px',border:'none',borderRadius:4,cursor:'pointer',fontSize:13}}>
                                  Clear
                                </button>
                                <button onClick={()=>setSigningNotifId(null)}
                                  style={{backgroundColor:'#ddd',color:'#333',padding:'8px 20px',border:'none',borderRadius:4,cursor:'pointer',fontSize:13}}>
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button onClick={()=>{setSigningNotifId(notif.id);setTimeout(()=>{startSignature(notif.id,sigCanvasRef.current);},100);}}
                              style={{backgroundColor:GOLD,color:NAVY,padding:'10px 24px',border:'none',borderRadius:5,cursor:'pointer',fontWeight:'bold',fontSize:14}}>
                              Open Signature Pad
                            </button>
                          )}
                        </div>
                      )}

                      {/* Already signed */}
                      {myResp.signed && (
                        <div style={{padding:12,backgroundColor:'#e8f5e9',borderRadius:6,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
                          <div>
                            <strong style={{color:'#2e7d32',fontSize:14}}>Document Signed</strong>
                            <div style={{fontSize:12,color:'#666',marginTop:2}}>Signed: {myResp.signedDate}</div>
                          </div>
                          {myResp.signature && <img src={myResp.signature} alt="Your signature" style={{height:40,border:'1px solid #c8e6c9',borderRadius:4}} />}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* ========== CARPENTER DOCUMENTS ========== */}
          {user?.role === 'carpenter' && carpenterTab === 'documents' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Documents: {user?.site}</h2>
              {(() => {
                const siteDocs = DOCUMENTS[user?.site];
                if(!siteDocs) return <p style={{color:'#666',fontSize:14}}>No documents available for this site.</p>;
                const builder = BUILDERS.find(b => b.sites.some(s => s.name === user?.site));
                const siteInfo = builder?.sites.find(s => s.name === user?.site);
                const houseTypes = siteInfo?.housetypes || [];
                return (<div>
                  {houseTypes.length > 0 && (
                    <div style={{marginBottom:20}}>
                      <h3 style={{color:NAVY,margin:'0 0 12px',fontSize:16}}>Drawings by House Type</h3>
                      {houseTypes.map(ht => {
                        const htDocs = (siteDocs['Floorplans']||[]).filter(d => d.toLowerCase().includes(ht.toLowerCase()));
                        const htTech = (siteDocs['Technical Drawings']||[]).filter(d => d.toLowerCase().includes(ht.toLowerCase()));
                        const allHtDocs = [...htDocs, ...htTech];
                        return (
                          <details key={ht} style={{marginBottom:8,backgroundColor:'white',borderRadius:8,border:'1px solid #ddd',overflow:'hidden'}}>
                            <summary style={{padding:'12px 15px',cursor:'pointer',fontWeight:'bold',fontSize:14,color:NAVY,backgroundColor:'#f6f4ef',display:'flex',alignItems:'center',gap:8}}>
                              <span style={{display:'inline-block',width:8,height:8,backgroundColor:GOLD,borderRadius:'50%'}}></span> {ht}
                              <span style={{fontSize:11,color:'#888',fontWeight:'normal',marginLeft:'auto'}}>{allHtDocs.length} drawing{allHtDocs.length!==1?'s':''}</span>
                            </summary>
                            <div style={{padding:'10px 15px'}}>
                              {allHtDocs.length===0?<p style={{color:'#999',fontSize:12,margin:'5px 0'}}>No drawings uploaded yet</p>:
                                allHtDocs.map((doc,idx)=>(
                                  <div key={idx} style={{marginBottom:6,padding:'8px 10px',backgroundColor:'#f9f9f9',borderRadius:4,display:'flex',justifyContent:'space-between',alignItems:'center',gap:8,fontSize:13}}>
                                    <span>{doc}</span>
                                    <div style={{display:'flex',gap:6}}>
                                      <button onClick={()=>{setSuccessMsg('Opening: '+doc);setTimeout(()=>setSuccessMsg(''),2500);}} style={{padding:'4px 10px',fontSize:11,backgroundColor:GOLD,color:NAVY,border:'none',borderRadius:3,cursor:'pointer',fontWeight:'bold'}}>Open</button>
                                      <button onClick={()=>{setSuccessMsg('Downloading: '+doc);setTimeout(()=>setSuccessMsg(''),2500);}} style={{padding:'4px 10px',fontSize:11,backgroundColor:NAVY,color:'white',border:'none',borderRadius:3,cursor:'pointer',fontWeight:'bold'}}>Download</button>
                                    </div>
                                  </div>
                                ))
                              }
                            </div>
                          </details>
                        );
                      })}
                    </div>
                  )}
                  {['Site Documents','H&S'].filter(cat=>siteDocs[cat]).map(cat=>(
                    <div key={cat} style={{marginBottom:15,backgroundColor:'white',padding:15,borderRadius:8,border:'1px solid #ddd'}}>
                      <h3 style={{color:NAVY,margin:'0 0 10px',fontSize:15}}>{cat}</h3>
                      {siteDocs[cat].map((doc,idx)=><div key={idx} style={{marginBottom:6,padding:8,backgroundColor:'#f9f9f9',borderRadius:4,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8,fontSize:13}}>
                        <span>{doc}</span>
                        <div style={{display:'flex',gap:6}}>
                          <button onClick={()=>{setSuccessMsg('Opening: '+doc);setTimeout(()=>setSuccessMsg(''),2500);}} style={{padding:'4px 10px',fontSize:11,backgroundColor:GOLD,color:NAVY,border:'none',borderRadius:3,cursor:'pointer',fontWeight:'bold'}}>Open</button>
                          <button onClick={()=>{setSuccessMsg('Downloading: '+doc);setTimeout(()=>setSuccessMsg(''),2500);}} style={{padding:'4px 10px',fontSize:11,backgroundColor:NAVY,color:'white',border:'none',borderRadius:3,cursor:'pointer',fontWeight:'bold'}}>Download</button>
                        </div>
                      </div>)}
                    </div>
                  ))}
                </div>);
              })()}
            </div>
          )}

          {/* ========== CARPENTER PRICE LISTS (BY HOUSE TYPE) ========== */}
          {user?.role === 'carpenter' && carpenterTab === 'price lists' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Price Lists</h2>
              {Object.entries(PRICE_LISTS_BY_HOUSE_TYPE).map(([listName, pl]) => (
                <div key={listName} style={{marginBottom:20,backgroundColor:'white',borderRadius:10,border:'1px solid #ddd',overflow:'hidden'}}>
                  <div style={{backgroundColor:NAVY,padding:'12px 16px',color:CREAM}}>
                    <strong style={{fontSize:16}}>{pl.builder}</strong>
                    <span style={{fontSize:12,color:GOLD,marginLeft:8}}>{pl.site}</span>
                  </div>
                  <div style={{padding:12}}>
                    {Object.entries(pl.types).map(([typeName, rates]) => (
                      <details key={typeName} style={{marginBottom:6}}>
                        <summary style={{padding:'8px 10px',cursor:'pointer',fontWeight:'bold',fontSize:13,color:NAVY,backgroundColor:'#f6f4ef',borderRadius:4,display:'flex',alignItems:'center',gap:8}}>
                          <span style={{display:'inline-block',width:6,height:6,backgroundColor:GOLD,borderRadius:'50%'}}></span> {typeName}
                          <span style={{fontSize:11,color:'#888',fontWeight:'normal',marginLeft:'auto'}}>
                            Total: £{Object.values(rates).reduce((s,v)=>s+v,0)}
                          </span>
                        </summary>
                        <div style={{padding:'8px 12px'}}>
                          <table style={{width:'100%',fontSize:12,borderCollapse:'collapse'}}>
                            <tbody>
                              {Object.entries(rates).map(([stage,price]) => (
                                <tr key={stage} style={{borderBottom:'1px solid #f0f0f0'}}>
                                  <td style={{padding:'4px 0'}}>{stage}</td>
                                  <td style={{padding:'4px 0',textAlign:'right',fontWeight:'bold',color:NAVY}}>£{price}</td>
                                </tr>
                              ))}
                              <tr style={{borderTop:'2px solid '+GOLD}}>
                                <td style={{padding:'6px 0',fontWeight:'bold'}}>Total</td>
                                <td style={{padding:'6px 0',textAlign:'right',fontWeight:'bold',color:GOLD,fontSize:14}}>£{Object.values(rates).reduce((s,v)=>s+v,0)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </details>
                    ))}
                    {pl.extras && (
                      <details style={{marginTop:8}}>
                        <summary style={{padding:'8px 10px',cursor:'pointer',fontWeight:'bold',fontSize:13,color:'#e65100',backgroundColor:'#fff3e0',borderRadius:4}}>
                          Extras & Day Rates
                        </summary>
                        <div style={{padding:'8px 12px'}}>
                          {Object.entries(pl.extras).map(([item,price]) => (
                            <div key={item} style={{display:'flex',justifyContent:'space-between',fontSize:12,padding:'3px 0',borderBottom:'1px solid #f0f0f0'}}>
                              <span>{item}</span><strong>{price}</strong>
                            </div>
                          ))}
                        </div>
                      </details>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

                    {/* ========== CARPENTER FIXINGS ========== */}
          {user?.role === 'carpenter' && carpenterTab === 'fixings' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Request Fixings / Materials</h2>
              <div style={{backgroundColor:NAVY,color:CREAM,padding:20,borderRadius:8,maxWidth:500,marginBottom:20}}>
                <div style={{marginBottom:15}}><label style={{display:'block',marginBottom:4,fontSize:11}}>Allocation</label>
                  <select value={fixingAlloc} onChange={(e)=>setFixingAlloc(e.target.value)} style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,fontSize:13}}>
                    <option value="">Select</option>{myAllocs.filter(a=>!a.completed).map(a=><option key={a.id} value={a.id}>{a.site} - Plot {a.plot} ({a.stage})</option>)}</select></div>
                <div style={{marginBottom:15}}><label style={{display:'block',marginBottom:4,fontSize:11}}>Item</label>
                  <input type="text" placeholder="e.g. M8 bolts, wall ties..." value={fixingItem} onChange={(e)=>setFixingItem(e.target.value)} style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,boxSizing:'border-box',fontSize:13}} /></div>
                <div style={{marginBottom:15}}><label style={{display:'block',marginBottom:4,fontSize:11}}>Quantity</label>
                  <input type="number" placeholder="e.g. 500" value={fixingQty} onChange={(e)=>setFixingQty(e.target.value)} style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,boxSizing:'border-box',fontSize:13}} /></div>
                <div style={{marginBottom:15}}><label style={{display:'block',marginBottom:4,fontSize:11}}>Notes</label>
                  <textarea placeholder="Details..." value={fixingNotes} onChange={(e)=>setFixingNotes(e.target.value)} style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,minHeight:60,boxSizing:'border-box',fontFamily:'inherit',fontSize:13}} /></div>
                <button type="button" onClick={()=>{
                  if(fixingAlloc&&fixingItem&&fixingQty){const alloc=myAllocs.find(a=>String(a.id)===String(fixingAlloc));
                    const req=handleFixingRequest(fixingItem,fixingQty,fixingNotes,alloc);
                    setAllFixingRequests([...allFixingRequests,req]);setFixingRequests([...fixingRequests,req]);
                    addFixingReq({carpenter:req.carpenter,site:req.site,plot:req.plot,stage:req.stage,item:req.item,qty:req.qty,notes:req.notes||'',date:req.date,status:'pending'}).catch(e=>console.error('DB error:',e));
                    setFixingAlloc('');setFixingItem('');setFixingQty('');setFixingNotes('');
                    setSuccessMsg('Request submitted');setTimeout(()=>setSuccessMsg(''),2500);
                  }else{alert('Fill in allocation, item and quantity');}
                }} style={{backgroundColor:GOLD,color:NAVY,padding:'10px 20px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:14}}>Request</button>
              </div>
              {allFixingRequests.filter(r=>r.carpenter===user?.name).length>0&&(
                <div><h3 style={{color:NAVY,fontSize:16}}>Your Requests</h3>
                  {allFixingRequests.filter(r=>r.carpenter===user?.name).map(r=>(
                    <div key={r.id} style={{backgroundColor:'white',border:'1px solid #ddd',borderRadius:6,padding:12,marginBottom:8,fontSize:13}}>
                      <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:4}}>
                        <strong>{r.item} x{r.qty}</strong>
                        <span style={{padding:'2px 8px',borderRadius:3,fontSize:11,fontWeight:'bold',
                          backgroundColor:r.status==='approved'?'#e8f5e9':r.status==='denied'?'#ffebee':'#e3f2fd',
                          color:r.status==='approved'?'#2e7d32':r.status==='denied'?'#c62828':'#1565c0'}}>{(r.status||'pending').toUpperCase()}</span>
                      </div><div style={{color:'#666',fontSize:12,marginTop:4}}>{r.site} - {r.date}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========== CARPENTER INVOICE ========== */}
          {user?.role === 'carpenter' && carpenterTab === 'invoice' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>My Invoices</h2>
              {invoices.filter(i=>i.carpenter===user?.name).length===0?<p style={{color:'#666',fontSize:14}}>No invoices yet. Invoices are auto-generated when jobs are completed.</p>:(
                <div>
                  {invoices.filter(i=>i.carpenter===user?.name).map(inv=>{
                    const extras = invoiceExtraItems[inv.id] || [];
                    const extrasTotal = extras.reduce((s,e)=>s+parseFloat(e.amount||0),0);
                    const totalWithExtras = inv.amount + extrasTotal;
                    return (
                    <div key={inv.id} style={{backgroundColor:'white',border:'1px solid #ddd',borderRadius:8,padding:14,marginBottom:10}}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:8}}>
                        <div><strong style={{fontSize:14}}>{inv.site} - Plot {inv.plot}</strong><div style={{fontSize:12,color:'#666',marginTop:2}}>{inv.houseType} / {inv.stage}</div><div style={{fontSize:11,color:'#999',marginTop:2}}>{inv.date}</div></div>
                        <div style={{textAlign:'right'}}>
                          <div style={{fontSize:14,color:'#666'}}>Base: £{inv.amount}</div>
                          {extrasTotal>0 && <div style={{fontSize:14,color:GOLD}}>Extras: +£{extrasTotal}</div>}
                          <div style={{fontSize:18,fontWeight:'bold'}}>£{totalWithExtras}</div>
                          <span style={{display:'inline-block',padding:'2px 10px',borderRadius:3,fontSize:11,fontWeight:'bold',marginTop:4,
                            backgroundColor:inv.status==='paid'?'#e8f5e9':inv.status==='approved'?'#e3f2fd':'#fff3e0',
                            color:inv.status==='paid'?'#2e7d32':inv.status==='approved'?'#1565c0':'#e65100'}}>{inv.status.toUpperCase()}</span>
                        </div>
                      </div>
                      {extras.length>0 && (
                        <div style={{marginTop:10,padding:10,backgroundColor:'#f9f9f9',borderRadius:4}}>
                          <div style={{fontSize:11,fontWeight:'bold',color:'#666',marginBottom:6}}>Extra Items:</div>
                          {extras.map((ex,idx)=>(
                            <div key={idx} style={{display:'flex',justifyContent:'space-between',fontSize:12,padding:'3px 0',borderBottom:'1px solid #eee'}}>
                              <span>{ex.desc}</span><strong>£{ex.amount}</strong>
                            </div>
                          ))}
                        </div>
                      )}
                      {inv.status==='pending' && (
                        <div style={{marginTop:10}}>
                          {editingInvoiceId===inv.id ? (
                            <div style={{padding:10,backgroundColor:'#f0f0f0',borderRadius:6}}>
                              <div style={{fontSize:12,fontWeight:'bold',marginBottom:8,color:NAVY}}>Add Extra Item</div>
                              <input placeholder="Description (e.g. Additional snagging)" value={newExtraDesc} onChange={e=>setNewExtraDesc(e.target.value)} style={{width:'100%',padding:8,marginBottom:6,border:'1px solid #ccc',borderRadius:4,fontSize:12,boxSizing:'border-box'}}/>
                              <div style={{display:'flex',gap:8}}>
                                <input placeholder="Amount (£)" type="number" value={newExtraAmount} onChange={e=>setNewExtraAmount(e.target.value)} style={{flex:1,padding:8,border:'1px solid #ccc',borderRadius:4,fontSize:12}}/>
                                <button onClick={()=>{if(!newExtraDesc||!newExtraAmount)return;setInvoiceExtraItems(prev=>({...prev,[inv.id]:[...(prev[inv.id]||[]),{desc:newExtraDesc,amount:parseFloat(newExtraAmount)}]}));setNewExtraDesc('');setNewExtraAmount('');setSuccessMsg('Extra item added');setTimeout(()=>setSuccessMsg(''),2000);}} style={{padding:'8px 14px',backgroundColor:'#2e7d32',color:'white',border:'none',borderRadius:4,fontSize:12,fontWeight:'bold',cursor:'pointer'}}>Add</button>
                                <button onClick={()=>setEditingInvoiceId(null)} style={{padding:'8px 14px',backgroundColor:'#999',color:'white',border:'none',borderRadius:4,fontSize:12,cursor:'pointer'}}>Done</button>
                              </div>
                            </div>
                          ) : (
                            <button onClick={()=>setEditingInvoiceId(inv.id)} style={{padding:'6px 14px',fontSize:12,backgroundColor:'#e3f2fd',color:'#1565c0',border:'1px solid #90caf9',borderRadius:4,cursor:'pointer',fontWeight:'bold'}}>Edit / Add Extras</button>
                          )}
                        </div>
                      )}
                    </div>
                  );})}
                  <div style={{marginTop:15,padding:15,backgroundColor:NAVY,color:CREAM,borderRadius:8,fontSize:14}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}><span>Pending:</span><strong>£{invoices.filter(i=>i.carpenter===user?.name&&i.status==='pending').reduce((s,i)=>s+i.amount,0) + Object.entries(invoiceExtraItems).filter(([id])=>invoices.find(i=>i.id===parseInt(id)&&i.carpenter===user?.name&&i.status==='pending')).reduce((s,[id,items])=>s+items.reduce((ss,e)=>ss+parseFloat(e.amount||0),0),0)}</strong></div>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}><span>Approved:</span><strong>£{invoices.filter(i=>i.carpenter===user?.name&&i.status==='approved').reduce((s,i)=>s+i.amount,0)}</strong></div>
                    <div style={{display:'flex',justifyContent:'space-between'}}><span>Paid:</span><strong>£{invoices.filter(i=>i.carpenter===user?.name&&i.status==='paid').reduce((s,i)=>s+i.amount,0)}</strong></div>
                  </div>
                </div>
              )}
            </div>
          )}


          {/* ========== CARPENTER VARIATION ORDERS ========== */}
          {user?.role === 'carpenter' && carpenterTab === 'variation orders' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Variation Orders</h2>
              <p style={{color:'#666',fontSize:13,marginBottom:16}}>Submit variation orders for additional or changed work with photo evidence.</p>

              {!showVoForm ? (
                <button onClick={()=>setShowVoForm(true)} style={{backgroundColor:GOLD,color:NAVY,padding:'12px 24px',border:'none',borderRadius:6,cursor:'pointer',fontWeight:'bold',fontSize:14,marginBottom:20}}>
                  + New Variation Order
                </button>
              ) : (
                <div style={{backgroundColor:NAVY,color:CREAM,padding:20,borderRadius:10,maxWidth:500,marginBottom:20}}>
                  <h3 style={{color:GOLD,margin:'0 0 15px',fontSize:16}}>New Variation Order</h3>
                  <div style={{marginBottom:12}}><label style={{display:'block',marginBottom:4,fontSize:11}}>Site</label>
                    <input value={voSite} onChange={e=>setVoSite(e.target.value)} placeholder="Site name" style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,fontSize:13,boxSizing:'border-box'}} /></div>
                  <div style={{marginBottom:12}}><label style={{display:'block',marginBottom:4,fontSize:11}}>Plot</label>
                    <input value={voPlot} onChange={e=>setVoPlot(e.target.value)} placeholder="Plot number" style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,fontSize:13,boxSizing:'border-box'}} /></div>
                  <div style={{marginBottom:12}}><label style={{display:'block',marginBottom:4,fontSize:11}}>Description of Work</label>
                    <textarea value={voDesc} onChange={e=>setVoDesc(e.target.value)} placeholder="Describe the variation / day work..." style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,minHeight:80,fontSize:13,boxSizing:'border-box',fontFamily:'inherit'}} /></div>
                  <div style={{marginBottom:12}}><label style={{display:'block',marginBottom:4,fontSize:11}}>Amount (£)</label>
                    <input type="number" value={voAmount} onChange={e=>setVoAmount(e.target.value)} placeholder="0.00" style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,fontSize:13,boxSizing:'border-box'}} /></div>
                  <div style={{marginBottom:15}}>
                    <label style={{display:'block',marginBottom:4,fontSize:11}}>Photo Evidence</label>
                    <input type="file" ref={voFileRef} accept="image/*" capture="environment" multiple onChange={e=>{
                      const files=Array.from(e.target.files||[]);
                      files.forEach(file=>{
                        const reader=new FileReader();
                        reader.onload=(ev)=>setVoPhotos(prev=>[...prev,{id:Date.now()+Math.random(),dataUrl:ev.target.result,name:file.name}]);
                        reader.readAsDataURL(file);
                      });
                    }} style={{fontSize:12}} />
                    {voPhotos.length>0 && (
                      <div style={{display:'flex',gap:6,marginTop:8,flexWrap:'wrap'}}>
                        {voPhotos.map(p=>(
                          <div key={p.id} style={{position:'relative'}}>
                            <img src={p.dataUrl} alt="" style={{width:60,height:60,objectFit:'cover',borderRadius:4,border:'1px solid '+GOLD}} />
                            <button onClick={()=>setVoPhotos(prev=>prev.filter(x=>x.id!==p.id))} style={{position:'absolute',top:-4,right:-4,width:16,height:16,borderRadius:'50%',backgroundColor:'#d32f2f',color:'white',border:'none',fontSize:10,cursor:'pointer',lineHeight:'16px',padding:0}}>×</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{display:'flex',gap:8}}>
                    <button onClick={()=>{
                      if(!voDesc.trim()||!voAmount){alert('Fill in description and amount');return;}
                      const vo={id:Date.now(),carpenter:user?.name,site:voSite||user?.site||'',plot:voPlot,desc:voDesc,amount:parseFloat(voAmount),photos:voPhotos,date:new Date().toISOString().split('T')[0],status:'pending'};
                      setVariationOrders(prev=>[...prev,vo]);
                      setVoDesc('');setVoAmount('');setVoPhotos([]);setVoSite('');setVoPlot('');setShowVoForm(false);
                      setSuccessMsg('Variation order submitted');setTimeout(()=>setSuccessMsg(''),2500);
                    }} style={{backgroundColor:GOLD,color:NAVY,padding:'10px 20px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:14}}>Submit</button>
                    <button onClick={()=>{setShowVoForm(false);setVoPhotos([]);}} style={{backgroundColor:'#666',color:'white',padding:'10px 20px',border:'none',borderRadius:4,cursor:'pointer',fontSize:14}}>Cancel</button>
                  </div>
                </div>
              )}

              {variationOrders.filter(v=>v.carpenter===user?.name).length>0 && (
                <div>
                  <h3 style={{color:NAVY,fontSize:16,marginBottom:10}}>Your Variation Orders</h3>
                  {variationOrders.filter(v=>v.carpenter===user?.name).sort((a,b)=>b.id-a.id).map(vo=>(
                    <div key={vo.id} style={{backgroundColor:'white',border:'1px solid #ddd',borderRadius:8,padding:14,marginBottom:10,borderLeft:'4px solid '+(vo.status==='approved'?'#4caf50':vo.status==='rejected'?'#d32f2f':'#ff9800')}}>
                      <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:6}}>
                        <div>
                          <strong style={{fontSize:14}}>{vo.site}{vo.plot?' — Plot '+vo.plot:''}</strong>
                          <div style={{fontSize:12,color:'#666',marginTop:4}}>{vo.desc}</div>
                        </div>
                        <div style={{textAlign:'right'}}>
                          <div style={{fontSize:16,fontWeight:'bold'}}>£{vo.amount}</div>
                          <span style={{padding:'2px 8px',borderRadius:3,fontSize:11,fontWeight:'bold',
                            backgroundColor:vo.status==='approved'?'#e8f5e9':vo.status==='rejected'?'#ffebee':'#fff3e0',
                            color:vo.status==='approved'?'#2e7d32':vo.status==='rejected'?'#c62828':'#e65100'}}>{vo.status.toUpperCase()}</span>
                        </div>
                      </div>
                      {vo.photos?.length>0 && (
                        <div style={{display:'flex',gap:6,marginTop:8,flexWrap:'wrap'}}>
                          {vo.photos.map(p=><img key={p.id} src={p.dataUrl} alt="" style={{width:50,height:50,objectFit:'cover',borderRadius:4,border:'1px solid #ddd'}} />)}
                        </div>
                      )}
                      <div style={{fontSize:11,color:'#999',marginTop:6}}>{vo.date}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========== CARPENTER DAY OFF REQUESTS ========== */}
          {user?.role === 'carpenter' && carpenterTab === 'day off' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Request Day Off</h2>
              <div style={{backgroundColor:NAVY,color:CREAM,padding:20,borderRadius:10,maxWidth:400,marginBottom:20}}>
                <div style={{marginBottom:12}}><label style={{display:'block',marginBottom:4,fontSize:11}}>Start Date</label>
                  <input type="date" value={dayOffStart} onChange={e=>setDayOffStart(e.target.value)} style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,fontSize:13,boxSizing:'border-box'}} /></div>
                <div style={{marginBottom:12}}><label style={{display:'block',marginBottom:4,fontSize:11}}>End Date</label>
                  <input type="date" value={dayOffEnd} onChange={e=>setDayOffEnd(e.target.value)} style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,fontSize:13,boxSizing:'border-box'}} /></div>
                <div style={{marginBottom:15}}><label style={{display:'block',marginBottom:4,fontSize:11}}>Reason</label>
                  <textarea value={dayOffReason} onChange={e=>setDayOffReason(e.target.value)} placeholder="e.g. Holiday, appointment..." style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,minHeight:60,fontSize:13,boxSizing:'border-box',fontFamily:'inherit'}} /></div>
                <button onClick={()=>{
                  if(!dayOffStart||!dayOffEnd){alert('Select start and end dates');return;}
                  const req={id:Date.now(),carpenter:user?.name,startDate:dayOffStart,endDate:dayOffEnd,reason:dayOffReason,status:'pending',requestedDate:new Date().toISOString().split('T')[0]};
                  setDayOffRequests(prev=>[...prev,req]);
                  setDayOffStart('');setDayOffEnd('');setDayOffReason('');
                  setSuccessMsg('Day off request submitted');setTimeout(()=>setSuccessMsg(''),2500);
                }} style={{backgroundColor:GOLD,color:NAVY,padding:'10px 20px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:14}}>Request</button>
              </div>
              {dayOffRequests.filter(d=>d.carpenter===user?.name).length>0 && (
                <div>
                  <h3 style={{color:NAVY,fontSize:16,marginBottom:10}}>Your Requests</h3>
                  {dayOffRequests.filter(d=>d.carpenter===user?.name).sort((a,b)=>b.id-a.id).map(req=>(
                    <div key={req.id} style={{backgroundColor:'white',border:'1px solid #ddd',borderRadius:8,padding:12,marginBottom:8,borderLeft:'4px solid '+(req.status==='approved'?'#4caf50':req.status==='denied'?'#d32f2f':'#ff9800')}}>
                      <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:6}}>
                        <div>
                          <strong style={{fontSize:14}}>{formatDate(req.startDate)} — {formatDate(req.endDate)}</strong>
                          <div style={{fontSize:12,color:'#666',marginTop:2}}>{req.reason||'No reason given'}</div>
                        </div>
                        <span style={{padding:'2px 10px',borderRadius:3,fontSize:11,fontWeight:'bold',height:'fit-content',
                          backgroundColor:req.status==='approved'?'#e8f5e9':req.status==='denied'?'#ffebee':'#fff3e0',
                          color:req.status==='approved'?'#2e7d32':req.status==='denied'?'#c62828':'#e65100'}}>{req.status.toUpperCase()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          
          {/* ========== ADMIN: DAY OFF APPROVALS ========== */}
          {(user?.role === 'admin') && adminTab === 'day-off' && (
            <div>
              <h2 style={{color:NAVY,marginTop:0,fontSize:22}}>Day Off Requests</h2>
              {dayOffRequests.length===0?<p style={{color:'#666',fontSize:14}}>No day off requests.</p>:(
                <div>
                  {dayOffRequests.sort((a,b)=>b.id-a.id).map(req=>(
                    <div key={req.id} style={{backgroundColor:'white',border:'1px solid #ddd',borderRadius:8,padding:14,marginBottom:10,borderLeft:'4px solid '+(req.status==='approved'?'#4caf50':req.status==='denied'?'#d32f2f':'#ff9800')}}>
                      <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:8}}>
                        <div>
                          <strong style={{fontSize:15}}>{req.carpenter}</strong>
                          <div style={{fontSize:13,color:'#666',marginTop:2}}>{formatDate(req.startDate)} — {formatDate(req.endDate)}</div>
                          <div style={{fontSize:12,color:'#888',marginTop:2}}>{req.reason||'No reason given'}</div>
                        </div>
                        <div style={{display:'flex',gap:8,alignItems:'flex-start'}}>
                          {req.status==='pending'?(
                            <>
                              <button onClick={()=>setDayOffRequests(prev=>prev.map(d=>d.id===req.id?{...d,status:'approved'}:d))} style={{backgroundColor:'#4caf50',color:'white',padding:'6px 14px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:12}}>Approve</button>
                              <button onClick={()=>setDayOffRequests(prev=>prev.map(d=>d.id===req.id?{...d,status:'denied'}:d))} style={{backgroundColor:'#d32f2f',color:'white',padding:'6px 14px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:12}}>Deny</button>
                            </>
                          ):(
                            <span style={{padding:'4px 12px',borderRadius:4,fontSize:12,fontWeight:'bold',
                              backgroundColor:req.status==='approved'?'#e8f5e9':'#ffebee',
                              color:req.status==='approved'?'#2e7d32':'#c62828'}}>{req.status.toUpperCase()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========== ADMIN: VARIATION ORDERS APPROVAL ========== */}
          {(user?.role === 'admin') && adminTab === 'variations' && (
            <div>
              <h2 style={{color:NAVY,marginTop:0,fontSize:22}}>Variation Orders</h2>
              {variationOrders.length===0?<p style={{color:'#666',fontSize:14}}>No variation orders submitted.</p>:(
                <div>
                  {variationOrders.sort((a,b)=>b.id-a.id).map(vo=>(
                    <div key={vo.id} style={{backgroundColor:'white',border:'1px solid #ddd',borderRadius:8,padding:14,marginBottom:10,borderLeft:'4px solid '+(vo.status==='approved'?'#4caf50':vo.status==='rejected'?'#d32f2f':'#ff9800')}}>
                      <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:8}}>
                        <div>
                          <strong style={{fontSize:15}}>{vo.carpenter}</strong>
                          <div style={{fontSize:13,color:'#666',marginTop:2}}>{vo.site}{vo.plot?' — Plot '+vo.plot:''}</div>
                          <div style={{fontSize:13,marginTop:4}}>{vo.desc}</div>
                          {vo.photos?.length>0 && (
                            <div style={{display:'flex',gap:4,marginTop:6,flexWrap:'wrap'}}>
                              {vo.photos.map(p=><img key={p.id} src={p.dataUrl} alt="" style={{width:60,height:60,objectFit:'cover',borderRadius:4,border:'1px solid #ddd'}} />)}
                            </div>
                          )}
                        </div>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:6}}>
                          <strong style={{fontSize:18}}>£{vo.amount}</strong>
                          {vo.status==='pending'?(
                            <div style={{display:'flex',gap:6}}>
                              <button onClick={()=>setVariationOrders(prev=>prev.map(v=>v.id===vo.id?{...v,status:'approved'}:v))} style={{backgroundColor:'#4caf50',color:'white',padding:'6px 14px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:12}}>Approve</button>
                              <button onClick={()=>setVariationOrders(prev=>prev.map(v=>v.id===vo.id?{...v,status:'rejected'}:v))} style={{backgroundColor:'#d32f2f',color:'white',padding:'6px 14px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:12}}>Reject</button>
                            </div>
                          ):(
                            <span style={{padding:'4px 12px',borderRadius:4,fontSize:12,fontWeight:'bold',
                              backgroundColor:vo.status==='approved'?'#e8f5e9':'#ffebee',
                              color:vo.status==='approved'?'#2e7d32':'#c62828'}}>{vo.status.toUpperCase()}</span>
                          )}
                        </div>
                      </div>
                      <div style={{fontSize:11,color:'#999',marginTop:6}}>{vo.date}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========== INVOICE/OFFICE ========== */}
          {user?.role === 'invoice' && ['pending','approved','paid'].map(status=>(
            invoiceTab===status&&(
              <div key={status}>
                <h2 style={{color:NAVY,marginTop:0,fontSize:22,textTransform:'capitalize'}}>{status} Invoices</h2>
                {invoices.filter(i=>i.status===status).length===0?<p style={{color:'#666',fontSize:14}}>No {status} invoices.</p>:(
                  <div>
                    {invoices.filter(i=>i.status===status).map(inv=>(
                      <div key={inv.id} style={{backgroundColor:'white',border:'1px solid #ddd',borderRadius:8,padding:14,marginBottom:10}}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
                          <div><strong style={{fontSize:14}}>{inv.carpenter}</strong><div style={{fontSize:12,color:'#666',marginTop:2}}>{inv.site} - Plot {inv.plot} / {inv.houseType} / {inv.stage}</div></div>
                          <div style={{display:'flex',alignItems:'center',gap:10}}>
                            <strong style={{fontSize:18}}>GBP {inv.amount}</strong>
                            {status==='pending'&&<button onClick={()=>{setInvoices(invoices.map(i=>i.id===inv.id?{...i,status:'approved'}:i));updateInvoice(inv.id,{status:'approved'}).catch(e=>console.error('DB error:',e));setSuccessMsg('Signed off');setTimeout(()=>setSuccessMsg(''),2500);}} style={{backgroundColor:GOLD,color:NAVY,padding:'6px 12px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:12}}>Sign Off</button>}
                            {status==='approved'&&<button onClick={()=>{setInvoices(invoices.map(i=>i.id===inv.id?{...i,status:'paid'}:i));updateInvoice(inv.id,{status:'paid'}).catch(e=>console.error('DB error:',e));setSuccessMsg('Marked paid');setTimeout(()=>setSuccessMsg(''),2500);}} style={{backgroundColor:'#2e7d32',color:'white',padding:'6px 12px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:12}}>Mark Paid</button>}
                            {status==='paid'&&<span style={{fontSize:12,color:'#2e7d32',fontWeight:'bold'}}>Paid</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div style={{marginTop:15,padding:15,backgroundColor:NAVY,color:CREAM,borderRadius:8}}>
                      <p style={{margin:0,fontWeight:'bold',fontSize:16}}>Total {status}: GBP {invoices.filter(i=>i.status===status).reduce((s,i)=>s+i.amount,0)}</p>
                    </div>
                  </div>
                )}
              </div>
            )
          ))}

        </main>
      </div>
    </div>
  ); }




if(portal){return(<div style={S.root}><nav style={{...S.nav,padding:"0 20px"}}><div style={{display:"flex",alignItems:"center",gap:10}}><img src={logoUrl} alt="M&W" style={{width:32,height:32,borderRadius:4,objectFit:"contain"}}/><span style={{color:"#fff",fontSize:14,fontWeight:600}}>M&W Portal</span>{pUser&&<span style={{fontSize:10,padding:"3px 10px",borderRadius:100,background:"rgba(184,134,11,.2)",color:"#D4A843",fontWeight:600,marginLeft:4}}>{pUser.role==="admin"?"ADMIN":pUser.role==="office"?"OFFICE":"CARPENTER"}</span>}</div><span style={{...S.nl(false),color:"rgba(255,255,255,.8)"}} onClick={()=>{setPortal(null);setPUser(null);go("home");}}>Exit Portal</span></nav>
{portal==="login"&&(<div style={{marginTop:64,minHeight:"90vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(160deg, #0a1520 0%, #0C1821 40%, #111f2c 100%)",position:"relative",overflow:"hidden"}}><div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:"radial-gradient(ellipse at 30% 20%, rgba(184,134,11,0.04) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(184,134,11,0.03) 0%, transparent 50%)",pointerEvents:"none"}}></div><div style={{position:"relative",width:"100%",maxWidth:420,padding:"0 20px"}}><div style={{textAlign:"center",marginBottom:40}}><div style={{width:72,height:72,borderRadius:16,overflow:"hidden",margin:"0 auto 24px",boxShadow:"0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(184,134,11,0.2)",background:"linear-gradient(135deg, #B8860B, #D4A843)"}}><img src={logoUrl} alt="M&W" style={{width:"100%",height:"100%",objectFit:"contain"}}/></div><h2 style={{color:"#fff",fontSize:26,fontWeight:700,letterSpacing:"-0.02em",marginBottom:6,fontFamily:"'DM Sans',sans-serif"}}>Miller &amp; Watson</h2><div style={{width:40,height:2,background:"linear-gradient(90deg, transparent, #B8860B, transparent)",margin:"12px auto 14px"}}></div><p style={{color:"rgba(255,255,255,.4)",fontSize:13,fontWeight:400,letterSpacing:"0.02em"}}>Contractor Management Portal</p></div><div style={{background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.06)",borderRadius:16,padding:"36px 32px 32px",boxShadow:"0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)"}}><label style={{display:"block",fontSize:11,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(255,255,255,.35)",marginBottom:10}}>Access PIN</label><input type="password" value={pin} onChange={e=>setPin(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLogin()} placeholder="Enter PIN" style={{width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:10,padding:"16px 20px",color:"#fff",fontSize:22,fontFamily:"'DM Sans',monospace",outline:"none",textAlign:"center",letterSpacing:12,boxSizing:"border-box"}}/><button onClick={doLogin} style={{width:"100%",marginTop:20,padding:"15px 24px",background:"linear-gradient(135deg, #B8860B 0%, #D4A843 100%)",color:"#0C1821",fontSize:14,fontWeight:700,border:"none",borderRadius:10,cursor:"pointer",letterSpacing:"0.04em",fontFamily:"'DM Sans',sans-serif",boxShadow:"0 4px 16px rgba(184,134,11,0.25), inset 0 1px 0 rgba(255,255,255,0.2)"}}>Sign In</button></div><div style={{marginTop:28,textAlign:"center",borderTop:"1px solid rgba(255,255,255,.04)",paddingTop:16}}><p style={{color:"rgba(255,255,255,.2)",fontSize:10,letterSpacing:"0.05em",margin:0}}>Suite 4, The Hayloft, Blakenhall Park</p><p style={{color:"rgba(255,255,255,.15)",fontSize:10,margin:"4px 0 0"}}>Barton Under Needwood, DE13 8AJ | Est. 2005</p></div></div></div>)}
{portal==="carp"&&pUser&&(<div style={{marginTop:64,background:"#f6f4ef",minHeight:"90vh"}}><div style={{background:"#0C1821",padding:"20px 24px",color:"#fff"}}><div style={{maxWidth:1320,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}><div><div style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>Welcome back</div><div style={{fontSize:20,fontWeight:700}}>{pUser.name}</div><div style={{fontSize:12,color:"#B8860B",marginTop:2}}>Assigned: {pUser.site} \u2014 {pUser.builder}</div></div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{["schedule","fixings","documents","price-list","invoice"].map(t=>(<button key={t} onClick={()=>setPTab(t)} style={{...S.bt,background:pTab===t?"#B8860B":"rgba(255,255,255,.06)",color:pTab===t?"#fff":"rgba(255,255,255,.6)",fontSize:10,textTransform:"capitalize",padding:"7px 12px"}}>{t.replace("-"," ")}</button>))}</div></div></div><div style={{maxWidth:1320,margin:"0 auto",padding:"24px"}}>
{pTab==="schedule"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:16}}>Your Schedule</h3><div style={{display:"grid",gap:10}}>{pUser.schedule.map((s,i)=>(<div key={i} style={{background:"#fff",borderRadius:8,padding:16,display:"flex",justifyContent:"space-between",alignItems:"center",borderLeft:`4px solid ${s.status==="active"?"#B8860B":s.status==="complete"?"#22c55e":"#ddd"}`}}><div><div style={{fontSize:14,fontWeight:700}}>{s.day} \u2014 Plot {s.plot}</div><div style={{fontSize:12,color:"#777",marginTop:2}}>The {s.type} \u2014 {s.stage}</div></div><div style={{display:"flex",gap:8,alignItems:"center"}}><span style={{fontSize:10,padding:"3px 10px",borderRadius:100,fontWeight:600,background:s.status==="active"?"#FFF3E0":s.status==="complete"?"#E8F5E9":"#f5f5f5",color:s.status==="active"?"#E65100":s.status==="complete"?"#2E7D32":"#999"}}>{s.status}</span>{s.status!=="complete"&&<button onClick={()=>{const u={...pUser};u.schedule=u.schedule.map((x,j)=>j===i?{...x,status:"complete"}:x);setPUser(u);}} style={{...S.bt,background:"#22c55e",color:"#fff",fontSize:10,padding:"5px 12px"}}>Complete</button>}</div></div>))}</div></>)}
{pTab==="fixings"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:16}}>Request Fixings</h3><div style={{background:"#fff",borderRadius:8,padding:20,marginBottom:20}}><p style={{fontSize:12,color:"#777",marginBottom:10}}>Request goes to admin for approval.</p><textarea value={newMat} onChange={e=>setNewMat(e.target.value)} placeholder="e.g. 2x boxes 63mm nails, 5x sheets OSB" rows={3} style={{width:"100%",border:"1px solid #e0e0e0",borderRadius:6,padding:10,fontSize:13,fontFamily:"inherit",outline:"none",resize:"vertical",marginBottom:10}}/><button onClick={()=>{if(!newMat.trim())return;setMatReqs(p=>[{id:Date.now(),who:pUser.name,site:pUser.site,items:newMat,status:"pending",date:new Date().toLocaleDateString("en-GB").slice(0,5),payMethod:"deduct"},...p]);setNewMat("");}} style={{...S.bt,background:"#B8860B",color:"#fff",fontSize:12}}>Submit Request</button></div><h4 style={{fontSize:14,fontWeight:700,marginBottom:10}}>Your Requests</h4>{matReqs.filter(r=>r.who===pUser.name).map(r=>(<div key={r.id} style={{background:"#fff",borderRadius:8,padding:14,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:13,fontWeight:600}}>{r.items}</div><div style={{fontSize:11,color:"#999"}}>{r.date}</div></div><span style={{fontSize:10,padding:"3px 10px",borderRadius:100,fontWeight:600,background:r.status==="pending"?"#FFF3E0":r.status==="approved"?"#E8F5E9":"#FFEBEE",color:r.status==="pending"?"#E65100":r.status==="approved"?"#2E7D32":"#C62828"}}>{r.status}</span></div>))}</>)}
{pTab==="documents"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:4}}>Documents \u2014 {pUser.site}</h3><p style={{fontSize:12,color:"#999",marginBottom:16}}>Showing files for your assigned site only.</p>{(DEMO_DOCS_BY_SITE[pUser.site]||[{cat:"Notice",docs:["No documents uploaded for this site yet. Contact admin."]}]).map(section=>(<div key={section.cat} style={{marginBottom:16}}><h4 style={{fontSize:13,fontWeight:700,marginBottom:8,paddingBottom:6,borderBottom:"1px solid #eee"}}>{section.cat}</h4>{section.docs.map((doc,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:i%2===0?"#fff":"#fafaf8",borderRadius:6,marginBottom:4}}><span style={{fontSize:13}}>{doc}</span><button onClick={()=>alert('Demo: Would open "'+doc+'"')} style={{...S.bt,background:"#0C1821",color:"#fff",fontSize:10,padding:"4px 12px"}}>View</button></div>))}</div>))}</>)}
{pTab==="price-list"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:4}}>Price List \u2014 {pUser.site}</h3><p style={{fontSize:12,color:"#999",marginBottom:16}}>Rates for your assigned site.</p>{(()=>{const bl=ALL_PRICE_LISTS.find(b=>b.sites.some(s=>s.site===pUser.site));const sl=bl?.sites.find(s=>s.site===pUser.site);if(!sl)return <p style={{color:"#999"}}>No price list available for this site.</p>;return(<div style={{background:"#fff",borderRadius:8,overflow:"hidden",border:"1px solid #e8e8e8"}}><div style={{display:"grid",gridTemplateColumns:"1fr 100px",background:"#0C1821",padding:"10px 16px"}}><div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.5)",textTransform:"uppercase",letterSpacing:1}}>Task</div><div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.5)",textTransform:"uppercase",letterSpacing:1,textAlign:"right"}}>Rate</div></div>{sl.rates.map(([task,rate],i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"1fr 100px",padding:"10px 16px",background:i%2===0?"#fff":"#fafaf8",borderBottom:"1px solid #f0f0f0"}}><div style={{fontSize:13}}>{task}</div><div style={{fontSize:13,fontWeight:700,color:"#B8860B",textAlign:"right"}}>{rate}</div></div>))}</div>);})()}</>)}
{pTab==="invoice"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:4}}>Your Invoice</h3><p style={{fontSize:12,color:"#999",marginBottom:16}}>Auto-generated from completed work this week.</p>{(()=>{const inv=getInvoiceForCarp(pUser.name);return(<><div style={{background:"#fff",borderRadius:8,padding:20,marginBottom:16}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}><div><div style={{fontSize:11,color:"#999",textTransform:"uppercase",letterSpacing:1}}>Carpenter</div><div style={{fontSize:15,fontWeight:700}}>{pUser.name}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:11,color:"#999",textTransform:"uppercase",letterSpacing:1}}>Week Total</div><div style={{fontSize:22,fontWeight:700,color:"#B8860B"}}>{"\u00a3"}{inv.total.toFixed(2)}</div></div></div>{inv.completed.length>0?(<div style={{borderRadius:6,overflow:"hidden",border:"1px solid #e8e8e8"}}><div style={{display:"grid",gridTemplateColumns:"1fr 80px 100px 100px",background:"#0C1821",padding:"8px 12px"}}>{["Site / Plot","Stage","Date","Amount"].map(h=>(<div key={h} style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.5)",textTransform:"uppercase",letterSpacing:1}}>{h}</div>))}</div>{inv.completed.map((a,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"1fr 80px 100px 100px",padding:"8px 12px",background:i%2===0?"#fff":"#fafaf8",borderBottom:"1px solid #f0f0f0"}}><div style={{fontSize:12}}>{a.site} \u2014 Plot {a.plot}</div><div style={{fontSize:12,color:"#777"}}>{a.stage}</div><div style={{fontSize:12}}>{a.date}</div><div style={{fontSize:12,fontWeight:700,color:"#B8860B"}}>{a.rate}</div></div>))}</div>):<p style={{fontSize:13,color:"#999"}}>No completed work yet this week. Complete tasks from your schedule to generate invoice lines.</p>}</div>{inv.pending.length>0&&<div style={{background:"#FFF8E1",borderRadius:8,padding:16}}><h4 style={{fontSize:13,fontWeight:700,marginBottom:8,color:"#E65100"}}>In Progress (not yet invoiceable)</h4>{inv.pending.map((a,i)=>(<div key={i} style={{fontSize:12,marginBottom:4}}>{a.site} \u2014 Plot {a.plot} \u2014 {a.stage} \u2014 {a.rate}</div>))}</div>}</>);})()}</>)}
</div></div>)}
{portal==="office"&&pUser&&(<div style={{marginTop:64,background:"#f6f4ef",minHeight:"90vh"}}><div style={{background:"#0C1821",padding:"20px 24px",color:"#fff"}}><div style={{maxWidth:1320,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}><div><div style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>Office Portal</div><div style={{fontSize:20,fontWeight:700}}>{pUser.name}</div></div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{["invoices","site-map","price-lists"].map(t=>(<button key={t} onClick={()=>setPTab(t)} style={{...S.bt,background:pTab===t?"#B8860B":"rgba(255,255,255,.06)",color:pTab===t?"#fff":"rgba(255,255,255,.6)",fontSize:10,textTransform:"capitalize",padding:"7px 12px"}}>{t.replace("-"," ")}</button>))}</div></div></div><div style={{maxWidth:1320,margin:"0 auto",padding:"24px"}}>
{pTab==="invoices"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:16}}>Invoice Dashboard</h3><div style={{display:"grid",gap:12}}>{ALL_CARPS.filter(c=>c.status==="active").map(c=>{const inv=getInvoiceForCarp(c.name);return(<div key={c.id} style={{background:"#fff",borderRadius:8,padding:16,display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid #e8e8e8"}}><div><div style={{fontSize:14,fontWeight:700}}>{c.name}</div><div style={{fontSize:11,color:"#999"}}>{c.site} \u2014 {c.builder}</div><div style={{fontSize:11,color:"#777",marginTop:4}}>{inv.completed.length} completed | {inv.pending.length} in progress</div></div><div style={{textAlign:"right"}}><div style={{fontSize:20,fontWeight:700,color:"#B8860B"}}>{"\u00a3"}{inv.total.toFixed(2)}</div><div style={{fontSize:10,color:"#999"}}>this week</div></div></div>);})}</div></>)}
{pTab==="site-map"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:4}}>Interactive Site Map \u2014 Holbrook Park</h3><p style={{fontSize:12,color:"#999",marginBottom:16}}>Click any plot to see status and outstanding work.</p><div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>{Object.entries(stageColors).map(([stage,color])=>(<div key={stage} style={{display:"flex",alignItems:"center",gap:4,fontSize:10}}><span style={{width:10,height:10,borderRadius:2,background:color,display:"inline-block"}}/>{stage}</div>))}</div><div style={{display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:6,marginBottom:20}}>{plots.map(p=>(<div key={p.plot} onClick={()=>setSelectedPlot(selectedPlot===p.plot?null:p.plot)} style={{aspectRatio:"1",background:stageColors[p.stage]||"#e0e0e0",borderRadius:6,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",border:selectedPlot===p.plot?"3px solid #B8860B":"3px solid transparent",transition:".2s"}}><div style={{fontSize:12,fontWeight:700,color:"#fff"}}>{p.plot}</div><div style={{fontSize:7,color:"rgba(255,255,255,.8)",marginTop:1}}>{p.stage.replace(" Complete","\u2713").replace("Not Started","\u2014")}</div></div>))}</div>{selectedPlot&&(()=>{const p=plots.find(x=>x.plot===selectedPlot);if(!p)return null;return(<div style={{background:"#fff",borderRadius:8,padding:20,border:"1px solid #e8e8e8"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}><div><h4 style={{fontSize:16,fontWeight:700,margin:"0 0 4px"}}>Plot {p.plot}</h4><div style={{fontSize:12,color:"#777"}}>The {p.houseType} \u2014 {p.carpenter}</div></div><span style={{fontSize:11,padding:"4px 12px",borderRadius:100,fontWeight:600,background:stageColors[p.stage],color:"#fff"}}>{p.stage}</span></div><div style={{fontSize:12,color:"#555"}}><strong>Outstanding:</strong> {p.stage==="Complete"?"None \u2014 plot complete":p.stage==="Not Started"?"All stages":p.stage+" in progress"}</div></div>);})()}</>)}
{pTab==="price-lists"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:16}}>All Price Lists</h3>{ALL_PRICE_LISTS.map((b,bi)=>(<div key={bi} style={{marginBottom:12}}><div style={{background:"#fff",borderRadius:8,overflow:"hidden",border:"1px solid #e8e8e8"}}><div onClick={()=>{const el=document.getElementById("opl-"+bi);if(el)el.style.display=el.style.display==="none"?"block":"none";}} style={{padding:"12px 16px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",borderLeft:`4px solid ${b.color}`}}><span style={{fontSize:13,fontWeight:700}}>{b.builder}</span><span style={{color:"#B8860B",fontSize:11}}>{"\u25BC"}</span></div><div id={"opl-"+bi} style={{display:"none"}}>{b.sites.map((s,si)=>(<div key={si} style={{padding:"12px 16px",borderTop:"1px solid #f0f0f0"}}><h5 style={{fontSize:12,fontWeight:700,marginBottom:8,color:b.color}}>{s.site}</h5>{s.rates.map(([task,rate],ri)=>(<div key={ri} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",fontSize:12,borderBottom:"1px solid #f8f7f4"}}><span>{task}</span><span style={{fontWeight:700,color:"#B8860B"}}>{rate}</span></div>))}</div>))}</div></div></div>))}</>)}
</div></div>)}
{portal==="mgr"&&pUser&&(<div style={{marginTop:64,background:"#f6f4ef",minHeight:"90vh"}}><div style={{background:"#0C1821",padding:"20px 24px",color:"#fff"}}><div style={{maxWidth:1320,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}><div><div style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>Admin Dashboard</div><div style={{fontSize:20,fontWeight:700}}>Welcome, {pUser.name}</div></div><div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{["dashboard","carpenters","schedules","site-map","fixings","price-lists","documents"].map(t=>(<button key={t} onClick={()=>setPTab(t)} style={{...S.bt,background:pTab===t?"#B8860B":"rgba(255,255,255,.06)",color:pTab===t?"#fff":"rgba(255,255,255,.6)",fontSize:9,textTransform:"capitalize",padding:"6px 10px"}}>{t.replace("-"," ")}</button>))}</div></div></div><div style={{maxWidth:1320,margin:"0 auto",padding:"24px"}}>
{pTab==="dashboard"&&(<><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12,marginBottom:24}}>{[["Carpenters",ALL_CARPS.filter(c=>c.status==="active").length+""],["Sites","12"],["Pending Fixings",matReqs.filter(r=>r.status==="pending").length+""],["Active Plots","34"],["This Week","\u00a3"+schedAllocs.filter(a=>a.status==="complete").reduce((s,a)=>s+parseFloat(a.rate.replace(/[\u00a3,]/g,"")),0).toFixed(0)]].map(([l,v])=>(<div key={l} style={{background:"#fff",borderRadius:8,padding:16,textAlign:"center"}}><div style={{fontSize:24,fontWeight:700,color:"#B8860B"}}>{v}</div><div style={{fontSize:9,color:"#999",textTransform:"uppercase",letterSpacing:1,marginTop:4}}>{l}</div></div>))}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}><div style={{background:"#fff",borderRadius:8,padding:16}}><h4 style={{fontSize:13,fontWeight:700,marginBottom:10}}>Pending Fixings</h4>{matReqs.filter(r=>r.status==="pending").slice(0,3).map(r=>(<div key={r.id} style={{fontSize:12,padding:"6px 0",borderBottom:"1px solid #f0f0f0"}}>{r.who}: {r.items}</div>))}</div><div style={{background:"#fff",borderRadius:8,padding:16}}><h4 style={{fontSize:13,fontWeight:700,marginBottom:10}}>Quick Actions</h4>{[["Manage Carpenters","carpenters"],["Build Schedules","schedules"],["Site Map","site-map"],["Approve Fixings","fixings"]].map(([l,t])=>(<button key={t} onClick={()=>setPTab(t)} style={{...S.bt,background:"#f8f7f4",color:"#333",width:"100%",justifyContent:"center",marginBottom:6,fontSize:11}}>{l} {"\u2192"}</button>))}</div></div></>)}
{pTab==="carpenters"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:16}}>Carpenter Roster</h3><div style={{background:"#fff",borderRadius:8,overflow:"hidden",border:"1px solid #e8e8e8"}}><div style={{display:"grid",gridTemplateColumns:"50px 1fr 70px 1fr 1fr 70px",background:"#0C1821",padding:"8px 12px",gap:6}}>{["ID","Name","PIN","Site","Builder","Status"].map(h=>(<div key={h} style={{fontSize:9,fontWeight:700,color:"rgba(255,255,255,.5)",textTransform:"uppercase",letterSpacing:1}}>{h}</div>))}</div>{ALL_CARPS.map((c,i)=>(<div key={c.id} style={{display:"grid",gridTemplateColumns:"50px 1fr 70px 1fr 1fr 70px",padding:"10px 12px",gap:6,background:i%2===0?"#fff":"#fafaf8",borderBottom:"1px solid #f0f0f0",alignItems:"center"}}><div style={{fontSize:11,fontWeight:600,color:"#B8860B"}}>{c.id}</div><div style={{fontSize:12,fontWeight:600}}>{c.name}</div><div style={{fontSize:11,fontFamily:"monospace",background:"#f5f3ef",padding:"2px 6px",borderRadius:4,textAlign:"center"}}>{c.pin}</div><div style={{fontSize:11,color:"#555"}}>{c.site}</div><div style={{fontSize:11,color:"#777"}}>{c.builder}</div><div><span style={{fontSize:9,padding:"2px 8px",borderRadius:100,fontWeight:600,background:c.status==="active"?"#E8F5E9":"#FFF3E0",color:c.status==="active"?"#2E7D32":"#E65100"}}>{c.status}</span></div></div>))}</div></>)}
{pTab==="schedules"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:16}}>Schedule Builder</h3><div style={{background:"#fff",borderRadius:8,padding:20,marginBottom:20}}><h4 style={{fontSize:13,fontWeight:700,marginBottom:10}}>Allocate Work</h4><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 80px 1fr 1fr 100px",gap:8}}><select value={allocForm.carp} onChange={e=>setAllocForm({...allocForm,carp:e.target.value})} style={{border:"1px solid #e0e0e0",borderRadius:6,padding:"8px 10px",fontSize:11,fontFamily:"inherit",outline:"none"}}><option value="">Carpenter...</option>{ALL_CARPS.map(c=>(<option key={c.id} value={c.name}>{c.name}</option>))}</select><select value={allocForm.site} onChange={e=>setAllocForm({...allocForm,site:e.target.value})} style={{border:"1px solid #e0e0e0",borderRadius:6,padding:"8px 10px",fontSize:11,fontFamily:"inherit",outline:"none"}}><option value="">Site...</option>{["Holbrook Park","Coppice Heights","Thoresby Vale","Boulton Moor","Hilton Valley","Edwalton Fields","Broadnook","Clipstone Park","The Meadows","Old Mill Farm"].map(s=>(<option key={s} value={s}>{s}</option>))}</select><input placeholder="Plot" value={allocForm.plot} onChange={e=>setAllocForm({...allocForm,plot:e.target.value})} style={{border:"1px solid #e0e0e0",borderRadius:6,padding:"8px 10px",fontSize:11,fontFamily:"inherit",outline:"none"}}/><select value={allocForm.stage} onChange={e=>setAllocForm({...allocForm,stage:e.target.value})} style={{border:"1px solid #e0e0e0",borderRadius:6,padding:"8px 10px",fontSize:11,fontFamily:"inherit",outline:"none"}}><option value="">Stage...</option>{["Joists","Roofs","First Fix","Second Fix","Finals"].map(s=>(<option key={s} value={s}>{s}</option>))}</select><input type="date" value={allocForm.date} onChange={e=>setAllocForm({...allocForm,date:e.target.value})} style={{border:"1px solid #e0e0e0",borderRadius:6,padding:"8px 10px",fontSize:11,fontFamily:"inherit",outline:"none"}}/><button onClick={()=>{if(!allocForm.carp||!allocForm.site||!allocForm.plot||!allocForm.stage||!allocForm.date){alert("Fill all fields");return;}const d=new Date(allocForm.date);const dateStr=d.toLocaleDateString("en-GB").slice(0,5);const bl=ALL_PRICE_LISTS.find(b=>b.sites.some(s=>s.site===allocForm.site));const sl=bl?.sites.find(s=>s.site===allocForm.site);const rate=sl?.rates.find(r=>r[0].toLowerCase().includes(allocForm.stage.toLowerCase().split(" ")[0]))?.[1]||"TBC";setSchedAllocs(p=>[{id:Date.now(),carp:allocForm.carp,site:allocForm.site,plot:allocForm.plot,stage:allocForm.stage,date:dateStr,status:"upcoming",rate},...p]);setAllocForm({carp:"",site:"",plot:"",stage:"",date:""});}} style={{...S.bt,background:"#B8860B",color:"#fff",justifyContent:"center",fontSize:11}}>Allocate</button></div></div><h4 style={{fontSize:14,fontWeight:700,marginBottom:10}}>Allocations ({schedAllocs.length})</h4><div style={{background:"#fff",borderRadius:8,overflow:"hidden",border:"1px solid #e8e8e8"}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 60px 80px 70px 70px 60px",background:"#0C1821",padding:"8px 12px",gap:4}}>{["Carpenter","Site","Plot","Stage","Date","Rate","Status"].map(h=>(<div key={h} style={{fontSize:9,fontWeight:700,color:"rgba(255,255,255,.5)",textTransform:"uppercase",letterSpacing:1}}>{h}</div>))}</div>{schedAllocs.map((a,i)=>(<div key={a.id} style={{display:"grid",gridTemplateColumns:"1fr 1fr 60px 80px 70px 70px 60px",padding:"8px 12px",gap:4,background:i%2===0?"#fff":"#fafaf8",borderBottom:"1px solid #f0f0f0"}}><div style={{fontSize:11,fontWeight:600}}>{a.carp}</div><div style={{fontSize:11,color:"#555"}}>{a.site}</div><div style={{fontSize:11}}>P{a.plot}</div><div style={{fontSize:10,color:"#777"}}>{a.stage}</div><div style={{fontSize:11}}>{a.date}</div><div style={{fontSize:11,fontWeight:600,color:"#B8860B"}}>{a.rate}</div><div><span style={{fontSize:9,padding:"2px 6px",borderRadius:100,fontWeight:600,background:a.status==="active"?"#FFF3E0":a.status==="complete"?"#E8F5E9":"#f5f5f5",color:a.status==="active"?"#E65100":a.status==="complete"?"#2E7D32":"#999"}}>{a.status}</span></div></div>))}</div></>)}
{pTab==="site-map"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:4}}>Interactive Site Map \u2014 Holbrook Park</h3><p style={{fontSize:12,color:"#999",marginBottom:12}}>Click any plot to view details and update status.</p><div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>{Object.entries(stageColors).map(([stage,color])=>(<div key={stage} style={{display:"flex",alignItems:"center",gap:4,fontSize:9}}><span style={{width:8,height:8,borderRadius:2,background:color,display:"inline-block"}}/>{stage}</div>))}</div><div style={{display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:5,marginBottom:16}}>{plots.map(p=>(<div key={p.plot} onClick={()=>setSelectedPlot(selectedPlot===p.plot?null:p.plot)} style={{aspectRatio:"1",background:stageColors[p.stage]||"#e0e0e0",borderRadius:6,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",border:selectedPlot===p.plot?"3px solid #B8860B":"3px solid transparent",transition:".15s"}}><div style={{fontSize:11,fontWeight:700,color:"#fff"}}>{p.plot}</div><div style={{fontSize:6,color:"rgba(255,255,255,.8)"}}>{p.stage.replace(" Complete","\u2713").replace("Not Started","\u2014")}</div></div>))}</div>{selectedPlot&&(()=>{const p=plots.find(x=>x.plot===selectedPlot);if(!p)return null;return(<div style={{background:"#fff",borderRadius:8,padding:20,border:"1px solid #e8e8e8"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}><div><h4 style={{fontSize:16,fontWeight:700,margin:"0 0 4px"}}>Plot {p.plot}</h4><div style={{fontSize:12,color:"#777"}}>The {p.houseType} \u2014 {p.carpenter}</div></div><span style={{fontSize:10,padding:"4px 10px",borderRadius:100,fontWeight:600,background:stageColors[p.stage],color:"#fff"}}>{p.stage}</span></div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{["Joists","Roofs","First Fix","Second Fix","Finals","Complete"].map(st=>(<button key={st} onClick={()=>{setPlots(prev=>prev.map(x=>x.plot===p.plot?{...x,stage:st}:x));}} style={{...S.bt,background:p.stage===st?"#B8860B":"#f5f3ef",color:p.stage===st?"#fff":"#555",fontSize:10,padding:"5px 10px"}}>{st}</button>))}</div></div>);})()}</>)}
{pTab==="fixings"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:16}}>Fixings Requests</h3>{matReqs.map(r=>(<div key={r.id} style={{background:"#fff",borderRadius:8,padding:14,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:13,fontWeight:600}}>{r.items}</div><div style={{fontSize:11,color:"#999"}}>{r.who} \u2014 {r.site} \u2014 {r.date} \u2014 {r.payMethod||"deduct"}</div></div><div style={{display:"flex",gap:6}}>{r.status==="pending"?(<><button onClick={()=>setMatReqs(p=>p.map(x=>x.id===r.id?{...x,status:"approved"}:x))} style={{...S.bt,background:"#22c55e",color:"#fff",fontSize:10,padding:"5px 12px"}}>Approve</button><button onClick={()=>setMatReqs(p=>p.map(x=>x.id===r.id?{...x,status:"rejected"}:x))} style={{...S.bt,background:"#ef4444",color:"#fff",fontSize:10,padding:"5px 12px"}}>Reject</button></>):(<span style={{fontSize:10,padding:"3px 10px",borderRadius:100,fontWeight:600,background:r.status==="approved"?"#E8F5E9":"#FFEBEE",color:r.status==="approved"?"#2E7D32":"#C62828"}}>{r.status}</span>)}</div></div>))}</>)}
{pTab==="price-lists"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:16}}>Price Lists \u2014 All Builders</h3>{ALL_PRICE_LISTS.map((b,bi)=>(<div key={bi} style={{marginBottom:12}}><div style={{background:"#fff",borderRadius:8,overflow:"hidden",border:"1px solid #e8e8e8"}}><div onClick={()=>{const el=document.getElementById("apl-"+bi);if(el)el.style.display=el.style.display==="none"?"block":"none";}} style={{padding:"12px 16px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",borderLeft:`4px solid ${b.color}`}}><span style={{fontSize:13,fontWeight:700}}>{b.builder} <span style={{fontSize:11,color:"#999",fontWeight:400}}>({b.sites.length} site{b.sites.length>1?"s":""})</span></span><span style={{color:"#B8860B",fontSize:11}}>{"\u25BC"}</span></div><div id={"apl-"+bi} style={{display:"none"}}>{b.sites.map((s,si)=>(<div key={si} style={{padding:"12px 16px",borderTop:"1px solid #f0f0f0"}}><h5 style={{fontSize:12,fontWeight:700,marginBottom:8,color:b.color}}>{s.site}</h5>{s.rates.map(([task,rate],ri)=>(<div key={ri} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",fontSize:12,borderBottom:"1px solid #f8f7f4"}}><span>{task}</span><span style={{fontWeight:700,color:"#B8860B"}}>{rate}</span></div>))}</div>))}</div></div></div>))}</>)}
{pTab==="documents"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:16}}>All Documents</h3>{Object.entries(DEMO_DOCS_BY_SITE).map(([site,sections])=>(<div key={site} style={{marginBottom:20}}><h4 style={{fontSize:14,fontWeight:700,marginBottom:8,paddingBottom:6,borderBottom:"2px solid #B8860B"}}>{site}</h4>{sections.map(section=>(<div key={section.cat} style={{marginBottom:12}}><h5 style={{fontSize:12,fontWeight:700,color:"#777",marginBottom:6}}>{section.cat}</h5>{section.docs.map((doc,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",background:i%2===0?"#fff":"#fafaf8",borderRadius:4,marginBottom:2}}><span style={{fontSize:12}}>{doc}</span><button onClick={()=>alert('Demo: Would open "'+doc+'"')} style={{...S.bt,background:"#0C1821",color:"#fff",fontSize:9,padding:"4px 10px"}}>View</button></div>))}</div>))}</div>))}</>)}
</div></div>)}
</div>);}
// MAIN SITE
return(<div style={S.root}><nav style={S.nav} className="mw-nav-inner"><div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>go("home")}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRthM15JuQV5GY0MLTZRPG7t2WY5ShbEsMg-g&s" alt="M&W" style={{width:36,height:36,borderRadius:4,objectFit:"contain"}}/><span style={{color:"#fff",fontSize:15,fontWeight:600}}>Miller & <span style={{color:"#B8860B"}}>Watson</span></span></div><div className="mw-desk" style={{display:"flex",gap:12,alignItems:"center",flexWrap:"nowrap"}}>{[["home","Home"],["services","Services"],["builders","Projects"],["upcoming","Upcoming Work"],["past","Past Projects"],["map","Site Map"],["careers","Work With Us"],["contact","Contact"]].map(([id,l])=>(<span key={id} style={S.nl(sec===id)} onClick={()=>go(id)}>{l}</span>))}<button onClick={()=>{setPortal("login");setPin("");}} style={{...S.bt,background:"#B8860B",color:"#fff",fontSize:11,padding:"8px 16px"}}>Contractor Login</button></div><button className="mw-mob-btn" onClick={()=>setMobileMenu(!mobileMenu)} style={{display:"none",alignItems:"center",justifyContent:"center",background:"none",border:"none",color:"#fff",fontSize:24,cursor:"pointer",padding:8}}>{mobileMenu?"✕":"☰"}</button></nav>{mobileMenu&&<div className="mw-mob-menu" style={{position:"fixed",top:64,left:0,right:0,background:"#0C1821",zIndex:99,padding:"12px 20px",borderBottom:"1px solid rgba(255,255,255,.06)",display:"flex",flexDirection:"column",gap:4}}>{[["home","Home"],["services","Services"],["builders","Projects"],["upcoming","Upcoming Work"],["past","Past Projects"],["map","Site Map"],["careers","Work With Us"],["contact","Contact"]].map(([id,l])=>(<span key={id} style={{...S.nl(sec===id),display:"block",padding:"10px 0",fontSize:13}} onClick={()=>{go(id);setMobileMenu(false);}}>{l}</span>))}<button onClick={()=>{setPortal("login");setPin("");setMobileMenu(false);}} style={{...S.bt,background:"#B8860B",color:"#fff",fontSize:11,padding:"10px 16px",marginTop:4,justifyContent:"center"}}>Contractor Login</button></div>}
{sec==="home"&&(<><div style={{marginTop:64,minHeight:"85vh",background:`linear-gradient(135deg,rgba(12,24,33,.75),rgba(12,24,33,.45)),url(${roofImg}) center/cover`,display:"flex",alignItems:"center",padding:"40px clamp(20px,4vw,48px)"}}><div style={{maxWidth:1320}}><div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(184,134,11,.15)",border:"1px solid rgba(184,134,11,.3)",borderRadius:100,padding:"6px 18px",marginBottom:24}}><span style={{width:6,height:6,background:"#B8860B",borderRadius:"50%"}}/><span style={{fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:"#D4A843"}}>Est. 2005 — 21 Years in Construction</span></div><h1 style={{fontSize:"clamp(32px,5vw,60px)",color:"#fff",lineHeight:1.08,maxWidth:740,marginBottom:20,fontWeight:700}}>The Midlands' Leading<br/><span style={{fontStyle:"italic",color:"#D4A843",fontWeight:400}}>Site Carpentry</span> Specialists</h1><p style={{fontSize:"clamp(14px,2vw,16px)",color:"rgba(255,255,255,.6)",maxWidth:520,lineHeight:1.7,marginBottom:16}}>Delivering precision carpentry for new build housing. 100+ carpenters. Trusted by the UK's top housebuilders.</p><p style={{fontSize:"clamp(13px,2vw,15px)",color:"#D4A843",maxWidth:520,lineHeight:1.6,marginBottom:32,fontStyle:"italic",borderLeft:"2px solid rgba(184,134,11,.4)",paddingLeft:16}}>We don't just build homes — we build careers. Join a team that's growing, that values its people, and that's on a mission to become the best carpentry contractor in the country.</p><div style={{display:"flex",gap:12,flexWrap:"wrap"}}><button style={{...S.bt,background:"#B8860B",color:"#fff"}} onClick={()=>go("builders")}>View Our Projects →</button><button style={{...S.bt,background:"transparent",color:"#fff",border:"1px solid rgba(255,255,255,.25)"}} onClick={()=>go("careers")}>Join Our Team</button><button style={{...S.bt,background:"rgba(255,255,255,.08)",color:"#D4A843",border:"1px solid rgba(184,134,11,.3)"}} onClick={()=>{setPortal("login");setPin("");}}>Contractor Portal</button></div><div style={{display:"flex",gap:"clamp(24px,4vw,48px)",marginTop:64,flexWrap:"wrap"}}>{[["21+","Years"],["100+","Carpenters"],["1000s","Homes"],["11","Partners"]].map(([n,l])=>(<div key={l} style={{textAlign:"center"}}><div style={{fontSize:"clamp(22px,3vw,28px)",fontWeight:700,color:"#D4A843"}}>{n}</div><div style={{fontSize:11,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:1.5,marginTop:2}}>{l}</div></div>))}</div></div></div><div style={{background:"#f6f4ef",padding:"60px 40px"}}><div style={{maxWidth:1320,margin:"0 auto"}}><div style={{textAlign:"center",marginBottom:40}}><span style={S.lb}>What We Do</span><h2 style={{...S.h2,fontSize:"clamp(24px,3vw,32px)"}}>Complete Carpentry Packages</h2><p style={{fontSize:14,color:"#777",maxWidth:600,margin:"0 auto",lineHeight:1.7}}>From ground floor joists to final snagging — we deliver every stage of carpentry for new-build housing developments.</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:20}}>{SERVICES.map(s=>(<div key={s.id} onClick={()=>{go("services");setSSv(s);}} style={{...S.cd,padding:24,borderLeft:"3px solid #B8860B",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}><div style={{fontSize:20,color:"#B8860B",marginBottom:8}}>{s.icon}</div><h3 style={{fontSize:14,fontWeight:700,marginBottom:4}}>{s.title}</h3><p style={{fontSize:12,color:"#777",lineHeight:1.5}}>{s.desc}</p></div>))}</div></div></div><div style={{background:"#0C1821",padding:"48px 40px"}}><div style={{maxWidth:1320,margin:"0 auto",textAlign:"center"}}><h2 style={{color:"#D4A843",fontSize:"clamp(20px,3vw,28px)",fontWeight:700,marginBottom:12}}>Ready to work with us?</h2><p style={{color:"rgba(255,255,255,.5)",fontSize:14,marginBottom:24,maxWidth:500,margin:"0 auto 24px"}}>Whether you're a builder looking for a reliable carpentry partner or a carpenter looking for steady work.</p><div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}><button style={{...S.bt,background:"#B8860B",color:"#fff"}} onClick={()=>go("contact")}>Get In Touch →</button><button style={{...S.bt,background:"transparent",color:"#fff",border:"1px solid rgba(255,255,255,.2)"}} onClick={()=>go("careers")}>Join Our Team</button></div></div></div></>)}
{sec==="services"&&!sSv&&(<div style={{marginTop:64}}><div style={{background:"linear-gradient(135deg,#0C1821,#1a2e3d)",padding:"60px clamp(20px,4vw,40px)",textAlign:"center"}}><span style={S.lb}>Our Services</span><h2 style={{...S.h2,color:"#fff",fontSize:"clamp(28px,4vw,36px)"}}>Complete Site Carpentry</h2><p style={{fontSize:14,color:"rgba(255,255,255,.5)",maxWidth:600,margin:"0 auto",lineHeight:1.7}}>Select a trade below to explore our work — what we do, how we do it, and the quality we deliver on every plot.</p></div><div style={{maxWidth:1320,margin:"0 auto",padding:"40px clamp(20px,4vw,40px)"}}><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24}}>{SERVICES.map(s=>{const galleryCount={joists:GALLERY_PHOTOS["joists"].length,roofs:GALLERY_PHOTOS["roofs"].length,"first-fix":GALLERY_PHOTOS["first-fix"].length,"second-fix":10,finals:4,extras:4};return(<div key={s.id} onClick={()=>setSSv(s)} style={{background:"#fff",borderRadius:10,overflow:"hidden",boxShadow:"0 4px 20px rgba(0,0,0,.06)",cursor:"pointer",transition:".3s",border:"1px solid #eee"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 12px 32px rgba(0,0,0,.12)";}} onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,.06)";}}><div style={{height:180,background:"linear-gradient(135deg,#0C182108,#B8860B08)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,padding:12,width:"100%",height:"100%"}}>{Array.from({length:3}).map((_,i)=>{const photos=GALLERY_PHOTOS[s.id];return photos&&photos[i]?(<div key={i} style={{borderRadius:4,overflow:"hidden"}}><img src={photos[i].src} alt="" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/></div>):(<div key={i} style={{background:"#f0ede6",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:10,color:"#bbb",textTransform:"uppercase",letterSpacing:1}}>Photo {i+1}</span></div>);})}</div><div style={{position:"absolute",top:12,right:12,background:"#B8860B",color:"#fff",padding:"4px 10px",borderRadius:100,fontSize:10,fontWeight:700}}>{galleryCount[s.id]||6} Photos</div></div><div style={{padding:"20px 24px 24px"}}><div style={{fontSize:28,marginBottom:8}}>{s.icon}</div><h3 style={{fontSize:17,fontWeight:700,marginBottom:6}}>{s.title}</h3><p style={{fontSize:12,color:"#777",lineHeight:1.6,marginBottom:12}}>{s.desc}</p><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",flexWrap:"wrap",gap:4}}>{s.subs.slice(0,2).map((sub,i)=>(<span key={i} style={{fontSize:10,padding:"2px 8px",borderRadius:100,background:"#f5f3ef",color:"#666"}}>{sub.n}</span>))}</div><span style={{fontSize:12,color:"#B8860B",fontWeight:700}}>View Gallery →</span></div></div></div>);})}</div></div></div>)}
{sec==="services"&&sSv&&(<div style={{marginTop:64}}><div style={{background:"linear-gradient(135deg,#0C1821,#1a2e3d)",padding:"40px clamp(20px,4vw,40px)"}}><div style={{maxWidth:1320,margin:"0 auto"}}><button onClick={()=>setSSv(null)} style={{...S.bt,background:"rgba(255,255,255,.08)",color:"#fff",marginBottom:20,fontSize:12,border:"1px solid rgba(255,255,255,.1)"}}>← Back to Services</button><div style={{display:"flex",alignItems:"center",gap:16}}><span style={{fontSize:36}}>{sSv.icon}</span><div><h2 style={{...S.h2,color:"#fff",margin:0}}>{sSv.title}</h2><p style={{fontSize:14,color:"rgba(255,255,255,.5)",margin:"4px 0 0"}}>{sSv.desc}</p></div></div></div></div><div style={{maxWidth:1320,margin:"0 auto",padding:"32px clamp(20px,4vw,40px)"}}><div style={{background:"#fff",borderRadius:10,padding:28,marginBottom:32,border:"1px solid #eee"}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><span style={{fontSize:18}}>📸</span><h3 style={{fontSize:16,fontWeight:700,margin:0}}>Project Gallery</h3></div><p style={{fontSize:13,color:"#777",marginBottom:20,lineHeight:1.6}}>{sSv.id==="joists"?"See how we install engineered and traditional floor joist systems to NHBC standards. Every joist is precision-cut and fitted to architect specifications.":sSv.id==="roofs"?"From trussed rafter installations to complex cut roofs with hips, valleys and dormers — our roof carpentry speaks for itself.":sSv.id==="first-fix"?"All the structural carpentry that happens before plastering — stud partitions, door linings, staircases, and timber frame erection.":sSv.id==="second-fix"?"The finishing touches that homebuyers see — doors hung perfectly, skirting tight to the wall, staircases built to impress.":sSv.id==="finals"?"The final checks, adjustments and fixes that get a plot from 'nearly done' to handover-ready. Zero-defect is the goal.":"When other contractors' carpentry needs putting right, M&W step in. We provide remedial and snagging services to builders who need quality issues resolved quickly and professionally."}</p><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:12}}>{(GALLERY_PHOTOS[sSv.id]&&GALLERY_PHOTOS[sSv.id].length>0)?GALLERY_PHOTOS[sSv.id].map((photo,i)=>(<div key={i} style={{aspectRatio:"4/3",borderRadius:8,overflow:"hidden",position:"relative",cursor:"pointer",border:"1px solid #eee"}}><img src={photo.src} alt={photo.caption} style={{width:"100%",height:"100%",objectFit:"cover",display:"block",transition:".3s"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}/><div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,rgba(0,0,0,.7))",padding:"20px 10px 8px",color:"#fff",fontSize:10,fontWeight:500}}>{photo.caption}</div></div>)):Array.from({length:sSv.id==="joists"?6:sSv.id==="roofs"?8:sSv.id==="first-fix"?8:sSv.id==="second-fix"?10:sSv.id==="finals"?4:4}).map((_,i)=>(<div key={i} style={{aspectRatio:"4/3",background:"linear-gradient(135deg,#f5f3ef,#ece8e0)",borderRadius:8,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",border:"2px dashed #ddd",cursor:"pointer",transition:".2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor="#B8860B"} onMouseLeave={e=>e.currentTarget.style.borderColor="#ddd"}><span style={{fontSize:24,marginBottom:4}}>📷</span><span style={{fontSize:10,color:"#999",textTransform:"uppercase",letterSpacing:1}}>Photo {i+1}</span><span style={{fontSize:9,color:"#bbb",marginTop:2}}>{sSv.title}</span></div>))}</div><div style={{marginTop:16,padding:"12px 16px",background:"#f8f7f4",borderRadius:6,borderLeft:"3px solid #B8860B"}}><p style={{fontSize:11,color:"#777",margin:0,fontStyle:"italic"}}>{(GALLERY_PHOTOS[sSv.id]&&GALLERY_PHOTOS[sSv.id].length>0)?"📸 Real project photos from our active sites. More photos are added regularly as our teams capture their work.":"📌 Photos coming soon — our site teams are capturing their best work across all active sites. These galleries will showcase the quality M&W deliver on every plot."}</p></div></div>{sSv.subs.map((sc,i)=>(<div key={i} style={{marginBottom:24}}><h3 style={{fontSize:15,fontWeight:700,marginBottom:12,paddingBottom:8,borderBottom:"1px solid #eee"}}>{sc.n}</h3><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:10}}>{sc.items.map((item,j)=>(<div key={j} style={{background:"#fff",borderRadius:6,padding:14,border:"1px solid #f0f0f0",display:"flex",gap:10,alignItems:"center"}}><div style={{width:8,height:8,minWidth:8,borderRadius:"50%",background:"#B8860B"}}/><span style={{fontSize:13}}>{item}</span></div>))}</div></div>))}<div style={{background:"#0C1821",borderRadius:10,padding:28,textAlign:"center"}}><h3 style={{color:"#D4A843",fontSize:16,fontWeight:700,marginBottom:8}}>Want to see this quality on your site?</h3><p style={{color:"rgba(255,255,255,.5)",fontSize:13,marginBottom:16}}>Get in touch to discuss how M&W can deliver {sSv.title.toLowerCase()} for your next development.</p><button onClick={()=>go("contact")} style={{...S.bt,background:"#B8860B",color:"#fff"}}>Get In Touch →</button></div></div></div>)}
{sec==="builders"&&!sB&&(<div style={{marginTop:64}}><div style={S.sc}><span style={S.lb}>Our Builder Partners</span><h2 style={S.h2}>Working With the Best</h2><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:20,marginTop:40}}>{BUILDERS.map(b=>(<div key={b.id} onClick={()=>setSB(b)} style={{...S.cd,padding:24,textAlign:"center",borderTop:`3px solid ${b.color}`}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>{b.logo&&<div style={{height:45,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10}}><img src={b.logo} alt={b.name} style={{maxHeight:45,maxWidth:"100%",objectFit:"contain"}} onError={e=>e.target.style.display="none"}/></div>}<h3 style={{fontSize:13,fontWeight:700}}>{b.name}</h3><p style={{fontSize:11,color:"#999",marginTop:3}}>{b.sites.length} site{b.sites.length>1?"s":""}</p></div>))}</div><div style={{marginTop:56}}><span style={{...S.lb,color:"#D4A843"}}>NHBC Recognition</span><h2 style={{...S.h2,fontSize:24}}>Award Winning Sites</h2><p style={{...S.sub,marginBottom:24}}>We're proud that our carpentry has contributed to NHBC award-winning developments. Quality recognised at the highest level.</p><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:20}}>{[{builder:"Wheeldon Homes",color:"#2E4057",logo:"https://www.panddg.co.uk/wp-content/uploads/2022/02/logo-wheeldon-homes.svg",site:"Oaklands, Etwall",award:"NHBC Pride in the Job — Quality Award 2024",desc:"Recognised for outstanding build quality and attention to detail across this boutique development in South Derbyshire."},{builder:"Barratt Homes",color:"#E31937",logo:"https://www.barratthomes.co.uk/favicon.ico",site:"Thoresby Vale, Mansfield",award:"NHBC Pride in the Job — Seal of Excellence 2023",desc:"Our carpentry work contributed to Thoresby Vale receiving one of the industry's most prestigious quality awards."}].map((a,i)=>(<div key={i} style={{background:"#fff",borderRadius:8,overflow:"hidden",boxShadow:"0 2px 16px rgba(0,0,0,.06)",border:"1px solid #e8e8e8",position:"relative"}}><div style={{background:`linear-gradient(135deg,${a.color},${a.color}cc)`,padding:"20px 24px",color:"#fff"}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}><div style={{height:34,background:"#fff",borderRadius:6,padding:"4px 10px",display:"flex",alignItems:"center"}}><img src={a.logo} alt={a.builder} style={{maxHeight:26,maxWidth:100,objectFit:"contain"}} onError={e=>{e.target.style.display="none";}}/></div><span style={{fontSize:20}}>🏆</span></div><h3 style={{fontSize:15,fontWeight:700,margin:"0 0 2px"}}>{a.site}</h3><p style={{fontSize:12,opacity:.8,margin:0}}>{a.builder}</p></div><div style={{padding:20}}><div style={{background:"#FFF8E1",borderRadius:6,padding:"10px 14px",marginBottom:12,display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:16}}>🏅</span><span style={{fontSize:12,fontWeight:700,color:"#B8860B"}}>{a.award}</span></div><p style={{fontSize:12,color:"#555",lineHeight:1.7,margin:0}}>{a.desc}</p></div></div>))}</div></div></div></div>)}
{sec==="builders"&&sB&&!sS&&(<div style={{marginTop:64}}><div style={S.sc}><button onClick={()=>setSB(null)} style={{...S.bt,background:"#f0f0f0",color:"#333",marginBottom:24,fontSize:12}}>← Back</button><h2 style={S.h2}>{sB.name}</h2>{sB.relationship&&<div style={{background:"#f8f7f4",borderRadius:6,padding:16,marginTop:8,marginBottom:24,borderLeft:`3px solid ${sB.color}`}}><p style={{fontSize:13,color:"#555",lineHeight:1.7,margin:0,fontStyle:"italic"}}>{sB.relationship}</p></div>}<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20}}>{sB.sites.map((s,i)=>(<div key={i} onClick={()=>setSS(s)} style={{...S.cd,borderLeft:`3px solid ${sB.color}`}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}><div style={{padding:20}}><h3 style={{fontSize:15,fontWeight:700,marginBottom:4}}>{s.name}</h3><p style={{fontSize:12,color:"#777",marginBottom:10}}>{s.location}</p><div style={{display:"flex",flexWrap:"wrap",gap:5}}>{s.housetypes.slice(0,3).map(h=>(<span key={h} style={{fontSize:10,padding:"2px 8px",borderRadius:100,background:"#f5f3ef",color:"#666"}}>{h}</span>))}{s.housetypes.length>3&&<span style={{fontSize:10,padding:"2px 8px",borderRadius:100,background:"#f5f3ef",color:"#999"}}>+{s.housetypes.length-3}</span>}</div></div></div>))}</div></div></div>)}
{sec==="builders"&&sB&&sS&&(<div style={{marginTop:64}}><div style={S.sc}><button onClick={()=>setSS(null)} style={{...S.bt,background:"#f0f0f0",color:"#333",marginBottom:24,fontSize:12}}>← Back</button><span style={{...S.lb,color:sB.color}}>{sB.name}</span><h2 style={S.h2}>{sS.name}</h2><p style={S.sub}>{sS.location}</p><div style={{marginTop:24,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20}}><div style={{background:"#fff",borderRadius:8,padding:24,border:"1px solid #e8e8e8"}}><h4 style={{fontSize:14,fontWeight:700,marginBottom:12}}>Site Details</h4><div style={{display:"flex",flexDirection:"column",gap:10}}><div style={{display:"flex",gap:10,alignItems:"flex-start"}}><span style={{fontSize:14}}>📍</span><div><div style={{fontSize:12,fontWeight:600}}>Location</div><div style={{fontSize:13,color:"#555"}}>{sS.location}</div></div></div><div style={{display:"flex",gap:10,alignItems:"flex-start"}}><span style={{width:20,height:20,minWidth:20,borderRadius:4,background:sB.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,color:"#fff",marginTop:1}}>B</span><div><div style={{fontSize:12,fontWeight:600}}>Builder</div><div style={{fontSize:13,color:"#555"}}>{sB.name}</div></div></div><div style={{display:"flex",gap:10,alignItems:"flex-start"}}><span style={{width:20,height:20,minWidth:20,borderRadius:4,background:"#f5f3ef",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,color:"#B8860B",marginTop:1}}>H</span><div><div style={{fontSize:12,fontWeight:600}}>House Types</div><div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:4}}>{sS.housetypes.map(h=>(<span key={h} style={{fontSize:10,padding:"3px 10px",borderRadius:100,background:"#f5f3ef",color:"#555"}}>{h}</span>))}</div></div></div></div></div><div style={{background:"#fff",borderRadius:8,padding:24,border:"1px solid #e8e8e8"}}><h4 style={{fontSize:14,fontWeight:700,marginBottom:12}}>Get Directions</h4><p style={{fontSize:12,color:"#777",marginBottom:16}}>Navigate to {sS.name} using your preferred maps app.</p><div style={{display:"flex",flexDirection:"column",gap:10}}><a href={`https://www.google.com/maps/dir/?api=1&destination=${sS.lat},${sS.lng}`} target="_blank" rel="noopener noreferrer" style={{...S.bt,background:"#4285F4",color:"#fff",textDecoration:"none",justifyContent:"center",fontSize:13}}>Google Maps →</a><a href={`https://maps.apple.com/?daddr=${sS.lat},${sS.lng}`} target="_blank" rel="noopener noreferrer" style={{...S.bt,background:"#333",color:"#fff",textDecoration:"none",justifyContent:"center",fontSize:13}}>Apple Maps →</a><a href={`https://waze.com/ul?ll=${sS.lat},${sS.lng}&navigate=yes`} target="_blank" rel="noopener noreferrer" style={{...S.bt,background:"#05C8F7",color:"#fff",textDecoration:"none",justifyContent:"center",fontSize:13}}>Waze →</a></div></div></div>{sB.relationship&&<div style={{background:"#f8f7f4",borderRadius:6,padding:16,marginTop:24,borderLeft:`3px solid ${sB.color}`}}><p style={{fontSize:13,color:"#555",lineHeight:1.7,margin:0,fontStyle:"italic"}}>{sB.relationship}</p></div>}</div></div>)}
{sec==="map"&&(<div style={{marginTop:64}}><div style={S.sc}><span style={S.lb}>Coverage</span><h2 style={S.h2}>Interactive Site Map</h2><p style={{...S.sub,marginBottom:12}}>Click any pin for details and directions.</p><div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16}}>{BUILDERS.map(b=>(<div key={b.id} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,fontWeight:600,color:"#555"}}><span style={{width:9,height:9,borderRadius:"50%",background:b.color,display:"inline-block"}}/>{b.name}</div>))}</div><div ref={mapEl} style={{height:500,borderRadius:12,overflow:"hidden",border:"1px solid #e0e0e0"}}/><div style={{marginTop:20}}>{BUILDERS.map(b=>(<div key={b.id} style={{marginBottom:14}}><h4 style={{fontSize:12,fontWeight:700,display:"flex",alignItems:"center",gap:6,marginBottom:6}}><span style={{width:9,height:9,borderRadius:"50%",background:b.color,display:"inline-block"}}/>{b.name}</h4><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{b.sites.map((s,i)=>(<span key={i} style={{fontSize:11,padding:"5px 12px",borderRadius:100,background:"#f5f3ef",color:"#555",cursor:"pointer"}} onClick={()=>{go("builders");setSB(b);setSS(s);}}>{s.name}</span>))}</div></div>))}</div></div></div>)}
{sec==="upcoming"&&(<div style={{marginTop:64}}><div style={S.sc}><span style={S.lb}>Growth & New Business</span><h2 style={S.h2}>Upcoming Work</h2><p style={S.sub}>We're proud to be continually winning new business. These are sites where work is about to begin or has just started — a sign of our growing reputation across the Midlands.</p><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:24,marginTop:40}}>{[{builder:"Lovell Homes",color:"#1B3D6F",logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_en-0IYbjSLWr1dCt62dPp1evg0udhiAZXg&s",sites:[{name:"Lovell at Willington",location:"Willington, South Derbyshire",units:145,scope:"Full carpentry package",status:"Starting Q2 2026",housetypes:["The Holden","The Kingsley","The Layton","The Windermere"]},{name:"Lovell at Castle Donington",location:"Castle Donington, Leicestershire",units:210,scope:"Full carpentry package",status:"Starting Q3 2026",housetypes:["The Holden","The Exeter","The Bradgate","The Kingsley"]}]},{builder:"Bellway Homes",color:"#003DA5",logo:"https://s3-eu-west-1.amazonaws.com/tpd/logos/58932caa0000ff00059bf27f/0x0.png",sites:[{name:"Bellway at Mickleover",location:"Mickleover, Derby",units:180,scope:"Full carpentry package",status:"Starting Q2 2026",housetypes:["Craftsman","Joiner","Turner","Tanner","Weaver"]}]}].map(b=>b.sites.map((s,si)=>(<div key={b.builder+si} style={{background:"#fff",borderRadius:8,overflow:"hidden",boxShadow:"0 2px 16px rgba(0,0,0,.06)",borderTop:`4px solid ${b.color}`}}><div style={{padding:24}}><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}><div style={{height:35,display:"flex",alignItems:"center"}}><img src={b.logo} alt={b.builder} style={{maxHeight:35,maxWidth:100,objectFit:"contain"}} onError={e=>{e.target.style.display="none";}}/></div><div><h3 style={{fontSize:15,fontWeight:700,margin:0}}>{s.name}</h3><p style={{fontSize:12,color:"#777",margin:0}}>{b.builder}</p></div></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>{[["Location",s.location],["Units",s.units+""],["Scope",s.scope],["Status",s.status]].map(([label,val])=>(<div key={label}><div style={{fontSize:10,fontWeight:700,color:"#999",textTransform:"uppercase",letterSpacing:1}}>{label}</div><div style={{fontSize:13,fontWeight:600,marginTop:2}}>{val}</div></div>))}</div><div><div style={{fontSize:10,fontWeight:700,color:"#999",textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>House Types</div><div style={{display:"flex",flexWrap:"wrap",gap:5}}>{s.housetypes.map(h=>(<span key={h} style={{fontSize:10,padding:"3px 10px",borderRadius:100,background:"#f5f3ef",color:"#555"}}>{h}</span>))}</div></div></div><div style={{padding:"12px 24px",background:`${b.color}10`,borderTop:`1px solid ${b.color}20`,display:"flex",alignItems:"center",gap:6}}><span style={{width:8,height:8,borderRadius:"50%",background:"#22c55e",display:"inline-block"}}/><span style={{fontSize:11,fontWeight:600,color:b.color}}>{s.status}</span></div></div>))).flat()}</div><div style={{marginTop:48,background:"#f8f7f4",borderRadius:8,padding:32,borderLeft:"3px solid #B8860B"}}><h3 style={{fontSize:16,fontWeight:700,marginBottom:8}}>Winning New Business</h3><p style={{fontSize:13,color:"#555",lineHeight:1.7,margin:0}}>Every new site represents trust earned through years of delivering quality carpentry. Our reputation for reliability, craftsmanship, and professional management means the UK's top housebuilders keep coming back to M&W. With 535+ new plots across these upcoming sites alone, the future is looking strong.</p></div></div></div>)}
{sec==="past"&&(<div style={{marginTop:64}}><div style={S.sc}><span style={S.lb}>Track Record</span><h2 style={S.h2}>21 Years of Delivered Projects</h2><p style={S.sub}>Every site below represents homes we're proud to have helped build.</p><div style={{display:"flex",gap:16,marginTop:32,marginBottom:24,flexWrap:"wrap"}}>{[[""+PAST_PROJECTS.length,"Projects"],[PAST_PROJECTS.reduce((a,p)=>a+p.units,0).toLocaleString(),"Homes"],[""+new Set(PAST_PROJECTS.map(p=>p.builder)).size,"Builders"],["2005-26","Years"]].map(([v,l])=>(<div key={l} style={{background:"#f8f7f4",borderRadius:6,padding:"14px 20px",flex:1,minWidth:130,textAlign:"center"}}><div style={{fontSize:24,fontWeight:700,color:"#B8860B"}}>{v}</div><div style={{fontSize:10,color:"#999",textTransform:"uppercase",letterSpacing:1.5,marginTop:2}}>{l}</div></div>))}</div><div style={{borderRadius:8,overflow:"hidden",border:"1px solid #e8e8e8"}}><div style={{display:"grid",gridTemplateColumns:"90px 90px 1fr 1fr 60px 1fr",background:"#0C1821",padding:"10px 12px",gap:8}}>{["Year","Builder","Site","Location","Units","Scope"].map(h=>(<div key={h} style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.5)",textTransform:"uppercase",letterSpacing:1}}>{h}</div>))}</div>{PAST_PROJECTS.map((p,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"90px 90px 1fr 1fr 60px 1fr",padding:"10px 12px",gap:8,background:i%2===0?"#fff":"#fafaf8",borderBottom:"1px solid #f0f0f0"}}><div style={{fontSize:12,fontWeight:600,color:"#B8860B"}}>{p.year}</div><div style={{fontSize:12,fontWeight:600}}>{p.builder}</div><div style={{fontSize:12}}>{p.site}</div><div style={{fontSize:12,color:"#777"}}>{p.location}</div><div style={{fontSize:12,fontWeight:600,textAlign:"center"}}>{p.units}</div><div style={{fontSize:11,color:"#777"}}>{p.scope}</div></div>))}</div></div></div>)}
{sec==="careers"&&(<div style={{marginTop:64}}><div style={{background:"#0C1821",color:"#fff",padding:"80px 40px"}}><div style={{maxWidth:1320,margin:"0 auto"}}><span style={S.lb}>Work With Us</span><h2 style={{...S.h2,color:"#fff"}}>Join the M&W Team</h2><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,marginTop:40}}><div style={{display:"flex",flexDirection:"column",gap:14}}>{[["Excellent Pricework Rates","Paid weekly by BACS."],["Continuity of Work","Sites across the Midlands year-round."],["NHBC Training","Standards training on site."],["Professional Management","Full supervision and H&S."],["Midlands Coverage","Derby, Nottingham, Staffs, Leicester."]].map(([t,d],i)=>(<div key={i} style={{display:"flex",gap:14,padding:14,background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)",borderRadius:6}}><div style={{width:36,height:36,minWidth:36,borderRadius:"50%",background:"rgba(184,134,11,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:"#B8860B",fontWeight:700}}>{i+1}</div><div><h4 style={{fontSize:13,fontWeight:700,margin:"0 0 2px"}}>{t}</h4><p style={{fontSize:11,color:"rgba(255,255,255,.4)",margin:0}}>{d}</p></div></div>))}</div><div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)",borderRadius:8,padding:28}}>{!formDone?(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:4}}>Express Your Interest</h3><p style={{fontSize:12,color:"rgba(255,255,255,.4)",marginBottom:20}}>We'll be in touch within 24 hours.</p><form onSubmit={e=>{e.preventDefault();setFormDone(true);}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>{[["First Name","text"],["Surname","text"],["Phone","tel"],["Email","email"]].map(([p,t])=>(<input key={p} type={t} placeholder={p} required={p!=="Email"} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:5,padding:"10px 12px",color:"#fff",fontSize:13,fontFamily:"inherit",outline:"none"}}/>))}</div><input placeholder="CSCS Card Number" style={{width:"100%",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:5,padding:"10px 12px",color:"#fff",fontSize:13,fontFamily:"inherit",outline:"none",marginBottom:10}}/><textarea placeholder="Tell us about yourself..." rows={3} style={{width:"100%",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:5,padding:"10px 12px",color:"#fff",fontSize:13,fontFamily:"inherit",marginBottom:10,outline:"none",resize:"vertical"}}/><button type="submit" style={{...S.bt,background:"#B8860B",color:"#fff",width:"100%",justifyContent:"center"}}>Submit →</button></form></>):(<div style={{textAlign:"center",padding:40}}><div style={{fontSize:48,marginBottom:16}}>✓</div><h3 style={{fontSize:18,fontWeight:700}}>Application Received</h3></div>)}</div></div></div></div></div>)}
{sec==="contact"&&(<div style={{marginTop:64}}><div style={S.sc}><span style={S.lb}>Contact</span><h2 style={S.h2}>Get in Touch</h2><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,marginTop:32}}><div>{[["Office","Suite 4, The Hayloft, Blakenhall Park,\nBarton Under Needwood, DE13 8AJ"],["Phone","01283 716 173"],["Company","No. 05425616 | VAT Registered | CIS Contractor"],["Hours","Mon–Fri: 7am–5pm"]].map(([t,d],i)=>(<div key={i} style={{display:"flex",gap:14,marginBottom:20}}><div style={{width:36,height:36,minWidth:36,borderRadius:"50%",background:"#f5f3ef",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#B8860B"}}>{t.charAt(0)}</div><div><h4 style={{fontSize:12,fontWeight:700,margin:"0 0 2px"}}>{t}</h4><p style={{fontSize:12,color:"#777",margin:0,whiteSpace:"pre-line"}}>{d}</p></div></div>))}</div><div style={{borderRadius:8,overflow:"hidden",border:"1px solid #e0e0e0",minHeight:300}}><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4831!2d-1.7187!3d52.7605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879f8a3a3b7c0a1%3A0x1!2sBarton+under+Needwood!5e0!3m2!1sen!2suk!4v1" style={{width:"100%",height:"100%",minHeight:300,border:"none"}} loading="lazy"/></div></div></div></div>)}
<footer style={{background:"#0C1821",borderTop:"1px solid rgba(255,255,255,.06)",padding:"40px 40px 24px",color:"rgba(255,255,255,.5)"}}><div style={{maxWidth:1320,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:32}}><div><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRthM15JuQV5GY0MLTZRPG7t2WY5ShbEsMg-g&s" alt="M&W" style={{width:30,height:30,borderRadius:4,objectFit:"contain"}}/><span style={{color:"#fff",fontSize:14,fontWeight:600}}>Miller & Watson</span></div><p style={{fontSize:12,lineHeight:1.7}}>Professional site carpentry contractors serving the Midlands' top housebuilders since 2005.</p></div><div><h4 style={{color:"#B8860B",fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:12}}>Quick Links</h4>{[["services","Services"],["builders","Projects"],["careers","Work With Us"],["contact","Contact"]].map(([id,l])=>(<div key={id} style={{marginBottom:6}}><span onClick={()=>go(id)} style={{fontSize:12,color:"rgba(255,255,255,.5)",cursor:"pointer"}}>{l}</span></div>))}</div><div><h4 style={{color:"#B8860B",fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:12}}>Contact</h4><p style={{fontSize:12,lineHeight:2,margin:0}}>Suite 4, The Hayloft, Blakenhall Park<br/>Barton Under Needwood, DE13 8AJ<br/>01283 716 173<br/>info@millerandwatsonltd.com</p></div></div><div style={{maxWidth:1320,margin:"24px auto 0",paddingTop:20,borderTop:"1px solid rgba(255,255,255,.06)",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}><p style={{fontSize:11,margin:0}}>© {new Date().getFullYear()} Miller & Watson Carpentry Ltd. All rights reserved.</p><p style={{fontSize:11,margin:0}}>Company No. 05425616 | VAT Registered | CIS Contractor</p></div></footer>
<button onClick={()=>setChatOn(!chatOn)} style={{position:"fixed",bottom:24,right:24,zIndex:200,width:56,height:56,borderRadius:"50%",background:"#B8860B",border:"none",cursor:"pointer",boxShadow:"0 4px 20px rgba(184,134,11,.35)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:22}}>{chatOn?"✕":"↗"}</button>
{chatOn&&(<div style={{position:"fixed",bottom:92,right:24,zIndex:199,width:340,maxHeight:460,background:"#fff",borderRadius:12,boxShadow:"0 12px 48px rgba(0,0,0,.15)",display:"flex",flexDirection:"column",overflow:"hidden"}}><div style={{background:"#0C1821",padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}><div style={{width:30,height:30,borderRadius:"50%",overflow:"hidden",flexShrink:0}}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRthM15JuQV5GY0MLTZRPG7t2WY5ShbEsMg-g&s" alt="M&W" style={{width:"100%",height:"100%",objectFit:"contain"}}/></div><div style={{color:"#fff",fontSize:13,fontWeight:700}}>M&W Assistant</div></div><div style={{flex:1,overflowY:"auto",padding:14,display:"flex",flexDirection:"column",gap:6,minHeight:260,maxHeight:300}}>{msgs.map((m,i)=>(<div key={i} style={{maxWidth:"85%",padding:"8px 12px",borderRadius:10,fontSize:12,lineHeight:1.5,alignSelf:m.f==="u"?"flex-end":"flex-start",background:m.f==="u"?"#B8860B":"#f0f0f0",color:m.f==="u"?"#fff":"#333"}}>{m.t}</div>))}<div ref={chatEnd}/></div><div style={{padding:"8px 14px",borderTop:"1px solid #eee",display:"flex",gap:6}}><input value={chatIn} onChange={e=>setChatIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send(chatIn)} placeholder="Type a message..." style={{flex:1,border:"1px solid #e0e0e0",borderRadius:100,padding:"8px 14px",fontSize:12,fontFamily:"inherit",outline:"none"}}/><button onClick={()=>send(chatIn)} style={{width:32,height:32,borderRadius:"50%",background:"#B8860B",border:"none",cursor:"pointer",color:"#fff",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"}}>→</button></div></div>)}
</div>);}
