import { CloseOutlined } from '@ant-design/icons';
import { Input, Spin, Typography } from 'antd';
import * as rdfLib from 'rdflib';
import { NamedNode } from 'rdflib';
import * as React from 'react';
import { flatten, partition, prop, unique } from 'ts-functional';
import { AgentSelect } from '../../../Profile/components/AgentSelect';
import { ns, sym } from '../../index';
import { useLoader } from '../../lib/useLoader';
import { useRDF } from '../../lib/useRDF';
import { Quad } from '../../lib/useRDF/useRDF.d';
import { DebouncedInput } from '../DebouncedInput';
import { NamedNodeSelect } from '../NamedNodeSelect';
import { ValuePredicateGroupInputProps } from "./ValuePredicateGroupInput.d";
import './ValuePredicateGroupInput.scss';

const {Text} = Typography;
const {owl, rdfs} = ns;

export const ValuePredicateGroupInputComponent = (props:ValuePredicateGroupInputProps) => {
    const rdf = useRDF();
    const {store} =rdf.graph;
    const loader = useLoader();

    // Determine the base document where the subject is located
    const baseDoc:NamedNode = sym(props.subject?.value.split("#")[0] || "") as NamedNode;

    // Fetch the subject and its ACL records
    React.useEffect(() => {
        loader.start();
        rdf.fetch(props.subject?.value).finally(loader.done);

        loader.start();
        rdf.fetchAcl(props.subject?.value).finally(loader.done);
    }, [props.subject?.value]);

    // Fetch sameAs and seeAlso links and their ACL files
    React.useEffect(() => {
        [
            ...store.match(props.subject, owl("sameAs")),
            ...store.match(props.subject, rdfs("seeAlso"))
        ].map((quad:Quad) => {
            loader.start();
            rdf.fetch(quad.object.value).finally(loader.done);

            loader.start();
            rdf.fetchAcl(quad.object.value).finally(loader.done);
        });
    }, [props.subject?.value, rdf.graph]);

    // Partition the values into groups based on the value
    const [values, setValues] = React.useState<{[id:string]:Quad[]}>({});
    React.useEffect(() => {
        setValues(
            partition((quad:Quad) => quad.object.value)(
                flatten(
                    Object.keys(props.predicates).map((name:string) => store.match(props.subject, props.predicates[name]))
                )
            )
        );
    }, [rdf.graph]);

    // Get the predicates that are applied to a specific value
    const getPredicateValues = (value:string):NamedNode[] => !!value ? unique(values[value].map((quad) => quad.predicate)) : [];

    // TODO:  Get the groups, agents and agentClasses applied to a value
    // const getAclGroups = (value:string):NamedNode[] => ???

    // Update the value
    // If the oldValue and newValue are the same, make sure we're only updating predicates that actually changed.
    const updateValue = (oldValue:string, oldPredicates:NamedNode[], newValue:string, newPredicates:NamedNode[]) => {
        const toRemove = oldValue === newValue
            ? oldPredicates.filter((pred) => !newPredicates.map(prop("value")).includes(pred.value))
            : oldPredicates;
        const toAdd = oldValue === newValue
            ? newPredicates.filter((pred) => !oldPredicates.map(prop("value")).includes(pred.value))
            : newPredicates;
        loader.start();
        return rdf.update(
            toRemove.map((predicate) => rdfLib.st(props.subject as NamedNode, predicate, new rdfLib.Literal(oldValue), baseDoc as NamedNode)),
            toAdd.map((predicate) => rdfLib.st(props.subject as NamedNode, predicate, new rdfLib.Literal(newValue), baseDoc as NamedNode)),
        ).finally(loader.done);
    }

    const onPredicateChange = (oldPredicates:NamedNode[], value:string) => (newPredicates:NamedNode[]) => {
        updateValue(value, oldPredicates, value, newPredicates);
    }

    const onValueChange = (oldValue:string, predicates:NamedNode[]) => (newValue:string) => {
        updateValue(oldValue, predicates, newValue, predicates);
    };

    // Handle the state of the new value  input
    const [newEntryPredicates, setNewEntryPredicates] = React.useState<NamedNode[]>([]);
    const [newEntryValue, setNewEntryValue] = React.useState("");
    const updateNewValue = (e:React.ChangeEvent<HTMLInputElement>) => {setNewEntryValue(e.currentTarget.value);};
    const addNewValue = () => {
        updateValue("", [], newEntryValue, newEntryPredicates).then(() => {
            setNewEntryPredicates([]);
            setNewEntryValue("");
        });
    }

    const onSelectAgent = (webId:string) => {
        console.log(`Selected agent: ${webId}`);
    }

    const onSelectAgentClass = (webId:string) => {
        console.log(`Selected agent class: ${webId}`);
    }

    const onAddNewAgent = (webId:string) => {
        console.log(`New agent: ${webId}`);
    }

    const onAddNewAgentClass = (webId:string) =>{
        console.log(`New agent class: ${webId}`);
    }

    return <Spin spinning={loader.isLoading}>
        {Object.keys(values).map((value:string) =>
            <DebouncedInput timeout={1000} key={value} className="value-predicate-group-input"
                addonBefore={<NamedNodeSelect
                    options={props.predicates}
                    values={getPredicateValues(value)}
                    onChange={onPredicateChange(getPredicateValues(value), value)}
                />}
                value={value}
                onChange={onValueChange(value, getPredicateValues(value))}
                addonAfter={<>
                    <AgentSelect agents={[]} agentClasses={[]} onSelectAgent={onSelectAgent} onSelectAgentClass={onSelectAgentClass} inline />
                    <span style={{display: "inline-block", borderLeft: "solid 1px", marginLeft: "4px"}}>&nbsp;</span>
                    <Text type="danger"><CloseOutlined /></Text>
                </>}
            />
        )}
        <Input
            className="value-predicate-group-input"
            addonBefore={<NamedNodeSelect options={props.predicates} values={newEntryPredicates} onChange={setNewEntryPredicates} />}
            addonAfter={<>
                <AgentSelect agents={[]} agentClasses={[]} onSelectAgent={onAddNewAgent} onSelectAgentClass={onAddNewAgentClass} inline />
                <span style={{display: "inline-block", borderLeft: "solid 1px", marginLeft: "4px"}}>&nbsp;</span>
                <span className="add-btn"><CloseOutlined onClick={addNewValue}/></span>
            </>}
            value={newEntryValue}
            onChange={updateNewValue}
            placeholder="New value"
        />
    </Spin>;
}