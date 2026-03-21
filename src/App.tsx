import { useState, useEffect, useRef } from "react";

// ============ DATA ============
const BUILDERS = [
  {
    id: "barratt",
    name: "Barratt Homes",
    color: "#E31937",
    logo: "https://www.barratthomes.co.uk/favicon.ico",
    relationship: "Our partnership with Barratt Homes stretches back over a decade. As the UK's largest housebuilder, their standards are among the highest in the industry — and they trust M&W to deliver consistently across multiple sites. We're proud to be a key carpentry partner for their East Midlands developments.",
    sites: [
      { name: "Thoresby Vale", location: "Edwinstowe, Mansfield", lat: 53.177, lng: -1.069, housetypes: ["Windermere","Holden","Moresby","Kennett","Radleigh"] },
      { name: "Romans' Quarter", location: "Bingham, Nottingham", lat: 52.949, lng: -1.000, housetypes: ["Hollinwood","Bradgate","Moresby","Alderney"] },
      { name: "Dunstall Park", location: "Tamworth, Staffordshire", lat: 52.634, lng: -1.693, housetypes: ["Windermere","Archford","Holden","Kennett"] },
      { name: "Poppy Fields", location: "Uttoxeter, Staffordshire", lat: 52.898, lng: -1.860, housetypes: ["Maidstone","Ellerton","Denford"] },
      { name: "Bertelin Fields", location: "Beaconside, Stafford", lat: 52.826, lng: -2.117, housetypes: ["Windermere","Archford","Kennett","Moresby"] },
    ]
  },
  {
    id: "dwh",
    name: "lovells",
    color: "#1B3D6F",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_en-0IYbjSLWr1dCt62dPp1evg0udhiAZXg&s",
    relationship: "David Wilson Homes is renowned for building premium, design-led family homes. Our carpenters understand the higher specification and attention to detail that DWH developments demand, and we've built a strong working relationship with their site management and commercial teams across Nottinghamshire.",
    sites: [
      { name: "Old Mill Farm", location: "Cotgrave, Nottingham", lat: 52.917, lng: -1.046, housetypes: ["Holden","Kingsley","Layton","Windermere"] },
      { name: "Berry Hill", location: "Mansfield", lat: 53.148, lng: -1.188, housetypes: ["Hollinwood","Bradgate","Exeter"] },
      { name: "Gateford Park", location: "Worksop, Nottinghamshire", lat: 53.321, lng: -1.132, housetypes: ["Radleigh","Holden","Moresby"] },
    ]
  },
  {
    id: "bellway",
    name: "Bellway Homes",
    color: "#003DA5",
    logo: "https://s3-eu-west-1.amazonaws.com/tpd/logos/58932caa0000ff00059bf27f/0x0.png",
    relationship: "Bellway is one of the most successful housebuilders in the UK and one of our longest-standing partners. We supply carpentry services across their East Midlands division, covering Derbyshire, Nottinghamshire, and Leicestershire. The relationship is built on reliability — when Bellway need carpenters on site, M&W deliver.",
    sites: [
      { name: "The Meadows", location: "Alvaston, Derby", lat: 52.893, lng: -1.434, housetypes: ["Joiner","Craftsman","Turner","Tanner","Weaver"] },
      { name: "Holbrook Park", location: "Chellaston, Derby", lat: 52.873, lng: -1.437, housetypes: ["Craftsman","Joiner","Turner","Weaver","Cooper"] },
      { name: "Coppice Heights", location: "Ripley, Derbyshire", lat: 53.051, lng: -1.405, housetypes: ["Joiner","Turner","Tanner","Fletcher"] },
      { name: "Springwood", location: "Midway, S. Derbyshire", lat: 52.773, lng: -1.542, housetypes: ["Joiner","Craftsman","Turner","Weaver"] },
      { name: "Hugglescote Grange", location: "Hugglescote, Leicestershire", lat: 52.727, lng: -1.362, housetypes: ["Craftsman","Turner","Cooper","Fletcher"] },
      { name: "Abbey Fields Grange", location: "Hucknall, Nottinghamshire", lat: 53.033, lng: -1.195, housetypes: ["Tanner","Weaver","Turner","Joiner"] },
      { name: "Ashlands", location: "Sutton in Ashfield, Notts", lat: 53.128, lng: -1.255, housetypes: ["Joiner","Craftsman","Turner"] },
      { name: "Torvill Park", location: "Fairham, Nottingham", lat: 52.909, lng: -1.163, housetypes: ["Craftsman","Turner","Tanner","Weaver"] },
    ]
  },
  {
    id: "persimmon",
    name: "Persimmon Homes",
    color: "#D4002A",
    logo: "https://cdn.prod.website-files.com/65a518d6a768fc381c83acf8/65a518d6a768fc381c83b06d_2020_Persimmon_1.png",
    relationship: "Persimmon is one of the UK's most prolific housebuilders and the Midlands is hugely important to their output. M&W have worked with Persimmon across Derbyshire, Nottinghamshire, and Leicestershire, delivering high-volume carpentry packages on programme and to specification. A fast-paced partnership built on trust.",
    sites: [
      { name: "Clipstone Park", location: "Clipstone, Mansfield", lat: 53.167, lng: -1.137, housetypes: ["Bedale","Alnwick","Byford","Bolsover","Kielder"] },
      { name: "The Oaks", location: "Calverton, Notts", lat: 53.033, lng: -1.093, housetypes: ["Bedale","Alnwick","Bolsover","Kielder"] },
      { name: "Nottingham Gate", location: "Lenton, Nottingham", lat: 52.943, lng: -1.177, housetypes: ["Bedale","Byford","Alnwick"] },
      { name: "Boulton Moor", location: "Chellaston, Derby", lat: 52.872, lng: -1.413, housetypes: ["Bedale","Alnwick","Bolsover","Kielder","Roseberry"] },
      { name: "Jubilee Gardens", location: "Ilkeston, Derbyshire", lat: 52.972, lng: -1.307, housetypes: ["Bedale","Byford","Alnwick","Bolsover"] },
      { name: "Foxley Fields", location: "Market Harborough, Leics", lat: 52.478, lng: -0.918, housetypes: ["Kielder","Roseberry","Alnwick","Bolsover"] },
    ]
  },
  {
    id: "stmodwen",
    name: "St. Modwen Homes",
    color: "#6B2D5B",
    logo: "https://ramsboards.com/wp-content/uploads/2021/01/st.modwen-homes.webp",
    relationship: "With their head office in Derby, St. Modwen are a natural partner for M&W. We share a commitment to creating quality homes and thriving communities. Our teams have delivered carpentry across their Derbyshire, Staffordshire, and Leicestershire developments, and we value the collaborative relationship we've built with their site teams.",
    sites: [
      { name: "Hilton Valley", location: "Hilton, Derbyshire", lat: 52.862, lng: -1.596, housetypes: ["Arden","Berwick","Carleton","Danbury"] },
      { name: "Bramshall Meadows", location: "Uttoxeter, Staffordshire", lat: 52.907, lng: -1.847, housetypes: ["Arden","Berwick","Carleton","Elmswell"] },
      { name: "Blythe Fields", location: "Blythe Bridge, Staffs", lat: 52.967, lng: -1.962, housetypes: ["Arden","Berwick","Danbury"] },
      { name: "Snibston Mill", location: "Coalville, Leicestershire", lat: 52.725, lng: -1.370, housetypes: ["Arden","Carleton","Danbury","Elmswell"] },
      { name: "Egstow Park", location: "Clay Cross, Derbyshire", lat: 53.163, lng: -1.413, housetypes: ["Berwick","Carleton","Danbury"] },
      { name: "Bramcote Hills Park", location: "Bramcote, Nottingham", lat: 52.935, lng: -1.228, housetypes: ["Arden","Berwick","Carleton"] },
    ]
  },
  {
    id: "countryside",
    name: "Countryside Homes",
    color: "#2B6E44",
    logo: "https://nla-production-media.s3.eu-west-2.amazonaws.com/84908/Untitled-design-15.png?v=1766430558",
    relationship: "Now part of Vistry Group, Countryside Homes focus on creating mixed-tenure communities that blend private, affordable, and rental housing. M&W are proud to support their Midlands developments, bringing the quality and consistency that placemaking at this scale demands.",
    sites: [
      { name: "Edwalton Fields", location: "Edwalton, Nottingham", lat: 52.917, lng: -1.120, housetypes: ["Thornbury","Wentworth","Henley","Sudbury"] },
      { name: "Mastin Moor", location: "Chesterfield, Derbyshire", lat: 53.267, lng: -1.342, housetypes: ["Thornbury","Henley","Sudbury"] },
    ]
  },
  {
    id: "vistry",
    name: "Vistry / Bovis Homes",
    color: "#00594F",
    logo: "https://housingforum.org.uk/wp-content/uploads/2020/05/Untitled-design.png",
    relationship: "Vistry Group — home to the Bovis Homes and Linden Homes brands — is the UK's leading provider of mixed-tenure housing. Our work on their flagship Broadnook Garden Village in Leicestershire is a testament to the trust they place in M&W for large-scale, high-quality carpentry delivery.",
    sites: [
      { name: "Broadnook Garden Village", location: "Rothley, Leicestershire", lat: 52.719, lng: -1.138, housetypes: ["Limewood","Fern","Lime","Oak","Willow"] },
      { name: "Partridge Walk", location: "Stafford", lat: 52.808, lng: -2.101, housetypes: ["Limewood","Oak","Willow","Cedar"] },
      { name: "Hinckley 475", location: "Hinckley, Leicestershire", lat: 52.540, lng: -1.370, housetypes: ["Limewood","Fern","Oak","Willow"] },
    ]
  },
  {
    id: "ashberry",
    name: "Ashberry Homes",
    color: "#7B3F98",
    logo: "https://www.ashberryhomes.co.uk/img/default-social-image.jpg",
    relationship: "As Bellway's sister brand focused on affordable and first-time buyer homes, Ashberry developments require the same quality of carpentry at a pace that matches their build programmes. M&W have been a trusted partner, delivering consistently across their Nottinghamshire sites.",
    sites: [
      { name: "Potters Gate", location: "Farndon, Newark", lat: 53.064, lng: -0.856, housetypes: ["Greenwood","Oakwood","Birchwood"] },
      { name: "Longridge", location: "Long Eaton, Notts", lat: 52.890, lng: -1.275, housetypes: ["Greenwood","Oakwood","Elmwood","Birchwood"] },
    ]
  },
  {
    id: "davidsons",
    name: "Davidsons Homes",
    color: "#C8102E",
    logo: "https://davidsonsgroup.co.uk/wp-content/uploads/2023/01/Screenshot-2023-01-03-at-16.53.01-1024x522.png",
    relationship: "Davidsons are a well-respected Midlands developer known for quality family homes. Working with a regional builder like Davidsons gives us the close working relationship and direct communication that larger nationals sometimes lack. We're proud to be part of their supply chain.",
    sites: [
      { name: "Davidsons at Huncote", location: "Huncote, Leicestershire", lat: 52.582, lng: -1.218, housetypes: ["Richmond","Windsor","Balmoral","Sandringham"] },
      { name: "Davidsons at Boulton Moor", location: "Derby", lat: 52.878, lng: -1.418, housetypes: ["Richmond","Windsor","Balmoral"] },
    ]
  },
  {
    id: "wheeldons",
    name: "Wheeldon Homes",
    color: "#2E4057",
    logo: "https://www.panddg.co.uk/wp-content/uploads/2022/02/logo-wheeldon-homes.svg",
    relationship: "Wheeldon Homes build beautiful, traditionally designed homes across South Derbyshire. As a boutique developer, they value the personal service and attention to detail that M&W bring. Every plot matters, and our carpenters treat each one with the care it deserves.",
    sites: [
      { name: "Oaklands", location: "Etwall, South Derbyshire", lat: 52.871, lng: -1.599, housetypes: ["The Chatsworth","The Haddon","The Calke"] },
      { name: "The Green", location: "Church Broughton, Derby", lat: 52.857, lng: -1.660, housetypes: ["The Chatsworth","The Haddon"] },
    ]
  },
  {
    id: "crest",
    name: "Crest Nicholson",
    color: "#003C71",
    logo: "https://www.crestnicholson.com/favicon.ico",
    relationship: "Crest Nicholson are known for design quality and sustainable communities. Working with Crest means meeting exacting standards on every element of carpentry — from the precision of the first fix through to the finish of the second fix. M&W are proud to meet that standard.",
    sites: [
      { name: "Barley Fields", location: "Queniborough, Leicestershire", lat: 52.697, lng: -1.080, housetypes: ["Elm","Beech","Maple","Rowan","Birch"] },
    ]
  },
];

