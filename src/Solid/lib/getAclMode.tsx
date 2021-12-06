import { NamedNode } from 'rdflib';
import * as React from 'react';
import { IMode } from '../components/Mode/Mode';

export const AclModes:IMode[] = [
    {
        color: "purple",
        description: <>Owners have <em>full control</em> over these things, including changing permissions</>,
        modes: ["Read", "Write",  "Control"],
        name: "Owners",
    },
    {
        color: "red",
        description: <>Editors can <em>see</em>, <em>upload</em>, <em>change</em>, and <em>delete</em> these things.</>,
        modes: ["Read", "Write"],
        name: "Editors",
    },
    {
        color: "orange",
        description: <>Posters can <em>see</em> and <em>add</em> new things here, but <em>can't change</em> existing things here.</>,
        modes: ["Read", "Append"],
        name: "Posters",
    },
    {
        color: "gold",
        description: <>Submitters can only <em>create</em> new things here, but <em>can't see</em> any of them.</>,
        modes: ["Append"],
        name: "Submitters",
    },
    {
        color: "green",
        description: <>Viewers can only <em>see</em> these things.</>,
        modes: ["Read"],
        name: "Viewers",
    },
    {
        color: "gray",
        description: <>Undefined users have no permissions defined.</>,
        modes: [],
        name: "Undefined",
    },
];

const s = (a:string, b:string) => a.localeCompare(b);
const sameArrays = (a:string[], b:string[]) => JSON.stringify(a.sort(s)) === JSON.stringify(b.sort(s));

export const getAclMode = (modes:NamedNode[]):IMode => {
    const names = modes.map((node) => node.value.replace("http://www.w3.org/ns/auth/acl#", ""));
    const matchingModes:IMode[] = AclModes.filter((mode:IMode) => sameArrays(names, mode.modes));
    
    return matchingModes.length === 0
        ? {name: `Unknown (${modes.join(", ")})`, color: "gray", modes: [], description: "The permissions on this thing do not match any of the standard modes."}
        : matchingModes[0];
}
