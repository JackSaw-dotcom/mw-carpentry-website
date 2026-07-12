import React, { useState, useEffect, useRef } from "react";
import { supabase, loginWithPin, fetchWorkLog, addWorkLogEntry, updateWorkLogEntry, fetchAllocations, addAllocation, updateAllocation, fetchInvoices, addInvoice, updateInvoice, deleteInvoice, fetchDelays, addDelay, fetchNotifications, addNotification, fetchNotificationResponses, upsertNotificationResponse, fetchFixingRequests, addFixingRequest as addFixingReq, fetchSiteFiles, addSiteFile, addSiteFilePhoto, fetchPriceLists, fetchUsers, uploadPhoto, subscribeToAll } from './supabase';
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
const NAVY = '#1B3D2F';
const GOLD = '#C4A265';
const CREAM = '#f6f4ef';
const GALLERY_PHOTOS={joists:[{src:j1,caption:"I-beam joists with joist hangers — first floor"},{src:j2,caption:"Stairwell opening marked out on structural decking"},{src:j3,caption:"Structural decking complete — first floor"},{src:j4,caption:"I-beam floor joists with strutting"},{src:j5,caption:"Floor joists with trimming around stairwell"},{src:j6,caption:"Completed structural floor with Peel Clean Xtra"},{src:j7,caption:"I-beam joists — first floor installation"},{src:j8,caption:"Completed decked floor from scaffold"},{src:j9,caption:"Floor joists with herringbone strutting"},{src:j10,caption:"Structural decking with loft hatch opening"},{src:j11,caption:"Decked floor — wide angle view across site"},{src:j12,caption:"First floor joists with trimmer detail"},{src:j13,caption:"Structural decking complete — side elevation"},{src:j14,caption:"Decked floor with stairwell marked — site view"},{src:j15,caption:"Completed structural floor — elevated view"},{src:j16,caption:"Joists and decking — finished first floor"}],roofs:[{src:rf1,caption:"Trussed rafter installation — gable end"},{src:rf2,caption:"Roof trusses from scaffold level"},{src:rf3,caption:"Trussed rafters with bracing"},{src:rf4,caption:"Front door canopy — porch carpentry"},{src:rf5,caption:"Cut roof structure — hipped roof from above"}],"first-fix":[{src:ff1,caption:"Stud partitions & door linings — first floor"},{src:ff2,caption:"Staircase installation with safety barrier"},{src:ff3,caption:"Stud framing around staircase opening"},{src:ff4,caption:"Winder staircase installation"},{src:ff5,caption:"Dormer room stud partitions"},{src:ff6,caption:"Loft room framing with Velux window"},{src:ff7,caption:"Ground floor stud partitions & door linings"},{src:ff8,caption:"Under-stair framing detail"}],"second-fix":[],finals:[],extras:[]};
const BUILDERS=[{id:"barratt",name:"Barratt Homes",color:"#E31937",logo:"https://www.barratthomes.co.uk/favicon.ico",relationship:"Our partnership with Barratt Homes stretches back over a decade. They trust Ridgeway to deliver consistently across multiple sites.",sites:[{name:"Thoresby Vale",location:"Edwinstowe, Mansfield",lat:53.177,lng:-1.069,housetypes:["Windermere","Holden","Moresby","Kennett","Radleigh"]},{name:"Romans' Quarter",location:"Bingham, Nottingham",lat:52.949,lng:-1.0,housetypes:["Hollinwood","Bradgate","Moresby","Alderney"]},{name:"Dunstall Park",location:"Tamworth, Staffordshire",lat:52.634,lng:-1.693,housetypes:["Windermere","Archford","Holden","Kennett"]},{name:"Poppy Fields",location:"Uttoxeter, Staffordshire",lat:52.898,lng:-1.86,housetypes:["Maidstone","Ellerton","Denford"]},{name:"Bertelin Fields",location:"Beaconside, Stafford",lat:52.826,lng:-2.117,housetypes:["Windermere","Archford","Kennett","Moresby"]}]},{id:"dwh",name:"Lovell Homes",color:"#1B3D6F",logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_en-0IYbjSLWr1dCt62dPp1evg0udhiAZXg&s",relationship:"Our carpenters understand the higher specification that Lovell developments demand.",sites:[{name:"Old Mill Farm",location:"Cotgrave, Nottingham",lat:52.917,lng:-1.046,housetypes:["Holden","Kingsley","Layton","Windermere"]},{name:"Berry Hill",location:"Mansfield",lat:53.148,lng:-1.188,housetypes:["Hollinwood","Bradgate","Exeter"]},{name:"Gateford Park",location:"Worksop, Nottinghamshire",lat:53.321,lng:-1.132,housetypes:["Radleigh","Holden","Moresby"]}]},{id:"bellway",name:"Bellway Homes",color:"#003DA5",logo:"https://s3-eu-west-1.amazonaws.com/tpd/logos/58932caa0000ff00059bf27f/0x0.png",relationship:"Bellway is one of our longest-standing partners across their East Midlands division.",sites:[{name:"The Meadows",location:"Alvaston, Derby",lat:52.893,lng:-1.434,housetypes:["Joiner","Craftsman","Turner","Tanner","Weaver"]},{name:"Holbrook Park",location:"Chellaston, Derby",lat:52.873,lng:-1.437,housetypes:["Craftsman","Joiner","Turner","Weaver","Cooper"]},{name:"Coppice Heights",location:"Ripley, Derbyshire",lat:53.051,lng:-1.405,housetypes:["Joiner","Turner","Tanner","Fletcher"]},{name:"Springwood",location:"Midway, S. Derbyshire",lat:52.773,lng:-1.542,housetypes:["Joiner","Craftsman","Turner","Weaver"]},{name:"Hugglescote Grange",location:"Hugglescote, Leicestershire",lat:52.727,lng:-1.362,housetypes:["Craftsman","Turner","Cooper","Fletcher"]},{name:"Abbey Fields Grange",location:"Hucknall, Nottinghamshire",lat:53.033,lng:-1.195,housetypes:["Tanner","Weaver","Turner","Joiner"]},{name:"Ashlands",location:"Sutton in Ashfield, Notts",lat:53.128,lng:-1.255,housetypes:["Joiner","Craftsman","Turner"]},{name:"Torvill Park",location:"Fairham, Nottingham",lat:52.909,lng:-1.163,housetypes:["Craftsman","Turner","Tanner","Weaver"]}]},{id:"persimmon",name:"Persimmon Homes",color:"#D4002A",logo:"https://cdn.prod.website-files.com/65a518d6a768fc381c83acf8/65a518d6a768fc381c83b06d_2020_Persimmon_1.png",relationship:"A fast-paced partnership built on trust across Derbyshire, Nottinghamshire, and Leicestershire.",sites:[{name:"Clipstone Park",location:"Clipstone, Mansfield",lat:53.167,lng:-1.137,housetypes:["Bedale","Alnwick","Byford","Bolsover","Kielder"]},{name:"The Oaks",location:"Calverton, Notts",lat:53.033,lng:-1.093,housetypes:["Bedale","Alnwick","Bolsover","Kielder"]},{name:"Boulton Moor",location:"Chellaston, Derby",lat:52.872,lng:-1.413,housetypes:["Bedale","Alnwick","Bolsover","Kielder","Roseberry"]},{name:"Jubilee Gardens",location:"Ilkeston, Derbyshire",lat:52.972,lng:-1.307,housetypes:["Bedale","Byford","Alnwick","Bolsover"]},{name:"Foxley Fields",location:"Market Harborough, Leics",lat:52.478,lng:-0.918,housetypes:["Kielder","Roseberry","Alnwick","Bolsover"]}]},{id:"stmodwen",name:"St. Modwen Homes",color:"#6B2D5B",logo:"https://ramsboards.com/wp-content/uploads/2021/01/st.modwen-homes.webp",relationship:"With their head office in Derby, St. Modwen are a natural partner for Ridgeway.",sites:[{name:"Hilton Valley",location:"Hilton, Derbyshire",lat:52.862,lng:-1.596,housetypes:["Arden","Berwick","Carleton","Danbury"]},{name:"Bramshall Meadows",location:"Uttoxeter, Staffordshire",lat:52.907,lng:-1.847,housetypes:["Arden","Berwick","Carleton","Elmswell"]},{name:"Snibston Mill",location:"Coalville, Leicestershire",lat:52.725,lng:-1.37,housetypes:["Arden","Carleton","Danbury","Elmswell"]},{name:"Egstow Park",location:"Clay Cross, Derbyshire",lat:53.163,lng:-1.413,housetypes:["Berwick","Carleton","Danbury"]}]},{id:"countryside",name:"Countryside Homes",color:"#2B6E44",logo:"https://nla-production-media.s3.eu-west-2.amazonaws.com/84908/Untitled-design-15.png?v=1766430558",relationship:"Ridgeway support their Midlands mixed-tenure developments.",sites:[{name:"Edwalton Fields",location:"Edwalton, Nottingham",lat:52.917,lng:-1.12,housetypes:["Thornbury","Wentworth","Henley","Sudbury"]},{name:"Mastin Moor",location:"Chesterfield, Derbyshire",lat:53.267,lng:-1.342,housetypes:["Thornbury","Henley","Sudbury"]}]},{id:"vistry",name:"Vistry / Bovis Homes",color:"#00594F",logo:"https://housingforum.org.uk/wp-content/uploads/2020/05/Untitled-design.png",relationship:"Our work on Broadnook Garden Village is a testament to their trust in Ridgeway.",sites:[{name:"Broadnook Garden Village",location:"Rothley, Leicestershire",lat:52.719,lng:-1.138,housetypes:["Limewood","Fern","Lime","Oak","Willow"]},{name:"Partridge Walk",location:"Stafford",lat:52.808,lng:-2.101,housetypes:["Limewood","Oak","Willow","Cedar"]},{name:"Hinckley 475",location:"Hinckley, Leicestershire",lat:52.54,lng:-1.37,housetypes:["Limewood","Fern","Oak","Willow"]}]},{id:"ashberry",name:"Ashberry Homes",color:"#7B3F98",logo:"https://www.ashberryhomes.co.uk/img/default-social-image.jpg",relationship:"Ridgeway deliver consistently across Ashberry's Nottinghamshire sites.",sites:[{name:"Potters Gate",location:"Farndon, Newark",lat:53.064,lng:-0.856,housetypes:["Greenwood","Oakwood","Birchwood"]},{name:"Longridge",location:"Long Eaton, Notts",lat:52.89,lng:-1.275,housetypes:["Greenwood","Oakwood","Elmwood","Birchwood"]}]},{id:"davidsons",name:"Davidsons Homes",color:"#C8102E",logo:"https://davidsonsgroup.co.uk/wp-content/uploads/2023/01/Screenshot-2023-01-03-at-16.53.01-1024x522.png",relationship:"Davidsons are a well-respected Midlands developer. We're proud to be part of their supply chain.",sites:[{name:"Davidsons at Huncote",location:"Huncote, Leicestershire",lat:52.582,lng:-1.218,housetypes:["The Arden","The Warwick","The Ashby","The Leamington"]},{name:"Davidsons at Boulton Moor",location:"Derby",lat:52.878,lng:-1.418,housetypes:["The Arden","The Warwick","The Kenilworth"]}]},{id:"wheeldons",name:"Wheeldon Homes",color:"#2E4057",logo:"https://www.panddg.co.uk/wp-content/uploads/2022/02/logo-wheeldon-homes.svg",relationship:"A boutique developer that values the personal service Ridgeway bring.",sites:[{name:"Oaklands",location:"Etwall, South Derbyshire",lat:52.871,lng:-1.599,housetypes:["The Chatsworth","The Haddon","The Calke"]},{name:"The Green",location:"Church Broughton, Derby",lat:52.857,lng:-1.66,housetypes:["The Chatsworth","The Haddon"]}]},{id:"crest",name:"Crest Nicholson",color:"#003C71",logo:"https://www.crestnicholson.com/favicon.ico",relationship:"Ridgeway meet Crest Nicholson's exacting standards on every element.",sites:[{name:"Barley Fields",location:"Queniborough, Leicestershire",lat:52.697,lng:-1.08,housetypes:["Elm","Beech","Maple","Rowan","Birch"]}]}];

// Default site leads assignments
const DEFAULT_SITE_LEADS = {};
const PAST_PROJECTS=[{year:"2024-25",builder:"Bellway",site:"Holbrook Park Ph1",location:"Chellaston",units:167,scope:"Full package"},{year:"2023-25",builder:"Persimmon",site:"Boulton Moor",location:"Chellaston",units:245,scope:"Full package"},{year:"2023-24",builder:"Barratt",site:"Thoresby Vale Ph2",location:"Mansfield",units:180,scope:"Full package"},{year:"2022-24",builder:"St. Modwen",site:"Hilton Valley Ph3",location:"Hilton",units:120,scope:"1st & 2nd fix"},{year:"2021-23",builder:"Persimmon",site:"Jubilee Gardens",location:"Ilkeston",units:200,scope:"Full package"},{year:"2020-22",builder:"Barratt",site:"Dunstall Park",location:"Tamworth",units:280,scope:"Full package"},{year:"2019-21",builder:"Bellway",site:"The Meadows Ph1",location:"Alvaston",units:78,scope:"Full package"},{year:"2018-20",builder:"Persimmon",site:"Clipstone Park",location:"Mansfield",units:190,scope:"Full package"},{year:"2017-19",builder:"Bellway",site:"Coppice Heights",location:"Ripley",units:130,scope:"Full package"},{year:"2016-18",builder:"Persimmon",site:"Carlton View",location:"Gedling",units:170,scope:"Full package"},{year:"2015-17",builder:"Bellway",site:"Hugglescote Grange",location:"Leicestershire",units:140,scope:"Full package"},{year:"2014-16",builder:"Barratt",site:"Grange Park",location:"Loughborough",units:220,scope:"Full package"},{year:"2012-14",builder:"Bellway",site:"Stenson Fields",location:"Derby",units:250,scope:"Full package"},{year:"2010-12",builder:"Persimmon",site:"Wollaton Vale",location:"Nottingham",units:200,scope:"Full package"},{year:"2008-10",builder:"Barratt",site:"Chestnut Grove",location:"Long Eaton",units:140,scope:"Full package"},{year:"2005-07",builder:"Bellway",site:"Millbrook Park",location:"Stapleford",units:85,scope:"Full package"}];
const SERVICES=[{id:"joists",title:"Joists & Structural Floors",icon:"┃",desc:"All structural timber floor systems to NHBC standards.",subs:[{n:"Joist Types",items:["Masonry Hanger Joists","Joist Hanger to Trimmer","Change of Direction","I-Beam / Engineered","Traditional Softwood"]},{n:"Floor Construction",items:["Semi-Detached Party Floor","Strutting & Noggins","Structural Decking","Fire Stopping"]}]},{id:"roofs",title:"Roof Construction",icon:"△",desc:"Full roof erection through to weathertight.",subs:[{n:"Roof Types",items:["Straight Up & Over","Gable Elevations","Hipped Roofs","Valley Roofs","Dormer Construction"]},{n:"Roof Details",items:["Open Eaves","Boxed Soffit","Gable Ladders","Box Ends","Fascia & Barge Boards","Roof Bracing"]}]},{id:"first-fix",title:"First Fix Carpentry",icon:"▣",desc:"All carpentry before plastering.",subs:[{n:"Traditional (Blockwork)",items:["Staircase Installation","Stud Partitions","Bulkheads","Door Linings","Window Boards","Pipe Boxing","Loft Hatches","Solar Panel Stands"]},{n:"Timber Frame",items:["Frame Erection","Squaring & Levelling","Panel Stitching","Party Walls","Floor Cassettes","Breather Membrane","Fire Stopping & Cavity Barriers"]}]},{id:"second-fix",title:"Second Fix Carpentry",icon:"▤",desc:"All finishing carpentry after plastering.",subs:[{n:"Traditional Doors",items:["Door Trimming & Fitting","Hinging","Latch & Lock Fitting","Fire Door Hanging"]},{n:"Prehung Casings",items:["Prehung Installation","Levelling & Packing","Fire-Rated Sets"]},{n:"Standard Spec",items:["Standard Skirting (68/94mm)","Standard Architrave","Standard Staircase"]},{n:"Premium Spec",items:["Premium Skirting (119-168mm)","Premium Architrave + Plinth Blocks","Oak Staircase","Engineered Hardwood Flooring","Panelling & Wainscoting"]}]},{id:"finals",title:"Final Fix",icon:"◆",desc:"All final items to handover standard.",subs:[{n:"Included",items:["Door Handles & Furnishings","Ironmongery - Locks, Latches & Keeps","Bath Panel","Front Door Accessories"]}]},{id:"extras",title:"Unique Works",icon:"\u25C7",desc:"Remedial & snagging work for other contractors.",subs:[{n:"Remedial Services",items:["Rectifying defective carpentry by other contractors","Door realignment & rehinging","Skirting & architrave replacement","Staircase remedials","Floor levelling & joist repairs"]},{n:"Snagging Support",items:["NHBC inspection preparation for other sites","Pre-completion snagging lists","Warranty defect repairs","Fire door compliance remedials","Builder handover support"]}]}];
const DEMO_CARPS=[];
const HOLBROOK_PLOTS=Array.from({length:40},(_,i)=>{const n=i+1;const stages=["Not Started","Joists","Joists Complete","Roofs","Roofs Complete","First Fix","First Fix Complete","Second Fix","Second Fix Complete","Finals","Complete"];const si=n<=8?10:n<=14?8:n<=20?6:n<=28?4:n<=34?2:0;return{plot:n,stage:stages[si],carpenter:n<=8?"Various":n<=14?"Richard Wileman":n<=20?"Neil Hines":n<=28?"Charlie Dillon":n<=34?"Neil Goodwin":"Unallocated",houseType:["Craftsman","Joiner","Turner","Tanner","Weaver"][i%5]};});
const ALL_CARPS=[];
const ALL_PRICE_LISTS=[];
const DEMO_DOCS_BY_SITE={};

const CARPENTERS = [];

const SITE_MANAGERS = [];

const INITIAL_WORK_LOG = [];

const PRICE_LISTS_BY_HOUSE_TYPE = {};

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
  "Oadby Grange": {
    "Floorplans": ["Joiner — Ground Floor", "Joiner — First Floor", "Craftsman — Ground Floor", "Craftsman — First Floor", "Weaver — Ground Floor"],
    "Technical Drawings": ["Electrical — Oadby Grange", "Structural — Oadby Grange"],
    "Site Documents": ["Health & Safety Plan", "Site Rules"],
    "H&S": ["Site Induction", "Equipment Register"]
  },
  "Swinfen Vale": {
    "Floorplans": ["Harcourt — Ground Floor", "Harcourt — First Floor", "Charwood / Clarendon — Floorplan", "Poppy / Blacksmith — Floorplan", "Alysumm / Blenmere — Floorplan", "Angelica / Bowyer — Floorplan", "Evelyn / Fletcher — Floorplan", "Aster / Goldsmith — Floorplan", "Verbena / Mason — Floorplan", "Jasmine / Scrivener — Floorplan", "Betony / Shoemaker — Floorplan", "Daphne / Spinner — Floorplan", "Foxglove / Tanner — Floorplan", "Delphinium / Wheelwright — Floorplan", "Type D — Floorplan", "Type B — Floorplan", "Tunstall / Thornton — Floorplan", "Beattie — Floorplan"],
    "Technical Drawings": ["Electrical — Swinfen Vale", "Structural — Swinfen Vale", "Plumbing — Swinfen Vale"],
    "Site Documents": ["Ashberry Swinfen Vale V1 — Price List", "Health & Safety Plan", "Site Rules", "Site Map"],
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
  const [formData, setFormData] = useState({ site: '', plot: '', houseType: '', stage: '', expectedDays: '', priority: 'medium', notes: '' });
  const [selectedSiteForLog, setSelectedSiteForLog] = useState('');
  const [allocateId, setAllocateId] = useState(null);
  const [allocateCarpenter, setAllocateCarpenter] = useState('');
  const [allocateStartDate, setAllocateStartDate] = useState('');
  const [carpenterSearch, setCarpenterSearch] = useState('');
  const [adminTab, setAdminTab] = useState('dashboard');
  const [scheduleView, setScheduleView] = useState('gantt');
  const [carpenterTab, setCarpenterTab] = useState('schedule');
  const [invoiceTab, setInvoiceTab] = useState('dashboard');
  const [selectedInvoiceSite, setSelectedInvoiceSite] = useState(null);
  const [builderPayments, setBuilderPayments] = useState([]);
  const [siteleads, setSiteLeads] = useState({});
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
const[notifPhoto,setNotifPhoto]=useState(null);
const[notifPhotoPreview,setNotifPhotoPreview]=useState(null);
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
const[newFileDesc,setNewFileDesc]=useState('');
const[creatingFile,setCreatingFile]=useState(false);
const[viewingFileId,setViewingFileId]=useState(null);
const[editingPhotoId,setEditingPhotoId]=useState(null);
const[editingPhotoNote,setEditingPhotoNote]=useState('');
const[showSaveFileConfirm,setShowSaveFileConfirm]=useState(false);
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
const[scheduleWeekOffset,setScheduleWeekOffset]=useState(0);
const[editingCell,setEditingCell]=useState(null);
const[cellSite,setCellSite]=useState('');
const[cellPlot,setCellPlot]=useState('');
const[cellHouseType,setCellHouseType]=useState('');
const[cellStage,setCellStage]=useState('');
const[cellDays,setCellDays]=useState(1);
const[cellHolidayMode,setCellHolidayMode]=useState(false);
const[cellHolidayEnd,setCellHolidayEnd]=useState('');
const[safetyLog,setSafetyLog]=useState([]);
const[showSafetyForm,setShowSafetyForm]=useState(false);
const[safetyPlot,setSafetyPlot]=useState('');
const[safetyCategory,setSafetyCategory]=useState('');
const[safetyDesc,setSafetyDesc]=useState('');
const[safetyPhotos,setSafetyPhotos]=useState([]);
const[safetyInstructedBy,setSafetyInstructedBy]=useState('');
const[selectedSafetySite,setSelectedSafetySite]=useState(null);
const [loginAttempts, setLoginAttempts] = useState(0);
const [lockoutUntil, setLockoutUntil] = useState(0);
const [smWeekOffset, setSmWeekOffset] = useState(0);
const [smSelectedCarpenter, setSmSelectedCarpenter] = useState(null);
const [schedChangeRequests, setSchedChangeRequests] = useState([]);
const [schedChangeForm, setSchedChangeForm] = useState({carpenterName:'', currentSite:'', currentPlot:'', currentStage:'', requestedChange:'', reason:''});
const [showSchedChangeForm, setShowSchedChangeForm] = useState(false);
const [workLogSearch, setWorkLogSearch] = useState('');
const [prevAdminTab, setPrevAdminTab] = useState('dashboard');
const [invoiceCarpenterView, setInvoiceCarpenterView] = useState(null);
const [invoiceWeekExpanded, setInvoiceWeekExpanded] = useState(null);
const [portalMessages, setPortalMessages] = useState([]);
const [newPortalMsg, setNewPortalMsg] = useState('');
const [showInvoiceNoteForm, setShowInvoiceNoteForm] = useState(false);
const [invoiceNoteText, setInvoiceNoteText] = useState('');
const [siteInvExpanded, setSiteInvExpanded] = useState(null); // 'carpenter|weekKey'
const [siteInvAdjustKey, setSiteInvAdjustKey] = useState(null);
const [siteInvAdjustDesc, setSiteInvAdjustDesc] = useState('');
const [siteInvAdjustAmount, setSiteInvAdjustAmount] = useState('');
const [siteSearchText, setSiteSearchText] = useState('');
const [siteSearchOpen, setSiteSearchOpen] = useState(false);
const [carpDelayAllocId, setCarpDelayAllocId] = useState(null);
const [carpDelayReason, setCarpDelayReason] = useState('');
const [carpDelayDays, setCarpDelayDays] = useState(1);
const [invoiceDayExtras, setInvoiceDayExtras] = useState({}); // {carpenterName: {dateStr: [{desc, amount, addedAt}]}}
const [invoiceDayDelays, setInvoiceDayDelays] = useState({}); // {carpenterName: {dateStr: [{reason, hours, addedAt}]}}
const [editingDayDate, setEditingDayDate] = useState(null); // dateStr being edited
const [dayExtraDesc, setDayExtraDesc] = useState('');
const [dayExtraAmount, setDayExtraAmount] = useState('');
const [dayDelayReason, setDayDelayReason] = useState('');
const [dayDelayHours, setDayDelayHours] = useState('');
const [invoiceExpandedWeek, setInvoiceExpandedWeek] = useState(null); // for admin view
const [adminEditingInvoice, setAdminEditingInvoice] = useState(null); // weekKey being edited by admin
const [adminAdjustDesc, setAdminAdjustDesc] = useState('');
const [adminAdjustAmount, setAdminAdjustAmount] = useState('');
const [fridayAutoSent, setFridayAutoSent] = useState({}); // {weekKey: true} tracks which weeks were auto-sent

// Session timeout - auto logout after 30 minutes of inactivity
useEffect(() => {
  if (!user) return;
  let timeout;
  const resetTimer = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setUser(null);
      setCurrentPage('home');
    }, 30 * 60 * 1000); // 30 minutes
  };
  const events = ['mousedown', 'keydown', 'touchstart', 'scroll'];
  events.forEach(e => window.addEventListener(e, resetTimer));
  resetTimer();
  return () => {
    clearTimeout(timeout);
    events.forEach(e => window.removeEventListener(e, resetTimer));
  };
}, [user]);

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
          // DEDUP: only keep one invoice per carpenter+site+plot+stage combo (the DB had duplicates from old bug)
          const seenKeys = new Set();
          const dedupedInv = [];
          const dupIds = [];
          inv.forEach(i => {
            const key = `${i.carpenter}|${i.site}|${i.plot}|${i.stage}`;
            if (!seenKeys.has(key)) {
              seenKeys.add(key);
              dedupedInv.push({
                id: i.id, carpenter: i.carpenter, site: i.site, plot: i.plot,
                houseType: i.house_type, stage: i.stage, amount: parseFloat(i.amount),
                status: i.status, date: i.date
              });
            } else {
              dupIds.push(i.id); // duplicate — queue for DB deletion
            }
          });
          setInvoices(dedupedInv);
          // Clean duplicate rows from DB in background
          if (dupIds.length > 0) {
            console.log(`Cleaning ${dupIds.length} duplicate invoices from DB`);
            dupIds.forEach(id => { try { deleteInvoice(id).catch(() => {}); } catch(e) {} });
          }
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
        // Load schedule change requests
        try {
          const { data: scrData } = await supabase.from('schedule_change_requests').select('*').order('created_at', { ascending: false });
          if (scrData) setSchedChangeRequests(scrData);
        } catch(e) { console.log('schedule_change_requests table not yet created'); }

        // Load site leads
        try {
          const { data: slData } = await supabase.from('site_leads').select('*');
          if (slData) {
            const leads = {...DEFAULT_SITE_LEADS};
            slData.forEach(s => { leads[s.site_name] = s.lead_name; });
            setSiteLeads(leads);
          } else {
            setSiteLeads(DEFAULT_SITE_LEADS);
          }
        } catch(e) { setSiteLeads(DEFAULT_SITE_LEADS); }

        // Load builder payments
        try {
          const { data: bpData } = await supabase.from('builder_payments').select('*').order('created_at', { ascending: false });
          if (bpData) setBuilderPayments(bpData);
        } catch(e) { console.log('builder_payments table not yet created'); }

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

// Auto-refresh at midnight to keep schedule current
const [refreshTick, forceUpdate] = useState(0);
useEffect(() => {
  const now = new Date();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 5);
  const msUntilMidnight = tomorrow - now;
  const timer = setTimeout(() => forceUpdate(v => v + 1), msUntilMidnight);
  // Refresh every 30 minutes (less frequent to avoid re-triggering invoice generation)
  const interval = setInterval(() => forceUpdate(v => v + 1), 30 * 60 * 1000);
  return () => { clearTimeout(timer); clearInterval(interval); };
}, []);

// Auto-complete any allocations whose endDate is in the past and haven't been marked complete.
// Uses a Set of processed allocation IDs to NEVER re-process the same allocation twice.
const processedAllocIdsRef = useRef(new Set());
useEffect(() => {
  const today = new Date().toISOString().split('T')[0];
  const stale = allocations.filter(a => !a.completed && a.endDate && a.endDate < today && !processedAllocIdsRef.current.has(a.id));
  if(stale.length === 0) return;
  // Mark these IDs as processed IMMEDIATELY so no future run can touch them
  stale.forEach(a => processedAllocIdsRef.current.add(a.id));
  // Mark them complete locally
  setAllocations(prev => prev.map(a => {
    if(!a.completed && a.endDate && a.endDate < today){
      return {...a, completed: true, completedDate: a.endDate};
    }
    return a;
  }));
  // Persist to DB
  stale.forEach(alloc => {
    try{ updateAllocation(alloc.id, {completed: true, completed_date: alloc.endDate}).catch(()=>{}); }catch(e){}
    const matchingWl = workLog.find(w => w.site === alloc.site && w.plot === alloc.plot && w.stage === alloc.stage);
    if(matchingWl){
      try{ updateWorkLogEntry(matchingWl.id, {status: 'complete'}).catch(()=>{}); }catch(e){}
    }
  });
  // Auto-generate invoices — collect new ones first, then update state + DB separately
  const invoicesToAdd = [];
  setInvoices(prev => {
    const newInvoices = [...prev];
    stale.forEach(alloc => {
      const siteRates = PRICE_LISTS[alloc.builder]?.[alloc.site] || PRICE_LISTS[Object.keys(PRICE_LISTS).find(b => PRICE_LISTS[b][alloc.site]) || '']?.[alloc.site] || {};
      const stageKey = alloc.stage === 'Final' ? 'Finals' : alloc.stage;
      const amount = siteRates[stageKey] || siteRates[alloc.stage] || 0;
      if(amount > 0){
        const already = newInvoices.some(inv => inv.carpenter === alloc.carpenter && inv.site === alloc.site && inv.plot === alloc.plot && inv.stage === alloc.stage);
        if(!already){
          const newInv = { id: Math.max(...newInvoices.map(inv=>inv.id),0)+1, carpenter: alloc.carpenter, site: alloc.site, plot: alloc.plot, houseType: alloc.houseType, stage: alloc.stage, amount, status: 'pending', date: alloc.endDate };
          newInvoices.push(newInv);
          invoicesToAdd.push({carpenter: alloc.carpenter, site: alloc.site, plot: alloc.plot, house_type: alloc.houseType, stage: alloc.stage, amount, status: 'pending', date: alloc.endDate});
        }
      }
    });
    return newInvoices;
  });
  // DB writes OUTSIDE the updater so they only fire once
  setTimeout(() => {
    invoicesToAdd.forEach(inv => { try{ addInvoice(inv).catch(()=>{}); }catch(e){} });
  }, 100);
  // Update any matching workLog entries locally
  setWorkLog(prev => {
    const staleKeys = new Set(stale.map(a => a.site+'|'+a.plot+'|'+a.stage));
    return prev.map(w => staleKeys.has(w.site+'|'+w.plot+'|'+w.stage) ? {...w, status: 'complete'} : w);
  });
}, [allocations, refreshTick]);

// Auto-send Friday 8pm logic
useEffect(() => {
  const checkFridayAutoSend = () => {
    const now = new Date();
    if (now.getDay() === 5 && now.getHours() >= 20) {
      const monday = new Date(now);
      monday.setDate(now.getDate() - 4);
      const weekKey = monday.toISOString().split('T')[0];
      if (!fridayAutoSent[weekKey]) {
        // Mark all pending invoices for this week as 'submitted'
        const updatedInvoices = invoices.map(inv => {
          const invDate = new Date(inv.date);
          const invMonday = new Date(invDate);
          invMonday.setDate(invDate.getDate() - ((invDate.getDay() + 6) % 7));
          if (invMonday.toISOString().split('T')[0] === weekKey && inv.status === 'pending') {
            return { ...inv, status: 'submitted', submittedAt: now.toISOString() };
          }
          return inv;
        });
        setInvoices(updatedInvoices);
        setFridayAutoSent(prev => ({ ...prev, [weekKey]: true }));
      }
    }
  };
  const interval = setInterval(checkFridayAutoSend, 60000);
  checkFridayAutoSend();
  return () => clearInterval(interval);
}, [invoices, fridayAutoSent]);

  // Website/old portal states from App7
  const[sec,setSec]=useState("home");const[sB,setSB]=useState(null);const[sS,setSS]=useState(null);const[sH,setSH]=useState(null);const[sSv,setSSv]=useState(null);const[chatOn,setChatOn]=useState(false);const[msgs,setMsgs]=useState([{f:"b",t:"Hello! Welcome to Ridgeway Carpentry Carpentry. I\u2019m here to help with any enquiries. Could I start with your name please?"}]);const[chatIn,setChatIn]=useState("");const[formDone,setFormDone]=useState(false);const[portal,setPortal]=useState(null);const[pUser,setPUser]=useState(null);const[pin,setPin]=useState("");const[pTab,setPTab]=useState("schedule");const[matReqs,setMatReqs]=useState([{id:1,who:"Richard Wileman",site:"Swinfen Vale",items:"2x boxes 63mm nails",status:"pending",date:"21/03",payMethod:"deduct"},{id:2,who:"Neil Goodwin",site:"Derwentside",items:"5x sheets 18mm OSB",status:"approved",date:"20/03",payMethod:"cash"},{id:3,who:"Neil Hines",site:"Springwood",items:"1x box 100mm nails, 3x tubes Gripfill",status:"pending",date:"22/03",payMethod:"deduct"}]);const[newMat,setNewMat]=useState("");const[schedAllocs,setSchedAllocs]=useState([{id:1,carp:"Richard Wileman",site:"Swinfen Vale",plot:"5",stage:"Joist",date:"30/03",status:"complete",rate:"\u00a3330"},{id:2,carp:"Charlie Dillon",site:"Swinfen Vale",plot:"6",stage:"1st Fix",date:"30/03",status:"active",rate:"\u00a3650"},{id:3,carp:"Neil Goodwin",site:"Derwentside",plot:"12",stage:"Main Roof",date:"31/03",status:"active",rate:"\u00a3500"},{id:4,carp:"Neil Hines",site:"Springwood",plot:"8",stage:"1st Fix",date:"30/03",status:"active",rate:"\u00a3950"},{id:5,carp:"Rob Jones",site:"Snibston Mill",plot:"14",stage:"2nd Fix",date:"30/03",status:"active",rate:"\u00a3410"},{id:6,carp:"Ian Johnson",site:"Brascote Park",plot:"22",stage:"Main Roof",date:"01/04",status:"upcoming",rate:"\u00a3700"}]);const[allocForm,setAllocForm]=useState({carp:"",site:"",plot:"",stage:"",date:""});const[plots,setPlots]=useState(HOLBROOK_PLOTS);const[selectedPlot,setSelectedPlot]=useState(null);const chatEnd=useRef(null);const mapEl=useRef(null);const[mapOk,setMapOk]=useState(false);const[mobileMenu,setMobileMenu]=useState(false);const[delayModal,setDelayModal]=useState(null);const[oldDelayReason,setOldDelayReason]=useState("");const[oldDelayDuration,setOldDelayDuration]=useState("");const[chatStep,setChatStep]=useState("init");const[chatUserData,setChatUserData]=useState({});
const logoUrl="/Ridgeway-logo.png";
const doLogin=async()=>{
// Check rate limiting
if(Date.now() < lockoutUntil) {
  alert("Too many attempts. Please wait 60 seconds.");
  return;
}
// Try Supabase login first
try {
  const dbUser = await loginWithPin(pin);
  if(dbUser) {
    setLoginAttempts(0);
    setLockoutUntil(0);
    const role = dbUser.role;
    if(role === 'admin') {
      setPortal("mgr");setPUser({name:dbUser.name,role:"admin"});setPTab("dashboard");
      setUser({role:'admin',name:dbUser.name,id:dbUser.id});setCurrentPage('app');setAdminTab('dashboard');return;
    }
    if(role === 'invoice') {
      setPortal("office");setPUser({name:dbUser.name,role:"office"});setPTab("invoices");
      setUser({role:'invoice',name:dbUser.name,id:dbUser.id});setCurrentPage('app');setInvoiceTab('dashboard');return;
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
// Fallback to local auth - increment failure counter
const newAttempts = loginAttempts + 1;
setLoginAttempts(newAttempts);
if(newAttempts >= 5) {
  setLockoutUntil(Date.now() + 60000);
  alert("Too many failed attempts. Account locked for 60 seconds.");
  return;
}
// Local fallback removed — use Supabase auth
// Local fallback removed — use Supabase auth
const sm=SITE_MANAGERS.find(s=>s.pin===pin);if(sm){setLoginAttempts(0);setLockoutUntil(0);const u={...sm,role:'site_manager'};setUser(u);setCurrentPage('app');setSiteManagerTab('overview');return;}
const c=DEMO_CARPS.find(x=>x.pin===pin);if(c){setLoginAttempts(0);setLockoutUntil(0);setPortal("carp");setPUser(c);setPTab("schedule");const carp=CARPENTERS.find(x=>x.pin===pin);if(carp){setUser({...carp,role:'carpenter'});setCurrentPage('app');setCarpenterTab('schedule');}return;}
const carp2=CARPENTERS.find(x=>x.pin===pin);if(carp2){setLoginAttempts(0);setLockoutUntil(0);setUser({...carp2,role:'carpenter'});setCurrentPage('app');setCarpenterTab('schedule');return;}
alert("Invalid PIN");};
const getInvoiceForCarp=(name)=>{const allocs=schedAllocs.filter(a=>a.carp===name&&a.status==="complete");const pending=schedAllocs.filter(a=>a.carp===name&&a.status==="active");return{completed:allocs,pending,total:allocs.reduce((s,a)=>s+parseFloat(a.rate.replace(/[\u00a3,]/g,"")),0)};};
const stageColors={"Not Started":"#e0e0e0",Joists:"#FF9800","Joists Complete":"#FFB74D",Roofs:"#2196F3","Roofs Complete":"#64B5F6","First Fix":"#9C27B0","First Fix — Drop Backs":"#7B1FA2","First Fix Complete":"#CE93D8","Second Fix":"#4CAF50","Second Fix Complete":"#81C784",Finals:"#F44336",Complete:"#22c55e"};
useEffect(()=>{chatEnd.current?.scrollIntoView({behavior:"smooth"});},[msgs]);
useEffect(()=>{if(sec==="map"&&!mapOk){const cs=document.createElement("link");cs.rel="stylesheet";cs.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";document.head.appendChild(cs);const sc=document.createElement("script");sc.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";sc.onload=()=>setMapOk(true);document.head.appendChild(sc);}},[sec]);
useEffect(()=>{if(sec==="map"&&mapOk&&mapEl.current){const L=window.L;if(!L||mapEl.current._leaflet_id)return;const m=L.map(mapEl.current,{zoomControl:false}).setView([52.85,-1.35],9);L.control.zoom({position:'bottomright'}).addTo(m);L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",{attribution:'© <a href="https://www.openstreetmap.org/copyright">OSM</a> © <a href="https://carto.com/">CARTO</a>',subdomains:'abcd',maxZoom:19}).addTo(m);BUILDERS.forEach(b=>{b.sites.forEach(s=>{const svgIcon=L.divIcon({className:'',html:`<div style="position:relative;width:36px;height:46px;display:flex;align-items:flex-start;justify-content:center"><svg width="36" height="46" viewBox="0 0 36 46"><defs><filter id="ds${s.lat}" x="-20%" y="-10%" width="140%" height="130%"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/></filter></defs><path d="M18 44 C18 44 4 28 4 16 A14 14 0 1 1 32 16 C32 28 18 44 18 44Z" fill="${b.color}" filter="url(#ds${s.lat})" stroke="white" stroke-width="2"/><circle cx="18" cy="16" r="6" fill="white" opacity="0.9"/></svg></div>`,iconSize:[36,46],iconAnchor:[18,46],popupAnchor:[0,-40]});L.marker([s.lat,s.lng],{icon:svgIcon}).addTo(m).bindPopup(`<div style="font-family:'DM Sans',-apple-system,sans-serif;min-width:220px;padding:4px"><div style="display:flex;align-items:center;gap:8;margin-bottom:10"><div style="width:10px;height:10px;border-radius:50%;background:${b.color};flex-shrink:0"></div><div><strong style="font-size:15px;color:#1a1a1a">${s.name}</strong><br/><span style="font-size:12px;color:#888">${b.name}</span></div></div><div style="font-size:12px;color:#666;margin-bottom:12;padding:8px;background:#f8f7f4;border-radius:6px">${s.location}</div><div style="display:flex;gap:6"><a href="https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}" target="_blank" style="flex:1;display:block;text-align:center;padding:8px;background:#4285F4;color:white;font-weight:700;text-decoration:none;border-radius:6px;font-size:11px">Google Maps</a><a href="https://maps.apple.com/?daddr=${s.lat},${s.lng}" target="_blank" style="flex:1;display:block;text-align:center;padding:8px;background:#333;color:white;font-weight:700;text-decoration:none;border-radius:6px;font-size:11px">Apple Maps</a></div></div>`,{className:'mw-popup',maxWidth:260});});});// Add custom popup styling
const popupStyle=document.createElement('style');popupStyle.textContent='.mw-popup .leaflet-popup-content-wrapper{border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,.15);border:none;padding:0}.mw-popup .leaflet-popup-content{margin:12px 14px}.mw-popup .leaflet-popup-tip{box-shadow:0 4px 12px rgba(0,0,0,.1)}';document.head.appendChild(popupStyle);}},[sec,mapOk]);
useEffect(()=>{if(!document.querySelector('meta[name="viewport"]')){const v=document.createElement("meta");v.name="viewport";v.content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover";document.head.appendChild(v);}if(!document.querySelector('meta[name="theme-color"]')){const t=document.createElement("meta");t.name="theme-color";t.content="#1B3D2F";document.head.appendChild(t);}if(!document.getElementById("mw-responsive")){const st=document.createElement("style");st.id="mw-responsive";st.textContent="*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}body{margin:0;-webkit-font-smoothing:antialiased;overflow-x:hidden}input,select,textarea{font-size:16px!important}@media(max-width:768px){.mw-desk{display:none!important}.mw-mob-btn{display:flex!important}table{font-size:13px!important}th,td{padding:10px 6px!important}.mw-nav-inner{padding-top:calc(env(safe-area-inset-top,0px) + 18px)!important;padding-left:16px!important;padding-right:16px!important}main{padding:16px!important}.mw-grid-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch}}@media(min-width:769px){.mw-mob-btn{display:none!important}.mw-mob-menu{display:none!important}}@media(max-width:480px){h2{font-size:18px!important}h3{font-size:15px!important}}";document.head.appendChild(st);}},[]);
const send=(t)=>{if(!t.trim())return;const m=[...msgs,{f:"u",t}];setMsgs(m);setChatIn("");setTimeout(()=>{const l=t.toLowerCase();let r="";let ns=chatStep;switch(chatStep){case"init":setChatUserData(p=>({...p,name:t.trim()}));r="Thanks "+t.trim()+"! Could I have a contact number?";ns="ask_phone";break;case"ask_phone":setChatUserData(p=>({...p,phone:t.trim()}));r="Great. How can we help?\n1. Services\n2. Quote/project\n3. Work opportunities\n4. Other";ns="ask_type";break;case"ask_type":if(l.includes("1")||l.includes("service")){r="We offer joists, roofing, first fix, second fix, and finals. Which interests you?";ns="service_detail";}else if(l.includes("2")||l.includes("quote")){r="Tell us about your project?";ns="quote_detail";}else if(l.includes("3")||l.includes("work")||l.includes("job")){r="We are always hiring. Want a callback?";ns="work_detail";}else{r="Tell me more and I will pass it on.";ns="general_detail";}break;case"service_detail":r="Full package: Joists, Roofs, First Fix, Second Fix, Finals. Want a callback?";ns="callback_offer";break;case"quote_detail":case"general_detail":r="Thanks. Shall we call or email?";ns="callback_or_email";break;case"work_detail":r="I will arrange that. Anything else?";ns="anything_else";break;case"callback_or_email":case"callback_offer":r="We will be in touch. Anything else?";ns="anything_else";break;case"anything_else":if(l.includes("no")||l.includes("thanks")||l.includes("bye")){r="Thanks for contacting Ridgeway Carpentry!";ns="ended";}else{r="What else?\n1. Services\n2. Quote\n3. Work\n4. Other";ns="ask_type";}break;default:r="How can I help?\n1. Services\n2. Quote\n3. Work\n4. Other";ns="ask_type";}setChatStep(ns);setMsgs([...m,{f:"b",t:r}]);},600);};
const go=(s)=>{setSec(s);setSB(null);setSS(null);setSH(null);setSSv(null);setPortal(null);setPUser(null);setMobileMenu(false);window.scrollTo(0,0);};
const S={root:{fontFamily:"'DM Sans',-apple-system,sans-serif",color:"#1a1a1a",background:"#fff",minHeight:"100vh"},nav:{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(27,61,47,.97)",backdropFilter:"blur(12px)",minHeight:64,display:"flex",alignItems:"center",padding:"calc(env(safe-area-inset-top, 12px) + 8px) 24px 12px 24px",justifyContent:"space-between",borderBottom:"1px solid rgba(255,255,255,.06)"},nl:(a)=>({color:a?"#C4A265":"rgba(255,255,255,.6)",fontSize:10,fontWeight:600,letterSpacing:.8,textTransform:"uppercase",cursor:"pointer",borderBottom:a?"2px solid #C4A265":"2px solid transparent",padding:"4px 0",whiteSpace:"nowrap"}),sc:{padding:"80px clamp(20px,4vw,40px)",maxWidth:1320,margin:"0 auto"},lb:{fontSize:11,fontWeight:700,letterSpacing:2.5,textTransform:"uppercase",color:"#C4A265",marginBottom:8,display:"block"},h2:{fontSize:32,fontWeight:700,lineHeight:1.15,marginBottom:12},sub:{fontSize:14,color:"#777",lineHeight:1.7,maxWidth:600},cd:{background:"#fff",borderRadius:6,overflow:"hidden",boxShadow:"0 2px 16px rgba(0,0,0,.06)",cursor:"pointer",transition:".25s"},bt:{display:"inline-flex",alignItems:"center",gap:6,padding:"11px 24px",borderRadius:5,fontSize:13,fontWeight:700,cursor:"pointer",border:"none",letterSpacing:.4}};




  // ===== ENHANCED PORTAL =====
  if(currentPage === 'app' && user) {
  const myAllocs = allocations.filter(a => a.carpenter === user?.name);

  // Compute carpenter's active sites: home site + any sites they're allocated to this week
  const mySites = (() => {
    if(user?.role !== 'carpenter') return [];
    const sites = new Set();
    if(user?.site) sites.add(user.site);
    // Add sites from all active/upcoming allocations
    myAllocs.filter(a => !a.completed).forEach(a => sites.add(a.site));
    return [...sites];
  })();
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
    if(delayDays < 1 || delayDays > 365 || !Number.isInteger(delayDays)) { alert('Delay days must be a whole number between 1 and 365'); return; }
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
      let shouldAddToDb = false;
      const dbPayload = {carpenter: alloc.carpenter, site: alloc.site, plot: alloc.plot, house_type: alloc.houseType, stage: alloc.stage, amount, status: 'pending', date: todayStr};
      setInvoices(prev => {
        const already = prev.some(inv => inv.carpenter === alloc.carpenter && inv.site === alloc.site && inv.plot === alloc.plot && inv.stage === alloc.stage);
        if(already) return prev;
        shouldAddToDb = true;
        const newInvoice = { id: Math.max(...prev.map(inv=>inv.id),0)+1, carpenter: alloc.carpenter, site: alloc.site, plot: alloc.plot, houseType: alloc.houseType, stage: alloc.stage, amount, status: 'pending', date: todayStr };
        return [...prev, newInvoice];
      });
      // DB write OUTSIDE updater — updaters can run multiple times in React
      setTimeout(() => { if(shouldAddToDb) addInvoice(dbPayload).catch(e=>console.error('DB invoice error:',e)); }, 100);
    }
    setSuccessMsg('Job complete — invoice generated'); setTimeout(()=>setSuccessMsg(''),2500);
  };

  // Find earliest weekday where carpenter has no allocation for the requested number of days
  const findEarliestFreeDay = (carpName, daysNeeded=1) => {
    const start = new Date();
    for(let offset=0; offset<120; offset++){
      const d = new Date(start); d.setDate(start.getDate()+offset);
      if(d.getDay()===0 || d.getDay()===6) continue;
      let allFree = true;
      for(let i=0; i<daysNeeded; i++){
        const check = new Date(d); check.setDate(d.getDate()+i);
        if(check.getDay()===0||check.getDay()===6){ allFree=false; break; }
        const ds = check.toISOString().split('T')[0];
        const hasJob = allocations.some(a => a.carpenter===carpName && !a.completed && a.startDate<=ds && a.endDate>=ds);
        if(hasJob){ allFree=false; break; }
      }
      if(allFree) return d.toISOString().split('T')[0];
    }
    return null;
  };

  const handleFixingRequest = (item, qty, notes, allocInfo) => {
    return { id: Date.now(), carpenter: user?.name, site: allocInfo?.site || user?.site || '',
      plot: allocInfo?.plot || '', stage: allocInfo?.stage || '', item, qty, notes,
      date: new Date().toLocaleDateString('en-GB'), status: 'pending' };
  };

  const sendNotification = async () => {
    if(!notifTitle.trim() || !notifSite || !notifMessage.trim()) { alert('Please fill in all fields'); return; }
    const siteCarpenterNames = CARPENTERS.filter(c => c.site === notifSite).map(c => c.name);
    if(siteCarpenterNames.length === 0) { alert('No carpenters assigned to this site'); return; }

    let photoUrl = null;
    if(notifPhoto) {
      try {
        photoUrl = await uploadPhoto(notifPhoto, notifPhoto.name);
      } catch(e) {
        console.error('Photo upload error:', e);
        alert('Failed to upload photo');
        return;
      }
    }

    const notif = {
      id: Date.now(), type: notifType, title: notifTitle, message: notifMessage,
      site: notifSite, sentBy: user?.name || 'Admin',
      sentDate: new Date().toISOString().split('T')[0],
      recipients: siteCarpenterNames, responses: {}, photo_url: photoUrl
    };
    setNotifications([notif, ...notifications]);
    addNotification({type: notifType, title: notifTitle, message: notifMessage, site: notifSite, sent_by: user?.name || 'Admin', sent_date: new Date().toISOString().split('T')[0], recipients: siteCarpenterNames, photo_url: photoUrl}).catch(e=>console.error('DB notif error:',e));
    setNotifTitle(''); setNotifMessage(''); setNotifSite(user?.role === 'site_manager' ? user?.site : ''); setNotifPhoto(null); setNotifPhotoPreview(null);
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
      <header style={{ backgroundColor: NAVY, color: CREAM, padding: 'calc(env(safe-area-inset-top, 12px) + 8px) 16px 12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position:'sticky', top:0, zIndex:200 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{background:'none',border:'none',color:CREAM,fontSize:24,cursor:'pointer',padding:'4px 8px',lineHeight:1}}>
            {sidebarOpen ? 'X' : '\u2630'}
          </button>
          <img src="/Ridgeway-logo.png" alt="Ridgeway" style={{ height: '44px', borderRadius: '6px', background: '#fff', padding: '2px' }} />
          <span style={{ fontSize: '17px', fontWeight: 'bold' }}>Ridgeway Carpentry</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontSize: '13px' }}>{user?.name} | {user?.role?.toUpperCase().replace('_',' ')}</span>
          <button onClick={() => { setUser(null); setCurrentPage('home'); setPinInput(''); setPortal(null); setPUser(null); setPin(''); setSidebarOpen(false); }} style={{ backgroundColor: GOLD, color: NAVY, padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize:13 }}>
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

          {user?.role === 'admin' && ['Dashboard','Work Log','Allocate','Schedule','Sites','My Lead Sites','Carpenters','Notifications','Delays','Fixings','Cover Notes','Holidays','Sched Requests','Invoices','Variations','Price Lists','Documents'].map(tab => (
            <button key={tab} onClick={() => { setPrevAdminTab(adminTab); setAdminTab(tab.toLowerCase()); setSidebarOpen(false); }}
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
              {tab === 'Invoices' && invoices.filter(i=>i.status==='pending').length > 0 && (
                <span style={{marginLeft:6,backgroundColor:'#fff3e0',color:'#E65100',borderRadius:'50%',padding:'1px 6px',fontSize:10,fontWeight:'bold'}}>{invoices.filter(i=>i.status==='pending').length}</span>
              )}
            </button>
          ))}

          {user?.role === 'site_manager' && ['Overview','Schedule','Log Work','Compliance','Site Files','Notifications','Documents'].map(tab => (
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

          {user?.role === 'carpenter' && ['Schedule','Notifications','Documents','Price Lists','Fixings','Invoice','Variation Orders','Cover Note','Request Holiday'].map(tab => (
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

          {user?.role === 'invoice' && ['Dashboard','All Invoices','All Sites','Carpenters','Messages'].map(tab => (
            <button key={tab} onClick={() => { setInvoiceTab(tab.toLowerCase()); setSelectedInvoiceSite(null); setSidebarOpen(false); }}
              style={{ display:'block', width:'100%', padding:'12px', margin:'8px 0',
                backgroundColor: invoiceTab === tab.toLowerCase() ? GOLD : 'transparent',
                color: invoiceTab === tab.toLowerCase() ? NAVY : CREAM,
                border:'none', borderRadius:'4px', cursor:'pointer', textAlign:'left',
                fontWeight: invoiceTab === tab.toLowerCase() ? 'bold' : 'normal', fontSize:14 }}>
              {tab}
            </button>
          ))}

          {(user?.role === 'site_manager' || user?.role === 'carpenter') && (
            <div style={{ marginTop:'30px', padding:'15px', backgroundColor:'rgba(196,162,101,0.2)', borderRadius:'4px', fontSize:'12px' }}>
              {user?.role === 'carpenter' && <p style={{ margin:'0', color:GOLD, fontWeight:'bold' }}>Name: {user?.name}</p>}
              <p style={{ margin: user?.role === 'carpenter' ? '5px 0 0 0' : '0', color: user?.role === 'site_manager' ? GOLD : CREAM, fontWeight: user?.role === 'site_manager' ? 'bold' : 'normal' }}>Site: {user?.site}</p>
              <p style={{ margin:'5px 0 0 0' }}>Builder: {user?.builder}</p>
            </div>
          )}
          {user?.role === 'invoice' && (
            <div style={{ marginTop:'30px', padding:'15px', backgroundColor:'rgba(196,162,101,0.2)', borderRadius:'4px', fontSize:'12px' }}>
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
                  {label:'Total Carpenters', val: CARPENTERS.length, onClick: () => {setPrevAdminTab('dashboard');setAdminTab('carpenters');}},
                  {label:'Active Sites', val: BUILDERS.reduce((s,b) => s + b.sites.length, 0), onClick: () => {setPrevAdminTab('dashboard');setAdminTab('sites');}},
                  {label:'Unallocated Work', val: workLog.filter(w => w.status === 'logged').length, onClick: () => {setPrevAdminTab('dashboard');setAdminTab('allocate');}},
                  {label:'Allocated', val: allocations.filter(a=>!a.completed).length, onClick: () => {setPrevAdminTab('dashboard');setAdminTab('allocate');}},
                  {label:'Active Delays', val: delays.filter(d=>d.status==='active').length, onClick: () => {setPrevAdminTab('dashboard');setAdminTab('delays');}},
                  {label:'Pending Fixings', val: allFixingRequests.filter(r=>r.status==='pending').length, onClick: () => {setPrevAdminTab('dashboard');setAdminTab('fixings');}},
                  {label:'Unsigned Docs', val: notifications.reduce((c,n)=>c+n.recipients.filter(r=>!n.responses[r]?.signed).length,0), onClick: () => {setPrevAdminTab('dashboard');setAdminTab('documents');}},
                  {label:'Invoices Pending', val: invoices.filter(i=>i.status==='pending').length, onClick: () => setPortal('office')},
                  {label:'Overdue Jobs', val: allocations.filter(a=>!a.completed&&new Date(a.endDate)<todayDate).length, onClick: () => {setPrevAdminTab('dashboard');setAdminTab('allocate');}},
                  {label:'Pending Invoices', val: 'GBP ' + invoices.filter(i => i.status === 'pending').reduce((s,i) => s + i.amount, 0), onClick: () => setPortal('office')}
                ].map((c,ci) => (
                  <div key={ci} onClick={c.onClick} style={{ backgroundColor: NAVY, color: CREAM, padding: '16px', borderRadius: '8px', borderLeft: '4px solid ' + (c.label.includes('Delay')||c.label.includes('Unsigned')?'#d32f2f':GOLD), cursor: 'pointer', transition: 'transform 0.2s', transform: 'translateY(0)' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                    <p style={{ margin: 0, fontSize: '11px', opacity: 0.8 }}>{c.label}</p>
                    <h3 style={{ margin: '5px 0 0 0', fontSize: '24px' }}>{c.val}</h3>
                  </div>
                ))}
              </div>

              <button onClick={() => setAdminTab('work log')} style={{
                width:'100%', backgroundColor:GOLD, color:NAVY, border:'none', borderRadius:10,
                padding:'16px 24px', fontSize:17, fontWeight:'bold', cursor:'pointer', marginBottom:20, marginTop:20,
                display:'flex', alignItems:'center', justifyContent:'center', gap:10
              }}>
                + Log New Work
              </button>

              {/* Logged Work Needing Allocation */}
              {workLog.filter(w => w.status === 'logged').length > 0 && (
                <div style={{marginTop:24}}>
                  <h3 style={{color:NAVY,fontSize:18,margin:'0 0 14px'}}>Logged Work — Needs Allocating</h3>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:12}}>
                    {workLog.filter(w => w.status === 'logged').map(item => (
                      <div key={item.id} style={{backgroundColor:'white',border:'1px solid #ddd',borderRadius:10,padding:16,borderLeft:'5px solid '+(item.priority==='high'?'#d32f2f':item.priority==='medium'?GOLD:'#888'),cursor:'pointer'}}
                        onClick={()=>{setAdminTab('allocate');setAllocateId(item.id);}}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
                          <div>
                            <strong style={{fontSize:15,color:NAVY}}>{item.site}</strong>
                            <div style={{fontSize:12,color:'#666',marginTop:2}}>Plot {item.plot} — {item.houseType}</div>
                          </div>
                          <span style={{padding:'3px 10px',borderRadius:4,fontSize:10,fontWeight:'bold',textTransform:'uppercase',
                            backgroundColor:item.priority==='high'?'#ffebee':item.priority==='medium'?'#fff3e0':'#e3f2fd',
                            color:item.priority==='high'?'#c62828':item.priority==='medium'?'#e65100':'#1565c0'}}>{item.priority}</span>
                        </div>
                        <div style={{fontSize:13,color:GOLD,fontWeight:'bold',marginBottom:6}}>{item.stage}</div>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                          <span style={{fontSize:11,color:'#888'}}>{item.expectedDays} day{item.expectedDays>1?'s':''} est.</span>
                          <span style={{backgroundColor:GOLD,color:NAVY,padding:'4px 12px',borderRadius:4,fontSize:11,fontWeight:'bold'}}>Allocate →</span>
                        </div>
                        {item.notes && <div style={{fontSize:11,color:'#999',marginTop:6,fontStyle:'italic'}}>{item.notes}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Allocations */}
              {allocations.filter(a=>!a.completed).length > 0 && (
                <div style={{marginTop:24}}>
                  <h3 style={{color:NAVY,fontSize:18,margin:'0 0 14px'}}>Active Allocations</h3>
                  <div style={{overflowX:'auto'}}>
                    <table style={{width:'100%',borderCollapse:'collapse',minWidth:600}}>
                      <thead><tr style={{backgroundColor:NAVY,color:CREAM}}>
                        {['Carpenter','Site','Plot','Stage','Start','End','Status'].map(h=><th key={h} style={{padding:10,textAlign:'left',fontSize:11}}>{h}</th>)}
                      </tr></thead>
                      <tbody>
                        {allocations.filter(a=>!a.completed).sort((a,b)=>new Date(a.startDate)-new Date(b.startDate)).slice(0,10).map((alloc,idx) => {
                          const isAct = todayStr>=alloc.startDate && todayStr<=alloc.endDate;
                          const isOver = !alloc.completed && todayStr>alloc.endDate;
                          return (
                            <tr key={alloc.id} style={{backgroundColor:isOver?'#fff3e0':isAct?'#fffde7':idx%2===0?'#f9f9f9':'white',borderBottom:'1px solid #ddd'}}>
                              <td style={{padding:8,fontSize:12}}>{alloc.carpenter}</td>
                              <td style={{padding:8,fontSize:12}}>{alloc.site}</td>
                              <td style={{padding:8,fontSize:12}}>{alloc.plot}</td>
                              <td style={{padding:8,fontSize:12,fontWeight:'bold',color:GOLD}}>{alloc.stage}</td>
                              <td style={{padding:8,fontSize:12}}>{formatDate(alloc.startDate)}</td>
                              <td style={{padding:8,fontSize:12}}>{formatDate(alloc.endDate)}</td>
                              <td style={{padding:8,fontSize:12}}><span style={{fontWeight:'bold',color:isOver?'#d32f2f':isAct?GOLD:NAVY}}>{isOver?'Overdue':isAct?'Active':'Upcoming'}</span></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========== ADMIN WORK LOG ========== */}
          {user?.role === 'admin' && adminTab === 'work log' && (
            <div>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
                <button onClick={()=>{setAdminTab(prevAdminTab||'dashboard');}} style={{backgroundColor:'transparent',border:'none',cursor:'pointer',fontSize:22,color:NAVY,padding:0,lineHeight:1}}>←</button>
                <h2 style={{ color:NAVY, marginTop:0, marginBottom:0, fontSize:22 }}>Work Log</h2>
              </div>
              <div style={{ backgroundColor: NAVY, color: CREAM, padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                  <div style={{position:'relative'}}>
                    <label style={{ display:'block', marginBottom:'4px', fontSize:'11px' }}>Site</label>
                    <input type="text" placeholder="Search sites..." value={siteSearchOpen ? siteSearchText : (selectedSiteForLog || '')}
                      onFocus={() => { setSiteSearchOpen(true); setSiteSearchText(''); }}
                      onBlur={() => { setTimeout(() => setSiteSearchOpen(false), 200); }}
                      onChange={(e) => setSiteSearchText(e.target.value)}
                      style={{ width:'100%', padding:'10px', borderRadius:'4px', border:'1px solid '+GOLD, fontSize:13, boxSizing:'border-box', backgroundColor:'white', color:'#333' }} />
                    {siteSearchOpen && (
                      <div style={{position:'absolute', top:'100%', left:0, right:0, backgroundColor:'white', border:'1px solid #ddd', borderRadius:'0 0 6px 6px', maxHeight:220, overflowY:'auto', zIndex:999, boxShadow:'0 4px 12px rgba(0,0,0,0.15)'}}>
                        {BUILDERS.flatMap(b => b.sites.map(s => ({name:s.name, builder:b.name}))).filter(site => {
                          if(!siteSearchText.trim()) return true;
                          const q = siteSearchText.toLowerCase();
                          return site.name.toLowerCase().includes(q) || site.builder.toLowerCase().includes(q);
                        }).map(site => (
                          <div key={site.name} onClick={() => { setSelectedSiteForLog(site.name); setFormData({...formData, site:site.name, houseType:''}); setSiteSearchOpen(false); setSiteSearchText(''); }}
                            style={{padding:'10px 12px', cursor:'pointer', fontSize:13, color:'#333', borderBottom:'1px solid #f0f0f0'}}
                            onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#f5f0e0'}
                            onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='white'}>
                            {site.name} <span style={{color:'#999', fontSize:11}}>({site.builder})</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label style={{ display:'block', marginBottom:'4px', fontSize:'11px' }}>Plot</label>
                    <input type="text" value={formData.plot} onChange={(e) => setFormData({...formData, plot:e.target.value})}
                      style={{ width:'100%', padding:'10px', borderRadius:'4px', border:'1px solid '+GOLD, boxSizing:'border-box', fontSize:13 }} />
                  </div>
                  <div>
                    <label style={{ display:'block', marginBottom:'4px', fontSize:'11px' }}>House Type</label>
                    <select value={formData.houseType} onChange={(e) => setFormData({...formData, houseType:e.target.value})}
                      style={{ width:'100%', padding:'10px', borderRadius:'4px', border:'1px solid '+GOLD, fontSize:13 }}>
                      <option value="">Select</option>
                      {getSiteHousetypes(selectedSiteForLog).map(ht => <option key={ht} value={ht}>{ht}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ display:'block', marginBottom:'4px', fontSize:'11px' }}>Stage</label>
                    <select value={formData.stage} onChange={(e) => setFormData({...formData, stage:e.target.value})}
                      style={{ width:'100%', padding:'10px', borderRadius:'4px', border:'1px solid '+GOLD, fontSize:13 }}>
                      <option value="">Select</option>
                      {['Joists','Roof','First Fix','Drop Backs','Second Fix','Final','Snags'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display:'block', marginBottom:'4px', fontSize:'11px' }}>Expected Days</label>
                    <input type="number" min="1" max="365" placeholder="" value={formData.expectedDays} onChange={(e) => setFormData({...formData, expectedDays: e.target.value === '' ? '' : parseInt(e.target.value)||''})}
                      style={{ width:'100%', padding:'10px', borderRadius:'4px', border:'1px solid '+GOLD, boxSizing:'border-box', fontSize:13 }} />
                  </div>
                  <div>
                    <label style={{ display:'block', marginBottom:'4px', fontSize:'11px' }}>Priority</label>
                    <select value={formData.priority} onChange={(e) => setFormData({...formData, priority:e.target.value})}
                      style={{ width:'100%', padding:'10px', borderRadius:'4px', border:'1px solid '+GOLD, fontSize:13 }}>
                      <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom:'12px' }}>
                  <label style={{ display:'block', marginBottom:'4px', fontSize:'11px' }}>Notes</label>
                  <textarea value={formData.notes} onChange={(e) => setFormData({...formData, notes:e.target.value})}
                    style={{ width:'100%', padding:'10px', borderRadius:'4px', border:'1px solid '+GOLD, minHeight:'60px', boxSizing:'border-box', fontFamily:'inherit', fontSize:13 }} />
                </div>
                <div style={{ borderTop:'1px solid rgba(196,162,101,0.3)', paddingTop:'12px', marginBottom:'12px' }}>
                  <label style={{ display:'block', marginBottom:'8px', fontSize:'11px', color:GOLD }}>Allocate Now (optional)</label>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
                    <div>
                      <label style={{ display:'block', marginBottom:'4px', fontSize:'11px' }}>Start Date</label>
                      <input type="date" value={formData.allocStartDate||''} onChange={(e) => setFormData({...formData, allocStartDate:e.target.value, allocCarpenter:''})}
                        style={{ width:'100%', padding:'10px', borderRadius:'4px', border:'1px solid '+GOLD, boxSizing:'border-box', fontSize:13 }} />
                    </div>
                    <div>
                      <label style={{ display:'block', marginBottom:'4px', fontSize:'11px' }}>Carpenter</label>
                      <select value={formData.allocCarpenter||''} onChange={(e) => setFormData({...formData, allocCarpenter:e.target.value})}
                        style={{ width:'100%', padding:'10px', borderRadius:'4px', border:'1px solid '+GOLD, fontSize:13 }}>
                        <option value="">{formData.allocStartDate ? 'Select Carpenter' : 'Select date first'}</option>
                        {formData.allocStartDate && parseInt(formData.expectedDays) > 0 && CARPENTERS.filter(c => !c.status || c.status !== 'leave').map(c => {
                          const newEnd = new Date(formData.allocStartDate); newEnd.setDate(newEnd.getDate() + (parseInt(formData.expectedDays)||1) - 1);
                          const newEndStr = newEnd.toISOString().split('T')[0];
                          const busy = allocations.some(a => a.carpenter === c.name && !a.completed && a.startDate <= newEndStr && a.endDate >= formData.allocStartDate);
                          return <option key={c.id} value={c.name} disabled={busy}>{c.name} - {c.site}{busy ? ' (BUSY)' : ''}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <button type="button" onClick={() => {
                  if(selectedSiteForLog && formData.plot && formData.houseType && formData.stage){
                    const trimmedPlot = formData.plot.trim();
                    const trimmedHouseType = formData.houseType.trim();
                    const trimmedStage = formData.stage.trim();
                    if(!trimmedPlot || !trimmedHouseType || !trimmedStage) { alert('All required fields must be filled'); return; }
                    const days = parseInt(formData.expectedDays);
                    if(!days || days < 1 || days > 365) { alert('Please enter expected days (1-365)'); return; }
                    const builder=BUILDERS.find(b=>b.sites.some(s=>s.name===selectedSiteForLog));
                    const newId = Math.max(...workLog.map(w=>w.id),0)+1;
                    const shouldAllocate = formData.allocCarpenter && formData.allocStartDate;
                    const status = shouldAllocate ? 'allocated' : 'logged';
                    const allocTo = shouldAllocate ? formData.allocCarpenter : undefined;
                    setWorkLog([...workLog, {id:newId, site:selectedSiteForLog, builder:builder?builder.name:'', plot:trimmedPlot, houseType:trimmedHouseType, stage:trimmedStage, expectedDays:days, priority:formData.priority, notes:formData.notes.trim(), status:status, allocatedTo:allocTo||''}]);
                    addWorkLogEntry({site:selectedSiteForLog, builder:builder?builder.name:'', plot:trimmedPlot, house_type:trimmedHouseType, stage:trimmedStage, expected_days:days, priority:formData.priority, notes:formData.notes.trim(), status:status, allocated_to:allocTo||null}).catch(e=>console.error('DB error:',e));
                    if(shouldAllocate){
                      const ed=new Date(formData.allocStartDate); ed.setDate(ed.getDate()+days-1);
                      const edStr=ed.toISOString().split('T')[0];
                      setAllocations([...allocations, {id:Math.max(...allocations.map(a=>a.id),0)+1, carpenter:formData.allocCarpenter, site:selectedSiteForLog, plot:trimmedPlot, houseType:trimmedHouseType, stage:trimmedStage, startDate:formData.allocStartDate, endDate:edStr, completed:false, delayed:false, delayDays:0}]);
                      addAllocation({carpenter:formData.allocCarpenter, site:selectedSiteForLog, plot:trimmedPlot, house_type:trimmedHouseType, stage:trimmedStage, start_date:formData.allocStartDate, end_date:edStr, completed:false, delayed:false, delay_days:0}).catch(e=>console.error('DB error:',e));
                    }
                    setFormData({site:'',plot:'',houseType:'',stage:'',expectedDays:'',priority:'medium',notes:'',allocCarpenter:'',allocStartDate:''});
                    setSelectedSiteForLog(''); setSiteSearchText('');
                    setSuccessMsg(shouldAllocate ? 'Work logged and allocated to '+formData.allocCarpenter : 'Work logged successfully'); setTimeout(()=>setSuccessMsg(''),2500);
                  }
                }} style={{ backgroundColor:GOLD, color:NAVY, padding:'10px 20px', border:'none', borderRadius:'4px', cursor:'pointer', fontWeight:'bold', fontSize:14 }}>
                  {formData.allocCarpenter && formData.allocStartDate ? 'Log & Allocate Work' : 'Log Work'}
                </button>
              </div>
              <div style={{marginBottom:14}}>
                <input type="text" placeholder="Search by site, plot, type, stage, carpenter..." value={workLogSearch} onChange={(e)=>setWorkLogSearch(e.target.value)}
                  style={{width:'100%',padding:'12px 16px',borderRadius:8,border:'1px solid #ddd',fontSize:14,boxSizing:'border-box',backgroundColor:'white'}} />
              </div>
              <div style={{overflowX:'auto'}}>
              <table style={{ width:'100%', borderCollapse:'collapse', minWidth:'700px' }}>
                <thead><tr style={{ backgroundColor:NAVY, color:CREAM }}>
                  {['Site','Plot','Type','Stage','Days','Priority','Status','Allocated To'].map(h => <th key={h} style={{ padding:'10px', textAlign:'left', fontSize:'11px' }}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {workLog.filter(item => {
                    if(!workLogSearch.trim()) return true;
                    const s = workLogSearch.toLowerCase();
                    return (item.site||'').toLowerCase().includes(s) || (item.plot||'').toLowerCase().includes(s) || (item.houseType||'').toLowerCase().includes(s) || (item.stage||'').toLowerCase().includes(s) || (item.allocatedTo||'').toLowerCase().includes(s) || (item.status||'').toLowerCase().includes(s) || (item.priority||'').toLowerCase().includes(s);
                  }).map((item, idx) => (
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
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
                <button onClick={()=>{setAdminTab(prevAdminTab||'dashboard');}} style={{backgroundColor:'transparent',border:'none',cursor:'pointer',fontSize:22,color:NAVY,padding:0,lineHeight:1}}>←</button>
                <h2 style={{ color:NAVY, marginTop:0, marginBottom:0, fontSize:22 }}>Allocate Work</h2>
              </div>
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
                          <div style={{ display:'flex', gap:'5px', flexWrap:'wrap', alignItems:'center' }}>
                            <select value={allocateCarpenter} onChange={(e) => {
                              const name = e.target.value;
                              setAllocateCarpenter(name);
                              if(name){
                                const auto = findEarliestFreeDay(name, item.expectedDays || 1);
                                if(auto) setAllocateStartDate(auto);
                              }
                            }} style={{ padding:'6px', borderRadius:'3px', border:'1px solid '+GOLD, fontSize:'11px', minWidth:'140px' }}>
                              <option value="">Select Carpenter</option>
                              {CARPENTERS.filter(c => !c.status || c.status !== 'leave').map(c => {
                                const earliest = findEarliestFreeDay(c.name, item.expectedDays || 1);
                                const label = earliest ? ' (free '+new Date(earliest).toLocaleDateString('en-GB',{day:'numeric',month:'short'})+')' : '';
                                return <option key={c.id} value={c.name}>{c.name}{label}</option>;
                              })}
                            </select>
                            <input type="date" value={allocateStartDate} onChange={(e) => setAllocateStartDate(e.target.value)} style={{ padding:'6px', borderRadius:'3px', border:'1px solid '+GOLD, fontSize:'11px' }} title="Override start date (admin only)" />
                            <button onClick={() => {
                              if(allocateCarpenter.trim() && allocateStartDate){
                                const trimmedCarpenter = allocateCarpenter.trim();
                                const ed=new Date(allocateStartDate); ed.setDate(ed.getDate()+(item.expectedDays||1)-1);
                                const edStr = ed.toISOString().split('T')[0];
                                const hasOverlap = allocations.some(a => a.carpenter === trimmedCarpenter && !a.completed && a.startDate <= edStr && a.endDate >= allocateStartDate);
                                if(hasOverlap){ alert(trimmedCarpenter + ' already has work booked during those dates.'); return; }
                                setAllocations([...allocations, {id:Math.max(...allocations.map(a=>a.id),0)+1, carpenter:trimmedCarpenter, site:item.site, plot:item.plot, houseType:item.houseType, stage:item.stage, startDate:allocateStartDate, endDate:edStr, completed:false, delayed:false, delayDays:0}]);
                                addAllocation({carpenter:trimmedCarpenter, site:item.site, plot:item.plot, house_type:item.houseType, stage:item.stage, start_date:allocateStartDate, end_date:edStr, completed:false, delayed:false, delay_days:0}).catch(e=>console.error('DB error:',e));
                                setWorkLog(workLog.map(w => w.id===item.id ? {...w, status:'allocated', allocatedTo:trimmedCarpenter} : w));
                                updateWorkLogEntry(item.id, {status:'allocated', allocated_to:trimmedCarpenter}).catch(e=>console.error('DB error:',e));
                                setAllocateId(null); setAllocateCarpenter(''); setAllocateStartDate('');
                                setSuccessMsg('Work allocated to '+trimmedCarpenter+' starting '+new Date(allocateStartDate).toLocaleDateString('en-GB')); setTimeout(()=>setSuccessMsg(''),2500);
                              } else { alert('Select a carpenter'); }
                            }} style={{ backgroundColor:GOLD, color:NAVY, padding:'10px 16px', border:'none', borderRadius:'3px', cursor:'pointer', fontSize:'13', fontWeight:'bold' }}>Confirm</button>
                            <button onClick={() => {setAllocateId(null);setAllocateCarpenter('');setAllocateStartDate('');}} style={{ backgroundColor:'#999', color:'white', padding:'10px 16px', border:'none', borderRadius:'3px', cursor:'pointer', fontSize:'13' }}>Cancel</button>
                          </div>
                        ) : (
                          <button onClick={() => {setAllocateId(item.id);setAllocateCarpenter('');setAllocateStartDate('');}} style={{ backgroundColor:GOLD, color:NAVY, padding:'10px 16px', border:'none', borderRadius:'3px', cursor:'pointer', fontSize:'13', fontWeight:'bold' }}>Allocate</button>
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
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
                <button onClick={()=>{setAdminTab(prevAdminTab||'dashboard');}} style={{backgroundColor:'transparent',border:'none',cursor:'pointer',fontSize:22,color:NAVY,padding:0,lineHeight:1}}>←</button>
                <h2 style={{ color:NAVY, marginTop:0, marginBottom:0, fontSize:22 }}>Schedule</h2>
              </div>
              <div style={{ marginBottom:'15px' }}>
                <button onClick={() => setScheduleView('gantt')} style={{ backgroundColor: scheduleView==='gantt'?GOLD:'#ccc', color: scheduleView==='gantt'?NAVY:'black', padding:'10px 16px', margin:'0 5px 0 0', border:'none', borderRadius:'4px', cursor:'pointer', fontSize:13 }}>Gantt</button>
                <button onClick={() => setScheduleView('list')} style={{ backgroundColor: scheduleView==='list'?GOLD:'#ccc', color: scheduleView==='list'?NAVY:'black', padding:'10px 16px', border:'none', borderRadius:'4px', cursor:'pointer', fontSize:13 }}>List</button>
              </div>
              {scheduleView === 'gantt' && (() => {
                // Two-week rolling view: current + next week (weekdays only)
                const today = new Date();
                const monday = new Date(today);
                monday.setDate(today.getDate() - ((today.getDay()+6)%7) + (scheduleWeekOffset*7));
                const ganttDates = [];
                for(let w=0; w<2; w++){
                  for(let i=0; i<5; i++){
                    const d = new Date(monday); d.setDate(monday.getDate()+(w*7)+i);
                    ganttDates.push(d);
                  }
                }
                const weekRangeLabel = ganttDates[0].toLocaleDateString('en-GB',{day:'numeric',month:'short'}) + ' – ' + ganttDates[9].toLocaleDateString('en-GB',{day:'numeric',month:'short'});
                const uniqueCarps = CARPENTERS.map(c=>c.name);
                return (
                <div style={{ backgroundColor:'white', padding:'15px', borderRadius:'8px' }}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12,gap:8,flexWrap:'wrap'}}>
                    <div style={{fontSize:13,color:'#666'}}>{weekRangeLabel}</div>
                    <div style={{display:'flex',gap:6,alignItems:'center'}}>
                      <button onClick={()=>setScheduleWeekOffset(w=>w-1)} style={{backgroundColor:NAVY,color:CREAM,border:'none',padding:'8px 14px',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:14}}>←</button>
                      <button onClick={()=>setScheduleWeekOffset(0)} style={{backgroundColor:scheduleWeekOffset===0?GOLD:NAVY,color:scheduleWeekOffset===0?NAVY:CREAM,border:'none',padding:'8px 14px',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:12}}>This Week</button>
                      <button onClick={()=>setScheduleWeekOffset(w=>w+1)} style={{backgroundColor:NAVY,color:CREAM,border:'none',padding:'8px 14px',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:14}}>→</button>
                    </div>
                  </div>
                  <div style={{overflowX:'auto'}}>
                  <div style={{ display:'flex', minWidth:720 }}>
                    <div style={{ width:'130px', flexShrink:0 }}>
                      <div style={{ fontWeight:'bold', padding:'8px', borderBottom:'2px solid '+NAVY, minHeight:'36px', fontSize:12 }}>Carpenter</div>
                      {uniqueCarps.map(carp => <div key={carp} style={{ padding:'8px', borderBottom:'1px solid #ddd', minHeight:'52px', fontSize:'12px', display:'flex', alignItems:'center' }}>{carp}</div>)}
                    </div>
                    <div style={{ display:'flex', flex:1 }}>
                      {ganttDates.map((date, i) => {
                        const ds = date.toISOString().split('T')[0];
                        const isToday = ds === todayStr;
                        const isWeekStart = i===0 || i===5;
                        const weekLabel = i===0 ? (scheduleWeekOffset===0?'THIS WEEK':'WEEK 1') : i===5 ? (scheduleWeekOffset===0?'NEXT WEEK':'WEEK 2') : '';
                        return (<div key={i} style={{ flex:1, minWidth:'60px', flexShrink:0, borderRight:'1px solid #eee', borderLeft: isWeekStart?'2px solid '+NAVY:'none', backgroundColor:isToday?'#fffde7':'white' }}>
                          {weekLabel && <div style={{fontSize:9,fontWeight:'bold',color:GOLD,textAlign:'center',padding:'2px 0',backgroundColor:NAVY}}>{weekLabel}</div>}
                          {!weekLabel && <div style={{fontSize:9,padding:'2px 0',backgroundColor:NAVY}}>&nbsp;</div>}
                          <div style={{ fontWeight:'bold', padding:'4px', borderBottom:'1px solid #ddd', fontSize:'10px', textAlign:'center', color:isToday?GOLD:'inherit', backgroundColor:isToday?NAVY:'transparent' }}>
                            {isToday?<span style={{color:GOLD}}>{['Mon','Tue','Wed','Thu','Fri'][i%5]} {date.getDate()}</span>:<>{['Mon','Tue','Wed','Thu','Fri'][i%5]} {date.getDate()}</>}
                          </div>
                          {uniqueCarps.map(carp => {
                            const hasDayOff = dayOffRequests.some(d=>d.carpenter===carp && d.status==='approved' && ds>=d.startDate && ds<=d.endDate);
                            if(hasDayOff) {
                              const matchingHoliday = dayOffRequests.find(d=>d.carpenter===carp && d.status==='approved' && ds>=d.startDate && ds<=d.endDate);
                              return (<div key={carp} onClick={()=>{
                                if(matchingHoliday && confirm('Remove holiday for '+carp+' ('+formatDate(matchingHoliday.startDate)+' → '+formatDate(matchingHoliday.endDate)+')?')){
                                  setDayOffRequests(prev=>prev.filter(d=>d.id!==matchingHoliday.id));
                                  setSuccessMsg('Holiday removed for '+carp);setTimeout(()=>setSuccessMsg(''),2500);
                                }
                              }} style={{ minHeight:'52px', padding:'4px', borderBottom:'1px solid #eee', fontSize:'9px',
                                backgroundColor:'#ff9800', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'bold',
                                textAlign:'center', cursor:'pointer' }}>OFF</div>);
                            }
                            const dayAllocs = allocations.filter(a => a.carpenter===carp && ds>=a.startDate && ds<=a.endDate);
                            const af = dayAllocs[0] || null;
                            const getCellColor = (a) => {const s=a.completed?'complete':a.delayed?'delayed':todayStr>=a.startDate&&todayStr<=a.endDate?'active':'upcoming';return{complete:{bg:'#2e7d32',fg:'white'},delayed:{bg:'#d32f2f',fg:'white'},active:{bg:GOLD,fg:NAVY},upcoming:{bg:NAVY,fg:'white'}}[s];};
                            const openCellEdit = (alloc) => {
                                setEditingCell({carpenter:carp, date:ds, allocId: alloc?alloc.id:null});
                                setCellSite(alloc?alloc.site:'');
                                setCellPlot(alloc?alloc.plot:'');
                                setCellHouseType(alloc?alloc.houseType:'');
                                setCellStage(alloc?alloc.stage:'');
                                setCellHolidayMode(false);
                                setCellHolidayEnd(ds);
                                if(alloc){
                                  const sd=new Date(alloc.startDate), ed=new Date(alloc.endDate);
                                  let n=0; for(let cur=new Date(sd); cur<=ed; cur.setDate(cur.getDate()+1)) if(cur.getDay()!==0&&cur.getDay()!==6) n++;
                                  setCellDays(Math.max(1,n));
                                } else setCellDays(1);
                            };
                            if(dayAllocs.length===0){
                              return (<div key={carp} onClick={()=>openCellEdit(null)}
                                style={{ minHeight:'52px', padding:'4px', borderBottom:'1px solid #eee', fontSize:'9px',
                                backgroundColor:'#fafafa', color:'#ccc', display:'flex', alignItems:'center', justifyContent:'center',
                                cursor:'pointer', lineHeight:'1.2', textAlign:'center', flexDirection:'column', margin:2, borderRadius:3 }}>
                                <span style={{opacity:0.4,fontSize:14}}>+</span>
                              </div>);
                            }
                            return (<div key={carp} style={{ minHeight:'52px', borderBottom:'1px solid #eee', display:'flex', flexDirection:'column', gap:1, margin:2 }}>
                              {dayAllocs.map((a,ai) => {const cc=getCellColor(a); return (
                                <div key={ai} onClick={()=>openCellEdit(a)}
                                  style={{ flex:1, padding:'2px 4px', fontSize:'8px', backgroundColor:cc.bg, color:cc.fg, display:'flex', alignItems:'center', justifyContent:'center',
                                  fontWeight:'bold', cursor:'pointer', lineHeight:'1.1', textAlign:'center', flexDirection:'column', borderRadius:2, minHeight:dayAllocs.length>1?'22px':'46px' }}>
                                  <span>{a.site.length>9?a.site.substring(0,8)+'…':a.site}</span>
                                  <span style={{fontSize:'7px',opacity:0.85}}>P{a.plot} · {a.stage.length>8?a.stage.substring(0,7)+'…':a.stage}</span>
                                </div>);
                              })}
                              <div onClick={(e)=>{e.stopPropagation();openCellEdit(null);}}
                                style={{ padding:'1px 4px', fontSize:'9px', backgroundColor:'#e8f5e9', color:'#2e7d32', display:'flex', alignItems:'center', justifyContent:'center',
                                fontWeight:'bold', cursor:'pointer', borderRadius:2, minHeight:'16px' }}>+</div>
                            </div>);
                          })}
                        </div>);
                      })}
                    </div>
                  </div>
                  </div>
                  <div style={{marginTop:10,fontSize:11,display:'flex',gap:12,flexWrap:'wrap',color:'#666'}}>
                    <span><span style={{display:'inline-block',width:12,height:12,backgroundColor:GOLD,borderRadius:2,marginRight:4,verticalAlign:'middle'}}></span>In Progress</span>
                    <span><span style={{display:'inline-block',width:12,height:12,backgroundColor:'#2e7d32',borderRadius:2,marginRight:4,verticalAlign:'middle'}}></span>Complete</span>
                    <span><span style={{display:'inline-block',width:12,height:12,backgroundColor:'#d32f2f',borderRadius:2,marginRight:4,verticalAlign:'middle'}}></span>Delayed</span>
                    <span><span style={{display:'inline-block',width:12,height:12,backgroundColor:NAVY,borderRadius:2,marginRight:4,verticalAlign:'middle'}}></span>Upcoming</span>
                    <span><span style={{display:'inline-block',width:12,height:12,backgroundColor:'#ff9800',borderRadius:2,marginRight:4,verticalAlign:'middle'}}></span>Holiday</span>
                    <span style={{fontStyle:'italic',color:'#888'}}>Tap any day to edit</span>
                  </div>
                  {editingCell && (
                    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,backgroundColor:'rgba(0,0,0,0.5)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:20}} onClick={()=>setEditingCell(null)}>
                      <div onClick={e=>e.stopPropagation()} style={{backgroundColor:'white',borderRadius:12,padding:22,maxWidth:440,width:'100%',boxShadow:'0 20px 60px rgba(0,0,0,0.3)',maxHeight:'90vh',overflowY:'auto'}}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
                          <h3 style={{margin:0,color:NAVY,fontSize:18}}>{cellHolidayMode ? 'Book Holiday' : editingCell.allocId ? 'Edit Job' : 'Assign Job'}</h3>
                          <button onClick={()=>setEditingCell(null)} style={{background:'none',border:'none',fontSize:22,cursor:'pointer',color:'#999'}}>×</button>
                        </div>
                        <div style={{fontSize:13,marginBottom:14,color:'#666'}}>
                          <strong style={{color:NAVY}}>{editingCell.carpenter}</strong> · {formatDate(editingCell.date)}
                        </div>
                        {/* Toggle between Job and Holiday mode */}
                        {!editingCell.allocId && (
                          <div style={{display:'flex',gap:0,marginBottom:16,borderRadius:6,overflow:'hidden',border:'1px solid #ddd'}}>
                            <button onClick={()=>setCellHolidayMode(false)} style={{flex:1,padding:'10px 0',border:'none',cursor:'pointer',fontSize:13,fontWeight:600,backgroundColor:!cellHolidayMode?NAVY:'#f5f5f5',color:!cellHolidayMode?CREAM:'#666',transition:'.2s'}}>Assign Job</button>
                            <button onClick={()=>setCellHolidayMode(true)} style={{flex:1,padding:'10px 0',border:'none',cursor:'pointer',fontSize:13,fontWeight:600,backgroundColor:cellHolidayMode?'#ff9800':'#f5f5f5',color:cellHolidayMode?'white':'#666',transition:'.2s'}}>Book Holiday</button>
                          </div>
                        )}
                        {cellHolidayMode ? (
                          <>
                            <div style={{background:'#fff8e1',borderRadius:8,padding:16,marginBottom:16,border:'1px solid #ffe082'}}>
                              <div style={{fontSize:13,fontWeight:600,color:'#e65100',marginBottom:8,display:'flex',alignItems:'center',gap:6}}>
                                Holiday for {editingCell.carpenter}
                              </div>
                              <div style={{fontSize:12,color:'#666'}}>Book time off directly — no request needed. The schedule will show this carpenter as OFF for the selected dates.</div>
                            </div>
                            <div style={{marginBottom:12}}>
                              <label style={{fontSize:11,color:'#666',display:'block',marginBottom:4,fontWeight:600}}>Start Date</label>
                              <input type="date" value={editingCell.date} disabled style={{width:'100%',padding:10,border:'1px solid #e0e0e0',borderRadius:6,fontSize:13,boxSizing:'border-box',backgroundColor:'#f9f9f9',color:'#333'}} />
                            </div>
                            <div style={{marginBottom:12}}>
                              <label style={{fontSize:11,color:'#666',display:'block',marginBottom:4,fontWeight:600}}>End Date</label>
                              <input type="date" value={cellHolidayEnd} min={editingCell.date} onChange={e=>setCellHolidayEnd(e.target.value)} style={{width:'100%',padding:10,border:'1px solid #ccc',borderRadius:6,fontSize:13,boxSizing:'border-box'}} />
                            </div>
                            {cellHolidayEnd >= editingCell.date && (() => {
                              const sd = new Date(editingCell.date), ed = new Date(cellHolidayEnd);
                              let weekdays = 0;
                              for(let cur = new Date(sd); cur <= ed; cur.setDate(cur.getDate()+1)) if(cur.getDay()!==0 && cur.getDay()!==6) weekdays++;
                              return <div style={{fontSize:12,color:'#e65100',marginBottom:14,padding:'8px 12px',background:'#fff3e0',borderRadius:6,fontWeight:600}}>
                                {weekdays} working day{weekdays!==1?'s':''} off · {formatDate(editingCell.date)} → {formatDate(cellHolidayEnd)}
                              </div>;
                            })()}
                            <div style={{display:'flex',gap:8}}>
                              <button onClick={()=>{
                                if(cellHolidayEnd < editingCell.date){alert('End date must be on or after the start date.');return;}
                                const sd = new Date(editingCell.date), ed = new Date(cellHolidayEnd);
                                let weekdays = 0;
                                for(let cur = new Date(sd); cur <= ed; cur.setDate(cur.getDate()+1)) if(cur.getDay()!==0 && cur.getDay()!==6) weekdays++;
                                const newHoliday = {
                                  id: Date.now(),
                                  carpenter: editingCell.carpenter,
                                  startDate: editingCell.date,
                                  endDate: cellHolidayEnd,
                                  days: weekdays,
                                  reason: 'Booked by admin',
                                  status: 'approved',
                                  requestedDate: todayStr,
                                  bookedByAdmin: true
                                };
                                setDayOffRequests(prev => [...prev, newHoliday]);
                                setSuccessMsg('Holiday booked for ' + editingCell.carpenter + ' (' + weekdays + ' day' + (weekdays!==1?'s':'') + ')');
                                setTimeout(()=>setSuccessMsg(''),3000);
                                setEditingCell(null);
                              }} style={{flex:1,backgroundColor:'#ff9800',color:'white',padding:'12px',border:'none',borderRadius:6,cursor:'pointer',fontWeight:'bold',fontSize:14}}>
                                Confirm Holiday
                              </button>
                              <button onClick={()=>setEditingCell(null)} style={{backgroundColor:'#999',color:'white',padding:'12px 14px',border:'none',borderRadius:6,cursor:'pointer',fontSize:13}}>Cancel</button>
                            </div>
                          </>
                        ) : (
                          <>
                        <div style={{marginBottom:10}}>
                          <label style={{fontSize:11,color:'#666',display:'block',marginBottom:4}}>Site</label>
                          <input type="text" list="siteListEditCell" value={cellSite} onChange={e=>{setCellSite(e.target.value);setCellHouseType('');}} placeholder="Type or pick a site" style={{width:'100%',padding:10,border:'1px solid #ccc',borderRadius:4,fontSize:13,boxSizing:'border-box'}} />
                          <datalist id="siteListEditCell">
                            {BUILDERS.flatMap(b=>b.sites.map(s=><option key={s.name} value={s.name} />))}
                          </datalist>
                        </div>
                        <div style={{marginBottom:10}}>
                          <label style={{fontSize:11,color:'#666',display:'block',marginBottom:4}}>Plot</label>
                          <input type="text" list="plotListEditCell" value={cellPlot} onChange={e=>setCellPlot(e.target.value)} placeholder="e.g. 12" style={{width:'100%',padding:10,border:'1px solid #ccc',borderRadius:4,fontSize:13,boxSizing:'border-box'}} />
                          <datalist id="plotListEditCell">
                            {Array.from({length:200},(_,i)=>i+1).map(n=><option key={n} value={String(n)} />)}
                          </datalist>
                        </div>
                        <div style={{marginBottom:10}}>
                          <label style={{fontSize:11,color:'#666',display:'block',marginBottom:4}}>House Type</label>
                          <input type="text" list="houseTypeListEditCell" value={cellHouseType} onChange={e=>setCellHouseType(e.target.value)} placeholder={cellSite?'Type or pick a house type':'Type a house type or pick a site first'} style={{width:'100%',padding:10,border:'1px solid #ccc',borderRadius:4,fontSize:13,boxSizing:'border-box'}} />
                          <datalist id="houseTypeListEditCell">
                            {(cellSite?(BUILDERS.flatMap(b=>b.sites).find(s=>s.name===cellSite)?.housetypes||[]):Array.from(new Set(BUILDERS.flatMap(b=>b.sites.flatMap(s=>s.housetypes||[]))))).map(h=><option key={h} value={h} />)}
                          </datalist>
                        </div>
                        <div style={{marginBottom:10}}>
                          <label style={{fontSize:11,color:'#666',display:'block',marginBottom:4}}>Stage</label>
                          <select value={cellStage} onChange={e=>setCellStage(e.target.value)} style={{width:'100%',padding:10,border:'1px solid #ccc',borderRadius:4,fontSize:13,boxSizing:'border-box'}}>
                            <option value="">Select stage</option>
                            {['Joists','Main Roof','Low Roof','First Fix','First Fix — Drop Backs','Second Fix','Finals','Snagging'].map(s=><option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                        <div style={{marginBottom:14}}>
                          <label style={{fontSize:11,color:'#666',display:'block',marginBottom:4}}>Days Required</label>
                          <select value={cellDays} onChange={e=>setCellDays(parseInt(e.target.value))} style={{width:'100%',padding:10,border:'1px solid #ccc',borderRadius:4,fontSize:13,boxSizing:'border-box'}}>
                            {[1,2,3,4,5,6,7,8,9,10].map(n=><option key={n} value={n}>{n} day{n>1?'s':''}</option>)}
                          </select>
                          {cellDays>1 && (() => {
                            const start = new Date(editingCell.date);
                            let end = new Date(start); let added = 1;
                            while(added<cellDays){ end.setDate(end.getDate()+1); if(end.getDay()!==0&&end.getDay()!==6) added++; }
                            return <div style={{fontSize:11,color:'#666',marginTop:4}}>Spans {formatDate(start.toISOString().split('T')[0])} → {formatDate(end.toISOString().split('T')[0])} ({cellDays} weekdays)</div>;
                          })()}
                        </div>
                        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                          <button onClick={()=>{
                            if(!cellSite||!cellPlot||!cellHouseType||!cellStage){alert('Fill in all fields');return;}
                            const builder = BUILDERS.find(b=>b.sites.some(s=>s.name===cellSite))?.name || '';
                            // compute endDate by adding (cellDays-1) weekdays
                            const startD = new Date(editingCell.date);
                            const endD = new Date(startD);
                            let added = 1;
                            while(added<cellDays){ endD.setDate(endD.getDate()+1); if(endD.getDay()!==0&&endD.getDay()!==6) added++; }
                            const endDateStr = endD.toISOString().split('T')[0];
                            if(editingCell.allocId){
                              setAllocations(allocations.map(a=>a.id===editingCell.allocId?{...a,site:cellSite,plot:cellPlot,houseType:cellHouseType,stage:cellStage,endDate:endDateStr}:a));
                              updateAllocation(editingCell.allocId,{site:cellSite,plot:cellPlot,house_type:cellHouseType,stage:cellStage,end_date:endDateStr}).catch(e=>console.error('DB:',e));
                              setSuccessMsg('Job updated');
                            } else {
                              // Multiple jobs per day allowed (e.g. drop backs + first fix)
                              const newId = Math.max(...allocations.map(a=>a.id),0)+1;
                              const newAlloc = {id:newId,carpenter:editingCell.carpenter,site:cellSite,plot:cellPlot,houseType:cellHouseType,stage:cellStage,startDate:editingCell.date,endDate:endDateStr,completed:false,delayed:false,delayDays:0,builder};
                              setAllocations([...allocations,newAlloc]);
                              addAllocation({carpenter:editingCell.carpenter,site:cellSite,plot:cellPlot,house_type:cellHouseType,stage:cellStage,start_date:editingCell.date,end_date:endDateStr,completed:false,delayed:false,delay_days:0}).catch(e=>console.error('DB:',e));
                              setSuccessMsg('Job assigned to '+editingCell.carpenter+(cellDays>1?' ('+cellDays+' days)':''));
                            }
                            setTimeout(()=>setSuccessMsg(''),2500);
                            setEditingCell(null);
                          }} style={{flex:1,backgroundColor:GOLD,color:NAVY,padding:'12px',border:'none',borderRadius:6,cursor:'pointer',fontWeight:'bold',fontSize:14}}>{editingCell.allocId?'Save Changes':'Assign Job'}</button>
                          {editingCell.allocId && (
                            <button onClick={()=>{
                              if(!confirm('Remove this job from the schedule?'))return;
                              setAllocations(allocations.filter(a=>a.id!==editingCell.allocId));
                              updateAllocation(editingCell.allocId,{deleted:true}).catch(e=>console.error('DB:',e));
                              setSuccessMsg('Job removed');setTimeout(()=>setSuccessMsg(''),2500);
                              setEditingCell(null);
                            }} style={{backgroundColor:'#ffebee',color:'#c62828',padding:'12px 14px',border:'1px solid #ef9a9a',borderRadius:6,cursor:'pointer',fontWeight:'bold',fontSize:13}}>Remove</button>
                          )}
                          <button onClick={()=>setEditingCell(null)} style={{backgroundColor:'#999',color:'white',padding:'12px 14px',border:'none',borderRadius:6,cursor:'pointer',fontSize:13}}>Cancel</button>
                        </div>
                          </>
                        )}
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
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
                <button onClick={()=>{setAdminTab(prevAdminTab||'dashboard');}} style={{backgroundColor:'transparent',border:'none',cursor:'pointer',fontSize:22,color:NAVY,padding:0,lineHeight:1}}>←</button>
                <h2 style={{ color:NAVY, marginTop:0, marginBottom:0, fontSize:22 }}>Carpenter Roster</h2>
              </div>
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
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
                <button onClick={()=>{setAdminTab(prevAdminTab||'dashboard');}} style={{backgroundColor:'transparent',border:'none',cursor:'pointer',fontSize:22,color:NAVY,padding:0,lineHeight:1}}>←</button>
                <h2 style={{ color:NAVY, marginTop:0, marginBottom:0, fontSize:22 }}>Delayed Works</h2>
              </div>
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
                      {d.status==='active' && <button onClick={()=>setDelays(delays.map(dd=>dd.id===d.id?{...dd,status:'resolved'}:dd))} style={{marginTop:8,backgroundColor:'#2e7d32',color:'white',padding:'10px 16px',border:'none',borderRadius:4,cursor:'pointer',fontSize:13,fontWeight:'bold'}}>Mark Resolved</button>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========== ADMIN FIXINGS ========== */}
          {user?.role === 'admin' && adminTab === 'fixings' && (
            <div>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
                <button onClick={()=>{setAdminTab(prevAdminTab||'dashboard');}} style={{backgroundColor:'transparent',border:'none',cursor:'pointer',fontSize:22,color:NAVY,padding:0,lineHeight:1}}>←</button>
                <h2 style={{ color:NAVY, marginTop:0, marginBottom:0, fontSize:22 }}>Fixings and Materials Requests</h2>
              </div>
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
                            <button onClick={()=>{setAllFixingRequests(allFixingRequests.map(r=>r.id===req.id?{...r,status:'approved'}:r));setSuccessMsg('Approved');setTimeout(()=>setSuccessMsg(''),2500);}} style={{backgroundColor:'#2e7d32',color:'white',padding:'10px 16px',border:'none',borderRadius:4,cursor:'pointer',fontSize:13,fontWeight:'bold'}}>Approve</button>
                            <button onClick={()=>{setAllFixingRequests(allFixingRequests.map(r=>r.id===req.id?{...r,status:'denied'}:r));setSuccessMsg('Denied');setTimeout(()=>setSuccessMsg(''),2500);}} style={{backgroundColor:'#d32f2f',color:'white',padding:'10px 16px',border:'none',borderRadius:4,cursor:'pointer',fontSize:13,fontWeight:'bold'}}>Deny</button>
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
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
                <button onClick={()=>{setAdminTab(prevAdminTab||'dashboard');}} style={{backgroundColor:'transparent',border:'none',cursor:'pointer',fontSize:22,color:NAVY,padding:0,lineHeight:1}}>←</button>
                <h2 style={{ color:NAVY, marginTop:0, marginBottom:0, fontSize:22 }}>Notifications and Signing</h2>
              </div>

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
                <div style={{marginBottom:12}}>
                  <label style={{fontSize:13, fontWeight:600, color:NAVY, marginBottom:6, display:'block'}}>Attach Photo (optional)</label>
                  <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>
                    <label style={{
                      backgroundColor:NAVY, color:CREAM, border:'none', borderRadius:8,
                      padding:'10px 16px', fontSize:14, fontWeight:'bold', cursor:'pointer', display:'inline-flex', alignItems:'center', gap:6
                    }}>
                      Take Photo
                      <input type="file" accept="image/*" capture="environment" style={{display:'none'}}
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) { setNotifPhoto(file); setNotifPhotoPreview(URL.createObjectURL(file)); }
                        }}
                      />
                    </label>
                    <label style={{
                      backgroundColor:'white', color:NAVY, border:'2px solid '+NAVY, borderRadius:8,
                      padding:'10px 16px', fontSize:14, fontWeight:'bold', cursor:'pointer', display:'inline-flex', alignItems:'center', gap:6
                    }}>
                      Upload Photo
                      <input type="file" accept="image/*" style={{display:'none'}}
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) { setNotifPhoto(file); setNotifPhotoPreview(URL.createObjectURL(file)); }
                        }}
                      />
                    </label>
                  </div>
                  {notifPhotoPreview && (
                    <div style={{marginTop:8, position:'relative', display:'inline-block'}}>
                      <img src={notifPhotoPreview} alt="Preview" style={{maxWidth:200, maxHeight:150, borderRadius:6, border:'1px solid #ddd'}} />
                      <button onClick={() => { setNotifPhoto(null); setNotifPhotoPreview(null); }} style={{
                        position:'absolute', top:-8, right:-8, backgroundColor:'#e53935', color:'white',
                        border:'none', borderRadius:'50%', width:24, height:24, fontSize:14, cursor:'pointer', lineHeight:'22px', textAlign:'center'
                      }}>×</button>
                    </div>
                  )}
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
                      {notif.photo_url && (
                        <img src={notif.photo_url} alt="Attached" style={{maxWidth:'100%', maxHeight:200, borderRadius:6, marginBottom:12, border:'1px solid #ddd'}} />
                      )}
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
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
                <button onClick={()=>{setAdminTab(prevAdminTab||'dashboard');}} style={{backgroundColor:'transparent',border:'none',cursor:'pointer',fontSize:22,color:NAVY,padding:0,lineHeight:1}}>←</button>
                <h2 style={{ color:NAVY, marginTop:0, marginBottom:0, fontSize:22 }}>Price Lists</h2>
              </div>
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
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
                <button onClick={()=>{setAdminTab(prevAdminTab||'dashboard');}} style={{backgroundColor:'transparent',border:'none',cursor:'pointer',fontSize:22,color:NAVY,padding:0,lineHeight:1}}>←</button>
                <h2 style={{ color:NAVY, marginTop:0, marginBottom:0, fontSize:22 }}>Documents</h2>
              </div>
              {Object.entries(DOCUMENTS).map(([site, categories]) => (
                <div key={site} style={{ marginBottom:'15px', backgroundColor:'white', padding:'15px', borderRadius:'8px', border:'1px solid #ddd' }}>
                  <h3 style={{ color:NAVY, margin:'0 0 10px 0', fontSize:16 }}>{site}</h3>
                  {Object.entries(categories).map(([cat, docs]) => (
                    <div key={cat} style={{ marginLeft:'10px', marginBottom:'10px', padding:'10px', backgroundColor:'#f9f9f9', borderRadius:'4px' }}>
                      <h4 style={{ color:'#333', margin:'0 0 8px 0', fontSize:14 }}>{cat}</h4>
                      {docs.map((doc,idx) => <div key={idx} style={{marginBottom:4,padding:'8px 10px',backgroundColor:'white',borderRadius:4,fontSize:13,display:'flex',justifyContent:'space-between',alignItems:'center',gap:8}}>
                          <span style={{display:'flex',alignItems:'center',gap:8}}><img src="/Ridgeway-logo.png" alt="" style={{width:18,height:18,borderRadius:3,objectFit:'contain',flexShrink:0}} />{doc}</span>
                          <div style={{display:'flex',gap:6,flexShrink:0}}>
                            <button onClick={()=>{setSuccessMsg('Opening: '+doc);setTimeout(()=>setSuccessMsg(''),2500);}} style={{padding:'4px 10px',fontSize:11,backgroundColor:GOLD,color:NAVY,border:'none',borderRadius:3,cursor:'pointer',fontWeight:'bold'}}>View</button>
                            <button onClick={()=>{if(navigator.share){navigator.share({title:doc,text:'Document: '+doc+' — '+site}).catch(()=>{});}else{navigator.clipboard?.writeText(doc+' — '+site);setSuccessMsg('Copied to clipboard');setTimeout(()=>setSuccessMsg(''),2500);}}} style={{padding:'4px 10px',fontSize:11,backgroundColor:NAVY,color:'white',border:'none',borderRadius:3,cursor:'pointer',fontWeight:'bold'}}>Share</button>
                          </div>
                        </div>)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* ========== SITE MANAGER OVERVIEW ========== */}
          {user?.role === 'site_manager' && siteManagerTab === 'overview' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>{user?.site} — Site Overview</h2>

              {/* Quick Log Work button */}
              <button onClick={() => setSiteManagerTab('log work')} style={{
                width:'100%', backgroundColor:GOLD, color:NAVY, border:'none', borderRadius:10,
                padding:'18px 24px', fontSize:18, fontWeight:'bold', cursor:'pointer', marginBottom:22,
                display:'flex', alignItems:'center', justifyContent:'center', gap:10, boxShadow:'0 4px 14px rgba(196,162,101,0.25)'
              }}>
                + Log New Work
              </button>

              {/* ===== 2-Week Carpenter Schedule ===== */}
              <div style={{marginBottom:24}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10,flexWrap:'wrap',gap:8}}>
                  <h3 style={{color:NAVY,fontSize:17,margin:0}}>Carpenter Schedule — Next 2 Weeks</h3>
                  <button onClick={()=>setSiteManagerTab('schedule')} style={{backgroundColor:'transparent',color:GOLD,border:'2px solid '+GOLD,borderRadius:6,padding:'8px 14px',fontSize:12,fontWeight:'bold',cursor:'pointer'}}>Full Schedule</button>
                </div>
                {(() => {
                  const siteCarpAlloc = [...new Set(allocations.filter(a=>a.site===user?.site && !a.completed).map(a=>a.carpenter))];
                  const homeCarps = CARPENTERS.filter(c=>c.site===user?.site).map(c=>c.name);
                  const carpNames = [...new Set([...homeCarps, ...siteCarpAlloc])];
                  if(carpNames.length===0) return <div style={{padding:20,textAlign:'center',color:'#888',backgroundColor:'white',borderRadius:8,border:'1px solid #e0e0e0'}}>No carpenters assigned to {user?.site}</div>;
                  // Build 10 weekday cells (current week Mon-Fri + next week Mon-Fri)
                  const days = [...getWeekDays(0), ...getWeekDays(1)];
                  const todayStr = new Date().toISOString().split('T')[0];
                  return (
                    <div style={{overflowX:'auto',backgroundColor:'white',borderRadius:10,border:'1px solid #e0e0e0'}}>
                      <table style={{width:'100%',borderCollapse:'collapse',minWidth:900}}>
                        <thead>
                          <tr style={{backgroundColor:NAVY,color:CREAM}}>
                            <th style={{padding:'10px 8px',textAlign:'left',fontSize:11,minWidth:130,position:'sticky',left:0,backgroundColor:NAVY,zIndex:1}}>Carpenter</th>
                            {days.map((d,i)=>{
                              const isMonOfNext = i===5;
                              return (
                                <th key={i} style={{padding:'10px 6px',textAlign:'center',fontSize:10,minWidth:90,borderLeft:isMonOfNext?'2px solid '+GOLD:'1px solid rgba(255,255,255,.08)'}}>
                                  <div style={{fontSize:10,opacity:.6}}>{['Mon','Tue','Wed','Thu','Fri'][i%5]}</div>
                                  <div style={{fontSize:12,fontWeight:'bold'}}>{d.toLocaleDateString('en-GB',{day:'numeric',month:'short'})}</div>
                                </th>
                              );
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          {carpNames.map((carp,ci)=>(
                            <tr key={carp} style={{borderBottom:'1px solid #eee',backgroundColor:ci%2===0?'#fafafa':'white'}}>
                              <td style={{padding:'10px 8px',fontSize:12,fontWeight:'bold',color:NAVY,position:'sticky',left:0,backgroundColor:ci%2===0?'#fafafa':'white',borderRight:'1px solid #eee'}}>{carp}</td>
                              {days.map((d,i)=>{
                                const ds = d.toISOString().split('T')[0];
                                const af = allocations.find(a=>a.carpenter===carp && ds>=a.startDate && ds<=a.endDate);
                                const isComp = af?.completed;
                                const isToday = ds === todayStr;
                                const bg = af ? (isComp?'#2e7d32':af.delayed?'#d32f2f':isToday?GOLD:NAVY) : (isToday?'#fff8e1':'#fafafa');
                                const fg = af ? (isComp||af.delayed?'white':isToday?NAVY:'white') : '#999';
                                return (
                                  <td key={i} style={{padding:'6px 4px',fontSize:10,textAlign:'center',backgroundColor:bg,color:fg,minWidth:90,borderLeft:i===5?'2px solid '+GOLD:'1px solid #eee',verticalAlign:'middle',lineHeight:1.3}}>
                                    {af ? (<div><div style={{fontWeight:'bold',fontSize:10}}>P{af.plot}</div><div style={{fontSize:9,opacity:.85}}>{af.stage}</div></div>) : (isToday?'—':'')}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}
                <div style={{display:'flex',gap:16,flexWrap:'wrap',fontSize:11,color:'#666',marginTop:8}}>
                  <span><span style={{display:'inline-block',width:12,height:12,backgroundColor:GOLD,borderRadius:2,marginRight:4,verticalAlign:'middle'}}></span>Today</span>
                  <span><span style={{display:'inline-block',width:12,height:12,backgroundColor:NAVY,borderRadius:2,marginRight:4,verticalAlign:'middle'}}></span>Scheduled</span>
                  <span><span style={{display:'inline-block',width:12,height:12,backgroundColor:'#2e7d32',borderRadius:2,marginRight:4,verticalAlign:'middle'}}></span>Complete</span>
                  <span><span style={{display:'inline-block',width:12,height:12,backgroundColor:'#d32f2f',borderRadius:2,marginRight:4,verticalAlign:'middle'}}></span>Delayed</span>
                </div>
              </div>

              {/* ===== Plot × Stage Table ===== */}
              <div style={{marginBottom:18}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10,flexWrap:'wrap',gap:8}}>
                  <h3 style={{color:NAVY,fontSize:17,margin:0}}>Plot Stage Tracker</h3>
                  <input type="text" placeholder="Filter by plot" value={plotFilter} onChange={(e)=>setPlotFilter(e.target.value)} style={{padding:6,borderRadius:4,border:'2px solid '+GOLD,fontSize:13,width:160,boxSizing:'border-box'}} />
                </div>
                {(() => {
                  const STAGES = ['Joists','Main Roof','Low Roof','First Fix','Second Fix','Finals','Snagging'];
                  // Build plot rows from work log + allocations for this site
                  const siteWork = workLog.filter(w=>w.site===user?.site && (plotFilter==='' || String(w.plot).includes(plotFilter)));
                  const siteAllocs = allocations.filter(a=>a.site===user?.site && (plotFilter==='' || String(a.plot).includes(plotFilter)));
                  const plotMap = {};
                  siteWork.forEach(w=>{ const k=String(w.plot); if(!plotMap[k]) plotMap[k]={plot:k,houseType:w.houseType,stages:{}}; plotMap[k].stages[w.stage]={status:w.status,carpenter:w.allocatedTo||w.carpenter||null}; });
                  siteAllocs.forEach(a=>{ const k=String(a.plot); if(!plotMap[k]) plotMap[k]={plot:k,houseType:a.houseType,stages:{}}; plotMap[k].houseType=plotMap[k].houseType||a.houseType; plotMap[k].stages[a.stage]={status:a.completed?'complete':(a.delayed?'delayed':'allocated'),carpenter:a.carpenter}; });
                  const plotRows = Object.values(plotMap).sort((a,b)=>(parseInt(a.plot)||0)-(parseInt(b.plot)||0));
                  if(plotRows.length===0) return <div style={{padding:20,textAlign:'center',color:'#888',backgroundColor:'white',borderRadius:8,border:'1px solid #e0e0e0'}}>No plots logged on {user?.site} yet.</div>;
                  return (
                    <div style={{overflowX:'auto',backgroundColor:'white',borderRadius:10,border:'1px solid #e0e0e0'}}>
                      <table style={{width:'100%',borderCollapse:'collapse',minWidth:820}}>
                        <thead>
                          <tr style={{backgroundColor:NAVY,color:CREAM}}>
                            <th style={{padding:10,textAlign:'left',fontSize:11,minWidth:70,position:'sticky',left:0,backgroundColor:NAVY,zIndex:1}}>Plot</th>
                            <th style={{padding:10,textAlign:'left',fontSize:11,minWidth:100}}>House Type</th>
                            {STAGES.map(s=><th key={s} style={{padding:10,textAlign:'center',fontSize:11,minWidth:90}}>{s}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {plotRows.map((row,ri)=>(
                            <tr key={row.plot} style={{borderBottom:'1px solid #eee',backgroundColor:ri%2===0?'#fafafa':'white'}}>
                              <td style={{padding:10,fontSize:13,fontWeight:'bold',color:NAVY,position:'sticky',left:0,backgroundColor:ri%2===0?'#fafafa':'white',borderRight:'1px solid #eee'}}>Plot {row.plot}</td>
                              <td style={{padding:10,fontSize:12,color:'#555'}}>{row.houseType||'—'}</td>
                              {STAGES.map(s=>{
                                const st = row.stages[s];
                                if(!st) return <td key={s} style={{padding:8,textAlign:'center',fontSize:10,color:'#ccc'}}>—</td>;
                                const bg = st.status==='complete'?'#e8f5e9':st.status==='delayed'?'#ffebee':st.status==='allocated'?'#fff8e1':'#e3f2fd';
                                const fg = st.status==='complete'?'#2e7d32':st.status==='delayed'?'#c62828':st.status==='allocated'?'#e65100':'#1565c0';
                                const label = st.status==='complete'?'Complete':st.status==='delayed'?'Delayed':st.status==='allocated'?'In Progress':'Logged';
                                return (
                                  <td key={s} style={{padding:6,textAlign:'center',backgroundColor:bg}}>
                                    <div style={{fontSize:10,fontWeight:'bold',color:fg}}>{label}</div>
                                    {st.carpenter && <div style={{fontSize:9,color:'#666',marginTop:2}}>{st.carpenter}</div>}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* ========== SITE MANAGER SCHEDULE ========== */}
          {user?.role === 'site_manager' && siteManagerTab === 'schedule' && (
            <div>
              <h2 style={{fontSize:22, fontWeight:700, marginBottom:16, color:NAVY}}>Site Schedule — {user?.site}</h2>

              {(() => {
                // Find all carpenters who have allocations on this site manager's site
                const siteCarpNames = [...new Set(
                  allocations
                    .filter(a => a.site === user?.site && !a.completed)
                    .map(a => a.carpenter)
                )];

                // Also include carpenters whose home site matches
                const homeSiteCarpNames = ALL_CARPS.filter(c => c.site === user?.site).map(c => c.name);
                const allCarpNames = [...new Set([...homeSiteCarpNames, ...siteCarpNames])];

                if (allCarpNames.length === 0) {
                  return <div style={{padding:20, textAlign:'center', color:'#888'}}>No carpenters currently assigned to {user?.site}</div>;
                }

                return (
                  <div>
                    {/* Week navigation - shown once at top */}
                    <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:16, justifyContent:'center'}}>
                      <button onClick={()=>setSmWeekOffset(w=>w-1)} style={{backgroundColor:NAVY, color:CREAM, border:'none', borderRadius:8, padding:'10px 16px', fontSize:16, fontWeight:'bold', cursor:'pointer'}}>←</button>
                      <button onClick={()=>setSmWeekOffset(0)} style={{backgroundColor:GOLD, color:NAVY, border:'none', borderRadius:8, padding:'10px 20px', fontSize:14, fontWeight:'bold', cursor:'pointer'}}>This Week</button>
                      <button onClick={()=>setSmWeekOffset(w=>w+1)} style={{backgroundColor:NAVY, color:CREAM, border:'none', borderRadius:8, padding:'10px 16px', fontSize:16, fontWeight:'bold', cursor:'pointer'}}>→</button>
                    </div>

                    {/* Carpenters and their schedules */}
                    {allCarpNames.map(carpName => {
                      const carpAllocs = allocations.filter(a => a.carpenter === carpName);
                      const weekDays = getWeekDays(smWeekOffset);

                      return (
                        <div key={carpName} style={{marginBottom:24, backgroundColor:'white', borderRadius:12, padding:16, border:'1px solid #e0e0e0'}}>
                          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12, flexWrap:'wrap', gap:8}}>
                            <h3 style={{fontSize:17, fontWeight:700, color:NAVY, margin:0}}>{carpName}</h3>
                            <button onClick={() => {
                              setSmSelectedCarpenter(carpName);
                              setSchedChangeForm({carpenterName: carpName, currentSite: user?.site || '', currentPlot:'', currentStage:'', requestedChange:'', reason:''});
                              setShowSchedChangeForm(true);
                            }} style={{
                              backgroundColor:'transparent', color:GOLD, border:'2px solid '+GOLD,
                              borderRadius:6, padding:'10px 16px', fontSize:13, fontWeight:'bold', cursor:'pointer'
                            }}>
                              Request Schedule Change
                            </button>
                          </div>

                          {/* Day-by-day cards for this carpenter */}
                          {weekDays.map((day, idx) => {
                            const dayStr = day.toISOString().split('T')[0];
                            const dayNames = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
                            const isToday = day.toDateString() === new Date().toDateString();
                            const dayAllocs = carpAllocs.filter(a => dayStr >= a.startDate && dayStr <= a.endDate && !a.completed);

                            return (
                              <div key={dayStr} style={{
                                backgroundColor: isToday ? '#e8f5e9' : 'white',
                                border: isToday ? '2px solid #4caf50' : '1px solid #e0e0e0',
                                borderLeft: isToday ? '4px solid #4caf50' : '4px solid #ddd',
                                borderRadius:10, padding:14, marginBottom:8
                              }}>
                                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:dayAllocs.length > 0 ? 8 : 0}}>
                                  <span style={{fontWeight:700, fontSize:15, color:NAVY}}>{dayNames[idx]}</span>
                                  <span style={{fontSize:13, color:'#888'}}>{day.toLocaleDateString('en-GB',{day:'numeric',month:'short'})}</span>
                                </div>
                                {dayAllocs.length === 0 && (
                                  <div style={{padding:10, textAlign:'center', color:'#aaa', fontSize:13, backgroundColor:'#f9f9f9', borderRadius:6}}>No work scheduled</div>
                                )}
                                {dayAllocs.map((a, ai) => {
                                  // Calculate day number
                                  const start = new Date(a.startDate);
                                  const end = new Date(a.endDate);
                                  const totalDays = Math.round((end - start) / 86400000) + 1;
                                  const currentDay = Math.round((day - start) / 86400000) + 1;

                                  return (
                                    <div key={ai} style={{backgroundColor:'#f0f7f0', borderLeft:'3px solid #4caf50', borderRadius:6, padding:10, marginBottom:4}}>
                                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                        <span style={{fontWeight:700, fontSize:14, color:NAVY}}>{a.site} — Plot {a.plot}</span>
                                        <span style={{fontSize:12, color:'#666'}}>Day {currentDay} of {totalDays}</span>
                                      </div>
                                      <div style={{fontSize:13, color:'#555', marginTop:2}}>
                                        {a.houseType} / <span style={{color:GOLD, fontWeight:600}}>{a.stage}</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}

              {/* Pending schedule change requests from this site manager */}
              {schedChangeRequests.filter(r => r.requested_by === user?.name).length > 0 && (
                <div style={{marginTop:24}}>
                  <h3 style={{fontSize:17, fontWeight:700, color:NAVY, marginBottom:12}}>Your Schedule Change Requests</h3>
                  {schedChangeRequests.filter(r => r.requested_by === user?.name).map(r => (
                    <div key={r.id} style={{
                      backgroundColor:'white', borderRadius:10, padding:14, marginBottom:10,
                      borderLeft: '4px solid ' + (r.status === 'pending' ? GOLD : r.status === 'approved' ? '#4caf50' : '#e53935'),
                      border:'1px solid #e0e0e0'
                    }}>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:4}}>
                        <span style={{fontWeight:700, fontSize:14, color:NAVY}}>{r.carpenter_name}</span>
                        <span style={{
                          fontSize:12, fontWeight:700, padding:'4px 10px', borderRadius:20,
                          backgroundColor: r.status === 'pending' ? '#fff3e0' : r.status === 'approved' ? '#e8f5e9' : '#ffebee',
                          color: r.status === 'pending' ? '#e65100' : r.status === 'approved' ? '#2e7d32' : '#c62828'
                        }}>{r.status?.toUpperCase()}</span>
                      </div>
                      <div style={{fontSize:13, color:'#555', marginTop:6}}>{r.requested_change}</div>
                      <div style={{fontSize:12, color:'#888', marginTop:4}}>Reason: {r.reason}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Schedule Change Request Modal */}
              {showSchedChangeForm && (
                <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, backgroundColor:'rgba(0,0,0,0.5)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:20}}>
                  <div style={{backgroundColor:'white', borderRadius:12, padding:24, maxWidth:500, width:'100%', maxHeight:'90vh', overflowY:'auto'}}>
                    <h3 style={{fontSize:18, fontWeight:700, color:NAVY, marginBottom:16}}>Request Schedule Change</h3>
                    <p style={{fontSize:14, color:'#555', marginBottom:16}}>For: <strong>{schedChangeForm.carpenterName}</strong></p>

                    <label style={{fontSize:13, fontWeight:600, color:NAVY, marginBottom:4, display:'block'}}>What change do you need?</label>
                    <textarea
                      value={schedChangeForm.requestedChange}
                      onChange={e => setSchedChangeForm({...schedChangeForm, requestedChange: e.target.value})}
                      placeholder="e.g., Move to Plot 12 for Second Fix starting next Monday"
                      style={{width:'100%', padding:10, borderRadius:6, border:'1px solid #ccc', fontSize:14, minHeight:80, marginBottom:12, boxSizing:'border-box', resize:'vertical'}}
                    />

                    <label style={{fontSize:13, fontWeight:600, color:NAVY, marginBottom:4, display:'block'}}>Reason</label>
                    <textarea
                      value={schedChangeForm.reason}
                      onChange={e => setSchedChangeForm({...schedChangeForm, reason: e.target.value})}
                      placeholder="e.g., Plot 8 delayed due to scaffolding, Plot 12 ready early"
                      style={{width:'100%', padding:10, borderRadius:6, border:'1px solid #ccc', fontSize:14, minHeight:60, marginBottom:16, boxSizing:'border-box', resize:'vertical'}}
                    />

                    <div style={{display:'flex', gap:10}}>
                      <button onClick={async () => {
                        if (!schedChangeForm.requestedChange.trim() || !schedChangeForm.reason.trim()) {
                          alert('Please fill in both fields');
                          return;
                        }
                        try {
                          const { error } = await supabase.from('schedule_change_requests').insert({
                            carpenter_name: schedChangeForm.carpenterName,
                            site: user?.site || '',
                            requested_by: user?.name || '',
                            requested_change: schedChangeForm.requestedChange.trim(),
                            reason: schedChangeForm.reason.trim(),
                            status: 'pending'
                          });
                          if (error) throw error;
                          // Refresh the list
                          const { data } = await supabase.from('schedule_change_requests').select('*').order('created_at', { ascending: false });
                          if (data) setSchedChangeRequests(data);
                          setShowSchedChangeForm(false);
                          setSchedChangeForm({carpenterName:'', currentSite:'', currentPlot:'', currentStage:'', requestedChange:'', reason:''});
                        } catch(e) {
                          console.error('Error submitting schedule change request:', e);
                          alert('Could not submit request. The schedule_change_requests table may need to be created in Supabase.');
                        }
                      }} style={{
                        flex:1, backgroundColor:GOLD, color:NAVY, border:'none', borderRadius:8,
                        padding:'12px 20px', fontSize:15, fontWeight:'bold', cursor:'pointer'
                      }}>Submit Request</button>
                      <button onClick={() => setShowSchedChangeForm(false)} style={{
                        flex:1, backgroundColor:'#f5f5f5', color:'#333', border:'1px solid #ccc', borderRadius:8,
                        padding:'12px 20px', fontSize:15, fontWeight:'bold', cursor:'pointer'
                      }}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========== SITE MANAGER LOG WORK ========== */}
          {user?.role === 'site_manager' && siteManagerTab === 'log work' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Request Work Allocation</h2>
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
                {(() => {
                  const siteLeadName = siteleads[user?.site] || DEFAULT_SITE_LEADS[user?.site] || 'the admin team';
                  return <p style={{fontSize:13,color:CREAM,marginBottom:15,fontStyle:'italic'}}>Your request will be sent to {siteLeadName} for carpenter allocation.</p>;
                })()}
                <button type="button" onClick={()=>{
                  const trimmedPlot = smPlot.trim();
                  const trimmedHouseType = smHouseType.trim();
                  const trimmedStage = smStage.trim();
                  const trimmedNotes = smNotes.trim();
                  if(trimmedPlot&&trimmedHouseType&&trimmedStage){const builder=BUILDERS.find(b=>b.sites.some(s=>s.name===user?.site));
                    setWorkLog([...workLog,{id:Math.max(...workLog.map(w=>w.id),0)+1,site:user?.site,builder:builder?builder.name:'',plot:trimmedPlot,houseType:trimmedHouseType,stage:trimmedStage,expectedDays:2,priority:'medium',notes:trimmedNotes,status:'logged'}]);
                    addWorkLogEntry({site:user?.site,builder:builder?builder.name:'',plot:trimmedPlot,house_type:trimmedHouseType,stage:trimmedStage,expected_days:2,priority:'medium',notes:trimmedNotes,status:'logged'}).catch(e=>console.error('DB error:',e));
                    const leadName = siteleads[user?.site] || DEFAULT_SITE_LEADS[user?.site] || '';
                    if(leadName){addNotification({title:'New Work Request — '+user?.site,content:user?.name+' has logged work for Plot '+trimmedPlot+' ('+trimmedStage+'). Please allocate a carpenter.',carpenter_name:leadName,site:user?.site}).catch(e=>console.error('Notification error:',e));}
                    setSmPlot('');setSmHouseType('');setSmStage('');setSmNotes('');setSuccessMsg('Work request submitted');setTimeout(()=>setSuccessMsg(''),2500);
                  }else{alert('Please fill in all fields');}
                }} style={{backgroundColor:GOLD,color:NAVY,padding:'10px 20px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:14}}>Send to Site Lead</button>
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
                    <span style={{display:'flex',alignItems:'center',gap:8}}><img src="/Ridgeway-logo.png" alt="" style={{width:18,height:18,borderRadius:3,objectFit:'contain',flexShrink:0}} />{doc}</span><button onClick={()=>{setSuccessMsg('Download: '+doc);setTimeout(()=>setSuccessMsg(''),2500);}} style={{padding:'4px 10px',fontSize:11,backgroundColor:GOLD,color:NAVY,border:'none',borderRadius:3,cursor:'pointer',fontWeight:'bold'}}>View</button>
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
                  <div style={{marginBottom:12}}><label style={{display:'block',color:'#aaa',fontSize:11,marginBottom:3}}>Description (what needs to be done)</label>
                    <textarea value={newFileDesc} onChange={(e)=>setNewFileDesc(e.target.value)} placeholder="e.g. Snag list for plot 14 — fix all listed issues before handover" rows={2} style={{width:'100%',padding:10,borderRadius:4,border:'1px solid '+GOLD,fontSize:13,boxSizing:'border-box',resize:'vertical',fontFamily:'inherit'}} /></div>
                  <div style={{marginBottom:12}}>
                    <label style={{display:'block',color:'#aaa',fontSize:11,marginBottom:3}}>Photos ({newFilePhotos.length} added) — tap a photo to add a comment</label>
                    <input ref={fileInputRef} type="file" accept="image/*" capture="environment" multiple onChange={(e)=>{
                      const files=Array.from(e.target.files||[]);
                      files.forEach(file=>{const reader=new FileReader();reader.onload=(ev)=>{setNewFilePhotos(prev=>[...prev,{id:Date.now()+Math.random(),note:'',dataUrl:ev.target.result,fileName:file.name}]);};reader.readAsDataURL(file);});
                      if(fileInputRef.current)fileInputRef.current.value='';
                    }} style={{display:'none'}} />
                    <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:8}}>
                      <button onClick={()=>fileInputRef.current?.click()} style={{backgroundColor:GOLD,color:NAVY,padding:'8px 16px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:12}}>Upload Photo</button>
                      <button onClick={()=>{const input=fileInputRef.current;if(input){input.setAttribute('capture','environment');input.click();}}} style={{backgroundColor:'#1565c0',color:'white',padding:'8px 16px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:12}}>Take Photo</button>
                    </div>
                    {newFilePhotos.length > 0 && (
                      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(120px,1fr))',gap:8}}>
                        {newFilePhotos.map((p,idx) => (
                          <div key={p.id} style={{backgroundColor:'#1a2a3a',borderRadius:6,overflow:'hidden',border:'1px solid #333'}}>
                            {p.dataUrl && <img src={p.dataUrl} alt="" onClick={()=>{setEditingPhotoId(p.id);setEditingPhotoNote(p.note||'');}} style={{width:'100%',height:80,objectFit:'cover',cursor:'pointer'}} />}
                            <div style={{padding:6}}>
                              <div style={{fontSize:10,color:'#aaa'}}>Photo {idx+1}</div>
                              {p.note ? <div style={{fontSize:11,color:CREAM,marginTop:2,fontStyle:'italic'}}>“{p.note}”</div> : <div style={{fontSize:10,color:GOLD,marginTop:2}}>Tap to add comment</div>}
                              <div style={{display:'flex',gap:6,marginTop:4}}>
                                <button onClick={()=>{setEditingPhotoId(p.id);setEditingPhotoNote(p.note||'');}} style={{fontSize:10,color:GOLD,background:'none',border:'none',cursor:'pointer',padding:0}}>Edit</button>
                                <button onClick={()=>setNewFilePhotos(prev=>prev.filter(x=>x.id!==p.id))} style={{fontSize:10,color:'#d32f2f',background:'none',border:'none',cursor:'pointer',padding:0}}>Remove</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{display:'flex',gap:8,marginTop:14}}>
                    <button onClick={()=>{
                      if(!newFileName.trim()){alert('Please enter a file name');return;}
                      if(newFilePhotos.length===0){if(!window.confirm('No photos added. Save anyway?'))return;}
                      setShowSaveFileConfirm(true);
                    }} style={{backgroundColor:GOLD,color:NAVY,padding:'10px 22px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:13}}>Save File</button>
                    <button onClick={()=>{setCreatingFile(false);setNewFileName('');setNewFilePhotos([]);setNewFileNote('');setNewFileDesc('');}} style={{backgroundColor:'#666',color:'white',padding:'10px 22px',border:'none',borderRadius:4,cursor:'pointer',fontSize:13}}>Cancel</button>
                  </div>
                </div>
              )}
              {editingPhotoId && (() => {
                const photo = newFilePhotos.find(p=>p.id===editingPhotoId);
                if(!photo) return null;
                return (
                  <div onClick={()=>setEditingPhotoId(null)} style={{position:'fixed',top:0,left:0,right:0,bottom:0,backgroundColor:'rgba(0,0,0,0.85)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
                    <div onClick={(e)=>e.stopPropagation()} style={{backgroundColor:'white',borderRadius:10,padding:20,maxWidth:500,width:'100%',maxHeight:'90vh',overflow:'auto'}}>
                      <h3 style={{color:NAVY,margin:'0 0 12px',fontSize:16}}>Add Comment to Photo</h3>
                      {photo.dataUrl && <img src={photo.dataUrl} alt="" style={{width:'100%',maxHeight:300,objectFit:'contain',borderRadius:6,marginBottom:12,backgroundColor:'#000'}} />}
                      <label style={{display:'block',fontSize:12,color:'#666',marginBottom:4}}>Comment / what needs doing</label>
                      <textarea value={editingPhotoNote} onChange={(e)=>setEditingPhotoNote(e.target.value)} placeholder="e.g. Skirting needs replacing here" rows={3} autoFocus style={{width:'100%',padding:10,borderRadius:4,border:'1px solid #ddd',fontSize:13,boxSizing:'border-box',resize:'vertical',fontFamily:'inherit'}} />
                      <div style={{display:'flex',gap:8,marginTop:14,justifyContent:'flex-end'}}>
                        <button onClick={()=>setEditingPhotoId(null)} style={{backgroundColor:'#666',color:'white',padding:'8px 18px',border:'none',borderRadius:4,cursor:'pointer',fontSize:13}}>Cancel</button>
                        <button onClick={()=>{setNewFilePhotos(prev=>prev.map(p=>p.id===editingPhotoId?{...p,note:editingPhotoNote}:p));setEditingPhotoId(null);setEditingPhotoNote('');}} style={{backgroundColor:GOLD,color:NAVY,padding:'8px 18px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:13}}>Save Comment</button>
                      </div>
                    </div>
                  </div>
                );
              })()}
              {showSaveFileConfirm && (
                <div onClick={()=>setShowSaveFileConfirm(false)} style={{position:'fixed',top:0,left:0,right:0,bottom:0,backgroundColor:'rgba(0,0,0,0.7)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
                  <div onClick={(e)=>e.stopPropagation()} style={{backgroundColor:'white',borderRadius:10,padding:24,maxWidth:420,width:'100%'}}>
                    <h3 style={{color:NAVY,margin:'0 0 10px',fontSize:18}}>Save site file?</h3>
                    <p style={{color:'#555',fontSize:13,margin:'0 0 6px'}}><strong>{newFileName}</strong></p>
                    <p style={{color:'#666',fontSize:12,margin:'0 0 16px'}}>{newFilePhotos.length} photo{newFilePhotos.length!==1?'s':''} attached. Once saved, this file will be added to the site folder.</p>
                    <div style={{display:'flex',gap:8,justifyContent:'flex-end',flexWrap:'wrap'}}>
                      <button onClick={()=>setShowSaveFileConfirm(false)} style={{backgroundColor:'#666',color:'white',padding:'10px 18px',border:'none',borderRadius:4,cursor:'pointer',fontSize:13}}>Cancel — Continue Editing</button>
                      <button onClick={()=>{
                        const newFile={id:Date.now(),site:user?.site,name:newFileName,description:newFileDesc,createdBy:user?.name||'Site Manager',date:new Date().toISOString().split('T')[0],photos:newFilePhotos.map((p,i)=>({id:i+1,note:p.note,dataUrl:p.dataUrl})),sentTo:null,status:'open'};
                        setSiteFiles(prev=>[newFile,...prev]);
                        addSiteFile({site:user?.site,name:newFileName,created_by:user?.name,date:new Date().toISOString().split('T')[0],status:'open'}).then(r=>{if(r.data&&newFilePhotos.length>0){newFilePhotos.forEach(p=>{addSiteFilePhoto({site_file_id:r.data.id,note:p.note,photo_url:p.dataUrl}).catch(e=>console.error('DB photo error:',e));});}}).catch(e=>console.error('DB error:',e));
                        const savedName=newFileName;
                        setCreatingFile(false);setNewFileName('');setNewFilePhotos([]);setNewFileNote('');setNewFileDesc('');setShowSaveFileConfirm(false);
                        setSuccessMsg('Site file created: '+savedName);setTimeout(()=>setSuccessMsg(''),2500);
                      }} style={{backgroundColor:GOLD,color:NAVY,padding:'10px 22px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:13}}>Confirm — Save File</button>
                    </div>
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
                      <button onClick={()=>setViewingFileId(null)} style={{backgroundColor:'#666',color:'white',padding:'10px 16px',border:'none',borderRadius:4,cursor:'pointer',fontSize:13}}>Back</button>
                    </div>
                    <div style={{fontSize:12,color:'#888',marginBottom:8}}>Created by {file.createdBy} on {file.date} | {file.photos.length} photo{file.photos.length!==1?'s':''}</div>
                    {file.description && <div style={{fontSize:13,color:'#444',marginBottom:14,padding:10,backgroundColor:'#f6f4ef',borderRadius:6,borderLeft:'3px solid '+GOLD}}>{file.description}</div>}
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
                  <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
                    <button onClick={()=>{setAdminTab(prevAdminTab||'dashboard');}} style={{backgroundColor:'transparent',border:'none',cursor:'pointer',fontSize:22,color:NAVY,padding:0,lineHeight:1}}>←</button>
                    <h2 style={{ color:NAVY, marginTop:0, marginBottom:0, fontSize:22 }}>All Sites</h2>
                  </div>
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
                    <button onClick={()=>setAdminSiteView(null)} style={{backgroundColor:NAVY,color:CREAM,padding:'10px 16px',border:'none',borderRadius:4,cursor:'pointer',fontSize:13,fontWeight:'bold'}}>Back to All Sites</button>
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
                                <button onClick={(e)=>{e.stopPropagation();setAllocateId(item.id);setAdminTab('allocate');}} style={{backgroundColor:GOLD,color:NAVY,padding:'10px 16px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:13,alignSelf:'flex-start'}}>Allocate</button>
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

          {/* ========== ADMIN MY LEAD SITES ========== */}
          {user?.role === 'admin' && adminTab === 'my lead sites' && (
            <div>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
                <button onClick={()=>{setAdminTab(prevAdminTab||'dashboard');}} style={{backgroundColor:'transparent',border:'none',cursor:'pointer',fontSize:22,color:NAVY,padding:0,lineHeight:1}}>←</button>
                <h2 style={{fontSize:22, fontWeight:700, color:NAVY, marginBottom:0, marginTop:0}}>My Lead Sites</h2>
              </div>
              {(() => {
                const myLeadSites = BUILDERS.flatMap(builder =>
                  builder.sites.filter(site => (siteleads[site.name] || DEFAULT_SITE_LEADS[site.name]) === user?.name)
                    .map(site => ({...site, builder: builder.name, builderColor: builder.color}))
                );

                if (myLeadSites.length === 0) {
                  return <p style={{color:'#888', fontSize:14}}>No sites currently assigned to you as lead.</p>;
                }

                return (
                  <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:16}}>
                    {myLeadSites.map(site => {
                      const siteAllocs = allocations.filter(a => a.site === site.name && !a.completed);
                      const siteInvoices = invoices.filter(i => i.site === site.name && i.status === 'pending');
                      const siteWorkLog = workLog.filter(w => w.site === site.name && w.status === 'logged');
                      return (
                        <div key={site.name} style={{backgroundColor:'white', borderRadius:10, padding:16, border:'1px solid #e0e0e0', borderTop:'4px solid '+(site.builderColor||GOLD), cursor:'pointer'}}
                          onClick={() => { setAdminTab('sites'); setAdminSiteView(site.name); }}>
                          <div style={{fontWeight:700, fontSize:15, color:NAVY}}>{site.name}</div>
                          <div style={{fontSize:13, color:'#666', marginBottom:10}}>{site.builder}</div>
                          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8}}>
                            <div style={{backgroundColor:'#fff3e0', borderRadius:6, padding:8, textAlign:'center'}}>
                              <div style={{fontSize:18, fontWeight:700, color:NAVY}}>{siteWorkLog.length}</div>
                              <div style={{fontSize:11, color:'#888'}}>Needs Allocating</div>
                            </div>
                            <div style={{backgroundColor:'#e8f5e9', borderRadius:6, padding:8, textAlign:'center'}}>
                              <div style={{fontSize:18, fontWeight:700, color:NAVY}}>{siteAllocs.length}</div>
                              <div style={{fontSize:11, color:'#888'}}>Active Jobs</div>
                            </div>
                            <div style={{backgroundColor:'#e3f2fd', borderRadius:6, padding:8, textAlign:'center'}}>
                              <div style={{fontSize:18, fontWeight:700, color:NAVY}}>{siteInvoices.length}</div>
                              <div style={{fontSize:11, color:'#888'}}>Pending Invoices</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          )}

                    {/* ========== CARPENTER SCHEDULE (MON-FRI) ========== */}
          {user?.role === 'carpenter' && carpenterTab === 'schedule' && (
            <div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16,flexWrap:'wrap',gap:8}}>
                <h2 style={{ color:NAVY, marginTop:0, fontSize:22, margin:0 }}>Your Week</h2>
                <div style={{display:'flex',gap:8,alignItems:'center'}}>
                  <button onClick={()=>setWeekOffset(w=>w-1)} style={{backgroundColor:NAVY,color:CREAM,border:'none',padding:'10px 16px',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:16}}>←</button>
                  <button onClick={()=>setWeekOffset(0)} style={{backgroundColor:weekOffset===0?GOLD:NAVY,color:weekOffset===0?NAVY:CREAM,border:'none',padding:'10px 16px',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:13}}>This Week</button>
                  <button onClick={()=>setWeekOffset(w=>w+1)} style={{backgroundColor:NAVY,color:CREAM,border:'none',padding:'10px 16px',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:16}}>→</button>
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
                            {dayIsOff && <span style={{backgroundColor:'#ff9800',color:'white',padding:'4px 12px',borderRadius:4,fontSize:12,fontWeight:'bold'}}>HOLIDAY</span>}
                          </div>
                          {dayIsOff ? (
                            <div style={{padding:10,backgroundColor:'#fff8e1',borderRadius:6,fontSize:14,color:'#e65100',fontStyle:'italic'}}>
                              Holiday approved
                            </div>
                          ) : dayAllocations.length === 0 ? (
                            <div style={{padding:10,backgroundColor:'#f5f5f5',borderRadius:6,fontSize:13,color:'#999',textAlign:'center'}}>
                              No work scheduled
                            </div>
                          ) : (
                            <div>
                              {dayAllocations.map(alloc => {
                                const allocStart = alloc.startDate;
                                const allocDays = [];
                                for(let dd=new Date(allocStart); dd.toISOString().split('T')[0]<=alloc.endDate; dd.setDate(dd.getDate()+1)){
                                  allocDays.push(dd.toISOString().split('T')[0]);
                                }
                                const dayNum = allocDays.indexOf(dayStr) + 1;
                                const totalDaysCalc = allocDays.length;
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
                                        <span style={{fontSize:11,color:'#888'}}>Day {dayNum} of {totalDaysCalc}</span>
                                        {isComplete && <div style={{fontSize:10,color:'#4caf50',fontWeight:'bold'}}>DONE</div>}
                                      </div>
                                    </div>
                                    {!isComplete && isToday && dayNum === totalDaysCalc && (
                                      <button onClick={()=>markAllocComplete(alloc.id)} style={{marginTop:8,backgroundColor:'#4caf50',color:'white',padding:'10px 16px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:13,width:'100%'}}>Mark Complete</button>
                                    )}
                                    {!isComplete && isToday && (
                                      carpDelayAllocId === alloc.id ? (
                                        <div style={{marginTop:8,backgroundColor:'#fff3e0',borderRadius:6,padding:12}}>
                                          <div style={{fontSize:12,fontWeight:'bold',color:'#e65100',marginBottom:8}}>Report Delay</div>
                                          <select value={carpDelayReason} onChange={(e)=>setCarpDelayReason(e.target.value)}
                                            style={{width:'100%',padding:'10px',borderRadius:4,border:'1px solid #ddd',fontSize:13,marginBottom:8}}>
                                            <option value="">Select reason...</option>
                                            {['Weather','Materials not delivered','Access issue','Waiting on other trade','Snagging required','Personal','Other'].map(r=><option key={r} value={r}>{r}</option>)}
                                          </select>
                                          <div style={{display:'flex',gap:8,marginBottom:8}}>
                                            <div style={{flex:1}}>
                                              <label style={{fontSize:11,color:'#666',display:'block',marginBottom:4}}>Extra days needed</label>
                                              <input type="number" min="1" max="14" value={carpDelayDays} onChange={(e)=>setCarpDelayDays(parseInt(e.target.value)||1)}
                                                style={{width:'100%',padding:'8px',borderRadius:4,border:'1px solid #ddd',fontSize:13,boxSizing:'border-box'}} />
                                            </div>
                                          </div>
                                          <div style={{display:'flex',gap:8}}>
                                            <button onClick={async ()=>{
                                              if(!carpDelayReason){ alert('Please select a reason'); return; }
                                              const siteLead = siteleads[alloc.site] || DEFAULT_SITE_LEADS[alloc.site] || 'Admin';
                                              const newEnd = new Date(alloc.endDate); newEnd.setDate(newEnd.getDate()+carpDelayDays);
                                              const newEndStr = newEnd.toISOString().split('T')[0];
                                              setAllocations(allocations.map(a=>a.id===alloc.id?{...a,delayed:true,delayDays:(a.delayDays||0)+carpDelayDays,endDate:newEndStr}:a));
                                              try{
                                                await addDelay({carpenter:user?.name,site:alloc.site,plot:alloc.plot,stage:alloc.stage,reason:carpDelayReason,delay_days:carpDelayDays,status:'active',reported_by:user?.name});
                                                await updateAllocation(alloc.id,{delayed:true,delay_days:(alloc.delayDays||0)+carpDelayDays,end_date:newEndStr});
                                              }catch(e){console.error('DB error:',e);}
                                              setDelays(prev=>[{id:Date.now(),carpenter:user?.name,site:alloc.site,plot:alloc.plot,stage:alloc.stage,reason:carpDelayReason,delayDays:carpDelayDays,status:'active',reportedBy:user?.name,date:new Date().toISOString().split('T')[0]},...prev]);
                                              setCarpDelayAllocId(null);setCarpDelayReason('');setCarpDelayDays(1);
                                              setSuccessMsg('Delay reported — visible on Delays page');setTimeout(()=>setSuccessMsg(''),3000);
                                            }} style={{flex:1,backgroundColor:'#e53935',color:'white',padding:'10px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:13}}>Submit Delay</button>
                                            <button onClick={()=>{setCarpDelayAllocId(null);setCarpDelayReason('');setCarpDelayDays(1);}} style={{backgroundColor:'#999',color:'white',padding:'10px 16px',border:'none',borderRadius:4,cursor:'pointer',fontSize:13}}>Cancel</button>
                                          </div>
                                        </div>
                                      ) : (
                                        <button onClick={()=>setCarpDelayAllocId(alloc.id)} style={{marginTop:8,backgroundColor:'#ffebee',color:'#c62828',padding:'6px 12px',border:'1px solid #ef9a9a',borderRadius:4,cursor:'pointer',fontSize:11,width:'auto',display:'inline-block'}}>Report Delay</button>
                                      )
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}

                        </div>
                      );
                    })}
                  </div>
                );
              })()}


              {/* Past allocations summary */}
              {myAllocs.filter(a=>a.completed).length > 0 && (
                <div style={{marginTop:20}}>
                  <h3 style={{color:NAVY,fontSize:16,marginBottom:10}}>Recently Completed</h3>
                  {myAllocs.filter(a=>a.completed).slice(-5).reverse().map(alloc=>(
                    <div key={alloc.id} style={{backgroundColor:'white',border:'1px solid #c8e6c9',borderRadius:6,padding:10,marginBottom:6,borderLeft:'4px solid #4caf50',fontSize:13}}>
                      <div style={{display:'flex',justifyContent:'space-between'}}>
                        <span><strong>{alloc.site}</strong> — Plot {alloc.plot} / {alloc.stage}</span>
                        <span style={{color:'#4caf50',fontWeight:'bold',fontSize:12}}>Done — {alloc.completedDate ? formatDate(alloc.completedDate) : 'Done'}</span>
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
              {/* Invoice Account Replies */}
              {(() => {
                const myReplies = portalMessages.filter(m => m.type === 'carpenter' && m.name === user?.name && m.replied);
                const myUnreplied = portalMessages.filter(m => m.type === 'carpenter' && m.name === user?.name && !m.replied);
                if (myReplies.length === 0 && myUnreplied.length === 0) return null;
                return (
                  <div style={{marginBottom:24}}>
                    <h3 style={{fontSize:16, fontWeight:700, color:NAVY, marginBottom:10}}>Invoice Messages</h3>
                    {myReplies.map(msg => (
                      <div key={msg.id} style={{backgroundColor:'white', borderRadius:10, padding:14, marginBottom:10, border:'1px solid #e0e0e0', borderLeft:'4px solid #4caf50'}}>
                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
                          <span style={{fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:3, backgroundColor:'#e8f5e9', color:'#2e7d32'}}>REPLY</span>
                          <span style={{fontSize:11, color:'#999'}}>{msg.date}</span>
                        </div>
                        <div style={{fontSize:12, color:'#888', marginBottom:6}}>You wrote: <em>"{msg.message}"</em></div>
                        <div style={{fontSize:13, color:NAVY, fontWeight:500, backgroundColor:'#f5f5f5', padding:10, borderRadius:6, borderLeft:'3px solid '+GOLD}}>
                          <span style={{fontSize:11, color:GOLD, fontWeight:700, display:'block', marginBottom:4}}>Invoice Account:</span>
                          {msg.reply}
                        </div>
                      </div>
                    ))}
                    {myUnreplied.map(msg => (
                      <div key={msg.id} style={{backgroundColor:'white', borderRadius:10, padding:14, marginBottom:10, border:'1px solid #e0e0e0', borderLeft:'4px solid #ff9800'}}>
                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
                          <span style={{fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:3, backgroundColor:'#fff3e0', color:'#e65100'}}>AWAITING REPLY</span>
                          <span style={{fontSize:11, color:'#999'}}>{msg.date}</span>
                        </div>
                        <div style={{fontSize:13, color:'#444'}}>You wrote: "{msg.message}"</div>
                      </div>
                    ))}
                  </div>
                );
              })()}

              {/* Admin Notifications */}
              {myNotifications.length === 0 && portalMessages.filter(m=>m.type==='carpenter'&&m.name===user?.name).length===0 ? <p style={{color:'#666',fontSize:14}}>No notifications.</p> : myNotifications.length === 0 ? null : (
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
                              <canvas ref={sigCanvasRef} width={Math.min(400, typeof window !== 'undefined' ? window.innerWidth - 60 : 400)} height={150}
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
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Documents</h2>
              {mySites.length === 0 ? <p style={{color:'#666',fontSize:14}}>No sites allocated.</p> : (
                mySites.map(siteName => {
                  const siteDocs = DOCUMENTS[siteName];
                  if(!siteDocs) return null;
                  const builder = BUILDERS.find(b => b.sites.some(s => s.name === siteName));
                  const siteInfo = builder?.sites.find(s => s.name === siteName);
                  const houseTypes = siteInfo?.housetypes || [];
                  return (
                    <div key={siteName} style={{marginBottom:24}}>
                      <div style={{backgroundColor:NAVY,color:CREAM,padding:'10px 16px',borderRadius:'8px 8px 0 0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <strong style={{fontSize:16}}>{siteName}</strong>
                        {builder && <span style={{fontSize:12,color:GOLD}}>{builder.name}</span>}
                      </div>
                      <div style={{border:'1px solid #ddd',borderTop:'none',borderRadius:'0 0 8px 8px',padding:12}}>
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
                                    <span style={{display:'flex',alignItems:'center',gap:8}}><img src="/Ridgeway-logo.png" alt="" style={{width:18,height:18,borderRadius:3,objectFit:'contain',flexShrink:0}} />{doc}</span>
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
                        <span style={{display:'flex',alignItems:'center',gap:8}}><img src="/Ridgeway-logo.png" alt="" style={{width:18,height:18,borderRadius:3,objectFit:'contain',flexShrink:0}} />{doc}</span>
                        <div style={{display:'flex',gap:6}}>
                          <button onClick={()=>{setSuccessMsg('Opening: '+doc);setTimeout(()=>setSuccessMsg(''),2500);}} style={{padding:'4px 10px',fontSize:11,backgroundColor:GOLD,color:NAVY,border:'none',borderRadius:3,cursor:'pointer',fontWeight:'bold'}}>Open</button>
                          <button onClick={()=>{setSuccessMsg('Downloading: '+doc);setTimeout(()=>setSuccessMsg(''),2500);}} style={{padding:'4px 10px',fontSize:11,backgroundColor:NAVY,color:'white',border:'none',borderRadius:3,cursor:'pointer',fontWeight:'bold'}}>Download</button>
                        </div>
                      </div>)}
                    </div>
                  ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* ========== CARPENTER PRICE LISTS (BY HOUSE TYPE) ========== */}
          {user?.role === 'carpenter' && carpenterTab === 'price lists' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Price Lists</h2>
              {mySites.length > 0 && <p style={{color:'#666',fontSize:12,marginBottom:12}}>Showing price lists for your active sites: {mySites.join(', ')}</p>}
              {Object.entries(PRICE_LISTS_BY_HOUSE_TYPE).filter(([listName, pl]) => mySites.some(s => pl.site === s)).map(([listName, pl]) => (
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
                            Total: £{Object.values(rates).reduce((s,v)=>s+(typeof v==='number'?v:0),0)}
                          </span>
                        </summary>
                        <div style={{padding:'8px 12px'}}>
                          <table style={{width:'100%',fontSize:12,borderCollapse:'collapse'}}>
                            <tbody>
                              {Object.entries(rates).map(([stage,price]) => (
                                <tr key={stage} style={{borderBottom:'1px solid #f0f0f0'}}>
                                  <td style={{padding:'4px 0'}}>{stage}</td>
                                  <td style={{padding:'4px 0',textAlign:'right',fontWeight:'bold',color:NAVY}}>{typeof price==='number'?'£'+price:price}</td>
                                </tr>
                              ))}
                              <tr style={{borderTop:'2px solid '+GOLD}}>
                                <td style={{padding:'6px 0',fontWeight:'bold'}}>Total</td>
                                <td style={{padding:'6px 0',textAlign:'right',fontWeight:'bold',color:GOLD,fontSize:14}}>£{Object.values(rates).reduce((s,v)=>s+(typeof v==='number'?v:0),0)}</td>
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
                <div style={{marginBottom:15}}><label style={{display:'block',marginBottom:4,fontSize:11}}>Send Request To</label>
                  <select value={fixingAlloc} onChange={(e)=>setFixingAlloc(e.target.value)} style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,fontSize:13}}>
                    <option value="">Select</option>
                    <option value="Jack Sawyers">Jack Sawyers</option>
                  </select></div>
                <div style={{marginBottom:15}}><label style={{display:'block',marginBottom:4,fontSize:11}}>Item</label>
                  <input type="text" placeholder="e.g. M8 bolts, wall ties..." value={fixingItem} onChange={(e)=>setFixingItem(e.target.value)} style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,boxSizing:'border-box',fontSize:13}} /></div>
                <div style={{marginBottom:15}}><label style={{display:'block',marginBottom:4,fontSize:11}}>Quantity</label>
                  <input type="number" placeholder="e.g. 500" value={fixingQty} onChange={(e)=>setFixingQty(e.target.value)} style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,boxSizing:'border-box',fontSize:13}} /></div>
                <div style={{marginBottom:15}}><label style={{display:'block',marginBottom:4,fontSize:11}}>Notes</label>
                  <textarea placeholder="Details..." value={fixingNotes} onChange={(e)=>setFixingNotes(e.target.value)} style={{width:'100%',padding:8,borderRadius:4,border:'1px solid '+GOLD,minHeight:60,boxSizing:'border-box',fontFamily:'inherit',fontSize:13}} /></div>
                <button type="button" onClick={()=>{
                  const trimmedItem = fixingItem.trim();
                  const trimmedNotes = fixingNotes.trim();
                  const qty = parseInt(fixingQty, 10);
                  if(fixingAlloc&&trimmedItem&&fixingQty){
                    if(qty < 1) { alert('Quantity must be a positive number'); return; }
                    const currentAlloc = myAllocs.find(a=>!a.completed);
                    const noteWithRecipient = ('Sent to: '+fixingAlloc+(trimmedNotes?' — '+trimmedNotes:''));
                    const req=handleFixingRequest(trimmedItem,fixingQty,noteWithRecipient,currentAlloc);
                    req.sentTo = fixingAlloc;
                    setAllFixingRequests([...allFixingRequests,req]);setFixingRequests([...fixingRequests,req]);
                    addFixingReq({carpenter:req.carpenter,site:req.site,plot:req.plot,stage:req.stage,item:req.item,qty:req.qty,notes:noteWithRecipient,date:req.date,status:'pending'}).catch(e=>console.error('DB error:',e));
                    setFixingAlloc('');setFixingItem('');setFixingQty('');setFixingNotes('');
                    setSuccessMsg('Request sent to '+fixingAlloc);setTimeout(()=>setSuccessMsg(''),2500);
                  }else{alert('Fill in recipient, item and quantity');}
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
    <div style={{backgroundColor:'#fff3e0',border:'1px solid #ffe0b2',borderRadius:8,padding:'10px 14px',marginBottom:16,fontSize:12,color:'#e65100',display:'flex',alignItems:'center',gap:8}}>
      <span style={{fontSize:18}}>⏰</span>
      <span>Invoices auto-submit every <strong>Friday at 8pm</strong>. Add extras or delays before then. You can edit previous days retroactively.</span>
    </div>
    {/* Send Note to Invoice Account */}
    <div style={{marginBottom:16,display:'flex',alignItems:'center',gap:8}}>
      <button onClick={()=>setShowInvoiceNoteForm(!showInvoiceNoteForm)} style={{display:'flex',alignItems:'center',gap:6,padding:'8px 14px',border:'1px solid '+(showInvoiceNoteForm?'#d32f2f':'#90caf9'),backgroundColor:showInvoiceNoteForm?'#ffebee':'#e3f2fd',color:showInvoiceNoteForm?'#d32f2f':'#1565c0',borderRadius:6,cursor:'pointer',fontWeight:600,fontSize:12}}>
        {showInvoiceNoteForm?'Cancel':'Send Note to Invoice'}
      </button>
    </div>
    {showInvoiceNoteForm && (
      <div style={{backgroundColor:'white',border:'1px solid #ddd',borderRadius:8,padding:14,marginBottom:16}}>
        <label style={{display:'block',fontSize:12,fontWeight:600,color:NAVY,marginBottom:6}}>Message to Invoice Account</label>
        <textarea value={invoiceNoteText} onChange={e=>setInvoiceNoteText(e.target.value)} placeholder="e.g. Query about last week's invoice, missing payment, extra work not showing..." rows={3} style={{width:'100%',padding:10,borderRadius:6,border:'1px solid #ccc',fontSize:13,fontFamily:'inherit',boxSizing:'border-box',resize:'vertical'}} />
        <button onClick={()=>{
          if(!invoiceNoteText.trim()){alert('Please type a message');return;}
          setPortalMessages(prev=>[...prev,{id:Date.now(),type:'carpenter',name:user?.name,message:invoiceNoteText.trim(),date:new Date().toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}),replied:false}]);
          setInvoiceNoteText('');setShowInvoiceNoteForm(false);
          setSuccessMsg('Note sent to invoice account');setTimeout(()=>setSuccessMsg(''),3000);
        }} style={{marginTop:8,backgroundColor:GOLD,color:NAVY,padding:'10px 20px',border:'none',borderRadius:6,cursor:'pointer',fontWeight:'bold',fontSize:13}}>Send Note</button>
      </div>
    )}
    {invoices.filter(i=>i.carpenter===user?.name).length===0?<p style={{color:'#666',fontSize:14}}>No invoices yet. Invoices are auto-generated when jobs are completed.</p>:(
      <div>
        {(() => {
          const myInvs = invoices.filter(i=>i.carpenter===user?.name);
          const getWeekKey = (dateStr) => {
            const d = new Date(dateStr); const day = d.getDay();
            const monday = new Date(d); monday.setDate(d.getDate() - ((day+6)%7));
            return monday.toISOString().split('T')[0];
          };
          const grouped = {};
          myInvs.forEach(inv=>{ const k = getWeekKey(inv.date); if(!grouped[k]) grouped[k]=[]; grouped[k].push(inv); });
          const weekKeys = Object.keys(grouped).sort((a,b)=>b.localeCompare(a));
          return weekKeys.map(wk=>{
            const weekInvs = grouped[wk];
            const weekStart = new Date(wk);
            const weekEnd = new Date(wk); weekEnd.setDate(weekStart.getDate()+4);
            const isExpanded = invoiceExpandedWeek === wk;

            // Build day-by-day data (Mon-Fri)
            const days = [];
            for(let i=0;i<5;i++){
              const d=new Date(weekStart);d.setDate(weekStart.getDate()+i);
              const ds=d.toISOString().split('T')[0];
              const dayInvs=weekInvs.filter(inv=>inv.date===ds);
              const dayExtras=(invoiceDayExtras[user?.name]||{})[ds]||[];
              const dayDelays=(invoiceDayDelays[user?.name]||{})[ds]||[];
              days.push({date:d,dateStr:ds,invoices:dayInvs,extras:dayExtras,delays:dayDelays});
            }

            // Calculate totals
            const jobsTotal = weekInvs.reduce((s,inv)=>s+parseFloat(inv.amount||0),0);
            const extrasTotal = days.reduce((s,day)=>s+day.extras.reduce((ss,e)=>ss+parseFloat(e.amount||0),0),0);
            const delaysTotal = days.reduce((s,day)=>s+day.delays.reduce((ss,dl)=>ss+parseFloat(dl.hours||0)*20,0),0);
            const weekSubtotal = jobsTotal + extrasTotal + delaysTotal;
            const markup = Math.round(weekSubtotal*0.06*100)/100;
            const weekTotal = Math.round((weekSubtotal+markup)*100)/100;
            const weekStatus = weekInvs.length>0 ? (weekInvs.every(i=>i.status==='paid')?'paid':weekInvs.every(i=>i.status==='approved'||i.status==='paid')?'approved':weekInvs.some(i=>i.status==='submitted')?'submitted':'pending') : 'pending';

            return (
              <div key={wk} style={{backgroundColor:'white',border:'1px solid #ddd',borderRadius:10,marginBottom:14,overflow:'hidden'}}>
                {/* Week header - clickable */}
                <div onClick={()=>setInvoiceExpandedWeek(isExpanded?null:wk)} style={{backgroundColor:NAVY,color:CREAM,padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8,cursor:'pointer'}}>
                  <div>
                    <div style={{fontSize:11,opacity:0.7,textTransform:'uppercase',letterSpacing:0.5}}>Week of</div>
                    <div style={{fontSize:15,fontWeight:'bold'}}>{weekStart.toLocaleDateString('en-GB',{day:'numeric',month:'short'})} – {weekEnd.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</div>
                    <div style={{fontSize:11,marginTop:4}}>
                      <span style={{padding:'2px 8px',borderRadius:10,fontSize:10,fontWeight:600,
                        backgroundColor:weekStatus==='paid'?'#4caf50':weekStatus==='approved'?'#2196f3':weekStatus==='submitted'?'#1565c0':'#ff9800',
                        color:'white'}}>{weekStatus.toUpperCase()}</span>
                      <span style={{marginLeft:8,opacity:0.6}}>{weekInvs.length} job{weekInvs.length!==1?'s':''}</span>
                    </div>
                  </div>
                  <div style={{textAlign:'right',display:'flex',alignItems:'center',gap:12}}>
                    <div>
                      <div style={{fontSize:11,opacity:0.7}}>Week Total (incl. 6%)</div>
                      <div style={{fontSize:20,fontWeight:'bold',color:GOLD}}>£{weekTotal.toFixed(2)}</div>
                    </div>
                    <span style={{fontSize:18}}>{isExpanded?'▲':'▼'}</span>
                  </div>
                </div>

                {/* Expanded content - day by day */}
                {isExpanded && (
                  <div style={{padding:12}}>
                    {days.map(day=>{
                      const dayName = day.date.toLocaleDateString('en-GB',{weekday:'long'});
                      const dayLabel = day.date.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'});
                      const dayJobTotal = day.invoices.reduce((s,inv)=>s+parseFloat(inv.amount||0),0);
                      const dayExtTotal = day.extras.reduce((s,e)=>s+parseFloat(e.amount||0),0);
                      const dayDelTotal = day.delays.reduce((s,dl)=>s+parseFloat(dl.hours||0)*20,0);
                      const dayTotal = dayJobTotal+dayExtTotal+dayDelTotal;
                      const hasContent = day.invoices.length>0||day.extras.length>0||day.delays.length>0;
                      const isEditingThisDay = editingDayDate===day.dateStr;

                      return (
                        <div key={day.dateStr} style={{borderBottom:'1px solid #eee',padding:'10px 0'}}>
                          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:hasContent?8:0}}>
                            <div style={{display:'flex',alignItems:'center',gap:8}}>
                              <div style={{width:8,height:8,borderRadius:'50%',backgroundColor:hasContent?GOLD:'#ddd'}}></div>
                              <strong style={{fontSize:13,color:NAVY}}>{dayLabel}</strong>
                            </div>
                            <div style={{display:'flex',alignItems:'center',gap:8}}>
                              {dayTotal>0 && <span style={{fontSize:13,fontWeight:600,color:NAVY}}>£{dayTotal.toFixed(2)}</span>}
                              {(weekStatus==='pending'||weekStatus==='submitted') && (
                                <button onClick={(e)=>{e.stopPropagation();setEditingDayDate(isEditingThisDay?null:day.dateStr);setDayExtraDesc('');setDayExtraAmount('');setDayDelayReason('');setDayDelayHours('');}} style={{fontSize:10,padding:'4px 10px',borderRadius:4,border:'1px solid '+(isEditingThisDay?'#d32f2f':'#90caf9'),backgroundColor:isEditingThisDay?'#ffebee':'#e3f2fd',color:isEditingThisDay?'#d32f2f':'#1565c0',cursor:'pointer',fontWeight:600}}>
                                  {isEditingThisDay?'Close':'+ Add'}
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Jobs completed this day */}
                          {day.invoices.map(inv=>(
                            <div key={inv.id} style={{marginLeft:16,padding:'4px 0',display:'flex',justifyContent:'space-between',fontSize:12}}>
                              <span style={{color:'#444'}}>{inv.site} — Plot {inv.plot} / {inv.stage}</span>
                              <strong>£{parseFloat(inv.amount||0).toFixed(2)}</strong>
                            </div>
                          ))}

                          {/* Extras for this day */}
                          {day.extras.map((ex,idx)=>(
                            <div key={'ex'+idx} style={{marginLeft:16,padding:'4px 0',display:'flex',justifyContent:'space-between',fontSize:12,color:'#1565c0'}}>
                              <span>+ Extra: {ex.desc}</span><strong>£{parseFloat(ex.amount||0).toFixed(2)}</strong>
                            </div>
                          ))}

                          {/* Delays for this day */}
                          {day.delays.map((dl,idx)=>(
                            <div key={'dl'+idx} style={{marginLeft:16,padding:'4px 0',display:'flex',justifyContent:'space-between',fontSize:12,color:'#e65100'}}>
                              <span>⏱ Delay: {dl.reason} ({dl.hours}hrs @ £20/hr)</span><strong>£{(parseFloat(dl.hours||0)*20).toFixed(2)}</strong>
                            </div>
                          ))}

                          {/* Add extra/delay form */}
                          {isEditingThisDay && (
                            <div style={{marginLeft:16,marginTop:8,padding:10,backgroundColor:'#f5f5f5',borderRadius:6,fontSize:12}}>
                              <div style={{marginBottom:8}}>
                                <strong style={{display:'block',marginBottom:4,color:NAVY}}>Add Extra Work</strong>
                                <div style={{display:'flex',gap:6}}>
                                  <input placeholder="Description" value={dayExtraDesc} onChange={e=>setDayExtraDesc(e.target.value)} style={{flex:2,padding:6,border:'1px solid #ccc',borderRadius:3,fontSize:12}}/>
                                  <input placeholder="£" type="number" value={dayExtraAmount} onChange={e=>setDayExtraAmount(e.target.value)} style={{flex:1,padding:6,border:'1px solid #ccc',borderRadius:3,fontSize:12}}/>
                                  <button onClick={()=>{
                                    if(!dayExtraDesc||!dayExtraAmount)return;
                                    setInvoiceDayExtras(prev=>{
                                      const cp={...prev};
                                      if(!cp[user?.name])cp[user?.name]={};
                                      if(!cp[user?.name][day.dateStr])cp[user?.name][day.dateStr]=[];
                                      cp[user?.name][day.dateStr]=[...cp[user?.name][day.dateStr],{desc:dayExtraDesc,amount:parseFloat(dayExtraAmount),addedAt:new Date().toISOString()}];
                                      return cp;
                                    });
                                    setDayExtraDesc('');setDayExtraAmount('');
                                    setSuccessMsg('Extra work added');setTimeout(()=>setSuccessMsg(''),2000);
                                  }} style={{padding:'6px 12px',backgroundColor:'#2e7d32',color:'white',border:'none',borderRadius:3,fontSize:11,fontWeight:'bold',cursor:'pointer'}}>Add</button>
                                </div>
                              </div>
                              <div>
                                <strong style={{display:'block',marginBottom:4,color:NAVY}}>Log Delay</strong>
                                <div style={{display:'flex',gap:6}}>
                                  <input placeholder="Reason (e.g. waiting for materials)" value={dayDelayReason} onChange={e=>setDayDelayReason(e.target.value)} style={{flex:2,padding:6,border:'1px solid #ccc',borderRadius:3,fontSize:12}}/>
                                  <input placeholder="Hours" type="number" step="0.5" value={dayDelayHours} onChange={e=>setDayDelayHours(e.target.value)} style={{flex:1,padding:6,border:'1px solid #ccc',borderRadius:3,fontSize:12}}/>
                                  <button onClick={()=>{
                                    if(!dayDelayReason||!dayDelayHours)return;
                                    setInvoiceDayDelays(prev=>{
                                      const cp={...prev};
                                      if(!cp[user?.name])cp[user?.name]={};
                                      if(!cp[user?.name][day.dateStr])cp[user?.name][day.dateStr]=[];
                                      cp[user?.name][day.dateStr]=[...cp[user?.name][day.dateStr],{reason:dayDelayReason,hours:parseFloat(dayDelayHours),addedAt:new Date().toISOString()}];
                                      return cp;
                                    });
                                    setDayDelayReason('');setDayDelayHours('');
                                    setSuccessMsg('Delay logged');setTimeout(()=>setSuccessMsg(''),2000);
                                  }} style={{padding:'6px 12px',backgroundColor:'#e65100',color:'white',border:'none',borderRadius:3,fontSize:11,fontWeight:'bold',cursor:'pointer'}}>Log</button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Week summary totals */}
                    <div style={{marginTop:10,paddingTop:10,borderTop:'2px solid #eee',fontSize:13}}>
                      <div style={{display:'flex',justifyContent:'space-between',padding:'2px 0'}}><span style={{color:'#666'}}>Jobs Total</span><span>£{jobsTotal.toFixed(2)}</span></div>
                      {extrasTotal>0 && <div style={{display:'flex',justifyContent:'space-between',padding:'2px 0'}}><span style={{color:'#1565c0'}}>Extra Work</span><span style={{color:'#1565c0'}}>£{extrasTotal.toFixed(2)}</span></div>}
                      {delaysTotal>0 && <div style={{display:'flex',justifyContent:'space-between',padding:'2px 0'}}><span style={{color:'#e65100'}}>Delay Claims</span><span style={{color:'#e65100'}}>£{delaysTotal.toFixed(2)}</span></div>}
                      <div style={{display:'flex',justifyContent:'space-between',padding:'2px 0'}}><span style={{color:'#666'}}>Subtotal</span><span>£{weekSubtotal.toFixed(2)}</span></div>
                      <div style={{display:'flex',justifyContent:'space-between',padding:'2px 0'}}><span style={{color:GOLD,fontWeight:'bold'}}>+ 6% uplift</span><span style={{color:GOLD,fontWeight:'bold'}}>£{markup.toFixed(2)}</span></div>
                      <div style={{display:'flex',justifyContent:'space-between',padding:'4px 0',fontWeight:'bold',fontSize:15,borderTop:'1px solid #eee',marginTop:4}}><span>Week Total</span><span>£{weekTotal.toFixed(2)}</span></div>
                    </div>
                  </div>
                )}
              </div>
            );
          });
        })()}

        {/* Grand totals summary */}
        <div style={{marginTop:15,padding:15,backgroundColor:NAVY,color:CREAM,borderRadius:8,fontSize:14}}>
          {(() => {
            const myInvs = invoices.filter(i=>i.carpenter===user?.name);
            const getWeekKey2 = (dateStr) => { const d=new Date(dateStr);const day=d.getDay();const monday=new Date(d);monday.setDate(d.getDate()-((day+6)%7));return monday.toISOString().split('T')[0]; };
            const calcWeekTotal = (status) => {
              const filtered = myInvs.filter(i=>i.status===status);
              const weeks = {};
              filtered.forEach(inv=>{ const wk=getWeekKey2(inv.date); if(!weeks[wk])weeks[wk]=[]; weeks[wk].push(inv); });
              let total = 0;
              Object.keys(weeks).forEach(wk=>{
                const weekStart=new Date(wk);
                let jobsT=weeks[wk].reduce((s,i)=>s+parseFloat(i.amount||0),0);
                let extT=0,delT=0;
                for(let i=0;i<5;i++){const d=new Date(weekStart);d.setDate(weekStart.getDate()+i);const ds=d.toISOString().split('T')[0];
                  const exts=(invoiceDayExtras[user?.name]||{})[ds]||[];extT+=exts.reduce((s,e)=>s+parseFloat(e.amount||0),0);
                  const dels=(invoiceDayDelays[user?.name]||{})[ds]||[];delT+=dels.reduce((s,dl)=>s+parseFloat(dl.hours||0)*20,0);
                }
                total+=(jobsT+extT+delT)*1.06;
              });
              return total;
            };
            return (<>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}><span>Pending (incl 6%):</span><strong>£{calcWeekTotal('pending').toFixed(2)}</strong></div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}><span>Submitted (incl 6%):</span><strong>£{calcWeekTotal('submitted').toFixed(2)}</strong></div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}><span>Approved (incl 6%):</span><strong>£{calcWeekTotal('approved').toFixed(2)}</strong></div>
              <div style={{display:'flex',justifyContent:'space-between'}}><span>Paid (incl 6%):</span><strong>£{calcWeekTotal('paid').toFixed(2)}</strong></div>
            </>);
          })()}
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
                    <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                      <button type="button" onClick={()=>{
                        const inp=document.createElement('input');inp.type='file';inp.accept='image/*';inp.capture='environment';
                        inp.onchange=(e)=>{const files=Array.from(e.target.files||[]);files.forEach(file=>{
                          const reader=new FileReader();reader.onload=(ev)=>setVoPhotos(prev=>[...prev,{id:Date.now()+Math.random(),dataUrl:ev.target.result,name:file.name}]);
                          reader.readAsDataURL(file);});};inp.click();
                      }} style={{backgroundColor:GOLD,color:NAVY,padding:'8px 16px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:13,display:'flex',alignItems:'center',gap:6}}>
                        Take Photo
                      </button>
                      <button type="button" onClick={()=>{
                        const inp=document.createElement('input');inp.type='file';inp.accept='image/*';inp.multiple=true;
                        inp.onchange=(e)=>{const files=Array.from(e.target.files||[]);files.forEach(file=>{
                          const reader=new FileReader();reader.onload=(ev)=>setVoPhotos(prev=>[...prev,{id:Date.now()+Math.random(),dataUrl:ev.target.result,name:file.name}]);
                          reader.readAsDataURL(file);});};inp.click();
                      }} style={{backgroundColor:NAVY,color:CREAM,padding:'8px 16px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:13,display:'flex',alignItems:'center',gap:6}}>
                        Upload Photo
                      </button>
                    </div>
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

          {/* ========== CARPENTER HOLIDAY REQUESTS ========== */}
          {user?.role === 'carpenter' && carpenterTab === 'request holiday' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Request Holiday</h2>
              <div style={{backgroundColor:NAVY,color:CREAM,padding:24,borderRadius:10,maxWidth:420,marginBottom:20}}>
                <div style={{marginBottom:16}}>
                  <label style={{display:'block',marginBottom:6,fontSize:12,fontWeight:'bold',color:GOLD}}>Start Date</label>
                  <input type="date" value={dayOffStart} onChange={e=>setDayOffStart(e.target.value)} style={{width:'100%',padding:10,borderRadius:6,border:'2px solid '+GOLD,fontSize:14,boxSizing:'border-box',backgroundColor:'rgba(255,255,255,.06)',color:'#fff'}} />
                </div>
                <div style={{marginBottom:16}}>
                  <label style={{display:'block',marginBottom:6,fontSize:12,fontWeight:'bold',color:GOLD}}>Number of Days</label>
                  <select value={dayOffEnd} onChange={e=>setDayOffEnd(e.target.value)} style={{width:'100%',padding:10,borderRadius:6,border:'2px solid '+GOLD,fontSize:14,boxSizing:'border-box',backgroundColor:'rgba(255,255,255,.06)',color:'#fff',appearance:'auto'}}>
                    <option value="" style={{color:'#333'}}>Select days...</option>
                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(n=><option key={n} value={n} style={{color:'#333'}}>{n} day{n>1?'s':''}</option>)}
                  </select>
                </div>
                <div style={{marginBottom:18}}>
                  <label style={{display:'block',marginBottom:6,fontSize:12,fontWeight:'bold',color:GOLD}}>Reason (optional)</label>
                  <textarea value={dayOffReason} onChange={e=>setDayOffReason(e.target.value)} placeholder="e.g. Family holiday, appointment..." style={{width:'100%',padding:10,borderRadius:6,border:'2px solid '+GOLD,minHeight:60,fontSize:13,boxSizing:'border-box',fontFamily:'inherit',backgroundColor:'rgba(255,255,255,.06)',color:'#fff'}} />
                </div>
                {dayOffStart && dayOffEnd && (
                  <div style={{backgroundColor:'rgba(196,162,101,.15)',border:'1px solid rgba(196,162,101,.3)',borderRadius:6,padding:12,marginBottom:16,fontSize:13}}>
                    <strong style={{color:GOLD}}>Holiday Summary:</strong>
                    <div style={{marginTop:6}}>{formatDate(dayOffStart)} — {formatDate((() => { const d=new Date(dayOffStart); d.setDate(d.getDate()+parseInt(dayOffEnd)-1); return d.toISOString().split('T')[0]; })())}</div>
                    <div style={{color:'rgba(255,255,255,.6)',marginTop:2}}>{dayOffEnd} day{parseInt(dayOffEnd)>1?'s':''} total</div>
                  </div>
                )}
                <button onClick={()=>{
                  if(!dayOffStart||!dayOffEnd){alert('Select a start date and number of days');return;}
                  const endDate=(()=>{const d=new Date(dayOffStart);d.setDate(d.getDate()+parseInt(dayOffEnd)-1);return d.toISOString().split('T')[0];})();
                  const req={id:Date.now(),carpenter:user?.name,startDate:dayOffStart,endDate:endDate,days:parseInt(dayOffEnd),reason:dayOffReason,status:'pending',requestedDate:new Date().toISOString().split('T')[0]};
                  setDayOffRequests(prev=>[...prev,req]);
                  setDayOffStart('');setDayOffEnd('');setDayOffReason('');
                  setSuccessMsg('Holiday request submitted for '+req.days+' day'+(req.days>1?'s':''));setTimeout(()=>setSuccessMsg(''),2500);
                }} style={{backgroundColor:GOLD,color:NAVY,padding:'12px 24px',border:'none',borderRadius:6,cursor:'pointer',fontWeight:'bold',fontSize:15,width:'100%'}}>Submit Holiday Request</button>
              </div>
              {dayOffRequests.filter(d=>d.carpenter===user?.name).length>0 && (
                <div>
                  <h3 style={{color:NAVY,fontSize:16,marginBottom:10}}>Your Holiday Requests</h3>
                  {dayOffRequests.filter(d=>d.carpenter===user?.name).sort((a,b)=>b.id-a.id).map(req=>(
                    <div key={req.id} style={{backgroundColor:'white',border:'1px solid #ddd',borderRadius:8,padding:14,marginBottom:8,borderLeft:'4px solid '+(req.status==='approved'?'#4caf50':req.status==='denied'?'#d32f2f':'#ff9800')}}>
                      <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:6}}>
                        <div>
                          <strong style={{fontSize:14}}>{formatDate(req.startDate)} — {formatDate(req.endDate)}</strong>
                          <div style={{fontSize:12,color:NAVY,marginTop:2,fontWeight:'bold'}}>{req.days||Math.ceil((new Date(req.endDate)-new Date(req.startDate))/(864e5))+1} day{(req.days||2)>1?'s':''}</div>
                          {req.reason&&<div style={{fontSize:12,color:'#666',marginTop:2}}>{req.reason}</div>}
                        </div>
                        <span style={{padding:'3px 12px',borderRadius:4,fontSize:11,fontWeight:'bold',height:'fit-content',
                          backgroundColor:req.status==='approved'?'#e8f5e9':req.status==='denied'?'#ffebee':'#fff3e0',
                          color:req.status==='approved'?'#2e7d32':req.status==='denied'?'#c62828':'#e65100'}}>{req.status.toUpperCase()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========== CARPENTER COVER NOTE ========== */}
          {user?.role === 'carpenter' && carpenterTab === 'cover note' && (
            <div>
              <h2 style={{color:NAVY,marginTop:0,fontSize:22}}>Cover Note</h2>
              <div style={{backgroundColor:'#fff3cd',border:'1px solid #ffc107',borderRadius:8,padding:12,marginBottom:16,fontSize:13,color:'#856404'}}>
                <strong>Protect Yourself.</strong> If a site manager has instructed you to carry out work despite your concerns about quality, materials, or safety — log it here. This creates a dated, sealed record that proves the decision was not yours. Once submitted, the entry is locked and sent to the office. You will not see it again — only admin can access these records.
              </div>
              <div style={{backgroundColor:NAVY,color:CREAM,padding:20,borderRadius:10,maxWidth:520}}>
                <div style={{marginBottom:14}}>
                  <label style={{display:'block',marginBottom:6,fontSize:12,fontWeight:'bold',color:GOLD}}>Category</label>
                  <select value={safetyCategory} onChange={e=>setSafetyCategory(e.target.value)} style={{width:'100%',padding:10,borderRadius:6,border:'2px solid '+GOLD,fontSize:14,boxSizing:'border-box',backgroundColor:'rgba(255,255,255,.06)',color:'#fff',appearance:'auto'}}>
                    <option value="" style={{color:'#333'}}>Select category...</option>
                    <option value="Instructed to proceed - defective materials" style={{color:'#333'}}>Instructed to proceed — defective materials</option>
                    <option value="Instructed to proceed - structural concern" style={{color:'#333'}}>Instructed to proceed — structural concern</option>
                    <option value="Instructed to proceed - sub-standard work" style={{color:'#333'}}>Instructed to proceed — sub-standard work on site</option>
                    <option value="Instructed to proceed - broken/damaged" style={{color:'#333'}}>Instructed to proceed — broken/damaged components</option>
                    <option value="Instructed to proceed - safety risk" style={{color:'#333'}}>Instructed to proceed — safety risk noted</option>
                    <option value="Instructed to proceed - other" style={{color:'#333'}}>Instructed to proceed — other concern</option>
                    <option value="Other" style={{color:'#333'}}>Other</option>
                  </select>
                </div>
                <div style={{marginBottom:14}}>
                  <label style={{display:'block',marginBottom:6,fontSize:12,fontWeight:'bold',color:GOLD}}>Plot Number</label>
                  <input type="text" value={safetyPlot} onChange={e=>setSafetyPlot(e.target.value)} placeholder="e.g. Plot 14" style={{width:'100%',padding:10,borderRadius:6,border:'2px solid '+GOLD,fontSize:14,boxSizing:'border-box',backgroundColor:'rgba(255,255,255,.06)',color:'#fff'}} />
                </div>
                <div style={{marginBottom:14}}>
                  <label style={{display:'block',marginBottom:6,fontSize:12,fontWeight:'bold',color:GOLD}}>Instructed By (Site Manager Name)</label>
                  <input type="text" value={safetyInstructedBy} onChange={e=>setSafetyInstructedBy(e.target.value)} placeholder="e.g. John Smith — Site Manager" style={{width:'100%',padding:10,borderRadius:6,border:'2px solid '+GOLD,fontSize:14,boxSizing:'border-box',backgroundColor:'rgba(255,255,255,.06)',color:'#fff'}} />
                </div>
                <div style={{marginBottom:14}}>
                  <label style={{display:'block',marginBottom:6,fontSize:12,fontWeight:'bold',color:GOLD}}>Description</label>
                  <textarea value={safetyDesc} onChange={e=>setSafetyDesc(e.target.value)} placeholder="Describe the issue, who instructed you to proceed, what was wrong, and why you had concerns..." style={{width:'100%',padding:10,borderRadius:6,border:'2px solid '+GOLD,minHeight:80,fontSize:13,boxSizing:'border-box',fontFamily:'inherit',backgroundColor:'rgba(255,255,255,.06)',color:'#fff'}} />
                </div>
                <div style={{marginBottom:14}}>
                  <label style={{display:'block',marginBottom:6,fontSize:12,fontWeight:'bold',color:GOLD}}>Photos</label>
                  <input type="file" accept="image/*" capture="environment" multiple onChange={e=>{
                    const files=Array.from(e.target.files||[]);
                    Promise.all(files.map(f=>new Promise(res=>{const r=new FileReader();r.onload=ev=>res(ev.target?.result);r.readAsDataURL(f);}))).then(imgs=>{
                      setSafetyPhotos(prev=>[...prev,...imgs]);
                    });
                  }} style={{width:'100%',padding:10,borderRadius:6,border:'2px solid '+GOLD,fontSize:13,boxSizing:'border-box',backgroundColor:'rgba(255,255,255,.06)',color:'#fff'}} />
                  {safetyPhotos.length>0 && (
                    <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:10}}>
                      {safetyPhotos.map((p,i)=>(
                        <div key={i} style={{position:'relative'}}>
                          <img src={p} alt="" style={{width:70,height:70,objectFit:'cover',borderRadius:4,border:'2px solid '+GOLD}} />
                          <button onClick={()=>setSafetyPhotos(prev=>prev.filter((_,x)=>x!==i))} style={{position:'absolute',top:-6,right:-6,backgroundColor:'#d32f2f',color:'white',border:'none',borderRadius:'50%',width:20,height:20,cursor:'pointer',fontSize:11,lineHeight:'20px',padding:0}}>×</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={()=>{
                  if(!safetyCategory){alert('Please select a category');return;}
                  if(!safetyPlot){alert('Please enter the plot number');return;}
                  if(!safetyDesc){alert('Please add a description');return;}
                  const entry={id:Date.now(),carpenter:user?.name,site:user?.site,builder:user?.builder,category:safetyCategory,plot:safetyPlot,instructedBy:safetyInstructedBy,description:safetyDesc,photos:safetyPhotos,date:new Date().toISOString()};
                  setSafetyLog(prev=>[...prev,entry]);
                  setSafetyCategory('');setSafetyPlot('');setSafetyInstructedBy('');setSafetyDesc('');setSafetyPhotos([]);
                  setSuccessMsg('Cover note filed & sealed. Sent to the office — no longer visible to you.');
                  setTimeout(()=>setSuccessMsg(''),4000);
                }} style={{backgroundColor:GOLD,color:NAVY,padding:'12px 24px',border:'none',borderRadius:6,cursor:'pointer',fontWeight:'bold',fontSize:15,width:'100%'}}>Submit & Seal Cover Note</button>
              </div>
            </div>
          )}

          {/* ========== ADMIN COVER NOTES ========== */}
          {user?.role === 'admin' && adminTab === 'cover notes' && (
            <div>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
                <button onClick={()=>{if(selectedSafetySite){setSelectedSafetySite(null);}else{setAdminTab(prevAdminTab||'dashboard');}}} style={{backgroundColor:'transparent',border:'none',cursor:'pointer',fontSize:22,color:NAVY,padding:0,lineHeight:1}}>←</button>
                <h2 style={{color:NAVY,marginTop:0,marginBottom:0,fontSize:22}}>Cover Notes{selectedSafetySite?' — '+selectedSafetySite:''}</h2>
              </div>
              {!selectedSafetySite && (
                <div>
                  <p style={{color:'#666',fontSize:13,marginBottom:16}}>Confidential cover notes filed by carpenters when instructed to proceed with work despite concerns. Entries are grouped by site.</p>
                  {(() => {
                    const bySite = {};
                    safetyLog.forEach(s=>{ if(!bySite[s.site]) bySite[s.site]=[]; bySite[s.site].push(s); });
                    const sites = Object.keys(bySite);
                    if(sites.length===0) return <p style={{color:'#999',fontSize:14}}>No cover notes filed yet.</p>;
                    return (
                      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:12}}>
                        {sites.map(site=>(
                          <div key={site} onClick={()=>setSelectedSafetySite(site)} style={{backgroundColor:'white',border:'1px solid #e0e0e0',borderRadius:10,padding:16,cursor:'pointer',borderLeft:'4px solid #d32f2f'}}>
                            <div style={{fontSize:16,fontWeight:'bold',color:NAVY,marginBottom:4}}>{site}</div>
                            <div style={{fontSize:13,color:'#666'}}>{bySite[site].length} entr{bySite[site].length===1?'y':'ies'}</div>
                            <div style={{fontSize:11,color:'#999',marginTop:6}}>Latest: {new Date(Math.max(...bySite[site].map(e=>new Date(e.date).getTime()))).toLocaleDateString('en-GB')}</div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              )}
              {selectedSafetySite && (
                <div>
                  {safetyLog.filter(s=>s.site===selectedSafetySite).sort((a,b)=>new Date(b.date).getTime()-new Date(a.date).getTime()).map(entry=>(
                    <div key={entry.id} style={{backgroundColor:'white',border:'1px solid #e0e0e0',borderRadius:10,padding:16,marginBottom:12,borderLeft:'4px solid #d32f2f'}}>
                      <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:8,marginBottom:8}}>
                        <div>
                          <span style={{fontWeight:'bold',fontSize:15,color:NAVY}}>{entry.category}</span>
                          <span style={{fontSize:13,color:'#666',marginLeft:8}}>— {entry.plot}</span>
                        </div>
                        <span style={{fontSize:12,color:'#888'}}>{new Date(entry.date).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})}</span>
                      </div>
                      <div style={{fontSize:13,color:'#555',marginBottom:4}}>Filed by: <strong>{entry.carpenter}</strong></div>
                      {entry.instructedBy && <div style={{fontSize:13,color:'#d32f2f',marginBottom:8}}>Instructed by: <strong>{entry.instructedBy}</strong></div>}
                      <div style={{fontSize:14,color:'#333',marginBottom:10,whiteSpace:'pre-wrap',backgroundColor:'#fafafa',padding:10,borderRadius:6,border:'1px solid #eee'}}>{entry.description}</div>
                      {entry.photos && entry.photos.length>0 && (
                        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                          {entry.photos.map((p,i)=>(
                            <a key={i} href={p} target="_blank" rel="noreferrer"><img src={p} alt="" style={{width:120,height:120,objectFit:'cover',borderRadius:6,border:'1px solid #ddd',cursor:'pointer'}} /></a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========== ADMIN: HOLIDAY APPROVALS ========== */}
          {(user?.role === 'admin') && adminTab === 'holidays' && (
            <div>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
                <button onClick={()=>{setAdminTab(prevAdminTab||'dashboard');}} style={{backgroundColor:'transparent',border:'none',cursor:'pointer',fontSize:22,color:NAVY,padding:0,lineHeight:1}}>←</button>
                <h2 style={{color:NAVY,marginTop:0,marginBottom:0,fontSize:22}}>Holiday Requests</h2>
              </div>
              {dayOffRequests.length===0?<p style={{color:'#666',fontSize:14}}>No holiday requests.</p>:(
                <div>
                  {dayOffRequests.sort((a,b)=>b.id-a.id).map(req=>{
                    const days=req.days||Math.ceil((new Date(req.endDate)-new Date(req.startDate))/(864e5))+1;
                    return (
                    <div key={req.id} style={{backgroundColor:'white',border:'1px solid #ddd',borderRadius:8,padding:14,marginBottom:10,borderLeft:'4px solid '+(req.status==='approved'?'#4caf50':req.status==='denied'?'#d32f2f':'#ff9800')}}>
                      <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:8}}>
                        <div>
                          <strong style={{fontSize:15}}>{req.carpenter}</strong>
                          <div style={{fontSize:13,color:NAVY,marginTop:4,fontWeight:'bold'}}>{formatDate(req.startDate)} — {formatDate(req.endDate)} <span style={{color:GOLD}}>({days} day{days>1?'s':''})</span></div>
                          {req.reason&&<div style={{fontSize:12,color:'#888',marginTop:2}}>{req.reason}</div>}
                        </div>
                        <div style={{display:'flex',gap:8,alignItems:'flex-start'}}>
                          {req.status==='pending'?(
                            <>
                              <button onClick={()=>{setDayOffRequests(prev=>prev.map(d=>d.id===req.id?{...d,status:'approved'}:d));setSuccessMsg(req.carpenter+"'s holiday approved — added to schedule");setTimeout(()=>setSuccessMsg(''),3000);}} style={{backgroundColor:'#4caf50',color:'white',padding:'10px 16px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:13}}>Approve</button>
                              <button onClick={()=>setDayOffRequests(prev=>prev.map(d=>d.id===req.id?{...d,status:'denied'}:d))} style={{backgroundColor:'#d32f2f',color:'white',padding:'10px 16px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:13}}>Deny</button>
                            </>
                          ):(
                            <span style={{padding:'4px 12px',borderRadius:4,fontSize:12,fontWeight:'bold',
                              backgroundColor:req.status==='approved'?'#e8f5e9':'#ffebee',
                              color:req.status==='approved'?'#2e7d32':'#c62828'}}>{req.status.toUpperCase()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );})}
                </div>
              )}
            </div>
          )}

          {/* ========== ADMIN: VARIATION ORDERS APPROVAL ========== */}
          {(user?.role === 'admin') && adminTab === 'variations' && (
            <div>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
                <button onClick={()=>{setAdminTab(prevAdminTab||'dashboard');}} style={{backgroundColor:'transparent',border:'none',cursor:'pointer',fontSize:22,color:NAVY,padding:0,lineHeight:1}}>←</button>
                <h2 style={{color:NAVY,marginTop:0,marginBottom:0,fontSize:22}}>Variation Orders</h2>
              </div>
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
                              <button onClick={()=>{setVariationOrders(prev=>prev.map(v=>v.id===vo.id?{...v,status:'approved'}:v));const voInv={id:Date.now()+Math.random(),carpenter:vo.carpenter,site:vo.site,plot:vo.plot||'VO',houseType:'Variation Order',stage:vo.desc.slice(0,50),amount:vo.amount,status:'pending',date:vo.date,isVariation:true,voId:vo.id};setInvoices(prev=>[...prev,voInv]);addInvoice({carpenter:vo.carpenter,site:vo.site,plot:vo.plot||'VO',house_type:'Variation Order',stage:vo.desc.slice(0,50),amount:vo.amount,status:'pending',date:vo.date}).catch(e=>console.error('DB VO invoice err:',e));setSuccessMsg('Approved — added to '+vo.carpenter+"'s invoice");setTimeout(()=>setSuccessMsg(''),3000);}} style={{backgroundColor:'#4caf50',color:'white',padding:'10px 16px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:13}}>Approve</button>
                              <button onClick={()=>setVariationOrders(prev=>prev.map(v=>v.id===vo.id?{...v,status:'rejected'}:v))} style={{backgroundColor:'#d32f2f',color:'white',padding:'10px 16px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:13}}>Reject</button>
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

          {/* ========== ADMIN SCHEDULE CHANGE REQUESTS ========== */}
          {user?.role === 'admin' && adminTab === 'sched requests' && (
            <div>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
                <button onClick={()=>{setAdminTab(prevAdminTab||'dashboard');}} style={{backgroundColor:'transparent',border:'none',cursor:'pointer',fontSize:22,color:NAVY,padding:0,lineHeight:1}}>←</button>
                <h2 style={{fontSize:22, fontWeight:700, marginBottom:0, marginTop:0, color:NAVY}}>Schedule Change Requests</h2>
              </div>
              {schedChangeRequests.length === 0 && (
                <div style={{padding:20, textAlign:'center', color:'#888'}}>No schedule change requests</div>
              )}
              {schedChangeRequests.map(r => (
                <div key={r.id} style={{
                  backgroundColor:'white', borderRadius:10, padding:16, marginBottom:12,
                  borderLeft: '4px solid ' + (r.status === 'pending' ? GOLD : r.status === 'approved' ? '#4caf50' : '#e53935'),
                  border:'1px solid #e0e0e0'
                }}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8, marginBottom:8}}>
                    <div>
                      <span style={{fontWeight:700, fontSize:15, color:NAVY}}>{r.carpenter_name}</span>
                      <span style={{fontSize:13, color:'#666', marginLeft:8}}>at {r.site}</span>
                    </div>
                    <span style={{
                      fontSize:12, fontWeight:700, padding:'4px 12px', borderRadius:20,
                      backgroundColor: r.status === 'pending' ? '#fff3e0' : r.status === 'approved' ? '#e8f5e9' : '#ffebee',
                      color: r.status === 'pending' ? '#e65100' : r.status === 'approved' ? '#2e7d32' : '#c62828'
                    }}>{r.status?.toUpperCase()}</span>
                  </div>
                  <div style={{fontSize:13, color:'#555', marginBottom:4}}>Requested by: <strong>{r.requested_by}</strong></div>
                  <div style={{fontSize:14, color:NAVY, marginBottom:4, fontWeight:600}}>{r.requested_change}</div>
                  <div style={{fontSize:13, color:'#666', marginBottom:12}}>Reason: {r.reason}</div>

                  {r.status === 'pending' && (
                    <div style={{display:'flex', gap:10}}>
                      <button onClick={async () => {
                        try {
                          await supabase.from('schedule_change_requests').update({status:'approved'}).eq('id', r.id);
                          const { data } = await supabase.from('schedule_change_requests').select('*').order('created_at', { ascending: false });
                          if (data) setSchedChangeRequests(data);
                        } catch(e) { console.error('Error:', e); }
                      }} style={{
                        flex:1, backgroundColor:'#4caf50', color:'white', border:'none', borderRadius:8,
                        padding:'10px 16px', fontSize:14, fontWeight:'bold', cursor:'pointer'
                      }}>Approve</button>
                      <button onClick={async () => {
                        try {
                          await supabase.from('schedule_change_requests').update({status:'denied'}).eq('id', r.id);
                          const { data } = await supabase.from('schedule_change_requests').select('*').order('created_at', { ascending: false });
                          if (data) setSchedChangeRequests(data);
                        } catch(e) { console.error('Error:', e); }
                      }} style={{
                        flex:1, backgroundColor:'#e53935', color:'white', border:'none', borderRadius:8,
                        padding:'10px 16px', fontSize:14, fontWeight:'bold', cursor:'pointer'
                      }}>Deny</button>
                    </div>
                  )}

                  {r.created_at && (
                    <div style={{fontSize:11, color:'#aaa', marginTop:8}}>{new Date(r.created_at).toLocaleDateString('en-GB', {day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit'})}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ========== INVOICE/OFFICE ========== */}
          {(user?.role === 'invoice' || (user?.role === 'admin' && adminTab === 'invoices')) && (
            <div>
              {user?.role === 'admin' && (
                <div style={{marginBottom:12}}>
                  <button onClick={()=>{setAdminTab(prevAdminTab||'dashboard');}} style={{backgroundColor:'transparent',border:'none',cursor:'pointer',fontSize:22,color:NAVY,padding:0,lineHeight:1}}>←</button>
                </div>
              )}
              {/* Tab navigation */}
              <div style={{display:'flex', gap:8, marginBottom:20, flexWrap:'wrap'}}>
                {(user?.role === 'admin' ? ['Dashboard','All Invoices','All Sites','My Lead Sites'] : ['Dashboard','All Invoices','All Sites','Carpenters','Messages']).map(tab => (
                  <button key={tab} onClick={() => { setInvoiceTab(tab.toLowerCase()); setSelectedInvoiceSite(null); setInvoiceCarpenterView(null); }}
                    style={{
                      backgroundColor: invoiceTab === tab.toLowerCase() ? GOLD : 'white',
                      color: invoiceTab === tab.toLowerCase() ? NAVY : '#555',
                      border: invoiceTab === tab.toLowerCase() ? 'none' : '1px solid #ddd',
                      borderRadius:8, padding:'10px 18px', fontSize:14, fontWeight:'bold', cursor:'pointer'
                    }}>
                    {tab}
                  </button>
                ))}
              </div>

              {/* DASHBOARD TAB */}
              {invoiceTab === 'dashboard' && (
  <div>
    <h2 style={{fontSize:22, fontWeight:700, color:NAVY, marginBottom:8}}>Invoice Dashboard</h2>
    <div style={{backgroundColor:'#e3f2fd',border:'1px solid #90caf9',borderRadius:8,padding:'10px 14px',marginBottom:16,fontSize:12,color:'#1565c0',display:'flex',alignItems:'center',gap:8}}>
      <span style={{fontSize:12,fontWeight:700}}>i</span>
      <span>Invoices auto-submit <strong>Friday 8pm</strong>. Review and adjust weekly invoices before approving.</span>
    </div>

    {/* Stat cards row */}
    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))', gap:12, marginBottom:24}}>
      {[
        {label:'Total Pending', value: invoices.filter(i=>i.status==='pending'||i.status==='submitted').length, color:'#fff3e0', click:()=>setInvoiceTab('all invoices')},
        {label:'Pending Value', value: '£'+invoices.filter(i=>i.status==='pending'||i.status==='submitted').reduce((s,i)=>s+(parseFloat(i.amount)||0),0).toLocaleString(), color:'#fff3e0'},
        {label:'Approved', value: invoices.filter(i=>i.status==='approved'||i.status==='signed').length, color:'#e8f5e9'},
        {label:'Paid', value: invoices.filter(i=>i.status==='paid').length, color:'#e8f5e9'},
        {label:'Variation Orders', value: invoices.filter(i=>i.variation_order).length, color:'#e3f2fd'},
        {label:'Active Sites', value: [...new Set(allocations.filter(a=>!a.completed).map(a=>a.site))].length, color:'#f3e5f5', click:()=>setInvoiceTab('all sites')},
      ].map((card,i) => (
        <div key={i} onClick={card.click} style={{
          backgroundColor:card.color, borderRadius:10, padding:16, cursor:card.click?'pointer':'default'
        }}>
          <div style={{fontSize:12, color:'#666', marginBottom:4}}>{card.label}</div>
          <div style={{fontSize:22, fontWeight:700, color:NAVY}}>{card.value}</div>
        </div>
      ))}
    </div>

    {/* Pending Weekly Invoices */}
    <h3 style={{fontSize:17, fontWeight:700, color:NAVY, marginBottom:12}}>Pending Weekly Invoices</h3>
    {(() => {
      const pendingInvs = invoices.filter(i=>i.status==='pending'||i.status==='submitted');
      if(pendingInvs.length===0) return <div style={{padding:20, textAlign:'center', color:'#888'}}>No pending invoices</div>;

      // Group by carpenter then by week
      const getWeekKey = (dateStr) => {
        const d = new Date(dateStr); const day = d.getDay();
        const monday = new Date(d); monday.setDate(d.getDate() - ((day+6)%7));
        return monday.toISOString().split('T')[0];
      };
      const carpWeeks = {};
      pendingInvs.forEach(inv=>{
        const wk = getWeekKey(inv.date);
        const key = inv.carpenter+'|'+wk;
        if(!carpWeeks[key]) carpWeeks[key]={carpenter:inv.carpenter,weekKey:wk,invoices:[]};
        carpWeeks[key].invoices.push(inv);
      });

      return Object.values(carpWeeks).sort((a,b)=>b.weekKey.localeCompare(a.weekKey)).map(cw=>{
        const weekStart=new Date(cw.weekKey);
        const weekEnd=new Date(cw.weekKey);weekEnd.setDate(weekStart.getDate()+4);
        const isExp = invoiceExpandedWeek === cw.carpenter+'|'+cw.weekKey;
        const isEditing = adminEditingInvoice === cw.carpenter+'|'+cw.weekKey;

        // Build day data
        const days=[];
        for(let i=0;i<5;i++){
          const d=new Date(weekStart);d.setDate(weekStart.getDate()+i);
          const ds=d.toISOString().split('T')[0];
          const dayInvs=cw.invoices.filter(inv=>inv.date===ds);
          const dayExtras=(invoiceDayExtras[cw.carpenter]||{})[ds]||[];
          const dayDelays=(invoiceDayDelays[cw.carpenter]||{})[ds]||[];
          days.push({date:d,dateStr:ds,invoices:dayInvs,extras:dayExtras,delays:dayDelays});
        }

        const jobsTotal=cw.invoices.reduce((s,i)=>s+parseFloat(i.amount||0),0);
        const extrasTotal=days.reduce((s,day)=>s+day.extras.reduce((ss,e)=>ss+parseFloat(e.amount||0),0),0);
        const delaysTotal=days.reduce((s,day)=>s+day.delays.reduce((ss,dl)=>ss+parseFloat(dl.hours||0)*20,0),0);
        const weekSubtotal=jobsTotal+extrasTotal+delaysTotal;
        const markup=Math.round(weekSubtotal*0.06*100)/100;
        const weekTotal=Math.round((weekSubtotal+markup)*100)/100;

        return (
          <div key={cw.carpenter+'|'+cw.weekKey} style={{backgroundColor:'white',borderRadius:10,border:'1px solid #e0e0e0',marginBottom:10,overflow:'hidden'}}>
            <div onClick={()=>setInvoiceExpandedWeek(isExp?null:cw.carpenter+'|'+cw.weekKey)} style={{padding:'14px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer',flexWrap:'wrap',gap:8}}>
              <div>
                <div style={{fontWeight:700, fontSize:14, color:NAVY}}>{cw.carpenter}</div>
                <div style={{fontSize:12, color:'#666'}}>{weekStart.toLocaleDateString('en-GB',{day:'numeric',month:'short'})} – {weekEnd.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})} · {cw.invoices.length} job{cw.invoices.length!==1?'s':''}</div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <span style={{fontSize:18, fontWeight:700, color:NAVY}}>£{weekTotal.toFixed(2)}</span>
                <span style={{fontSize:14,color:'#999'}}>{isExp?'▲':'▼'}</span>
              </div>
            </div>

            {isExp && (
              <div style={{padding:'0 16px 16px',borderTop:'1px solid #eee'}}>
                {/* Day by day breakdown */}
                {days.map(day=>{
                  const dayLabel=day.date.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'});
                  const hasContent=day.invoices.length>0||day.extras.length>0||day.delays.length>0;
                  return (
                    <div key={day.dateStr} style={{padding:'8px 0',borderBottom:'1px solid #f0f0f0'}}>
                      <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:hasContent?4:0}}>
                        <div style={{width:6,height:6,borderRadius:'50%',backgroundColor:hasContent?GOLD:'#ddd'}}></div>
                        <span style={{fontSize:12,fontWeight:600,color:NAVY}}>{dayLabel}</span>
                      </div>
                      {day.invoices.map(inv=>(
                        <div key={inv.id} style={{marginLeft:14,padding:'3px 0',display:'flex',justifyContent:'space-between',fontSize:12}}>
                          <span>{inv.site} — Plot {inv.plot} / {inv.stage}</span>
                          <strong>£{parseFloat(inv.amount||0).toFixed(2)}</strong>
                        </div>
                      ))}
                      {day.extras.map((ex,idx)=>(
                        <div key={'ex'+idx} style={{marginLeft:14,padding:'3px 0',display:'flex',justifyContent:'space-between',fontSize:12,color:'#1565c0'}}>
                          <span>+ {ex.desc}</span><strong>£{parseFloat(ex.amount||0).toFixed(2)}</strong>
                        </div>
                      ))}
                      {day.delays.map((dl,idx)=>(
                        <div key={'dl'+idx} style={{marginLeft:14,padding:'3px 0',display:'flex',justifyContent:'space-between',fontSize:12,color:'#e65100'}}>
                          <span>⏱ {dl.reason} ({dl.hours}h)</span><strong>£{(parseFloat(dl.hours||0)*20).toFixed(2)}</strong>
                        </div>
                      ))}
                    </div>
                  );
                })}

                {/* Totals */}
                <div style={{marginTop:10,paddingTop:8,borderTop:'2px solid #eee',fontSize:12}}>
                  <div style={{display:'flex',justifyContent:'space-between',padding:'2px 0'}}><span>Jobs</span><span>£{jobsTotal.toFixed(2)}</span></div>
                  {extrasTotal>0&&<div style={{display:'flex',justifyContent:'space-between',padding:'2px 0',color:'#1565c0'}}><span>Extras</span><span>£{extrasTotal.toFixed(2)}</span></div>}
                  {delaysTotal>0&&<div style={{display:'flex',justifyContent:'space-between',padding:'2px 0',color:'#e65100'}}><span>Delays</span><span>£{delaysTotal.toFixed(2)}</span></div>}
                  <div style={{display:'flex',justifyContent:'space-between',padding:'2px 0'}}><span>Subtotal</span><span>£{weekSubtotal.toFixed(2)}</span></div>
                  <div style={{display:'flex',justifyContent:'space-between',padding:'2px 0',color:GOLD,fontWeight:600}}><span>+ 6%</span><span>£{markup.toFixed(2)}</span></div>
                  <div style={{display:'flex',justifyContent:'space-between',padding:'4px 0',fontWeight:700,fontSize:14,borderTop:'1px solid #eee',marginTop:4}}><span>Total</span><span>£{weekTotal.toFixed(2)}</span></div>
                </div>

                {/* Admin adjustment form */}
                {isEditing ? (
                  <div style={{marginTop:10,padding:10,backgroundColor:'#fff3e0',borderRadius:6,fontSize:12}}>
                    <strong style={{display:'block',marginBottom:6,color:NAVY}}>Adjust Invoice</strong>
                    <div style={{display:'flex',gap:6}}>
                      <input placeholder="Adjustment reason" value={adminAdjustDesc} onChange={e=>setAdminAdjustDesc(e.target.value)} style={{flex:2,padding:6,border:'1px solid #ccc',borderRadius:3,fontSize:12}}/>
                      <input placeholder="£ (negative to reduce)" type="number" value={adminAdjustAmount} onChange={e=>setAdminAdjustAmount(e.target.value)} style={{flex:1,padding:6,border:'1px solid #ccc',borderRadius:3,fontSize:12}}/>
                      <button onClick={()=>{
                        if(!adminAdjustDesc||!adminAdjustAmount)return;
                        const ds=new Date().toISOString().split('T')[0];
                        setInvoiceDayExtras(prev=>{
                          const cp={...prev};
                          if(!cp[cw.carpenter])cp[cw.carpenter]={};
                          if(!cp[cw.carpenter][ds])cp[cw.carpenter][ds]=[];
                          cp[cw.carpenter][ds]=[...cp[cw.carpenter][ds],{desc:'[ADMIN] '+adminAdjustDesc,amount:parseFloat(adminAdjustAmount),addedAt:new Date().toISOString(),addedBy:user?.name}];
                          return cp;
                        });
                        setAdminAdjustDesc('');setAdminAdjustAmount('');setAdminEditingInvoice(null);
                        setSuccessMsg('Adjustment added');setTimeout(()=>setSuccessMsg(''),2500);
                      }} style={{padding:'6px 12px',backgroundColor:GOLD,color:NAVY,border:'none',borderRadius:3,fontSize:11,fontWeight:'bold',cursor:'pointer'}}>Apply</button>
                      <button onClick={()=>setAdminEditingInvoice(null)} style={{padding:'6px 12px',backgroundColor:'#999',color:'white',border:'none',borderRadius:3,fontSize:11,cursor:'pointer'}}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div style={{display:'flex',gap:8,marginTop:10}}>
                    <button onClick={()=>setAdminEditingInvoice(cw.carpenter+'|'+cw.weekKey)} style={{padding:'8px 14px',fontSize:12,backgroundColor:'#fff3e0',color:'#e65100',border:'1px solid #ffe0b2',borderRadius:6,cursor:'pointer',fontWeight:600}}>Adjust</button>
                    <button onClick={async()=>{
                      const updated=invoices.map(i=>{
                        if(i.carpenter===cw.carpenter&&cw.invoices.some(ci=>ci.id===i.id)){
                          return {...i,status:'approved',approved_by:user?.name,approved_at:new Date().toISOString()};
                        }
                        return i;
                      });
                      setInvoices(updated);
                      for(const inv of cw.invoices){
                        try{await updateInvoice(inv.id,{status:'approved',approved_by:user?.name,approved_at:new Date().toISOString()});}catch(e){}
                      }
                      setSuccessMsg('Week signed off for '+cw.carpenter);setTimeout(()=>setSuccessMsg(''),2500);
                    }} style={{padding:'8px 14px',fontSize:12,backgroundColor:'#4caf50',color:'white',border:'none',borderRadius:6,cursor:'pointer',fontWeight:'bold'}}>Sign Off Week</button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      });
    })()}
  </div>
)}

              {/* ALL INVOICES TAB */}
              {invoiceTab === 'all invoices' && (
                <div>
                  <h2 style={{fontSize:22, fontWeight:700, color:NAVY, marginBottom:20}}>All Invoices</h2>
                  {(() => {
                    // Group all invoices by status → carpenter → week
                    const getWeekKey = (dateStr) => {
                      const d = new Date(dateStr); const day = d.getDay();
                      const monday = new Date(d); monday.setDate(d.getDate() - ((day+6)%7));
                      return monday.toISOString().split('T')[0];
                    };
                    const statusGroups = [
                      {status:'pending', label:'Pending', headerColor:'#fff3e0', badgeColor:'#ff9800'},
                      {status:'submitted', label:'Submitted', headerColor:'#e3f2fd', badgeColor:'#1565c0'},
                      {status:'approved', label:'Approved', headerColor:'#e8f5e9', badgeColor:'#4caf50'},
                      {status:'paid', label:'Paid', headerColor:'#e8f5e9', badgeColor:'#2e7d32'}
                    ];
                    return statusGroups.map(sg => {
                      const statusInvs = invoices.filter(i => i.status===sg.status || (sg.status==='pending' && i.status==='submitted'));
                      if(sg.status==='submitted') return null; // merged into pending
                      const actualInvs = sg.status==='pending' ? invoices.filter(i=>i.status==='pending'||i.status==='submitted') : invoices.filter(i=>i.status===sg.status);
                      if(actualInvs.length===0) return (
                        <div key={sg.status} style={{marginBottom:24}}>
                          <h3 style={{fontSize:16, fontWeight:700, color:NAVY, marginBottom:12}}>{sg.label}</h3>
                          <p style={{color:'#888', fontSize:14}}>No {sg.label.toLowerCase()} invoices</p>
                        </div>
                      );
                      // Group by carpenter → week
                      const carpWeeks = {};
                      actualInvs.forEach(inv => {
                        const wk = getWeekKey(inv.date);
                        const key = inv.carpenter+'|'+wk;
                        if(!carpWeeks[key]) carpWeeks[key]={carpenter:inv.carpenter,weekKey:wk,invoices:[]};
                        carpWeeks[key].invoices.push(inv);
                      });
                      const sorted = Object.values(carpWeeks).sort((a,b)=>b.weekKey.localeCompare(a.weekKey)||a.carpenter.localeCompare(b.carpenter));

                      return (
                        <div key={sg.status} style={{marginBottom:24}}>
                          <h3 style={{fontSize:16, fontWeight:700, color:NAVY, marginBottom:12}}>{sg.label}</h3>
                          {sorted.map(cw => {
                            const weekStart = new Date(cw.weekKey);
                            const weekEnd = new Date(cw.weekKey); weekEnd.setDate(weekStart.getDate()+4);
                            const expKey = sg.status+'|'+cw.carpenter+'|'+cw.weekKey;
                            const isExp = invoiceWeekExpanded === expKey;
                            // Day-by-day data
                            const days = [];
                            for(let i=0;i<5;i++){
                              const d=new Date(weekStart);d.setDate(weekStart.getDate()+i);
                              const ds=d.toISOString().split('T')[0];
                              days.push({date:d,dateStr:ds,invoices:cw.invoices.filter(inv=>inv.date===ds),
                                extras:(invoiceDayExtras[cw.carpenter]||{})[ds]||[],
                                delays:(invoiceDayDelays[cw.carpenter]||{})[ds]||[]});
                            }
                            const jobsTotal = cw.invoices.reduce((s,i)=>s+parseFloat(i.amount||0),0);
                            const extrasTotal = days.reduce((s,d)=>s+d.extras.reduce((ss,e)=>ss+parseFloat(e.amount||0),0),0);
                            const delaysTotal = days.reduce((s,d)=>s+d.delays.reduce((ss,dl)=>ss+parseFloat(dl.hours||0)*20,0),0);
                            const subtotal = jobsTotal+extrasTotal+delaysTotal;
                            const markup = Math.round(subtotal*0.06*100)/100;
                            const weekTotal = Math.round((subtotal+markup)*100)/100;

                            return (
                              <div key={expKey} style={{backgroundColor:'white',borderRadius:10,border:'1px solid #e0e0e0',marginBottom:10,overflow:'hidden'}}>
                                <div onClick={()=>setInvoiceWeekExpanded(isExp?null:expKey)} style={{padding:'14px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer',flexWrap:'wrap',gap:8}}>
                                  <div>
                                    <div style={{fontWeight:700, fontSize:15, color:NAVY}}>{cw.carpenter}</div>
                                    <div style={{fontSize:12, color:'#666'}}>{weekStart.toLocaleDateString('en-GB',{day:'numeric',month:'short'})} – {weekEnd.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})} · {cw.invoices.length} job{cw.invoices.length!==1?'s':''}</div>
                                  </div>
                                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                                    <div style={{textAlign:'right'}}>
                                      <div style={{fontSize:18, fontWeight:700, color:NAVY}}>£{weekTotal.toFixed(2)}</div>
                                      <div style={{fontSize:10, color:'#999'}}>incl. 6%</div>
                                    </div>
                                    <span style={{fontSize:14,color:'#999'}}>{isExp?'▲':'▼'}</span>
                                  </div>
                                </div>

                                {isExp && (
                                  <div style={{padding:'0 16px 16px',borderTop:'1px solid #eee'}}>
                                    {days.map(day => {
                                      const dayLabel = day.date.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'});
                                      const hasContent = day.invoices.length>0||day.extras.length>0||day.delays.length>0;
                                      return (
                                        <div key={day.dateStr} style={{padding:'6px 0',borderBottom:'1px solid #f5f5f5'}}>
                                          <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:hasContent?4:0}}>
                                            <div style={{width:6,height:6,borderRadius:'50%',backgroundColor:hasContent?GOLD:'#ddd'}}></div>
                                            <span style={{fontSize:12,fontWeight:600,color:NAVY}}>{dayLabel}</span>
                                          </div>
                                          {day.invoices.map(inv=>(
                                            <div key={inv.id} style={{marginLeft:14,padding:'3px 0',display:'flex',justifyContent:'space-between',fontSize:12}}>
                                              <span style={{color:'#444'}}>{inv.site} — Plot {inv.plot} / {inv.stage}</span>
                                              <strong>£{parseFloat(inv.amount||0).toFixed(2)}</strong>
                                            </div>
                                          ))}
                                          {day.extras.map((ex,idx)=>(
                                            <div key={'ex'+idx} style={{marginLeft:14,padding:'3px 0',display:'flex',justifyContent:'space-between',fontSize:12,color:'#1565c0'}}>
                                              <span>+ {ex.desc}</span><strong>£{parseFloat(ex.amount||0).toFixed(2)}</strong>
                                            </div>
                                          ))}
                                          {day.delays.map((dl,idx)=>(
                                            <div key={'dl'+idx} style={{marginLeft:14,padding:'3px 0',display:'flex',justifyContent:'space-between',fontSize:12,color:'#e65100'}}>
                                              <span>⏱ {dl.reason} ({dl.hours}h)</span><strong>£{(parseFloat(dl.hours||0)*20).toFixed(2)}</strong>
                                            </div>
                                          ))}
                                        </div>
                                      );
                                    })}
                                    {/* Totals */}
                                    <div style={{marginTop:10,paddingTop:8,borderTop:'2px solid #eee',fontSize:12}}>
                                      <div style={{display:'flex',justifyContent:'space-between',padding:'2px 0'}}><span>Jobs</span><span>£{jobsTotal.toFixed(2)}</span></div>
                                      {extrasTotal>0&&<div style={{display:'flex',justifyContent:'space-between',padding:'2px 0',color:'#1565c0'}}><span>Extras</span><span>£{extrasTotal.toFixed(2)}</span></div>}
                                      {delaysTotal>0&&<div style={{display:'flex',justifyContent:'space-between',padding:'2px 0',color:'#e65100'}}><span>Delays</span><span>£{delaysTotal.toFixed(2)}</span></div>}
                                      <div style={{display:'flex',justifyContent:'space-between',padding:'2px 0'}}><span>Subtotal</span><span>£{subtotal.toFixed(2)}</span></div>
                                      <div style={{display:'flex',justifyContent:'space-between',padding:'2px 0',color:GOLD,fontWeight:600}}><span>+ 6%</span><span>£{markup.toFixed(2)}</span></div>
                                      <div style={{display:'flex',justifyContent:'space-between',padding:'4px 0',fontWeight:700,fontSize:14,borderTop:'1px solid #eee',marginTop:4}}><span>Week Total</span><span>£{weekTotal.toFixed(2)}</span></div>
                                    </div>
                                    {/* Actions */}
                                    <div style={{display:'flex',gap:8,marginTop:10}}>
                                      {sg.status==='pending'&&<button onClick={async()=>{
                                        const updated=invoices.map(i=>{
                                          if(cw.invoices.some(ci=>ci.id===i.id)) return {...i,status:'approved',approved_by:user?.name,approved_at:new Date().toISOString()};
                                          return i;
                                        });
                                        setInvoices(updated);
                                        for(const inv of cw.invoices){try{await updateInvoice(inv.id,{status:'approved',approved_by:user?.name,approved_at:new Date().toISOString()});}catch(e){}}
                                        setSuccessMsg('Week signed off for '+cw.carpenter);setTimeout(()=>setSuccessMsg(''),2500);
                                      }} style={{padding:'8px 16px',fontSize:13,backgroundColor:'#4caf50',color:'white',border:'none',borderRadius:6,cursor:'pointer',fontWeight:'bold'}}>Sign Off Week</button>}
                                      {sg.status==='approved'&&<button onClick={async()=>{
                                        const updated=invoices.map(i=>{
                                          if(cw.invoices.some(ci=>ci.id===i.id)) return {...i,status:'paid'};
                                          return i;
                                        });
                                        setInvoices(updated);
                                        for(const inv of cw.invoices){try{await updateInvoice(inv.id,{status:'paid'});}catch(e){}}
                                        setSuccessMsg('Week marked paid for '+cw.carpenter);setTimeout(()=>setSuccessMsg(''),2500);
                                      }} style={{padding:'8px 16px',fontSize:13,backgroundColor:'#2196f3',color:'white',border:'none',borderRadius:6,cursor:'pointer',fontWeight:'bold'}}>Mark Paid</button>}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    });
                  })()}
                </div>
              )}

              {/* ALL SITES TAB */}
              {invoiceTab === 'all sites' && !selectedInvoiceSite && (
                <div>
                  <h2 style={{fontSize:22, fontWeight:700, color:NAVY, marginBottom:20}}>All Sites</h2>
                  <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:16}}>
                    {BUILDERS.flatMap(builder =>
                      builder.sites.map(site => {
                        const activeAllocations = allocations.filter(a => a.site === site.name && !a.completed);
                        const pendingInvoices = invoices.filter(i => i.site === site.name && i.status === 'pending');
                        return (
                          <div key={site.name} onClick={() => setSelectedInvoiceSite(site.name)} style={{
                            backgroundColor:'white', borderRadius:10, padding:16, cursor:'pointer',
                            border:'1px solid #e0e0e0', transition:'all 0.2s',
                            transform:'translateY(0)'
                          }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:10}}>
                              <div style={{width:8, height:8, borderRadius:'50%', backgroundColor:builder.color}}></div>
                              <div>
                                <div style={{fontWeight:700, fontSize:14, color:NAVY}}>{site.name}</div>
                                <div style={{fontSize:12, color:'#666'}}>{builder.name}</div>
                              </div>
                            </div>
                            <div style={{fontSize:12, color:'#666', marginBottom:12}}>Lead: {siteleads[site.name] || 'Unassigned'}</div>
                            <div style={{display:'flex', gap:12}}>
                              <div style={{flex:1, padding:8, backgroundColor:'#f5f5f5', borderRadius:6, textAlign:'center'}}>
                                <div style={{fontSize:12, color:'#666'}}>Active</div>
                                <div style={{fontSize:18, fontWeight:700, color:NAVY}}>{activeAllocations.length}</div>
                              </div>
                              <div style={{flex:1, padding:8, backgroundColor:'#fff3e0', borderRadius:6, textAlign:'center'}}>
                                <div style={{fontSize:12, color:'#666'}}>Pending</div>
                                <div style={{fontSize:18, fontWeight:700, color:NAVY}}>{pendingInvoices.length}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* SITE DETAIL VIEW */}
              {invoiceTab === 'all sites' && selectedInvoiceSite && (
                <div>
                  <button onClick={() => setSelectedInvoiceSite(null)} style={{
                    backgroundColor:'#f0f0f0', color:NAVY, border:'none', borderRadius:8,
                    padding:'8px 16px', fontSize:13, fontWeight:'bold', cursor:'pointer', marginBottom:20
                  }}>← Back to All Sites</button>

                  <h2 style={{fontSize:22, fontWeight:700, color:NAVY, marginBottom:20}}>{selectedInvoiceSite}</h2>

                  {(() => {
                    const builder = BUILDERS.find(b => b.sites.some(s => s.name === selectedInvoiceSite));
                    const site = builder?.sites.find(s => s.name === selectedInvoiceSite);

                    return (
                      <div style={{display:'grid', gap:20}}>
                        {/* Site info card */}
                        <div style={{backgroundColor:'white', borderRadius:10, padding:16, border:'1px solid #e0e0e0'}}>
                          <div style={{display:'flex', justifyContent:'space-between', alignItems:'start', marginBottom:16, flexWrap:'wrap', gap:12}}>
                            <div>
                              <div style={{fontWeight:700, fontSize:16, color:NAVY, marginBottom:4}}>{builder?.name}</div>
                              <div style={{fontSize:13, color:'#666'}}>{site?.location || ''}</div>
                            </div>
                            <div style={{textAlign:'right'}}>
                              <div style={{fontSize:12, color:'#666', marginBottom:6}}>Site Lead</div>
                              <select value={siteleads[selectedInvoiceSite] || ''} onChange={async (e) => {
                                const newLead = e.target.value;
                                setSiteLeads(prev => ({...prev, [selectedInvoiceSite]: newLead}));
                                try {
                                  await supabase.from('site_leads').upsert({site_name: selectedInvoiceSite, lead_name: newLead}, {onConflict: 'site_name'});
                                  setSuccessMsg('Site lead updated');
                                  setTimeout(()=>setSuccessMsg(''),2500);
                                } catch(e) { console.error(e); }
                              }} style={{
                                padding:'6px 12px', borderRadius:6, border:'1px solid #ddd', fontSize:13,
                                backgroundColor:'white', color:NAVY, fontWeight:'bold', cursor:'pointer'
                              }}>
                                <option value="">Select Lead...</option>
                                <option value="Jack Sawyers">Jack Sawyers</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Active carpenters */}
                        {allocations.filter(a => a.site === selectedInvoiceSite && !a.completed).length > 0 && (
                          <div>
                            <h3 style={{fontSize:16, fontWeight:700, color:NAVY, marginBottom:12}}>Active Carpenters</h3>
                            <div style={{display:'grid', gap:8}}>
                              {[...new Set(allocations.filter(a => a.site === selectedInvoiceSite && !a.completed).map(a => a.carpenter))].map(carp => (
                                <div key={carp} style={{backgroundColor:'white', borderRadius:8, padding:12, border:'1px solid #e0e0e0'}}>
                                  <div style={{fontWeight:600, fontSize:13, color:NAVY}}>{carp}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Invoices for this site — grouped by carpenter per week */}
                        {(() => {
                          // Find all invoices where the carpenter worked on this site at any point
                          const siteInvs = invoices.filter(i => i.site === selectedInvoiceSite);
                          if (siteInvs.length === 0) return null;

                          // Get week key for a date
                          const getWk = (ds) => { const d=new Date(ds); const day=d.getDay(); const mon=new Date(d); mon.setDate(d.getDate()-((day+6)%7)); return mon.toISOString().split('T')[0]; };

                          // Find all carpenter+week combos that touch this site
                          const touchedWeeks = {};
                          siteInvs.forEach(inv => {
                            const wk = getWk(inv.date);
                            const key = inv.carpenter+'|'+wk;
                            touchedWeeks[key] = { carpenter: inv.carpenter, weekKey: wk };
                          });

                          // For each touched carpenter+week, pull ALL their invoices that week (across all sites)
                          const weekCards = Object.values(touchedWeeks).map(({ carpenter, weekKey }) => {
                            const allWeekInvs = invoices.filter(inv => {
                              const wk = getWk(inv.date);
                              return inv.carpenter === carpenter && wk === weekKey;
                            });
                            const siteOnlyInvs = allWeekInvs.filter(inv => inv.site === selectedInvoiceSite);
                            const otherSiteInvs = allWeekInvs.filter(inv => inv.site !== selectedInvoiceSite);
                            const weekStart = new Date(weekKey);
                            const weekEnd = new Date(weekKey); weekEnd.setDate(weekStart.getDate()+4);

                            // Build day-by-day
                            const days = [];
                            for(let i=0;i<5;i++){
                              const d=new Date(weekStart);d.setDate(weekStart.getDate()+i);
                              const ds=d.toISOString().split('T')[0];
                              const dayInvs=allWeekInvs.filter(inv=>inv.date===ds);
                              const dayExtras=(invoiceDayExtras[carpenter]||{})[ds]||[];
                              const dayDelays=(invoiceDayDelays[carpenter]||{})[ds]||[];
                              days.push({date:d,dateStr:ds,invoices:dayInvs,extras:dayExtras,delays:dayDelays});
                            }

                            const jobsTotal = allWeekInvs.reduce((s,inv)=>s+parseFloat(inv.amount||0),0);
                            const siteJobsTotal = siteOnlyInvs.reduce((s,inv)=>s+parseFloat(inv.amount||0),0);
                            const extrasTotal = days.reduce((s,day)=>s+day.extras.reduce((ss,e)=>ss+parseFloat(e.amount||0),0),0);
                            const delaysTotal = days.reduce((s,day)=>s+day.delays.reduce((ss,dl)=>ss+parseFloat(dl.hours||0)*20,0),0);
                            const weekSubtotal = jobsTotal + extrasTotal + delaysTotal;
                            const markup = Math.round(weekSubtotal*0.06*100)/100;
                            const weekTotal = Math.round((weekSubtotal+markup)*100)/100;
                            const weekStatus = allWeekInvs.length>0 ? (allWeekInvs.every(i=>i.status==='paid')?'paid':allWeekInvs.every(i=>i.status==='approved'||i.status==='paid')?'approved':allWeekInvs.some(i=>i.status==='submitted')?'submitted':'pending') : 'pending';
                            const cardKey = carpenter+'|'+weekKey;

                            return { carpenter, weekKey, weekStart, weekEnd, allWeekInvs, siteOnlyInvs, otherSiteInvs, days, jobsTotal, siteJobsTotal, extrasTotal, delaysTotal, weekSubtotal, markup, weekTotal, weekStatus, cardKey };
                          });

                          // Sort: pending first, then by week descending
                          const statusOrder = {pending:0,submitted:1,approved:2,paid:3};
                          weekCards.sort((a,b) => {
                            const sa = statusOrder[a.weekStatus]??4, sb = statusOrder[b.weekStatus]??4;
                            if(sa !== sb) return sa - sb;
                            return b.weekKey.localeCompare(a.weekKey);
                          });

                          // Group by status
                          const groups = {};
                          weekCards.forEach(c => { if(!groups[c.weekStatus]) groups[c.weekStatus]=[]; groups[c.weekStatus].push(c); });
                          const statusLabels = {pending:'Pending',submitted:'Submitted',approved:'Approved',paid:'Paid'};
                          const statusColors = {pending:'#ff9800',submitted:'#1565c0',approved:'#2196f3',paid:'#4caf50'};

                          return (
                            <div>
                              <h3 style={{fontSize:16, fontWeight:700, color:NAVY, marginBottom:12}}>Invoices</h3>
                              <p style={{fontSize:12, color:'#888', marginBottom:16}}>Showing full weekly invoices for any carpenter who worked on this site. Includes their other site work that week for a complete picture.</p>
                              {Object.keys(statusLabels).filter(s=>groups[s]).map(status => (
                                <div key={status} style={{marginBottom:20}}>
                                  <div style={{fontSize:13, fontWeight:700, color:statusColors[status], marginBottom:8, textTransform:'uppercase', letterSpacing:0.5}}>{statusLabels[status]} ({groups[status].length})</div>
                                  {groups[status].map(card => {
                                    const isExpanded = siteInvExpanded === card.cardKey;
                                    return (
                                      <div key={card.cardKey} style={{backgroundColor:'white', borderRadius:10, marginBottom:10, overflow:'hidden', border:'1px solid #e0e0e0', borderLeft:'4px solid '+statusColors[card.weekStatus]}}>
                                        {/* Header — clickable */}
                                        <div onClick={()=>setSiteInvExpanded(isExpanded?null:card.cardKey)} style={{padding:'12px 16px', display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer', flexWrap:'wrap', gap:8}}>
                                          <div>
                                            <div style={{fontWeight:700, fontSize:14, color:NAVY}}>{card.carpenter}</div>
                                            <div style={{fontSize:12, color:'#666'}}>{card.weekStart.toLocaleDateString('en-GB',{day:'numeric',month:'short'})} – {card.weekEnd.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</div>
                                            <div style={{fontSize:11, color:'#888', marginTop:2}}>{card.siteOnlyInvs.length} job{card.siteOnlyInvs.length!==1?'s':''} on this site{card.otherSiteInvs.length>0?` · ${card.otherSiteInvs.length} on other sites`:''}</div>
                                          </div>
                                          <div style={{display:'flex', alignItems:'center', gap:10}}>
                                            <div style={{textAlign:'right'}}>
                                              <div style={{fontSize:11, color:'#888'}}>Week Total (incl. 6%)</div>
                                              <div style={{fontSize:18, fontWeight:700, color:GOLD}}>£{card.weekTotal.toFixed(2)}</div>
                                            </div>
                                            <span style={{fontSize:16, color:'#999'}}>{isExpanded?'▲':'▼'}</span>
                                          </div>
                                        </div>

                                        {/* Expanded — day-by-day breakdown */}
                                        {isExpanded && (
                                          <div style={{padding:'0 16px 16px'}}>
                                            {card.days.map(day => {
                                              const dayLabel = day.date.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'});
                                              const dayJobTotal = day.invoices.reduce((s,inv)=>s+parseFloat(inv.amount||0),0);
                                              const dayExtTotal = day.extras.reduce((s,e)=>s+parseFloat(e.amount||0),0);
                                              const dayDelTotal = day.delays.reduce((s,dl)=>s+parseFloat(dl.hours||0)*20,0);
                                              const dayTotal = dayJobTotal+dayExtTotal+dayDelTotal;
                                              const hasContent = day.invoices.length>0||day.extras.length>0||day.delays.length>0;
                                              return (
                                                <div key={day.dateStr} style={{borderBottom:'1px solid #f0f0f0', padding:'8px 0'}}>
                                                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:hasContent?6:0}}>
                                                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                                                      <div style={{width:8,height:8,borderRadius:'50%',backgroundColor:hasContent?GOLD:'#ddd'}}></div>
                                                      <strong style={{fontSize:12, color:NAVY}}>{dayLabel}</strong>
                                                    </div>
                                                    {dayTotal>0 && <span style={{fontSize:12, fontWeight:600, color:NAVY}}>£{dayTotal.toFixed(2)}</span>}
                                                  </div>
                                                  {day.invoices.map(inv=>(
                                                    <div key={inv.id} style={{marginLeft:16,padding:'3px 0',display:'flex',justifyContent:'space-between',fontSize:12}}>
                                                      <span style={{color:inv.site===selectedInvoiceSite?'#333':'#999'}}>{inv.site===selectedInvoiceSite?'':'('+inv.site+') '}Plot {inv.plot} / {inv.stage}</span>
                                                      <strong>£{parseFloat(inv.amount||0).toFixed(2)}</strong>
                                                    </div>
                                                  ))}
                                                  {day.extras.map((ex,idx)=>(
                                                    <div key={'ex'+idx} style={{marginLeft:16,padding:'3px 0',display:'flex',justifyContent:'space-between',fontSize:12,color:'#1565c0'}}>
                                                      <span>+ Extra: {ex.desc}</span><strong>£{parseFloat(ex.amount||0).toFixed(2)}</strong>
                                                    </div>
                                                  ))}
                                                  {day.delays.map((dl,idx)=>(
                                                    <div key={'dl'+idx} style={{marginLeft:16,padding:'3px 0',display:'flex',justifyContent:'space-between',fontSize:12,color:'#e65100'}}>
                                                      <span>⏱ {dl.reason} ({dl.hours}hrs)</span><strong>£{(parseFloat(dl.hours||0)*20).toFixed(2)}</strong>
                                                    </div>
                                                  ))}
                                                </div>
                                              );
                                            })}

                                            {/* Week summary */}
                                            <div style={{marginTop:8, paddingTop:8, borderTop:'2px solid #eee', fontSize:12}}>
                                              <div style={{display:'flex',justifyContent:'space-between',padding:'2px 0'}}><span style={{color:'#666'}}>Jobs Total</span><span>£{card.jobsTotal.toFixed(2)}</span></div>
                                              {card.extrasTotal>0&&<div style={{display:'flex',justifyContent:'space-between',padding:'2px 0'}}><span style={{color:'#1565c0'}}>Extras</span><span style={{color:'#1565c0'}}>£{card.extrasTotal.toFixed(2)}</span></div>}
                                              {card.delaysTotal>0&&<div style={{display:'flex',justifyContent:'space-between',padding:'2px 0'}}><span style={{color:'#e65100'}}>Delays</span><span style={{color:'#e65100'}}>£{card.delaysTotal.toFixed(2)}</span></div>}
                                              <div style={{display:'flex',justifyContent:'space-between',padding:'2px 0'}}><span style={{color:'#666'}}>Subtotal</span><span>£{card.weekSubtotal.toFixed(2)}</span></div>
                                              <div style={{display:'flex',justifyContent:'space-between',padding:'2px 0'}}><span style={{color:GOLD,fontWeight:'bold'}}>+ 6%</span><span style={{color:GOLD,fontWeight:'bold'}}>£{card.markup.toFixed(2)}</span></div>
                                              <div style={{display:'flex',justifyContent:'space-between',padding:'4px 0',fontWeight:'bold',fontSize:14,borderTop:'1px solid #eee',marginTop:4}}><span>Week Total</span><span>£{card.weekTotal.toFixed(2)}</span></div>
                                            </div>

                                            {/* Adjust invoice */}
                                            {(card.weekStatus==='pending'||card.weekStatus==='submitted') && (
                                              <div style={{marginTop:12, paddingTop:12, borderTop:'1px solid #eee'}}>
                                                {siteInvAdjustKey===card.cardKey ? (
                                                  <div style={{backgroundColor:'#f5f5f5', borderRadius:6, padding:10}}>
                                                    <div style={{fontSize:12, fontWeight:600, color:NAVY, marginBottom:6}}>Adjust Invoice</div>
                                                    <div style={{display:'flex', gap:6, marginBottom:8}}>
                                                      <input placeholder="Description" value={siteInvAdjustDesc} onChange={e=>setSiteInvAdjustDesc(e.target.value)} style={{flex:2,padding:6,border:'1px solid #ccc',borderRadius:4,fontSize:12}}/>
                                                      <input placeholder="± £" type="number" value={siteInvAdjustAmount} onChange={e=>setSiteInvAdjustAmount(e.target.value)} style={{flex:1,padding:6,border:'1px solid #ccc',borderRadius:4,fontSize:12}}/>
                                                    </div>
                                                    <div style={{display:'flex', gap:6}}>
                                                      <button onClick={()=>{
                                                        if(!siteInvAdjustDesc||!siteInvAdjustAmount)return;
                                                        setInvoiceDayExtras(prev=>{
                                                          const cp={...prev};
                                                          if(!cp[card.carpenter])cp[card.carpenter]={};
                                                          const ds=card.weekKey; // use Monday as the date key for adjustments
                                                          if(!cp[card.carpenter][ds])cp[card.carpenter][ds]=[];
                                                          cp[card.carpenter][ds]=[...cp[card.carpenter][ds],{desc:'[Adj] '+siteInvAdjustDesc,amount:parseFloat(siteInvAdjustAmount),addedAt:new Date().toISOString(),adjustedBy:user?.name}];
                                                          return cp;
                                                        });
                                                        setSiteInvAdjustDesc('');setSiteInvAdjustAmount('');setSiteInvAdjustKey(null);
                                                        setSuccessMsg('Adjustment added');setTimeout(()=>setSuccessMsg(''),2500);
                                                      }} style={{padding:'6px 14px',backgroundColor:'#2e7d32',color:'white',border:'none',borderRadius:4,fontSize:11,fontWeight:'bold',cursor:'pointer'}}>Add Adjustment</button>
                                                      <button onClick={()=>setSiteInvAdjustKey(null)} style={{padding:'6px 14px',backgroundColor:'#f5f5f5',color:'#666',border:'1px solid #ddd',borderRadius:4,fontSize:11,cursor:'pointer'}}>Cancel</button>
                                                    </div>
                                                  </div>
                                                ) : (
                                                  <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                                                    <button onClick={()=>setSiteInvAdjustKey(card.cardKey)} style={{padding:'8px 16px',backgroundColor:'#e3f2fd',color:'#1565c0',border:'1px solid #90caf9',borderRadius:6,fontSize:12,fontWeight:600,cursor:'pointer'}}>Adjust</button>
                                                    <button onClick={()=>{
                                                      const updated = invoices.map(inv => {
                                                        const wk = getWk(inv.date);
                                                        if(inv.carpenter===card.carpenter && wk===card.weekKey && (inv.status==='pending'||inv.status==='submitted')){
                                                          return {...inv, status:'approved'};
                                                        }
                                                        return inv;
                                                      });
                                                      setInvoices(updated);
                                                      updated.filter(inv=>{const wk=getWk(inv.date);return inv.carpenter===card.carpenter&&wk===card.weekKey&&inv.status==='approved';}).forEach(inv=>{
                                                        updateInvoice(inv.id,{status:'approved'}).catch(()=>{});
                                                      });
                                                      setSuccessMsg('Week signed off');setTimeout(()=>setSuccessMsg(''),2500);
                                                    }} style={{padding:'8px 16px',backgroundColor:'#4caf50',color:'white',border:'none',borderRadius:6,fontSize:12,fontWeight:600,cursor:'pointer'}}>Sign Off Week</button>
                                                    {card.weekStatus==='approved' && (
                                                      <button onClick={()=>{
                                                        const updated = invoices.map(inv => {
                                                          const wk = getWk(inv.date);
                                                          if(inv.carpenter===card.carpenter && wk===card.weekKey && inv.status==='approved'){
                                                            return {...inv, status:'paid'};
                                                          }
                                                          return inv;
                                                        });
                                                        setInvoices(updated);
                                                        updated.filter(inv=>{const wk=getWk(inv.date);return inv.carpenter===card.carpenter&&wk===card.weekKey&&inv.status==='paid';}).forEach(inv=>{
                                                          updateInvoice(inv.id,{status:'paid'}).catch(()=>{});
                                                        });
                                                        setSuccessMsg('Marked as paid');setTimeout(()=>setSuccessMsg(''),2500);
                                                      }} style={{padding:'8px 16px',backgroundColor:NAVY,color:GOLD,border:'none',borderRadius:6,fontSize:12,fontWeight:600,cursor:'pointer'}}>Mark Paid</button>
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                            )}
                                            {card.weekStatus==='approved' && (
                                              <div style={{marginTop:12, display:'flex', gap:8}}>
                                                <button onClick={()=>{
                                                  const updated = invoices.map(inv => {
                                                    const wk = getWk(inv.date);
                                                    if(inv.carpenter===card.carpenter && wk===card.weekKey && inv.status==='approved'){
                                                      return {...inv, status:'paid'};
                                                    }
                                                    return inv;
                                                  });
                                                  setInvoices(updated);
                                                  updated.filter(inv=>{const wk=getWk(inv.date);return inv.carpenter===card.carpenter&&wk===card.weekKey&&inv.status==='paid';}).forEach(inv=>{
                                                    updateInvoice(inv.id,{status:'paid'}).catch(()=>{});
                                                  });
                                                  setSuccessMsg('Marked as paid');setTimeout(()=>setSuccessMsg(''),2500);
                                                }} style={{padding:'8px 16px',backgroundColor:NAVY,color:GOLD,border:'none',borderRadius:6,fontSize:12,fontWeight:600,cursor:'pointer'}}>Mark Paid</button>
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              ))}
                            </div>
                          );
                        })()}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* MY LEAD SITES TAB */}
              {invoiceTab === 'my lead sites' && !selectedInvoiceSite && (
                <div>
                  <h2 style={{fontSize:22, fontWeight:700, color:NAVY, marginBottom:20}}>My Lead Sites</h2>
                  {(() => {
                    const myLeadSites = BUILDERS.flatMap(builder =>
                      builder.sites.filter(site => siteleads[site.name] === user?.name)
                    );

                    if (myLeadSites.length === 0) {
                      return <p style={{color:'#888', fontSize:14}}>No sites assigned to you</p>;
                    }

                    return (
                      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:16}}>
                        {myLeadSites.map(site => {
                          const builder = BUILDERS.find(b => b.sites.includes(site));
                          const activeAllocations = allocations.filter(a => a.site === site.name && !a.completed);
                          const pendingInvoices = invoices.filter(i => i.site === site.name && i.status === 'pending');
                          return (
                            <div key={site.name} onClick={() => { setInvoiceTab('all sites'); setSelectedInvoiceSite(site.name); }} style={{
                              backgroundColor:'white', borderRadius:10, padding:16, cursor:'pointer',
                              border:'1px solid #e0e0e0', transition:'all 0.2s',
                              transform:'translateY(0)'
                            }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                              <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:10}}>
                                <div style={{width:8, height:8, borderRadius:'50%', backgroundColor:builder?.color}}></div>
                                <div>
                                  <div style={{fontWeight:700, fontSize:14, color:NAVY}}>{site.name}</div>
                                  <div style={{fontSize:12, color:'#666'}}>{builder?.name}</div>
                                </div>
                              </div>
                              <div style={{display:'flex', gap:12}}>
                                <div style={{flex:1, padding:8, backgroundColor:'#f5f5f5', borderRadius:6, textAlign:'center'}}>
                                  <div style={{fontSize:12, color:'#666'}}>Active</div>
                                  <div style={{fontSize:18, fontWeight:700, color:NAVY}}>{activeAllocations.length}</div>
                                </div>
                                <div style={{flex:1, padding:8, backgroundColor:'#fff3e0', borderRadius:6, textAlign:'center'}}>
                                  <div style={{fontSize:12, color:'#666'}}>Pending</div>
                                  <div style={{fontSize:18, fontWeight:700, color:NAVY}}>{pendingInvoices.length}</div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* ========== CARPENTERS LIST (invoice role only) ========== */}
              {invoiceTab === 'carpenters' && !invoiceCarpenterView && (
                <div>
                  <h2 style={{fontSize:22, fontWeight:700, color:NAVY, marginBottom:20}}>All Carpenters</h2>
                  <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:12}}>
                    {CARPENTERS.map(carp => {
                      const carpInvoices = invoices.filter(i => i.carpenter === carp.name);
                      const totalPaid = carpInvoices.filter(i => i.status === 'paid').reduce((s,i) => s + (parseFloat(i.amount)||0), 0);
                      const totalPending = carpInvoices.filter(i => i.status === 'pending').reduce((s,i) => s + (parseFloat(i.amount)||0), 0);
                      const activeJob = allocations.find(a => a.carpenter === carp.name && !a.completed);
                      return (
                        <div key={carp.id} onClick={() => setInvoiceCarpenterView(carp.name)} style={{
                          backgroundColor:'white', borderRadius:10, padding:16, cursor:'pointer',
                          border:'1px solid #e0e0e0', borderLeft:'4px solid '+GOLD
                        }}>
                          <div style={{fontWeight:700, fontSize:15, color:NAVY, marginBottom:4}}>{carp.name}</div>
                          <div style={{fontSize:12, color:'#666', marginBottom:10}}>{carp.site}</div>
                          <div style={{display:'flex', gap:8}}>
                            <div style={{flex:1, backgroundColor:'#e8f5e9', borderRadius:6, padding:8, textAlign:'center'}}>
                              <div style={{fontSize:16, fontWeight:700, color:'#2e7d32'}}>£{totalPaid.toLocaleString()}</div>
                              <div style={{fontSize:10, color:'#666'}}>Paid</div>
                            </div>
                            <div style={{flex:1, backgroundColor:'#fff3e0', borderRadius:6, padding:8, textAlign:'center'}}>
                              <div style={{fontSize:16, fontWeight:700, color:'#e65100'}}>£{totalPending.toLocaleString()}</div>
                              <div style={{fontSize:10, color:'#666'}}>Pending</div>
                            </div>
                          </div>
                          {activeJob && <div style={{marginTop:8, fontSize:11, color:GOLD, fontWeight:600}}>Active: {activeJob.site} — Plot {activeJob.plot}</div>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ========== CARPENTER DETAIL (invoice role) ========== */}
              {invoiceTab === 'carpenters' && invoiceCarpenterView && (
                <div>
                  <button onClick={() => setInvoiceCarpenterView(null)} style={{
                    backgroundColor:'#f0f0f0', color:NAVY, border:'none', borderRadius:8,
                    padding:'8px 16px', fontSize:13, fontWeight:'bold', cursor:'pointer', marginBottom:20
                  }}>← Back to All Carpenters</button>

                  <h2 style={{fontSize:22, fontWeight:700, color:NAVY, marginBottom:6}}>{invoiceCarpenterView}</h2>
                  {(() => {
                    const carp = CARPENTERS.find(c => c.name === invoiceCarpenterView);
                    const carpAllocations = allocations.filter(a => a.carpenter === invoiceCarpenterView);
                    const carpInvoices = invoices.filter(i => i.carpenter === invoiceCarpenterView);
                    const completedJobs = carpAllocations.filter(a => a.completed);
                    const activeJob = carpAllocations.find(a => !a.completed);

                    // Group invoices by week (Mon-Fri)
                    const getWeekKey = (dateStr) => {
                      const d = new Date(dateStr);
                      const day = d.getDay();
                      const mon = new Date(d); mon.setDate(d.getDate() - ((day + 6) % 7));
                      const fri = new Date(mon); fri.setDate(mon.getDate() + 4);
                      return mon.toISOString().split('T')[0] + '|' + fri.toISOString().split('T')[0];
                    };
                    const weekMap = {};
                    carpInvoices.forEach(inv => {
                      const wk = getWeekKey(inv.created_at || inv.date || new Date().toISOString());
                      if(!weekMap[wk]) weekMap[wk] = [];
                      weekMap[wk].push(inv);
                    });
                    const weeks = Object.keys(weekMap).sort().reverse();

                    return (
                      <div>
                        <div style={{fontSize:13, color:'#666', marginBottom:16}}>Site: {carp?.site || 'N/A'}</div>

                        {/* Current status */}
                        {activeJob && (
                          <div style={{backgroundColor:'#fff3e0', borderRadius:10, padding:16, marginBottom:20, border:'1px solid #ffe0b2'}}>
                            <div style={{fontSize:12, color:'#e65100', fontWeight:600, marginBottom:4}}>Currently Active</div>
                            <div style={{fontSize:14, fontWeight:700, color:NAVY}}>{activeJob.site} — Plot {activeJob.plot} — {activeJob.stage}</div>
                            <div style={{fontSize:12, color:'#666', marginTop:4}}>{activeJob.startDate} to {activeJob.endDate}</div>
                          </div>
                        )}

                        {/* Completed jobs summary */}
                        {completedJobs.length > 0 && (
                          <div style={{marginBottom:24}}>
                            <h3 style={{fontSize:16, fontWeight:700, color:NAVY, marginBottom:12}}>Completed Jobs ({completedJobs.length})</h3>
                            <div style={{display:'grid', gap:8}}>
                              {completedJobs.slice(0,5).map((job, i) => (
                                <div key={i} style={{backgroundColor:'white', borderRadius:8, padding:12, border:'1px solid #e0e0e0', borderLeft:'4px solid #4caf50'}}>
                                  <div style={{fontWeight:600, fontSize:13, color:NAVY}}>{job.site} — Plot {job.plot}</div>
                                  <div style={{fontSize:12, color:'#666'}}>{job.stage} | {job.startDate} - {job.endDate}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Weekly invoice breakdown */}
                        <h3 style={{fontSize:16, fontWeight:700, color:NAVY, marginBottom:12}}>Invoices by Week</h3>
                        {weeks.length === 0 && <p style={{color:'#888', fontSize:14}}>No invoices for this carpenter</p>}
                        {weeks.map(wk => {
                          const [monStr, friStr] = wk.split('|');
                          const monDate = new Date(monStr);
                          const friDate = new Date(friStr);
                          const weekLabel = 'Week of ' + monDate.toLocaleDateString('en-GB', {day:'numeric', month:'short'}) + ' - ' + friDate.toLocaleDateString('en-GB', {day:'numeric', month:'short', year:'numeric'});
                          const weekInvs = weekMap[wk];
                          const weekTotal = weekInvs.reduce((s,i) => s + (parseFloat(i.amount)||0), 0);
                          const isExpanded = invoiceWeekExpanded === wk;

                          return (
                            <div key={wk} style={{marginBottom:8}}>
                              <div onClick={() => setInvoiceWeekExpanded(isExpanded ? null : wk)} style={{
                                backgroundColor:'white', borderRadius:8, padding:'14px 16px', cursor:'pointer',
                                border:'1px solid #e0e0e0', display:'flex', justifyContent:'space-between', alignItems:'center'
                              }}>
                                <div>
                                  <div style={{fontWeight:600, fontSize:14, color:NAVY}}>{weekLabel}</div>
                                  <div style={{fontSize:12, color:'#666'}}>{weekInvs.length} invoice{weekInvs.length!==1?'s':''}</div>
                                </div>
                                <div style={{display:'flex', alignItems:'center', gap:12}}>
                                  <span style={{fontSize:16, fontWeight:700, color:NAVY}}>£{weekTotal.toLocaleString()}</span>
                                  <span style={{fontSize:18, color:'#999'}}>{isExpanded ? '▲' : '▼'}</span>
                                </div>
                              </div>
                              {isExpanded && (
                                <div style={{backgroundColor:'#f9f9f9', borderRadius:'0 0 8px 8px', padding:12, border:'1px solid #e0e0e0', borderTop:'none'}}>
                                  {weekInvs.map(inv => (
                                    <div key={inv.id} style={{backgroundColor:'white', borderRadius:8, padding:12, marginBottom:8, border:'1px solid #eee'}}>
                                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'start', marginBottom:8}}>
                                        <div>
                                          <div style={{fontWeight:600, fontSize:13, color:NAVY}}>{inv.site} — Plot {inv.plot}</div>
                                          <div style={{fontSize:12, color:'#666'}}>{inv.houseType} / {inv.stage}</div>
                                        </div>
                                        <div style={{textAlign:'right'}}>
                                          <div style={{fontWeight:700, fontSize:15, color:NAVY}}>£{parseFloat(inv.amount||0).toLocaleString()}</div>
                                          <span style={{fontSize:10, padding:'2px 8px', borderRadius:10, fontWeight:600,
                                            backgroundColor: inv.status==='paid'?'#e8f5e9':inv.status==='approved'?'#e3f2fd':'#fff3e0',
                                            color: inv.status==='paid'?'#2e7d32':inv.status==='approved'?'#1565c0':'#e65100'
                                          }}>{inv.status}</span>
                                        </div>
                                      </div>
                                      {inv.variation_order && <span style={{fontSize:11, backgroundColor:'#e3f2fd', color:'#1565c0', padding:'2px 8px', borderRadius:10, fontWeight:600}}>Variation Order</span>}
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
                </div>
              )}

              {/* ========== MESSAGES (invoice role) ========== */}
              {invoiceTab === 'messages' && (
                <div>
                  <h2 style={{fontSize:22, fontWeight:700, color:NAVY, marginBottom:6}}>Messages</h2>
                  <p style={{fontSize:13, color:'#666', marginBottom:20}}>Website chatbot enquiries and carpenter messages appear here.</p>

                  {/* Chatbot Enquiries */}
                  <div style={{marginBottom:28}}>
                    <h3 style={{fontSize:16, fontWeight:700, color:NAVY, marginBottom:12}}>Chatbot Enquiries</h3>
                    {portalMessages.filter(m => m.type === 'chatbot').length === 0 ? (
                      <div style={{backgroundColor:'white', borderRadius:10, padding:24, textAlign:'center', border:'1px solid #e0e0e0'}}>
                        <div style={{fontSize:14, color:'#888'}}>No chatbot enquiries yet</div>
                        <div style={{fontSize:12, color:'#aaa', marginTop:4}}>When visitors use the website chat, their messages will appear here</div>
                      </div>
                    ) : (
                      <div style={{display:'grid', gap:10}}>
                        {portalMessages.filter(m => m.type === 'chatbot').map(msg => (
                          <div key={msg.id} style={{backgroundColor:'white', borderRadius:10, padding:16, border:'1px solid #e0e0e0', borderLeft:'4px solid #2196f3'}}>
                            <div style={{display:'flex', justifyContent:'space-between', marginBottom:8}}>
                              <div style={{fontWeight:600, fontSize:14, color:NAVY}}>{msg.name || 'Website Visitor'}</div>
                              <span style={{fontSize:11, color:'#999'}}>{msg.date}</span>
                            </div>
                            <div style={{fontSize:13, color:'#444', marginBottom:8}}>{msg.message}</div>
                            {msg.replied ? (
                              <div style={{fontSize:12, color:'#4caf50', fontWeight:600}}>Replied</div>
                            ) : (
                              <span style={{fontSize:11, padding:'3px 10px', borderRadius:10, backgroundColor:'#fff3e0', color:'#e65100', fontWeight:600}}>Awaiting Response</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Carpenter Messages */}
                  <div>
                    <h3 style={{fontSize:16, fontWeight:700, color:NAVY, marginBottom:12}}>Carpenter Messages</h3>
                    {portalMessages.filter(m => m.type === 'carpenter').length === 0 ? (
                      <div style={{backgroundColor:'white', borderRadius:10, padding:24, textAlign:'center', border:'1px solid #e0e0e0'}}>
                        <div style={{fontSize:14, color:'#888'}}>No carpenter messages yet</div>
                        <div style={{fontSize:12, color:'#aaa', marginTop:4}}>When carpenters send invoice queries, they will appear here</div>
                      </div>
                    ) : (
                      <div style={{display:'grid', gap:10}}>
                        {portalMessages.filter(m => m.type === 'carpenter').map(msg => (
                          <div key={msg.id} style={{backgroundColor:'white', borderRadius:10, padding:16, border:'1px solid #e0e0e0', borderLeft:'4px solid '+GOLD}}>
                            <div style={{display:'flex', justifyContent:'space-between', marginBottom:8}}>
                              <div style={{fontWeight:600, fontSize:14, color:NAVY}}>{msg.name}</div>
                              <span style={{fontSize:11, color:'#999'}}>{msg.date}</span>
                            </div>
                            <div style={{fontSize:13, color:'#444', marginBottom:8}}>{msg.message}</div>
                            {msg.replied ? (
                              <div style={{fontSize:12, color:'#4caf50', fontWeight:600}}>Replied</div>
                            ) : (
                              <div style={{display:'flex', gap:8, marginTop:8}}>
                                <input type="text" placeholder="Type a reply..." value={newPortalMsg} onChange={(e) => setNewPortalMsg(e.target.value)}
                                  style={{flex:1, padding:'8px 12px', borderRadius:6, border:'1px solid #ddd', fontSize:13}} />
                                <button onClick={() => {
                                  if(newPortalMsg.trim()){
                                    setPortalMessages(prev => prev.map(m => m.id === msg.id ? {...m, replied:true, reply:newPortalMsg.trim()} : m));
                                    setNewPortalMsg('');
                                    setSuccessMsg('Reply sent'); setTimeout(()=>setSuccessMsg(''),2500);
                                  }
                                }} style={{backgroundColor:GOLD, color:NAVY, border:'none', borderRadius:6, padding:'8px 16px', fontSize:13, fontWeight:'bold', cursor:'pointer'}}>
                                  Send
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  ); }




if(portal){return(<div style={S.root}><nav style={{...S.nav,padding:"calc(env(safe-area-inset-top, 12px) + 8px) 20px 16px 20px"}}><div style={{display:"flex",alignItems:"center",gap:10}}><img src={logoUrl} alt="Ridgeway" style={{width:42,height:42,borderRadius:6,objectFit:"contain",background:"#fff",padding:2}}/><span style={{color:"#fff",fontSize:15,fontWeight:700}}>Ridgeway Portal</span>{pUser&&<span style={{fontSize:10,padding:"3px 10px",borderRadius:100,background:"rgba(196,162,101,.2)",color:"#D4C089",fontWeight:600,marginLeft:4}}>{pUser.role==="admin"?"ADMIN":pUser.role==="office"?"OFFICE":"CARPENTER"}</span>}</div><span style={{...S.nl(false),color:"rgba(255,255,255,.8)"}} onClick={()=>{setPortal(null);setPUser(null);go("home");}}>Exit Portal</span></nav>
{portal==="login"&&(<div style={{marginTop:64,minHeight:"90vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(160deg, #132B20 0%, #1B3D2F 40%, #1F3D2E 100%)",position:"relative",overflow:"hidden",paddingTop:"calc(env(safe-area-inset-top, 12px) + 8px)"}}><div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:"radial-gradient(ellipse at 30% 20%, rgba(196,162,101,0.04) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(196,162,101,0.03) 0%, transparent 50%)",pointerEvents:"none"}}></div><div style={{position:"relative",width:"100%",maxWidth:420,padding:"0 20px"}}><div style={{textAlign:"center",marginBottom:40}}><div style={{width:120,height:120,borderRadius:20,overflow:"hidden",margin:"0 auto 28px",boxShadow:"0 12px 40px rgba(0,0,0,0.5), 0 0 0 2px rgba(196,162,101,0.3)",background:"#fff",padding:4}}><img src={logoUrl} alt="Ridgeway" style={{width:"100%",height:"100%",objectFit:"contain",borderRadius:16}}/></div><h2 style={{color:"#fff",fontSize:26,fontWeight:700,letterSpacing:"-0.02em",marginBottom:6,fontFamily:"'DM Sans',sans-serif"}}>Ridgeway Carpentry</h2><div style={{width:40,height:2,background:"linear-gradient(90deg, transparent, #C4A265, transparent)",margin:"12px auto 14px"}}></div><p style={{color:"rgba(255,255,255,.4)",fontSize:13,fontWeight:400,letterSpacing:"0.02em"}}>Contractor Management Portal</p></div><div style={{background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.06)",borderRadius:16,padding:"36px 32px 32px",boxShadow:"0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)"}}><label style={{display:"block",fontSize:11,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(255,255,255,.35)",marginBottom:10}}>Access PIN</label><input type="password" inputMode="numeric" pattern="[0-9]*" autoComplete="one-time-code" value={pin} onChange={e=>setPin(e.target.value.replace(/\D/g,''))} onKeyDown={e=>e.key==="Enter"&&doLogin()} placeholder="Enter PIN" style={{width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:10,padding:"16px 20px",color:"#fff",fontSize:22,fontFamily:"'DM Sans',monospace",outline:"none",textAlign:"center",letterSpacing:12,boxSizing:"border-box"}}/><button onClick={doLogin} style={{width:"100%",marginTop:20,padding:"15px 24px",background:"linear-gradient(135deg, #C4A265 0%, #D4C089 100%)",color:"#1B3D2F",fontSize:14,fontWeight:700,border:"none",borderRadius:10,cursor:"pointer",letterSpacing:"0.04em",fontFamily:"'DM Sans',sans-serif",boxShadow:"0 4px 16px rgba(196,162,101,0.25), inset 0 1px 0 rgba(255,255,255,0.2)"}}>Sign In</button></div><div style={{marginTop:28,textAlign:"center",borderTop:"1px solid rgba(255,255,255,.04)",paddingTop:16}}><p style={{color:"rgba(255,255,255,.2)",fontSize:10,letterSpacing:"0.05em",margin:0}}>Ridgeway Carpentry Ltd</p><p style={{color:"rgba(255,255,255,.15)",fontSize:10,margin:"4px 0 0"}}>Professional Carpentry Contractors | Ridgeway Carpentry Ltd</p></div></div></div>)}
{portal==="carp"&&pUser&&(<div style={{marginTop:64,background:"#f6f4ef",minHeight:"90vh"}}><div style={{background:"#1B3D2F",padding:"20px 24px",color:"#fff"}}><div style={{maxWidth:1320,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}><div><div style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>Welcome back</div><div style={{fontSize:20,fontWeight:700}}>{pUser.name}</div><div style={{fontSize:12,color:"#C4A265",marginTop:2}}>Assigned: {pUser.site} \u2014 {pUser.builder}</div></div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{["schedule","fixings","documents","price-list","invoice"].map(t=>(<button key={t} onClick={()=>setPTab(t)} style={{...S.bt,background:pTab===t?"#C4A265":"rgba(255,255,255,.06)",color:pTab===t?"#fff":"rgba(255,255,255,.6)",fontSize:10,textTransform:"capitalize",padding:"7px 12px"}}>{t.replace("-"," ")}</button>))}</div></div></div><div style={{maxWidth:1320,margin:"0 auto",padding:"24px"}}>
{pTab==="schedule"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:16}}>Your Schedule</h3><div style={{display:"grid",gap:10}}>{pUser.schedule.map((s,i)=>(<div key={i} style={{background:"#fff",borderRadius:8,padding:16,display:"flex",justifyContent:"space-between",alignItems:"center",borderLeft:`4px solid ${s.status==="active"?"#C4A265":s.status==="complete"?"#22c55e":"#ddd"}`}}><div><div style={{fontSize:14,fontWeight:700}}>{s.day} \u2014 Plot {s.plot}</div><div style={{fontSize:12,color:"#777",marginTop:2}}>The {s.type} \u2014 {s.stage}</div></div><div style={{display:"flex",gap:8,alignItems:"center"}}><span style={{fontSize:10,padding:"3px 10px",borderRadius:100,fontWeight:600,background:s.status==="active"?"#FFF3E0":s.status==="complete"?"#E8F5E9":"#f5f5f5",color:s.status==="active"?"#E65100":s.status==="complete"?"#2E7D32":"#999"}}>{s.status}</span>{s.status!=="complete"&&<button onClick={()=>{const u={...pUser};u.schedule=u.schedule.map((x,j)=>j===i?{...x,status:"complete"}:x);setPUser(u);}} style={{...S.bt,background:"#22c55e",color:"#fff",fontSize:10,padding:"5px 12px"}}>Complete</button>}</div></div>))}</div></>)}
{pTab==="fixings"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:16}}>Request Fixings</h3><div style={{background:"#fff",borderRadius:8,padding:20,marginBottom:20}}><p style={{fontSize:12,color:"#777",marginBottom:10}}>Request goes to admin for approval.</p><textarea value={newMat} onChange={e=>setNewMat(e.target.value)} placeholder="e.g. 2x boxes 63mm nails, 5x sheets OSB" rows={3} style={{width:"100%",border:"1px solid #e0e0e0",borderRadius:6,padding:10,fontSize:13,fontFamily:"inherit",outline:"none",resize:"vertical",marginBottom:10}}/><button onClick={()=>{if(!newMat.trim())return;setMatReqs(p=>[{id:Date.now(),who:pUser.name,site:pUser.site,items:newMat,status:"pending",date:new Date().toLocaleDateString("en-GB").slice(0,5),payMethod:"deduct"},...p]);setNewMat("");}} style={{...S.bt,background:"#C4A265",color:"#fff",fontSize:12}}>Submit Request</button></div><h4 style={{fontSize:14,fontWeight:700,marginBottom:10}}>Your Requests</h4>{matReqs.filter(r=>r.who===pUser.name).map(r=>(<div key={r.id} style={{background:"#fff",borderRadius:8,padding:14,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:13,fontWeight:600}}>{r.items}</div><div style={{fontSize:11,color:"#999"}}>{r.date}</div></div><span style={{fontSize:10,padding:"3px 10px",borderRadius:100,fontWeight:600,background:r.status==="pending"?"#FFF3E0":r.status==="approved"?"#E8F5E9":"#FFEBEE",color:r.status==="pending"?"#E65100":r.status==="approved"?"#2E7D32":"#C62828"}}>{r.status}</span></div>))}</>)}
{pTab==="documents"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:4}}>Documents \u2014 {pUser.site}</h3><p style={{fontSize:12,color:"#999",marginBottom:16}}>Showing files for your assigned site only.</p>{(DEMO_DOCS_BY_SITE[pUser.site]||[{cat:"Notice",docs:["No documents uploaded for this site yet. Contact admin."]}]).map(section=>(<div key={section.cat} style={{marginBottom:16}}><h4 style={{fontSize:13,fontWeight:700,marginBottom:8,paddingBottom:6,borderBottom:"1px solid #eee"}}>{section.cat}</h4>{section.docs.map((doc,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:i%2===0?"#fff":"#fafaf8",borderRadius:6,marginBottom:4}}><span style={{fontSize:13}}>{doc}</span><button onClick={()=>alert('Demo: Would open "'+doc+'"')} style={{...S.bt,background:"#1B3D2F",color:"#fff",fontSize:10,padding:"4px 12px"}}>View</button></div>))}</div>))}</>)}
{pTab==="price-list"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:4}}>Price List \u2014 {pUser.site}</h3><p style={{fontSize:12,color:"#999",marginBottom:16}}>Rates for your assigned site.</p>{(()=>{const bl=ALL_PRICE_LISTS.find(b=>b.sites.some(s=>s.site===pUser.site));const sl=bl?.sites.find(s=>s.site===pUser.site);if(!sl)return <p style={{color:"#999"}}>No price list available for this site.</p>;return(<div style={{background:"#fff",borderRadius:8,overflow:"hidden",border:"1px solid #e8e8e8"}}><div style={{display:"grid",gridTemplateColumns:"1fr 100px",background:"#1B3D2F",padding:"10px 16px"}}><div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.5)",textTransform:"uppercase",letterSpacing:1}}>Task</div><div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.5)",textTransform:"uppercase",letterSpacing:1,textAlign:"right"}}>Rate</div></div>{sl.rates.map(([task,rate],i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"1fr 100px",padding:"10px 16px",background:i%2===0?"#fff":"#fafaf8",borderBottom:"1px solid #f0f0f0"}}><div style={{fontSize:13}}>{task}</div><div style={{fontSize:13,fontWeight:700,color:"#C4A265",textAlign:"right"}}>{rate}</div></div>))}</div>);})()}</>)}
{pTab==="invoice"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:4}}>Your Invoice</h3><p style={{fontSize:12,color:"#999",marginBottom:16}}>Auto-generated from completed work this week.</p>{(()=>{const inv=getInvoiceForCarp(pUser.name);return(<><div style={{background:"#fff",borderRadius:8,padding:20,marginBottom:16}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}><div><div style={{fontSize:11,color:"#999",textTransform:"uppercase",letterSpacing:1}}>Carpenter</div><div style={{fontSize:15,fontWeight:700}}>{pUser.name}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:11,color:"#999",textTransform:"uppercase",letterSpacing:1}}>Week Total</div><div style={{fontSize:22,fontWeight:700,color:"#C4A265"}}>{"\u00a3"}{inv.total.toFixed(2)}</div></div></div>{inv.completed.length>0?(<div style={{borderRadius:6,overflow:"hidden",border:"1px solid #e8e8e8"}}><div style={{display:"grid",gridTemplateColumns:"1fr 80px 100px 100px",background:"#1B3D2F",padding:"8px 12px"}}>{["Site / Plot","Stage","Date","Amount"].map(h=>(<div key={h} style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.5)",textTransform:"uppercase",letterSpacing:1}}>{h}</div>))}</div>{inv.completed.map((a,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"1fr 80px 100px 100px",padding:"8px 12px",background:i%2===0?"#fff":"#fafaf8",borderBottom:"1px solid #f0f0f0"}}><div style={{fontSize:12}}>{a.site} \u2014 Plot {a.plot}</div><div style={{fontSize:12,color:"#777"}}>{a.stage}</div><div style={{fontSize:12}}>{a.date}</div><div style={{fontSize:12,fontWeight:700,color:"#C4A265"}}>{a.rate}</div></div>))}</div>):<p style={{fontSize:13,color:"#999"}}>No completed work yet this week. Complete tasks from your schedule to generate invoice lines.</p>}</div>{inv.pending.length>0&&<div style={{background:"#FFF8E1",borderRadius:8,padding:16}}><h4 style={{fontSize:13,fontWeight:700,marginBottom:8,color:"#E65100"}}>In Progress (not yet invoiceable)</h4>{inv.pending.map((a,i)=>(<div key={i} style={{fontSize:12,marginBottom:4}}>{a.site} \u2014 Plot {a.plot} \u2014 {a.stage} \u2014 {a.rate}</div>))}</div>}</>);})()}</>)}
</div></div>)}
{portal==="office"&&pUser&&(<div style={{marginTop:64,background:"#f6f4ef",minHeight:"90vh"}}><div style={{background:"#1B3D2F",padding:"20px 24px",color:"#fff"}}><div style={{maxWidth:1320,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}><div><div style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>Office Portal</div><div style={{fontSize:20,fontWeight:700}}>{pUser.name}</div></div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{["invoices","site-map","price-lists"].map(t=>(<button key={t} onClick={()=>setPTab(t)} style={{...S.bt,background:pTab===t?"#C4A265":"rgba(255,255,255,.06)",color:pTab===t?"#fff":"rgba(255,255,255,.6)",fontSize:10,textTransform:"capitalize",padding:"7px 12px"}}>{t.replace("-"," ")}</button>))}</div></div></div><div style={{maxWidth:1320,margin:"0 auto",padding:"24px"}}>
{pTab==="invoices"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:16}}>Invoice Dashboard</h3><div style={{display:"grid",gap:12}}>{ALL_CARPS.filter(c=>c.status==="active").map(c=>{const inv=getInvoiceForCarp(c.name);return(<div key={c.id} style={{background:"#fff",borderRadius:8,padding:16,display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid #e8e8e8"}}><div><div style={{fontSize:14,fontWeight:700}}>{c.name}</div><div style={{fontSize:11,color:"#999"}}>{c.site} \u2014 {c.builder}</div><div style={{fontSize:11,color:"#777",marginTop:4}}>{inv.completed.length} completed | {inv.pending.length} in progress</div></div><div style={{textAlign:"right"}}><div style={{fontSize:20,fontWeight:700,color:"#C4A265"}}>{"\u00a3"}{inv.total.toFixed(2)}</div><div style={{fontSize:10,color:"#999"}}>this week</div></div></div>);})}</div></>)}
{pTab==="site-map"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:4}}>Interactive Site Map \u2014 Holbrook Park</h3><p style={{fontSize:12,color:"#999",marginBottom:16}}>Click any plot to see status and outstanding work.</p><div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>{Object.entries(stageColors).map(([stage,color])=>(<div key={stage} style={{display:"flex",alignItems:"center",gap:4,fontSize:10}}><span style={{width:10,height:10,borderRadius:2,background:color,display:"inline-block"}}/>{stage}</div>))}</div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(44px,1fr))",gap:6,marginBottom:20}}>{plots.map(p=>(<div key={p.plot} onClick={()=>setSelectedPlot(selectedPlot===p.plot?null:p.plot)} style={{aspectRatio:"1",background:stageColors[p.stage]||"#e0e0e0",borderRadius:6,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",border:selectedPlot===p.plot?"3px solid #C4A265":"3px solid transparent",transition:".2s"}}><div style={{fontSize:12,fontWeight:700,color:"#fff"}}>{p.plot}</div><div style={{fontSize:7,color:"rgba(255,255,255,.8)",marginTop:1}}>{p.stage.replace(" Complete","\u2713").replace("Not Started","\u2014")}</div></div>))}</div>{selectedPlot&&(()=>{const p=plots.find(x=>x.plot===selectedPlot);if(!p)return null;return(<div style={{background:"#fff",borderRadius:8,padding:20,border:"1px solid #e8e8e8"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}><div><h4 style={{fontSize:16,fontWeight:700,margin:"0 0 4px"}}>Plot {p.plot}</h4><div style={{fontSize:12,color:"#777"}}>The {p.houseType} \u2014 {p.carpenter}</div></div><span style={{fontSize:11,padding:"4px 12px",borderRadius:100,fontWeight:600,background:stageColors[p.stage],color:"#fff"}}>{p.stage}</span></div><div style={{fontSize:12,color:"#555"}}><strong>Outstanding:</strong> {p.stage==="Complete"?"None \u2014 plot complete":p.stage==="Not Started"?"All stages":p.stage+" in progress"}</div></div>);})()}</>)}
{pTab==="price-lists"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:16}}>All Price Lists</h3>{ALL_PRICE_LISTS.map((b,bi)=>(<div key={bi} style={{marginBottom:12}}><div style={{background:"#fff",borderRadius:8,overflow:"hidden",border:"1px solid #e8e8e8"}}><div onClick={()=>{const el=document.getElementById("opl-"+bi);if(el)el.style.display=el.style.display==="none"?"block":"none";}} style={{padding:"12px 16px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",borderLeft:`4px solid ${b.color}`}}><span style={{fontSize:13,fontWeight:700}}>{b.builder}</span><span style={{color:"#C4A265",fontSize:11}}>{"\u25BC"}</span></div><div id={"opl-"+bi} style={{display:"none"}}>{b.sites.map((s,si)=>(<div key={si} style={{padding:"12px 16px",borderTop:"1px solid #f0f0f0"}}><h5 style={{fontSize:12,fontWeight:700,marginBottom:8,color:b.color}}>{s.site}</h5>{s.rates.map(([task,rate],ri)=>(<div key={ri} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",fontSize:12,borderBottom:"1px solid #f8f7f4"}}><span>{task}</span><span style={{fontWeight:700,color:"#C4A265"}}>{rate}</span></div>))}</div>))}</div></div></div>))}</>)}
</div></div>)}
{portal==="mgr"&&pUser&&(<div style={{marginTop:64,background:"#f6f4ef",minHeight:"90vh"}}><div style={{background:"#1B3D2F",padding:"20px 24px",color:"#fff"}}><div style={{maxWidth:1320,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}><div><div style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>Admin Dashboard</div><div style={{fontSize:20,fontWeight:700}}>Welcome, {pUser.name}</div></div><div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{["dashboard","carpenters","schedules","site-map","fixings","price-lists","documents"].map(t=>(<button key={t} onClick={()=>setPTab(t)} style={{...S.bt,background:pTab===t?"#C4A265":"rgba(255,255,255,.06)",color:pTab===t?"#fff":"rgba(255,255,255,.6)",fontSize:9,textTransform:"capitalize",padding:"6px 10px"}}>{t.replace("-"," ")}</button>))}</div></div></div><div style={{maxWidth:1320,margin:"0 auto",padding:"24px"}}>
{pTab==="dashboard"&&(<><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12,marginBottom:24}}>{[["Carpenters",ALL_CARPS.filter(c=>c.status==="active").length+""],["Sites","12"],["Pending Fixings",matReqs.filter(r=>r.status==="pending").length+""],["Active Plots","34"],["This Week","\u00a3"+schedAllocs.filter(a=>a.status==="complete").reduce((s,a)=>s+parseFloat(a.rate.replace(/[\u00a3,]/g,"")),0).toFixed(0)]].map(([l,v])=>(<div key={l} style={{background:"#fff",borderRadius:8,padding:16,textAlign:"center"}}><div style={{fontSize:24,fontWeight:700,color:"#C4A265"}}>{v}</div><div style={{fontSize:9,color:"#999",textTransform:"uppercase",letterSpacing:1,marginTop:4}}>{l}</div></div>))}</div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16}}><div style={{background:"#fff",borderRadius:8,padding:16}}><h4 style={{fontSize:13,fontWeight:700,marginBottom:10}}>Pending Fixings</h4>{matReqs.filter(r=>r.status==="pending").slice(0,3).map(r=>(<div key={r.id} style={{fontSize:12,padding:"6px 0",borderBottom:"1px solid #f0f0f0"}}>{r.who}: {r.items}</div>))}</div><div style={{background:"#fff",borderRadius:8,padding:16}}><h4 style={{fontSize:13,fontWeight:700,marginBottom:10}}>Quick Actions</h4>{[["Manage Carpenters","carpenters"],["Build Schedules","schedules"],["Site Map","site-map"],["Approve Fixings","fixings"]].map(([l,t])=>(<button key={t} onClick={()=>setPTab(t)} style={{...S.bt,background:"#f8f7f4",color:"#333",width:"100%",justifyContent:"center",marginBottom:6,fontSize:11}}>{l} {"\u2192"}</button>))}</div></div></>)}
{pTab==="carpenters"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:16}}>Carpenter Roster</h3><div style={{background:"#fff",borderRadius:8,overflow:"hidden",border:"1px solid #e8e8e8"}}><div style={{display:"grid",gridTemplateColumns:"50px 1fr 70px 1fr 1fr 70px",background:"#1B3D2F",padding:"8px 12px",gap:6}}>{["ID","Name","PIN","Site","Builder","Status"].map(h=>(<div key={h} style={{fontSize:9,fontWeight:700,color:"rgba(255,255,255,.5)",textTransform:"uppercase",letterSpacing:1}}>{h}</div>))}</div>{ALL_CARPS.map((c,i)=>(<div key={c.id} style={{display:"grid",gridTemplateColumns:"50px 1fr 70px 1fr 1fr 70px",padding:"10px 12px",gap:6,background:i%2===0?"#fff":"#fafaf8",borderBottom:"1px solid #f0f0f0",alignItems:"center"}}><div style={{fontSize:11,fontWeight:600,color:"#C4A265"}}>{c.id}</div><div style={{fontSize:12,fontWeight:600}}>{c.name}</div><div style={{fontSize:11,fontFamily:"monospace",background:"#f5f3ef",padding:"2px 6px",borderRadius:4,textAlign:"center"}}>{c.pin}</div><div style={{fontSize:11,color:"#555"}}>{c.site}</div><div style={{fontSize:11,color:"#777"}}>{c.builder}</div><div><span style={{fontSize:9,padding:"2px 8px",borderRadius:100,fontWeight:600,background:c.status==="active"?"#E8F5E9":"#FFF3E0",color:c.status==="active"?"#2E7D32":"#E65100"}}>{c.status}</span></div></div>))}</div></>)}
{pTab==="schedules"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:16}}>Schedule Builder</h3><div style={{background:"#fff",borderRadius:8,padding:20,marginBottom:20}}><h4 style={{fontSize:13,fontWeight:700,marginBottom:10}}>Allocate Work</h4><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:8}}><select value={allocForm.carp} onChange={e=>setAllocForm({...allocForm,carp:e.target.value})} style={{border:"1px solid #e0e0e0",borderRadius:6,padding:"8px 10px",fontSize:11,fontFamily:"inherit",outline:"none"}}><option value="">Carpenter...</option>{ALL_CARPS.map(c=>(<option key={c.id} value={c.name}>{c.name}</option>))}</select><select value={allocForm.site} onChange={e=>setAllocForm({...allocForm,site:e.target.value})} style={{border:"1px solid #e0e0e0",borderRadius:6,padding:"8px 10px",fontSize:11,fontFamily:"inherit",outline:"none"}}><option value="">Site...</option>{BUILDERS.flatMap(b=>b.sites.map(s=>s.name)).map(s=>(<option key={s} value={s}>{s}</option>))}</select><input placeholder="Plot" value={allocForm.plot} onChange={e=>setAllocForm({...allocForm,plot:e.target.value})} style={{border:"1px solid #e0e0e0",borderRadius:6,padding:"8px 10px",fontSize:11,fontFamily:"inherit",outline:"none"}}/><select value={allocForm.stage} onChange={e=>setAllocForm({...allocForm,stage:e.target.value})} style={{border:"1px solid #e0e0e0",borderRadius:6,padding:"8px 10px",fontSize:11,fontFamily:"inherit",outline:"none"}}><option value="">Stage...</option>{["Joists","Roofs","First Fix","First Fix — Drop Backs","Second Fix","Finals"].map(s=>(<option key={s} value={s}>{s}</option>))}</select><input type="date" value={allocForm.date} onChange={e=>setAllocForm({...allocForm,date:e.target.value})} style={{border:"1px solid #e0e0e0",borderRadius:6,padding:"8px 10px",fontSize:11,fontFamily:"inherit",outline:"none"}}/><button onClick={()=>{if(!allocForm.carp||!allocForm.site||!allocForm.plot||!allocForm.stage||!allocForm.date){alert("Fill all fields");return;}const d=new Date(allocForm.date);const dateStr=d.toLocaleDateString("en-GB").slice(0,5);const bl=ALL_PRICE_LISTS.find(b=>b.sites.some(s=>s.site===allocForm.site));const sl=bl?.sites.find(s=>s.site===allocForm.site);const rate=sl?.rates.find(r=>r[0].toLowerCase().includes(allocForm.stage.toLowerCase().split(" ")[0]))?.[1]||"TBC";setSchedAllocs(p=>[{id:Date.now(),carp:allocForm.carp,site:allocForm.site,plot:allocForm.plot,stage:allocForm.stage,date:dateStr,status:"upcoming",rate},...p]);setAllocForm({carp:"",site:"",plot:"",stage:"",date:""});}} style={{...S.bt,background:"#C4A265",color:"#fff",justifyContent:"center",fontSize:11}}>Allocate</button></div></div><h4 style={{fontSize:14,fontWeight:700,marginBottom:10}}>Allocations ({schedAllocs.length})</h4><div style={{background:"#fff",borderRadius:8,overflow:"hidden",border:"1px solid #e8e8e8"}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 60px 80px 70px 70px 60px",background:"#1B3D2F",padding:"8px 12px",gap:4}}>{["Carpenter","Site","Plot","Stage","Date","Rate","Status"].map(h=>(<div key={h} style={{fontSize:9,fontWeight:700,color:"rgba(255,255,255,.5)",textTransform:"uppercase",letterSpacing:1}}>{h}</div>))}</div>{schedAllocs.map((a,i)=>(<div key={a.id} style={{display:"grid",gridTemplateColumns:"1fr 1fr 60px 80px 70px 70px 60px",padding:"8px 12px",gap:4,background:i%2===0?"#fff":"#fafaf8",borderBottom:"1px solid #f0f0f0"}}><div style={{fontSize:11,fontWeight:600}}>{a.carp}</div><div style={{fontSize:11,color:"#555"}}>{a.site}</div><div style={{fontSize:11}}>P{a.plot}</div><div style={{fontSize:10,color:"#777"}}>{a.stage}</div><div style={{fontSize:11}}>{a.date}</div><div style={{fontSize:11,fontWeight:600,color:"#C4A265"}}>{a.rate}</div><div><span style={{fontSize:9,padding:"2px 6px",borderRadius:100,fontWeight:600,background:a.status==="active"?"#FFF3E0":a.status==="complete"?"#E8F5E9":"#f5f5f5",color:a.status==="active"?"#E65100":a.status==="complete"?"#2E7D32":"#999"}}>{a.status}</span></div></div>))}</div></>)}
{pTab==="site-map"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:4}}>Interactive Site Map \u2014 Holbrook Park</h3><p style={{fontSize:12,color:"#999",marginBottom:12}}>Click any plot to view details and update status.</p><div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>{Object.entries(stageColors).map(([stage,color])=>(<div key={stage} style={{display:"flex",alignItems:"center",gap:4,fontSize:9}}><span style={{width:8,height:8,borderRadius:2,background:color,display:"inline-block"}}/>{stage}</div>))}</div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(44px,1fr))",gap:5,marginBottom:16}}>{plots.map(p=>(<div key={p.plot} onClick={()=>setSelectedPlot(selectedPlot===p.plot?null:p.plot)} style={{aspectRatio:"1",background:stageColors[p.stage]||"#e0e0e0",borderRadius:6,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",border:selectedPlot===p.plot?"3px solid #C4A265":"3px solid transparent",transition:".15s"}}><div style={{fontSize:11,fontWeight:700,color:"#fff"}}>{p.plot}</div><div style={{fontSize:6,color:"rgba(255,255,255,.8)"}}>{p.stage.replace(" Complete","\u2713").replace("Not Started","\u2014")}</div></div>))}</div>{selectedPlot&&(()=>{const p=plots.find(x=>x.plot===selectedPlot);if(!p)return null;return(<div style={{background:"#fff",borderRadius:8,padding:20,border:"1px solid #e8e8e8"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}><div><h4 style={{fontSize:16,fontWeight:700,margin:"0 0 4px"}}>Plot {p.plot}</h4><div style={{fontSize:12,color:"#777"}}>The {p.houseType} \u2014 {p.carpenter}</div></div><span style={{fontSize:10,padding:"4px 10px",borderRadius:100,fontWeight:600,background:stageColors[p.stage],color:"#fff"}}>{p.stage}</span></div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{["Joists","Roofs","First Fix","Second Fix","Finals","Complete"].map(st=>(<button key={st} onClick={()=>{setPlots(prev=>prev.map(x=>x.plot===p.plot?{...x,stage:st}:x));}} style={{...S.bt,background:p.stage===st?"#C4A265":"#f5f3ef",color:p.stage===st?"#fff":"#555",fontSize:10,padding:"5px 10px"}}>{st}</button>))}</div></div>);})()}</>)}
{pTab==="fixings"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:16}}>Fixings Requests</h3>{matReqs.map(r=>(<div key={r.id} style={{background:"#fff",borderRadius:8,padding:14,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:13,fontWeight:600}}>{r.items}</div><div style={{fontSize:11,color:"#999"}}>{r.who} \u2014 {r.site} \u2014 {r.date} \u2014 {r.payMethod||"deduct"}</div></div><div style={{display:"flex",gap:6}}>{r.status==="pending"?(<><button onClick={()=>setMatReqs(p=>p.map(x=>x.id===r.id?{...x,status:"approved"}:x))} style={{...S.bt,background:"#22c55e",color:"#fff",fontSize:10,padding:"5px 12px"}}>Approve</button><button onClick={()=>setMatReqs(p=>p.map(x=>x.id===r.id?{...x,status:"rejected"}:x))} style={{...S.bt,background:"#ef4444",color:"#fff",fontSize:10,padding:"5px 12px"}}>Reject</button></>):(<span style={{fontSize:10,padding:"3px 10px",borderRadius:100,fontWeight:600,background:r.status==="approved"?"#E8F5E9":"#FFEBEE",color:r.status==="approved"?"#2E7D32":"#C62828"}}>{r.status}</span>)}</div></div>))}</>)}
{pTab==="price-lists"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:16}}>Price Lists \u2014 All Builders</h3>{ALL_PRICE_LISTS.map((b,bi)=>(<div key={bi} style={{marginBottom:12}}><div style={{background:"#fff",borderRadius:8,overflow:"hidden",border:"1px solid #e8e8e8"}}><div onClick={()=>{const el=document.getElementById("apl-"+bi);if(el)el.style.display=el.style.display==="none"?"block":"none";}} style={{padding:"12px 16px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",borderLeft:`4px solid ${b.color}`}}><span style={{fontSize:13,fontWeight:700}}>{b.builder} <span style={{fontSize:11,color:"#999",fontWeight:400}}>({b.sites.length} site{b.sites.length>1?"s":""})</span></span><span style={{color:"#C4A265",fontSize:11}}>{"\u25BC"}</span></div><div id={"apl-"+bi} style={{display:"none"}}>{b.sites.map((s,si)=>(<div key={si} style={{padding:"12px 16px",borderTop:"1px solid #f0f0f0"}}><h5 style={{fontSize:12,fontWeight:700,marginBottom:8,color:b.color}}>{s.site}</h5>{s.rates.map(([task,rate],ri)=>(<div key={ri} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",fontSize:12,borderBottom:"1px solid #f8f7f4"}}><span>{task}</span><span style={{fontWeight:700,color:"#C4A265"}}>{rate}</span></div>))}</div>))}</div></div></div>))}</>)}
{pTab==="documents"&&(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:16}}>All Documents</h3>{Object.entries(DEMO_DOCS_BY_SITE).map(([site,sections])=>(<div key={site} style={{marginBottom:20}}><h4 style={{fontSize:14,fontWeight:700,marginBottom:8,paddingBottom:6,borderBottom:"2px solid #C4A265"}}>{site}</h4>{sections.map(section=>(<div key={section.cat} style={{marginBottom:12}}><h5 style={{fontSize:12,fontWeight:700,color:"#777",marginBottom:6}}>{section.cat}</h5>{section.docs.map((doc,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",background:i%2===0?"#fff":"#fafaf8",borderRadius:4,marginBottom:2}}><span style={{fontSize:12}}>{doc}</span><button onClick={()=>alert('Demo: Would open "'+doc+'"')} style={{...S.bt,background:"#1B3D2F",color:"#fff",fontSize:9,padding:"4px 10px"}}>View</button></div>))}</div>))}</div>))}</>)}
</div></div>)}
</div>);}
// MAIN SITE
return(<div style={S.root}><nav style={S.nav} className="mw-nav-inner"><div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>go("home")}><img src="/Ridgeway-logo.png" alt="Ridgeway" style={{width:44,height:44,borderRadius:6,objectFit:"contain",background:"#fff",padding:2}}/><span style={{color:"#fff",fontSize:15,fontWeight:600}}>Ridgeway <span style={{color:"#C4A265"}}>Carpentry</span></span></div><div className="mw-desk" style={{display:"flex",gap:12,alignItems:"center",flexWrap:"nowrap"}}>{[["home","Home"],["services","Services"],["builders","Projects"],["upcoming","Upcoming Work"],["past","Past Projects"],["map","Site Map"],["careers","Work With Us"],["contact","Contact"]].map(([id,l])=>(<span key={id} style={S.nl(sec===id)} onClick={()=>go(id)}>{l}</span>))}<button onClick={()=>{setPortal("login");setPin("");}} style={{...S.bt,background:"#C4A265",color:"#fff",fontSize:11,padding:"8px 16px"}}>Contractor Login</button></div><button className="mw-mob-btn" onClick={()=>setMobileMenu(!mobileMenu)} style={{display:"none",alignItems:"center",justifyContent:"center",background:"none",border:"none",color:"#fff",fontSize:24,cursor:"pointer",padding:8}}>{mobileMenu?"\u2715":"\u2630"}</button></nav>{mobileMenu&&<div className="mw-mob-menu" style={{position:"fixed",top:"calc(64px + env(safe-area-inset-top, 0px))",left:0,right:0,background:"#1B3D2F",zIndex:99,padding:"12px 20px",borderBottom:"1px solid rgba(255,255,255,.06)",display:"flex",flexDirection:"column",gap:4}}>{[["home","Home"],["services","Services"],["builders","Projects"],["upcoming","Upcoming Work"],["past","Past Projects"],["map","Site Map"],["careers","Work With Us"],["contact","Contact"]].map(([id,l])=>(<span key={id} style={{...S.nl(sec===id),display:"block",padding:"10px 0",fontSize:13}} onClick={()=>{go(id);setMobileMenu(false);}}>{l}</span>))}<button onClick={()=>{setPortal("login");setPin("");setMobileMenu(false);}} style={{...S.bt,background:"#C4A265",color:"#fff",fontSize:11,padding:"10px 16px",marginTop:4,justifyContent:"center"}}>Contractor Login</button></div>}
{sec==="home"&&(<><div style={{marginTop:64,minHeight:"85vh",background:`linear-gradient(135deg,rgba(15,15,15,.7),rgba(15,15,15,.4)),url(${roofImg}) center/cover`,display:"flex",alignItems:"center",padding:"40px clamp(20px,4vw,48px)",paddingTop:"calc(40px + env(safe-area-inset-top, 12px))"}}><div style={{maxWidth:1320}}><div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(196,162,101,.15)",border:"1px solid rgba(196,162,101,.3)",borderRadius:100,padding:"6px 18px",marginBottom:24}}><span style={{width:6,height:6,background:"#C4A265",borderRadius:"50%"}}/><span style={{fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:"#D4C089"}}>Professional Carpentry Contractors</span></div><h1 style={{fontSize:"clamp(32px,5vw,60px)",color:"#fff",lineHeight:1.08,maxWidth:740,marginBottom:20,fontWeight:700}}>The Midlands' Leading<br/><span style={{fontStyle:"italic",color:"#D4C089",fontWeight:400}}>Site Carpentry</span> Specialists</h1><p style={{fontSize:"clamp(14px,2vw,16px)",color:"rgba(255,255,255,.6)",maxWidth:520,lineHeight:1.7,marginBottom:16}}>Delivering precision carpentry for new build housing. 100+ carpenters. Trusted by the UK's top housebuilders.</p><p style={{fontSize:"clamp(13px,2vw,15px)",color:"#D4C089",maxWidth:520,lineHeight:1.6,marginBottom:32,fontStyle:"italic",borderLeft:"2px solid rgba(196,162,101,.4)",paddingLeft:16}}>We don't just build homes — we build careers. Join a team that's growing, that values its people, and that's on a mission to become the best carpentry contractor in the country.</p><div style={{display:"flex",gap:12,flexWrap:"wrap"}}><button style={{...S.bt,background:"#C4A265",color:"#fff"}} onClick={()=>go("builders")}>View Our Projects →</button><button style={{...S.bt,background:"transparent",color:"#fff",border:"1px solid rgba(255,255,255,.25)"}} onClick={()=>go("careers")}>Join Our Team</button><button style={{...S.bt,background:"rgba(255,255,255,.08)",color:"#D4C089",border:"1px solid rgba(196,162,101,.3)"}} onClick={()=>{setPortal("login");setPin("");}}>Contractor Portal</button></div><div style={{display:"flex",gap:"clamp(24px,4vw,48px)",marginTop:64,flexWrap:"wrap"}}>{[["Quality","First"],["100+","Carpenters"],["1000s","Homes"],["Growing","Network"]].map(([n,l])=>(<div key={l} style={{textAlign:"center"}}><div style={{fontSize:"clamp(22px,3vw,28px)",fontWeight:700,color:"#D4C089"}}>{n}</div><div style={{fontSize:11,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:1.5,marginTop:2}}>{l}</div></div>))}</div></div></div><div style={{background:"#f6f4ef",padding:"60px 40px"}}><div style={{maxWidth:1320,margin:"0 auto"}}><div style={{textAlign:"center",marginBottom:40}}><span style={S.lb}>What We Do</span><h2 style={{...S.h2,fontSize:"clamp(24px,3vw,32px)"}}>Complete Carpentry Packages</h2><p style={{fontSize:14,color:"#777",maxWidth:600,margin:"0 auto",lineHeight:1.7}}>From ground floor joists to final snagging — we deliver every stage of carpentry for new-build housing developments.</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:20}}>{SERVICES.map(s=>(<div key={s.id} onClick={()=>{go("services");setSSv(s);}} style={{...S.cd,padding:24,borderLeft:"3px solid #C4A265",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}><div style={{fontSize:20,color:"#C4A265",marginBottom:8}}>{s.icon}</div><h3 style={{fontSize:14,fontWeight:700,marginBottom:4}}>{s.title}</h3><p style={{fontSize:12,color:"#777",lineHeight:1.5}}>{s.desc}</p></div>))}</div></div></div><div style={{background:"#1B3D2F",padding:"48px 40px"}}><div style={{maxWidth:1320,margin:"0 auto",textAlign:"center"}}><h2 style={{color:"#D4C089",fontSize:"clamp(20px,3vw,28px)",fontWeight:700,marginBottom:12}}>Ready to work with us?</h2><p style={{color:"rgba(255,255,255,.5)",fontSize:14,marginBottom:24,maxWidth:500,margin:"0 auto 24px"}}>Whether you're a builder looking for a reliable carpentry partner or a carpenter looking for steady work.</p><div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}><button style={{...S.bt,background:"#C4A265",color:"#fff"}} onClick={()=>go("contact")}>Get In Touch →</button><button style={{...S.bt,background:"transparent",color:"#fff",border:"1px solid rgba(255,255,255,.2)"}} onClick={()=>go("careers")}>Join Our Team</button></div></div></div></>)}
{sec==="services"&&!sSv&&(<div style={{marginTop:64}}><div style={{background:"linear-gradient(135deg,#1B3D2F,#244A38)",padding:"60px clamp(20px,4vw,40px)",textAlign:"center"}}><span style={S.lb}>Our Services</span><h2 style={{...S.h2,color:"#fff",fontSize:"clamp(28px,4vw,36px)"}}>Complete Site Carpentry</h2><p style={{fontSize:14,color:"rgba(255,255,255,.5)",maxWidth:600,margin:"0 auto",lineHeight:1.7}}>Select a trade below to explore our work — what we do, how we do it, and the quality we deliver on every plot.</p></div><div style={{maxWidth:1320,margin:"0 auto",padding:"40px clamp(20px,4vw,40px)"}}><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24}}>{SERVICES.map(s=>{const galleryCount={joists:GALLERY_PHOTOS["joists"].length,roofs:GALLERY_PHOTOS["roofs"].length,"first-fix":GALLERY_PHOTOS["first-fix"].length,"second-fix":10,finals:4,extras:4};return(<div key={s.id} onClick={()=>setSSv(s)} style={{background:"#fff",borderRadius:10,overflow:"hidden",boxShadow:"0 4px 20px rgba(0,0,0,.06)",cursor:"pointer",transition:".3s",border:"1px solid #eee"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 12px 32px rgba(0,0,0,.12)";}} onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,.06)";}}><div style={{height:180,background:"linear-gradient(135deg,#1B3D2F08,#C4A26508)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,padding:12,width:"100%",height:"100%"}}>{Array.from({length:3}).map((_,i)=>{const photos=GALLERY_PHOTOS[s.id];return photos&&photos[i]?(<div key={i} style={{borderRadius:4,overflow:"hidden"}}><img src={photos[i].src} alt="" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/></div>):(<div key={i} style={{background:"#f0ede6",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:10,color:"#bbb",textTransform:"uppercase",letterSpacing:1}}>Photo {i+1}</span></div>);})}</div><div style={{position:"absolute",top:12,right:12,background:"#C4A265",color:"#fff",padding:"4px 10px",borderRadius:100,fontSize:10,fontWeight:700}}>{galleryCount[s.id]||6} Photos</div></div><div style={{padding:"20px 24px 24px"}}><div style={{fontSize:28,marginBottom:8}}>{s.icon}</div><h3 style={{fontSize:17,fontWeight:700,marginBottom:6}}>{s.title}</h3><p style={{fontSize:12,color:"#777",lineHeight:1.6,marginBottom:12}}>{s.desc}</p><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",flexWrap:"wrap",gap:4}}>{s.subs.slice(0,2).map((sub,i)=>(<span key={i} style={{fontSize:10,padding:"2px 8px",borderRadius:100,background:"#f5f3ef",color:"#666"}}>{sub.n}</span>))}</div><span style={{fontSize:12,color:"#C4A265",fontWeight:700}}>View Gallery →</span></div></div></div>);})}</div></div></div>)}
{sec==="services"&&sSv&&(<div style={{marginTop:64}}><div style={{background:"linear-gradient(135deg,#1B3D2F,#244A38)",padding:"40px clamp(20px,4vw,40px)"}}><div style={{maxWidth:1320,margin:"0 auto"}}><button onClick={()=>setSSv(null)} style={{...S.bt,background:"rgba(255,255,255,.08)",color:"#fff",marginBottom:20,fontSize:12,border:"1px solid rgba(255,255,255,.1)"}}>← Back to Services</button><div style={{display:"flex",alignItems:"center",gap:16}}><span style={{fontSize:36}}>{sSv.icon}</span><div><h2 style={{...S.h2,color:"#fff",margin:0}}>{sSv.title}</h2><p style={{fontSize:14,color:"rgba(255,255,255,.5)",margin:"4px 0 0"}}>{sSv.desc}</p></div></div></div></div><div style={{maxWidth:1320,margin:"0 auto",padding:"32px clamp(20px,4vw,40px)"}}><div style={{background:"#fff",borderRadius:10,padding:28,marginBottom:32,border:"1px solid #eee"}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><h3 style={{fontSize:16,fontWeight:700,margin:0}}>Project Gallery</h3></div><p style={{fontSize:13,color:"#777",marginBottom:20,lineHeight:1.6}}>{sSv.id==="joists"?"See how we install engineered and traditional floor joist systems to NHBC standards. Every joist is precision-cut and fitted to architect specifications.":sSv.id==="roofs"?"From trussed rafter installations to complex cut roofs with hips, valleys and dormers — our roof carpentry speaks for itself.":sSv.id==="first-fix"?"All the structural carpentry that happens before plastering — stud partitions, door linings, staircases, and timber frame erection.":sSv.id==="second-fix"?"The finishing touches that homebuyers see — doors hung perfectly, skirting tight to the wall, staircases built to impress.":sSv.id==="finals"?"The final checks, adjustments and fixes that get a plot from 'nearly done' to handover-ready. Zero-defect is the goal.":"When other contractors' carpentry needs putting right, Ridgeway step in. We provide remedial and snagging services to builders who need quality issues resolved quickly and professionally."}</p><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:12}}>{(GALLERY_PHOTOS[sSv.id]&&GALLERY_PHOTOS[sSv.id].length>0)?GALLERY_PHOTOS[sSv.id].map((photo,i)=>(<div key={i} style={{aspectRatio:"4/3",borderRadius:8,overflow:"hidden",position:"relative",cursor:"pointer",border:"1px solid #eee"}}><img src={photo.src} alt={photo.caption} style={{width:"100%",height:"100%",objectFit:"cover",display:"block",transition:".3s"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}/><div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,rgba(0,0,0,.7))",padding:"20px 10px 8px",color:"#fff",fontSize:10,fontWeight:500}}>{photo.caption}</div></div>)):Array.from({length:sSv.id==="joists"?6:sSv.id==="roofs"?8:sSv.id==="first-fix"?8:sSv.id==="second-fix"?10:sSv.id==="finals"?4:4}).map((_,i)=>(<div key={i} style={{aspectRatio:"4/3",background:"linear-gradient(135deg,#f5f3ef,#ece8e0)",borderRadius:8,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",border:"2px dashed #ddd",cursor:"pointer",transition:".2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor="#C4A265"} onMouseLeave={e=>e.currentTarget.style.borderColor="#ddd"}><span style={{fontSize:14,marginBottom:4,color:"#bbb"}}>—</span><span style={{fontSize:10,color:"#999",textTransform:"uppercase",letterSpacing:1}}>Photo {i+1}</span><span style={{fontSize:9,color:"#bbb",marginTop:2}}>{sSv.title}</span></div>))}</div><div style={{marginTop:16,padding:"12px 16px",background:"#f8f7f4",borderRadius:6,borderLeft:"3px solid #C4A265"}}><p style={{fontSize:11,color:"#777",margin:0,fontStyle:"italic"}}>{(GALLERY_PHOTOS[sSv.id]&&GALLERY_PHOTOS[sSv.id].length>0)?"Real project photos from our active sites. More photos are added regularly as our teams capture their work.":"Photos coming soon — our site teams are capturing their best work across all active sites. These galleries will showcase the quality Ridgeway deliver on every plot."}</p></div></div>{sSv.subs.map((sc,i)=>(<div key={i} style={{marginBottom:24}}><h3 style={{fontSize:15,fontWeight:700,marginBottom:12,paddingBottom:8,borderBottom:"1px solid #eee"}}>{sc.n}</h3><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:10}}>{sc.items.map((item,j)=>(<div key={j} style={{background:"#fff",borderRadius:6,padding:14,border:"1px solid #f0f0f0",display:"flex",gap:10,alignItems:"center"}}><div style={{width:8,height:8,minWidth:8,borderRadius:"50%",background:"#C4A265"}}/><span style={{fontSize:13}}>{item}</span></div>))}</div></div>))}<div style={{background:"#1B3D2F",borderRadius:10,padding:28,textAlign:"center"}}><h3 style={{color:"#D4C089",fontSize:16,fontWeight:700,marginBottom:8}}>Want to see this quality on your site?</h3><p style={{color:"rgba(255,255,255,.5)",fontSize:13,marginBottom:16}}>Get in touch to discuss how Ridgeway can deliver {sSv.title.toLowerCase()} for your next development.</p><button onClick={()=>go("contact")} style={{...S.bt,background:"#C4A265",color:"#fff"}}>Get In Touch →</button></div></div></div>)}
{sec==="builders"&&!sB&&(<div style={{marginTop:64}}><div style={S.sc}><span style={S.lb}>Our Builder Partners</span><h2 style={S.h2}>Working With the Best</h2><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:20,marginTop:40}}>{BUILDERS.map(b=>(<div key={b.id} onClick={()=>setSB(b)} style={{...S.cd,padding:24,textAlign:"center",borderTop:`3px solid ${b.color}`}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>{b.logo&&<div style={{height:45,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10}}><img src={b.logo} alt={b.name} style={{maxHeight:45,maxWidth:"100%",objectFit:"contain"}} onError={e=>e.target.style.display="none"}/></div>}<h3 style={{fontSize:13,fontWeight:700}}>{b.name}</h3><p style={{fontSize:11,color:"#999",marginTop:3}}>{b.sites.length} site{b.sites.length>1?"s":""}</p></div>))}</div><div style={{marginTop:56}}><span style={{...S.lb,color:"#D4C089"}}>NHBC Recognition</span><h2 style={{...S.h2,fontSize:"clamp(20px,3vw,24px)"}}>Award Winning Sites</h2><p style={{...S.sub,marginBottom:24}}>We're proud that our carpentry has contributed to NHBC award-winning developments. Quality recognised at the highest level.</p><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16}}>{PAST_PROJECTS.filter(p=>p.award).map((p,i)=>{const builderObj=BUILDERS.find(b=>b.name===p.builder||b.name.includes(p.builder.split(' ')[0]));const color=builderObj?.color||"#C4A265";return(<div key={i} style={{background:"#fff",borderRadius:10,overflow:"hidden",boxShadow:"0 2px 16px rgba(0,0,0,.06)",border:"1px solid #e8e8e8"}}><div style={{background:`linear-gradient(135deg,${color},${color}cc)`,padding:"16px 20px",color:"#fff"}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}><span style={{fontSize:11,opacity:.7,textTransform:"uppercase",letterSpacing:1}}>{p.year}</span></div><h3 style={{fontSize:15,fontWeight:700,margin:"0 0 2px"}}>{p.site}</h3><p style={{fontSize:12,opacity:.8,margin:0}}>{p.builder} — {p.location}</p></div><div style={{padding:16}}><div style={{background:"#FFF8E1",borderRadius:6,padding:"8px 12px",marginBottom:10,display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:11,fontWeight:700,color:"#C4A265"}}>{p.award}</span></div><div style={{fontSize:12,color:"#888"}}>{p.units} homes delivered</div></div></div>)})}</div></div></div></div>)}
{sec==="builders"&&sB&&!sS&&(<div style={{marginTop:64}}><div style={S.sc}><button onClick={()=>setSB(null)} style={{...S.bt,background:"#f0f0f0",color:"#333",marginBottom:24,fontSize:12}}>← Back</button><h2 style={S.h2}>{sB.name}</h2>{sB.relationship&&<div style={{background:"#f8f7f4",borderRadius:6,padding:16,marginTop:8,marginBottom:24,borderLeft:`3px solid ${sB.color}`}}><p style={{fontSize:13,color:"#555",lineHeight:1.7,margin:0,fontStyle:"italic"}}>{sB.relationship}</p></div>}<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20}}>{sB.sites.map((s,i)=>(<div key={i} onClick={()=>setSS(s)} style={{...S.cd,borderLeft:`3px solid ${sB.color}`}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}><div style={{padding:20}}><h3 style={{fontSize:15,fontWeight:700,marginBottom:4}}>{s.name}</h3><p style={{fontSize:12,color:"#777",marginBottom:10}}>{s.location}</p><div style={{display:"flex",flexWrap:"wrap",gap:5}}>{s.housetypes.slice(0,3).map(h=>(<span key={h} style={{fontSize:10,padding:"2px 8px",borderRadius:100,background:"#f5f3ef",color:"#666"}}>{h}</span>))}{s.housetypes.length>3&&<span style={{fontSize:10,padding:"2px 8px",borderRadius:100,background:"#f5f3ef",color:"#999"}}>+{s.housetypes.length-3}</span>}</div></div></div>))}</div></div></div>)}
{sec==="builders"&&sB&&sS&&(<div style={{marginTop:64}}><div style={S.sc}><button onClick={()=>setSS(null)} style={{...S.bt,background:"#f0f0f0",color:"#333",marginBottom:24,fontSize:12}}>← Back</button><span style={{...S.lb,color:sB.color}}>{sB.name}</span><h2 style={S.h2}>{sS.name}</h2><p style={S.sub}>{sS.location}</p><div style={{marginTop:24,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20}}><div style={{background:"#fff",borderRadius:8,padding:24,border:"1px solid #e8e8e8"}}><h4 style={{fontSize:14,fontWeight:700,marginBottom:12}}>Site Details</h4><div style={{display:"flex",flexDirection:"column",gap:10}}><div style={{display:"flex",gap:10,alignItems:"flex-start"}}><span style={{fontSize:14}}>📍</span><div><div style={{fontSize:12,fontWeight:600}}>Location</div><div style={{fontSize:13,color:"#555"}}>{sS.location}</div></div></div><div style={{display:"flex",gap:10,alignItems:"flex-start"}}><span style={{width:20,height:20,minWidth:20,borderRadius:4,background:sB.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,color:"#fff",marginTop:1}}>B</span><div><div style={{fontSize:12,fontWeight:600}}>Builder</div><div style={{fontSize:13,color:"#555"}}>{sB.name}</div></div></div><div style={{display:"flex",gap:10,alignItems:"flex-start"}}><span style={{width:20,height:20,minWidth:20,borderRadius:4,background:"#f5f3ef",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,color:"#C4A265",marginTop:1}}>H</span><div><div style={{fontSize:12,fontWeight:600}}>House Types</div><div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:4}}>{sS.housetypes.map(h=>(<span key={h} style={{fontSize:10,padding:"3px 10px",borderRadius:100,background:"#f5f3ef",color:"#555"}}>{h}</span>))}</div></div></div></div></div><div style={{background:"#fff",borderRadius:8,padding:24,border:"1px solid #e8e8e8"}}><h4 style={{fontSize:14,fontWeight:700,marginBottom:12}}>Get Directions</h4><p style={{fontSize:12,color:"#777",marginBottom:16}}>Navigate to {sS.name} using your preferred maps app.</p><div style={{display:"flex",flexDirection:"column",gap:10}}><a href={`https://www.google.com/maps/dir/?api=1&destination=${sS.lat},${sS.lng}`} target="_blank" rel="noopener noreferrer" style={{...S.bt,background:"#4285F4",color:"#fff",textDecoration:"none",justifyContent:"center",fontSize:13}}>Google Maps →</a><a href={`https://maps.apple.com/?daddr=${sS.lat},${sS.lng}`} target="_blank" rel="noopener noreferrer" style={{...S.bt,background:"#333",color:"#fff",textDecoration:"none",justifyContent:"center",fontSize:13}}>Apple Maps →</a><a href={`https://waze.com/ul?ll=${sS.lat},${sS.lng}&navigate=yes`} target="_blank" rel="noopener noreferrer" style={{...S.bt,background:"#05C8F7",color:"#fff",textDecoration:"none",justifyContent:"center",fontSize:13}}>Waze →</a></div></div></div>{sB.relationship&&<div style={{background:"#f8f7f4",borderRadius:6,padding:16,marginTop:24,borderLeft:`3px solid ${sB.color}`}}><p style={{fontSize:13,color:"#555",lineHeight:1.7,margin:0,fontStyle:"italic"}}>{sB.relationship}</p></div>}</div></div>)}
{sec==="map"&&(<div style={{marginTop:64}}><div style={{background:'linear-gradient(135deg,#1B3D2F,#244A38)',padding:'60px clamp(20px,4vw,40px) 32px',textAlign:'center'}}><span style={S.lb}>Coverage</span><h2 style={{...S.h2,color:'#fff',fontSize:'clamp(28px,4vw,36px)'}}>Our Sites Across the Midlands</h2><p style={{fontSize:14,color:'rgba(255,255,255,.5)',maxWidth:520,margin:'0 auto',lineHeight:1.7}}>Tap any pin for site details and one-tap directions.</p></div><div style={{maxWidth:1320,margin:'0 auto',padding:'0 clamp(20px,4vw,40px) 40px'}}><div style={{marginTop:-20,position:'relative',zIndex:1}}><div ref={mapEl} style={{height:'clamp(400px,50vh,600px)',borderRadius:16,overflow:'hidden',boxShadow:'0 12px 40px rgba(0,0,0,.15)',border:'2px solid rgba(255,255,255,.1)'}}/></div><div style={{display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center',marginTop:20,padding:'16px 0'}}>{BUILDERS.map(b=>(<div key={b.id} style={{display:'flex',alignItems:'center',gap:6,fontSize:11,fontWeight:600,color:'#555',padding:'6px 14px',background:'#fff',borderRadius:100,boxShadow:'0 2px 8px rgba(0,0,0,.06)',border:'1px solid #eee'}}><span style={{width:10,height:10,borderRadius:'50%',background:b.color,display:'inline-block',boxShadow:`0 0 0 3px ${b.color}22`}}/>{b.name} <span style={{color:'#bbb',fontWeight:400}}>({b.sites.length})</span></div>))}</div><div style={{marginTop:28}}>{BUILDERS.map(b=>(<div key={b.id} style={{marginBottom:16}}><h4 style={{fontSize:12,fontWeight:700,display:'flex',alignItems:'center',gap:6,marginBottom:8}}><span style={{width:10,height:10,borderRadius:'50%',background:b.color,display:'inline-block'}}/>{b.name}</h4><div style={{display:'flex',flexWrap:'wrap',gap:6}}>{b.sites.map((s,i)=>(<span key={i} style={{fontSize:11,padding:'6px 14px',borderRadius:100,background:'#fff',color:'#555',cursor:'pointer',border:'1px solid #eee',boxShadow:'0 1px 4px rgba(0,0,0,.04)',transition:'.2s'}} onMouseEnter={e=>{e.currentTarget.style.background=b.color;e.currentTarget.style.color='#fff';e.currentTarget.style.borderColor=b.color;}} onMouseLeave={e=>{e.currentTarget.style.background='#fff';e.currentTarget.style.color='#555';e.currentTarget.style.borderColor='#eee';}} onClick={()=>{go("builders");setSB(b);setSS(s);}}>{s.name}</span>))}</div></div>))}</div></div></div>)}
{sec==="upcoming"&&(<div style={{marginTop:64}}><div style={S.sc}><span style={S.lb}>Growth & New Business</span><h2 style={S.h2}>Upcoming Work</h2><p style={S.sub}>We're proud to be continually winning new business. These are sites where work is about to begin or has just started — a sign of our growing reputation across the Midlands.</p><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:24,marginTop:40}}>{[].map(b=>b.sites.map((s,si)=>(<div key={b.builder+si} style={{background:"#fff",borderRadius:8,overflow:"hidden",boxShadow:"0 2px 16px rgba(0,0,0,.06)",borderTop:`4px solid ${b.color}`}}><div style={{padding:24}}><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}><div style={{height:35,display:"flex",alignItems:"center"}}><img src={b.logo} alt={b.builder} style={{maxHeight:35,maxWidth:100,objectFit:"contain"}} onError={e=>{e.target.style.display="none";}}/></div><div><h3 style={{fontSize:15,fontWeight:700,margin:0}}>{s.name}</h3><p style={{fontSize:12,color:"#777",margin:0}}>{b.builder}</p></div></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>{[["Location",s.location],["Units",s.units+""],["Scope",s.scope],["Status",s.status]].map(([label,val])=>(<div key={label}><div style={{fontSize:10,fontWeight:700,color:"#999",textTransform:"uppercase",letterSpacing:1}}>{label}</div><div style={{fontSize:13,fontWeight:600,marginTop:2}}>{val}</div></div>))}</div><div><div style={{fontSize:10,fontWeight:700,color:"#999",textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>House Types</div><div style={{display:"flex",flexWrap:"wrap",gap:5}}>{s.housetypes.map(h=>(<span key={h} style={{fontSize:10,padding:"3px 10px",borderRadius:100,background:"#f5f3ef",color:"#555"}}>{h}</span>))}</div></div></div><div style={{padding:"12px 24px",background:`${b.color}10`,borderTop:`1px solid ${b.color}20`,display:"flex",alignItems:"center",gap:6}}><span style={{width:8,height:8,borderRadius:"50%",background:"#22c55e",display:"inline-block"}}/><span style={{fontSize:11,fontWeight:600,color:b.color}}>{s.status}</span></div></div>))).flat()}</div><div style={{marginTop:48,background:"#f8f7f4",borderRadius:8,padding:32,borderLeft:"3px solid #C4A265"}}><h3 style={{fontSize:16,fontWeight:700,marginBottom:8}}>Winning New Business</h3><p style={{fontSize:13,color:"#555",lineHeight:1.7,margin:0}}>Every new site represents trust earned through delivering quality carpentry. Our reputation for reliability, craftsmanship, and professional management is growing. With new partnerships and sites coming on stream, the future is looking strong.</p></div></div></div>)}
{sec==="past"&&(<div style={{marginTop:64}}><div style={S.sc}><span style={S.lb}>Track Record</span><h2 style={S.h2}>Our Track Record</h2><p style={S.sub}>Every site below represents homes we're proud to have helped build.</p><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12,marginTop:32,marginBottom:24}}>{[[""+PAST_PROJECTS.length,"Projects"],[PAST_PROJECTS.reduce((a,p)=>a+p.units,0).toLocaleString(),"Homes"],[""+new Set(PAST_PROJECTS.map(p=>p.builder)).size,"Builders"],["2025+","Active"],[PAST_PROJECTS.filter(p=>p.award).length+"","Awards"]].map(([v,l])=>(<div key={l} style={{background:"#f8f7f4",borderRadius:8,padding:"16px 14px",textAlign:"center"}}><div style={{fontSize:"clamp(20px,3vw,26px)",fontWeight:700,color:l==="Awards"?"#D4C089":"#C4A265"}}>{v}</div><div style={{fontSize:10,color:"#999",textTransform:"uppercase",letterSpacing:1.5,marginTop:2}}>{l}</div></div>))}</div>
{/* Award-winning projects highlight */}
{PAST_PROJECTS.filter(p=>p.award).length>0&&(<div style={{marginBottom:32}}><h3 style={{fontSize:16,fontWeight:700,color:NAVY,marginBottom:14,display:"flex",alignItems:"center",gap:8}}>Award-Winning Sites</h3><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>{PAST_PROJECTS.filter(p=>p.award).map((p,i)=>(<div key={i} style={{background:"linear-gradient(135deg,#fffdf5,#fff8e1)",borderRadius:10,padding:18,border:"1px solid #ffe082",position:"relative",overflow:"hidden"}}><div style={{position:"absolute",top:10,right:10,fontSize:11,fontWeight:700,color:"#C4A265",background:"rgba(196,162,101,.1)",padding:"3px 10px",borderRadius:100}}>AWARD</div><div style={{fontSize:11,fontWeight:600,color:"#C4A265",marginBottom:4}}>{p.year}</div><div style={{fontSize:15,fontWeight:700,color:NAVY,marginBottom:2}}>{p.site}</div><div style={{fontSize:12,color:"#666",marginBottom:6}}>{p.builder} — {p.location}</div><div style={{fontSize:11,fontWeight:600,color:"#C4A265",background:"rgba(196,162,101,.1)",display:"inline-block",padding:"3px 10px",borderRadius:100}}>{p.award}</div><div style={{fontSize:12,color:"#888",marginTop:6}}>{p.units} homes</div></div>))}</div></div>)}
{/* All projects — mobile-friendly card list */}
<div style={{display:"grid",gap:10}}>{PAST_PROJECTS.map((p,i)=>(<div key={i} style={{background:p.award?"linear-gradient(135deg,#fffdf5,#fff)":"#fff",borderRadius:8,padding:"14px 16px",border:p.award?"1px solid #ffe082":"1px solid #e8e8e8",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap"}}><div style={{flex:1,minWidth:180}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>{p.award&&<span style={{fontSize:9,fontWeight:700,color:"#C4A265",background:"rgba(196,162,101,.1)",padding:"1px 6px",borderRadius:100}}>AWARD</span>}<span style={{fontSize:13,fontWeight:700,color:NAVY}}>{p.site}</span></div><div style={{fontSize:12,color:"#666"}}>{p.builder} — {p.location}</div><div style={{fontSize:11,color:"#999",marginTop:2}}>{p.year}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:16,fontWeight:700,color:"#C4A265"}}>{p.units}</div><div style={{fontSize:10,color:"#999",textTransform:"uppercase"}}>homes</div>{p.award&&<div style={{fontSize:9,color:"#C4A265",fontWeight:600,marginTop:2}}>{p.award.split(" — ")[0]}</div>}</div></div>))}</div></div></div>)}
{sec==="careers"&&(<div style={{marginTop:64}}><div style={{background:"#1B3D2F",color:"#fff",padding:"80px 40px"}}><div style={{maxWidth:1320,margin:"0 auto"}}><span style={S.lb}>Work With Us</span><h2 style={{...S.h2,color:"#fff"}}>Join the Ridgeway Team</h2><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"clamp(24px,4vw,48px)",marginTop:40}}><div style={{display:"flex",flexDirection:"column",gap:14}}>{[["Excellent Pricework Rates","Paid weekly by BACS."],["Continuity of Work","Sites across the Midlands year-round."],["NHBC Training","Standards training on site."],["Professional Management","Full supervision and H&S."],["Midlands Coverage","Derby, Nottingham, Staffs, Leicester."]].map(([t,d],i)=>(<div key={i} style={{display:"flex",gap:14,padding:14,background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)",borderRadius:6}}><div style={{width:36,height:36,minWidth:36,borderRadius:"50%",background:"rgba(196,162,101,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:"#C4A265",fontWeight:700}}>{i+1}</div><div><h4 style={{fontSize:13,fontWeight:700,margin:"0 0 2px"}}>{t}</h4><p style={{fontSize:11,color:"rgba(255,255,255,.4)",margin:0}}>{d}</p></div></div>))}</div><div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)",borderRadius:8,padding:28}}>{!formDone?(<><h3 style={{fontSize:18,fontWeight:700,marginBottom:4}}>Express Your Interest</h3><p style={{fontSize:12,color:"rgba(255,255,255,.4)",marginBottom:20}}>We'll be in touch within 24 hours.</p><form onSubmit={e=>{e.preventDefault();setFormDone(true);}}><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10,marginBottom:10}}>{[["First Name","text"],["Surname","text"],["Phone","tel"],["Email","email"]].map(([p,t])=>(<input key={p} type={t} placeholder={p} required={p!=="Email"} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:5,padding:"10px 12px",color:"#fff",fontSize:13,fontFamily:"inherit",outline:"none"}}/>))}</div><input placeholder="CSCS Card Number" style={{width:"100%",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:5,padding:"10px 12px",color:"#fff",fontSize:13,fontFamily:"inherit",outline:"none",marginBottom:10}}/><textarea placeholder="Tell us about yourself..." rows={3} style={{width:"100%",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:5,padding:"10px 12px",color:"#fff",fontSize:13,fontFamily:"inherit",marginBottom:10,outline:"none",resize:"vertical"}}/><button type="submit" style={{...S.bt,background:"#C4A265",color:"#fff",width:"100%",justifyContent:"center"}}>Submit →</button></form></>):(<div style={{textAlign:"center",padding:40}}><div style={{fontSize:32,marginBottom:16,fontWeight:700,color:"#22c55e"}}>Submitted</div><h3 style={{fontSize:18,fontWeight:700}}>Application Received</h3></div>)}</div></div></div></div></div>)}
{sec==="contact"&&(<div style={{marginTop:64}}><div style={S.sc}><span style={S.lb}>Contact</span><h2 style={S.h2}>Get in Touch</h2><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"clamp(24px,4vw,48px)",marginTop:32}}><div>{[["Phone","01283 716 173"],["Email","info@ridgewaycarpentry.co.uk"],["Company","VAT Registered | CIS Contractor"],["Hours","Mon–Fri: 7am–5pm"]].map(([t,d],i)=>(<div key={i} style={{display:"flex",gap:14,marginBottom:20}}><div style={{width:36,height:36,minWidth:36,borderRadius:"50%",background:"#f5f3ef",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#C4A265"}}>{t.charAt(0)}</div><div><h4 style={{fontSize:12,fontWeight:700,margin:"0 0 2px"}}>{t}</h4><p style={{fontSize:12,color:"#777",margin:0,whiteSpace:"pre-line"}}>{d}</p></div></div>))}</div><div style={{borderRadius:8,overflow:"hidden",border:"1px solid #e0e0e0",minHeight:300}}><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4831!2d-1.7187!3d52.7605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879f8a3a3b7c0a1%3A0x1!2sBarton+under+Needwood!5e0!3m2!1sen!2suk!4v1" style={{width:"100%",height:"100%",minHeight:300,border:"none"}} loading="lazy"/></div></div></div></div>)}
<footer style={{background:"#1B3D2F",borderTop:"1px solid rgba(255,255,255,.06)",padding:"40px 40px 24px",color:"rgba(255,255,255,.5)"}}><div style={{maxWidth:1320,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:32}}><div><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><img src="/Ridgeway-logo.png" alt="Ridgeway" style={{width:30,height:30,borderRadius:4,objectFit:"contain"}}/><span style={{color:"#fff",fontSize:14,fontWeight:600}}>Ridgeway Carpentry</span></div><p style={{fontSize:12,lineHeight:1.7}}>Professional site carpentry contractors serving the Midlands' top housebuilders.</p></div><div><h4 style={{color:"#C4A265",fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:12}}>Quick Links</h4>{[["services","Services"],["builders","Projects"],["careers","Work With Us"],["contact","Contact"]].map(([id,l])=>(<div key={id} style={{marginBottom:6}}><span onClick={()=>go(id)} style={{fontSize:12,color:"rgba(255,255,255,.5)",cursor:"pointer"}}>{l}</span></div>))}</div><div><h4 style={{color:"#C4A265",fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:12}}>Contact</h4><p style={{fontSize:12,lineHeight:2,margin:0}}>Ridgeway Carpentry Ltd<br/>Professional Carpentry Contractors<br/>01283 716 173<br/>info@ridgewaycarpentry.co.uk</p></div></div><div style={{maxWidth:1320,margin:"24px auto 0",paddingTop:20,borderTop:"1px solid rgba(255,255,255,.06)",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}><p style={{fontSize:11,margin:0}}>© {new Date().getFullYear()} Ridgeway Carpentry Ltd. All rights reserved.</p><p style={{fontSize:11,margin:0}}>Company VAT Registered | CIS Contractor</p></div></footer>
<button onClick={()=>setChatOn(!chatOn)} style={{position:"fixed",bottom:24,right:24,zIndex:200,width:56,height:56,borderRadius:"50%",background:"#C4A265",border:"none",cursor:"pointer",boxShadow:"0 4px 20px rgba(196,162,101,.35)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:22}}>{chatOn?"✕":"↗"}</button>
{chatOn&&(<div style={{position:"fixed",bottom:92,right:24,zIndex:199,width:340,maxHeight:460,background:"#fff",borderRadius:12,boxShadow:"0 12px 48px rgba(0,0,0,.15)",display:"flex",flexDirection:"column",overflow:"hidden"}}><div style={{background:"#1B3D2F",padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}><div style={{width:30,height:30,borderRadius:"50%",overflow:"hidden",flexShrink:0}}><img src="/Ridgeway-logo.png" alt="Ridgeway" style={{width:"100%",height:"100%",objectFit:"contain"}}/></div><div style={{color:"#fff",fontSize:13,fontWeight:700}}>Ridgeway Assistant</div></div><div style={{flex:1,overflowY:"auto",padding:14,display:"flex",flexDirection:"column",gap:6,minHeight:260,maxHeight:300}}>{msgs.map((m,i)=>(<div key={i} style={{maxWidth:"85%",padding:"8px 12px",borderRadius:10,fontSize:12,lineHeight:1.5,alignSelf:m.f==="u"?"flex-end":"flex-start",background:m.f==="u"?"#C4A265":"#f0f0f0",color:m.f==="u"?"#fff":"#333"}}>{m.t}</div>))}<div ref={chatEnd}/></div><div style={{padding:"8px 14px",borderTop:"1px solid #eee",display:"flex",gap:6}}><input value={chatIn} onChange={e=>setChatIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send(chatIn)} placeholder="Type a message..." style={{flex:1,border:"1px solid #e0e0e0",borderRadius:100,padding:"8px 14px",fontSize:12,fontFamily:"inherit",outline:"none"}}/><button onClick={()=>send(chatIn)} style={{width:32,height:32,borderRadius:"50%",background:"#C4A265",border:"none",cursor:"pointer",color:"#fff",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"}}>→</button></div></div>)}
</div>);}