const PAST_PROJECTS = [
  { year: "2024–2025", builder: "Bellway", site: "Holbrook Park Phase 1", location: "Chellaston, Derby", units: 167, scope: "Full carpentry package" },
  { year: "2023–2025", builder: "Persimmon", site: "Boulton Moor", location: "Chellaston, Derby", units: 245, scope: "Joists, roofs, first & second fix, finals" },
  { year: "2023–2024", builder: "Barratt", site: "Thoresby Vale Phase 2", location: "Edwinstowe, Mansfield", units: 180, scope: "Full carpentry package" },
  { year: "2022–2024", builder: "St. Modwen", site: "Hilton Valley Phase 3", location: "Hilton, Derbyshire", units: 120, scope: "First fix, second fix, kitchens" },
  { year: "2022–2023", builder: "Bellway", site: "Springwood", location: "Midway, S. Derbyshire", units: 95, scope: "Full carpentry package" },
  { year: "2021–2023", builder: "Persimmon", site: "Jubilee Gardens", location: "Ilkeston, Derbyshire", units: 200, scope: "Full carpentry package" },
  { year: "2021–2022", builder: "David Wilson", site: "Berry Hill Phase 4", location: "Mansfield", units: 110, scope: "Roofs, first fix, second fix" },
  { year: "2020–2022", builder: "Barratt", site: "Dunstall Park Phase 1–3", location: "Tamworth", units: 280, scope: "Full carpentry package" },
  { year: "2020–2021", builder: "Vistry/Bovis", site: "Broadnook Phase 1", location: "Rothley, Leicestershire", units: 150, scope: "Joists, roofs, first & second fix" },
  { year: "2019–2021", builder: "Bellway", site: "The Meadows Phase 1", location: "Alvaston, Derby", units: 78, scope: "Full carpentry package" },
  { year: "2019–2020", builder: "St. Modwen", site: "Egstow Park Phase 2", location: "Clay Cross", units: 85, scope: "Timber frame erection & carpentry" },
  { year: "2018–2020", builder: "Persimmon", site: "Clipstone Park Phase 1–2", location: "Mansfield", units: 190, scope: "Full carpentry package" },
  { year: "2018–2019", builder: "Davidsons", site: "Davidsons at Huncote", location: "Leicestershire", units: 65, scope: "Full carpentry package" },
  { year: "2017–2019", builder: "Bellway", site: "Coppice Heights Phase 1", location: "Ripley", units: 130, scope: "Full carpentry package" },
  { year: "2017–2018", builder: "Barratt", site: "Romans' Quarter Phase 1", location: "Bingham", units: 95, scope: "Roofs, first & second fix" },
  { year: "2016–2018", builder: "Persimmon", site: "Carlton View", location: "Gedling, Nottingham", units: 170, scope: "Full carpentry package" },
  { year: "2016–2017", builder: "Wheeldon", site: "Oaklands Phase 1", location: "Etwall", units: 35, scope: "Full carpentry package" },
  { year: "2015–2017", builder: "Bellway", site: "Hugglescote Grange Phase 1", location: "Leicestershire", units: 140, scope: "Full carpentry package" },
  { year: "2014–2016", builder: "Barratt", site: "Grange Park", location: "Loughborough", units: 220, scope: "Full carpentry package" },
  { year: "2013–2015", builder: "Persimmon", site: "Forest View", location: "Hucknall", units: 160, scope: "Joists, roofs, first & second fix" },
  { year: "2012–2014", builder: "Bellway", site: "Stenson Fields", location: "Derby", units: 250, scope: "Full carpentry package" },
  { year: "2011–2013", builder: "Barratt", site: "Oakwood Rise", location: "Derbyshire", units: 180, scope: "Full carpentry package" },
  { year: "2010–2012", builder: "Persimmon", site: "Wollaton Vale", location: "Nottingham", units: 200, scope: "Full carpentry package" },
  { year: "2009–2011", builder: "Bellway", site: "Riverside Gardens", location: "Burton-on-Trent", units: 90, scope: "Full carpentry package" },
  { year: "2008–2010", builder: "Barratt", site: "Chestnut Grove", location: "Long Eaton", units: 140, scope: "Full carpentry package" },
  { year: "2007–2009", builder: "David Wilson", site: "Highfields", location: "Derby", units: 175, scope: "Full carpentry package" },
  { year: "2006–2008", builder: "Persimmon", site: "The Willows", location: "Sutton-in-Ashfield", units: 120, scope: "Joists, roofs, first fix" },
  { year: "2005–2007", builder: "Bellway", site: "Millbrook Park", location: "Stapleford, Notts", units: 85, scope: "Full carpentry package" },
];

