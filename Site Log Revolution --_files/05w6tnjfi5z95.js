;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="e56abe37-11d9-343c-d263-b444d8b5e665")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,166049,e=>{e.v({title:"CheckpointMetricsTooltip-module__V1lWNW__title"})},210796,e=>{e.v({breakdownDescription:"AgentWorkMetrics-module__3oZlzG__breakdownDescription",hasUsageCostBreakdown:"AgentWorkMetrics-module__3oZlzG__hasUsageCostBreakdown",strikethrough:"AgentWorkMetrics-module__3oZlzG__strikethrough",transitionSnappy:"AgentWorkMetrics-module__3oZlzG__transitionSnappy",usageCostItemLabel:"AgentWorkMetrics-module__3oZlzG__usageCostItemLabel"})},626356,e=>{"use strict";var t=e.i(276385),r=e.i(389959),i=e.i(683405),n=e.i(167392),s=e.i(416746),o=e.i(934982),a=e.i(997786),l=e.i(562782),u=e.i(8047),c=e.i(61732),d=e.i(166049);let p={timeWorked:{title:"Time worked"},workDone:{title:"Work done"},itemsRead:{title:"Items read"},codeChanged:{title:"Code changed"},agentUsage:{title:"Agent Usage"}};function m({type:e,description:r,maxWidth:i,whiteSpace:n}){let s=p[e],o={...i&&{maxWidth:i}},a={...n&&{whiteSpace:n}};return(0,t.jsxs)(c.View,{gap:4,style:o,children:[(0,t.jsx)(u.Text,{variant:"small",clsx:d.default.title,children:s.title}),r?(0,t.jsx)(u.Text,{variant:"small",style:a,children:r}):null]})}var f=e.i(480028),h=e.i(919073),S=e.i(108431),k=e.i(244945),g=e.i(210796);function E(e,t){return void 0===e||t?25:e}e.s(["WorkMetricsCard",0,function(e){let d,{workDurationSeconds:p,toolCalls:v,addedLinesOfCode:x,removedLinesOfCode:w,usageCents:T,relatedEffortBreakdowns:b,numLocRead:A,numFilesRead:y,refunded:U,workType:_,isFreeQuickEditRun:I,isLegacyUbbV1:C=!1,hideUsageCost:j=!1}=e,F=e.preDiscountsUsageCents===T?void 0:e.preDiscountsUsageCents,R=(0,r.useMemo)(()=>E(T,C),[T,C]),[$,L]=(0,r.useState)(!1),P=(0,o.default)(e=>{L(e.width<240)}),G=A??0,D=y??0,V=(void 0!==x||void 0!==w)&&(x??0)+(w??0)>0,M=void 0!==T&&T>0,O=b&&b.length>0,[W,N]=(0,r.useState)(!1);return(0,t.jsxs)(h.ShadesSurface,{elevate:"1x",br:"container",p:8,gap:8,innerRef:P,children:[void 0!==p&&p>0?(0,t.jsxs)(c.View,{row:!0,align:"center",justify:$?void 0:"space-between",children:[!$&&(0,t.jsx)(u.Text,{variant:"small",color:"default",children:"Time worked"}),(0,t.jsx)(k.Tooltip,{tooltip:(d=p<60?(0,l.default)("second",p,!0):`${(0,l.default)("minute",Math.floor(p/60),!0)} and ${(0,l.default)("second",p%60,!0)}`,$?(0,t.jsx)(m,{type:"timeWorked",description:d}):d),children:(0,t.jsx)(u.Text,{variant:"small",children:(0,a.humanizeDuration)(p)})})]}):null,void 0!==v&&v>0?(0,t.jsxs)(c.View,{row:!0,align:"center",justify:$?void 0:"space-between",children:[!$&&(0,t.jsx)(u.Text,{variant:"small",color:"default",children:"Work done"}),(0,t.jsx)(k.Tooltip,{tooltip:$?(0,t.jsx)(m,{type:"workDone",description:"Number of actions taken by Agent"}):"Number of actions taken by Agent",children:(0,t.jsx)(u.Text,{variant:"small",children:(0,l.default)("action",v,!0)})})]}):null,G>0||D>0?(0,t.jsxs)(c.View,{row:!0,align:"center",justify:$?void 0:"space-between",children:[!$&&(0,t.jsx)(u.Text,{variant:"small",color:"default",children:"Items read"}),(0,t.jsx)(k.Tooltip,{tooltip:$?(0,t.jsx)(m,{type:"itemsRead",description:`${(0,l.default)("line",G,!0)} and ${(0,l.default)("file",D,!0)}`}):`${(0,l.default)("line",G,!0)} and ${(0,l.default)("file",D,!0)}`,children:(0,t.jsx)(u.Text,{variant:"small",children:G>D?(0,l.default)("line",G,!0):(0,l.default)("file",D,!0)})})]}):null,V?(0,t.jsxs)(c.View,{row:!0,align:"center",justify:$?void 0:"space-between",children:[!$&&(0,t.jsx)(u.Text,{variant:"small",color:"default",children:"Code changed"}),(0,t.jsx)(k.Tooltip,{tooltip:$?(0,t.jsx)(m,{type:"codeChanged",description:`${(0,l.default)("line",x??0,!0)} added and ${(0,l.default)("line",w??0,!0)} removed`}):`${(0,l.default)("line",x??0,!0)} added and ${(0,l.default)("line",w??0,!0)} removed`,children:(0,t.jsxs)(c.View,{row:!0,gap:4,children:[(0,t.jsxs)(u.Text,{variant:"small",children:["+",x]}),(0,t.jsxs)(u.Text,{color:"dimmer",variant:"small",children:["-",w]})]})})]}):null,M&&!j?(0,t.jsxs)(c.View,{gap:8,children:[(0,t.jsxs)(c.View,{row:!0,align:"center",justify:$?void 0:"space-between",children:[!$&&(0,t.jsxs)(c.View,{row:!0,align:"center",onClick:()=>O?N(!W):void 0,clsx:[g.default.usageCostItemLabel,{[g.default.hasUsageCostBreakdown]:O}],gap:8,children:[(0,t.jsxs)(u.Text,{variant:"small",color:"default",children:[i.AGENT_NAME," Usage"]}),O?(0,t.jsx)(n.default,{size:16,color:f.tokens.foregroundDimmest,rotate:180*!!W,clsx:g.default.transitionSnappy}):null]}),(0,t.jsx)(c.View,{row:!0,align:"center",gap:8,children:(0,t.jsx)(k.Tooltip,{tooltip:$?(0,t.jsx)(m,{type:"agentUsage",description:"Usage is first deducted from your monthly credit",maxWidth:200,whiteSpace:"normal"}):"Usage is first deducted from your monthly credit",children:(0,t.jsxs)(c.View,{row:!0,gap:8,children:[void 0!==F&&F>0?(0,t.jsxs)(u.Text,{className:g.default.strikethrough,variant:"small",color:"dimmer",children:["$",(F/100).toFixed(2)]}):null,(0,t.jsxs)(u.Text,{variant:"small",children:["$",(R/100).toFixed(2)]})]})})})]}),O&&W?(0,t.jsx)(c.View,{pl:20,gap:8,children:b.map((e,r)=>(0,t.jsxs)(c.View,{row:!0,gap:4,align:"center",justify:"space-between",children:[(0,t.jsx)(u.Text,{variant:"small",color:"dimmest",clsx:g.default.breakdownDescription,children:function(e){if(e.effortType?.$kind==="task"&&e.effortType.task?.taskId)return e.effortType.task.description;switch(e.effortType?.$kind){case"task":return"Task execution";case"general":return"General work";case"initialization":return"Agent initialization";case"discountedEffort":return"Promo: Power mode at up to 50% off";default:return"Work completed"}}(e)}),(0,t.jsxs)(u.Text,{variant:"small",color:"dimmest",children:[e.usageCents<0?"-":"","$",(Math.abs(e.usageCents)/100).toFixed(2)]})]},r))}):null]}):null,I&&!j?(0,t.jsxs)(c.View,{row:!0,align:"center",justify:"space-between",gap:8,children:[(0,t.jsxs)(u.Text,{variant:"small",color:"default",children:[i.AGENT_NAME," Usage"]}),(0,t.jsx)(k.Tooltip,{tooltip:"Lite edits are free for a limited time",children:(0,t.jsx)(u.Text,{variant:"small",style:{color:f.tokens.accentPositiveStronger},children:"Free"})})]}):null,U&&!j?(0,t.jsx)(S.StatusBanner,{icon:(0,t.jsx)(s.default,{}),text:`You have been refunded for this ${_}`,colorway:"blue"}):null]})},"computeCostToShow",0,E],626356)},551904,e=>{"use strict";e.i(389959);var t=e.i(541793),r=e.i(814563),i=e.i(826771);e.i(473072);var n=e.i(489859),s=e.i(452317);let o=(0,r.createJSONStorage)(()=>({getItem:e=>n.default.get(e,"string"),setItem:(e,t)=>n.default.set(e,t),removeItem:e=>n.default.remove(e)})),a=(0,r.atomWithStorage)("areHiddenFilesVisible",!1,o),l=(0,t.atom)(null),u=(0,t.atom)((0,i.observableValue)(!1)),c=(0,t.atom)(!1),d=(0,t.atom)(void 0);(0,t.atom)([]);let p=(0,t.atom)(!1),m=(0,t.atom)(!1),f=(0,t.atom)(!1),h=(0,t.atom)(!1),S=(0,t.atom)(!1),k=(0,t.atom)(!1);e.s(["useAreHiddenFilesVisible",0,function(){return(0,s.useValue)(a)},"useCookieWarningBannerDismissed",0,function(){return(0,s.useValue)(c)},"useGetFileRenameInProgress",0,function(){return(0,s.useGet)(l)},"useGetHasCommitData",0,function(){return(0,s.useGet)(h)},"useHasCommitData",0,function(){return(0,s.useValue)(h)},"useInProgressMockupToAppGraduation",0,function(){return(0,s.useValue)(k)},"useIsFirstCheckpointCompleted",0,function(){return(0,s.useValue)(f)},"useIsPublishClickedCompleted",0,function(){return(0,s.useValue)(p)},"useSetAreHiddenFilesVisible",0,function(){return(0,s.useSet)(a)},"useSetCookieWarningBannerDismissed",0,function(){return(0,s.useSet)(c)},"useSetFileRenameInProgress",0,function(){return(0,s.useSet)(l)},"useSetHasCommitData",0,function(){return(0,s.useSet)(h)},"useSetInProgressMockupToAppGraduation",0,function(){return(0,s.useSet)(k)},"useSetIsFirstCheckpointCompleted",0,function(){return(0,s.useSet)(f)},"useSetIsFirstSessionCheckpointCompleted",0,function(){return(0,s.useSet)(S)},"useSetPublishClickedCompleted",0,function(){return(0,s.useSet)(p)},"useSetShouldShowRandomCheckpointSurvey",0,function(){return(0,s.useSet)(m)},"useShouldShowRandomCheckpointSurvey",0,function(){return(0,s.useValue)(m)},"useThreadFiltersPanelExpandedState",0,function(){return[(0,s.useValue)(d),(0,s.useSet)(d)]},"useWebviewPortOpenedObservable",0,function(){return(0,s.useValue)(u)}])},584888,e=>{"use strict";e.s(["convertTimestampToNumber",0,function(e){let{seconds:t,nanos:r}=e;return Number(t||0)+(r||0)/1e9},"getActiveFileForUser",0,function(e){for(let t of e.sessions.sort((e,t)=>e.timestamp-t.timestamp))if(t.activeFile)return t.activeFile;return null},"getUserForSession",0,function(e,t){let r=t.find(t=>t.sessions.some(t=>t.id===e));if(!r)throw Error(`Expected user with session ID ${e}`);return r}])},321164,e=>{"use strict";var t=e.i(973245),r=e.i(304277),i=e.i(566901),n=e.i(951262);let s={},o=t.gql`
    fragment WorkspaceSharedSecret on SharedSecret {
  id
  name
  description
  version
  timeCreated
  timeUpdated
  owner {
    __typename
    ... on User {
      id
    }
  }
  value
  signedUrl
}
    `,a=t.gql`
    fragment WorkspaceSharedSecretLink on SharedSecretLink {
  id
  alias
  secret {
    ...WorkspaceSharedSecret
  }
}
    ${o}`,l=t.gql`
    query SecretsPaneAuthorizations($replId: String!) {
  getRepl(id: $replId) {
    __typename
    ... on Repl {
      id
      isOwner
      authorizations {
        editSecrets {
          isAuthorized
          message
        }
      }
    }
    ... on Error {
      message
    }
  }
}
    `,u=t.gql`
    query WorkspaceSecrets($secretsInput: SecretsInput) {
  currentUser {
    id
    secrets(input: $secretsInput) {
      ... on SharedSecretConnection {
        items {
          ...WorkspaceSharedSecret
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          nextCursor
          previousCursor
        }
      }
    }
  }
}
    ${o}`,c=t.gql`
    query ReplLinkedSecrets($replId: String!) {
  getRepl(id: $replId) {
    __typename
    ... on Repl {
      id
      sharedSecretLinks {
        ...WorkspaceSharedSecretLink
      }
    }
  }
}
    ${a}`,d=t.gql`
    query WorkspaceAndReplLinkedSecrets($replId: String!) {
  currentUser {
    id
    secrets {
      ... on SharedSecretConnection {
        items {
          ...WorkspaceSharedSecret
        }
      }
    }
  }
  getRepl(id: $replId) {
    __typename
    ... on Repl {
      id
      sharedSecretLinks {
        ...WorkspaceSharedSecretLink
      }
    }
  }
}
    ${o}
${a}`,p=t.gql`
    mutation LinkSharedSecrets($input: LinkSharedSecretsInput!) {
  linkSharedSecrets(input: $input) {
    ... on LinkSharedSecretsResult {
      links {
        ...WorkspaceSharedSecretLink
      }
    }
    ... on Error {
      message
    }
  }
}
    ${a}`,m=t.gql`
    mutation UnlinkSharedSecrets($input: UnlinkSharedSecretsInput!) {
  unlinkSharedSecrets(input: $input) {
    ... on UnlinkSharedSecretsResult {
      success
    }
    ... on Error {
      message
    }
  }
}
    `,f=t.gql`
    mutation UpdateSharedSecretLink($input: UpdateSharedSecretLinkInput!) {
  updateSharedSecretLink(input: $input) {
    ... on UpdateSharedSecretLinkOutput {
      ...WorkspaceSharedSecretLink
    }
    ... on Error {
      message
    }
  }
}
    ${a}`;e.s(["ReplLinkedSecretsDocument",0,c,"WorkspaceSecretsDocument",0,u,"useLinkSharedSecretsMutation",0,function(e){let t={...s,...e};return n.useMutation(p,t)},"useReplLinkedSecretsQuery",0,function(e){let t={...s,...e};return r.useQuery(c,t)},"useSecretsPaneAuthorizationsQuery",0,function(e){let t={...s,...e};return r.useQuery(l,t)},"useUnlinkSharedSecretsMutation",0,function(e){let t={...s,...e};return n.useMutation(m,t)},"useUpdateSharedSecretLinkMutation",0,function(e){let t={...s,...e};return n.useMutation(f,t)},"useWorkspaceAndReplLinkedSecretsLazyQuery",0,function(e){let t={...s,...e};return i.useLazyQuery(d,t)},"useWorkspaceSecretsQuery",0,function(e){let t={...s,...e};return r.useQuery(u,t)}])},7106,e=>{"use strict";var t=e.i(276385),r=e.i(389959),i=e.i(541793),n=e.i(208008),s=e.i(594709),o=e.i(936423),a=e.i(933302);e.s(["DeploymentProvider",0,function(e){let l=(0,a.useExperimentParam)("autoscale_default_machine_config","default_vcpu","2"),u=(0,a.useExperimentParam)("autoscale_default_machine_config","default_memory","4"),[c]=(0,r.useState)(()=>(function({container:e,fs:t,dotReplit:r,ports:o,secrets:a,defaultMachineConfig:l}){let u=(0,i.createStore)();u.set(n.containerAtom,e),u.set(n.fsAtom,t),u.set(n.dotReplitAtom,r),u.set(n.portsAtom,o),u.set(n.secretsAtom,a);let c=s.CPUValues.findIndex(e=>e.toString()===l.vcpu),d=s.RAMValues.findIndex(e=>e.toString()===l.memory);return c>=0&&d>=0&&(u.set(s.cpuIndexAtom,c),u.set(s.ramIndexAtom,d)),u})({fs:e.fs,container:e.container,dotReplit:e.dotReplit,ports:e.ports,secrets:e.secrets,defaultMachineConfig:{vcpu:l,memory:u}}));return(0,t.jsxs)(o.DeploymentContext.Provider,{value:c,children:[e.children,(0,t.jsx)(n.Init,{replId:e.replId,orgId:e.orgId})]})}],7106)},463358,e=>{"use strict";var t=e.i(862927),r=e.i(973245);let i=r.gql`
    query GitAuth($input: GitProviderContextInput) {
  currentUser {
    id
    gitHubInfo {
      accessToken
    }
    gitHubInfoV2(input: $input) {
      accessToken
    }
    bitbucketInfo(input: $input) {
      accessToken
    }
  }
}
    `;var n=e.i(960933);let s=n.Type.Object({id:n.Type.String(),user_id:n.Type.Number(),ssh_hostname:n.Type.String(),token:n.Type.String()});var o=e.i(968323),a=e.i(423310),l=e.i(429843),u=e.i(871752);let c=["http:","https:","vscode:"];async function d({replId:e}){let r=await (0,o.tryCatchAsync)(()=>(0,u.postJson)(`/data/repls/${e}/get_ssh_token`));return r.error?{type:"error",message:r.error.toString()}:t.Value.Check(s,r.value)?{type:"success",data:r.value}:{type:"error",message:"Invalid JSON"}}async function p(e){if(!a.apolloClient)throw Error("Expected apollo");let{data:t}=await a.apolloClient.query({query:i,variables:{input:{orgId:e}}});if(!t?.currentUser)throw Error("Expected current user");return t.currentUser}function m(){document.activeElement instanceof HTMLElement&&document.activeElement.blur()}e.s(["default",0,function({container:e,fs:t,openMultipleFiles:r,openMultipleURLs:i,enableReplspaceSshTokenPassthrough:n=!1}){let s=new Set,o=!1,a=null;return e.openChannel({service:"open",name:"open"},({channel:e})=>{e.onCommand(e=>{if("replspaceApiOpenMultipleFiles"===e.body){if(!e.replspaceApiOpenMultipleFiles)throw Error("Expected replspaceApiOpenMultipleFiles");let{files:t,urls:n}=e.replspaceApiOpenMultipleFiles,s=n.flatMap(e=>{let t;try{t=new URL(e)}catch{return[]}return c.includes(t.protocol)?[t]:[]});r&&t.length>0&&(m(),r({paths:t})),i&&s.length>0&&(m(),i({urls:s.map(e=>e.toString())}))}})}),e.openChannel({service:"git",name:"git"},({channel:e})=>(e.onCommand(async i=>{switch(i.body){case"replspaceApiOpenFile":{if(!i.replspaceApiOpenFile)throw Error("Expected replspaceApiOpenFile");let{file:n,waitForClose:s,nonce:o}=i.replspaceApiOpenFile;if(r){if(m(),r({paths:[n]}),!s||!a)return;await a(n)}else{if(!n.endsWith(".git/COMMIT_EDITMSG")){s&&e.send({replspaceApiCloseFile:{file:n,nonce:o}}),window.alert(`tried to open ${n} but failed`);return}let r=window.prompt("Enter a commit message");if(await t.writeFile(n,r??""),!s)return}if(await t.flush(),"open"!==e.status)return;e.send({replspaceApiCloseFile:{file:n,nonce:o}});return}case"replspaceApiGetGitHubToken":{if(!i.replspaceApiGetGitHubToken)throw Error("Expected replspaceApiGetGitHubToken");let t=()=>{"open"===e.status&&e.send({replspaceApiGitHubToken:{token:"",nonce:i.replspaceApiGetGitHubToken?.nonce}})},r=await p();if(null==r.gitHubInfoV2&&null==r.gitHubInfo)return void t();if(!s.size){t(),l.logger.error("Got a replspaceApiGetGitHubToken command but no confirm listener is set up");return}let n=()=>{"open"===e.status&&e.send({replspaceApiGitHubToken:{token:r.gitHubInfoV2?.accessToken??r.gitHubInfo?.accessToken,nonce:i.replspaceApiGetGitHubToken?.nonce}})};if(o)return void n();let a=!1,u=()=>{for(let e of s)e(null)};for(let e of s){if(a)break;e((e,r=!0)=>{if(!a){if(a=!0,!e){t(),u();return}r&&(o=e),n(),u()}})}return}case"replspaceApiGetBitbucketToken":{if(!i.replspaceApiGetBitbucketToken)throw Error("Expected replspaceApiGetBitbucketToken");let t=()=>{"open"===e.status&&e.send({replspaceApiBitbucketToken:{token:"",nonce:i.replspaceApiGetBitbucketToken?.nonce}})},r=await p();if(null==r.bitbucketInfo)return void t();if(!s.size){t(),l.logger.error("Got a replspaceApiGetBitbucketToken command but no confirm listener is set up");return}let n=()=>{"open"===e.status&&e.send({replspaceApiBitbucketToken:{token:r.bitbucketInfo?.accessToken,nonce:i.replspaceApiGetBitbucketToken?.nonce}})};if(o)return void n();let a=!1,u=()=>{for(let e of s)e(null)};for(let e of s){if(a)break;e((e,r=!0)=>{if(!a){if(a=!0,!e){t(),u();return}r&&(o=e),n(),u()}})}}}}),()=>{})),n&&e.openChannel({service:"sshtoken",name:"sshtoken"},({channel:e})=>{e.onCommand(async t=>{if(!t.replspaceApiSSHTokenGetRequest)throw Error("Expected replspaceApiSSHTokenGetRequest");let{nonce:r,replid:i}=t.replspaceApiSSHTokenGetRequest,n=t=>{"open"===e.status&&e.send({replspaceApiSSHTokenGetResponse:t})},s=await d({replId:i});if("open"===e.status){if("error"===s.type){n({token:"",nonce:r}),l.logger.error(s.message);return}n({token:s.data.token,nonce:r,sshHostname:s.data.ssh_hostname})}})}),{onConfirmSendToken(e){let t=t=>e(t);return s.add(t),()=>{s.delete(t)}},setWaitForFileClose:function(e){a=e}}},"fetchReplSshToken",0,d],463358)},949955,e=>{"use strict";var t,r=e.i(866408),i=e.i(205104),n=e.i(127387),s=((t={}).USER_JOIN="USER_JOIN",t.USER_LEAVE="USER_LEAVE",t.USERS_UPDATE="USERS_UPDATE",t.USER_OPENED_FILE="USER_OPENED_FILE",t),o=e.i(584888),a=e.i(383941);e.s(["default",0,function({container:e,onCommand:t}){let l=(0,r.default)();l.setMaxListeners(1/0);let u=[],c={},d=null;async function p(){return d||new Promise(e=>{l.once(s.USERS_UPDATE,()=>{if(!d)throw Error("Expected presenceChannel to be set");e(d)})})}return e.openChannel({service:"presence",name:"presencer"},({channel:e})=>(e.onCommand(e=>{t?.(e);let r={cmd:e,emitter:l,activeUsers:u,userIdToFile:c};switch(e.body){case"roster":!function({cmd:e,emitter:t,activeUsers:r,userIdToFile:i}){let n=e.roster;if(!n)return;let{user:l,files:u}=n;if(!l||!u)return;let c=new Set;r.splice(0,r.length),l.forEach(e=>{if(!e.id||!e.name||!e.roles||c.has(e.id))return;let t=u.filter(t=>t.userId===e.id).map(e=>{if(!e.session||!e.timestamp)throw Error("Expected session and associated with user");return{id:e.session,activeFile:e.file||null,timestamp:(0,o.convertTimestampToNumber)(e.timestamp)}});r.push({id:e.id,username:e.name,roles:e.roles,color:(0,a.getColorForName)(e.name),sessions:t}),c.add(e.id)}),r.forEach(e=>{i[e.id]=(0,o.getActiveFileForUser)(e)}),t.emit(s.USERS_UPDATE,[...r])}(r);break;case"join":!function({cmd:e,emitter:t,activeUsers:r,userIdToFile:i}){let l=e.join;if(!l.id||!l.name||!l.roles||!l.session)return;let u=r.find(e=>e.id===l.id),c=Math.floor(Date.now()/1e3),d=n.google.protobuf.Timestamp.create({seconds:c}),p=(0,o.convertTimestampToNumber)(d);if(u)u.sessions.some(e=>e.id===l.session)||u.sessions.push({id:l.session,activeFile:null,timestamp:p});else{let e={id:l.id,username:l.name,roles:l.roles,color:(0,a.getColorForName)(l.name),sessions:[{id:l.session,activeFile:null,timestamp:p}]};i[l.id]=null,r.push(e),t.emit(s.USER_JOIN,e),t.emit(s.USERS_UPDATE,[...r])}}(r);break;case"part":!function({cmd:e,emitter:t,activeUsers:r,userIdToFile:i}){if(!e.part||!e.part.id||!e.part.session)return;let{id:n,session:a}=e.part,l=r.findIndex(e=>e.id===n),u=r[l];if(1===u.sessions.length)r.splice(l,1),delete i[u.id],t.emit(s.USER_LEAVE,u),t.emit(s.USERS_UPDATE,[...r]);else{u.sessions=u.sessions.filter(e=>e.id!==a);let e=(0,o.getActiveFileForUser)(u);i[u.id]!==e&&(i[u.id]=e,t.emit(s.USER_OPENED_FILE,{user:u,file:e}))}}(r);break;case"fileOpened":!function({emitter:e,cmd:t,activeUsers:r,userIdToFile:i}){if(!t.fileOpened)return;let{userId:n,file:a,timestamp:l,session:u}=t.fileOpened,c=a||null;if(!n||!l)throw Error("Expected userId and timestamp associated with file opened command");let d=r.find(e=>e.id===n);if(!d)throw Error(`Expected user with ID ${n}`);let p=d.sessions.find(e=>e.id===u);if(!p)throw Error(`Expected session with ID ${p}`);p.activeFile=c,p.timestamp=(0,o.convertTimestampToNumber)(l),i[n]=c,e.emit(s.USER_OPENED_FILE,{user:d,file:c})}(r);break;case"sessionTimestampUpdated":!function({cmd:e,emitter:t,activeUsers:r,userIdToFile:i}){let n=e.sessionTimestampUpdated;if(!n.session||!n.timestamp)throw Error("Expected session and tiemstamp associated with update");let a=n.session,l=(0,o.getUserForSession)(a,r),u=i[l.id],c=l.sessions.find(e=>e.id===a);if(!c)throw Error(`Expected user ${l.id} to have a session with ID ${a}`);c.timestamp=(0,o.convertTimestampToNumber)(n.timestamp);let{activeFile:d}=c;d!==u&&(i[l.id]=d,t.emit(s.USER_OPENED_FILE,{user:l,file:d}))}(r)}}),d=e,()=>{d=null})),{onUserLeave:e=>(l.on(s.USER_LEAVE,e),()=>{l.removeListener(s.USER_LEAVE,e)}),onUserJoin:e=>(l.on(s.USER_JOIN,e),()=>{l.removeListener(s.USER_JOIN,e)}),onActiveUsersChange:e=>(l.on(s.USERS_UPDATE,e),()=>{l.removeListener(s.USERS_UPDATE,e)}),onUserOpenedFile:e=>(l.on(s.USER_OPENED_FILE,e),()=>{l.removeListener(s.USER_OPENED_FILE,e)}),getActiveFileForUser(e){let t=c[e];if(void 0===t)throw Error(`Expected file for user with ID ${e} to be defined`);return t},async updateOpenFile(e){(await p()).send({openFile:{file:e}})},async updateSessionTimestamp(){(await p()).send({updateSessionTimestamp:{}})},getActiveUsers:()=>u,getUserIdToFile:()=>c,getPathToUserIds(){let e=new Map;return u.forEach(({id:t})=>{let r=c[t];r&&function t(r,n){if(""===r)return;e.has(r)||e.set(r,[]);let s=e.get(r);if(!s)throw Error("Expected user Ids");s.some(e=>e===n)||(e.get(r)?.push(n),t((0,i.getParentPath)(r),n))}(r,t)}),e}}}],949955)},82775,e=>{"use strict";var t=e.i(389959),r=e.i(231693),i=e.i(464458),n=e.i(19004),s=e.i(635431),o=e.i(17609),a=e.i(748855),l=e.i(415541),u=e.i(101597),c=e.i(563654),d=e.i(478074),p=e.i(30083),m=e.i(540082),f=e.i(949955),h=e.i(463358),S=e.i(70);function k({onUnrecoverableError:e,openMultipleFiles:t,openMultipleURLs:r,enableReplspaceSshTokenPassthrough:i,onPresenceCommand:g,replId:E,ctx:v}){let x=(0,u.default)({onUnrecoverableError:e,ctx:v}),w=(0,c.default)({container:x}),T=(0,f.default)({container:x,onCommand:g}),b=(0,n.default)({container:x,fs:w,ctx:v}),A=(0,s.default)({container:x}),y=(0,a.default)({container:x,dotReplit:b}),U=(0,o.default)({container:x,track:l.track}),_=(0,h.default)({container:x,fs:w,openMultipleFiles:t,openMultipleURLs:r,enableReplspaceSshTokenPassthrough:i}),I=(0,m.createPortsService)({container:x,dotReplit:b}),C=(0,p.createLSPNixService)({container:x,toolchain:y,fs:w}),j=(0,d.default)({container:x,fs:w,replId:E}),F=(0,S.default)({container:x});return{presence:T,packager:U,container:x,fs:w,dotReplit:b,nixService:A,lspnix:C,git:j,replspaceApi:_,toolchain:y,ports:I,secrets:F}}e.s(["default",0,k,"useCreateServices",0,function(e){let[n,s]=(0,t.useState)(null);return(0,t.useEffect)(()=>{let t=(0,i.createSpanFromContext)(r.context.active(),"workspace.useCreateServices"),n=k({...e,ctx:t?.childCtx});return t?.span.end(),s(n),()=>{s(null),setTimeout(()=>{n.container.destroy()},500)}},[e]),n}])},997786,e=>{"use strict";var t=e.i(562782);e.s(["humanizeDuration",0,function(e){if(e<60)return(0,t.default)("second",e,!0);if(e<3600){let r=Math.floor(e/60);return(0,t.default)("minute",r,!0)}{let t=Math.floor(e/3600),r=Math.floor(e%3600/60);return r>0?`${t}h ${r}m`:`${t}h`}}])}]);

//# debugId=e56abe37-11d9-343c-d263-b444d8b5e665
//# sourceMappingURL=0iqrumb~jsnw2.js.map