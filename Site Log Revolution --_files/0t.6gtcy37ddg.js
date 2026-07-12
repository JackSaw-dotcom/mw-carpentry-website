;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="d58a5902-4056-b0c8-513d-448994605622")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,875744,e=>{e.v({root:"RoleBadge-module__zj-yvq__root"})},389133,e=>{"use strict";var r=e.i(276385),t=e.i(712903),i=e.i(177037),s=e.i(596139),l=e.i(480028),a=e.i(744006),n=e.i(244945),o=e.i(875744);let u=({tagline:e,name:t,color:i,iconLeft:s})=>{let l=(0,r.jsx)(a.Pill,{text:t,colorway:i,iconLeft:s,clsx:o.default.root,variant:"muted",compact:!0});return e?(0,r.jsx)(n.Tooltip,{isDisabled:!e,tooltip:e,children:l}):l},c=()=>(0,r.jsx)(u,{name:s.corePlanName,color:"brand",iconLeft:(0,r.jsx)(t.default,{size:12,color:i.brandOrange})});e.s(["CoreBadge",0,c,"DefaultBadge",0,u,"RoleBadge",0,{Default:u,Admin:({tagline:e})=>(0,r.jsx)(u,{tagline:e??"Admin",name:"Admin",color:"yellow"}),Detective:({tagline:e})=>(0,r.jsx)(u,{tagline:e??"Detective",name:"Detective",color:"green"}),Featured:({tagline:e})=>(0,r.jsx)(u,{tagline:e??"Verified",name:"Verified",color:"blue"}),Hacker:({tagline:e})=>(0,r.jsx)(u,{tagline:e??`${s.hackerPlanName} users are subscribed to Replit's paid ${s.hackerPlanName} Plan.`,name:s.hackerPlanName,color:"green"}),Core:c,Pro:()=>(0,r.jsx)(u,{name:s.proPlanName,color:"blue",iconLeft:(0,r.jsx)(t.default,{size:12,color:l.tokens.blueStrongest})}),LanguageJammer:({tagline:e})=>(0,r.jsx)(u,{tagline:e??"Language Jammer",name:"Language Jammer",color:"purple"}),ReplitRep:({tagline:e})=>(0,r.jsx)(u,{tagline:e??"Replit Rep",name:"Replit Rep",color:"magenta"}),ReplitRepEdu:({tagline:e})=>(0,r.jsx)(u,{tagline:e??"Replit Rep EDU",name:"Replit Rep EDU",color:"green"}),Patron:({tagline:e})=>(0,r.jsx)(u,{tagline:e??"Patron",name:"Patron",color:"purple"}),Pythonista:({tagline:e})=>(0,r.jsx)(u,{tagline:e??"Pythonista",name:"Pythonista",color:"teal"})}])},449859,e=>{"use strict";var r,t=e.i(276385),i=e.i(389133),s=((r={}).Admin="ADMIN",r.Detective="DETECTIVE",r.Featured="FEATURED",r.LanguageJammer="LANGUAGE_JAMMER",r.Moderator="MODERATOR",r.ReplitRep="REPLIT_REP",r.ReplitRepEdu="REPLIT_REP_EDU",r.Patron="PATRON",r.Pythonista="PYTHONISTA",r.Student="STUDENT",r.Teacher="TEACHER",r.Hacker="hacker",r.HackerPro="hacker_pro",r.Pro="pro",r);e.s(["RUIUserRoles",()=>s,"UserRoleBadge",0,({userRole:e,tagline:r,name:s})=>{switch(e){case"DETECTIVE":return(0,t.jsx)(i.RoleBadge.Detective,{tagline:r});case"MODERATOR":return null;case"LANGUAGE_JAMMER":return(0,t.jsx)(i.RoleBadge.LanguageJammer,{tagline:r});case"FEATURED":return(0,t.jsx)(i.RoleBadge.Featured,{tagline:r});case"ADMIN":return(0,t.jsx)(i.RoleBadge.Admin,{tagline:r});case"REPLIT_REP":return(0,t.jsx)(i.RoleBadge.ReplitRep,{tagline:r});case"REPLIT_REP_EDU":return(0,t.jsx)(i.RoleBadge.ReplitRepEdu,{tagline:r});case"PATRON":return(0,t.jsx)(i.RoleBadge.Patron,{tagline:r});case"PYTHONISTA":return(0,t.jsx)(i.RoleBadge.Pythonista,{tagline:r});case"hacker":return(0,t.jsx)(i.RoleBadge.Hacker,{tagline:r});case"hacker_pro":return(0,t.jsx)(i.RoleBadge.Core,{});case"pro":return(0,t.jsx)(i.RoleBadge.Pro,{});default:return(0,t.jsx)(i.RoleBadge.Default,{tagline:r,name:s})}}])},21875,e=>{"use strict";var r=e.i(276385),t=e.i(871579),i=e.i(825419),s=e.i(488299),l=e.i(744006),a=e.i(8047),n=e.i(449859),o=e.i(61732);let u={[n.RUIUserRoles.Admin]:"Admin",[n.RUIUserRoles.Moderator]:"Community Moderator",[n.RUIUserRoles.Teacher]:"Teacher",[n.RUIUserRoles.Student]:"Student"};e.s(["User",0,function({src:e,username:n,email:c,fullName:d,displayName:p,small:g,role:m,localRole:R,plan:x,className:h,style:f}){return(0,r.jsxs)(o.View,{row:!0,gap:8,align:"center",shrink:!0,className:h,style:f,children:[(0,r.jsx)(i.Avatar,{src:e,username:n??c,fullName:d,size:g?24:32,layout:"intrinsic"}),(0,r.jsxs)(o.View,{grow:!0,shrink:!0,row:!0,gap:4,align:"center",children:[void 0!==p?(0,r.jsxs)(o.View,{className:"UserInfo",gap:4,children:[(0,r.jsx)(a.Text,{multiline:!1,children:p}),(0,r.jsxs)(a.Text,{variant:"small",color:"dimmest",multiline:!1,translate:"no",children:[n?`@${n}`:"",c?`${c}`:""]})]}):(0,r.jsx)(a.Text,{multiline:!1,translate:"no",children:n}),void 0!==x&&(0,r.jsx)(s.IconButton,{alt:"plan subscriber",colorway:"primary",children:(0,r.jsx)(t.default,{})}),void 0!==m&&(0,r.jsx)(l.Pill,{colorway:"primary",text:u[m]}),void 0!==R&&(0,r.jsx)(l.Pill,{text:R})]})]})}])},276887,e=>{"use strict";var r=e.i(908796),t=e.i(569910),i=e.i(596139);e.s(["convertToSalesLedPlanNameIfApplicable",0,function(e,t){if(e===`Replit ${i.replitTeamsPlanName}`){if(t?.dealType===r.OrgDealType.Enterprise)return(0,i.getEnterprisePlanDisplayName)(!1);if(t?.dealType===r.OrgDealType.EnterpriseTrial)return(0,i.getEnterprisePlanDisplayName)(!0);if(t?.dealType===r.OrgDealType.Trial)return`Replit ${i.replitTeamsPlanName} Trial`}return e},"getFormattedOrgWorkspaceName",0,({isInOrg:e,ownerName:r,maxNameLength:t=20})=>{if(!r)return"Personal Workspace";let i=r.trim();return i.length>t&&!e?"Personal Workspace":e?`${i} Workspace`:`${i}'s Workspace`},"isCappedPlan",0,function(e){return e===r.PlanId.CoreV3||e===r.PlanId.Pro},"isEnterpriseOrg",0,function(e){return e?.dealType===r.OrgDealType.Enterprise||e?.dealType===r.OrgDealType.EnterpriseTrial},"orgGroupToDisplayName",0,function(e){switch(e){case r.SystemOrgGroupType.SystemAdmins:return"Admin";case r.SystemOrgGroupType.SystemMembers:return"Member";case r.SystemOrgGroupType.SystemGuests:return"Guest";case r.SystemOrgGroupType.SystemViewers:return"Viewer";default:(0,t.default)(e)}}])},842088,e=>{e.v({input:"OrgUpgradeRequestModal-module__AkvMRq__input"})},416004,938762,e=>{"use strict";var r=e.i(276385),t=e.i(389959),i=e.i(973245),s=e.i(951262),l=e.i(304277);e.i(566901);let a={},n=i.gql`
    mutation CreateViewerUpgradeRequest($input: CreateViewerUpgradeRequestInput!) {
  createViewerUpgradeRequest(input: $input) {
    ... on ViewerUpgradeRequest {
      id
      status
    }
  }
}
    `;function o(e){let r={...a,...e};return s.useMutation(n,r)}let u=i.gql`
    query OrgViewerUpgradeRequest($orgId: String!, $upgradeRequestInput: OrgUpgradeRequestInput!) {
  currentUser {
    id
    org(orgId: $orgId) {
      ... on Org {
        id
        upgradeRequest(input: $upgradeRequestInput) {
          ... on ViewerUpgradeRequest {
            id
            status
          }
        }
      }
    }
  }
}
    `;e.s(["OrgViewerUpgradeRequestDocument",0,u,"useCreateViewerUpgradeRequestMutation",0,o,"useOrgViewerUpgradeRequestQuery",0,function(e){let r={...a,...e};return l.useQuery(u,r)}],938762);var c=e.i(709485),d=e.i(151027),p=e.i(410458),g=e.i(415541),m=e.i(643484),R=e.i(528710),x=e.i(528326),h=e.i(8047),f=e.i(61732),w=e.i(842088);e.s(["default",0,({isOpen:e,orgName:i,orgId:s,onClose:l,onSuccess:a})=>{let[n,y]=(0,t.useState)(""),{scimViewerUpgradeLink:T}=(0,p.default)(s),j=T&&!!T.trim(),[C,{loading:v}]=o({onCompleted:()=>{a()}});return(0,t.useEffect)(()=>{e&&(0,g.track)(c.events.ORG_VIEWER_SEAT_UPGRADE_MODAL_VIEWED,{orgId:s,context:(0,d.getOrgTrackingContext)({id:s})})},[e,s]),(0,r.jsx)(x.Modal,{isOpen:e,onRequestClose:l,children:(0,r.jsxs)(f.View,{gap:16,children:[(0,r.jsx)(h.Text,{variant:"subheadDefault",children:j?"Upgrade Your Access":"Request a Member Seat"}),(0,r.jsx)(h.Text,{color:"dimmer",children:j?`Get full member access to ${i}'s Replit workspace by requesting an upgrade in your company ticketing system.`:`Send a request to your team's admin for full member access in ${i}'s Replit workspace.`}),j?(0,r.jsx)(h.Text,{color:"dimmer",children:"You'll be redirected to complete the upgrade process."}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(f.View,{gap:8,children:[(0,r.jsx)(h.Text,{children:"Add a message to your request (optional)"}),(0,r.jsx)(R.Input,{clsx:w.default.input,type:"text",value:n,onChange:e=>y(e.target.value),placeholder:"Tell your admin what you want to create on Replit"})]}),(0,r.jsx)(h.Text,{color:"dimmer",children:"Until they respond you will still have limited viewer access."})]}),(0,r.jsx)(f.View,{row:!0,justify:"end",children:(0,r.jsx)(m.Button,{text:j?"Go to upgrade page":"Request upgrade",colorway:"primary",variant:"default",loading:!j&&v,isDisabled:!j&&v,onClick:()=>{j?(window.open(T,"_blank"),(0,g.track)(c.events.ORG_VIEWER_SEAT_UPGRADE_REQUESTED,{orgId:s,context:(0,d.getOrgTrackingContext)({id:s}),customUpgradeLink:!0}),l()):(C({variables:{input:{orgId:s,requestReason:n}},refetchQueries:[u]}),(0,g.track)(c.events.ORG_VIEWER_SEAT_UPGRADE_REQUESTED,{orgId:s,context:(0,d.getOrgTrackingContext)({id:s}),customUpgradeLink:!1}))}})})]})})}],416004)},192915,e=>{"use strict";var r=e.i(276385),t=e.i(157630);let i=e=>({href:{pathname:"/profile",query:{username:"string"==typeof e?e:e.username}},as:"string"==typeof e?`/@${e}`:e.url});e.s(["UserLink",0,({user:e,children:s})=>(0,r.jsx)(t.default,{...i(e),prefetch:!1,children:s}),"userLinkProps",0,i])},66982,e=>{"use strict";var r=e.i(276385),t=e.i(389959);e.i(2001);var i=e.i(480028);e.s(["ExactMatchSubString",0,({source:e,match:t})=>{if(!e.toLowerCase().includes(t.toLowerCase()))return(0,r.jsx)(r.Fragment,{children:e});let[i,s]=e.split(RegExp(`${t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}(.+)?`,"i"));return(0,r.jsx)(r.Fragment,{children:[i,(0,r.jsx)("b",{children:e.substr(i.length,t.length)},t),s]})},"HighlightMatches",0,({source:e,matches:s,matchStyle:l={fontWeight:500,color:i.tokens.foregroundDefault},style:a={color:i.tokens.foregroundDimmest,maxWidth:"100%",wordWrap:"break-word"}})=>{let n,o=0,u=[],c=function(e){return(0,r.jsx)("span",{style:l,children:e})};return s.forEach(({column:r,length:t})=>{u.push(e.slice(o,r)),u.push(c(e.slice(r,r+t))),o=r+t}),u.push(e.slice(o)),n=u.map((e,i)=>(0,r.jsx)(t.Fragment,{children:e},i)),(0,r.jsx)("span",{style:a,children:n})}])},374652,e=>{"use strict";var r=e.i(135173),t=e.i(480028);e.s(["getBorderColor",0,({replCount:e,limit:i=r.STARTER_PLAN_REPL_LIMIT})=>e/i>=.25?t.tokens.blueDimmest:t.tokens.greyDimmest,"getFillColor",0,({replCount:e,limit:i=r.STARTER_PLAN_REPL_LIMIT})=>e/i>=.25?t.tokens.blueDimmer:t.tokens.greyDimmer])},181389,931737,562888,e=>{"use strict";var r=e.i(973245),t=e.i(5004);let i=r.gql`
    fragment TemplateReplCardFooterUser on User {
  id
  username
  fullName
  image
  url
}
    `,s=r.gql`
    fragment TemplateReplCardFooterTeam on Team {
  id
  username
  image
  url
}
    `,l=r.gql`
    fragment TemplateReplCardRepl on Repl {
  id
  iconUrl
  title
  description(plainText: true)
  releasesForkCount
  templateLabel
  likeCount
  url
  owner {
    ... on User {
      id
      ...TemplateReplCardFooterUser
    }
    ... on Team {
      id
      ...TemplateReplCardFooterTeam
    }
  }
  deployment {
    id
    activeRelease {
      id
    }
  }
  publishedAs
  templateCategories {
    id
    title
  }
}
    ${i}
${s}`;e.s(["TemplateReplCardReplFragmentDoc",0,l],931737);let a=r.gql`
    fragment TemplateSelector2Repl on Repl {
  id
  url
  title
  iconUrl
  templateLabel
  nixedLanguage
  isPrivate
  isRenamed
  likeCount
  description(plainText: true)
  deployment {
    id
    activeRelease {
      id
    }
  }
  owner {
    ... on User {
      id
      username
    }
    ... on Team {
      id
      username
    }
  }
  slug
  ...TemplateReplCardRepl
}
    ${l}`;e.s(["TemplateSelector2ReplFragmentDoc",0,a],562888);var n=e.i(304277);e.i(566901);var o=e.i(951262);let u={},c=r.gql`
    fragment CreateReplFormRepl on Repl {
  id
  ...TemplateSelector2Repl
}
    ${a}`,d=r.gql`
    fragment CreateReplFormCurrentUser on CurrentUser {
  id
  url
  image
  username
  fullName
  isStaff: hasRole(role: REPLIT_STAFF)
  hasAgentRepl {
    ... on HasAgentRepl {
      hasAgentRepl
    }
  }
  replCount {
    ... on ReplCount {
      count
    }
  }
  ...ReplOwnerCurrentUser
  teams {
    id
    ...ReplOwnerTeam
  }
  favoriteCreateReplOptions {
    ... on Repl {
      id
      ...CreateReplFormRepl
    }
  }
}
    ${t.ReplOwnerCurrentUserFragmentDoc}
${t.ReplOwnerTeamFragmentDoc}
${c}`,p=r.gql`
    query CreateReplForm {
  currentUser {
    id
    ...CreateReplFormCurrentUser
  }
}
    ${d}`,g=r.gql`
    query CreateReplFormInitialRepl($replId: String!) {
  getRepl(id: $replId) {
    ... on Repl {
      id
      ...CreateReplFormRepl
    }
  }
}
    ${c}`,m=r.gql`
    mutation CreateReplFormCreateRepl($input: CreateReplInput!, $isTitleAutoGenerated: Boolean!) {
  createRepl(input: $input, isTitleAutoGenerated: $isTitleAutoGenerated) {
    ... on Repl {
      ...CreateReplFormRepl
    }
    ... on UserError {
      message
    }
  }
}
    ${c}`;e.s(["CreateReplFormCurrentUserFragmentDoc",0,d,"CreateReplFormReplFragmentDoc",0,c,"useCreateReplFormCreateReplMutation",0,function(e){let r={...u,...e};return o.useMutation(m,r)},"useCreateReplFormInitialReplQuery",0,function(e){let r={...u,...e};return n.useQuery(g,r)},"useCreateReplFormQuery",0,function(e){let r={...u,...e};return n.useQuery(p,r)}],181389)},109459,215814,e=>{"use strict";var r=e.i(276385),t=e.i(389959),i=e.i(480028),s=e.i(919073);function l({children:e,className:t,innerRef:a}){return(0,r.jsx)(s.ShadesSurface,{className:t,tag:"ul",innerRef:a,css:[{zIndex:999,maxHeight:300,position:"absolute",overflowY:"auto",width:"100%",left:0,top:i.tokens.space8,border:"1px solid",borderColor:i.tokens.outlineDimmest,listStyle:"none"}],br:8,children:e})}let a=(0,t.forwardRef)((e,t)=>(0,r.jsx)(l,{innerRef:t,...e}));a.displayName="Menu",e.s(["default",0,a],109459);var n=e.i(983420),o=e.i(967629),u=e.i(723517),c=e.i(691636),d=e.i(8047),p=e.i(61732),g=e.i(66982);let m=({highlighted:e,selected:r,taller:t})=>(0,o.css)([c.rcss.rowWithGap(8),c.rcss.align.center,c.rcss.p(8),c.rcss.borderRadius(4),{cursor:"pointer",height:t?"auto":i.tokens.space32,border:"0 !important"},e&&!r&&[u.interactive.nofill,{background:i.tokens.interactiveBackground}],r&&{backgroundColor:i.tokens.accentPrimaryDimmer,color:i.tokens.foregroundDefault,":hover":{backgroundColor:i.tokens.accentPrimaryDefault}},e&&r&&[c.rcss.backgroundColor.accentPrimaryDefault]]);e.s(["default",0,function(e){let t=e.filter?(0,r.jsx)(g.ExactMatchSubString,{source:e.title,match:e.filter}):e.title;return e.subtitle?(0,r.jsxs)(p.View,{css:m(e),children:[e.icon?(0,r.jsx)(n.IconProvider,{size:e.subtitle?24:16,children:e.icon}):null,(0,r.jsxs)(p.View,{gap:4,grow:!0,shrink:!0,children:[(0,r.jsx)(d.Text,{height:"singleLine",multiline:!1,children:t}),(0,r.jsx)(d.Text,{multiline:!1,height:"singleLine",variant:"small",color:e.selected?void 0:"dimmer",children:e.subtitle})]})]}):(0,r.jsxs)(p.View,{css:m(e),children:[e.icon?(0,r.jsx)(n.IconProvider,{size:e.subtitle?24:16,children:e.icon}):null,(0,r.jsx)(d.Text,{css:{flexShrink:1},multiline:!1,children:t})]})}],215814)},696664,e=>{"use strict";var r=e.i(973245),t=e.i(319801);let i=r.gql`
    fragment ReplViewReplActionsCurrentUser on CurrentUser {
  isModerator: hasRole(role: MODERATOR)
  isAdmin: hasRole(role: ADMIN)
}
    `,s=r.gql`
    fragment UnpublishReplRepl on Repl {
  id
  likeCount
  publishedAs
}
    `,l=r.gql`
    fragment ReplViewReplActionsPermissions on Repl {
  id
  publishedAs
  owner {
    ... on User {
      id
      username
    }
    ... on Team {
      id
      username
    }
  }
  templateReview {
    id
    promoted
  }
  authorizations {
    editFileContents {
      isAuthorized
    }
    publish {
      isAuthorized
    }
  }
  ...UnpublishReplRepl
  ...ReplLinkRepl
}
    ${s}
${t.ReplLinkReplFragmentDoc}`;e.s(["ReplViewReplActionsCurrentUserFragmentDoc",0,i,"ReplViewReplActionsPermissionsFragmentDoc",0,l])},59897,e=>{"use strict";var r=e.i(973245),t=e.i(696664),i=e.i(931737),s=e.i(304277);e.i(566901);let l={},a=r.gql`
    fragment CluiTemplateReplCurrentUser on CurrentUser {
  id
  ...ReplViewReplActionsCurrentUser
}
    ${t.ReplViewReplActionsCurrentUserFragmentDoc}`,n=r.gql`
    fragment CluiTemplateReplListRepl on Repl {
  templateCategories {
    id
    title
  }
  ...TemplateReplCardRepl
  ...ReplViewReplActionsPermissions
}
    ${i.TemplateReplCardReplFragmentDoc}
${t.ReplViewReplActionsPermissionsFragmentDoc}`,o=r.gql`
    query CluiTemplateReplSubmissions {
  currentUser {
    ...CluiTemplateReplCurrentUser
  }
}
    ${a}`;e.s(["CluiTemplateReplCurrentUserFragmentDoc",0,a,"CluiTemplateReplListReplFragmentDoc",0,n,"useCluiTemplateReplSubmissionsQuery",0,function(e){let r={...l,...e};return s.useQuery(o,r)}])},729092,e=>{"use strict";let r={padding:!0,symbols:["","K","M","G","T","P","E"]};e.s(["abbreviateNumber",0,function(e,t=1,i={padding:!1}){Array.isArray(i)&&(i={symbols:i});let{symbols:s,padding:l}=Object.assign({},r,i),a=Math.sign(e)>=0,n=Math.log10(e=Math.abs(e))/3|0;if(0===n)return(a?"":"-")+e.toString();let o=s[n];if(!o)throw RangeError();let u=(e/10**(3*n)).toFixed(t);return l||(u=String(Number(u))),(a?"":"-")+u+o}])},665439,e=>{e.v({icon:"OfficialIcon-module__5xUwQq__icon",iconBig:"OfficialIcon-module__5xUwQq__iconBig",iconSmall:"OfficialIcon-module__5xUwQq__iconSmall"})},421145,e=>{"use strict";var r=e.i(276385),t=e.i(183035),i=e.i(61732),s=e.i(665439);e.s(["default",0,function({big:e}){return(0,r.jsx)(i.View,{clsx:[s.default.icon,e?s.default.iconBig:s.default.iconSmall],children:(0,r.jsx)(t.default,{"aria-label":"Official",size:e?void 0:12})})}])},908904,e=>{"use strict";var r=e.i(276385),t=e.i(157630),i=e.i(113388),s=e.i(40916),l=e.i(761201),a=e.i(729092),n=e.i(421145),o=e.i(192915),u=e.i(967629),c=e.i(480028),d=e.i(723517),p=e.i(691636),g=e.i(766299),m=e.i(643484),R=e.i(744006),x=e.i(8047),h=e.i(21875),f=e.i(61732),w=e.i(183555),y=e.i(921125),T=e.i(365757);function j({count:e,children:t,tooltip:i}){let s=(0,a.abbreviateNumber)(e);return(0,r.jsxs)(f.View,{"aria-label":i,"data-microtip-position":"left",role:"tooltip",css:[{userSelect:"none"}],row:!0,gap:4,align:"center",children:[t,(0,r.jsx)(x.Text,{color:"dimmest",multiline:!1,children:s})]})}function C({owner:e,onLinkClick:i}){return null===e?(0,r.jsx)(h.User,{small:!0,src:null,username:"[deleted]"}):(0,r.jsx)(t.default,{...(0,o.userLinkProps)(e),css:[p.rcss.viewStyle,p.rcss.rowWithGap(4),p.rcss.position.relative,d.interactive.nofill,{color:"inherit",flexShrink:1,zIndex:1}],onClick:i,children:(0,r.jsx)(h.User,{small:!0,username:e.username,fullName:"fullName"in e?e.fullName:void 0,src:e?.image||null})})}let v=(0,u.css)({"::after":{borderRadius:c.tokens.space8,content:'""',position:"absolute",top:0,right:0,bottom:0,left:0,display:"block",zIndex:1}});e.s(["OwnerLink",0,C,"default",0,function({repl:e,onReplLinkClick:o,onOwnerLinkClick:u,linkToRepl:h=!0,hideCategory:b=!1,forkable:k=!1,..._}){let S=(0,w.useForkContext)(),U=(0,g.useIdSeed)(),P=U("title"),D=U("description");return(0,r.jsxs)(f.View,{..._,tag:"article",tabIndex:-1,css:[p.rcss.position.relative,h&&d.interactive.filledAndOutlined,!h&&[{border:"1px solid "+c.tokens.outlineDimmest},p.rcss.borderRadius(8)]],grow:!0,shrink:!0,p:12,"aria-labelledby":P,"aria-describedby":D,gap:8,children:[(0,r.jsxs)(f.View,{row:!0,gap:8,justify:"space-between",align:"start",children:[(0,r.jsx)(T.default,{surface:!0,iconUrl:e.iconUrl,alt:"",css:[{backgroundColor:d.interactive.filled.backgroundColor}]}),!b&&e.templateCategories.length&&e.templateCategories[0]?(0,r.jsx)(R.Pill,{text:e.templateCategories[0].title,translate:"no"}):null,k?(0,r.jsx)(m.Button,{text:S.isForking?"Forking...":"Use Template",onClick:()=>S.fork(),disabled:S.isForking,iconLeft:(0,r.jsx)(i.default,{}),variant:"outlined",css:[{zIndex:2}]}):null]}),(0,r.jsxs)(f.View,{row:!0,gap:8,align:"center",id:P,children:[h?(0,r.jsx)(t.default,{...(0,y.replViewLinkProps)(e),css:[{color:"inherit"},p.rcss.focusRingOnAfter,v,p.rcss.flex.shrink(1)],onClick:o,children:(0,r.jsx)(x.Text,{variant:"subheadBig",maxLines:1,translate:"no",children:e.templateLabel})}):(0,r.jsx)(x.Text,{variant:"subheadBig",css:[p.rcss.flex.shrink(1)],maxLines:1,translate:"no",children:e.templateLabel}),e.owner?.username===l.OFFICIAL_TEMPLATE_USERNAME?(0,r.jsx)(n.default,{}):null]}),(0,r.jsx)(f.View,{css:[{minHeight:66}],grow:!0,shrink:!0,justify:"end",children:(0,r.jsx)(x.Text,{color:"dimmest",maxLines:3,id:D,multiline:!1,children:e.description||"--"})}),(0,r.jsxs)(f.View,{row:!0,gap:8,justify:"space-between",children:[(0,r.jsx)(C,{owner:e.owner||null,onLinkClick:u}),(0,r.jsx)(f.View,{row:!0,gap:8,children:(0,r.jsx)(j,{count:e.releasesForkCount,tooltip:1===e.releasesForkCount?"1 repl uses this template":`${(0,a.abbreviateNumber)(e.releasesForkCount)} repls use this template`,children:(0,r.jsx)(s.default,{color:c.tokens.foregroundDimmest})})})]})]})}])},373104,849492,e=>{"use strict";var r=e.i(389959),t=e.i(908796),i=e.i(973245),s=e.i(931737),l=e.i(181389),a=e.i(59897),n=e.i(304277);e.i(566901);let o={},u=i.gql`
    fragment UseTemplatesTemplate on Repl {
  id
  ...TemplateReplCardRepl
  ...CreateReplFormRepl
  ...CluiTemplateReplListRepl
}
    ${s.TemplateReplCardReplFragmentDoc}
${l.CreateReplFormReplFragmentDoc}
${a.CluiTemplateReplListReplFragmentDoc}`,c=i.gql`
    query UseTemplates($options: TemplateRepls2QueryOptions!) {
  templateRepls2(options: $options) {
    ... on TemplateReplSearchConnection {
      items {
        __typename
        id
        ...UseTemplatesTemplate
      }
      pageInfo {
        hasNextPage
      }
      orderBy
      promotionStatus
      searchQuery
      total
      category
    }
    ... on UserError {
      message
    }
  }
}
    ${u}`;var d=e.i(619158);e.s(["default",0,function({orderBy:e=t.TemplateRepls2OrderBy.Forks,pageSize:i=12,promotionStatus:s=t.TemplateRepls2PromotionStatus.All,initialSearchValue:l="",ssr:a=!0,noBatch:u=!1,categoryId:p,debounceDuration:g="short"}){var m;let R,[x,h]=(0,r.useState)(l),f=(0,d.default)(x,"short"===g?50:200),{data:w,loading:y,error:T,fetchMore:j}=(m={variables:{options:{searchQuery:f,after:0,orderBy:e,count:i,promotionStatus:s,category:p}},notifyOnNetworkStatusChange:!0,ssr:a,context:{noBatch:u}},R={...o,...m},n.useQuery(c,R)),C=(0,r.useCallback)(async()=>{w?.templateRepls2.__typename!=="TemplateReplSearchConnection"||!w?.templateRepls2.pageInfo.hasNextPage||y||await j({variables:{options:{searchQuery:f,after:w.templateRepls2.items.length,count:i,orderBy:e,promotionStatus:s,category:p}}})},[w,j,f,e,i,y,s,p]),v=w?.templateRepls2.__typename==="TemplateReplSearchConnection"?w.templateRepls2.items:[],b=w?.templateRepls2.__typename==="UserError"?w?.templateRepls2.message:void 0;return{setSearchInputValue:h,searchInputValue:x,loadMore:C,loading:y,hasMore:w?.templateRepls2.__typename==="TemplateReplSearchConnection"&&w.templateRepls2.pageInfo.hasNextPage,error:T?"Something went wrong. Try refreshing the page.":b,templates:v,searchQuery:f}}],373104),e.s(["OrderBy",()=>t.TemplateRepls2OrderBy],849492)},79949,e=>{"use strict";var r=e.i(908796);e.s(["PromotionStatus",()=>r.TemplateRepls2PromotionStatus])},648552,e=>{"use strict";var r=e.i(389959),t=e.i(908796),i=e.i(672220),s=e.i(320216),l=e.i(151027),a=e.i(933302);e.s(["useOrgSwitcher",0,function(){let{showError:e}=(0,s.default)(),n=(0,a.useSyncStatsigOrgContext)(),o=(0,l.useSetOptimisticOrg)(),[u]=(0,i.useCurrentUserOrgContextUpdateOrgContextMutation)({refetchQueries:[{query:i.CurrentUserOrgContextDocument}],onCompleted(r){r.updateOrgContext&&"Org"!==r.updateOrgContext.__typename&&e("Something went wrong switching workspaces. Please try again.")},onError(){e("Something went wrong switching workspaces. Please try again.")}});return(0,r.useCallback)(e=>{let r=e.type===t.OrgstypeEnumType.Personal,i=r?{orgId:void 0,orgSlug:void 0,orgRole:void 0,orgDealContext:void 0}:{orgId:e.id,orgSlug:e.slug,orgRole:e.orgRole,orgDealContext:e.orgDealContext};n(i.orgId,r?void 0:e.orgDealContext.dealType),o(i),u({variables:{input:{orgId:i.orgId}}})},[n,o,u])}])},294827,e=>{"use strict";var r=e.i(908796),t=e.i(973245),i=e.i(304277);e.i(566901);let s={},l=t.gql`
    fragment PersonalWorkspacesDisabledCurrentUser on CurrentUser {
  id
  personalWorkspacesDisabled
}
    `,a=t.gql`
    query PersonalWorkspacesDisabled {
  currentUser {
    ...PersonalWorkspacesDisabledCurrentUser
  }
}
    ${l}`;e.s(["usePersonalWorkspacesDisabled",0,function(){let e,{data:t}=(e={...s,...void 0},i.useQuery(a,e)),l=t?.currentUser,n=l?.personalWorkspacesDisabled??r.PersonalWorkspacesDisabledMode.None,o=n!==r.PersonalWorkspacesDisabledMode.None;return{shouldHidePersonalWorkspace:n===r.PersonalWorkspacesDisabledMode.Personal||n===r.PersonalWorkspacesDisabledMode.Full,restrictionMode:n,isRestrictedDomain:o}}],294827)},752533,e=>{e.v({dropdownAvatarAndName:"AvatarDropdown-module__n3A4ZW__dropdownAvatarAndName",dropdownItem:"AvatarDropdown-module__n3A4ZW__dropdownItem",dropdownItemSelected:"AvatarDropdown-module__n3A4ZW__dropdownItemSelected",orgNameText:"AvatarDropdown-module__n3A4ZW__orgNameText",overflowIndicator:"AvatarDropdown-module__n3A4ZW__overflowIndicator",sectionHeader:"AvatarDropdown-module__n3A4ZW__sectionHeader",workspaceContainerWrapper:"AvatarDropdown-module__n3A4ZW__workspaceContainerWrapper",workspaceDropdownContainer:"AvatarDropdown-module__n3A4ZW__workspaceDropdownContainer"})},795859,e=>{"use strict";var r=e.i(276385),t=e.i(420180),i=e.i(389959),s=e.i(908796),l=e.i(183035),a=e.i(320216),n=e.i(648552),o=e.i(294827),u=e.i(955410),c=e.i(448942),d=e.i(276887),p=e.i(406664),g=e.i(825419),m=e.i(744006),R=e.i(8047),x=e.i(61732),h=e.i(752533);let f=({currentUser:e,selected:t,onClick:i})=>{let s=(0,p.useCreateInteractive)({variant:"listItem"});return(0,r.jsxs)(x.View,{clsx:[s.clsx,t?h.default.dropdownItemSelected:h.default.dropdownItem],style:s.style,onClick:i,row:!0,align:"center",justify:t?"space-between":void 0,px:8,py:4,children:[(0,r.jsxs)(x.View,{clsx:h.default.dropdownAvatarAndName,row:!0,align:"center",gap:8,children:[(0,r.jsx)(g.Avatar,{src:e.image,username:e.username,fullName:e.fullName,size:20}),(0,r.jsx)(R.Text,{variant:"text",color:t?"default":"dimmer",multiline:!1,clsx:h.default.orgNameText,children:"Personal"})]}),(0,r.jsx)(x.View,{align:"center",row:!0,children:t?(0,r.jsx)(l.default,{size:16}):null})]})},w=({selected:e,org:i,currentOrgId:o,groupType:f,isNewPillStyle:w=!1,onRoute:y})=>{let T=(0,p.useCreateInteractive)({variant:"listItem"}),{showError:j}=(0,a.default)(),{trackClick:C}=(0,u.useTrackClick)(),v=(0,n.useOrgSwitcher)(),{name:b,slug:k}=i,{home:_}=(0,c.orgLinks)({slug:k}),S=(0,t.useRouter)();return(0,r.jsxs)(x.View,{clsx:[T.clsx,e?h.default.dropdownItemSelected:h.default.dropdownItem],style:T.style,onClick:()=>{e||C({productArea:"workspaces",target:"switch_workspace_item",properties:{previous_workspace_type:o?"shared":"personal",target_workspace_type:"shared"}}),i.currentUserRole?(v({type:s.OrgType.Team,id:i.id,slug:i.slug,orgRole:i.currentUserRole,orgDealContext:i.dealContext}),y()):j("Something went wrong, please try again."),S.push(_.href)},row:!0,align:"center",justify:e?"space-between":void 0,px:8,py:4,children:[(0,r.jsxs)(x.View,{clsx:h.default.dropdownAvatarAndName,row:!0,align:"center",gap:8,children:[(0,r.jsx)(g.Avatar,{src:i.image??null,username:b,fullName:i.name,size:20}),(0,r.jsxs)(x.View,{row:!0,align:"center",gap:8,children:[(0,r.jsx)(R.Text,{variant:"text",color:e?"default":"dimmer",multiline:!1,translate:"no",clsx:h.default.orgNameText,children:b}),f&&w?(0,r.jsx)(m.Pill,{text:(0,d.orgGroupToDisplayName)(f),compact:!0}):null,f&&!w?(0,r.jsx)(R.Text,{variant:"small",color:"dimmest",children:(0,d.orgGroupToDisplayName)(f)}):null]})]}),(0,r.jsx)(x.View,{align:"center",row:!0,children:e?(0,r.jsx)(l.default,{size:16}):null})]})};e.s(["OrgDropdown",0,({currentUser:e,currentOrgId:l,loading:a=!1,hasOrgs:c=!1,onRoute:d})=>{let p=(0,t.useRouter)(),g=(0,i.useRef)(null),[m,y]=(0,i.useState)(!1),{shouldHidePersonalWorkspace:T}=(0,o.usePersonalWorkspacesDisabled)(),{trackClick:j}=(0,u.useTrackClick)(),C=(0,n.useOrgSwitcher)();return((0,i.useEffect)(()=>{let e=()=>{if(g.current){let{scrollHeight:e,clientHeight:r,scrollTop:t}=g.current;y(e>r&&!(t+r>=e-1))}};e(),window.addEventListener("resize",e);let r=g.current;return r&&r.addEventListener("scroll",e),()=>{window.removeEventListener("resize",e),r&&r.removeEventListener("scroll",e)}},[]),e?.orgs&&"CurrentUserOrganizationConnection"===e.orgs.__typename&&!a&&c)?(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(x.View,{children:[(0,r.jsx)(x.View,{clsx:h.default.sectionHeader,row:!0,align:"center",p:8,children:(0,r.jsx)(R.Text,{variant:"small",color:"dimmest",children:"Switch Workspace"})}),(0,r.jsxs)(x.View,{clsx:h.default.workspaceContainerWrapper,children:[(0,r.jsxs)(x.View,{innerRef:g,clsx:h.default.workspaceDropdownContainer,children:[T?null:(0,r.jsx)(f,{currentUser:e,selected:void 0===l,onClick:()=>{l&&j({productArea:"workspaces",target:"switch_workspace_item",properties:{previous_workspace_type:"shared",target_workspace_type:"personal"}}),C({type:s.OrgType.Personal}),p.push("/home","/~",{shallow:!1})}}),e.orgs.items.map(({org:e,type:t})=>(0,r.jsx)(w,{org:e,groupType:t,selected:e.id===l,currentOrgId:l,onRoute:d},e.id))]}),m?(0,r.jsx)(x.View,{clsx:h.default.overflowIndicator}):null]})]})}):null},"OrgDropdownItem",0,w,"PersonalDropdownItem",0,f])},793410,e=>{e.v({placeholder:"DefaultOrgIcon-module__jpmNua__placeholder"})},897395,644756,e=>{"use strict";var r=e.i(276385),t=e.i(389959),i=e.i(973245),s=e.i(85085),l=e.i(884033),a=e.i(304277);e.i(566901);let n={},o=i.gql`
    query GetOwnerPillOrgs {
  currentUser {
    id
    ...OrgSwitcherCurrentUser
  }
}
    ${s.OrgSwitcherCurrentUserFragmentDoc}`;function u(e){let r={...n,...e};return a.useQuery(o,r)}let c=i.gql`
    query GetOwnerPillWorkspaceDropdown {
  currentUser {
    ...WorkspaceDropdownCurrentUser
  }
}
    ${l.WorkspaceDropdownCurrentUserFragmentDoc}`;function d(e){let r={...n,...e};return a.useQuery(c,r)}e.s(["GetOwnerPillOrgsDocument",0,o,"useGetOwnerPillOrgsQuery",0,u,"useGetOwnerPillWorkspaceDropdownQuery",0,d],644756);var p=e.i(167392),g=e.i(568430),m=e.i(269848),R=e.i(151027),x=e.i(612343),h=e.i(61732),f=e.i(793410);let w=()=>(0,r.jsx)(h.View,{align:"center",justify:"center",br:"full",clsx:f.default.placeholder,children:(0,r.jsx)(x.default,{size:12})});var y=e.i(276887),T=e.i(825419),j=e.i(643484),C=e.i(773222),v=e.i(795859),b=e.i(420180),k=e.i(908796),_=e.i(40916),S=e.i(596139),U=e.i(856010),P=e.i(648552),D=e.i(294827),A=e.i(955410);e.i(450717);var I=e.i(242917),O=e.i(480028),E=e.i(406664),F=e.i(919073),L=e.i(744006),M=e.i(8047),$=e.i(158323),V=e.i(752533);let q=({onClick:e,showCoreBadge:t=!1})=>{let i=(0,E.useCreateInteractive)({variant:"listItem"});return(0,r.jsxs)(h.View,{clsx:[i.clsx,V.default.dropdownItem],style:i.style,onClick:e,row:!0,align:"center",justify:t?"space-between":void 0,px:8,py:4,gap:16,children:[(0,r.jsxs)(h.View,{clsx:V.default.dropdownAvatarAndName,row:!0,align:"center",gap:8,children:[(0,r.jsx)(h.View,{row:!0,align:"center",justify:"center",px:2,children:(0,r.jsx)(_.default,{color:O.tokens.foregroundDimmest,size:16})}),(0,r.jsx)(M.Text,{variant:"text",color:"dimmer",multiline:!1,children:"Create workspace"})]}),t?(0,r.jsx)($.default,{plan:S.corePlanName,size:"small"}):null]})},W=({currentOrgId:e,onRoute:i,currentUser:s,onlyUnifiedPlanEnabled:l=!1})=>{let a=(0,b.useRouter)(),n=(0,t.useRef)(null),[o,u]=(0,t.useState)(!1),{shouldHidePersonalWorkspace:c}=(0,D.usePersonalWorkspacesDisabled)(),{show:d}=(0,I.useGlobalModal)(),{trackClick:p}=(0,A.useTrackClick)(),g=(0,P.useOrgSwitcher)();(0,t.useEffect)(()=>{let e=()=>{if(n.current){let{scrollHeight:e,clientHeight:r,scrollTop:t}=n.current;u(e>r&&!(t+r>=e-1))}};return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[s]);let m=(0,U.useIsUnifiedPlanEnabled)({currentUser:s}),R=(e,r)=>{if(p({productArea:"workspaces",target:"open_create_workspace_modal_button",properties:{canCreateWorkspace:r}}),m&&!r){i(),d("MembershipPurchaseModal",{analyticsContext:{upgrade:{context:"header_avatar"}}});return}i(),d("CreateWorkspaceModal",{customerId:e})};(0,t.useEffect)(()=>{let e=()=>{if(n.current){let{scrollHeight:e,clientHeight:r,scrollTop:t}=n.current;u(e>r&&!(t+r>=e-1))}},r=n.current;if(r)return r.addEventListener("scroll",e),()=>r.removeEventListener("scroll",e)},[s]);let x=s.customer.orgs;if("OrgConnection"!==x.__typename||"CustomerConnection"!==s.customers.__typename)return null;let f=s.customers.items.filter(e=>e.id!==s.customer.id&&(!l||e.isUnifiedPlanEnabled));return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(h.View,{clsx:V.default.workspaceContainerWrapper,children:[(0,r.jsxs)(h.View,{innerRef:n,clsx:V.default.workspaceDropdownContainer,children:[!l||m?(0,r.jsxs)(r.Fragment,{children:[c?null:(0,r.jsx)(h.View,{clsx:V.default.sectionHeader,row:!0,align:"center",p:8,children:(0,r.jsx)(M.Text,{variant:"small",color:"dimmest",children:"Your workspaces"})}),c?null:(0,r.jsx)(v.PersonalDropdownItem,{currentUser:s,selected:void 0===e,onClick:()=>{e&&p({productArea:"workspaces",target:"switch_workspace_item",properties:{previous_workspace_type:"shared",target_workspace_type:"personal"}}),g({type:k.OrgType.Personal}),a.push("/home","/~",{shallow:!1})}}),x.items.map(t=>(0,r.jsx)(v.OrgDropdownItem,{org:t,selected:t.id===e,currentOrgId:e,isNewPillStyle:!0,onRoute:i},t.id)),s.customer.isUnifiedPlanEnabled&&!c&&s.customer.authorizations.createWorkspace.code!==k.CustomerAuthorizationCode.ScimEnabled&&s.customer.authorizations.createWorkspace.code!==k.CustomerAuthorizationCode.WorkosEnabled?(0,r.jsx)(q,{onClick:()=>R(s.customer.id,s.customer.authorizations.createWorkspace.isAuthorized),showCoreBadge:!s.customer.authorizations.createWorkspace.isAuthorized}):null]}):null,f.map(t=>{if("OrgConnection"!==t.orgs.__typename)return null;let s=t.orgs.items,l=t.name?.trim()||"",a=t.authorizations.createWorkspace.isAuthorized;return(0,r.jsxs)(F.ShadesSurface,{elevate:!1,border:{side:"top"},background:!1,children:[l?(0,r.jsxs)(h.View,{clsx:V.default.sectionHeader,row:!0,align:"center",gap:8,p:8,children:[(0,r.jsx)(M.Text,{variant:"small",color:"dimmest",children:l}),a?(0,r.jsx)(L.Pill,{text:"Admin",compact:!0}):null]}):null,s.map(t=>(0,r.jsx)(v.OrgDropdownItem,{org:t,selected:t.id===e,currentOrgId:e,groupType:!a&&t.currentUserRole?t.currentUserRole:void 0,isNewPillStyle:!0,onRoute:i},t.id)),a&&t.isUnifiedPlanEnabled?(0,r.jsx)(q,{onClick:()=>R(t.id,a)}):null]},t.id)})]}),o?(0,r.jsx)(h.View,{clsx:V.default.overflowIndicator}):null]})})};e.s(["OwnerPill",0,function({ownerName:e,image:i,currentOrgId:s,isNewDesignEnabled:l=!1,loading:a=!1,onlyUnifiedPlanEnabled:n,alignment:o,stretch:c}){let x,[h,f]=(0,t.useState)(!1),b=(0,R.useCurrentUserStoredOrgContext)(),k=!l,{data:_}=u({skip:!k}),{data:S}=d({skip:k,fetchPolicy:"cache-and-network",ssr:!1});if(k&&!_)return null;let U=_?.currentUser,P=U?.orgs,D=P?.__typename==="CurrentUserOrganizationConnection"?P.items:[];if(k&&(!U||P?.__typename!=="CurrentUserOrganizationConnection")||k&&!D.length)return null;let A=(0,r.jsx)(T.Avatar,{src:i??null,username:e,size:24}),I=(0,y.getFormattedOrgWorkspaceName)({ownerName:e,isInOrg:!!s});return x=!k&&S?.currentUser?(0,r.jsx)(W,{currentOrgId:b.orgId,currentUser:S.currentUser,onRoute:()=>{f(!1)},onlyUnifiedPlanEnabled:n}):k&&U?(0,r.jsx)(v.OrgDropdown,{currentUser:U,currentOrgId:b.orgId,loading:!1,hasOrgs:D.length>0,onRoute:()=>{f(!1)}}):(0,r.jsx)(r.Fragment,{}),(0,r.jsxs)(C.PopoverTrigger,{isOpen:h,onOpenChange:f,placement:"bottom",label:"Switch Workspace",style:{marginLeft:"-6px"},children:[(0,r.jsx)(j.Button,{style:{paddingLeft:4},borderRadius:"full",iconLeft:a?(0,r.jsx)(m.default,{}):s?i?A:(0,r.jsx)(w,{}):A,iconRight:h?(0,r.jsx)(g.default,{}):(0,r.jsx)(p.default,{}),text:a?"":I,loading:a,alignment:o,stretch:c}),x]})}],897395)},22834,e=>{"use strict";var r=e.i(276385),t=e.i(389959),i=e.i(480028),s=e.i(462229),l=e.i(691636),a=e.i(8047),n=e.i(244945),o=e.i(61732);let u=(0,s.cssRecord)({usageString:[l.rcss.fontSize(12)],title:[l.rcss.fontSize(12),l.rcss.fontWeight.medium],meterWrapper:[l.rcss.minWidth(42)],icon:[l.rcss.color.foregroundDimmest]});e.s(["UsageMeterWrapper",0,({icon:e,usageString:i,title:s,tooltip:l,children:c})=>(0,r.jsxs)(o.View,{grow:!0,row:!0,gap:8,align:"center",children:[(0,r.jsx)(o.View,{css:u.icon,children:(0,t.cloneElement)(e,{css:u.icon})}),(0,r.jsxs)(o.View,{grow:!0,gap:2,children:[(0,r.jsx)(a.Text,{height:"singleLine",color:"dimmer",css:u.title,children:s}),(0,r.jsx)(o.View,{row:!0,align:"center",gap:4,children:(0,r.jsx)(a.Text,{color:"dimmest",height:"singleLine",css:u.usageString,children:i})})]}),(0,r.jsx)(o.View,{css:u.meterWrapper,children:l?(0,r.jsx)(n.Tooltip,{tooltip:l,children:c}):c})]}),"getPercentageBorderColor",0,function({decimal:e}){return e>.25?i.tokens.blueDimmest:i.tokens.greyDimmest},"getPercentageFillColor",0,function({decimal:e}){return e>.25?i.tokens.blueDimmer:i.tokens.greyDimmer}])},882263,e=>{"use strict";var r=e.i(973245),t=e.i(304277);e.i(566901);let i={},s=r.gql`
    query GetCloudFreeUsage {
  currentUser {
    id
    cloudFreeUsageLimits {
      ... on FreemiumCloudUsageLimits {
        usage
        limit
        nextCreditsAt
      }
      ... on Error {
        message
      }
    }
  }
}
    `;e.s(["useGetCloudFreeUsage",0,function({skip:e}={}){var r;let l,{data:a,loading:n,error:o,refetch:u}=(r={skip:e},l={...i,...r},t.useQuery(s,l));return{loading:n,error:o,cloudUsage:a?.currentUser?.cloudFreeUsageLimits.__typename==="FreemiumCloudUsageLimits"?a?.currentUser?.cloudFreeUsageLimits:void 0,refetch:u}}],882263)},765269,e=>{"use strict";var r=e.i(276385),t=e.i(596139),i=e.i(135173),s=e.i(3466),l=e.i(929773),a=e.i(934440),n=e.i(882263),o=e.i(462229),u=e.i(691636),c=e.i(8047),d=e.i(61732),p=e.i(103490),g=e.i(480028),m=e.i(201894),R=e.i(22834);let x=(0,o.cssRecord)({measureBar:[u.rcss.height(10),u.rcss.borderRadius(2),u.rcss.overflow("visible")],measureBarProgress:[u.rcss.borderRadius(2),{marginTop:-1,marginLeft:-1,boxSizing:"content-box"}]}),h=({used:e=0,quota:t=1,loading:i})=>{let s=Math.min(1,e/t);return(0,r.jsx)(R.UsageMeterWrapper,{title:"Agent credits",icon:(0,r.jsx)(p.default,{}),usageString:i?"Loading...":`${Math.floor(100*s)}% used`,children:(0,r.jsx)(m.MeasureBar,{className:"measureBar",total:1,tooltipHidden:!0,current:s,loading:i,css:[x.measureBar,{".measureBarProgress":[u.rcss.border({color:(0,R.getPercentageBorderColor)({decimal:s})}),x.measureBarProgress]}],color:(0,R.getPercentageFillColor)({decimal:s}),backgroundColor:g.tokens.backgroundHigher})})};var f=e.i(490262);let w=(0,o.cssRecord)({measureBar:[u.rcss.height(10),u.rcss.borderRadius(2),u.rcss.overflow("visible")],measureBarProgress:[u.rcss.borderRadius(2),{marginTop:-1,marginLeft:-1,boxSizing:"content-box"}]}),y=({used:e=0,quota:t=1,loading:i})=>{let s=Math.min(1,e/t);return(0,r.jsx)(R.UsageMeterWrapper,{title:"Cloud credits",icon:(0,r.jsx)(f.default,{}),usageString:i?"Loading...":`${Math.floor(100*s)}% used`,children:(0,r.jsx)(m.MeasureBar,{className:"measureBar",total:1,tooltipHidden:!0,current:s,loading:i,css:[w.measureBar,{".measureBarProgress":[u.rcss.border({color:(0,R.getPercentageBorderColor)({decimal:s})}),w.measureBarProgress]}],color:(0,R.getPercentageFillColor)({decimal:s}),backgroundColor:g.tokens.backgroundHigher})})};var T=e.i(919073),j=e.i(108431);let C=2/3,v=({publicRepls:e,agentUsage:s,showReplsLimit:a=!0})=>{let n,o=(0,l.useReplLimit)(),u="data"===o.type?o.starterPlanReplLimit:i.STARTER_PLAN_REPL_LIMIT,c=(n=[],a&&n.push({type:"Apps",percentage:e/u}),n.push({type:`${t.freePlanName} plan usage`,percentage:s}),n),p=c.filter(e=>e.percentage>1),g=c.filter(e=>1===e.percentage),m=c.filter(e=>e.percentage>=.85&&e.percentage<1),R=c.filter(e=>e.percentage>=C&&e.percentage<.85),x=null;return p.length>0?x=(0,r.jsx)(T.ShadesSurface,{colorShade:"themeError",br:"container",children:(0,r.jsx)(j.StatusBanner,{text:"You've exceeded your usage limit"})}):g.length>0?x=(0,r.jsx)(T.ShadesSurface,{colorShade:"themeError",br:"container",children:(0,r.jsx)(j.StatusBanner,{text:"You've reached your usage limit"})}):m.length>0?x=(0,r.jsx)(T.ShadesSurface,{colorShade:"themeBrandInverted",br:"container",children:(0,r.jsx)(j.StatusBanner,{text:"You're nearing your usage limit"})}):R.length>0&&(x=(0,r.jsx)(T.ShadesSurface,{colorShade:"themeWarning",br:"container",children:(0,r.jsx)(j.StatusBanner,{text:"Approaching your usage limit"})})),x?(0,r.jsx)(d.View,{pb:4,children:x}):null};var b=e.i(806930),k=e.i(374652);let _=(0,o.cssRecord)({measureBar:[u.rcss.height(10),u.rcss.borderRadius(2),u.rcss.overflow("visible"),{pointerEvents:"none"}],measureBarProgress:[u.rcss.borderRadius(2),{marginTop:-1,marginLeft:-1,boxSizing:"content-box"}]}),S=({publicRepls:e,loading:t})=>{let s=e??0,a=(0,l.useReplLimit)(),n="data"===a.type?a.starterPlanReplLimit:i.STARTER_PLAN_REPL_LIMIT;return(0,r.jsx)(R.UsageMeterWrapper,{title:"Free Apps",tooltip:`You can create ${Math.max(0,n-s)} more Apps for free. Upgrade to create unlimited Public and Private Apps.`,icon:(0,r.jsx)(b.default,{}),usageString:t?"Loading...":`${s}/${n} created`,children:(0,r.jsx)(m.MeasureBar,{total:n,current:s,loading:t,color:(0,k.getFillColor)({replCount:s,limit:n}),tooltipHidden:!0,css:[_.measureBar,{".measureBarProgress":[u.rcss.border({color:(0,k.getBorderColor)({replCount:s,limit:n})}),_.measureBarProgress]}],backgroundColor:g.tokens.backgroundHigher})})},U=(0,o.cssRecord)({header:[u.rcss.display.flex,u.rcss.flex.row,u.rcss.justify.spaceBetween,u.rcss.align.center,u.rcss.pb(4),{alignSelf:"stretch"}],fontMedium:u.rcss.fontWeight.medium}),P=({publicRepls:e,replsLimitLoading:i,agentUsage:l,showReplsLimit:a=!0,cloudUsage:n})=>{let o=0;return l?.usage!==void 0&&l?.limit!==void 0&&l.limit>0&&(o=l.usage/l.limit),(0,r.jsxs)(d.View,{px:12,pt:12,pb:12,gap:8,children:[(0,r.jsx)(d.View,{css:U.header,children:(0,r.jsx)(c.Text,{css:U.fontMedium,color:"dimmer",height:"singleLine",children:"Your Starter Plan"})}),(0,r.jsx)(v,{publicRepls:e,agentUsage:o,showReplsLimit:a}),(0,r.jsxs)(d.View,{pb:4,gap:8,children:[a?(0,r.jsx)(S,{publicRepls:e,loading:i}):null,(0,r.jsx)(h,{used:l?.usage,quota:l?.limit,loading:l.loading})]}),(0,r.jsx)(d.View,{pb:4,gap:8,children:(0,r.jsx)(y,{used:n?.usage,quota:n?.limit,loading:n.loading})}),(0,r.jsx)(s.default,{dataCy:"sidebar-upgrade-btn",context:"sidebar",text:`Upgrade to Replit ${t.corePlanName}`,colorway:"primary",variant:"default",modalHeadingText:`Upgrade to Replit ${t.corePlanName}`,redirectPath:"/home"})]})};e.s(["PlanUsageMonitorUI",0,P,"default",0,()=>{let e,t,s=(0,l.useReplLimit)(),o="loading"===s.type,{agentUsage:u,agentUsageV2:c,loading:d}=(0,a.useGetAgentFreeUsage)(),{cloudUsage:p,loading:g}=(0,n.useGetCloudFreeUsage)(),m="data"===s.type?s.replCount:0,R=m/("data"===s.type?s.starterPlanReplLimit:i.STARTER_PLAN_REPL_LIMIT);return c?(e=c.usage,t=c.limit):(e=u?.usage,t=u?.limit),(0,r.jsx)(P,{agentUsage:{usage:e,limit:t,loading:d},publicRepls:m,replsLimitLoading:o,showReplsLimit:R>=.25,cloudUsage:{usage:p?.usage,limit:p?.limit,loading:g}})}],765269)},748538,e=>{"use strict";var r=e.i(973245),t=e.i(951262);let i={},s=r.gql`
    fragment EditReplFormRepl on Repl {
  id
  title
  description
  imageUrl
  iconUrl
  isPrivate
  owner {
    __typename
  }
  templateInfo {
    iconUrl
    imageUrl
  }
  authorizations {
    editMetadata {
      isAuthorized
      code
      message
    }
    editVisibility {
      isAuthorized
      code
      message
    }
  }
  org {
    id
    type
  }
}
    `,l=r.gql`
    mutation EditReplFormEdit($input: UpdateReplInput!) {
  updateRepl(input: $input) {
    repl {
      id
      ...EditReplFormRepl
    }
  }
}
    ${s}`;e.s(["EditReplFormReplFragmentDoc",0,s,"useEditReplFormEditMutation",0,function(e){let r={...i,...e};return t.useMutation(l,r)}])},517414,317349,781258,80593,e=>{"use strict";var r=e.i(973245),t=e.i(951262);let i={},s=r.gql`
    fragment DeleteReplDialogRepl on Repl {
  id
  title
}
    `,l=r.gql`
    mutation DeleteReplDialogReplDelete($id: String!) {
  deleteRepl(id: $id) {
    id
  }
}
    `;e.s(["DeleteReplDialogReplFragmentDoc",0,s,"useDeleteReplDialogReplDeleteMutation",0,function(e){let r={...i,...e};return t.useMutation(l,r)}],317349);var a=e.i(748538),n=e.i(304277);e.i(566901);let o={},u=r.gql`
    fragment TransferReplToOrgDialogRepl on Repl {
  id
  title
  slug
  owner {
    ... on User {
      id
      username
    }
    ... on Team {
      id
      username
    }
  }
}
    `,c=r.gql`
    query TransferReplToOrgDialogOrgs {
  currentUser {
    id
    orgs(count: 30) {
      __typename
      ... on CurrentUserOrganizationConnection {
        items {
          org {
            id
            name
            slug
            image
            type
          }
          type
        }
      }
      ... on Error {
        message
      }
    }
  }
}
    `,d=r.gql`
    mutation TransferReplToOrgDialogTransfer($orgId: String!, $replIds: [String!]!) {
  transferReplToOrganization(input: {orgId: $orgId, replIds: $replIds}) {
    ... on TransferReplToOrganizationSuccess {
      runId
      results {
        replId
        success
        error
      }
      successCount
      errorCount
    }
    ... on UnauthorizedError {
      message
    }
    ... on UserError {
      message
    }
    ... on TooManyRequestsError {
      message
    }
  }
}
    `;e.s(["TransferReplToOrgDialogReplFragmentDoc",0,u,"useTransferReplToOrgDialogOrgsQuery",0,function(e){let r={...o,...e};return n.useQuery(c,r)},"useTransferReplToOrgDialogTransferMutation",0,function(e){let r={...o,...e};return t.useMutation(d,r)}],781258);let p={},g=r.gql`
    fragment LeaveMultiplayerReplDialogRepl on Repl {
  id
  title
}
    `,m=r.gql`
    mutation LeaveMultiplayerReplDialogRemove($id: String!) {
  removeSharedRepl(replId: $id) {
    id
  }
}
    `;e.s(["LeaveMultiplayerReplDialogReplFragmentDoc",0,g,"useLeaveMultiplayerReplDialogRemoveMutation",0,function(e){let r={...p,...e};return t.useMutation(m,r)}],80593);let R={},x=r.gql`
    fragment ComponentsReplActionsFeaturedRepl on Repl {
  id
  isPrivate
  isFeaturedRepl
  publicForkCount
  timeUpdated
  org {
    id
  }
}
    `,h=r.gql`
    fragment ComponentsReplActions on Repl {
  id
  url
  title
  slug
  user {
    id
    username
  }
  ...DeleteReplDialogRepl
  ...EditReplFormRepl
  ...ComponentsReplActionsFeaturedRepl
  ...TransferReplToOrgDialogRepl
  ...LeaveMultiplayerReplDialogRepl
  owner {
    __typename
    ... on Team {
      id
    }
    ... on User {
      id
    }
  }
  org {
    id
  }
  isStarred
  isCurrentUserStarred
  isStackTemplate
  authorizations {
    deleteRepl {
      isAuthorized
    }
    editFolder {
      isAuthorized
    }
    fork {
      isAuthorized
    }
    removeSelf {
      isAuthorized
    }
    star {
      isAuthorized
    }
  }
}
    ${s}
${a.EditReplFormReplFragmentDoc}
${x}
${u}
${g}`,f=r.gql`
    mutation ReplActionsUpdateRepl($input: UpdateReplInput!) {
  updateRepl(input: $input) {
    repl {
      id
      isStarred
    }
  }
}
    `,w=r.gql`
    mutation ReplActionsToggleReplPin($input: ToggleReplPinInput!) {
  toggleReplPin(input: $input) {
    ... on Repl {
      id
      isCurrentUserStarred
    }
    ... on Error {
      message
    }
  }
}
    `,y=r.gql`
    mutation AddOrgStackTemplate($orgId: String!, $replId: String!, $order: Float) {
  addOrgStackTemplate(orgId: $orgId, replId: $replId, order: $order) {
    success
    message
    repl {
      id
      isStackTemplate
    }
  }
}
    `,T=r.gql`
    mutation RemoveOrgStackTemplate($orgId: String!, $replId: String!) {
  removeOrgStackTemplate(orgId: $orgId, replId: $replId) {
    success
    message
    repl {
      id
      isStackTemplate
    }
  }
}
    `,j=r.gql`
    mutation ReplActionsMoveToFolder($replIds: [String!]!, $folderIds: [String!]!, $destFolderId: String!) {
  moveItemsToFolder(
    replIds: $replIds
    folderIds: $folderIds
    destFolderId: $destFolderId
  ) {
    ... on Repl {
      __typename
      id
      folderId
    }
  }
}
    `;e.s(["ComponentsReplActionsFragmentDoc",0,h,"useAddOrgStackTemplateMutation",0,function(e){let r={...R,...e};return t.useMutation(y,r)},"useRemoveOrgStackTemplateMutation",0,function(e){let r={...R,...e};return t.useMutation(T,r)},"useReplActionsMoveToFolderMutation",0,function(e){let r={...R,...e};return t.useMutation(j,r)},"useReplActionsToggleReplPinMutation",0,function(e){let r={...R,...e};return t.useMutation(w,r)},"useReplActionsUpdateReplMutation",0,function(e){let r={...R,...e};return t.useMutation(f,r)}],517414)},145275,e=>{e.v({paginationRow:"IndexPagination-module__t95pHW__paginationRow",surface:"IndexPagination-module__t95pHW__surface"})},222826,e=>{"use strict";var r=e.i(276385),t=e.i(389959),i=e.i(656077),s=e.i(927600),l=e.i(269848),a=e.i(919073),n=e.i(488299),o=e.i(334353),u=e.i(8047),c=e.i(61732),d=e.i(145275);e.s(["default",0,({currentPage:e,pageSize:p,totalItems:g,goToNextPage:m,goToPreviousPage:R})=>{let{loading:x}=(0,t.useContext)(o.IndexContext),h=Math.max(Math.ceil(g/p),1),f=(0,t.useRef)(null),w=(0,t.useRef)(40);return(0,t.useLayoutEffect)(()=>{f.current&&(w.current=f.current.offsetHeight+1)},[f]),(0,r.jsx)(a.ShadesSurface,{clsx:d.default.surface,style:{minHeight:w.current},innerRef:f,elevate:!1,children:(0,r.jsx)(c.View,{clsx:d.default.paginationRow,row:!0,gap:8,p:8,align:"center",justify:"center",children:x?(0,r.jsx)(l.default,{}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.IconButton,{alt:"Previous page",disabled:0===e,onClick:R,children:(0,r.jsx)(i.default,{})}),(0,r.jsxs)(u.Text,{variant:"small",color:"dimmer",children:["Page ",e+1," of ",h]}),(0,r.jsx)(n.IconButton,{alt:"Next page",disabled:e>=h-1,onClick:m,children:(0,r.jsx)(s.default,{})})]})})})}])},906595,e=>{e.v({root:"ReplResult-module__xjVmeG__root"})},407617,e=>{"use strict";var r=e.i(276385),t=e.i(157630),i=e.i(389959),s=e.i(2001),l=e.i(595996),a=e.i(480028),n=e.i(61732),o=e.i(618457),u=e.i(921125),c=e.i(906595);let d=(0,a.cvarsFrom)("ReplResult.module.css",["--height"]);function p({repl:e,height:a,isActive:g,searchQuery:m}){let{title:R}=e,x=(0,i.useMemo)(()=>m?s.default.match(m,R):null,[m,R]);return(0,r.jsx)(t.default,{...(0,u.replLinkProps)(e),children:(0,r.jsxs)(n.View,{clsx:c.default.root,row:!0,gap:6,px:6,style:{[d.height]:a+"px"},align:"center",children:[(0,r.jsx)(l.default,{alt:e.title,size:32,iconUrl:e.iconUrl}),(0,r.jsx)(n.View,{grow:!0,shrink:!0,gap:2,translate:"no",children:(0,r.jsx)(o.HighlightMatches,{text:e.title,highlight:x?.ranges,dimmed:!g})})]})})}e.s(["ReplResult",0,p,"toReplResult",0,function(e,t,i){var s,a;return{match:(s=e,a=t,()=>({score:1,render:{height:44,content:(0,r.jsx)(p,{repl:a,height:44,searchQuery:s})}})),data:{type:"action",label:t.title,icon:(0,r.jsx)(l.default,{alt:t.title,size:16,iconUrl:t.iconUrl}),run:()=>i(t)}}}])},877925,e=>{e.v({clickable:"PromoCard-module__J8rxZW__clickable",subtitle:"PromoCard-module__J8rxZW__subtitle",title:"PromoCard-module__J8rxZW__title"})},121668,e=>{"use strict";var r=e.i(276385),t=e.i(336187),i=e.i(406664),s=e.i(919073),l=e.i(8047),a=e.i(61732),n=e.i(877925);function o({title:e,label:i}){return(0,r.jsxs)(a.View,{gap:4,px:16,py:12,children:[(0,r.jsxs)(a.View,{row:!0,align:"center",gap:6,children:[(0,r.jsx)(t.default,{size:16}),(0,r.jsx)(l.Text,{clsx:n.default.title,children:e})]}),(0,r.jsx)(l.Text,{clsx:n.default.subtitle,children:i})]})}function u({title:e,label:t,onClick:l}){let a=(0,i.useCreateInteractive)({variant:"nofill"});return(0,r.jsx)(s.ShadesSurface,{tag:"button",type:"button",colorShade:"themeNotice",elevate:"2x",border:"subtle",br:8,clsx:[a.clsx,n.default.clickable],style:a.style,onClick:l,children:(0,r.jsx)(o,{title:e,label:t})})}e.s(["PromoCard",0,function({onClick:e,title:t,label:i}){return e?(0,r.jsx)(u,{title:t,label:i,onClick:e}):(0,r.jsx)(s.ShadesSurface,{colorShade:"themeNotice",elevate:"2x",border:"subtle",br:8,children:(0,r.jsx)(o,{title:t,label:i})})}])},33602,e=>{"use strict";var r,t=e.i(908796),i=e.i(462229),s=e.i(691636),l=e.i(127384);let a=(0,i.cssRecord)({pageHeader:[s.rcss.flex.row,s.rcss.justify.spaceBetween,s.rcss.align.center],pageHeaderOrgName:[s.rcss.maxWidth(240)],pageHeaderActions:[s.rcss.rowWithGap(8),s.rcss.align.center],pageTitle:[s.rcss.rowWithGap(8),s.rcss.align.center,s.rcss.flex.growAndShrink(1)],pageTitleText:[s.rcss.maxWidth("100%"),s.rcss.flex.growAndShrink(1)],pageContent:[s.rcss.colWithGap(32)],pageSection:[s.rcss.colWithGap(12)],pageSidebarOffset:[{paddingLeft:l.SIDEBAR_WIDTH}],sidebarSectionHeaderText:[s.rcss.p(8),s.rcss.px(16),{fontWeight:500}],indexTableWrapper:[s.rcss.display.flex,s.rcss.position.relative,s.rcss.justify.spaceBetween,s.rcss.overflow("auto"),s.rcss.width("100%")],onboardingSurface:[s.rcss.p(12),s.rcss.borderRadius(),s.rcss.border()],tooltipWrapper:[s.rcss.rowWithGap(8),s.rcss.align.center],searchBar:[s.rcss.maxWidth(400)]});t.SystemOrgGroupType.SystemAdmins,t.SystemOrgGroupType.SystemMembers,t.SystemOrgGroupType.SystemGuests;var n=((r={}).Index="Index",r.OrgGroup="OrgGroup",r);e.s(["NUM_ORGS_PER_PAGE",0,20,"SidebarType",()=>n,"orgStyles",0,a,"sortSystemGroups",0,e=>[t.Org_GroupstypeEnumType.SystemAdmins,t.Org_GroupstypeEnumType.SystemMembers,t.Org_GroupstypeEnumType.SystemGuests].reduce((r,t)=>{let i=e.find(e=>e.type===t);return i&&r.push(i),r},[])])}]);

//# debugId=d58a5902-4056-b0c8-513d-448994605622
//# sourceMappingURL=013mbe4p2gxav.js.map