const SERVICES = [
  { id: "joists", title: "Joists & Structural Floors", icon: "┃",
    desc: "All structural timber floor systems installed to current NHBC standards and building regulations.",
    subcategories: [
      { name: "Joist Types & Configurations", items: [
        { title: "Masonry Hanger Joists", desc: "Joists supported by galvanised masonry hangers built into blockwork. Standard on most new build ground and upper floors." },
        { title: "Joist Hanger to Trimmer", desc: "Metal joist hangers connecting trimmed joists around stairwells, loft hatches, and service voids." },
        { title: "Change of Direction in Flooring", desc: "Where joist direction changes between rooms or around structural features — requires trimming and double headers." },
        { title: "I-Beam / Engineered Joists", desc: "Prefabricated I-joists (e.g., JJI joists) for long spans. Lighter, straighter, and increasingly common on new builds." },
        { title: "Traditional Softwood Joists", desc: "Standard C16/C24 graded softwood joists. Typically 47x200mm or 47x225mm depending on span tables." },
      ]},
      { name: "Floor Construction", items: [
        { title: "Semi-Detached Party Floor", desc: "Floors adjoining party walls — requires fire stopping, acoustic separation, and correct detailing at the party wall junction." },
        { title: "Detached Floor Zones", desc: "Standard floor construction with strutting, noggins at 600mm centres, and decking to specification." },
        { title: "Strutting & Noggins", desc: "Herringbone or solid strutting at mid-span to prevent joist rotation. Noggins for board edges and service runs." },
        { title: "Structural Decking", desc: "18mm or 22mm T&G chipboard or OSB decking. Glued and screwed to current specifications." },
        { title: "Fire Stopping at Floors", desc: "Mineral wool and intumescent detailing at all floor/wall junctions, service penetrations, and party wall crossings." },
      ]},
    ]
  },
  { id: "roofs", title: "Roof Construction", icon: "△",
    desc: "Full roof erection from truss delivery through to weathertight completion.",
    subcategories: [
      { name: "Roof Types", items: [
        { title: "Straight Up & Over", desc: "Standard duo-pitch trussed roof — the most common roof type on new build housing estates. Trusses at 600mm centres." },
        { title: "Gable Elevations", desc: "Gable end walls with truss infill, gable ladders, and barge boards. Ladder frames overhang for verge detail." },
        { title: "Hipped Roofs", desc: "Roofs hipped at one or both ends. Requires hip trusses, mono trusses, hip boards, jack rafters, and creeper trusses." },
        { title: "Valley Roofs", desc: "Where two roof pitches meet in a valley — requires valley boards, valley trusses, and careful weatherproofing detail." },
        { title: "Dormer Construction", desc: "Flat-top or pitched dormers for loft rooms. Cheek framing, flat roof joists, and cladding to specification." },
      ]},
      { name: "Roof Details & Finishing", items: [
        { title: "Open Eaves", desc: "Exposed rafter feet at eaves level with ventilation. Common on traditional-style developments." },
        { title: "Boxed Soffit", desc: "Enclosed soffit boards fixed to underside of rafters at eaves. Provides a clean, modern finish with ventilation strips." },
        { title: "Gable Ladders", desc: "Timber ladder frames projecting beyond the gable wall to support the verge overhang and barge board." },
        { title: "Box Ends", desc: "Enclosed timber box at the junction of the eaves and verge on a hipped or gabled roof — requires neat mitred detailing." },
        { title: "Fascia & Barge Boards", desc: "uPVC or timber fascia at eaves and barge boards at verge. Fixed plumb and true to receive guttering." },
        { title: "Roof Bracing & Stability", desc: "Diagonal and longitudinal bracing to truss manufacturer's layout. Critical for structural stability during and after build." },
      ]},
    ]
  },
  { id: "first-fix", title: "First Fix Carpentry", icon: "▣",
    desc: "All structural and preparatory carpentry completed before plastering — traditional blockwork and timber frame builds.",
    subcategories: [
      { name: "Traditional (Blockwork) First Fix", items: [
        { title: "Staircase Installation", desc: "Fitting newel posts, strings, treads, risers — temporary or permanent stairs depending on build stage. Plumbed, levelled, and secured." },
        { title: "Stud Partitions", desc: "Timber stud walls (typically 75x50mm or 100x50mm C16) at 400mm or 600mm centres. Head plate, sole plate, noggins." },
        { title: "Bulkheads", desc: "Timber-framed bulkheads over stairwells, service runs, and structural beams. Framed to receive plasterboard." },
        { title: "Door Linings", desc: "Softwood or MDF door linings fixed plumb and square into structural openings. Standard, FD30, and FD60 rated." },
        { title: "Window Boards", desc: "MDF or timber window boards cut and fitted to internal window reveals. Scribed to plaster line." },
        { title: "Pipe Boxing / Service Boxing", desc: "Timber frameworks around soil pipes, waste pipes, and service runs. Built to receive plasterboard cladding." },
        { title: "Loft Hatches", desc: "Trimmed opening in ceiling joists with loft hatch frame installed. To current fire and insulation standards." },
        { title: "Solar Panel Stands / Frames", desc: "Timber mounting frames on roof structure for solar PV panel installation. To structural engineer's specification." },
        { title: "Bath Panels & Frames", desc: "Timber framing to support bath panel fixings. Ensures rigid and square panel fit." },
        { title: "Meter Box Frames", desc: "Timber frames set into external walls for gas and electric meter boxes. Built in during blockwork stage." },
        { title: "Airing Cupboard Framing", desc: "Slatted shelving and timber framework inside airing cupboards for hot water cylinder access." },
      ]},
      { name: "Timber Frame First Fix", items: [
        { title: "Timber Frame Erection", desc: "Crane-assisted or manual erection of prefabricated timber frame wall panels, floor cassettes, and roof panels from manufacturer's delivery." },
        { title: "Frame Squaring & Levelling", desc: "Ensuring all panels are plumb, level, and square before fixing. Shimming sole plates and checking diagonals." },
        { title: "Panel Stitching & Connections", desc: "Connecting adjacent wall panels with nailing patterns to structural engineer's specification. Header and cripple stud detailing." },
        { title: "Party Wall Construction", desc: "Double-leaf timber frame party walls with acoustic and fire separation. Cavity barriers and fire stopping between dwellings." },
        { title: "Floor Cassette Installation", desc: "Lifting and fixing prefabricated floor cassettes to wall panels. Levelling, strutting, and decking to specification." },
        { title: "Roof Panel / Spandrel Panels", desc: "Erecting prefabricated roof panels or spandrel panels where specified. Bracing and fixing to manufacturer's details." },
        { title: "Breather Membrane & Battening", desc: "Wrapping external frame with breather membrane and fixing counter battens and horizontal battens for brick tie-back or cladding." },
        { title: "Internal Stud Alterations", desc: "Cutting and forming openings, adding noggins for fixtures, and any stud modifications required post-erection." },
        { title: "Staircase in Timber Frame", desc: "Installing staircases within timber frame openings — often tighter tolerances than blockwork. Trimming and securing to cassette floors." },
        { title: "Service Zone Formation", desc: "Creating internal service battens or zones for electrical and plumbing runs without penetrating the vapour barrier." },
        { title: "Fire Stopping & Cavity Barriers", desc: "Installing intumescent and mineral wool cavity barriers at all required positions — floor/wall junctions, party walls, around openings." },
      ]},
    ]
  },
  { id: "second-fix", title: "Second Fix Carpentry", icon: "▤",
    desc: "All finishing carpentry after plastering — the work the customer sees.",
    subcategories: [
      { name: "Traditional Door Hanging", items: [
        { title: "Door Trimming & Fitting", desc: "Cutting doors to size, scribing to uneven floors, and fitting to lining. Ensuring consistent gaps all round." },
        { title: "Hinging", desc: "Recessing hinges into door and lining. Standard butt hinges or fire-rated hinges on FD30/FD60 doors." },
        { title: "Latch & Lock Fitting", desc: "Cutting in latch or lock mortice, fitting striking plate to lining. Aligned and operating smoothly." },
        { title: "Fire Door Hanging", desc: "FD30 and FD60 fire doors hung to current building regulations — intumescent strips, cold smoke seals, and correct gaps." },
        { title: "Adjustments & Easing", desc: "Final adjustments for carpet clearance, draught proofing, and consistent operation across all doors in the plot." },
      ]},
      { name: "Prehung Door Casings", items: [
        { title: "Prehung Casing Installation", desc: "Factory-assembled door, lining, and architrave units installed as a single piece. Faster installation, consistent finish." },
        { title: "Levelling & Packing", desc: "Shimming and packing prehung units plumb and square within the structural opening. Fixing through lining to stud or block." },
        { title: "Architrave Alignment", desc: "Ensuring factory-fitted architrave sits flush to plaster face on both sides. Minor scribing or adjustment where needed." },
        { title: "Ironmongery on Prehung", desc: "Handles, latches, and closers typically pre-fitted — final check of alignment and operation after installation." },
        { title: "Fire-Rated Prehung Sets", desc: "Certificated prehung fire door assemblies installed to manufacturer's instructions. No site modification permitted." },
      ]},
      { name: "Standard Specification", items: [
        { title: "Standard Skirting", desc: "MDF skirting, typically 68mm or 94mm torus or ogee profile. Fixed around all rooms with mitred external corners and scribed internals." },
        { title: "Standard Architrave", desc: "MDF architrave sets around door openings, typically 58mm or 68mm to match skirting profile." },
        { title: "Standard Staircase Finishing", desc: "Painted softwood or MDF balustrade — square spindles, plain newel caps, and wall-fixed handrail." },
        { title: "Standard Window Boards", desc: "MDF window boards, bullnosed front edge, scribed to reveals." },
        { title: "Standard Flooring", desc: "Basic laminate or vinyl click flooring where included in specification." },
      ]},
      { name: "Premium Specification", items: [
        { title: "Premium Skirting", desc: "Larger profile skirting — 119mm, 144mm, or 168mm in ogee, torus, or contemporary square-edge. MDF or solid timber." },
        { title: "Premium Architrave", desc: "Wider architrave sets — 68mm or 80mm+ profiles. Plinth blocks at base where specified for a period or premium finish." },
        { title: "Oak / Hardwood Staircase", desc: "Oak handrails, oak or glass spindles, chamfered or fluted newel posts. Premium newel caps and base rails." },
        { title: "Oak Window Boards", desc: "Solid oak or veneered oak window boards. Oiled or lacquered finish." },
        { title: "Engineered Hardwood Flooring", desc: "Engineered oak or hardwood flooring — tongue and groove, glued or floating. Expansion gaps and oak threshold strips." },
        { title: "Dado & Picture Rails", desc: "Fitted on premium or heritage-style builds. Fixed level to chalk line at specified heights throughout." },
        { title: "Panelling & Wainscoting", desc: "Timber or MDF wall panelling where specified on premium builds. Shaker-style, tongue and groove, or flat panel." },
      ]},
    ]
  },
  { id: "finals", title: "Final Fix", icon: "◆",
    desc: "All final carpentry items fitted to complete the plot to handover standard.",
    subcategories: [
      { name: "What's Included", items: [
        { title: "Door Handles & Furnishings", desc: "Internal and external door handles fitted at consistent heights. Lever on rose, lever on backplate, or pull handles as specified." },
        { title: "Ironmongery — Locks, Latches & Keeps", desc: "Mortice locks, tubular latches, roller catches, magnetic catches, and striking plates / keeps. All checked for smooth operation." },
        { title: "Bath Panel", desc: "Bath panel cut to size and fitted. Secured with magnetic catches or screw fixings for future access to plumbing." },
        { title: "Front Door Accessories", desc: "Letterbox, door knocker, door number, spy hole / peephole, security chain, and any other external door furniture as specified." },
      ]},
    ]
  },
];

