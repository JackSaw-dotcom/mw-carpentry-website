;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="baded48e-ce05-f206-9bfd-c76316e9f248")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,5004,e=>{"use strict";var t=e.i(973245);let i=t.gql`
    fragment CreateReplAuthorizations on OrgAuthorizations {
  __typename
  createPrivateRepl: createRepl(private: true) {
    __typename
    isAuthorized
    message
    code
  }
  createPublicRepl: createRepl(private: false) {
    __typename
    isAuthorized
    message
    code
  }
  paidAgent: useAiAgent(tier: paid) {
    __typename
    isAuthorized
    message
    code
  }
  freeAgent: useAiAgent(tier: free) {
    __typename
    isAuthorized
    message
    code
  }
  turboAgentModel: useTurbo {
    __typename
    isAuthorized
    message
    code
  }
  defaultAdvancedAgentModel: defaultAdvancedAgentModel {
    __typename
    isAuthorized
    message
    code
  }
}
    `,r=t.gql`
    fragment OrgReplOwnerOrg on Org {
  id
  name
  type
  slug
  image
  dealContext {
    dealType
    salesContactEmail
  }
  authorizations {
    ...CreateReplAuthorizations
    ... on OrgAuthorizations {
      editPaymentMethod {
        isAuthorized
      }
      deleteOrg {
        isAuthorized
      }
    }
  }
  groups(input: {types: [system_viewers]}) {
    ... on OrgGroupConnection {
      items {
        id
        type
        isMember
      }
    }
  }
}
    ${i}`,a=t.gql`
    fragment ReplOwnerTeam on Team {
  id
  username
  image
  archived
  capabilities {
    isEducationPlan
  }
  authorizations {
    ...CreateReplAuthorizations
  }
}
    ${i}`,n=t.gql`
    fragment ReplOwnerCurrentUser on CurrentUser {
  id
  username
  fullName
  image
  isSubscribed
  timeCreated
  personalOrgAuthorizations {
    ...CreateReplAuthorizations
  }
  orgs(count: 50) {
    __typename
    ... on CurrentUserOrganizationConnection {
      items {
        org {
          ...OrgReplOwnerOrg
        }
        type
      }
    }
    ... on Error {
      message
    }
  }
  teams {
    id
    ...ReplOwnerTeam
  }
}
    ${i}
${r}
${a}`;e.s(["CreateReplAuthorizationsFragmentDoc",0,i,"OrgReplOwnerOrgFragmentDoc",0,r,"ReplOwnerCurrentUserFragmentDoc",0,n,"ReplOwnerTeamFragmentDoc",0,a])},585790,e=>{"use strict";var t=e.i(973245),i=e.i(304277),r=e.i(566901);let a={},n=t.gql`
    query ReplGateUserAuthz {
  currentUser {
    id
    isSubscribed
    replCount {
      ... on ReplCount {
        count
      }
      ... on Error {
        message
      }
    }
    freeTeams {
      id
    }
    proTeamOrgs: teamOrganizations(subscriptionType: PRO) {
      id
    }
    personalOrgAuthorizations {
      ... on OrgAuthorizations {
        createRepl(private: false) {
          isAuthorized
          message
          code
        }
      }
    }
  }
}
    `;e.s(["ReplGateUserAuthzDocument",0,n,"useReplGateUserAuthzLazyQuery",0,function(e){let t={...a,...e};return r.useLazyQuery(n,t)},"useReplGateUserAuthzQuery",0,function(e){let t={...a,...e};return i.useQuery(n,t)}])},135173,e=>{"use strict";e.s(["STARTER_PLAN_REPL_LIMIT",0,10])},929773,e=>{"use strict";var t=e.i(585790),i=e.i(135173),r=e.i(151027);e.i(933302);let a=i.STARTER_PLAN_REPL_LIMIT;e.s(["useReplLimit",0,()=>{let{data:e,loading:i,refetch:n}=(0,t.useReplGateUserAuthzQuery)({ssr:!1,fetchPolicy:"network-only"}),o=(0,r.useCurrentUserStoredOrgContext)().orgId;if(i)return{type:"loading"};if(e&&e?.currentUser?.personalOrgAuthorizations.__typename==="OrgAuthorizations"&&"ReplCount"===e.currentUser.replCount.__typename){let{replCount:{count:t},personalOrgAuthorizations:{createRepl:{isAuthorized:i}},isSubscribed:r,freeTeams:s,proTeamOrgs:l}=e.currentUser;return{type:"data",canCreateRepl:i,refetch:n,replCount:t,starterPlanReplLimit:a,isStarterUser:!r,shouldBlockReplForm:!(s.length+l.length>0)&&!r&&!i&&void 0===o}}return{type:"error"}}])},743446,e=>{"use strict";var t=e.i(389959);e.s(["useOwner",0,(e,i,r={includeLegacyTeams:!0})=>{var a,n;let o,s,l=(a=e,n=r,o="CurrentUserOrganizationConnection"===a.orgs.__typename?a.orgs.items.map(e=>e.org):[],s=a.teams,[a,...o,...n.includeLegacyTeams?s:[]]),[d,c]=(0,t.useState)(i??e.id),[u,p]=(0,t.useState)(i);return i!==u&&(p(i),c(i??e.id)),[l.find(e=>e.id===d)??e,e=>{c(e.id)},l]}])},390180,e=>{"use strict";var t=e.i(276385),i=e.i(967629),r=e.i(480028),a=e.i(723517),n=e.i(8047),o=e.i(61732);let s=(0,i.css)([a.interactive.filled,{padding:r.tokens.space8},{color:r.tokens.foregroundDefault,borderColor:r.tokens.outlineDimmest,border:"1 solid",outline:"0 none",fontSize:r.tokens.fontSizeDefault,lineHeight:"16px",display:"block",width:"100%","::placeholder":{color:r.tokens.foregroundDimmer},":not([disabled])":{cursor:"text"}}]);e.s(["Label",0,function(e){return(0,t.jsx)(o.View,{tag:"label",htmlFor:e.for,children:(0,t.jsx)(n.Text,{multiline:!1,children:e.children})})},"inputCss",0,s])},274323,e=>{"use strict";var t,i=e.i(276385),r=e.i(785240),a=e.i(908796),n=e.i(399245),o=e.i(480028),s=e.i(462229),l=e.i(691636),d=e.i(766299),c=e.i(825419),u=e.i(94824),p=e.i(8047),m=e.i(61732);let g=(0,s.cssRecord)({radioGroup:[{[l.media.max("tabletMax")]:[l.rcss.colWithGap(8)],[l.media.min("tabletMax")]:[l.rcss.display.grid,{gridTemplateColumns:"1fr 1fr",gap:o.tokens.space8,gridAutoFlow:"column"}]}],radioContainer:[l.rcss.rowWithGap(8),l.rcss.align.start,l.rcss.p(8),l.rcss.border({style:"solid",color:o.tokens.outlineDimmest,width:1}),l.rcss.borderRadius(8)],radio:[l.rcss.pt(2)],labelAndIconRow:[l.rcss.rowWithGap(4),l.rcss.align.center],label:[l.rcss.flex.shrink(1)],unauthorizedText:[l.rcss.color.foregroundDimmest]});var h=((t=h||{}).Public="public",t.Private="private",t);e.s(["default",0,function({isPrivate:e,setIsPrivate:t,privacyAuthz:{privateRepl:s,publicRepl:l},org:h}){let x=(0,d.useIdSeed)(),f=x("private"),v=x("public"),y=h.type===a.OrgstypeEnumType.Personal?"Only you":`Only ${h.name} workspace members`,R=`${y} can see this Repl. You choose who can edit.`;return(0,i.jsxs)(m.View,{gap:8,children:[(0,i.jsx)(r.Label,{htmlFor:"privacy",children:(0,i.jsx)(p.Text,{children:"Privacy"})}),(0,i.jsxs)(u.RadioGroup,{tag:"fieldset",css:g.radioGroup,name:"privacy",value:e?"private":"public",onChange:e=>{t("private"===e.target.value)},children:[(0,i.jsxs)(m.View,{css:g.radioContainer,children:[(0,i.jsx)(m.View,{css:g.radio,children:(0,i.jsx)(u.Radio,{id:f,value:"private",disabled:!s.isAuthorized})}),(0,i.jsxs)(m.View,{grow:!0,shrink:!0,gap:4,children:[(0,i.jsx)(r.Label,{htmlFor:f,children:(0,i.jsxs)(m.View,{css:g.labelAndIconRow,children:[(0,i.jsxs)(p.Text,{multiline:!1,css:g.label,color:s.isAuthorized?"default":"dimmer",children:["Internal to ",h.name]}),(0,i.jsx)(c.Avatar,{src:h.image??null,username:h.name,size:16})]})}),(0,i.jsx)(p.Text,{multiline:!0,variant:"small",color:"dimmer",css:!s.isAuthorized&&g.unauthorizedText,children:s.isAuthorized?R:s.message})]})]}),(0,i.jsxs)(m.View,{css:g.radioContainer,children:[(0,i.jsx)(m.View,{css:g.radio,children:(0,i.jsx)(u.Radio,{id:v,value:"public",disabled:!l.isAuthorized})}),(0,i.jsxs)(m.View,{grow:!0,shrink:!0,gap:4,children:[(0,i.jsx)(r.Label,{htmlFor:v,children:(0,i.jsxs)(m.View,{css:g.labelAndIconRow,children:[(0,i.jsx)(p.Text,{color:l.isAuthorized?"default":"dimmer",children:"Public to Replit"}),(0,i.jsx)(n.default,{size:16,color:l.isAuthorized?o.tokens.foregroundDefault:o.tokens.foregroundDimmer})]})}),(0,i.jsx)(p.Text,{multiline:!0,variant:"small",color:"dimmer",css:!l.isAuthorized&&g.unauthorizedText,children:l.isAuthorized?"Anyone can see this Repl. You choose who can edit.":l.message})]})]})]})]})}])},804843,667116,314413,e=>{"use strict";var t=e.i(276385),i=e.i(399245),r=e.i(995691),a=e.i(416298),n=e.i(390180);function o(e,t){return e?t?"Only you and your team can see and edit this App.":"Only you can see and edit this App.":"Anyone can view and fork this App."}e.s(["default",0,o],667116);var s=e.i(480028),l=e.i(462229),d=e.i(691636),c=e.i(766299),u=e.i(94824),p=e.i(8047),m=e.i(61732);let g=({isPrivate:e,isTeam:i})=>(0,t.jsx)(p.Text,{variant:"small",color:"dimmest",children:o(e,i)}),h=(0,l.cssRecord)({radioGroup:[{[d.media.max("tabletMin")]:[d.rcss.colWithGap(8)],[d.media.min("tabletMin")]:[d.rcss.display.grid,{gridTemplateColumns:"1fr 1fr",gap:s.tokens.space8,gridAutoFlow:"column"}]}],radioContainer:[d.rcss.rowWithGap(8),d.rcss.align.start,d.rcss.p(8),d.rcss.border({style:"solid",color:s.tokens.outlineDimmest,width:1}),d.rcss.borderRadius(8)],radio:[d.rcss.pt(2)],labelAndIconRow:[d.rcss.rowWithGap(4),d.rcss.align.center],label:[d.rcss.flex.shrink(1)]}),x=({isPrivate:e,setIsPrivate:a,privacyAuthz:o})=>{let l=(0,c.useIdSeed)();return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.Label,{for:l("privacy"),children:"Privacy"}),(0,t.jsxs)(u.RadioGroup,{tag:"fieldset",css:h.radioGroup,name:l("privacy"),value:e?"Private":"Public",onChange:e=>{a("Private"===e.target.value)},dataCy:"create-repl-privacy-toggle",children:[(0,t.jsxs)(m.View,{css:h.radioContainer,children:[(0,t.jsx)(m.View,{css:h.radio,children:(0,t.jsx)(u.Radio,{id:l("public"),value:"Public",disabled:!o.publicRepl.isAuthorized,dataCy:"privacy-toggle-public"})}),(0,t.jsxs)(m.View,{grow:!0,shrink:!0,gap:4,children:[(0,t.jsx)(n.Label,{for:l("public"),children:(0,t.jsxs)(m.View,{css:h.labelAndIconRow,children:[(0,t.jsx)(i.default,{size:16,color:o.publicRepl.isAuthorized?s.tokens.foregroundDefault:s.tokens.foregroundDimmer}),(0,t.jsx)(p.Text,{color:o.publicRepl.isAuthorized?"default":"dimmer",children:"Public"})]})}),(0,t.jsx)(p.Text,{multiline:!0,variant:"small",color:"dimmer",children:o.publicRepl.isAuthorized?"Anyone can view and fork this App.":o.publicRepl.message})]})]}),(0,t.jsxs)(m.View,{css:h.radioContainer,children:[(0,t.jsx)(m.View,{css:h.radio,children:(0,t.jsx)(u.Radio,{id:l("private"),value:"Private",dataCy:"privacy-toggle-private",onChange:e=>{e.preventDefault(),a(!0)}})}),(0,t.jsxs)(m.View,{grow:!0,shrink:!0,gap:4,children:[(0,t.jsx)(n.Label,{for:l("private"),children:(0,t.jsxs)(m.View,{css:h.labelAndIconRow,children:[(0,t.jsx)(r.default,{}),(0,t.jsx)(p.Text,{multiline:!1,css:h.label,children:"Private"})]})}),(0,t.jsx)(p.Text,{multiline:!0,variant:"small",color:"dimmer",children:"Only you can see and edit this App."})]})]})]})]})};e.s(["Privacy",0,function({isPrivate:e,setIsPrivate:i,privacyAuthz:r,isTeam:n}){return r.privateRepl.isAuthorized||r.publicRepl.isAuthorized?(0,t.jsxs)(m.View,{gap:8,children:[(0,t.jsx)(x,{isPrivate:e,setIsPrivate:i,privacyAuthz:r}),(0,t.jsx)(g,{isPrivate:e,isTeam:n})]}):(0,t.jsx)(m.View,{gap:8,children:(0,t.jsxs)(p.Text,{variant:"small",color:"dimmest",children:[(0,t.jsx)(a.default,{size:12})," ",r.publicRepl.message]})})}],804843);var f=e.i(389959),v=e.i(973245);e.i(304277);var y=e.i(566901);let R={},w=v.gql`
    fragment ForkReplReplAuthorization on ReplAuthorization {
  isAuthorized
  code
  message
}
    `,j=v.gql`
    query ForkReplAuthorizations($originReplId: String!, $destinationOrgId: String, $destinationIsPersonal: Boolean, $destinationTeamId: Int) {
  getRepl(id: $originReplId) {
    ... on Repl {
      id
      authorizations {
        createPrivateRepl: fork(
          input: {destinationOrgId: $destinationOrgId, destinationIsPersonal: $destinationIsPersonal, destinationTeamId: $destinationTeamId, isPrivate: true}
        ) {
          ...ForkReplReplAuthorization
        }
        createPublicRepl: fork(
          input: {destinationOrgId: $destinationOrgId, destinationIsPersonal: $destinationIsPersonal, destinationTeamId: $destinationTeamId, isPrivate: false}
        ) {
          ...ForkReplReplAuthorization
        }
      }
    }
  }
}
    ${w}`;var C=e.i(908796),A=e.i(569910);let b={__typename:"OrgAuthorization",isAuthorized:!1,message:"Not authorized",code:C.OrgAuthorizationCode.InsufficientPermissions},_={privateRepl:b,publicRepl:b};e.s(["usePrivate",0,function(e,t){let i=function({owner:e,originReplId:t}){let i,[r,{data:a,loading:n}]=(i={...R,...void 0},y.useLazyQuery(j,i));if((0,f.useEffect)(()=>{t&&r({variables:{originReplId:t,destinationOrgId:"Org"===e.__typename?e.id:void 0,destinationIsPersonal:"CurrentUser"===e.__typename||void 0,destinationTeamId:"Team"===e.__typename?e.id:void 0},fetchPolicy:"cache-and-network",nextFetchPolicy:"cache-first"})},[e,t,r]),a?.getRepl.__typename==="Repl"&&!n)return{privateRepl:a.getRepl.authorizations.createPrivateRepl,publicRepl:a.getRepl.authorizations.createPublicRepl};switch(e.__typename){case"CurrentUser":return"OrgAuthorizations"===e.personalOrgAuthorizations.__typename?{privateRepl:e.personalOrgAuthorizations.createPrivateRepl,publicRepl:e.personalOrgAuthorizations.createPublicRepl}:_;case"Org":return{privateRepl:e.authorizations.createPrivateRepl,publicRepl:e.authorizations.createPublicRepl};case"Team":return"OrgAuthorizations"===e.authorizations.__typename?{privateRepl:e.authorizations.createPrivateRepl,publicRepl:e.authorizations.createPublicRepl}:_;default:(0,A.default)(e)}}({owner:e,originReplId:t}),[r,a]=(0,f.useState)(i.privateRepl.isAuthorized);return(0,f.useEffect)(()=>{a(i.privateRepl.isAuthorized)},[i.privateRepl.isAuthorized]),{isPrivate:r,setIsPrivate:a,privacyAuthz:i,isValidPrivacy:r?i.privateRepl.isAuthorized:i.publicRepl.isAuthorized}}],314413)},636393,e=>{"use strict";var t=e.i(596139),i=e.i(135173),r=e.i(929773),a=e.i(242917);e.s(["useUpgradeModal",0,function(){let{show:e}=(0,a.useGlobalModal)(),n=(0,r.useReplLimit)(),o="data"===n.type?n.starterPlanReplLimit:i.STARTER_PLAN_REPL_LIMIT;return{showUpgradeModal:async({onUpgradeConfirm:i,centered:r})=>{await e("MembershipPurchaseModal",{headingText:"Upgrade for more Projects",subHeadingText:`Upgrade to Replit ${t.corePlanName} to create more than ${o} Projects`,analyticsContext:{upgrade:{context:"repl_limit_upsell"}},onPurchaseComplete:i,centered:r})}}}])},457461,e=>{e.v({checked:"Radio-module__SG7TTa__checked",container:"Radio-module__SG7TTa__container",input:"Radio-module__SG7TTa__input"})},94824,e=>{"use strict";var t=e.i(276385),i=e.i(389959),r=e.i(480028),a=e.i(406664),n=e.i(61732),o=e.i(457461);let s=(0,i.createContext)(null),l=(0,r.cvarsFrom)("Radio.module.css",["--bg"]),d=n.SpecializedView.input;e.s(["Radio",0,function({onChange:e,id:c,checked:u,disabled:p,name:m,value:g,...h}){let x=(0,i.useContext)(s);x&&(m=m??x.name,u=u??x.value===g,e=e??x.onChange,p=p??x.disabled);let f=(0,a.useCreateInteractive)({variant:"filledAndOutlined"}),v=p?r.tokens.outlineDefault:r.tokens.accentPrimaryDefault;return(0,t.jsxs)(n.View,{clsx:o.default.container,style:{[l.bg]:v},children:[(0,t.jsx)(d,{id:c,name:m,value:g,type:"radio",checked:u,disabled:p,onChange:t=>e?.(t),clsx:[o.default.input,f.clsx],style:f.style,...h}),u?(0,t.jsx)(n.View,{clsx:o.default.checked}):null]})},"RadioGroup",0,function({name:e,value:i,disabled:r,onChange:a,children:o,tag:l,className:d}){return(0,t.jsx)(n.View,{tag:l,className:d,children:(0,t.jsx)(s.Provider,{value:{value:i,name:e,onChange:a,disabled:r},children:o})})}])},481148,e=>{e.v({self:"LimitedInputLabel-module__zIizLq__self"})},925654,e=>{"use strict";var t=e.i(276385),i=e.i(8047),r=e.i(481148);e.s(["default",0,({maxLength:e=140,value:a="",hideLabel:n=!1})=>(0,t.jsxs)(i.Text,{clsx:r.default.self,multiline:!1,color:"dimmer",children:[a.length," / ",e," ",n?"":"characters"]})])},278340,e=>{e.v({authModal:"AuthModal-module__xolHdG__authModal",modalDescription:"AuthModal-module__xolHdG__modalDescription"})},143530,e=>{"use strict";var t=e.i(276385),i=e.i(389959),r=e.i(134494),a=e.i(446389),n=e.i(8047),o=e.i(61732),s=e.i(278340);e.s(["AuthDialogContent",0,({loginTitle:e,signupTitle:l,description:d,tracking:c,onSuccess:u=()=>{}})=>{let[p,m]=(0,i.useState)("signup");(0,i.useEffect)(()=>{(0,a.loadStytchDfpScript)()},[]);let g=(0,i.useMemo)(()=>"login"===p?e:l,[p,e,l]);return(0,t.jsxs)(o.View,{align:"center",justify:"center",gap:24,px:16,py:32,clsx:s.default.authModal,"data-cy":"auth-modal",children:[g?(0,t.jsx)(n.Header,{variant:"headerDefault",level:1,children:g}):null,d?(0,t.jsx)(n.Text,{variant:"subheadDefault",clsx:s.default.modalDescription,children:d}):null,(0,t.jsx)(r.default,{customHeader:void 0!==g,isModal:!0,mode:p,onModeChange:e=>m(e),onSuccess:u,seededEmail:void 0,initialTenantId:void 0,tracking:c})]})},"authModalParam",0,"authModal"])},402841,e=>{"use strict";e.s(["REPL_DESCRIPTION_MAX_LENGTH",0,1e3])},560775,e=>{e.v({connectorRow:"ConnectorConfigurationPage-module__burcuG__connectorRow"})},195966,e=>{e.v({bannerWrapper:"ReplLimitBanner-module__pZCTsa__bannerWrapper"})},901730,e=>{"use strict";var t=e.i(276385),i=e.i(389959),r=e.i(830675),a=e.i(973245),n=e.i(5004),o=e.i(304277);e.i(566901);let s={},l=a.gql`
    fragment ForkModalCurrentUser on CurrentUser {
  id
  url
  image
  username
  fullName
  ...ReplOwnerCurrentUser
  teams {
    id
    ...ReplOwnerTeam
  }
}
    ${n.ReplOwnerCurrentUserFragmentDoc}
${n.ReplOwnerTeamFragmentDoc}`,d=a.gql`
    query ForkModal($originReplId: String!) {
  currentUser {
    id
    ...ForkModalCurrentUser
  }
  getRepl(id: $originReplId) {
    ... on Repl {
      id
      authorizations {
        viewDatabase {
          isAuthorized
          message
        }
      }
      connectors {
        __typename
        ... on ReplConnectors {
          connectorNames
        }
        ... on Error {
          message
        }
      }
    }
  }
}
    ${l}`;var c=e.i(269848),u=e.i(898039),p=e.i(335451),m=e.i(29822),g=e.i(486898),h=e.i(90319),x=e.i(542757),f=e.i(70734),v=e.i(829706),y=e.i(246549),R=e.i(643484),w=e.i(528326),j=e.i(108431),C=e.i(8047),A=e.i(61732),b=e.i(727223),_=e.i(560775);function T({connectorNames:e,onRemix:r,onCancel:a,isForking:n=!1,orgId:o}){let s=!!o,{connections:l,connectorConfigs:d,token:k,loading:P,refetch:z}=(0,y.useConnectors)(),[I,O]=(0,i.useState)(!1),[S,L]=(0,i.useState)(""),[E,M]=(0,i.useState)(null),[D,V]=(0,i.useState)(!1),[F,N]=(0,i.useState)(!1),[U]=(0,p.useCreateConnectionMutation)(),[$]=(0,m.useCreateOrgConnectionMutation)(),G=(0,i.useMemo)(()=>{let t=e=>d.find(t=>t.connectorName===e)||null,i=[];return[...new Set(e)].forEach(e=>{if((0,v.isAppScopedConnector)(e)){let r=t(e);i.push({connectorName:e,displayName:r?.displayName??e.replace(/_/g," ").toLowerCase().replace(/\b\w/g,e=>e.toUpperCase()),iconPath:r?.iconPath,isConfigured:!1,isAppScoped:!0,connectorType:"connectorConfig",connectorConfig:r??void 0});return}let r=l.find(t=>t.connectorName===e);if(r)i.push({connectorName:e,displayName:r.displayName,iconPath:r.iconPath,isConfigured:!0,isAppScoped:!1,connectorType:"connection",connectionId:r.connectionId});else{let r=t(e);i.push({connectorName:e,displayName:r?.displayName??e.replace(/_/g," ").toLowerCase().replace(/\b\w/g,e=>e.toUpperCase()),iconPath:r?.iconPath,isConfigured:!1,isAppScoped:!1,connectorType:"connectorConfig",connectorConfig:r??void 0})}}),i},[e,l,d]),B=(0,i.useMemo)(()=>G.every(e=>e.isConfigured||e.isAppScoped),[G]),q=(0,i.useMemo)(()=>G.filter(e=>e.isConfigured&&e.connectionId).map(e=>e.connectionId).filter(e=>void 0!==e),[G]),W=(0,i.useMemo)(()=>G.filter(e=>e.isAppScoped).map(e=>e.displayName),[G]),H=W.length>0,Q=(0,i.useCallback)(async e=>{if("connect.connection-connected"===e.name){if(!s){await U({variables:{input:{connectionId:e.data.connection_id,orgId:null}}}),await z();return}o&&(await $({variables:{input:{connectionId:e.data.connection_id,orgId:o}}}),await z())}},[$,U,s,o,z]),Y=(0,i.useCallback)((e,t)=>{O(e)},[]);return P?(0,t.jsx)(A.View,{gap:16,children:(0,t.jsx)(C.Text,{children:"Loading connector information..."})}):F?(0,t.jsxs)(A.View,{gap:16,children:[(0,t.jsx)(C.Text,{variant:"subheadDefault",children:"Some connectors are not set up"}),(0,t.jsx)(C.Text,{color:"dimmer",children:"You have not configured all required connectors. Your app may not work as expected. Do you want to continue without setting up all connectors?"}),(0,t.jsxs)(A.View,{row:!0,gap:12,justify:"end",children:[(0,t.jsx)(R.Button,{variant:"nofill",text:"Go back",type:"button",onClick:()=>N(!1)}),(0,t.jsx)(R.Button,{colorway:"primary",text:"Continue without connectors",type:"button",onClick:()=>{N(!1),r(q)}})]})]}):(0,t.jsxs)(A.View,{gap:16,children:[(0,t.jsx)(C.Text,{children:"This template uses connectors to integrate with external services. To ensure your remixed app works properly, please make sure you have all required connectors configured."}),(0,t.jsx)(A.View,{gap:12,children:G.map(e=>(0,t.jsxs)(A.View,{row:!0,align:"center",justify:"space-between",gap:16,p:12,br:8,clsx:_.default.connectorRow,children:[(0,t.jsxs)(A.View,{row:!0,align:"start",gap:12,shrink:!0,children:[e.iconPath?(0,t.jsx)(b.default,{width:24,height:24,src:e.iconPath,alt:e.displayName}):null,(0,t.jsxs)(A.View,{gap:4,shrink:!0,children:[(0,t.jsx)(C.Text,{variant:"subheadDefault",children:e.displayName}),v.CONNECTOR_DESCRIPTIONS[e.connectorName]?(0,t.jsx)(C.Text,{variant:"small",color:"dimmer",children:v.CONNECTOR_DESCRIPTIONS[e.connectorName]}):null]})]}),e.isConfigured?(0,t.jsxs)(A.View,{row:!0,align:"center",gap:8,shrink:0,children:[(0,t.jsx)(g.default,{size:8,color:"green"}),(0,t.jsx)(C.Text,{variant:"small",color:"dimmer",multiline:!1,children:"Active"})]}):e.isAppScoped?(0,t.jsxs)(A.View,{row:!0,align:"center",gap:8,shrink:0,children:[(0,t.jsx)(g.default,{size:8,color:"grey"}),(0,t.jsx)(C.Text,{variant:"small",color:"dimmer",multiline:!1,children:"Pending setup"})]}):(0,t.jsx)(R.Button,{iconLeft:(0,t.jsx)(h.default,{}),variant:"outlined",colorway:"primary",size:"small",text:"Sign in",onClick:()=>{var t;(t=e).connectorConfig&&!s&&"api_key"===t.connectorConfig.type?(M(t.connectorConfig),V(!0)):(L(t.connectorName),O(!0))}})]},e.connectorName))}),H?(0,t.jsx)(j.StatusBanner,{colorway:"primary",text:`${W.join(", ")} ${1===W.length?"requires":"require"} app-specific setup. After remixing, type "/" in Agent chat to add ${1===W.length?"this integration":"these integrations"}.`}):null,B?null:(0,t.jsx)(A.View,{}),(0,t.jsxs)(A.View,{row:!0,gap:12,justify:"end",children:[(0,t.jsx)(R.Button,{onClick:a,text:"Cancel",type:"button"}),(0,t.jsx)(R.Button,{dataCy:"fork-btn",colorway:"primary",type:"button",onClick:()=>{B?r(q):N(!0)},disabled:n,text:"Remix App",loading:n,iconLeft:n?(0,t.jsx)(c.default,{}):(0,t.jsx)(u.default,{})})]}),k?(0,t.jsx)(f.AddIntegrationModal,{isOpen:I,setIsOpen:Y,token:k,selectedConnector:S,onEvent:Q}):null,E&&D?(0,t.jsx)(w.Modal,{isOpen:!0,onRequestClose:()=>{V(!1),M(null)},children:(0,t.jsx)(x.ConnectorSetupForm,{connector:E,onComplete:async()=>{V(!1),M(null),await z()}})}):null]})}var k=e.i(390180),P=e.i(274323),z=e.i(804843),I=e.i(743446),O=e.i(314413),S=e.i(929773),L=e.i(712903),E=e.i(596139),M=e.i(636393),D=e.i(195966);let V=({isIndividualOwner:e,showUpgradeForm:i,replLimitCtx:r})=>{let{showUpgradeModal:a}=(0,M.useUpgradeModal)();if(!e||"loading"===r.type||"error"===r.type)return null;let{replCount:n,isStarterUser:o,starterPlanReplLimit:s}=r;if(!o)return null;let l=n>=s?`(${n}/${s}) You've hit the limit for Apps in the Starter Plan. Upgrade to Replit ${E.corePlanName} for unlimited Apps!`:`You have created ${n}/${s} Apps. Click here to upgrade to Replit ${E.corePlanName} for unlimited Apps!`;return(0,t.jsx)(A.View,{tag:"button",clsx:D.default.bannerWrapper,onClick:async e=>{e.preventDefault(),i?i():await a({onUpgradeConfirm:r.refetch})},children:(0,t.jsx)(j.StatusBanner,{icon:(0,t.jsx)(L.default,{}),colorway:"yellow",text:l})})};var F=e.i(151027),N=e.i(371884),U=e.i(402841),$=e.i(462229),G=e.i(691636),B=e.i(766299),q=e.i(825419),W=e.i(86145),H=e.i(528710),Q=e.i(925654);let Y=(0,$.cssRecord)({loadingAndErrorWrapper:[G.rcss.display.flex,G.rcss.flex.growAndShrink(1),G.rcss.center,G.rcss.gap(8),G.rcss.py(16)],fieldLabel:[G.rcss.flex.row,G.rcss.justify.spaceBetween,G.rcss.align.end],fieldError:[G.rcss.color.accentNegativeStronger],descriptionTextArea:[G.rcss.minHeight(96),G.rcss.maxHeight(128),{resize:"vertical"}]}),X=e=>{let{onFork:r,hideModal:a,initialTitle:n,initialDescription:o="",currentUser:s,template:l,keepOpenOnFork:d=!1,isForking:p,orgId:m,defaultOrgId:g,originReplId:h,replLimitCtx:x,onReachedReplLimit:f,hasConnectors:v,connectorNames:y,canCopyDatabase:w}=e,[b,_]=(0,i.useState)("form"),S=(0,i.useRef)(null),L=(0,B.useIdSeed)(),[E]=(0,I.useOwner)(s,m??g),{isPrivate:M,setIsPrivate:D,privacyAuthz:F,isValidPrivacy:$}=(0,O.usePrivate)(E,h),G="CurrentUser"===E.__typename&&E.id===s.id,X=G&&"data"===x.type&&!x.canCreateRepl;(0,i.useEffect)(()=>{X&&f()},[X,f]);let K=(0,N.useFormField)(n,e=>{if(e&&e.length>60)return{message:"Must be no longer than 60 characters"}}),Z=(0,N.useFormField)(o,e=>{if(e&&e.length>U.REPL_DESCRIPTION_MAX_LENGTH)return{message:`Must be no longer than ${U.REPL_DESCRIPTION_MAX_LENGTH} characters`}}),J=(0,N.useFormField)(!0,()=>void 0);(0,i.useEffect)(()=>{S.current&&S.current.focus()},[S]);let ee="Team"===E.__typename?E.id:null,et="Org"===E.__typename?E.name:E.username,ei="CurrentUser"===E.__typename?E.fullName:void 0,er=E.image??null,ea=!!(K.error||Z.error)||p||!$,en=(0,i.useMemo)(()=>v?{text:"Continue",icon:void 0}:l?{text:"Use Framework",icon:(0,t.jsx)(u.default,{})}:{text:"Remix App",icon:(0,t.jsx)(u.default,{})},[v,l]);return X?null:v&&"connectors"===b?(0,t.jsxs)(A.View,{gap:16,children:[(0,t.jsx)(C.Header,{variant:"headerDefault",level:2,children:l?`Create with ${n}`:"Remix App"}),(0,t.jsx)(T,{connectorNames:y,onRemix:e=>{!(K.validate()||Z.validate())&&(r({teamId:ee,title:K.value.trim(),description:Z.value,isPrivate:M,orgId:"Org"===E.__typename?E.id:void 0,connectionIds:e,copyDatabase:w?J.value:void 0}),d||a())},isForking:p,onCancel:a,orgId:g})]}):(0,t.jsx)("form",{onSubmit:e=>{if(e.preventDefault(),!(K.validate()||Z.validate())){if(v&&"form"===b)return void _("connectors");r({teamId:ee,title:K.value.trim(),description:Z.value,isPrivate:M,orgId:"Org"===E.__typename?E.id:void 0,connectionIds:[],copyDatabase:w?J.value:void 0}),d||a()}},children:(0,t.jsxs)(A.View,{gap:16,children:[(0,t.jsx)(C.Header,{variant:"headerDefault",level:2,children:l?`Create with ${n}`:"Remix App"}),l?(0,t.jsx)(j.StatusBanner,{colorway:"yellow",text:(0,t.jsx)(A.View,{children:(0,t.jsxs)(C.Text,{variant:"small",children:["When starting from a template, Agent provides fewer guardrails and automated workflows. You may encounter unexpected issues that require manual troubleshooting or code editing."," ",(0,t.jsx)("a",{href:"https://docs.replit.com/replitai/general-agent",target:"_blank",children:"Learn more"})]})})}):null,(0,t.jsxs)(A.View,{gap:16,children:[(0,t.jsxs)(A.View,{gap:4,children:[(0,t.jsxs)(A.View,{css:Y.fieldLabel,children:[(0,t.jsx)(k.Label,{for:L("name"),children:"Name"}),(0,t.jsx)(Q.default,{maxLength:60,value:K.value,hideLabel:!0})]}),(0,t.jsx)(H.Input,{ref:S,className:"repl-title-input",placeholder:"Name your App",onChange:e=>K.setValue(e.target.value),onFocus:e=>e.target.select(),value:K.value,onBlur:K.handleBlur,id:L("name")}),K.error?(0,t.jsx)(C.Text,{css:Y.fieldError,multiline:!1,children:K.error.message}):null]}),(0,t.jsxs)(A.View,{gap:4,children:[(0,t.jsxs)(A.View,{css:Y.fieldLabel,children:[(0,t.jsx)(k.Label,{for:L("description"),children:"Description"}),(0,t.jsx)(Q.default,{hideLabel:!0})]}),(0,t.jsx)(H.MultiLineInput,{maxLength:U.REPL_DESCRIPTION_MAX_LENGTH,value:Z.value,onChange:e=>Z.setValue(e.target.value),placeholder:"What does this App do?",css:Y.descriptionTextArea,id:L("description")})]}),w?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(A.View,{css:Y.fieldLabel,children:(0,t.jsx)(k.Label,{for:L("copyDatabase"),children:"Database"})}),(0,t.jsxs)(A.View,{row:!0,gap:8,align:"start",children:[(0,t.jsx)(W.Checkbox,{id:L("copyDatabase"),checked:J.value,onChange:e=>J.setValue(e),"aria-label":"Copy database data to new App"}),(0,t.jsxs)(A.View,{shrink:!0,children:[(0,t.jsx)("label",{htmlFor:L("copyDatabase"),children:(0,t.jsx)(C.Text,{variant:"small",multiline:!1,children:"Copy data from original App"})}),(0,t.jsx)(C.Text,{variant:"small",color:"dimmest",children:"The remixed App's database will be initialized with your current data and schema. Note that this is a copy and any changes you make to the remixed App's database will not affect your original database."})]})]})]}):null]}),"Org"===E.__typename?(0,t.jsx)(P.default,{isPrivate:M,setIsPrivate:D,privacyAuthz:F,org:E}):(0,t.jsx)(z.Privacy,{isPrivate:M,setIsPrivate:D,privacyAuthz:F,isTeam:!!ee}),(0,t.jsxs)(A.View,{gap:8,children:[(0,t.jsx)(C.Text,{children:"Owner"}),(0,t.jsxs)(A.View,{row:!0,align:"center",gap:8,children:[(0,t.jsx)(q.Avatar,{src:er,size:16,username:et,fullName:ei}),(0,t.jsx)(C.Text,{children:et})]})]}),(0,t.jsx)(V,{replLimitCtx:x,isIndividualOwner:G}),(0,t.jsxs)(A.View,{row:!0,gap:12,justify:"end",children:[(0,t.jsx)(R.Button,{onClick:a,text:"Cancel",type:"button"}),(0,t.jsx)(R.Button,{dataCy:"fork-btn",colorway:"primary",type:"submit",disabled:"loading"===x.type||X||ea,text:en.text,iconLeft:p||"loading"===x.type?(0,t.jsx)(c.default,{}):en.icon})]})]})})};e.s(["default",0,function({onReachedReplLimit:e,defaultOrgId:i,...a}){var n;let l,{orgId:u}=(0,F.useCurrentUserStoredOrgContext)(),{data:p,loading:m,error:g}=(n={variables:{originReplId:a.originReplId},fetchPolicy:"cache-and-network",ssr:!1,onError:e=>{r.withScope(t=>{t.setTag("fork-modal",!0),r.captureException(e)})}},l={...s,...n},o.useQuery(d,l)),h=(0,S.useReplLimit)();if(m&&!p||"loading"===h.type)return(0,t.jsxs)(A.View,{css:Y.loadingAndErrorWrapper,children:[(0,t.jsx)(c.default,{}),(0,t.jsx)(C.Text,{color:"dimmer",multiline:!1,children:"Loading template data..."})]});if(g)return(0,t.jsx)(C.Text,{multiline:!1,children:"Something went wrong."});if(!p)return null;let{currentUser:x}=p;if(!x)return r.captureException(Error("ForkModal was presented to an unauthed user")),(0,t.jsx)(j.StatusBanner,{colorway:"negative",text:"You must be logged in to fork this App"});let f=p.getRepl,v=f?.__typename==="Repl"&&f.connectors?.__typename==="ReplConnectors"&&f.connectors.connectorNames.length>0,y=f?.__typename==="Repl"&&f.connectors?.__typename==="ReplConnectors"?f.connectors.connectorNames:[],R=f?.__typename==="Repl"&&f.authorizations?.viewDatabase?.isAuthorized;return(0,t.jsx)(X,{...a,defaultOrgId:i??u,canCopyDatabase:R,replLimitCtx:h,currentUser:x,onReachedReplLimit:e,hasConnectors:v,connectorNames:y})}],901730)},579926,e=>{"use strict";var t=e.i(276385),i=e.i(596139),r=e.i(919073),a=e.i(269377);e.s(["default",0,({shouldBlockReplForm:e,onClose:n,context:o})=>(0,t.jsx)(r.ShadesSurface,{py:10,elevate:!1,children:(0,t.jsx)(a.default,{analyticsContext:{upgrade:{context:o??"create_repl_modal"}},headingText:"Need to create more Apps?",subHeadingText:`Upgrade to Replit ${i.corePlanName} for unlimited Apps`,isFullscreen:!1,onBack:e?void 0:n})})])},714562,e=>{"use strict";var t=e.i(973245),i=e.i(951262);let r={},a=t.gql`
    mutation ForkReplCreateRepl($input: CreateReplInput!, $isTitleAutoGenerated: Boolean) {
  createRepl(input: $input, isTitleAutoGenerated: $isTitleAutoGenerated) {
    ... on Repl {
      id
      org {
        id
      }
      url
      isPrivate
      language
      nextPagePathname
      config {
        isAgentRepl
      }
      origin {
        id
        isOwner
      }
      source {
        release {
          id
          repl {
            id
            title
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
        }
      }
    }
    ... on UserError {
      message
    }
  }
}
    `;e.s(["useForkReplCreateReplMutation",0,function(e){let t={...r,...e};return i.useMutation(a,t)}])},871203,e=>{"use strict";var t,i=((t={}).Initializing="initialize",t.Connecting="connect",t.GettingInitialConfig="get init config",t.ImportingMigrationTemplate="import migration template",t.MergeDotReplit="merge dot replit",t.ExecingPostMigration="exec post migration",t.UpdatingLanguage="set language",t.Finished="finished",t.Failed="error",t);e.s(["Progress",()=>i,"shouldMigrateReplToNix",0,function(e){return"nix"!==e.language}])},370511,e=>{"use strict";var t,i=e.i(761201),r=((t=r||{}).Community="community",t.Official="official",t);e.s(["getTemplateTrackingType",0,function(e){return e.owner?.username===i.OFFICIAL_TEMPLATE_USERNAME?"official":"community"}])},183555,738522,e=>{"use strict";var t=e.i(276385),i=e.i(420180),r=e.i(389959),a=e.i(143530),n=e.i(901730),o=e.i(579926),s=e.i(570438),l=e.i(714562),d=e.i(871203),c=e.i(151027),u=e.i(320216),p=e.i(370511),m=e.i(415541),g=e.i(709485),h=e.i(540742),x=e.i(921125);function f({onFork:e,onError:t,replLinkOptions:a}={}){let n=(0,i.useRouter)(),{showError:o}=(0,u.default)(),s=(0,h.default)(),[v,y]=(0,l.useForkReplCreateReplMutation)({onCompleted:t=>{let i=t?.createRepl.__typename==="Repl"?t.createRepl:null;if(!i)return;e&&e(t);let r=(0,d.shouldMigrateReplToNix)(i);if("/replEnvironmentDesktop"===n.pathname||"/replEnvironmentMobile"===n.pathname||"/replView"===n.pathname&&r){window.location.href=(0,x.replLinkFullUrl)(i,a);return}let o=(0,x.replLinkProps)(i,a);n.push({...o.href,pathname:s},o.as)}}),R=y.data?.createRepl.__typename==="UserError"?y.data?.createRepl.message:y.error?.message;return(0,r.useEffect)(()=>{R&&(o(R??"Failed to fork repl"),t&&t())},[R,o,t]),[(0,r.useCallback)(({originId:e,replReleaseId:t,teamId:i,title:r,description:a,isPrivate:n,folderId:o,trackingData:s,forkToPersonal:l,orgId:d,connectionIds:u,copyDatabase:h,isTitleAutoGenerated:x})=>{(0,m.track)(g.events.FORK_REQUESTED,s),v({variables:{isTitleAutoGenerated:x,input:{originId:e,replReleaseId:t,teamId:i,title:r,isPrivate:n,description:a,folderId:o,forkToPersonal:l,gitRemoteUrl:"",orgId:d,connectionIds:u,copyDatabase:h}}}).then(i=>{let r=i.data?.createRepl.__typename==="Repl"?i.data.createRepl:null;r&&(0,m.track)(g.events.REPL_CREATED,{isSignup:!1,isOnboarding:!1,...s,isForked:!0,isPrivate:r.isPrivate,replId:r.id,isRenamed:!1,language:r.language,isSelfForked:!!r.origin?.isOwner,isTemplateFork:!!t,originId:e,templateReplId:r.source?.release?.repl?.id||void 0,templateTitle:r.source?.release?.repl?.title,templateOwner:r.source?.release?.repl?.owner?.username,templateType:r.source?.release?.repl?(0,p.getTemplateTrackingType)(r.source.release.repl):void 0,orgContext:(0,c.getOrgTrackingContext)(r.org?{id:r.org.id}:void 0)})})},[v]),{loading:!!y.loading||!!y.data&&"Repl"===y.data.createRepl.__typename}]}e.s(["default",0,f],738522);var v=e.i(776065),y=e.i(528326);let R=(0,r.createContext)({isForking:!1,fork:()=>{}});e.s(["ForkContextProvider",0,({children:e,forkParams:l,navigateAfterFork:d=!0,onFork:c,repl:p,template:m,autorun:g=!1})=>{let h=(0,i.useRouter)(),{showError:x}=(0,u.default)(),w=(0,s.useCurrentUserId)(),j=(0,v.useQueryParam)("forkRepl","string"),C=(0,v.useQueryParam)("forkContext","string"),[A,b]=(0,r.useState)(),_=(0,r.useMemo)(()=>null===w,[w]),T=l.trackingData.forkSource,[k,{loading:P}]=f({replLinkOptions:{autorun:g},navigateAfterFork:d,onFork:c,onError:()=>{x("Error forking App")}}),z=(0,r.useCallback)(async()=>{_?(await (0,v.updatePathWithQueryParams)({router:h,params:[{mode:"add",key:"forkRepl",value:p.id},{mode:"add",key:"forkContext",value:T}]}),b("auth")):b("fork")},[_,p.id,h,T]),I=(0,r.useCallback)(async()=>{await (0,v.updatePathWithQueryParams)({router:h,params:[{mode:"delete",key:"forkRepl"},{mode:"delete",key:"forkContext"}]}),b(void 0)},[h]);(0,r.useEffect)(()=>{j===p.id&&C===T&&(_?b("auth"):b("fork"))},[j,C,_,p.id,T]);let O=(0,r.useCallback)(()=>b("limited"),[]);return(0,t.jsxs)(R.Provider,{value:{isForking:P,fork:z},children:[e,(0,t.jsxs)(y.Modal,{isOpen:void 0!==A,onRequestClose:()=>I(),maxWidth:"limited"===A?1e3:y.DEFAULT_MODAL_MAX_WIDTH,noPadding:"limited"===A,children:["limited"===A?(0,t.jsx)(o.default,{shouldBlockReplForm:!0,onClose:()=>I(),context:"fork_modal_limit_reached"}):null,"auth"===A?(0,t.jsx)(a.AuthDialogContent,{loginTitle:"Log in to Remix this App",signupTitle:"Sign up to Remix this App",onSuccess:()=>b("fork"),tracking:{from:T,location:l.trackingData.location??"fork"}}):null,"fork"===A?(0,t.jsx)(n.default,{onReachedReplLimit:O,hideModal:()=>I(),onFork:({teamId:e,title:t,description:i,isPrivate:r,orgId:a,connectionIds:n,copyDatabase:o})=>k({originId:p.id,teamId:e,title:t,description:i,isPrivate:r,forkToPersonal:null===e&&null==a,orgId:a,connectionIds:n,copyDatabase:o,...l}),initialTitle:p.title,initialDescription:p.description??void 0,orgId:p.org?.id,template:m,originReplId:p.id}):null]})]})},"useForkContext",0,()=>(0,r.useContext)(R)],183555)}]);

//# debugId=baded48e-ce05-f206-9bfd-c76316e9f248
//# sourceMappingURL=0~22gmnh_wn00.js.map