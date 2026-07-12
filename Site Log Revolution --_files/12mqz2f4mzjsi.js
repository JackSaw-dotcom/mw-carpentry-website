;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="8fdff931-9540-dd52-3e31-7076fd483a75")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,566866,e=>{e.v({measureBar:"CollaboratorCountV2-module__rHWLIa__measureBar",nonInteractive:"CollaboratorCountV2-module__rHWLIa__nonInteractive"})},210266,e=>{e.v({accessLabel:"OrgReplPermissionsV2-module__uejJjG__accessLabel",inviteInputWrapper:"OrgReplPermissionsV2-module__uejJjG__inviteInputWrapper",inviteSearchRow:"OrgReplPermissionsV2-module__uejJjG__inviteSearchRow",pendingAvatar:"OrgReplPermissionsV2-module__uejJjG__pendingAvatar",pendingRow:"OrgReplPermissionsV2-module__uejJjG__pendingRow",userList:"OrgReplPermissionsV2-module__uejJjG__userList"})},647906,664239,e=>{"use strict";var i=e.i(276385),r=e.i(389959),t=e.i(84466),l=e.i(908796),n=e.i(99357),a=e.i(183035),s=e.i(167392),o=e.i(334028),u=e.i(22827),d=e.i(480028),p=e.i(406664),c=e.i(919073),m=e.i(643484),g=e.i(201894),x=e.i(108431),h=e.i(8047),y=e.i(244945),f=e.i(566866);let j=({customer:e,isAdmin:r})=>{let t=(0,p.useCreateInteractive)({variant:"filledAndOutlined"}),l=e?.subscriptionSummary?(0,u.getPlanType)(e.subscriptionSummary):void 0,{openUpgradeModal:n,hasUpgradeAction:a}=(0,u.useCollaboratorUpgradeAction)({isAdmin:r,planType:l}),s=e?.seats.__typename==="CustomerSeats"?e.seats:null,o=s?.counts??null,m=s?.caps??null;if(!o||!m)return null;let x=o.admin+o.member+o.guest,j=m.members-x;if(j>2)return null;let _=j>0?"themeWarning":"themeError",v=(0,u.getTooltipContent)({isAdmin:r,plan:l,seatsRemaining:j});return(0,i.jsx)(y.Tooltip,{tooltip:v,children:(0,i.jsxs)(c.ShadesSurface,{align:"center",clsx:a?t.clsx:f.default.nonInteractive,style:a?t.style:void 0,onClick:a?n:void 0,row:!0,gap:6,px:8,py:1,br:4,colorShade:_,background:!0,border:"subtle",children:[(0,i.jsx)(h.Text,{variant:"small",multiline:!1,children:`${x} / ${m.members}`}),(0,i.jsx)(g.MeasureBar,{clsx:f.default.measureBar,total:m.members,current:x,backgroundColor:"themeWarning"===_?d.tokens.yellowStrongest:d.tokens.accentNegativeStrongest,color:"themeWarning"===_?d.tokens.yellowDefault:d.tokens.accentNegativeStronger,tooltipHidden:!0})]})})},_=({customer:e,isAdmin:r,errorMessage:t})=>{let l=e?.subscriptionSummary?(0,u.getPlanType)(e.subscriptionSummary):void 0,{openUpgradeModal:n,hasUpgradeAction:a}=(0,u.useCollaboratorUpgradeAction)({isAdmin:r,planType:l}),s=(0,u.isInsufficientQuotaError)(t),o=e?.seats.__typename==="CustomerSeats"?e.seats:null,d=o?o.counts.admin+o.counts.member+o.counts.guest:0,p=o?o.caps.members-d:0,c=s?(0,u.getTooltipContent)({isAdmin:r,plan:l,seatsRemaining:p}):t;return(0,i.jsx)(x.StatusBanner,{colorway:"negative",text:c,action:s&&a?(0,i.jsx)(m.Button,{text:"Upgrade",size:"small",onClick:n}):void 0})};e.s(["CollaboratorCountV2",0,j,"InviteErrorBanner",0,_],664239);var v=e.i(570438),w=e.i(562782),b=e.i(777198),M=e.i(94961),S=e.i(959787),I=e.i(921451),C=e.i(825419),R=e.i(295231),k=e.i(61732),V=e.i(210266);let T=({count:e,isMember:r})=>(0,i.jsxs)(h.Text,{variant:"small",color:"dimmest",children:[e," ",r?"other ":"",(0,w.default)("admin",e)," in your workspace"," ",1===e?"has":"have"," owner access."]}),U=({user:e,currentUserId:r,repl:t,group:l,options:n,onScopeChange:a})=>{let s=r===e.id;return(0,i.jsxs)(k.View,{row:!0,gap:8,align:"center",justify:"space-between",children:[(0,i.jsxs)(k.View,{row:!0,gap:8,align:"center",shrink:!0,children:[(0,i.jsx)(C.Avatar,{src:e.image,username:e.username,fullName:e.displayName,size:28}),(0,i.jsxs)(h.Text,{height:"singleLine",translate:"no",children:[e.fullName||e.displayName,s?(0,i.jsxs)(i.Fragment,{children:[" ",(0,i.jsx)(h.Text,{variant:"small",color:"dimmest",children:"(You)"})]}):null]})]}),(0,i.jsx)(I.default,{repl:t,group:l,options:n,onScopeChange:a,buttonVariant:"nofill",iconSize:16})]})},O=({email:e})=>(0,i.jsx)(k.View,{row:!0,gap:8,align:"center",justify:"space-between",clsx:V.default.pendingRow,children:(0,i.jsxs)(k.View,{row:!0,gap:8,align:"center",shrink:!0,children:[(0,i.jsx)(c.ShadesSurface,{elevate:"2x",background:!0,align:"center",justify:"center",br:"full",border:"subtle",clsx:V.default.pendingAvatar,children:(0,i.jsx)(o.default,{size:16})}),(0,i.jsxs)(h.Text,{height:"singleLine",children:[e," ",(0,i.jsx)(h.Text,{variant:"small",color:"dimmest",children:"(Invited)"})]})]})}),L=({repl:e,group:r,options:t,onScopeChange:l,orgName:n})=>(0,i.jsxs)(k.View,{row:!0,gap:8,align:"center",justify:"space-between",children:[(0,i.jsxs)(k.View,{row:!0,gap:8,align:"center",shrink:!0,children:[(0,i.jsx)(M.default,{group:r,variant:"compact"}),(0,i.jsxs)(k.View,{row:!0,gap:2,align:"center",shrink:!0,children:[(0,i.jsx)(h.Text,{height:"singleLine",multiline:!1,children:A(r,n)}),null!=r.memberCount?(0,i.jsxs)(h.Text,{variant:"small",color:"dimmest",children:[" ","(",r.memberCount," ",1===r.memberCount?"person":"people",")"]}):null]})]}),(0,i.jsx)(I.default,{repl:e,group:r,options:t,onScopeChange:l,buttonVariant:"nofill",iconSize:16})]}),P=[l.OrgGroupReplScopeRole.Owner,l.OrgGroupReplScopeRole.Deployer,l.OrgGroupReplScopeRole.Editor,l.OrgGroupReplScopeRole.Viewer].map(e=>({id:e,...(0,I.getOptionDisplay)(e)})),A=(e,i)=>{switch(e.type){case l.OrgGroupType.SystemAdmins:return`Admins in ${i??e.name}`;case l.OrgGroupType.SystemMembers:return`Members in ${i??e.name}`;case l.OrgGroupType.SystemViewers:return`Viewers in ${i??e.name}`;case l.OrgGroupType.SystemGuests:return`Guests in ${i??e.name}`;case l.OrgGroupType.Custom:return`Everyone in ${e.name}`;default:return e.name}},E=({orgId:e,selectedGroups:o,repl:u,onScopeChange:p,customer:c,isAdmin:g})=>{let h=`group-search-${(0,r.useId)()}`,y=`role-select-${(0,r.useId)()}`,[f,j]=(0,r.useState)(),[v,w]=(0,r.useState)(""),[M,I]=(0,r.useState)(l.OrgGroupReplScopeRole.Editor),[C,T]=(0,r.useState)(!1),[U,O]=(0,r.useState)(null),L=(0,b.useMemoedDismissibleElement)("repl-invite-guests-use-credits-banner"),A=!!f||(0,t.default)(v.trim()),E=()=>{O(null)},G=async()=>{await p(),w(""),j(void 0),E(),T(!0),setTimeout(()=>T(!1),2e3)},[$,{loading:D}]=(0,n.useUpdateOrgGroupScopesV2Mutation)({onCompleted:e=>{"OrgGroup"===e.updateOrgGroupScopes.__typename?G():O(e.updateOrgGroupScopes.message)},onError:e=>{O(e.message)}}),[B,{loading:z}]=(0,n.useGrantReplAccessByEmailMutation)({onCompleted:e=>{let i=e.grantReplAccessByEmail;"Repl"===i.__typename?G():O(i.message)},onError:e=>{O(e.message)}}),N=D||z,q=null;return C&&(q=(0,i.jsx)(a.default,{size:20,color:d.tokens.accentPositiveDefault})),(0,i.jsxs)(k.View,{gap:12,children:[(0,i.jsxs)(k.View,{row:!0,gap:8,align:"center",children:[(0,i.jsx)(k.View,{clsx:V.default.inviteSearchRow,row:!0,grow:!0,shrink:!0,align:"center",children:(0,i.jsx)(k.View,{grow:!0,shrink:!0,clsx:V.default.inviteInputWrapper,children:(0,i.jsx)(S.default,{inputId:h,orgId:e,types:[l.OrgGroupType.Custom,l.OrgGroupType.SystemIndividual],selectedGroups:o,value:v,setValue:e=>{w(e),f&&j(void 0)},onSelect:e=>{j(e),w(e.name)},onClear:()=>{j(void 0)},hideSearchIcon:!0,hideEmptyResults:!0,placeholder:"Add emails, names, or groups"})})}),(0,i.jsx)(R.PopupMenu,{id:y,trigger:(0,i.jsx)(m.Button,{size:"small",text:P.find(e=>e.id===M)?.label??M,iconRight:(0,i.jsx)(s.default,{})}),"aria-label":"Select invite role",onAction:e=>{I(e)},items:P,children:e=>(0,i.jsx)(R.MenuItem,{id:e.id,label:e.label,description:e.description,icon:e.icon},e.id)}),(0,i.jsx)(m.Button,{text:"Invite",colorway:"primary",size:"small",disabled:!A||N,loading:N,onClick:()=>{if(E(),f)return void $({variables:{input:{orgGroupId:f.id,orgScopes:[],groupScopes:[],replScopes:[{resourceId:u.id,role:M}],removeScopes:[]}}});let e=v.trim();(0,t.default)(e)?B({variables:{input:{replId:u.id,email:e,role:M}}}):O("Invalid email address")}}),q]}),L.isLoading||L.isDone?null:(0,i.jsx)(x.StatusBanner,{colorway:"primary",text:"Invited guests will use credits from your subscription.",closable:!0,closeAction:L.setAsDone}),U?(0,i.jsx)(_,{customer:c,isAdmin:g,errorMessage:U}):null]})};e.s(["OrgReplPermissionsV2",0,({queryResult:e})=>{let r=(0,v.useCurrentUserId)(),{data:t,error:l,refetch:n}=e,a=t?.getRepl?.__typename==="Repl"?t.getRepl:void 0,s=(a?.multiplayerStatus?.groups??[]).filter(e=>"custom"!==e.group.type),o=(a?.multiplayerStatus?.groups??[]).filter(e=>"custom"===e.group.type),u=a?.multiplayerStatus?.individuals??[],d=a?.multiplayerStatus?.pendingInvites??[],p=s.map(e=>e.group).concat(o.map(e=>e.group)).concat(u.map(e=>e.group)),c=a?.org?.adminGroup?.__typename==="OrgGroupConnection"?a.org.adminGroup.items[0]:null,m=c?.memberCount!=null?c.memberCount-!!c.isMember:null,g=async()=>{await n()};if(l?.message)return(0,i.jsx)(k.View,{gap:12,children:(0,i.jsx)(x.StatusBanner,{colorway:"negative",text:l.message})});if(!a)return null;let y=a.org?.name;return(0,i.jsxs)(k.View,{gap:12,children:[(0,i.jsxs)(k.View,{px:12,row:!0,justify:"space-between",align:"center",children:[(0,i.jsx)(h.Text,{variant:"subheadDefault",multiline:!1,children:"Invite"}),(0,i.jsx)(j,{customer:a.org?.customer?.__typename==="Customer"?a.org.customer:void 0,isAdmin:a.org?.authorizations.editSubscription.isAuthorized??!1})]}),a.org?.id&&a.authorizations.editPermissions.isAuthorized?(0,i.jsx)(k.View,{px:12,children:(0,i.jsx)(E,{orgId:a.org.id,selectedGroups:p,repl:a,onScopeChange:g,customer:a.org?.customer?.__typename==="Customer"?a.org.customer:void 0,isAdmin:a.org?.authorizations.editSubscription.isAuthorized??!1})}):null,(0,i.jsxs)(k.View,{gap:12,px:12,children:[(0,i.jsx)(h.Text,{variant:"small",multiline:!1,clsx:V.default.accessLabel,children:"Access"}),(0,i.jsxs)(k.View,{gap:8,clsx:V.default.userList,children:[s.map(({group:e,options:r})=>(0,i.jsx)(L,{repl:a,group:e,options:r,onScopeChange:g,orgName:y},e.id)),o.map(({group:e,options:r})=>(0,i.jsx)(L,{repl:a,group:e,options:r,onScopeChange:g,orgName:y},e.id)),u.map(({group:e,user:t,options:l})=>(0,i.jsx)(U,{currentUserId:r,repl:a,group:e,user:t,options:l,onScopeChange:g},t.id)),d.map(({email:e})=>(0,i.jsx)(O,{email:e},e))]}),null!=m&&m>0?(0,i.jsx)(T,{count:m,isMember:c?.isMember??!1}):null]})]})}],647906)},528311,e=>{e.v({fontWeightMedium:"OrgReplPermissions-module__Uac-wq__fontWeightMedium",sectionWithBorders:"OrgReplPermissions-module__Uac-wq__sectionWithBorders",visibilitySelector:"OrgReplPermissions-module__Uac-wq__visibilitySelector"})},19882,5160,e=>{"use strict";var i=e.i(276385),r=e.i(389959),t=e.i(908796),l=e.i(973245),n=e.i(444008),a=e.i(130902),s=e.i(304277);e.i(566901);var o=e.i(951262);let u={},d=l.gql`
    fragment ReplMultiplayerOrg on Org {
  ...OrgMetadata
  membersCount
}
    ${n.OrgMetadataFragmentDoc}`,p=l.gql`
    fragment ReplMultiplayerOrgGroup on OrgGroup {
  ...OrgGroupsOrgGroup
}
    ${a.OrgGroupsOrgGroupFragmentDoc}`,c=l.gql`
    fragment ReplMultiplayerGroup on ReplMultiplayerGroupScope {
  group {
    __typename
    ...ReplMultiplayerOrgGroup
  }
  options {
    __typename
    role
    status
  }
}
    ${p}`,m=l.gql`
    fragment ReplMultiplayerIndividual on ReplMultiplayerIndividualScope {
  group {
    __typename
    ...ReplMultiplayerOrgGroup
  }
  user {
    __typename
    id
    displayName
    fullName
    image
    username
  }
  options {
    __typename
    role
    status
  }
}
    ${p}`,g=l.gql`
    fragment ReplMultiplayerStatus on Repl {
  id
  title
  isPrivate
  url
  org {
    ...ReplMultiplayerOrg
  }
  multiplayerStatus {
    __typename
    groups {
      __typename
      ...ReplMultiplayerGroup
    }
    individuals {
      __typename
      ...ReplMultiplayerIndividual
    }
  }
  authorizations {
    editPermissions {
      isAuthorized
      message
    }
    editVisibility {
      isAuthorized
      message
    }
    removeSelf {
      isAuthorized
      message
    }
    viewPermissions {
      isAuthorized
      message
    }
  }
}
    ${d}
${c}
${m}`,x=l.gql`
    query ReplMultiplayerStatus($replId: String!) {
  getRepl(id: $replId) {
    __typename
    ... on Repl {
      __typename
      ...ReplMultiplayerStatus
    }
  }
}
    ${g}`;function h(e){let i={...u,...e};return s.useQuery(x,i)}let y=l.gql`
    mutation UpdateOrgReplVisibility($input: UpdateReplInput!) {
  updateRepl(input: $input) {
    repl {
      id
      ...ReplMultiplayerStatus
    }
  }
}
    ${g}`;function f(e){let i={...u,...e};return o.useMutation(y,i)}e.s(["ReplMultiplayerStatusDocument",0,x,"useReplMultiplayerStatusQuery",0,h,"useUpdateOrgReplVisibilityMutation",0,f],5160);var j=e.i(667746),_=e.i(183035),v=e.i(167392),w=e.i(252204),b=e.i(399245),M=e.i(953436),S=e.i(269848),I=e.i(416298),C=e.i(632350),R=e.i(570438),k=e.i(562782),V=e.i(94961),T=e.i(959787),U=e.i(921451),O=e.i(480028),L=e.i(825419),P=e.i(643484),A=e.i(419635),E=e.i(295231),G=e.i(108431),$=e.i(8047),D=e.i(244945),B=e.i(61732),z=e.i(921125),N=e.i(528311);let q=({user:e,currentUserId:r,repl:t,group:l,options:n,onScopeChange:a})=>{let s=r===e.id;return(0,i.jsxs)(B.View,{row:!0,gap:16,align:"center",justify:"space-between",children:[(0,i.jsxs)(B.View,{row:!0,gap:8,children:[(0,i.jsx)(L.Avatar,{src:e.image,username:e.username,fullName:e.displayName,size:32}),(0,i.jsx)(B.View,{gap:6,justify:"center",children:(0,i.jsxs)(B.View,{row:!0,gap:8,children:[(0,i.jsx)($.Text,{height:"singleLine",translate:"no",children:e.fullName||e.displayName}),s?(0,i.jsx)($.Text,{height:"singleLine",color:"dimmest",children:"(You)"}):null]})})]}),(0,i.jsx)(B.View,{children:(0,i.jsx)(U.default,{repl:t,group:l,options:n,onScopeChange:a})})]})},W=({repl:e,group:r,options:t,onScopeChange:l})=>(0,i.jsxs)(B.View,{row:!0,gap:16,align:"center",justify:"space-between",children:[(0,i.jsxs)(B.View,{row:!0,gap:8,children:[(0,i.jsx)(V.default,{group:r}),(0,i.jsxs)(B.View,{gap:6,justify:"center",children:[(0,i.jsx)($.Text,{height:"singleLine",children:r.name}),(0,i.jsxs)(B.View,{row:!0,gap:8,children:[r.isMember?(0,i.jsx)($.Text,{variant:"small",color:"dimmest",height:"singleLine",children:"(you)"}):null,null!=r.memberCount?(0,i.jsx)($.Text,{variant:"small",color:"dimmest",height:"singleLine",children:(0,k.default)("member",r.memberCount,!0)}):null]})]})]}),(0,i.jsx)(B.View,{children:(0,i.jsx)(U.default,{repl:e,group:r,options:t,onScopeChange:l})})]}),J=({orgId:e,selectedGroups:l,repl:n,onScopeChange:a})=>{let s=`group-search-${(0,r.useId)()}`,[o,u]=(0,r.useState)(),[d,p]=(0,r.useState)(""),[c,{data:m,error:g,loading:x}]=(0,j.useOrgGroupReplScopeOptionsLazyQuery)(),h=m&&m.currentUser?.org?.__typename==="Org"&&"OrgGroup"===m.currentUser.org.group.__typename&&m.currentUser.org.group.replScopeOptions?.__typename==="OrgGroupReplScopeOptions"?m.currentUser.org.group.replScopeOptions.items[0].options:void 0,y=m?.currentUser&&"Org"!==m.currentUser.org.__typename?m.currentUser.org.message:void 0,f=m?.currentUser&&"Org"===m.currentUser.org.__typename&&"OrgGroup"!==m.currentUser.org.group.__typename?m.currentUser.org.group.message:void 0,_=m?.currentUser&&"Org"===m.currentUser.org.__typename&&"OrgGroup"===m.currentUser.org.group.__typename&&m.currentUser.org.group.replScopeOptions?.__typename!=="OrgGroupReplScopeOptions"?m.currentUser.org.group.replScopeOptions?.message:void 0,v=y??f??_??g?.message,w=async()=>{await a(),p(""),u(void 0)};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(B.View,{row:!0,gap:8,children:[(0,i.jsx)(B.View,{grow:!0,shrink:!0,children:(0,i.jsx)(T.default,{inputId:s,orgId:e,types:[t.OrgGroupType.Custom,t.OrgGroupType.SystemIndividual],selectedGroups:l,value:d,setValue:p,onSelect:i=>{u(i),p(i.name),c({variables:{orgId:e,groupId:i.id,input:{replIds:[n.id]}}})},onClear:()=>u(void 0),placeholder:"Share with groups or other members"})}),o&&h||x?(0,i.jsxs)(B.View,{pl:24,row:!0,align:"center",children:[o&&h&&!x?(0,i.jsx)(U.default,{group:o,repl:n,options:h,onScopeChange:w}):null,x?(0,i.jsx)(S.default,{size:24}):null]}):null]}),v?(0,i.jsx)(G.StatusBanner,{colorway:"negative",text:v}):null]})},F=({repl:e,org:t})=>{let l,[n,a]=(0,r.useState)(),[s,o]=(0,r.useState)(),[u,{loading:d}]=f({variables:{input:{id:e.id}},onError:e=>{o(e.message)}}),p=`repl-visibility-${(0,r.useId)()}`,c=e.authorizations.editVisibility.isAuthorized,m=e.authorizations.editVisibility.message,g=[{id:"private",icon:(0,i.jsx)(M.default,{}),name:`Internal to ${t.name}`,selected:e.isPrivate,description:"Only selected workspace members can view or edit."},{id:"public",icon:(0,i.jsx)(b.default,{}),name:"Public on Replit",selected:!e.isPrivate,description:"Anyone on Replit can see or fork. You choose who can edit."}],x=g.find(e=>e.selected),h=x?(0,i.jsxs)(B.View,{row:!0,gap:8,align:"center",children:[x.icon," ",x.name]}):void 0;return l=s?(0,i.jsx)(D.Tooltip,{tooltip:s,children:(0,i.jsx)(I.default,{size:24,color:O.tokens.accentNegativeDefault})}):d?(0,i.jsx)(S.default,{size:24}):n?(0,i.jsx)(_.default,{size:24,color:O.tokens.accentPositiveDefault}):null,(0,i.jsxs)(B.View,{clsx:N.default.visibilitySelector,grow:!0,shrink:!0,row:!0,gap:4,children:[(0,i.jsx)(D.Tooltip,{tooltip:m,isDisabled:c,children:(0,i.jsx)(E.PopupMenu,{id:p,trigger:(0,i.jsx)(P.Button,{iconRight:(0,i.jsx)(v.default,{}),text:h??"Control Repl visibility",disabled:!c}),"aria-label":`Control ${e.title} visibility`,onAction:i=>{let r="private"===i;r!==e.isPrivate&&(o(void 0),u({variables:{input:{id:e.id,isPrivate:r}},optimisticResponse:{__typename:"RootMutationType",updateRepl:{__typename:"UpdateReplPayload",repl:{...e,isPrivate:r}}},onCompleted:e=>{"UpdateReplPayload"===e.updateRepl.__typename&&(a(!0),setTimeout(()=>a(!1),2e3))}}))},items:g,disallowEmptySelection:!0,isDisabled:!c,children:e=>(0,i.jsx)(E.MenuItem,{id:e.id,label:e.name,description:e.description,icon:e.icon},e.id)})}),l?(0,i.jsx)(B.View,{children:l}):null]})};e.s(["OrgReplPermissions",0,({replId:e})=>{let r=(0,R.useCurrentUserId)(),t=(0,C.default)(),{data:l,loading:n,error:a,refetch:s}=h({variables:{replId:e}}),o=l?.getRepl?.__typename==="Repl"?l.getRepl:void 0,u=(o?.multiplayerStatus?.groups??[]).filter(e=>"custom"!==e.group.type),d=(o?.multiplayerStatus?.groups??[]).filter(e=>"custom"===e.group.type),p=o?.multiplayerStatus?.individuals??[],c=u.map(e=>e.group).concat(d.map(e=>e.group)).concat(p.map(e=>e.group)),m=async()=>{await s()};return a?.message?(0,i.jsx)(B.View,{gap:12,children:(0,i.jsx)(G.StatusBanner,{colorway:"negative",text:a.message})}):n||!o?(0,i.jsx)(B.View,{px:12,align:"center",justify:"center",children:(0,i.jsx)(S.default,{})}):(0,i.jsxs)(B.View,{gap:12,children:[(0,i.jsxs)(B.View,{tag:"header",px:12,gap:2,children:[(0,i.jsx)($.Text,{variant:"subheadDefault",children:"Share App"}),(0,i.jsxs)(B.View,{clsx:N.default.fontWeightMedium,row:!0,gap:4,children:[o.org?(0,i.jsxs)($.Text,{variant:"small",color:"dimmer",children:[o.org.name," /"]}):null,(0,i.jsx)($.Text,{variant:"small",children:o.title})]})]}),o.org?.id&&o.authorizations.editPermissions.isAuthorized?(0,i.jsx)(B.View,{clsx:N.default.sectionWithBorders,children:(0,i.jsx)(J,{orgId:o.org.id,selectedGroups:c,repl:o,onScopeChange:m})}):null,(0,i.jsxs)(B.View,{gap:12,px:12,children:[(0,i.jsx)($.Text,{variant:"small",clsx:N.default.fontWeightMedium,children:"Roles with access"}),(0,i.jsx)(B.View,{gap:12,children:u.map(({group:e,options:r})=>(0,i.jsx)(W,{repl:o,group:e,options:r,onScopeChange:m},e.id))}),d.length>0?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)($.Text,{variant:"small",clsx:N.default.fontWeightMedium,children:"Groups with access"}),(0,i.jsx)(B.View,{gap:12,children:d.map(({group:e,options:r})=>(0,i.jsx)(W,{repl:o,group:e,options:r,onScopeChange:m},e.id))})]}):null]}),p.length>0?(0,i.jsxs)(B.View,{gap:12,px:12,children:[(0,i.jsx)($.Text,{variant:"small",clsx:N.default.fontWeightMedium,children:"People with access"}),p.map(({group:e,user:t,options:l})=>(0,i.jsx)(q,{currentUserId:r,repl:o,group:e,user:t,options:l,onScopeChange:m},t.id))]}):null,o.org?.id?(0,i.jsx)(B.View,{clsx:N.default.sectionWithBorders,children:(0,i.jsxs)(B.View,{row:!0,justify:"space-between",children:[(0,i.jsx)(F,{repl:o,org:o.org}),t?null:(0,i.jsx)(A.ButtonLink,{prefetch:!1,...(0,z.replViewLinkProps)(o),iconRight:(0,i.jsx)(w.default,{}),variant:"outlined",text:"Cover page",target:"_blank",style:{pointerEvents:"auto"}})]})}):null]})}],19882)},784763,724549,e=>{"use strict";var i=e.i(973245),r=e.i(304277);e.i(566901);let t={},l=i.gql`
    query PersonalCollaboratorGate {
  currentUser {
    id
    isSubscribed
    username
    shouldEnforceMultiplayerLimit: gate(feature: "flag-empty-hangar")
    personalCollaborators {
      ... on PersonalCollaboratorsInfo {
        count
        limit
        collaborators {
          repl {
            id
            slug
            url
            title
            nextPagePathname
            iconUrl
          }
          user {
            id
            username
          }
        }
      }
    }
  }
}
    `;function n(e){let i={...t,...e};return r.useQuery(l,i)}e.s(["PersonalCollaboratorGateDocument",0,l,"usePersonalCollaboratorGateQuery",0,n],724549),e.s(["useCollaboratorLimit",0,()=>{let{data:e,loading:i,refetch:r}=n({ssr:!1,fetchPolicy:"network-only"});if(i)return{type:"loading"};if(e&&e?.currentUser?.personalCollaborators.__typename==="PersonalCollaboratorsInfo"){let{personalCollaborators:{count:i,limit:t,collaborators:l},isSubscribed:n,shouldEnforceMultiplayerLimit:a,username:s}=e.currentUser;return{type:"data",refetch:r,collaboratorCount:i,collaboratorLimit:t,collaboratorsByRepl:l.reduce((e,{repl:i,user:r})=>{let t=e.get(i.id)??{id:i.id,slug:i.slug,url:i.url,title:i.title,nextPagePathname:i.nextPagePathname,iconUrl:i.iconUrl,__typename:i.__typename,users:[]};return e.set(i.id,{...t,users:[...t.users,{id:r.id,username:r.username}]}),e},new Map),isStarterUser:!n,username:s,shouldEnforceMultiplayerLimit:a}}return{type:"error"}}],784763)},22827,368258,e=>{"use strict";var i=e.i(389959),r=e.i(596139),t=e.i(810394),l=e.i(242917);function n({onPurchaseComplete:e}={}){let{show:i}=(0,l.useGlobalModal)();return{showUpgradeModal:async()=>{await i("MembershipPurchaseModal",{headingText:"Upgrade for more collaborators",subHeadingText:`Share your Projects with up to ${t.CORE_MULTIPLAYER_LIMIT} collaborators with Replit ${r.corePlanName}`,onPurchaseComplete:e,analyticsContext:{upgrade:{context:"workspace_multiplayer_header"}}})}}}e.s(["useCoreUpgradeModal",0,n],368258),e.i(450717);let a={[r.freePlanPrefix]:`To add new seats, upgrade to ${r.corePlanName}.`,[r.corePlanPrefix]:`To add new seats, upgrade to ${r.proPlanName}.`,[r.proPlanPrefix]:`To add new seats, upgrade to ${r.enterprisePlanName}.`};e.s(["getPlanType",0,function(e){switch(e.__typename){case"CustomerSubscriptionSummaryFreeTier":return r.freePlanPrefix;case"CustomerSubscriptionSummarySelfServe":{let{planPrefix:i}=e.plan;if(i===r.corePlanPrefix)return r.corePlanPrefix;if(i===r.proPlanPrefix)return r.proPlanPrefix;return}default:return}},"getTooltipContent",0,function({isAdmin:e,plan:i,seatsRemaining:r}){let t=r>0?"You’re nearing the collaborator limit for your plan.":"You’ve reached the maximum number of collaborators for your plan.";if(!e)return`${t} To add new seats, contact your admin.`;let l=i?a[i]:null;return l?`${t} ${l}`:t},"isInsufficientQuotaError",0,function(e){return e.includes("reached the limit")||e.includes("insufficient_quota")||e.includes("insufficient seats")},"useCollaboratorUpgradeAction",0,function({isAdmin:e,planType:t}){let{show:a}=(0,l.useGlobalModal)(),{showUpgradeModal:s}=n(),o=e&&null!=t;return{openUpgradeModal:(0,i.useCallback)(async()=>{if(e)switch(t){case r.freePlanPrefix:await s();break;case r.corePlanPrefix:await a("MembershipPurchaseModal",{analyticsContext:{upgrade:{context:"workspace_multiplayer_header"}}});break;case r.proPlanPrefix:window.open("https://replit.com/enterprise","_blank")}},[e,t,s,a]),hasUpgradeAction:o}}],22827)},94961,e=>{"use strict";var i=e.i(276385),r=e.i(422266),t=e.i(612343),l=e.i(569910),n=e.i(480028),a=e.i(919073);let s={red:n.tokens.redDimmest,orange:n.tokens.orangeDimmest,yellow:n.tokens.yellowDimmest,lime:n.tokens.limeDimmest,blue:n.tokens.blueDimmest,purple:n.tokens.purpleDimmest,pink:n.tokens.pinkDimmest};e.s(["default",0,({group:e,variant:n="normal"})=>{let o,u;switch(n){case"normal":case"compact":o=28,u=16;break;default:(0,l.default)(n)}let d=s[e.color],p={width:o,height:o,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,...d?{backgroundColor:d}:{}},c=e.type.startsWith("system_")?r.default:t.default;return(0,i.jsx)(a.ShadesSurface,{elevate:"2x",background:!0,border:"subtle",style:p,children:(0,i.jsx)(c,{size:u})})}])},921451,e=>{"use strict";var i=e.i(276385),r=e.i(389959),t=e.i(908796),l=e.i(667746),n=e.i(183035),a=e.i(167392),s=e.i(602686),o=e.i(534141),u=e.i(712771),d=e.i(269848),p=e.i(140154),c=e.i(612343),m=e.i(416298),g=e.i(480028),x=e.i(462229),h=e.i(691636),y=e.i(643484),f=e.i(295231),j=e.i(244945),_=e.i(61732);let v=(0,x.cssRecord)({scopeSelector:[h.rcss.position.relative],selectOption:[{"&:hover":{cursor:"auto"}}],icon:[h.rcss.position.absolute,h.rcss.top("50%"),h.rcss.left(-4),{transform:"translate(-100%, -50%)"}]}),w=e=>{switch(e){case t.OrgGroupReplScopeRoleOption.Owner:return{icon:(0,i.jsx)(c.default,{}),label:"Owner",description:"Full permissions including deleting app"};case t.OrgGroupReplScopeRoleOption.Deployer:return{icon:(0,i.jsx)(p.default,{}),label:"Publisher",description:"Can edit and publish this app"};case t.OrgGroupReplScopeRoleOption.Editor:return{icon:(0,i.jsx)(o.default,{}),label:"Editor",description:"Can edit this app"};case t.OrgGroupReplScopeRoleOption.Viewer:return{icon:(0,i.jsx)(u.default,{}),label:"Read-only",description:"Can view the published app"};case t.OrgGroupReplScopeRoleOption.None:return{icon:(0,i.jsx)(s.default,{}),label:"None",description:"No permissions"}}};e.s(["default",0,({group:e,repl:s,options:o,onScopeChange:u,iconSize:p=24,buttonVariant:c})=>{let x,[h,b]=(0,r.useState)(!1),[M,S]=(0,r.useState)(o.find(e=>e.status===t.ScopeStatus.Current)),I=`${s.id}-role-${(0,r.useId)()}`,C=M?w(M.role).label:void 0,R=s.authorizations.editPermissions.isAuthorized,[k,{data:V,loading:T,error:U}]=(0,l.useUpdateOrgGroupScopesMutation)({onCompleted:e=>{"OrgGroup"===e.updateOrgGroupScopes.__typename&&(u(),b(!0),setTimeout(()=>b(!1),2e3))}}),O=V?.updateOrgGroupScopes&&"OrgGroup"!==V.updateOrgGroupScopes.__typename?V.updateOrgGroupScopes.message:U?.message;return x=O?(0,i.jsx)(j.Tooltip,{tooltip:O,children:(0,i.jsx)(m.default,{size:p,color:g.tokens.accentNegativeDefault})}):T?(0,i.jsx)(d.default,{size:p}):h?(0,i.jsx)(n.default,{size:p,color:g.tokens.accentPositiveDefault}):null,(0,i.jsxs)(_.View,{css:v.scopeSelector,row:!0,gap:8,justify:"end",children:[x?(0,i.jsx)(_.View,{css:v.icon,children:x}):null,(0,i.jsx)(j.Tooltip,{tooltip:"You cannot edit this group's permissions.",isDisabled:R,children:(0,i.jsx)(f.PopupMenu,{id:I,...c?{trigger:(0,i.jsx)(y.Button,{variant:c,text:C??"Select a role...",iconRight:(0,i.jsx)(a.default,{}),disabled:!R})}:{label:C??"Select a role..."},"aria-label":`${e.name}'s access to ${s.title}`,onAction:i=>{let r=o.find(({role:e})=>e===i);if(!r||r.role===M?.role)return;S(r);let l=r.role===t.OrgGroupReplScopeRoleOption.None?[]:[{resourceId:s.id,role:(e=>{switch(e){case t.OrgGroupReplScopeRoleOption.Owner:return t.OrgGroupReplScopeRole.Owner;case t.OrgGroupReplScopeRoleOption.Deployer:return t.OrgGroupReplScopeRole.Deployer;case t.OrgGroupReplScopeRoleOption.Editor:return t.OrgGroupReplScopeRole.Editor;case t.OrgGroupReplScopeRoleOption.Viewer:return t.OrgGroupReplScopeRole.Viewer}})(r.role)}],n=r.role===t.OrgGroupReplScopeRoleOption.None?[{resourceType:t.OrgGroupRemoveResourceType.Repl,resourceId:s.id}]:[];k({variables:{input:{orgGroupId:e.id,orgScopes:[],groupScopes:[],replScopes:l,removeScopes:n}}})},items:o,disallowEmptySelection:!0,isDisabled:!R,children:r=>{let l=w(r.role),n=r.status===t.ScopeStatus.Unavailable;return(0,i.jsx)(f.MenuItem,{id:r.role,label:l.label,description:n?`${e.name} cannot have ${r.role} access`:l.description,css:v.selectOption,icon:l.icon,isDisabled:n},r.role)}})})]})},"getOptionDisplay",0,w])},182697,e=>{"use strict";var i=e.i(973245),r=e.i(304277);e.i(566901);var t=e.i(951262);let l={},n=i.gql`
    query MultiplayerInviteUrl($replId: String!) {
  getRepl(id: $replId) {
    ... on Repl {
      id
      inviteUrl
      owner {
        ... on User {
          id
        }
        ... on Team {
          id
          capabilities {
            isBusinessPlan
            hasValidSubscription
          }
        }
      }
    }
  }
}
    `,a=i.gql`
    mutation MultiplayerRefreshInviteUrl($replId: String!) {
  refreshMultiplayerInviteLink(replId: $replId) {
    id
    ... on Repl {
      id
      inviteUrl
    }
  }
}
    `,s=i.gql`
    mutation DeleteMultiplayerInviteUrl($replId: String!) {
  deleteMultiplayerInviteLink(replId: $replId) {
    ... on Repl {
      id
      inviteUrl
    }
    ... on UserError {
      message
    }
  }
}
    `;e.s(["MultiplayerInviteUrlDocument",0,n,"useDeleteMultiplayerInviteUrlMutation",0,function(e){let i={...l,...e};return t.useMutation(s,i)},"useMultiplayerInviteUrlQuery",0,function(e){let i={...l,...e};return r.useQuery(n,i)},"useMultiplayerRefreshInviteUrlMutation",0,function(e){let i={...l,...e};return t.useMutation(a,i)}])},879513,e=>{e.v({copyToClipboard:"JoinLinkV2-module__Bungra__copyToClipboard",input:"JoinLinkV2-module__Bungra__input",inviteUrlContainer:"JoinLinkV2-module__Bungra__inviteUrlContainer",linkIconContainer:"JoinLinkV2-module__Bungra__linkIconContainer",textAlignLeft:"JoinLinkV2-module__Bungra__textAlignLeft",title:"JoinLinkV2-module__Bungra__title"})},206406,e=>{"use strict";var i=e.i(276385),r=e.i(389959),t=e.i(182697),l=e.i(882848),n=e.i(269848),a=e.i(820228),s=e.i(416298),o=e.i(320216),u=e.i(20639),d=e.i(415541),p=e.i(709485),c=e.i(480028),m=e.i(919073),g=e.i(643484),x=e.i(580519),h=e.i(488299),y=e.i(528710),f=e.i(528326),j=e.i(145315),_=e.i(327391),v=e.i(8047),w=e.i(61732),b=e.i(879513);let M=()=>(0,i.jsxs)(w.View,{row:!0,gap:8,align:"start",grow:!0,shrink:!0,children:[(0,i.jsx)(m.ShadesSurface,{elevate:"2x",align:"center",justify:"center",background:!0,clsx:b.default.linkIconContainer,children:(0,i.jsx)(l.default,{size:16})}),(0,i.jsxs)(w.View,{gap:4,grow:!0,shrink:!0,children:[(0,i.jsx)(v.Text,{clsx:b.default.title,id:"link-switch-label",multiline:!1,children:"Private join link"}),(0,i.jsx)(v.Text,{variant:"small",color:"dimmest",multiline:!1,children:"Anyone with a link will have edit access"})]})]});function S({isOpen:e,onClose:r,onConfirm:t,isLoading:l}){return(0,i.jsx)(f.Modal,{isOpen:e,onRequestClose:r,hideCloseButton:!0,centered:!0,maxWidth:424,children:(0,i.jsxs)(w.View,{gap:8,p:4,children:[(0,i.jsx)(v.Text,{variant:"subheadDefault",multiline:!1,children:"Regenerate join link"}),(0,i.jsx)(v.Text,{color:"dimmest",children:"The previous join link will no longer be accessible to anyone attempting to join."}),(0,i.jsxs)(w.View,{row:!0,gap:8,justify:"end",pt:8,children:[(0,i.jsx)(w.View,{grow:!0,justify:"end",row:!0,children:(0,i.jsx)(g.Button,{text:"Cancel",onClick:r,size:"small"})}),(0,i.jsx)(g.Button,{colorway:"primary",text:"Confirm",onClick:t,disabled:l,size:"small"})]})]})})}e.s(["default",0,function({replId:e}){let{showConfirm:g,showError:f}=(0,o.default)(),[I,C]=(0,r.useState)(!1),{data:R,loading:k,error:V,refetch:T}=(0,t.useMultiplayerInviteUrlQuery)({variables:{replId:e}}),[U,O]=(0,t.useMultiplayerRefreshInviteUrlMutation)({variables:{replId:e},onError:e=>f(e.message),onCompleted:()=>{g("Join link created"),C(!1)}}),[L,P]=(0,t.useDeleteMultiplayerInviteUrlMutation)({variables:{replId:e},onError:e=>f(e.message),onCompleted:e=>{"UserError"===e.deleteMultiplayerInviteLink.__typename?f(e.deleteMultiplayerInviteLink.message):"Repl"===e.deleteMultiplayerInviteLink.__typename&&g("Join link deleted")}}),A=R?.getRepl?.__typename==="Repl"?R.getRepl:null,E=O.loading||P.loading,G=R?.getRepl?.__typename==="Repl"&&A?.owner?.__typename==="Team",$=R?.getRepl?.__typename==="Repl"&&A?.owner?.__typename==="Team"&&A?.owner.capabilities?.isBusinessPlan&&A?.owner.capabilities?.hasValidSubscription,D=R?.getRepl?.__typename==="Repl"&&A?.inviteUrl&&1?window.location.origin+A?.inviteUrl:null;return k||G&&!$?null:V?(0,i.jsxs)(w.View,{gap:12,px:12,children:[(0,i.jsxs)(w.View,{row:!0,justify:"space-between",children:[(0,i.jsx)(M,{}),(0,i.jsx)(_.Switch,{isSelected:!1,isDisabled:!0,"aria-labelledby":"link-switch-label"})]}),(0,i.jsx)(j.StatusBannerButton,{clsx:b.default.textAlignLeft,iconLeft:(0,i.jsx)(s.default,{color:c.tokens.accentNegativeStrongest}),colorway:"negative",text:"Error loading join link. Click here to try again, or contact support.",onClick:()=>T({replId:e})})]}):(0,i.jsxs)(w.View,{gap:12,px:12,children:[(0,i.jsxs)(w.View,{row:!0,justify:"space-between",align:"center",children:[(0,i.jsx)(M,{}),(0,i.jsxs)(w.View,{row:!0,gap:8,align:"center",shrink:!1,children:[D?(0,i.jsx)(h.IconButton,{alt:"Regenerate join link",onClick:()=>C(!0),disabled:E,size:24,children:(0,i.jsx)(a.default,{size:16})}):null,k?(0,i.jsxs)(w.View,{row:!0,gap:4,align:"center",children:[(0,i.jsx)(n.default,{color:c.tokens.foregroundDimmer}),(0,i.jsx)(v.Text,{color:"dimmer",multiline:!1,children:"Loading..."})]}):(0,i.jsx)(_.Switch,{isSelected:!!D,isDisabled:E,onChange:e=>{E||(e?U():L())},"aria-labelledby":"link-switch-label"})]})]}),!k&&D?(0,i.jsxs)(m.ShadesSurface,{clsx:b.default.inviteUrlContainer,elevate:!1,children:[(0,i.jsx)(y.Input,{type:"url",readOnly:!0,disabled:!0,value:E?"Loading...":D,clsx:b.default.input}),(0,i.jsx)(x.CopyButton,{textToCopy:D,onClick:()=>{D?((0,u.default)(D),(0,d.track)(p.events.JOIN_LINK_COPIED,{replId:A?.id,isTeamRepl:G,source:"replEnvironment"}),g("Link copied")):f("Could not copy link")},tooltipSuccessText:"Copied to clipboard",text:"Copy link",iconLeft:(0,i.jsx)(l.default,{}),clsx:b.default.copyToClipboard,colorway:"primary",disabled:E})]}):null,(0,i.jsx)(S,{isOpen:I,onClose:()=>C(!1),onConfirm:()=>U(),isLoading:E})]})}])},309169,e=>{"use strict";var i=e.i(973245),r=e.i(951262);let t={},l=i.gql`
    fragment MultiplayerUser on User {
  id
  image
  username
  fullName
  url
}
    `,n=i.gql`
    fragment MultiplayerRepl on Repl {
  id
  collaborators {
    user {
      ...MultiplayerUser
    }
  }
  multiplayerInvites {
    email
    type
  }
}
    ${l}`,a=i.gql`
    fragment MultiplayerReplInvite on MultiplayerInvite {
  email
  repl {
    ...MultiplayerRepl
  }
  invitePermissionType: type
}
    ${n}`,s=i.gql`
    mutation AddOrInviteReplMultiplayer($input: AddOrInviteReplMultiplayerInput!) {
  addOrInviteReplMultiplayer(input: $input) {
    __typename
    ... on AddOrInviteReplMultiplayerOuput {
      result {
        ... on MultiplayerInvite {
          ...MultiplayerReplInvite
        }
        ... on ReplPermission {
          id
          repl {
            ...MultiplayerRepl
          }
          user {
            ...MultiplayerUser
          }
          replPermissionType: type
        }
      }
    }
    ... on UnauthorizedError {
      message
    }
    ... on NotFoundError {
      message
    }
    ... on UserError {
      message
    }
  }
}
    ${a}
${n}
${l}`;e.s(["MultiplayerUserFragmentDoc",0,l,"useAddOrInviteReplMultiplayerMutation",0,function(e){let i={...t,...e};return r.useMutation(s,i)}])},54731,e=>{"use strict";var i=e.i(973245),r=e.i(309169),t=e.i(820669),l=e.i(304277);e.i(566901);let n={},a=i.gql`
    query MultiplayerManager($replId: String!) {
  getRepl(id: $replId) {
    ... on Repl {
      id
      isOwner
      collaborators {
        user {
          ...MultiplayerUser
        }
      }
      authorizations {
        editPermissions {
          isAuthorized
        }
      }
      multiplayerInvites {
        email
        type
      }
    }
  }
  currentUser {
    id
    username
    fullName
    image
    url
    isSubscribed
    customer {
      ...CollaboratorCountV2Customer
    }
  }
}
    ${r.MultiplayerUserFragmentDoc}
${t.CollaboratorCountV2CustomerFragmentDoc}`;e.s(["MultiplayerManagerDocument",0,a,"useMultiplayerManagerQuery",0,function(e){let i={...n,...e};return l.useQuery(a,i)}])},363,e=>{e.v({avatarLink:"MultiplayerManagerListItemV2-module__lOYcnG__avatarLink",pendingAvatar:"MultiplayerManagerListItemV2-module__lOYcnG__pendingAvatar",root:"MultiplayerManagerListItemV2-module__lOYcnG__root",user:"MultiplayerManagerListItemV2-module__lOYcnG__user",userLink:"MultiplayerManagerListItemV2-module__lOYcnG__userLink"})},186327,e=>{e.v({dropdownMenu:"UsernameSearch-module__wBrchW__dropdownMenu",emptyText:"UsernameSearch-module__wBrchW__emptyText",form:"UsernameSearch-module__wBrchW__form",result:"UsernameSearch-module__wBrchW__result",resultActive:"UsernameSearch-module__wBrchW__resultActive",searchContainer:"UsernameSearch-module__wBrchW__searchContainer"})},982312,e=>{e.v({accessLabel:"MultiplayerManagerV2-module__UkbNfq__accessLabel",emptyContainer:"MultiplayerManagerV2-module__UkbNfq__emptyContainer",headerMobile:"MultiplayerManagerV2-module__UkbNfq__headerMobile",measureBar:"MultiplayerManagerV2-module__UkbNfq__measureBar",root:"MultiplayerManagerV2-module__UkbNfq__root",searchContainer:"MultiplayerManagerV2-module__UkbNfq__searchContainer",userGroupTitle:"MultiplayerManagerV2-module__UkbNfq__userGroupTitle",userList:"MultiplayerManagerV2-module__UkbNfq__userList"})},29685,658351,703929,54145,32260,e=>{"use strict";var i=e.i(276385),r=e.i(420180),t=e.i(84466),l=e.i(908796),n=e.i(54731);e.i(486898),e.i(416746);var a=e.i(269848),s=e.i(810394),o=e.i(3466),u=e.i(664239),d=e.i(784763),p=e.i(955410),c=e.i(753451),m=e.i(157630),g=e.i(602686),x=e.i(334028),h=e.i(830675),y=e.i(973245),f=e.i(309169),j=e.i(951262);let _={},v=y.gql`
    mutation RemoveMultiplayerUser($replId: String!, $username: String!) {
  removeMultiplayerUser(replId: $replId, username: $username) {
    id
    user {
      id
      ...MultiplayerUser
    }
    repl {
      id
      collaborators {
        user {
          ...MultiplayerUser
        }
      }
    }
  }
}
    ${f.MultiplayerUserFragmentDoc}`,w=y.gql`
    mutation DeleteMultiplayerInvite($replId: String!, $email: String!) {
  deleteMultiplayerInvite(replId: $replId, email: $email) {
    ... on MultiplayerInvite {
      email
      type
      repl {
        id
        collaborators {
          user {
            ...MultiplayerUser
          }
        }
        multiplayerInvites {
          email
          type
        }
      }
    }
    ... on UserError {
      message
    }
  }
}
    ${f.MultiplayerUserFragmentDoc}`;var b=e.i(320216);let M=()=>{var e,i;let r,t,{showConfirm:l,showError:n}=(0,b.default)(),a=(0,d.useCollaboratorLimit)(),s=(e,i)=>{h.addBreadcrumb({message:i}),h.captureException(Error(e.message)),n("Something unexpected happened, please try again.")},[o,{loading:u}]=(e={onError:e=>s(e,"useRemoveMultiplayerUser"),onCompleted:e=>{let i=e.removeMultiplayerUser.user?.username;i?l(`@${i} removed`):l("User removed"),"data"===a.type&&a.refetch()}},r={..._,...e},j.useMutation(v,r)),[p,{loading:c}]=(i={onError:e=>s(e,"useDeleteMultiplayerInviteMutation"),onCompleted:e=>{if("UserError"===e.deleteMultiplayerInvite.__typename)return void n(e.deleteMultiplayerInvite.message);if("MultiplayerInvite"===e.deleteMultiplayerInvite.__typename){let{email:i}=e.deleteMultiplayerInvite;l(`Invite canceled for ${i}`)}}},t={..._,...i},j.useMutation(w,t));return{removeMultiplayerUser:o,loadingRemoveUser:u,deleteMultiplayerInvite:p,loadingDeleteInvite:c}};e.s(["default",0,M],658351);var S=e.i(480028),I=e.i(825419),C=e.i(488299),R=e.i(8047),k=e.i(61732),V=e.i(363);let T=e=>{let{isPendingInvitation:r,canEditMultiplayers:t,replId:l,isCurrentUser:n,isOwner:a}=e,{removeMultiplayerUser:s,loadingRemoveUser:o,deleteMultiplayerInvite:u,loadingDeleteInvite:d}=M(),p=!r;return(0,i.jsxs)(k.View,{clsx:V.default.root,row:!0,gap:12,align:"center",justify:"space-between",children:[(0,i.jsxs)(k.View,{row:!0,gap:12,align:"center",grow:!0,shrink:!0,clsx:V.default.user,children:[p?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(m.default,{href:`/@${e.user.username}`,clsx:V.default.avatarLink,children:(0,i.jsx)(I.Avatar,{username:e.user.username,src:e.user.image??null,fullName:e.user.fullName,size:32,layout:"intrinsic"})}),(0,i.jsx)(m.default,{href:`/@${e.user.username}`,clsx:V.default.userLink,children:(0,i.jsx)(R.Text,{multiline:!1,translate:"no",children:e.user.fullName||e.user.username})})]}):(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("div",{clsx:V.default.pendingAvatar,children:(0,i.jsx)(x.default,{color:S.tokens.foregroundDimmer,size:16})}),(0,i.jsx)(R.Text,{color:"dimmest",multiline:!1,children:e.email})]}),n?(0,i.jsx)(R.Text,{color:"dimmest",variant:"small",multiline:!1,children:"(You)"}):null]}),(0,i.jsxs)(k.View,{row:!0,gap:8,align:"center",children:[(0,i.jsx)(R.Text,{color:"dimmest",variant:"small",multiline:!1,children:a?"Owner":r?"Invited":"Editor"}),!t||n||a?null:(0,i.jsx)(C.IconButton,{alt:p?"Remove member":"Cancel invitation",onClick:()=>{!t||o||d||(p?s({variables:{replId:l,username:e.user.username}}):u({variables:{replId:l,email:e.email}}))},children:(0,i.jsx)(g.default,{size:12})})]})]})};var U=e.i(389959),O=e.i(709485),L=e.i(415541);let P=({isMobileApp:e,isTeam:i,handleUpgradeTriggered:r,replId:t,showErrorToast:n=!0})=>{let{showError:a,showConfirm:s}=(0,b.default)(),o=(0,d.useCollaboratorLimit)(),[u,p]=(0,U.useState)(null),c=(0,U.useCallback)(()=>{p(null)},[]);(0,U.useEffect)(()=>{u&&n&&a(u)},[u,n,a]);let[m,{loading:g}]=(0,f.useAddOrInviteReplMultiplayerMutation)({onError:e=>{h.addBreadcrumb({message:"useAddOrInviteReplMultiplayerMutation"}),h.captureException(Error(e.message)),p("Something unexpected happened, please try again.")},onCompleted:n=>{let a,u,d=n.addOrInviteReplMultiplayer;switch(d.__typename){case"NotFoundError":case"UnauthorizedError":p(d.message);return;case"UserError":p(d.message),d.message.includes("reached the limit")&&(e&&!i?p("You have reached the invite limit for a free account. Please upgrade to add more collaborators."):!e&&r&&r(!0));return;case"AddOrInviteReplMultiplayerOuput":"MultiplayerInvite"===d.result.__typename?(a=l.MultiplayerInviteMethod.Email,u=d.result.email):(a=l.MultiplayerInviteMethod.Username,u=d.result.user?.username?`@${d.result.user.username}`:"user")}p(null),"data"===o.type&&o.refetch(),(0,L.track)(O.events.MULTIPLAYER_INVITED,{replId:t,inviteMethod:a}),s(`Added ${u}`)}});return{addOrInviteReplMultiplayer:m,loadingAddMutation:g,inviteError:u,clearInviteError:c}};e.s(["default",0,P],703929);var A=e.i(162372),E=e.i(304277);e.i(566901);let G={},$=y.gql`
    fragment MultiplayerUsernameSearchUser on User {
  id
  firstName
  lastName
  fullName
  username
  image
}
    `,D=y.gql`
    query MultiplayerUsernameSearch($query: String!, $limit: Int) {
  usernameSearch(query: $query, limit: $limit) {
    id
    ...MultiplayerUsernameSearchUser
  }
}
    ${$}`;var B=e.i(183035),z=e.i(619158),N=e.i(919073),q=e.i(766299),W=e.i(643484),J=e.i(528710);let F=e=>{let r=(e=>{switch(e){case"xxs":case"xs":return 12;case"s":return 16;case"m":return 24;case"l":return 64;case"xl":return 128;default:return}})(e.size),t={...e.style};return r||(t.width="100%",t.height="100%"),(0,i.jsx)(I.Avatar,{style:t,size:r,src:e.url??null,username:e.username,fullName:null===e.fullName?void 0:e.fullName})};F.defaultProps={size:"m"},e.s(["default",0,F],54145);var Y=e.i(186327);function Q({onSubmit:e,existingUsernames:r,isDisabled:l,onChange:n,placeholder:s}){var o;let u,[d,p]=(0,U.useState)(""),c=(0,q.useIdSeed)()("invitee-search"),m=(0,z.default)(d.trim().replace(/^@/,""),250),{data:g,loading:x,error:h}=(o={skip:!m||(0,t.default)(d),variables:{query:m,limit:6}},u={...G,...o},E.useQuery(D,u)),{showError:y}=(0,b.default)();(0,U.useEffect)(()=>{h&&y(h.message)},[h,y]);let f=g?.usernameSearch,j=e=>{p(e.currentTarget.value),n?.(e.currentTarget.value)},_=i=>{"Enter"===i.key&&d.match(/.+@.+/)&&(e(d),p(""),i.currentTarget.blur())};return(0,i.jsxs)("form",{onSubmit:i=>{i.preventDefault(),e(d),p("")},clsx:Y.default.form,children:[(0,i.jsx)(A.default,{onChange:e=>{e&&p(e.username)},itemToString:e=>e?.username||"",initialHighlightedIndex:0,defaultHighlightedIndex:0,children:({getInputProps:e,getItemProps:t,getMenuProps:l,isOpen:n,highlightedIndex:o,getRootProps:u})=>(0,i.jsxs)(k.View,{clsx:Y.default.searchContainer,...u({refKey:"innerRef"}),children:[(0,i.jsx)(J.Input,{id:c,...e({ref:null,name:c,value:d,onChange:j,placeholder:s??"Enter username or email",autoComplete:"off","data-1p-ignore":!0,"data-lpignore":"true","data-protonpass-ignore":"true",onKeyDown:_})}),n?(0,i.jsxs)(k.View,{children:[f&&f.length?(0,i.jsx)(N.ShadesSurface,{clsx:Y.default.dropdownMenu,tag:"ul",...l({refKey:"innerRef"}),children:f.map((e,l)=>(0,i.jsxs)(k.View,{tag:"li",...t({item:e,index:l}),p:8,row:!0,gap:8,justify:"space-between",align:"center",clsx:[Y.default.result,{[Y.default.resultActive]:l===o}],children:[(0,i.jsxs)(k.View,{row:!0,gap:8,align:"center",children:[(0,i.jsx)(F,{size:"m",url:e.image,username:e.username,fullName:e.fullName}),(0,i.jsx)(R.Text,{multiline:!1,translate:"no",children:e.fullName||e.username})]}),r.includes(e.username)?(0,i.jsx)(k.View,{children:(0,i.jsx)(B.default,{color:S.tokens.accentPositiveStronger})}):null]},l))}):null,x?(0,i.jsx)(N.ShadesSurface,{clsx:Y.default.dropdownMenu,children:(0,i.jsxs)(k.View,{p:8,row:!0,gap:8,align:"center",children:[(0,i.jsx)(a.default,{}),(0,i.jsx)(R.Text,{color:"dimmer",multiline:!1,children:"Loading…"})]})}):null,f&&0===f.length?(0,i.jsx)(N.ShadesSurface,{clsx:Y.default.dropdownMenu,children:(0,i.jsxs)(R.Text,{clsx:Y.default.emptyText,color:"dimmer",multiline:!1,children:['No results found for "',d,'"']})}):null]}):null]})}),(0,i.jsx)(k.View,{children:(0,i.jsx)(W.Button,{colorway:d?"primary":void 0,type:"submit",disabled:l||!d,text:"Invite"})})]})}e.s(["default",0,Q],32260);var H=e.i(201894);e.i(244945);var K=e.i(982312);e.s(["MultiplayerManagerV2",0,({replId:e,handleUpgradeTriggered:m})=>{let g=(0,r.useRouter)(),x=(0,c.isInBonsaiWebview)(g),h=(0,d.useCollaboratorLimit)(),{addOrInviteReplMultiplayer:y,loadingAddMutation:f,inviteError:j,clearInviteError:_}=P({isMobileApp:x,isTeam:!1,handleUpgradeTriggered:m,replId:e,showErrorToast:!1}),{trackClick:v}=(0,p.useTrackClick)(),{data:w,loading:b}=(0,n.useMultiplayerManagerQuery)({variables:{replId:e},pollInterval:8e3}),M=w?.getRepl.__typename==="Repl"?w.getRepl:null,I=w?.currentUser,C=(M?.collaborators??[]).reduce((e,{user:i})=>[...e,i.username],[]),V=M?.authorizations.editPermissions.isAuthorized||!1,U=!!(M&&!C.length&&!M.multiplayerInvites.length&&!(M.isOwner&&I?.username)),O=M?.collaborators.map(({user:e})=>e)??[],L=O.find(e=>e.id===I?.id),A=O.filter(e=>e.id!==I?.id),E=A.length,G=(0,i.jsxs)(i.Fragment,{children:[null===E||I?.isSubscribed?null:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(R.Text,{variant:"small",color:"dimmest","aria-hidden":!0,multiline:!1,children:[E," / ",s.LEGACY_STARTER_MULTIPLAYER_LIMIT]}),(0,i.jsx)(H.MeasureBar,{clsx:K.default.measureBar,total:s.LEGACY_STARTER_MULTIPLAYER_LIMIT,current:E,tooltip:`${s.LEGACY_STARTER_MULTIPLAYER_LIMIT-E} free editors remaining`})]}),b||I?.isSubscribed||x?null:(0,i.jsx)(o.default,{size:"small",context:"workspace_multiplayer_header",onClickCallback:()=>{m&&m(!0)},onCancel:()=>{m&&m(!1)}})]});return(0,i.jsx)(N.ShadesSurface,{clsx:K.default.root,elevate:!1,gap:12,align:"stretch",grow:!0,shrink:!0,px:12,children:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(k.View,{row:!0,justify:"space-between",align:"center",clsx:{[K.default.headerMobile]:x},children:[(0,i.jsx)(R.Text,{variant:"subheadDefault",multiline:!1,children:"Invite"}),(0,i.jsxs)(k.View,{row:!0,gap:8,align:"center",children:[b?(0,i.jsxs)(k.View,{row:!0,gap:4,align:"center",grow:!0,justify:"center",children:[(0,i.jsx)(a.default,{color:S.tokens.foregroundDimmer}),(0,i.jsx)(R.Text,{color:"dimmer",multiline:!1,children:"Loading..."})]}):null,"data"!==h.type||h.shouldEnforceMultiplayerLimit?(0,i.jsx)(u.CollaboratorCountV2,{customer:I?.customer,isAdmin:M?.isOwner??!1}):G]})]}),(0,i.jsxs)(k.View,{gap:12,children:[V&&C&&M?(0,i.jsx)(k.View,{clsx:K.default.searchContainer,children:(0,i.jsx)(Q,{existingUsernames:C,onSubmit:i=>{_(),b&&!I?.isSubscribed||f||(v({productArea:"multiplayer",target:"invite_modal_invite_button",properties:{invitee:i,inviteMethod:(0,t.default)(i)?"email":"username"}}),y({variables:{input:{replId:e,target:{method:(0,t.default)(i)?l.MultiplayerInviteMethod.Email:l.MultiplayerInviteMethod.Username,value:i},level:l.ReplPermissionLevel.Rw}}}))},onChange:e=>{e||_()}})}):null,j?(0,i.jsx)(u.InviteErrorBanner,{customer:I?.customer,isAdmin:M?.isOwner??!1,errorMessage:j}):null]}),U?(0,i.jsx)(k.View,{clsx:K.default.emptyContainer,gap:16,py:16,justify:"start",children:(0,i.jsx)(R.Text,{color:"dimmest",multiline:!1,children:"No one else is here"})}):(0,i.jsxs)(k.View,{gap:12,children:[(0,i.jsx)(R.Text,{variant:"small",multiline:!1,clsx:K.default.accessLabel,children:"Access"}),(0,i.jsxs)(k.View,{gap:8,clsx:K.default.userList,children:[M?.isOwner&&!L&&I?.username?(0,i.jsx)(T,{isPendingInvitation:!1,replId:e,canEditMultiplayers:V,user:{id:I.id,username:I.username,fullName:I.fullName,image:I.image,url:I.url},isCurrentUser:!0,isOwner:!0}):null,L?(0,i.jsx)(T,{isPendingInvitation:!1,replId:e,canEditMultiplayers:V,user:L,isCurrentUser:!0,isOwner:M?.isOwner||!1},L.id):null,A.map(r=>r?(0,i.jsx)(T,{isPendingInvitation:!1,replId:e,canEditMultiplayers:V,user:r},r.id):null),M?.multiplayerInvites.map(r=>(0,i.jsx)(T,{canEditMultiplayers:V,replId:e,isPendingInvitation:!0,email:r.email},r.email))]})]})]})})}],29685)},195445,e=>{"use strict";var i=e.i(973245),r=e.i(309169),t=e.i(304277);e.i(566901);let l={},n=i.gql`
    query TeamMultiplayerManagerMultiplayers($replId: String!) {
  currentUser {
    id
  }
  getRepl(id: $replId) {
    ... on Repl {
      id
      isOwner
      collaborators {
        type
        permission
        user {
          ...MultiplayerUser
        }
      }
      authorizations {
        editPermissions {
          isAuthorized
        }
        inviteGuests {
          isAuthorized
        }
      }
      multiplayerInvites {
        email
        type
      }
      owner {
        ... on User {
          id
        }
        ... on Team {
          id
          username
          displayName
          capabilities {
            isBusinessPlan
            hasValidSubscription
            availableSeats
          }
          members {
            id
            permissions
            user {
              id
              ...MultiplayerUser
            }
          }
        }
      }
    }
  }
}
    ${r.MultiplayerUserFragmentDoc}`;e.s(["TeamMultiplayerManagerMultiplayersDocument",0,n,"useTeamMultiplayerManagerMultiplayersQuery",0,function(e){let i={...l,...e};return t.useQuery(n,i)}])},872217,e=>{e.v({controls:"AddGuestWarning-module__W9lS1G__controls",root:"AddGuestWarning-module__W9lS1G__root",textContainer:"AddGuestWarning-module__W9lS1G__textContainer"})},619028,e=>{e.v({limitsContainer:"CollaboratorCount-module__AJ4Xza__limitsContainer",measureBar:"CollaboratorCount-module__AJ4Xza__measureBar",measureBarWrapper:"CollaboratorCount-module__AJ4Xza__measureBarWrapper",pill:"CollaboratorCount-module__AJ4Xza__pill"})},108832,e=>{e.v({root:"MultiplayerManagerListItem-module__AJfZhq__root",userContainer:"MultiplayerManagerListItem-module__AJfZhq__userContainer",userContainerPending:"MultiplayerManagerListItem-module__AJfZhq__userContainerPending"})},238550,e=>{e.v({emptyContainer:"MultiplayerManager-module__z8jLqa__emptyContainer",headerMobile:"MultiplayerManager-module__z8jLqa__headerMobile",measureBar:"MultiplayerManager-module__z8jLqa__measureBar",root:"MultiplayerManager-module__z8jLqa__root",searchContainer:"MultiplayerManager-module__z8jLqa__searchContainer",userGroupTitle:"MultiplayerManager-module__z8jLqa__userGroupTitle",userList:"MultiplayerManager-module__z8jLqa__userList"})},475157,e=>{e.v({self:"InviteDialogV2-module__ZpKR4a__self"})},295132,e=>{e.v({copyToClipboard:"JoinLink-module__Aod6wq__copyToClipboard",globeIconContainer:"JoinLink-module__Aod6wq__globeIconContainer",input:"JoinLink-module__Aod6wq__input",inviteUrlContainer:"JoinLink-module__Aod6wq__inviteUrlContainer",link:"JoinLink-module__Aod6wq__link",textAlignLeft:"JoinLink-module__Aod6wq__textAlignLeft",title:"JoinLink-module__Aod6wq__title"})},147500,e=>{e.v({self:"InviteDialog-module__-OK-RW__self"})},495662,e=>{"use strict";var i=e.i(276385),r=e.i(269848),t=e.i(206406),l=e.i(29685),n=e.i(647906),a=e.i(420180),s=e.i(389959),o=e.i(84466),u=e.i(908796),d=e.i(195445),p=e.i(612343),c=e.i(753451),m=e.i(643484),g=e.i(8047),x=e.i(61732),h=e.i(872217);function y({email:e,onInvite:r,onCancel:t}){return(0,i.jsxs)(x.View,{clsx:h.default.root,p:24,children:[(0,i.jsx)(g.Header,{level:3,textAlign:"center",variant:"subheadBig",children:"Are you sure?"}),(0,i.jsx)(x.View,{clsx:h.default.textContainer,children:(0,i.jsxs)(g.Text,{variant:"text",children:[(0,i.jsx)(x.View,{tag:"p",pb:16,children:"Adding an external user as a guest to this App will give the user read and write access. Please confirm the below email address before inviting the user as a guest."}),(0,i.jsx)("p",{children:e})]})}),(0,i.jsxs)(x.View,{clsx:h.default.controls,children:[(0,i.jsx)(m.Button,{onClick:t,text:"Cancel"}),(0,i.jsx)(m.Button,{colorway:"primary",onClick:r,text:"Invite"})]})]})}var f=e.i(54731),j=e.i(486898),_=e.i(416746),v=e.i(810394),w=e.i(3466),b=e.i(368258),M=e.i(784763);e.i(450717);var S=e.i(242917),I=e.i(480028),C=e.i(201894),R=e.i(744006),k=e.i(244945),V=e.i(619028);let T=({modalState:e})=>{let t=(0,M.useCollaboratorLimit)(),{show:l}=(0,S.useGlobalModal)(),n=(0,s.useCallback)(()=>{"data"===t.type&&t.refetch(),"open"===e.type&&e.onUpgradeSuccess()},[t,e]),{showUpgradeModal:a}=(0,b.useCoreUpgradeModal)({onPurchaseComplete:n}),o=(0,s.useCallback)(async()=>{if("data"!==t.type)return;let{isStarterUser:e}=t;e?await a():await l("MembershipPurchaseModal",{analyticsContext:{upgrade:{context:"workspace_multiplayer_header"}},onPurchaseComplete:n})},[t,a,l,n]);if((0,s.useEffect)(()=>{e?.type==="open"&&"data"===t.type&&o()},[e?.type,t.type,o]),"loading"===t.type)return(0,i.jsxs)(x.View,{grow:!0,justify:"center",row:!0,gap:4,align:"center",children:[(0,i.jsx)(r.default,{color:I.tokens.foregroundDimmer}),(0,i.jsx)(g.Text,{color:"dimmer",multiline:!1,children:"Loading..."})]});if("data"!==t.type)return null;let{collaboratorCount:u,collaboratorLimit:d}=t,p=Math.max(0,d-u);return(0,i.jsx)(x.View,{row:!0,gap:8,children:(0,i.jsxs)(x.View,{clsx:V.default.limitsContainer,align:"center",row:!0,gap:8,pr:8,children:[(0,i.jsx)(k.Tooltip,{tooltip:`Your account is limited to ${d} collaborators. Manage your collaborators on the Usage page.`,children:(0,i.jsx)(R.Pill,{colorway:"yellow",clsx:V.default.pill,text:`${u} / ${d}`,onClick:o})}),(0,i.jsx)(x.View,{clsx:V.default.measureBarWrapper,onClick:o,children:(0,i.jsx)(C.MeasureBar,{clsx:V.default.measureBar,total:d,current:u,tooltip:`${p} account collaborators remaining`,backgroundColor:I.tokens.yellowDimmer,color:I.tokens.yellowDefault})})]})})};var U=e.i(955410),O=e.i(157630),L=e.i(806685),P=e.i(602686),A=e.i(658351),E=e.i(488299),G=e.i(54145),$=e.i(108832);let D=e=>{let{isPendingInvitation:r,canEditMultiplayers:t,replId:l}=e,{removeMultiplayerUser:n,loadingRemoveUser:a,deleteMultiplayerInvite:s,loadingDeleteInvite:o}=(0,A.default)(),u=!r;return(0,i.jsxs)(x.View,{clsx:$.default.root,px:16,py:4,row:!0,gap:8,align:"center",justify:"space-between",children:[u?(0,i.jsx)(O.default,{href:`/@${e.user.username}`,clsx:$.default.userContainer,children:(0,i.jsxs)(x.View,{row:!0,gap:8,align:"center",children:[(0,i.jsx)(G.default,{size:"m",url:e.user.image,username:e.user.username,fullName:e.user.fullName}),(0,i.jsx)(g.Text,{height:"singleLine",translate:"no",children:e.user.fullName||e.user.username})]})}):(0,i.jsxs)(x.View,{clsx:$.default.userContainerPending,row:!0,grow:!0,gap:8,align:"center",children:[(0,i.jsx)(L.default,{color:I.tokens.outlineDefault,size:32}),(0,i.jsx)(g.Text,{color:"dimmest",multiline:!1,children:e.email})]}),(0,i.jsxs)(x.View,{row:!0,gap:8,align:"center",children:[(0,i.jsx)(g.Text,{color:"dimmest",variant:"small",multiline:!1,children:e.isPendingInvitation?"Invited":"Can edit"}),t?(0,i.jsx)(E.IconButton,{alt:u?"Remove member":"Cancel invitation",onClick:()=>{!t||a||o||(u?n({variables:{replId:l,username:e.user.username}}):s({variables:{replId:l,email:e.email}}))},children:(0,i.jsx)(P.default,{size:12})}):null]})]})},B=e=>(0,i.jsx)(D,{...e});var z=e.i(703929),N=e.i(32260);e.i(281823);var q=e.i(321409),W=e.i(919073),J=e.i(238550);function F(e,i){return i.some(i=>i.id===e)}let Y=({title:e,count:r,color:t,tooltip:l})=>(0,i.jsxs)(x.View,{row:!0,gap:4,align:"center",children:[(0,i.jsx)(j.default,{color:t,size:6}),(0,i.jsx)(g.Text,{variant:"small",clsx:J.default.userGroupTitle,multiline:!1,children:e}),(0,i.jsx)(g.Text,{multiline:!1,variant:"small",color:"dimmest",clsx:J.default.userGroupTitle,children:r}),l?(0,i.jsx)(k.Tooltip,{tooltip:l,children:(0,i.jsx)(_.default,{})}):null]}),Q=({replId:e,handleUpgradeTriggered:t})=>{let l=(0,a.useRouter)(),n=(0,c.isInBonsaiWebview)(l),d=(0,M.useCollaboratorLimit)(),{addOrInviteReplMultiplayer:p,loadingAddMutation:m}=(0,z.default)({isMobileApp:n,isTeam:!1,handleUpgradeTriggered:t,replId:e}),{trackClick:h}=(0,U.useTrackClick)(),y=(0,q.useActiveUsers)(),[j,_]=(0,s.useState)({type:"closed"}),{data:b,loading:S}=(0,f.useMultiplayerManagerQuery)({variables:{replId:e},pollInterval:8e3}),R=b?.getRepl.__typename==="Repl"?b.getRepl:null,k=b?.currentUser,V=(R?.collaborators??[]).reduce((e,{user:i})=>[...e,i.username],[]),O=R?.authorizations.editPermissions.isAuthorized||!1,L=!!(R&&!V.length&&!R.multiplayerInvites.length),P=R?.collaborators.map(({user:e})=>e).filter(e=>e.id!==k?.id),A=P?.filter(e=>e&&F(e.id,y)),E=P?.filter(e=>e&&!F(e.id,y)),G=P?P.length:null,$=(0,i.jsxs)(i.Fragment,{children:[null===G||k?.isSubscribed?null:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(g.Text,{variant:"small",color:"dimmest","aria-hidden":!0,multiline:!1,children:[G," / ",v.LEGACY_STARTER_MULTIPLAYER_LIMIT]}),(0,i.jsx)(C.MeasureBar,{clsx:J.default.measureBar,total:v.LEGACY_STARTER_MULTIPLAYER_LIMIT,current:G,tooltip:`${v.LEGACY_STARTER_MULTIPLAYER_LIMIT-G} free editors remaining`})]}),S||k?.isSubscribed||n?null:(0,i.jsx)(w.default,{size:"small",context:"workspace_multiplayer_header",onClickCallback:()=>{t&&t(!0)},onCancel:()=>{t&&t(!1)}})]});return(0,i.jsx)(W.ShadesSurface,{clsx:J.default.root,elevate:!1,gap:12,align:"stretch",grow:!0,shrink:!0,px:12,children:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(x.View,{row:!0,justify:"space-between",align:"center",clsx:{[J.default.headerMobile]:n},children:[(0,i.jsx)(x.View,{row:!0,gap:4,align:"center",children:(0,i.jsx)(g.Text,{variant:"subheadDefault",multiline:!1,children:"Multiplayers"})}),(0,i.jsxs)(x.View,{row:!0,gap:8,align:"center",children:[S?(0,i.jsxs)(x.View,{row:!0,gap:4,align:"center",grow:!0,justify:"center",children:[(0,i.jsx)(r.default,{color:I.tokens.foregroundDimmer}),(0,i.jsx)(g.Text,{color:"dimmer",multiline:!1,children:"Loading..."})]}):null,"data"===d.type&&d.shouldEnforceMultiplayerLimit?(0,i.jsx)(T,{modalState:j}):$]})]}),O&&V&&R?(0,i.jsx)(x.View,{clsx:J.default.searchContainer,children:(0,i.jsx)(N.default,{existingUsernames:V,onSubmit:i=>{if(S&&!k?.isSubscribed||m)return;h({productArea:"multiplayer",target:"invite_modal_invite_button",properties:{invitee:i,inviteMethod:(0,o.default)(i)?"email":"username"}});let r=new Set(("data"===d.type?[...d.collaboratorsByRepl.values()].map(({users:e})=>e).flat():[]).map(e=>e.username)),t="data"===d.type&&d.shouldEnforceMultiplayerLimit&&d.collaboratorCount>=d.collaboratorLimit&&!r.has(i),l={method:(0,o.default)(i)?u.MultiplayerInviteMethod.Email:u.MultiplayerInviteMethod.Username,value:i},n=()=>p({variables:{input:{replId:e,target:l,level:u.ReplPermissionLevel.Rw}}});t?_({type:"open",onUpgradeSuccess:n}):n()}})}):null,L?(0,i.jsx)(x.View,{clsx:J.default.emptyContainer,gap:16,py:16,justify:"start",children:(0,i.jsx)(x.View,{children:(0,i.jsx)(g.Text,{color:"dimmest",multiline:!1,children:"No one else is here"})})}):(0,i.jsxs)(W.ShadesSurface,{clsx:J.default.userList,elevate:!1,children:[A?.length?(0,i.jsxs)(x.View,{gap:8,children:[(0,i.jsx)(Y,{title:"Online",count:A.length||0,color:I.tokens.greenStrongest}),A.map(r=>r?(0,i.jsx)(B,{isPendingInvitation:!1,replId:e,canEditMultiplayers:O,user:r},r.id):null)]}):null,E?.length?(0,i.jsxs)(x.View,{gap:8,children:[(0,i.jsx)(Y,{title:"Offline",count:E.length||0,color:I.tokens.outlineStrongest}),E?.map(r=>r?(0,i.jsx)(B,{canEditMultiplayers:O,isPendingInvitation:!1,user:r,replId:e},r.id):null)]}):null,R?.multiplayerInvites.length?(0,i.jsxs)(x.View,{gap:8,children:[(0,i.jsx)(Y,{title:"Pending Invitations",count:R?.multiplayerInvites.length||0,color:I.tokens.outlineStrongest}),R.multiplayerInvites.map(r=>(0,i.jsx)(B,{canEditMultiplayers:O,replId:e,isPendingInvitation:!0,email:r.email},r.email))]}):null]})]})})},H=e=>e.isUnifiedPlanEnabled?(0,i.jsx)(l.MultiplayerManagerV2,{...e}):(0,i.jsx)(Q,{...e});var K=e.i(528326),X=e.i(145315);function Z({replId:e}){let t=(0,a.useRouter)(),l=(0,c.isInBonsaiWebview)(t),n=(0,q.useActiveUsers)(),[m,h]=(0,s.useState)(null),{data:f,loading:j}=(0,d.useTeamMultiplayerManagerMultiplayersQuery)({variables:{replId:e}}),_=f?.currentUser?.id||null,v=f?.getRepl.__typename==="Repl"?f.getRepl:null,{addOrInviteReplMultiplayer:w,loadingAddMutation:b}=(0,z.default)({isMobileApp:l,isTeam:!0,replId:e});if(v&&!v.owner)throw Error("Cannot manage members on anon repls");if(v?.owner&&v?.owner.__typename!=="Team")throw Error("Expect repl owned by a team");let M=v?.owner?.__typename==="Team"?v.owner:null,S=!M?.capabilities?.hasValidSubscription&&!M?.capabilities?.isBusinessPlan,C=(v?.collaborators??[]).reduce((e,i)=>{let{username:r}=i.user;return -1===e.indexOf(r)&&e.push(),e},[]),R=v?.multiplayerInvites,k=(v?.collaborators??[]).filter(e=>"guest"===e.type).map(e=>e.user),V=k.length,T=(v?.collaborators??[]).filter(e=>"member"===e.type).map(e=>e.user),U=(v?.collaborators??[]).filter(e=>"admin"===e.type).map(e=>e.user),O=U.some(e=>e.id===_),L=T.filter(e=>n.some(i=>i.id===e.id)),P=T.filter(e=>!n.some(i=>i.id===e.id)),A=v?.authorizations.editPermissions.isAuthorized??!1,E=v?.authorizations.inviteGuests.isAuthorized??!1;return j?(0,i.jsx)(W.ShadesSurface,{clsx:J.default.root,elevate:!1,gap:12,align:"stretch",grow:!0,shrink:!0,px:12,children:(0,i.jsxs)(x.View,{row:!0,gap:4,align:"center",grow:!0,justify:"center",children:[(0,i.jsx)(r.default,{color:I.tokens.foregroundDimmer}),(0,i.jsx)(g.Text,{color:"dimmer",multiline:!1,children:"Loading..."})]})}):(0,i.jsxs)(W.ShadesSurface,{clsx:J.default.root,elevate:!1,gap:12,align:"stretch",grow:!0,shrink:!0,px:12,children:[(0,i.jsx)(x.View,{row:!0,justify:"space-between",align:"center",clsx:{[J.default.headerMobile]:l},children:(0,i.jsx)(x.View,{row:!0,gap:4,align:"center",children:(0,i.jsx)(g.Text,{variant:"subheadDefault",multiline:!1,children:"Team Multiplayers"})})}),E?(0,i.jsx)(x.View,{clsx:J.default.searchContainer,children:(0,i.jsx)(N.default,{existingUsernames:C,onSubmit:i=>{if(!b){if((0,o.default)(i))return void h(i);w({variables:{input:{replId:e,target:{method:u.MultiplayerInviteMethod.Username,value:i},level:u.ReplPermissionLevel.Rw}}})}},isDisabled:j})}):null,!E&&S?(0,i.jsx)(x.View,{px:16,children:(0,i.jsx)(X.StatusBannerButton,{iconLeft:(0,i.jsx)(p.default,{}),text:`You can add people to this App by inviting them to the "${M?.displayName}" Friends Team.`,href:`/teams/${M?.username}`,target:"_blank"})}):null,(0,i.jsx)(K.Modal,{isOpen:!!m,onRequestClose:()=>h(null),children:m?(0,i.jsx)(y,{email:m,onInvite:()=>{w({variables:{input:{replId:e,target:{method:u.MultiplayerInviteMethod.Email,value:m},level:u.ReplPermissionLevel.Rw}}}),h(null)},onCancel:()=>h(null)}):null}),(0,i.jsxs)(W.ShadesSurface,{clsx:J.default.userList,elevate:!1,children:[R?.length?(0,i.jsxs)(x.View,{gap:8,children:[(0,i.jsx)(Y,{title:"Pending Invitations",color:I.tokens.outlineStrongest,count:V}),R?.map(r=>(0,i.jsx)(B,{canEditMultiplayers:O||!1,email:r.email,isPendingInvitation:!0,replId:e},r.email))]}):null,k.length?(0,i.jsxs)(x.View,{gap:8,children:[(0,i.jsx)(Y,{title:"External Guests",color:I.tokens.outlineStrongest,count:k?.length,tooltip:"External Guests are not members of your team and were invited via a Join Link or by username."}),k.map(r=>(0,i.jsx)(B,{canEditMultiplayers:O||!1,isPendingInvitation:!1,replId:e,user:r},r.id))]}):null,L.length?(0,i.jsxs)(x.View,{gap:8,children:[(0,i.jsx)(Y,{title:"Online Members",color:I.tokens.greenStrongest,count:L?.length}),L.map(r=>(0,i.jsx)(B,{isPendingInvitation:!1,canEditMultiplayers:!!O,replId:e,user:r},r.id))]}):null,P.length?(0,i.jsxs)(x.View,{gap:8,children:[(0,i.jsx)(Y,{title:"Offline Members",color:I.tokens.outlineStrongest,count:P?.length}),P.map(r=>(0,i.jsx)(B,{isPendingInvitation:!1,canEditMultiplayers:!!O,replId:e,user:r},r.id))]}):null,U.length?(0,i.jsxs)(x.View,{gap:8,children:[(0,i.jsx)(Y,{title:"Admins",color:I.tokens.accentPrimaryStronger,count:U.length}),U.map(r=>(0,i.jsx)(B,{canEditMultiplayers:!1,isPendingInvitation:!1,user:r,replId:e},r.id))]}):null,A||j?null:(0,i.jsx)(g.Text,{color:"dimmer",variant:"small",multiline:!1,children:"Only admins can add and remove members to multiplayer"})]})]})}var ee=e.i(903790),ei=e.i(127384),er=e.i(475157);let et=(0,I.cvarsFrom)("InviteDialogV2.module.css",["--header-height"]),el=({replId:e,handleUpgradeTriggered:a,isTeamRepl:s,org:o,orgQueryResult:u})=>{let d;return d=o&&u?u.loading?(0,i.jsx)(x.View,{px:12,align:"center",justify:"center",children:(0,i.jsx)(r.default,{})}):(0,i.jsx)(n.OrgReplPermissionsV2,{queryResult:u}):s?(0,i.jsx)(Z,{replId:e}):(0,i.jsx)(l.MultiplayerManagerV2,{replId:e,handleUpgradeTriggered:a}),(0,i.jsxs)(W.ShadesSurface,{clsx:er.default.self,elevate:!1,background:!0,pt:12,pb:8,gap:12,align:"stretch",grow:!0,shrink:!0,style:{[et.headerHeight]:`${ei.HEADER_HEIGHT}px`},children:[d,o?null:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(ee.DividerH,{}),(0,i.jsx)(t.default,{replId:e})]})]})};var en=e.i(182697),ea=e.i(399245),es=e.i(882848),eo=e.i(416298),eu=e.i(320216),ed=e.i(20639),ep=e.i(415541),ec=e.i(709485),em=e.i(580519),eg=e.i(528710),ex=e.i(327391),eh=e.i(295132);let ey=()=>(0,i.jsxs)(x.View,{row:!0,gap:12,children:[(0,i.jsx)(x.View,{clsx:eh.default.globeIconContainer,children:(0,i.jsx)(ea.default,{color:I.tokens.accentPrimaryStrongest,size:20})}),(0,i.jsxs)(x.View,{children:[(0,i.jsx)(g.Text,{clsx:eh.default.title,id:"link-switch-label",multiline:!1,children:"Private join link"}),(0,i.jsx)(g.Text,{variant:"small",color:"dimmest",multiline:!1,children:"Anyone with this link can edit files"})]})]});function ef({replId:e}){let{showConfirm:t,showError:l}=(0,eu.default)(),{data:n,loading:a,error:s,refetch:o}=(0,en.useMultiplayerInviteUrlQuery)({variables:{replId:e}}),[u,d]=(0,en.useMultiplayerRefreshInviteUrlMutation)({variables:{replId:e},onError:e=>l(e.message),onCompleted:()=>t("Join link created")}),[p,c]=(0,en.useDeleteMultiplayerInviteUrlMutation)({variables:{replId:e},onError:e=>l(e.message),onCompleted:e=>{"UserError"===e.deleteMultiplayerInviteLink.__typename?l(e.deleteMultiplayerInviteLink.message):"Repl"===e.deleteMultiplayerInviteLink.__typename&&t("Join link deleted")}}),m=n?.getRepl?.__typename==="Repl"?n.getRepl:null,h=d.loading||c.loading,y=n?.getRepl?.__typename==="Repl"&&m?.owner?.__typename==="Team",f=n?.getRepl?.__typename==="Repl"&&m?.owner?.__typename==="Team"&&m?.owner.capabilities?.isBusinessPlan&&m?.owner.capabilities?.hasValidSubscription,j=n?.getRepl?.__typename==="Repl"&&m?.inviteUrl&&1?window.location.origin+m?.inviteUrl:null;return a||y&&!f?null:s?(0,i.jsxs)(x.View,{gap:12,px:12,children:[(0,i.jsxs)(x.View,{row:!0,justify:"space-between",children:[(0,i.jsx)(ey,{}),(0,i.jsx)(ex.Switch,{isSelected:!1,isDisabled:!0,"aria-labelledby":"link-switch-label"})]}),(0,i.jsx)(X.StatusBannerButton,{clsx:eh.default.textAlignLeft,iconLeft:(0,i.jsx)(eo.default,{color:I.tokens.accentNegativeStrongest}),colorway:"negative",text:"Error loading join link. Click here to try again, or contact support.",onClick:()=>o({replId:e})})]}):(0,i.jsxs)(x.View,{gap:12,px:12,children:[(0,i.jsxs)(x.View,{row:!0,justify:"space-between",children:[(0,i.jsx)(ey,{}),a?(0,i.jsxs)(x.View,{row:!0,gap:4,align:"center",children:[(0,i.jsx)(r.default,{color:I.tokens.foregroundDimmer}),(0,i.jsx)(g.Text,{color:"dimmer",multiline:!1,children:"Loading..."})]}):(0,i.jsx)(ex.Switch,{isSelected:!!j,isDisabled:h,onChange:e=>{h||(e?u():p())},"aria-labelledby":"link-switch-label"})]}),!a&&j?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(W.ShadesSurface,{clsx:eh.default.inviteUrlContainer,elevate:!1,children:[(0,i.jsx)(eg.Input,{type:"url",readOnly:!0,disabled:!0,value:h?"Loading...":j,clsx:eh.default.input}),(0,i.jsx)(em.CopyButton,{textToCopy:j,onClick:()=>{j?((0,ed.default)(j),(0,ep.track)(ec.events.JOIN_LINK_COPIED,{replId:m?.id,isTeamRepl:y,source:"replEnvironment"}),t("Link copied")):l("Could not copy link")},tooltipSuccessText:"Copied to clipboard",text:"Copy join link",iconLeft:(0,i.jsx)(es.default,{}),clsx:eh.default.copyToClipboard,colorway:"primary",disabled:h})]}),(0,i.jsx)(x.View,{children:(0,i.jsxs)(g.Text,{color:"dimmer",variant:"small",multiline:!1,children:["Want to revoke access to this link?"," ",(0,i.jsx)("a",{clsx:eh.default.link,role:"button",tabIndex:0,onKeyDown:e=>{"Enter"===e.key&&(e.preventDefault(),h||u())},onClick:e=>{e.preventDefault(),h||u()},children:"Generate a new link"})]})})]}):null]})}function ej({replId:e,isUnifiedPlanEnabled:r=!1}){return r?(0,i.jsx)(t.default,{replId:e}):(0,i.jsx)(ef,{replId:e})}var e_=e.i(19882),ev=e.i(147500);let ew=(0,I.cvarsFrom)("InviteDialog.module.css",["--header-height"]);e.s(["default",0,({replId:e,handleUpgradeTriggered:r,isTeamRepl:t,org:l,isUnifiedPlanEnabled:n=!1,orgQueryResult:a})=>{let s;return n?(0,i.jsx)(el,{replId:e,handleUpgradeTriggered:r,isTeamRepl:t,org:l,orgQueryResult:a}):(s=l?(0,i.jsx)(e_.OrgReplPermissions,{replId:e}):t?(0,i.jsx)(Z,{replId:e}):(0,i.jsx)(H,{replId:e,handleUpgradeTriggered:r,isUnifiedPlanEnabled:n}),(0,i.jsxs)(x.View,{clsx:ev.default.self,py:12,gap:12,align:"stretch",grow:!0,shrink:!0,br:8,style:{[ew.headerHeight]:`${ei.HEADER_HEIGHT}px`},children:[s,l?null:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(ee.DividerH,{}),(0,i.jsx)(ej,{replId:e,isUnifiedPlanEnabled:n})]})]}))}],495662)}]);

//# debugId=8fdff931-9540-dd52-3e31-7076fd483a75
//# sourceMappingURL=0kt~kd4h32kim.js.map