// ============ COMPONENT ============
export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedBuilder, setSelectedBuilder] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ from: "bot", text: "Hi — I'm here to help. Ask me anything about Miller & Watson, our services, or working with us." }]);
  const [chatInput, setChatInput] = useState("");
  const [chatStage, setChatStage] = useState(null);
  const [contactInfo, setContactInfo] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages]);

  const sendChat = (text) => {
    if (!text.trim()) return;
    const newMsgs = [...chatMessages, { from: "user", text }];
    setChatMessages(newMsgs);
    setChatInput("");
    setTimeout(() => botReply(text, newMsgs), 600);
  };

  const botReply = (msg, msgs) => {
    const l = msg.toLowerCase();
    let reply = "";

    if (chatStage === "name") {
      setContactInfo(p => ({...p, name: msg}));
      reply = `Thanks ${msg}. What's the best phone number to reach you on?`;
      setChatStage("phone");
    } else if (chatStage === "phone") {
      setContactInfo(p => ({...p, phone: msg}));
      reply = `Got it. I'll pass your details to the team — someone will call you within 24 hours.`;
      setChatStage(null);
    } else if (l.includes("work") || l.includes("job") || l.includes("join")) {
      reply = "We're always looking for experienced site carpenters. Pricework rates, paid weekly, sites across the Midlands. CSCS card required. Want me to take your details for a callback?";
      setChatStage("name");
      setTimeout(() => setChatMessages(p => [...p, { from: "bot", text: "What's your full name?" }]), 1200);
    } else if (l.includes("area") || l.includes("where") || l.includes("cover")) {
      reply = "We cover Derby, Nottingham, Staffordshire, Leicestershire, and surrounding areas. Our office is in Barton Under Needwood, Burton-On-Trent.";
    } else if (l.includes("service") || l.includes("quote") || l.includes("tender")) {
      reply = "We provide full site carpentry packages — joists, roofs, first fix, second fix, kitchens & finals. Want me to take your details so our commercial team can get in touch?";
      setChatStage("name");
      setTimeout(() => setChatMessages(p => [...p, { from: "bot", text: "What's your full name?" }]), 1200);
    } else if (l.includes("rate") || l.includes("pay") || l.includes("money")) {
      reply = "All work is on a price — competitive rates paid weekly by BACS. For specific rates, best to speak with the team directly. Shall I arrange a callback?";
    } else {
      reply = "I can help with info about working for M&W, our services, or areas we cover. Or I can take your details for a callback from the team.";
    }
    setChatMessages([...msgs, { from: "bot", text: reply }]);
  };

  const sty = {
    root: { fontFamily: "'DM Sans', -apple-system, sans-serif", color: "#1a1a1a", background: "#fff", minHeight: "100vh" },
    nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(12,24,33,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)", height: 64, display: "flex", alignItems: "center", padding: "0 32px", justifyContent: "space-between" },
    logo: { display: "flex", alignItems: "center", gap: 10 },
    logoBox: { width: 36, height: 36, background: "#B8860B", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: "#fff", letterSpacing: -0.5 },
    logoText: { color: "#fff", fontSize: 15, fontWeight: 600, letterSpacing: 0.3 },
    navLinks: { display: "flex", gap: 24, alignItems: "center" },
    navLink: (active) => ({ color: active ? "#B8860B" : "rgba(255,255,255,0.65)", fontSize: 12, fontWeight: 600, letterSpacing: 1.2, textTransform: "uppercase", cursor: "pointer", transition: "0.2s", borderBottom: active ? "2px solid #B8860B" : "2px solid transparent", paddingBottom: 2 }),
    hero: { marginTop: 64, height: "85vh", minHeight: 700, background: "linear-gradient(135deg, rgba(12,24,33,0.75) 0%, rgba(12,24,33,0.45) 100%), url('/Roof_Structure_ete1.jpg') center center / cover no-repeat", display: "flex", alignItems: "center", padding: "0 48px" },
    section: { padding: "80px 48px", maxWidth: 1320, margin: "0 auto" },
    sectionDark: { background: "#0C1821", color: "#fff", padding: "80px 48px" },
    sectionAlt: { background: "#F8F7F4", padding: "80px 48px" },
    label: { fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "#B8860B", marginBottom: 8, display: "block" },
    h2: { fontSize: 36, fontWeight: 700, lineHeight: 1.15, marginBottom: 12 },
    sub: { fontSize: 15, color: "#777", lineHeight: 1.7, maxWidth: 600 },
    card: { background: "#fff", borderRadius: 6, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", cursor: "pointer", transition: "0.25s" },
    btn: { display: "inline-flex", alignItems: "center", gap: 6, padding: "12px 28px", borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "0.2s", border: "none", letterSpacing: 0.4 },
  };

  return (
    <div style={sty.root}>
      {/* NAV */}
      <nav style={sty.nav}>
        <div style={sty.logo}>
          <div style={sty.logoBox}>M&W</div>
          <span style={sty.logoText}>Miller & <span style={{color:"#B8860B"}}>Watson</span></span>
        </div>
        <div style={sty.navLinks}>
          {[["home","Home"],["services","Services"],["builders","Our Projects"],["past","Past Projects"],["map","Site Map"],["careers","Work With Us"],["contact","Contact"]].map(([id,label]) => (
            <span key={id} style={sty.navLink(activeSection===id)} onClick={() => { setActiveSection(id); setSelectedBuilder(null); setSelectedSite(null); setSelectedHouse(null); setSelectedService(null); }}>
              {label}
            </span>
          ))}
        </div>
      </nav>

      {/* HERO */}
      {activeSection === "home" && (
        <div style={sty.hero}>
          <div>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(184,134,11,0.15)",border:"1px solid rgba(184,134,11,0.3)",borderRadius:100,padding:"6px 18px",marginBottom:24}}>
              <span style={{width:6,height:6,background:"#B8860B",borderRadius:"50%"}}></span>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:"#D4A843"}}>Est. 2005 — 21 Years in Construction</span>
            </div>
            <h1 style={{fontSize:"clamp(36px,5vw,60px)",color:"#fff",lineHeight:1.08,maxWidth:740,marginBottom:20,fontWeight:700}}>
              The Midlands' Leading<br/><span style={{fontStyle:"italic",color:"#D4A843",fontWeight:400}}>Site Carpentry</span> Specialists
            </h1>
            <p style={{fontSize:16,color:"rgba(255,255,255,0.6)",maxWidth:520,lineHeight:1.7,marginBottom:16}}>
              Delivering precision carpentry for new build housing across the Midlands. 100+ carpenters. Trusted by the UK's top housebuilders.
            </p>
            <p style={{fontSize:15,color:"#D4A843",maxWidth:520,lineHeight:1.6,marginBottom:32,fontStyle:"italic",borderLeft:"2px solid rgba(184,134,11,0.4)",paddingLeft:16}}>
              We don't just build homes — we build careers. Join a team that's growing, that values its people, and that's on a mission to become the best carpentry contractor in the country.
            </p>
            <div style={{display:"flex",gap:12}}>
              <button style={{...sty.btn,background:"#B8860B",color:"#fff"}} onClick={() => setActiveSection("builders")}>View Our Projects →</button>
              <button style={{...sty.btn,background:"transparent",color:"#fff",border:"1px solid rgba(255,255,255,0.25)"}} onClick={() => setActiveSection("careers")}>Join Our Team</button>
            </div>
            <div style={{display:"flex",gap:48,marginTop:64}}>
              {[["21+","Years"],["100+","Carpenters"],["1000s","Homes"],["11","Builder Partners"]].map(([n,l]) => (
                <div key={l} style={{textAlign:"center"}}>
                  <div style={{fontSize:28,fontWeight:700,color:"#D4A843"}}>{n}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.45)",textTransform:"uppercase",letterSpacing:1.5,marginTop:2}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SERVICES */}
      {activeSection === "services" && !selectedService && (
        <div style={{marginTop:64}}>
          <div style={sty.section}>
            <span style={sty.label}>Our Services</span>
            <h2 style={sty.h2}>Complete Site Carpentry</h2>
            <p style={sty.sub}>Select a trade to explore all the elements we deliver. Full managed carpentry packages — from structural elements through to handover.</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:24,marginTop:40}}>
              {SERVICES.map(s => (
                <div key={s.id} onClick={() => setSelectedService(s)} style={{...sty.card,padding:32,borderLeft:"3px solid #B8860B",cursor:"pointer"}}
                  onMouseEnter={e => {e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 8px 32px rgba(0,0,0,0.1)";}}
                  onMouseLeave={e => {e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 2px 16px rgba(0,0,0,0.06)";}}>
                  <div style={{fontSize:28,color:"#B8860B",marginBottom:12,fontWeight:300}}>{s.icon}</div>
                  <h3 style={{fontSize:17,fontWeight:700,marginBottom:8}}>{s.title}</h3>
                  <p style={{fontSize:13,color:"#777",lineHeight:1.7,marginBottom:12}}>{s.desc}</p>
                  <div style={{fontSize:11,color:"#B8860B",fontWeight:700,letterSpacing:0.5}}>
                    {s.subcategories.reduce((acc,sc) => acc + sc.items.length, 0)} items — tap to explore →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SERVICE DETAIL */}
      {activeSection === "services" && selectedService && (
        <div style={{marginTop:64}}>
          <div style={sty.section}>
            <button onClick={() => setSelectedService(null)} style={{...sty.btn,background:"#f0f0f0",color:"#333",marginBottom:24,fontSize:12}}>← Back to all services</button>
            <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:8}}>
              <div style={{width:52,height:52,borderRadius:6,background:"#B8860B",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,color:"#fff",fontWeight:300}}>{selectedService.icon}</div>
              <div>
                <h2 style={{fontSize:28,fontWeight:700,margin:0}}>{selectedService.title}</h2>
                <p style={{fontSize:13,color:"#999",margin:0}}>{selectedService.desc}</p>
              </div>
            </div>

            {selectedService.subcategories.map((sc, si) => (
              <div key={si} style={{marginTop:40}}>
                <h3 style={{fontSize:16,fontWeight:700,marginBottom:16,paddingBottom:8,borderBottom:"1px solid #e8e8e8"}}>{sc.name}</h3>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16}}>
                  {sc.items.map((item, ii) => (
                    <div key={ii} style={{background:"#fff",borderRadius:6,padding:20,boxShadow:"0 1px 8px rgba(0,0,0,0.04)",border:"1px solid #f0f0f0",transition:"0.2s"}}
                      onMouseEnter={e => {e.currentTarget.style.borderColor="#B8860B";e.currentTarget.style.boxShadow="0 4px 16px rgba(184,134,11,0.1)";}}
                      onMouseLeave={e => {e.currentTarget.style.borderColor="#f0f0f0";e.currentTarget.style.boxShadow="0 1px 8px rgba(0,0,0,0.04)";}}>
                      <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                        <div style={{width:8,height:8,minWidth:8,borderRadius:"50%",background:"#B8860B",marginTop:6}}></div>
                        <div>
                          <h4 style={{fontSize:14,fontWeight:700,margin:"0 0 4px"}}>{item.title}</h4>
                          <p style={{fontSize:12,color:"#777",lineHeight:1.7,margin:0}}>{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BUILDERS */}
      {activeSection === "builders" && !selectedBuilder && (
        <div style={{marginTop:64}}>
          <div style={sty.section}>
            <span style={sty.label}>Our Builder Partners</span>
            <h2 style={sty.h2}>Working With the Best</h2>
            <p style={sty.sub}>Select a builder to explore their sites and house types.</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:20,marginTop:40}}>
              {BUILDERS.map(b => (
                <div key={b.id} onClick={() => setSelectedBuilder(b)} style={{...sty.card,padding:24,textAlign:"center",borderTop:`3px solid ${b.color}`,cursor:"pointer"}}
                  onMouseEnter={e => e.currentTarget.style.transform="translateY(-4px)"} onMouseLeave={e => e.currentTarget.style.transform="none"}>
                  {b.logo ? <div style={{height:50,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}><img src={b.logo} alt={b.name} style={{maxHeight:50,maxWidth:"100%",objectFit:"contain"}} onError={e => {e.target.parentElement.innerHTML=`<span style="font-size:14px;font-weight:800;color:${b.color}">${b.name.charAt(0)}</span>`}}/></div> :
                    <div style={{height:50,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,color:b.color,marginBottom:12}}>{b.name.charAt(0)}</div>}
                  <h3 style={{fontSize:14,fontWeight:700}}>{b.name}</h3>
                  <p style={{fontSize:12,color:"#999",marginTop:4}}>{b.sites.length} active site{b.sites.length>1?"s":""}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BUILDER DETAIL → SITES */}
      {activeSection === "builders" && selectedBuilder && !selectedSite && (
        <div style={{marginTop:64}}>
          <div style={sty.section}>
            <button onClick={() => setSelectedBuilder(null)} style={{...sty.btn,background:"#f0f0f0",color:"#333",marginBottom:24,fontSize:12}}>← Back to all builders</button>
            <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:8}}>
              <div style={{width:56,height:56,borderRadius:6,background:"#fff",border:`2px solid ${selectedBuilder.color}`,display:"flex",alignItems:"center",justifyContent:"center",padding:6}}>
                {selectedBuilder.logo ? <img src={selectedBuilder.logo} alt="" style={{maxHeight:40,maxWidth:40,objectFit:"contain"}} onError={e => {e.target.parentElement.innerHTML=`<span style="color:${selectedBuilder.color};font-weight:800;font-size:20px">${selectedBuilder.name.charAt(0)}</span>`}}/> :
                  <span style={{color:selectedBuilder.color,fontWeight:800,fontSize:20}}>{selectedBuilder.name.charAt(0)}</span>}
              </div>
              <div>
                <h2 style={{fontSize:28,fontWeight:700,margin:0}}>{selectedBuilder.name}</h2>
                <p style={{fontSize:13,color:"#999",margin:0}}>{selectedBuilder.sites.length} active sites in the Midlands</p>
              </div>
            </div>
            {selectedBuilder.relationship && (
              <div style={{background:"#f8f7f4",borderRadius:6,padding:20,marginTop:20,borderLeft:`3px solid ${selectedBuilder.color}`}}>
                <p style={{fontSize:13,color:"#555",lineHeight:1.8,margin:0,fontStyle:"italic"}}>{selectedBuilder.relationship}</p>
              </div>
            )}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20,marginTop:32}}>
              {selectedBuilder.sites.map((site,i) => (
                <div key={i} onClick={() => setSelectedSite(site)} style={{...sty.card,cursor:"pointer",borderLeft:`3px solid ${selectedBuilder.color}`}}
                  onMouseEnter={e => e.currentTarget.style.transform="translateY(-3px)"} onMouseLeave={e => e.currentTarget.style.transform="none"}>
                  <div style={{padding:24}}>
                    <h3 style={{fontSize:16,fontWeight:700,marginBottom:4}}>{site.name}</h3>
                    <p style={{fontSize:13,color:"#777",marginBottom:12}}>{site.location}</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                      {site.housetypes.slice(0,4).map(ht => (
                        <span key={ht} style={{fontSize:11,padding:"3px 10px",borderRadius:100,background:"#f5f3ef",color:"#666",fontWeight:500}}>{ht}</span>
                      ))}
                      {site.housetypes.length > 4 && <span style={{fontSize:11,padding:"3px 10px",borderRadius:100,background:"#f5f3ef",color:"#999"}}>+{site.housetypes.length-4} more</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SITE DETAIL → HOUSE TYPES */}
      {activeSection === "builders" && selectedBuilder && selectedSite && !selectedHouse && (
        <div style={{marginTop:64}}>
          <div style={sty.section}>
            <button onClick={() => setSelectedSite(null)} style={{...sty.btn,background:"#f0f0f0",color:"#333",marginBottom:24,fontSize:12}}>← Back to {selectedBuilder.name} sites</button>
            <span style={{...sty.label,color:selectedBuilder.color}}>{selectedBuilder.name}</span>
            <h2 style={sty.h2}>{selectedSite.name}</h2>
            <p style={sty.sub}>{selectedSite.location}</p>
            <h3 style={{fontSize:16,fontWeight:700,marginTop:40,marginBottom:20}}>House Types on this Site</h3>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:20}}>
              {selectedSite.housetypes.map((ht,i) => (
                <div key={i} onClick={() => setSelectedHouse(ht)} style={{...sty.card,cursor:"pointer",overflow:"hidden"}}
                  onMouseEnter={e => e.currentTarget.style.transform="translateY(-3px)"} onMouseLeave={e => e.currentTarget.style.transform="none"}>
                  <div style={{height:160,background:`linear-gradient(135deg, ${selectedBuilder.color}22, ${selectedBuilder.color}08)`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontSize:36,color:selectedBuilder.color,fontWeight:300,marginBottom:4}}>⌂</div>
                      <div style={{fontSize:11,color:"#999",textTransform:"uppercase",letterSpacing:1}}>House type</div>
                    </div>
                  </div>
                  <div style={{padding:16}}>
                    <h4 style={{fontSize:15,fontWeight:700,margin:0}}>The {ht}</h4>
                    <p style={{fontSize:12,color:"#999",marginTop:4}}>Tap to view floorplans</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* HOUSE TYPE DETAIL → FLOORPLANS */}
      {activeSection === "builders" && selectedBuilder && selectedSite && selectedHouse && (
        <div style={{marginTop:64}}>
          <div style={sty.section}>
            <button onClick={() => setSelectedHouse(null)} style={{...sty.btn,background:"#f0f0f0",color:"#333",marginBottom:24,fontSize:12}}>← Back to {selectedSite.name} house types</button>
            <span style={{...sty.label,color:selectedBuilder.color}}>{selectedBuilder.name} — {selectedSite.name}</span>
            <h2 style={sty.h2}>The {selectedHouse}</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,marginTop:32}}>
              <div style={{background:"#f8f7f4",borderRadius:8,padding:40,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:400}}>
                <div style={{fontSize:64,color:selectedBuilder.color,marginBottom:16,fontWeight:200}}>⌂</div>
                <p style={{fontSize:13,color:"#999",textAlign:"center"}}>House elevation image<br/>placeholder — replace with actual<br/>{selectedBuilder.name} imagery</p>
              </div>
              <div>
                <h3 style={{fontSize:18,fontWeight:700,marginBottom:20}}>Floorplans</h3>
                {["Ground Floor","First Floor","Second Floor (if applicable)"].map((floor,i) => (
                  <div key={i} style={{background:"#f8f7f4",borderRadius:6,padding:32,marginBottom:16,display:"flex",alignItems:"center",justifyContent:"center",minHeight:200}}>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontSize:12,fontWeight:700,color:"#B8860B",textTransform:"uppercase",letterSpacing:1.5,marginBottom:8}}>{floor}</div>
                      <p style={{fontSize:12,color:"#aaa"}}>Floorplan placeholder — replace with actual<br/>{selectedBuilder.name} floorplan image for The {selectedHouse}</p>
                    </div>
                  </div>
                ))}
                <div style={{background:"#fff",border:"1px solid #e8e8e8",borderRadius:6,padding:20,marginTop:16}}>
                  <h4 style={{fontSize:13,fontWeight:700,marginBottom:8}}>Carpentry Scope</h4>
                  <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                    {SERVICES.map(s => <span key={s.id} style={{fontSize:11,padding:"4px 12px",borderRadius:100,background:"#f5f3ef",color:"#555"}}>{s.title}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAP */}
      {activeSection === "map" && (
  <div style={{ marginTop: 64, background: "#f6f4ef", minHeight: "100vh" }}>
    <div style={{ ...sty.section, maxWidth: 1400 }}>
      <div style={{ marginBottom: 28 }}>
        <span style={sty.label}>Coverage</span>
        <h2 style={sty.h2}>Midlands Site Map</h2>
        <p style={{ ...sty.sub, maxWidth: 760 }}>
          Active projects across Derbyshire, Nottinghamshire, Staffordshire and Leicestershire.
          Select a site below to jump straight into the relevant builder and development.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: 24,
          alignItems: "start",
        }}
      >
        {/* LEFT PANEL */}
        <div
          style={{
            background: "#0C1821",
            color: "#fff",
            borderRadius: 14,
            padding: 24,
            position: "sticky",
            top: 24,
            boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
          }}
        >
          <div
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              color: "rgba(255,255,255,0.55)",
              marginBottom: 8,
            }}
          >
            Live coverage
          </div>

          <div style={{ fontSize: 34, fontWeight: 700, lineHeight: 1, marginBottom: 18 }}>
            {BUILDERS.reduce((a, b) => a + b.sites.length, 0)}
          </div>

          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 22 }}>
            Active sites plotted across the Midlands
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            {BUILDERS.map((b) => (
              <div
                key={b.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  padding: "10px 12px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: b.color,
                      display: "inline-block",
                      boxShadow: `0 0 0 3px ${b.color}22`,
                    }}
                  />
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{b.name}</span>
                </div>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
                  {b.sites.length}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* MAP CARD */}
        <div>
          <div
            style={{
              background: "#fff",
              borderRadius: 18,
              overflow: "hidden",
              border: "1px solid #e8e2d8",
              boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "18px 22px",
                borderBottom: "1px solid #eee7dc",
                background: "linear-gradient(180deg, #fdfbf8 0%, #f5f1ea 100%)",
              }}
            >
              <div>
                <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1.5, color: "#B8860B", fontWeight: 700 }}>
                  Regional footprint
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#0C1821", marginTop: 4 }}>
                  M&W active developments
                </div>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#666",
                  background: "#fff",
                  border: "1px solid #e9dfcf",
                  padding: "8px 12px",
                  borderRadius: 999,
                }}
              >
                Updated from live site list
              </div>
            </div>

            <div
              style={{
                padding: 20,
                background:
                  "radial-gradient(circle at 50% 35%, #ebe6dc 0%, #e4ddd1 32%, #ddd5c8 100%)",
              }}
            >
              <div
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid rgba(12,24,33,0.08)",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.1) 100%)",
                }}
              >
                <svg viewBox="0 0 900 620" style={{ width: "100%", height: "auto", display: "block" }}>
                  <defs>
                    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.18" />
                    </filter>
                  </defs>

                  {/* background */}
                  <rect width="900" height="620" fill="#e7e1d6" />

                  {/* abstract land shapes */}
                  <path
                    d="M170 80 C 240 40, 330 45, 390 80 C 430 50, 510 55, 580 90 C 650 80, 740 125, 765 210 C 810 265, 810 355, 760 425 C 740 500, 655 560, 555 565 C 500 600, 405 595, 330 560 C 250 565, 175 520, 130 455 C 85 390, 80 280, 110 205 C 110 145, 130 105, 170 80 Z"
                    fill="#d9d1c4"
                    stroke="#c8beaf"
                    strokeWidth="2"
                  />

                  {/* county labels */}
                  <text x="275" y="170" style={{ fontSize: 15, fill: "#9a8f7d", fontWeight: 700, letterSpacing: 1.2 }}>
                    STAFFORDSHIRE
                  </text>
                  <text x="540" y="160" style={{ fontSize: 15, fill: "#9a8f7d", fontWeight: 700, letterSpacing: 1.2 }}>
                    NOTTINGHAMSHIRE
                  </text>
                  <text x="405" y="310" style={{ fontSize: 15, fill: "#9a8f7d", fontWeight: 700, letterSpacing: 1.2 }}>
                    DERBYSHIRE
                  </text>
                  <text x="560" y="470" style={{ fontSize: 15, fill: "#9a8f7d", fontWeight: 700, letterSpacing: 1.2 }}>
                    LEICESTERSHIRE
                  </text>

                  {/* map title */}
                  <text x="450" y="42" textAnchor="middle" style={{ fontSize: 22, fill: "#6e6457", fontWeight: 800, letterSpacing: 1 }}>
                    MIDLANDS SITE MAP
                  </text>

                  {/* markers */}
                  {BUILDERS.flatMap((b) =>
                    b.sites.map((s) => {
                      const x = ((s.lng + 2.2) / 1.8) * 700 + 95;
                      const y = ((53.5 - s.lat) / 1.2) * 470 + 75;

                      return (
                        <g key={`${b.id}-${s.name}`} filter="url(#softShadow)">
                          <line x1={x} y1={y - 8} x2={x} y2={y - 28} stroke="#6f6558" strokeWidth="1.5" opacity="0.55" />
                          <rect
                            x={x - 58}
                            y={y - 56}
                            rx="8"
                            ry="8"
                            width="116"
                            height="22"
                            fill="rgba(255,255,255,0.92)"
                            stroke="rgba(12,24,33,0.08)"
                          />
                          <text
                            x={x}
                            y={y - 41}
                            textAnchor="middle"
                            style={{ fontSize: 10, fill: "#3e3a35", fontWeight: 700 }}
                          >
                            {s.name.length > 16 ? `${s.name.slice(0, 16)}…` : s.name}
                          </text>
                          <circle cx={x} cy={y} r={11} fill={`${b.color}22`} />
                          <circle cx={x} cy={y} r={6.5} fill={b.color} stroke="#fff" strokeWidth="2.5" />
                          <title>{`${b.name}: ${s.name} — ${s.location}`}</title>
                        </g>
                      );
                    })
                  )}
                </svg>
              </div>
            </div>
          </div>

          {/* SITE LIST */}
          <div style={{ marginTop: 22 }}>
            <div
              style={{
                background: "#fff",
                border: "1px solid #ebe4d9",
                borderRadius: 16,
                padding: 22,
                boxShadow: "0 10px 24px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: "#0C1821" }}>
                Browse active developments
              </div>

              {BUILDERS.map((b) => (
                <div key={b.id} style={{ marginBottom: 18 }}>
                  <h4 style={{ fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: b.color,
                        display: "inline-block",
                      }}
                    />
                    {b.name}
                  </h4>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {b.sites.map((s, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: 12,
                          padding: "8px 14px",
                          borderRadius: 999,
                          background: "#f5f1ea",
                          color: "#49443d",
                          cursor: "pointer",
                          border: "1px solid #e7dfd2",
                          fontWeight: 500,
                        }}
                        onClick={() => {
                          setActiveSection("builders");
                          setSelectedBuilder(b);
                          setSelectedSite(s);
                          setSelectedHouse(null);
                        }}
                      >
                        {s.name} — {s.location}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
      {/* PAST PROJECTS */}
      {activeSection === "past" && (
        <div style={{marginTop:64}}>
          <div style={sty.section}>
            <span style={sty.label}>Our Track Record</span>
            <h2 style={sty.h2}>21 Years of Delivered Projects</h2>
            <p style={sty.sub}>Every site listed below represents homes we're proud to have helped build. From our first contract in 2005 to the developments we're completing today, this is the work that defines Miller & Watson.</p>

            <div style={{display:"flex",gap:16,marginTop:32,marginBottom:24,flexWrap:"wrap"}}>
              <div style={{background:"#f8f7f4",borderRadius:6,padding:"16px 24px",flex:1,minWidth:150,textAlign:"center"}}>
                <div style={{fontSize:28,fontWeight:700,color:"#B8860B"}}>{PAST_PROJECTS.length}</div>
                <div style={{fontSize:11,color:"#999",textTransform:"uppercase",letterSpacing:1.5,marginTop:2}}>Projects Completed</div>
              </div>
              <div style={{background:"#f8f7f4",borderRadius:6,padding:"16px 24px",flex:1,minWidth:150,textAlign:"center"}}>
                <div style={{fontSize:28,fontWeight:700,color:"#B8860B"}}>{PAST_PROJECTS.reduce((a,p) => a + p.units, 0).toLocaleString()}</div>
                <div style={{fontSize:11,color:"#999",textTransform:"uppercase",letterSpacing:1.5,marginTop:2}}>Homes Built</div>
              </div>
              <div style={{background:"#f8f7f4",borderRadius:6,padding:"16px 24px",flex:1,minWidth:150,textAlign:"center"}}>
                <div style={{fontSize:28,fontWeight:700,color:"#B8860B"}}>{new Set(PAST_PROJECTS.map(p => p.builder)).size}</div>
                <div style={{fontSize:11,color:"#999",textTransform:"uppercase",letterSpacing:1.5,marginTop:2}}>Builder Partners</div>
              </div>
              <div style={{background:"#f8f7f4",borderRadius:6,padding:"16px 24px",flex:1,minWidth:150,textAlign:"center"}}>
                <div style={{fontSize:28,fontWeight:700,color:"#B8860B"}}>2005–2026</div>
                <div style={{fontSize:11,color:"#999",textTransform:"uppercase",letterSpacing:1.5,marginTop:2}}>Years Active</div>
              </div>
            </div>

            <div style={{borderRadius:8,overflow:"hidden",border:"1px solid #e8e8e8"}}>
              <div style={{display:"grid",gridTemplateColumns:"120px 120px 1fr 1fr 80px 1fr",background:"#0C1821",padding:"12px 16px",gap:12}}>
                {["Year","Builder","Site","Location","Units","Scope"].map(h => (
                  <div key={h} style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.6)",textTransform:"uppercase",letterSpacing:1}}>{h}</div>
                ))}
              </div>
              {PAST_PROJECTS.map((p,i) => (
                <div key={i} style={{display:"grid",gridTemplateColumns:"120px 120px 1fr 1fr 80px 1fr",padding:"12px 16px",gap:12,background:i%2===0?"#fff":"#fafaf8",borderBottom:"1px solid #f0f0f0",transition:"0.15s"}}
                  onMouseEnter={e => e.currentTarget.style.background="#f5f0e8"} onMouseLeave={e => e.currentTarget.style.background=i%2===0?"#fff":"#fafaf8"}>
                  <div style={{fontSize:13,fontWeight:600,color:"#B8860B"}}>{p.year}</div>
                  <div style={{fontSize:13,fontWeight:600}}>{p.builder}</div>
                  <div style={{fontSize:13}}>{p.site}</div>
                  <div style={{fontSize:13,color:"#777"}}>{p.location}</div>
                  <div style={{fontSize:13,fontWeight:600,textAlign:"center"}}>{p.units}</div>
                  <div style={{fontSize:12,color:"#777"}}>{p.scope}</div>
                </div>
              ))}
            </div>

            <div style={{marginTop:40,background:"#f8f7f4",borderRadius:6,padding:24,borderLeft:"3px solid #B8860B"}}>
              <p style={{fontSize:14,color:"#555",lineHeight:1.8,margin:0}}>
                Every project on this list was delivered by M&W carpenters — many of whom have been with us for years. We don't just complete contracts and move on. We take pride in every home we help build, every site we work on, and every relationship we've earned. This list represents more than timber and nails — it represents 21 years of trust, quality, and commitment to doing the job right.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CAREERS */}
      {activeSection === "careers" && (
        <div style={{marginTop:64}}>
          <div style={sty.sectionDark}>
            <div style={{maxWidth:1320,margin:"0 auto"}}>
              <span style={sty.label}>Work With Us</span>
              <h2 style={{...sty.h2,color:"#fff"}}>Join the M&W Team</h2>
              <p style={{...sty.sub,color:"rgba(255,255,255,0.5)"}}>Experienced site carpenters wanted across the Midlands. CSCS card required.</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,marginTop:40}}>
                <div style={{display:"flex",flexDirection:"column",gap:16}}>
                  {[
                    ["Excellent Pricework Rates","Competitive rates paid weekly by BACS. All work is on a price."],
                    ["Continuity of Work","Sites across the Midlands — we keep our carpenters busy year-round."],
                    ["NHBC Training Provided","Knowledge of standards beneficial but not essential. We train on site."],
                    ["Professional Management","Full site supervision, H&S compliance, responsive management team."],
                    ["Derby / Nottingham / Staffs","Sites across the East and West Midlands. We try to keep travel reasonable."],
                  ].map(([t,d],i) => (
                    <div key={i} style={{display:"flex",gap:16,padding:16,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:6}}>
                      <div style={{width:40,height:40,minWidth:40,borderRadius:"50%",background:"rgba(184,134,11,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#B8860B",fontWeight:700}}>{i+1}</div>
                      <div><h4 style={{fontSize:14,fontWeight:700,margin:"0 0 2px"}}>{t}</h4><p style={{fontSize:12,color:"rgba(255,255,255,0.4)",lineHeight:1.5,margin:0}}>{d}</p></div>
                    </div>
                  ))}
                </div>
                <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:8,padding:32}}>
                  {!formSubmitted ? (<>
                    <h3 style={{fontSize:20,fontWeight:700,marginBottom:4}}>Express Your Interest</h3>
                    <p style={{fontSize:12,color:"rgba(255,255,255,0.4)",marginBottom:24}}>We'll be in touch within 24 hours.</p>
                    <form onSubmit={e => {e.preventDefault(); setFormSubmitted(true);}}>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
                        {[["First Name","text"],["Surname","text"],["Phone","tel"],["Email","email"]].map(([p,t]) => (
                          <input key={p} type={t} placeholder={p} required={p!=="Email"} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:5,padding:"11px 14px",color:"#fff",fontSize:13,fontFamily:"inherit",outline:"none"}}/>
                        ))}
                      </div>
                      {[["CSCS Card",["Blue (Skilled)","Gold (Supervisory)","Other","Applying","No"]],["Experience",["1–3 years","3–5 years","5–10 years","10+ years","Apprentice"]],["Preferred Area",["Derby","Nottingham","Burton/Staffs","Leicester","Flexible"]]].map(([l,opts]) => (
                        <select key={l} style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:5,padding:"11px 14px",color:"#fff",fontSize:13,fontFamily:"inherit",marginBottom:12,outline:"none"}}>
                          <option value="" style={{background:"#0C1821"}}>{l}...</option>
                          {opts.map(o => <option key={o} value={o} style={{background:"#0C1821"}}>{o}</option>)}
                        </select>
                      ))}
                      <textarea placeholder="Tell us about yourself..." rows={3} style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:5,padding:"11px 14px",color:"#fff",fontSize:13,fontFamily:"inherit",marginBottom:12,outline:"none",resize:"vertical"}}/>
                      <button type="submit" style={{...sty.btn,background:"#B8860B",color:"#fff",width:"100%",justifyContent:"center"}}>Submit Application →</button>
                    </form>
                  </>) : (
                    <div style={{textAlign:"center",padding:40}}>
                      <div style={{fontSize:48,marginBottom:16}}>✓</div>
                      <h3 style={{fontSize:20,fontWeight:700,marginBottom:8}}>Application Received</h3>
                      <p style={{fontSize:13,color:"rgba(255,255,255,0.5)"}}>Someone from M&W will be in touch within 24 hours.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT */}
      {activeSection === "contact" && (
        <div style={{marginTop:64}}>
          <div style={sty.section}>
            <span style={sty.label}>Contact</span>
            <h2 style={sty.h2}>Get in Touch</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,marginTop:32}}>
              <div>
                {[
                  ["Registered Office","Suite 4, The Hayloft, Blakenhall Park,\nBar Lane, Barton Under Needwood,\nBurton-On-Trent, DE13 8AJ"],
                  ["Phone","01283 716 173"],
                  ["Company","No. 05425616 | VAT Registered | CIS Registered Contractor"],
                  ["Hours","Monday – Friday: 7:00am – 5:00pm"],
                ].map(([t,d],i) => (
                  <div key={i} style={{display:"flex",gap:16,marginBottom:24}}>
                    <div style={{width:40,height:40,minWidth:40,borderRadius:"50%",background:"#f5f3ef",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"#B8860B"}}>{t.charAt(0)}</div>
                    <div><h4 style={{fontSize:13,fontWeight:700,margin:"0 0 2px"}}>{t}</h4><p style={{fontSize:13,color:"#777",margin:0,whiteSpace:"pre-line"}}>{d}</p></div>
                  </div>
                ))}
              </div>
              <div style={{background:"#f5f3ef",borderRadius:8,minHeight:300,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <p style={{fontSize:13,color:"#aaa",textAlign:"center"}}>Embedded map placeholder<br/>Barton Under Needwood, DE13 8AJ</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHAT TOGGLE */}
      <button onClick={() => setChatOpen(!chatOpen)} style={{position:"fixed",bottom:24,right:24,zIndex:200,width:56,height:56,borderRadius:"50%",background:"#B8860B",border:"none",cursor:"pointer",boxShadow:"0 4px 20px rgba(184,134,11,0.35)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:22,transition:"0.2s"}}>
        {chatOpen ? "✕" : "↗"}
      </button>

      {/* CHAT WINDOW */}
      {chatOpen && (
        <div style={{position:"fixed",bottom:92,right:24,zIndex:199,width:360,maxHeight:480,background:"#fff",borderRadius:12,boxShadow:"0 12px 48px rgba(0,0,0,0.15)",display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{background:"#0C1821",padding:"14px 18px",display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:"#B8860B",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"#fff"}}>M&W</div>
            <div><div style={{color:"#fff",fontSize:13,fontWeight:700}}>M&W Assistant</div><div style={{color:"rgba(255,255,255,0.4)",fontSize:10}}>Replies within 24hrs</div></div>
          </div>
          <div style={{flex:1,overflowY:"auto",padding:16,display:"flex",flexDirection:"column",gap:8,minHeight:280,maxHeight:320}}>
            {chatMessages.map((m,i) => (
              <div key={i} style={{maxWidth:"85%",padding:"9px 13px",borderRadius:10,fontSize:13,lineHeight:1.5,alignSelf:m.from==="user"?"flex-end":"flex-start",background:m.from==="user"?"#B8860B":"#f0f0f0",color:m.from==="user"?"#fff":"#333",borderBottomRightRadius:m.from==="user"?3:10,borderBottomLeftRadius:m.from==="bot"?3:10,whiteSpace:"pre-line"}}>
                {m.text}
              </div>
            ))}
            <div ref={chatEndRef}/>
          </div>
          <div style={{padding:"10px 16px",borderTop:"1px solid #eee",display:"flex",gap:8}}>
            <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key==="Enter" && sendChat(chatInput)} placeholder="Type a message..." style={{flex:1,border:"1px solid #e0e0e0",borderRadius:100,padding:"9px 16px",fontSize:13,fontFamily:"inherit",outline:"none"}}/>
            <button onClick={() => sendChat(chatInput)} style={{width:36,height:36,borderRadius:"50%",background:"#B8860B",border:"none",cursor:"pointer",color:"#fff",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>→</button>
          </div>
        </div>
      )}
    </div>
  );
}
