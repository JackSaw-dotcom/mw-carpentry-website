;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="f464c1df-58b1-ee52-4b50-f7ba61e2d4f3")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,561646,e=>{"use strict";var t=e.i(730497);e.s(["usePricingFlags",0,function(){return{"flag-cheaper-core":(0,t.useFlag)({controlName:"flag-cheaper-core",default:!1}),"flag-revised-plans-q1-2026":(0,t.useFlag)({controlName:"flag-revised-plans-q1-2026",default:!1})}}])},972152,e=>{"use strict";let t="razorpay";e.s(["CHECKOUT_PAYMENT_PROVIDER_RAZORPAY",0,t,"COUNTRY_PROVIDER_MAP",0,{IN:t}])},229375,e=>{"use strict";var t=e.i(420180),n=e.i(568087),r=e.i(596139),o=e.i(561646);e.s(["usePlanCheckoutUrl",0,function(e){let a=(0,t.useRouter)(),s=function(e,t){if(e.prefix===r.corePlanPrefix){let n=(0,r.getCheckoutablePriceOption)({...e,flags:t});if(!n)throw Error(`Core price not found for interval ${e.interval}`);return`stripe-checkout-by-price/${n.externalId}`}let n=(0,r.getCheckoutablePriceOption)({...e,flags:t});if(!n)throw Error(`Pro price not found for interval ${e.interval}, tier ${e.tier}`);return`stripe-checkout-by-price/${n.externalId}`}(e,(0,o.usePricingFlags)()),i=a.query[n.BONSAI_VERSION_QUERY_PARAM],c=Array.isArray(i)?i[0]:i;return function({path:e,coupon:t,source:r,successRedirectPath:o,cancelRedirectPath:a,vBonsai:s}){let i=new URLSearchParams;t&&i.set("coupon",t),r&&i.set("source",r),o&&i.set("successRedirectPath",o),a&&i.set("cancelRedirectPath",a),s&&i.set(n.BONSAI_VERSION_QUERY_PARAM,s);let c=i.toString();return`/${e}${c?`?${c}`:""}`}({path:s,source:e.source,coupon:e.coupon,successRedirectPath:e.successRedirectPath,cancelRedirectPath:e.cancelRedirectPath,vBonsai:c})}],229375)},982728,e=>{"use strict";function t(){if(document.getElementById("razorpay-color-scheme-fix"))return;let e=document.createElement("style");e.id="razorpay-color-scheme-fix",e.textContent='iframe[src*="razorpay"] { color-scheme: light; }\n#rzp-sdk-root, .rzp-sdk-root { color-scheme: light; }',document.head.appendChild(e)}let n=new Map;function r(e){let t=n.get(e);if(t)return t;document.querySelector(`script[src="${e}"]`)?.remove();let r=new Promise((t,r)=>{let o=document.createElement("script");o.src=e,o.onload=()=>{n.delete(e),t()},o.onerror=()=>{n.delete(e),r(Error(`Failed to load script: ${e}`))},document.head.appendChild(o)});return n.set(e,r),r}async function o(){t(),window.RZPCrossBorderPrePay||(await r("https://checkout.razorpay.com/v1/checkout.js"),await r("https://cross-border-cdn.razorpay.com/custom-pre-payment-module/build/browser/rzp-xb-pre-pay-module.min.js"))}e.s(["MERCHANT_IMAGE",0,"https://replit.com/public/images/replit-logo.png","MERCHANT_NAME",0,"Replit","MERCHANT_THEME",0,{color:"#232430"},"injectRazorpayColorSchemeFix",0,t,"loadRazorpayScript",0,o,"loadScript",0,r])},326523,e=>{"use strict";var t=e.i(389959),n=e.i(973245),r=e.i(304277);e.i(566901);let o={},a=n.gql`
    query RegionalPaymentProviderCountry {
  country
}
    `;function s(e){let t={...o,...e};return r.useQuery(a,t)}var i=e.i(972152),c=e.i(730497),l=e.i(776065);e.s(["useRegionalPaymentProvider",0,function(){let e=(0,c.useFlag)({controlName:"flag-razorpay-checkout",default:!1}),n=(0,l.useQueryParam)("payment_region","string"),{data:r,refetch:o}=s({skip:!e}),a=(0,t.useRef)(null);if((0,t.useEffect)(()=>{e&&a.current!==n&&(a.current=n,o())},[e,n,o]),!e)return null;let u=r?.country??"",d=i.COUNTRY_PROVIDER_MAP[u]??null;return null===d?null:d},"useUserCountry",0,function(){let{data:e}=s();return e?.country??null}],326523)},911261,e=>{"use strict";var t=e.i(972152),n=e.i(420180),r=e.i(389959),o=e.i(973245),a=e.i(951262);let s={},i=o.gql`
    mutation ConfirmRazorpayCheckout($input: ConfirmRazorpayCheckoutInput!) {
  confirmRazorpayCheckout(input: $input)
}
    `,c=o.gql`
    mutation CreateReplitPlanCheckoutSessionForRazorpay($input: CreateReplitPlanCheckoutSessionInput!) {
  createReplitPlanCheckoutSession(input: $input) {
    ... on RazorpayCheckoutSessionResult {
      checkoutToken
      keyId
      checkoutSessionId
      currency
      prefillName
      prefillEmail
      amount
    }
    ... on UserError {
      message
    }
    ... on UnauthorizedError {
      message
    }
    ... on TooManyRequestsError {
      message
    }
  }
}
    `;var l=e.i(320216),u=e.i(982728),d=e.i(326523);e.s(["useRegionalCheckout",0,function({onSuccess:e,onBeforeOpen:o,onDismiss:p}={}){let m=(0,d.useRegionalPaymentProvider)(),{openCheckout:C,isLoading:f}=function({onSuccess:e,onBeforeOpen:t,onDismiss:o}={}){let d,p,[m,C]=(0,r.useState)(!1),{showError:f}=(0,l.default)(),g=(0,n.useRouter)(),[y]=(d={...s,...void 0},a.useMutation(c,d)),[h]=(p={...s,...void 0},a.useMutation(i,p));return{openCheckout:(0,r.useCallback)(async({planPrefix:n,planPeriod:r,promoCodeExternalId:a,priceExternalId:s})=>{C(!0);let i=!1;try{let{data:c}=await y({variables:{input:{planPrefix:n,planPeriod:r,promoCodeExternalId:a,priceExternalId:s}}}),l=c?.createReplitPlanCheckoutSession;if(l?.__typename!=="RazorpayCheckoutSessionResult"||!l.keyId||!l.checkoutToken||null==l.amount||!l.currency)return void f("Unable to start checkout. Please try again.");if(await (0,u.loadRazorpayScript)(),!window.RZPCrossBorderPrePay)return void f("Unable to load payment provider. Please try again.");t&&(t(),i=!0,await new Promise(e=>setTimeout(e,250))),new window.RZPCrossBorderPrePay({key:l.keyId,amount:l.amount,currency:l.currency,name:u.MERCHANT_NAME,image:u.MERCHANT_IMAGE,theme:u.MERCHANT_THEME,checkout_session_id:l.checkoutToken,prefill:{name:l.prefillName??void 0,email:l.prefillEmail??void 0}},{onPaymentEvent:t=>{if("payment.success"!==t.event)return;let n=t.payment,r=t.razorpay_payment_id??n?.razorpay_payment_id;r&&l.checkoutSessionId&&h({variables:{input:{checkoutSessionId:l.checkoutSessionId,razorpayPaymentId:r}}}).catch(()=>{}),e?.(),g.push(`/stripe-checkout-success?sessionId=${l.checkoutSessionId}`)},onError:()=>{f("Payment failed. Please try again."),o?.()},onDismiss:()=>{o?.()}}).open()}catch{f("Checkout failed. Please try again."),i&&o?.()}finally{C(!1)}},[h,y,t,o,e,g,f]),isLoading:m}}({onSuccess:e,onBeforeOpen:o,onDismiss:p});return m===t.CHECKOUT_PAYMENT_PROVIDER_RAZORPAY?{openCheckout:C,isLoading:f,provider:m}:{openCheckout:null,isLoading:!1,provider:m}}],911261)},481963,e=>{"use strict";var t=e.i(973245);let n=t.gql`
    fragment TrialWillCancelAtCurrentUser on CurrentUser {
  id
  isSubscribed
  paymentMethod {
    __typename
    ... on PaymentMethod {
      id
      isSaved
    }
  }
  billingInfo {
    planInfo {
      cancelAt
    }
  }
  userSubscription {
    isTrial
    timeRemainingInTrial
  }
}
    `,r=t.gql`
    fragment UserPlanStateCurrentUser on CurrentUser {
  id
  ...TrialWillCancelAtCurrentUser
  userSubscriptionType
  billingInfo {
    planInfo {
      interval
      provider
    }
  }
  userSubscription {
    isTrial
  }
}
    ${n}`;e.s(["TrialWillCancelAtCurrentUserFragmentDoc",0,n,"UserPlanStateCurrentUserFragmentDoc",0,r])},843036,e=>{"use strict";var t=e.i(973245),n=e.i(481963),r=e.i(304277);e.i(566901);let o={},a=t.gql`
    query UpgradeButton {
  currentUser {
    id
    ...UserPlanStateCurrentUser
  }
}
    ${n.UserPlanStateCurrentUserFragmentDoc}`;e.s(["useUpgradeButtonQuery",0,function(e){let t={...o,...e};return r.useQuery(a,t)}])},532563,810461,e=>{"use strict";var t=e.i(908796),n=e.i(596139);let r=e=>"month"===e?"monthly":"year"===e?"yearly":null;e.s(["planPeriodFromInterval",0,r],810461);let o=e=>{let{billingInfo:t,userSubscription:n,paymentMethod:r}=e,o=r?.__typename==="PaymentMethod"&&r.isSaved;if(!n?.isTrial)return null;let a=t?.planInfo?.cancelAt??(o?null:n?.timeRemainingInTrial??null);return a?new Date(a):null};e.s(["getCurrentPlanState",0,function({user:e}){let{userSubscriptionType:a,billingInfo:s,userSubscription:i}=e;if(null==i||null==a)return{showUpgradeCta:!0,plan:{name:n.freePlanName}};let c=o(e),l=a===t.UserSubscriptionTypeEnum.Pro?n.proPlanName:n.corePlanName,u=!1===i.isTrial,d=!0===i.isTrial&&null===c;return{showUpgradeCta:!u&&!d,plan:{name:l,period:r(s?.planInfo?.interval),trial:i?.isTrial?{cancelsAt:c,isManuallyCancelled:(e=>{let{billingInfo:t}=e;return!!t?.planInfo?.cancelAt})(e)}:null,provider:s?.planInfo?.provider??t.PaymentProviderEnum.Stripe}}},"trialWillCancelAt",0,o],532563)},3466,e=>{"use strict";var t,n=e.i(276385),r=e.i(843036),o=e.i(712903),a=e.i(596139),s=e.i(229375),i=e.i(532563),c=e.i(415541),l=e.i(709485),u=e.i(911261),d=e.i(242917),p=e.i(643484),m=e.i(419635),C=e.i(488299),f=((t=f||{}).TrialUpgrade="trial_upgrade",t.Default="default",t);e.s(["default",0,({context:e,variant:t="outlined",onCancel:f,onClickCallback:g,text:y,surface:h,onPlanCheckoutComplete:R,iconButton:S,redirectPath:v,modalHeadingText:I,modalSubHeadingText:x,directCheckout:E=!1,planPeriod:A="monthly",...P})=>{let{loading:b}=(()=>{let{data:e,loading:t}=(0,r.useUpgradeButtonQuery)();if(t)return{loading:!0,upgradeType:null};let n=e?.currentUser?(0,i.getCurrentPlanState)({user:e.currentUser}):null;return n?.plan.name===a.corePlanName&&null!==n.plan.trial?{loading:!1,upgradeType:"trial_upgrade"}:{loading:!1,upgradeType:"default"}})(),{show:O}=(0,d.useGlobalModal)(),{openCheckout:T,isLoading:_}=(0,u.useRegionalCheckout)(),w=(0,s.usePlanCheckoutUrl)({prefix:a.corePlanPrefix,interval:A,source:e,successRedirectPath:v,cancelRedirectPath:v}),N=y||`Join Replit ${a.corePlanName}`,k=()=>{(0,c.track)(l.events.UPGRADE_SELECTED,{source:e}),g&&g()},U=async()=>{k();try{await O("MembershipPurchaseModal",{analyticsContext:{upgrade:{context:e,surface:h}},onPurchaseComplete:R,redirectPath:v,headingText:I,subHeadingText:x})}finally{f&&f()}};if(S)return(0,n.jsx)(C.IconButton,{alt:N,onClick:U,disabled:b,children:(0,n.jsx)(o.default,{})});if(E){let{hideCoreIcon:e,className:r,clsx:s,disabled:i,slot:c,...l}=P;if(T){let e=b||_;return(0,n.jsx)(p.Button,{...l,iconLeft:P.hideCoreIcon?void 0:(0,n.jsx)(o.default,{}),variant:t,clsx:[r,s,{loading:e,loaded:!e}],disabled:e||i,loading:e,onClick:()=>{k(),T({planPrefix:a.corePlanPrefix,planPeriod:A})},text:N})}return(0,n.jsx)(m.ButtonLink,{...l,iconLeft:P.hideCoreIcon?void 0:(0,n.jsx)(o.default,{}),variant:t,clsx:[r,s,{loading:b,loaded:!b}],disabled:b||i,href:w,onClick:k,text:N})}return(0,n.jsx)(p.Button,{...P,iconLeft:P.hideCoreIcon?void 0:(0,n.jsx)(o.default,{}),variant:t,clsx:[P.className,P.clsx,{loading:b,loaded:!b}],loading:b,onClick:U,text:N})}])},595996,e=>{"use strict";var t=e.i(276385),n=e.i(389959),r=e.i(983420),o=e.i(967629),a=e.i(919073),s=e.i(691636),i=e.i(61732),c=e.i(727223);let l=(0,o.css)([s.rcss.overflow("hidden"),s.rcss.position.relative]),u={16:4,20:4,24:4,32:4,36:4,48:4,64:8,84:16};function d(e){let o=(0,n.useContext)(r.IconContext),{size:d=o.size??32,alt:p=o.alt??"",iconUrl:m}=e,C=d<32?4:8;function f(){return(0,t.jsx)(i.View,{css:{position:"absolute",top:0,left:0,width:"100%",height:"100%",boxShadow:"inset 0px 0px 0px 1px #80808040",borderRadius:C}})}if(m.endsWith(".svg")){let e=u[d],n=d-2*e;return(0,t.jsxs)(a.ShadesSurface,{css:[s.rcss.p(e),s.rcss.borderRadius(C),l,s.rcss.width(d),s.rcss.height(d)],children:[(0,t.jsx)(i.View,{css:[s.rcss.position.relative,s.rcss.width(n),s.rcss.height(n)],children:(0,t.jsx)(c.default,{alt:p,src:m,objectFit:"contain",layout:"fill"})}),(0,t.jsx)(f,{})]})}return(0,t.jsxs)(a.ShadesSurface,{css:[l,s.rcss.borderRadius(C),s.rcss.width(d),s.rcss.height(d)],children:[(0,t.jsx)(c.default,{alt:p,src:m,width:d,height:d,objectFit:"cover"}),(0,t.jsx)(f,{})]})}e.s(["ReplIconWithPlaceholder",0,function({isLoading:e,alt:n,iconUrl:r,size:o=32}){let i=r&&void 0!==n?(0,t.jsx)(d,{alt:n,iconUrl:r,size:o}):null;if(!e&&i)return i;let c=o<32?4:8;return(0,t.jsx)(a.ShadesSurface,{css:[l,s.rcss.borderRadius(c),s.rcss.width(o),s.rcss.height(o)]})},"default",0,d])},335451,366541,e=>{"use strict";var t=e.i(973245),n=e.i(304277);e.i(566901);let r={},o=t.gql`
    fragment ConnectorContextReplInfo on Repl {
  id
  title
  iconUrl
  url
  timeCreated
  user {
    id
    username
    fullName
    image
  }
}
    `,a=t.gql`
    fragment ConnectorContextConnectionInfo on OintConnection {
  connectionId
  connectorName
  displayName
  iconPath
  status
  type
  environment
  webhookProvider
  repls {
    ...ConnectorContextReplInfo
  }
  predefinedProvider {
    id
    displayName
    description
    baseUrl
    iconPath
  }
}
    ${o}`,s=t.gql`
    fragment ConnectorContext on CurrentUserConnectorContext {
  openIntClientToken
  connectorWhitelist
  connections {
    ...ConnectorContextConnectionInfo
  }
  connectorConfigs {
    id
    type
    connectorName
    displayName
    description
    iconPath
    webhookEvents {
      name
      model
      description
    }
  }
}
    ${a}`,i=t.gql`
    fragment OrgConnectorContext on OrgConnectorContext {
  openIntClientToken
  connectorWhitelist
  connections {
    ...ConnectorContextConnectionInfo
  }
  connectorConfigs {
    id
    type
    connectorName
    displayName
    description
    iconPath
    webhookEvents {
      name
      model
      description
    }
  }
}
    ${a}`,c=t.gql`
    query GetConnectorContext {
  currentUser {
    ... on CurrentUser {
      id
      isSubscribed
      connectorContext {
        ...ConnectorContext
      }
    }
  }
}
    ${s}`,l=t.gql`
    query GetConnectorContextByOrg($orgId: String!) {
  currentUser {
    ... on CurrentUser {
      id
      isSubscribed
      org(orgId: $orgId) {
        __typename
        ... on Org {
          id
          connectorContext {
            ...OrgConnectorContext
          }
        }
        ... on Error {
          __typename
          message
        }
      }
    }
  }
}
    ${i}`;e.s(["ConnectorContextConnectionInfoFragmentDoc",0,a,"ConnectorContextFragmentDoc",0,s,"ConnectorContextReplInfoFragmentDoc",0,o,"GetConnectorContextByOrgDocument",0,l,"GetConnectorContextDocument",0,c,"OrgConnectorContextFragmentDoc",0,i,"useGetConnectorContextByOrgQuery",0,function(e){let t={...r,...e};return n.useQuery(l,t)},"useGetConnectorContextQuery",0,function(e){let t={...r,...e};return n.useQuery(c,t)}],366541);var u=e.i(951262);let d={},p=t.gql`
    query UserConnectorsPage {
  currentUser {
    id
    __typename
    isSubscribed
    connectorContext {
      __typename
      ...ConnectorContext
      ... on Error {
        message
      }
    }
  }
}
    ${s}`,m=t.gql`
    mutation CreateConnection($input: CreateConnectionInput!) {
  createConnection(input: $input) {
    ... on CreateConnection {
      connectionId
    }
    ... on Error {
      message
    }
  }
}
    `,C=t.gql`
    mutation DeleteConnection($input: DeleteConnectionInput!) {
  deleteConnection(input: $input) {
    ... on DeleteConnection {
      success
    }
  }
}
    `,f=t.gql`
    mutation RequestNewConnector($input: RequestNewConnectorInput!) {
  requestNewConnector(input: $input) {
    ... on RequestNewConnectorResult {
      success
    }
  }
}
    `;e.s(["UserConnectorsPageDocument",0,p,"useCreateConnectionMutation",0,function(e){let t={...d,...e};return u.useMutation(m,t)},"useDeleteConnectionMutation",0,function(e){let t={...d,...e};return u.useMutation(C,t)},"useRequestNewConnectorMutation",0,function(e){let t={...d,...e};return u.useMutation(f,t)},"useUserConnectorsPageQuery",0,function(e){let t={...d,...e};return n.useQuery(p,t)}],335451)},829706,e=>{"use strict";var t=e.i(276385),n=e.i(917736),r=e.i(882848),o=e.i(995691),a=e.i(146432),s=e.i(480028);let i=new Set(["FIGMA","CUSTOM_MCP"]),c=new Set(["BITBUCKET_SOURCE_CONTROL","GITHUB_SOURCE_CONTROL","GITLAB_SOURCE_CONTROL"]),l=new Set(["STRIPE"]),u=new Set(["disconnected","error"]),d=new Set(["YOUTUBE"]),p=[{id:"replit-database",name:"Replit Database",type:"PostgreSQL",icon:(0,t.jsx)(n.default,{size:16,color:s.tokens.blueStronger}),link:"https://docs.replit.com/cloud-services/storage-and-databases/sql-database",pane:{type:"neon"}},{id:"replit-app-storage",name:"Replit App Storage",type:"Object Storage",icon:(0,t.jsx)(a.default,{size:16,color:s.tokens.greenStronger}),link:"https://docs.replit.com/cloud-services/storage-and-databases/object-storage",pane:{type:"objectStorage"}},{id:"replit-auth",name:"Replit Auth",type:"Authentication",icon:(0,t.jsx)(o.default,{size:16,color:s.tokens.orangeStronger}),link:"https://docs.replit.com/replit-workspace/replit-auth#replit-auth",pane:{type:"replitAuth"}},{id:"replit-domains",name:"Replit Domains",type:"Domains",icon:(0,t.jsx)(r.default,{size:16,color:s.tokens.tealStronger}),link:"https://docs.replit.com/cloud-services/deployments/domain-purchasing",pane:{type:"deployments"}}];e.s(["APP_SCOPED_CONNECTORS",0,l,"CONNECTOR_DESCRIPTIONS",0,{AGENTMAIL:"Send, receive, and reply to emails using the AgentMail email inbox API.",AMPLITUDE:"Query analytics data, manage event taxonomy, and trigger project runs in Amplitude",ASHBY:"Access job postings, candidates, and applications from your Ashby ATS",ASANA:"Read tasks and project data from Asana workspaces",SPROUTSOCIAL:"Manage social media profiles, posts, messages, and cases from Sprout Social",BITBUCKET:"Access Bitbucket repositories, users, and organizations from Replit",BITBUCKET_SOURCE_CONTROL:"Sync code to Bitbucket repositories from your Replit apps",GITHUB_SOURCE_CONTROL:"Sync code to GitHub repositories from your Replit apps",GITLAB_SOURCE_CONTROL:"Sync code to GitLab projects from your Replit apps",DATABRICKS_M2M:"Execute SQL queries and manage data workflows in Databricks using a service account",BIGQUERY:"Execute SQL queries on Google BigQuery datasets from your Replit apps",BOX:"Access Box files and folders from Replit",CALENDLY:"View Calendly events and event types",CONFLUENCE:"Read users and groups, create and edit content in Confluence spaces",CLICKUP:"Access tasks, projects, and workflows in ClickUp",DATABRICKS:"Execute SQL queries and manage data workflows in Databricks",DISCORD:"Access Discord guild information and user profiles",DROPBOX:"Access Dropbox files, content, and metadata",ELEVENLABS:"AI voice generation and text-to-speech",HEX:"Run data notebooks, manage projects, and trigger Hex project runs via API",OPENAI:"Access your own OpenAI API key instead of default Replit-managed AI integrations",FACEBOOK:"View Facebook profiles, posts, photos, and manage pages",GITHUB:"Access GitHub repositories, users, and organizations from your Replit apps",GOOGLE_CALENDAR:"Read and write Google Calendar events and settings",GOOGLE_DOCS:"Create, read, and edit Google Docs",GOOGLE_DRIVE:"Access and manage Google Drive files and folders",GOOGLE_MAIL:"Send, receive, and manage Gmail messages",GOOGLE_SHEET:"Read and write data in Google Sheets",GOOGLE_SLIDES:"Create, read, and edit Google Slides presentations",HUBSPOT:"Access HubSpot CRM objects, contacts, and deals from Replit",INSTAGRAM:"Manage Instagram business content, messages, and insights",JIRA:"View users and manage Jira work items and issues",LINEAR:"Create and manage Linear issues, comments, and schedules",MONDAY:"Access Monday.com boards and user information",MOBILE_MAPS:"Access mobile maps and locations from Replit",NOTION:"Read and write to Notion workspaces and pages",ONEDRIVE:"Access and manage OneDrive files and folders",OUTLOOK:"Send and receive emails, manage Outlook calendar events",PLAID:"Access Plaid connected bank accounts and transactions",POSTGRES:"Execute read-only SQL queries on PostgreSQL databases",RESEND:"Send transactional emails using the Resend API",REVENUECAT:"Monetize your mobile apps built on Replit",SALESFORCE:"Access Salesforce CRM data and perform operations via REST API",SEGMENT:"Manage Segment sources, destinations, and tracking plans via the Public API",SENDGRID:"Send transactional emails using the SendGrid API",SHAREPOINT:"Read, write, and manage SharePoint sites and documents",SLACK:"Send messages and interact with Slack workspaces",SLACK_AGENT:"Integrate Slack agent capabilities from Replit",SLACK_AGENT_BUILDER:"Build and manage custom Slack agents",STRIPE:"Connect to Stripe to enable seamless and secure payments for your apps",SNOWFLAKE:"Execute SQL queries on Snowflake data warehouses",SPOTIFY:"Access and manage Spotify playlists and libraries",TODOIST:"Read and write to your Todoist tasks and projects",TWILIO:"Send SMS messages and make voice calls using the Twilio API",YOUTUBE:"Upload and manage YouTube videos, channels, and analytics",ZENDESK:"Access Zendesk users and support tickets from Replit",FIGMA:"Allow Replit Agent to view and rapidly build your designs from Figma",CUSTOM_MCP:"Allows Replit Agent to access external MCP servers",ZOOM:"Access Zoom meetings, users, settings, and webinars with admin privileges",WORKATO:"Trigger Workato recipes and call Workato APIs",X:"Access X posts, users, and search using the X API v2 with pay-per-usage pricing",MICROSOFT_FABRIC:"Access Microsoft Fabric workspaces and resources"},"DISCONNECTED_STATUSES",0,u,"MCP_CONNECTORS",0,i,"REPLIT_MANAGED_SERVICES",0,p,"VERSION_CONTROL_CONNECTORS",0,c,"buildConnectionManagementUrl",0,function(e,t){return`/integrations/${e.toLowerCase()}/apps/${t}`},"isAppScopedConnector",0,e=>l.has(e),"isConnectionHealthy",0,e=>!u.has(e??""),"isHiddenUnlessConnected",0,e=>d.has(e),"isMCPConnector",0,e=>i.has(e),"toConnectorName",0,function(e){if(!e)return null;let t=e.toUpperCase();return/^[A-Z][A-Z0-9_]*$/.test(t)?t:null}])},246549,e=>{"use strict";var t=e.i(389959),n=e.i(335451),r=e.i(366541),o=e.i(829706),a=e.i(151027);let s={};e.s(["useConnectors",0,function(e){let i=e?.skip??!1,{orgId:c}=(0,a.useCurrentUserStoredOrgContext)(),l=!!c,{data:u,loading:d,error:p,refetch:m}=(0,r.useGetConnectorContextQuery)({skip:i||l,context:s}),{data:C,loading:f,error:g,refetch:y}=(0,r.useGetConnectorContextByOrgQuery)({variables:{orgId:c??""},skip:i||!l,context:s}),h=u?.currentUser?.__typename==="CurrentUser"?u?.currentUser?.connectorContext:null,R=C?.currentUser?.__typename==="CurrentUser"&&C?.currentUser?.org?.__typename==="Org"?C?.currentUser?.org?.connectorContext:null,S=l?R:h,v=l?g:p,I=l?f:d,x=l?y:m,[E,{loading:A}]=(0,n.useCreateConnectionMutation)(),P=(0,t.useCallback)(async e=>E({...e,refetchQueries:l?[{query:r.GetConnectorContextByOrgDocument,variables:{orgId:c??""}}]:[{query:r.GetConnectorContextDocument}]}),[E,l,c]),b=S&&(l?"OrgConnectorContext"===S.__typename:"CurrentUserConnectorContext"===S.__typename),O=l?C?.currentUser?.__typename==="CurrentUser"&&C.currentUser.isSubscribed:u?.currentUser?.__typename==="CurrentUser"&&u.currentUser.isSubscribed,T=(0,t.useMemo)(()=>{if(!b||"CurrentUserConnectorContext"!==S.__typename&&"OrgConnectorContext"!==S.__typename)return[];let e=[],t=S.connectorWhitelist??[],n=S.connections??[],r=S.connectorConfigs??[],a=n.filter(e=>(t.includes(e.connectorName)||o.MCP_CONNECTORS.has(e.connectorName))&&!o.APP_SCOPED_CONNECTORS.has(e.connectorName)),s=new Set(a.map(e=>e.connectorName)),i=new Map;r.forEach(e=>{e.connectorName&&e.webhookEvents&&e.webhookEvents.length>0&&i.set(e.connectorName,e.webhookEvents)});let c=r.filter(e=>e.connectorName&&t.includes(e.connectorName)&&!s.has(e.connectorName)&&"CUSTOM_MCP"!==e.connectorName);return a.forEach(t=>{e.push({id:t.connectionId,displayName:t.displayName,iconPath:t.iconPath,connectorName:t.connectorName,connectorType:"connection",type:t.type,webhookEvents:i.get(t.connectorName)})}),c.forEach(t=>{t.connectorName&&e.push({id:t.id,displayName:t.displayName??"Untitled",iconPath:t.iconPath,connectorName:t.connectorName,connectorType:"connectorConfig",type:t.type,webhookEvents:i.get(t.connectorName)})}),e},[b,S]);return v||!b||"CurrentUserConnectorContext"!==S.__typename&&"OrgConnectorContext"!==S.__typename?{token:null,connections:[],connectorConfigs:[],connectorWhitelist:[],slashCommandConnectorItems:[],createConnection:P,loading:I,createConnectionLoading:A,error:v,refetch:x,isSubscribed:O??!1,isOrgContext:l}:{token:S.openIntClientToken,connections:S.connections??[],connectorConfigs:S.connectorConfigs??[],connectorWhitelist:S.connectorWhitelist??[],slashCommandConnectorItems:T,createConnection:P,loading:I,createConnectionLoading:A,error:v,refetch:x,isSubscribed:O??!1,isOrgContext:l}}])},190545,e=>{"use strict";var t=e.i(276385),n=e.i(389959),r=e.i(593583),o=e.i(379778);let a=(0,n.forwardRef)(function({dataCy:e,...n},a){return(0,t.jsx)(r.Form,{...(0,o.useView)(n),ref:a,"data-cy":e})});e.s(["Form",0,a])},60337,e=>{e.v({decoratedInputInput:"Input-module__7pJrIG__decoratedInputInput",decoratedInputRoot:"Input-module__7pJrIG__decoratedInputRoot",input:"Input-module__7pJrIG__input",inputAutosize:"Input-module__7pJrIG__inputAutosize"})},528710,711486,e=>{"use strict";var t=e.i(276385),n=e.i(389959),r=e.i(964304),o=e.i(10425),a=e.i(983420),s=new Map;function i(e){var t=s.get(e);t&&t.destroy()}function c(e){var t=s.get(e);t&&t.update()}var l=null;"u"<typeof window?((l=function(e){return e}).destroy=function(e){return e},l.update=function(e){return e}):((l=function(e,t){return e&&Array.prototype.forEach.call(e.length?e:[e],function(e){return function(e){if(e&&e.nodeName&&"TEXTAREA"===e.nodeName&&!s.has(e)){var t,n=null,r=window.getComputedStyle(e),o=(t=e.value,function(){i({testForHeightReduction:""===t||!e.value.startsWith(t),restoreTextAlign:null}),t=e.value}),a=(function(t){e.removeEventListener("autosize:destroy",a),e.removeEventListener("autosize:update",c),e.removeEventListener("input",o),window.removeEventListener("resize",c),Object.keys(t).forEach(function(n){return e.style[n]=t[n]}),s.delete(e)}).bind(e,{height:e.style.height,resize:e.style.resize,textAlign:e.style.textAlign,overflowY:e.style.overflowY,overflowX:e.style.overflowX,wordWrap:e.style.wordWrap});e.addEventListener("autosize:destroy",a),e.addEventListener("autosize:update",c),e.addEventListener("input",o),window.addEventListener("resize",c),e.style.overflowX="hidden",e.style.wordWrap="break-word",s.set(e,{destroy:a,update:c}),c()}function i(t){var o,a,s=t.restoreTextAlign,c=void 0===s?null:s,l=t.testForHeightReduction,u=r.overflowY;if(0!==e.scrollHeight&&("vertical"===r.resize?e.style.resize="none":"both"===r.resize&&(e.style.resize="horizontal"),(void 0===l||l)&&(o=function(e){for(var t=[];e&&e.parentNode&&e.parentNode instanceof Element;)e.parentNode.scrollTop&&t.push([e.parentNode,e.parentNode.scrollTop]),e=e.parentNode;return function(){return t.forEach(function(e){var t=e[0],n=e[1];t.style.scrollBehavior="auto",t.scrollTop=n,t.style.scrollBehavior=null})}}(e),e.style.height=""),a="content-box"===r.boxSizing?e.scrollHeight-(parseFloat(r.paddingTop)+parseFloat(r.paddingBottom)):e.scrollHeight+parseFloat(r.borderTopWidth)+parseFloat(r.borderBottomWidth),"none"!==r.maxHeight&&a>parseFloat(r.maxHeight)?("hidden"===r.overflowY&&(e.style.overflow="scroll"),a=parseFloat(r.maxHeight)):"hidden"!==r.overflowY&&(e.style.overflow="hidden"),e.style.height=a+"px",c&&(e.style.textAlign=c),o&&o(),n!==a&&(e.dispatchEvent(new Event("autosize:resized",{bubbles:!0})),n=a),u!==r.overflow&&!c)){var d=r.textAlign;"hidden"===r.overflow&&(e.style.textAlign="start"===d?"end":"start"),i({restoreTextAlign:d,testForHeightReduction:!0})}}function c(){i({testForHeightReduction:!0,restoreTextAlign:null})}}(e)}),e}).destroy=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],i),e},l.update=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],c),e});var u=l;e.s(["default",0,u],711486);var d=e.i(208018),p=e.i(2664),m=e.i(406664),C=e.i(919073),f=e.i(60337);let g=(0,n.forwardRef)(({dataCy:e,style:n,...o},a)=>{let s=(0,m.useCreateInteractiveInput)();return(0,t.jsx)(r.Input,{...o,"data-cy":e,ref:a,clsx:[f.default.input,s.clsx],style:n?{...s.style,...n}:s.style})});g.displayName="Input";let y=(0,n.forwardRef)(({autoSize:e,dataCy:n,style:r,...a},s)=>{let i=(0,m.useCreateInteractiveInput)();return e?(0,t.jsx)(h,{...a,dataCy:n,style:r,ref:s}):(0,t.jsx)(o.TextArea,{...a,"data-cy":n,ref:s,clsx:[f.default.input,i.clsx],style:r?{...i.style,...r}:i.style})});y.displayName="MultiLineInput";let h=(0,n.forwardRef)(({dataCy:e,style:r,...a},s)=>{let{ref:i}=function(){let[e,t]=(0,n.useState)(null);return(0,d.default)(()=>{if(e&&e){let t=new MutationObserver(()=>{u.update(e)});return t.observe(e,{subtree:!0,childList:!0,characterData:!0}),u(e),requestAnimationFrame(()=>{u.update(e)}),()=>{u.destroy(e),t.disconnect()}}},[e]),{ref:t}}(),c=(0,m.useCreateInteractiveInput)(),l=(0,p.useMergeRefs)([s,i],{breadcrumb:"client/rui/Input.tsx"});return(0,t.jsx)(o.TextArea,{...a,ref:l,"data-cy":e,clsx:[f.default.input,f.default.inputAutosize,c.clsx],style:r?{...c.style,...r}:c.style})});h.displayName="MultiLineInputAutosize";let R=(0,n.forwardRef)(({iconLeft:e,iconRight:n,className:o,inputClassName:s,dataCy:i,...c},l)=>{let u=(0,m.useCreateInteractiveInput)();return(0,t.jsxs)(C.ShadesSurface,{clsx:[f.default.decoratedInputRoot,u.clsx,o],style:u.style,elevate:!1,children:[(0,t.jsx)(a.IconProvider,{size:16,children:e}),(0,t.jsx)(r.Input,{...c,"data-cy":i,ref:l,clsx:[f.default.input,f.default.decoratedInputInput,s]}),(0,t.jsx)(a.IconProvider,{size:16,children:n})]})});R.displayName="DecoratedInput";let S=(0,n.forwardRef)(({left:e,right:n,className:o,inputClassName:a,dataCy:s,...i},c)=>{let l=(0,m.useCreateInteractiveInput)();return(0,t.jsxs)(C.ShadesSurface,{clsx:[f.default.decoratedInputRoot,l.clsx,o],style:l.style,elevate:!1,children:[e,(0,t.jsx)(r.Input,{...i,"data-cy":s,ref:c,clsx:[f.default.input,f.default.decoratedInputInput,a]}),n]})});S.displayName="CustomDecoratedInput",e.s(["CustomDecoratedInput",0,S,"DecoratedInput",0,R,"Input",0,g,"MultiLineInput",0,y],528710)},33583,e=>{"use strict";var t=e.i(276385),n=e.i(389959),r=e.i(785240),o=e.i(932200),a=e.i(8047),s=e.i(61732);let i=(0,n.forwardRef)(function({variant:e="small",className:n,color:i,height:c,maxLines:l,multiline:u,dataCy:d,children:p,...m},C){let[{elementType:f,...g},y]=(0,o.useContextProps)(m,C,r.LabelContext);return(0,t.jsx)(a.Text,{variant:e,className:n,color:i,height:c,maxLines:l,multiline:u,dataCy:d,children:(0,t.jsx)(s.SpecializedView.label,{...g,ref:y,children:p})})});e.s(["Label",0,i])},845415,e=>{"use strict";var t=e.i(276385),n=e.i(389959),r=e.i(624071),o=e.i(756841),a=e.i(248033),s=e.i(932200),i=e.i(379778),c=e.i(8047);let l=(0,n.forwardRef)(function({dataCy:e,...n},r){return(0,t.jsx)(o.TextField,{...(0,i.useView)({gap:4}),...n,"data-cy":e,ref:r})}),u=(0,n.forwardRef)(function({variant:e="small",color:n="dimmer",...o},i){let l=(0,s.useSlottedContext)(a.TextContext,"description");return(0,t.jsx)(c.Text,{...(0,r.mergeProps)(o,{variant:e,color:n},l),ref:i})});e.s(["TextField",0,l,"TextFieldDescription",0,u])},843400,e=>{e.v({modalContent:"EmbedModal-module__oAShma__modalContent",overlay:"EmbedModal-module__oAShma__overlay",overlayTopAligned:"EmbedModal-module__oAShma__overlayTopAligned"})},554370,e=>{"use strict";var t=e.i(276385),n=e.i(389959),r=e.i(486597),o=e.i(624071),a=e.i(342942),s=e.i(739261),i=e.i(969407),c=e.i(918542),l=e.i(691636),u=e.i(61732),d=e.i(843400);e.s(["EmbedModal",0,function({isOpen:e,onRequestClose:p,children:m,maxWidth:C=800,maxHeight:f,centered:g=!0,zIndex:y,className:h,portalContainer:R}){let S=(0,i.useIsSSR)(),v=(0,n.useRef)(null),I=(0,r.useOverlayTriggerState)({isOpen:e,onOpenChange:e=>{e||p()}}),{modalProps:x,underlayProps:E}=(0,c.useModalOverlay)({isDismissable:!0,isKeyboardDismissDisabled:!1,shouldCloseOnInteractOutside:e=>!(e.tagName.toLowerCase().includes("1password")||e.tagName.toLowerCase().includes("com-1password")||e.hasAttribute("data-op-target")||e.hasAttribute("data-op-id")||Array.from(e.attributes).some(e=>e.name.startsWith("data-1p-"))||e.className?.toString().includes("op-")||null!==e.closest('[class*="1password"]')||null!==e.closest('[class*="op-"]')||null!==e.closest("[data-op-target]"))},I,v),{dialogProps:A}=(0,s.useDialog)({"aria-label":"Embed content"},v);return((0,n.useEffect)(()=>{let t=t=>{"Escape"===t.key&&e&&p()};return document.addEventListener("keydown",t),()=>document.removeEventListener("keydown",t)},[e,p]),S||!e)?null:(0,t.jsx)(a.Overlay,{portalContainer:R??document.body,children:(0,t.jsx)("div",{...E,className:g?d.default.overlay:`${d.default.overlay} ${d.default.overlayTopAligned}`,style:{zIndex:y??l.DefaultModalZIndex},children:(0,t.jsx)("div",{...(0,o.mergeProps)(x,A),ref:v,className:`${d.default.modalContent} ${h||""}`,style:{maxWidth:C,maxHeight:f??"calc(100vh - 64px)"},children:(0,t.jsx)(u.View,{children:m})})})})}])}]);

//# debugId=f464c1df-58b1-ee52-4b50-f7ba61e2d4f3
//# sourceMappingURL=17e5xy7k5_0wq.js.map