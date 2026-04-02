import React, { useState, useEffect, useRef } from "react";
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
const BUILDERS=[{id:"barratt",name:"Barratt Homes",color:"#E31937",logo:"https://www.barratthomes.co.uk/favicon.ico",relationship:"Our partnership with Barratt Homes stretches back over a decade. They trust M&W to deliver consistently across multiple sites.",sites:[{name:"Thoresby Vale",location:"Edwinstowe, Mansfield",lat:53.177,lng:-1.069,housetypes:["Windermere","Holden","Moresby","Kennett","Radleigh"]},{name:"Romans' Quarter",location:"Bingham, Nottingham",lat:52.949,lng:-1.0,housetypes:["Hollinwood","Bradgate","Moresby","Alderney"]},{name:"Dunstall Park",location:"Tamworth, Staffordshire",lat:52.634,lng:-1.693,housetypes:["Windermere","Archford","Holden","Kennett"]},{name:"Poppy Fields",location:"Uttoxeter, Staffordshire",lat:52.898,lng:-1.86,housetypes:["Maidstone","Ellerton","Denford"]},{name:"Bertelin Fields",location:"Beaconside, Stafford",lat:52.826,lng:-2.117,housetypes:["Windermere","Archford","Kennett","Moresby"]}]},{id:"dwh",name:"Lovell Homes",color:"#1B3D6F",logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_en-0IYbjSLWr1dCt62dPp1evg0udhiAZXg&s",relationship:"Our carpenters understand the higher specification that Lovell developments demand.",sites:[{name:"Old Mill Farm",location:"Cotgrave, Nottingham",lat:52.917,lng:-1.046,housetypes:["Holden","Kingsley","Layton","Windermere"]},{name:"Berry Hill",location:"Mansfield",lat:53.148,lng:-1.188,housetypes:["Hollinwood","Bradgate","Exeter"]},{name:"Gateford Park",location:"Worksop, Nottinghamshire",lat:53.321,lng:-1.132,housetypes:["Radleigh","Holden","Moresby"]}]},{id:"bellway",name:"Bellway Homes",color:"#003DA5",logo:"https://s3-eu-west-1.amazonaws.com/tpd/logos/58932caa0000ff00059bf27f/0x0.png",relationship:"Bellway is one of our longest-standing partners across their East Midlands division.",sites:[{name:"The Meadows",location:"Alvaston, Derby",lat:52.893,lng:-1.434,housetypes:["Joiner","Craftsman","Turner","Tanner","Weaver"]},{name:"Holbrook Park",location:"Chellaston, Derby",lat:52.873,lng:-1.437,housetypes:["Craftsman","Joiner","Turner","Weaver","Cooper"]},{name:"Coppice Heights",location:"Ripley, Derbyshire",lat:53.051,lng:-1.405,housetypes:["Joiner","Turner","Tanner","Fletcher"]},{name:"Springwood",location:"Midway, S. Derbyshire",lat:52.773,lng:-1.542,housetypes:["Joiner","Craftsman","Turner","Weaver"]},{name:"Hugglescote Grange",location:"Hugglescote, Leicestershire",lat:52.727,lng:-1.362,housetypes:["Craftsman","Turner","Cooper","Fletcher"]},{name:"Abbey Fields Grange",location:"Hucknall, Nottinghamshire",lat:53.033,lng:-1.195,housetypes:["Tanner","Weaver","Turner","Joiner"]},{name:"Ashlands",location:"Sutton in Ashfield, Notts",lat:53.128,lng:-1.255,housetypes:["Joiner","Craftsman","Turner"]},{name:"Torvill Park",location:"Fairham, Nottingham",lat:52.909,lng:-1.163,housetypes:["Craftsman","Turner","Tanner","Weaver"]}]},{id:"persimmon",name:"Persimmon Homes",color:"#D4002A",logo:"https://cdn.prod.website-files.com/65a518d6a768fc381c83acf8/65a518d6a768fc381c83b06d_2020_Persimmon_1.png",relationship:"A fast-paced partnership built on trust across Derbyshire, Nottinghamshire, and Leicestershire.",sites:[{name:"Clipstone Park",location:"Clipstone, Mansfield",lat:53.167,lng:-1.137,housetypes:["Bedale","Alnwick","Byford","Bolsover","Kielder"]},{name:"The Oaks",location:"Calverton, Notts",lat:53.033,lng:-1.093,housetypes:["Bedale","Alnwick","Bolsover","Kielder"]},{name:"Boulton Moor",location:"Chellaston, Derby",lat:52.872,lng:-1.413,housetypes:["Bedale","Alnwick","Bolsover","Kielder","Roseberry"]},{name:"Jubilee Gardens",location:"Ilkeston, Derbyshire",lat:52.972,lng:-1.307,housetypes:["Bedale","Byford","Alnwick","Bolsover"]},{name:"Foxley Fields",location:"Market Harborough, Leics",lat:52.478,lng:-0.918,housetypes:["Kielder","Roseberry","Alnwick","Bolsover"]}]},{id:"stmodwen",name:"St. Modwen Homes",color:"#6B2D5B",logo:"https://ramsboards.com/wp-content/uploads/2021/01/st.modwen-homes.webp",relationship:"With their head office in Derby, St. Modwen are a natural partner for M&W.",sites:[{name:"Hilton Valley",location:"Hilton, Derbyshire",lat:52.862,lng:-1.596,housetypes:["Arden","Berwick","Carleton","Danbury"]},{name:"Bramshall Meadows",location:"Uttoxeter, Staffordshire",lat:52.907,lng:-1.847,housetypes:["Arden","Berwick","Carleton","Elmswell"]},{name:"Snibston Mill",location:"Coalville, Leicestershire",lat:52.725,lng:-1.37,housetypes:["Arden","Carleton","Danbury","Elmswell"]},{name:"Egstow Park",location:"Clay Cross, Derbyshire",lat:53.163,lng:-1.413,housetypes:["Berwick","Carleton","Danbury"]}]},{id:"countryside",name:"Countryside Homes",color:"#2B6E44",logo:"https://nla-production-media.s3.eu-west-2.amazonaws.com/84908/Untitled-design-15.png?v=1766430558",relationship:"M&W support their Midlands mixed-tenure developments.",sites:[{name:"Edwalton Fields",location:"Edwalton, Nottingham",lat:52.917,lng:-1.12,housetypes:["Thornbury","Wentworth","Henley","Sudbury"]},{name:"Mastin Moor",location:"Chesterfield, Derbyshire",lat:53.267,lng:-1.342,housetypes:["Thornbury","Henley","Sudbury"]}]},{id:"vistry",name:"Vistry / Bovis Homes",color:"#00594F",logo:"https://housingforum.org.uk/wp-content/uploads/2020/05/Untitled-design.png",relationship:"Our work on Broadnook Garden Village is a testament to their trust in M&W.",sites:[{name:"Broadnook Garden Village",location:"Rothley, Leicestershire",lat:52.719,lng:-1.138,housetypes:["Limewood","Fern","Lime","Oak","Willow"]},{name:"Partridge Walk",location:"Stafford",lat:52.808,lng:-2.101,housetypes:["Limewood","Oak","Willow","Cedar"]},{name:"Hinckley 475",location:"Hinckley, Leicestershire",lat:52.54,lng:-1.37,housetypes:["Limewood","Fern","Oak","Willow"]}]},{id:"ashberry",name:"Ashberry Homes",color:"#7B3F98",logo:"https://www.ashberryhomes.co.uk/img/default-social-image.jpg",relationship:"M&W deliver consistently across Ashberry's Nottinghamshire sites.",sites:[{name:"Potters Gate",location:"Farndon, Newark",lat:53.064,lng:-0.856,housetypes:["Greenwood","Oakwood","Birchwood"]},{name:"Longridge",location:"Long Eaton, Notts",lat:52.89,lng:-1.275,housetypes:["Greenwood","Oakwood","Elmwood","Birchwood"]}]},{id:"davidsons",name:"Davidsons Homes",color:"#C8102E",logo:"https://davidsonsgroup.co.uk/wp-content/uploads/2023/01/Screenshot-2023-01-03-at-16.53.01-1024x522.png",relationship:"Davidsons are a well-respected Midlands developer. We're proud to be part of their supply chain.",sites:[{name:"Davidsons at Huncote",location:"Huncote, Leicestershire",lat:52.582,lng:-1.218,housetypes:["The Arden","The Warwick","The Ashby","The Leamington"]},{name:"Davidsons at Boulton Moor",location:"Derby",lat:52.878,lng:-1.418,housetypes:["The Arden","The Warwick","The Kenilworth"]}]},{id:"wheeldons",name:"Wheeldon Homes",color:"#2E4057",logo:"https://www.panddg.co.uk/wp-content/uploads/2022/02/logo-wheeldon-homes.svg",relationship:"A boutique developer that values the personal service M&W bring.",sites:[{name:"Oaklands",location:"Etwall, South Derbyshire",lat:52.871,lng:-1.599,housetypes:["The Chatsworth","The Haddon","The Calke"]},{name:"The Green",location:"Church Broughton, Derby",lat:52.857,lng:-1.66,housetypes:["The Chatsworth","The Haddon"]}]},{id:"crest",name:"Crest Nicholson",color:"#003C71",logo:"https://www.crestnicholson.com/favicon.ico",relationship:"M&W meet Crest Nicholson's exacting standards on every element.",sites:[{name:"Barley Fields",location:"Queniborough, Leicestershire",lat:52.697,lng:-1.08,housetypes:["Elm","Beech","Maple","Rowan","Birch"]}]}];
const PAST_PROJECTS=[{year:"2024-25",builder:"Bellway",site:"Holbrook Park Ph1",location:"Chellaston",units:167,scope:"Full package"},{year:"2023-25",builder:"Persimmon",site:"Boulton Moor",location:"Chellaston",units:245,scope:"Full package"},{year:"2023-24",builder:"Barratt",site:"Thoresby Vale Ph2",location:"Mansfield",units:180,scope:"Full package"},{year:"2022-24",builder:"St. Modwen",site:"Hilton Valley Ph3",location:"Hilton",units:120,scope:"1st & 2nd fix"},{year:"2021-23",builder:"Persimmon",site:"Jubilee Gardens",location:"Ilkeston",units:200,scope:"Full package"},{year:"2020-22",builder:"Barratt",site:"Dunstall Park",location:"Tamworth",units:280,scope:"Full package"},{year:"2019-21",builder:"Bellway",site:"The Meadows Ph1",location:"Alvaston",units:78,scope:"Full package"},{year:"2018-20",builder:"Persimmon",site:"Clipstone Park",location:"Mansfield",units:190,scope:"Full package"},{year:"2017-19",builder:"Bellway",site:"Coppice Heights",location:"Ripley",units:130,scope:"Full package"},{year:"2016-18",builder:"Persimmon",site:"Carlton View",location:"Gedling",units:170,scope:"Full package"},{year:"2015-17",builder:"Bellway",site:"Hugglescote Grange",location:"Leicestershire",units:140,scope:"Full package"},{year:"2014-16",builder:"Barratt",site:"Grange Park",location:"Loughborough",units:220,scope:"Full package"},{year:"2012-14",builder:"Bellway",site:"Stenson Fields",location:"Derby",units:250,scope:"Full package"},{year:"2010-12",builder:"Persimmon",site:"Wollaton Vale",location:"Nottingham",units:200,scope:"Full package"},{year:"2008-10",builder:"Barratt",site:"Chestnut Grove",location:"Long Eaton",units:140,scope:"Full package"},{year:"2005-07",builder:"Bellway",site:"Millbrook Park",location:"Stapleford",units:85,scope:"Full package"}];
const SERVICES=[{id:"joists",title:"Joists & Structural Floors",icon:"┃",desc:"All structural timber floor systems to NHBC standards.",subs:[{n:"Joist Types",items:["Masonry Hanger Joists","Joist Hanger to Trimmer","Change of Direction","I-Beam / Engineered","Traditional Softwood"]},{n:"Floor Construction",items:["Semi-Detached Party Floor","Strutting & Noggins","Structural Decking","Fire Stopping"]}]},{id:"roofs",title:"Roof Construction",icon:"△",desc:"Full roof erection through to weathertight.",subs:[{n:"Roof Types",items:["Straight Up & Over","Gable Elevations","Hipped Roofs","Valley Roofs","Dormer Construction"]},{n:"Roof Details",items:["Open Eaves","Boxed Soffit","Gable Ladders","Box Ends","Fascia & Barge Boards","Roof Bracing"]}]},{id:"first-fix",title:"First Fix Carpentry",icon:"▣",desc:"All carpentry before plastering.",subs:[{n:"Traditional (Blockwork)",items:["Staircase Installation","Stud Partitions","Bulkheads","Door Linings","Window Boards","Pipe Boxing","Loft Hatches","Solar Panel Stands"]},{n:"Timber Frame",items:["Frame Erection","Squaring & Levelling","Panel Stitching","Party Walls","Floor Cassettes","Breather Membrane","Fire Stopping & Cavity Barriers"]}]},{id:"second-fix",title:"Second Fix Carpentry",icon:"▤",desc:"All finishing carpentry after plastering.",subs:[{n:"Traditional Doors",items:["Door Trimming & Fitting","Hinging","Latch & Lock Fitting","Fire Door Hanging"]},{n:"Prehung Casings",items:["Prehung Installation","Levelling & Packing","Fire-Rated Sets"]},{n:"Standard Spec",items:["Standard Skirting (68/94mm)","Standard Architrave","Standard Staircase"]},{n:"Premium Spec",items:["Premium Skirting (119-168mm)","Premium Architrave + Plinth Blocks","Oak Staircase","Engineered Hardwood Flooring","Panelling & Wainscoting"]}]},{id:"finals",title:"Final Fix",icon:"◆",desc:"All final items to handover standard.",subs:[{n:"Included",items:["Door Handles & Furnishings","Ironmongery - Locks, Latches & Keeps","Bath Panel","Front Door Accessories"]}]},{id:"extras",title:"Unique Works",icon:"\u25C7",desc:"Remedial & snagging work for other contractors.",subs:[{n:"Remedial Services",items:["Rectifying defective carpentry by other contractors","Door realignment & rehinging","Skirting & architrave replacement","Staircase remedials","Floor levelling & joist repairs"]},{n:"Snagging Support",items:["NHBC inspection preparation for other sites","Pre-completion snagging lists","Warranty defect repairs","Fire door compliance remedials","Builder handover support"]}]}];
const DEMO_CARPS=[{id:"C001",name:"Dave Mitchell",pin:"1234",site:"Holbrook Park",builder:"Bellway",schedule:[{day:"Mon",plot:"34",type:"Craftsman",stage:"First Fix",status:"active"},{day:"Tue",plot:"34",type:"Craftsman",stage:"First Fix",status:"upcoming"},{day:"Wed",plot:"35",type:"Joiner",stage:"First Fix",status:"upcoming"},{day:"Thu",plot:"35",type:"Joiner",stage:"First Fix",status:"upcoming"},{day:"Fri",plot:"36",type:"Turner",stage:"First Fix",status:"upcoming"}]},{id:"C002",name:"Ryan Cooper",pin:"5678",site:"Coppice Heights",builder:"Bellway",schedule:[{day:"Mon",plot:"18",type:"Joiner",stage:"Roofs",status:"active"},{day:"Tue",plot:"18",type:"Joiner",stage:"Roofs",status:"upcoming"},{day:"Wed",plot:"19",type:"Turner",stage:"Roofs",status:"upcoming"},{day:"Thu",plot:"19",type:"Turner",stage:"Roofs",status:"upcoming"},{day:"Fri",plot:"20",type:"Tanner",stage:"Roofs",status:"upcoming"}]}];
const HOLBROOK_PLOTS=Array.from({length:40},(_,i)=>{const n=i+1;const stages=["Not Started","Joists","Joists Complete","Roofs","Roofs Complete","First Fix","First Fix Complete","Second Fix","Second Fix Complete","Finals","Complete"];const si=n<=8?10:n<=14?8:n<=20?6:n<=28?4:n<=34?2:0;return{plot:n,stage:stages[si],carpenter:n<=8?"Various":n<=14?"Sam Bennett":n<=20?"Tom Harris":n<=28?"Dave Mitchell":n<=34?"Ryan Cooper":"Unallocated",houseType:["Craftsman","Joiner","Turner","Tanner","Weaver"][i%5]};});
const ALL_CARPS=[{id:"C001",name:"Dave Mitchell",pin:"1234",site:"Holbrook Park",builder:"Bellway",status:"active"},{id:"C002",name:"Ryan Cooper",pin:"5678",site:"Coppice Heights",builder:"Bellway",status:"active"},{id:"C003",name:"Jake Williams",pin:"2345",site:"Thoresby Vale",builder:"Barratt",status:"active"},{id:"C004",name:"Tom Harris",pin:"3456",site:"Holbrook Park",builder:"Bellway",status:"active"},{id:"C005",name:"Sam Bennett",pin:"4567",site:"Holbrook Park",builder:"Bellway",status:"active"},{id:"C006",name:"Chris Taylor",pin:"5679",site:"The Meadows",builder:"Bellway",status:"active"},{id:"C007",name:"Dan Evans",pin:"6780",site:"Hilton Valley",builder:"St. Modwen",status:"leave"},{id:"C008",name:"Mark Johnson",pin:"7891",site:"Edwalton Fields",builder:"Countryside",status:"active"},{id:"C009",name:"Luke Brown",pin:"8902",site:"Broadnook",builder:"Vistry",status:"active"},{id:"C010",name:"James Wilson",pin:"9013",site:"Clipstone Park",builder:"Persimmon",status:"active"}];
const ALL_PRICE_LISTS=[{builder:"Barratt Homes",color:"#E31937",sites:[{site:"Thoresby Vale",rates:[["Joists — GF","£440"],["Joists — FF","£400"],["Roof (trussed)","£720"],["First Fix","£1,200"],["Second Fix","£1,350"],["Finals","£240"]]},{site:"Dunstall Park",rates:[["Joists — GF","£460"],["Joists — FF","£420"],["Roof (trussed)","£750"],["First Fix","£1,250"],["Second Fix","£1,400"],["Finals","£250"]]}]},{builder:"Lovell Homes",color:"#1B3D6F",sites:[{site:"Old Mill Farm",rates:[["Joists — GF","£480"],["Joists — FF","£440"],["Roof (trussed)","£780"],["First Fix","£1,300"],["Second Fix","£1,450"],["Finals","£260"]]},{site:"Berry Hill",rates:[["Joists — GF","£470"],["Joists — FF","£430"],["Roof (trussed)","£760"],["First Fix","£1,280"],["Second Fix","£1,420"],["Finals","£255"]]}]},{builder:"Bellway Homes",color:"#003DA5",sites:[{site:"Holbrook Park",rates:[["Joists — GF","£450"],["Joists — FF","£410"],["Roof (trussed)","£730"],["First Fix","£1,220"],["Second Fix","£1,380"],["Finals","£245"]]},{site:"Coppice Heights",rates:[["Joists — GF","£445"],["Joists — FF","£405"],["Roof (cut)","£1,050"],["First Fix","£1,210"],["Second Fix","£1,360"],["Finals","£240"]]},{site:"The Meadows",rates:[["Joists — GF","£455"],["Joists — FF","£415"],["Roof (trussed)","£740"],["First Fix","£1,230"],["Second Fix","£1,390"],["Finals","£248"]]}]},{builder:"Persimmon Homes",color:"#D4002A",sites:[{site:"Clipstone Park",rates:[["Joists — GF","£420"],["Joists — FF","£380"],["Roof (trussed)","£700"],["First Fix","£1,150"],["Second Fix","£1,300"],["Finals","£230"]]},{site:"Boulton Moor",rates:[["Joists — GF","£430"],["Joists — FF","£390"],["Roof (trussed)","£710"],["First Fix","£1,180"],["Second Fix","£1,320"],["Finals","£235"]]}]},{builder:"St. Modwen Homes",color:"#6B2D5B",sites:[{site:"Hilton Valley",rates:[["Joists — GF","£460"],["Joists — FF","£420"],["Roof (trussed)","£740"],["First Fix","£1,240"],["Second Fix","£1,380"],["Finals","£250"]]}]},{builder:"Countryside Homes",color:"#2B6E44",sites:[{site:"Edwalton Fields",rates:[["Joists — GF","£470"],["Joists — FF","£430"],["Roof (trussed)","£760"],["First Fix","£1,280"],["Second Fix","£1,420"],["Finals","£258"]]}]},{builder:"Vistry / Bovis",color:"#00594F",sites:[{site:"Broadnook Garden Village",rates:[["Joists — GF","£480"],["Joists — FF","£440"],["Roof (trussed)","£770"],["First Fix","£1,300"],["Second Fix","£1,450"],["Finals","£265"]]}]},{builder:"Ashberry Homes",color:"#7B3F98",sites:[{site:"Potters Gate",rates:[["Joists — GF","£440"],["Joists — FF","£400"],["Roof (trussed)","£720"],["First Fix","£1,200"],["Second Fix","£1,350"],["Finals","£240"]]}]},{builder:"Davidsons Homes",color:"#C8102E",sites:[{site:"Davidsons at Huncote",rates:[["Joists — GF","£420"],["Joists — FF","£380"],["Roof (trussed)","£680"],["First Fix","£1,150"],["Second Fix","£1,280"],["Finals","£220"]]}]},{builder:"Wheeldon Homes",color:"#2E4057",sites:[{site:"Oaklands, Etwall",rates:[["Joists — GF","£490"],["Joists — FF","£450"],["Roof (cut)","£1,100"],["First Fix","£1,350"],["Second Fix","£1,520"],["Finals","£280"]]}]},{builder:"Crest Nicholson",color:"#003C71",sites:[{site:"Barley Fields",rates:[["Joists — GF","£475"],["Joists — FF","£435"],["Roof (trussed)","£770"],["First Fix","£1,300"],["Second Fix","£1,460"],["Finals","£265"]]}]}];
const DEMO_DOCS_BY_SITE={"Holbrook Park":[{cat:"Floorplans",docs:["Craftsman — Ground Floor","Craftsman — First Floor","Joiner — Ground Floor","Joiner — First Floor","Turner — Ground Floor","Turner — First Floor"]},{cat:"Technical Drawings",docs:["Craftsman — Roof Plan","Joiner — Roof Plan","Turner — Roof Plan"]},{cat:"Site Documents",docs:["Holbrook Park — Site Layout","Holbrook Park — H&S Pack","Bellway Specification Book"]}],"Coppice Heights":[{cat:"Floorplans",docs:["Joiner — Ground Floor","Joiner — First Floor","Turner — Ground Floor","Turner — First Floor"]},{cat:"Site Documents",docs:["Coppice Heights — Site Layout","Coppice Heights — H&S Pack"]}]};

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
  { id: 3, site: "Coppice Heights", builder: "Bellway", plot: "18", houseType: "Turner", stage: "Roof", expectedDays: 2, priority: "high", notes: "Trusses delivered", status: "allocated", allocatedTo: "Ryan Cooper" },
  { id: 4, site: "Coppice Heights", builder: "Bellway", plot: "19", houseType: "Joiner", stage: "Roof", expectedDays: 2, priority: "medium", notes: "", status: "allocated", allocatedTo: "Ryan Cooper" },
  { id: 5, site: "Thoresby Vale", builder: "Barratt", plot: "42", houseType: "Windermere", stage: "Joists", expectedDays: 2, priority: "high", notes: "", status: "allocated", allocatedTo: "Jake Williams" },
  { id: 6, site: "Holbrook Park", builder: "Bellway", plot: "29", houseType: "Weaver", stage: "Second Fix", expectedDays: 4, priority: "medium", notes: "", status: "allocated", allocatedTo: "Tom Harris" },
  { id: 7, site: "Holbrook Park", builder: "Bellway", plot: "12", houseType: "Cooper", stage: "Final", expectedDays: 1, priority: "low", notes: "Snagging only", status: "complete", allocatedTo: "Sam Bennett" },
  { id: 8, site: "Swinfen Vale", builder: "Bellway", plot: "5", houseType: "Craftsman", stage: "Joists", expectedDays: 2, priority: "high", notes: "Michael called — ready Monday", status: "logged" },
  { id: 9, site: "Swinfen Vale", builder: "Bellway", plot: "6", houseType: "Joiner", stage: "Joists", expectedDays: 2, priority: "medium", notes: "", status: "logged" },
  { id: 10, site: "Oadby Grange", builder: "Bellway", plot: "3", houseType: "Weaver", stage: "First Fix", expectedDays: 3, priority: "high", notes: "Richard needs ASAP", status: "logged" },
  { id: 11, site: "Oadby Grange", builder: "Bellway", plot: "4", houseType: "Cooper", stage: "First Fix", expectedDays: 3, priority: "medium", notes: "", status: "logged" },
  { id: 12, site: "Hilton Valley", builder: "St. Modwen", plot: "22", houseType: "Arden", stage: "Roof", expectedDays: 2, priority: "medium", notes: "", status: "logged" },
  { id: 13, site: "Edwalton Fields", builder: "Countryside", plot: "8", houseType: "Thornbury", stage: "Second Fix", expectedDays: 4, priority: "low", notes: "", status: "logged" },
  { id: 14, site: "Broadnook Garden Village", builder: "Vistry", plot: "15", houseType: "Limewood", stage: "First Fix", expectedDays: 3, priority: "medium", notes: "", status: "logged" },
  { id: 15, site: "Clipstone Park", builder: "Persimmon", plot: "67", houseType: "Bedale", stage: "Roof", expectedDays: 2, priority: "high", notes: "", status: "logged" }
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
  { id: 3, carpenter: "Ryan Cooper", site: "Coppice Heights", plot: "18", houseType: "Turner", stage: "Roof", startDate: "2026-03-25", endDate: "2026-03-27" },
  { id: 4, carpenter: "Ryan Cooper", site: "Coppice Heights", plot: "19", houseType: "Joiner", stage: "Roof", startDate: "2026-03-27", endDate: "2026-03-29" },
  { id: 5, carpenter: "Jake Williams", site: "Thoresby Vale", plot: "42", houseType: "Windermere", stage: "Joists", startDate: "2026-03-30", endDate: "2026-04-01" },
  { id: 6, carpenter: "Tom Harris", site: "Holbrook Park", plot: "29", houseType: "Weaver", stage: "Second Fix", startDate: "2026-03-26", endDate: "2026-03-30" },
  { id: 7, carpenter: "Sam Bennett", site: "Holbrook Park", plot: "12", houseType: "Cooper", stage: "Final", startDate: "2026-03-31", endDate: "2026-03-31" },
  { id: 8, carpenter: "Tom Harris", site: "Holbrook Park", plot: "38", houseType: "Craftsman", stage: "Roof", startDate: "2026-04-02", endDate: "2026-04-04" }
];

const INVOICES = [
  { id: 1, carpenter: "Dave Mitchell", site: "Holbrook Park", plot: "12", houseType: "Joiner", stage: "Final", amount: 600, status: "pending", date: "2026-03-20" },
  { id: 2, carpenter: "Ryan Cooper", site: "Coppice Heights", plot: "14", houseType: "Turner", stage: "First Fix", amount: 950, status: "pending", date: "2026-03-22" },
  { id: 3, carpenter: "Jake Williams", site: "Thoresby Vale", plot: "40", houseType: "Windermere", stage: "Joists GF", amount: 860, status: "approved", date: "2026-03-15" },
  { id: 4, carpenter: "Tom Harris", site: "Holbrook Park", plot: "28", houseType: "Weaver", stage: "Second Fix", amount: 800, status: "approved", date: "2026-03-18" },
  { id: 5, carpenter: "Sam Bennett", site: "Holbrook Park", plot: "10", houseType: "Craftsman", stage: "Final", amount: 600, status: "paid", date: "2026-03-10" },
  { id: 6, carpenter: "Chris Taylor", site: "The Meadows", plot: "5", houseType: "Turner", stage: "Roof", amount: 1210, status: "paid", date: "2026-03-05" }
];

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
  // Website/old portal states from App7
  const[sec,setSec]=useState("home");const[sB,setSB]=useState(null);const[sS,setSS]=useState(null);const[sH,setSH]=useState(null);const[sSv,setSSv]=useState(null);const[chatOn,setChatOn]=useState(false);const[msgs,setMsgs]=useState([{f:"b",t:"Hello! Welcome to Miller & Watson Carpentry. I\u2019m here to help with any enquiries. Could I start with your name please?"}]);const[chatIn,setChatIn]=useState("");const[formDone,setFormDone]=useState(false);const[portal,setPortal]=useState(null);const[pUser,setPUser]=useState(null);const[pin,setPin]=useState("");const[pTab,setPTab]=useState("schedule");const[matReqs,setMatReqs]=useState([{id:1,who:"Dave Mitchell",site:"Holbrook Park",items:"2x boxes 63mm nails",status:"pending",date:"21/03",payMethod:"deduct"},{id:2,who:"Ryan Cooper",site:"Coppice Heights",items:"5x sheets 18mm OSB",status:"approved",date:"20/03",payMethod:"cash"},{id:3,who:"Tom Harris",site:"Holbrook Park",items:"1x box 100mm nails, 3x tubes Gripfill",status:"pending",date:"22/03",payMethod:"deduct"}]);const[newMat,setNewMat]=useState("");const[schedAllocs,setSchedAllocs]=useState([{id:1,carp:"Dave Mitchell",site:"Holbrook Park",plot:"34",stage:"First Fix",date:"24/03",status:"active",rate:"\u00a31,220"},{id:2,carp:"Dave Mitchell",site:"Holbrook Park",plot:"35",stage:"First Fix",date:"25/03",status:"upcoming",rate:"\u00a31,220"},{id:3,carp:"Ryan Cooper",site:"Coppice Heights",plot:"18",stage:"Roofs",date:"24/03",status:"active",rate:"\u00a31,050"},{id:4,carp:"Ryan Cooper",site:"Coppice Heights",plot:"19",stage:"Roofs",date:"25/03",status:"upcoming",rate:"\u00a31,050"},{id:5,carp:"Jake Williams",site:"Thoresby Vale",plot:"42",stage:"Joists",date:"24/03",status:"active",rate:"\u00a3840"},{id:6,carp:"Tom Harris",site:"Holbrook Park",plot:"29",stage:"Second Fix",date:"24/03",status:"active",rate:"\u00a31,380"},{id:7,carp:"Sam Bennett",site:"Holbrook Park",plot:"12",stage:"Finals",date:"24/03",status:"complete",rate:"\u00a3245"}]);const[allocForm,setAllocForm]=useState({carp:"",site:"",plot:"",stage:"",date:""});const[plots,setPlots]=useState(HOLBROOK_PLOTS);const[selectedPlot,setSelectedPlot]=useState(null);const chatEnd=useRef(null);const mapEl=useRef(null);const[mapOk,setMapOk]=useState(false);const[mobileMenu,setMobileMenu]=useState(false);const[delayModal,setDelayModal]=useState(null);const[delayReason,setDelayReason]=useState("");const[delayDuration,setDelayDuration]=useState("");const[chatStep,setChatStep]=useState("init");const[chatUserData,setChatUserData]=useState({});
const logoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRthM15JuQV5GY0MLTZRPG7t2WY5ShbEsMg-g&s";
const doLogin=()=>{
if(pin==="4444"){setPortal("mgr");setPUser({name:"Admin \u2014 M&W",role:"admin"});setPTab("dashboard");setUser({role:'admin',name:'Admin'});setCurrentPage('app');setAdminTab('dashboard');return;}
if(pin==="9999"){setPortal("office");setPUser({name:"Office \u2014 M&W",role:"office"});setPTab("invoices");setUser({role:'invoice',name:'Office/Invoice'});setCurrentPage('app');setInvoiceTab('pending');return;}
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

  const handleDelay = (allocId) => {
    if(!delayReason.trim()) { alert('Please enter a reason for the delay'); return; }
    const alloc = allocations.find(a => a.id === allocId);
    if(!alloc) return;
    const delayEntry = {
      id: Date.now(),
      allocId: allocId,
      carpenter: alloc.carpenter,
      site: alloc.site,
      plot: alloc.plot,
      houseType: alloc.houseType,
      stage: alloc.stage,
      reason: delayReason,
      delayDays: delayDays,
      originalEnd: alloc.endDate,
      date: new Date().toLocaleDateString('en-GB'),
      status: 'active'
    };
    setDelays([...delays, delayEntry]);
    // Push this allocation's end date back
    const newEnd = new Date(alloc.endDate);
    newEnd.setDate(newEnd.getDate() + delayDays);
    // Also push all subsequent allocations for this carpenter back
    const sortedAllocs = [...allocations].sort((a,b) => new Date(a.startDate) - new Date(b.startDate));
    const updatedAllocs = allocations.map(a => {
      if(a.id === allocId) {
        return {...a, endDate: newEnd.toISOString().split('T')[0], delayed: true, delayDays: (a.delayDays||0) + delayDays};
      }
      // Push subsequent allocs for same carpenter
      if(a.carpenter === alloc.carpenter && new Date(a.startDate) > new Date(alloc.endDate)) {
        const ns = new Date(a.startDate); ns.setDate(ns.getDate() + delayDays);
        const ne = new Date(a.endDate); ne.setDate(ne.getDate() + delayDays);
        return {...a, startDate: ns.toISOString().split('T')[0], endDate: ne.toISOString().split('T')[0]};
      }
      return a;
    });
    setAllocations(updatedAllocs);
    setDelayingAllocId(null);
    setDelayReason('');
    setDelayDays(1);
    setSuccessMsg('Delay recorded - schedule updated'); setTimeout(()=>setSuccessMsg(''),2500);
  };

  const markAllocComplete = (allocId) => {
    setAllocations(allocations.map(a => a.id === allocId ? {...a, completed: true, completedDate: todayStr} : a));
    // Also update work log
    const alloc = allocations.find(a => a.id === allocId);
    if(alloc) {
      setWorkLog(workLog.map(w => (w.site === alloc.site && w.plot === alloc.plot && w.stage === alloc.stage) ? {...w, status: 'complete'} : w));
    }
    setSuccessMsg('Job marked as complete'); setTimeout(()=>setSuccessMsg(''),2500);
  };

  const handleFixingRequest = (item, qty, notes, allocInfo) => {
    const req = {
      id: Date.now(),
      carpenter: user?.name,
      site: allocInfo?.site || user?.site || '',
      plot: allocInfo?.plot || '',
      stage: allocInfo?.stage || '',
      item: item,
      qty: qty,
      notes: notes,
      date: new Date().toLocaleDateString('en-GB'),
      status: 'pending'
    };
    setAllFixingRequests([...allFixingRequests, req]);
    return req;
  };

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

          {user?.role === 'admin' && ['Dashboard','Work Log','Allocate','Schedule','Carpenters','Delays','Fixings','Price Lists','Documents'].map(tab => (
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
            </button>
          ))}

          {user?.role === 'site_manager' && ['Overview','Log Work','Documents'].map(tab => (
            <button key={tab} onClick={() => { setSiteManagerTab(tab.toLowerCase()); setSidebarOpen(false); }}
              style={{ display:'block', width:'100%', padding:'12px', margin:'8px 0',
                backgroundColor: siteManagerTab === tab.toLowerCase() ? GOLD : 'transparent',
                color: siteManagerTab === tab.toLowerCase() ? NAVY : CREAM,
                border:'none', borderRadius:'4px', cursor:'pointer', textAlign:'left',
                fontWeight: siteManagerTab === tab.toLowerCase() ? 'bold' : 'normal', fontSize:14 }}>
              {tab}
            </button>
          ))}

          {user?.role === 'carpenter' && ['Schedule','Documents','Price Lists','Fixings','Invoice'].map(tab => (
            <button key={tab} onClick={() => { setCarpenterTab(tab.toLowerCase()); setSidebarOpen(false); }}
              style={{ display:'block', width:'100%', padding:'12px', margin:'8px 0',
                backgroundColor: carpenterTab === tab.toLowerCase() ? GOLD : 'transparent',
                color: carpenterTab === tab.toLowerCase() ? NAVY : CREAM,
                border:'none', borderRadius:'4px', cursor:'pointer', textAlign:'left',
                fontWeight: carpenterTab === tab.toLowerCase() ? 'bold' : 'normal', fontSize:14 }}>
              {tab}
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
                  {label:'Allocated This Week', val: allocations.filter(a=>!a.completed).length},
                  {label:'Active Delays', val: delays.filter(d=>d.status==='active').length},
                  {label:'Pending Fixings', val: allFixingRequests.filter(r=>r.status==='pending').length},
                  {label:'Total Invoiced', val: 'GBP ' + invoices.filter(i => i.status === 'paid').reduce((s,i) => s + i.amount, 0)},
                  {label:'Pending Invoices', val: 'GBP ' + invoices.filter(i => i.status === 'pending').reduce((s,i) => s + i.amount, 0)}
                ].map((c,ci) => (
                  <div key={ci} style={{ backgroundColor: NAVY, color: CREAM, padding: '16px', borderRadius: '8px', borderLeft: '4px solid ' + (c.label.includes('Delay')?'#d32f2f':GOLD) }}>
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
                    setFormData({site:'',plot:'',houseType:'',stage:'',expectedDays:1,priority:'medium',notes:''});
                    setSelectedSiteForLog('');
                    setSuccessMsg('Work logged successfully'); setTimeout(()=>setSuccessMsg(''),2500);
                  }
                }} style={{ backgroundColor:GOLD, color:NAVY, padding:'10px 20px', border:'none', borderRadius:'4px', cursor:'pointer', fontWeight:'bold', fontSize:14 }}>
                  Log Work
                </button>
              </div>
              <div style={{overflowX:'auto'}}>
              <table style={{ width:'100%', borderCollapse:'collapse', minWidth:'700px' }}>
                <thead><tr style={{ backgroundColor:NAVY, color:CREAM }}>
                  {['Site','Plot','Type','Stage','Days','Priority','Status','Allocated To'].map(h => (
                    <th key={h} style={{ padding:'10px', textAlign:'left', fontSize:'11px' }}>{h}</th>
                  ))}
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
              </table>
              </div>
            </div>
          )}

          {/* ========== ADMIN ALLOCATE ========== */}
          {user?.role === 'admin' && adminTab === 'allocate' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Allocate Work</h2>
              {workLog.filter(w => w.status === 'logged').length === 0 ? (
                <p style={{color:'#666', fontSize:14}}>No unallocated work items. Add work via the Work Log tab.</p>
              ) : (
              <div style={{overflowX:'auto'}}>
              <table style={{ width:'100%', borderCollapse:'collapse', minWidth:'600px' }}>
                <thead><tr style={{ backgroundColor:NAVY, color:CREAM }}>
                  {['Site','Plot','Type','Stage','Days','Action'].map(h => (
                    <th key={h} style={{ padding:'10px', textAlign:'left', fontSize:'11px' }}>{h}</th>
                  ))}
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
                              {CARPENTERS.filter(c => !c.status || c.status !== 'leave').map(c => (
                                <option key={c.id} value={c.name}>{c.name} - {c.site}</option>
                              ))}
                            </select>
                            <input type="date" value={allocateStartDate} onChange={(e) => setAllocateStartDate(e.target.value)}
                              style={{ padding:'5px', borderRadius:'3px', border:'1px solid '+GOLD, fontSize:'11px' }} />
                            <button onClick={() => {
                              if(allocateCarpenter && allocateStartDate){
                                const ed=new Date(allocateStartDate); ed.setDate(ed.getDate()+item.expectedDays-1);
                                setAllocations([...allocations, {id:Math.max(...allocations.map(a=>a.id),0)+1, carpenter:allocateCarpenter, site:item.site, plot:item.plot, houseType:item.houseType, stage:item.stage, startDate:allocateStartDate, endDate:ed.toISOString().split('T')[0], completed:false, delayed:false, delayDays:0}]);
                                setWorkLog(workLog.map(w => w.id===item.id ? {...w, status:'allocated', allocatedTo:allocateCarpenter} : w));
                                setAllocateId(null); setAllocateCarpenter(''); setAllocateStartDate('');
                                setSuccessMsg('Work allocated to '+allocateCarpenter); setTimeout(()=>setSuccessMsg(''),2500);
                              }
                            }} style={{ backgroundColor:GOLD, color:NAVY, padding:'5px 10px', border:'none', borderRadius:'3px', cursor:'pointer', fontSize:'11px', fontWeight:'bold' }}>
                              Confirm
                            </button>
                            <button onClick={() => {setAllocateId(null);setAllocateCarpenter('');setAllocateStartDate('');}}
                              style={{ backgroundColor:'#999', color:'white', padding:'5px 10px', border:'none', borderRadius:'3px', cursor:'pointer', fontSize:'11px' }}>
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => setAllocateId(item.id)}
                            style={{ backgroundColor:GOLD, color:NAVY, padding:'5px 10px', border:'none', borderRadius:'3px', cursor:'pointer', fontSize:'11px', fontWeight:'bold' }}>
                            Allocate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              )}
            </div>
          )}

          {/* ========== ADMIN SCHEDULE ========== */}
          {user?.role === 'admin' && adminTab === 'schedule' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Schedule</h2>
              <div style={{ marginBottom:'15px' }}>
                <button onClick={() => setScheduleView('gantt')}
                  style={{ backgroundColor: scheduleView==='gantt'?GOLD:'#ccc', color: scheduleView==='gantt'?NAVY:'black', padding:'8px 15px', margin:'0 5px 0 0', border:'none', borderRadius:'4px', cursor:'pointer', fontSize:13 }}>
                  Gantt View
                </button>
                <button onClick={() => setScheduleView('list')}
                  style={{ backgroundColor: scheduleView==='list'?GOLD:'#ccc', color: scheduleView==='list'?NAVY:'black', padding:'8px 15px', border:'none', borderRadius:'4px', cursor:'pointer', fontSize:13 }}>
                  List View
                </button>
              </div>
              {scheduleView === 'gantt' && (
                <div style={{ overflowX:'auto', backgroundColor:'white', padding:'15px', borderRadius:'8px' }}>
                  <div style={{ display:'flex' }}>
                    <div style={{ width:'130px', flexShrink:0 }}>
                      <div style={{ fontWeight:'bold', padding:'8px', borderBottom:'1px solid #ddd', minHeight:'36px', fontSize:12 }}>Carpenter</div>
                      {[...new Set(allocations.map(a => a.carpenter))].map(carp => (
                        <div key={carp} style={{ padding:'8px', borderBottom:'1px solid #ddd', minHeight:'36px', fontSize:'12px' }}>{carp}</div>
                      ))}
                    </div>
                    <div style={{ display:'flex', flex:1 }}>
                      {Array.from({length:21},(_,i) => {
                        const date = new Date(2026,2,24+i);
                        return (
                          <div key={i} style={{ minWidth:'45px', flexShrink:0, borderRight:'1px solid #eee' }}>
                            <div style={{ fontWeight:'bold', padding:'4px', borderBottom:'1px solid #ddd', fontSize:'10px', textAlign:'center' }}>
                              {formatDate(date).split(' ')[0]} {date.getDate()}
                            </div>
                            {[...new Set(allocations.map(a => a.carpenter))].map(carp => {
                              const af = allocations.find(a => a.carpenter===carp && new Date(a.startDate)<=date && new Date(a.endDate)>=date);
                              return (
                                <div key={carp} style={{ minHeight:'36px', padding:'2px', borderBottom:'1px solid #eee', fontSize:'9px',
                                  backgroundColor: af ? (af.completed ? '#c8e6c9' : af.delayed ? '#ffcdd2' : GOLD) : 'white',
                                  color: af ? NAVY : '#ccc', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:af?'bold':'normal' }}>
                                  {af ? (af.completed ? 'Done' : af.site.substring(0,4)) : ''}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div style={{marginTop:10,fontSize:11,display:'flex',gap:15}}>
                    <span><span style={{display:'inline-block',width:12,height:12,backgroundColor:GOLD,borderRadius:2,marginRight:4,verticalAlign:'middle'}}></span> Active</span>
                    <span><span style={{display:'inline-block',width:12,height:12,backgroundColor:'#c8e6c9',borderRadius:2,marginRight:4,verticalAlign:'middle'}}></span> Complete</span>
                    <span><span style={{display:'inline-block',width:12,height:12,backgroundColor:'#ffcdd2',borderRadius:2,marginRight:4,verticalAlign:'middle'}}></span> Delayed</span>
                  </div>
                </div>
              )}
              {scheduleView === 'list' && (
                <div style={{overflowX:'auto'}}>
                <table style={{ width:'100%', borderCollapse:'collapse', minWidth:'700px' }}>
                  <thead><tr style={{ backgroundColor:NAVY, color:CREAM }}>
                    {['Carpenter','Site','Plot','Type','Stage','Start','End','Status'].map(h => (
                      <th key={h} style={{ padding:'10px', textAlign:'left', fontSize:'11px' }}>{h}</th>
                    ))}
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
                          {alloc.completed ? <span style={{color:'#2e7d32',fontWeight:'bold'}}>Complete</span> :
                           alloc.delayed ? <span style={{color:'#d32f2f',fontWeight:'bold'}}>Delayed +{alloc.delayDays}d</span> :
                           <span style={{color:GOLD,fontWeight:'bold'}}>Active</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
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
                  {['ID','Name','PIN','Site','Builder','Status'].map(h => (
                    <th key={h} style={{ padding:'10px', textAlign:'left', fontSize:'11px' }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {CARPENTERS.map((carp,idx) => (
                    <tr key={carp.id} style={{ backgroundColor: idx%2===0?'#f9f9f9':'white', borderBottom:'1px solid #ddd' }}>
                      <td style={{ padding:'8px', fontSize:'12px' }}>{carp.id}</td>
                      <td style={{ padding:'8px', fontSize:'12px' }}>{carp.name}</td>
                      <td style={{ padding:'8px', fontSize:'12px', fontFamily:'monospace' }}>{carp.pin}</td>
                      <td style={{ padding:'8px', fontSize:'12px' }}>{carp.site}</td>
                      <td style={{ padding:'8px', fontSize:'12px' }}>{carp.builder}</td>
                      <td style={{ padding:'8px', fontSize:'12px' }}>{carp.status || 'Active'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          )}

          {/* ========== ADMIN DELAYS ========== */}
          {user?.role === 'admin' && adminTab === 'delays' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Delayed Works</h2>
              {delays.length === 0 ? (
                <div style={{backgroundColor:'white',padding:'20px',borderRadius:'8px',textAlign:'center'}}>
                  <p style={{color:'#666',fontSize:14,margin:0}}>No delays reported.</p>
                </div>
              ) : (
                <div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))',gap:12,marginBottom:20}}>
                    <div style={{backgroundColor:'#d32f2f',color:'white',padding:14,borderRadius:8}}>
                      <p style={{margin:0,fontSize:11,opacity:.8}}>Active Delays</p>
                      <h3 style={{margin:'4px 0 0',fontSize:22}}>{delays.filter(d=>d.status==='active').length}</h3>
                    </div>
                    <div style={{backgroundColor:NAVY,color:CREAM,padding:14,borderRadius:8}}>
                      <p style={{margin:0,fontSize:11,opacity:.8}}>Total Delay Days</p>
                      <h3 style={{margin:'4px 0 0',fontSize:22}}>{delays.reduce((s,d)=>s+d.delayDays,0)}</h3>
                    </div>
                    <div style={{backgroundColor:NAVY,color:CREAM,padding:14,borderRadius:8}}>
                      <p style={{margin:0,fontSize:11,opacity:.8}}>Resolved</p>
                      <h3 style={{margin:'4px 0 0',fontSize:22}}>{delays.filter(d=>d.status==='resolved').length}</h3>
                    </div>
                  </div>
                  {delays.sort((a,b)=>b.id-a.id).map(d => (
                    <div key={d.id} style={{backgroundColor:'white',border: d.status==='active'?'2px solid #d32f2f':'1px solid #ddd',borderLeft: d.status==='active'?'5px solid #d32f2f':'5px solid #999',borderRadius:8,padding:16,marginBottom:10}}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:8}}>
                        <div>
                          <strong style={{fontSize:15}}>{d.carpenter}</strong>
                          <div style={{fontSize:12,color:'#666',marginTop:2}}>{d.site} - Plot {d.plot} / {d.houseType} / {d.stage}</div>
                        </div>
                        <div style={{textAlign:'right'}}>
                          <span style={{display:'inline-block',padding:'3px 10px',borderRadius:4,fontSize:11,fontWeight:'bold',
                            backgroundColor: d.status==='active'?'#ffebee':'#e8f5e9', color: d.status==='active'?'#c62828':'#2e7d32'}}>
                            {d.status==='active'?'ACTIVE DELAY':'RESOLVED'}
                          </span>
                          <div style={{fontSize:12,marginTop:4,fontWeight:'bold',color:'#d32f2f'}}>+{d.delayDays} day{d.delayDays>1?'s':''}</div>
                        </div>
                      </div>
                      <div style={{marginTop:10,padding:10,backgroundColor:'#fafafa',borderRadius:4,fontSize:13}}>
                        <strong>Reason:</strong> {d.reason}
                      </div>
                      <div style={{marginTop:6,fontSize:11,color:'#999'}}>Reported: {d.date} | Original end: {d.originalEnd}</div>
                      {d.status === 'active' && (
                        <button onClick={() => setDelays(delays.map(dd => dd.id===d.id ? {...dd, status:'resolved'} : dd))}
                          style={{marginTop:8,backgroundColor:'#2e7d32',color:'white',padding:'5px 12px',border:'none',borderRadius:4,cursor:'pointer',fontSize:12,fontWeight:'bold'}}>
                          Mark Resolved
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========== ADMIN FIXINGS MANAGEMENT ========== */}
          {user?.role === 'admin' && adminTab === 'fixings' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Fixings and Materials Requests</h2>
              {allFixingRequests.length === 0 ? (
                <div style={{backgroundColor:'white',padding:'20px',borderRadius:'8px',textAlign:'center'}}>
                  <p style={{color:'#666',fontSize:14,margin:0}}>No fixing requests yet. Carpenters can submit requests from their portal.</p>
                </div>
              ) : (
                <div>
                  <div style={{display:'flex',gap:8,marginBottom:15,flexWrap:'wrap'}}>
                    {['all','pending','approved','denied'].map(f => (
                      <button key={f} onClick={() => setPlotFilter(f)}
                        style={{padding:'6px 14px',borderRadius:4,border:'none',cursor:'pointer',fontSize:12,fontWeight:'bold',
                          backgroundColor:plotFilter===f?GOLD:'#ddd', color:plotFilter===f?NAVY:'#333'}}>
                        {f.charAt(0).toUpperCase()+f.slice(1)} {f!=='all' && <span>({allFixingRequests.filter(r=>r.status===f).length})</span>}
                      </button>
                    ))}
                  </div>
                  {allFixingRequests.filter(r => plotFilter==='all' || !plotFilter || r.status===plotFilter).sort((a,b)=>b.id-a.id).map(req => (
                    <div key={req.id} style={{backgroundColor:'white',border:'1px solid #ddd',borderLeft: req.status==='pending'?'5px solid '+GOLD : req.status==='approved'?'5px solid #2e7d32':'5px solid #999', borderRadius:8,padding:14,marginBottom:10}}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:8}}>
                        <div>
                          <strong style={{fontSize:14}}>{req.carpenter}</strong>
                          <div style={{fontSize:12,color:'#666',marginTop:2}}>{req.site}{req.plot ? ' - Plot '+req.plot : ''} {req.stage ? '/ '+req.stage : ''}</div>
                          <div style={{marginTop:6,fontSize:14}}><strong>{req.item}</strong> x {req.qty}</div>
                          {req.notes && <div style={{fontSize:12,color:'#888',marginTop:4}}>Note: {req.notes}</div>}
                          <div style={{fontSize:11,color:'#aaa',marginTop:4}}>Requested: {req.date}</div>
                        </div>
                        <div style={{display:'flex',gap:6,alignItems:'center'}}>
                          {req.status === 'pending' && (
                            <>
                              <button onClick={() => {
                                setAllFixingRequests(allFixingRequests.map(r => r.id===req.id ? {...r, status:'approved'} : r));
                                setSuccessMsg('Fixing request approved'); setTimeout(()=>setSuccessMsg(''),2500);
                              }} style={{backgroundColor:'#2e7d32',color:'white',padding:'6px 14px',border:'none',borderRadius:4,cursor:'pointer',fontSize:12,fontWeight:'bold'}}>
                                Approve
                              </button>
                              <button onClick={() => {
                                setAllFixingRequests(allFixingRequests.map(r => r.id===req.id ? {...r, status:'denied'} : r));
                                setSuccessMsg('Fixing request denied'); setTimeout(()=>setSuccessMsg(''),2500);
                              }} style={{backgroundColor:'#d32f2f',color:'white',padding:'6px 14px',border:'none',borderRadius:4,cursor:'pointer',fontSize:12,fontWeight:'bold'}}>
                                Deny
                              </button>
                            </>
                          )}
                          {req.status !== 'pending' && (
                            <span style={{padding:'4px 12px',borderRadius:4,fontSize:11,fontWeight:'bold',
                              backgroundColor: req.status==='approved'?'#e8f5e9':'#ffebee',
                              color: req.status==='approved'?'#2e7d32':'#c62828'}}>
                              {req.status.toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========== ADMIN PRICE LISTS ========== */}
          {user?.role === 'admin' && adminTab === 'price lists' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Price Lists by Builder and Site</h2>
              {Object.entries(PRICE_LISTS).map(([builder, sites]) => (
                <div key={builder} style={{ marginBottom:'15px', backgroundColor:'white', padding:'15px', borderRadius:'8px', border:'1px solid #ddd' }}>
                  <h3 style={{ color:NAVY, margin:'0 0 10px 0', fontSize:16 }}>{builder}</h3>
                  {Object.entries(sites).map(([site, rates]) => (
                    <div key={site} style={{ marginLeft:'10px', marginBottom:'10px', padding:'10px', backgroundColor:'#f9f9f9', borderRadius:'4px' }}>
                      <h4 style={{ color:'#333', margin:'0 0 8px 0', fontSize:14 }}>{site}</h4>
                      <table style={{ width:'100%', fontSize:'12px' }}>
                        <tbody>
                          {Object.entries(rates).map(([stage, price]) => (
                            <tr key={stage} style={{ borderBottom:'1px solid #eee' }}>
                              <td style={{ padding:'4px' }}>{stage}</td>
                              <td style={{ padding:'4px', textAlign:'right', fontWeight:'bold' }}>GBP {price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
                  {Object.entries(categories).map(([category, docs]) => (
                    <div key={category} style={{ marginLeft:'10px', marginBottom:'10px', padding:'10px', backgroundColor:'#f9f9f9', borderRadius:'4px' }}>
                      <h4 style={{ color:'#333', margin:'0 0 8px 0', fontSize:14 }}>{category}</h4>
                      <div style={{ fontSize:'13px' }}>
                        {docs.map((doc, idx) => (
                          <div key={idx} style={{ marginBottom:'4px', padding:'6px 8px', backgroundColor:'white', borderRadius:'3px' }}>{doc}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* ========== SITE MANAGER OVERVIEW ========== */}
          {user?.role === 'site_manager' && siteManagerTab === 'overview' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Site Overview: {user?.site}</h2>
              <div style={{ marginBottom:'15px' }}>
                <input type="text" placeholder="Filter by plot number" value={plotFilter} onChange={(e) => setPlotFilter(e.target.value)}
                  style={{ padding:'8px', borderRadius:'4px', border:'2px solid '+GOLD, fontSize:'14px', width:'100%', maxWidth:'250px', boxSizing:'border-box' }} />
              </div>
              {workLog.filter(w => w.site === user?.site && (plotFilter === '' || w.plot.includes(plotFilter))).length === 0 ? (
                <p style={{color:'#666', fontSize:14}}>No work logged for this site yet. Use Log Work to add entries.</p>
              ) : (
              <div style={{overflowX:'auto'}}>
              <table style={{ width:'100%', borderCollapse:'collapse', minWidth:'400px' }}>
                <thead><tr style={{ backgroundColor:NAVY, color:CREAM }}>
                  {['Plot','House Type','Current Stage','Carpenter'].map(h => (
                    <th key={h} style={{ padding:'10px', textAlign:'left', fontSize:'11px' }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {workLog.filter(w => w.site === user?.site && (plotFilter === '' || w.plot.includes(plotFilter))).map((item,idx) => (
                    <tr key={item.id} style={{ backgroundColor: idx%2===0?'#f9f9f9':'white', borderBottom:'1px solid #ddd' }}>
                      <td style={{ padding:'8px', fontSize:'12px' }}>{item.plot}</td>
                      <td style={{ padding:'8px', fontSize:'12px' }}>{item.houseType}</td>
                      <td style={{ padding:'8px', fontSize:'12px' }}>{item.stage}</td>
                      <td style={{ padding:'8px', fontSize:'12px' }}>{item.allocatedTo || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              )}
            </div>
          )}

          {/* ========== SITE MANAGER LOG WORK ========== */}
          {user?.role === 'site_manager' && siteManagerTab === 'log work' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Log Work Request</h2>
              <div style={{ backgroundColor:NAVY, color:CREAM, padding:'20px', borderRadius:'8px', maxWidth:'500px' }}>
                <div style={{ marginBottom:'15px' }}>
                  <label style={{ display:'block', marginBottom:'4px', fontSize:'11px' }}>Plot Number</label>
                  <input type="text" placeholder="e.g. 34" value={smPlot} onChange={(e) => setSmPlot(e.target.value)}
                    style={{ width:'100%', padding:'8px', borderRadius:'4px', border:'1px solid '+GOLD, boxSizing:'border-box', fontSize:13 }} />
                </div>
                <div style={{ marginBottom:'15px' }}>
                  <label style={{ display:'block', marginBottom:'4px', fontSize:'11px' }}>House Type</label>
                  <select value={smHouseType} onChange={(e) => setSmHouseType(e.target.value)}
                    style={{ width:'100%', padding:'8px', borderRadius:'4px', border:'1px solid '+GOLD, fontSize:13 }}>
                    <option value="">Select</option>
                    {getSiteHousetypes(user?.site).map(ht => <option key={ht} value={ht}>{ht}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom:'15px' }}>
                  <label style={{ display:'block', marginBottom:'4px', fontSize:'11px' }}>Stage</label>
                  <select value={smStage} onChange={(e) => setSmStage(e.target.value)}
                    style={{ width:'100%', padding:'8px', borderRadius:'4px', border:'1px solid '+GOLD, fontSize:13 }}>
                    <option value="">Select</option>
                    {['Joists','Roof','First Fix','Drop Backs','Second Fix','Final','Snags'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom:'15px' }}>
                  <label style={{ display:'block', marginBottom:'4px', fontSize:'11px' }}>Notes</label>
                  <textarea placeholder="Any additional details..." value={smNotes} onChange={(e) => setSmNotes(e.target.value)}
                    style={{ width:'100%', padding:'8px', borderRadius:'4px', border:'1px solid '+GOLD, minHeight:'60px', boxSizing:'border-box', fontFamily:'inherit', fontSize:13 }} />
                </div>
                <button type="button" onClick={() => {
                  if(smPlot && smHouseType && smStage){
                    const builder=BUILDERS.find(b=>b.sites.some(s=>s.name===user?.site));
                    setWorkLog([...workLog, {id:Math.max(...workLog.map(w=>w.id),0)+1, site:user?.site, builder:builder?builder.name:'', plot:smPlot, houseType:smHouseType, stage:smStage, expectedDays:2, priority:'medium', notes:smNotes, status:'logged'}]);
                    setSmPlot(''); setSmHouseType(''); setSmStage(''); setSmNotes('');
                    setSuccessMsg('Work request submitted'); setTimeout(()=>setSuccessMsg(''),2500);
                  } else { alert('Please fill in plot, house type and stage'); }
                }} style={{ backgroundColor:GOLD, color:NAVY, padding:'10px 20px', border:'none', borderRadius:'4px', cursor:'pointer', fontWeight:'bold', fontSize:14 }}>
                  Submit Request
                </button>
              </div>
            </div>
          )}

          {/* ========== SITE MANAGER DOCUMENTS ========== */}
          {user?.role === 'site_manager' && siteManagerTab === 'documents' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Documents: {user?.site}</h2>
              {DOCUMENTS[user?.site] && Object.entries(DOCUMENTS[user?.site]).map(([category, docs]) => (
                <div key={category} style={{ marginBottom:'15px', backgroundColor:'white', padding:'15px', borderRadius:'8px', border:'1px solid #ddd' }}>
                  <h3 style={{ color:NAVY, margin:'0 0 10px 0', fontSize:15 }}>{category}</h3>
                  <div style={{ fontSize:'13px' }}>
                    {docs.map((doc, idx) => (
                      <div key={idx} style={{ marginBottom:'6px', padding:'8px', backgroundColor:'#f9f9f9', borderRadius:'4px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'8px' }}>
                        <span>{doc}</span>
                        <button onClick={() => { setSuccessMsg('Download started: '+doc); setTimeout(()=>setSuccessMsg(''),2500); }}
                          style={{ padding:'4px 10px', fontSize:'11px', backgroundColor:GOLD, color:NAVY, border:'none', borderRadius:'3px', cursor:'pointer', fontWeight:'bold' }}>
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ========== CARPENTER SCHEDULE (MOBILE-FIRST WITH DELAY) ========== */}
          {user?.role === 'carpenter' && carpenterTab === 'schedule' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Your Week</h2>
              {myAllocs.length === 0 ? (
                <div style={{ backgroundColor:'white', padding:'20px', borderRadius:'8px', textAlign:'center' }}>
                  <p style={{ color:'#666', fontSize:16, margin:0 }}>No work scheduled.</p>
                  <p style={{ color:'#999', fontSize:13, marginTop:8 }}>Check back later or contact your site manager.</p>
                </div>
              ) : (
                <div>
                  {myAllocs.sort((a,b)=>new Date(a.startDate)-new Date(b.startDate)).map(alloc => {
                    const start = new Date(alloc.startDate);
                    const end = new Date(alloc.endDate);
                    const isActive = todayDate >= start && todayDate <= end && !alloc.completed;
                    const isPast = todayDate > end || alloc.completed;
                    const isFuture = todayDate < start;
                    const totalDays = daysInRange(alloc.startDate, alloc.endDate);
                    const daysWorked = isActive ? Math.max(1, Math.ceil((todayDate - start)/(1000*60*60*24))+1) : isPast ? totalDays : 0;
                    const progress = isPast ? 100 : isActive ? Math.round((daysWorked/totalDays)*100) : 0;
                    return (
                      <div key={alloc.id} style={{
                        backgroundColor: '#fff',
                        border: isActive ? '2px solid '+GOLD : '1px solid #ddd',
                        borderRadius: '10px', padding: '16px', marginBottom: '12px',
                        borderLeft: isActive ? '6px solid '+GOLD : isPast ? '6px solid #4caf50' : '6px solid '+NAVY
                      }}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:6,marginBottom:10}}>
                          {isActive && <span style={{backgroundColor:GOLD, color:NAVY, padding:'3px 10px', borderRadius:4, fontSize:11, fontWeight:'bold'}}>IN PROGRESS</span>}
                          {isPast && <span style={{backgroundColor:'#4caf50', color:'white', padding:'3px 10px', borderRadius:4, fontSize:11, fontWeight:'bold'}}>COMPLETE</span>}
                          {isFuture && <span style={{backgroundColor:NAVY, color:CREAM, padding:'3px 10px', borderRadius:4, fontSize:11, fontWeight:'bold'}}>UPCOMING</span>}
                          {alloc.delayed && <span style={{backgroundColor:'#d32f2f', color:'white', padding:'3px 10px', borderRadius:4, fontSize:11, fontWeight:'bold'}}>DELAYED +{alloc.delayDays}d</span>}
                          <span style={{fontSize:12,color:'#888'}}>{totalDays} day{totalDays>1?'s':''}</span>
                        </div>
                        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', fontSize:14 }}>
                          <div><span style={{ color:'#888', fontSize:11, display:'block' }}>Site</span><strong>{alloc.site}</strong></div>
                          <div><span style={{ color:'#888', fontSize:11, display:'block' }}>Plot</span><strong>{alloc.plot}</strong></div>
                          <div><span style={{ color:'#888', fontSize:11, display:'block' }}>House Type</span><strong>{alloc.houseType}</strong></div>
                          <div><span style={{ color:'#888', fontSize:11, display:'block' }}>Stage</span><strong style={{ color:GOLD }}>{alloc.stage}</strong></div>
                          <div><span style={{ color:'#888', fontSize:11, display:'block' }}>Start</span><strong>{formatDate(alloc.startDate)}</strong></div>
                          <div><span style={{ color:'#888', fontSize:11, display:'block' }}>End</span><strong>{formatDate(alloc.endDate)}</strong></div>
                        </div>
                        {/* Progress bar */}
                        {(isActive || isPast) && (
                          <div style={{marginTop:12}}>
                            <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'#888',marginBottom:4}}>
                              <span>Day {daysWorked} of {totalDays}</span>
                              <span>{progress}%</span>
                            </div>
                            <div style={{backgroundColor:'#e0e0e0',borderRadius:4,height:6,overflow:'hidden'}}>
                              <div style={{backgroundColor: isPast?'#4caf50':GOLD, height:'100%', width:progress+'%', borderRadius:4, transition:'width 0.3s'}}></div>
                            </div>
                          </div>
                        )}
                        {/* Action buttons for active jobs */}
                        {isActive && !alloc.completed && (
                          <div style={{marginTop:14,display:'flex',gap:8,flexWrap:'wrap'}}>
                            <button onClick={() => markAllocComplete(alloc.id)}
                              style={{backgroundColor:'#4caf50',color:'white',padding:'8px 18px',border:'none',borderRadius:5,cursor:'pointer',fontWeight:'bold',fontSize:13,flex:1,minWidth:120}}>
                              Mark Complete
                            </button>
                            {delayingAllocId === alloc.id ? (
                              <div style={{width:'100%',marginTop:8,padding:12,backgroundColor:'#fff3e0',borderRadius:6,border:'1px solid #ffcc80'}}>
                                <p style={{margin:'0 0 8px',fontSize:13,fontWeight:'bold',color:'#e65100'}}>Report Delay</p>
                                <div style={{marginBottom:8}}>
                                  <label style={{display:'block',fontSize:11,marginBottom:3,color:'#666'}}>Reason for delay</label>
                                  <textarea value={delayReason} onChange={(e) => setDelayReason(e.target.value)}
                                    placeholder="e.g. Materials not delivered, weather, access issue..."
                                    style={{width:'100%',padding:8,borderRadius:4,border:'1px solid #ffcc80',fontSize:13,minHeight:50,boxSizing:'border-box',fontFamily:'inherit'}} />
                                </div>
                                <div style={{marginBottom:10}}>
                                  <label style={{display:'block',fontSize:11,marginBottom:3,color:'#666'}}>Additional days needed</label>
                                  <select value={delayDays} onChange={(e) => setDelayDays(parseInt(e.target.value))}
                                    style={{width:'100%',padding:8,borderRadius:4,border:'1px solid #ffcc80',fontSize:13}}>
                                    {[1,2,3,4,5,6,7].map(d => <option key={d} value={d}>{d} day{d>1?'s':''}</option>)}
                                  </select>
                                </div>
                                <div style={{display:'flex',gap:8}}>
                                  <button onClick={() => handleDelay(alloc.id)}
                                    style={{backgroundColor:'#e65100',color:'white',padding:'7px 16px',border:'none',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:12}}>
                                    Submit Delay
                                  </button>
                                  <button onClick={() => {setDelayingAllocId(null);setDelayReason('');setDelayDays(1);}}
                                    style={{backgroundColor:'#999',color:'white',padding:'7px 16px',border:'none',borderRadius:4,cursor:'pointer',fontSize:12}}>
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button onClick={() => setDelayingAllocId(alloc.id)}
                                style={{backgroundColor:'#e65100',color:'white',padding:'8px 18px',border:'none',borderRadius:5,cursor:'pointer',fontWeight:'bold',fontSize:13,flex:1,minWidth:120}}>
                                Report Delay
                              </button>
                            )}
                          </div>
                        )}
                        {isFuture && (
                          <div style={{marginTop:10,fontSize:12,color:'#888',fontStyle:'italic'}}>Starts {formatDate(alloc.startDate)}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ========== CARPENTER DOCUMENTS ========== */}
          {user?.role === 'carpenter' && carpenterTab === 'documents' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Documents: {user?.site}</h2>
              {DOCUMENTS[user?.site] && Object.entries(DOCUMENTS[user?.site]).map(([category, docs]) => (
                <div key={category} style={{ marginBottom:'15px', backgroundColor:'white', padding:'15px', borderRadius:'8px', border:'1px solid #ddd' }}>
                  <h3 style={{ color:NAVY, margin:'0 0 10px 0', fontSize:15 }}>{category}</h3>
                  <div style={{ fontSize:'13px' }}>
                    {docs.map((doc, idx) => (
                      <div key={idx} style={{ marginBottom:'6px', padding:'8px', backgroundColor:'#f9f9f9', borderRadius:'4px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'8px' }}>
                        <span>{doc}</span>
                        <button onClick={() => { setSuccessMsg('Download started: '+doc); setTimeout(()=>setSuccessMsg(''),2500); }}
                          style={{ padding:'4px 10px', fontSize:'11px', backgroundColor:GOLD, color:NAVY, border:'none', borderRadius:'3px', cursor:'pointer', fontWeight:'bold' }}>
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ========== CARPENTER PRICE LISTS ========== */}
          {user?.role === 'carpenter' && carpenterTab === 'price lists' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Price Lists</h2>
              {Object.entries(PRICE_LISTS).map(([builder, sites]) => (
                <div key={builder} style={{ marginBottom:'15px', backgroundColor:'white', padding:'15px', borderRadius:'8px', border:'1px solid #ddd' }}>
                  <h3 style={{ color:NAVY, margin:'0 0 10px 0', fontSize:16 }}>{builder}</h3>
                  {Object.entries(sites).map(([site, rates]) => (
                    <div key={site} style={{ marginLeft:'10px', marginBottom:'10px', padding:'10px', backgroundColor:'#f9f9f9', borderRadius:'4px' }}>
                      <h4 style={{ color:'#333', margin:'0 0 8px 0', fontSize:14 }}>{site}</h4>
                      <table style={{ width:'100%', fontSize:'12px' }}>
                        <tbody>
                          {Object.entries(rates).map(([stage, price]) => (
                            <tr key={stage} style={{ borderBottom:'1px solid #eee' }}>
                              <td style={{ padding:'4px' }}>{stage}</td>
                              <td style={{ padding:'4px', textAlign:'right', fontWeight:'bold' }}>GBP {price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* ========== CARPENTER FIXINGS ========== */}
          {user?.role === 'carpenter' && carpenterTab === 'fixings' && (
            <div>
              <h2 style={{ color:NAVY, marginTop:0, fontSize:22 }}>Request Fixings / Materials</h2>
              <div style={{ backgroundColor:NAVY, color:CREAM, padding:'20px', borderRadius:'8px', maxWidth:'500px', marginBottom:'20px' }}>
                <div style={{ marginBottom:'15px' }}>
                  <label style={{ display:'block', marginBottom:'4px', fontSize:'11px' }}>Allocation</label>
                  <select value={fixingAlloc} onChange={(e) => setFixingAlloc(e.target.value)}
                    style={{ width:'100%', padding:'8px', borderRadius:'4px', border:'1px solid '+GOLD, fontSize:13 }}>
                    <option value="">Select</option>
                    {myAllocs.filter(a=>!a.completed).map(a => (
                      <option key={a.id} value={a.id}>{a.site} - Plot {a.plot} ({a.stage})</option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom:'15px' }}>
                  <label style={{ display:'block', marginBottom:'4px', fontSize:'11px' }}>Item Description</label>
                  <input type="text" placeholder="e.g. M8 bolts, wall ties..." value={fixingItem} onChange={(e) => setFixingItem(e.target.value)}
                    style={{ width:'100%', padding:'8px', borderRadius:'4px', border:'1px solid '+GOLD, boxSizing:'border-box', fontSize:13 }} />
                </div>
                <div style={{ marginBottom:'15px' }}>
                  <label style={{ display:'block', marginBottom:'4px', fontSize:'11px' }}>Quantity</label>
                  <input type="number" placeholder="e.g. 500" value={fixingQty} onChange={(e) => setFixingQty(e.target.value)}
                    style={{ width:'100%', padding:'8px', borderRadius:'4px', border:'1px solid '+GOLD, boxSizing:'border-box', fontSize:13 }} />
                </div>
                <div style={{ marginBottom:'15px' }}>
                  <label style={{ display:'block', marginBottom:'4px', fontSize:'11px' }}>Notes</label>
                  <textarea placeholder="Any additional details..." value={fixingNotes} onChange={(e) => setFixingNotes(e.target.value)}
                    style={{ width:'100%', padding:'8px', borderRadius:'4px', border:'1px solid '+GOLD, minHeight:'60px', boxSizing:'border-box', fontFamily:'inherit', fontSize:13 }} />
                </div>
                <button type="button" onClick={() => {
                  if(fixingAlloc && fixingItem && fixingQty){
                    const alloc = myAllocs.find(a => String(a.id) === String(fixingAlloc));
                    const req = handleFixingRequest(fixingItem, fixingQty, fixingNotes, alloc);
                    setFixingRequests([...fixingRequests, req]);
                    setFixingAlloc(''); setFixingItem(''); setFixingQty(''); setFixingNotes('');
                    setSuccessMsg('Fixing request submitted'); setTimeout(()=>setSuccessMsg(''),2500);
                  } else { alert('Please fill in allocation, item and quantity'); }
                }} style={{ backgroundColor:GOLD, color:NAVY, padding:'10px 20px', border:'none', borderRadius:'4px', cursor:'pointer', fontWeight:'bold', fontSize:14 }}>
                  Request
                </button>
              </div>
              {(fixingRequests.length > 0 || allFixingRequests.filter(r=>r.carpenter===user?.name).length > 0) && (
                <div>
                  <h3 style={{ color:NAVY, fontSize:16 }}>Your Requests</h3>
                  {[...fixingRequests, ...allFixingRequests.filter(r=>r.carpenter===user?.name)].map(r => (
                    <div key={r.id} style={{ backgroundColor:'white', border:'1px solid #ddd', borderRadius:'6px', padding:'12px', marginBottom:'8px', fontSize:13 }}>
                      <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:4}}>
                        <strong>{r.item} x{r.qty}</strong>
                        <span style={{ padding:'2px 8px', borderRadius:'3px', fontSize:11, fontWeight:'bold',
                          backgroundColor: r.status==='approved'?'#e8f5e9' : r.status==='denied'?'#ffebee' : '#e3f2fd',
                          color: r.status==='approved'?'#2e7d32' : r.status==='denied'?'#c62828' : '#1565c0' }}>
                          {(r.status||'pending').toUpperCase()}
                        </span>
                      </div>
                      <div style={{color:'#666', fontSize:12, marginTop:4}}>{r.site || r.alloc} - {r.date}</div>
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
              {invoices.filter(i => i.carpenter === user?.name).length === 0 ? (
                <p style={{color:'#666', fontSize:14}}>No invoices yet.</p>
              ) : (
                <div>
                  {invoices.filter(i => i.carpenter === user?.name).map(inv => (
                    <div key={inv.id} style={{ backgroundColor:'white', border:'1px solid #ddd', borderRadius:'8px', padding:'14px', marginBottom:'10px' }}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
                        <div>
                          <strong style={{fontSize:14}}>{inv.site} - Plot {inv.plot}</strong>
                          <div style={{fontSize:12,color:'#666',marginTop:2}}>{inv.houseType} / {inv.stage}</div>
                        </div>
                        <div style={{textAlign:'right'}}>
                          <div style={{fontSize:18,fontWeight:'bold'}}>GBP {inv.amount}</div>
                          <span style={{
                            display:'inline-block', padding:'2px 10px', borderRadius:'3px', fontSize:11, fontWeight:'bold', marginTop:4,
                            backgroundColor: inv.status==='paid'?'#e8f5e9' : inv.status==='approved'?'#e3f2fd' : '#fff3e0',
                            color: inv.status==='paid'?'#2e7d32' : inv.status==='approved'?'#1565c0' : '#e65100'
                          }}>{inv.status.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop:'15px', padding:'15px', backgroundColor:NAVY, color:CREAM, borderRadius:'8px', fontSize:14 }}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}><span>Pending:</span><strong>GBP {invoices.filter(i => i.carpenter === user?.name && i.status === 'pending').reduce((s,i) => s + i.amount, 0)}</strong></div>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}><span>Approved:</span><strong>GBP {invoices.filter(i => i.carpenter === user?.name && i.status === 'approved').reduce((s,i) => s + i.amount, 0)}</strong></div>
                    <div style={{display:'flex',justifyContent:'space-between'}}><span>Paid:</span><strong>GBP {invoices.filter(i => i.carpenter === user?.name && i.status === 'paid').reduce((s,i) => s + i.amount, 0)}</strong></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========== INVOICE/OFFICE PORTAL ========== */}
          {user?.role === 'invoice' && ['pending','approved','paid'].map(status => (
            invoiceTab === status && (
              <div key={status}>
                <h2 style={{ color:NAVY, marginTop:0, fontSize:22, textTransform:'capitalize' }}>{status} Invoices</h2>
                {invoices.filter(i => i.status === status).length === 0 ? (
                  <p style={{color:'#666', fontSize:14}}>No {status} invoices.</p>
                ) : (
                  <div>
                    {invoices.filter(i => i.status === status).map(inv => (
                      <div key={inv.id} style={{ backgroundColor:'white', border:'1px solid #ddd', borderRadius:'8px', padding:'14px', marginBottom:'10px' }}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
                          <div>
                            <strong style={{fontSize:14}}>{inv.carpenter}</strong>
                            <div style={{fontSize:12,color:'#666',marginTop:2}}>{inv.site} - Plot {inv.plot} / {inv.houseType} / {inv.stage}</div>
                            <div style={{fontSize:11,color:'#999',marginTop:2}}>{inv.date}</div>
                          </div>
                          <div style={{textAlign:'right',display:'flex',alignItems:'center',gap:10}}>
                            <strong style={{fontSize:18}}>GBP {inv.amount}</strong>
                            {status === 'pending' && (
                              <button onClick={() => {
                                setInvoices(invoices.map(i => i.id===inv.id ? {...i, status:'approved'} : i));
                                setSuccessMsg('Invoice signed off'); setTimeout(()=>setSuccessMsg(''),2500);
                              }} style={{ backgroundColor:GOLD, color:NAVY, padding:'6px 12px', border:'none', borderRadius:'4px', cursor:'pointer', fontWeight:'bold', fontSize:12 }}>
                                Sign Off
                              </button>
                            )}
                            {status === 'approved' && (
                              <button onClick={() => {
                                setInvoices(invoices.map(i => i.id===inv.id ? {...i, status:'paid'} : i));
                                setSuccessMsg('Invoice marked as paid'); setTimeout(()=>setSuccessMsg(''),2500);
                              }} style={{ backgroundColor:'#2e7d32', color:'white', padding:'6px 12px', border:'none', borderRadius:'4px', cursor:'pointer', fontWeight:'bold', fontSize:12 }}>
                                Mark Paid
                              </button>
                            )}
                            {status === 'paid' && (
                              <span style={{ fontSize:12, color:'#2e7d32', fontWeight:'bold' }}>Paid</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div style={{ marginTop:'15px', padding:'15px', backgroundColor:NAVY, color:CREAM, borderRadius:'8px' }}>
                      <p style={{ margin:'0', fontWeight:'bold', fontSize:'16px' }}>
                        Total {status}: GBP {invoices.filter(i => i.status === status).reduce((sum, i) => sum + i.amount, 0)}
                      </p>
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
{portal==="login"&&(<div style={{marginTop:64,minHeight:"90vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(160deg, #0a1520 0%, #0C1821 40%, #111f2c 100%)",position:"relative",overflow:"hidden"}}><div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:"radial-gradient(ellipse at 30% 20%, rgba(184,134,11,0.04) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(184,134,11,0.03) 0%, transparent 50%)",pointerEvents:"none"}}></div><div style={{position:"relative",width:"100%",maxWidth:420,padding:"0 20px"}}><div style={{textAlign:"center",marginBottom:40}}><div style={{width:72,height:72,borderRadius:16,overflow:"hidden",margin:"0 auto 24px",boxShadow:"0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(184,134,11,0.2)",background:"linear-gradient(135deg, #B8860B, #D4A843)"}}><img src={logoUrl} alt="M&W" style={{width:"100%",height:"100%",objectFit:"contain"}}/></div><h2 style={{color:"#fff",fontSize:26,fontWeight:700,letterSpacing:"-0.02em",marginBottom:6,fontFamily:"'DM Sans',sans-serif"}}>Miller &amp; Watson</h2><div style={{width:40,height:2,background:"linear-gradient(90deg, transparent, #B8860B, transparent)",margin:"12px auto 14px"}}></div><p style={{color:"rgba(255,255,255,.4)",fontSize:13,fontWeight:400,letterSpacing:"0.02em"}}>Contractor Management Portal</p></div><div style={{background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.06)",borderRadius:16,padding:"36px 32px 32px",boxShadow:"0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)"}}><label style={{display:"block",fontSize:11,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(255,255,255,.35)",marginBottom:10}}>Access PIN</label><input type="password" value={pin} onChange={e=>setPin(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLogin()} placeholder="Enter PIN" style={{width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:10,padding:"16px 20px",color:"#fff",fontSize:22,fontFamily:"'DM Sans',monospace",outline:"none",textAlign:"center",letterSpacing:12,boxSizing:"border-box"}}/><button onClick={doLogin} style={{width:"100%",marginTop:20,padding:"15px 24px",background:"linear-gradient(135deg, #B8860B 0%, #D4A843 100%)",color:"#0C1821",fontSize:14,fontWeight:700,border:"none",borderRadius:10,cursor:"pointer",letterSpacing:"0.04em",fontFamily:"'DM Sans',sans-serif",boxShadow:"0 4px 16px rgba(184,134,11,0.25), inset 0 1px 0 rgba(255,255,255,0.2)"}}>Sign In</button></div><div style={{marginTop:24,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>{[{label:"Carpenter",pins:"1234 / 5678"},{label:"Site Manager",pins:"1111 / 2222"},{label:"Admin",pins:"4444"},{label:"Office",pins:"9999"}].map(r=>(<div key={r.label} style={{background:"rgba(255,255,255,.03)",borderRadius:8,padding:"8px 12px",border:"1px solid rgba(255,255,255,.04)"}}><div style={{fontSize:10,color:"rgba(255,255,255,.25)",marginBottom:2}}>{r.label}</div><div style={{fontSize:12,color:"#D4A843",fontFamily:"monospace",fontWeight:600}}>{r.pins}</div></div>))}</div><div style={{marginTop:28,textAlign:"center",borderTop:"1px solid rgba(255,255,255,.04)",paddingTop:16}}><p style={{color:"rgba(255,255,255,.2)",fontSize:10,letterSpacing:"0.05em",margin:0}}>Suite 4, The Hayloft, Blakenhall Park</p><p style={{color:"rgba(255,255,255,.15)",fontSize:10,margin:"4px 0 0"}}>Barton Under Needwood, DE13 8AJ | Est. 2005</p></div></div></div>)}
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
